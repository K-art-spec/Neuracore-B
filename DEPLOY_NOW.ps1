# Quick Deploy Script - Run this to push to GitHub
param(
    [string]$Username = "",
    [string]$RepoName = "neuracore"
)

Write-Host "`n=== Neuracore Quick Deploy ===" -ForegroundColor Cyan

# Get username if not provided
if (-not $Username) {
    $Username = Read-Host "GitHub username"
}

if (-not $Username) {
    Write-Host "[ERROR] Username required!" -ForegroundColor Red
    exit 1
}

# Check if remote exists
$remoteUrl = "https://github.com/$Username/$RepoName.git"
$existingRemote = git remote get-url origin 2>$null

if ($existingRemote) {
    Write-Host "Remote exists: $existingRemote" -ForegroundColor Yellow
    $change = Read-Host "Change to $remoteUrl? (y/n)"
    if ($change -eq "y") {
        git remote remove origin
        git remote add origin $remoteUrl
    }
} else {
    git remote add origin $remoteUrl
}

Write-Host "`nPushing to GitHub..." -ForegroundColor Cyan
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n[SUCCESS] Deployed to GitHub!" -ForegroundColor Green
    Write-Host "Repository: https://github.com/$Username/$RepoName" -ForegroundColor Cyan
    Write-Host "`nNext: Deploy to Vercel at https://vercel.com/new" -ForegroundColor Yellow
} else {
    Write-Host "`n[ERROR] Push failed. Check credentials." -ForegroundColor Red
}

