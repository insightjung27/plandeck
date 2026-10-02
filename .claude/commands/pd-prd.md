---
description: PRD 작성·갱신 — docs/PRD.md(정본)를 만들고/업데이트. 부족하면 역으로 질문해 보강하고 버전을 올린다. 화면 생성의 입력.
argument-hint: (인자 없음 · 대화형)
allowed-tools: Read, Write, Edit, AskUserQuestion, Glob
---

# /pd-prd — PRD 정본(docs/PRD.md) 작성·갱신

PRD의 **정본은 `projects/<slug>/docs/PRD.md`(마크다운 파일)**다. 이 커맨드는 그 파일을 만들거나 갱신하고,
내용이 초안·디테일을 잡기에 부족하면 **역으로 부족분을 물어 채운 뒤 버전을 올린다.** 이 문서가
`/pd-scaffold`(화면 초안)와 각 화면 커맨드(디테일)의 **입력**이 된다.

> 원칙: PRD는 "무엇·왜"만. 기술 결정(API·데이터 구조)은 화면 `/pd-interface`로 미룬다. 고정 섹션을 발명하지 않는다.
> `config/prd.js`는 PRD.md에서 **동기화되는 렌더용 미러**다(직접 쓰지 말고 PRD.md를 고친다).

## 모드 판별
- `docs/PRD.md`가 **없으면** → (A) 신규 작성. 있으면 → (B) 갱신.

## (A) 신규 작성
1. `templates/project/docs/PRD.md` 스텁을 `projects/<slug>/docs/PRD.md`로 복사(없으면 동일 구조로 생성).
2. 고정 7섹션을 대화로 수집: ①배경 ②목표 ③사용자(Job Story) ④범위(+제외) ⑤성공지표 ⑥제약·가정·의존성 ⑦릴리스.
3. 화면 생성 입력도 수집: **요구사항(reqId)**, **핵심 워크플로(단계 체인·분기)**, **서피스**.
4. 작성하면서 모호/미정이면 **미결 질문** 섹션에 체크박스로 적어둔다.
5. `version: 0.1.0`, `updated`, 버전 이력 1행.

## (B) 갱신 — "업데이트 요청" 처리 (★역방향 보강 루프)
1. `docs/PRD.md`를 Read.
2. **초안·디테일 생성 가능성 점검**(이 PRD로 /pd-scaffold·/pd-wireframe·/pd-interface를 돌릴 수 있나?). 부족하면 아래를 **역으로 질문**:
   - 워크플로/화면 전개가 불명확 · 사용자/역할 미정 · 핵심 데이터 객체 없음 · 분기(성공/실패·권한) 미정 · 범위 경계 모호 · 비동기/동기 등 핵심 결정 미정
   - `AskUserQuestion`으로 **부족분만 콕 집어** 묻는다(한 번에 1~4개). 답을 못 주면 '가정'으로 적고 미결 질문에 남긴다.
3. 받은 답으로 **PRD.md 본문을 갱신**하고, 해소된 미결 질문은 체크(완료) 처리.
4. **버전 올리기**: 변경 성격에 따라 patch(보강)/minor(요구 추가)/major(방향 전환)로 `version`·`updated` 갱신 + **버전 이력에 1행 추가**(무엇이 바뀌었는지).

## 공통 — config/prd.js 동기화
- PRD.md의 구조화 가능한 값(goals/users/scope/requirements/workflows/openQuestions 등)을 `config/prd.js`(`window.PLANDECK_PRD`)에 반영(미러). 끝에 `window.PDK_PRD = window.PLANDECK_PRD;` 유지.
- `config/project.js`의 `version`·`updatedAt`·`changelog`도 PRD 버전과 함께 갱신(선택).

## 안내
- `prd.html`을 열면 PRD가 렌더되고, 거기서 **docs/PRD.md 원본**으로 이동할 수 있다.
- 다음 단계: 신규/갱신 후 **`/pd-scaffold`**(PRD→화면 초안) → 화면별 `/pd-wireframe·/pd-cases·/pd-interface`(디테일).
- PRD가 충분해질 때까지 (B)의 질문↔갱신을 **반복**한다(한 번에 완벽히 하려 하지 말 것).

## 주의
- PRD.md가 정본 — 항상 이 파일을 고치고 버전을 남긴다. prd.js만 고치지 말 것.
- API/데이터 스키마·픽셀 디자인은 PRD에 넣지 않는다(각각 /pd-interface, /pd-figma-sync).
