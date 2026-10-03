/* 주요 플로우 — 화면이 많아져도 플로우 단위로 핵심 여정을 본다. 교인앱·공개홈·관리자·슈퍼관리자 4채널(12개). /pd-flow */
window.PLANDECK_FLOWS = [
  // ── 교인앱(모바일) ──
  {
    id: 'FLOW-SERMON', name: '설교 시청', surface: '교인앱',
    desc: '홈에서 설교 목록 → 설교 상세(유튜브 재생·노트)',
    steps: [{ screen: 'SCR-APP-001' }, { screen: 'SCR-APP-002', via: '설교 탭' }, { screen: 'SCR-APP-011', via: '설교 선택' }],
  },
  {
    id: 'FLOW-GIVING', name: '헌금·기부금영수증', surface: '교인앱',
    desc: '헌금 안내(계좌) → 기부금영수증 발급요청(발급 주체=교회·주민번호는 요청 시점 수집)',
    steps: [{ screen: 'SCR-APP-001' }, { screen: 'SCR-APP-003', via: '헌금' }, { screen: 'SCR-APP-022', via: '영수증 발급요청' }],
  },
  {
    id: 'FLOW-COMMUNITY-APP', name: '교제·나눔·교회학교', surface: '교인앱',
    desc: '커뮤니티 나눔글 → 아나바다(중고나눔) → 교회학교',
    steps: [{ screen: 'SCR-APP-005' }, { screen: 'SCR-APP-012', via: '나눔글' }, { screen: 'SCR-APP-006', via: '아나바다' }, { screen: 'SCR-APP-007', via: '교회학교' }],
  },
  {
    id: 'FLOW-MEMBER', name: '교인 셀프서비스', surface: '교인앱',
    desc: '마이 → 출석 체크 → 내 정보 수정 → 개인정보 권리요청(PIPA)',
    steps: [{ screen: 'SCR-APP-004' }, { screen: 'SCR-APP-024', via: '출석' }, { screen: 'SCR-APP-019', via: '정보 수정' }, { screen: 'SCR-APP-023', via: '권리요청' }],
  },
  // ── 공개홈(모바일) ──
  {
    id: 'FLOW-VISIT', name: '방문자 공개홈', surface: '공개홈',
    desc: '환영형 홈 → 예배 안내 → 오시는 길 → 새가족 안내',
    steps: [{ screen: 'SCR-SITE-001' }, { screen: 'SCR-SITE-002', via: '예배 안내' }, { screen: 'SCR-SITE-005', via: '오시는 길' }, { screen: 'SCR-SITE-007', via: '새가족' }],
  },
  {
    id: 'FLOW-SITE-CONTENT', name: '교회 소개·설교·소식', surface: '공개홈',
    desc: '홈 → 교회 소개 → 섬기는 사람들 → 설교·찬양 → 교회 소식',
    steps: [{ screen: 'SCR-SITE-001' }, { screen: 'SCR-SITE-003', via: '소개' }, { screen: 'SCR-SITE-004', via: '섬기는 이' }, { screen: 'SCR-SITE-006', via: '설교' }, { screen: 'SCR-SITE-008', via: '소식' }],
  },
  // ── 관리자콘솔(PC웹) ──
  {
    id: 'FLOW-ADMIN', name: '운영 — 성도·출석', surface: '관리자',
    desc: '대시보드 → 성도관리(교적) → 성도 상세 → 출석 관리',
    steps: [{ screen: 'SCR-ADM-001' }, { screen: 'SCR-ADM-002', via: '성도관리' }, { screen: 'SCR-ADM-008', via: '상세' }, { screen: 'SCR-ADM-003', via: '출석' }],
  },
  {
    id: 'FLOW-SERMON-PUBLISH', name: '설교·공지 발행', surface: '관리자',
    desc: '설교 등록·수정(유튜브·라이브) → 공지·배너 → 문자·알림 발송(문자지갑·야간차단) — 교인앱 반영',
    steps: [{ screen: 'SCR-ADM-004' }, { screen: 'SCR-ADM-010', via: '설교 수정' }, { screen: 'SCR-ADM-005', via: '공지' }, { screen: 'SCR-ADM-012', via: '문자 발송' }],
  },
  {
    id: 'FLOW-FINANCE', name: '재정·기부금영수증', surface: '관리자',
    desc: '재정 관리(헌금 집계) → 헌금 상세 → 기부금영수증 발급/취소(발급 주체=교회·감사추적)',
    steps: [{ screen: 'SCR-ADM-006' }, { screen: 'SCR-ADM-011', via: '헌금 상세' }],
  },
  {
    id: 'FLOW-ADMIN-SITE', name: '공개홈·모더레이션·개인정보', surface: '관리자',
    desc: '홈페이지 설정 → 공개홈 콘텐츠 → UGC 모더레이션 → 개인정보 보호(PIPA 권리요청 처리)',
    steps: [{ screen: 'SCR-ADM-007' }, { screen: 'SCR-ADM-015', via: '콘텐츠' }, { screen: 'SCR-ADM-016', via: '모더레이션' }, { screen: 'SCR-ADM-013', via: '개인정보' }],
  },
  // ── 슈퍼관리자(PC웹) ──
  {
    id: 'FLOW-WHITELABEL', name: '화이트라벨 교회 개설', surface: '슈퍼관리자',
    desc: '테넌트 관리 → 교회 발행 → 이단심사 게이트(승인 전 비노출) → 테넌트 상세 — 공개홈·앱 노출',
    steps: [{ screen: 'SCR-SUP-001' }, { screen: 'SCR-SUP-002', via: '교회 발행' }, { screen: 'SCR-SUP-004', via: '이단심사' }, { screen: 'SCR-SUP-003', via: '상세' }],
  },
  {
    id: 'FLOW-SUPER-OPS', name: '구독·도메인·감사', surface: '슈퍼관리자',
    desc: '테넌트 상세 → 구독·과금 → 커스텀 도메인 → 감사로그(비가역 쓰기 추적)',
    steps: [{ screen: 'SCR-SUP-003' }, { screen: 'SCR-SUP-005', via: '구독' }, { screen: 'SCR-SUP-006', via: '도메인' }, { screen: 'SCR-SUP-008', via: '감사' }],
  },
];
window.PDK_FLOWS = window.PLANDECK_FLOWS;
