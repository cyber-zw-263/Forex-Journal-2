import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all strategies for a user
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id') || 'demo-user';

    const strategies = await prisma.strategy.findMany({
      where: { userId },
      include: {
        entryModels: true,
        timeframeSequences: {
          include: {
            steps: {
              orderBy: { orderIndex: 'asc' }
            }
          }
        },
        rules: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(strategies);
  } catch (error) {
    console.error('Error fetching strategies:', error);
    return NextResponse.json({ error: 'Failed to fetch strategies' }, { status: 500 });
  }
}

// POST create new strategy
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id') || 'demo-user';
    const body = await request.json();

    const {
      name,
      description,
      marketType,
      preferredSessions,
      riskPhilosophy
    } = body;

    if (!name) {
      return NextResponse.json({ error: 'Strategy name is required' }, { status: 400 });
    }

    const strategy = await prisma.strategy.create({
      data: {
        userId,
        name,
        description: description || null,
        marketType: marketType || 'mixed',
        preferredSessions: preferredSessions ? JSON.stringify(preferredSessions) : null,
        riskPhilosophy: riskPhilosophy || null,
        status: 'active'
      },
      include: {
        entryModels: true,
        timeframeSequences: true,
        rules: true
      }
    });

    return NextResponse.json(strategy, { status: 201 });
  } catch (error) {
    console.error('Error creating strategy:', error);
    return NextResponse.json({ error: 'Failed to create strategy' }, { status: 500 });
  }
}
