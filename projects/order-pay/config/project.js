window.PLANDECK_PROJECT = {
  name: '간편결제 데모',
  description: '비회원 간편결제 — 상품탐색·장바구니·주문서·결제·주문관리·마이 19화면(실서비스 수준). PlanDeck 시연 겸.',
  version: '1.0.0',
  updatedAt: '2026-10-03',
  changelog: [
    { version: '1.0.0', date: '2026-10-03', note: '실서비스 확장 — 5→19화면(장바구니·주문서·배송지·주문내역/상세·배송조회·취소환불·후기·마이·결제수단/배송지관리·쿠폰·고객센터·검색) + REQ-005~010. 컴포넌트 라이브러리 재구축(인라인 0)·모든 파생 링크 실재화(빈 링크 0)·요구사항 10/10.' },
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
