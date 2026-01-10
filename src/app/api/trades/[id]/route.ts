import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { apiResponse } from '@/lib/api-response';
import { TradeUpdateSchema } from '@/lib/validation';
import { updateTradeAnalytics } from '@/lib/advanced-analytics-calculations';

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
    const updateData: Record<string, unknown> = {};
    
    if (data.pair) updateData.pair = data.pair;
    if (data.direction) updateData.direction = data.direction;
    if (data.entryPrice !== undefined) updateData.entryPrice = data.entryPrice;
    if (data.exitPrice !== undefined) updateData.exitPrice = data.exitPrice;
    if (data.entryTime) updateData.entryTime = new Date(data.entryTime);
    if (data.exitTime) updateData.exitTime = new Date(data.exitTime);
    if (data.volume !== undefined) updateData.volume = data.volume;
    if (data.stopLoss !== undefined) updateData.stopLoss = data.stopLoss;
    if (data.takeProfit !== undefined) updateData.takeProfit = data.takeProfit;
    if (data.riskAmount !== undefined) updateData.riskAmount = data.riskAmount;
    if (data.riskPercent !== undefined) updateData.riskPercent = data.riskPercent;
    if (data.riskRewardRatio !== undefined) updateData.riskRewardRatio = data.riskRewardRatio;
    if (data.account) updateData.account = data.account;
    if (data.broker) updateData.broker = data.broker;
    if (data.accountBalance !== undefined) updateData.accountBalance = data.accountBalance;
    if (data.accountEquity !== undefined) updateData.accountEquity = data.accountEquity;
    if (data.profitLoss !== undefined) updateData.profitLoss = data.profitLoss;
    if (data.profitLossPercent !== undefined) updateData.profitLossPercent = data.profitLossPercent;
    if (data.outcome) updateData.outcome = data.outcome;
    if (data.strategy) updateData.strategy = data.strategy;
    if (data.emotionalState) updateData.emotionalState = data.emotionalState;
    if (data.setupQuality !== undefined) updateData.setupQuality = data.setupQuality;
    if (data.notes) updateData.notes = data.notes;
    if (data.whatLearned) updateData.whatLearned = data.whatLearned;

    const updatedTrade = await prisma.trade.update({
      where: { id },
      data: updateData as Parameters<typeof prisma.trade.update>[0]['data'],
      include: {
        screenshots: true,
        voiceNotes: true,
      },
    });

    // Calculate and update advanced analytics
    try {
      await updateTradeAnalytics(prisma, id);
    } catch (analyticsError) {
      console.warn('Failed to calculate trade analytics:', analyticsError);
      // Don't fail the trade update if analytics calculation fails
    }

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
