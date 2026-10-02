/* 주요 플로우 — flows.html 필름스트립 */
window.PLANDECK_FLOWS = [
  {
    id: 'FLOW-PAY', name: '간편결제', surface: '모바일',
    desc: '비회원이 상품을 골라 3탭 안에 결제 완료 — 핵심 전환 여정',
    steps: [
      { screen: 'SCR-HOME-001' },
      { screen: 'SCR-DETAIL-001', via: '상품 선택' },
      { screen: 'SCR-PAY-001', via: '결제하기' },
      { screen: 'SCR-DONE-001', via: '결제 성공' },
    ],
  },
  {
    id: 'FLOW-FAIL', name: '결제 실패·재시도', surface: '모바일',
    desc: '결제 실패 시 1탭으로 재시도하는 예외 여정',
    steps: [
      { screen: 'SCR-PAY-001' },
      { screen: 'SCR-FAIL-001', via: '결제 실패' },
      { screen: 'SCR-PAY-001', via: '다시 시도' },
    ],
  },
];
window.PDK_FLOWS = window.PLANDECK_FLOWS;
