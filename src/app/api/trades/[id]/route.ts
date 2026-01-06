import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = request.headers.get('x-user-id') || 'demo-user';

    const trade = await prisma.trade.findUnique({
      where: { id },
      include: {
        screenshots: true,
        voiceNotes: true,
      },
    });

    if (!trade || trade.userId !== userId) {
      return NextResponse.json({ error: 'Trade not found' }, { status: 404 });
    }

    return NextResponse.json(trade);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch trade' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = request.headers.get('x-user-id') || 'demo-user';
    const body = await request.json();

    const trade = await prisma.trade.findUnique({
      where: { id },
    });

    if (!trade || trade.userId !== userId) {
      return NextResponse.json({ error: 'Trade not found' }, { status: 404 });
    }

    const updatedTrade = await prisma.trade.update({
      where: { id },
      data: {
        pair: body.pair || trade.pair,
        direction: body.direction || trade.direction,
        entryPrice: body.entryPrice ? parseFloat(body.entryPrice) : trade.entryPrice,
        exitPrice: body.exitPrice ? parseFloat(body.exitPrice) : trade.exitPrice,
        exitTime: body.exitTime ? new Date(body.exitTime) : trade.exitTime,
        quantity: body.quantity ? parseFloat(body.quantity) : trade.quantity,
        profitLoss: body.profitLoss ? parseFloat(body.profitLoss) : trade.profitLoss,
        profitLossPercent: body.profitLossPercent ? parseFloat(body.profitLossPercent) : trade.profitLossPercent,
        outcome: body.outcome || trade.outcome,
        notes: body.notes || trade.notes,
        strategy: body.strategy || trade.strategy,
        emotionalState: body.emotionalState || trade.emotionalState,
        setupQuality: body.setupQuality ? parseInt(body.setupQuality) : trade.setupQuality,
        whatLearned: body.whatLearned || trade.whatLearned,
        mistakes: body.mistakes ? JSON.stringify(body.mistakes) : trade.mistakes,
        riskRewardRatio: body.riskRewardRatio ? parseFloat(body.riskRewardRatio) : trade.riskRewardRatio,
      },
      include: {
        screenshots: true,
        voiceNotes: true,
      },
    });

    return NextResponse.json(updatedTrade);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update trade' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = request.headers.get('x-user-id') || 'demo-user';

    const trade = await prisma.trade.findUnique({
      where: { id },
    });

    if (!trade || trade.userId !== userId) {
      return NextResponse.json({ error: 'Trade not found' }, { status: 404 });
    }

    await prisma.trade.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Trade deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete trade' }, { status: 500 });
  }
}
