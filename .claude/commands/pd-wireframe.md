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

## 표준 와이어프레임 컴포넌트 팔레트 (plandeck-ui.css 제공)
★ **흑백 화면설계서(스토리보드) 수준** — 디자인(브랜드색·그림자)은 입히지 않는다(그건 /pd-figma-sync).
표준 요소로만 조립한다(근거: 화면설계서 표준 + Balsamiq/Storyboard That). 모바일은 아이폰 프레임·상태바가 자동 적용된다.
- 루트: `.pd-screen`(★`.device-screen` 직속 단일 자식). 모바일이면 엔진이 `.pd-app` 셸로 전환.
- **헤더/내비**: `.pd-appbar`(뒤로 `.pd-ab-btn`+타이틀 `.pd-ab-title`+액션) · `.pd-largetitle`(`.sub`) · 하단 `.pd-tabbar`(`.pd-tab`/`.is-active`)
- **타이틀/텍스트/라인**: `.pd-wf-title` · `.pd-section-title` · `.pd-wf-text` · `.pd-wf-label`(요소 라벨) · `.pd-divider`(구분선)
- **입력**: `.pd-field`(`.pd-field-label`) · `.pd-input` · `.pd-select` · `.pd-textarea` · `.pd-check`(`.box`/`.box.radio`/`.on`) · `.pd-toggle`
- **표시**: `.pd-card`(`.flat`) · `.pd-list`+`.pd-row`(`.pd-row-icon`/`.pd-avatar`/`.pd-row-main`/`.pd-row-title`/`.pd-row-sub`/`.pd-row-trail`/`.pd-row-value`/`.pd-chev`) · `.pd-table`(th/td) · `.pd-badge` · `.pd-rating` · `.pd-banner` · `.pd-empty-state`
- **이미지 영역**: `.pd-hero-img`(큰 이미지 플레이스홀더·대각선+"이미지 영역" 라벨) · `.pd-thumb`(작은 썸네일)
- **탐색/필터**: `.pd-searchbar` · `.pd-segment`(`.is-active`) · `.pd-chips`+`.pd-chip`(`.is-active`/`.is-brand`)
- **버튼/CTA**: `.pd-btn`(`.primary`/`.secondary`/`.ghost`/`.block`) · 하단 `.pd-cta`(가격행 `.pd-pricerow`)
- **아이콘**: 아웃라인 SVG(stroke 1.6~2, currentColor). ★이모지 금지.
- 서피스 기본 골격: 모바일=앱바/대형타이틀+바디+하단 CTA 또는 탭바 / PC웹=상단GNB+본문 / 키오스크=큰 타이틀+대형 버튼

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

예(흑백 와이어프레임):
```html
<div class="pd-screen">
  <header class="pd-appbar"><button class="pd-back pd-ab-btn">‹</button><div class="pd-ab-title">제목</div><span class="pd-ab-spacer"></span></header>
  <div class="pd-app-body">
    <div class="pd-list"><button class="pd-row"><div class="pd-avatar"></div><div class="pd-row-main"><div class="pd-row-title">항목</div><div class="pd-row-sub">설명</div></div><span class="pd-chev">›</span></button></div>
  </div>
  <div class="pd-cta"><button class="pd-btn-next pd-btn primary block">다음</button></div>
</div>
```
※ 역할 클래스(`.pd-back`·`.pd-btn-next` 등)는 컴포넌트 클래스와 **함께** 붙인다(hover·CTA·target 연결).

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
