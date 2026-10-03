# CLAUDE.md

이 레포의 작업 규칙은 **@AGENTS.md** 를 따른다(AI 코딩 도구 공용 SSOT — Cursor·Antigravity·Orca·Claude Code 등 어디서 열어도 동일).

**요약**: 와이어프레임이 기본 · `engine/plandeck-ui.css` 컴포넌트만 조립(인라인 스타일 금지) · 모든 인터랙션에 실제 `href` 연결(클릭 가능) · `config/screens.js` ↔ 화면 HTML 정합 · 아이콘은 아웃라인 SVG · 엔진(`engine/*`)은 additive(삭제 0, 타 프로젝트 무회귀).

작업 후 반드시 `node tools/verify-links.js <project>` 로 링크 무결성(깨진 링크 0, 막다른 화면 0)을 확인한다. 커밋·푸시는 사용자 지시가 있을 때만.
