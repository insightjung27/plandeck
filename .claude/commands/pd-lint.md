---
description: 설계 무결성·완결성 점검 — 중복ID·미연결 플로우·상태/계약 결손을 검사하고 ready-for-dev 동결 승격
argument-hint: [화면ID(선택, 없으면 전체)]
allowed-tools: Read, Write, Edit, Glob, Bash
---

# /pd-lint — 무결성·완결성 점검 + 개발준비 게이트

`config/screens.js` 전체(또는 `$1` 화면)를 검사해 조용한 결함을 드러내고, 완결된 화면을 `ready-for-dev`로 **동결 승격**한다.

## 검사 항목

### A. 무결성
- **중복 화면 ID** / **중복 href**(파일명)
- **미연결 flow.to**: 목적지가 미등록 ID(유령노드) — 의도된 것인지 확인(오타 가능)
- **거짓 진입점**: 출처에 안 걸렸는데 `entry:true`가 아닌 화면(의도된 진입점은 entry:true로 명시 권장)
- **역할 클래스/target 불일치 (필수 게이트)**: description·cases·interface·components의 target/role(`.pd-<역할>`)이
  화면 HTML에 **실제 존재하는지 Read로 대조**한다. 없으면 실패로 보고(hover 강조·CTA가 조용히 깨지는 원인) — 베스트에포트 아님.

### B. 완결성(화면별)
- Description 있음? (📝)
- Cases 상태 커버리지: 화면상태 7종이 모두 정의 또는 N/A? (🧩) — 빨강셀(미정의) 0?
- Interface reads/writes 있음? request/response가 `{entities.X}` 유효 참조? (🔌)
- cases의 에러 상태(403/404/5xx)와 interface writes의 errors[]가 일치?

## 절차

### 1) 검사 실행 & 리포트
- 위 항목을 점검해 **화면별 체크리스트 표**로 보고(통과/경고/실패). 실패·경고는 구체적 위치와 고칠 방법을 함께.

### 2) ready-for-dev 승격 (게이트)
- 어떤 화면이 **B 완결성을 모두 충족**(Description + Cases 커버리지 100% + Interface)하면:
  - 사용자에게 "이 화면을 개발준비(ready-for-dev)로 **동결**할까요?" 확인.
  - 승인 시 `status:'ready-for-dev'`로 올리고, **동결 해시** `_hash`를 반드시 **결정론적으로 계산해 기록**한다
    (수기 금지 — 엔진 specHash 규칙과 일치해야 변경 감지가 작동):
    ```
    node tools/pd-hash.js projects/<slug>/config SCR-XXX-001   # → 예: h1t1yr7o
    ```
    이 출력값을 그 화면 객체의 `_hash`에 Edit 로 기록.
  - 이후 스펙이 바뀌면 엔진이 좌측 목록에 **"변경됨"** 배지를 자동 표시(재검토 신호).
  - ⚠️ `_hash`를 비워둔 채 승격하지 말 것 — 엔진은 config를 되쓸 수 없어 영원히 '미동결'로 뜨고 변경 감지가 작동하지 않는다
    (엔진이 그 상태를 **'개발준비·미동결' 배지**로 가시화하니 반드시 해시를 채운다).

### 3) 요약
- 전체 통과율, 개발준비 화면 수(n/총), 남은 결손 TOP 목록. 다음: `/pd-handoff`로 개발 전달.

## 주의
- 완결성 미달 화면은 ready-for-dev로 올리지 않는다(게이트). 승격은 '동결'이므로 사용자 확인 필수.
- 엔진 파일 수정 금지. config만 갱신.
