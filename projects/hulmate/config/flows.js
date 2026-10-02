/* 주요 플로우 — 화면이 많아져도 플로우 단위로 핵심 여정을 본다. /pd-flow */
window.PLANDECK_FLOWS = [
  {
    id: 'FLOW-SERMON', name: '교인 설교 시청', surface: '교인앱(모바일)',
    desc: '교인이 앱 홈에서 설교로 들어가 보고, 헌금 안내로 이어진다',
    steps: [{ screen: 'SCR-APP-001' }, { screen: 'SCR-APP-002', via: '설교 카드' }, { screen: 'SCR-APP-003', via: '헌금 바로가기' }],
  },
  {
    id: 'FLOW-VISIT', name: '방문자 공개홈', surface: '공개홈(모바일)',
    desc: '방문자가 환영형 홈 → 예배 안내 → 오시는 길',
    steps: [{ screen: 'SCR-SITE-001' }, { screen: 'SCR-SITE-002', via: '예배 안내' }, { screen: 'SCR-SITE-005', via: '오시는 길' }],
  },
  {
    id: 'FLOW-ADMIN', name: '관리자 운영', surface: '관리자콘솔(PC웹)',
    desc: '관리자가 대시보드 → 성도관리 → 출석관리',
    steps: [{ screen: 'SCR-ADM-001' }, { screen: 'SCR-ADM-002', via: '성도관리' }, { screen: 'SCR-ADM-003', via: '출석관리' }],
  },
  {
    id: 'FLOW-PUBLISH', name: '설교 발행', surface: '관리자→교인앱',
    desc: '관리자가 설교를 등록하면 교인앱 홈·설교에 반영된다',
    steps: [{ screen: 'SCR-ADM-004' }, { screen: 'SCR-APP-001', via: '앱 반영' }, { screen: 'SCR-APP-002', via: '재생' }],
  },
  {
    id: 'FLOW-WHITELABEL', name: '화이트라벨 발행', surface: '슈퍼→관리자→공개홈',
    desc: '테넌트(교회) 발행 → 홈페이지 설정 → 공개 환영형 홈 노출',
    steps: [{ screen: 'SCR-SUP-001' }, { screen: 'SCR-ADM-007', via: '홈 설정' }, { screen: 'SCR-SITE-001', via: '공개' }],
  },
];
window.PDK_FLOWS = window.PLANDECK_FLOWS;
