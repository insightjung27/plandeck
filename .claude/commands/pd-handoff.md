---
description: 개발·QA 핸드오프 집계 — 전 화면 계약을 OpenAPI 3.1 + 마크다운 스펙 + QA 테스트플랜(Gherkin) + 에이전트 번들로 방출
argument-hint: (인자 없음)
allowed-tools: Read, Write, Edit, Glob, Bash
---

# /pd-handoff — 개발·QA 핸드오프

전 화면의 PRD·화면·예외·인터페이스를 모아 **개발자와 QA가 바로 소비할 산출물**을 만든다.
대부분은 `handoff.html`을 브라우저로 열면 **클라이언트 JS만으로** 자동 생성·복사·다운로드된다(무빌드).
이 커맨드는 그 과정을 안내하고, 필요하면 산출물을 파일로 저장하도록 돕는다.

## 산출물 (handoff.html 에서 자동 생성)
1. **완결성 대시보드** — 화면별 Description/Cases/Interface/Design 충족 + 개발준비(ready-for-dev) 수
2. **OpenAPI 3.1 JSON** — entities → components.schemas, writes/reads → paths (바로 유효한 스펙; mock·SDK 생성 가능)
3. **마크다운 스펙** — 사람이 읽는 화면별 명세(전역규칙·엔티티·API·경우의 수)
4. **QA 테스트플랜** — cases → Gherkin `.feature`(Given-When-Then) + 우선순위 체크리스트
5. **에이전트 번들 JSON** — 화면+계약+엔티티+케이스 한 묶음(코딩 에이전트 입력용)

## 절차

### 1) 사전 점검
- 먼저 `/pd-lint`를 돌려(또는 결과를 참고해) 완결성 결손을 보고한다. 개발준비 화면 수를 알린다.

### 2) 핸드오프 열람 안내
- "로컬 서버로 `handoff.html`을 열면 위 5종이 자동 생성됩니다"라고 안내(`python3 -m http.server 8137` → /handoff.html).

### 3) (선택) 파일로 저장
- 사용자가 원하면 `Bash`로 간단한 Node/파이썬 스크립트 없이도, handoff.html의 '내려받기' 버튼으로 저장하도록 안내.
- git 배포 환경(GitHub Pages)이면 handoff.html 링크 자체가 개발/QA에게 전달하는 "살아있는 핸드오프"가 된다.

### 4) 역할별 전달 안내
- **개발자**: OpenAPI 3.1 + 에이전트 번들 → mock 서버/SDK/구현. 화면ID로 기획↔개발 브랜치 추적.
- **QA**: QA 테스트플랜(.feature) + 완결성 대시보드 → 테스트 케이스 자동화/수동 체크. cases가 곧 수용기준.
- **디자이너**: 완결성 대시보드의 Design 열 + 각 화면 figmaLink.

## 주의
- 산출물은 config(SSOT)에서 결정론적으로 파생된다 — 수기 편집하지 말고 config를 고쳐 재생성한다.
- 서버·번들러·외부 라이브러리 없이 브라우저에서 생성(무빌드 유지).
