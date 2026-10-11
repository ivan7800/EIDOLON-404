@echo off
setlocal
cd /d "%~dp0"
title EIDOLON 404 - Lanzador Windows
where py >nul 2>&1
if %errorlevel%==0 (
  py -3 launcher.py
) else (
  where python >nul 2>&1
  if %errorlevel%==0 (
    python launcher.py
  ) else (
    echo ERROR: No se ha encontrado Python 3.
    echo Instala Python 3 desde https://www.python.org/downloads/
    echo Marca Add python.exe to PATH y vuelve a ejecutar.
    pause
    exit /b 1
  )
)
if errorlevel 1 (
 echo.
 echo El lanzador ha terminado con un error. Revisa el mensaje anterior.
 pause
)
endlocal
