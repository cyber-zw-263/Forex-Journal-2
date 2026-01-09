import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all entry models for a strategy
export async function GET(
  request: NextRequest,
  { params }: { params: { strategyId: string } }
) {
  try {
    const userId = request.headers.get('x-user-id') || 'demo-user';
    const { strategyId } = params;

    // Verify strategy belongs to user
    const strategy = await prisma.strategy.findFirst({
      where: { id: strategyId, userId }
    });

    if (!strategy) {
      return NextResponse.json({ error: 'Strategy not found' }, { status: 404 });
    }

    const entryModels = await prisma.entryModel.findMany({
      where: { strategyId },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(entryModels);
  } catch (error) {
    console.error('Error fetching entry models:', error);
    return NextResponse.json({ error: 'Failed to fetch entry models' }, { status: 500 });
  }
}

// POST create new entry model
export async function POST(
  request: NextRequest,
  { params }: { params: { strategyId: string } }
) {
  try {
    const userId = request.headers.get('x-user-id') || 'demo-user';
    const { strategyId } = params;
    const body = await request.json();

    // Verify strategy belongs to user
    const strategy = await prisma.strategy.findFirst({
      where: { id: strategyId, userId }
    });

    if (!strategy) {
      return NextResponse.json({ error: 'Strategy not found' }, { status: 404 });
    }

    const { name, entryLogic, confirmationStyle, riskStyle, notes } = body;

    if (!name) {
      return NextResponse.json({ error: 'Entry model name is required' }, { status: 400 });
    }

    const entryModel = await prisma.entryModel.create({
      data: {
        strategyId,
        name,
        entryLogic: entryLogic || null,
        confirmationStyle: confirmationStyle || null,
        riskStyle: riskStyle || 'balanced',
        notes: notes || null
      }
    });

    return NextResponse.json(entryModel, { status: 201 });
  } catch (error) {
    console.error('Error creating entry model:', error);
    return NextResponse.json({ error: 'Failed to create entry model' }, { status: 500 });
  }
}
