/* 훌메이트 — 소규모 교회 화이트라벨 PWA. 전체 페이지 와이어프레임(4서피스 61화면).
 * 기본은 흑백 와이어프레임(화면설계서 수준). 디자인은 Figma 연동(옵션)으로 승격. */
window.PLANDECK_SCREENS = [
  {
    category: '교인앱 (모바일 PWA)',
    pages: [
      // ── 1. 교인앱 홈 ──
      {
        id: 'SCR-APP-001', label: '교인앱 홈', href: 'a-home.html',
        surface: 'app', entry: true, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-001'],
        context: '교인앱 첫 화면. 이번 주 설교·공지·바로가기. 교회별 브랜드(화이트라벨)로 표시.',
        components: [
          { role: '.pd-live', kind: 'banner', label: '주일 라이브 배너', action: { on: 'click', do: 'go:SCR-APP-011' } },
          { role: '.pd-sermon-card', kind: 'card', label: '이번 주 설교', action: { on: 'click', do: 'go:SCR-APP-011' } },
          { role: '.pd-notice', kind: 'list', label: '공지 목록', action: { on: 'click', do: 'go:SCR-APP-009' } },
          { role: '.pd-quick', kind: 'list', label: '바로가기', action: { on: 'click', do: 'go:SCR-APP-003' } },
          { role: '.pd-tabbar', kind: 'tabbar', label: '하단 탭', action: { on: 'click', do: 'go:SCR-APP-004' } },
        ],
        description: [
          { text: '주일 라이브 배너 — 탭하면 설교 상세·재생(SCR-APP-011)', target: '.pd-live' },
          { text: '이번 주 설교 — 탭하면 설교 상세·재생(SCR-APP-011)', target: '.pd-sermon-card' },
          { text: '바로가기 — 헌금안내(SCR-APP-003)·예배', target: '.pd-quick' },
          { text: '하단 탭 — 홈·설교·헌금·마이(SCR-APP-004)', target: '.pd-tabbar' },
        ],
        cases: [
          { state: '초기', trigger: '진입', guard: '', result: '홈 로딩(테넌트 테마)', message: '' },
          { state: '정상', trigger: '응답', guard: '설교 1건+', result: '설교·공지·바로가기', message: '', target: '.pd-sermon-card', api: { endpoint: 'GET /app/home', status: 200 } },
          { state: '빈데이터', trigger: '응답', guard: '설교 0건', result: '준비중', message: '아직 등록된 설교가 없어요', placement: 'inline', target: '.pd-sermon-card' },
          { state: '권한없음', trigger: '진입', guard: '비로그인', result: '공개 콘텐츠 + 로그인 유도', message: '로그인하면 더 많은 기능을 쓸 수 있어요', placement: 'inline' },
        ],
        interface: { reads: [{ id: 'appHome', intent: '홈 집계', method: 'GET', path: '/app/home', response: '{entities.Sermon}[]', auth: 'Bearer(선택)', target: '.pd-sermon-card', errors: [{ status: 500, when: '서버 오류', message: '정보를 불러오지 못했어요' }] }], writes: [], events: [] },
        flow: { to: [{ screen: 'SCR-APP-011', via: '설교 상세·재생', trigger: '.pd-sermon-card' }, { screen: 'SCR-APP-003', via: '헌금안내', trigger: '.pd-quick' }, { screen: 'SCR-APP-009', via: '공지', trigger: '.pd-notice' }, { screen: 'SCR-APP-004', via: '마이', trigger: '.pd-tabbar' }] },
      },
      // ── 2. 설교 ──
      {
        id: 'SCR-APP-002', label: '설교', href: 'a-sermon.html',
        surface: 'app', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-002'],
        context: '설교 목록·검색·재생. 유튜브 연동, 주일 라이브.',
        components: [
          { role: '.pd-back', kind: 'button', label: '뒤로', action: { on: 'click', do: 'go:SCR-APP-001' } },
          { role: '.pd-player', kind: 'hero', label: '영상 플레이어' },
          { role: '.pd-sermon-list', kind: 'list', label: '설교 목록' },
        ],
        description: [
          { text: '영상 플레이어 — 유튜브 재생', target: '.pd-player' },
          { text: '설교 목록 — 시리즈·날짜', target: '.pd-sermon-list' },
        ],
        cases: [
          { state: '정상', trigger: '선택', guard: 'videoUrl 있음', result: '재생', message: '', target: '.pd-player', api: { endpoint: 'GET /app/sermons', status: 200 } },
          { state: '빈데이터', trigger: '응답', guard: '0건', result: '준비중', message: '설교 영상 준비중이에요', placement: 'full-page' },
          { state: '에러', trigger: '재생', guard: '비공개/깨짐', result: '대체 안내', message: '영상을 재생할 수 없어요', placement: 'inline', target: '.pd-player' },
        ],
        interface: { reads: [{ id: 'listSermons', intent: '설교 목록', method: 'GET', path: '/app/sermons', params: [{ in: 'query', name: 'series', type: 'string', required: false }], response: '{entities.Sermon}[]', auth: 'Bearer(선택)', target: '.pd-sermon-list' }], writes: [], events: [] },
        flow: { to: [] },
      },
      // ── 3. 헌금 안내 ──
      {
        id: 'SCR-APP-003', label: '헌금 안내', href: 'a-giving.html',
        surface: 'app', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-003'],
        context: '헌금 종류·계좌 안내(안내전용). 계좌 미제공 시 "교회 확인 후 게재".',
        components: [
          { role: '.pd-back', kind: 'button', label: '뒤로', action: { on: 'click', do: 'go:SCR-APP-001' } },
          { role: '.pd-kinds', kind: 'list', label: '헌금 종류' },
          { role: '.pd-account', kind: 'card', label: '계좌 안내(복사)' },
        ],
        description: [
          { text: '헌금 종류 — 주정/십일조/감사', target: '.pd-kinds' },
          { text: '계좌 안내 — 복사. 미제공 시 "교회 확인 후 게재"', target: '.pd-account' },
        ],
        cases: [
          { state: '정상', trigger: '진입', guard: '계좌 등록', result: '종류·계좌', message: '', target: '.pd-account', api: { endpoint: 'GET /app/offering', status: 200 } },
          { state: '빈데이터', trigger: '진입', guard: '계좌 미등록', result: '준비중', message: '헌금 계좌는 교회 확인 후 게재됩니다', placement: 'inline', target: '.pd-account' },
          { state: '정상', trigger: '복사', guard: '', result: '클립보드', message: '계좌번호를 복사했어요', placement: 'toast', target: '.pd-account' },
        ],
        interface: { reads: [{ id: 'getOffering', intent: '헌금 안내', method: 'GET', path: '/app/offering', response: '{entities.Offering}', auth: 'Bearer(선택)', target: '.pd-account' }], writes: [], events: [] },
        flow: { to: [] },
      },
      // ── 4. 마이/로그인 ──
      {
        id: 'SCR-APP-004', label: '마이', href: 'a-my.html',
        surface: 'app', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-004'],
        context: '로그인/내 정보. 가입은 승인대기 흐름.',
        components: [
          { role: '.pd-login', kind: 'form', label: '로그인 폼' },
          { role: '.pd-signup', kind: 'button', label: '회원가입(승인대기)' },
          { role: '.pd-profile', kind: 'card', label: '내 프로필' },
        ],
        description: [
          { text: '로그인 폼 — 교회별 세션', target: '.pd-login' },
          { text: '회원가입 — 승인대기', target: '.pd-signup' },
          { text: '프로필 — 이름·역할·부서', target: '.pd-profile' },
        ],
        cases: [
          { state: '초기', trigger: '진입', guard: '비로그인', result: '로그인 폼', message: '', target: '.pd-login' },
          { state: '정상', trigger: '로그인', guard: '승인 성도', result: '프로필', message: '', target: '.pd-profile', api: { endpoint: 'POST /auth/login', status: 200 } },
          { state: '권한없음', trigger: '로그인', guard: '승인대기', result: '대기 안내', message: '승인 대기 중이에요', placement: 'inline', target: '.pd-login' },
          { state: '필수누락', trigger: '로그인', guard: '미입력', result: '막음', message: '아이디와 비밀번호를 입력해 주세요', placement: 'inline', target: '.pd-login', priority: 'P1' },
          { state: '형식오류', trigger: '로그인', guard: '비번 규칙', result: '막음', message: '비밀번호 형식을 확인해 주세요', placement: 'inline', priority: 'P2' },
          { state: '중복충돌', trigger: '회원가입', guard: '중복 아이디', result: '막음', message: '이미 가입된 아이디예요', placement: 'inline', target: '.pd-signup', priority: 'P2' },
          { state: '유효', trigger: '로그인', guard: '정상', result: '세션 생성', message: '', priority: 'P0' },
        ],
        interface: { reads: [], writes: [{ id: 'login', intent: '로그인', method: 'POST', path: '/auth/login', request: '{entities.Member}', response: '{entities.Member}', errors: [{ status: 401, when: '자격 불일치', message: '아이디 또는 비밀번호를 확인해 주세요' }, { status: 403, when: '승인대기' }], auth: 'None', target: '.pd-login' }], events: [{ name: 'member.signup.requested', when: '회원가입 시', payload: '{entities.Member}' }] },
        flow: { to: [] },
      },
      // ── 5. 커뮤니티(나눔터) ──
      {
        id: 'SCR-APP-005', label: '커뮤니티', href: 'a-community.html',
        surface: 'app', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-011'],
        context: '교인 간 나눔터(기도제목·간증·소그룹 게시). 작성·댓글.',
        components: [
          { role: '.pd-feed', kind: 'list', label: '게시 피드' },
          { role: '.pd-write', kind: 'button', label: '글쓰기' },
        ],
        description: [
          { text: '게시 피드 — 기도제목·간증·소그룹', target: '.pd-feed' },
          { text: '글쓰기 — 로그인 성도만', target: '.pd-write' },
        ],
        cases: [
          { state: '정상', trigger: '진입', guard: '', result: '피드 표시', message: '', target: '.pd-feed', api: { endpoint: 'GET /app/community', status: 200 } },
          { state: '빈데이터', trigger: '진입', guard: '0건', result: '첫 글 유도', message: '첫 나눔을 남겨보세요', placement: 'inline', target: '.pd-feed' },
          { state: '권한없음', trigger: '글쓰기', guard: '비로그인', result: '로그인 유도', message: '로그인 후 작성할 수 있어요', placement: 'toast', target: '.pd-write' },
        ],
        interface: { reads: [{ id: 'listPosts', intent: '커뮤니티 피드', method: 'GET', path: '/app/community', params: [{ in: 'query', name: 'cursor', type: 'string', required: false }, { in: 'query', name: 'limit', type: 'number', required: false, example: '20' }], response: '{entities.Post}[]', auth: 'Bearer', target: '.pd-feed' }], writes: [{ id: 'writePost', intent: '글 작성', method: 'POST', path: '/app/community', auth: 'Bearer', target: '.pd-write' }], events: [] },
        flow: { to: [] },
      },
      // ── 6. 아나바다(중고나눔) ──
      {
        id: 'SCR-APP-006', label: '아나바다', href: 'a-market.html',
        surface: 'app', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-012'],
        context: '성도 간 중고 나눔(무료·나눔). 폐쇄몰·성도매장과 구분(성도 간 중고).',
        components: [
          { role: '.pd-item-grid', kind: 'list', label: '나눔 물품 그리드' },
          { role: '.pd-register', kind: 'button', label: '물품 등록' },
        ],
        description: [
          { text: '나눔 물품 — 사진·상태·나눔여부', target: '.pd-item-grid' },
          { text: '물품 등록 — 성도만', target: '.pd-register' },
        ],
        cases: [
          { state: '정상', trigger: '진입', guard: '', result: '물품 그리드', message: '', target: '.pd-item-grid', api: { endpoint: 'GET /app/market', status: 200 } },
          { state: '빈데이터', trigger: '진입', guard: '0건', result: '등록 유도', message: '아직 등록된 나눔이 없어요', placement: 'inline', target: '.pd-item-grid' },
        ],
        interface: { reads: [{ id: 'listItems', intent: '나눔 물품', method: 'GET', path: '/app/market', auth: 'Bearer', target: '.pd-item-grid' }], writes: [], events: [] },
        flow: { to: [] },
      },
      // ── 7. 교회학교/교육 ──
      {
        id: 'SCR-APP-007', label: '교회학교', href: 'a-edu.html',
        surface: 'app', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-013'],
        context: '교회학교(부서별 공지·일정·자료). 유치/아동/중고등/청년.',
        components: [
          { role: '.pd-dept-tabs', kind: 'segment', label: '부서 탭' },
          { role: '.pd-edu-list', kind: 'list', label: '부서 공지·일정' },
        ],
        description: [
          { text: '부서 탭 — 유치/아동/중고등/청년', target: '.pd-dept-tabs' },
          { text: '공지·일정 — 부서별', target: '.pd-edu-list' },
        ],
        cases: [
          { state: '정상', trigger: '진입', guard: '', result: '부서 콘텐츠', message: '', target: '.pd-edu-list', api: { endpoint: 'GET /app/education', status: 200 } },
          { state: '빈데이터', trigger: '부서 전환', guard: '0건', result: '준비중', message: '등록된 내용이 없어요', placement: 'inline', target: '.pd-edu-list' },
        ],
        interface: { reads: [{ id: 'eduDept', intent: '부서 콘텐츠', method: 'GET', path: '/app/education', params: [{ in: 'query', name: 'dept', type: 'string', required: true }], auth: 'Bearer', target: '.pd-edu-list' }], writes: [], events: [] },
        flow: { to: [] },
      },
      // ── 8. 주보 ──
      {
        id: 'SCR-APP-008', label: '주보', href: 'a-bulletin.html',
        surface: 'app', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-014'],
        context: '주간 주보 열람(예배 순서·광고·헌금·일정). 관리자 발행분.',
        components: [
          { role: '.pd-bulletin-view', kind: 'hero', label: '주보 본문' },
          { role: '.pd-week-nav', kind: 'segment', label: '주차 이동' },
        ],
        description: [
          { text: '주보 본문 — 예배 순서·광고', target: '.pd-bulletin-view' },
          { text: '주차 이동 — 지난 주보', target: '.pd-week-nav' },
        ],
        cases: [
          { state: '정상', trigger: '진입', guard: '발행됨', result: '주보 표시', message: '', target: '.pd-bulletin-view', api: { endpoint: 'GET /app/bulletin', status: 200 } },
          { state: '빈데이터', trigger: '진입', guard: '미발행', result: '준비중', message: '이번 주 주보가 아직 발행되지 않았어요', placement: 'full-page', target: '.pd-bulletin-view' },
        ],
        interface: { reads: [{ id: 'getBulletin', intent: '주보 조회', method: 'GET', path: '/app/bulletin', params: [{ in: 'query', name: 'week', type: 'string', required: false }], auth: 'Bearer(선택)', target: '.pd-bulletin-view' }], writes: [], events: [] },
        flow: { to: [] },
      },
      // ── 9. 공지 상세 ──
      {
        id: 'SCR-APP-009', label: '공지 상세', href: 'a-notice.html',
        surface: 'app', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-001'],
        context: '공지 상세 본문. 첨부·이미지·링크.',
        components: [
          { role: '.pd-back', kind: 'button', label: '뒤로', action: { on: 'click', do: 'go:SCR-APP-001' } },
          { role: '.pd-notice-body', kind: 'card', label: '공지 본문' },
        ],
        description: [
          { text: '공지 본문 — 제목·일시·내용', target: '.pd-notice-body' },
        ],
        cases: [
          { state: '정상', trigger: '진입', guard: '', result: '공지 표시', message: '', target: '.pd-notice-body', api: { endpoint: 'GET /app/notices/{id}', status: 200 } },
          { state: '에러', trigger: '진입', guard: '삭제됨', result: '목록으로', message: '삭제된 공지예요', placement: 'full-page' },
        ],
        interface: { reads: [{ id: 'getNotice', intent: '공지 상세', method: 'GET', path: '/app/notices/{id}', auth: 'Bearer(선택)', target: '.pd-notice-body' }], writes: [], events: [] },
        flow: { to: [] },
      },
      // ── 10. 성도 매장 ──
      {
        id: 'SCR-APP-010', label: '성도 매장', href: 'a-stores.html',
        surface: 'app', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-012'],
        context: '성도 생업(가게) 홍보 디렉터리. 등록→관리자 승인→노출.',
        components: [
          { role: '.pd-store-list', kind: 'list', label: '성도 매장 목록' },
        ],
        description: [
          { text: '성도 매장 — 업종·연락처·소개(승인분만)', target: '.pd-store-list' },
        ],
        cases: [
          { state: '정상', trigger: '진입', guard: '승인 1건+', result: '매장 목록', message: '', target: '.pd-store-list', api: { endpoint: 'GET /app/stores', status: 200 } },
          { state: '빈데이터', trigger: '진입', guard: '0건', result: '등록 유도', message: '등록된 성도 매장이 없어요', placement: 'inline', target: '.pd-store-list' },
        ],
        interface: { reads: [{ id: 'listStores', intent: '성도 매장', method: 'GET', path: '/app/stores', auth: 'Bearer', target: '.pd-store-list' }], writes: [], events: [] },
        flow: { to: [{ screen: 'SCR-APP-017', via: '매장 상세', trigger: '.pd-store-list' }] },
      },
      // ── 11. 설교 상세 ──
      {
        id: 'SCR-APP-011', label: '설교 상세', href: 'a-sermon-detail.html',
        surface: 'app', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-002'],
        context: '설교 영상 재생·설교 노트·같은 시리즈. 목록(SCR-APP-002)·홈 설교카드에서 진입.',
        components: [{ role: '.pd-back', kind: 'button', label: '뒤로', action: { on: 'click', do: 'go:SCR-APP-002' } }, { role: '.pd-player', kind: 'hero', label: '영상 플레이어' }],
        description: [{ text: '영상 플레이어 — 유튜브 재생', target: '.pd-player' }, { text: '설교 노트·같은 시리즈 목록' }],
        cases: [{ state: '정상', trigger: '진입', guard: 'videoUrl', result: '재생', message: '', target: '.pd-player' }, { state: '빈데이터', trigger: '진입', guard: '영상 없음', result: '준비중', message: '영상 준비중이에요', placement: 'inline', target: '.pd-player' }],
        interface: { reads: [{ id: 'getSermon', intent: '설교 상세', method: 'GET', path: '/app/sermons/{id}', auth: 'Bearer(선택)', target: '.pd-player' }], writes: [], events: [] },
        flow: { to: [] },
      },
      // ── 12. 나눔 글 상세 ──
      {
        id: 'SCR-APP-012', label: '나눔 글', href: 'a-community-detail.html',
        surface: 'app', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-011'],
        context: '커뮤니티 나눔 글 상세·댓글. 피드(SCR-APP-005)에서 진입.',
        components: [{ role: '.pd-back', kind: 'button', label: '뒤로', action: { on: 'click', do: 'go:SCR-APP-005' } }],
        description: [{ text: '본문·댓글·댓글 입력' }],
        cases: [{ state: '정상', trigger: '진입', guard: '', result: '글·댓글 표시', message: '' }, { state: '권한없음', trigger: '댓글', guard: '비로그인', result: '로그인 유도', message: '로그인 후 댓글을 쓸 수 있어요', placement: 'toast' }],
        interface: { reads: [{ id: 'getPost', intent: '나눔 글', method: 'GET', path: '/app/community/{id}', auth: 'Bearer' }], writes: [{ id: 'addComment', intent: '댓글', method: 'POST', path: '/app/community/{id}/comments', auth: 'Bearer' }], events: [] },
        flow: { to: [] },
      },
      // ── 13. 글쓰기 ──
      {
        id: 'SCR-APP-013', label: '글쓰기', href: 'a-community-write.html',
        surface: 'app', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-011'],
        context: '커뮤니티 나눔 글 작성(분류·제목·내용·익명). 게시 시 피드로.',
        components: [{ role: '.pd-back', kind: 'button', label: '뒤로', action: { on: 'click', do: 'go:SCR-APP-005' } }],
        description: [{ text: '분류·제목·내용·익명 옵션' }],
        cases: [{ state: '정상', trigger: '게시', guard: '제목·내용', result: '피드 반영', message: '나눔을 게시했어요', placement: 'toast' }, { state: '필수누락', trigger: '게시', guard: '내용 없음', result: '막음', message: '내용을 입력해 주세요', placement: 'inline', priority: 'P1' }],
        interface: { reads: [], writes: [{ id: 'createPost', intent: '글 작성', method: 'POST', path: '/app/community', successStatus: 201, auth: 'Bearer' }], events: [] },
        flow: { to: [{ screen: 'SCR-APP-005', via: '게시', kind: 'auto' }] },
      },
      // ── 14. 나눔물품 상세 ──
      {
        id: 'SCR-APP-014', label: '나눔물품 상세', href: 'a-market-detail.html',
        surface: 'app', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-012'],
        context: '아나바다 나눔 물품 상세·나눔자·채팅. 그리드(SCR-APP-006)에서 진입.',
        components: [{ role: '.pd-back', kind: 'button', label: '뒤로', action: { on: 'click', do: 'go:SCR-APP-006' } }],
        description: [{ text: '사진·상태·나눔자·채팅/찜' }],
        cases: [{ state: '정상', trigger: '진입', guard: '', result: '물품 상세', message: '' }, { state: '빈데이터', trigger: '진입', guard: '거래완료', result: '안내', message: '나눔이 완료된 물품이에요', placement: 'inline' }],
        interface: { reads: [{ id: 'getItem', intent: '물품 상세', method: 'GET', path: '/app/market/{id}', auth: 'Bearer' }], writes: [], events: [] },
        flow: { to: [] },
      },
      // ── 15. 물품 등록 ──
      {
        id: 'SCR-APP-015', label: '물품 등록', href: 'a-market-register.html',
        surface: 'app', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-012'],
        context: '아나바다 나눔 물품 등록(사진·물품명·상태·방식·설명).',
        components: [{ role: '.pd-back', kind: 'button', label: '뒤로', action: { on: 'click', do: 'go:SCR-APP-006' } }],
        description: [{ text: '사진·물품명·상태·나눔 방식·설명' }],
        cases: [{ state: '정상', trigger: '등록', guard: '물품명', result: '그리드 반영', message: '등록됐어요', placement: 'toast' }, { state: '필수누락', trigger: '등록', guard: '사진 없음', result: '막음', message: '사진을 1장 이상 올려주세요', placement: 'inline', priority: 'P2' }],
        interface: { reads: [], writes: [{ id: 'createItem', intent: '물품 등록', method: 'POST', path: '/app/market', successStatus: 201, auth: 'Bearer' }], events: [] },
        flow: { to: [{ screen: 'SCR-APP-006', via: '등록', kind: 'auto' }] },
      },
      // ── 16. 교회학교 공지 상세 ──
      {
        id: 'SCR-APP-016', label: '교회학교 공지', href: 'a-edu-detail.html',
        surface: 'app', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-013'],
        context: '교회학교 부서 공지·일정 상세. 부서 목록(SCR-APP-007)에서 진입.',
        components: [{ role: '.pd-back', kind: 'button', label: '뒤로', action: { on: 'click', do: 'go:SCR-APP-007' } }],
        description: [{ text: '공지 본문·참가 신청' }],
        cases: [
          { state: '정상', trigger: '진입', guard: '', result: '공지 표시', message: '' },
          { state: '빈데이터', trigger: '진입', guard: '본문 없음', result: '준비중', message: '등록된 내용이 없어요', placement: 'inline' },
          { state: '에러', trigger: '진입', guard: '삭제됨', result: '목록으로', message: '삭제된 공지예요', placement: 'full-page' },
        ],
        interface: { reads: [{ id: 'getEdu', intent: '부서 공지', method: 'GET', path: '/app/education/{id}', auth: 'Bearer' }], writes: [], events: [] },
        flow: { to: [] },
      },
      // ── 17. 성도 매장 상세 ──
      {
        id: 'SCR-APP-017', label: '성도 매장 상세', href: 'a-store-detail.html',
        surface: 'app', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-012'],
        context: '성도 매장 상세(주소·연락처·전화·길찾기). 목록(SCR-APP-010)에서 진입.',
        components: [{ role: '.pd-back', kind: 'button', label: '뒤로', action: { on: 'click', do: 'go:SCR-APP-010' } }],
        description: [{ text: '매장 소개·주소·연락처·전화/길찾기' }],
        cases: [
          { state: '정상', trigger: '진입', guard: '승인됨', result: '매장 상세', message: '' },
          { state: '빈데이터', trigger: '진입', guard: '승인 전', result: '노출 안 함', message: '승인 대기 중인 매장이에요', placement: 'inline' },
          { state: '에러', trigger: '전화', guard: '번호 없음', result: '대체 안내', message: '연락처가 등록되지 않았어요', placement: 'toast' },
        ],
        interface: { reads: [{ id: 'getStore', intent: '매장 상세', method: 'GET', path: '/app/stores/{id}', auth: 'Bearer' }], writes: [], events: [] },
        flow: { to: [] },
      },
      // ── 18. 회원가입 ──
      {
        id: 'SCR-APP-018', label: '회원가입', href: 'a-signup.html',
        surface: 'app', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-004'],
        context: '교인앱 회원가입(가입 후 관리자 승인). 마이(SCR-APP-004)에서 진입.',
        components: [{ role: '.pd-back', kind: 'button', label: '뒤로', action: { on: 'click', do: 'go:SCR-APP-004' } }],
        description: [{ text: '이름·연락처·아이디·부서·동의' }],
        cases: [{ state: '정상', trigger: '가입', guard: '동의·필수입력', result: '승인대기', message: '가입 신청됐어요. 관리자 승인 후 이용 가능해요', placement: 'toast' }, { state: '필수누락', trigger: '가입', guard: '동의 미체크', result: '막음', message: '개인정보 수집 동의가 필요해요', placement: 'inline', priority: 'P1' }],
        interface: { reads: [], writes: [{ id: 'signup', intent: '회원가입', method: 'POST', path: '/auth/signup', successStatus: 201, request: '{entities.Member}', auth: 'None' }], events: [{ name: 'member.signup.requested', when: '가입 신청', payload: '{entities.Member}' }] },
        flow: { to: [{ screen: 'SCR-APP-004', via: '가입 완료', kind: 'auto' }] },
      },
      // ── 19. 내 정보 수정 ──
      {
        id: 'SCR-APP-019', label: '내 정보 수정', href: 'a-profile-edit.html',
        surface: 'app', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-004'],
        context: '내 프로필 수정(이름·연락처·부서·직분). 마이(SCR-APP-004)에서 진입.',
        components: [{ role: '.pd-back', kind: 'button', label: '뒤로', action: { on: 'click', do: 'go:SCR-APP-004' } }],
        description: [{ text: '프로필 사진·이름·연락처·부서·직분' }],
        cases: [
          { state: '정상', trigger: '저장', guard: '', result: '프로필 갱신', message: '저장됐어요', placement: 'toast' },
          { state: '필수누락', trigger: '저장', guard: '이름 공백', result: '막음', message: '이름을 입력해 주세요', placement: 'inline', priority: 'P1' },
          { state: '형식오류', trigger: '저장', guard: '연락처 형식', result: '막음', message: '연락처 형식을 확인해 주세요', placement: 'inline', priority: 'P2' },
        ],
        interface: { reads: [], writes: [{ id: 'updateProfile', intent: '프로필 수정', method: 'PUT', path: '/app/me', auth: 'Bearer' }], events: [] },
        flow: { to: [{ screen: 'SCR-APP-004', via: '저장', kind: 'auto' }] },
      },
      // ── 20. 알림 ──
      {
        id: 'SCR-APP-020', label: '알림', href: 'a-notifications.html',
        surface: 'app', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-001'],
        context: '알림 목록(설교·공지·댓글). 홈 종 아이콘에서 진입. 항목 탭 시 해당 화면으로.',
        components: [{ role: '.pd-back', kind: 'button', label: '뒤로', action: { on: 'click', do: 'go:SCR-APP-001' } }],
        description: [{ text: '설교·공지·댓글 알림 — 탭하면 해당 화면' }],
        cases: [{ state: '정상', trigger: '진입', guard: '', result: '알림 목록', message: '' }, { state: '빈데이터', trigger: '진입', guard: '0건', result: '안내', message: '새 알림이 없어요', placement: 'inline' }],
        interface: { reads: [{ id: 'listNotifications', intent: '알림 목록', method: 'GET', path: '/app/notifications', auth: 'Bearer' }], writes: [], events: [] },
        flow: { to: [{ screen: 'SCR-APP-011', via: '설교 알림', trigger: '.pd-list' }, { screen: 'SCR-APP-009', via: '공지 알림' }, { screen: 'SCR-APP-012', via: '댓글 알림' }] },
      },
    ],
  },
  {
    category: '공개 홈페이지 (모바일)',
    pages: [
      // ── 공개 환영형 홈 ──
      {
        id: 'SCR-SITE-001', label: '공개 환영형 홈', href: 's-home.html',
        surface: 'site', entry: true, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-005'],
        context: '방문자용 공개 홈(환영형). 히어로·말씀·예배안내·방문 허브.',
        components: [
          { role: '.pd-hero', kind: 'hero', label: '히어로(교회 이미지·비전)' },
          { role: '.pd-cta-worship', kind: 'button', label: '예배 안내 보기', action: { on: 'click', do: 'go:SCR-SITE-002' } },
          { role: '.pd-first-visit', kind: 'card', label: '처음 오셨나요(방문 허브)', action: { on: 'click', do: 'go:SCR-SITE-007' } },
        ],
        description: [
          { text: '히어로 — 교회 이미지·비전', target: '.pd-hero' },
          { text: '예배 안내 보기 — SCR-SITE-002', target: '.pd-cta-worship' },
          { text: '처음 오셨나요 — 새가족(SCR-SITE-007)', target: '.pd-first-visit' },
        ],
        cases: [
          { state: '정상', trigger: '진입', guard: 'homeConcept=welcome', result: '환영형 홈', message: '', target: '.pd-hero', api: { endpoint: 'GET /site/home', status: 200 } },
          { state: '빈데이터', trigger: '진입', guard: '콘텐츠 미제공', result: '교회 확인 후 게재', message: '', placement: 'inline' },
          { state: '권한없음', trigger: '진입', guard: 'homeConcept 미설정', result: '404', message: '', placement: 'full-page' },
        ],
        interface: { reads: [{ id: 'siteHome', intent: '공개 홈', method: 'GET', path: '/site/home', params: [{ in: 'query', name: 'tenant', type: 'string', required: true, example: 'eunsung' }], response: '{entities.Church}', auth: 'None', target: '.pd-hero' }], writes: [], events: [] },
        flow: { to: [{ screen: 'SCR-SITE-002', via: '예배 안내', trigger: '.pd-cta-worship' }, { screen: 'SCR-SITE-007', via: '처음 오셨나요', trigger: '.pd-first-visit' }] },
      },
      // ── 예배 안내 ──
      {
        id: 'SCR-SITE-002', label: '예배 안내', href: 's-worship.html',
        surface: 'site', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-006'],
        context: '예배 시간·부서·오시는 길.',
        components: [
          { role: '.pd-back', kind: 'button', label: '뒤로', action: { on: 'click', do: 'go:SCR-SITE-001' } },
          { role: '.pd-worship-table', kind: 'table', label: '예배 시간표' },
          { role: '.pd-map', kind: 'hero', label: '오시는 길', action: { on: 'click', do: 'go:SCR-SITE-005' } },
        ],
        description: [
          { text: '예배 시간표 — 주일/청년/수요/금요', target: '.pd-worship-table' },
          { text: '오시는 길 — 상세(SCR-SITE-005)', target: '.pd-map' },
        ],
        cases: [
          { state: '정상', trigger: '진입', guard: '', result: '시간표·지도', message: '', target: '.pd-worship-table', api: { endpoint: 'GET /site/worship', status: 200 } },
          { state: '빈데이터', trigger: '진입', guard: '예배시간 미등록', result: '준비중', message: '예배 시간은 교회 확인 후 게재됩니다', placement: 'inline', target: '.pd-worship-table' },
          { state: '정상', trigger: '주소 복사', guard: '', result: '클립보드', message: '주소를 복사했어요', placement: 'toast' },
        ],
        interface: { reads: [{ id: 'getWorship', intent: '예배 안내', method: 'GET', path: '/site/worship', params: [{ in: 'query', name: 'tenant', type: 'string', required: true }], response: '{entities.Church}', auth: 'None', target: '.pd-worship-table' }], writes: [], events: [] },
        flow: { to: [{ screen: 'SCR-SITE-005', via: '오시는 길', trigger: '.pd-map' }] },
      },
      // ── 교회 소개(비전·연혁) ──
      {
        id: 'SCR-SITE-003', label: '교회 소개', href: 's-about.html',
        surface: 'site', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-015'],
        context: '교회 비전·연혁·인사말. 미확보 콘텐츠는 "교회 확인 후 게재".',
        components: [
          { role: '.pd-vision', kind: 'card', label: '비전·인사말' },
          { role: '.pd-history', kind: 'list', label: '연혁' },
        ],
        description: [
          { text: '비전·인사말 — 교회 소개문', target: '.pd-vision' },
          { text: '연혁 — 주요 연대', target: '.pd-history' },
        ],
        cases: [
          { state: '정상', trigger: '진입', guard: '등록됨', result: '소개 표시', message: '', target: '.pd-vision', api: { endpoint: 'GET /site/about', status: 200 } },
          { state: '빈데이터', trigger: '진입', guard: '미제공', result: '준비중', message: '내용은 교회 확인 후 게재됩니다', placement: 'inline', target: '.pd-vision' },
        ],
        interface: { reads: [{ id: 'getAbout', intent: '교회 소개', method: 'GET', path: '/site/about', auth: 'None', target: '.pd-vision' }], writes: [], events: [] },
        flow: { to: [] },
      },
      // ── 섬기는 사람들(교역자) ──
      {
        id: 'SCR-SITE-004', label: '섬기는 사람들', href: 's-staff.html',
        surface: 'site', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-015'],
        context: '교역자·중직자 소개(사진·직분·담당).',
        components: [
          { role: '.pd-staff-list', kind: 'list', label: '교역자 카드 목록' },
        ],
        description: [
          { text: '교역자 — 담임·부교역자·직분(사진 미확보=준비중)', target: '.pd-staff-list' },
        ],
        cases: [
          { state: '정상', trigger: '진입', guard: '', result: '교역자 목록', message: '', target: '.pd-staff-list', api: { endpoint: 'GET /site/staff', status: 200 } },
          { state: '빈데이터', trigger: '진입', guard: '사진 미확보', result: '아이콘 대체', message: '', placement: 'inline', target: '.pd-staff-list' },
        ],
        interface: { reads: [{ id: 'getStaff', intent: '교역자', method: 'GET', path: '/site/staff', auth: 'None', target: '.pd-staff-list' }], writes: [], events: [] },
        flow: { to: [] },
      },
      // ── 오시는 길 ──
      {
        id: 'SCR-SITE-005', label: '오시는 길', href: 's-location.html',
        surface: 'site', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-006'],
        context: '주소·지도·대중교통·주차. 주소 복사.',
        components: [
          { role: '.pd-map-full', kind: 'hero', label: '지도' },
          { role: '.pd-address', kind: 'card', label: '주소·교통·주차' },
        ],
        description: [
          { text: '지도 — 구글/카카오 임베드', target: '.pd-map-full' },
          { text: '주소·교통 — 복사', target: '.pd-address' },
        ],
        cases: [
          { state: '정상', trigger: '진입', guard: '', result: '지도·주소', message: '', target: '.pd-map-full', api: { endpoint: 'GET /site/location', status: 200 } },
          { state: '정상', trigger: '주소 복사', guard: '', result: '클립보드', message: '주소를 복사했어요', placement: 'toast', target: '.pd-address' },
        ],
        interface: { reads: [{ id: 'getLocation', intent: '오시는 길', method: 'GET', path: '/site/location', auth: 'None', target: '.pd-address' }], writes: [], events: [] },
        flow: { to: [] },
      },
      // ── 설교·찬양(공개) ──
      {
        id: 'SCR-SITE-006', label: '설교·찬양', href: 's-sermons.html',
        surface: 'site', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-005'],
        context: '공개 설교 목록(비로그인 열람). 시리즈·검색.',
        components: [
          { role: '.pd-public-sermons', kind: 'list', label: '공개 설교 목록' },
        ],
        description: [
          { text: '공개 설교 — 비로그인도 열람', target: '.pd-public-sermons' },
        ],
        cases: [
          { state: '정상', trigger: '진입', guard: '', result: '설교 목록', message: '', target: '.pd-public-sermons', api: { endpoint: 'GET /site/sermons', status: 200 } },
          { state: '빈데이터', trigger: '진입', guard: '0건', result: '준비중', message: '공개된 설교가 없어요', placement: 'inline', target: '.pd-public-sermons' },
        ],
        interface: { reads: [{ id: 'siteSermons', intent: '공개 설교', method: 'GET', path: '/site/sermons', auth: 'None', target: '.pd-public-sermons' }], writes: [], events: [] },
        flow: { to: [] },
      },
      // ── 새가족 안내 ──
      {
        id: 'SCR-SITE-007', label: '새가족 안내', href: 's-newcomer.html',
        surface: 'site', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-016'],
        context: '처음 오신 분 안내(절차·등록·새가족 환영회). 개인정보 동의 기반 등록.',
        components: [
          { role: '.pd-steps', kind: 'list', label: '방문 절차' },
          { role: '.pd-register-form', kind: 'form', label: '새가족 등록(선택)' },
        ],
        description: [
          { text: '방문 절차 — 예배·새가족실·등록', target: '.pd-steps' },
          { text: '새가족 등록 — 동의 기반(PIPA)', target: '.pd-register-form' },
        ],
        cases: [
          { state: '정상', trigger: '진입', guard: '', result: '절차·등록', message: '', target: '.pd-steps' },
          { state: '필수누락', trigger: '등록', guard: '동의 미체크', result: '막음', message: '개인정보 수집 동의가 필요해요', placement: 'inline', target: '.pd-register-form', priority: 'P1' },
        ],
        interface: { reads: [], writes: [{ id: 'newcomer', intent: '새가족 등록', method: 'POST', path: '/site/newcomer', request: '{entities.Member}', errors: [{ status: 422, when: '동의 누락', message: '개인정보 동의 필요' }], auth: 'None', target: '.pd-register-form' }], events: [] },
        flow: { to: [] },
      },
      // ── 교회 소식/주보(공개) ──
      {
        id: 'SCR-SITE-008', label: '교회 소식', href: 's-news.html',
        surface: 'site', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-015'],
        context: '교회 소식·공개 주보·행사 안내.',
        components: [
          { role: '.pd-news-list', kind: 'list', label: '소식 목록' },
        ],
        description: [
          { text: '소식 — 행사·주보·공지(공개분)', target: '.pd-news-list' },
        ],
        cases: [
          { state: '정상', trigger: '진입', guard: '', result: '소식 목록', message: '', target: '.pd-news-list', api: { endpoint: 'GET /site/news', status: 200 } },
          { state: '빈데이터', trigger: '진입', guard: '0건', result: '준비중', message: '등록된 소식이 없어요', placement: 'inline', target: '.pd-news-list' },
        ],
        interface: { reads: [{ id: 'siteNews', intent: '교회 소식', method: 'GET', path: '/site/news', auth: 'None', target: '.pd-news-list' }], writes: [], events: [] },
        flow: { to: [{ screen: 'SCR-SITE-010', via: '소식 상세', trigger: '.pd-news-list' }] },
      },
      // ── 공개 설교 상세 ──
      {
        id: 'SCR-SITE-009', label: '공개 설교 상세', href: 's-sermon-detail.html',
        surface: 'site', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-005'],
        context: '공개 설교 영상 상세(비로그인 열람). 공개 설교 목록(SCR-SITE-006)·홈 말씀에서 진입.',
        components: [{ role: '.pd-back', kind: 'button', label: '뒤로', action: { on: 'click', do: 'go:SCR-SITE-006' } }, { role: '.pd-player', kind: 'hero', label: '영상 플레이어' }],
        description: [{ text: '공개 영상 재생·본문·지난 설교' }],
        cases: [
          { state: '정상', trigger: '진입', guard: '', result: '재생', message: '', target: '.pd-player' },
          { state: '빈데이터', trigger: '진입', guard: '영상 없음', result: '준비중', message: '공개된 영상이 없어요', placement: 'inline', target: '.pd-player' },
          { state: '에러', trigger: '재생', guard: '비공개/깨짐', result: '대체 안내', message: '영상을 재생할 수 없어요', placement: 'inline', target: '.pd-player' },
        ],
        interface: { reads: [{ id: 'siteSermon', intent: '공개 설교 상세', method: 'GET', path: '/site/sermons/{id}', auth: 'None', target: '.pd-player' }], writes: [], events: [] },
        flow: { to: [] },
      },
      // ── 소식 상세 ──
      {
        id: 'SCR-SITE-010', label: '소식 상세', href: 's-news-detail.html',
        surface: 'site', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-015'],
        context: '교회 소식·행사 상세. 소식 목록(SCR-SITE-008)에서 진입.',
        components: [{ role: '.pd-back', kind: 'button', label: '뒤로', action: { on: 'click', do: 'go:SCR-SITE-008' } }],
        description: [{ text: '소식 본문·이미지' }],
        cases: [
          { state: '정상', trigger: '진입', guard: '', result: '소식 표시', message: '' },
          { state: '에러', trigger: '진입', guard: '삭제됨', result: '목록으로', message: '삭제된 소식이에요', placement: 'full-page' },
        ],
        interface: { reads: [{ id: 'siteNewsDetail', intent: '소식 상세', method: 'GET', path: '/site/news/{id}', auth: 'None' }], writes: [], events: [] },
        flow: { to: [] },
      },
    ],
  },
  {
    category: '관리자 콘솔 (PC웹)',
    pages: [
      // ── 관리자 대시보드 ──
      {
        id: 'SCR-ADM-001', label: '관리자 대시보드', href: 'c-dashboard.html',
        surface: 'admin', entry: true, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-007'],
        context: '성도·출석·헌금 현황. 좌측 메뉴로 각 관리로.',
        components: [
          { role: '.pd-nav-members', kind: 'button', label: '사이드바: 성도관리', action: { on: 'click', do: 'go:SCR-ADM-002' } },
          { role: '.pd-kpi', kind: 'card', label: 'KPI' },
          { role: '.pd-recent', kind: 'table', label: '최근 활동' },
        ],
        description: [
          { text: 'KPI — 성도·출석·대기 승인', target: '.pd-kpi' },
          { text: '사이드바 "성도관리" → SCR-ADM-002', target: '.pd-nav-members' },
          { text: '최근 활동 — 가입·설교 등록', target: '.pd-recent' },
        ],
        cases: [
          { state: '정상', trigger: '진입', guard: '관리자', result: '대시보드', message: '', target: '.pd-kpi', api: { endpoint: 'GET /admin/overview', status: 200 } },
          { state: '권한없음', trigger: '진입', guard: '관리자 아님', result: '접근 거부', message: '관리자 권한이 필요해요', placement: 'full-page', api: { endpoint: 'GET /admin/overview', status: 403 } },
        ],
        interface: { reads: [{ id: 'adminOverview', intent: '운영 현황', method: 'GET', path: '/admin/overview', response: '{ memberCount:number, pendingApprovals:number, attendanceRate:number, offeringThisMonth:number, longAbsentCount:number }', auth: 'Bearer(관리자)', target: '.pd-kpi' }], writes: [], events: [] },
        flow: { to: [{ screen: 'SCR-ADM-002', via: '성도관리', trigger: '.pd-nav-members' }] },
      },
      // ── 성도관리(교적) ──
      {
        id: 'SCR-ADM-002', label: '성도관리(교적)', href: 'c-members.html',
        surface: 'admin', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-008'],
        context: '성도 카드 원장·가입 승인·검색. 민감정보 마스킹(PIPA).',
        components: [
          { role: '.pd-member-search', kind: 'button', label: '성도 검색/필터' },
          { role: '.pd-member-table', kind: 'table', label: '성도 목록' },
          { role: '.pd-btn-approve', kind: 'button', label: '가입 승인', action: { on: 'click', do: 'write:approveMember' } },
        ],
        description: [
          { text: '성도 목록 — 이름(마스킹)·직분·부서·상태', target: '.pd-member-table' },
          { text: '가입 승인 → approveMember', target: '.pd-btn-approve' },
          { text: '검색/필터 — 이름·부서·직분·상태', target: '.pd-member-search' },
        ],
        cases: [
          { state: '정상', trigger: '진입', guard: '1명+', result: '목록', message: '', target: '.pd-member-table', api: { endpoint: 'GET /admin/members', status: 200 } },
          { state: '빈데이터', trigger: '진입', guard: '0명', result: '초대 유도', message: '아직 등록된 성도가 없어요', placement: 'inline', target: '.pd-member-table' },
          { state: '정상', trigger: '승인', guard: '승인대기', result: 'active·갱신', message: '승인되었어요', placement: 'toast', target: '.pd-btn-approve', api: { endpoint: 'POST /admin/members/{id}/approve', status: 200 } },
          { state: '권한없음', trigger: '민감정보 열람', guard: '권한 부족', result: '마스킹·차단', message: '권한이 없어요', placement: 'inline', target: '.pd-member-table' },
        ],
        interface: { reads: [{ id: 'listMembers', intent: '성도 목록', method: 'GET', path: '/admin/members', params: [{ in: 'query', name: 'status', type: 'string', required: false, example: 'pending' }], response: '{entities.Member}[]', auth: 'Bearer(관리자)', target: '.pd-member-table' }], writes: [{ id: 'approveMember', intent: '가입 승인', method: 'POST', path: '/admin/members/{id}/approve', response: '{entities.Member}', errors: [{ status: 409, when: '이미 처리', message: '이미 처리된 가입이에요' }], auth: 'Bearer(관리자)', target: '.pd-btn-approve' }], events: [{ name: 'member.approved', when: '승인 시', payload: '{entities.Member}' }] },
        flow: { to: [{ screen: 'SCR-ADM-001', via: '대시보드', kind: 'auto' }] },
      },
      // ── 출석 관리 ──
      {
        id: 'SCR-ADM-003', label: '출석 관리', href: 'c-attendance.html',
        surface: 'admin', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-009'],
        context: '예배별 출석 체크·통계·장기결석 자동감지. QR/수기/온라인 인정.',
        components: [
          { role: '.pd-session-select', kind: 'segment', label: '예배 세션 선택' },
          { role: '.pd-attend-table', kind: 'table', label: '출석 체크 표' },
          { role: '.pd-longabsent', kind: 'card', label: '장기결석 알림' },
        ],
        description: [
          { text: '세션 선택 — 주일 1부/2부/수요 등', target: '.pd-session-select' },
          { text: '출석 체크 — 성도별 체크(QR/수기)', target: '.pd-attend-table' },
          { text: '장기결석 — 4주+ 미출석 자동감지', target: '.pd-longabsent' },
        ],
        cases: [
          { state: '정상', trigger: '진입', guard: '', result: '세션·체크표', message: '', target: '.pd-attend-table', api: { endpoint: 'GET /admin/attendance', status: 200 } },
          { state: '정상', trigger: '체크', guard: '', result: '출석 저장', message: '출석이 저장됐어요', placement: 'toast', target: '.pd-attend-table', api: { endpoint: 'POST /admin/attendance', status: 200 } },
          { state: '엣지', trigger: '자동감지', guard: '4주+ 미출석', result: '장기결석 목록', message: '', target: '.pd-longabsent' },
        ],
        interface: { reads: [{ id: 'getAttendance', intent: '출석 세션', method: 'GET', path: '/admin/attendance', response: '{entities.AttendanceSession}[]', auth: 'Bearer(관리자)', target: '.pd-attend-table' }], writes: [{ id: 'checkAttendance', intent: '출석 체크', method: 'POST', path: '/admin/attendance', request: '{entities.AttendanceSession}', auth: 'Bearer(관리자)', target: '.pd-attend-table' }], events: [] },
        flow: { to: [] },
      },
      // ── 설교 관리 ──
      {
        id: 'SCR-ADM-004', label: '설교 관리', href: 'c-sermon.html',
        surface: 'admin', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-002'],
        context: '설교 등록(유튜브 URL)·주일 라이브 토글·게시 관리.',
        components: [
          { role: '.pd-sermon-form', kind: 'form', label: '설교 등록 폼' },
          { role: '.pd-sermon-admin-table', kind: 'table', label: '설교 목록(게시 상태)' },
          { role: '.pd-live-toggle', kind: 'toggle', label: '주일 라이브 토글' },
        ],
        description: [
          { text: '설교 등록 — 제목·설교자·유튜브 URL·날짜', target: '.pd-sermon-form' },
          { text: '주일 라이브 — 홈 노출 토글', target: '.pd-live-toggle' },
          { text: '설교 목록 — 게시/숨김', target: '.pd-sermon-admin-table' },
        ],
        cases: [
          { state: '정상', trigger: '등록', guard: 'URL 유효', result: '게시·앱 반영', message: '설교가 등록됐어요', placement: 'toast', target: '.pd-sermon-form', api: { endpoint: 'POST /admin/sermons', status: 201 } },
          { state: '형식오류', trigger: '등록', guard: '유튜브 URL 아님', result: '막음', message: '올바른 유튜브 주소를 입력해 주세요', placement: 'inline', target: '.pd-sermon-form', priority: 'P1' },
        ],
        interface: { reads: [{ id: 'listSermonsAdmin', intent: '설교 목록(관리)', method: 'GET', path: '/admin/sermons', auth: 'Bearer(관리자)', target: '.pd-sermon-admin-table' }], writes: [{ id: 'createSermon', intent: '설교 등록', method: 'POST', path: '/admin/sermons', successStatus: 201, request: '{entities.Sermon}', response: '{entities.Sermon}', errors: [{ status: 422, when: 'URL 형식', message: '유튜브 주소를 확인해 주세요' }], auth: 'Bearer(관리자)', target: '.pd-sermon-form' }], events: [{ name: 'sermon.published', when: '게시 시', payload: '{entities.Sermon}' }] },
        flow: { to: [] },
      },
      // ── 공지·배너 관리 ──
      {
        id: 'SCR-ADM-005', label: '공지·배너 관리', href: 'c-notice.html',
        surface: 'admin', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-001'],
        context: '공지·홈 배너 CRUD. 노출 기간·우선순위.',
        components: [
          { role: '.pd-notice-form', kind: 'form', label: '공지 작성' },
          { role: '.pd-notice-admin-table', kind: 'table', label: '공지·배너 목록' },
        ],
        description: [
          { text: '공지 작성 — 제목·내용·노출기간', target: '.pd-notice-form' },
          { text: '목록 — 게시/숨김·배너 노출', target: '.pd-notice-admin-table' },
        ],
        cases: [
          { state: '정상', trigger: '등록', guard: '', result: '게시·앱 반영', message: '공지가 등록됐어요', placement: 'toast', target: '.pd-notice-form', api: { endpoint: 'POST /admin/notices', status: 201 } },
          { state: '필수누락', trigger: '등록', guard: '제목 없음', result: '막음', message: '제목을 입력해 주세요', placement: 'inline', target: '.pd-notice-form', priority: 'P1' },
        ],
        interface: { reads: [{ id: 'listNotices', intent: '공지 목록', method: 'GET', path: '/admin/notices', auth: 'Bearer(관리자)', target: '.pd-notice-admin-table' }], writes: [{ id: 'createNotice', intent: '공지 등록', method: 'POST', path: '/admin/notices', successStatus: 201, auth: 'Bearer(관리자)', target: '.pd-notice-form' }], events: [] },
        flow: { to: [] },
      },
      // ── 재정(헌금) 관리 ──
      {
        id: 'SCR-ADM-006', label: '재정 관리', href: 'c-finance.html',
        surface: 'admin', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-010'],
        context: '헌금 집계·전자기부금영수증 발급·발급명세서. 횡령 못하는 회계(오픈뱅킹 대사·감사추적) 로드맵.',
        components: [
          { role: '.pd-finance-kpi', kind: 'card', label: '헌금 집계 KPI' },
          { role: '.pd-receipt', kind: 'button', label: '기부금영수증 발급', action: { on: 'click', do: 'write:issueReceipt' } },
          { role: '.pd-finance-table', kind: 'table', label: '헌금 내역' },
        ],
        description: [
          { text: '헌금 집계 — 월별·종류별', target: '.pd-finance-kpi' },
          { text: '기부금영수증 — 자동 발급·명세서 제출', target: '.pd-receipt' },
          { text: '헌금 내역 — 감사추적(append-only)', target: '.pd-finance-table' },
        ],
        cases: [
          { state: '정상', trigger: '진입', guard: '관리자', result: '집계·내역', message: '', target: '.pd-finance-kpi', api: { endpoint: 'GET /admin/finance', status: 200 } },
          { state: '정상', trigger: '발급', guard: '대상 성도', result: '영수증 발급', message: '기부금영수증을 발급했어요', placement: 'toast', target: '.pd-receipt', api: { endpoint: 'POST /admin/receipts', status: 201 } },
          { state: '권한없음', trigger: '진입', guard: '재정 권한 없음', result: '차단', message: '재정 열람 권한이 필요해요', placement: 'full-page', api: { endpoint: 'GET /admin/finance', status: 403 } },
        ],
        interface: { reads: [{ id: 'getFinance', intent: '헌금 집계', method: 'GET', path: '/admin/finance', auth: 'Bearer(재정권한)', target: '.pd-finance-kpi' }], writes: [{ id: 'issueReceipt', intent: '기부금영수증 발급', method: 'POST', path: '/admin/receipts', idempotencyKey: true, successStatus: 201, response: '{entities.Receipt}', errors: [{ status: 409, when: '이미 발급(동일 성도·연도)', message: '이미 발급된 영수증이에요. 재발급할까요?' }, { status: 422, when: '주민번호 미등록', message: '영수증 발급에 필요한 정보가 없어요' }], auth: 'Bearer(재정권한)', target: '.pd-receipt' }], events: [{ name: 'receipt.issued', when: '발급 시', payload: '{entities.Receipt}' }] },
        flow: { to: [] },
      },
      // ── 홈페이지·화이트라벨 설정 ──
      {
        id: 'SCR-ADM-007', label: '홈페이지 설정', href: 'c-homepage.html',
        surface: 'admin', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-017', 'REQ-028'],
        context: '공개홈 템플릿(환영형/말씀형 등) 선택·브랜드(색·로고)·메뉴 설정. 화이트라벨 핵심.',
        components: [
          { role: '.pd-concept-picker', kind: 'list', label: '공개홈 템플릿 선택' },
          { role: '.pd-brand-form', kind: 'form', label: '브랜드(색·로고)' },
          { role: '.pd-preview', kind: 'hero', label: '미리보기' },
        ],
        description: [
          { text: '템플릿 선택 — 환영형/말씀형/공동체형/콘텐츠형', target: '.pd-concept-picker' },
          { text: '브랜드 — 주색·로고·교회명', target: '.pd-brand-form' },
          { text: '미리보기 — 선택 즉시 반영', target: '.pd-preview' },
        ],
        cases: [
          { state: '정상', trigger: '선택', guard: '', result: '템플릿 적용·미리보기', message: '적용되었어요', placement: 'toast', target: '.pd-concept-picker', api: { endpoint: 'PUT /admin/homepage', status: 200 } },
          { state: '빈데이터', trigger: '진입', guard: '브랜드 미설정', result: 'placeholder', message: '로고·색을 설정하면 반영돼요', placement: 'inline', target: '.pd-brand-form' },
        ],
        interface: { reads: [{ id: 'getHomepage', intent: '홈 설정', method: 'GET', path: '/admin/homepage', response: '{entities.Church}', auth: 'Bearer(관리자)', target: '.pd-concept-picker' }], writes: [{ id: 'setHomepage', intent: '홈 설정 저장', method: 'PUT', path: '/admin/homepage', request: '{entities.Church}', auth: 'Bearer(관리자)', target: '.pd-brand-form' }], events: [] },
        flow: { to: [] },
      },
      // ── 성도 상세 ──
      {
        id: 'SCR-ADM-008', label: '성도 상세', href: 'c-member-detail.html',
        surface: 'admin', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-008'],
        context: '성도 카드 상세(기본정보·출석·헌금 요약). 목록(SCR-ADM-002)에서 진입. 민감정보 열람 감사로그.',
        components: [{ role: '.pd-member-detail', kind: 'card', label: '성도 상세' }],
        description: [{ text: '기본정보·출석/헌금 요약·수정' }],
        cases: [{ state: '정상', trigger: '진입', guard: '권한', result: '상세 표시', message: '' }, { state: '권한없음', trigger: '민감정보 열람', guard: '권한 부족', result: '마스킹', message: '권한이 없어요', placement: 'inline' }],
        interface: { reads: [{ id: 'getMember', intent: '성도 상세', method: 'GET', path: '/admin/members/{id}', response: '{entities.Member}', auth: 'Bearer(관리자)' }], writes: [], events: [{ name: 'member.pii.viewed', when: '민감정보 열람', payload: '{entities.Member}' }] },
        flow: { to: [{ screen: 'SCR-ADM-009', via: '수정', trigger: '.pd-pagehead-actions' }] },
      },
      // ── 성도 등록/수정 ──
      {
        id: 'SCR-ADM-009', label: '성도 등록/수정', href: 'c-member-form.html',
        surface: 'admin', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-008'],
        context: '성도 신규 등록·정보 수정(이름·직분·부서·연락처·동의). 목록 "+등록"·상세 "수정"에서 진입.',
        components: [{ role: '.pd-member-form', kind: 'form', label: '성도 폼' }],
        description: [{ text: '이름·직분·부서·연락처·등록일·동의' }],
        cases: [{ state: '정상', trigger: '저장', guard: '필수입력', result: '목록 반영', message: '저장됐어요', placement: 'toast' }, { state: '필수누락', trigger: '저장', guard: '이름 없음', result: '막음', message: '이름을 입력해 주세요', placement: 'inline', priority: 'P1' }],
        interface: { reads: [], writes: [{ id: 'saveMember', intent: '성도 저장', method: 'POST', path: '/admin/members', successStatus: 201, request: '{entities.Member}', auth: 'Bearer(관리자)' }], events: [] },
        flow: { to: [{ screen: 'SCR-ADM-002', via: '저장', kind: 'auto' }] },
      },
      // ── 설교 수정 ──
      {
        id: 'SCR-ADM-010', label: '설교 수정', href: 'c-sermon-edit.html',
        surface: 'admin', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-002'],
        context: '설교 정보 수정(제목·설교자·URL·라이브·게시). 설교 관리(SCR-ADM-004) 목록에서 진입.',
        components: [{ role: '.pd-sermon-edit', kind: 'form', label: '설교 수정 폼' }],
        description: [{ text: '제목·설교자·유튜브 URL·라이브·게시' }],
        cases: [{ state: '정상', trigger: '저장', guard: 'URL 유효', result: '목록 반영', message: '저장됐어요', placement: 'toast' }, { state: '형식오류', trigger: '저장', guard: '유튜브 URL 아님', result: '막음', message: '올바른 유튜브 주소를 입력해 주세요', placement: 'inline', priority: 'P1' }],
        interface: { reads: [{ id: 'getSermonAdmin', intent: '설교 조회', method: 'GET', path: '/admin/sermons/{id}', auth: 'Bearer(관리자)' }], writes: [{ id: 'updateSermon', intent: '설교 수정', method: 'PUT', path: '/admin/sermons/{id}', auth: 'Bearer(관리자)' }], events: [] },
        flow: { to: [{ screen: 'SCR-ADM-004', via: '저장', kind: 'auto' }] },
      },
      // ── 헌금 상세 ──
      {
        id: 'SCR-ADM-011', label: '헌금 상세', href: 'c-finance-detail.html',
        surface: 'admin', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-010'],
        context: '헌금 내역 상세·기부금영수증 발급. 재정(SCR-ADM-006) 내역에서 진입.',
        components: [{ role: '.pd-finance-detail', kind: 'card', label: '헌금 상세' }],
        description: [{ text: '헌금 상세·영수증 발급/재발급' }],
        cases: [
          { state: '정상', trigger: '진입', guard: '재정권한', result: '헌금 상세', message: '', target: '.pd-finance-detail' },
          { state: '정상', trigger: '발급', guard: '대상', result: '영수증 발급', message: '발급했어요', placement: 'toast', target: '.pd-process' },
          { state: '중복충돌', trigger: '발급', guard: '이미 발급', result: '재발급 확인', message: '이미 발급된 영수증이에요. 재발급할까요?', placement: 'inline', target: '.pd-process' },
          { state: '권한없음', trigger: '진입', guard: '재정 권한 없음', result: '차단', message: '재정 열람 권한이 필요해요', placement: 'full-page' },
        ],
        interface: { reads: [{ id: 'getFinanceItem', intent: '헌금 상세', method: 'GET', path: '/admin/finance/{id}', auth: 'Bearer(재정권한)' }], writes: [{ id: 'issueReceiptDetail', intent: '영수증 발급', method: 'POST', path: '/admin/receipts', successStatus: 201, auth: 'Bearer(재정권한)' }], events: [] },
        flow: { to: [] },
      },
      // ── 문자·알림(문자지갑) · REQ-019 ──
      {
        id: 'SCR-ADM-012', label: '문자·알림(문자지갑)', href: 'c-messaging.html',
        surface: 'admin', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-019'],
        context: '문자/푸시 발송·문자지갑 잔액·예약발송·수신동의 관리. 수신거부 성도 자동 제외(PIPA 연동).',
        components: [{ role: '.pd-msg-table', kind: 'table', label: '발송 내역' }, { role: '.pd-send', kind: 'button', label: '발송', action: { on: 'click', do: 'write:sendMessage' } }],
        description: [{ text: '문자지갑 잔액·발송 내역·예약발송·수신동의율', target: '.pd-msg-table' }],
        cases: [
          { state: '정상', trigger: '발송', guard: '잔액 충분', result: '발송·내역 기록', message: '발송했어요', placement: 'toast', target: '.pd-send' },
          { state: '빈데이터', trigger: '진입', guard: '발송 0건', result: '안내', message: '아직 발송 내역이 없어요', placement: 'inline', target: '.pd-msg-table' },
          { state: '범위초과', trigger: '발송', guard: '잔액 부족', result: '막음', message: '문자 잔액이 부족해요. 충전 후 발송하세요', placement: 'inline', target: '.pd-send', priority: 'P1' },
          { state: '권한없음', trigger: '발송', guard: '권한 부족', result: '차단', message: '발송 권한이 필요해요', placement: 'inline' },
        ],
        interface: { reads: [{ id: 'listMessages', intent: '발송 내역', method: 'GET', path: '/admin/messages', auth: 'Bearer(관리자)', target: '.pd-msg-table' }], writes: [{ id: 'sendMessage', intent: '문자/푸시 발송', method: 'POST', path: '/admin/messages', successStatus: 201, errors: [{ status: 402, when: '잔액 부족', message: '문자 잔액이 부족합니다' }], auth: 'Bearer(관리자)', target: '.pd-send' }], events: [{ name: 'message.sent', when: '발송 시', payload: '{count,channel}' }] },
        flow: { to: [] },
      },
      // ── 개인정보 보호(PIPA) · REQ-020 ──
      {
        id: 'SCR-ADM-013', label: '개인정보 보호(PIPA)', href: 'c-privacy.html',
        surface: 'admin', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-020'],
        context: '개인정보 수집·이용 동의 원장, 권리요청(열람·정정·삭제·처리정지) 처리, 보관기간·파기, 처리방침. 감사추적.',
        components: [{ role: '.pd-privacy-table', kind: 'table', label: '권리요청' }, { role: '.pd-process', kind: 'button', label: '권리요청 처리', action: { on: 'click', do: 'write:processRight' } }],
        description: [{ text: '동의 원장·권리요청 처리·보관/파기·처리방침', target: '.pd-privacy-table' }],
        cases: [
          { state: '정상', trigger: '진입', guard: '개인정보취급자', result: '동의율·요청 목록', message: '', target: '.pd-privacy-table' },
          { state: '정상', trigger: '처리', guard: '본인확인', result: '권리요청 처리·기록', message: '처리했어요', placement: 'toast', target: '.pd-process' },
          { state: '엣지', trigger: '자동', guard: '보관기간 만료', result: '파기 예정 표시', message: '', placement: 'inline' },
          { state: '권한없음', trigger: '열람', guard: '개인정보 권한 없음', result: '차단', message: '개인정보 취급 권한이 필요해요', placement: 'full-page' },
        ],
        interface: { reads: [{ id: 'getPrivacy', intent: '동의·권리요청', method: 'GET', path: '/admin/privacy', auth: 'Bearer(개인정보취급자)', target: '.pd-privacy-table' }], writes: [{ id: 'processRight', intent: '권리요청 처리', method: 'POST', path: '/admin/privacy/requests/{id}', auth: 'Bearer(개인정보취급자)', target: '.pd-process' }], events: [{ name: 'privacy.right.processed', when: '처리 시', payload: '{type,memberId}' }] },
        flow: { to: [] },
      },
    ],
  },
  {
    category: '슈퍼관리자 (PC웹)',
    pages: [
      // ── 플랫폼 대시보드(테넌트 관리) ──
      {
        id: 'SCR-SUP-001', label: '테넌트(교회) 관리', href: 'x-tenants.html',
        surface: 'super', entry: true, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-018'],
        context: '플랫폼 운영자: 교회(테넌트) 생성·구독·이단심사 게이트·커스텀 도메인. 데이터 주권·격리.',
        components: [
          { role: '.pd-tenant-table', kind: 'table', label: '교회(테넌트) 목록' },
          { role: '.pd-new-tenant', kind: 'button', label: '교회 추가(발행)' },
          { role: '.pd-review-gate', kind: 'card', label: '이단심사 게이트' },
        ],
        description: [
          { text: '테넌트 목록 — 교회·구독·상태·도메인', target: '.pd-tenant-table' },
          { text: '교회 추가 — 30분 내 브랜드 앱 발행', target: '.pd-new-tenant' },
          { text: '이단심사 게이트 — 승인 전 노출 차단', target: '.pd-review-gate' },
        ],
        cases: [
          { state: '정상', trigger: '진입', guard: '슈퍼관리자', result: '테넌트 목록', message: '', target: '.pd-tenant-table', api: { endpoint: 'GET /super/tenants', status: 200 } },
          { state: '정상', trigger: '교회 추가', guard: '심사 통과', result: '테넌트 발행', message: '교회가 발행됐어요', placement: 'toast', target: '.pd-new-tenant', api: { endpoint: 'POST /super/tenants', status: 201 } },
          { state: '권한없음', trigger: '진입', guard: '슈퍼관리자 아님', result: '차단', message: '플랫폼 운영자만 접근할 수 있어요', placement: 'full-page', api: { endpoint: 'GET /super/tenants', status: 403 } },
        ],
        interface: { reads: [{ id: 'listTenants', intent: '테넌트 목록', method: 'GET', path: '/super/tenants', response: '{entities.Church}[]', auth: 'Bearer(슈퍼)', target: '.pd-tenant-table' }], writes: [{ id: 'createTenant', intent: '교회 발행', method: 'POST', path: '/super/tenants', successStatus: 201, request: '{entities.Church}', response: '{entities.Church}', auth: 'Bearer(슈퍼)', target: '.pd-new-tenant' }], events: [{ name: 'tenant.created', when: '발행 시', payload: '{entities.Church}' }] },
        flow: { to: [{ screen: 'SCR-SUP-002', via: '교회 발행', trigger: '.pd-new-tenant' }, { screen: 'SCR-SUP-003', via: '테넌트 상세', trigger: '.pd-tenant-table' }] },
      },
      // ── 교회 발행 ──
      {
        id: 'SCR-SUP-002', label: '교회 발행', href: 'x-tenant-new.html',
        surface: 'super', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-018'],
        context: '신규 교회(테넌트) 발행 폼(교회명·slug·템플릿·이단심사). 30분 내 브랜드 앱 발행.',
        components: [{ role: '.pd-tenant-new-form', kind: 'form', label: '교회 발행 폼' }],
        description: [{ text: '교회명·slug·템플릿·담당자·이단심사' }],
        cases: [{ state: '정상', trigger: '발행', guard: '심사 통과·필수입력', result: '테넌트 발행', message: '교회가 발행됐어요', placement: 'toast' }, { state: '권한없음', trigger: '발행', guard: '심사 대기', result: '막음', message: '이단심사 통과 후 발행할 수 있어요', placement: 'inline', priority: 'P1' }],
        interface: { reads: [], writes: [{ id: 'publishTenant', intent: '교회 발행', method: 'POST', path: '/super/tenants', successStatus: 201, request: '{entities.Church}', auth: 'Bearer(슈퍼)' }], events: [{ name: 'tenant.created', when: '발행', payload: '{entities.Church}' }] },
        flow: { to: [{ screen: 'SCR-SUP-001', via: '발행', kind: 'auto' }] },
      },
      // ── 테넌트 상세 ──
      {
        id: 'SCR-SUP-003', label: '테넌트 상세', href: 'x-tenant-detail.html',
        surface: 'super', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-018'],
        context: '교회(테넌트) 상세(상태·구독·성도·도메인·심사이력). 목록·구독·도메인에서 진입.',
        components: [{ role: '.pd-tenant-detail', kind: 'card', label: '테넌트 상세' }],
        description: [{ text: '상태·구독·성도·도메인·심사이력·바로가기' }],
        cases: [
          { state: '정상', trigger: '진입', guard: '슈퍼관리자', result: '상세 표시', message: '' },
          { state: '권한없음', trigger: '진입', guard: '슈퍼관리자 아님', result: '차단', message: '플랫폼 운영자만 접근할 수 있어요', placement: 'full-page' },
          { state: '빈데이터', trigger: '진입', guard: '구독/도메인 미설정', result: '설정 유도', message: '구독·도메인을 설정하면 반영돼요', placement: 'inline' },
        ],
        interface: { reads: [{ id: 'getTenant', intent: '테넌트 상세', method: 'GET', path: '/super/tenants/{id}', response: '{entities.Church}', auth: 'Bearer(슈퍼)' }], writes: [], events: [] },
        flow: { to: [{ screen: 'SCR-SUP-004', via: '심사 이력' }, { screen: 'SCR-SUP-005', via: '구독 관리' }, { screen: 'SCR-SUP-006', via: '도메인' }] },
      },
      // ── 이단심사 게이트 ──
      {
        id: 'SCR-SUP-004', label: '이단심사 게이트', href: 'x-review-gate.html',
        surface: 'super', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-018'],
        context: '교리 검증 게이트. 승인 전 공개홈·앱 노출 차단. 대기/완료 심사 관리.',
        components: [{ role: '.pd-review-list', kind: 'table', label: '심사 목록' }],
        description: [{ text: '심사 대기·완료, 검토 진입' }],
        cases: [{ state: '정상', trigger: '진입', guard: '슈퍼관리자', result: '심사 목록', message: '' }, { state: '정상', trigger: '승인', guard: '검토 완료', result: '노출 허용', message: '심사 통과 처리됐어요', placement: 'toast' }],
        interface: { reads: [{ id: 'listReviews', intent: '심사 목록', method: 'GET', path: '/super/reviews', auth: 'Bearer(슈퍼)' }], writes: [{ id: 'approveReview', intent: '심사 승인', method: 'POST', path: '/super/reviews/{id}/approve', auth: 'Bearer(슈퍼)' }], events: [{ name: 'tenant.review.approved', when: '승인', payload: '{entities.Church}' }] },
        flow: { to: [{ screen: 'SCR-SUP-003', via: '검토', trigger: '.pd-review-list' }] },
      },
      // ── 구독·과금 ──
      {
        id: 'SCR-SUP-005', label: '구독·과금', href: 'x-subscription.html',
        surface: 'super', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-018', 'REQ-033'],
        context: '교회별 구독 현황·월 매출·연체 관리.',
        components: [{ role: '.pd-sub-table', kind: 'table', label: '구독 현황' }],
        description: [{ text: '월 매출·활성 구독·연체·교회별 플랜' }],
        cases: [
          { state: '정상', trigger: '진입', guard: '슈퍼관리자', result: '구독 현황', message: '' },
          { state: '빈데이터', trigger: '진입', guard: '구독 0건', result: '안내', message: '활성 구독이 없어요', placement: 'inline' },
          { state: '엣지', trigger: '자동', guard: '결제 연체', result: '연체 표시', message: '', placement: 'inline' },
        ],
        interface: { reads: [{ id: 'listSubscriptions', intent: '구독 현황', method: 'GET', path: '/super/subscriptions', auth: 'Bearer(슈퍼)' }], writes: [], events: [] },
        flow: { to: [{ screen: 'SCR-SUP-003', via: '교회', trigger: '.pd-sub-table' }] },
      },
      // ── 커스텀 도메인 ──
      {
        id: 'SCR-SUP-006', label: '커스텀 도메인', href: 'x-domains.html',
        surface: 'super', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-017'],
        context: '교회별 독립 도메인 연결(화이트라벨). 기본 주소·커스텀 도메인·연결 상태.',
        components: [{ role: '.pd-domain-table', kind: 'table', label: '도메인 연결' }],
        description: [{ text: '기본 주소·커스텀 도메인·연결 상태' }],
        cases: [
          { state: '정상', trigger: '진입', guard: '슈퍼관리자', result: '도메인 목록', message: '' },
          { state: '빈데이터', trigger: '진입', guard: '커스텀 도메인 미연결', result: '기본주소 사용', message: '아직 연결된 커스텀 도메인이 없어요', placement: 'inline' },
          { state: '에러', trigger: '연결', guard: 'DNS 미확인', result: '대기', message: 'DNS 확인 중이에요. 잠시 후 반영됩니다', placement: 'inline' },
        ],
        interface: { reads: [{ id: 'listDomains', intent: '도메인 목록', method: 'GET', path: '/super/domains', auth: 'Bearer(슈퍼)' }], writes: [], events: [] },
        flow: { to: [{ screen: 'SCR-SUP-003', via: '교회', trigger: '.pd-domain-table' }] },
      },

      // ══════════ 보강 신규 화면 (교인 셀프서비스·로그인·법적문서·운영) ══════════
      // ── 통합 검색 ──
      {
        id: 'SCR-APP-021', label: '검색', href: 'a-search.html',
        surface: 'app', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-030'],
        context: '설교·공지·성도매장 통합 검색. 최근 검색어·유형별 결과. 설교(SCR-APP-003) 상단 검색 아이콘에서 진입.',
        components: [
          { role: '.pd-searchbar', kind: 'input', label: '검색 입력' },
          { role: '.pd-list', kind: 'list', label: '검색 결과' },
        ],
        description: [
          { text: '검색 입력 — 설교·공지·매장 통합', target: '.pd-searchbar' },
          { text: '결과 — 유형 뱃지로 구분', target: '.pd-list' },
        ],
        cases: [
          { state: '초기', trigger: '진입', guard: '', result: '최근 검색어', message: '', target: '.pd-searchbar' },
          { state: '정상', trigger: '검색', guard: '키워드 입력', result: '결과 목록', message: '', target: '.pd-list', api: { endpoint: 'GET /app/search', status: 200 } },
          { state: '빈데이터', trigger: '검색', guard: '결과 없음', result: '빈 상태', message: '검색 결과가 없어요', placement: 'inline', target: '.pd-list' },
          { state: '형식오류', trigger: '검색', guard: '2자 미만', result: '막음', message: '두 글자 이상 입력해 주세요', placement: 'inline', target: '.pd-searchbar', priority: 'P2' },
        ],
        interface: { reads: [{ id: 'search', intent: '통합 검색', method: 'GET', path: '/app/search', params: [{ in: 'query', name: 'q', type: 'string', required: true, example: '로마서' }, { in: 'query', name: 'type', type: 'string', required: false, example: 'sermon|notice|store' }, { in: 'query', name: 'cursor', type: 'string', required: false }], response: '{ results: Array<{type,id,title,sub}>, nextCursor:string }', auth: 'Bearer', target: '.pd-list' }], writes: [], events: [] },
        flow: { to: [] },
      },
      // ── 기부금영수증(교인) ──
      {
        id: 'SCR-APP-022', label: '기부금영수증', href: 'a-receipts.html',
        surface: 'app', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-022'],
        context: '교인 본인 기부금영수증 연도별 조회·발급(연말정산). 세무 발급 이력은 감사기록. 마이(SCR-APP-004)에서 진입.',
        components: [{ role: '.pd-receipt-list', kind: 'list', label: '연도별 영수증' }],
        description: [{ text: '연도별 합계·발급 버튼', target: '.pd-receipt-list' }],
        cases: [
          { state: '정상', trigger: '진입', guard: '로그인 성도', result: '연도별 목록', message: '', target: '.pd-receipt-list', api: { endpoint: 'GET /app/receipts', status: 200 } },
          { state: '빈데이터', trigger: '진입', guard: '헌금 내역 없음', result: '빈 상태', message: '발급 가능한 영수증이 없어요', placement: 'inline', target: '.pd-receipt-list' },
          { state: '권한없음', trigger: '진입', guard: '비로그인', result: '로그인 유도', message: '로그인이 필요해요', placement: 'inline', priority: 'P1' },
          { state: '필수누락', trigger: '발급', guard: '주민번호 미등록', result: '막음', message: '영수증 발급에 필요한 정보가 없어요. 교회에 문의해 주세요', placement: 'inline', priority: 'P1' },
          { state: '유효', trigger: '발급', guard: '정보 완비', result: 'PDF 발급', message: '영수증을 발급했어요', placement: 'toast', priority: 'P0', api: { endpoint: 'POST /app/receipts/{year}', status: 201 } },
        ],
        interface: { reads: [{ id: 'listMyReceipts', intent: '내 영수증', method: 'GET', path: '/app/receipts', response: '{entities.Receipt}[]', auth: 'Bearer', target: '.pd-receipt-list' }], writes: [{ id: 'issueMyReceipt', intent: '본인 영수증 발급', method: 'POST', path: '/app/receipts/{year}', idempotencyKey: true, successStatus: 201, response: '{entities.Receipt}', errors: [{ status: 422, when: '주민번호 미등록', message: '발급 정보가 없어요' }], auth: 'Bearer' }], events: [{ name: 'receipt.issued', when: '본인 발급 시', payload: '{entities.Receipt}' }] },
        flow: { to: [] },
      },
      // ── 개인정보 권리요청(교인) ──
      {
        id: 'SCR-APP-023', label: '개인정보 권리요청', href: 'a-privacy-request.html',
        surface: 'app', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-021'],
        context: '교인 본인 개인정보 열람·정정·삭제·처리정지 요청(PIPA). 관리자 처리(SCR-ADM-013) 연계·결과 알림. 마이/설정에서 진입.',
        components: [
          { role: '.pd-right-form', kind: 'form', label: '권리요청 폼' },
          { role: '.pd-list', kind: 'list', label: '요청 내역' },
        ],
        description: [
          { text: '요청 유형·상세·본인확인 동의', target: '.pd-right-form' },
          { text: '내 요청 처리 상태', target: '.pd-list' },
        ],
        cases: [
          { state: '초기', trigger: '진입', guard: '로그인', result: '요청 폼', message: '', target: '.pd-right-form' },
          { state: '필수누락', trigger: '제출', guard: '유형/동의 누락', result: '막음', message: '요청 유형과 본인확인 동의가 필요해요', placement: 'inline', target: '.pd-right-form', priority: 'P1' },
          { state: '유효', trigger: '제출', guard: '정상', result: '접수', message: '요청이 접수됐어요. 처리 결과는 알림으로 안내됩니다', placement: 'toast', priority: 'P0', api: { endpoint: 'POST /app/privacy-requests', status: 201 } },
          { state: '중복충돌', trigger: '제출', guard: '동일 유형 처리중', result: '막음', message: '이미 처리 중인 동일 요청이 있어요', placement: 'inline', priority: 'P2' },
        ],
        interface: { reads: [{ id: 'listMyRights', intent: '내 권리요청', method: 'GET', path: '/app/privacy-requests', response: '{entities.PrivacyRequest}[]', auth: 'Bearer', target: '.pd-list' }], writes: [{ id: 'createRight', intent: '권리요청 제출', method: 'POST', path: '/app/privacy-requests', idempotencyKey: true, successStatus: 201, response: '{entities.PrivacyRequest}', errors: [{ status: 409, when: '동일 유형 처리중', message: '이미 처리 중이에요' }], auth: 'Bearer', target: '.pd-right-form' }], events: [{ name: 'privacy.request.created', when: '제출 시', payload: '{entities.PrivacyRequest}' }] },
        flow: { to: [] },
      },
      // ── 출석 체크(교인 QR/온라인) ──
      {
        id: 'SCR-APP-024', label: '출석 체크', href: 'a-attendance.html',
        surface: 'app', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-023'],
        context: '교인 출석 — 현장 QR 스캔 또는 온라인 예배 시청 자동 출석. 월별 출석 현황. 관리자 출석관리(SCR-ADM-003)와 연동.',
        components: [
          { role: '.pd-qr-check', kind: 'button', label: 'QR 출석' },
          { role: '.pd-online-check', kind: 'button', label: '온라인 출석' },
        ],
        description: [
          { text: 'QR 출석 — 예배 시간대만 활성', target: '.pd-qr-check' },
          { text: '온라인 출석 — 설교 시청 연계', target: '.pd-online-check' },
        ],
        cases: [
          { state: '정상', trigger: 'QR 스캔', guard: '예배 시간대·유효 QR', result: '출석 기록', message: '출석됐어요', placement: 'toast', target: '.pd-qr-check', api: { endpoint: 'POST /app/attendance', status: 201 } },
          { state: '권한없음', trigger: '진입', guard: '비로그인', result: '로그인 유도', message: '로그인이 필요해요', placement: 'inline', priority: 'P1' },
          { state: '에러', trigger: 'QR 스캔', guard: '시간대 아님', result: '막음', message: '지금은 출석 체크 시간이 아니에요', placement: 'inline', priority: 'P2' },
          { state: '중복충돌', trigger: 'QR 스캔', guard: '이미 출석', result: '안내', message: '이미 출석 처리됐어요', placement: 'inline', priority: 'P2' },
        ],
        interface: { reads: [{ id: 'myAttendance', intent: '내 출석 현황', method: 'GET', path: '/app/attendance', response: '{ month:string, present:number, absent:number }', auth: 'Bearer' }], writes: [{ id: 'checkIn', intent: '출석 체크', method: 'POST', path: '/app/attendance', idempotencyKey: true, successStatus: 201, errors: [{ status: 409, when: '이미 출석', message: '이미 출석했어요' }, { status: 422, when: '시간대 아님', message: '출석 시간이 아니에요' }], auth: 'Bearer', target: '.pd-qr-check' }], events: [{ name: 'attendance.checked', when: '출석 시', payload: '{ memberId, service, at }' }] },
        flow: { to: [{ screen: 'SCR-APP-011', via: '온라인 예배 출석', trigger: '.pd-online-check' }] },
      },
      // ── 알림 수신설정(교인) ──
      {
        id: 'SCR-APP-025', label: '알림 설정', href: 'a-notif-settings.html',
        surface: 'app', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-024'],
        context: '교인 알림 수신 설정 — 종류별(설교·공지·댓글)·채널별(푸시·문자) 토글. 수신동의·야간발송 제한(21~08시) 연계.',
        components: [{ role: '.pd-toggle', kind: 'toggle', label: '알림 토글' }],
        description: [{ text: '종류별·채널별 수신 토글', target: '.pd-toggle' }],
        cases: [
          { state: '정상', trigger: '진입', guard: '로그인', result: '현재 설정 로드', message: '', api: { endpoint: 'GET /app/notification-settings', status: 200 } },
          { state: '정상', trigger: '토글 변경', guard: '', result: '저장', message: '알림 설정을 저장했어요', placement: 'toast', api: { endpoint: 'PATCH /app/notification-settings', status: 200 } },
          { state: '에러', trigger: '푸시 켜기', guard: '브라우저 권한 거부', result: '안내', message: '브라우저 알림 권한을 허용해 주세요', placement: 'inline', priority: 'P2' },
        ],
        interface: { reads: [{ id: 'getNotifSettings', intent: '알림 설정', method: 'GET', path: '/app/notification-settings', response: '{ sermon:boolean, notice:boolean, comment:boolean, push:boolean, sms:boolean }', auth: 'Bearer' }], writes: [{ id: 'updateNotifSettings', intent: '알림 설정 저장', method: 'PATCH', path: '/app/notification-settings', auth: 'Bearer', target: '.pd-toggle' }], events: [] },
        flow: { to: [] },
      },
      // ── 설정·회원탈퇴(교인) ──
      {
        id: 'SCR-APP-026', label: '설정', href: 'a-settings.html',
        surface: 'app', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-029'],
        context: '앱 설정 허브 — 알림·글자크기·권리요청·약관·로그아웃·회원탈퇴(개인정보 파기·확인 2단계).',
        components: [
          { role: '.pd-settings', kind: 'list', label: '설정 목록' },
          { role: '.pd-withdraw', kind: 'button', label: '회원 탈퇴' },
        ],
        description: [
          { text: '설정 항목 — 알림·글자크기·권리요청·약관', target: '.pd-settings' },
          { text: '회원 탈퇴 — 개인정보 파기(확인 2단계)', target: '.pd-withdraw' },
        ],
        cases: [
          { state: '정상', trigger: '진입', guard: '로그인', result: '설정 목록', message: '', target: '.pd-settings' },
          { state: '유효', trigger: '탈퇴', guard: '확인 2단계', result: '탈퇴·파기', message: '탈퇴 처리됐어요. 개인정보는 파기됩니다', placement: 'toast', priority: 'P0', api: { endpoint: 'DELETE /app/account', status: 200 } },
          { state: '권한없음', trigger: '탈퇴', guard: '미확인', result: '막음', message: '탈퇴 확인이 필요해요', placement: 'inline', target: '.pd-withdraw', priority: 'P1' },
        ],
        interface: { reads: [], writes: [{ id: 'withdraw', intent: '회원 탈퇴·파기', method: 'DELETE', path: '/app/account', confirm: true, errors: [{ status: 409, when: '미처리 요청 존재', message: '처리 중인 요청이 있어요' }], auth: 'Bearer', target: '.pd-withdraw' }], events: [{ name: 'member.withdrawn', when: '탈퇴 시', payload: '{ memberId, purgedAt }' }] },
        flow: { to: [{ screen: 'SCR-APP-025', via: '알림 설정' }, { screen: 'SCR-APP-023', via: '권리요청' }, { screen: 'SCR-SITE-011', via: '약관' }] },
      },
      // ── 약관·개인정보처리방침(공개홈) ──
      {
        id: 'SCR-SITE-011', label: '약관·개인정보처리방침', href: 's-terms.html',
        surface: 'site', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-026'],
        context: '이용약관·개인정보처리방침 법적 고지(공개). 공개홈·앱 설정·가입 동의에서 참조. PIPA 수집항목·목적·보유기간·권리행사 고지.',
        components: [{ role: '.pd-legal', kind: 'doc', label: '법적 문서 본문' }],
        description: [{ text: '이용약관/처리방침 탭·조항', target: '.pd-legal' }],
        cases: [
          { state: '정상', trigger: '진입', guard: '', result: '약관 본문', message: '' },
          { state: '정상', trigger: '탭 전환', guard: '', result: '처리방침 본문', message: '' },
        ],
        interface: { reads: [{ id: 'getLegal', intent: '법적 문서', method: 'GET', path: '/site/legal', params: [{ in: 'query', name: 'doc', type: 'string', required: false, example: 'terms|privacy' }], response: '{ terms:string, privacy:string, updatedAt:string }', auth: 'None', target: '.pd-legal' }], writes: [], events: [] },
        flow: { to: [] },
      },
      // ── 관리자 로그인 ──
      {
        id: 'SCR-ADM-014', label: '관리자 로그인', href: 'c-login.html',
        surface: 'admin', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-025'],
        context: '교회 관리자 콘솔 로그인(PC웹). 실패 5회 잠금·비밀번호 재설정. 관리자 권한은 담임목사가 위임(RBAC). 대시보드(SCR-ADM-001) 진입.',
        components: [{ role: '.pd-auth-form', kind: 'form', label: '로그인 폼' }],
        description: [{ text: '아이디·비밀번호·비번재설정', target: '.pd-auth-form' }],
        cases: [
          { state: '초기', trigger: '진입', guard: '', result: '로그인 폼', message: '', target: '.pd-auth-form' },
          { state: '필수누락', trigger: '로그인', guard: '미입력', result: '막음', message: '아이디와 비밀번호를 입력해 주세요', placement: 'inline', target: '.pd-auth-form', priority: 'P1' },
          { state: '권한없음', trigger: '로그인', guard: '자격 불일치', result: '막음', message: '아이디 또는 비밀번호를 확인해 주세요', placement: 'inline', priority: 'P1' },
          { state: '잠금', trigger: '로그인', guard: '5회 실패', result: '계정 잠금', message: '로그인을 5회 실패해 잠겼어요. 잠시 후 다시 시도해 주세요', placement: 'inline', priority: 'P1' },
          { state: '유효', trigger: '로그인', guard: '정상', result: '대시보드 이동', message: '', priority: 'P0', api: { endpoint: 'POST /admin/auth/login', status: 200 } },
        ],
        interface: { reads: [], writes: [{ id: 'adminLogin', intent: '관리자 로그인', method: 'POST', path: '/admin/auth/login', response: '{ token:string, member:{entities.Member} }', errors: [{ status: 401, when: '자격 불일치', message: '아이디 또는 비밀번호를 확인해 주세요' }, { status: 423, when: '5회 실패 잠금', message: '계정이 잠겼어요' }], auth: 'None', target: '.pd-auth-form' }], events: [{ name: 'admin.login', when: '로그인 성공', payload: '{ memberId, tenantId, at }' }] },
        flow: { to: [{ screen: 'SCR-ADM-001', via: '로그인', trigger: '.pd-btn' }] },
      },
      // ── 공개홈 콘텐츠 관리(관리자) ──
      {
        id: 'SCR-ADM-015', label: '공개홈 콘텐츠 관리', href: 'c-site-content.html',
        surface: 'admin', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-027'],
        context: '공개홈에 노출되는 예배시간·교회소개·교역자·오시는길·소식을 관리자가 직접 관리(content.edit 권한). 공개홈(SCR-SITE) 렌더에 반영.',
        components: [
          { role: '.pd-segment', kind: 'tab', label: '콘텐츠 영역 탭' },
          { role: '.pd-wpanel', kind: 'panel', label: '편집 패널' },
        ],
        description: [
          { text: '영역 탭 — 예배/소개/교역자/위치/소식', target: '.pd-segment' },
          { text: '예배 시간표 등 편집 테이블', target: '.pd-wpanel' },
        ],
        cases: [
          { state: '정상', trigger: '진입', guard: 'content.edit 권한', result: '콘텐츠 로드', message: '', api: { endpoint: 'GET /admin/site-content', status: 200 } },
          { state: '권한없음', trigger: '진입', guard: '권한 없음', result: '막음', message: '콘텐츠 편집 권한이 없어요', placement: 'inline', priority: 'P1' },
          { state: '필수누락', trigger: '저장', guard: '필수 항목 누락', result: '막음', message: '필수 항목을 입력해 주세요', placement: 'inline', priority: 'P1' },
          { state: '유효', trigger: '저장', guard: '정상', result: '공개홈 반영', message: '저장했어요. 공개홈에 반영됩니다', placement: 'toast', priority: 'P0', api: { endpoint: 'PUT /admin/site-content', status: 200 } },
        ],
        interface: { reads: [{ id: 'getSiteContent', intent: '공개홈 콘텐츠', method: 'GET', path: '/admin/site-content', response: '{entities.SiteContent}', auth: 'Bearer(content.edit)', target: '.pd-wpanel' }], writes: [{ id: 'saveSiteContent', intent: '콘텐츠 저장', method: 'PUT', path: '/admin/site-content', response: '{entities.SiteContent}', auth: 'Bearer(content.edit)', target: '.pd-wpanel' }], events: [{ name: 'site.content.updated', when: '저장 시', payload: '{entities.SiteContent}' }] },
        flow: { to: [] },
      },
      // ── UGC 모더레이션(관리자) ──
      {
        id: 'SCR-ADM-016', label: 'UGC 모더레이션', href: 'c-moderation.html',
        surface: 'admin', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-031'],
        context: '커뮤니티·아나바다 신고 게시물 숨김/무시, 성도 매장 승인/반려(moderate 권한). 사용자 생성 콘텐츠 운영.',
        components: [
          { role: '.pd-report-table', kind: 'table', label: '신고 목록' },
          { role: '.pd-wpanel', kind: 'panel', label: '매장 승인' },
        ],
        description: [
          { text: '신고 게시물 — 숨김/무시', target: '.pd-report-table' },
          { text: '성도 매장 승인/반려', target: '.pd-wpanel' },
        ],
        cases: [
          { state: '정상', trigger: '진입', guard: 'moderate 권한', result: '신고/승인대기 목록', message: '', api: { endpoint: 'GET /admin/moderation', status: 200 } },
          { state: '빈데이터', trigger: '진입', guard: '신고 없음', result: '빈 상태', message: '처리할 신고가 없어요', placement: 'inline', target: '.pd-report-table' },
          { state: '권한없음', trigger: '진입', guard: '권한 없음', result: '막음', message: '모더레이션 권한이 없어요', placement: 'inline', priority: 'P1' },
          { state: '유효', trigger: '숨김', guard: '정상', result: '게시물 숨김', message: '숨김 처리했어요', placement: 'toast', priority: 'P0', api: { endpoint: 'POST /admin/moderation/{id}/hide', status: 200 } },
          { state: '중복충돌', trigger: '숨김', guard: '이미 처리', result: '안내', message: '이미 처리된 항목이에요', placement: 'inline', priority: 'P2' },
        ],
        interface: { reads: [{ id: 'listReports', intent: '신고/승인대기', method: 'GET', path: '/admin/moderation', response: '{ reports:{entities.Post}[], storeApprovals:{entities.Store}[] }', auth: 'Bearer(moderate)', target: '.pd-report-table' }], writes: [{ id: 'hidePost', intent: '게시물 숨김', method: 'POST', path: '/admin/moderation/{id}/hide', idempotencyKey: true, errors: [{ status: 409, when: '이미 처리', message: '이미 처리됐어요' }], auth: 'Bearer(moderate)', target: '.pd-report-table' }, { id: 'approveStore', intent: '매장 승인', method: 'POST', path: '/admin/stores/{id}/approve', response: '{entities.Store}', auth: 'Bearer(moderate)', target: '.pd-wpanel' }], events: [{ name: 'ugc.hidden', when: '숨김 시', payload: '{ postId, by, at }' }] },
        flow: { to: [] },
      },
      // ── 운영자 로그인(슈퍼) ──
      {
        id: 'SCR-SUP-007', label: '운영자 로그인', href: 'x-login.html',
        surface: 'super', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-025'],
        context: '플랫폼 슈퍼관리자 로그인(PC웹). 2단계 인증(OTP)·비밀번호 재설정. 교차테넌트 접근 권한이므로 보안 강화. 테넌트 관리(SCR-SUP-001) 진입.',
        components: [{ role: '.pd-auth-form', kind: 'form', label: '운영자 로그인 폼' }],
        description: [{ text: '이메일·비밀번호·OTP', target: '.pd-auth-form' }],
        cases: [
          { state: '초기', trigger: '진입', guard: '', result: '로그인 폼', message: '', target: '.pd-auth-form' },
          { state: '필수누락', trigger: '로그인', guard: '미입력', result: '막음', message: '이메일과 비밀번호를 입력해 주세요', placement: 'inline', target: '.pd-auth-form', priority: 'P1' },
          { state: '권한없음', trigger: '로그인', guard: 'OTP 불일치', result: '막음', message: '인증 코드를 확인해 주세요', placement: 'inline', priority: 'P1' },
          { state: '유효', trigger: '로그인', guard: '정상+OTP', result: '테넌트 관리 이동', message: '', priority: 'P0', api: { endpoint: 'POST /super/auth/login', status: 200 } },
        ],
        interface: { reads: [], writes: [{ id: 'superLogin', intent: '운영자 로그인', method: 'POST', path: '/super/auth/login', response: '{ token:string }', errors: [{ status: 401, when: '자격/OTP 불일치', message: '인증 정보를 확인해 주세요' }], auth: 'None', target: '.pd-auth-form' }], events: [{ name: 'super.login', when: '로그인 성공', payload: '{ superId, at }' }] },
        flow: { to: [{ screen: 'SCR-SUP-001', via: '로그인', trigger: '.pd-btn' }] },
      },
      // ── 감사로그(슈퍼) ──
      {
        id: 'SCR-SUP-008', label: '감사로그', href: 'x-audit.html',
        surface: 'super', entry: false, status: 'confirmed', designed: false, figmaLink: '', reqIds: ['REQ-032'],
        context: '슈퍼관리자의 교차테넌트 접근·민감정보(pii.read) 열람·중요 변경·대량발송 전수 기록(보존 3년). 멀티테넌트 격리 계약의 감사 축.',
        components: [{ role: '.pd-audit-table', kind: 'table', label: '접근 기록' }],
        description: [{ text: '시각·운영자·교회·액션·대상', target: '.pd-audit-table' }],
        cases: [
          { state: '정상', trigger: '진입', guard: '슈퍼관리자', result: '로그 목록', message: '', api: { endpoint: 'GET /super/audit', status: 200 } },
          { state: '빈데이터', trigger: '필터', guard: '해당 로그 없음', result: '빈 상태', message: '조건에 맞는 기록이 없어요', placement: 'inline', target: '.pd-audit-table' },
          { state: '권한없음', trigger: '진입', guard: '슈퍼 아님', result: '막음', message: '접근 권한이 없어요', placement: 'inline', priority: 'P1' },
        ],
        interface: { reads: [{ id: 'listAudit', intent: '감사로그', method: 'GET', path: '/super/audit', params: [{ in: 'query', name: 'action', type: 'string', required: false, example: 'pii.read|tenant.create|message.send' }, { in: 'query', name: 'tenantId', type: 'string', required: false }, { in: 'query', name: 'cursor', type: 'string', required: false }], response: '{ logs: Array<{at,actor,tenant,action,target}>, nextCursor:string }', auth: 'Bearer(슈퍼)', target: '.pd-audit-table' }], writes: [], events: [] },
        flow: { to: [] },
      },
    ],
  },
];
window.PDK_SCREENS = window.PLANDECK_SCREENS;
