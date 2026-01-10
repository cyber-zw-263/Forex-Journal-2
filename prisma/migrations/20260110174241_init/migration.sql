-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trade" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "strategyId" TEXT,
    "entryModelId" TEXT,
    "timeframeSequenceId" TEXT,
    "pair" TEXT NOT NULL,
    "direction" TEXT NOT NULL,
    "entryPrice" DOUBLE PRECISION NOT NULL,
    "exitPrice" DOUBLE PRECISION,
    "entryTime" TIMESTAMP(3) NOT NULL,
    "exitTime" TIMESTAMP(3),
    "volume" DOUBLE PRECISION NOT NULL,
    "stopLoss" DOUBLE PRECISION,
    "takeProfit" DOUBLE PRECISION,
    "riskAmount" DOUBLE PRECISION,
    "riskPercent" DOUBLE PRECISION,
    "riskRewardRatio" DOUBLE PRECISION,
    "account" TEXT,
    "broker" TEXT,
    "accountBalance" DOUBLE PRECISION,
    "accountEquity" DOUBLE PRECISION,
    "profitLoss" DOUBLE PRECISION,
    "profitLossPercent" DOUBLE PRECISION,
    "outcome" TEXT,
    "status" TEXT NOT NULL DEFAULT 'open',
    "session" TEXT,
    "marketCondition" TEXT,
    "marketConditionTags" TEXT,
    "sessionOverlap" TEXT,
    "durationMinutes" INTEGER,
    "decisionScore" INTEGER,
    "decisionQuality" TEXT,
    "emotionalDrift" TEXT,
    "triggers" TEXT,
    "emotionalCost" DOUBLE PRECISION,
    "counterfactualScenarios" TEXT,
    "passiveOutcome" DOUBLE PRECISION,
    "alternativeEntries" TEXT,
    "tags" TEXT,
    "notes" TEXT,
    "emotionalState" TEXT,
    "setupQuality" INTEGER,
    "whatLearned" TEXT,
    "mistakes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Screenshot" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tradeId" TEXT,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Screenshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VoiceNote" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tradeId" TEXT,
    "url" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "transcript" TEXT,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VoiceNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyGoal" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "goals" TEXT,
    "notes" TEXT,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailyGoal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AIInsight" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AIInsight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Strategy" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "marketType" TEXT NOT NULL,
    "preferredSessions" TEXT,
    "riskPhilosophy" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "version" TEXT NOT NULL DEFAULT '1.0',
    "parentVersionId" TEXT,
    "abTestGroup" TEXT,
    "abTestName" TEXT,
    "edgeConfidenceScore" DOUBLE PRECISION,
    "perfectExecutionCount" INTEGER NOT NULL DEFAULT 0,
    "mistakeCount" INTEGER NOT NULL DEFAULT 0,
    "successDespiteMistakeCount" INTEGER NOT NULL DEFAULT 0,
    "cooldownRules" TEXT,
    "pauseUntil" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Strategy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EntryModel" (
    "id" TEXT NOT NULL,
    "strategyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "entryLogic" TEXT,
    "confirmationStyle" TEXT,
    "riskStyle" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EntryModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeframeSequence" (
    "id" TEXT NOT NULL,
    "strategyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TimeframeSequence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeframeStep" (
    "id" TEXT NOT NULL,
    "sequenceId" TEXT NOT NULL,
    "orderIndex" INTEGER NOT NULL,
    "timeframe" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "TimeframeStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TradeState" (
    "id" TEXT NOT NULL,
    "tradeId" TEXT NOT NULL,
    "state" TEXT NOT NULL DEFAULT 'planned',
    "htfBiasAligned" BOOLEAN NOT NULL DEFAULT false,
    "poiIdentified" BOOLEAN NOT NULL DEFAULT false,
    "entryRulesMet" BOOLEAN NOT NULL DEFAULT false,
    "sessionRespected" BOOLEAN NOT NULL DEFAULT false,
    "riskRuleRespected" BOOLEAN NOT NULL DEFAULT false,
    "noEmotionalPressure" BOOLEAN NOT NULL DEFAULT false,
    "checklist" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TradeState_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TradeUpdate" (
    "id" TEXT NOT NULL,
    "tradeId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "action" TEXT NOT NULL,
    "reason" TEXT,
    "emotionalState" TEXT,
    "behavior" TEXT,
    "notes" TEXT,

    CONSTRAINT "TradeUpdate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TradeReflection" (
    "id" TEXT NOT NULL,
    "tradeId" TEXT NOT NULL,
    "followedPlan" TEXT,
    "rulesRespected" TEXT,
    "emotionalSummary" TEXT,
    "behavioralOutcomes" TEXT,
    "whatWentRight" TEXT,
    "whatWentWrong" TEXT,
    "lessonLearned" TEXT,
    "ruleToReinforce" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TradeReflection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StrategyRule" (
    "id" TEXT NOT NULL,
    "strategyId" TEXT NOT NULL,
    "ruleName" TEXT NOT NULL,
    "description" TEXT,
    "isMandatory" BOOLEAN NOT NULL DEFAULT true,
    "weight" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StrategyRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RuleViolation" (
    "id" TEXT NOT NULL,
    "tradeId" TEXT NOT NULL,
    "ruleId" TEXT NOT NULL,
    "violated" BOOLEAN NOT NULL DEFAULT true,
    "reason" TEXT,
    "impact" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RuleViolation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JournalEntry" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "mentalState" TEXT,
    "focus" TEXT,
    "confidence" INTEGER,
    "externalStressors" TEXT,
    "phase" TEXT,
    "phaseNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JournalEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PeriodSummary" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "totalTrades" INTEGER NOT NULL,
    "winCount" INTEGER NOT NULL,
    "lossCount" INTEGER NOT NULL,
    "winRate" DOUBLE PRECISION NOT NULL,
    "expectancy" DOUBLE PRECISION NOT NULL,
    "bestStrategy" TEXT,
    "worstStrategy" TEXT,
    "bestEntryModel" TEXT,
    "emotionalPatterns" TEXT,
    "behavioralTrends" TEXT,
    "improvementsNeeded" TEXT,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PeriodSummary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ruleAdherence" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "emotionalStability" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "consistency" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "patience" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "riskDiscipline" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "decisionQuality" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "skillHistory" TEXT,
    "focusAreas" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SkillProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT,
    "unlockedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "criteria" TEXT,
    "value" INTEGER,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeeklyFocus" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "weekStart" TIMESTAMP(3) NOT NULL,
    "focusArea" TEXT NOT NULL,
    "specificGoal" TEXT,
    "progressNotes" TEXT,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WeeklyFocus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketConditionAnalysis" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "totalTrades" INTEGER NOT NULL,
    "winRate" DOUBLE PRECISION NOT NULL,
    "avgProfitLoss" DOUBLE PRECISION NOT NULL,
    "bestStrategy" TEXT,
    "emotionalPatterns" TEXT,
    "commonTriggers" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MarketConditionAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionPerformance" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "session" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "totalTrades" INTEGER NOT NULL,
    "winRate" DOUBLE PRECISION NOT NULL,
    "avgProfitLoss" DOUBLE PRECISION NOT NULL,
    "overtradingIncidents" INTEGER NOT NULL DEFAULT 0,
    "emotionalStability" DOUBLE PRECISION,
    "disciplineScore" DOUBLE PRECISION,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SessionPerformance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TradeDurationAnalysis" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "durationRange" TEXT NOT NULL,
    "outcome" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "avgProfitLoss" DOUBLE PRECISION NOT NULL,
    "winRate" DOUBLE PRECISION,
    "bestStrategy" TEXT,
    "commonMistakes" TEXT,
    "period" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TradeDurationAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TradingPlaybook" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "goldenRules" TEXT,
    "redFlags" TEXT,
    "bestStrategies" TEXT,
    "optimalConditions" TEXT,
    "emotionalTriggers" TEXT,
    "decisionFramework" TEXT,
    "targetWinRate" DOUBLE PRECISION,
    "targetExpectancy" DOUBLE PRECISION,
    "maxDrawdownLimit" DOUBLE PRECISION,
    "tradingIdentity" TEXT,
    "growthTrajectory" TEXT,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "TradingPlaybook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataExport" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "recordCount" INTEGER NOT NULL,
    "dateRange" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DataExport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Trade_userId_idx" ON "Trade"("userId");

-- CreateIndex
CREATE INDEX "Trade_strategyId_idx" ON "Trade"("strategyId");

-- CreateIndex
CREATE INDEX "Trade_entryModelId_idx" ON "Trade"("entryModelId");

-- CreateIndex
CREATE INDEX "Trade_pair_idx" ON "Trade"("pair");

-- CreateIndex
CREATE INDEX "Trade_entryTime_idx" ON "Trade"("entryTime");

-- CreateIndex
CREATE INDEX "Trade_outcome_idx" ON "Trade"("outcome");

-- CreateIndex
CREATE INDEX "Trade_status_idx" ON "Trade"("status");

-- CreateIndex
CREATE INDEX "Trade_account_idx" ON "Trade"("account");

-- CreateIndex
CREATE INDEX "Trade_decisionQuality_idx" ON "Trade"("decisionQuality");

-- CreateIndex
CREATE INDEX "Trade_sessionOverlap_idx" ON "Trade"("sessionOverlap");

-- CreateIndex
CREATE INDEX "Screenshot_userId_idx" ON "Screenshot"("userId");

-- CreateIndex
CREATE INDEX "Screenshot_tradeId_idx" ON "Screenshot"("tradeId");

-- CreateIndex
CREATE INDEX "VoiceNote_userId_idx" ON "VoiceNote"("userId");

-- CreateIndex
CREATE INDEX "VoiceNote_tradeId_idx" ON "VoiceNote"("tradeId");

-- CreateIndex
CREATE INDEX "DailyGoal_userId_idx" ON "DailyGoal"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DailyGoal_userId_date_key" ON "DailyGoal"("userId", "date");

-- CreateIndex
CREATE INDEX "AIInsight_userId_idx" ON "AIInsight"("userId");

-- CreateIndex
CREATE INDEX "Strategy_userId_idx" ON "Strategy"("userId");

-- CreateIndex
CREATE INDEX "Strategy_status_idx" ON "Strategy"("status");

-- CreateIndex
CREATE INDEX "Strategy_abTestGroup_idx" ON "Strategy"("abTestGroup");

-- CreateIndex
CREATE INDEX "EntryModel_strategyId_idx" ON "EntryModel"("strategyId");

-- CreateIndex
CREATE INDEX "TimeframeSequence_strategyId_idx" ON "TimeframeSequence"("strategyId");

-- CreateIndex
CREATE INDEX "TimeframeStep_sequenceId_idx" ON "TimeframeStep"("sequenceId");

-- CreateIndex
CREATE UNIQUE INDEX "TimeframeStep_sequenceId_orderIndex_key" ON "TimeframeStep"("sequenceId", "orderIndex");

-- CreateIndex
CREATE UNIQUE INDEX "TradeState_tradeId_key" ON "TradeState"("tradeId");

-- CreateIndex
CREATE INDEX "TradeState_tradeId_idx" ON "TradeState"("tradeId");

-- CreateIndex
CREATE INDEX "TradeUpdate_tradeId_idx" ON "TradeUpdate"("tradeId");

-- CreateIndex
CREATE INDEX "TradeUpdate_timestamp_idx" ON "TradeUpdate"("timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "TradeReflection_tradeId_key" ON "TradeReflection"("tradeId");

-- CreateIndex
CREATE INDEX "TradeReflection_tradeId_idx" ON "TradeReflection"("tradeId");

-- CreateIndex
CREATE INDEX "StrategyRule_strategyId_idx" ON "StrategyRule"("strategyId");

-- CreateIndex
CREATE INDEX "RuleViolation_tradeId_idx" ON "RuleViolation"("tradeId");

-- CreateIndex
CREATE INDEX "RuleViolation_ruleId_idx" ON "RuleViolation"("ruleId");

-- CreateIndex
CREATE INDEX "JournalEntry_userId_idx" ON "JournalEntry"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "JournalEntry_userId_date_key" ON "JournalEntry"("userId", "date");

-- CreateIndex
CREATE INDEX "PeriodSummary_userId_idx" ON "PeriodSummary"("userId");

-- CreateIndex
CREATE INDEX "PeriodSummary_startDate_idx" ON "PeriodSummary"("startDate");

-- CreateIndex
CREATE UNIQUE INDEX "PeriodSummary_userId_period_startDate_key" ON "PeriodSummary"("userId", "period", "startDate");

-- CreateIndex
CREATE UNIQUE INDEX "SkillProgress_userId_key" ON "SkillProgress"("userId");

-- CreateIndex
CREATE INDEX "Achievement_userId_idx" ON "Achievement"("userId");

-- CreateIndex
CREATE INDEX "Achievement_type_idx" ON "Achievement"("type");

-- CreateIndex
CREATE INDEX "WeeklyFocus_userId_idx" ON "WeeklyFocus"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "WeeklyFocus_userId_weekStart_key" ON "WeeklyFocus"("userId", "weekStart");

-- CreateIndex
CREATE INDEX "MarketConditionAnalysis_userId_idx" ON "MarketConditionAnalysis"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "MarketConditionAnalysis_userId_condition_period_startDate_key" ON "MarketConditionAnalysis"("userId", "condition", "period", "startDate");

-- CreateIndex
CREATE INDEX "SessionPerformance_userId_idx" ON "SessionPerformance"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SessionPerformance_userId_session_period_startDate_key" ON "SessionPerformance"("userId", "session", "period", "startDate");

-- CreateIndex
CREATE INDEX "TradeDurationAnalysis_userId_idx" ON "TradeDurationAnalysis"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "TradeDurationAnalysis_userId_durationRange_outcome_period_s_key" ON "TradeDurationAnalysis"("userId", "durationRange", "outcome", "period", "startDate");

-- CreateIndex
CREATE UNIQUE INDEX "TradingPlaybook_userId_key" ON "TradingPlaybook"("userId");

-- CreateIndex
CREATE INDEX "DataExport_userId_idx" ON "DataExport"("userId");

-- CreateIndex
CREATE INDEX "DataExport_type_idx" ON "DataExport"("type");

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_strategyId_fkey" FOREIGN KEY ("strategyId") REFERENCES "Strategy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_entryModelId_fkey" FOREIGN KEY ("entryModelId") REFERENCES "EntryModel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_timeframeSequenceId_fkey" FOREIGN KEY ("timeframeSequenceId") REFERENCES "TimeframeSequence"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Screenshot" ADD CONSTRAINT "Screenshot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Screenshot" ADD CONSTRAINT "Screenshot_tradeId_fkey" FOREIGN KEY ("tradeId") REFERENCES "Trade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoiceNote" ADD CONSTRAINT "VoiceNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoiceNote" ADD CONSTRAINT "VoiceNote_tradeId_fkey" FOREIGN KEY ("tradeId") REFERENCES "Trade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyGoal" ADD CONSTRAINT "DailyGoal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Strategy" ADD CONSTRAINT "Strategy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Strategy" ADD CONSTRAINT "Strategy_parentVersionId_fkey" FOREIGN KEY ("parentVersionId") REFERENCES "Strategy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntryModel" ADD CONSTRAINT "EntryModel_strategyId_fkey" FOREIGN KEY ("strategyId") REFERENCES "Strategy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeframeSequence" ADD CONSTRAINT "TimeframeSequence_strategyId_fkey" FOREIGN KEY ("strategyId") REFERENCES "Strategy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeframeStep" ADD CONSTRAINT "TimeframeStep_sequenceId_fkey" FOREIGN KEY ("sequenceId") REFERENCES "TimeframeSequence"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeState" ADD CONSTRAINT "TradeState_tradeId_fkey" FOREIGN KEY ("tradeId") REFERENCES "Trade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeUpdate" ADD CONSTRAINT "TradeUpdate_tradeId_fkey" FOREIGN KEY ("tradeId") REFERENCES "Trade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeReflection" ADD CONSTRAINT "TradeReflection_tradeId_fkey" FOREIGN KEY ("tradeId") REFERENCES "Trade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StrategyRule" ADD CONSTRAINT "StrategyRule_strategyId_fkey" FOREIGN KEY ("strategyId") REFERENCES "Strategy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RuleViolation" ADD CONSTRAINT "RuleViolation_tradeId_fkey" FOREIGN KEY ("tradeId") REFERENCES "Trade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RuleViolation" ADD CONSTRAINT "RuleViolation_ruleId_fkey" FOREIGN KEY ("ruleId") REFERENCES "StrategyRule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalEntry" ADD CONSTRAINT "JournalEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillProgress" ADD CONSTRAINT "SkillProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeeklyFocus" ADD CONSTRAINT "WeeklyFocus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarketConditionAnalysis" ADD CONSTRAINT "MarketConditionAnalysis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionPerformance" ADD CONSTRAINT "SessionPerformance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeDurationAnalysis" ADD CONSTRAINT "TradeDurationAnalysis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradingPlaybook" ADD CONSTRAINT "TradingPlaybook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataExport" ADD CONSTRAINT "DataExport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
