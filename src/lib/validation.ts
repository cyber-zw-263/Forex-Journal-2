import { z } from 'zod';

// Trade schemas
export const TradeInputSchema = z.object({
  pair: z.string().min(1, 'Pair is required'),
  direction: z.enum(['LONG', 'SHORT']),
  entryPrice: z.number().positive('Entry price must be positive'),
  exitPrice: z.number().positive().optional().nullable(),
  entryTime: z.string().or(z.date()),
  exitTime: z.string().or(z.date()).optional().nullable(),
  outcome: z.enum(['WIN', 'LOSS', 'BREAKEVEN', 'OPEN']).optional(),
  profitLoss: z.number().optional().nullable(),
  profitLossPercent: z.number().optional().nullable(),
  volume: z.number().optional().nullable(),
  stopLoss: z.number().optional().nullable(),
  takeProfit: z.number().optional().nullable(),
  riskAmount: z.number().optional().nullable(),
  riskPercent: z.number().optional().nullable(),
  riskRewardRatio: z.number().optional().nullable(),
  account: z.string().optional(),
  broker: z.string().optional(),
  accountBalance: z.number().optional().nullable(),
  accountEquity: z.number().optional().nullable(),
  emotionalState: z.string().optional(),
  strategy: z.string().optional(),
  setupQuality: z.number().min(1).max(10).optional(),
  notes: z.string().optional(),
  whatLearned: z.string().optional(),
  mistakes: z.string().optional(),
});

export const TradeUpdateSchema = TradeInputSchema.partial();

export const PaginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().default(50),
  offset: z.number().int().nonnegative().optional(),
});

export const DailyGoalSchema = z.object({
  date: z.string(),
  goals: z.array(z.string()).default([]),
  notes: z.string().optional(),
});

export const VoiceNoteSchema = z.object({
  tradeId: z.string().optional().nullable(),
  duration: z.number().optional(),
  transcript: z.string().optional().nullable(),
});

export const ScreenshotSchema = z.object({
  tradeId: z.string().optional().nullable(),
  caption: z.string().optional().nullable(),
});

// Type exports
export type TradeInput = z.infer<typeof TradeInputSchema>;
export type TradeUpdate = z.infer<typeof TradeUpdateSchema>;
export type PaginationParams = z.infer<typeof PaginationSchema>;
export type DailyGoal = z.infer<typeof DailyGoalSchema>;
export type VoiceNote = z.infer<typeof VoiceNoteSchema>;
export type Screenshot = z.infer<typeof ScreenshotSchema>;
