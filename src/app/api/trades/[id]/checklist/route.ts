import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET checklist state for a trade
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    if (!prisma) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 });
    }

    const userId = request.headers.get('x-user-id') || 'demo-user';

    // Verify trade belongs to user
    const trade = await prisma.trade.findFirst({
      where: { id, userId }
    });

    if (!trade) {
      return NextResponse.json({ error: 'Trade not found' }, { status: 404 });
    }

    // Get or create trade state with checklist
    let tradeState = await prisma.tradeState.findUnique({
      where: { tradeId: id }
    });

    if (!tradeState) {
      tradeState = await prisma.tradeState.create({
        data: {
          tradeId: id,
          checklist: JSON.stringify([])
        }
      });
    }

    const completedItems = tradeState.checklist ? JSON.parse(tradeState.checklist) : [];

    return NextResponse.json({
      tradeId: id,
      completedItems,
      updatedAt: tradeState.updatedAt
    });
  } catch (error) {
    console.error('Error fetching checklist state:', error);
    return NextResponse.json({ error: 'Failed to fetch checklist state' }, { status: 500 });
  }
}

// POST update checklist state
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    if (!prisma) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 });
    }

    const userId = request.headers.get('x-user-id') || 'demo-user';
    const body = await request.json();
    const { completedItems } = body;

    if (!Array.isArray(completedItems)) {
      return NextResponse.json({ error: 'completedItems must be an array' }, { status: 400 });
    }

    // Verify trade belongs to user
    const trade = await prisma.trade.findFirst({
      where: { id, userId }
    });

    if (!trade) {
      return NextResponse.json({ error: 'Trade not found' }, { status: 404 });
    }

    // Update or create trade state with checklist
    const tradeState = await prisma.tradeState.upsert({
      where: { tradeId: id },
      update: {
        checklist: JSON.stringify(completedItems),
        updatedAt: new Date()
      },
      create: {
        tradeId: id,
        checklist: JSON.stringify(completedItems)
      }
    });

    return NextResponse.json({
      tradeId: id,
      completedItems,
      updatedAt: tradeState.updatedAt
    });
  } catch (error) {
    console.error('Error updating checklist state:', error);
    return NextResponse.json({ error: 'Failed to update checklist state' }, { status: 500 });
  }
}