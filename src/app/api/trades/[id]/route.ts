import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = request.headers.get('x-user-id') || 'demo-user';

    if (!prisma) {
      return NextResponse.json({ error: 'Prisma not available' }, { status: 503 });
    }

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

    // Basic validation for allowed fields
    if (body.entryPrice !== undefined && body.entryPrice !== null && isNaN(Number(body.entryPrice))) {
      return NextResponse.json({ error: 'entryPrice must be a number' }, { status: 400 });
    }

    if (!prisma) {
      return NextResponse.json({ error: 'Prisma not available' }, { status: 503 });
    }

    const trade = await prisma.trade.findUnique({
      where: { id },
    });

    if (!trade || trade.userId !== userId) {
      return NextResponse.json({ error: 'Trade not found' }, { status: 404 });
    }

    const t = trade as unknown as Record<string, unknown>;

    const parseNumber = (v: unknown) => {
      if (v === undefined || v === null || v === '') return undefined;
      const n = parseFloat(String(v));
      return isNaN(n) ? undefined : n;
    };

    const parseInteger = (v: unknown) => {
      if (v === undefined || v === null || v === '') return undefined;
      const n = parseInt(String(v), 10);
      return isNaN(n) ? undefined : n;
    };

    const parseDate = (v: unknown) => {
      if (!v) return undefined;
      const d = new Date(String(v));
      return isNaN(d.getTime()) ? undefined : d;
    };

    const updatedTrade = await prisma.trade.update({
      where: { id },
      data: {
        pair: body.pair ?? (t.pair as string | undefined),
        direction: body.direction ?? (t.direction as string | undefined),
        entryPrice: parseNumber(body.entryPrice) ?? (t.entryPrice as number | undefined),
        exitPrice: parseNumber(body.exitPrice) ?? (t.exitPrice as number | null | undefined),
        entryTime: parseDate(body.entryTime) ?? (t.entryTime as Date | string | undefined),
        exitTime: parseDate(body.exitTime) ?? (t.exitTime as Date | string | null | undefined),
        volume: parseNumber(body.volume) ?? (t.volume as number | undefined),
        stopLoss: parseNumber(body.stopLoss) ?? (t.stopLoss as number | null | undefined),
        takeProfit: parseNumber(body.takeProfit) ?? (t.takeProfit as number | null | undefined),
        riskAmount: parseNumber(body.riskAmount) ?? (t.riskAmount as number | null | undefined),
        riskPercent: parseNumber(body.riskPercent) ?? (t.riskPercent as number | null | undefined),
        riskRewardRatio: parseNumber(body.riskRewardRatio) ?? (t.riskRewardRatio as number | null | undefined),
        account: body.account ?? (t.account as string | undefined),
        broker: body.broker ?? (t.broker as string | undefined),
        accountBalance: parseNumber(body.accountBalance) ?? (t.accountBalance as number | null | undefined),
        accountEquity: parseNumber(body.accountEquity) ?? (t.accountEquity as number | null | undefined),
        profitLoss: (body.profitLoss !== undefined && body.profitLoss !== null) ? parseNumber(body.profitLoss) ?? (t.profitLoss as number | null | undefined) : (t.profitLoss as number | null | undefined),
        profitLossPercent: parseNumber(body.profitLossPercent) ?? (t.profitLossPercent as number | null | undefined),
        outcome: body.outcome ?? (t.outcome as string | undefined),
        status: body.status ?? (t.status as string | undefined),
        strategy: body.strategy ?? (t.strategy as string | undefined),
        setupType: body.setupType ?? (t.setupType as string | undefined),
        notes: body.notes ?? (t.notes as string | undefined),
        emotionalState: body.emotionalState ?? (t.emotionalState as string | undefined),
        setupQuality: parseInteger(body.setupQuality) ?? (t.setupQuality as number | null | undefined),
        whatLearned: body.whatLearned ?? (t.whatLearned as string | undefined),
        mistakes: body.mistakes ? JSON.stringify(body.mistakes) : (t.mistakes as string | null | undefined),
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

    if (!prisma) {
      return NextResponse.json({ error: 'Prisma not available' }, { status: 503 });
    }

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
