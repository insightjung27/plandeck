/* 주요 플로우 (User Flow) — flows.html 이 각 플로우를 '실제 화면 썸네일 필름스트립'으로 렌더.
 * 화면이 많아져도 플로우 단위로 정리해 핵심 여정을 한눈에 본다. /pd-flow 로 정의. PRD 워크플로 W1~W4와 연동. */
window.PLANDECK_FLOWS = [
  {
    id: 'FLOW-MATCH', name: 'W1. 매칭·예약', surface: '모바일(보호자)',
    desc: '보호자가 검증된 제공자를 찾아 예약 신청까지 — 핵심 전환 여정',
    steps: [
      { screen: 'SCR-HOME-001' },
      { screen: 'SCR-SEARCH-001', via: '검색' },
      { screen: 'SCR-PROVIDER-001', via: '제공자 선택' },
      { screen: 'SCR-BOOK-001', via: '예약하기' },
      { screen: 'SCR-CONFIRM-001', via: '다음' },
      { screen: 'SCR-DONE-001', via: '신청하기' },
    ],
  },
  {
    id: 'FLOW-SIGNUP', name: 'W2. 가입·아동등록', surface: '모바일(보호자)',
    desc: '로그인/회원가입 후 아동 프로필을 등록해 예약 전제를 갖춘다',
    steps: [
      { screen: 'SCR-LOGIN-001' },
      { screen: 'SCR-CHILD-001', via: '회원가입/아동 등록' },
      { screen: 'SCR-MYPAGE-001', via: '등록 완료' },
    ],
  },
  {
    id: 'FLOW-TRACK', name: 'W3. 예약 추적·후기', surface: '모바일(보호자)',
    desc: '예약 상태(승인대기→확정→완료)를 추적하고, 완료 후 후기를 작성한다',
    steps: [
      { screen: 'SCR-BOOKINGS-001' },
      { screen: 'SCR-BOOKING-DET-001', via: '예약 선택' },
      { screen: 'SCR-REVIEW-001', via: '완료 건 후기' },
    ],
  },
  {
    id: 'FLOW-ADMIN', name: 'W4. 운영 심사·예약관리', surface: 'PC웹(운영자)',
    desc: '운영자가 제공자를 심사·승인하고 전체 예약을 모니터링·중재한다',
    steps: [
      { screen: 'SCR-ADMIN-001' },
      { screen: 'SCR-ADMIN-002', via: '제공자 심사' },
      { screen: 'SCR-ADMIN-003', via: '예약 관리' },
    ],
  },
];
window.PDK_FLOWS = window.PLANDECK_FLOWS;
