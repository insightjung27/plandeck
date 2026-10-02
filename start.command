#!/bin/bash
# PlanDeck 더블클릭 런처 (macOS) — 터미널 명령 없이 더블클릭하면 서버 실행 + 브라우저 자동 오픈
cd "$(dirname "$0")" || exit 1
PORT=8137
# 포트가 사용 중이면 다음 빈 포트 탐색
while lsof -i :$PORT >/dev/null 2>&1; do PORT=$((PORT+1)); done
URL="http://localhost:$PORT/index.html"
echo "────────────────────────────────────────────"
echo "  PlanDeck 로컬 서버"
echo "  주소: $URL"
echo "  종료: 이 창에서 Control+C"
echo "────────────────────────────────────────────"
( sleep 1; open "$URL" ) &
if command -v python3 >/dev/null 2>&1; then python3 -m http.server $PORT
else python -m http.server $PORT; fi
