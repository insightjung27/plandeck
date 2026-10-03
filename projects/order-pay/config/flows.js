/* 주요 플로우 (User Flow) — flows.html 필름스트립. PRD 워크플로 W1~W4와 연동. */
window.PLANDECK_FLOWS = [
  {
    id: 'FLOW-PAY', name: 'W1. 구매·결제', surface: '모바일',
    desc: '비회원이 상품을 골라 장바구니·주문서를 거쳐 결제 완료 — 핵심 전환 여정',
    steps: [
      { screen: 'SCR-HOME-001' },
      { screen: 'SCR-DETAIL-001', via: '상품 선택' },
      { screen: 'SCR-CART-001', via: '장바구니' },
      { screen: 'SCR-CHECKOUT-001', via: '주문하기' },
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
  {
    id: 'FLOW-ORDER', name: 'W2. 주문 관리', surface: '모바일',
    desc: '주문 내역에서 배송을 조회하고 취소/환불·후기를 처리',
    steps: [
      { screen: 'SCR-ORDERS-001' },
      { screen: 'SCR-ORDER-DET-001', via: '주문 선택' },
      { screen: 'SCR-REFUND-001', via: '취소/환불' },
    ],
  },
  {
    id: 'FLOW-MY', name: 'W3. 마이·설정', surface: '모바일',
    desc: '마이에서 배송지·결제수단을 관리',
    steps: [
      { screen: 'SCR-MYPAGE-001' },
      { screen: 'SCR-PAYMENTS-001', via: '결제수단 관리' },
      { screen: 'SCR-PAYMENT-ADD-001', via: '추가' },
    ],
  },
];
window.PDK_FLOWS = window.PLANDECK_FLOWS;
