#!/bin/bash
# PlanDeck AI 편집 모드 런처 (macOS) — 더블클릭하면 로컬 AI 편집 서버 실행 + 브라우저 오픈
# 웹UI 우하단 ✦ 버튼으로 AI에게 요청 → 파일 수정 → git 저장·푸시 → 반영
cd "$(dirname "$0")" || exit 1
PORT=8137
while lsof -i :$PORT >/dev/null 2>&1; do PORT=$((PORT+1)); done
export PD_PORT=$PORT
URL="http://localhost:$PORT/index.html"
echo "────────────────────────────────────────────"
echo "  PlanDeck — AI 편집 모드"
echo "  주소: $URL"
echo "  사용: 우하단 ✦ 버튼 → AI에게 요청"
echo "  종료: 이 창에서 Control+C"
echo "────────────────────────────────────────────"
( sleep 1; open "$URL" ) &
python3 plandeck_ai_server.py
