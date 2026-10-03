/* 주요 플로우 (User Flow) — flows.html 필름스트립. 단일 채널(모바일 커머스) 6개. PRD 워크플로 연동. */
window.PLANDECK_FLOWS = [
  {
    id: 'FLOW-PAY', name: 'W1. 구매·결제', surface: '모바일',
    desc: '상품을 골라 장바구니·주문서·배송지를 거쳐 결제 완료 — 핵심 전환 여정',
    steps: [
      { screen: 'SCR-HOME-001' },
      { screen: 'SCR-DETAIL-001', via: '상품 선택' },
      { screen: 'SCR-CART-001', via: '장바구니' },
      { screen: 'SCR-CHECKOUT-001', via: '주문하기' },
      { screen: 'SCR-ADDRESS-001', via: '배송지' },
      { screen: 'SCR-PAY-001', via: '결제하기' },
      { screen: 'SCR-DONE-001', via: '결제 성공' },
    ],
  },
  {
    id: 'FLOW-DISCOVER', name: '탐색·검색', surface: '모바일',
    desc: '상품 목록에서 검색 → 상품 상세 → 장바구니 담기',
    steps: [
      { screen: 'SCR-HOME-001' },
      { screen: 'SCR-SEARCH-001', via: '검색' },
      { screen: 'SCR-DETAIL-001', via: '상품 선택' },
      { screen: 'SCR-CART-001', via: '담기' },
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
    id: 'FLOW-ORDER', name: 'W2. 주문 관리·환불', surface: '모바일',
    desc: '주문 내역에서 배송 조회 → 주문 상세 → 취소/환불',
    steps: [
      { screen: 'SCR-ORDERS-001' },
      { screen: 'SCR-ORDER-DET-001', via: '주문 선택' },
      { screen: 'SCR-REFUND-001', via: '취소/환불' },
    ],
  },
  {
    id: 'FLOW-REVIEW', name: '후기 작성', surface: '모바일',
    desc: '구매 상품에 별점·사진 후기 작성',
    steps: [
      { screen: 'SCR-ORDERS-001' },
      { screen: 'SCR-ORDER-DET-001', via: '주문 선택' },
      { screen: 'SCR-REVIEW-001', via: '후기 작성' },
    ],
  },
  {
    id: 'FLOW-MY', name: 'W3. 마이·설정·고객센터', surface: '모바일',
    desc: '마이에서 결제수단·배송지·쿠폰을 관리하고 고객센터 문의',
    steps: [
      { screen: 'SCR-MYPAGE-001' },
      { screen: 'SCR-PAYMENTS-001', via: '결제수단' },
      { screen: 'SCR-PAYMENT-ADD-001', via: '추가' },
      { screen: 'SCR-ADDRESSBOOK-001', via: '배송지' },
      { screen: 'SCR-COUPONS-001', via: '쿠폰' },
      { screen: 'SCR-SUPPORT-001', via: '고객센터' },
    ],
  },
];
window.PDK_FLOWS = window.PLANDECK_FLOWS;
