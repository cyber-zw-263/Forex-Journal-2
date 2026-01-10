import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET reflection for a trade
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

    // Get reflection
    const reflection = await prisma.tradeReflection.findUnique({
      where: { tradeId: id }
    });

    if (!reflection) {
      return NextResponse.json({ error: 'Reflection not found' }, { status: 404 });
    }

    return NextResponse.json(reflection);
  } catch (error) {
    console.error('Error fetching trade reflection:', error);
    return NextResponse.json({ error: 'Failed to fetch trade reflection' }, { status: 500 });
  }
}

// POST create/update reflection for a trade
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

    const {
      followedPlan,
      rulesRespected,
      emotionalSummary,
      behavioralOutcomes,
      whatWentRight,
      whatWentWrong,
      lessonLearned,
      ruleToReinforce
    } = body;

    // Verify trade belongs to user
    const trade = await prisma.trade.findFirst({
      where: { id, userId }
    });

    if (!trade) {
      return NextResponse.json({ error: 'Trade not found' }, { status: 404 });
    }

    // Create or update reflection
    const reflection = await prisma.tradeReflection.upsert({
      where: { tradeId: id },
      update: {
        followedPlan,
        rulesRespected,
        emotionalSummary: emotionalSummary ? JSON.stringify(emotionalSummary) : null,
        behavioralOutcomes: behavioralOutcomes ? JSON.stringify(behavioralOutcomes) : null,
        whatWentRight,
        whatWentWrong,
        lessonLearned,
        ruleToReinforce,
        updatedAt: new Date()
      },
      create: {
        tradeId: id,
        followedPlan,
        rulesRespected,
        emotionalSummary: emotionalSummary ? JSON.stringify(emotionalSummary) : null,
        behavioralOutcomes: behavioralOutcomes ? JSON.stringify(behavioralOutcomes) : null,
        whatWentRight,
        whatWentWrong,
        lessonLearned,
        ruleToReinforce
      }
    });

    return NextResponse.json(reflection, { status: 201 });
  } catch (error) {
    console.error('Error saving trade reflection:', error);
    return NextResponse.json({ error: 'Failed to save trade reflection' }, { status: 500 });
  }
}