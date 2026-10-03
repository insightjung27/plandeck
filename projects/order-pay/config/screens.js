/* 간편결제 데모 — PlanDeck 전체 기능 시연 (화면 5종, 모바일) */
window.PLANDECK_SCREENS = [
  {
    category: '구매',
    pages: [
      // ── 1. 상품 목록 (진입점, 개발준비 완료) ──
      {
        id: 'SCR-HOME-001', label: '상품 목록', href: 'm-home.html',
        surface: 'mobile', entry: true, status: 'confirmed', designed: false, figmaLink: '',
        reqIds: ['REQ-001'],
        context: '앱 진입 첫 화면. 판매 상품을 카드 목록으로 보여주고, 하나를 선택하면 상세로 이동.',
        components: [
          { role: '.pd-title', kind: 'title', label: '상품 목록' },
          { role: '.pd-list', kind: 'list', label: '상품 카드 목록', action: { on: 'click', do: 'go:SCR-DETAIL-001' } },
        ],
        description: [
          { text: '상품 카드 목록 — 항목 선택 시 상세(SCR-DETAIL-001)로 이동', target: '.pd-list' },
          { text: '화면 제목', target: '.pd-title' },
        ],
        cases: [
          { state: '초기', trigger: '진입', guard: '', result: '목록 로딩 시작', message: '', placement: '', target: '.pd-list' },
          { state: '로딩', trigger: '목록 요청', guard: '', result: '스켈레톤 카드 표시', message: '', placement: '', target: '.pd-list', api: { endpoint: 'GET /products', status: 200 } },
          { state: '정상', trigger: '응답', guard: '상품 1건 이상', result: '카드 목록 표시', message: '', placement: '', target: '.pd-list' },
          { state: '빈데이터', trigger: '응답', guard: '상품 0건', result: '빈 상태 안내', message: '판매 중인 상품이 없어요', placement: 'full-page', target: '.pd-list' },
          { state: '에러', trigger: '응답', guard: '서버 오류', result: '재시도 버튼', message: '목록을 불러오지 못했어요. 다시 시도해 주세요', placement: 'full-page', api: { endpoint: 'GET /products', status: 500 } },
          { state: '권한없음', trigger: '진입', guard: '게스트 토큰 만료', result: '토큰 재발급 후 재조회', message: '', placement: '', api: { endpoint: 'GET /products', status: 403 } },
          { state: 'N/A', trigger: '', guard: '엣지: 해당 없음', result: '', message: '', placement: '' },
        ],
        interface: {
          reads: [
            {
              id: 'listProducts', intent: '상품 목록 조회', method: 'GET', path: '/products',
              params: [
                { in: 'query', name: 'limit', type: 'integer', required: false, example: 20, note: '페이지 크기' },
                { in: 'query', name: 'cursor', type: 'string', required: false, note: '다음 페이지 커서' },
              ],
              response: '{entities.Product}[]',   // 배열(목록)
              errors: [
                { status: 403, when: '게스트 토큰 만료' },
                { status: 500, when: '서버 오류', message: '목록을 불러오지 못했어요' },
              ],
              auth: 'Bearer(게스트)', target: '.pd-list',
            },
          ],
          writes: [],
          events: [],
        },
        flow: { to: [{ screen: 'SCR-DETAIL-001', via: '상품 선택', trigger: '.pd-list' }] },
      },
      // ── 2. 상품 상세 (기획 확정) ──
      {
        id: 'SCR-DETAIL-001', label: '상품 상세', href: 'm-detail.html',
        surface: 'mobile', entry: false, status: 'confirmed', designed: false, figmaLink: '',
        reqIds: ['REQ-002'],
        context: '선택한 상품의 상세 정보. 하단 CTA로 결제 화면 진입.',
        components: [
          { role: '.pd-back', kind: 'button', label: '뒤로', action: { on: 'click', do: 'go:SCR-HOME-001' } },
          { role: '.pd-hero', kind: 'hero', label: '상품 이미지' },
          { role: '.pd-title', kind: 'title', label: '상품명·가격' },
          { role: '.pd-btn-pay', kind: 'button', label: '결제하기', action: { on: 'click', do: 'go:SCR-PAY-001' } },
        ],
        description: [
          { text: '뒤로 가기 → 목록(SCR-HOME-001)', target: '.pd-back' },
          { text: '상품 대표 이미지', target: '.pd-hero' },
          { text: '결제하기 → 결제 화면(SCR-PAY-001)', target: '.pd-btn-pay' },
        ],
        cases: [
          { state: '정상', trigger: '진입', guard: '재고 있음', result: '상세 표시, 결제 활성', message: '', placement: '', target: '.pd-btn-pay', api: { endpoint: 'GET /products/{id}', status: 200 } },
          { state: '빈데이터', trigger: '진입', guard: '품절', result: '결제 비활성', message: '품절된 상품입니다', placement: 'inline', target: '.pd-btn-pay' },
          { state: '에러', trigger: '진입', guard: '상품 없음', result: '목록으로', message: '상품을 찾을 수 없어요', placement: 'full-page', api: { endpoint: 'GET /products/{id}', status: 404 } },
          { state: '로딩', trigger: '진입', guard: '', result: '스켈레톤', message: '', placement: '' },
          { state: '초기', trigger: '진입', guard: '', result: '상세 로딩 시작', message: '', placement: '' },
          { state: '권한없음', trigger: '진입', guard: '게스트 토큰 만료', result: '토큰 재발급 후 재조회', message: '', placement: '', api: { endpoint: 'GET /products/{id}', status: 403 } },
          { state: '엣지', trigger: '진입', guard: '가격/재고 변동', result: '최신값 재조회 후 표시', message: '정보가 업데이트되었어요', placement: 'toast' },
        ],
        interface: {
          reads: [
            {
              id: 'getProduct', intent: '상품 상세 조회', method: 'GET', path: '/products/{id}', response: '{entities.Product}',
              errors: [{ status: 404, when: '상품 없음', message: '상품을 찾을 수 없어요' }],
              auth: 'Bearer(게스트)', target: '.pd-hero',
            },
          ],
          writes: [],
          events: [],
        },
        flow: { to: [{ screen: 'SCR-PAY-001', via: '결제하기', trigger: '.pd-btn-pay', onCall: 'createOrder' }] },
      },
      // ── 3. 결제 (분기, 개발준비 — 단 스펙 변경 감지 데모용 stale _hash) ──
      {
        id: 'SCR-PAY-001', label: '결제', href: 'm-pay.html',
        surface: 'mobile', entry: false, status: 'confirmed', designed: false, figmaLink: '',
        reqIds: ['REQ-003', 'REQ-004'],
        context: '결제수단 선택 후 결제 실행. 성공/실패로 분기.',
        components: [
          { role: '.pd-back', kind: 'button', label: '뒤로', action: { on: 'click', do: 'go:SCR-DETAIL-001' } },
          { role: '.pd-method', kind: 'list', label: '결제수단 선택(카드/토스페이)' },
          { role: '.pd-btn-confirm', kind: 'button', label: '결제하기', action: { on: 'click', do: 'write:createOrder' } },
        ],
        description: [
          { text: '결제수단 선택(카드/토스페이)', target: '.pd-method' },
          { text: '결제하기 → createOrder 호출 → 성공 시 완료(SCR-DONE-001), 실패 시 실패(SCR-FAIL-001)', target: '.pd-btn-confirm' },
        ],
        cases: [
          { state: '초기', trigger: '진입', guard: '결제수단 미선택', result: '결제 버튼 비활성', message: '', placement: '', target: '.pd-method' },
          { state: '정상', trigger: '결제하기', guard: '승인 성공', result: '완료 화면(SCR-DONE-001)', message: '', placement: '', target: '.pd-btn-confirm', api: { endpoint: 'POST /orders', status: 201 }, priority: 'P0', testId: 'TC-PAY-001' },
          { state: '에러', trigger: '결제하기', guard: '결제 실패(한도/거절)', result: '실패 화면(SCR-FAIL-001)', message: '결제에 실패했어요', placement: 'toast', recovery: '다시 시도', target: '.pd-btn-confirm', api: { endpoint: 'POST /orders', status: 402 }, priority: 'P0', testId: 'TC-PAY-002' },
          { state: '엣지', trigger: '결제하기', guard: '재고 소진(동시결제)', result: '실패 화면(SCR-FAIL-001)', message: '방금 품절되었어요', placement: 'toast', api: { endpoint: 'POST /orders', status: 409 }, priority: 'P1', testId: 'TC-PAY-003' },
          { state: '필수누락', trigger: '결제하기', guard: '결제수단 미선택', result: '제출 막음', message: '결제수단을 선택해 주세요', placement: 'inline', target: '.pd-method', priority: 'P1', testId: 'TC-PAY-004' },
          { state: '로딩', trigger: '결제하기', guard: '승인 대기', result: '버튼 로딩·중복제출 방지', message: '', placement: '', target: '.pd-btn-confirm' },
          { state: '권한없음', trigger: '결제하기', guard: '게스트 토큰 만료', result: '토큰 재발급 후 재시도', message: '', placement: '', api: { endpoint: 'POST /orders', status: 403 } },
          { state: '빈데이터', trigger: '', guard: 'N/A(입력 폼)', result: '', message: '', placement: '' },
        ],
        interface: {
          reads: [],
          writes: [
            {
              id: 'createOrder', intent: '주문 생성·결제 실행', method: 'POST', path: '/orders', successStatus: 201,
              request: '{entities.OrderDraft}', response: '{entities.Order}',
              errors: [
                { status: 402, when: '결제 승인 실패', message: '결제에 실패했어요' },
                { status: 409, when: '재고 소진', message: '방금 품절되었어요' },
                { status: 403, when: '게스트 토큰 만료', message: '' },
              ],
              auth: 'Bearer(게스트)', idempotency: 'Idempotency-Key 헤더(중복결제 방지)', target: '.pd-btn-confirm',
            },
          ],
          events: [{ name: 'order.created', when: '결제 성공 시', payload: '{entities.Order}' }],
        },
        flow: {
          to: [
            { screen: 'SCR-DONE-001', via: '성공', branch: '결제 성공 여부', onCall: 'createOrder' },
            { screen: 'SCR-FAIL-001', via: '실패', branch: '결제 성공 여부' },
          ],
        },
      },
      // ── 4. 완료 (와이어프레임 단계, 자동 복귀) ──
      {
        id: 'SCR-DONE-001', label: '결제 완료', href: 'm-done.html',
        surface: 'mobile', entry: false, status: 'confirmed', designed: false, figmaLink: '',
        reqIds: ['REQ-004'],
        context: '결제 성공 안내. 3초 후 홈으로 자동 복귀.',
        components: [
          { role: '.pd-title', kind: 'title', label: '결제 완료 안내' },
          { role: '.pd-btn-home', kind: 'button', label: '홈으로', action: { on: 'click', do: 'go:SCR-HOME-001' } },
        ],
        description: [
          { text: '결제 완료 메시지', target: '.pd-title' },
          { text: '홈으로 → 상품 목록(SCR-HOME-001). 3초 후 자동 이동', target: '.pd-btn-home' },
        ],
        cases: [
          { state: '정상', trigger: '진입', guard: '결제 성공으로 진입', result: '완료 안내 + 주문번호', message: '결제가 완료되었어요', placement: 'full-page', target: '.pd-title' },
          { state: '에러', trigger: '진입', guard: '주문 없이 직접 진입', result: '홈으로 리다이렉트', message: '', placement: 'full-page', target: '.pd-title' },
        ],
        interface: { reads: [], writes: [], events: [] },
        flow: { to: [{ screen: 'SCR-HOME-001', via: '3초 후 자동', kind: 'auto', delayMs: 3000 }] },
      },
      // ── 5. 실패 (기획 확정) ──
      {
        id: 'SCR-FAIL-001', label: '결제 실패', href: 'm-fail.html',
        surface: 'mobile', entry: false, status: 'confirmed', designed: false, figmaLink: '',
        reqIds: ['REQ-004'],
        context: '결제 실패 안내. 재시도 또는 홈 선택.',
        components: [
          { role: '.pd-title', kind: 'title', label: '실패 안내' },
          { role: '.pd-btn-retry', kind: 'button', label: '다시 시도', action: { on: 'click', do: 'go:SCR-PAY-001' } },
          { role: '.pd-btn-home', kind: 'button', label: '홈으로', action: { on: 'click', do: 'go:SCR-HOME-001' } },
        ],
        description: [
          { text: '실패 사유 안내', target: '.pd-title' },
          { text: '다시 시도 → 결제(SCR-PAY-001)', target: '.pd-btn-retry' },
          { text: '홈으로 → 목록(SCR-HOME-001)', target: '.pd-btn-home' },
        ],
        cases: [
          { state: '정상', trigger: '진입', guard: '결제 실패로 진입', result: '사유 안내 + 재시도', message: '결제에 실패했어요. 다시 시도해 주세요', placement: 'full-page', target: '.pd-title' },
          { state: '엣지', trigger: '다시 시도', guard: '연속 3회 실패', result: '고객센터 안내', message: '문제가 계속되면 고객센터로 문의해 주세요', placement: 'inline', target: '.pd-btn-retry' },
          { state: 'N/A', trigger: '', guard: '초기·로딩·빈데이터·에러·권한없음: 실패 안내 전용 화면이라 해당 없음', result: '', message: '', placement: '' },
        ],
        interface: { reads: [], writes: [], events: [] },
        flow: {
          to: [
            { screen: 'SCR-PAY-001', via: '다시 시도', trigger: '.pd-btn-retry' },
            { screen: 'SCR-HOME-001', via: '홈으로', trigger: '.pd-btn-home' },
          ],
        },
      },
    ],
  },
];
window.PDK_SCREENS = window.PLANDECK_SCREENS;
