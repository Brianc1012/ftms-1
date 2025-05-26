// app/api/expenses/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logAudit } from '@/lib/auditLogger';

/**
 * Type for the second argument sent to a route handler in Next.js 15.
 * `params` is now delivered as a Promise.
 */
type RouteCtx = { params: Promise<{ id: string }> };

// ───────────────────────────────────────────────────
// GET /api/expenses/:id
// ───────────────────────────────────────────────────
export async function GET(
  _req: NextRequest,
  { params }: RouteCtx
) {
  try {
    const { id } = await params; // ⬅️ new: await the promise

    const expense = await prisma.expenseRecord.findUnique({
      where: { expense_id: id },
      include: {
        receipt: {
          include: { items: true }
        }
      }
    });

    if (!expense || expense.is_deleted) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(expense);
  } catch (err) {
    console.error('GET /expenses/:id failed:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// ───────────────────────────────────────────────────
// PUT /api/expenses/:id
// ───────────────────────────────────────────────────
export async function PUT(
  req: NextRequest,
  { params }: RouteCtx
) {
  try {
    const { id } = await params;
    const {
      total_amount,
      expense_date,
      other_source,
      other_category
    } = await req.json();

    const original = await prisma.expenseRecord.findUnique({
      where: { expense_id: id },
      include: { receipt: true }
    });

    if (!original) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    // deviation %
    let deviation = 0;
    if (original.receipt) {
      deviation =
        Math.abs(
          (Number(total_amount) -
            Number(original.receipt.total_amount_due)) /
            Number(original.receipt.total_amount_due)
        ) * 100;
    }

    const updated = await prisma.expenseRecord.update({
      where: { expense_id: id },
      data: {
        total_amount,
        expense_date: new Date(expense_date),
        updated_at: new Date(),
        other_source: original.category === 'Other' ? other_source : null,
        other_category: original.category === 'Other' ? other_category : null
      },
      include: {
        receipt: { include: { items: true } }
      }
    });

    // audit string
    let details = 'Updated expense record. ';
    if (Number(total_amount) !== Number(original.total_amount)) {
      details += `Amount changed from ₱${original.total_amount} to ₱${total_amount}. `;
      if (deviation > 0) details += `Deviation: ${deviation.toFixed(2)}%. `;
    }
    if (
      new Date(expense_date).getTime() !==
      new Date(original.expense_date).getTime()
    ) {
      details += `Date changed from ${original.expense_date} to ${expense_date}. `;
    }
    if (original.category === 'Other') {
      if (other_source !== original.other_source) {
        details += `Source "${original.other_source}" → "${other_source}". `;
      }
      if (other_category !== original.other_category) {
        details += `Category "${original.other_category}" → "${other_category}". `;
      }
    }

    await logAudit({
      action: 'UPDATE',
      table_affected: 'ExpenseRecord',
      record_id: id,
      performed_by: 'ftms_user',
      details
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error('PUT /expenses/:id failed:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// ───────────────────────────────────────────────────
// DELETE /api/expenses/:id
// ───────────────────────────────────────────────────
export async function DELETE(
  _req: NextRequest,
  { params }: RouteCtx
) {
  try {
    const { id } = await params;

    const record = await prisma.expenseRecord.findUnique({
      where: { expense_id: id }
    });

    if (!record || record.is_deleted) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    /* Reset related flags (Supabase + cache) */
    if (record.assignment_id) {
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/op_bus_assignments?assignment_id=eq.${record.assignment_id}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
            },
            body: JSON.stringify({ is_expense_recorded: false })
          }
        );

        await prisma.assignmentCache.update({
          where: { assignment_id: record.assignment_id },
          data: {
            is_expense_recorded: false,
            last_updated: new Date()
          }
        });
      } catch (err) {
        console.error('Assignment flag reset failed:', err);
      }
    }

    if (record.receipt_id) {
      await prisma.receipt.update({
        where: { receipt_id: record.receipt_id },
        data: { is_expense_recorded: false }
      });
    }

    await prisma.expenseRecord.update({
      where: { expense_id: id },
      data: {
        is_deleted: true,
        updated_at: new Date()
      }
    });

    await logAudit({
      action: 'DELETE',
      table_affected: 'ExpenseRecord',
      record_id: id,
      performed_by: 'ftms_user',
      details: `Soft-deleted record: ${JSON.stringify({
        category: record.category,
        amount: record.total_amount,
        date: record.expense_date
      })}`
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE /expenses/:id failed:', err);
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Internal Server Error', details: msg },
      { status: 500 }
    );
  }
}
