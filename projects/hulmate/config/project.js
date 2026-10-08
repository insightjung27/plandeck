window.PLANDECK_PROJECT = {
  name: '훌메이트 (HurMate) V2.0',
  description: '소규모 교회용 멀티테넌트 교회 플랫폼. 하나의 플랫폼으로 교회마다 독립 Web + PWA(+ Web Push)를 설정값(Config)만으로 발행 — 교회·교인에게는 "우리 교회 전용 디지털 서비스"처럼 보이게 한다. 기본 상품 = Responsive Web + PWA, Native App은 필요한 교회에만 Premium Add-on(차기).',
  version: '2.0.0',
  updatedAt: '2026-10-08',
  // 버전(브랜치) 레지스트리 — 같은 프로젝트의 여러 버전을 페이지 상단 ⎇ 스위처로 전환.
  versions: [
    { id: '2.0.0', label: '최신 · 5채널', path: '../hulmate/', current: true },
    { id: '1.1.4', label: '아카이브', path: '../hulmate-v1/' },
  ],
  changelog: [
    { version: '2.0.0', date: '2026-10-08', note: 'V2.0 재기준화(re-baseline) — 정본 PRD V2.0(76섹션)+작업계획(재기준화 v1) 반영. ① 단일 통합앱+교회검색(V1) 폐기 → 교회별 독립 Web/PWA 기본 상품(교회 URL/PWA 진입이 Tenant 결정·church_id 자동바인딩). ② 기본 상품 = Responsive Web + PWA + Web Push, Native App은 선택형 Premium Add-on(차기·Phase6). ③ 대표사이트(www.hurmate.kr)·교회 개설 Wizard(8STEP)·Web Push·Notification Gateway·ChannelConfig/PwaConfig/AppConfig 신설. ④ 교인 메뉴 5개 고정(HOME·교회소개·설교·주보·공지), V1의 넓은 기능셋(커뮤니티·아나바다·성도매장·교회학교·출석·헌금 실결제·전자기부금영수증 등)은 삭제 아닌 feature-flag OFF 봉인(향후 Add-on 자산). ⑤ 디자인 = 교회별 4요소(로고·대표색·커버·교회명)만 변경하는 단일 Design System(템플릿 선택 폐기). ⑥ 개발 순서 강제 Backend→Admin→Web→PWA→Web Push→Native, 1차 검증 3~5교회(Native 제외). 가격은 구조(WEB vs APP)만 확정·금액 미확정(§66). surface 재편(대표사이트 신설·4채널 종단). ★추출→합성→적대 충실도검증(13에이전트) 거쳐 원문 충실화(월 3~5만 등 비근거 수치 미확정 처리).' },
    { version: '1.1.4', date: '2026-10-03', note: '[V1] 3차 재검수 조건부 해소(→통과) — M3 .pd-process 컴포넌트 고아 해소, SSOT↔DOM 정합. 적대검수 3R 통과.' },
    { version: '1.1.0', date: '2026-10-03', note: '[V1] 완결성 보강 — 4서피스 61화면·요구사항 33/33 커버·데이터모델 22엔티티·RBAC·멀티테넌트 격리계약·NFR·대체재WTP·J게이트.' },
    { version: '1.0.0', date: '2026-10-03', note: '[V1] 기획 완성 — 4서피스 49화면 전면 와이어프레임·요구사항 20/20 커버·성숙도 confirmed.' },
    { version: '0.1.0', date: '2026-10-03', note: '[V1] PlanDeck 기획 착수 — 교인앱·공개홈·관리자콘솔 핵심 8화면(파일럿 범위).' },
  ],
  // ── V2.0 서비스 면(채널) 모델 — 대표사이트 + 교회 Web/PWA(공개·교인) + 관리자 2종 ──
  // Native App은 차기 Premium Add-on이므로 소비자 surface가 아니라 scope·releases·AppConfig·관리화면으로 표현.
  surfaces: [
    { key: 'landing', device: 'desktop', label: '대표사이트(www·영업/가입)' },
    { key: 'site',    device: 'mobile',  label: '교회 공개홈(방문자)' },
    { key: 'app',     device: 'mobile',  label: '교인 Web·PWA(설치형)' },
    { key: 'admin',   device: 'desktop', label: '교회 관리자(admin)' },
    { key: 'super',   device: 'desktop', label: '슈퍼관리자(console)' },
  ],
  constitution: {
    auth: '교회(Tenant)별 격리 세션. 교회 URL/PWA/App 진입이 Tenant를 결정(church_id 자동 바인딩·교회검색 없음). 관리자=역할기반(RBAC). 민감정보=암호화·마스킹(법무 게이트 G2)',
    baseUrl: 'https://api.hurmate.kr/v1',
    domains: '브랜드 도메인 hurmate.kr 통일 — www(대표사이트)·{slug}(교회 Web/PWA)·admin(교회 관리자)·console(슈퍼관리자)',
    errorConvention: 'RFC 9457 Problem Details (application/problem+json)',
    naming: 'SCR-<약어>-<3자리>. 멀티테넌트 절대조건: 모든 데이터 tenant_id 귀속·모든 API tenant 검증(A교회↔B교회 완전 격리)',
    designSystem: '단일 Design System — 교회별 변경은 로고·대표색·커버이미지·교회명(+도메인·PWA Icon/Name)만, Layout/Navigation/Grid/Typography 고정(Template 아님)',
    notify: 'Notification Gateway 공통 모듈 — MVP 채널 = Web Push(+설계상 Native Push), 향후 Kakao/SMS. 구조화 Deep Link(type+content_id)',
  },
  get device() { return (this.surfaces && this.surfaces[0] && this.surfaces[0].device) || 'mobile'; },
  responsive: false,
};
window.PDK_PROJECT = window.PLANDECK_PROJECT;
