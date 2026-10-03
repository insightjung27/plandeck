/* 도담 v2.0.0 주요 플로우(User Flow) — flows.html 이 실제 화면 썸네일 필름스트립으로 렌더.
 * 부모앱 핵심 여정. 파트너스앱·관리자 플로우는 각 채널 빌드 시 추가. */
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
    id: 'FLOW-RESPITE', name: '시간제 돌봄 매칭', surface: '부모앱',
    desc: '조건·요금 → 검증 돌보미 매칭(비상연락·미성년위탁 동의) → 예약 요청',
    steps: [
      { screen: 'SCR-PARENT-006' },
      { screen: 'SCR-PARENT-009' },
      { screen: 'SCR-PARENT-010' },
      { screen: 'SCR-PARENT-011' },
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
    id: 'FLOW-JOB', name: '일감 수락·정산', surface: '파트너스앱',
    desc: '돌보미 매칭 요청 → 상세(수락 전 마스킹) → 수락(선점) → 정산(원천징수 3.3%)',
    steps: [
      { screen: 'SCR-PTNR-013' },
      { screen: 'SCR-PTNR-014' },
      { screen: 'SCR-PTNR-015' },
    ],
  },
  {
    id: 'FLOW-REVIEW', name: '관리자 심사(파트너·매장)', surface: '관리자',
    desc: '대시보드 처리 큐 → 파트너 3게이트 심사 / 매장 6축 인증 → 앱 노출',
    steps: [
      { screen: 'SCR-ADMIN-002' },
      { screen: 'SCR-ADMIN-005' },
      { screen: 'SCR-ADMIN-008' },
    ],
  },
  {
    id: 'FLOW-SAFETY-OPS', name: '관리자 안전·정산', surface: '관리자',
    desc: '안전 사건 분류→해결(메모 필수) / 정산 회차 확정→지급(net 정합)',
    steps: [
      { screen: 'SCR-ADMIN-002' },
      { screen: 'SCR-ADMIN-014' },
      { screen: 'SCR-ADMIN-012' },
    ],
  },
];
window.PDK_FLOWS = window.PLANDECK_FLOWS;
