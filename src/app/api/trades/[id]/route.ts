import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { apiResponse } from '@/lib/api-response';
import { TradeUpdateSchema } from '@/lib/validation';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = request.headers.get('x-user-id') || 'demo-user';

    if (!prisma) {
      return apiResponse.unavailable();
    }

    const trade = await prisma.trade.findUnique({
      where: { id },
      include: {
        screenshots: true,
        voiceNotes: true,
      },
    });

    if (!trade || trade.userId !== userId) {
      return apiResponse.notFound('Trade not found');
    }

    return apiResponse.success(trade);
  } catch (_error) {
    return apiResponse.serverError('Failed to fetch trade');
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

    const validation = TradeUpdateSchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      return apiResponse.validationError(errors);
    }

    if (!prisma) {
      return apiResponse.unavailable();
    }

    const trade = await prisma.trade.findUnique({ where: { id } });
    if (!trade || trade.userId !== userId) {
      return apiResponse.notFound('Trade not found');
    }

    const data = validation.data;
    const updatedTrade = await prisma.trade.update({
      where: { id },
      data: {
        ...(data.pair && { pair: data.pair }),
        ...(data.direction && { direction: data.direction }),
        ...(data.entryPrice !== undefined && { entryPrice: data.entryPrice }),
        ...(data.exitPrice !== undefined && { exitPrice: data.exitPrice }),
        ...(data.entryTime && { entryTime: new Date(data.entryTime) }),
        ...(data.exitTime && { exitTime: new Date(data.exitTime) }),
        ...(data.volume !== undefined && { volume: data.volume }),
        ...(data.stopLoss !== undefined && { stopLoss: data.stopLoss }),
        ...(data.takeProfit !== undefined && { takeProfit: data.takeProfit }),
        ...(data.riskAmount !== undefined && { riskAmount: data.riskAmount }),
        ...(data.riskPercent !== undefined && { riskPercent: data.riskPercent }),
        ...(data.riskRewardRatio !== undefined && { riskRewardRatio: data.riskRewardRatio }),
        ...(data.account && { account: data.account }),
        ...(data.broker && { broker: data.broker }),
        ...(data.accountBalance !== undefined && { accountBalance: data.accountBalance }),
        ...(data.accountEquity !== undefined && { accountEquity: data.accountEquity }),
        ...(data.profitLoss !== undefined && { profitLoss: data.profitLoss }),
        ...(data.profitLossPercent !== undefined && { profitLossPercent: data.profitLossPercent }),
        ...(data.outcome && { outcome: data.outcome }),
        ...(data.strategy && { strategy: data.strategy }),
        ...(data.emotionalState && { emotionalState: data.emotionalState }),
        ...(data.setupQuality !== undefined && { setupQuality: data.setupQuality }),
        ...(data.notes && { notes: data.notes }),
        ...(data.whatLearned && { whatLearned: data.whatLearned }),
      },
      include: {
        screenshots: true,
        voiceNotes: true,
      },
    });

    return apiResponse.success(updatedTrade);
  } catch (_error) {
    return apiResponse.serverError('Failed to update trade');
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
      return apiResponse.unavailable();
    }

    const trade = await prisma.trade.findUnique({ where: { id } });
    if (!trade || trade.userId !== userId) {
      return apiResponse.notFound('Trade not found');
    }

    await prisma.trade.delete({ where: { id } });
    return apiResponse.success({ message: 'Trade deleted' });
  } catch (_error) {
    return apiResponse.serverError('Failed to delete trade');
  }
}
