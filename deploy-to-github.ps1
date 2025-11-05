# Deploy Neuracore to GitHub
# Run this script after creating a GitHub repository

Write-Host "`n=== Neuracore GitHub Deployment ===" -ForegroundColor Cyan
Write-Host ""

# Check if remote already exists
$remoteExists = git remote get-url origin 2>$null
if ($remoteExists) {
    Write-Host "Remote 'origin' already exists: $remoteExists" -ForegroundColor Yellow
    $useExisting = Read-Host "Use existing remote? (y/n)"
    if ($useExisting -ne "y") {
        Write-Host "`nRemoving existing remote..." -ForegroundColor Yellow
        git remote remove origin
    } else {
        Write-Host "`nPushing to existing remote..." -ForegroundColor Green
        git push -u origin main
        exit 0
    }
}

# Get GitHub username and repo name
Write-Host "Enter your GitHub details:" -ForegroundColor Yellow
$username = Read-Host "GitHub username"
$repoName = Read-Host "Repository name (e.g., neuracore)"

if (-not $username -or -not $repoName) {
    Write-Host "`n[ERROR] Username and repository name are required!" -ForegroundColor Red
    exit 1
}

# Create remote URL
$remoteUrl = "https://github.com/$username/$repoName.git"

Write-Host "`nRepository URL: $remoteUrl" -ForegroundColor Cyan
Write-Host ""
Write-Host "IMPORTANT: Create the repository on GitHub first!" -ForegroundColor Yellow
Write-Host "1. Go to: https://github.com/new" -ForegroundColor White
Write-Host "2. Repository name: $repoName" -ForegroundColor White
Write-Host "3. Keep it EMPTY (no README, no .gitignore, no license)" -ForegroundColor White
Write-Host "4. Click 'Create repository'" -ForegroundColor White
Write-Host ""
$ready = Read-Host "Press Enter when repository is created on GitHub"

# Add remote and push
Write-Host "`nAdding remote..." -ForegroundColor Cyan
git remote add origin $remoteUrl

Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n[SUCCESS] Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "`nRepository: https://github.com/$username/$repoName" -ForegroundColor Cyan
    Write-Host "`nNext steps:" -ForegroundColor Yellow
    Write-Host "1. Add environment variables as GitHub Secrets (for CI):" -ForegroundColor White
    Write-Host "   - Go to: https://github.com/$username/$repoName/settings/secrets/actions" -ForegroundColor Gray
    Write-Host "   - Add: NEXT_PUBLIC_SUPABASE_URL" -ForegroundColor Gray
    Write-Host "   - Add: NEXT_PUBLIC_SUPABASE_ANON_KEY" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. Deploy to Vercel:" -ForegroundColor White
    Write-Host "   - Go to: https://vercel.com/new" -ForegroundColor Gray
    Write-Host "   - Import: $username/$repoName" -ForegroundColor Gray
    Write-Host "   - Add environment variables in Vercel dashboard" -ForegroundColor Gray
} else {
    Write-Host "`n[ERROR] Push failed. Check your GitHub credentials and repository URL." -ForegroundColor Red
    Write-Host "You may need to authenticate with GitHub first." -ForegroundColor Yellow
}

