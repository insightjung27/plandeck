---
description: 경우의 수(예외) 매트릭스 — 화면상태 7종 + 입력검증 5종을 상태전이표로 작성(미정의는 빨강셀 게이트)
argument-hint: [화면ID]
allowed-tools: Read, Write, Edit, AskUserQuestion, Glob
---

# /pd-cases — 경우의 수(예외) 매트릭스

`$1`=화면ID. 화면의 **모든 상태와 예외**를 빠짐없이 정의한다. 엔진이 **상태 커버리지 그리드**로
미정의 상태를 빨강셀로 띄우고, 각 행을 **Given-When-Then 수용기준**으로 자동 렌더한다.

> 원칙(벤치마크: UI Stack·ISTQB·GOV.UK·NN/g): 상태명을 발명하지 말고 **고정 enum**에서만 고른다(그래야
> '빠진 상태'를 기계가 탐지). 적용 안 되는 상태는 침묵 누락이 아니라 **명시적 N/A**. 안내문구는 백엔드 raw가
> 아니라 **저작된 카피** + 표시위치 + 복구액션.

## 통제 어휘(고정 enum)
- **화면상태 7종**: `초기` · `로딩` · `정상` · `빈데이터` · `에러` · `권한없음` · `엣지`
- **입력검증 5종**(EP/BVA): `필수누락` · `형식오류` · `범위경계`(min-1/max+1) · `중복충돌` · `유효`
  - ※ 입력검증 5종은 **화면에 실제 입력 필드(components kind:'input')가 있을 때** 커버리지에 요구된다(선택형엔 미적용).
- 적용 불가: `N/A` (guard에 어떤 상태인지 명기 — 예: `guard:'엣지: 해당 없음'` → 엣지가 회색 N/A 처리)
- **placement 고정 enum**: `inline` · `toast` · `banner` · `summary` · `full-page` · `modal`

> 조합 케이스(권한×데이터유무 등 2+ 조건)는 현재 단일 state 축으로만 추적한다(조합 완결성은 비게이트·수동).
> 중요 조합은 각각을 별도 case 행으로 적고 guard에 조건을 명시한다.

## 절차

### 1) 대상 확인
- `config/screens.js`에서 `$1` page를 찾는다(없으면 /pd-screen 먼저). `context`·`components`·`flow.to`·`interface`를 참고.

### 2) 표준 상태 전수 제안
- **화면상태 7종을 먼저 제시**하고, 각각에 대해 다음 동작·안내문구를 채우게 한다. 해당 없으면 N/A.
- 입력 폼이 있으면(components에 input 류) **입력검증 5종**도 필드별로 제시.
- 조건이 2개 이상 조합(권한×데이터유무 등)이면 결정표식으로 묶어 최소 규칙으로(조합 폭발 방지).

### 3) `config/screens.js`의 `cases[]` 작성
각 행(ISTQB 상태전이표 형태):
```js
cases: [
  { state:'정상',   trigger:'진입', guard:'', result:'목록 표시', message:'', placement:'', target:'.pd-list',
    api:{ endpoint:'GET /orders', status:200 } },
  { state:'빈데이터', trigger:'진입', guard:'주문 0건', result:'빈 상태 안내', message:'아직 주문이 없어요', placement:'full-page', target:'.pd-list' },
  { state:'권한없음', trigger:'진입', guard:'미로그인', result:'로그인 화면 이동(SCR-LOGIN-001)', message:'로그인이 필요합니다', placement:'full-page', api:{ endpoint:'GET /orders', status:403 } },
  { state:'형식오류', trigger:'제출', guard:'이메일 형식 오류', result:'제출 막음', message:'이메일 형식이 올바르지 않습니다', placement:'inline', target:'.pd-input-email' },
]
```
- `result`가 다른 화면 ID면 그 전이가 flow.to와 일치하는지 확인(불일치 시 flow.to 보완 제안).
- 에러/권한/빈 상태는 가능하면 `api:{ endpoint, status }`로 백엔드 응답과 결속(403→권한없음, 404→빈, 5xx→에러).

### 4) 승격
- 화면상태 7종이 모두 정의(또는 N/A)되면 커버리지 완결. `status`를 `'confirmed'`로 승격(와이어+케이스 충족 시).
  단, 개발준비(ready-for-dev)는 interface까지 있어야 하므로 /pd-interface 후.

### 5) 안내
- CASES 패널(우하단 dock 🧩)에서 커버리지 그리드·표·GWT 확인 안내. 다음: `/pd-interface <ID>`.

## 주의
- state는 반드시 고정 enum. message는 저작된 사용자 문구(HTTP raw 금지). target은 화면 내부 `.pd-<역할>`.
- 매트릭스는 장식이 아니라 게이트 — 미정의 상태(빨강셀)가 있으면 개발준비로 못 올린다.
