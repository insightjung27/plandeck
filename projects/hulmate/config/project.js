window.PLANDECK_PROJECT = {
  name: '훌메이트',
  description: '소규모 교회용 화이트라벨 멀티테넌트 PWA — 한 코드베이스로 교회마다 독립 브랜드 앱(교인앱·공개홈·관리자콘솔). 은성교회 1호 파일럿.',
  version: '1.1.0',
  updatedAt: '2026-10-03',
  changelog: [
    { version: '1.1.0', date: '2026-10-03', note: '완결성 보강(적대검수 반영) — 4서피스 61화면(+12: 검색·영수증·권리요청·출석·알림설정·설정·약관·관리자/운영자 로그인·공개홈 콘텐츠관리·모더레이션·감사로그)·요구사항 33/33 커버. 데이터모델 22엔티티(tenantId 격리)·RBAC(role×permission 2축)·멀티테넌트 격리계약·NFR(접근성/PWA/푸시/보안)·대체재WTP·J게이트(규제) 추가. interface 멱등키·에러카탈로그·페이지네이션 심화. PRD 정본 v1.0.0 재생성.' },
    { version: '1.0.0', date: '2026-10-03', note: '기획 완성 — 4서피스 49화면 전면 와이어프레임(클릭 가능·링크 무결성)·요구사항 20/20 커버·전 화면 경우의수/개발인터페이스 완비·성숙도 confirmed. 문자지갑(REQ-019)·개인정보보호 PIPA(REQ-020) 추가.' },
    { version: '0.1.0', date: '2026-10-03', note: 'PlanDeck 기획 착수 — 교인앱·공개홈·관리자콘솔 핵심 8화면(파일럿 범위)' },
  ],
  surfaces: [
    { key: 'app',   device: 'mobile',  label: '교인앱(모바일)' },
    { key: 'site',  device: 'mobile',  label: '공개홈(모바일)' },
    { key: 'admin', device: 'desktop', label: '관리자콘솔(PC웹)' },
    { key: 'super', device: 'desktop', label: '슈퍼관리자(PC웹)' },
  ],
  constitution: {
    auth: '교회별 세션(테넌트 격리). 관리자=역할기반(RBAC). 주민번호 등 민감정보=service_role 전용 암호화·마스킹(PIPA 내장)',
    baseUrl: 'https://api.hurmate.example.com/v1',
    errorConvention: 'RFC 9457 Problem Details (application/problem+json)',
    naming: 'SCR-<약어>-<3자리>. 멀티테넌트: 모든 조회·쓰기는 tenant(교회) 스코프 강제',
  },
  get device() { return (this.surfaces && this.surfaces[0] && this.surfaces[0].device) || 'mobile'; },
  responsive: false,
};
window.PDK_PROJECT = window.PLANDECK_PROJECT;
