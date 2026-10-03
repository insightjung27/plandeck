/* 도담 돌봄·치료 매칭 — 전면 재구축 v1.0 (17화면: 보호자앱 12 + 운영자 3 + 태블릿 2).
 * 컴포넌트 라이브러리(plandeck-ui.css)·정적 href 클릭 가능·요구사항 8/8 커버. */
window.PLANDECK_SCREENS = [
  {
    category: '돌봄·치료 매칭',
    pages: [
      // ── 1. 홈 (진입점, 개발준비) ──
      {
        id: 'SCR-HOME-001', label: '홈', href: 'm-home.html',
        surface: 'mobile', entry: true, status: 'confirmed', designed: false, figmaLink: '',
        // Figma 연동은 '옵션' — 기본은 와이어프레임, 상단 [디자인] 토글로 켤 때만 아래 디자인이 보인다.
        // (Phase1 데모: 실제 MCP/REST 연결 전 플레이스홀더 SVG. /pd-figma-sync 가 이 figma 필드를 채움)
        figma: {
          image: 'assets/figma/SCR-HOME-001.svg', imageW: 360, imageH: 782,
          hotspots: [
            { rect: [24, 106, 312, 52], to: 'SCR-SEARCH-001' },   // 검색바 → 검색결과
            { rect: [24, 356, 312, 96], to: 'SCR-PROVIDER-001' }, // 추천 카드 → 제공자 상세
          ],
          rev: 1, syncedAt: '2026-10-03', note: 'Phase1 데모(실제 Figma 연결 전 플레이스홀더)',
        },
        reqIds: ['REQ-001'],
        context: '앱 진입 첫 화면. 검색바 + 서비스 카테고리 + 검증된 추천 제공자. 여기서 탐색을 시작한다.',
        components: [
          { role: '.pd-search', kind: 'button', label: '검색바(지역·서비스)', action: { on: 'click', do: 'go:SCR-SEARCH-001' } },
          { role: '.pd-cat', kind: 'list', label: '서비스 카테고리(언어/놀이/감각…)', action: { on: 'click', do: 'go:SCR-SEARCH-001' } },
          { role: '.pd-reco', kind: 'list', label: '추천 제공자 카드', action: { on: 'click', do: 'go:SCR-PROVIDER-001' } },
        ],
        description: [
          { text: '검색바 — 탭하면 검색결과(SCR-SEARCH-001)로 이동', target: '.pd-search' },
          { text: '서비스 카테고리 — 선택 시 해당 조건으로 검색', target: '.pd-cat' },
          { text: '검증된 추천 제공자 — 선택 시 상세(SCR-PROVIDER-001)', target: '.pd-reco' },
        ],
        cases: [
          { state: '초기', trigger: '진입', guard: '', result: '홈 로딩 시작', message: '', placement: '', target: '.pd-reco' },
          { state: '로딩', trigger: '추천 요청', guard: '', result: '스켈레톤 카드', message: '', placement: '', api: { endpoint: 'GET /home/recommendations', status: 200 } },
          { state: '정상', trigger: '응답', guard: '추천 1건 이상', result: '카테고리+추천 표시', message: '', placement: '', target: '.pd-reco' },
          { state: '빈데이터', trigger: '응답', guard: '추천 0건', result: '검색 유도 안내', message: '아직 추천이 없어요. 검색으로 찾아보세요', placement: 'inline', target: '.pd-reco' },
          { state: '에러', trigger: '응답', guard: '서버 오류', result: '재시도', message: '정보를 불러오지 못했어요. 다시 시도해 주세요', placement: 'inline', api: { endpoint: 'GET /home/recommendations', status: 500 } },
          { state: '권한없음', trigger: '진입', guard: '로그인 만료', result: '로그인으로', message: '다시 로그인해 주세요', placement: 'full-page', api: { endpoint: 'GET /home/recommendations', status: 401 } },
          { state: 'N/A', trigger: '', guard: '엣지: 홈은 단순 조회라 해당 없음', result: '', message: '', placement: '' },
        ],
        interface: {
          reads: [
            {
              id: 'getRecommendations', intent: '홈 추천 제공자 조회', method: 'GET', path: '/home/recommendations',
              params: [{ in: 'query', name: 'region', type: 'string', required: false, note: '보호자 기본 지역' }],
              response: '{entities.Provider}[]',
              errors: [{ status: 401, when: '로그인 만료' }, { status: 500, when: '서버 오류', message: '정보를 불러오지 못했어요' }],
              auth: 'Bearer', target: '.pd-reco',
            },
          ],
          writes: [], events: [],
        },
        flow: { to: [{ screen: 'SCR-SEARCH-001', via: '검색/카테고리', trigger: '.pd-search' }, { screen: 'SCR-PROVIDER-001', via: '추천 선택', trigger: '.pd-reco' }] },
      },
      // ── 2. 검색결과 (확정) ──
      {
        id: 'SCR-SEARCH-001', label: '검색결과', href: 'm-search.html',
        surface: 'mobile', entry: false, status: 'confirmed', designed: false, figmaLink: '',
        reqIds: ['REQ-002'],
        context: '지역·장애유형·서비스종류 필터로 검증된 제공자를 찾는 목록 화면.',
        components: [
          { role: '.pd-back', kind: 'button', label: '뒤로', action: { on: 'click', do: 'go:SCR-HOME-001' } },
          { role: '.pd-filter', kind: 'button', label: '필터(지역/장애유형/서비스)' },
          { role: '.pd-list', kind: 'list', label: '제공자 카드 목록', action: { on: 'click', do: 'go:SCR-PROVIDER-001' } },
        ],
        description: [
          { text: '필터 — 지역·장애유형·서비스종류로 좁히기', target: '.pd-filter' },
          { text: '제공자 카드(검증배지·평점) — 선택 시 상세(SCR-PROVIDER-001)', target: '.pd-list' },
          { text: '뒤로 — 홈(SCR-HOME-001)', target: '.pd-back' },
        ],
        cases: [
          { state: '초기', trigger: '진입', guard: '', result: '필터 기본값으로 조회', message: '', placement: '' },
          { state: '로딩', trigger: '검색', guard: '', result: '스켈레톤 목록', message: '', placement: '', api: { endpoint: 'GET /providers', status: 200 } },
          { state: '정상', trigger: '응답', guard: '결과 1건 이상', result: '카드 목록', message: '', placement: '', target: '.pd-list' },
          { state: '빈데이터', trigger: '응답', guard: '조건 결과 0건', result: '빈 상태 + 필터 완화 제안', message: '조건에 맞는 제공자가 없어요. 필터를 넓혀보세요', placement: 'full-page', target: '.pd-list' },
          { state: '에러', trigger: '응답', guard: '서버 오류', result: '재시도', message: '검색에 실패했어요. 다시 시도해 주세요', placement: 'inline', api: { endpoint: 'GET /providers', status: 500 } },
          { state: '권한없음', trigger: '진입', guard: '로그인 만료', result: '로그인으로', message: '다시 로그인해 주세요', placement: 'full-page', api: { endpoint: 'GET /providers', status: 401 } },
          { state: '엣지', trigger: '스크롤', guard: '다음 페이지', result: '무한스크롤 추가 로드', message: '', placement: '', target: '.pd-list' },
        ],
        interface: {
          reads: [
            {
              id: 'searchProviders', intent: '제공자 검색', method: 'GET', path: '/providers',
              params: [
                { in: 'query', name: 'region', type: 'string', required: false },
                { in: 'query', name: 'needsTag', type: 'string', required: false, note: '장애유형 태그' },
                { in: 'query', name: 'serviceType', type: 'string', required: false },
                { in: 'query', name: 'cursor', type: 'string', required: false },
              ],
              response: '{entities.Provider}[]',
              errors: [{ status: 401, when: '로그인 만료' }, { status: 500, when: '서버 오류', message: '검색에 실패했어요' }],
              auth: 'Bearer', target: '.pd-list',
            },
          ],
          writes: [], events: [],
        },
        flow: { to: [{ screen: 'SCR-PROVIDER-001', via: '제공자 선택', trigger: '.pd-list' }] },
      },
      // ── 3. 제공자 상세 (확정) ──
      {
        id: 'SCR-PROVIDER-001', label: '제공자 상세', href: 'm-provider.html',
        surface: 'mobile', entry: false, status: 'confirmed', designed: false, figmaLink: '',
        reqIds: ['REQ-003'],
        context: '제공자 프로필·검증배지·제공 서비스·후기. 하단 CTA로 예약 신청 진입.',
        components: [
          { role: '.pd-back', kind: 'button', label: '뒤로', action: { on: 'click', do: 'go:SCR-SEARCH-001' } },
          { role: '.pd-hero', kind: 'hero', label: '제공자 프로필(사진·이름)' },
          { role: '.pd-verify', kind: 'card', label: '검증 배지' },
          { role: '.pd-reviews', kind: 'list', label: '후기 목록' },
          { role: '.pd-btn-book', kind: 'button', label: '예약하기', action: { on: 'click', do: 'go:SCR-BOOK-001' } },
        ],
        description: [
          { text: '제공자 프로필(이름·지역·서비스)', target: '.pd-hero' },
          { text: '검증 배지 — 심사 통과 제공자', target: '.pd-verify' },
          { text: '후기 — 평점·보호자 후기', target: '.pd-reviews' },
          { text: '예약하기 → 예약 신청(SCR-BOOK-001)', target: '.pd-btn-book' },
        ],
        cases: [
          { state: '초기', trigger: '진입', guard: '', result: '상세 로딩', message: '', placement: '' },
          { state: '로딩', trigger: '진입', guard: '', result: '스켈레톤', message: '', placement: '' },
          { state: '정상', trigger: '응답', guard: '검증 제공자', result: '상세 표시, 예약 활성', message: '', placement: '', target: '.pd-btn-book', api: { endpoint: 'GET /providers/{id}', status: 200 } },
          { state: '빈데이터', trigger: '응답', guard: '후기 0건', result: '후기 빈 상태', message: '아직 후기가 없어요', placement: 'inline', target: '.pd-reviews' },
          { state: '에러', trigger: '응답', guard: '제공자 없음', result: '목록으로', message: '제공자를 찾을 수 없어요', placement: 'full-page', api: { endpoint: 'GET /providers/{id}', status: 404 } },
          { state: '권한없음', trigger: '진입', guard: '로그인 만료', result: '로그인으로', message: '다시 로그인해 주세요', placement: 'full-page', api: { endpoint: 'GET /providers/{id}', status: 401 } },
          { state: '엣지', trigger: '진입', guard: '제공자 검증 해지/휴업', result: '예약 비활성 + 안내', message: '현재 예약을 받지 않는 제공자예요', placement: 'inline', target: '.pd-btn-book' },
        ],
        interface: {
          reads: [
            {
              id: 'getProvider', intent: '제공자 상세 조회', method: 'GET', path: '/providers/{id}', response: '{entities.Provider}',
              errors: [{ status: 404, when: '제공자 없음', message: '제공자를 찾을 수 없어요' }, { status: 401, when: '로그인 만료' }],
              auth: 'Bearer', target: '.pd-hero',
            },
          ],
          writes: [], events: [],
        },
        flow: { to: [{ screen: 'SCR-BOOK-001', via: '예약하기', trigger: '.pd-btn-book' }] },
      },
      // ── 4. 예약 신청 (입력 폼 → 입력검증 게이트 시연, 와이어프레임) ──
      {
        id: 'SCR-BOOK-001', label: '예약 신청', href: 'm-book.html',
        surface: 'mobile', entry: false, status: 'confirmed', designed: false, figmaLink: '',
        reqIds: ['REQ-004'],
        context: '아동 선택·서비스·희망 일정·요청사항·동의를 입력하는 예약 신청 폼.',
        components: [
          { role: '.pd-back', kind: 'button', label: '뒤로', action: { on: 'click', do: 'go:SCR-PROVIDER-001' } },
          { role: '.pd-child', kind: 'input', label: '아동 선택(프로필)' },
          { role: '.pd-service', kind: 'input', label: '서비스 선택' },
          { role: '.pd-slots', kind: 'input', label: '희망 일정(1~3개)' },
          { role: '.pd-note', kind: 'input', label: '요청사항(선택)' },
          { role: '.pd-consent', kind: 'input', label: '민감정보 제공 동의' },
          { role: '.pd-btn-next', kind: 'button', label: '다음', action: { on: 'click', do: 'go:SCR-CONFIRM-001' } },
        ],
        description: [
          { text: '아동 선택 — 등록된 아동 프로필', target: '.pd-child' },
          { text: '희망 일정 — 1~3개 선택', target: '.pd-slots' },
          { text: '민감정보 제공 동의(필수)', target: '.pd-consent' },
          { text: '다음 → 예약 확인(SCR-CONFIRM-001)', target: '.pd-btn-next' },
        ],
        cases: [
          { state: '초기', trigger: '진입', guard: '', result: '폼 표시(아동 1개면 자동 선택)', message: '', placement: '', target: '.pd-child' },
          { state: '로딩', trigger: '아동 목록 조회', guard: '', result: '스켈레톤', message: '', placement: '' },
          { state: '정상', trigger: '입력 완료', guard: '모든 필수 + 동의', result: '다음 활성→확인 화면', message: '', placement: '', target: '.pd-btn-next' },
          { state: '빈데이터', trigger: '진입', guard: '등록 아동 0명', result: '아동 등록 유도', message: '먼저 아동 프로필을 등록해 주세요', placement: 'full-page', target: '.pd-child' },
          { state: '에러', trigger: '아동 조회', guard: '서버 오류', result: '재시도', message: '정보를 불러오지 못했어요', placement: 'inline' },
          { state: '권한없음', trigger: '진입', guard: '로그인 만료', result: '로그인으로', message: '다시 로그인해 주세요', placement: 'full-page' },
          { state: '엣지', trigger: '일정 선택', guard: '4개 이상 선택', result: '최대 3개 제한', message: '희망 일정은 최대 3개까지예요', placement: 'toast', target: '.pd-slots' },
          // 입력검증 5종 (폼이라 커버리지 요구)
          { state: '필수누락', trigger: '다음', guard: '아동/서비스/일정 미입력', result: '제출 막음', message: '필수 항목을 모두 입력해 주세요', placement: 'inline', target: '.pd-btn-next', priority: 'P1', testId: 'TC-BOOK-001' },
          { state: '형식오류', trigger: '다음', guard: '일정이 과거 시각', result: '제출 막음', message: '지난 시간은 선택할 수 없어요', placement: 'inline', target: '.pd-slots', priority: 'P1', testId: 'TC-BOOK-002' },
          { state: '범위경계', trigger: '일정 선택', guard: '운영시간 밖(예: 22:00)', result: '선택 차단', message: '예약 가능 시간(09~18시)만 선택돼요', placement: 'inline', target: '.pd-slots', priority: 'P2', testId: 'TC-BOOK-003' },
          { state: '중복충돌', trigger: '다음', guard: '같은 제공자 동일 시간 기예약', result: '제출 막음', message: '이미 같은 시간에 신청한 예약이 있어요', placement: 'inline', target: '.pd-slots', priority: 'P2', testId: 'TC-BOOK-004' },
          { state: '유효', trigger: '다음', guard: '동의 체크 + 필수 충족', result: '확인 화면으로', message: '', placement: '', target: '.pd-btn-next', priority: 'P0', testId: 'TC-BOOK-005' },
        ],
        interface: {
          reads: [
            { id: 'listChildren', intent: '등록 아동 조회', method: 'GET', path: '/me/children', response: '{entities.Child}[]', errors: [{ status: 401, when: '로그인 만료' }], auth: 'Bearer', target: '.pd-child' },
          ],
          writes: [], events: [],
        },
        flow: { to: [{ screen: 'SCR-CONFIRM-001', via: '다음', trigger: '.pd-btn-next' }] },
      },
      // ── 5. 예약 확인 (분기, 확정) ──
      {
        id: 'SCR-CONFIRM-001', label: '예약 확인', href: 'm-confirm.html',
        surface: 'mobile', entry: false, status: 'confirmed', designed: false, figmaLink: '',
        reqIds: ['REQ-004'],
        context: '입력 요약을 확인하고 최종 동의 후 신청. 성공 시 완료, 실패 시 사유 안내.',
        components: [
          { role: '.pd-back', kind: 'button', label: '뒤로', action: { on: 'click', do: 'go:SCR-BOOK-001' } },
          { role: '.pd-summary', kind: 'card', label: '예약 요약(제공자·아동·일정)' },
          { role: '.pd-consent-final', kind: 'checkbox', label: '최종 동의' },
          { role: '.pd-btn-submit', kind: 'button', label: '신청하기', action: { on: 'click', do: 'write:createBooking' } },
        ],
        description: [
          { text: '예약 요약 — 제공자·아동·희망 일정 확인', target: '.pd-summary' },
          { text: '신청하기 → createBooking → 성공 시 완료(SCR-DONE-001)', target: '.pd-btn-submit' },
        ],
        cases: [
          { state: '초기', trigger: '진입', guard: '', result: '요약 표시', message: '', placement: '', target: '.pd-summary' },
          { state: '로딩', trigger: '신청하기', guard: '전송 중', result: '버튼 로딩·중복제출 방지', message: '', placement: '', target: '.pd-btn-submit' },
          { state: '정상', trigger: '신청하기', guard: '신청 성공', result: '완료 화면(SCR-DONE-001)', message: '', placement: '', target: '.pd-btn-submit', api: { endpoint: 'POST /bookings', status: 201 }, priority: 'P0', testId: 'TC-CONF-001' },
          { state: '에러', trigger: '신청하기', guard: '제공자 일정 마감', result: '같은 화면 유지 + 일정 재선택 유도', message: '선택한 시간이 마감됐어요. 다른 시간을 골라주세요', placement: 'toast', target: '.pd-btn-submit', api: { endpoint: 'POST /bookings', status: 409 }, priority: 'P0', testId: 'TC-CONF-002' },
          { state: '권한없음', trigger: '신청하기', guard: '로그인 만료', result: '로그인 후 재시도', message: '다시 로그인해 주세요', placement: 'full-page', api: { endpoint: 'POST /bookings', status: 401 } },
          { state: '빈데이터', trigger: '', guard: 'N/A: 요약 화면이라 빈데이터 없음', result: '', message: '', placement: '' },
          { state: '엣지', trigger: '신청하기', guard: '네트워크 끊김', result: '재시도 안내(멱등키로 중복 방지)', message: '연결이 불안정해요. 다시 시도해 주세요', placement: 'toast', target: '.pd-btn-submit' },
        ],
        interface: {
          reads: [],
          writes: [
            {
              id: 'createBooking', intent: '예약 신청(승인 대기 생성)', method: 'POST', path: '/bookings', successStatus: 201,
              request: '{entities.BookingDraft}', response: '{entities.Booking}',
              errors: [
                { status: 409, when: '제공자 일정 마감', message: '선택한 시간이 마감됐어요' },
                { status: 422, when: '동의 누락/유효성 실패', message: '필수 동의가 필요해요' },
                { status: 401, when: '로그인 만료' },
              ],
              auth: 'Bearer', idempotency: 'Idempotency-Key 헤더(중복신청 방지)', target: '.pd-btn-submit',
            },
          ],
          events: [{ name: 'booking.requested', when: '예약 신청 생성 시(제공자 알림)', payload: '{entities.Booking}' }],
        },
        flow: {
          to: [
            { screen: 'SCR-DONE-001', via: '신청 성공', branch: '신청 성공 여부', onCall: 'createBooking' },
            { screen: 'SCR-CONFIRM-001', via: '마감/실패(같은 화면)', branch: '신청 성공 여부', kind: 'auto' },
          ],
        },
      },
      // ── 6. 신청 완료 (와이어프레임, 자동/수동 복귀) ──
      {
        id: 'SCR-DONE-001', label: '신청 완료', href: 'm-done.html',
        surface: 'mobile', entry: false, status: 'confirmed', designed: false, figmaLink: '',
        reqIds: ['REQ-004'],
        context: '예약 신청 완료 + 제공자 승인 대기 안내. 내 예약/홈으로 이동.',
        components: [
          { role: '.pd-title', kind: 'title', label: '신청 완료 안내' },
          { role: '.pd-btn-mybooking', kind: 'button', label: '내 예약 보기', action: { on: 'click', do: 'go:SCR-HOME-001' } },
          { role: '.pd-btn-home', kind: 'button', label: '홈으로', action: { on: 'click', do: 'go:SCR-HOME-001' } },
        ],
        description: [
          { text: '신청 완료 + 승인 대기 안내(제공자 확인 후 알림)', target: '.pd-title' },
          { text: '내 예약 보기 — 예약 현황(파일럿: 홈으로 연결)', target: '.pd-btn-mybooking' },
          { text: '홈으로 — 홈(SCR-HOME-001)', target: '.pd-btn-home' },
        ],
        cases: [
          { state: '정상', trigger: '진입', guard: '신청 성공으로 진입', result: '완료 안내 + 승인 대기', message: '예약을 신청했어요. 제공자 승인 후 알려드릴게요', placement: 'full-page', target: '.pd-title' },
          { state: '에러', trigger: '진입', guard: '신청 없이 직접 진입', result: '홈으로 리다이렉트', message: '', placement: 'full-page', target: '.pd-title' },
        ],
        interface: { reads: [], writes: [], events: [] },
        flow: { to: [{ screen: 'SCR-HOME-001', via: '홈으로', trigger: '.pd-btn-home' }, { screen: 'SCR-BOOKINGS-001', via: '내 예약', trigger: '.pd-btn-mybooking' }] },
      },
      // ── 7. 로그인 (REQ-005) ──
      {
        id: 'SCR-LOGIN-001', label: '로그인', href: 'm-login.html',
        surface: 'mobile', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-005'],
        context: '보호자 로그인/소셜·회원가입 진입. 미로그인·세션 만료 시 진입점.',
        components: [{ role: '.pd-login', kind: 'form', label: '로그인 폼', action: { on: 'click', do: 'go:SCR-HOME-001' } }],
        description: [{ text: '이메일·소셜 로그인·회원가입(아동 프로필 등록)', target: '.pd-login' }],
        cases: [
          { state: '초기', trigger: '진입', guard: '비로그인', result: '로그인 폼', message: '', target: '.pd-login' },
          { state: '정상', trigger: '로그인', guard: '자격 일치', result: '홈 진입', message: '', target: '.pd-login', api: { endpoint: 'POST /auth/login', status: 200 } },
          { state: '필수누락', trigger: '로그인', guard: '미입력', result: '막음', message: '이메일과 비밀번호를 입력해 주세요', placement: 'inline', target: '.pd-login', priority: 'P1' },
          { state: '권한없음', trigger: '로그인', guard: '자격 불일치', result: '막음', message: '이메일 또는 비밀번호를 확인해 주세요', placement: 'inline', target: '.pd-login' },
        ],
        interface: { reads: [], writes: [{ id: 'login', intent: '로그인', method: 'POST', path: '/auth/login', request: '{email,password}', errors: [{ status: 401, when: '자격 불일치', message: '이메일 또는 비밀번호를 확인해 주세요' }], auth: 'None', target: '.pd-login' }], events: [] },
        flow: { to: [{ screen: 'SCR-HOME-001', via: '로그인', trigger: '.pd-login' }, { screen: 'SCR-CHILD-001', via: '회원가입' }] },
      },
      // ── 8. 아동 프로필 (REQ-005 · 미결① 해소) ──
      {
        id: 'SCR-CHILD-001', label: '아동 프로필', href: 'm-child-profile.html',
        surface: 'mobile', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-005'],
        context: '아동 프로필 등록·관리(이름·생년·발달/장애유형·동의). 예약 전제. PRD 미결① "아동 미등록 보호자 진입 경로" 해소.',
        components: [{ role: '.pd-child-form', kind: 'form', label: '아동 등록 폼', action: { on: 'click', do: 'go:SCR-MYPAGE-001' } }],
        description: [{ text: '등록 아동 목록·추가(이름·생년·유형·민감정보 동의)', target: '.pd-child-form' }],
        cases: [
          { state: '정상', trigger: '등록', guard: '필수+동의', result: '아동 추가', message: '아동이 등록됐어요', placement: 'toast', target: '.pd-child-form' },
          { state: '빈데이터', trigger: '진입', guard: '등록 아동 0명', result: '첫 등록 유도', message: '아동을 등록하면 예약할 수 있어요', placement: 'inline' },
          { state: '필수누락', trigger: '등록', guard: '이름/생년 누락', result: '막음', message: '이름과 생년월일을 입력해 주세요', placement: 'inline', priority: 'P1' },
          { state: '필수누락', trigger: '등록', guard: '동의 미체크', result: '막음', message: '민감정보 수집 동의가 필요해요', placement: 'inline', priority: 'P1' },
        ],
        interface: { reads: [{ id: 'listChildren', intent: '아동 목록', method: 'GET', path: '/me/children', response: '{entities.Child}[]', auth: 'Bearer', target: '.pd-child-list' }], writes: [{ id: 'createChild', intent: '아동 등록', method: 'POST', path: '/me/children', successStatus: 201, request: '{entities.Child}', auth: 'Bearer', target: '.pd-child-form' }], events: [] },
        flow: { to: [{ screen: 'SCR-MYPAGE-001', via: '등록 완료', kind: 'auto' }] },
      },
      // ── 9. 예약 내역 (REQ-006 · 미결② 승인 대기형) ──
      {
        id: 'SCR-BOOKINGS-001', label: '예약 내역', href: 'm-bookings.html',
        surface: 'mobile', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-006'],
        context: '내 예약 목록·상태(승인대기/확정/완료/취소) 추적. PRD 미결② "승인 대기형" 모델 반영.',
        components: [{ role: '.pd-booking-list', kind: 'list', label: '예약 목록', action: { on: 'click', do: 'go:SCR-BOOKING-DET-001' } }],
        description: [{ text: '상태별 탭·예약 카드(완료 건은 후기 작성)', target: '.pd-booking-list' }],
        cases: [
          { state: '정상', trigger: '진입', guard: '예약 1건+', result: '목록', message: '', target: '.pd-booking-list', api: { endpoint: 'GET /me/bookings', status: 200 } },
          { state: '빈데이터', trigger: '진입', guard: '예약 0건', result: '탐색 유도', message: '아직 예약이 없어요. 제공자를 찾아보세요', placement: 'full-page', target: '.pd-booking-list' },
          { state: '권한없음', trigger: '진입', guard: '로그인 만료', result: '로그인으로', message: '다시 로그인해 주세요', placement: 'full-page' },
        ],
        interface: { reads: [{ id: 'listBookings', intent: '내 예약 목록', method: 'GET', path: '/me/bookings', params: [{ in: 'query', name: 'status', type: 'string', required: false }], response: '{entities.Booking}[]', auth: 'Bearer', target: '.pd-booking-list' }], writes: [], events: [] },
        flow: { to: [{ screen: 'SCR-BOOKING-DET-001', via: '예약 선택', trigger: '.pd-booking-list' }, { screen: 'SCR-REVIEW-001', via: '후기 작성' }] },
      },
      // ── 10. 예약 상세 (REQ-006) ──
      {
        id: 'SCR-BOOKING-DET-001', label: '예약 상세', href: 'm-booking-detail.html',
        surface: 'mobile', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-006'],
        context: '예약 상세·상태 추적·문의·취소. 승인대기/확정/완료별 액션.',
        components: [{ role: '.pd-back', kind: 'button', label: '뒤로', action: { on: 'click', do: 'go:SCR-BOOKINGS-001' } }],
        description: [{ text: '상태 배너·예약 정보·문의/취소' }],
        cases: [
          { state: '정상', trigger: '진입', guard: '', result: '예약 상세', message: '' },
          { state: '정상', trigger: '취소', guard: '취소 가능 기한', result: '예약 취소', message: '예약을 취소했어요', placement: 'toast' },
          { state: '범위초과', trigger: '취소', guard: '취소 기한 경과', result: '막음', message: '예약 시간이 임박해 취소할 수 없어요. 제공자에게 문의하세요', placement: 'inline', priority: 'P2' },
        ],
        interface: { reads: [{ id: 'getBooking', intent: '예약 상세', method: 'GET', path: '/me/bookings/{id}', response: '{entities.Booking}', auth: 'Bearer' }], writes: [{ id: 'cancelBooking', intent: '예약 취소', method: 'POST', path: '/me/bookings/{id}/cancel', errors: [{ status: 409, when: '취소 기한 경과', message: '취소할 수 없는 예약이에요' }], auth: 'Bearer' }], events: [{ name: 'booking.cancelled', when: '취소 시', payload: '{entities.Booking}' }] },
        flow: { to: [] },
      },
      // ── 11. 마이 (REQ-005) ──
      {
        id: 'SCR-MYPAGE-001', label: '마이', href: 'm-mypage.html',
        surface: 'mobile', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-005'],
        context: '보호자 마이 — 프로필·내예약·아동관리·찜·알림·개인정보·로그아웃 허브.',
        components: [{ role: '.pd-menu', kind: 'list', label: '마이 메뉴', action: { on: 'click', do: 'go:SCR-BOOKINGS-001' } }],
        description: [{ text: '프로필·내예약·아동관리·찜·알림·개인정보·로그아웃', target: '.pd-menu' }],
        cases: [
          { state: '정상', trigger: '진입', guard: '로그인', result: '마이 허브', message: '', target: '.pd-menu' },
          { state: '권한없음', trigger: '진입', guard: '비로그인', result: '로그인 유도', message: '로그인하면 내 정보를 볼 수 있어요', placement: 'inline' },
        ],
        interface: { reads: [{ id: 'getMe', intent: '내 정보', method: 'GET', path: '/me', response: '{entities.Member}', auth: 'Bearer', target: '.pd-profile' }], writes: [], events: [] },
        flow: { to: [{ screen: 'SCR-BOOKINGS-001', via: '내 예약', trigger: '.pd-menu' }, { screen: 'SCR-CHILD-001', via: '아동 관리' }, { screen: 'SCR-LOGIN-001', via: '로그아웃' }] },
      },
      // ── 12. 후기 작성 (REQ-007) ──
      {
        id: 'SCR-REVIEW-001', label: '후기 작성', href: 'm-review.html',
        surface: 'mobile', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-007'],
        context: '완료 예약에 대한 제공자 후기 작성(평점·내용·사진·실명 동의).',
        components: [{ role: '.pd-review-form', kind: 'form', label: '후기 폼', action: { on: 'click', do: 'go:SCR-BOOKINGS-001' } }],
        description: [{ text: '평점·후기·사진·실명 동의', target: '.pd-review-form' }],
        cases: [
          { state: '정상', trigger: '등록', guard: '평점+내용', result: '후기 게시', message: '후기를 등록했어요', placement: 'toast', target: '.pd-review-form' },
          { state: '필수누락', trigger: '등록', guard: '평점 미선택', result: '막음', message: '평점을 선택해 주세요', placement: 'inline', target: '.pd-review-form', priority: 'P1' },
          { state: '중복충돌', trigger: '등록', guard: '이미 후기 작성', result: '수정 안내', message: '이미 작성한 후기가 있어요', placement: 'inline', priority: 'P2' },
        ],
        interface: { reads: [], writes: [{ id: 'createReview', intent: '후기 작성', method: 'POST', path: '/me/bookings/{id}/review', successStatus: 201, request: '{entities.Review}', auth: 'Bearer', target: '.pd-review-form' }], events: [{ name: 'review.created', when: '후기 작성 시', payload: '{entities.Review}' }] },
        flow: { to: [{ screen: 'SCR-BOOKINGS-001', via: '등록 완료', kind: 'auto' }] },
      },
    ],
  },
  {
    category: '운영자 콘솔 (PC웹·태블릿)',
    pages: [
      // ── 운영자 대시보드 (PC웹) ──
      {
        id: 'SCR-ADMIN-001', label: '운영자 대시보드', href: 'w-dashboard.html',
        surface: 'pc', entry: true, status: 'confirmed', designed: false, figmaLink: '',
        context: '도담 운영자가 전체 현황(신규 신청·심사 대기·예약)을 보는 PC웹 대시보드.',
        components: [
          { role: '.pd-nav-review', kind: 'button', label: '사이드바: 제공자 심사', action: { on: 'click', do: 'go:SCR-ADMIN-002' } },
          { role: '.pd-kpi', kind: 'card', label: 'KPI 카드(신청·심사대기·예약·완료)' },
          { role: '.pd-recent', kind: 'table', label: '최근 신청 테이블' },
        ],
        description: [
          { text: 'KPI 요약 — 신규 신청·심사 대기·오늘 예약', target: '.pd-kpi' },
          { text: '사이드바 "제공자 심사" → 심사 화면(SCR-ADMIN-002)', target: '.pd-nav-review' },
          { text: '최근 신청 목록 — 행 클릭 시 상세', target: '.pd-recent' },
        ],
        cases: [
          { state: '정상', trigger: '진입', guard: '', result: '대시보드 표시', message: '', target: '.pd-kpi', api: { endpoint: 'GET /admin/overview', status: 200 } },
          { state: '로딩', trigger: '진입', guard: '', result: '스켈레톤', message: '' },
          { state: '권한없음', trigger: '진입', guard: '운영자 아님', result: '접근 거부', message: '권한이 없어요', placement: 'full-page', api: { endpoint: 'GET /admin/overview', status: 403 } },
        ],
        interface: { reads: [{ id: 'adminOverview', intent: '운영 현황 조회', method: 'GET', path: '/admin/overview', response: '{entities.Provider}[]', auth: 'Bearer(운영자)', target: '.pd-kpi' }], writes: [], events: [] },
        flow: { to: [{ screen: 'SCR-ADMIN-002', via: '제공자 심사', trigger: '.pd-nav-review' }] },
      },
      // ── 제공자 심사 (PC웹) ──
      {
        id: 'SCR-ADMIN-002', label: '제공자 심사', href: 'w-review.html',
        surface: 'pc', entry: false, status: 'confirmed', designed: false, figmaLink: '',
        context: '심사 대기 제공자 목록을 테이블로 보고 승인/반려하는 PC웹 화면.',
        components: [
          { role: '.pd-table-pending', kind: 'table', label: '심사 대기 제공자 테이블' },
          { role: '.pd-btn-approve', kind: 'button', label: '승인', action: { on: 'click', do: 'write:approveProvider' } },
        ],
        description: [
          { text: '심사 대기 제공자 테이블(이름·지역·서류·신청일)', target: '.pd-table-pending' },
          { text: '승인 → approveProvider 호출', target: '.pd-btn-approve' },
        ],
        cases: [
          { state: '정상', trigger: '진입', guard: '대기 1건 이상', result: '테이블 표시', message: '', target: '.pd-table-pending', api: { endpoint: 'GET /admin/providers?status=pending', status: 200 } },
          { state: '빈데이터', trigger: '진입', guard: '대기 0건', result: '빈 상태', message: '심사 대기 중인 제공자가 없어요', placement: 'inline', target: '.pd-table-pending' },
          { state: '정상', trigger: '승인', guard: '서류 적합', result: '목록에서 제거·검증 배지 부여', message: '승인되었어요', placement: 'toast', target: '.pd-btn-approve', api: { endpoint: 'POST /admin/providers/{id}/approve', status: 200 } },
        ],
        interface: {
          reads: [{ id: 'listPending', intent: '심사 대기 제공자', method: 'GET', path: '/admin/providers', params: [{ in: 'query', name: 'status', type: 'string', required: true, example: 'pending' }], response: '{entities.Provider}[]', auth: 'Bearer(운영자)', target: '.pd-table-pending' }],
          writes: [{ id: 'approveProvider', intent: '제공자 승인', method: 'POST', path: '/admin/providers/{id}/approve', response: '{entities.Provider}', errors: [{ status: 409, when: '이미 처리됨', message: '이미 처리된 신청이에요' }], auth: 'Bearer(운영자)', target: '.pd-btn-approve' }],
          events: [{ name: 'provider.approved', when: '승인 시(제공자 알림)', payload: '{entities.Provider}' }],
        },
        flow: { to: [{ screen: 'SCR-ADMIN-001', via: '대시보드', kind: 'auto' }] },
      },
      // ── 예약 관리 (PC웹 · REQ-008) ──
      {
        id: 'SCR-ADMIN-003', label: '예약 관리', href: 'w-bookings.html',
        surface: 'pc', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-008'],
        context: '운영자가 전체 예약(승인대기/확정/완료/취소)을 모니터링하고 분쟁·취소를 중재.',
        components: [{ role: '.pd-booking-admin', kind: 'table', label: '예약 목록' }],
        description: [{ text: 'KPI·상태 필터·예약 테이블(제공자 승인 기반)', target: '.pd-booking-admin' }],
        cases: [
          { state: '정상', trigger: '진입', guard: '운영자', result: '예약 목록', message: '', target: '.pd-booking-admin', api: { endpoint: 'GET /admin/bookings', status: 200 } },
          { state: '빈데이터', trigger: '진입', guard: '예약 0건', result: '안내', message: '해당 조건의 예약이 없어요', placement: 'inline', target: '.pd-booking-admin' },
          { state: '권한없음', trigger: '진입', guard: '운영자 아님', result: '차단', message: '권한이 없어요', placement: 'full-page', api: { endpoint: 'GET /admin/bookings', status: 403 } },
        ],
        interface: { reads: [{ id: 'adminListBookings', intent: '예약 관리 목록', method: 'GET', path: '/admin/bookings', params: [{ in: 'query', name: 'status', type: 'string', required: false }], response: '{entities.Booking}[]', auth: 'Bearer(운영자)', target: '.pd-booking-admin' }], writes: [], events: [] },
        flow: { to: [] },
      },
      // ── 태블릿 대시보드 (가로/landscape) ──
      {
        id: 'SCR-TAB-001', label: '태블릿 대시보드(가로)', href: 't-dashboard.html',
        surface: 'tablet', entry: false, status: 'confirmed', designed: false, figmaLink: '',
        context: '운영자가 태블릿 가로 모드로 보는 대시보드. 사이드바 유지 + KPI 4열(가로 폭 충분).',
        components: [
          { role: '.pd-nav-review', kind: 'button', label: '사이드바: 제공자 심사', action: { on: 'click', do: 'go:SCR-ADMIN-002' } },
          { role: '.pd-kpi', kind: 'card', label: 'KPI 카드(가로: 4열)' },
          { role: '.pd-recent', kind: 'table', label: '최근 신청 테이블' },
        ],
        description: [
          { text: '가로 모드 — 사이드바 + KPI 4열로 PC에 가깝게', target: '.pd-kpi' },
          { text: '사이드바 "제공자 심사" → 심사 화면(SCR-ADMIN-002)', target: '.pd-nav-review' },
          { text: '최근 신청 테이블', target: '.pd-recent' },
        ],
        cases: [
          { state: '정상', trigger: '진입', guard: '', result: '대시보드 표시', message: '', target: '.pd-kpi' },
          { state: '엣지', trigger: '방향 전환', guard: '세로로 회전', result: '세로 레이아웃(SCR-TAB-002)로', message: '', target: '.pd-kpi' },
        ],
        interface: { reads: [{ id: 'adminOverviewTab', intent: '운영 현황 조회(태블릿)', method: 'GET', path: '/admin/overview', response: '{entities.Provider}[]', auth: 'Bearer(운영자)', target: '.pd-kpi' }], writes: [], events: [] },
        flow: { to: [{ screen: 'SCR-ADMIN-002', via: '제공자 심사', trigger: '.pd-nav-review' }] },
      },
      // ── 태블릿 대시보드 (세로/portrait) — 같은 대시보드의 세로 방향 ──
      {
        id: 'SCR-TAB-002', label: '태블릿 대시보드(세로)', href: 't-portrait.html',
        surface: 'tablet', device: 'tabletPortrait', entry: false, status: 'confirmed', designed: false, figmaLink: '',
        context: '운영자가 태블릿 세로 모드로 보는 대시보드. 사이드바 숨김(GNB 중심) + KPI 2열로 세로에 맞춰 재배치.',
        components: [
          { role: '.pd-kpi', kind: 'card', label: 'KPI 카드(세로: 2열)' },
          { role: '.pd-recent', kind: 'table', label: '최근 신청 테이블' },
        ],
        description: [
          { text: '세로 모드 — 사이드바 숨김, KPI 2열로 폭에 맞춰 적응', target: '.pd-kpi' },
          { text: '최근 신청 테이블(세로 폭 전체 사용)', target: '.pd-recent' },
        ],
        cases: [
          { state: '정상', trigger: '진입', guard: '', result: '세로 대시보드 표시', message: '', target: '.pd-kpi' },
          { state: '엣지', trigger: '방향 전환', guard: '가로로 회전', result: '가로 레이아웃(SCR-TAB-001)으로', message: '', target: '.pd-kpi' },
        ],
        interface: { reads: [{ id: 'adminOverviewTabP', intent: '운영 현황 조회(태블릿 세로)', method: 'GET', path: '/admin/overview', response: '{entities.Provider}[]', auth: 'Bearer(운영자)', target: '.pd-kpi' }], writes: [], events: [] },
        flow: { to: [] },
      },
    ],
  },
];
window.PDK_SCREENS = window.PLANDECK_SCREENS;
