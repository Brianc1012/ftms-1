// app\api\assignments\route.ts
import { NextResponse } from 'next/server'
import { getAllAssignments } from '../../../lib/supabase/assignments'

export async function GET() {
  try {
    const assignments = await getAllAssignments();
    return NextResponse.json(assignments);
  } catch (error: unknown) {
    console.error('Failed to fetch assignments from Supabase:', error);
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Internal Server Error';
      
    return NextResponse.json(
      { error: errorMessage }, 
      { status: 500 }
    );
  }
}