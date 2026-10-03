# PlanDeck — 작업 규칙 (편집 에이전트 SSOT)

PlanDeck은 **빌드 없는(no-build) 정적 HTML 기획 협업 도구**다. config를 고치면 엔진이 자동 렌더하고, git이 동기화 버스, GitHub Pages가 배포다.

이 파일은 **웹UI의 "AI에게 요청"을 통해 호출되는 로컬 편집 에이전트**(및 터미널 작업)가 반드시 지켜야 할 불변식이다.

## 핵심 불변식 (깨지 말 것)
1. **와이어프레임이 기본.** 모든 화면은 흑백 와이어프레임(화면설계서 수준). 디자인(이미지)·Figma 연동은 옵션(토글 승격)일 뿐, 기본값은 항상 와이어프레임.
2. **컴포넌트 라이브러리만 사용.** 마크업은 `engine/plandeck-ui.css`의 공통 컴포넌트 클래스만 조립한다. 인라인 스타일·즉석 CSS 금지. 새 요소가 필요하면 먼저 `plandeck-ui.css`에 **추가(additive, 삭제 0)** 하고 재사용한다.
3. **클릭 가능해야 한다.** 목록행·카드·버튼·타일·뒤로·탭·사이드 등 모든 인터랙션은 실제 `href`로 연결한다. 누르면 예상 화면으로 이동해야 한다(의사결정자 신뢰도).
4. **SSOT는 `projects/<name>/config/`**. 특히 `config/screens.js`(화면 메타: id·label·href·surface·components·description·cases·interface·flow)와 화면 HTML은 **항상 정합**을 맞춘다. 화면을 추가/수정/삭제하면 screens.js도 같이 고친다.
5. **아이콘 = 아웃라인 SVG** (이모지 금지).
6. **영향도 분석 동반.** 공유 엔진(`engine/*`) 변경은 additive(삭제 0)로, 다른 프로젝트 회귀가 없어야 한다.
7. **git 명령은 실행하지 않는다.** 파일만 수정하라. 커밋·푸시·배포는 호출한 시스템(브릿지 서버)이 처리한다.

## 화면을 추가/수정/삭제할 때
- 화면 HTML은 가능하면 생성기 패턴(단일 SSOT 제너레이터)으로. 헬퍼: appbar/apptop/secHead/list/row/tiles/media/btn/form/table/kpi/wpanel 등.
- `config/screens.js`에 페이지 메타를 등록/갱신/삭제한다(id 체계: `SCR-<SURFACE>-NNN`).
- 네비게이션(목록→상세, +등록, 수정, 뒤로)이 끊기지 않게 href를 채운다.
- **링크 무결성 검증**: 모든 내부 `href="*.html"`가 실제 파일로 존재해야 하고, 막다른 화면(나가는 링크·뒤로 모두 없음)이 없어야 한다.

## 참고 문서
- `docs/ARCHITECTURE.md` — 엔진·렌더 구조
- `docs/GUIDE.md` / `docs/OPERATIONS.md` / `docs/TEAM.md`
- `docs/figma-integration-design.md` — Figma 2-트랙(기본 와이어, 옵션 승격)
- `.claude/commands/pd-*.md` — 기획 파이프라인 커맨드(init·prd·scaffold·wireframe·screen·cases·interface·flow·version·lint·qa)

## 품질 게이트 (완료 전)
- [ ] 와이어프레임 컴포넌트만 사용(인라인 스타일 0)
- [ ] 모든 인터랙션에 href 연결, 깨진 링크 0, 막다른 화면 0
- [ ] screens.js ↔ 화면 HTML 정합, flow.to 참조 ID 유효
- [ ] 엔진 변경 시 additive(삭제 0)
