---
description: 주요 플로우 정의 — 핵심 여정을 config/flows.js 에 묶어 flows.html 필름스트립으로 본다(복잡한 다이어그램 대체)
argument-hint: (인자 없음 · 대화형)
allowed-tools: Read, Write, Edit, AskUserQuestion, Glob
---

# /pd-flow — 주요 플로우 정의 (Flow 중심 기획·열람)

화면이 많아지면 전체 Flow Diagram이 복잡해진다. 그래서 **주요 여정(플로우)별로 화면을 묶어** 보는
`config/flows.js`를 정의한다. `flows.html`이 각 플로우를 **실제 화면 썸네일이 좌→우로 이어지는 필름스트립**으로 렌더한다.
(썸네일 클릭 → 해당 화면 열림)

## 절차

### 1) 후보 플로우 파악
- `config/prd.js`(또는 `docs/PRD.md`)의 `workflows[]`와 `config/screens.js`의 `flow.to` 간선을 읽어 **핵심 여정 후보**를 뽑는다.
- PRD 워크플로가 있으면 그것을 1차 플로우로 삼는다(이름·순서 재사용).

### 2) 플로우 구성
- 각 플로우: `{ id, name, surface?, desc?, steps:[{ screen:'<화면ID>', via?:'<전이 라벨>' }] }`
  - `steps` 순서대로. `via` = 앞 화면→이 화면 전이 동작/조건(화살표 라벨).
  - **분기가 큰 여정은 플로우를 나눈다**(예: "결제" 성공 경로 / "결제 실패·재시도"). 한 플로우엔 주 경로만.
  - 서피스가 다르면(모바일/PC웹) 플로우도 보통 분리(예: 사용자 플로우 / 운영자 플로우).
- 사용자가 "어떤 여정을 주요로 볼지" 선택하도록 `AskUserQuestion`으로 후보를 제시해도 좋다.

### 3) `config/flows.js` 작성
```js
window.PLANDECK_FLOWS = [
  { id:'FLOW-PAY', name:'간편결제', surface:'모바일', desc:'…',
    steps:[ {screen:'SCR-HOME-001'}, {screen:'SCR-DETAIL-001', via:'상품 선택'}, {screen:'SCR-PAY-001', via:'결제하기'}, {screen:'SCR-DONE-001', via:'성공'} ] },
];
window.PDK_FLOWS = window.PLANDECK_FLOWS;
```
- 미등록 화면 ID를 적어도 됨(필름스트립에 "미등록"으로 표시, 나중에 만들면 자동 연결).

### 4) 안내
- `flows.html`을 열면 플로우별 필름스트립이 보인다고 안내(개요의 "🧭 주요 플로우" 링크로도 접근).
- 화면이 늘면 이 파일에 플로우를 추가/갱신해 핵심 여정을 계속 정리.

## 주의
- 플로우는 '보는 관점'이다 — 화면 간선(flow.to)의 유일 소스는 여전히 screens.js. flows.js는 그 위에 얹는 '여정 묶음'.
- 썸네일은 각 화면을 `?bare=1`(크롬 숨김)로 렌더한 실제 화면이다.
