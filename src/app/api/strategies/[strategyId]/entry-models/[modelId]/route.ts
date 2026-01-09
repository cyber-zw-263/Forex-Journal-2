import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// PATCH update entry model
export async function PATCH(
  request: NextRequest,
  { params }: { params: { strategyId: string; modelId: string } }
) {
  try {
    const userId = request.headers.get('x-user-id') || 'demo-user';
    const { strategyId, modelId } = params;
    const body = await request.json();

    // Verify strategy and entry model belong to user
    const strategy = await prisma.strategy.findFirst({
      where: { id: strategyId, userId }
    });

    if (!strategy) {
      return NextResponse.json({ error: 'Strategy not found' }, { status: 404 });
    }

    const entryModel = await prisma.entryModel.findFirst({
      where: { id: modelId, strategyId }
    });

    if (!entryModel) {
      return NextResponse.json({ error: 'Entry model not found' }, { status: 404 });
    }

    const updated = await prisma.entryModel.update({
      where: { id: modelId },
      data: {
        name: body.name || entryModel.name,
        entryLogic: body.entryLogic !== undefined ? body.entryLogic : entryModel.entryLogic,
        confirmationStyle: body.confirmationStyle !== undefined ? body.confirmationStyle : entryModel.confirmationStyle,
        riskStyle: body.riskStyle || entryModel.riskStyle,
        notes: body.notes !== undefined ? body.notes : entryModel.notes
      }
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating entry model:', error);
    return NextResponse.json({ error: 'Failed to update entry model' }, { status: 500 });
  }
}

// DELETE entry model
export async function DELETE(
  request: NextRequest,
  { params }: { params: { strategyId: string; modelId: string } }
) {
  try {
    const userId = request.headers.get('x-user-id') || 'demo-user';
    const { strategyId, modelId } = params;

    // Verify strategy and entry model belong to user
    const strategy = await prisma.strategy.findFirst({
      where: { id: strategyId, userId }
    });

    if (!strategy) {
      return NextResponse.json({ error: 'Strategy not found' }, { status: 404 });
    }

    const entryModel = await prisma.entryModel.findFirst({
      where: { id: modelId, strategyId }
    });

    if (!entryModel) {
      return NextResponse.json({ error: 'Entry model not found' }, { status: 404 });
    }

    await prisma.entryModel.delete({
      where: { id: modelId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting entry model:', error);
    return NextResponse.json({ error: 'Failed to delete entry model' }, { status: 500 });
  }
}
