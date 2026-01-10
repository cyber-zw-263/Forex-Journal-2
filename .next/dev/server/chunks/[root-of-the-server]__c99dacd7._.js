module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/api-response.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiResponse",
    ()=>apiResponse
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
const apiResponse = {
    success: (data, pagination, status = 200)=>{
        const response = {
            success: true,
            data
        };
        if (pagination) {
            response.pagination = {
                ...pagination,
                totalPages: Math.ceil(pagination.total / pagination.limit)
            };
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(response, {
            status
        });
    },
    error: (code, message, details, status = 400)=>{
        const response = {
            success: false,
            error: {
                code,
                message,
                details
            }
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(response, {
            status
        });
    },
    validationError: (details)=>{
        return apiResponse.error('VALIDATION_ERROR', 'Invalid input', details, 400);
    },
    notFound: (message = 'Resource not found')=>{
        return apiResponse.error('NOT_FOUND', message, undefined, 404);
    },
    unauthorized: ()=>{
        return apiResponse.error('UNAUTHORIZED', 'Unauthorized', undefined, 401);
    },
    forbidden: ()=>{
        return apiResponse.error('FORBIDDEN', 'Access denied', undefined, 403);
    },
    serverError: (message = 'Internal server error', details)=>{
        return apiResponse.error('SERVER_ERROR', message, details, 500);
    },
    unavailable: ()=>{
        return apiResponse.error('SERVICE_UNAVAILABLE', 'Database service unavailable. Using demo data.', undefined, 503);
    }
};
}),
"[project]/src/lib/validation.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DailyGoalSchema",
    ()=>DailyGoalSchema,
    "PaginationSchema",
    ()=>PaginationSchema,
    "ScreenshotSchema",
    ()=>ScreenshotSchema,
    "TradeInputSchema",
    ()=>TradeInputSchema,
    "TradeUpdateSchema",
    ()=>TradeUpdateSchema,
    "VoiceNoteSchema",
    ()=>VoiceNoteSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
;
const TradeInputSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    pair: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'Pair is required'),
    direction: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'LONG',
        'SHORT'
    ]),
    entryPrice: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().positive('Entry price must be positive'),
    exitPrice: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().positive().optional().nullable(),
    entryTime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].date()),
    exitTime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].date()).optional().nullable(),
    outcome: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'WIN',
        'LOSS',
        'BREAKEVEN',
        'OPEN'
    ]).optional(),
    profitLoss: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional().nullable(),
    profitLossPercent: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional().nullable(),
    volume: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional().nullable(),
    stopLoss: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional().nullable(),
    takeProfit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional().nullable(),
    riskAmount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional().nullable(),
    riskPercent: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional().nullable(),
    riskRewardRatio: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional().nullable(),
    account: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    broker: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    accountBalance: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional().nullable(),
    accountEquity: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional().nullable(),
    emotionalState: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    strategy: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    setupQuality: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().min(1).max(10).optional(),
    notes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    whatLearned: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    mistakes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
});
const TradeUpdateSchema = TradeInputSchema.partial();
const PaginationSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    page: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().positive().default(1),
    limit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().positive().default(50),
    offset: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().nonnegative().optional()
});
const DailyGoalSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    date: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    goals: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).default([]),
    notes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
});
const VoiceNoteSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    tradeId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().nullable(),
    duration: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional(),
    transcript: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().nullable()
});
const ScreenshotSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    tradeId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().nullable(),
    caption: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().nullable()
});
}),
"[project]/src/lib/advanced-analytics-calculations.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateDecisionQuality",
    ()=>calculateDecisionQuality,
    "calculateDecisionScore",
    ()=>calculateDecisionScore,
    "calculateEmotionalCost",
    ()=>calculateEmotionalCost,
    "calculateExecutionQuality",
    ()=>calculateExecutionQuality,
    "updateTradeAnalytics",
    ()=>updateTradeAnalytics
]);
function calculateDecisionQuality(trade) {
    let score = 0;
    const factors = {
        setupQuality: 0,
        timingQuality: 0,
        riskManagement: 0,
        strategyAlignment: 0,
        marketConditionMatch: 0
    };
    const mistakes = [];
    const strengths = [];
    const learningPoints = [];
    const recommendations = [];
    // Setup Quality (0-10)
    if (trade.setupQuality) {
        factors.setupQuality = Math.max(0, Math.min(10, trade.setupQuality));
    } else {
        // Infer from trade characteristics
        factors.setupQuality = 6; // Default neutral
        if (trade.riskRewardRatio && trade.riskRewardRatio >= 2) {
            factors.setupQuality += 2;
            strengths.push('Good risk-reward ratio');
        }
        if (trade.stopLoss && trade.takeProfit) {
            factors.setupQuality += 1;
            strengths.push('Clear stop and target levels');
        }
    }
    // Timing Quality (0-10)
    factors.timingQuality = 7; // Default good timing
    if (trade.holdingTimeMinutes) {
        if (trade.holdingTimeMinutes < 5) {
            factors.timingQuality -= 2;
            mistakes.push('Very short holding time');
            learningPoints.push('Allow trades more time to develop');
        } else if (trade.holdingTimeMinutes > 480) {
            factors.timingQuality -= 1;
            mistakes.push('Very long holding time');
            learningPoints.push('Consider taking profits earlier');
        }
    }
    // Risk Management (0-10)
    factors.riskManagement = 5; // Default
    if (trade.stopLoss) {
        factors.riskManagement += 2;
        strengths.push('Stop loss in place');
    } else {
        factors.riskManagement -= 3;
        mistakes.push('No stop loss');
        learningPoints.push('Always use stop losses');
        recommendations.push('Implement mandatory stop loss policy');
    }
    if (trade.riskRewardRatio) {
        if (trade.riskRewardRatio >= 2) {
            factors.riskManagement += 2;
            strengths.push('Favorable risk-reward ratio');
        } else if (trade.riskRewardRatio < 1) {
            factors.riskManagement -= 2;
            mistakes.push('Poor risk-reward ratio');
            learningPoints.push('Only take trades with RR >= 2:1');
        }
    }
    // Strategy Alignment (0-10)
    factors.strategyAlignment = trade.strategyId ? 8 : 4;
    if (trade.strategyId) {
        strengths.push('Strategy-based trade');
    } else {
        mistakes.push('No strategy specified');
        learningPoints.push('Always trade with a defined strategy');
        recommendations.push('Create and follow trading strategies');
    }
    // Market Condition Match (0-10)
    factors.marketConditionMatch = trade.marketConditionId ? 8 : 5;
    if (trade.marketConditionId) {
        strengths.push('Market conditions considered');
    }
    // Calculate overall score
    score = Math.round(factors.setupQuality * 0.25 + factors.timingQuality * 0.20 + factors.riskManagement * 0.25 + factors.strategyAlignment * 0.15 + factors.marketConditionMatch * 0.15);
    return {
        score,
        factors,
        mistakes,
        strengths,
        learningPoints,
        recommendations
    };
}
function calculateExecutionQuality(trade) {
    const factors = {
        entryPrecision: 7,
        stopPlacement: 5,
        positionSizing: 6,
        exitDiscipline: 6,
        emotionalControl: 7
    };
    // Entry Precision
    if (trade.profitLoss !== undefined && trade.profitLoss !== null) {
        // Better entry if profitable
        factors.entryPrecision = trade.profitLoss > 0 ? 8 : 6;
    }
    // Stop Placement
    if (trade.stopLoss) {
        factors.stopPlacement = 8;
    } else {
        factors.stopPlacement = 2;
    }
    // Position Sizing
    if (trade.volume) {
        // Assume reasonable sizing if volume is provided
        factors.positionSizing = Math.min(10, Math.max(4, trade.volume * 10));
    }
    // Exit Discipline
    if (trade.takeProfit && trade.exitPrice) {
        factors.exitDiscipline = 8;
    } else if (trade.outcome === 'profit') {
        factors.exitDiscipline = 7;
    } else {
        factors.exitDiscipline = 5;
    }
    // Emotional Control (inferred)
    if (trade.emotionalDrift) {
        const drift = trade.emotionalDrift;
        if (drift.confidenceChange < -20 || drift.stressChange > 30) {
            factors.emotionalControl = 3;
        } else if (drift.confidenceChange < -10 || drift.stressChange > 15) {
            factors.emotionalControl = 5;
        } else {
            factors.emotionalControl = 8;
        }
    }
    const score = Math.round(factors.entryPrecision * 0.20 + factors.stopPlacement * 0.20 + factors.positionSizing * 0.15 + factors.exitDiscipline * 0.25 + factors.emotionalControl * 0.20);
    return {
        score,
        factors
    };
}
function calculateEmotionalCost(trade) {
    let emotionalCostScore = 0;
    let stressAccumulation = 0;
    let decisionQualityImpact = 0;
    let futurePerformanceImpact = 0;
    let recoveryTimeMinutes = 0;
    if (trade.emotionalDrift) {
        const drift = trade.emotionalDrift;
        // Base emotional cost on confidence and stress changes
        const confidenceImpact = Math.abs(drift.confidenceChange || 0);
        const stressImpact = Math.abs(drift.stressChange || 0);
        const focusImpact = Math.abs(drift.focusChange || 0);
        const energyImpact = Math.abs(drift.energyChange || 0);
        emotionalCostScore = Math.round(confidenceImpact * 0.3 + stressImpact * 0.3 + focusImpact * 0.2 + energyImpact * 0.2);
        stressAccumulation = Math.max(0, (drift.stressChange || 0) + (drift.energyChange || 0) * 0.5);
        decisionQualityImpact = Math.max(0, -1 * (drift.confidenceChange || 0) * 0.8);
        futurePerformanceImpact = Math.max(0, emotionalCostScore * 0.6);
        // Recovery time based on emotional cost
        if (emotionalCostScore > 50) {
            recoveryTimeMinutes = 480; // 8 hours
        } else if (emotionalCostScore > 25) {
            recoveryTimeMinutes = 180; // 3 hours
        } else {
            recoveryTimeMinutes = 30; // 30 minutes
        }
    } else {
        // Default values for trades without emotional drift data
        emotionalCostScore = trade.profitLoss && trade.profitLoss < 0 ? 25 : 10;
        stressAccumulation = trade.profitLoss && trade.profitLoss < 0 ? 20 : 5;
        decisionQualityImpact = trade.profitLoss && trade.profitLoss < 0 ? 15 : 5;
        futurePerformanceImpact = emotionalCostScore * 0.5;
        recoveryTimeMinutes = 60;
    }
    return {
        emotionalCostScore,
        stressAccumulation,
        decisionQualityImpact,
        futurePerformanceImpact,
        recoveryTimeMinutes
    };
}
function calculateDecisionScore(trade) {
    const decisionQuality = calculateDecisionQuality(trade);
    const executionQuality = calculateExecutionQuality(trade);
    // Weight decision quality more heavily than execution
    return Math.round(decisionQuality.score * 0.6 + executionQuality.score * 0.4);
}
async function updateTradeAnalytics(prisma, tradeId) {
    const trade = await prisma.trade.findUnique({
        where: {
            id: tradeId
        },
        include: {
            strategy: true,
            marketCondition: true,
            emotionalState: true
        }
    });
    if (!trade) {
        throw new Error(`Trade ${tradeId} not found`);
    }
    const decisionQuality = calculateDecisionQuality(trade);
    const executionQuality = calculateExecutionQuality(trade);
    const emotionalCost = calculateEmotionalCost(trade);
    const decisionScore = calculateDecisionScore(trade);
    // Update trade with calculated values
    await prisma.trade.update({
        where: {
            id: tradeId
        },
        data: {
            decisionScore,
            decisionQuality: {
                decisionQualityScore: decisionQuality.score,
                executionQualityScore: executionQuality.score,
                overallScore: decisionScore,
                decisionFactors: decisionQuality.factors,
                executionFactors: executionQuality.factors,
                mistakes: decisionQuality.mistakes,
                strengths: decisionQuality.strengths,
                learningPoints: decisionQuality.learningPoints,
                recommendations: decisionQuality.recommendations
            },
            emotionalCost: {
                emotionalCostScore: emotionalCost.emotionalCostScore,
                stressAccumulation: emotionalCost.stressAccumulation,
                decisionQualityImpact: emotionalCost.decisionQualityImpact,
                futurePerformanceImpact: emotionalCost.futurePerformanceImpact,
                recoveryTimeMinutes: emotionalCost.recoveryTimeMinutes,
                emotionalDrift: trade.emotionalDrift,
                behavioralImpacts: {},
                physiologicalCosts: {},
                opportunityCosts: {},
                longTermEffects: {}
            }
        }
    });
    // Create or update decision quality record
    await prisma.decisionQuality.upsert({
        where: {
            tradeId
        },
        update: {
            decisionQualityScore: decisionQuality.score,
            executionQualityScore: executionQuality.score,
            overallScore: decisionScore,
            decisionFactors: decisionQuality.factors,
            executionFactors: executionQuality.factors,
            mistakes: decisionQuality.mistakes,
            strengths: decisionQuality.strengths,
            learningPoints: decisionQuality.learningPoints,
            recommendations: decisionQuality.recommendations
        },
        create: {
            id: `dq-${tradeId}`,
            tradeId,
            timestamp: new Date(),
            decisionQualityScore: decisionQuality.score,
            executionQualityScore: executionQuality.score,
            overallScore: decisionScore,
            decisionFactors: decisionQuality.factors,
            executionFactors: executionQuality.factors,
            mistakes: decisionQuality.mistakes,
            strengths: decisionQuality.strengths,
            learningPoints: decisionQuality.learningPoints,
            recommendations: decisionQuality.recommendations
        }
    });
    // Create or update emotional cost record
    await prisma.emotionalCost.upsert({
        where: {
            tradeId
        },
        update: {
            emotionalCostScore: emotionalCost.emotionalCostScore,
            stressAccumulation: emotionalCost.stressAccumulation,
            decisionQualityImpact: emotionalCost.decisionQualityImpact,
            futurePerformanceImpact: emotionalCost.futurePerformanceImpact,
            recoveryTimeMinutes: emotionalCost.recoveryTimeMinutes,
            emotionalDrift: trade.emotionalDrift
        },
        create: {
            id: `ec-${tradeId}`,
            tradeId,
            timestamp: new Date(),
            emotionalCostScore: emotionalCost.emotionalCostScore,
            stressAccumulation: emotionalCost.stressAccumulation,
            decisionQualityImpact: emotionalCost.decisionQualityImpact,
            futurePerformanceImpact: emotionalCost.futurePerformanceImpact,
            recoveryTimeMinutes: emotionalCost.recoveryTimeMinutes,
            emotionalDrift: trade.emotionalDrift,
            behavioralImpacts: {},
            physiologicalCosts: {},
            opportunityCosts: {},
            longTermEffects: {}
        }
    });
}
}),
"[project]/src/app/api/trades/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api-response.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/validation.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$advanced$2d$analytics$2d$calculations$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/advanced-analytics-calculations.ts [app-route] (ecmascript)");
;
;
;
;
;
;
let prisma = null;
try {
    prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]();
} catch (e) {
    console.warn('Prisma client failed to initialize', e);
    prisma = null;
}
function loadDemoTrades() {
    const possible = [
        __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'data', 'demo-trades.json'),
        __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'src', 'data', 'demo-trades.json'),
        __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'public', 'data', 'demo-trades.json')
    ];
    for (const p of possible){
        try {
            const raw = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["readFileSync"])(p, 'utf-8');
            return JSON.parse(raw);
        } catch (_e) {
        // try next
        }
    }
    console.error('Failed to load demo trades file from known locations');
    return [];
}
async function GET(request) {
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
        const where = {
            userId
        };
        if (pair) where.pair = pair;
        if (outcome) where.outcome = outcome;
        if (account) where.account = account;
        if (strategy) where.strategy = strategy;
        if (search) {
            where.OR = [
                {
                    pair: {
                        contains: search,
                        mode: 'insensitive'
                    }
                },
                {
                    notes: {
                        contains: search,
                        mode: 'insensitive'
                    }
                },
                {
                    strategy: {
                        contains: search,
                        mode: 'insensitive'
                    }
                }
            ];
        }
        if (startDate || endDate) {
            const dateRange = {};
            if (startDate) dateRange.gte = new Date(startDate);
            if (endDate) dateRange.lte = new Date(endDate);
            where.entryTime = dateRange;
        }
        if (!prisma) {
            const demoAll = loadDemoTrades();
            const filtered = demoAll.filter((t)=>t.userId === userId || !t.userId);
            const total = filtered.length;
            const demo = filtered.slice(skip, skip + limit);
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiResponse"].success(demo, {
                page,
                limit,
                total
            });
        }
        const [trades, total] = await Promise.all([
            prisma.trade.findMany({
                where,
                orderBy: {
                    entryTime: 'desc'
                },
                skip,
                take: limit,
                include: {
                    screenshots: true,
                    voiceNotes: true
                }
            }),
            prisma.trade.count({
                where
            })
        ]);
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiResponse"].success(trades, {
            page,
            limit,
            total
        });
    } catch (error) {
        console.error('Error fetching trades:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiResponse"].serverError('Failed to fetch trades');
    }
}
async function POST(request) {
    try {
        const userId = request.headers.get('x-user-id') || 'demo-user';
        const body = await request.json();
        // Validate input with Zod
        const validation = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TradeInputSchema"].safeParse(body);
        if (!validation.success) {
            const errors = validation.error.flatten().fieldErrors;
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiResponse"].validationError(errors);
        }
        const data = validation.data;
        if (!prisma) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiResponse"].unavailable();
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
                mistakes: data.mistakes ?? null
            },
            include: {
                screenshots: true,
                voiceNotes: true
            }
        });
        // Calculate and update advanced analytics
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$advanced$2d$analytics$2d$calculations$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateTradeAnalytics"])(prisma, trade.id);
        } catch (analyticsError) {
            console.warn('Failed to calculate trade analytics:', analyticsError);
        // Don't fail the trade creation if analytics calculation fails
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiResponse"].success(trade, undefined, 201);
    } catch (error) {
        console.error('Error creating trade:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiResponse"].serverError('Failed to create trade');
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c99dacd7._.js.map