// app/api/assignments/cache/route.ts
export const dynamic = 'force-dynamic';   // ←  ⬅️ this is the fix
// or: export const runtime = 'nodejs';

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import type { Assignment } from '@/lib/supabase/assignments';

/*  ─────────────────────────────────────────────────────────
    GET – Return all cached assignments
    ───────────────────────────────────────────────────────── */
export async function GET() {
  try {
    let cachedAssignments = await prisma.assignmentCache.findMany();

    if (!cachedAssignments.length) {
      const { data: supabaseData, error } = await supabase
        .from('op_bus_assignments')
        .select('*');
      if (error) throw new Error(error.message);

      await prisma.assignmentCache.createMany({
        data: supabaseData.map((a: Assignment) => ({
          assignment_id: a.assignment_id,
          bus_bodynumber: a.bus_bodynumber,
          bus_platenumber: a.bus_platenumber,
          bus_route: a.bus_route,
          bus_type: a.bus_type,
          driver_name: a.driver_name,
          conductor_name: a.conductor_name,
          date_assigned: new Date(a.date_assigned),
          trip_fuel_expense: a.trip_fuel_expense,
          trip_revenue: a.trip_revenue,
          is_revenue_recorded: a.is_revenue_recorded,
          is_expense_recorded: a.is_expense_recorded,
          assignment_type: a.assignment_type,
        })),
      });

      cachedAssignments = await prisma.assignmentCache.findMany();
    }

    return NextResponse.json({ data: cachedAssignments });
  } catch (err) {
    console.error('Error checking/populating cache:', err);
    return NextResponse.json(
      { error: 'Failed to get assignments' },
      { status: 500 },
    );
  }
}

/*  ─────────────────────────────────────────────────────────
    POST – Refresh cache
    ───────────────────────────────────────────────────────── */
export async function POST() {
  try {
    const { data: supabaseData, error } = await supabase
      .from('op_bus_assignments')
      .select('*');
    if (error) throw new Error(error.message);

    await prisma.$transaction(async (tx) => {
      await tx.assignmentCache.deleteMany();
      await tx.assignmentCache.createMany({
        data: supabaseData.map((a: Assignment) => ({
          assignment_id: a.assignment_id,
          bus_bodynumber: a.bus_bodynumber,
          bus_platenumber: a.bus_platenumber,
          bus_route: a.bus_route,
          bus_type: a.bus_type,
          driver_name: a.driver_name,
          conductor_name: a.conductor_name,
          date_assigned: new Date(a.date_assigned),
          trip_fuel_expense: a.trip_fuel_expense,
          trip_revenue: a.trip_revenue,
          is_revenue_recorded: a.is_revenue_recorded,
          is_expense_recorded: a.is_expense_recorded,
          assignment_type: a.assignment_type,
        })),
      });
    });

    const updatedCache = await prisma.assignmentCache.findMany();
    return NextResponse.json({ data: updatedCache });
  } catch (err) {
    console.error('Error updating cache:', err);
    return NextResponse.json(
      { error: 'Failed to update cache' },
      { status: 500 },
    );
  }
}
