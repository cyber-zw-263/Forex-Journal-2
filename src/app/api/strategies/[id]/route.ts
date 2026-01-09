import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET single strategy by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = request.headers.get('x-user-id') || 'demo-user';
    const { id } = params;

    const strategy = await prisma.strategy.findFirst({
      where: {
        id,
        userId
      },
      include: {
        entryModels: true,
        timeframeSequences: {
          include: {
            steps: {
              orderBy: { orderIndex: 'asc' }
            }
          }
        },
        rules: true,
        trades: {
          take: 10,
          orderBy: { entryTime: 'desc' }
        }
      }
    });

    if (!strategy) {
      return NextResponse.json({ error: 'Strategy not found' }, { status: 404 });
    }

    return NextResponse.json(strategy);
  } catch (error) {
    console.error('Error fetching strategy:', error);
    return NextResponse.json({ error: 'Failed to fetch strategy' }, { status: 500 });
  }
}

// PATCH update strategy
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = request.headers.get('x-user-id') || 'demo-user';
    const { id } = params;
    const body = await request.json();

    const strategy = await prisma.strategy.findFirst({
      where: { id, userId }
    });

    if (!strategy) {
      return NextResponse.json({ error: 'Strategy not found' }, { status: 404 });
    }

    const updated = await prisma.strategy.update({
      where: { id },
      data: {
        name: body.name || strategy.name,
        description: body.description !== undefined ? body.description : strategy.description,
        marketType: body.marketType || strategy.marketType,
        preferredSessions: body.preferredSessions ? JSON.stringify(body.preferredSessions) : strategy.preferredSessions,
        riskPhilosophy: body.riskPhilosophy !== undefined ? body.riskPhilosophy : strategy.riskPhilosophy,
        status: body.status || strategy.status
      },
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
      }
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating strategy:', error);
    return NextResponse.json({ error: 'Failed to update strategy' }, { status: 500 });
  }
}

// DELETE strategy
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = request.headers.get('x-user-id') || 'demo-user';
    const { id } = params;

    const strategy = await prisma.strategy.findFirst({
      where: { id, userId }
    });

    if (!strategy) {
      return NextResponse.json({ error: 'Strategy not found' }, { status: 404 });
    }

    await prisma.strategy.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting strategy:', error);
    return NextResponse.json({ error: 'Failed to delete strategy' }, { status: 500 });
  }
}
