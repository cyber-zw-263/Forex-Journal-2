-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Trade" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "pair" TEXT NOT NULL,
    "direction" TEXT NOT NULL,
    "entryPrice" REAL NOT NULL,
    "exitPrice" REAL,
    "entryTime" DATETIME NOT NULL,
    "exitTime" DATETIME,
    "quantity" REAL NOT NULL,
    "profitLoss" REAL,
    "profitLossPercent" REAL,
    "outcome" TEXT,
    "notes" TEXT,
    "strategy" TEXT,
    "emotionalState" TEXT,
    "setupQuality" INTEGER,
    "whatLearned" TEXT,
    "mistakes" TEXT,
    "riskRewardRatio" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Trade_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Screenshot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "tradeId" TEXT,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "uploadedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Screenshot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Screenshot_tradeId_fkey" FOREIGN KEY ("tradeId") REFERENCES "Trade" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "VoiceNote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "tradeId" TEXT,
    "url" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "transcript" TEXT,
    "recordedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "VoiceNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "VoiceNote_tradeId_fkey" FOREIGN KEY ("tradeId") REFERENCES "Trade" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DailyGoal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "goals" TEXT,
    "notes" TEXT,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "DailyGoal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WeeklyFocus" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "weekStart" DATETIME NOT NULL,
    "focusArea" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "WeeklyFocus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AIInsight" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Trade_userId_idx" ON "Trade"("userId");

-- CreateIndex
CREATE INDEX "Trade_pair_idx" ON "Trade"("pair");

-- CreateIndex
CREATE INDEX "Trade_entryTime_idx" ON "Trade"("entryTime");

-- CreateIndex
CREATE INDEX "Trade_outcome_idx" ON "Trade"("outcome");

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
CREATE INDEX "WeeklyFocus_userId_idx" ON "WeeklyFocus"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "WeeklyFocus_userId_weekStart_key" ON "WeeklyFocus"("userId", "weekStart");

-- CreateIndex
CREATE INDEX "AIInsight_userId_idx" ON "AIInsight"("userId");
