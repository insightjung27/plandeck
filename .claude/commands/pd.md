---
description: PlanDeck 가이드 허브 — 현재 상태를 진단해 "다음에 할 일"을 추천·실행. 커맨드 순서를 몰라도 이것만 치면 됨.
argument-hint: (인자 없음)
allowed-tools: Read, Write, Edit, AskUserQuestion, Glob
---

# /pd — 어디서부터 할지 모르겠다면 이것부터

실무 기획자가 **커맨드 순서를 외우지 않아도** 되게, 현재 프로젝트 상태를 진단하고 **다음 할 일**을 추천·실행한다.
"무엇을 해야 하는지"를 알려주는 길잡이다.

## 절차

### 1) 상태 진단
- `config/project.js`·`prd.js`·`screens.js`를 읽어 현재 단계를 파악한다:
  - 프로젝트명/서피스가 비었나? → 아직 초기화 전
  - PRD(workflows)가 비었나? → PRD 전
  - 화면이 0개인가? → scaffold 전
  - 화면별 상태(draft/wireframed/confirmed/ready-for-dev)와 결손(Description/Cases 커버리지/Interface) 집계

### 2) 진행 현황 요약
- 전체 진행률(화면 수, 단계별 분포, 완결성 %)을 짧게 보여준다.
- 결손이 큰 화면 TOP 3(무엇이 빠졌는지)와 미결 질문(openQuestions)을 보여준다.

### 3) 다음 할 일 추천 (상태 기반)
아래 규칙으로 **지금 가장 먼저 할 1~2가지**를 추천하고, 사용자가 고르면 바로 그 커맨드 절차로 진행한다:
| 지금 상태 | 추천 |
|---|---|
| 초기화 전 | `/pd-init` |
| PRD 전 | `/pd-prd` |
| 화면 0개 | `/pd-scaffold` |
| draft 화면 있음 | 그 화면 `/pd-wireframe` |
| wireframed 화면 | `/pd-cases` → `/pd-interface` |
| 결손 있는 화면 | 해당 레이어 보강 |
| 다수 confirmed | `/pd-lint` → `/pd-handoff` |
| QA 검토 필요 | `/pd-qa` |

- `AskUserQuestion`으로 추천안을 제시하고(첫 번째가 권장), 고르면 해당 작업을 이어서 수행.

### 4) 치트시트 안내
- 전체 커맨드 한 줄 요약과 확인 페이지(index/prd/spec/handoff, 검토모드)를 함께 안내.
- 브라우저로 결과 보는 법: **`start.command`(맥)/`start.bat`(윈도) 더블클릭** → 자동으로 열림.

## 주의
- 사용자를 압도하지 말 것. "지금 할 1가지"를 명확히 제시하고 나머지는 접어둔다.
- 상태를 바꾸는 실제 작업은 각 전용 커맨드 절차를 따른다(이 커맨드는 길잡이+연결).
