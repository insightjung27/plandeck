---
description: 개발 인터페이스(API/데이터 계약) — 화면=슬라이스로 reads/writes/events와 엔티티를 정의(OpenAPI 방출 가능)
argument-hint: [화면ID]
allowed-tools: Read, Write, Edit, AskUserQuestion, Glob
---

# /pd-interface — 개발 인터페이스(API·데이터 계약)

`$1`=화면ID. 그 화면이 개발에 필요로 하는 **API·데이터 계약**을 정의한다. INTERFACE 패널(dock 🔌)에서 렌더되고,
`/pd-handoff`가 전 화면을 모아 **OpenAPI 3.1 + 마크다운 스펙 + 에이전트 번들**로 방출한다.

> 모델(벤치마크: Event Modeling "화면=슬라이스" + OpenAPI/JSON Schema 2020-12 + W3C 토큰 별칭):
> 화면은 **reads(조회)·writes(명령)·events(발생)**를 묶는다. 데이터 구조는 `config/entities.js`에 **한 번 정의**하고
> 화면은 `'{entities.Order}'` 별칭으로 **참조만**(중복 금지). 비개발자가 raw OpenAPI를 손으로 쓰지 않는다 —
> 이 평이한 JS 객체만 채우면 핸드오프가 유효한 OpenAPI로 직렬화한다.

## 절차

### 1) 대상 확인 & 전역규칙
- `config/screens.js`에서 `$1` page, `config/entities.js`, `config/project.js`의 `constitution`(인증·baseUrl·에러규약)을 읽는다.
- 화면의 `components`(버튼/폼)·`cases`(에러/권한/빈)·`flow.to`를 근거로 필요한 호출을 도출.

### 2) 엔티티 정의/참조
- 이 화면이 다루는 데이터 객체가 entities.js에 없으면 추가:
  ```js
  Order: { name:'주문', description:'...', fields:[
    { name:'id', type:'string', format:'uuid', required:true, example:'ord_1' },
    { name:'amount', type:'integer', required:true, example:12900, note:'원(KRW)' },
    { name:'status', type:'string', enum:['pending','paid','failed'], required:true },
  ]}
  ```
  - 필드 어휘는 JSON Schema 2020-12(type/format/enum/required/example)에 맞춘다.

### 3) 화면의 `interface` 작성
```js
interface: {
  reads: [
    { id:'getCart', intent:'장바구니 조회', method:'GET', path:'/cart',
      response:'{entities.Cart}', auth:'Bearer', target:'.pd-list' },
  ],
  writes: [
    { id:'createOrder', intent:'주문 생성', method:'POST', path:'/orders',
      request:'{entities.OrderDraft}', response:'{entities.Order}',
      errors:[ { status:402, when:'결제 실패', message:'결제에 실패했습니다' },
               { status:409, when:'재고 없음', message:'품절된 상품입니다' } ],
      auth:'Bearer', idempotency:'Idempotency-Key 헤더', target:'.pd-btn-pay' },
  ],
  events: [ { name:'order.created', when:'주문 생성 성공 시', payload:'{entities.Order}' } ],
}
```
- `target`으로 '이 버튼→이 write'를 와이어프레임 요소에 묶는다(hover 강조).
- cases의 에러 상태(403/404/5xx/402..)와 writes의 `errors[]`를 **일치**시킨다(예외=API 계약 일원화).
- `components`의 `action.do:'write:createOrder'`가 여기 id와 연결되는지 확인.

### 4) 승격
- reads/writes가 채워지고 Description·Cases도 있으면 `status`를 `'confirmed'`로. 전부 완결+검토되면 `/pd-lint`로 `'ready-for-dev'` 승격.

### 5) 안내
- INTERFACE 패널(dock 🔌)에서 계약 확인 + '계약 JSON 복사' 안내. 전체 핸드오프는 `/pd-handoff`.

## 주의
- request/response는 반드시 `{entities.X}` 별칭(스키마 인라인·raw hex 금지 → SSOT 유지).
- 계약은 '인터페이스/의도'지 구현 코드가 아니다. 실행 로직은 개발자 몫으로 남긴다.
