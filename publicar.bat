@echo off
echo.
echo === Subiendo cambios a GitHub ===
echo.
set /p mensaje="Describe brevemente el cambio: "
git add .
git commit -m "%mensaje%"
git push
echo.
echo === Listo! Revisa Vercel en unos segundos ===
pause