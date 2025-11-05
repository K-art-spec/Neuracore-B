# Deployment Checklist

## Issues Found & Fixes

### 1. Dependencies Installation Issue
**Problem**: `npm install` was interrupted, causing locked files in `node_modules`.

**Solution**:
```powershell
# Close any processes using node_modules (VS Code, terminal, etc.)
# Then run:
cd C:\Users\user\Downloads\neuracore-main\neuracore-main
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
npm install
```

### 2. Missing Environment Variables
**Problem**: No `.env.local` file found. App requires Supabase credentials.

**Solution**:
1. Copy `.env.example` to `.env.local`
2. Fill in your Supabase credentials from your Supabase dashboard

### 3. Build Command Issue
**Problem**: `next` command not found when running `npm run build`.

**Solution**: Use one of these:
- `npm run build` (after dependencies are installed)
- `npx next build` (uses local Next.js binary)
- `.\node_modules\.bin\next build` (direct path)

## Required Environment Variables

Create `.env.local` with:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## Pre-Deployment Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Create `.env.local` from `.env.example`
3. ✅ Test build: `npm run build`
4. ✅ Run tests: `npm test`
5. ✅ Test dev server: `npm run dev`

## Deployment Readiness Status

- [ ] Dependencies installed successfully
- [ ] Environment variables configured
- [ ] Production build succeeds (`npm run build`)
- [ ] Tests pass (`npm test`)
- [ ] Dev server runs (`npm run dev`)


