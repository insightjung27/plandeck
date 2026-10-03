/* 도담 v2.0.0 주요 플로우(User Flow) — flows.html 이 화면 카드 필름스트립으로 렌더.
 * 부모앱·파트너스앱·관리자 3채널 주요 여정 전수(15개). 단계=실존 SCR-* ID. */
window.PLANDECK_FLOWS = [
  {
    id: 'FLOW-STORE', name: '안심매장 탐색·방문예약', surface: '부모앱',
    desc: '검증 안심매장을 6축 접근성·적합도로 찾아 방문 예약까지 — 핵심 진입 여정',
    steps: [
      { screen: 'SCR-PARENT-001' },
      { screen: 'SCR-PARENT-004' },
      { screen: 'SCR-PARENT-005' },
      { screen: 'SCR-PARENT-012' },
      { screen: 'SCR-PARENT-013' },
    ],
  },
  {
    id: 'FLOW-RESPITE', name: '시간제 돌봄 매칭·라이프사이클', surface: '부모앱',
    desc: '조건·요금 → 검증 돌보미 매칭(비상연락·미성년위탁 동의) → 예약 요청 → 예약 상세(취소/완료)',
    steps: [
      { screen: 'SCR-PARENT-006' },
      { screen: 'SCR-PARENT-009' },
      { screen: 'SCR-PARENT-010' },
      { screen: 'SCR-PARENT-011' },
      { screen: 'SCR-PARENT-047' },
    ],
  },
  {
    id: 'FLOW-SELFCHECK', name: '자가진단(비진단)·치료 연계', surface: '부모앱',
    desc: '비진단 고지 동의 게이트 → 문항 → 결과=상담 권고·치료 예약',
    steps: [
      { screen: 'SCR-PARENT-006' },
      { screen: 'SCR-PARENT-019' },
      { screen: 'SCR-PARENT-014' },
    ],
  },
  {
    id: 'FLOW-SAFETY', name: '안전 — 시그널카드·SOS', surface: '부모앱',
    desc: '배려요청(해바라기 시그널카드) / 긴급 시 SOS(119·112 실연결·비상연락)',
    steps: [
      { screen: 'SCR-PARENT-001' },
      { screen: 'SCR-PARENT-020' },
      { screen: 'SCR-PARENT-021' },
    ],
  },
  {
    id: 'FLOW-COMMUNITY', name: '커뮤니티·장소모음(책장)', surface: '부모앱',
    desc: '부모 커뮤니티 글·장소제안, 검증 장소를 모으고(책장) 이웃 부모 구독',
    steps: [
      { screen: 'SCR-PARENT-007' },
      { screen: 'SCR-PARENT-026' },
      { screen: 'SCR-PARENT-031' },
      { screen: 'SCR-PARENT-032' },
    ],
  },
  {
    id: 'FLOW-ONBOARD', name: '파트너 온보딩 검증', surface: '파트너스앱',
    desc: '공급자 검증 파이프라인 — 역할→자격→동의/서류→성범죄경력조회→보험/교육→심사현황',
    steps: [
      { screen: 'SCR-PTNR-003' },
      { screen: 'SCR-PTNR-004' },
      { screen: 'SCR-PTNR-005' },
      { screen: 'SCR-PTNR-006' },
      { screen: 'SCR-PTNR-007' },
      { screen: 'SCR-PTNR-008' },
      { screen: 'SCR-PTNR-010' },
      { screen: 'SCR-PTNR-012' },
    ],
  },
  {
    id: 'FLOW-JOB', name: '일감 수락·정산·세무', surface: '파트너스앱',
    desc: '홈 → 매칭 요청 → 상세(수락 전 개인정보 마스킹) → 수락(선점) → 정산(원천징수 3.3%·net) → 계좌·세무 안내',
    steps: [
      { screen: 'SCR-PTNR-001' },
      { screen: 'SCR-PTNR-013' },
      { screen: 'SCR-PTNR-014' },
      { screen: 'SCR-PTNR-015' },
      { screen: 'SCR-PTNR-016' },
      { screen: 'SCR-PTNR-017' },
    ],
  },
  {
    id: 'FLOW-STORE-PTNR', name: '매장 파트너 가입·운영', surface: '파트너스앱',
    desc: '매장 파트너 가입 → 매장 등록 신청 → 매장 대시보드 → 정보 수정요청 → 부모 후기 확인',
    steps: [
      { screen: 'SCR-PTNR-011' },
      { screen: 'SCR-PTNR-027' },
      { screen: 'SCR-PTNR-026' },
      { screen: 'SCR-PTNR-028' },
      { screen: 'SCR-PTNR-029' },
    ],
  },
  {
    id: 'FLOW-AMBASSADOR', name: '앰배서더 봉사·공동창조', surface: '파트너스앱',
    desc: '봉사활동 → 봉사 상세 → 앰배서더 커뮤니티 → 친화도 후기(작성) → 도담 함께 만들기(공동창조)',
    steps: [
      { screen: 'SCR-PTNR-030' },
      { screen: 'SCR-PTNR-031' },
      { screen: 'SCR-PTNR-032' },
      { screen: 'SCR-PTNR-034' },
      { screen: 'SCR-PTNR-035' },
      { screen: 'SCR-PTNR-033' },
    ],
  },
  {
    id: 'FLOW-PTNR-GRADE', name: '등급·재인증·마이', surface: '파트너스앱',
    desc: '파트너 마이 → 등급·혜택 → 교육·재인증(주기 이수) → 받은 후기 → 내 정보 관리(마스킹·파기)',
    steps: [
      { screen: 'SCR-PTNR-018' },
      { screen: 'SCR-PTNR-021' },
      { screen: 'SCR-PTNR-020' },
      { screen: 'SCR-PTNR-022' },
      { screen: 'SCR-PTNR-023' },
    ],
  },
  {
    id: 'FLOW-REVIEW', name: '심사·인증(파트너·매장)', surface: '관리자',
    desc: '대시보드 처리 큐 → 파트너 3게이트 심사 → 매장 6축 인증 심사 → 장소 제출 검수 → 매장 상세(운영)',
    steps: [
      { screen: 'SCR-ADMIN-002' },
      { screen: 'SCR-ADMIN-005' },
      { screen: 'SCR-ADMIN-008' },
      { screen: 'SCR-ADMIN-004' },
      { screen: 'SCR-ADMIN-010' },
    ],
  },
  {
    id: 'FLOW-SAFETY-OPS', name: '안전·신고·감사', surface: '관리자',
    desc: '안전 사건 분류→해결(메모 필수) → 신고·모더레이션 → 감사 로그(비가역 쓰기 추적)',
    steps: [
      { screen: 'SCR-ADMIN-002' },
      { screen: 'SCR-ADMIN-014' },
      { screen: 'SCR-ADMIN-015' },
      { screen: 'SCR-ADMIN-024' },
    ],
  },
  {
    id: 'FLOW-ADMIN-USERS', name: '사용자·예약·멤버십', surface: '관리자',
    desc: '대시보드 → 사용자 관리 → 사용자 상세(권한·마스킹) → 예약·매칭 모니터 → 멤버십·결제',
    steps: [
      { screen: 'SCR-ADMIN-002' },
      { screen: 'SCR-ADMIN-006' },
      { screen: 'SCR-ADMIN-007' },
      { screen: 'SCR-ADMIN-011' },
      { screen: 'SCR-ADMIN-013' },
    ],
  },
  {
    id: 'FLOW-ADMIN-SETTLE', name: '정산·과금', surface: '관리자',
    desc: '대시보드 → 활성화 지표 드릴다운 → 정산·코인(회차 확정·지급·net 정합) → 멤버십·결제',
    steps: [
      { screen: 'SCR-ADMIN-002' },
      { screen: 'SCR-ADMIN-003' },
      { screen: 'SCR-ADMIN-012' },
      { screen: 'SCR-ADMIN-013' },
    ],
  },
  {
    id: 'FLOW-ADMIN-CONTENT', name: '콘텐츠·커뮤니티 운영', surface: '관리자',
    desc: '대시보드 → 콘텐츠 운영 → 돌봄 이야기 수정 → 친화도 평가 검수 → 공동창조 → 공지 게시',
    steps: [
      { screen: 'SCR-ADMIN-002' },
      { screen: 'SCR-ADMIN-016' },
      { screen: 'SCR-ADMIN-017' },
      { screen: 'SCR-ADMIN-019' },
      { screen: 'SCR-ADMIN-022' },
      { screen: 'SCR-ADMIN-023' },
    ],
  },
];
window.PDK_FLOWS = window.PLANDECK_FLOWS;
