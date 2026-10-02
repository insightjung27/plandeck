/* 훌메이트 — 소규모 교회 화이트라벨 PWA. 교인앱·공개홈·관리자콘솔 핵심 8화면(파일럿 범위).
 * 기본은 흑백 와이어프레임(화면설계서 수준). 디자인은 Figma 연동(옵션)으로 승격. */
window.PLANDECK_SCREENS = [
  {
    category: '교인앱 (모바일 PWA)',
    pages: [
      // ── 1. 교인앱 홈 ──
      {
        id: 'SCR-APP-001', label: '교인앱 홈', href: 'a-home.html',
        surface: 'app', entry: true, status: 'wireframed', designed: false, figmaLink: '', reqIds: ['REQ-001'],
        context: '교인앱 첫 화면. 이번 주 설교·공지·바로가기(헌금안내·예배). 교회별 브랜드(화이트라벨)로 표시.',
        components: [
          { role: '.pd-appbar', kind: 'title', label: '앱바(교회명/로고)' },
          { role: '.pd-live', kind: 'banner', label: '주일 라이브 배너(라이브 시)', action: { on: 'click', do: 'go:SCR-APP-002' } },
          { role: '.pd-sermon-card', kind: 'card', label: '이번 주 설교 카드', action: { on: 'click', do: 'go:SCR-APP-002' } },
          { role: '.pd-notice', kind: 'list', label: '공지 목록' },
          { role: '.pd-quick', kind: 'list', label: '바로가기(헌금안내·예배)', action: { on: 'click', do: 'go:SCR-APP-003' } },
          { role: '.pd-tabbar', kind: 'tabbar', label: '하단 탭(홈·설교·헌금·마이)', action: { on: 'click', do: 'go:SCR-APP-004' } },
        ],
        description: [
          { text: '주일 라이브 배너 — 라이브 중이면 노출, 탭하면 설교(SCR-APP-002)', target: '.pd-live' },
          { text: '이번 주 설교 카드 — 탭하면 설교 재생(SCR-APP-002)', target: '.pd-sermon-card' },
          { text: '바로가기 — 헌금안내(SCR-APP-003)·예배', target: '.pd-quick' },
          { text: '하단 탭 — 홈·설교·헌금·마이(SCR-APP-004)', target: '.pd-tabbar' },
        ],
        cases: [
          { state: '초기', trigger: '진입', guard: '', result: '홈 로딩(테넌트 테마 주입)', message: '', target: '.pd-appbar' },
          { state: '로딩', trigger: '진입', guard: '', result: '스켈레톤', message: '', api: { endpoint: 'GET /app/home', status: 200 } },
          { state: '정상', trigger: '응답', guard: '설교 1건 이상', result: '설교·공지·바로가기 표시', message: '', target: '.pd-sermon-card' },
          { state: '빈데이터', trigger: '응답', guard: '설교 0건', result: '준비중 안내', message: '아직 등록된 설교가 없어요', placement: 'inline', target: '.pd-sermon-card' },
          { state: '권한없음', trigger: '진입', guard: '비로그인', result: '공개 콘텐츠만 + 로그인 유도', message: '로그인하면 더 많은 기능을 쓸 수 있어요', placement: 'inline', target: '.pd-tabbar' },
        ],
        interface: {
          reads: [{ id: 'appHome', intent: '교인앱 홈 집계 조회', method: 'GET', path: '/app/home', response: '{entities.Sermon}[]', auth: 'Bearer(선택)', target: '.pd-sermon-card', errors: [{ status: 500, when: '서버 오류', message: '정보를 불러오지 못했어요' }] }],
          writes: [], events: [],
        },
        flow: { to: [{ screen: 'SCR-APP-002', via: '설교', trigger: '.pd-sermon-card' }, { screen: 'SCR-APP-003', via: '헌금안내', trigger: '.pd-quick' }, { screen: 'SCR-APP-004', via: '마이', trigger: '.pd-tabbar' }] },
      },
      // ── 2. 설교 ──
      {
        id: 'SCR-APP-002', label: '설교', href: 'a-sermon.html',
        surface: 'app', entry: false, status: 'wireframed', designed: false, figmaLink: '', reqIds: ['REQ-002'],
        context: '설교 목록·검색·재생. 유튜브 URL 연동 재생, 주일 라이브 노출.',
        components: [
          { role: '.pd-back', kind: 'button', label: '뒤로', action: { on: 'click', do: 'go:SCR-APP-001' } },
          { role: '.pd-search', kind: 'button', label: '설교 검색' },
          { role: '.pd-player', kind: 'hero', label: '영상 플레이어(유튜브)' },
          { role: '.pd-sermon-list', kind: 'list', label: '설교 목록(시리즈·날짜)' },
        ],
        description: [
          { text: '영상 플레이어 — 유튜브 URL 파싱해 재생', target: '.pd-player' },
          { text: '설교 목록 — 시리즈·날짜 필터, 탭하면 재생', target: '.pd-sermon-list' },
          { text: '뒤로 — 홈(SCR-APP-001)', target: '.pd-back' },
        ],
        cases: [
          { state: '정상', trigger: '선택', guard: 'videoUrl 있음', result: '영상 재생', message: '', target: '.pd-player', api: { endpoint: 'GET /app/sermons', status: 200 } },
          { state: '빈데이터', trigger: '응답', guard: '설교 0건', result: '준비중', message: '설교 영상 준비중이에요', placement: 'full-page', target: '.pd-sermon-list' },
          { state: '에러', trigger: '재생', guard: 'videoUrl 깨짐/비공개', result: '대체 안내', message: '영상을 재생할 수 없어요', placement: 'inline', target: '.pd-player' },
          { state: '엣지', trigger: '스크롤', guard: '다음 페이지', result: '무한스크롤', message: '', target: '.pd-sermon-list' },
        ],
        interface: {
          reads: [{ id: 'listSermons', intent: '설교 목록', method: 'GET', path: '/app/sermons', params: [{ in: 'query', name: 'series', type: 'string', required: false }, { in: 'query', name: 'cursor', type: 'string', required: false }], response: '{entities.Sermon}[]', auth: 'Bearer(선택)', target: '.pd-sermon-list' }],
          writes: [], events: [],
        },
        flow: { to: [] },
      },
      // ── 3. 헌금 안내 ──
      {
        id: 'SCR-APP-003', label: '헌금 안내', href: 'a-giving.html',
        surface: 'app', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-003'],
        context: '헌금 종류·계좌 안내(파일럿=안내전용, 실 결제 없음). 계좌 미제공 시 "교회 확인 후 게재".',
        components: [
          { role: '.pd-back', kind: 'button', label: '뒤로', action: { on: 'click', do: 'go:SCR-APP-001' } },
          { role: '.pd-kinds', kind: 'list', label: '헌금 종류' },
          { role: '.pd-account', kind: 'card', label: '계좌 안내(복사)' },
          { role: '.pd-notice-guide', kind: 'banner', label: '안내전용 고지' },
        ],
        description: [
          { text: '헌금 종류 — 주정/십일조/감사 등', target: '.pd-kinds' },
          { text: '계좌 안내 — 복사 버튼. 미제공 시 "교회 확인 후 게재"', target: '.pd-account' },
          { text: '안내전용 고지 — 앱 내 실 결제 없음', target: '.pd-notice-guide' },
        ],
        cases: [
          { state: '정상', trigger: '진입', guard: '계좌 등록됨', result: '종류·계좌 표시', message: '', target: '.pd-account', api: { endpoint: 'GET /app/offering', status: 200 } },
          { state: '빈데이터', trigger: '진입', guard: '계좌 미등록', result: '준비중 안내', message: '헌금 계좌는 교회 확인 후 게재됩니다', placement: 'inline', target: '.pd-account' },
          { state: '정상', trigger: '계좌 복사', guard: '', result: '클립보드 복사', message: '계좌번호를 복사했어요', placement: 'toast', target: '.pd-account' },
        ],
        interface: {
          reads: [{ id: 'getOffering', intent: '헌금 안내 조회', method: 'GET', path: '/app/offering', response: '{entities.Offering}', auth: 'Bearer(선택)', target: '.pd-account' }],
          writes: [], events: [],
        },
        flow: { to: [] },
      },
      // ── 4. 마이/로그인 ──
      {
        id: 'SCR-APP-004', label: '마이', href: 'a-my.html',
        surface: 'app', entry: false, status: 'wireframed', designed: false, figmaLink: '', reqIds: ['REQ-004'],
        context: '로그인/내 정보. 비로그인=로그인 폼, 로그인=프로필·설정. 가입은 승인대기 흐름.',
        components: [
          { role: '.pd-login', kind: 'form', label: '로그인 폼(아이디·비밀번호)' },
          { role: '.pd-signup', kind: 'button', label: '회원가입(승인대기)' },
          { role: '.pd-profile', kind: 'card', label: '내 프로필(로그인 시)' },
          { role: '.pd-logout', kind: 'button', label: '로그아웃' },
        ],
        description: [
          { text: '로그인 폼 — 교회별 세션(테넌트 격리)', target: '.pd-login' },
          { text: '회원가입 — 가입 시 승인대기 상태', target: '.pd-signup' },
          { text: '내 프로필 — 로그인 시 이름·역할·부서', target: '.pd-profile' },
        ],
        cases: [
          { state: '초기', trigger: '진입', guard: '비로그인', result: '로그인 폼', message: '', target: '.pd-login' },
          { state: '정상', trigger: '로그인', guard: '승인 성도', result: '프로필 표시', message: '', target: '.pd-profile', api: { endpoint: 'POST /auth/login', status: 200 } },
          { state: '권한없음', trigger: '로그인', guard: '승인대기', result: '대기 안내', message: '가입 승인 대기 중이에요. 관리자 승인 후 이용 가능해요', placement: 'inline', target: '.pd-login' },
          { state: '필수누락', trigger: '로그인', guard: '아이디/비번 미입력', result: '제출 막음', message: '아이디와 비밀번호를 입력해 주세요', placement: 'inline', target: '.pd-login', priority: 'P1' },
          { state: '형식오류', trigger: '로그인', guard: '비번 규칙 위반', result: '제출 막음', message: '비밀번호 형식을 확인해 주세요', placement: 'inline', target: '.pd-login', priority: 'P2' },
          { state: '중복충돌', trigger: '회원가입', guard: '이미 가입된 아이디', result: '가입 막음', message: '이미 가입된 아이디예요', placement: 'inline', target: '.pd-signup', priority: 'P2' },
          { state: '유효', trigger: '로그인', guard: '정상 자격', result: '세션 생성', message: '', target: '.pd-profile', priority: 'P0' },
        ],
        interface: {
          reads: [], events: [{ name: 'member.signup.requested', when: '회원가입 시(관리자 승인 큐)', payload: '{entities.Member}' }],
          writes: [{ id: 'login', intent: '교회별 로그인', method: 'POST', path: '/auth/login', request: '{entities.Member}', response: '{entities.Member}', errors: [{ status: 401, when: '자격 불일치', message: '아이디 또는 비밀번호가 올라요' }, { status: 403, when: '승인대기', message: '승인 대기 중' }], auth: 'None', target: '.pd-login' }],
        },
        flow: { to: [] },
      },
    ],
  },
  {
    category: '공개 홈페이지 (모바일)',
    pages: [
      // ── 5. 공개 환영형 홈 ──
      {
        id: 'SCR-SITE-001', label: '공개 환영형 홈', href: 's-home.html',
        surface: 'site', entry: true, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-005'],
        context: '방문자용 공개 홈(환영형 템플릿). 히어로·이번 주 말씀·예배안내·오시는길 진입. 화이트라벨 테넌트별.',
        components: [
          { role: '.pd-hero', kind: 'hero', label: '히어로(교회 이미지·비전 문구)' },
          { role: '.pd-week-word', kind: 'card', label: '이번 주 말씀' },
          { role: '.pd-cta-worship', kind: 'button', label: '예배 안내 보기', action: { on: 'click', do: 'go:SCR-SITE-002' } },
          { role: '.pd-first-visit', kind: 'card', label: '처음 오셨나요(방문 허브)' },
          { role: '.pd-gnb-site', kind: 'list', label: '상단 메뉴(교회소개·예배·소식)' },
        ],
        description: [
          { text: '히어로 — 교회 이미지·비전("온 땅에 천국 복음을 전하는 교회")', target: '.pd-hero' },
          { text: '예배 안내 보기 — 예배안내(SCR-SITE-002)', target: '.pd-cta-worship' },
          { text: '처음 오셨나요 — 방문 허브(오시는길·새가족)', target: '.pd-first-visit' },
        ],
        cases: [
          { state: '정상', trigger: '진입', guard: 'homeConcept=welcome', result: '환영형 홈 렌더(테넌트 콘텐츠)', message: '', target: '.pd-hero', api: { endpoint: 'GET /site/home', status: 200 } },
          { state: '빈데이터', trigger: '진입', guard: '콘텐츠 미제공', result: '"교회 확인 후 게재" placeholder', message: '', placement: 'inline', target: '.pd-week-word' },
          { state: '권한없음', trigger: '진입', guard: 'homeConcept 미설정 테넌트', result: '404', message: '', placement: 'full-page' },
        ],
        interface: {
          reads: [{ id: 'siteHome', intent: '공개 홈 조회', method: 'GET', path: '/site/home', params: [{ in: 'query', name: 'tenant', type: 'string', required: true, example: 'eunsung' }], response: '{entities.Church}', auth: 'None', target: '.pd-hero' }],
          writes: [], events: [],
        },
        flow: { to: [{ screen: 'SCR-SITE-002', via: '예배 안내', trigger: '.pd-cta-worship' }] },
      },
      // ── 6. 예배 안내 ──
      {
        id: 'SCR-SITE-002', label: '예배 안내', href: 's-worship.html',
        surface: 'site', entry: false, status: 'wireframed', designed: false, figmaLink: '', reqIds: ['REQ-006'],
        context: '예배 시간·부서·오시는 길. 방문자가 방문 전 확인.',
        components: [
          { role: '.pd-back', kind: 'button', label: '뒤로', action: { on: 'click', do: 'go:SCR-SITE-001' } },
          { role: '.pd-worship-table', kind: 'table', label: '예배 시간표' },
          { role: '.pd-depts', kind: 'list', label: '부서 안내' },
          { role: '.pd-map', kind: 'hero', label: '오시는 길(지도)' },
        ],
        description: [
          { text: '예배 시간표 — 주일/청년/수요/금요 등', target: '.pd-worship-table' },
          { text: '오시는 길 — 주소·지도(복사)', target: '.pd-map' },
          { text: '뒤로 — 공개 홈(SCR-SITE-001)', target: '.pd-back' },
        ],
        cases: [
          { state: '정상', trigger: '진입', guard: '', result: '시간표·지도 표시', message: '', target: '.pd-worship-table', api: { endpoint: 'GET /site/worship', status: 200 } },
          { state: '정상', trigger: '주소 복사', guard: '', result: '클립보드 복사', message: '주소를 복사했어요', placement: 'toast', target: '.pd-map' },
        ],
        interface: {
          reads: [{ id: 'getWorship', intent: '예배 안내 조회', method: 'GET', path: '/site/worship', params: [{ in: 'query', name: 'tenant', type: 'string', required: true }], response: '{entities.Church}', auth: 'None', target: '.pd-worship-table' }],
          writes: [], events: [],
        },
        flow: { to: [] },
      },
    ],
  },
  {
    category: '관리자 콘솔 (PC웹)',
    pages: [
      // ── 7. 관리자 대시보드 ──
      {
        id: 'SCR-ADM-001', label: '관리자 대시보드', href: 'c-dashboard.html',
        surface: 'admin', entry: true, status: 'wireframed', designed: false, figmaLink: '', reqIds: ['REQ-007'],
        context: '목회자/관리자가 성도·출석·헌금 현황을 한눈에. 좌측 메뉴로 각 관리로 이동.',
        components: [
          { role: '.pd-nav-members', kind: 'button', label: '사이드바: 성도관리', action: { on: 'click', do: 'go:SCR-ADM-002' } },
          { role: '.pd-kpi', kind: 'card', label: 'KPI(성도·이번주 출석·공지)' },
          { role: '.pd-recent', kind: 'table', label: '최근 활동(가입 승인대기·설교 등록)' },
        ],
        description: [
          { text: 'KPI — 전체 성도·이번 주 출석·대기 승인', target: '.pd-kpi' },
          { text: '사이드바 "성도관리" → 교적(SCR-ADM-002)', target: '.pd-nav-members' },
          { text: '최근 활동 — 가입 승인대기·설교 등록 등', target: '.pd-recent' },
        ],
        cases: [
          { state: '정상', trigger: '진입', guard: '관리자', result: '대시보드 표시', message: '', target: '.pd-kpi', api: { endpoint: 'GET /admin/overview', status: 200 } },
          { state: '권한없음', trigger: '진입', guard: '관리자 아님', result: '접근 거부', message: '관리자 권한이 필요해요', placement: 'full-page', api: { endpoint: 'GET /admin/overview', status: 403 } },
          { state: '로딩', trigger: '진입', guard: '', result: '스켈레톤', message: '' },
        ],
        interface: {
          reads: [{ id: 'adminOverview', intent: '운영 현황 조회', method: 'GET', path: '/admin/overview', response: '{entities.Member}[]', auth: 'Bearer(관리자)', target: '.pd-kpi' }],
          writes: [], events: [],
        },
        flow: { to: [{ screen: 'SCR-ADM-002', via: '성도관리', trigger: '.pd-nav-members' }] },
      },
      // ── 8. 성도관리(교적) ──
      {
        id: 'SCR-ADM-002', label: '성도관리(교적)', href: 'c-members.html',
        surface: 'admin', entry: false, status: 'wireframed', designed: false, figmaLink: '', reqIds: ['REQ-008'],
        context: '성도 카드 원장(직분·성례·이력)·가입 승인·검색. 민감정보 마스킹(PIPA).',
        components: [
          { role: '.pd-member-search', kind: 'button', label: '성도 검색/필터' },
          { role: '.pd-member-table', kind: 'table', label: '성도 목록(이름·직분·부서·상태)' },
          { role: '.pd-btn-approve', kind: 'button', label: '가입 승인', action: { on: 'click', do: 'write:approveMember' } },
        ],
        description: [
          { text: '성도 목록 — 이름(마스킹)·직분·부서·가입상태', target: '.pd-member-table' },
          { text: '가입 승인 → approveMember(승인대기 성도)', target: '.pd-btn-approve' },
          { text: '검색/필터 — 이름·부서·직분·상태', target: '.pd-member-search' },
        ],
        cases: [
          { state: '정상', trigger: '진입', guard: '성도 1명 이상', result: '목록 표시', message: '', target: '.pd-member-table', api: { endpoint: 'GET /admin/members', status: 200 } },
          { state: '빈데이터', trigger: '진입', guard: '성도 0명', result: '빈 상태 + 초대 유도', message: '아직 등록된 성도가 없어요', placement: 'inline', target: '.pd-member-table' },
          { state: '정상', trigger: '승인', guard: '승인대기 성도', result: '상태 active로·목록 갱신', message: '승인되었어요', placement: 'toast', target: '.pd-btn-approve', api: { endpoint: 'POST /admin/members/{id}/approve', status: 200 } },
          { state: '권한없음', trigger: '민감정보 열람', guard: '권한 부족', result: '마스킹 유지·차단', message: '권한이 없어요', placement: 'inline', target: '.pd-member-table' },
        ],
        interface: {
          reads: [{ id: 'listMembers', intent: '성도 목록', method: 'GET', path: '/admin/members', params: [{ in: 'query', name: 'status', type: 'string', required: false, example: 'pending' }], response: '{entities.Member}[]', auth: 'Bearer(관리자)', target: '.pd-member-table' }],
          writes: [{ id: 'approveMember', intent: '가입 승인', method: 'POST', path: '/admin/members/{id}/approve', response: '{entities.Member}', errors: [{ status: 409, when: '이미 처리됨', message: '이미 처리된 가입이에요' }], auth: 'Bearer(관리자)', target: '.pd-btn-approve' }],
          events: [{ name: 'member.approved', when: '승인 시(성도 알림)', payload: '{entities.Member}' }],
        },
        flow: { to: [{ screen: 'SCR-ADM-001', via: '대시보드', kind: 'auto' }] },
      },
    ],
  },
];
window.PDK_SCREENS = window.PLANDECK_SCREENS;
