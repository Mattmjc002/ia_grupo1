@echo off
cd /d "%~dp0"
where node >nul 2>&1
if errorlevel 1 (
  echo Instale o Node.js 24 ou superior e abra este arquivo novamente.
  pause
  exit /b 1
)
node --env-file-if-exists=.env scripts/start-orion.mjs
pause
