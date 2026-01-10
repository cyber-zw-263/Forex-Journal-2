import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET journal entries
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id') || 'demo-user';
    const searchParams = request.nextUrl.searchParams;
    
    const startDate = searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : undefined;
    const endDate = searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : undefined;

    if (!prisma) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 });
    }

    const entries = await prisma.journalEntry.findMany({
      where: {
        userId,
        ...(startDate && endDate && {
          date: {
            gte: startDate,
            lte: endDate
          }
        })
      },
      orderBy: { date: 'desc' }
    });

    return NextResponse.json(entries);
  } catch (error) {
    console.error('Error fetching journal entries:', error);
    return NextResponse.json({ error: 'Failed to fetch journal entries' }, { status: 500 });
  }
}

// POST create new journal entry
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id') || 'demo-user';
    const body = await request.json();

    if (!prisma) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 });
    }

    const {
      date,
      mentalState,
      focus,
      confidence,
      externalStressors,
      phase,
      phaseNotes
    } = body;

    if (!date) {
      return NextResponse.json({ error: 'Date is required' }, { status: 400 });
    }

    const entry = await prisma.journalEntry.create({
      data: {
        userId,
        date: new Date(date),
        mentalState: mentalState || null,
        focus: focus || null,
        confidence: confidence || null,
        externalStressors: externalStressors ? JSON.stringify(externalStressors) : null,
        phase: phase || null,
        phaseNotes: phaseNotes || null
      }
    });

    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    console.error('Error creating journal entry:', error);
    return NextResponse.json({ error: 'Failed to create journal entry' }, { status: 500 });
  }
}
