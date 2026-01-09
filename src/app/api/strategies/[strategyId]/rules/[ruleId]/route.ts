import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// PATCH update rule
export async function PATCH(
  request: NextRequest,
  { params }: { params: { strategyId: string; ruleId: string } }
) {
  try {
    const userId = request.headers.get('x-user-id') || 'demo-user';
    const { strategyId, ruleId } = params;
    const body = await request.json();

    // Verify strategy belongs to user
    const strategy = await prisma.strategy.findFirst({
      where: { id: strategyId, userId }
    });

    if (!strategy) {
      return NextResponse.json({ error: 'Strategy not found' }, { status: 404 });
    }

    const rule = await prisma.strategyRule.findFirst({
      where: { id: ruleId, strategyId }
    });

    if (!rule) {
      return NextResponse.json({ error: 'Rule not found' }, { status: 404 });
    }

    const updated = await prisma.strategyRule.update({
      where: { id: ruleId },
      data: {
        ruleName: body.ruleName || rule.ruleName,
        description: body.description !== undefined ? body.description : rule.description,
        isMandatory: body.isMandatory !== undefined ? body.isMandatory : rule.isMandatory,
        weight: body.weight || rule.weight
      }
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating strategy rule:', error);
    return NextResponse.json({ error: 'Failed to update strategy rule' }, { status: 500 });
  }
}

// DELETE rule
export async function DELETE(
  request: NextRequest,
  { params }: { params: { strategyId: string; ruleId: string } }
) {
  try {
    const userId = request.headers.get('x-user-id') || 'demo-user';
    const { strategyId, ruleId } = params;

    // Verify strategy belongs to user
    const strategy = await prisma.strategy.findFirst({
      where: { id: strategyId, userId }
    });

    if (!strategy) {
      return NextResponse.json({ error: 'Strategy not found' }, { status: 404 });
    }

    const rule = await prisma.strategyRule.findFirst({
      where: { id: ruleId, strategyId }
    });

    if (!rule) {
      return NextResponse.json({ error: 'Rule not found' }, { status: 404 });
    }

    await prisma.strategyRule.delete({
      where: { id: ruleId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting strategy rule:', error);
    return NextResponse.json({ error: 'Failed to delete strategy rule' }, { status: 500 });
  }
}
