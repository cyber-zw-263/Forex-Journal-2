# 🎯 Getting Started with Young Money FX Journal

Welcome! This guide will get you up and running in under 15 minutes.

## Step 1: Clone/Access Project (✅ Already Done)

Your project is ready at `/workspaces/Forex-Journal`

## Step 2: Setup Environment (5 min)

```bash
cd /workspaces/Forex-Journal

# Copy environment template
cp .env.example .env.local

# Edit .env.local with your settings
# You need:
# 1. PostgreSQL URL
# 2. OpenAI API Key
```

### Getting Your OpenAI Key (FREE)
1. Go to https://platform.openai.com/account/api-keys
2. Create new secret key
3. Copy and paste into .env.local
4. You get $5 free credits monthly for API

### PostgreSQL Setup
Option A: Docker (easiest)
```bash
docker-compose up
# Database starts automatically
```

Option B: Local PostgreSQL
```bash
# Create database
createdb forex_journal

# Update DATABASE_URL in .env.local
```

## Step 3: Install Dependencies (2 min)

```bash
npm install

# This downloads 500+ packages automatically
```

## Step 4: Setup Database (2 min)

```bash
# Create tables
npx prisma migrate deploy

# View database (optional)
npx prisma studio
```

## Step 5: Start Development (1 min)

```bash
npm run dev

# You'll see:
# ▲ Next.js 15.x
# - Local: http://localhost:3000
```

## Step 6: Open in Browser (1 min)

Visit: http://localhost:3000

You should see:
- Purple gradient theme ✅
- Dashboard with empty metrics ✅
- "Add Trade" button in header ✅
- Sidebar navigation ✅

## Step 7: Add Your First Trade (2 min)

1. Click "+ Add Trade" button
2. Fill in form:
   - Pair: EUR/USD
   - Direction: LONG
   - Entry Price: 1.0850
   - Stop Loss: 1.0800
   - Take Profit: 1.0900
   - Volume: 0.1
   - Risk: 2%
   - Emotional State: Calm
   - Setup Quality: 4 stars
   - Notes: "First test trade"
3. Click "Add Trade"
4. See metrics update automatically ✅

## Step 8: Refresh Dashboard

The dashboard should now show:
- Total Trades: 1 ✅
- Net P&L: $0 (until you close trade) ✅
- Charts should be ready for data ✅

## Troubleshooting

### Port 3000 already in use?
```bash
npm run dev -- -p 3001
```

### Database connection error?
```bash
# Check if PostgreSQL running
psql -U forex_user -d forex_journal

# Check DATABASE_URL in .env.local
```

### OpenAI API error?
```bash
# Verify key at: https://platform.openai.com/account/api-keys
# Check it's in .env.local
# Make sure you have credits remaining
```

## Next Steps

1. ✅ **Application Running** - You are here
2. ⏳ **Add More Trades** - Build your journal
3. ⏳ **Generate AI Insights** - Weekly summaries (coming soon)
4. ⏳ **View Analytics** - See patterns (coming soon)
5. ⏳ **Export Data** - Backup your journal (coming soon)

## Available Commands

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Run ESLint

npx prisma studio       # View database in browser
npx prisma migrate dev  # Create migration
```

## Project Structure

```
src/
├── app/                  # Pages and routes
│   ├── page.tsx         # Dashboard (your main view)
│   ├── api/             # API endpoints
│   └── globals.css      # Theme colors
├── components/          # Reusable UI components
│   ├── QuickAddTradeForm.tsx
│   ├── StatCardV2.tsx
│   └── ...
└── data/                # Sample data
```

## Key Files to Know

| File | What It Does |
|------|--------------|
| `.env.local` | Your configuration (API keys, database) |
| `src/app/page.tsx` | Dashboard/home page |
| `src/app/api/trades/route.ts` | Trade CRUD API |
| `prisma/schema.prisma` | Database schema |
| `src/app/globals.css` | Color theme & styling |

## Learn More

- �� **Quick Start**: See QUICK_START.md
- 📋 **Setup Detail**: See README_SETUP.md
- 💻 **XAMPP Guide**: See XAMPP_SETUP.md
- 🏗️ **Architecture**: See ARCHITECTURE.md
- ✨ **Feature List**: See IMPLEMENTATION_CHECKLIST.md

## You're Ready!

You now have a working Forex Trading Journal. Start adding trades and the system will:

- ✅ Calculate your metrics
- ✅ Show equity curve
- ✅ Track win rate
- ✅ Organize by pair
- ✅ Store your data persistently

Have fun journaling your trades! 📈

---

**Next: Check QUICK_START.md for feature details**
