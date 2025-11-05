# Quick Deploy Commands

## Step 1: Add GitHub Remote and Push

Replace `YOUR_USERNAME` and `REPO_NAME` with your actual GitHub username and repository name:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main
```

**Example:**
```powershell
git remote add origin https://github.com/johnsmith/neuracore.git
git push -u origin main
```

## Step 2: If Authentication Fails

If you get authentication errors, you may need to:
1. Use GitHub Personal Access Token instead of password
2. Or switch to SSH

**Option A: Use Personal Access Token**
- Go to: https://github.com/settings/tokens
- Generate new token (classic) with `repo` scope
- Use token as password when prompted

**Option B: Use SSH**
```powershell
git remote set-url origin git@github.com:YOUR_USERNAME/REPO_NAME.git
git push -u origin main
```

## Step 3: After Successful Push

1. **Add GitHub Secrets** (for CI):
   - Go to: https://github.com/YOUR_USERNAME/REPO_NAME/settings/secrets/actions
   - Add: `NEXT_PUBLIC_SUPABASE_URL`
   - Add: `NEXT_PUBLIC_SUPABASE_ANON_KEY`

2. **Deploy to Vercel**:
   - Go to: https://vercel.com/new
   - Import your GitHub repo
   - Add environment variables in Vercel dashboard
   - Deploy!

