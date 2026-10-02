window.PLANDECK_PRD = {
  background: '기존 결제는 회원가입·로그인 단계에서 이탈이 크다. 비회원이 상품 선택 후 최소 단계로 결제를 끝내게 해 전환율을 높인다.',
  goals: [
    '비회원도 상품 선택 후 3탭 안에 결제 완료',
    '결제 실패 시 1탭으로 재시도',
    '결제 완료율 70% 이상',
  ],
  users: [
    { role: '구매자(비회원)', jobStory: '급하게 선물할 때, 가입 없이 빠르게 결제하고 싶다, 그래서 약속을 지킨다' },
  ],
  scope: ['상품 목록', '상품 상세', '결제', '완료', '실패/재시도'],
  outOfScope: ['회원가입', '정기구독', '다국어', '환불'],
  successMetrics: [
    { metric: '결제 완료율', target: '70% 이상' },
    { metric: '결제 평균 소요', target: '30초 이내' },
  ],
  constraints: ['PG는 토스페이먼츠 고정', '비회원 게스트 토큰 사용'],
  assumptions: ['사용자는 이미 구매 의사가 있는 상태로 진입'],
  dependencies: ['상품 카탈로그 API(기존)', '결제 PG(토스페이먼츠)'],
  releases: [
    { name: 'MVP', scope: ['상품 목록', '상품 상세', '결제', '완료', '실패'], when: '2026-Q4' },
  ],
  requirements: [
    { reqId: 'REQ-001', text: '사용자는 상품 목록을 보고 하나를 선택할 수 있다', surfaces: ['mobile'] },
    { reqId: 'REQ-002', text: '사용자는 상품 상세를 보고 결제로 진입할 수 있다', surfaces: ['mobile'] },
    { reqId: 'REQ-003', text: '사용자는 결제수단을 선택해 결제할 수 있다', surfaces: ['mobile'] },
    { reqId: 'REQ-004', text: '결제 성공 시 완료 화면을, 실패 시 재시도 화면을 본다', surfaces: ['mobile'] },
  ],
  workflows: [
    {
      name: '간편결제', surface: 'mobile',
      steps: [
        { screen: '상품목록', via: '상품 선택' },
        { screen: '상품상세', via: '결제하기' },
        { screen: '결제', via: '결제 성공', branch: '결제 성공 여부' },
        { screen: '완료' },
      ],
    },
  ],
  openQuestions: [
    '결제수단 범위 — 카드만? 간편결제(토스페이) 포함? (데모는 둘 다 가정)',
  ],
};
window.PDK_PRD = window.PLANDECK_PRD;
