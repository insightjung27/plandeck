/* 훌메이트 V2.0 주요 플로우 — 4채널(대표사이트·교회 Web/PWA·교회 관리자·슈퍼관리자)의 9단계 종단 연결 + 핵심 여정.
 * 작업계획 §6(가입→개설신청→승인→Tenant생성→Wizard→오픈→교인가입→PWA설치→알림)을 플로우로 가시화. /pd-flow */
window.PLANDECK_FLOWS = [
  // ── 종단 연결(개설 퍼널) ──
  {
    id: 'FLOW-ONBOARD', name: '대표사이트 방문→교회 개설 신청', surface: '대표사이트',
    desc: '[종단 1~2] 대표사이트에서 상품·가격 확인 → 회원가입·교회정보·요금제 선택 → 개설 신청(슈퍼 승인 대기)',
    steps: [{ screen: 'SCR-LND-001' }, { screen: 'SCR-LND-003', via: 'WEB 상품' }, { screen: 'SCR-LND-005', via: '가격 안내' }, { screen: 'SCR-LND-009', via: '교회 개설 신청' }, { screen: 'SCR-SUP-004', via: '슈퍼 승인 대기' }],
  },
  {
    id: 'FLOW-PROVISION', name: '개설 승인→Tenant 자동 프로비저닝', surface: '슈퍼관리자',
    desc: '[종단 3~4] 신규 신청 검토 → 승인 → Tenant·Church·Admin·Domain·ChannelConfig·PwaConfig·Notification 자동 생성 → 관리자 초대',
    steps: [{ screen: 'SCR-SUP-002' }, { screen: 'SCR-SUP-004', via: '개설 검토·승인' }, { screen: 'SCR-SUP-005', via: 'Tenant 생성·상세' }],
  },
  {
    id: 'FLOW-WIZARD', name: '관리자 최초 Wizard→서비스 오픈', surface: '교회 관리자',
    desc: '[종단 5~6] 관리자 로그인 → 개설 설정 Wizard 8STEP(교회명·로고·색·이미지·정보·예배시간·확인·OPEN) → 대시보드(status=활성)',
    steps: [{ screen: 'SCR-ADM-001' }, { screen: 'SCR-ADM-002', via: '개설 Wizard 8STEP' }, { screen: 'SCR-ADM-003', via: 'OPEN·대시보드' }],
  },
  {
    id: 'FLOW-MEMBER-JOIN', name: '교인 진입→가입(교회검색 없음)', surface: '교인 Web·PWA',
    desc: '[종단 7] 교회 URL/PWA 진입 → Tenant 자동 확정 → 로그인/회원가입 → church_id 자동 바인딩(승인대기) → 교인 홈',
    steps: [{ screen: 'SCR-APP-009' }, { screen: 'SCR-APP-008', via: '회원가입(church_id 자동)' }, { screen: 'SCR-APP-001', via: '교인 홈' }],
  },
  {
    id: 'FLOW-PWA-INSTALL', name: 'PWA 홈 설치(교회 전용 앱처럼)', surface: '교회 Web·PWA',
    desc: '[종단 8] 공개홈 → 설치 안내 → 홈 화면 설치(Android 프롬프트/iOS 16.4+ 수동) → Web Push 권한·구독',
    steps: [{ screen: 'SCR-SITE-001' }, { screen: 'SCR-SITE-007', via: '설치 안내' }, { screen: 'SCR-APP-011', via: 'Web Push 구독' }],
  },
  {
    id: 'FLOW-NOTIFY', name: '공지 작성→Web Push→교인 확인', surface: '교회 관리자',
    desc: '[종단 9] 공지 작성(알림 ON) → Notification Gateway 알림 발송(즉시/예약·전체회원) → 교인 알림 수신 → Deep Link로 공지 이동',
    steps: [{ screen: 'SCR-ADM-009' }, { screen: 'SCR-ADM-013', via: '알림 발송' }, { screen: 'SCR-APP-010', via: '교인 알림 수신' }, { screen: 'SCR-APP-005', via: 'Deep Link→공지' }],
  },
  // ── 공개홈(방문자) ──
  {
    id: 'FLOW-VISIT', name: '방문자 공개홈 둘러보기', surface: '교회 공개홈',
    desc: '교회 공개홈 → 교회 소개 → 예배 안내 → 오시는 길 → 설교',
    steps: [{ screen: 'SCR-SITE-001' }, { screen: 'SCR-SITE-002', via: '교회 소개' }, { screen: 'SCR-SITE-003', via: '예배 안내' }, { screen: 'SCR-SITE-004', via: '오시는 길' }, { screen: 'SCR-SITE-005', via: '설교' }],
  },
  // ── 교인(로그인 후) ──
  {
    id: 'FLOW-SERMON', name: '교인 설교 시청', surface: '교인 Web·PWA',
    desc: '교인 홈 → 설교 목록 → 설교 상세(YouTube 재생)',
    steps: [{ screen: 'SCR-APP-001' }, { screen: 'SCR-APP-002', via: '설교' }, { screen: 'SCR-APP-003', via: '설교 상세·재생' }],
  },
  {
    id: 'FLOW-MEMBER-SELF', name: '교인 셀프서비스', surface: '교인 Web·PWA',
    desc: '교인 홈 → 마이 → 내 정보 수정 → 알림 설정(Web Push)',
    steps: [{ screen: 'SCR-APP-001' }, { screen: 'SCR-APP-004', via: '마이' }, { screen: 'SCR-APP-007', via: '내 정보 수정' }, { screen: 'SCR-APP-011', via: '알림 설정' }],
  },
  // ── 교회 관리자 ──
  {
    id: 'FLOW-ADMIN-CONTENT', name: '관리자 콘텐츠 운영', surface: '교회 관리자',
    desc: '대시보드 → 설교 관리·수정 → 주보 관리 → 공지 관리',
    steps: [{ screen: 'SCR-ADM-003' }, { screen: 'SCR-ADM-006', via: '설교 관리' }, { screen: 'SCR-ADM-007', via: '설교 수정' }, { screen: 'SCR-ADM-008', via: '주보 관리' }, { screen: 'SCR-ADM-009', via: '공지 관리' }],
  },
  {
    id: 'FLOW-ADMIN-SETUP', name: '관리자 회원·브랜딩·PWA', surface: '교회 관리자',
    desc: '회원 관리(승인) → 회원 상세 → 교회 설정·브랜딩(4요소) → PWA 관리',
    steps: [{ screen: 'SCR-ADM-010' }, { screen: 'SCR-ADM-011', via: '회원 상세' }, { screen: 'SCR-ADM-004', via: '교회 설정·브랜딩' }, { screen: 'SCR-ADM-014', via: 'PWA 관리' }],
  },
  // ── 슈퍼관리자 ──
  {
    id: 'FLOW-SUPER-OPS', name: '슈퍼관리자 통합 운영', surface: '슈퍼관리자',
    desc: '전체 교회 관리 → 테넌트 상세(ChannelConfig) → 요금제·결제 → 서비스 콘솔 → 운영 로그',
    steps: [{ screen: 'SCR-SUP-003' }, { screen: 'SCR-SUP-005', via: '테넌트 상세' }, { screen: 'SCR-SUP-006', via: '요금제·결제' }, { screen: 'SCR-SUP-008', via: '서비스 콘솔' }, { screen: 'SCR-SUP-009', via: '운영 로그' }],
  },
];
window.PDK_FLOWS = window.PLANDECK_FLOWS;
