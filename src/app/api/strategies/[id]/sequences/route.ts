import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all timeframe sequences for a strategy
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

    const sequences = await prisma.timeframeSequence.findMany({
      where: { strategyId: id },
      include: {
        steps: {
          orderBy: { orderIndex: 'asc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(sequences);
  } catch (error) {
    console.error('Error fetching timeframe sequences:', error);
    return NextResponse.json({ error: 'Failed to fetch timeframe sequences' }, { status: 500 });
  }
}

// POST create new timeframe sequence
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

    const { name, description, steps } = body;

    if (!name) {
      return NextResponse.json({ error: 'Sequence name is required' }, { status: 400 });
    }

    if (!steps || !Array.isArray(steps) || steps.length === 0) {
      return NextResponse.json({ error: 'At least one step is required' }, { status: 400 });
    }

    const sequence = await prisma.timeframeSequence.create({
      data: {
        strategyId: id,
        name,
        description: description || null,
        steps: {
          createMany: {
            data: steps.map((step: any, index: number) => ({
              orderIndex: index + 1,
              timeframe: step.timeframe,
              role: step.role,
              description: step.description || null
            }))
          }
        }
      },
      include: {
        steps: {
          orderBy: { orderIndex: 'asc' }
        }
      }
    });

    return NextResponse.json(sequence, { status: 201 });
  } catch (error) {
    console.error('Error creating timeframe sequence:', error);
    return NextResponse.json({ error: 'Failed to create timeframe sequence' }, { status: 500 });
  }
}