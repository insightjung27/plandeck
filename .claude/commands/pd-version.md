---
description: 기획서 버전 올리기 — project.version 을 bump 하고 changelog 기록, git 태그 제안(기획서 스냅샷 관리)
argument-hint: [patch|minor|major] [변경 요약]
allowed-tools: Read, Write, Edit, Bash, Glob
---

# /pd-version — 기획서 버전 관리

한번 만든 기획서를 **이어서 버전으로 관리**한다. 변경을 모아 버전을 올리고 이력을 남겨,
"이 기획서가 언제 무엇이 바뀌었는지"를 추적한다.

> 버전 3계층:
> 1. **git 태그**(예: `v0.2.0`) = 저장소 스냅샷(되돌리기 가능)
> 2. **project.version + changelog** = 사람이 읽는 기획서 버전/이력 (이 커맨드)
> 3. **화면 `_hash` 동결** = 개발준비 화면의 변경 감지(자동 "변경됨" 배지)

## 절차

### 1) 현재 버전 확인
- 현재 프로젝트의 `config/project.js` 에서 `version` 을 읽는다. (어느 프로젝트인지 모호하면 물어본다.)

### 2) bump 레벨 결정
- `$1` = `patch`(기본, 버그/소소) | `minor`(기능 추가) | `major`(큰 구조 변경). SemVer 규칙으로 올린다.
- `$2` = 변경 요약(없으면 물어본다). 여러 건이면 bullet로.

### 3) 기록
- `project.js` 의 `version` 을 새 값으로, `updatedAt` 을 오늘 날짜로 갱신.
- `changelog[]` 에 `{ version:'<새버전>', date:'<오늘>', note:'<요약>' }` 추가(append).
- 워크스페이스 `config/workspace.js` 의 해당 프로젝트 항목 `version`·`updatedAt` 도 갱신.

### 4) git 태그 제안 (선택)
- `Bash` 로 커밋·태그 명령을 **제안**한다(바로 실행 전 사용자 확인):
  ```
  git add -A && git commit -m "<slug> v<새버전>: <요약>"
  git tag <slug>-v<새버전>
  ```
  - 모노레포에 여러 프로젝트가 있으므로 태그에 slug 접두(예: `order-pay-v0.2.0`).
  - ⚠️ git 태그는 **저장소 전체 트리**의 스냅샷이다(그 시점의 모든 프로젝트 포함). `checkout <tag>`는 다른 프로젝트까지 되돌린다.
    특정 프로젝트만 복원하려면 범위를 한정: `git checkout <tag> -- projects/<slug>/`.
  - push 는 SSH 리모트로(운영 규칙 준수).

### 5) 안내
- 새 버전·이력 요약. 개요(index.html)의 '버전 이력'과 핸드오프 OpenAPI `info.version` 에 반영됨을 알린다.

## 주의
- 버전은 '확정된 변경'을 모아 올린다(매 편집마다 올리지 않음). changelog 는 덮어쓰지 말고 append.
- 되돌리기는 git 태그/브랜치로. 이 커맨드는 '사람용 버전/이력' 관리.
