# Young Money FX Journal - Trading Journal & Analytics Platform

A professional Forex trading journal with AI-powered insights, built with Next.js 15, PostgreSQL, and Tailwind CSS.

## Features

### 📔 Trade Journal
- **Quick Trade Entry**: Add trades with entry price, stop loss, take profit, risk percentage
- **Complete Trade Details**: Currency pair, direction (LONG/SHORT), entry/exit prices, timestamps
- **Account Tracking**: Log trades from different accounts (personal, prop firm) and brokers
- **Status Management**: Track trades as "open", "closed", or "cancelled"
- **Rich Notes**: Add observations and strategy tags to each trade
- **Voice Recording**: Record audio notes that get stored with trades

### 📊 Performance Analytics
- **Equity Curve**: Visual representation of cumulative P&L over time
- **Win Rate Statistics**: Wins/losses breakdown with percentages
- **Pair Performance**: See which currency pairs are most profitable
- **Daily/Weekly/Monthly Metrics**: P&L tracking by time period
- **Risk-Reward Ratios**: Monitor your risk management
- **Best/Worst Day Tracking**: Identify your best and worst trading days

### 🧠 Emotional Tracking
- **Emotional State Logger**: Record your state (calm, rushed, frustrated, focused, confident)
- **Setup Quality Rating**: Rate each setup from 1-5 stars
- **Mistakes Checklist**: Log common mistakes (overtraded, broke rules, poor risk management, etc.)
- **Lessons Learned**: Document key insights from each trade
- **Pattern Recognition**: AI analyzes correlation between emotions and outcomes

### 🤖 AI Insights Engine
- **Daily Summaries**: Get insights from your daily trading activity
- **Weekly Analysis**: Pattern detection and performance review
- **Monthly Reports**: Long-form analysis and improvement suggestions
- **Personalized Coaching**: AI provides actionable suggestions based on your journal data
- **Emotional Correlation**: Discover how your emotional state affects trading performance
- **Strategy Performance Analysis**: Which pairs/strategies work best for you?

### 📅 Organization & Planning
- **Calendar View**: See your trading activity by day
- **Daily Goals**: Set and track daily trading objectives
- **Weekly Focus Areas**: Focus on specific aspects (discipline, patience, risk management)
- **Pre-Market Prep**: Record your trading plan before the market opens
- **Post-Session Review**: Structured prompts for after-trade reflection

### 💾 Export & Backup
- **CSV Export**: Export all trades to Excel-compatible format
- **JSON Export**: Complete backup of your trading data
- **PDF Reports**: Generate printable weekly/monthly reports
- **Cloud Backup Ready**: Structured for easy cloud integration

## Technology Stack

- **Framework**: Next.js 15 (App Router) with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS with custom dark theme
- **Charts**: Recharts for data visualization
- **Animations**: Framer Motion
- **AI Integration**: OpenAI API (GPT-4o-mini)
- **Audio**: Browser MediaRecorder API + OpenAI Whisper (optional)
- **Authentication**: Session-based (configurable with NextAuth.js)

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+ (or Docker)
- OpenAI API Key (for AI insights)

### Local Development with Docker

1. **Clone the repository**
   ```bash
   cd Forex-Journal
   ```

2. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and add:
   ```
   DATABASE_URL="postgresql://forex_user:forex_secure_pass@localhost:5432/forex_journal"
   OPENAI_API_KEY="sk-your-key-here"
   NEXTAUTH_SECRET="generate-random-string"
   ```

3. **Start with Docker Compose**
   ```bash
   docker-compose up -d
   ```
   
   This will:
   - Start PostgreSQL on `localhost:5432`
   - Start Next.js dev server on `localhost:3000`
   - Automatically run Prisma migrations

4. **Access the application**
   - Open http://localhost:3000 in your browser

### Manual Setup (for XAMPP users)

1. **Install PostgreSQL locally or use XAMPP's PostgreSQL**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run migrations
   npx prisma migrate deploy
   ```

4. **Configure environment**
   ```bash
   cp .env.example .env.local
   # Edit with your PostgreSQL connection string and OpenAI key
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Open http://localhost:3000

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── trades/           # Trade CRUD endpoints
│   │   ├── ai/analyze/       # AI analysis endpoint
│   │   ├── voice-notes/      # Voice recording API
│   │   └── export/           # Export functionality
│   ├── analytics/            # Analytics page
│   ├── calendar/             # Calendar view
│   ├── insights/             # AI insights page
│   ├── planning/             # Planning & goals page
│   ├── review/               # Trade review page
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Dashboard
│   └── globals.css           # Global styles (dark theme)
├── components/               # Reusable React components
├── context/                  # React context (theme, etc.)
└── data/                     # Demo data
```

## Environment Variables

```env
# Database Connection
DATABASE_URL="postgresql://user:password@localhost:5432/forex_journal"

# OpenAI API
OPENAI_API_KEY="sk-..."

# NextAuth (optional, for future authentication)
NEXTAUTH_SECRET="random-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Environment
NODE_ENV="development"
```

## Database Schema

### Trade Model
- **Core Fields**: pair, direction, entryPrice, exitPrice, entryTime, exitTime
- **Position Details**: volume, stopLoss, takeProfit, riskAmount, riskPercent
- **Account Info**: account, broker, accountBalance, accountEquity
- **Outcomes**: outcome (WIN/LOSS/BREAKEVEN/OPEN), profitLoss, profitLossPercent, status
- **Strategy**: strategy, setupType, riskRewardRatio
- **Reflection**: emotionalState, setupQuality, whatLearned, mistakes, notes
- **Media**: screenshots, voiceNotes

### Additional Models
- **User**: Account management
- **VoiceNote**: Audio recordings and transcripts
- **Screenshot**: Trade setup screenshots
- **DailyGoal**: Daily trading objectives
- **WeeklyFocus**: Weekly focus areas
- **AIInsight**: Stored AI analysis results

## API Endpoints

### Trades
- `GET /api/trades` - List all trades (with filters)
- `POST /api/trades` - Create new trade
- `GET /api/trades/[id]` - Get single trade
- `PUT /api/trades/[id]` - Update trade
- `DELETE /api/trades/[id]` - Delete trade

### AI Analysis
- `POST /api/ai/analyze` - Generate AI insights
  ```json
  {
    "period": "daily|weekly|monthly",
    "startDate": "2024-01-01",
    "endDate": "2024-01-31"
  }
  ```

### Voice Notes
- `GET /api/voice-notes` - List voice notes
- `POST /api/voice-notes` - Upload voice note with transcription

### Export
- `GET /api/export?format=csv` - Export as CSV
- `GET /api/export?format=json` - Export as JSON

## UI Components

### StatCardV2
Displays key metrics with gradients and hover effects
```tsx
<StatCardV2
  title="Total P&L"
  value="$1,234.56"
  color="green"
  icon={<FiDollarSign />}
  trend={{ value: 12.5, direction: 'up' }}
/>
```

### Charts
- Equity Curve (Area Chart)
- Win Distribution (Pie Chart)
- Pair Performance (Bar Chart)
- Daily/Weekly Performance (Line Chart)

## Color Palette

- **Primary Purple**: #8b5cf6 (brand color)
- **Purple Light**: #a78bfa
- **Purple Dark**: #6d28d9
- **Win Green**: #10b981
- **Loss Red**: #ef4444
- **Neutral Gray**: #6b7280
- **Background**: #0f0e1d
- **Card BG**: #1a1927

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Connect PostgreSQL database (Neon, AWS RDS, or Supabase)
5. Deploy

### Self-Hosted
1. Use Docker Compose (included)
2. Or manually install Node.js + PostgreSQL
3. Run `npm run build && npm start`
4. Use Nginx/Apache as reverse proxy

## Development

### Build
```bash
npm run build
```

### Production Server
```bash
npm start
```

### Linting
```bash
npm run lint
```

## Future Enhancements

- [ ] User authentication (NextAuth.js)
- [ ] Advanced AI coaching with Anthropic Claude
- [ ] Integration with trading platforms (MT5, TradingView)
- [ ] Mobile app (React Native)
- [ ] Dark/Light theme toggle
- [ ] Custom tags and categories
- [ ] Trading pin/checklist
- [ ] Community insights (anonymized)
- [ ] Webhook notifications
- [ ] Discord/Telegram bot integration

## Support & Documentation

- 📖 [Next.js Documentation](https://nextjs.org/docs)
- 🗄️ [Prisma Documentation](https://www.prisma.io/docs/)
- 🎨 [Tailwind CSS](https://tailwindcss.com/docs)
- 🤖 [OpenAI API](https://platform.openai.com/docs)

## License

MIT License - feel free to use for personal trading use.

## Author

Built with ❤️ for serious forex traders who want to improve through reflection and data-driven insights.

---

**Happy Trading! 📈**
