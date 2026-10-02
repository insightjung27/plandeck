window.PLANDECK_PROJECT = {
  name: '간편결제 데모',
  description: '비회원도 3탭 안에 결제를 끝내는 모바일 간편결제 — PlanDeck 전체 기능 시연용 예제',
  version: '0.1.0',
  updatedAt: '2026-10-02',
  changelog: [
    { version: '0.1.0', date: '2026-10-02', note: '초기 데모 — 간편결제 5화면(기능·예외·개발계약 포함)' },
  ],
  surfaces: [
    { key: 'mobile', device: 'mobile', label: '모바일' },
  ],
  constitution: {
    auth: 'Bearer JWT (Authorization 헤더, 비회원은 게스트 토큰)',
    baseUrl: 'https://api.pay-demo.example.com/v1',
    errorConvention: 'RFC 9457 Problem Details (application/problem+json)',
    naming: 'SCR-<약어>-<3자리>',
  },
  get device() { return (this.surfaces && this.surfaces[0] && this.surfaces[0].device) || 'mobile'; },
  responsive: false,
};
window.PDK_PROJECT = window.PLANDECK_PROJECT;
