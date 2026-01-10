import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PATCH update journal entry
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const userId = request.headers.get('x-user-id') || 'demo-user';
    const body = await request.json();

    if (!prisma) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 });
    }

    const entry = await prisma.journalEntry.findFirst({
      where: { id, userId }
    });

    if (!entry) {
      return NextResponse.json({ error: 'Journal entry not found' }, { status: 404 });
    }

    const updated = await prisma.journalEntry.update({
      where: { id },
      data: {
        mentalState: body.mentalState !== undefined ? body.mentalState : entry.mentalState,
        focus: body.focus !== undefined ? body.focus : entry.focus,
        confidence: body.confidence !== undefined ? body.confidence : entry.confidence,
        externalStressors: body.externalStressors ? JSON.stringify(body.externalStressors) : entry.externalStressors,
        phase: body.phase !== undefined ? body.phase : entry.phase,
        phaseNotes: body.phaseNotes !== undefined ? body.phaseNotes : entry.phaseNotes
      }
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating journal entry:', error);
    return NextResponse.json({ error: 'Failed to update journal entry' }, { status: 500 });
  }
}

// DELETE journal entry
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const userId = request.headers.get('x-user-id') || 'demo-user';

    if (!prisma) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 });
    }

    const entry = await prisma.journalEntry.findFirst({
      where: { id, userId }
    });

    if (!entry) {
      return NextResponse.json({ error: 'Journal entry not found' }, { status: 404 });
    }

    await prisma.journalEntry.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting journal entry:', error);
    return NextResponse.json({ error: 'Failed to delete journal entry' }, { status: 500 });
  }
}
