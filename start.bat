@echo off
REM PlanDeck 더블클릭 런처 (Windows) — 더블클릭하면 서버 실행 + 브라우저 자동 오픈
cd /d "%~dp0"
set PORT=8137
echo PlanDeck 로컬 서버: http://localhost:%PORT%/index.html   (종료: 이 창에서 Ctrl+C)
start "" "http://localhost:%PORT%/index.html"
python -m http.server %PORT% 2>NUL || py -m http.server %PORT%
