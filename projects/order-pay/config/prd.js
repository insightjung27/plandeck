window.PLANDECK_PRD = {
  version: '1.0.0',
  background: '기존 결제는 회원가입·로그인 단계에서 이탈이 크다. 비회원(게스트)이 상품 선택 후 최소 단계로 결제하고, 주문·배송을 조회하며, 배송지·결제수단을 관리할 수 있게 해 전환율과 재구매를 높인다.',
  goals: [
    '비회원도 상품 선택 후 3탭 안에 결제 완료',
    '결제 실패 시 1탭으로 재시도',
    '주문 후 배송 조회·취소/환불·후기까지 비회원이 스스로 처리',
    '결제 완료율 70% 이상',
  ],
  users: [
    { role: '구매자(비회원/게스트)', jobStory: '급하게 선물할 때, 가입 없이 빠르게 결제하고, 주문·배송을 확인하고 싶다' },
  ],
  scope: ['상품 목록·검색·상세', '장바구니', '주문서(배송지·할인·금액)', '배송지 입력', '결제(수단 선택)', '완료/실패·재시도', '주문 내역', '주문 상세·배송 조회', '취소/환불', '후기 작성', '마이', '결제수단 관리·추가', '배송지 관리', '쿠폰·포인트', '고객센터'],
  outOfScope: ['회원가입/로그인(게스트 유지)', '정기구독', '다국어', '상품 문의/Q&A(차기)', '실시간 채팅상담(차기)'],
  successMetrics: [
    { metric: '결제 완료율', target: '70% 이상' },
    { metric: '결제 평균 소요', target: '30초 이내' },
    { metric: '주문 후 후기 작성률', target: '30% 이상' },
  ],
  constraints: ['PG는 토스페이먼츠 고정', '비회원 게스트 토큰', '결제 멱등키(중복결제 방지)'],
  assumptions: ['사용자는 구매 의사가 있는 상태로 진입', '비회원도 주문번호/연락처로 주문 조회'],
  dependencies: ['상품 카탈로그 API', '결제 PG(토스페이먼츠)', '배송 추적(택배사 API)'],
  releases: [
    { name: 'MVP', scope: ['상품탐색·장바구니·주문서·결제·완료/실패', '주문내역·배송조회·취소환불·후기', '마이(배송지·결제수단·쿠폰·고객센터)'], when: '2026-Q4' },
  ],
  requirements: [
    { reqId: 'REQ-001', text: '사용자는 상품 목록·카테고리를 보고 상품을 선택할 수 있다', surfaces: ['mobile'] },
    { reqId: 'REQ-002', text: '사용자는 상품 상세(옵션·수량)를 보고 장바구니 또는 바로 구매로 진입할 수 있다', surfaces: ['mobile'] },
    { reqId: 'REQ-003', text: '사용자는 결제수단을 선택해 결제할 수 있다', surfaces: ['mobile'] },
    { reqId: 'REQ-004', text: '결제 성공 시 완료 화면을, 실패 시 재시도 화면을 본다', surfaces: ['mobile'] },
    { reqId: 'REQ-005', text: '사용자는 장바구니에 여러 상품을 담고 수량을 조절할 수 있다', surfaces: ['mobile'] },
    { reqId: 'REQ-006', text: '사용자는 주문서에서 배송지·할인·금액을 확인하고 배송지를 입력/선택한다', surfaces: ['mobile'] },
    { reqId: 'REQ-007', text: '사용자는 주문 내역·배송 상태를 조회하고, 완료 건에 후기를 작성한다', surfaces: ['mobile'] },
    { reqId: 'REQ-008', text: '사용자는 주문을 취소/환불 신청할 수 있다', surfaces: ['mobile'] },
    { reqId: 'REQ-009', text: '사용자는 마이에서 배송지·결제수단을 관리할 수 있다', surfaces: ['mobile'] },
    { reqId: 'REQ-010', text: '사용자는 검색·쿠폰/포인트·고객센터(FAQ·문의)를 이용할 수 있다', surfaces: ['mobile'] },
  ],
  workflows: [
    { name: 'W1. 구매·결제', surface: 'mobile', steps: [{ screen: '상품목록' }, { screen: '상품상세', via: '선택' }, { screen: '장바구니', via: '담기' }, { screen: '주문서', via: '주문하기' }, { screen: '결제', via: '결제하기', branch: '결제 성공 여부' }, { screen: '완료/실패' }] },
    { name: 'W2. 주문 관리', surface: 'mobile', steps: [{ screen: '주문 내역' }, { screen: '주문 상세', via: '배송 조회' }, { screen: '취소/환불 · 후기', via: '취소/후기' }] },
    { name: 'W3. 마이·설정', surface: 'mobile', steps: [{ screen: '마이' }, { screen: '배송지/결제수단 관리', via: '관리' }, { screen: '쿠폰·포인트' }] },
    { name: 'W4. 고객 지원', surface: 'mobile', steps: [{ screen: '검색' }, { screen: '고객센터', via: 'FAQ·문의' }] },
  ],
  openQuestions: [],
  resolvedDecisions: [
    '결제수단 범위 → 카드 + 간편결제(토스페이·카카오페이) 모두 지원',
    '비회원 주문 조회 → 게스트 토큰 + 주문번호/연락처 기반(회원가입 불필요)',
  ],
};
window.PDK_PRD = window.PLANDECK_PRD;
