---
description: PRD(제품요구정의서) 작성 — 고정 7섹션 + 요구사항·워크플로를 대화로 채워 config/prd.js 생성
argument-hint: (인자 없음 · 대화형)
allowed-tools: Read, Write, Edit, AskUserQuestion, Glob
---

# /pd-prd — PRD 작성 (화면 자동생성의 입력)

당신은 기획자가 **간단하지만 완결된 PRD**를 만들도록 돕는다. 결과는 `config/prd.js`(window.PLANDECK_PRD)이고,
이것이 `/pd-scaffold`의 입력이 되어 화면이 자동 생성된다. PRD 전문은 `prd.html`에서 자동 렌더된다.

> 원칙(벤치마크: GitHub Spec Kit·Notion·Linear): PRD는 **"무엇·왜"만** 담는다. 기술 결정(API·데이터 구조)은
> 화면의 `/pd-interface`로 미룬다. 고정 7섹션을 **발명하지 말고** 그대로 채운다. 짧고 명확하게.

## 절차

### 1) 기존 PRD 확인
- `config/prd.js`를 읽어 이미 있으면 "덮어쓸지/이어서 보완할지" 물어본다.

### 2) 고정 7섹션을 대화로 수집 (짧게, 한 번에 한 묶음)
1. **배경(background)** — 왜 지금 이것을 만드나(문제/맥락)
2. **목표(goals)** — 측정 가능한 목표 목록
3. **사용자(users)** — Job Story 권장: `{ role, jobStory }` ("[상황]일 때 [동기]하고 싶다, 그래서 [결과]")
4. **범위(scope / outOfScope)** — 포함 + **명시적 제외**(제외를 반드시 받아 범위 고정)
5. **성공지표(successMetrics)** — `{ metric, target }`
6. **제약·가정·의존성(constraints/assumptions/dependencies)**
7. **릴리스(releases)** — `{ name, scope[], when }`

### 3) 화면 생성 입력 수집 (중요)
- **requirements[]**: 핵심 요구사항을 `{ reqId:'REQ-001'.., text, surfaces:[서피스key] }`로. (reqId는 순번)
- **workflows[]**: 핵심 프로세스를 `{ name, surface, steps:[{screen, via?, branch?}] }`로.
  - steps의 screen은 **사람이 읽는 이름**(아직 ID 아님). scaffold가 ID로 변환한다.
  - 분기는 같은 `branch` 라벨로(예: 성공/실패).
- **openQuestions[]**: 수집 중 모호하거나 미정인 것을 질문으로 적어둔다(scaffold 리뷰 게이트에서 사용).

### 4) `config/prd.js` 작성
- `window.PLANDECK_PRD = { ... }` 로 전 섹션 작성. 파일 끝에 `window.PDK_PRD = window.PLANDECK_PRD;` 유지.
- 비는 섹션은 빈 배열/빈 문자열로 둔다(삭제하지 말 것 — 스키마 유지).

### 5) 안내
- `prd.html`을 열면 PRD 전문이 보인다고 안내.
- 다음 단계: **`/pd-scaffold`** 로 이 PRD에서 화면을 자동 생성하라고 안내.

## 주의
- PRD에 API·데이터 스키마·픽셀 디자인을 넣지 않는다(각각 /pd-interface, /pd-figma-sync 소관).
- surfaces는 project.js의 surfaces[].key와 일치시킨다(없으면 /pd-init 먼저 안내).
