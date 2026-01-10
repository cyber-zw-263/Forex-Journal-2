import { PrismaClient } from '@prisma/client';
import { NextRequest } from 'next/server';
import { readFileSync } from 'fs';
import path from 'path';
import { apiResponse } from '@/lib/api-response';
import { TradeInputSchema, TradeUpdateSchema, PaginationSchema } from '@/lib/validation';

let prisma: PrismaClient | null = null;
try {
  prisma = new PrismaClient();
} catch (e) {
  console.warn('Prisma client failed to initialize', e);
  prisma = null;
}

interface DemoTrade {
  id: string;
  userId?: string;
  pair: string;
  direction: string;
  entryPrice: number;
  exitPrice?: number | null;
  profitLoss?: number | null;
  outcome?: string | null;
  entryTime: string | Date;
  [key: string]: unknown;
}

function loadDemoTrades(): DemoTrade[] {
  const possible = [
    path.join(process.cwd(), 'data', 'demo-trades.json'),
    path.join(process.cwd(), 'src', 'data', 'demo-trades.json'),
    path.join(process.cwd(), 'public', 'data', 'demo-trades.json'),
  ];

  for (const p of possible) {
    try {
      const raw = readFileSync(p, 'utf-8');
      return JSON.parse(raw);
    } catch (_e) {
      // try next
    }
  }

  console.error('Failed to load demo trades file from known locations');
  return [];
}

export async function GET(request: NextRequest) {
  const userId = request.headers.get('x-user-id') || 'demo-user';

  try {
    const { searchParams } = new URL(request.url);
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;

    const pair = searchParams.get('pair');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const outcome = searchParams.get('outcome');
    const account = searchParams.get('account');
    const strategy = searchParams.get('strategy');
    const search = searchParams.get('search');

    const where: Record<string, unknown> = { userId };

    if (pair) where.pair = pair;
    if (outcome) where.outcome = outcome;
    if (account) where.account = account;
    if (strategy) where.strategy = strategy;
    if (search) {
      where.OR = [
        { pair: { contains: search, mode: 'insensitive' } },
        { notes: { contains: search, mode: 'insensitive' } },
        { strategy: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (startDate || endDate) {
      const dateRange: Record<string, Date> = {};
      if (startDate) dateRange.gte = new Date(startDate);
      if (endDate) dateRange.lte = new Date(endDate);
      where.entryTime = dateRange;
    }

    if (!prisma) {
      const demoAll = loadDemoTrades();
      const filtered = demoAll.filter((t: DemoTrade) => t.userId === userId || !t.userId);
      const total = filtered.length;
      const demo = filtered.slice(skip, skip + limit);
      return apiResponse.success(demo, { page, limit, total });
    }

    const [trades, total] = await Promise.all([
      prisma.trade.findMany({
        where,
        orderBy: { entryTime: 'desc' },
        skip,
        take: limit,
        include: {
          screenshots: true,
          voiceNotes: true,
        },
      }),
      prisma.trade.count({ where }),
    ]);

    return apiResponse.success(trades, { page, limit, total });
  } catch (error) {
    console.error('Error fetching trades:', error);
    return apiResponse.serverError('Failed to fetch trades');
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id') || 'demo-user';
    const body = await request.json();

    // Validate input with Zod
    const validation = TradeInputSchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      return apiResponse.validationError(errors);
    }

    const data = validation.data;

    if (!prisma) {
      return apiResponse.unavailable();
    }

    const trade = await prisma.trade.create({
      data: {
        userId,
        pair: data.pair,
        direction: data.direction,
        entryPrice: data.entryPrice,
        exitPrice: data.exitPrice ?? null,
        entryTime: new Date(data.entryTime),
        exitTime: data.exitTime ? new Date(data.exitTime) : null,
        volume: data.volume ?? 1.0,
        stopLoss: data.stopLoss ?? null,
        takeProfit: data.takeProfit ?? null,
        riskAmount: data.riskAmount ?? null,
        riskPercent: data.riskPercent ?? null,
        riskRewardRatio: data.riskRewardRatio ?? null,
        account: data.account ?? null,
        broker: data.broker ?? null,
        accountBalance: data.accountBalance ?? null,
        accountEquity: data.accountEquity ?? null,
        profitLoss: data.profitLoss ?? null,
        profitLossPercent: data.profitLossPercent ?? null,
        outcome: data.outcome || 'OPEN',
        strategyId: data.strategy ?? null,
        notes: data.notes ?? null,
        emotionalState: data.emotionalState ?? null,
        setupQuality: data.setupQuality ?? null,
        whatLearned: data.whatLearned ?? null,
        mistakes: data.mistakes ?? null,
      },
      include: {
        screenshots: true,
        voiceNotes: true,
      },
    });

    return apiResponse.success(trade, undefined, 201);
  } catch (error) {
    console.error('Error creating trade:', error);
    return apiResponse.serverError('Failed to create trade');
  }
}