/* 주요 플로우 — flows.html 이 각 플로우를 '실제 화면 썸네일 필름스트립'으로 렌더.
 * 화면이 많아져도 플로우 단위로 정리해 핵심 여정을 한눈에 본다. /pd-flow 로 정의. */
window.PLANDECK_FLOWS = [
  {
    id: 'FLOW-MATCH', name: '돌봄·치료 매칭 예약', surface: '모바일(보호자)',
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
    id: 'FLOW-ADMIN', name: '제공자 심사 (운영자)', surface: 'PC웹(운영자)',
    desc: '운영자가 신규 제공자를 심사·승인하는 운영 플로우',
    steps: [
      { screen: 'SCR-ADMIN-001' },
      { screen: 'SCR-ADMIN-002', via: '제공자 심사' },
    ],
  },
];
window.PDK_FLOWS = window.PLANDECK_FLOWS;
