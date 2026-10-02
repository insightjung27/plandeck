# 운영 가이드 — 수정·배포·협업·업데이트

## 1. 일상 편집 흐름
- 순수 정적 킷(빌드 없음). 커맨드를 돌리거나 `config/*.js`를 고친 뒤 브라우저 **새로고침**이면 끝.
- 화면 데이터의 원본은 `config/screens.js` 한 곳. 여기만 바뀌면 목록·Description·Cases·Interface·플로우가 모두 자동 재렌더.
- 설정 로더가 캐시를 무시(쿼리 캐시버스터)하므로 **일반 새로고침**으로 즉시 반영. 단, 엔진 CSS를 고치면 강력 새로고침(캐시 비움) 필요.

## 2. 배포 — GitHub Pages (열람 링크)
정적 파일이라 서버 없이 링크 열람이 가능하다. 정석은 GitHub Pages.
1. 저장소를 **공개(public)** 로 둔다(사내 전용이면 조직 Pages/프라이빗 Pages 정책에 맞춤).
2. 최상단에 빈 **`.nojekyll`** 파일(이미 포함). 상대경로 사용(엔진이 자기 위치 자동 감지).
3. 최초 1회만 **Settings → Pages** 에서 배포 소스를 켠다(사람이 1회). 이후 `git push` 가 곧 배포.
4. 폰트(Pretendard)·플로우(Mermaid)는 외부 CDN에서 로드 — 온라인에서 정상. 폐쇄망은 §6 vendoring.

## 3. 협업 모델 — PR 기반 비동기 git (백엔드 없음)
PlanDeck는 **git 을 유일한 동기화 버스**로 쓴다(외부 라이브 싱크·서버 없음 = 무빌드·정적 유지).

- **모델 A (각자 저장소)**: 킷을 **템플릿 저장소**로 공개(Settings → Template repository). 팀원이 `Use this template`로
  각자 화면설계서를 만든다. 프로젝트가 서로 독립일 때.
- **모델 B (공용 저장소)**: 한 저장소에 역할별 브랜치로 나눠 채우고 PR 리뷰 후 병합. 한 제품을 함께 설계할 때(권장).

**브랜치/커밋 규약 (화면 ID로 기획↔개발 추적):**
| 단계 | 규칙 | 예시 |
|---|---|---|
| 브랜치 | 용도+화면ID | `plan/SCR-PAY-001` · `feat/SCR-PAY-001` |
| 커밋 | 동사+화면ID+요약 | `기획 SCR-PAY-001 결제 예외 추가` |
| PR 제목 | 화면ID로 시작 | `SCR-PAY-001 결제 화면 확정` |

**머지 충돌 줄이기(다인) — 기본은 "작은 PR":** 한 프로젝트의 `projects/<slug>/config/screens.js`를 여러 명이 동시에
고치면 충돌이 생긴다. 1차 방어는 **작은 단위 PR + 화면ID 브랜치**(아래 규약)로 충돌 면을 줄이는 것이다. 대부분 이걸로 충분하다.

**화면별 파일 분할(opt-in 고급 패턴):** 한 프로젝트가 수십 화면으로 커져 충돌이 잦아지면 분할을 택한다.
무빌드 정적킷은 디렉터리 글롭이 불가하므로 **매니페스트**로 명시 로드한다(기본 아님 — 필요할 때만):
```js
// config/screens.js — 인덱스(배열 초기화 + 로드할 파일 목록)
window.PLANDECK_SCREENS = [];
window.PLANDECK_SCREEN_FILES = ['scr-home-001.js', 'scr-pay-001.js', /* … */];
// config/screens/scr-pay-001.js — window.PLANDECK_SCREENS 의 해당 카테고리에 push
```
그리고 프로젝트 HTML 로더가 `screens.js` 로드 후 `PLANDECK_SCREEN_FILES`를 순회해 `config/screens/*.js`를 추가 로드하도록 한다.
→ 화면이 파일 단위로 갈려 충돌이 급감하고 CODEOWNERS를 화면별 파일에 걸 수 있다. (단, 한 화면 안의 역할 혼재는 여전히 PR 리뷰로.)

## 4. 역할 잠금 — CODEOWNERS + 브랜치 보호
- `.github/CODEOWNERS` 로 `engine/**`·`.claude/commands/**`·`templates/**` 를 운영자 소유로 지정 → 팀원이 바꾸면 운영자 리뷰 강제.
- 기본 브랜치 보호(직접 push 금지·PR 필수)로 엔진/커맨드 사고를 원천 차단.
- 팀원 규칙 한 줄: **엔진·커맨드는 열람만, 고칠 점은 운영자에게 요청.**

## 5. 엔진·커맨드 업데이트 배포
- **모델 B**: 운영자가 기본 브랜치에 업데이트 병합 → 팀원은 `git pull`.
- **모델 A**: 템플릿을 업스트림 원격으로 추가하고 `engine/`·`.claude/commands/` 폴더만 당겨온다(config·화면 HTML은 팀원 것 유지).
- 변경 시 요약(버전 메모)을 남겨 무엇이 달라졌는지 알린다.
- ★ **회귀 스모크(엔진 수정 시 필수)**: 엔진은 전 프로젝트 공유라 폭발반경이 크다. 엔진을 고쳤으면 배포 전
  `node -e "..."` 문법 체크 + **`projects/order-pay/` 데모를 로컬 서버로 열어** 워크스페이스·개요·화면(패널)·핸드오프가
  정상 렌더되는지 눈으로 확인한 뒤 전파한다(데모 = 결정론 회귀 기준선). `node tools/pd-hash.js`로 해시 규칙 불변도 확인.

## 6. 폐쇄망/오프라인 (self-contained)
Mermaid·Pretendard가 CDN이라 폐쇄망에선 플로우/폰트가 죽는다. 무빌드 유지하며 vendoring:
1. `engine/vendor/mermaid.min.js` 로 Mermaid를 1회 내려받아 포함.
2. 화면 HTML 로더에서 `engine/common.js` **앞에** vendor mermaid 스크립트를 로드(그러면 common.js가 CDN을 안 부름).
3. Pretendard는 `engine/vendor/` 에 woff2 + `@font-face` 를 `plandeck.css`에 추가(common.css의 CDN @import는 폴백).
> 상세 절차는 ARCHITECTURE §vendoring 참고. (온라인 환경이면 생략 가능)

## 7. 백업·가역성
- 산출물은 반드시 커밋·push(로컬 커밋만 남기지 않기). 삭제는 PR·승인 후.
- 큰 변경(엔진 손질 등) 전 브랜치 분기 + 다른 화면 1개를 열어 목록·플로우·패널이 그대로인지 눈으로 확인(회귀 체크).
