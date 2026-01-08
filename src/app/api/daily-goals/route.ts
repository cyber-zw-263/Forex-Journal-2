import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { apiResponse } from '@/lib/api-response';
import { DailyGoalSchema } from '@/lib/validation';

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id') || 'demo-user';
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    const where: Record<string, unknown> = { userId };
    if (date) {
      const targetDate = new Date(date);
      const nextDate = new Date(targetDate);
      nextDate.setDate(nextDate.getDate() + 1);
      where.date = {
        gte: targetDate,
        lt: nextDate,
      };
    }

    if (!prisma) {
      return apiResponse.success([]);
    }

    const goals = await prisma.dailyGoal.findMany({
      where,
      orderBy: { date: 'desc' },
    });

    return apiResponse.success(goals);
  } catch (error) {
    console.error('Error fetching daily goals:', error);
    return apiResponse.serverError('Failed to fetch goals');
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id') || 'demo-user';
    const body = await request.json();

    const validation = DailyGoalSchema.safeParse(body);
    if (!validation.success) {
      return apiResponse.validationError(validation.error.flatten().fieldErrors);
    }

    if (!prisma) {
      return apiResponse.success({ ...validation.data, userId }, undefined, 201);
    }

    const goal = await prisma.dailyGoal.upsert({
      where: {
        userId_date: {
          userId,
          date: new Date(validation.data.date),
        },
      },
      update: {
        goals: validation.data.goals ? JSON.stringify(validation.data.goals) : undefined,
        notes: validation.data.notes,
      },
      create: {
        userId,
        date: new Date(validation.data.date),
        goals: validation.data.goals ? JSON.stringify(validation.data.goals) : '[]',
        notes: validation.data.notes || '',
      },
    });

    return apiResponse.success(goal, undefined, 201);
  } catch (error) {
    console.error('Error creating daily goal:', error);
    return apiResponse.serverError('Failed to create goal');
  }
}
