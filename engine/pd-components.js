/* ═══════════════════════════════════════════════════════════════════
 * PlanDeck 공통 컴포넌트 라이브러리 (마크업 SSOT)
 * ───────────────────────────────────────────────────────────────────
 * 피그마의 '디자인 컴포넌트'와 동일한 역할: 화면 요소를 여기서 '정의'하고
 * 각 화면은 이 컴포넌트를 '가져다 조립'한다. 컴포넌트 1개를 수정하면
 * 그 컴포넌트를 쓰는 전 화면·전 프로젝트가 한꺼번에 바뀐다.
 *
 * 스타일 SSOT = engine/plandeck-ui.css  (여기 = 구조/마크업 SSOT)
 * 사용처:
 *   - Node 제너레이터:  const C = require('…/engine/pd-components.js'); C.row({…})
 *   - 브라우저 카탈로그: window.PD.row({…})  (컴포넌트 라이브러리 뷰에서 미리보기)
 * 규칙: 인라인 1회성 마크업 금지. 새 요소가 필요하면 '여기에 컴포넌트로 추가'하고 재사용.
 * ═══════════════════════════════════════════════════════════════════ */
(function (root, factory) {
  var api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;       // Node(제너레이터)
  if (typeof window !== 'undefined') { window.PD = api; window.PDK_COMPONENTS = api; } // 브라우저(카탈로그)
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // ── 아이콘(아웃라인 SVG) — 디자인 토큰 ──
  var P = function (d, sw) { return '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (sw || 1.7) + '" stroke-linecap="round" stroke-linejoin="round">' + d + '</svg>'; };
  var ICON = {
    back: P('<path d="M15 18l-6-6 6-6"/>', 1.9),
    chev: '<svg class="pd-chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 6l6 6-6 6"/></svg>',
    bell: P('<path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0"/>'),
    search: P('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>', 1.9),
    home: P('<path d="M3 11l9-8 9 8M5 10v10h14V10"/>', 2),
    user: P('<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/>'),
    usercircle: P('<circle cx="12" cy="8" r="3.6"/><path d="M5 20c0-3.3 3-5 7-5s7 1.7 7 5"/>'),
    heart: P('<path d="M12 20s-7-4.6-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.4-7 10-7 10z"/>'),
    chat: P('<path d="M21 12a8 8 0 01-11.6 7.1L4 20l1-5A8 8 0 1121 12z"/>'),
    store: P('<path d="M4 9l1-5h14l1 5M5 9v11h14V9M4 9h16"/>'),
    calendar: P('<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/>'),
    won: P('<path d="M4 6l3 11 5-9 5 9 3-11M3 10h18"/>'),
    doc: P('<path d="M7 3h7l4 4v14H7zM14 3v4h4"/>'),
    shield: P('<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>'),
    cog: P('<circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 00-.1-1l2-1.5-2-3.4-2.3 1a7 7 0 00-1.7-1L16.5 2h-4l-.4 2.6a7 7 0 00-1.7 1l-2.3-1-2 3.4L8 10.9a7 7 0 000 2l-2 1.6 2 3.4 2.3-1a7 7 0 001.7 1l.4 2.6h4l.4-2.6a7 7 0 001.7-1l2.3 1 2-3.4-2-1.6c.1-.3.1-.6.1-1z"/>'),
    plus: P('<path d="M12 5v14M5 12h14"/>', 2),
    edit: P('<path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/>'),
    phone: P('<path d="M5 4h4l2 5-3 2a12 12 0 005 5l2-3 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>'),
    pin: P('<path d="M12 21s-7-6.3-7-11a7 7 0 1114 0c0 4.7-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>'),
    map: P('<path d="M9 4L4 6v14l5-2 6 2 5-2V4l-5 2-6-2z"/><path d="M9 4v14M15 6v14"/>'),
    hand: P('<path d="M7 12V7a1.4 1.4 0 012.8 0v4M9.8 11V5.5a1.4 1.4 0 012.8 0V11M12.6 11V6.5a1.4 1.4 0 012.8 0V13c0 3-2 6-5.2 6-2 0-3.2-1-4.3-2.3L4 13l1.4-1.3z"/>'),
    bookmark: P('<path d="M6 3h12v18l-6-4-6 4z"/>'),
    sun: P('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.4 1.4M17.6 17.6L19 19M19 5l-1.4 1.4M6.4 17.6L5 19"/>'),
    alert: P('<path d="M12 9v4M12 17h.01M10.3 3.9L2 18a1.5 1.5 0 001.3 2.2h17.4A1.5 1.5 0 0022 18L13.7 3.9a1.5 1.5 0 00-3.4 0z"/>'),
    star: P('<path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z"/>'),
    clock: P('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    play: P('<path d="M5 4h14v16l-7-3-7 3z"/>', 2),
    grid: P('<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="11" width="7" height="10" rx="1.5"/><rect x="3" y="15" width="7" height="6" rx="1.5"/>'),
    members: P('<circle cx="9" cy="8" r="3.4"/><path d="M3 20c0-3.3 2.7-5 6-5s6 1.7 6 5"/><path d="M17 11a3 3 0 100-6"/>'),
    chart: P('<path d="M4 19V5M4 19h16M8 15l3-4 3 2 4-6"/>'),
    building: P('<rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h6v6"/>'),
    book: P('<path d="M4 5a2 2 0 012-2h12v16H6a2 2 0 00-2 2V5zM18 3v18"/>'),
    qr: P('<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><path d="M14 14h2v2M18 14v6M14 18h2"/>'),
    globe: P('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>'),
    briefcase: P('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 12h18"/>'),
    badgeCheck: P('<path d="M12 3l2.2 1.6 2.7-.2 1 2.5 2.3 1.4-.6 2.7.6 2.7-2.3 1.4-1 2.5-2.7-.2L12 21l-2.2-1.6-2.7.2-1-2.5L3.8 15.7l.6-2.7-.6-2.7 2.3-1.4 1-2.5 2.7.2z"/><path d="M9 12l2 2 4-4"/>'),
  };

  // ── 코어: href 있으면 <a>, 없으면 fallback 태그 ──
  function tag(href, cls, inner, fallbackTag, extra) {
    if (href) return '<a class="' + cls + '" href="' + href + '"' + (extra || '') + '>' + inner + '</a>';
    var ft = fallbackTag || 'button';
    var attr = ft === 'button' ? ' type="button"' : '';
    return '<' + ft + ' class="' + cls + '"' + attr + (extra || '') + '>' + inner + '</' + ft + '>';
  }

  // ── 네비/헤더 컴포넌트 ──
  function iconbtn(ic, cls, to) { return tag(to, 'pd-iconbtn' + (cls ? ' ' + cls : ''), ic); }
  function apptop(title, action) { return '<div class="pd-apptop"><div class="pd-apptop-title">' + title + '</div>' + (action || '') + '</div>'; }
  function appbar(title, action, backTo, homeHref) {
    var back = backTo
      ? '<a class="pd-ab-btn pd-back" href="' + backTo + '">' + ICON.back + '</a>'
      : '<a class="pd-ab-btn pd-back" href="#" onclick="if(history.length>1){history.back()}else{location.href=\'' + (homeHref || 'index.html') + '\'}return false;">' + ICON.back + '</a>';
    return '<header class="pd-appbar">' + back + '<div class="pd-ab-title">' + title + '</div>' + (action || '<span class="pd-ab-spacer"></span>') + '</header>';
  }
  function appBody(inner) { return '<div class="pd-app-body">' + inner + '</div>'; }
  function safeTop() { return '<div class="pd-safe-top"></div>'; }
  // 하단 탭바 — tabs=[[label, icon, href],…], active=인덱스
  function tabbar(tabs, active) { return '<nav class="pd-tabbar">' + tabs.map(function (x, i) { return '<a class="pd-tab' + (i === active ? ' is-active' : '') + '" href="' + x[2] + '">' + x[1] + x[0] + '</a>'; }).join('') + '</nav>'; }

  // ── 섹션/텍스트 컴포넌트 ──
  function secHead(t, more, moreTo) { return more ? '<div class="pd-sec-head"><div class="pd-section-title">' + t + '</div>' + (moreTo ? '<a class="pd-sec-more" href="' + moreTo + '">' + more + '</a>' : '<span class="pd-sec-more">' + more + '</span>') + '</div>' : '<div class="pd-section-title">' + t + '</div>'; }
  function divider() { return '<div class="pd-divider"></div>'; }
  function text(t) { return '<div class="pd-wf-text">' + t + '</div>'; }
  function label(t) { return '<div class="pd-wf-label">' + t + '</div>'; }
  function hero(variant) { return '<div class="pd-hero-img' + (variant ? ' ' + variant : '') + '"></div>'; }

  // ── 배너/칩/세그먼트 컴포넌트 ──
  function banner(t, cls, to) { return to ? '<a class="pd-banner' + (cls ? ' ' + cls : '') + '" href="' + to + '">' + t + '</a>' : '<div class="pd-banner' + (cls ? ' ' + cls : '') + '">' + t + '</div>'; }
  function chips(arr) { return '<div class="pd-chips">' + arr.map(function (c, i) { return '<span class="pd-chip' + (i === 0 ? ' is-active' : '') + '">' + c + '</span>'; }).join('') + '</div>'; }
  function segment(arr, act) { return '<div class="pd-segment">' + arr.map(function (s, i) { return '<div' + (i === (act == null ? 0 : act) ? ' class="is-active"' : '') + '>' + s + '</div>'; }).join('') + '</div>'; }
  function toolbar(inner) { return '<div class="pd-toolbar">' + inner + '</div>'; }
  function searchbar(ph) { return '<div class="pd-searchbar">' + ICON.search + (ph || '검색') + '</div>'; }

  // ── 버튼 컴포넌트 ──
  function btn(t, kind, cls, to) { return tag(to, 'pd-btn ' + (kind || 'primary') + ' block' + (cls ? ' ' + cls : ''), t); }
  function btnInline(t, kind, cls, to) { return tag(to, 'pd-btn ' + (kind || 'primary') + (cls ? ' ' + cls : ''), t); }
  function ctaBar(inner) { return '<div class="pd-cta-bar">' + inner + '</div>'; }
  function callBtn(t, tel) { return '<a class="pd-btn danger block pd-call-btn" href="tel:' + tel + '">' + ICON.phone + t + '</a>'; }

  // ── 리스트/행/타일/카드 컴포넌트 ──
  function row(o) { // {icon, avatar, thumb, title, badge, sub, chev, trail, cls, to}
    var lead = o.avatar ? '<div class="pd-avatar">' + (o.avatar === true ? ICON.usercircle : o.avatar) + '</div>'
      : o.thumb ? '<div class="pd-thumb ' + (o.thumb) + '"></div>'
      : o.icon ? '<div class="pd-row-icon">' + o.icon + '</div>' : '';
    var main = '<div class="pd-row-main"><div class="pd-row-title">' + o.title + (o.badge ? ' <span class="pd-badge">' + o.badge + '</span>' : '') + '</div>' + (o.sub ? '<div class="pd-row-sub">' + o.sub + '</div>' : '') + '</div>';
    var trail = o.trail ? '<div class="pd-row-trail">' + o.trail + '</div>' : (o.chev !== false ? ICON.chev : '');
    return tag(o.to, 'pd-row' + (o.cls ? ' ' + o.cls : ''), lead + main + trail);
  }
  function list(rows, cls) { return '<div class="pd-list' + (cls ? ' ' + cls : '') + '">' + rows.join('') + '</div>'; }
  function tiles(items, cols, cls) {
    return '<div class="pd-tiles' + (cols ? ' ' + cols : '') + (cls ? ' ' + cls : '') + '">' + items.map(function (it) {
      var inner = '<div class="pd-tile-ic' + (it.sq ? ' square' : '') + '">' + it.ic + '</div><div class="pd-tile-lbl">' + it.label + '</div>';
      return tag(it.to, 'pd-tile' + (it.cls ? ' ' + it.cls : ''), inner, 'div');
    }).join('') + '</div>';
  }
  function feature(title, sub, to, cls) { return tag(to, 'pd-feature' + (cls ? ' ' + cls : ''), hero() + '<div class="pd-row-title">' + title + '</div><div class="pd-row-sub">' + sub + '</div>'); }

  // ── 폼 컴포넌트 ──
  function field(labelT, ph) { return '<div class="pd-field"><label class="pd-field-label">' + labelT + '</label><div class="pd-input ph">' + (ph || '') + '</div></div>'; }
  function fieldChips(labelT, arr) { return '<div class="pd-field"><label class="pd-field-label">' + labelT + '</label>' + chips(arr) + '</div>'; }
  function textarea(labelT, ph) { return '<div class="pd-field"><label class="pd-field-label">' + labelT + '</label><div class="pd-textarea">' + (ph || '') + '</div></div>'; }
  function check(t, cls) { return '<label class="pd-check' + (cls ? ' ' + cls : '') + '"><span class="box"></span>' + t + '</label>'; }
  function toggle(on) { return '<label class="pd-toggle' + (on ? ' is-on' : '') + '"><span></span></label>'; }
  function form(fields, cls) { return '<form class="pd-form' + (cls ? ' ' + cls : '') + '">' + fields.join('') + '</form>'; }
  function commentBar(ph, btnLabel) { return '<div class="pd-comment-bar"><div class="pd-input ph">' + (ph || '입력') + '</div>' + btnInline(btnLabel || '등록', 'primary') + '</div>'; }

  // ── 상태/패턴 컴포넌트(기존 인라인 → 정식 컴포넌트화) ──
  // 완료/성공 상태 블록
  function doneState(title, sub) { return '<div class="pd-done">' + hero('square') + '<div class="pd-wf-title">' + title + '</div>' + (sub ? '<div class="pd-wf-text">' + sub + '</div>' : '') + '</div>'; }
  // 중앙 히어로(로고+문구)
  function heroBlock(caption) { return '<div class="pd-hero">' + hero('square') + (caption ? '<div class="pd-wf-text pd-hero-cap">' + caption + '</div>' : '') + '</div>'; }
  // 빈 상태
  function emptyState(icon, title, sub) { return '<div class="pd-empty-state"><div class="pd-row-icon">' + (icon || ICON.doc) + '</div><div class="pd-wf-title">' + title + '</div>' + (sub ? '<div class="pd-wf-text">' + sub + '</div>' : '') + '</div>'; }
  // 법적 문서 본문(약관·방침)
  function legalDoc(title, inner) { return '<div class="pd-legal"><div class="pd-wf-title">' + title + '</div>' + inner + '</div>'; }
  // 채팅 로그 + 말풍선
  function bubble(t, dir) { return '<div class="pd-bubble ' + (dir || 'in') + '">' + t + '</div>'; }
  function chatLog(bubbles) { return '<div class="pd-chatlog">' + bubbles.join('') + '</div>'; }
  // 중앙 히어로 카드(지갑 잔액·프로필 등) — lead=hero('square') 또는 아이콘
  function heroCard(title, sub, lead) { return '<div class="pd-herocard">' + (lead || hero('square')) + '<div class="pd-wf-title">' + title + '</div>' + (sub ? '<div class="pd-wf-text">' + sub + '</div>' : '') + '</div>'; }
  // 시그널 카드(해바라기 배려요청 + QR 토큰)
  function signalCard(title, body, token) { return '<div class="pd-signal-card">' + ICON.sun + '<div class="pd-wf-title">' + title + '</div><div class="pd-wf-text">' + body + '</div>' + hero('square') + (token ? '<div class="pd-wf-label">' + token + '</div>' : '') + '</div>'; }
  // 플로팅 액션 버튼(FAB) — inner=내용, to=이동
  function fab(inner, to, cls) { return '<a class="pd-fab' + (cls ? ' ' + cls : '') + '" href="' + to + '"><span>' + inner + '</span></a>'; }
  // 진행 단계 표시(온보딩·심사 파이프라인). items=단계명[], current=현재 인덱스(0-base)
  function stepper(items, current) {
    return '<div class="pd-stepper">' + items.map(function (s, i) {
      var st = i < current ? ' is-done' : i === current ? ' is-active' : '';
      return '<div class="pd-step' + st + '"><span class="pd-step-dot">' + (i < current ? '✓' : (i + 1)) + '</span><span class="pd-step-label">' + s + '</span></div>';
    }).join('') + '</div>';
  }

  // ── 관리자(데스크톱) 셸 컴포넌트 ──
  function gnb(logo, menu, active) {
    return '<header class="pd-gnb"><span class="logo">' + logo + '</span><nav class="menu">' + menu.map(function (m) {
      if (Array.isArray(m)) return '<a' + (m[0] === active ? ' class="is-active"' : '') + ' href="' + m[1] + '">' + m[0] + '</a>';
      return '<a' + (m === active ? ' class="is-active"' : '') + '>' + m + '</a>';
    }).join('') + '</nav><div class="gnb-right"><div class="pd-iconbtn circle">' + ICON.user + '</div></div></header>';
  }
  function sidebar(items) {
    return '<aside class="pd-sidebar">' + items.map(function (s) {
      if (s.group) return '<div class="nav-group-label">' + s.group + '</div>';
      var inner = (s.ic || ICON.grid) + s.label + (s.badge ? '<span class="pd-badge">' + s.badge + '</span>' : '');
      return tag(s.to, 'nav-item' + (s.active ? ' is-active' : '') + (s.cls ? ' ' + s.cls : ''), inner, 'div');
    }).join('') + '</aside>';
  }
  function pagehead(crumb, title, action) { return '<div class="pd-pagehead"><div><div class="pd-breadcrumb">' + crumb + '</div><div class="pd-wf-title">' + title + '</div></div>' + (action ? '<div class="pd-pagehead-actions">' + action + '</div>' : '') + '</div>'; }
  function kpi(cells) { return '<div class="pd-kpi pd-cardgrid">' + cells.map(function (c) { return '<div class="pd-stat"><div class="lbl">' + c[0] + '</div><div class="num">' + c[1] + '</div><div class="delta">' + (c[2] || '') + '</div></div>'; }).join('') + '</div>'; }
  function wpanel(head, inner, cls) { return '<div class="pd-wpanel' + (cls ? ' ' + cls : '') + '"><div class="pd-wpanel-head">' + head + '</div>' + inner + '</div>'; }
  function table(cols, rows, cls) { return '<table class="pd-table' + (cls ? ' ' + cls : '') + '"><thead><tr>' + cols.map(function (c) { return '<th>' + c + '</th>'; }).join('') + '</tr></thead><tbody>' + rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table>'; }
  function badge(t, cls) { return '<span class="pd-badge' + (cls ? ' ' + cls : '') + '">' + t + '</span>'; }

  var api = {
    ICON: ICON, P: P, tag: tag,
    iconbtn: iconbtn, apptop: apptop, appbar: appbar, appBody: appBody, safeTop: safeTop, tabbar: tabbar,
    secHead: secHead, divider: divider, text: text, label: label, hero: hero,
    banner: banner, chips: chips, segment: segment, toolbar: toolbar, searchbar: searchbar,
    btn: btn, btnInline: btnInline, ctaBar: ctaBar, callBtn: callBtn,
    row: row, list: list, tiles: tiles, feature: feature,
    field: field, fieldChips: fieldChips, textarea: textarea, check: check, toggle: toggle, form: form, commentBar: commentBar,
    doneState: doneState, heroBlock: heroBlock, emptyState: emptyState, legalDoc: legalDoc, bubble: bubble, chatLog: chatLog, heroCard: heroCard, signalCard: signalCard, fab: fab, stepper: stepper,
    gnb: gnb, sidebar: sidebar, pagehead: pagehead, kpi: kpi, wpanel: wpanel, table: table, badge: badge,
  };

  // ── 카탈로그 메타(컴포넌트 라이브러리 뷰가 이 목록으로 미리보기 렌더) ──
  api.CATALOG = [
    { group: '네비게이션', items: [
      { name: 'appbar', desc: '상단 바(뒤로·제목·액션)', preview: function () { return appbar('화면 제목', iconbtn(ICON.bell), 'index.html'); } },
      { name: 'apptop', desc: '앱 상단 타이틀', preview: function () { return apptop('도담', iconbtn(ICON.bell)); } },
      { name: 'tabbar', desc: '하단 탭바', preview: function () { return tabbar([['홈', ICON.home, '#'], ['매장', ICON.store, '#'], ['마이', ICON.user, '#']], 0); } },
      { name: 'searchbar', desc: '검색 입력', preview: function () { return searchbar('안심매장 검색'); } },
    ] },
    { group: '리스트·카드', items: [
      { name: 'row', desc: '목록 행(아이콘/썸네일/아바타·제목·부제·트레일)', preview: function () { return list([row({ thumb: 'md', title: '숲속 감각친화 카페', sub: 'Gold · 일산동구', to: '#' }), row({ icon: ICON.won, title: '지갑', sub: '코인 40', to: '#' })]); } },
      { name: 'tiles', desc: '타일 그리드', preview: function () { return tiles([{ ic: ICON.map, label: '갈 곳', to: '#' }, { ic: ICON.hand, label: '맡기기', to: '#' }], 'cols-2'); } },
      { name: 'feature', desc: '피처 카드(히어로+제목)', preview: function () { return feature('처음 가는 병원 준비하기', '매거진 · 5분', '#'); } },
    ] },
    { group: '배너·칩·상태', items: [
      { name: 'banner', desc: '배너(accent/soft/warn)', preview: function () { return banner('우리 아이 맞춤 돌보미 찾기', 'pd-accent', '#') + banner('🔒 민감정보 기본 비공개', 'pd-soft') + banner('⚠️ 비진단 안내', 'pd-warn'); } },
      { name: 'chips', desc: '칩(필터·선택)', preview: function () { return chips(['6축', '유형', '거리', '등급']); } },
      { name: 'segment', desc: '세그먼트 탭', preview: function () { return segment(['안심매장', '전체']); } },
      { name: 'doneState', desc: '완료 상태', preview: function () { return doneState('예약을 요청했어요', '수락 대기 중'); } },
      { name: 'emptyState', desc: '빈 상태', preview: function () { return emptyState(ICON.doc, '내역이 없어요', '첫 활동을 시작해보세요'); } },
    ] },
    { group: '폼·버튼', items: [
      { name: 'field / fieldChips / textarea', desc: '입력 필드', preview: function () { return form([field('이메일', 'parent@dodam.test'), fieldChips('유형', ['언어', '감각', '지적']), textarea('메모', '요청 내용')]); } },
      { name: 'check / toggle', desc: '동의·토글', preview: function () { return check('민감정보 처리에 동의합니다 (필수)') + list([row({ title: '푸시 알림', trail: toggle(true), chev: false })]); } },
      { name: 'btn / ctaBar / callBtn', desc: '버튼·하단 CTA·전화', preview: function () { return btn('기본 버튼', 'primary') + btnInline('보조', 'secondary') + ctaBar(btn('하단 CTA', 'primary')) + callBtn('119 전화', '119'); } },
    ] },
    { group: '콘텐츠·채팅·법적', items: [
      { name: 'chatLog / bubble', desc: '상담 채팅', preview: function () { return chatLog([bubble('무엇이 궁금하세요?', 'in'), bubble('언어가 느린 것 같아요', 'out')]); } },
      { name: 'legalDoc', desc: '약관·방침 본문', preview: function () { return legalDoc('개인정보 처리방침', secHead('1. 최소 수집') + text('선택·별도 동의 항목')); } },
      { name: 'heroBlock', desc: '중앙 히어로', preview: function () { return heroBlock('발달장애 가족의 동행자, 도담'); } },
    ] },
    { group: '관리자(데스크톱)', items: [
      { name: 'kpi', desc: 'KPI 통계', preview: function () { return kpi([['부모', '1,204', '+8%'], ['인증매장', '86', '+3'], ['진행예약', '42', '']]); } },
      { name: 'table', desc: '데이터 테이블', preview: function () { return table(['이름', '상태', '처리'], [['이○○', '대기', btnInline('승인', 'primary')]]); } },
      { name: 'wpanel', desc: '작업 패널', preview: function () { return wpanel('신고된 게시물', table(['유형', '내용', '처리'], [['커뮤니티', '스팸 글', btnInline('숨김', 'primary')]])); } },
    ] },
  ];

  return api;
});
