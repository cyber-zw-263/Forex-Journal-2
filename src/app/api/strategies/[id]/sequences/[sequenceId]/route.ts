import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PATCH update timeframe sequence
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; sequenceId: string }> }
) {
  const { id, sequenceId } = await params;
  try {
    const userId = request.headers.get('x-user-id') || 'demo-user';
    const body = await request.json();

    // Verify strategy belongs to user
    const strategy = await prisma.strategy.findFirst({
      where: { id, userId }
    });

    if (!strategy) {
      return NextResponse.json({ error: 'Strategy not found' }, { status: 404 });
    }

    const sequence = await prisma.timeframeSequence.findFirst({
      where: { id: sequenceId, strategyId: id }
    });

    if (!sequence) {
      return NextResponse.json({ error: 'Sequence not found' }, { status: 404 });
    }

    // Update basic fields
    const updated = await prisma.timeframeSequence.update({
      where: { id: sequenceId },
      data: {
        name: body.name || sequence.name,
        description: body.description !== undefined ? body.description : sequence.description
      }
    });

    // Update steps if provided
    if (body.steps && Array.isArray(body.steps)) {
      // Delete existing steps
      await prisma.timeframeStep.deleteMany({
        where: { sequenceId }
      });

      // Create new steps
      await prisma.timeframeStep.createMany({
        data: body.steps.map((step: any, index: number) => ({
          sequenceId,
          orderIndex: index + 1,
          timeframe: step.timeframe,
          role: step.role,
          description: step.description || null
        }))
      });
    }

    // Fetch updated sequence with steps
    const result = await prisma.timeframeSequence.findUnique({
      where: { id: sequenceId },
      include: {
        steps: {
          orderBy: { orderIndex: 'asc' }
        }
      }
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating timeframe sequence:', error);
    return NextResponse.json({ error: 'Failed to update timeframe sequence' }, { status: 500 });
  }
}

// DELETE timeframe sequence
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; sequenceId: string }> }
) {
  const { id, sequenceId } = await params;
  try {
    const userId = request.headers.get('x-user-id') || 'demo-user';

    // Verify strategy belongs to user
    const strategy = await prisma.strategy.findFirst({
      where: { id, userId }
    });

    if (!strategy) {
      return NextResponse.json({ error: 'Strategy not found' }, { status: 404 });
    }

    const sequence = await prisma.timeframeSequence.findFirst({
      where: { id: sequenceId, strategyId: id }
    });

    if (!sequence) {
      return NextResponse.json({ error: 'Sequence not found' }, { status: 404 });
    }

    await prisma.timeframeSequence.delete({
      where: { id: sequenceId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting timeframe sequence:', error);
    return NextResponse.json({ error: 'Failed to delete timeframe sequence' }, { status: 500 });
  }
}