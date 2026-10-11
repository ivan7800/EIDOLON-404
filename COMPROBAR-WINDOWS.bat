@echo off
cd /d "%~dp0"
where py >nul 2>&1
if %errorlevel%==0 (py -3 launcher.py --check) else (python launcher.py --check)
pause
