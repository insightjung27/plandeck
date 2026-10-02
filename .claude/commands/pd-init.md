---
description: 새 프로젝트 생성 — projects/<slug>/ 폴더를 만들고 config·페이지를 깔고 워크스페이스에 등록
argument-hint: [프로젝트slug(선택)]
allowed-tools: Read, Write, Edit, AskUserQuestion, Glob, Bash
---

# /pd-init — 새 프로젝트 생성 (워크스페이스)

PlanDeck는 한 저장소에서 **여러 프로젝트**를 운영한다. 이 커맨드는 `projects/<slug>/` 폴더를 만들고
설정·페이지를 깔고, 루트 `config/workspace.js`(프로젝트 레지스트리)에 등록한다.

## 절차

### 1) 입력 수집 (대화형)
- **프로젝트 이름** · **slug**(영문 폴더명, 없으면 이름에서 생성) · **한 줄 설명**
- **서피스(단말)**: `AskUserQuestion`(multiSelect) — 모바일(mobile)/PC 웹(desktop)/태블릿(tablet)/키오스크(tossfront2)/반응형(responsive). `{key,device,label}`로 매핑.
- (선택) **전역규칙(Constitution)**: 인증·Base URL·에러 규약.
- **version**: 기본 `0.1.0`.

### 2) 프로젝트 폴더 생성
- `projects/<slug>/config/` 를 만들고, 루트 `config/` 의 **빈 스키마 템플릿**(devices.js·entities.js·prd.js·screens.js·flows.js)을 복사한다(Bash `cp` 또는 Write).
- `projects/<slug>/config/project.js` 는 수집값으로 작성(`window.PLANDECK_PROJECT` + 끝에 `window.PDK_PROJECT = window.PLANDECK_PROJECT;`). `version`·`updatedAt`·`changelog:[{version, date, note:'초기 생성'}]` 포함.
- `templates/project/` 의 index.html·prd.html·spec.html·handoff.html·flows.html·_screen.blank.html 을 `projects/<slug>/` 로 복사하고 `{{PROJECT_TITLE}}` 를 이름으로 치환. (_screen.blank.html 은 화면 생성 때 쓰이므로 그대로 둬도 됨)
- `templates/project/docs/PRD.md` 를 `projects/<slug>/docs/PRD.md` 로 복사하고 `{{PROJECT_TITLE}}`·날짜를 치환(**PRD 정본** — 이후 `/pd-prd`로 채운다).

### 3) 워크스페이스 등록
- 루트 `config/workspace.js` 의 `projects[]` 에 추가:
  ```js
  { slug, name, desc, path:'projects/<slug>/', surfaces:[라벨...], owner:'<작성자>', version:'0.1.0', updatedAt:'<오늘>' }
  ```
- 이미 같은 slug 가 있으면 경고하고 다른 slug 를 요청(덮어쓰지 않음).

### 4) 안내
- 생성 경로 요약 + "루트 `index.html`(워크스페이스)에서 이 프로젝트가 보이고, `projects/<slug>/index.html` 이 프로젝트 홈" 안내.
- 브라우저로 보려면 루트에서 **`start.command`(맥)/`start.bat`(윈도) 더블클릭** → 자동 오픈.
- 다음 단계: **`/pd-prd`** (그다음 `/pd-scaffold`). 막히면 **`/pd`**.

## 주의
- 엔진(engine/)·커맨드(.claude/)·템플릿(templates/)은 공유 — 프로젝트 폴더에 복사하지 않는다(페이지가 `../../engine/` 참조).
- 기존 프로젝트 폴더/워크스페이스 항목을 덮어쓰지 않는다. 루트 `config/` 는 '빈 스키마 템플릿'이므로 직접 쓰지 말 것.
