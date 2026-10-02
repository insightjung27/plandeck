# 아키텍처 — 엔진 원리 · 스키마 레퍼런스 · 확장 규칙

## 1. 큰 그림
PlanDeck는 PDK(검증된 화면설계서 엔진) 코어 위에 가산 레이어를 얹은 **무빌드 정적 킷**이다.

```
config/*.js  (SSOT)  ──►  engine/common.js  (PDK 코어: 목록·Description·Mermaid 플로우)
                     └──►  engine/plandeck.js (확장: 경우의수·인터페이스·상태칩·린트·검토모드·상세기획서)
                     └──►  engine/handoff.js  (집계: OpenAPI·스펙·테스트플랜·번들)
```
- **설정이 유일 소스**, 엔진은 그걸 읽어 화면 주변 장치를 자동 렌더. 한 곳만 고치면 전부 갱신.
- **엔진 최소 변경**: 확장은 코어를 건드리지 않고 `plandeck.js`/`handoff.js`를 **뒤에 가산**. 코어는 `PDK_*` 전역을 읽고,
  설정 파일은 `PLANDECK_*`를 선언한 뒤 `window.PDK_* = window.PLANDECK_*`로 미러해 코어 호환을 유지한다(회귀 0).

## 2. 로딩 순서 (각 HTML 로더)
```
config/devices.js → project.js → entities.js → prd.js → screens.js → engine/common.js → engine/plandeck.js
```
- 캐시버스터(쿼리)로 변경 즉시 반영. `common.js`는 **동기** 로드(async/defer/module 금지 — 아이콘 경로 자동감지가 깨짐).
- `plandeck.js`는 `common.js`의 동기 init 뒤에 `setTimeout(0)`로 실행돼 dock 버튼을 추가.
- 문서 페이지(index/prd/spec)는 `common.js` 없이 `plandeck.js`만(디바이스 목업 불필요). handoff.html은 `handoff.js`.

## 3. 핵심 불변식 (깨지 말 것)
- **간선은 `flow.to` 하나로만**(from 금지). 들어오는 관계도 출발 화면의 to에. → from/to 불일치 원천 차단.
- **화면 루트는 `.device-screen` 직속 단일 `.pd-screen`**(W-3). hover dim이 firstElementChild를 화면 본문으로 가정.
- **같은 역할 2개↑는 `-1`/`-2` 접미**(W-4). 겹치면 강조가 엉뚱한 요소를 잡음.
- **역할 클래스 `.pd-<역할>`는 디자인 적용 후에도 보존**. description/cases/interface의 target이 이것과 1:1.
- **interface의 request/response는 `{entities.X}` 별칭**(스키마 인라인 금지). 엔티티는 entities.js에 1회 정의.
- **상태(state)는 고정 enum**에서만. 발명 금지(그래야 커버리지 결손을 기계가 탐지).

## 4. 스키마 레퍼런스

### project.js — `window.PLANDECK_PROJECT`
`{ name, description, surfaces:[{key,device,label}], constitution:{auth,baseUrl,errorConvention,naming}, device(getter), responsive }`

### prd.js — `window.PLANDECK_PRD`
`{ background, goals[], users[{role,jobStory}], scope[], outOfScope[], successMetrics[{metric,target}],
   constraints[], assumptions[], dependencies[], releases[{name,scope[],when}],
   requirements[{reqId,text,surfaces[]}], workflows[{name,surface,steps[{screen,via,branch}]}], openQuestions[] }`

### entities.js — `window.PLANDECK_ENTITIES`
`{ <Name>: { name, description, fields:[{name,type,format?,enum?,required?,example?,note?}] } }`
필드 어휘 = JSON Schema 2020-12 / OpenAPI 3.1 정합(방출물이 그대로 유효).

### screens.js — `window.PLANDECK_SCREENS = [{ category, pages:[page] }]`
page:
```
id, label, href, surface, entry(bool), reqIds[], context,
status: 'draft'|'wireframed'|'confirmed'|'ready-for-dev',
designed(bool), figmaLink, _hash(동결 해시, /pd-lint가 기록),
components: [{ role:'.pd-<역할>', kind, label, action:{on,do} }],   // do: go:<id>|write:<id>|read:<id>|설명
description: [{ text, target:'.pd-<역할>' }],
cases: [{ state(enum), trigger, guard, result, message, placement, recovery, target, api:{endpoint,status}, priority?, testId? }],
interface: {
  reads:  [{ id, intent, method, path, params?:[{in:'query|path|header',name,type,required,example,note}],
             response:'{entities.X}' | '{entities.X}[]'(배열), errors?:[{status,when,message}], auth, target }],
  writes: [{ id, intent, method, path, successStatus?(기본 POST→201/DELETE→204/그외 200),
             params?:[…], request:'{entities.X}', response:'{entities.Y}',
             errors:[{status,when,message}], auth, idempotency, target }],
  events: [{ name, when, payload:'{entities.X}' }],   // → OpenAPI webhooks 로 방출
},
flow: { to:[{ screen, via, branch, kind:'auto', delayMs?, trigger:'.pd-<역할>', onCall:'<write id>' }] }
# cases 행 추가 필드: placement(enum), recovery, priority(P0~P2), testId — QA 메타
# 핸드오프 방출: 에러=RFC9457 Problem(application/problem+json), path/query=parameters, 멱등=Idempotency-Key 헤더, operationId=read/write id
```
**state enum**: `초기·로딩·정상·빈데이터·에러·권한없음·엣지` + 입력검증 `필수누락·형식오류·범위경계·중복충돌·유효` + `N/A`.

## 5. 엔진 함수 지도
| 모듈 | 함수 | 역할 |
|---|---|---|
| common.js | applyDevice/injectPageNav/injectPageDetail/injectFlowDiagram/injectDock | PDK 코어(목업·목록·Description·Mermaid 플로우·dock) |
| plandeck.js | applySurfaceDevice | 현재 화면의 서피스 디바이스로 재적용(멀티서피스) |
| plandeck.js | injectStatusChips | 상태 칩 + 동결 해시 비교 "변경됨" |
| plandeck.js | injectCasesPanel | 경우의수: 커버리지 그리드 + 상태전이표 + GWT |
| plandeck.js | injectInterfacePanel | 개발 계약: reads/writes/events + 엔티티 참조 + JSON 복사 |
| plandeck.js | injectDockButtons / injectLintBanner | CASES·INTERFACE dock 버튼 / 무결성 경고 |
| plandeck.js | renderPRD / renderOverview / renderSpec | prd.html / index.html / spec.html 문서 렌더 |
| plandeck.js | setupReviewMode | 검토 모드(의사결정자) 토글 + `?mode=review` |
| handoff.js | buildOpenAPI(Problem·params·webhooks·operationId)/buildMarkdown/buildGherkin/buildQAChecklist/buildBundle/coverageRows | 집계 방출(OpenAPI 3.1·마크다운 스펙·QA .feature·QA 체크리스트·에이전트 번들·완결성 대시보드) |

## 6. 확장 규칙
- 새 기능은 **설정 필드 + plandeck.js의 새 함수 1개 + dock 버튼 1줄**로. 코어(common.*)는 손대지 않는다.
- 새 상태/뱃지는 기존 판정을 흔들지 않게 덧붙인다. 변경 전 최소 예제로 회귀 확인.
- **코드 생성 금지**: 계약은 '인터페이스/의도'. 실행 코드·실풀스택 생성으로 확장하지 않는다(정체성 보존).

## 7. 폐쇄망/오프라인
- **Mermaid = 자체 호스팅 포함**(`engine/vendor/mermaid.min.js`). common.js가 vendor를 **우선 비동기 로드**하고 실패 시에만 CDN 폴백 →
  폐쇄망에서도 플로우가 뜬다(코어의 유일한 런타임 외부 의존 제거).
- **Pretendard(글꼴)**: 아직 CDN @import(common.css). 폐쇄망이면 시스템 폰트로 graceful degrade(기능 영향 없음).
  완전 self-contained가 필요하면 `engine/vendor/*.woff2` + `plandeck.css`에 `@font-face`를 추가(로드맵).
- **디자인 토큰**: PlanDeck는 토큰 SSOT를 보유하지 않는다 — 토큰 정본은 Figma/디자인시스템이고 화면당 figmaLink로 연결만 한다.

## 8. 설계 근거(벤치마크 요약)
- PRD→화면: Sketchflow **맵 선행** + Lovable **계획 리뷰 게이트**(단, 우리 계획=config=결정론 소스).
- 경우의수: UI Stack 7상태 전수 + ISTQB 상태전이표/결정표 + GOV.UK 메시지 계약 + NN/g 완결성.
- 개발 인터페이스: Event Modeling **화면=슬라이스**(reads/writes/events) + OpenAPI 3.1/JSON Schema 어휘 + W3C 토큰 별칭.
- 핸드오프: contract-first SSOT(한 소스 → 사람용 스펙 + 기계용 OpenAPI + 에이전트 번들).
- 협업: Spec Kit의 'spec을 파일로' + Figma 'ready/Changed' 자동무효화(해시) + Linear 고정 스키마 + git 단일 싱크.
> 배제: 라이브 SaaS 싱크·백엔드·코드 덤프 핸드오프·추가 CDN·떠다니는 별도 문서(무빌드·정적 철학 위배).
