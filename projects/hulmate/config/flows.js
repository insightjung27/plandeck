/* 주요 플로우 — 화면이 많아져도 플로우 단위로 핵심 여정을 본다. /pd-flow */
window.PLANDECK_FLOWS = [
  {
    id: 'FLOW-SERMON', name: '교인 설교 시청', surface: '교인앱(모바일)',
    desc: '교인이 앱 홈에서 이번 주 설교로 들어가 영상을 본다',
    steps: [
      { screen: 'SCR-APP-001' },
      { screen: 'SCR-APP-002', via: '설교 카드/탭' },
      { screen: 'SCR-APP-003', via: '헌금안내 바로가기' },
    ],
  },
  {
    id: 'FLOW-VISIT', name: '방문자 공개홈', surface: '공개홈(모바일)',
    desc: '방문자가 공개 환영형 홈에서 예배 안내를 확인한다',
    steps: [
      { screen: 'SCR-SITE-001' },
      { screen: 'SCR-SITE-002', via: '예배 안내 보기' },
    ],
  },
  {
    id: 'FLOW-ADMIN', name: '관리자 운영', surface: '관리자콘솔(PC웹)',
    desc: '관리자가 대시보드에서 성도관리로 들어가 가입을 승인한다',
    steps: [
      { screen: 'SCR-ADM-001' },
      { screen: 'SCR-ADM-002', via: '성도관리' },
    ],
  },
];
window.PDK_FLOWS = window.PLANDECK_FLOWS;
