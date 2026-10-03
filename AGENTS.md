# AGENTS.md — PlanDeck 작업 규칙 (AI 코딩 에이전트 공용)

이 레포는 **AI가 붙은 어떤 코딩 도구로 열어도**(Cursor · Antigravity · Orca · Claude Code · Aider 등) 동일한 규칙으로 기획 작업을 할 수 있도록 설계됐다. 이 문서가 그 **작업 규칙 SSOT**다. (대부분의 AI 코딩 도구가 `AGENTS.md`를 자동 로드하며, Claude Code는 `CLAUDE.md`에서, Cursor는 `.cursor/rules/plandeck.mdc`에서, Antigravity는 루트 `AGENTS.md`와 `.agents/rules/plandeck.md`에서 이 문서를 가져온다. **Orca(ADE)** 는 전용 규칙 포맷이 없다 — 이 `AGENTS.md`를 standing brief로 직접 읽고, Orca가 병렬 worktree로 실행하는 각 CLI 에이전트(Claude Code·Cursor CLI·Codex·Gemini 등)가 위 각자 규칙 파일을 읽는다.)

## PlanDeck이란
빌드 없는(no-build) 정적 HTML 기획 협업 도구. `projects/<name>/config/*.js`(SSOT)를 고치면 엔진(`engine/*`)이 화면·문서를 자동 렌더한다. git이 동기화 버스, GitHub Pages가 공유 배포다.

## 작업 흐름 (어떤 AI 도구든 동일)
1. 레포를 연다(clone/open). 미리보기: `./start.command`(macOS) 또는 `python3 -m http.server 8137` → 브라우저에서 `projects/<name>/<screen>.html`.
2. 아래 **불변식**을 지키며 화면/문서를 추가·수정·삭제한다.
3. **검증**: `node tools/verify-links.js <project>` — 깨진 링크 0을 확인한다.
4. 커밋·푸시(사용자/도구가 수행) → GitHub Pages 자동 반영.

## 불변식 (깨지 말 것)
1. **와이어프레임이 기본** — 흑백 화면설계서 수준. 디자인·Figma 연동은 옵션(토글 승격)일 뿐, 기본값은 항상 와이어프레임.
2. **컴포넌트 라이브러리만 사용** — 마크업은 `engine/plandeck-ui.css`의 공통 컴포넌트 클래스만 조립한다. 인라인 스타일·즉석 CSS 금지. 새 요소가 필요하면 먼저 `plandeck-ui.css`에 **additive(삭제 0)로 추가**하고 재사용한다.
3. **클릭 가능해야 한다** — 목록행·카드·버튼·타일·뒤로·탭·사이드 등 모든 인터랙션은 실제 `href`로 연결한다. 누르면 예상 화면으로 이동해야 한다(의사결정자 신뢰도).
4. **SSOT 정합** — `projects/<name>/config/screens.js`(화면 메타: id·label·href·surface·components·description·cases·interface·flow)와 화면 HTML을 **항상 일치**시킨다. 화면을 추가/수정/삭제하면 screens.js도 같이 고친다.
5. **아이콘 = 아웃라인 SVG** (이모지 금지).
6. **엔진 변경은 additive** — `engine/*`는 모든 프로젝트 공유이므로 삭제 0, 타 프로젝트 무회귀를 보장한다.
7. **병렬 작업 안전(Orca 등 ADE)** — 여러 에이전트가 병렬 worktree에서 동시에 작업할 수 있다. 변경은 화면·파일 단위로 독립적이고 머지 가능하게 유지하고, 공유 파일(`engine/*`·`config/screens.js`)의 동시 대규모 수정은 피한다. 로컬 전용을 가정하지 말 것(SSH/원격 worktree 가능).

## 화면 작업 가이드
- 다수 화면은 **단일 생성기 패턴** 권장(컴포넌트 헬퍼로 조립 → 일관성·오류 최소화).
- id 체계 `SCR-<SURFACE>-NNN`. 네비게이션(목록→상세, +등록, 수정, 뒤로)이 끊기지 않게 href를 채운다.
- **링크 무결성**: 모든 내부 `href="*.html"`가 실제 파일로 존재하고, 막다른 화면(나가는 링크·뒤로 모두 없음)이 없어야 한다. `tools/verify-links.js`로 검증.

## 참고 문서
- `docs/ARCHITECTURE.md` — 엔진·렌더 구조
- `docs/GUIDE.md` / `docs/OPERATIONS.md` / `docs/TEAM.md`
- `docs/figma-integration-design.md` — Figma 2-트랙(기본 와이어, 옵션 승격)
- `.claude/commands/pd-*.md` — 기획 파이프라인 커맨드(Claude Code 전용; 다른 도구는 이 문서의 규칙을 따르면 동일 결과)
- `tools/verify-links.js` — 링크 무결성 검증 게이트

## 완료 전 체크리스트
- [ ] 와이어프레임 컴포넌트만 사용(인라인 스타일 0)
- [ ] 모든 인터랙션에 href 연결, 깨진 링크 0, 막다른 화면 0 (`node tools/verify-links.js <project>`)
- [ ] screens.js ↔ 화면 HTML 정합, flow.to 참조 ID 유효 (`node tools/verify-roles.js <project>`)
- [ ] 엔진 변경 시 additive(삭제 0)
- [ ] **CSS 충돌 0** — 컴포넌트 추가 시 기존 베이스 클래스를 덮어쓰지 않았는가 (`node tools/verify-css.js`). 새 컴포넌트는 고유 클래스명 또는 `.parent .child` 스코프. 충돌=렌더 깨짐(.pd-step 회귀 유형).
- [ ] **렌더 검증** (`node tools/verify-render.js <project>`) — 전 화면 pd-screen+스크롤컨테이너 보유·인라인스타일0·빈본문0. 내용 긴 화면은 목업 안에서 왜곡(압축) 없이 스크롤되는가(스크롤 컨테이너 .pd-app-body/.pd-content의 flex 자식은 flex-shrink로 눌리면 안 됨 = 압축 회귀 유형).
