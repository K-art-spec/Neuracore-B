# Quick GitHub Deployment Guide

Your project is ready! All files are committed locally.

## Step 1: Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `neuracore` (or your preferred name)
3. **Keep it EMPTY** (don't add README, .gitignore, or license)
4. Click "Create repository"

## Step 2: Push to GitHub

**Option A: Use the script** (recommended)
```powershell
.\deploy-to-github.ps1
```

**Option B: Manual commands**
```powershell
# Replace YOUR_USERNAME and REPO_NAME with your values
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 3: Configure GitHub Secrets (for CI)

1. Go to: `https://github.com/YOUR_USERNAME/REPO_NAME/settings/secrets/actions`
2. Click "New repository secret"
3. Add these secrets:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key

## Step 4: Deploy to Vercel

1. Go to: https://vercel.com/new
2. Import your GitHub repository
3. Framework: Next.js (auto-detected)
4. Add Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click "Deploy"

## Troubleshooting

If `git push` fails with authentication:
- Use GitHub Personal Access Token (Settings → Developer settings → Personal access tokens)
- Or use SSH instead of HTTPS




