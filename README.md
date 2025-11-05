## Neuracore

A Next.js innovation platform with collaborative tools, idea submission, and AI-powered assistance.

## Features

- ✅ **Smart Chatbot** - Context-aware assistant with message history and typing indicators
- ✅ **Microsoft OAuth Login** - Single sign-on with Microsoft/Azure accounts
- ✅ **Idea Management** - Submit, view, and track ideas with comments and likes
- ✅ **User Profiles** - Achievements, stats, and personalized dashboards
- ✅ **Leaderboard** - Community rankings and engagement metrics

## Getting Started

1. Install dependencies
```bash
npm install
```

2. Environment variables (create `.env.local`)
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Dev server
```bash
npm run dev
```

## Tests
```bash
npm test
```

## Build
```bash
npm run build
```

## Deploying to GitHub & Vercel

1) Push to GitHub
- Commit this directory as the repo root.

2) GitHub Actions CI (optional)
- Workflow: `.github/workflows/ci.yml`
- Add repository secrets:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3) Deploy on Vercel
- Import the GitHub repo into Vercel.
- Framework: Next.js (auto).
- Build command: `npm run build`
- Install command: `npm ci` (or auto)
- Environment Variables on Vercel:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

