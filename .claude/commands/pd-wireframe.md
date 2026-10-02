---
description: 화면 설계 — 큐레이션 스켈레톤 팔레트로 UI 골격을 조립하고 기능/버튼(components)과 Description을 구조화 작성
argument-hint: [화면ID]
allowed-tools: Read, Write, Edit, AskUserQuestion, Glob
---

# /pd-wireframe — 화면 설계 (스켈레톤 + 기능/버튼 + Description)

`$1`=화면ID. 해당 화면을 **대화형으로 설계**한다. 결과: 화면 HTML에 **무채색 스켈레톤 UI**가 들어가고,
`config/screens.js`의 그 화면 `components[]`(구조화된 기능/버튼)와 `description[]`이 채워진다.

> 원칙: **디자인/CSS(색·폰트·간격·이미지)는 다루지 않는다**(그건 /pd-figma-sync). 여기서는
> **무엇이 있고(요소)·무슨 역할이며(기능)·어디로 이어지는지(흐름)**만 정의한다.
> 레이아웃은 '무에서' 즉흥 생성하지 말고 아래 **큐레이션 팔레트**에서 조립한다(일관성·anti-slop).

## 큐레이션 스켈레톤 팔레트 (plandeck.css 제공)
- 루트: `.pd-screen` (★W-3: `.device-screen` 직속 단일 자식)
- 유틸: `.pd-sk-header` · `.pd-sk-title` · `.pd-sk-line`(`.sm`/`.w-50`/`.w-70`) · `.pd-sk-box` · `.pd-sk-hero` ·
  `.pd-sk-list`+`.pd-sk-row` · `.pd-sk-input` · `.pd-sk-btn`(`.sec`) · `.pd-sk-tabbar` · `.pd-sk-chip`
- 서피스 기본 골격: 모바일=헤더+바디+하단 CTA(또는 탭바) / PC웹=상단GNB+사이드+본문 / 키오스크=큰 타이틀+대형 버튼

## 절차

### 1) 대상 확인
- `config/screens.js`에서 `$1` page를 찾는다(없으면 /pd-screen 먼저 안내).
- `label`·`context`·`surface`·`flow.to`를 읽어 설계 출발점으로.

### 2) 대화형 구성
- 어떤 요소가 필요한지 짧게 정한다. 막막하면 context+flow 근거로 **초안 제안**.
- 각 요소의 **역할(기능)**과 **연결(클릭 시 이동/호출)** 확인. 연결은 flow.to와 일치.

### 3) 화면 HTML 작성 (스켈레톤)
- 화면 파일(`page.href`)의 `.device-screen` 내부를 **단일 `.pd-screen`** 으로 교체.
- 요소에 스켈레톤 유틸 + **안정적 역할 클래스 `.pd-<역할>`** 부여(예: `.pd-btn-next`, `.pd-list`, `.pd-input-id`).
  - ★같은 역할 2개↑면 `-1`,`-2` 접미.
- 시각 스타일(색/폰트/여백) 넣지 않는다 — 유틸 클래스만.

예:
```html
<div class="pd-screen">
  <div class="pd-sk-header"><div class="pd-sk-chip pd-back" style="width:36px"></div><div class="pd-sk-title pd-title" style="flex:1"></div></div>
  <div class="pd-sk-list pd-list"><div class="pd-sk-row"></div><div class="pd-sk-row"></div></div>
  <button class="pd-sk-btn pd-btn-next">다음</button>
</div>
```

### 4) `config/screens.js` 채우기
- **components[]** (구조화된 기능/버튼):
  ```js
  components: [
    { role:'.pd-btn-next', kind:'button', label:'다음', action:{ on:'click', do:'go:SCR-PAY-001' } },
    { role:'.pd-list', kind:'list', label:'상품 목록', action:{ on:'click', do:'go:SCR-DETAIL-001' } },
  ]
  ```
  - `do`: `go:<화면ID>` | `write:<interface write id>` | `read:<interface read id>` | 설명 문자열
- **description[]** (기능·흐름 중심, 디자인 묘사 금지), 각 항목 `{ text, target }`, target=`.pd-<역할>`:
  ```js
  description: [ { text:'다음 버튼 → 결제 화면(SCR-PAY-001) 이동', target:'.pd-btn-next' } ]
  ```
- **status** 를 `'wireframed'`로 승격(아직 cases/interface 전).

### 5) 검증 안내
- 화면을 열어 Description/INTERFACE 패널 항목 hover 시 해당 `.pd-<역할>` 요소가 강조되는지 확인 안내.
- 다음: `/pd-cases <ID>`(예외) → `/pd-interface <ID>`(개발 계약).

## 주의
- 디자인/CSS 금지. `.pd-screen` 단일 래퍼 + `.pd-<역할>` + target 일치 필수. flow.to는 새로 만들지 말고 반영만.
