---
description: 디자인 연결 — 디자이너가 Figma에서 완성한 시안을 화면에 연결(참조)하고 designed:true + figmaLink 저장
argument-hint: [화면ID] [figma url]
allowed-tools: Read, Write, Edit, AskUserQuestion, Glob
---

# /pd-figma-sync — Figma 시안 연결 (디자이너 레인)

`$1`=화면ID, `$2`=Figma URL(node-id 포함 권장).

> ★ PlanDeck는 디자인을 '만드는' 도구가 아니다. **디자인은 Figma에서** 하고, 여기서는 그 결과를
> 화면설계서에 **연결(참조)**해 "이 화면의 확정 시안이 무엇인지"를 팀 모두가 한곳에서 확인하게 한다.
> 디자이너는 PlanDeck에서 "어떤 화면을, 어떤 구성요소(components)로, 어떤 상태(cases)까지 디자인해야 하는지"
> 정보를 확인하고, Figma에서 작업한 뒤 그 링크를 여기에 건다.

## 절차

### 1) 대상 확인
- `config/screens.js`에서 `$1` page를 찾는다. 와이어프레임(`.pd-screen` 스켈레톤)이 있어야 한다(없으면 /pd-wireframe 먼저).

### 2) Figma 시안 연결 (+ 선택: 스켈레톤에 반영)
- 기본은 **연결**이다: 해당 화면의 figmaLink를 저장해 팀이 확정 시안을 바로 열람하게 한다.
- (선택) 와이어프레임 스켈레톤에 시안의 시각 스타일을 가볍게 반영하고 싶다면 화면 파일 내부 `<style>`/인라인으로만.
- ★**역할 클래스 `.pd-<역할>`를 지우지 않는다** — Description/INTERFACE/Cases 의 target hover 강조가 이 클래스에 의존.
- 엔진(common.css/plandeck.css)은 수정 금지. 실제 디자인 산출물은 Figma가 정본.

### 3) config 갱신
- 해당 page의 `designed: true`, `figmaLink: '<url>'` 설정.
- (status는 디자인과 독립 — 기획 확정 게이트는 /pd-lint 소관. 디자인만으로 ready-for-dev 되지 않음.)

### 4) 안내
- 좌측 목록 디자인 뱃지가 '반영'으로, 헤더 Figma 버튼이 활성화됨을 안내.

## 주의
- 역할 클래스 보존 필수. 엔진 파일(common.*/plandeck.*) 수정 금지. `.device-screen` 직속 단일 `.pd-screen` 구조 유지.
- Figma 데스크탑 앱/계정 연결이 필요할 수 있음. 오프라인/폐쇄망이면 이 단계는 선택(스켈레톤 + 명세(구성요소·상태·흐름)만으로도 핸드오프 가능).
- ★ 디자인 토큰(색·타이포·간격·그리드)의 **정본은 Figma/디자인시스템**이다. PlanDeck는 토큰 SSOT를 보유하지 않는다
  (화면당 figmaLink로 연결만). "무엇을·어떤 상태까지 그릴지"는 PlanDeck에서, "어떤 비주얼 기준으로"는 Figma에서.
