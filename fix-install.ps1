# Fix Installation Issues Script
# Run this in PowerShell from the project root

Write-Host "Fixing npm installation issues..." -ForegroundColor Yellow

# Step 1: Clean up locked node_modules
Write-Host "`n1. Cleaning node_modules..." -ForegroundColor Cyan
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
    Write-Host "   ✓ Removed node_modules" -ForegroundColor Green
}

# Step 2: Remove package-lock.json
Write-Host "`n2. Removing package-lock.json..." -ForegroundColor Cyan
if (Test-Path "package-lock.json") {
    Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
    Write-Host "   ✓ Removed package-lock.json" -ForegroundColor Green
}

# Step 3: Fresh install
Write-Host "`n3. Running fresh npm install..." -ForegroundColor Cyan
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✓ Installation complete!" -ForegroundColor Green
    Write-Host "`nNext steps:" -ForegroundColor Yellow
    Write-Host "1. Create .env.local file with your Supabase credentials"
    Write-Host "2. Run: npm run build"
    Write-Host "3. Run: npm test"
} else {
    Write-Host "`n✗ Installation failed. Check errors above." -ForegroundColor Red
}


