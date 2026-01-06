import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id') || 'demo-user';
    const { searchParams } = new URL(request.url);
    const pair = searchParams.get('pair');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const outcome = searchParams.get('outcome');

    const where: any = { userId };

    if (pair) where.pair = pair;
    if (outcome) where.outcome = outcome;
    if (startDate || endDate) {
      where.entryTime = {};
      if (startDate) where.entryTime.gte = new Date(startDate);
      if (endDate) where.entryTime.lte = new Date(endDate);
    }

    const trades = await prisma.trade.findMany({
      where,
      orderBy: { entryTime: 'desc' },
      include: {
        screenshots: true,
        voiceNotes: true,
      },
    });

    return NextResponse.json(trades);
  } catch (error) {
    console.error('Error fetching trades:', error);
    return NextResponse.json({ error: 'Failed to fetch trades' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id') || 'demo-user';
    const body = await request.json();

    const trade = await prisma.trade.create({
      data: {
        userId,
        pair: body.pair,
        direction: body.direction,
        entryPrice: parseFloat(body.entryPrice),
        exitPrice: body.exitPrice ? parseFloat(body.exitPrice) : null,
        entryTime: new Date(body.entryTime),
        exitTime: body.exitTime ? new Date(body.exitTime) : null,
        quantity: parseFloat(body.quantity),
        profitLoss: body.profitLoss ? parseFloat(body.profitLoss) : null,
        profitLossPercent: body.profitLossPercent ? parseFloat(body.profitLossPercent) : null,
        outcome: body.outcome,
        notes: body.notes,
        strategy: body.strategy,
        emotionalState: body.emotionalState,
        setupQuality: body.setupQuality ? parseInt(body.setupQuality) : null,
        whatLearned: body.whatLearned,
        mistakes: body.mistakes ? JSON.stringify(body.mistakes) : null,
        riskRewardRatio: body.riskRewardRatio ? parseFloat(body.riskRewardRatio) : null,
      },
      include: {
        screenshots: true,
        voiceNotes: true,
      },
    });

    return NextResponse.json(trade, { status: 201 });
  } catch (error) {
    console.error('Error creating trade:', error);
    return NextResponse.json({ error: 'Failed to create trade' }, { status: 500 });
  }
}
