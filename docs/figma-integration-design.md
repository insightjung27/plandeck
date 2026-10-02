# PlanDeck × Figma 연동 설계 (Figma MCP 실연결)

> 목표(J): 디자이너가 Figma로 만든 결과물을 **Figma MCP로 연결 → PlanDeck 화면에 매핑 → 프로토타입으로 승격**해, 의사결정자·팀이 **눌러보며 작동**시켜볼 수 있게. 쉽고 편하게.

본 문서는 구현 전 **설계 확정용**이다. 확정 후 Phase 순서로 구현한다.

---

## 0. 핵심 제약과 그로부터 나온 구조

**Figma Dev Mode MCP는 "로컬·작성시점" 서버다.** Figma 데스크톱 앱과 함께 로컬에서 돌고, Claude Code(또는 IDE)가 MCP로 접속해 **현재 선택한 프레임**의 `get_code`·`get_image/get_screenshot`·`get_variable_defs`·`get_code_connect_map`을 가져온다(2026-02 Claude Code 양방향 지원). → **배포된 정적 사이트(GitHub Pages)는 런타임에 MCP를 호출할 수 없다**(localhost·세션·CORS).

그래서 PlanDeck의 무빌드·정적·git-동기 원칙을 지키는 유일하게 올바른 구조는 **2단 분리**다:

```
[작성 시점 · Claude Code]              [런타임 · 정적 사이트/GitHub Pages]
Figma 디자인                            화면(device frame) 안에
  │  (A) Figma Dev Mode MCP  ─┐         ├─ 와이어프레임(현행)
  │       get_image/tokens    │  매핑    ├─ 디자인 이미지(구워둔 PNG/SVG)  ← 기본 승격
  │  (B) Figma REST API  ─────┤  +저장   └─ 프로토타입 임베드(iframe)       ← 상위 승격(작동)
  │       /v1/images (PAT)    │
  └───────────────────────────┘
        /pd-figma-sync 가 config/screens.js(figma 필드) + assets/figma/ 에 커밋 → 배포
```

- **MCP = 작성시점 브리지**: Claude Code가 디자인(이미지·토큰·코드맵)을 끌어와 레포에 **굽는다**.
- **런타임 = 구워진 결과 표시**: 이미지(정적·항상 동작) 기본, 프로토타입 임베드(상호작용)는 상위 승격.
- REST API는 **헤드리스 폴백**(데스크톱·MCP 없이 토큰만으로 이미지 내보내기).

---

## 1. 데이터 모델 (config/screens.js 화면별 `figma` 필드)

```js
{
  id: 'SCR-HOME-001', label: '홈', href: 'm-home.html',
  designed: true,                         // 디자인 반영됨(기존 플래그 유지)
  fidelity: 'design',                     // 'wireframe' | 'design' | 'prototype'  ← 승격 단계
  figma: {
    fileKey: 'AbC123…',                   // Figma 파일 키
    nodeId: '525:4832',                   // 프레임 노드 ID
    url: 'https://www.figma.com/design/AbC123/..?node-id=525-4832', // Dev Mode 딥링크
    image: 'assets/figma/SCR-HOME-001.png',        // 구워둔 스냅샷(REST get_image / MCP get_screenshot)
    imageW: 390, imageH: 844,             // 원본 프레임 규격(디바이스 정합 검사)
    embed: 'https://embed.figma.com/design/AbC123/..?node-id=525-4832&embed-host=plandeck', // 선택
    prototype: 'https://embed.figma.com/proto/AbC123/..?node-id=525-4832', // 선택(상호작용)
    tokens: 'assets/figma/SCR-HOME-001.tokens.json', // 선택(get_variable_defs → 개발 핸드오프에 노출)
    hotspots: [ { rect:[24,680,342,52], to:'SCR-SEARCH-001' } ], // 이미지 모드 클릭영역(선택)
    rev: 3,                               // 디자인 리비전(sync마다 +1) — 버전 연동
    checksum: 'h3x…',                     // 마지막 sync의 디자인 해시(변경감지)
    syncedAt: '2026-10-03'
  }
}
```

- `fidelity`가 **승격 단계**. `wireframe`(현행) → `design`(이미지) → `prototype`(임베드).
- 디바이스 정합: `imageW/imageH`가 device width/height와 어긋나면 경고(설계 스케일 불일치 선제 검출).

---

## 2. 승격(Fidelity) 사다리 — "프로토타입으로 승격"

```
wireframe ──(Figma 매핑+이미지)──▶ design ──(프로토타입 임베드)──▶ prototype
흑백 화면설계서        디자인 스냅샷(정적, 항상 동작)        실제 상호작용(Figma가 처리)
```

- **design**: 디바이스 프레임(아이폰/PC 크롬) 안에 Figma 프레임 PNG를 넣고, **PlanDeck 플로우 CTA를 투명 핫스팟으로 오버레이** → 정적 이미지여도 화면 간 이동(눌러보기) 가능. 공개/정적/무인증에서 100% 동작.
- **prototype**: Figma **인터랙티브 프로토타입**을 iframe 임베드 → 클릭·전환을 Figma가 처리(최고 충실도). 단 공유/뷰어 인증 필요(아래 3).
- **검토 모드(의사결정자)**: 사용 가능한 **최고 충실도로 자동 표시** + 경로만 누르며 둘러보기(기존 review mode 확장).
- **토글**: 화면 상단/도크에 `와이어프레임 ↔ 디자인 ↔ 프로토타입` 전환(역할·취향별로 즉시 전환).

---

## 3. 접근·인증·프라이버시 (중요 — 현재 레포가 public)

| 항목 | 방식 | 주의 |
|---|---|---|
| **Dev Mode MCP** | Figma **데스크톱 로그인 세션** 사용(토큰 레포 저장 X) | 작성시점·로컬에서만. 가장 안전 |
| **REST API(헤드리스)** | `X-FIGMA-TOKEN` = **J님 Figma PAT** | 로컬 보관(`~/.config/jbs/…`), **레포 커밋 금지**. 명의=J님(불변식) |
| **이미지 스냅샷** | `assets/figma/*.png`를 레포에 커밋 | **public 레포면 디자인이 공개됨** → 실제 클라이언트 프로젝트는 **private 레포**(Use this template→private) 또는 `assets/figma/` gitignore + 별도 호스팅 |
| **프로토타입/임베드** | Figma 공유 링크 | 비공개 파일은 **뷰어 Figma 인증 필요** → 의사결정자가 Figma 계정 없으면 안 열림. 이미지 스냅샷이 이 문제를 회피 |

**권고**: 파일럿(도담)은 데모라 public 이미지 OK. **실 프로젝트는 private 레포 + 이미지 스냅샷 기본**(무인증 열람), 프로토타입 임베드는 사내/공유 가능한 경우만 상위 옵션.

---

## 4. 작성시점 플로우 — `/pd-figma-sync` (업그레이드)

```
/pd-figma-sync  (대화형)
 1) 소스 선택: (A) Dev Mode MCP(데스크톱 열림) · (B) REST PAT(헤드리스)
 2) 프레임 수집: 파일의 프레임 이름·node-id 목록
 3) 매핑: 프레임 ↔ PlanDeck 화면
      - 자동: 프레임명 ≈ 화면 label/id 매칭(예: "홈" → SCR-HOME-001)
      - 모호하면 AskUserQuestion 으로 확인(쉽게)
 4) 디자인 끌어오기(화면별):
      - 이미지: MCP get_image / get_screenshot  또는  REST GET /v1/images?ids=<node>&format=png&scale=2
               → projects/<slug>/assets/figma/<SCR-ID>.png 저장
      - 토큰(선택): get_variable_defs → <SCR-ID>.tokens.json (개발 핸드오프에 노출)
      - 핫스팟(선택): REST 파일 노드의 프로토타입 reactions → hotspots[] 도출
 5) 메타 기록: screens.js 의 figma{} + designed:true + fidelity 승격 + rev+1 + checksum + syncedAt
 6) 변경감지: 재sync 시 checksum 비교 → 바뀐 화면만 갱신, 개요/추적에 "디자인 변경됨" 배지
 7) git add/commit → 배포(정적)
```

- 매핑 테이블은 `config/figma-map.js`(fileKey + 프레임↔화면)로 저장해 **재sync 반복**을 쉽게.
- **쉬움 원칙**: 디자이너는 Figma에서 프레임 이름만 화면명과 비슷하게 두면 자동 매핑. 나머지는 커맨드가 처리.

---

## 5. 런타임 렌더(engine, 정적) — 무빌드·코어불변

`plandeck.js`에 가산:
- `applyFidelity(page)`: `page.fidelity`에 따라 device-screen 본문을 분기
  - `wireframe`: 현행 그대로
  - `design`: `<img class="pd-figma-img" src="figma.image">`를 device-screen에 넣고(아이폰/PC 크롬 유지), `figma.hotspots[]`를 투명 `<a>`로 오버레이(좌표→화면 이동). 핫스팟 없으면 좌측 nav/플로우로 이동
  - `prototype`: `<iframe class="pd-figma-proto" src="figma.prototype" loading="lazy">`를 device-screen에 삽입(IntersectionObserver lazy)
- `injectFidelityToggle()`: 도크/상단에 `와이어/디자인/프로토타입` 토글(해당 화면에 가용한 단계만 활성). sessionStorage로 유지.
- 개요 인벤토리·추적: 디자인 상태 아이콘(🎨 연결 / 🖼 이미지 / ▶ 프로토타입) + rev 표기.
- 플로우 필름스트립: 승격된 화면은 썸네일을 디자인 이미지로(여정 충실도↑).
- 디자인 변경감지: `figma.checksum`이 동결값과 다르면 "디자인 변경됨" 배지(기존 스펙 `_hash` '변경됨'과 동일 패턴).

---

## 6. 버전관리 연동 (J: 버전관리도 같이)

- `figma.rev`: sync마다 +1(디자인 리비전). `syncedAt` 기록.
- `figma.checksum`: Figma측 디자인 변경 감지 → 화면 목록·상세기획서·추적에 **"디자인 변경됨"**.
- 프로젝트 `changelog`에 `design-sync` 이벤트 자동 추가(예: `v0.2.0 · Figma 홈·검색 2화면 디자인 반영(rev3)`).
- 기존 성숙도(draft→…→ready-for-dev)와 **별개 축**: 기능 명세 성숙도 vs 디자인 충실도(둘 다 표시).

---

## 7. 단계별 구현 계획 (각 단계 독립 배포·검증)

| Phase | 내용 | Figma 필요? | 의존 |
|---|---|---|---|
| **1. 런타임 기반** | `fidelity` 필드 + engine `applyFidelity`(이미지 렌더)+ 토글 + 상태표기. 플레이스홀더 이미지로 데모 | ❌ | 없음 — **바로 구현 가능** |
| **2. 작성 브리지** | `/pd-figma-sync` 업그레이드(REST PAT 이미지 내보내기 + 매핑 + 메타 기록). MCP 모드(데스크톱 시) | ✅ PAT | J Figma PAT·파일키 |
| **3. 상호작용** | 이미지 핫스팟(클릭이동) + 프로토타입 임베드 모드 + 디자인 변경감지(checksum 배지) | ✅ | Phase1·2 |
| **4. 토큰** | `get_variable_defs` → 디자인 토큰을 개발 핸드오프에 노출(색·간격·타이포) | ✅ MCP | Phase2 |

**권고 시작점 = Phase 1**(Figma·토큰·결정 불필요). 런타임 "승격" 골격을 먼저 세워 데모로 보이고, Phase 2에서 실제 Figma를 붙인다.

---

## 8. 확정 필요한 결정 (J)

1. **런타임 충실도 기본**: 이미지 스냅샷(정적·공개/무인증 동작·구움) vs 프로토타입 임베드(항상 최신·공유/인증 필요). → **권고: 이미지 기본 + 프로토타입 상위 옵션**.
2. **Figma 접근 방식**: Dev Mode MCP(데스크톱·작성시점) / REST PAT(헤드리스) / 둘 다. → **권고: 둘 다**(MCP 가용 시 우선, 없으면 PAT). PAT는 **J님 Figma 계정** 발급 필요.
3. **프라이버시**: 실 프로젝트는 private 레포 + 이미지 스냅샷 기본(권고) vs 공개 유지.

---

## 부록 — 근거(현재 Figma capability, 2026)

- Dev Mode MCP 도구: `get_code`·`get_variable_defs`·`get_image`/`get_screenshot`·`get_code_connect_map`·`get_figjam`. 로컬 서버(데스크톱). 2026-02 Claude Code 양방향(Design↔Code).
  - https://www.figma.com/blog/introducing-figma-mcp-server/ · https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/
- REST 이미지 내보내기: `GET /v1/images/:fileKey?ids=<node>&format=png|svg|pdf&scale=0.01~4` (`X-FIGMA-TOKEN`) → nodeId→이미지URL 맵.
  - https://developers.figma.com/docs/rest-api/file-endpoints/
