# 🚀 XAMPP Local Deployment Guide

This guide helps you run Young Money FX Journal on your local machine using XAMPP.

## Prerequisites

- XAMPP installed with MySQL/PostgreSQL support
- Node.js 18+ installed
- OpenAI API key (free tier available)

## Step-by-Step Setup

### 1. Install & Start PostgreSQL in XAMPP

#### On Windows:
```
1. Open XAMPP Control Panel
2. Start "MySQL" or "PostgreSQL" (if available)
3. Note: If only MySQL available, install PostgreSQL separately from:
   https://www.postgresql.org/download/windows/
```

#### On Mac:
```
brew install postgresql@14
brew services start postgresql@14
```

#### On Linux:
```
sudo systemctl start postgresql
```

### 2. Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE forex_journal;

# Create user (recommended for security)
CREATE USER forex_user WITH PASSWORD 'forex_secure_pass';
ALTER ROLE forex_user CREATEDB;

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE forex_journal TO forex_user;

# Exit
\q
```

### 3. Setup Node.js Project

```bash
cd /path/to/Forex-Journal

# Copy environment file
cp .env.example .env.local

# Edit .env.local with your settings
# Update DATABASE_URL to your PostgreSQL connection
```

### 4. Edit .env.local

```env
# PostgreSQL Connection (adjust user/password if different)
DATABASE_URL="postgresql://forex_user:forex_secure_pass@localhost:5432/forex_journal"

# Get free OpenAI API key from https://platform.openai.com/account/api-keys
OPENAI_API_KEY="sk-YOUR-KEY-HERE"

# Generate a random secret (32+ characters)
NEXTAUTH_SECRET="super_secret_random_string_here"
NEXTAUTH_URL="http://localhost:3000"

# Environment
NODE_ENV="development"
```

### 5. Install Dependencies

```bash
npm install

# This will install:
# - Next.js
# - Prisma
# - PostgreSQL client
# - All other dependencies
```

### 6. Run Migrations & Seed Database

```bash
# Generate Prisma client
npx prisma generate

# Run migrations to create tables
npx prisma migrate deploy

# Optional: Seed with demo data
npx prisma db seed
```

### 7. Start Development Server

```bash
npm run dev

# Output will show:
# ▲ Next.js 15.x.x
# - Local:        http://localhost:3000
```

### 8. Access Application

Open your browser and go to:
```
http://localhost:3000
```

## Useful Commands

```bash
# View database in Prisma Studio
npx prisma studio
# Opens http://localhost:5555

# Reset database (careful!)
npx prisma migrate reset

# View migration status
npx prisma migrate status

# Create new migration
npx prisma migrate dev --name add_feature
```

## Troubleshooting

### PostgreSQL Won't Start
```
Windows:
- Check if port 5432 is in use
- Run: netstat -ano | findstr :5432

Solution:
- Kill the process or change port
- Edit pg_hba.conf
```

### "Database connection refused"
```
1. Ensure PostgreSQL is running
2. Check DATABASE_URL is correct
3. Verify credentials:
   psql -U forex_user -d forex_journal
```

### "OpenAI API error"
```
1. Verify OPENAI_API_KEY in .env.local
2. Check API key is valid at platform.openai.com
3. Ensure you have credits/quota remaining
4. Test with curl:
   curl https://api.openai.com/v1/models \
     -H "Authorization: Bearer $OPENAI_API_KEY"
```

### Port 3000 Already in Use
```
# Use different port
npm run dev -- -p 3001

# Or kill existing process
# Windows:
netstat -ano | findstr :3000
taskkill /PID [PID] /F

# Mac/Linux:
lsof -i :3000
kill -9 [PID]
```

## Performance Tips

1. **Use SSD**: Database operations are faster on SSD
2. **Allocate RAM**: Give PostgreSQL 2GB+ of RAM
3. **Close Unused Apps**: Free up system resources
4. **Clear Browser Cache**: Avoid old cached data
5. **Restart Occasionally**: Periodic restarts can improve stability

## Backup Your Data

```bash
# Export trades as CSV
curl http://localhost:3000/api/export?format=csv \
  -H "x-user-id: demo-user" > trades_backup.csv

# Export as JSON
curl http://localhost:3000/api/export?format=json \
  -H "x-user-id: demo-user" > trades_backup.json

# PostgreSQL backup
pg_dump -U forex_user forex_journal > backup.sql
```

## Restore from Backup

```bash
# Restore PostgreSQL backup
psql -U forex_user forex_journal < backup.sql
```

## Running as Service (Advanced)

### Windows - Run as Service:
```
1. Install NSSM from https://nssm.cc/download
2. nssm install ForexJournal "C:\path\to\node.exe" "C:\path\to\npm" "run" "start"
3. nssm start ForexJournal
```

### Mac - Create LaunchAgent:
```bash
# Create file: ~/Library/LaunchAgents/com.forexjournal.plist
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" ...>
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>com.forexjournal</string>
  <key>ProgramArguments</key>
  <array>
    <string>/usr/local/bin/npm</string>
    <string>start</string>
  </array>
  <key>WorkingDirectory</key>
  <string>/path/to/Forex-Journal</string>
  <key>StandardOutPath</key>
  <string>/tmp/forexjournal.log</string>
  <key>StandardErrorPath</key>
  <string>/tmp/forexjournal-error.log</string>
</dict>
</plist>

# Load service
launchctl load ~/Library/LaunchAgents/com.forexjournal.plist
```

## Architecture for XAMPP

```
Your Computer
├── XAMPP
│   └── PostgreSQL (Port 5432)
│
├── Node.js
│   └── Next.js App (Port 3000)
│
└── Browser
    └── http://localhost:3000
```

## Accessing from Other Devices

If you want to access the app from another computer on your network:

1. Find your computer's IP:
   ```bash
   # Windows
   ipconfig
   
   # Mac/Linux
   ifconfig
   ```

2. Update .env.local:
   ```env
   NEXTAUTH_URL="http://YOUR-IP:3000"
   ```

3. Access from other device:
   ```
   http://YOUR-IP:3000
   ```

## Database Tools

### pgAdmin (Web Interface)
```bash
# Install pgAdmin 4
# macOS: brew install pgadmin4
# Windows: Download from pgadmin.org
# Access at: localhost:5050
```

### DBeaver (Desktop Client)
```bash
# Download from dbeaver.io
# Connect to localhost:5432
# User: forex_user
# Password: forex_secure_pass
```

## Next Steps

1. ✅ Application is running
2. Create your first trade
3. Add multiple trades to build history
4. Enable AI insights
5. Review weekly summaries
6. Export your data

## Getting Help

1. Check browser console for errors (F12)
2. Check terminal output for server errors
3. Review .env.local settings
4. Check PostgreSQL is running
5. Verify OpenAI API key is valid

## Pro Tips

- **Keyboard Shortcuts**: Use Tab to navigate forms quickly
- **Dark Mode**: Already optimized for dark environment (trader aesthetic)
- **Data Persistence**: All data is stored in PostgreSQL, not lost on restart
- **Export Weekly**: Keep CSV backups of your trading data
- **Mobile Access**: Works on mobile browsers for quick entries

## Scaling Beyond XAMPP

When ready to deploy to production:

1. **Use managed PostgreSQL**: Neon, AWS RDS, or Heroku Postgres
2. **Deploy frontend to Vercel**: Automatic deployment from GitHub
3. **Keep local XAMPP** for development and backup

See README_SETUP.md for cloud deployment options.

---

**You're ready to start journaling your trades! 🚀**
