window.PLANDECK_PROJECT = {
  name: '훌메이트',
  description: '소규모 교회용 화이트라벨 멀티테넌트 PWA — 한 코드베이스로 교회마다 독립 브랜드 앱(교인앱·공개홈·관리자콘솔). 은성교회 1호 파일럿.',
  version: '0.1.0',
  updatedAt: '2026-10-03',
  changelog: [
    { version: '0.1.0', date: '2026-10-03', note: 'PlanDeck 기획 착수 — 교인앱·공개홈·관리자콘솔 핵심 8화면(파일럿 범위)' },
  ],
  surfaces: [
    { key: 'app',   device: 'mobile',  label: '교인앱(모바일)' },
    { key: 'site',  device: 'mobile',  label: '공개홈(모바일)' },
    { key: 'admin', device: 'desktop', label: '관리자콘솔(PC웹)' },
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
