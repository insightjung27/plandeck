#!/bin/bash
# PlanDeck 런처 (Linux/일반) — ./start.sh 로 실행하면 서버 + 브라우저 자동 오픈
cd "$(dirname "$0")" || exit 1
PORT=8137
while lsof -i :$PORT >/dev/null 2>&1; do PORT=$((PORT+1)); done
URL="http://localhost:$PORT/index.html"
echo "PlanDeck: $URL  (종료: Control+C)"
( sleep 1; (xdg-open "$URL" || open "$URL") >/dev/null 2>&1 ) &
if command -v python3 >/dev/null 2>&1; then python3 -m http.server $PORT
else python -m http.server $PORT; fi
