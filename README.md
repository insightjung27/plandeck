# PlanDeck — 기획 중심 협업 킷

> **PRD 한 장에서 시작해 화면·기능·예외·개발 인터페이스까지, 하나의 명세로.**
> 기획자·디자이너·개발자·QA·의사결정자가 **각자 업무에 필요한 정보를 한곳에서 확인**하는 무빌드 정적 킷.

PlanDeck는 **디자인 툴·개발 IDE·테스트 러너를 대체하지 않습니다.** 실제 디자인은 Figma에서, 개발은 IDE에서,
테스트는 러너에서 합니다. PlanDeck가 하는 일은 **"무엇을 만들고·디자인하고·테스트해야 하는가"를 끊김 없이
정의하고, 각 역할이 그 정보를 한곳에서 확인**하게 하는 것 — 즉 **기획 명세의 단일 참조소(SSOT)**입니다.

PDK(화면설계서 엔진)의 검증된 코어 위에, PRD·경우의 수(예외)·개발 인터페이스(API/데이터 계약)·핸드오프를
얹었습니다. 빌드·서버 없이 HTML을 브라우저로 열면 바로 동작하고, GitHub Pages로 링크 공유됩니다.

---

## 무엇을 해결하나

화면 그림·설명·흐름·예외·API 명세가 Figma·노션·지라·엑셀에 흩어져 서로 어긋나는 문제를, **config 한 곳**에서
파생되는 자동 렌더로 없앱니다. 한 곳만 고치면 화면목록·Description·경우의수·개발계약·플로우가 **동시에** 갱신됩니다.

| J의 4대 요구 | PlanDeck의 답 |
|---|---|
| ① 간단 PRD → 기본 프로세스 화면 자동생성(모바일/PC웹/단말기) | `/pd-prd` → `/pd-scaffold` (맵 선행 + 멀티서피스) |
| ② 각 화면의 기능·버튼 구체화 | `/pd-wireframe` (큐레이션 스켈레톤 + 구조화 components) |
| ③ Description·Flow·**예외(경우의 수)** 정의 | `/pd-cases` (상태 7종+검증 5종 커버리지 게이트) · 자동 플로우 |
| ④ 개발에 필요한 **개발 인터페이스(API/데이터)** | `/pd-interface` + `/pd-handoff` (OpenAPI 3.1·마크다운·에이전트 번들 방출) |

---

## 5분 퀵스타트

1. 이 레포를 **`Use this template`** 으로 복제하거나 클론한다.
2. 폴더에서 **Claude Code**를 실행한다.
3. 커맨드를 순서대로 쓴다(질문에 답만 하면 됩니다):

```
/pd-init        # 프로젝트 이름·서피스(모바일/PC웹/키오스크…)·전역규칙
/pd-prd         # PRD 작성 (상위 기획 — 고정 7섹션 + 워크플로)
/pd-scaffold    # PRD → 기본 프로세스 화면 자동생성 (맵 승인 후)
/pd-wireframe   # 화면별 UI 골격 + 기능/버튼  (디테일 기획)
/pd-cases       # 화면별 경우의 수(예외) 매트릭스
/pd-interface   # 화면별 개발 인터페이스(API/데이터 계약)
/pd-qa          # QA 수용기준 확인·보강
/pd-flow        # 주요 플로우 정의 → flows.html 에서 핵심 여정 필름스트립
/pd-lint        # 완결성·무결성 점검 → 개발준비 승격
/pd-handoff     # 개발·QA 핸드오프(OpenAPI·스펙·테스트플랜·번들) 방출
/pd-version     # 기획서 버전 올리기·변경 이력 (이어서 버전 관리)
# 길잡이: 순서가 헷갈리면 아무 때나  /pd  — 지금 할 일을 안내
```

> **멀티 서피스**: 한 프로젝트에 모바일(아이폰 프레임+상태바)·**PC웹**(브라우저+GNB+사이드바)·**태블릿**을 함께 둘 수 있습니다.
> **주요 플로우**: 화면이 많아져도 `flows.html`이 플로우별로 실제 화면 썸네일을 좌→우 필름스트립으로 정리합니다.

4. 결과를 브라우저로 본다 — **`start.command`(맥)/`start.bat`(윈도)를 더블클릭**하면 서버 실행 + 브라우저 자동 오픈.
   (터미널 선호 시: `python3 -m http.server 8137` → `http://localhost:8137/`)
   - 루트 `index.html` = **워크스페이스 홈**(프로젝트 목록) → 프로젝트를 클릭하면 그 프로젝트 홈으로.
   - 프로젝트 홈(`projects/<slug>/index.html`) 안에서 개요·PRD·상세기획서·핸드오프·검토모드로 이동.

> **먼저 돌려보기:** `projects/order-pay/` 에 간편결제 **완성 데모**가 들어 있습니다.
> 워크스페이스 홈에서 "간편결제 데모" 카드를 열면 4대 기능이 모두 동작합니다.

> **막히면 `/pd`** — 커맨드 순서를 몰라도 지금 할 일을 안내합니다.

---

## 역할별로 무엇을 확인하나 (전원 동일 레포, 각자 보는 정보가 다름)

| 역할 | 여기서 **확인**하는 정보 | 실제 작업은 |
|---|---|---|
| **기획자** | (저작) PRD·화면·기능·예외·인터페이스 전부 | — (여기가 작업장) |
| **디자이너** | 어떤 화면을·어떤 구성요소로·어떤 상태(cases)까지 디자인할지 | Figma |
| **개발자** | API/데이터 계약·예외 분기·화면 흐름 (OpenAPI·번들로 받기) | IDE |
| **QA** | 화면별 수용기준(GWT)·상태 커버리지·테스트플랜(.feature) | 테스트 러너 |
| **의사결정자** | **검토 모드**로 프로토타입(화면+플로우) 둘러보고 결재 | 링크 열람만 |

자세한 역할 운영: **[docs/TEAM.md](docs/TEAM.md)**

---

## 화면 성숙도 (핸드오프 게이트)

```
draft  →  wireframed  →  confirmed  →  ready-for-dev
등록      골격+기능       예외+인터페이스    완결 동결(개발 착수 가능)
```
`ready-for-dev`는 Description+Cases(커버리지100%)+Interface가 모두 있어야 승격되며, 승격 시 **동결**됩니다.
이후 스펙이 바뀌면 목록에 **"변경됨"** 배지가 자동으로 떠 재검토를 알립니다(Figma의 'Changed' 무빌드 재현).

---

## 폴더 구조

```
index.html           워크스페이스 홈(프로젝트 목록)
start.command/.bat   더블클릭 런처(서버+브라우저 자동)
config/workspace.js  프로젝트 레지스트리
config/*.js          ★빈 스키마 템플릿(/pd-init 이 새 프로젝트로 복제)
engine/              엔진(수정 불필요·전 프로젝트 공유)
  common.js/.css     PDK 코어(화면목록·Description·Mermaid 플로우)
  plandeck.js/.css   확장(경우의수·인터페이스·상태칩·린트·검토모드·상세기획서·워크스페이스)
  handoff.js         핸드오프 집계기(OpenAPI·스펙·QA테스트플랜·번들)
.claude/commands/    슬래시 커맨드 14종(pd, pd-init, pd-prd, pd-scaffold, …, pd-version, pd-handoff)
templates/project/   새 프로젝트 페이지 셸(/pd-init 이 복제)
projects/<slug>/     각 프로젝트(자립형, 공유 engine 참조)
  config/*.js        이 프로젝트의 SSOT
  index/prd/spec/handoff.html + 화면 HTML
projects/order-pay/  완성 데모
docs/                GUIDE·TEAM·OPERATIONS·ARCHITECTURE
.github/CODEOWNERS   역할 레인 잠금
```

문서: **[GUIDE](docs/GUIDE.md)** · **[TEAM](docs/TEAM.md)** · **[OPERATIONS](docs/OPERATIONS.md)** · **[ARCHITECTURE](docs/ARCHITECTURE.md)**

---

## 설계 원칙

- **무빌드 정적** — 빌드·서버·번들러 없음. 브라우저로 바로 열림. GitHub Pages로 링크 공유.
- **config = SSOT** — 한 곳만 고치면 모든 패널이 자동 갱신. 사람이 읽고 git diff 가능.
- **git = 유일 동기화 버스** — 외부 라이브 싱크·백엔드 없음. PR 기반 비동기 협업.
- **계약은 인터페이스/의도** — 구현 코드를 생성하지 않는다(코드 덤프 ≠ 핸드오프).
- **엔진 최소 변경** — 확장은 설정·커맨드·가산 모듈로. 코어는 건드리지 않는다.
