# PRD 작성·채우기 가이드 (기획 담당자용)

> PRD 화면(`projects/<slug>/prd.html`)의 섹션이 **비어 보일 때** 원인과 채우는 법.
> 핵심 한 줄: **PRD는 "데이터"다.** `config/prd.js`에 값이 있고 **필드 이름만 맞으면** 화면은 **자동으로 채워진다**. 비어 보이면 "내용이 없거나(미작성)" "필드 이름이 틀린(스키마 오타)" 둘 중 하나다.

---

## 1. 큰 그림 — 내용은 어디에 있나

```
docs/PRD.md   ← 정본(SSOT). 사람이 읽고 쓰는 원본.
     │  (/pd-prd 로 동기화  또는  수동 반영)
     ▼
config/prd.js ← 렌더용 미러(window.PLANDECK_PRD). 화면이 읽는 "데이터".
     │  (엔진이 자동 렌더)
     ▼
prd.html      ← PRD 탭 화면. 섹션 ①~⑫ 를 자동으로 그린다.
```

- **직접 고칠 곳**: `docs/PRD.md`(정본). 여기 고치고 `config/prd.js`에 반영한다.
- **화면이 실제로 읽는 곳**: `config/prd.js`. **섹션이 비면 거의 항상 이 파일 문제다.**
- 두 파일은 **항상 같은 내용**이어야 한다(아래 6. 함정 참고).

---

## 2. 섹션이 비는 이유 (체크 순서)

1. **데이터가 아예 없다** → `config/prd.js`에 해당 필드가 없음 → 내용을 쓴다(3절 스키마대로).
2. **필드 이름이 틀렸다(스키마 오타)** → 값은 있는데 엔진이 못 읽음 → 이름을 3절 표대로 맞춘다.
   - 예) `scope`를 배열이 아니라 `{includes, excludes}` 객체로 쓰거나, `requirements`에 `reqId` 대신 `id`를 쓰는 등. (엔진은 신·구 두 이름을 모두 지원하지만, **오타는 지원하지 않는다**.)
3. **요구사항 추적(⑧)이 0%다** → `requirements[]`는 있는데 화면(`screens.js`)에 `reqIds`가 안 달림 → 5절 참고.

> 확인 방법: 미리보기(`start.command`)로 `prd.html`을 열어 섹션을 눈으로 본다. "—"만 보이면 1·2번, 표가 "⚠ 화면 없음"이면 3번.

---

## 3. 섹션별 무엇을 채우나 (`config/prd.js` 필드 스키마)

`config/prd.js`는 `window.PLANDECK_PRD = { ... }` 한 덩어리다. 각 섹션 ↔ 필드:

| 화면 섹션 | 필드 | 형식(권장=신 스키마) |
|---|---|---|
| 북극성 | `northStar` | 문자열 |
| ① 배경 | `background` | 문자열 |
| ② 목표 | `goals` | 문자열 배열 `['...', '...']` |
| ③ 사용자 | `users` | `[{ role, need, channel }]` *(구: `{role, jobStory}`도 가능)* |
| ④ 범위 | `scope` | `{ includes:[...], excludes:[...] }` *(구: `scope:[...]` + `outOfScope:[...]`)* |
| ⑤ 성공지표 | `successMetrics` | `[{ metric, target }]` |
| ⑥ 제약·가정·의존성 | `constraints` / `assumptions` / `dependencies` | 각각 문자열 배열 |
| ⑦ 릴리스 | `releases` | `[{ phase, items:[...] }]` *(구: `{name, scope:[...], when}`)* |
| ⑧ 요구사항 추적 | `requirements` | `[{ id, title, surface }]` *(구: `{reqId, text, surfaces:[...]}`)* — 5절 |
| ⑨ 핵심 워크플로 | `workflows` | 문자열 배열 *(구: `[{name, steps:[...]}]`)* |
| ⑩ 경쟁·차별화 | `alternatives` | `{ competitors:[{name, limit}], differentiation, wtp, risk }` |
| ⑪ 정책·규제·권한·비기능 | `nfr` / `rbac` / `privacy` / `regulation` | 각각 `{키: 설명}` 객체 |
| ⑫ 확정된 결정 | `resolvedDecisions` | 문자열 배열 |
| ⚠️ 미결 질문 | `openQuestions` | 문자열 배열 |

> **⑨~⑫는 선택**이다. 해당 필드가 있으면 섹션이 생기고, 없으면 조용히 생략된다(= 다른 프로젝트에 영향 없음).
> **신규 작성은 "신 스키마"(권장 열)로** 쓴다. 구 스키마는 과거 프로젝트 호환용으로만 남아 있다.

끝에 `window.PDK_PRD = window.PLANDECK_PRD;` 줄은 **지우지 말 것**.

---

## 4. 채우는 두 가지 방법

**A. AI 커맨드(권장·쉬움)** — Claude Code에서 `/pd-prd` 입력. 질문에 답하면 `docs/PRD.md`를 갱신하고 `config/prd.js`에 자동 반영한다. (다른 AI 도구는 "PRD의 ③사용자·④범위를 채워줘"처럼 자연어로)

**B. 직접 수정** — `docs/PRD.md`를 고친 뒤 `config/prd.js`의 해당 필드를 **3절 스키마대로** 맞춰 쓴다. JS 객체 문법(따옴표·쉼표)에 주의.

---

## 5. ⑧ 요구사항 추적(PRD ↔ 화면) 채우기

이 섹션은 **요구사항과 화면을 연결**해 커버리지(%)와 빠진 부분을 자동 검출한다. 두 곳을 맞춰야 한다:

1. `config/prd.js`의 `requirements`에 요구사항 추가:
   ```js
   { id: 'REQ-P01', title: '홈 2대 시나리오·개인화 허브', surface: 'parent' },
   ```
2. 그 요구사항을 구현하는 **화면**(`config/screens.js`)에 `reqIds` 연결:
   ```js
   { id: 'SCR-...', label: '홈', href: 'p-home.html', surface: 'parent',
     reqIds: ['REQ-P01'], ... },
   ```

→ 그러면 ⑧ 표가 "요구사항 → 연결된 화면"으로 채워지고 커버리지가 올라간다.
- **⚠ 화면 없음**: 요구사항은 있는데 `reqIds`로 가리키는 화면이 없음 → 화면을 만들거나 연결한다.
- **🔗 미연결 화면**: 화면에 `reqIds`가 없음 → 해당 요구사항을 PRD에 넣고 연결한다.
- **👻 PRD에 없는 요구사항 참조**: 화면의 `reqIds`가 PRD에 없는 id → 오타이거나 PRD에 추가 필요.

---

## 6. 함정 — 정본(PRD.md)과 미러(config/prd.js)가 어긋날 때 ⚠️

- `docs/PRD.md`가 **옛 버전**이고 `config/prd.js`가 **최신**인 상태에서 `/pd-prd`로 재생성하면 **최신 내용이 옛 내용으로 덮어써질 수 있다.**
- 그래서 **둘은 항상 같은 버전·같은 내용**으로 유지한다. 한쪽만 고쳤다면 다른 쪽도 바로 맞춘다.
- 애매하면: `config/prd.js`(화면이 실제 읽는 것)를 기준으로 `docs/PRD.md`를 맞춘다.

---

## 7. 완료 전 검증 (항상)

```bash
node -c engine/plandeck.js                      # (엔진을 건드렸을 때만) 문법 체크
node tools/verify-render.js  <project>          # 전 화면 렌더 위험 0
node tools/verify-links.js   <project>          # 깨진 링크·막다른 화면 0
node tools/verify-roles.js   <project>          # screens.js ↔ 화면 정합
node tools/verify-flow.js    <project>          # flow·flows.js 화면참조 정합
node tools/verify-naming.js  <project>          # 기능명 한글 일관성(8절)
```

미리보기로 `prd.html`을 열어 ①~⑫가 **눈으로 채워졌는지** 최종 확인한다.

---

## 8. 기능명 표기 규약 — "기능명은 항상 한글" (일관성)

기능 정의서(`features.html`)의 **기능명 열은 사람이 읽는 이름이므로 반드시 한글**이다(약어 혼용 가능: "SOP(표준운영지침) 조회"처럼 한글을 함께). **개발 식별자(코드)는 "API/시점" 열**에 둔다 — 한 열에 코드, 한 열에 한글로 역할을 분리한다.

| 유형 | 기능명(한글) ← 이 필드 | API/시점(코드) ← 이 필드 |
|---|---|---|
| 액션/조회 | `interface.writes[].intent` / `reads[].intent` | `method` + `path` (예: `POST /orders`) |
| 이벤트 | `interface.events[].when`(발생 시점·한글) 또는 `intent` | `events[].name`(dot-code 예: `order.created`) |

**규칙**
- 액션/조회에는 **`intent`(한글)를 반드시** 넣는다. 없으면 영문 `id`(`createOrder` 등)가 기능명으로 노출돼 깨진다.
- 이벤트의 `name`은 **dot-code(영문 식별자)로 통일**하고(`주어.동사` 과거형 권장: `order.created`), 한글 설명은 **`when`**(또는 `intent`)에 넣는다.
- 순수 약어(SOP·FAQ·PG 등)만으로 기능명을 두지 말고 **한글을 함께** 쓴다("자주 묻는 질문(FAQ)").

**자동 검사**: `node tools/verify-naming.js <project>` 가 렌더될 기능명에 **한글이 없으면 차단**한다. 이 게이트가 통과해야 일관성이 보장된다(기획자가 매번 눈으로 확인할 필요 없음).
