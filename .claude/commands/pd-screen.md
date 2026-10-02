---
description: 화면 개별 등록·보완 — 카테고리·ID·이름·서피스 + 진입/이동(분기) 정의, 플로우 자동 갱신
argument-hint: [카테고리] [화면ID] [화면이름]
allowed-tools: Read, Write, Edit, AskUserQuestion, Glob
---

# /pd-screen — 화면 등록 (개별)

PRD 배치 생성(/pd-scaffold) 외에, 화면을 **하나씩** 등록하거나 누락 화면을 보완할 때 쓴다.
`config/screens.js`에 화면을 추가하고 이름·ID만 표기된 화면 HTML을 생성한다. 목록·플로우는 엔진이 자동 렌더.

인자: `$1`=카테고리, `$2`=화면ID, `$3`=화면이름. (없으면 대화로)

## 절차

### 1) 인자 확인
- 카테고리/ID/이름 확정. ID 규칙 권장 `SCR-<약어>-<3자리>`.
- `config/screens.js`를 읽어 **중복 ID**면 경고하고 다른 ID 요청.
- **서피스**: project.js surfaces가 2개 이상이면 어느 서피스인지 물어 `surface` 지정.

### 2) 맥락 + 플로우 질문
1. **언제·어떻게 보이는 화면인가?** → `context`
2. **진입 출처**: 어느 화면의 무슨 버튼/조건으로 오나? (없으면 `entry:true`)
3. **다음 이동**: 어디로 가나? 버튼/조건. 분기 있으면 분기명+각 목적지.

### 3) `config/screens.js` 갱신
- **(a)** 이 화면 page 객체 추가(해당 카테고리 그룹에; 없으면 새 그룹):
  ```js
  { id, label, href, surface:'<key>', entry:<bool>, status:'draft', designed:false, figmaLink:'',
    context:'...', reqIds:[], description:[], components:[], cases:[],
    interface:{ reads:[], writes:[], events:[] },
    flow:{ to:[ /* (c) */ ] } }
  ```
  - `href` = ID 소문자 파일명(예: `SCR-PAY-001` → `scr-pay-001.html`).
- **(b)** 진입 출처 연결 — ★간선은 `to`가 유일 소스: **출처 화면의 flow.to**에 `{ screen:'<이 화면ID>', via:'<버튼/조건>' }` 추가(이 화면에 from 저장 금지). 출처 미등록이면 보류 안내.
- **(c)** 다음 이동 — 이 화면의 `flow.to`:
  - 단순: `{ screen, via }`
  - 분기: 같은 `branch` 라벨로 여러 개
  - 자동: `{ screen, via, kind:'auto' }`
  - (선택) `trigger:'.pd-<역할>'`, `onCall:'<interface write id>'`로 '어느 버튼→어느 API→다음화면' 연결

### 4) 화면 HTML 생성
- `templates/project/_screen.blank.html` 복사 → `projects/<slug>/<href>` 로 저장. `{{SCREEN_NAME}}`·`{{SCREEN_ID}}`·`{{SCREEN_HREF}}` 치환.
  (프로젝트 폴더는 2-depth 라 템플릿이 `../../engine/` 를 참조한다.)

### 5) 안내
- 추가 요약 + 다음: `/pd-wireframe <ID>` 로 화면 설계.

## 주의
- 간선은 flow.to에만(from 금지). description/components/cases/interface는 비워두고 각 전용 커맨드가 채운다.
- status='draft' 고정(이후 커맨드가 승격). 기존 화면/연결 덮어쓰기 금지(추가만).
