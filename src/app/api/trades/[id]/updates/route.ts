import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all updates for a trade
export async function GET(
  request: NextRequest,
  { params }: { params: { tradeId: string } }
) {
  try {
    const userId = request.headers.get('x-user-id') || 'demo-user';
    const { tradeId } = params;

    // Verify trade belongs to user
    const trade = await prisma.trade.findFirst({
      where: { id: tradeId, userId }
    });

    if (!trade) {
      return NextResponse.json({ error: 'Trade not found' }, { status: 404 });
    }

    const updates = await prisma.tradeUpdate.findMany({
      where: { tradeId },
      orderBy: { timestamp: 'asc' }
    });

    return NextResponse.json(updates);
  } catch (error) {
    console.error('Error fetching trade updates:', error);
    return NextResponse.json({ error: 'Failed to fetch trade updates' }, { status: 500 });
  }
}

// POST create new trade update
export async function POST(
  request: NextRequest,
  { params }: { params: { tradeId: string } }
) {
  try {
    const userId = request.headers.get('x-user-id') || 'demo-user';
    const { tradeId } = params;
    const body = await request.json();

    // Verify trade belongs to user
    const trade = await prisma.trade.findFirst({
      where: { id: tradeId, userId }
    });

    if (!trade) {
      return NextResponse.json({ error: 'Trade not found' }, { status: 404 });
    }

    const {
      action,
      reason,
      emotionalState,
      behavior,
      notes
    } = body;

    const update = await prisma.tradeUpdate.create({
      data: {
        tradeId,
        action: action || 'none',
        reason: reason || null,
        emotionalState: emotionalState || null,
        behavior: behavior ? JSON.stringify(behavior) : null,
        notes: notes || null
      }
    });

    return NextResponse.json(update, { status: 201 });
  } catch (error) {
    console.error('Error creating trade update:', error);
    return NextResponse.json({ error: 'Failed to create trade update' }, { status: 500 });
  }
}
