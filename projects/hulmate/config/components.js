/* 훌메이트 V2.0 — 컴포넌트 카탈로그(프로젝트 오버라이드).
 * 공용 pd-components.js(window.PD) 로드 후 CATALOG를 훌메이트 목업 실제 문구·디자인으로 교체.
 * 각 화면 HTML은 독립 페이지라 이 오버라이드는 훌메이트 컴포넌트 뷰에만 적용(타 프로젝트 무영향). */
(function () {
  var PD = window.PD || window.PDK_COMPONENTS;
  if (!PD || !PD.CATALOG) return;
  var I = PD.ICON;
  PD.CATALOG = [
    { group: '네비게이션', items: [
      { name: 'appbar', desc: '상단 바(뒤로·제목·액션) — 설교 상세 등', preview: function () { return PD.appbar('설교 상세', PD.iconbtn(I.bell), 'a-home.html'); } },
      { name: 'apptop', desc: '교인앱/공개홈 상단 타이틀', preview: function () { return PD.apptop('○○교회', PD.iconbtn(I.bell)); } },
      { name: 'tabbar', desc: '교인 5메뉴 하단 탭바(홈·설교·주보·공지·마이)', preview: function () { return PD.tabbar([['홈', I.home, '#'], ['설교', I.doc, '#'], ['주보', I.doc, '#'], ['공지', I.bell, '#'], ['마이', I.user, '#']], 0); } },
      { name: 'searchbar', desc: '검색 입력', preview: function () { return PD.searchbar('설교·공지 검색'); } },
    ]},
    { group: '리스트·카드', items: [
      { name: 'row', desc: '목록 행(설교·공지)', preview: function () { return PD.list([PD.row({ thumb: 'md', title: '로마서 강해 12', sub: '조정표 담임목사 · 2026-09-27', to: '#' }), PD.row({ icon: I.bell, title: '추수감사주일 안내', sub: '10/18(주일) 전교인 예배', to: '#' })]); } },
      { name: 'tiles', desc: '교인 바로가기 타일', preview: function () { return PD.tiles([{ ic: I.doc, label: '주보', to: '#' }, { ic: I.doc, label: '설교', to: '#' }], 'cols-2'); } },
      { name: 'feature', desc: '피처 카드(이번 주 설교)', preview: function () { return PD.feature('이번 주 설교 · 로마서 강해 12', '조정표 담임목사 · 주일 10:00 · YouTube', '#'); } },
    ]},
    { group: '배너·칩·상태', items: [
      { name: 'banner', desc: '배너(라이브·격리 안내)', preview: function () { return PD.banner('주일 라이브 예배 진행 중 · 지금 보기', 'pd-accent', '#') + PD.banner('교회 데이터는 서로 분리됩니다(테넌트 격리)', 'pd-soft'); } },
      { name: 'chips', desc: '칩(설교 시리즈 필터)', preview: function () { return PD.chips(['전체', '로마서', '청년', '특별']); } },
      { name: 'segment', desc: '세그먼트 탭(주보 주차)', preview: function () { return PD.segment(['이번 주', '지난 주']); } },
      { name: 'doneState', desc: '완료 상태(개설 신청)', preview: function () { return PD.doneState('교회 개설 신청을 접수했어요', '훌메이트 승인 대기 중'); } },
      { name: 'emptyState', desc: '빈 상태', preview: function () { return PD.emptyState(I.doc, '아직 등록된 설교가 없어요', '관리자 콘솔에서 설교를 등록하세요'); } },
    ]},
    { group: '폼·버튼', items: [
      { name: 'field / textarea', desc: '입력 필드(교회 개설·설정)', preview: function () { return PD.form([PD.field('교회명', '○○교회'), PD.field('담당자 휴대전화', '010-0000-0000'), PD.textarea('교회 소개', '우리 교회를 소개해 주세요 (교회 확인 후 게재)')]); } },
      { name: 'check / toggle', desc: '약관 동의·Web Push 토글', preview: function () { return PD.check('이용약관·개인정보처리방침에 동의합니다 (필수)') + PD.list([PD.row({ title: 'Web Push 알림 수신', trail: PD.toggle(true), chev: false })]); } },
      { name: 'btn / ctaBar', desc: '버튼·하단 CTA', preview: function () { return PD.btn('교회 개설 신청', 'primary') + PD.btnInline('가격 보기', 'secondary') + PD.ctaBar(PD.btn('서비스 오픈(OPEN)', 'primary')); } },
    ]},
    { group: '콘텐츠·법적', items: [
      { name: 'legalDoc', desc: '약관·개인정보처리방침', preview: function () { return PD.legalDoc('개인정보처리방침', PD.secHead('1. 최소 수집') + PD.text('이름·휴대전화·이메일·교회·가입상태만 수집합니다. (교회 확인 후 게재)')); } },
      { name: 'heroBlock', desc: '교회 공개홈 히어로', preview: function () { return PD.heroBlock('"온 땅에 천국 복음을 전하는 교회"'); } },
    ]},
    { group: '관리자(데스크톱)', items: [
      { name: 'kpi', desc: 'KPI 통계(관리자 대시보드)', preview: function () { return PD.kpi([['전체 회원', '128', '+4'], ['이번 주 설교', '2', '라이브 1'], ['가입 승인대기', '3', '확인 필요']]); } },
      { name: 'table', desc: '데이터 테이블(회원 승인)', preview: function () { return PD.table(['이름', '상태', '처리'], [['김성도', '승인대기', PD.btnInline('승인', 'primary')]]); } },
      { name: 'wpanel', desc: '작업 패널(알림 발송)', preview: function () { return PD.wpanel('알림 발송(Web Push)', PD.table(['대상', '내용', '상태'], [['전체회원', '추수감사주일 안내', '예약']])); } },
    ]},
  ];
})();
