// app/api/expenses/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logAudit } from '@/lib/auditLogger';

type RouteCtx = { params: Promise<{ id: string }> };

// ────────────────────────────────────────────────────────────
// GET /api/expenses/:id
// ────────────────────────────────────────────────────────────
export async function GET(
  _req: NextRequest,
  { params }: RouteCtx
) {
  try {
    const { id } = await params;

    const expense = await prisma.expenseRecord.findUnique({
      where: { expense_id: id },
      include: {
        receipt: { include: { items: true } }
      }
    });

    if (!expense || expense.is_deleted) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(expense);
  } catch (err) {
    console.error('GET /expenses/:id failed:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// ────────────────────────────────────────────────────────────
// PUT /api/expenses/:id
// ────────────────────────────────────────────────────────────
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

    const originalRecord = await prisma.expenseRecord.findUnique({
      where: { expense_id: id },
      include: { receipt: true }
    });

    if (!originalRecord) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    // deviation %
    let deviationPercentage = 0;
    if (originalRecord.receipt) {
      deviationPercentage =
        Math.abs(
          (Number(total_amount) -
            Number(originalRecord.receipt.total_amount_due)) /
            Number(originalRecord.receipt.total_amount_due)
        ) * 100;
    }

    const updatedExpense = await prisma.expenseRecord.update({
      where: { expense_id: id },
      data: {
        total_amount,
        expense_date: new Date(expense_date),
        updated_at: new Date(),
        other_source: originalRecord.category === 'Other' ? other_source : null,
        other_category: originalRecord.category === 'Other' ? other_category : null
      },
      include: {
        receipt: { include: { items: true } }
      }
    });

    // audit log
    let details = 'Updated expense record. ';
    if (Number(total_amount) !== Number(originalRecord.total_amount)) {
      details += `Amount changed from ₱${originalRecord.total_amount} to ₱${total_amount}. `;
      if (deviationPercentage > 0) {
        details += `Deviation from original amount: ${deviationPercentage.toFixed(2)}%. `;
      }
    }
    if (
      new Date(expense_date).getTime() !==
      new Date(originalRecord.expense_date).getTime()
    ) {
      details += `Date changed from ${originalRecord.expense_date} to ${expense_date}. `;
    }
    if (originalRecord.category === 'Other') {
      if (other_source !== originalRecord.other_source) {
        details += `Source changed from "${originalRecord.other_source}" to "${other_source}". `;
      }
      if (other_category !== originalRecord.other_category) {
        details += `Category changed from "${originalRecord.other_category}" to "${other_category}". `;
      }
    }

    await logAudit({
      action: 'UPDATE',
      table_affected: 'ExpenseRecord',
      record_id: id,
      performed_by: 'ftms_user',
      details
    });

    return NextResponse.json(updatedExpense);
  } catch (err) {
    console.error('PUT /expenses/:id failed:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// ────────────────────────────────────────────────────────────
// DELETE /api/expenses/:id
// ────────────────────────────────────────────────────────────
export async function DELETE(
  _req: NextRequest,
  { params }: RouteCtx
) {
  try {
    const { id } = await params;

    const expenseToDelete = await prisma.expenseRecord.findUnique({
      where: { expense_id: id }
    });

    if (!expenseToDelete || expenseToDelete.is_deleted) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // reset flags on related assignment / receipt
    if (expenseToDelete.assignment_id) {
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/op_bus_assignments?assignment_id=eq.${expenseToDelete.assignment_id}`,
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
          where: { assignment_id: expenseToDelete.assignment_id },
          data: {
            is_expense_recorded: false,
            last_updated: new Date()
          }
        });
      } catch (err) {
        console.error('Failed to update assignment flags:', err);
      }
    }

    if (expenseToDelete.receipt_id) {
      await prisma.receipt.update({
        where: { receipt_id: expenseToDelete.receipt_id },
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
      details: `Soft-deleted expense record. Details: ${JSON.stringify({
        category: expenseToDelete.category,
        amount: expenseToDelete.total_amount,
        date: expenseToDelete.expense_date
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
