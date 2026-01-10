import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all rules for a strategy
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

    // Verify strategy belongs to user
    const strategy = await prisma.strategy.findFirst({
      where: { id, userId }
    });

    if (!strategy) {
      return NextResponse.json({ error: 'Strategy not found' }, { status: 404 });
    }

    const rules = await prisma.strategyRule.findMany({
      where: { strategyId: id },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(rules);
  } catch (error) {
    console.error('Error fetching strategy rules:', error);
    return NextResponse.json({ error: 'Failed to fetch strategy rules' }, { status: 500 });
  }
}

// POST create new rule
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

    // Verify strategy belongs to user
    const strategy = await prisma.strategy.findFirst({
      where: { id, userId }
    });

    if (!strategy) {
      return NextResponse.json({ error: 'Strategy not found' }, { status: 404 });
    }

    const { ruleName, description, isMandatory, weight } = body;

    if (!ruleName) {
      return NextResponse.json({ error: 'Rule name is required' }, { status: 400 });
    }

    const rule = await prisma.strategyRule.create({
      data: {
        strategyId: id,
        ruleName,
        description: description || null,
        isMandatory: isMandatory !== undefined ? isMandatory : true,
        weight: weight || 1
      }
    });

    return NextResponse.json(rule, { status: 201 });
  } catch (error) {
    console.error('Error creating strategy rule:', error);
    return NextResponse.json({ error: 'Failed to create strategy rule' }, { status: 500 });
  }
}