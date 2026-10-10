# PRD — 훌메이트(HurMate) V2.0 (소규모 교회용 멀티테넌트 교회 플랫폼)

> **이 파일이 PRD의 정본(SSOT)입니다.** 기획자가 직접 수정하거나 `/pd-prd`로 갱신합니다.
> `config/prd.js`는 이 문서에서 동기화되는 렌더용 미러입니다(둘을 항상 같은 버전·내용으로 유지).
> **근거**: 정본 PRD V2.0(76섹션, `church-service/docs/PRD/훌메이트_PRD_V2.0.md`) + 작업계획 재기준화 v1(`church-service/docs/작업계획/작업계획_재기준화_v1.md`). 섹션 번호(§)는 PRD V2.0 기준.

- **version**: 2.0.0 · **updated**: 2026-10-08 · **status**: V2.0 재기준화(re-baseline) · **surface**: 대표사이트(PC) · 교회 공개홈·교인 Web/PWA(모바일) · 교회 관리자/슈퍼관리자(PC웹)

> **북극성(§76)**: 하나의 플랫폼을 만들되, 교회와 교인에게는 각 교회의 독립적인 디지털 서비스처럼 보이게 한다.

---

## ① 배경
소규모 교회는 재정·인력난으로 자체 앱·홈페이지를 개별 개발(SI)하기 어렵고, 공용 입주형 교회앱은 교회 고유 브랜드를 담지 못한다. 훌메이트는 교회마다 시스템을 따로 개발하지 않고, **하나의 멀티테넌트 SaaS 플랫폼**(단일 Backend·단일 Design System·단일 코드베이스) 위에서 각 교회가 교회명·로고·대표컬러·대표이미지·콘텐츠·도메인 등 **설정값(Config)만으로** 자기 교회만의 디지털 서비스를 운영하게 한다. 기본 제품은 **Responsive Web + PWA**(홈 화면 설치·Web Push)이며, 교인은 각 교회 독립 URL(`{slug}.hurmate.com`)로 들어와 "우리 교회 전용 앱"처럼 쓴다. Native App은 앱이 꼭 필요한 교회에만 추가 판매하는 **Premium Add-on(차기)**.

V1 구조에서 재기준화하되 코어(테넌트격리·인증·콘텐츠·개설승인·빌링·스토리지·디자인토큰)는 **계승**, V1 제외 모듈은 **봉인(삭제 아닌 feature-flag OFF)**, 전무한 4대 공백(ChannelConfig/PwaConfig·Web Push·Notification Gateway·개설 Wizard)만 **신규 구축**한다.

## ② 목표
- 교회마다 홈페이지·앱을 따로 개발하지 않고, 하나의 플랫폼에서 설정값만으로 교회별 독립 Web/PWA를 발행
- 교회·교인에게는 각 교회의 독립 디지털 서비스처럼 보이게(화이트라벨 — 플랫폼 비가시성)
- 제품 기본형 = Responsive Web + PWA + Web Push, Native App은 필요한 교회에만 Premium Add-on으로 분리 판매
- 목회자가 관리자 콘솔에서 설교·주보·공지·회원·알림을 개발자 없이 직접 운영
- 교회가 늘어도 코드가 아니라 Tenant와 Configuration만 늘어나는 구조 유지(**운영 가능성 > 기능 추가**)

## ③ 사용자
- **교인(성도)** — 우리 교회 URL/PWA로 들어와 교회 검색 없이 가입, HOME·교회소개·설교·주보·공지 열람, 홈 화면에 설치해 Web Push 수신
- **방문자(새가족)** — 교회 공개홈에서 예배 시간·오시는 길·설교·분위기 확인
- **교회 관리자(목회자)** — 개설 Wizard로 오픈, 개발자 없이 설교·주보·공지·회원·알림 관리(우리 교회 데이터만)
- **플랫폼 운영자(HurMate Super Admin)** — 여러 교회(테넌트)를 하나의 콘솔에서 개설 승인·Tenant 생성·서비스 상태·요금제·결제·채널 통합 관제

## ④ 범위 (4채널 — 대표사이트 + 교회 Web/PWA + 관리자 2종)
**포함**
- **[면1·대표사이트 www]** 서비스/기능 소개·WEB 상품·APP 상품·가격 안내·도입 절차·FAQ·로그인·교회 개설 신청·문의 (§23·61)
- **[면2·교회 Web/PWA]** 교인 대면 고정 5메뉴 `HOME·교회소개·설교·주보·공지` + 회원가입·로그인·Web Push, PC·Mobile 동일 반응형 (§28·61)
- **[면3·교회 관리자 admin]** Dashboard·교회 설정·공지·설교·주보·회원·알림·관리자(+앱/PWA·요금제·사용현황) — 본인 교회만(테넌트 스코프) (§37·61)
- **[면4·슈퍼관리자 console]** 교회 개설 승인·Tenant·서비스 상태·요금제·결제·회원·관리자·Notification·Storage·App 상태·운영 로그 (§45·61)
- **교회 개설 종단연결(작업계획 9단계)**: 가입→개설 신청→요금제 선택→HurMate 승인→Tenant 자동생성→관리자 Wizard(8STEP)→오픈→교인 가입(church_id 자동)→알림 (§24·27·35)
- **PWA**: 교회별 manifest·아이콘·이름 동적 생성, 홈 화면 설치 유도(Android 프롬프트 / iOS 16.4+ 수동 안내) (§7·8)
- **알림**: Web Push 기본 채널 + Notification Gateway 추상화 + 구조화 Deep Link(type+content_id), 즉시/예약·전체회원 발송 (§9·39·40·41)
- **데이터/채널**: ChannelConfig(채널 on/off)·PwaConfig·AppConfig·PushSubscription·OnboardingApplication, 멀티테넌트 절대격리 (§51·53·54·55)
- **화이트라벨**: 교회별 변경 = 교회명·로고·대표색·대표이미지·도메인·PWA Icon·PWA Name만, 나머지는 단일 Design System 고정 (§57·75)
- **1차 시장검증 버전**: 3~5개 교회에 PC Web + Mobile Web + PWA + Web Push까지(Native 제외) (§64)

**제외(봉인·차기)** — §60·62·63·65
- **Native App 전체** — 기본 상품 아님, 선택형 Premium Add-on으로 차기(Phase6)·앱 필요 교회에만
- **"앱부터 개발" 금지** — 개발 순서 Backend→Admin→Web→PWA→Web Push→Native 강제
- 헌금 실 PG 결제 / 전자기부금영수증(세무) — 봉인(헌금·회계)
- 교적(교구·구역·셀·직분·가족관계·세례·헌금·출석) 전체 — 회원은 이름·휴대전화·이메일·교회·가입상태만
- 출석 관리(QR/온라인) · 커뮤니티(나눔터)·댓글·**채팅**·UGC 모더레이션 · 아나바다(중고거래)·성도매장(쇼핑) · 교회학교(교육관리)·**예약** — 봉인
- 라이브 방송 자체 호스팅 / 설교 자체 영상 저장(설교는 YouTube 링크만) · 광고·쇼핑·AI·복잡한 CRM·회계·복잡한 통계 — 봉인
- 알림 그룹/개별 타겟팅·알림톡(Kakao)·SMS — 향후(V1 MVP는 전체회원 Web Push만)
- 교회별 UI 구조/레이아웃/메뉴 커스터마이즈(Template 아닌 Design System) · 교회별 Backend/Admin/DB/Web 개발·App Source Fork(No-Fork)
- PIPA 개인정보 권리요청 화면 — V2 MVP admin 메뉴(§61)에서 제외(법적 필요 시 재도입 — J-게이트 G2)

## ⑤ 성공지표 (§64 — 1차 검증)
| 지표 | 목표 |
|---|---|
| 관리자 콘텐츠 등록(①) | 파일럿 교회가 설교·주보·공지 실제 등록 |
| 교인 이용(②) | 교회 Web/PWA 교인 접속·열람(파일럿 MAU) |
| 홈 화면 PWA 설치(③) | 교인 홈 설치 유의미 발생(Android/iOS 16.4+) |
| Push 허용(④) | 알림 권한 허용률 확보 |
| Push 확인(⑤) | Web Push open / Deep Link 이동 발생 |
| 유료 WTP(⑥·G4) | 3~5교회 유료 LOI/선지불 의사(무료 대체재 대비 지불 이유 선검증) |

## ⑥ 제약·가정·의존성
- **제약**: 멀티테넌트 절대격리(tenant_id 귀속·API 검증·논리격리) · 디자인 자유도 제한(4요소만 변경·Design System) · No-Fork(차이는 Config만) · 개발 순서 강제 · 콘텐츠 하드코딩 금지(Tenant API) · 교인 메뉴 5개 고정 · APP 과금 분리(BASIC 미포함) · 기능 추가 게이트(§59) · 운영 가능성 최우선(§74-20) · 가역성(봉인=flag OFF·손실 마이그레이션은 down-migration/백업) · 정직성("교회 확인 후 게재")
- **가정**: 조건 충족 PWA는 Web Push 제공(iOS 16.4+ 공식 지원 — "Web은 푸시 불가" 전제 폐기) · 교인=모바일·관리자=PC웹 · 설교=YouTube URL · 교회 진입이 Tenant 결정(church_id 자동) · 대부분 교회는 Web+PWA로 충분 · Native는 교회 소유 개발자계정(차기) · Church가 Tenant 겸함(tenant_id=church.id)
- **의존성**: platform-db churchhub(멀티테넌트·RLS) · 화이트라벨 엔진(테넌트 라우팅·동적 manifest·테마) · Notification Gateway + VAPID/web-push · YouTube · 지도 API(G3) · (차기)FCM/APNs·교회 개발자계정·CI/CD·스토어 · 커스텀 도메인 DNS · 이메일 발송(개설 승인·초대)

## ⑦ 비기능 요구사항(NFR)
> 멀티테넌트/PWA/Push는 PRD V2.0 조항, **보안·접근성 수치는 V1 계승 엔지니어링 기준**(PRD 미규정분 포함 — [계승] 표기).
- **멀티테넌트**: 모든 조회·쓰기 tenant_id 스코프 강제 + 모든 API tenant 검증 · 앱레벨 격리 + 가능 시 DB RLS 이중 방어 · 신규 엔티티 전부 TenantScopedEntity 상속 CI 게이트(§55·D7)
- **PWA**: 서비스워커·오프라인 캐싱·설치 유도·업데이트 알림·오프라인 fallback · iOS 16.4+ 홈 설치 Web App Web Push 지원(미만 제약 고지)(§9)
- **Web Push**: VAPID·권한 요청 UX·수신동의 연계·야간 발송 제한 · PushSubscription을 tenant+user 이중 스코프·멀티기기 다중 구독(iOS 오배송 방지)(D4)
- **보안[계승]**: JWT·HTTPS 전용·민감정보 암호화(알고리즘은 G2 security-review 확정)·감사로그·교차테넌트 접근 기록(§55)
- **접근성[계승]**: WCAG 2.1 AA — 고령 교인 대상 본문 16px+·대비 4.5:1·터치 타깃 44px+·스크린리더 레이블
- **성능[계승]**: 주일 예배 트래픽 스파이크 대비·홈 응답 목표·CDN·이미지 최적화
- **운영성**: 운영 가능성 > 기능 추가(최상위) · 제외 모듈 import 잔존 0 grep 게이트(§74-20·D6)

## ⑧ 권한 모델(RBAC) — V2.0 단순화(교적·직분 체계 봉인)
**역할**: member(교인) · admin(교회 관리자·목회자) · super(플랫폼 운영자)
> 회원은 이름·휴대전화·이메일·교회·가입상태만 보유(교적·직분 체계 봉인). 직분 기반 세부 권한 위임은 교적 재개 시 복원.

| 주체 | 할 수 있는 것 |
|---|---|
| member | 우리 교회 Web/PWA 열람·회원가입·알림 수신설정(church_id 자동 바인딩) |
| admin | 본인 교회 설정·설교·주보·공지·회원 조회/승인·알림 발송·앱/PWA·요금제/사용현황(테넌트 스코프) |
| super | 교회 개설 승인·Tenant/채널(ChannelConfig)·서비스 상태·요금제·결제·운영 로그(교차테넌트 — 전 접근 감사) |

## ⑨ 멀티테넌트 격리 계약 (§54·55)
- **격리**: 모든 데이터 tenant_id 귀속 + 모든 API tenant 검증 → A교회↔B교회 완전 격리(논리적 격리, 물리 분리 아님). 앱레벨 필터 + 가능 시 DB RLS 이중 방어
- **식별**: 교회별 독립 URL(`{slug}.hurmate.com`)/PWA/App 진입이 Tenant 결정 → 교인 회원가입 시 교회 검색 없이 church_id 자동 바인딩(§35)
- **채널**: ChannelConfig로 테넌트별 채널(web/pwa/ios/android/web_push/native_push) on/off(§51)
- **교차접근**: 슈퍼관리자만 가능, 모든 접근은 감사로그
- **정체성**: Church가 Tenant 겸함(tenant_id = church.id). 2계층 분리는 커스텀도메인·다채널 확장 시점(작업계획 O1)

## ⑩ 대체재·지불의사(WTP)
| 대체재 | 비용 | 한계 |
|---|---|---|
| 네이버 밴드 | 무료 | 교회 전용 아님·독립 브랜드 없음·설교/주보/공지 구조 없음·광고 |
| 카카오톡 채널 | 무료 | 공지 일방향·교회 Web/PWA/독립 앱 없음 |
| 유튜브 | 무료 | 설교 송출만·공개홈/관리/알림/멤버십 전무 |
| 공용 입주형 교회앱 | 유료 | 교회 고유 브랜드 없음·독립 도메인/PWA 없음·커스터마이즈 제한 |

**차별화**: 교회별 독립 Web+PWA(화이트라벨) · Web Push 기본 내장(iOS 16.4+) · 개설 Wizard로 무개발 발행·운영 · 필요한 교회만 Native App Premium Add-on
**WTP**: 가격은 **구조(WEB vs APP)만 확정, 금액은 시장검증 후 확정(§66 — 미확정)**. (참고·작업계획) WTP 월 3~5만 가설은 **J-게이트 G4 선검증** 대상.
**리스크**: 무료 대체재 대비 WTP가 핵심 하방 → Phase1 착수 전 유료 지불의사 확보(G4)로 비대칭 하방 닫기.

## ⑪ 릴리스 (개발 순서 강제 §63)
- **Phase 0 — 착수 전 게이트**: G1~G4 선행 결정 · O1·O2·O4·O5 확정 · docs 재인벤토리
- **Phase 1 — Core Platform(Backend)**: 멀티테넌트 백본·인증·Church·권한·Super Admin 재정렬 · ChannelConfig·billing_plan 신설 · 제외 7모듈 flag OFF(import 잔존 0) · Theme 손실 마이그레이션(백업) · 개설 승인 시 ChannelConfig/PwaConfig 자동생성
- **Phase 2 — Church Admin**: 개설 Wizard 8STEP 상태기계 · Admin(Dashboard·설정·공지·설교·주보·회원·알림·관리자) · 회원 모델 단순화 · PwaConfig 편집 골격 · 승인 알림(이메일)
- **Phase 3 — Web(PC+Mobile 반응형)**: 공개홈+교인 Web 고정 5메뉴·단일 DS · `{slug}.hurmate.com` 라우팅·guard(교회검색·switchChurch 제거) · 대표사이트 개설 퍼널 · 제외 화면 strip+아카이브
- **Phase 4 — PWA(교회별 독립 설치)**: PwaConfig 소비 manifest 동적 생성 · 아이콘 파이프라인(192/512/maskable) · 설치 유도(교회명·iOS16.4+ 분기) · Super Admin PWA 콘솔 · SW·push 핸들러 설계
- **Phase 5 — Notification(Web Push) ★MVP 완성·1차 시장검증(3~5교회)**: PushSubscription·VAPID·구독/해지·권한 UI · SW push/notificationclick·발송 워커 · Notification Gateway(InApp+WebPush 어댑터, Native/Kakao/SMS 슬롯) · 구조화 Deep Link(type+content_id) · 즉시/예약/전체회원 fan-out
- **Phase 6 — Native App Factory(차기·Premium Add-on)**: AppConfig 실사용 · One codebase+Tenant Config+Automated Build · FCM·APNs · Android/iOS 빌드·서명·스토어·심사·배포 · App Console · 교회 소유 개발자계정 운영대행·CI/CD

## ⑫ 요구사항 (REQ-001 ~ REQ-025)
- **대표사이트/개설**: REQ-001 대표사이트 소개·상품·가격·FAQ·개설신청 · REQ-002 가입→교회정보→요금제 개설신청 · REQ-003 승인→Tenant 자동생성(8종) · REQ-004 관리자 Wizard 8STEP→OPEN
- **교회 Web/PWA(교인)**: REQ-005 교회 URL 접속→Tenant 확정→공개홈 · REQ-006 고정 5메뉴·반응형 · REQ-007 설교(YouTube) · REQ-008 주보 · REQ-009 공지 · REQ-010 교회소개 · REQ-011 교회검색 없는 가입(church_id 자동) · REQ-012 회원 단순 모델·조회/승인 · REQ-013 PWA 홈 설치 · REQ-015 Web Push 수신 · REQ-017 Deep Link · REQ-019 화이트라벨 4요소/단일 DS
- **관리자/슈퍼**: REQ-014 PWA 설정 자동생성·보정 · REQ-016 알림 발송(Gateway·즉시/예약) · REQ-018 교회 관리자 콘솔(테넌트 스코프) · REQ-020 슈퍼 전체 교회·서비스 상태(6단계)·요금제·결제 · REQ-021 ChannelConfig 채널 on/off · REQ-022 tenant_id 격리·API 검증 · REQ-023 도메인({slug}+커스텀 Premium) · REQ-024 WEB/APP 상품 과금(금액 미확정) · **REQ-025 [차기] White Label Native App Add-on**

## ⑬ 핵심 워크플로
대표사이트 방문→개설 신청 · 개설 승인→Tenant 자동 프로비저닝 · 관리자 최초 Wizard→오픈 · 교인 진입→가입(교회검색 없음) · PWA 설치(교회 전용 앱처럼) · 공지 작성→Web Push→교인 확인(Deep Link) · 슈퍼관리자 통합 운영

## ⑭ 확정된 결정 (요지)
플랫폼=Multi-Tenant SaaS(논리격리) · 기본=Web+PWA+Web Push · Native=Premium Add-on(Phase6) · 브랜딩 4+3요소만 변경 · 관리자 2종(church/console) · MVP 기능 6개(교회소개·설교·주보·공지·회원·알림) · 앱=One Codebase+Config(No-Fork) · 교회검색 제거(church_id 자동) · 교인 메뉴 5개 고정·단일 Design System · 개발 순서 강제 · 1차 검증 3~5교회(Native 제외) · 서비스 상태 6단계 · 알림=Gateway(Web Push) · 봉인=flag OFF · 도메인 hurmate.com 통일 · 재기준화 권장안 A(코어 KEEP + 봉인 + 4대 공백 BUILD) · Church=Tenant 겸함

**가격 구조(§66~68)**: 상품 구조(WEB vs APP)만 분리·금액 미확정 · WEB=초기 등록비+월 이용료(Web/Mobile/PWA/WebPush/Admin 포함) · APP=WEB+구축비+스토어 등록·관리비+유지비(BASIC 미포함) · 커스텀 도메인=Premium · 추천 과금=예시(미확정)

## ⚠️ ⑮ 미결 질문 / J-게이트 (착수 전 결재)
**미결(Open)**: G1 §57 완화범위(A 권장) · G2 PII/보안(ci·gender·birthDate) · G3 지도 API · G4 유료 WTP 선검증 · O1 Tenant/Church 2계층 · O4/O5 설치대상·고정시안 · 이단심사(교리 게이트) V2 존치 여부(원문 미언급) · PIPA 권리요청 화면(법적 상충·G2 연계)
**J-게이트(결재 필수)**:
1. G1 §57 완화 범위 — 레이아웃 시안 선택(B축)은 J 승인 전 금지
2. G2 PIPA·PII — 민감정보 처리 법무 검토 + security-review(High=0)
3. G3 지도 API — 키·비용·명의
4. G4 유료 WTP — 3~5교회 LOI/선지불 선검증
5. 헌금 계좌 안내/향후 PG — 유사수신·전자금융 규제(실결제는 봉인으로 회피)
6. 전자기부금영수증(세무)·대량 발송 — 봉인/차기 재개 시 사전 합의
7. (차기 Native) Apple/Google 화이트라벨 앱 정책·대량 등록 리스크 — 무차별 판매 금지·교회 소유 개발자계정

---

## 버전 이력
| version | date | 변경 |
|---|---|---|
| 2.0.0 | 2026-10-08 | **V2.0 재기준화** — 정본 PRD V2.0(76섹션)+작업계획(재기준화 v1) 반영. 단일 통합앱+교회검색(V1) 폐기 → 교회별 독립 Web/PWA 기본 상품(church_id 자동바인딩). 기본 = Web+PWA+Web Push, Native=Premium Add-on(차기·Phase6). 대표사이트·개설 Wizard·Web Push·Notification Gateway·ChannelConfig/PwaConfig/AppConfig 신설. 교인 메뉴 5개 고정, V1 넓은 기능셋 봉인(flag OFF). 단일 Design System(템플릿 선택 폐기). 개발 순서 강제, 1차 검증 3~5교회. 가격은 구조만 확정·금액 미확정. REQ 33→25(V2.0 MVP), surface 4→5(대표사이트 신설). 추출→합성→적대 충실도검증(13에이전트)으로 원문 충실화(월 3~5만 등 비근거 수치 미확정 처리·예약/채팅 제외 보강·이단심사 openQuestion 처리). |
| 1.1.4 | 2026-10-04 | [V1] 적대검수 H1~H5·M1·M3·M4 반영(대량발송 비가역계약·영수증 발급주체=교회·PIPA 분리동의 등). |
| 1.0.0 | 2026-10-03 | [V1] 완결성 보강 — 22엔티티·RBAC·멀티테넌트 계약·NFR·대체재WTP·J게이트. REQ 20→33. |
| 0.1.0 | 2026-10-03 | [V1] 파일럿 초안. |
