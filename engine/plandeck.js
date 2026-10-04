/* ═══════════════════════════════════════════════════════════════════
 * PlanDeck 엔진 확장 (engine/plandeck.js)
 * PDK 코어(common.js)를 건드리지 않고 "가산"으로 얹는 레이어.
 *   - CASES 패널(경우의 수 상태 커버리지 그리드 + 상태전이표 + GWT)
 *   - INTERFACE 패널(개발 인터페이스: reads/writes/events + 엔티티 참조 + 계약 JSON 복사)
 *   - 상태 칩(draft→ready-for-dev) + "승인 후 변경됨" 자동 감지(contentHash)
 *   - 멀티서피스: 현재 화면의 서피스에 맞는 디바이스로 재적용
 *   - 무결성 린트 배너(중복 ID·미연결 flow.to·상태 커버리지 결손)
 *   - PRD 표지/문서 렌더(index/prd 페이지)
 * common.js 의 init(동기) 직후에 실행되도록 setTimeout(0)/DOMContentLoaded 로 뒤에 붙는다.
 * 순수 바닐라 JS — 외부 라이브러리 의존 없음.
 * ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var SCREENS = Array.isArray(window.PLANDECK_SCREENS) ? window.PLANDECK_SCREENS
             : (Array.isArray(window.PDK_SCREENS) ? window.PDK_SCREENS : []);
  var PROJECT  = window.PLANDECK_PROJECT || window.PDK_PROJECT || {};
  var DEVICES  = window.PLANDECK_DEVICES || window.PDK_DEVICES || {};
  var ENTITIES = window.PLANDECK_ENTITIES || window.PDK_ENTITIES || {};

  // 고정 상태 enum (완결성 커버리지 기준)
  var SCREEN_STATES = ['초기', '로딩', '정상', '빈데이터', '에러', '권한없음', '엣지'];
  var VALIDATION_STATES = ['필수누락', '형식오류', '범위경계', '중복충돌', '유효'];

  // ── 유틸 ──────────────────────────────────────────────
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function flatPages() {
    var out = [];
    SCREENS.forEach(function (c) { (c.pages || []).forEach(function (p) { out.push(p); }); });
    return out;
  }
  // ── Export 유틸 (CSV: 엑셀 한글 BOM / PDF: 인쇄) ──
  function csvEscape(s) { s = String(s == null ? '' : s); return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; }
  function downloadCSV(filename, rows) {
    var csv = '﻿' + rows.map(function (r) { return r.map(csvEscape).join(','); }).join('\r\n');
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = filename;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1500);
  }
  function exportName(kind) { return ((PROJECT.name || 'project').replace(/\s+/g, '') ) + '_' + kind + '.csv'; }
  function currentKey() {
    if (window.PLANDECK_CURRENT) return window.PLANDECK_CURRENT;
    if (window.PDK_CURRENT) return window.PDK_CURRENT;
    var path = location.pathname.split('/').pop();
    var file = (!path) ? 'index.html' : path;
    return file + location.search;
  }
  function findCurrentPage() {
    var cur = currentKey(), file = cur.split('?')[0], byFile = null;
    var pages = flatPages();
    for (var i = 0; i < pages.length; i++) {
      var p = pages[i];
      if (p.href === cur) return p;
      if (!byFile && String(p.href).split('/').pop().split('?')[0] === file.split('/').pop()) byFile = p;
    }
    return byFile;
  }
  function screenEl() {
    var ds = document.querySelector('.device-screen');
    return ds ? ds.firstElementChild : null;
  }
  // common.js 와 동일한 hover dim/highlight 메커니즘 재사용
  function bindHover(li, selector) {
    if (!selector) return;
    li.addEventListener('mouseenter', function () {
      var screen = screenEl();
      var target = screen && screen.querySelector(selector);
      if (!screen || !target) return;
      li.classList.add('is-active');
      screen.classList.add('is-dimming');
      target.classList.add('is-highlighted');
      var pr = target.parentElement;
      while (pr && pr !== screen) { pr.classList.add('contains-highlight'); pr = pr.parentElement; }
    });
    li.addEventListener('mouseleave', function () {
      li.classList.remove('is-active');
      var screen = screenEl();
      if (!screen) return;
      screen.classList.remove('is-dimming');
      screen.querySelectorAll('.is-highlighted').forEach(function (e) { e.classList.remove('is-highlighted'); });
      screen.querySelectorAll('.contains-highlight').forEach(function (e) { e.classList.remove('contains-highlight'); });
    });
  }
  function copyToClipboard(text, btn) {
    var done = function () { if (btn) { var t = btn.textContent; btn.textContent = '복사됨 ✓'; setTimeout(function () { btn.textContent = t; }, 1200); } };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, done);
    else { try { var ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); done(); } catch (e) {} }
  }
  // 간단한 결정론 해시(djb2) — 상태 동결/변경 감지용
  function hashOf(obj) {
    var s = JSON.stringify(obj || {}), h = 5381;
    for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
    return 'h' + h.toString(36);
  }
  function specHash(p) {
    return hashOf({ d: p.description || [], c: p.cases || [], i: p.interface || {}, f: (p.flow && p.flow.to) || [], co: p.components || [] });
  }

  // 엔티티 별칭 '{entities.Order}' 해석
  function resolveRef(ref) {
    if (!ref) return null;
    var m = String(ref).match(/^\{entities\.([A-Za-z0-9_]+)\}$/);
    if (m && ENTITIES[m[1]]) return { name: m[1], entity: ENTITIES[m[1]] };
    return { name: null, raw: String(ref) };
  }
  function refLabel(ref) {
    var r = resolveRef(ref);
    if (!r) return '—';
    return r.name ? (r.entity.name ? (r.entity.name + ' (' + r.name + ')') : r.name) : r.raw;
  }

  // ═══ 0. 통일 글로벌 네비게이션 (전 페이지 공통 이동) ═══
  // 문서형 페이지(개요·PRD·플로우·상세기획서·핸드오프)와 디바이스 화면에서
  // 동일한 링크 세트로 어디서든 필요한 페이지로 점프. active 키는 현재 위치 강조용.
  var DOC_LINKS = [
    { key: 'workspace', href: '../../index.html', label: '⌂ 워크스페이스' },
    { key: 'guide',     href: '../../guide.html', label: '📖 가이드' },
    { key: 'overview',  href: 'index.html',        label: '개요' },
    { key: 'prd',       href: 'prd.html',           label: 'PRD' },
    { key: 'ia',        href: 'ia.html',            label: '🗂 IA(정보구조)' },
    { key: 'features',  href: 'features.html',      label: '⚙ 기능정의서' },
    { key: 'flows',     href: 'flows.html',         label: '🧭 User Flow' },
    { key: 'spec',      href: 'spec.html',          label: '상세 기획서' },
    { key: 'components', href: 'components.html',    label: '🧩 컴포넌트' },
    { key: 'handoff',   href: 'handoff.html',       label: '핸드오프' },
  ];
  function navLinksHtml(active) {
    return DOC_LINKS.map(function (l) {
      if (l.key === active) return '<span class="pd-nav-link is-current">' + esc(l.label) + '</span>';
      return '<a class="pd-nav-link" href="' + l.href + '">' + esc(l.label) + '</a>';
    }).join('');
  }
  // 프로젝트 내 버전(브랜치) 스위처 — PROJECT.versions 가 2개 이상이면 드롭다운, 아니면 정적 배지(또는 생략)
  function versionSwitcher(opts) {
    opts = opts || {};
    var vs = PROJECT.versions || [];
    if (vs.length < 2) return (opts.fallbackBadge && PROJECT.version) ? '<span class="pd-side-ver">v' + esc(PROJECT.version) + '</span>' : '';
    var cur = vs.filter(function (x) { return x.current; })[0] || vs[0];
    var items = vs.map(function (x) {
      return '<a class="pd-ver-dd-item' + (x.id === cur.id ? ' is-current' : '') + '" href="' + esc(x.path) + 'index.html">v' + esc(x.id) +
        (x.label ? '<span class="pd-ver-dd-tag">' + esc(x.label) + '</span>' : '') + '</a>';
    }).join('');
    return '<details class="pd-ver-dd"><summary class="pd-ver-dd-cur">⎇ v' + esc(cur.id) + '</summary>' +
      '<div class="pd-ver-dd-menu"><div class="pd-ver-dd-head">버전(브랜치)</div>' + items + '</div></details>';
  }
  // 문서형 페이지 상단 고정 네비(.pd-prd-nav). extra = 페이지별 특화 액션(예: 인쇄·PRD.md 원본).
  function docNav(active, extra) {
    return '<nav class="pd-prd-nav">' + navLinksHtml(active) + (extra || '') + '</nav>';
  }
  // 작업 콘솔 앱 셸 — 좌측 세로 사이드바(네비+프로젝트정보+액션) + 넓은 본문.
  // 문서형 페이지(개요/PRD/플로우/상세기획서/핸드오프)가 공유해 가로 폭을 최대 활용한다.
  function sideNavLinks(active) {
    return DOC_LINKS.filter(function (l) { return l.key !== 'workspace'; }).map(function (l) {
      return '<a class="pd-side-link' + (l.key === active ? ' is-current' : '') + '" href="' + l.href + '">' + esc(l.label) + '</a>';
    }).join('');
  }
  // iframe 지연 로드(뷰포트 근처 진입 시만 src 주입) — 플로우 썸네일 수십 개 동시 부팅 방지
  function lazyLoadIframes(root) {
    var ifr = [].slice.call((root || document).querySelectorAll('iframe[data-src]'));
    if (!ifr.length) return;
    if (!('IntersectionObserver' in window)) { ifr.forEach(function (f) { f.src = f.getAttribute('data-src'); f.removeAttribute('data-src'); }); return; }
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) { if (e.isIntersecting) { var f = e.target; f.src = f.getAttribute('data-src'); f.removeAttribute('data-src'); io.unobserve(f); } });
    }, { rootMargin: '500px' });
    ifr.forEach(function (f) { io.observe(f); });
  }
  // 문서형 페이지 검색/필터 바(화면명·ID·서피스) — 화면이 많아질 때 즉시 찾기
  function docFilterBar(ph, extra) {
    return '<div class="pd-doc-filter"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3" stroke-linecap="round"/></svg>' +
      '<input type="search" placeholder="' + esc(ph || '화면명·ID·서피스 검색') + '" autocomplete="off">' +
      '<span class="pd-doc-filter-count"></span>' + (extra || '') + '</div>';
  }
  function wireDocFilter(root) {
    var box = root.querySelector('.pd-doc-filter'); if (!box) return null;
    var input = box.querySelector('input'); var count = box.querySelector('.pd-doc-filter-count');
    var items = [].slice.call(root.querySelectorAll('[data-search]'));
    function apply() {
      var q = input.value.trim().toLowerCase(); var shown = 0;
      items.forEach(function (it) { var hit = !q || it.getAttribute('data-search').indexOf(q) >= 0; it.style.display = hit ? '' : 'none'; if (hit) shown++; });
      root.querySelectorAll('.pd-cat-group').forEach(function (g) {
        var any = [].slice.call(g.querySelectorAll('[data-search]')).some(function (it) { return it.style.display !== 'none'; });
        g.style.display = any ? '' : 'none';
      });
      count.textContent = q ? (shown + '개 일치') : '';
    }
    input.addEventListener('input', apply);
    root.querySelectorAll('.pd-surf-chip').forEach(function (chip) {
      chip.addEventListener('click', function () { input.value = chip.getAttribute('data-surf') || ''; apply(); input.focus(); });
    });
    return apply;
  }
  function pageShell(active, bodyHtml, actionsHtml, docClass) {
    var dc = docClass || (active === 'flows' ? 'pd-flows-doc' : 'pd-prd-doc');
    return '<aside class="pd-sidenav">' +
      '<a class="pd-side-brand" href="../../index.html" title="워크스페이스로">PlanDeck</a>' +
      '<div class="pd-side-proj">' + esc(PROJECT.name || '프로젝트') +
        versionSwitcher({ fallbackBadge: true }) + '</div>' +
      '<nav class="pd-side-nav">' + sideNavLinks(active) + '</nav>' +
      (actionsHtml ? '<div class="pd-side-actions">' + actionsHtml + '</div>' : '') +
      '<a class="pd-side-ws" href="../../index.html">⌂ 워크스페이스</a>' +
      '</aside>' +
      '<main class="pd-main"><div class="pd-doc ' + dc + '">' + bodyHtml + '</div></main>';
  }
  // 디바이스 화면: 좌측 패널 최상단에 같은 네비를 주입(문서 페이지로 점프) — 레이아웃 충돌 없음
  function injectScreenTopnav() {
    if (document.querySelector('.pd-screen-topnav, .pd-floating-nav')) return;  // 중복 방지
    var nav = document.querySelector('.page-nav');
    if (nav) {
      var bar = document.createElement('div');
      bar.className = 'pd-screen-topnav';
      bar.innerHTML = '<span class="pd-topnav-caption">기획 문서로 이동</span><div class="pd-topnav-links">' + navLinksHtml('screen') + '</div>' + versionSwitcher();
      nav.insertBefore(bar, nav.firstChild);
    } else {  // page-nav가 없으면(엣지) 상단 중앙 플로팅으로 폴백
      var pill = document.createElement('nav');
      pill.className = 'pd-prd-nav pd-floating-nav';
      pill.innerHTML = navLinksHtml('screen');
      document.body.appendChild(pill);
    }
  }
  // 목업 상단 바(검토 모드 버튼 + 현재 화면 정보를 한 줄로) — 공용 컨테이너
  function ensureTopbar() {
    var tb = document.querySelector('.pd-topbar');
    if (!tb) { tb = document.createElement('div'); tb.className = 'pd-topbar'; document.body.appendChild(tb); }
    return tb;
  }

  // ═══ 1-d. 충실도(Fidelity) 승격 — 와이어프레임 ↔ 디자인(이미지) ↔ 프로토타입(임베드) ═══
  // Figma 연동 Phase1: screens.js 의 figma{image,prototype,hotspots} + fidelity 를 런타임에 반영.
  function figmaStages(page) {
    var s = ['wireframe'];
    if (page && page.figma && page.figma.image) s.push('design');
    if (page && page.figma && (page.figma.prototype || page.figma.embed)) s.push('prototype');
    return s;
  }
  function getFidelityPref() { try { return sessionStorage.getItem('pd-fidelity') || ''; } catch (e) { return ''; } }
  function setFidelityPref(v) { try { if (v) sessionStorage.setItem('pd-fidelity', v); else sessionStorage.removeItem('pd-fidelity'); } catch (e) {} }
  function effectiveFidelity(page) {
    // 기본은 '항상' 와이어프레임(피그마 연동 없이). 디자인/프로토타입은 사용자가 토글로 켤 때만(옵션).
    var stages = figmaStages(page), pref = getFidelityPref();
    try { var u = new URLSearchParams(location.search).get('fidelity'); if (u) pref = u; } catch (e) {}
    if (pref && stages.indexOf(pref) >= 0) return pref;   // 세션 토글 선택 / ?fidelity= 만 반영
    return 'wireframe';
  }
  function applyFidelity() {
    var page = findCurrentPage();
    var stage = document.querySelector('.device-stage');
    var screen = document.querySelector('.device-screen');
    if (!page || !stage || !screen) return;
    var eff = effectiveFidelity(page);
    stage.classList.remove('pd-fidelity-design', 'pd-fidelity-proto');
    var wrap = screen.querySelector('.pd-figma-img-wrap');
    var proto = screen.querySelector('.pd-figma-proto');
    if (eff === 'design' && page.figma && page.figma.image) {
      stage.classList.add('pd-fidelity-design');
      if (!wrap) {
        wrap = document.createElement('div'); wrap.className = 'pd-figma-img-wrap';
        var fw = (page.figma.imageW || 0), fh = (page.figma.imageH || 0);
        var hot = (page.figma.hotspots || []).map(function (h) {
          var r = h.rect || [0, 0, 0, 0];
          var pc = fw && fh ? ('left:' + (r[0] / fw * 100) + '%;top:' + (r[1] / fh * 100) + '%;width:' + (r[2] / fw * 100) + '%;height:' + (r[3] / fh * 100) + '%')
            : ('left:' + r[0] + 'px;top:' + r[1] + 'px;width:' + r[2] + 'px;height:' + r[3] + 'px');
          var tgt = byIdHref(h.to);
          return '<a class="pd-figma-hotspot" style="' + pc + '"' + (tgt ? ' href="' + esc(tgt) + '"' : '') + ' title="' + esc(h.to || '') + '"></a>';
        }).join('');
        wrap.innerHTML = '<img class="pd-figma-img" src="' + esc(page.figma.image) + '" alt="디자인">' + hot;
        screen.appendChild(wrap);
      } else wrap.style.display = '';
      if (proto) proto.style.display = 'none';
    } else if (eff === 'prototype' && page.figma && (page.figma.prototype || page.figma.embed)) {
      stage.classList.add('pd-fidelity-proto');
      if (!proto) {
        proto = document.createElement('iframe'); proto.className = 'pd-figma-proto';
        proto.setAttribute('loading', 'lazy'); proto.setAttribute('allowfullscreen', '');
        proto.src = page.figma.prototype || page.figma.embed;
        screen.appendChild(proto);
      } else proto.style.display = '';
      if (wrap) wrap.style.display = 'none';
    } else {
      if (wrap) wrap.style.display = 'none';
      if (proto) proto.style.display = 'none';
    }
  }
  function byIdHref(id) { var p = flatPages().filter(function (x) { return x.id === id; })[0]; return p ? p.href : null; }
  function injectFidelityToggle() {
    var page = findCurrentPage();
    if (!page) return;
    var stages = figmaStages(page);
    if (stages.length < 2) return;   // 전환할 게 없으면(와이어뿐) 생략
    var tb = ensureTopbar();
    if (tb.querySelector('.pd-fid-toggle')) return;
    var eff = effectiveFidelity(page);
    var labels = { wireframe: '와이어', design: '디자인', prototype: '프로토타입' };
    var seg = document.createElement('div'); seg.className = 'pd-fid-toggle'; seg.title = '이 화면을 볼 충실도';
    ['wireframe', 'design', 'prototype'].forEach(function (s) {
      if (s !== 'wireframe' && stages.indexOf(s) < 0) return;
      var btn = document.createElement('button'); btn.type = 'button'; btn.className = 'pd-fid-btn' + (s === eff ? ' is-on' : '');
      btn.textContent = labels[s];
      btn.addEventListener('click', function () {
        setFidelityPref(s); applyFidelity();
        seg.querySelectorAll('.pd-fid-btn').forEach(function (b) { b.classList.remove('is-on'); });
        btn.classList.add('is-on');
      });
      seg.appendChild(btn);
    });
    tb.appendChild(seg);
  }
  // 현재 화면 정보(타이틀·ID·Figma)를 좌측 패널에서 떼어 목업 상단(검토 모드 옆)에 표시
  function injectScreenMeta() {
    var page = findCurrentPage();
    if (!page) return;
    var tb = ensureTopbar();
    if (tb.querySelector('.pd-screen-meta')) return;  // 중복 방지
    var fig = page.figmaLink
      ? '<a class="pd-sm-figma" href="' + esc(page.figmaLink) + '" target="_blank" rel="noopener noreferrer">↗ Figma</a>'
      : '<span class="pd-sm-figma is-disabled" title="등록된 Figma 링크 없음">↗ Figma</span>';
    var meta = document.createElement('div');
    meta.className = 'pd-screen-meta';
    meta.innerHTML =
      '<span class="pd-sm-title">' + esc(page.label || '—') + '</span>' +
      (page.id ? '<span class="pd-sm-id' + (page.id === 'TBD' ? ' is-tbd' : '') + '">' + esc(page.id) + '</span>' : '') +
      fig;
    tb.appendChild(meta);
  }
  // 좌측 화면 목록 검색(페이지명·코드) — 화면이 많아질 때 빠르게 찾기
  function injectNavSearch() {
    var nav = document.querySelector('.page-nav');
    var scroll = document.querySelector('.page-nav-scroll');
    if (!nav || !scroll || nav.querySelector('.pd-nav-search')) return;
    // 각 행에 검색 텍스트(화면명+ID) 부여
    var byHref = {}; flatPages().forEach(function (p) { byHref[p.href] = p; });
    var rows = [].slice.call(scroll.querySelectorAll('.nav-row'));
    rows.forEach(function (r) {
      var p = byHref[r.getAttribute('data-href')] || {};
      r.setAttribute('data-search', ((p.label || '') + ' ' + (p.id || '')).toLowerCase());
    });
    var SEARCH = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3" stroke-linecap="round"/></svg>';
    var wrap = document.createElement('div');
    wrap.className = 'pd-nav-search';
    wrap.innerHTML = '<div class="pd-nav-search-box">' + SEARCH +
      '<input type="search" placeholder="화면명·코드 검색" aria-label="화면 검색" autocomplete="off">' +
      '<button class="pd-nav-search-clear" type="button" aria-label="지우기" hidden>✕</button></div>' +
      '<div class="pd-nav-search-count" hidden></div>';
    nav.insertBefore(wrap, scroll);   // 목록 위(스크롤과 분리) 고정
    var input = wrap.querySelector('input');
    var clearBtn = wrap.querySelector('.pd-nav-search-clear');
    var count = wrap.querySelector('.pd-nav-search-count');
    function apply() {
      var q = input.value.trim().toLowerCase();
      clearBtn.hidden = !q;
      var shown = 0;
      rows.forEach(function (r) {
        var hit = !q || (r.getAttribute('data-search').indexOf(q) >= 0);
        r.style.display = hit ? '' : 'none';
        if (hit) shown++;
      });
      scroll.querySelectorAll('.nav-group').forEach(function (g) {
        var any = [].slice.call(g.querySelectorAll('.nav-row')).some(function (r) { return r.style.display !== 'none'; });
        g.style.display = any ? '' : 'none';
      });
      if (q) { count.hidden = false; count.textContent = shown ? (shown + '개 일치') : '일치하는 화면 없음'; count.classList.toggle('is-empty', !shown); }
      else { count.hidden = true; }
    }
    input.addEventListener('input', apply);
    clearBtn.addEventListener('click', function () { input.value = ''; apply(); input.focus(); });
  }

  // Flow Diagram 패널 강화: 핀치/휠 줌 + 코너 리사이즈 + 크기·배율 저장(localStorage 영속)
  function enhanceFlowPanel() {
    var panel = document.querySelector('.page-flow');
    if (!panel || panel.__pdFlowEnhanced) return;
    var body = panel.querySelector('.page-flow-body');
    var tools = panel.querySelector('.page-flow-header-tools');
    if (!body || !tools) return;
    panel.__pdFlowEnhanced = true;

    var KEY = 'pd-flow-prefs:' + (PROJECT.name || 'default');
    var prefs = {};
    try { prefs = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) {}
    var zoom = (typeof prefs.zoom === 'number' && prefs.zoom > 0) ? prefs.zoom : 1;
    if (prefs.w) panel.style.width = prefs.w + 'px';
    if (prefs.h) panel.style.height = prefs.h + 'px';

    var dirty = false;
    // 저장 버튼(변경 전까지 비활성)
    var saveBtn = document.createElement('button');
    saveBtn.type = 'button'; saveBtn.className = 'pd-flow-save'; saveBtn.textContent = '저장';
    saveBtn.disabled = true; saveBtn.title = 'Flow 영역 크기·배율을 저장(다음에도 유지)';
    tools.insertBefore(saveBtn, tools.firstChild);
    function markDirty() { if (!dirty) { dirty = true; saveBtn.disabled = false; saveBtn.classList.add('is-dirty'); } }
    saveBtn.addEventListener('click', function () {
      var r = panel.getBoundingClientRect();
      prefs = { w: Math.round(r.width), h: Math.round(r.height), zoom: zoom };
      try { localStorage.setItem(KEY, JSON.stringify(prefs)); } catch (e) {}
      dirty = false; saveBtn.disabled = true; saveBtn.classList.remove('is-dirty');
      var t = saveBtn.textContent; saveBtn.textContent = '저장됨 ✓';
      setTimeout(function () { saveBtn.textContent = t; }, 1200);
    });

    // ── 줌(핀치/휠) — svg를 viewBox 자연크기 × zoom 으로 스케일 ──
    function svg() { return body.querySelector('svg'); }
    function applyZoom() {
      var s = svg(); if (!s) return;
      if (!s.__natW) { var vb = (s.getAttribute('viewBox') || '').split(/[\s,]+/).map(Number); if (vb.length === 4 && vb[2]) { s.__natW = vb[2]; s.__natH = vb[3]; } }
      if (s.__natW) { s.style.maxWidth = 'none'; s.style.width = Math.round(s.__natW * zoom) + 'px'; s.style.height = Math.round(s.__natH * zoom) + 'px'; }
    }
    function setZoom(z) { var p = zoom; zoom = Math.min(4, Math.max(0.3, z)); if (zoom !== p) { applyZoom(); markDirty(); } }
    // 트랙패드 핀치 = ctrlKey 휠, Cmd/Ctrl+휠도 지원
    body.addEventListener('wheel', function (e) {
      if (!(e.ctrlKey || e.metaKey)) return;
      e.preventDefault();
      setZoom(zoom * (e.deltaY < 0 ? 1.08 : 0.92));
    }, { passive: false });
    // 터치 핀치
    function dist(t) { var dx = t[0].clientX - t[1].clientX, dy = t[0].clientY - t[1].clientY; return Math.sqrt(dx * dx + dy * dy); }
    var p0 = 0, z0 = 1;
    body.addEventListener('touchstart', function (e) { if (e.touches.length === 2) { p0 = dist(e.touches); z0 = zoom; } }, { passive: false });
    body.addEventListener('touchmove', function (e) { if (e.touches.length === 2 && p0) { e.preventDefault(); setZoom(z0 * (dist(e.touches) / p0)); } }, { passive: false });
    body.addEventListener('touchend', function (e) { if (e.touches.length < 2) p0 = 0; });

    // ── 코너 리사이즈(좌상단 — 패널은 우하단 고정이므로 좌·상으로 확장) ──
    var handle = document.createElement('div');
    handle.className = 'pd-flow-resize'; handle.title = '드래그해 Flow 영역 크기 조절';
    panel.appendChild(handle);
    var rz = false, sx = 0, sy = 0, sw = 0, sh = 0;
    handle.addEventListener('pointerdown', function (e) {
      rz = true; sx = e.clientX; sy = e.clientY;
      var r = panel.getBoundingClientRect(); sw = r.width; sh = r.height;
      try { handle.setPointerCapture(e.pointerId); } catch (ex) {}
      e.preventDefault(); e.stopPropagation();
    });
    handle.addEventListener('pointermove', function (e) {
      if (!rz) return;
      var w = Math.max(240, Math.min(sw - (e.clientX - sx), window.innerWidth - 80));
      var h = Math.max(160, Math.min(sh - (e.clientY - sy), window.innerHeight - 80));
      panel.style.width = w + 'px'; panel.style.height = h + 'px';
    });
    handle.addEventListener('pointerup', function (e) { if (rz) { rz = false; markDirty(); try { handle.releasePointerCapture(e.pointerId); } catch (ex) {} } });

    // 저장된 배율 적용(svg 렌더 완료까지 대기)
    var tries = 0;
    (function waitSvg() { if (svg()) { applyZoom(); } else if (tries++ < 50) { setTimeout(waitSvg, 150); } })();
  }

  // Description(.page-detail) 패널 강화: Flow와 동일하게 코너 리사이즈 + 크기 저장(localStorage 영속)
  function enhanceDescPanel() {
    var panel = document.querySelector('.page-detail');
    if (!panel || panel.__pdDescEnhanced) return;
    var header = panel.querySelector('.page-detail-header');
    var body = panel.querySelector('.page-detail-body');
    var closeBtn = panel.querySelector('.page-detail-close');
    if (!header || !body) return;
    panel.__pdDescEnhanced = true;

    var KEY = 'pd-desc-prefs:' + (PROJECT.name || 'default');
    var prefs = {};
    try { prefs = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) {}
    if (prefs.w || prefs.h) {
      panel.classList.add('pd-desc-resized');
      if (prefs.w) panel.style.width = prefs.w + 'px';
      if (prefs.h) panel.style.height = prefs.h + 'px';
    }

    var dirty = false;
    // 저장 버튼(변경 전까지 비활성) — Flow와 동일한 .pd-flow-save 스타일 재사용, 닫기 버튼 앞에 삽입
    var saveBtn = document.createElement('button');
    saveBtn.type = 'button'; saveBtn.className = 'pd-flow-save'; saveBtn.textContent = '저장';
    saveBtn.disabled = true; saveBtn.title = 'Description 영역 크기를 저장(다음에도 유지)';
    if (closeBtn) header.insertBefore(saveBtn, closeBtn); else header.appendChild(saveBtn);
    function markDirty() { if (!dirty) { dirty = true; saveBtn.disabled = false; saveBtn.classList.add('is-dirty'); } }
    saveBtn.addEventListener('click', function () {
      var r = panel.getBoundingClientRect();
      prefs = { w: Math.round(r.width), h: Math.round(r.height) };
      try { localStorage.setItem(KEY, JSON.stringify(prefs)); } catch (e) {}
      dirty = false; saveBtn.disabled = true; saveBtn.classList.remove('is-dirty');
      var t = saveBtn.textContent; saveBtn.textContent = '저장됨 ✓';
      setTimeout(function () { saveBtn.textContent = t; }, 1200);
    });

    // ── 코너 리사이즈(좌하단 — 패널은 우상단 고정이므로 좌·하로 확장) ──
    var handle = document.createElement('div');
    handle.className = 'pd-desc-resize'; handle.title = '드래그해 Description 영역 크기 조절';
    panel.appendChild(handle);
    var rz = false, sx = 0, sy = 0, sw = 0, sh = 0;
    handle.addEventListener('pointerdown', function (e) {
      rz = true; sx = e.clientX; sy = e.clientY;
      var r = panel.getBoundingClientRect(); sw = r.width; sh = r.height;
      panel.classList.add('pd-desc-resized');
      try { handle.setPointerCapture(e.pointerId); } catch (ex) {}
      e.preventDefault(); e.stopPropagation();
    });
    handle.addEventListener('pointermove', function (e) {
      if (!rz) return;
      var w = Math.max(240, Math.min(sw + (sx - e.clientX), window.innerWidth - 80));
      var h = Math.max(140, Math.min(sh + (e.clientY - sy), window.innerHeight - 80));
      panel.style.width = w + 'px'; panel.style.height = h + 'px';
    });
    handle.addEventListener('pointerup', function (e) { if (rz) { rz = false; markDirty(); try { handle.releasePointerCapture(e.pointerId); } catch (ex) {} } });
  }

  // 좌측 화면 목록(.page-nav) 열고/닫기 — 우하단 dock에 토글 아이콘 추가(DESCRIPTION·FLOW와 동일 방식)
  function injectPageNavToggle() {
    var nav = document.querySelector('.page-nav');
    var dock = document.querySelector('.pdk-dock');
    if (!nav || !dock || dock.querySelector('.pd-nav-toggle-btn')) return;
    var ICON = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16" stroke-linecap="round"/><path d="M5.5 7.5h1.6M5.5 10.5h1.6M5.5 13.5h1.6" stroke-linecap="round"/></svg>';
    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'pdk-dock-btn pd-dock-btn pd-nav-toggle-btn';
    btn.setAttribute('data-label', '화면 목록'); btn.setAttribute('aria-label', '화면 목록 열기/닫기');
    btn.innerHTML = ICON;
    btn.addEventListener('click', function () { nav.classList.toggle('is-hidden'); btn.classList.toggle('is-off', nav.classList.contains('is-hidden')); });
    dock.appendChild(btn);
  }

  // ═══ 1. 멀티서피스: 현재 화면의 서피스 디바이스로 재적용 ═══
  function surfaceDeviceKey(page) {
    // 화면별 디바이스/방향 override(예: 태블릿 세로 device:'tabletPortrait') 최우선
    if (page && page.device && DEVICES[page.device]) return page.device;
    if (!page || !page.surface || !PROJECT.surfaces) return null;
    for (var i = 0; i < PROJECT.surfaces.length; i++) {
      if (PROJECT.surfaces[i].key === page.surface) return PROJECT.surfaces[i].device;
    }
    return null;
  }
  function applySurfaceDevice() {
    var page = findCurrentPage();
    var key = surfaceDeviceKey(page);
    if (!key) return;
    var d = DEVICES[key];
    if (!d || d.toggle) return;
    var root = document.documentElement, bezel = d.bezel || 0;
    root.style.setProperty('--pdk-screen-w', d.width + 'px');
    root.style.setProperty('--pdk-screen-h', d.height + 'px');
    root.style.setProperty('--pdk-bezel-w', bezel + 'px');
    root.style.setProperty('--pdk-radius', (d.radius || 0) + 'px');
    root.style.setProperty('--pdk-screen-radius', Math.max(0, (d.radius || 0) - bezel) + 'px');
    var stage = document.querySelector('.device-stage');
    if (stage) stage.setAttribute('data-device-type', d.type || 'frame');
    var outerW = d.width + bezel * 2, outerH = d.height + bezel * 2;
    var availW = Math.max(260, window.innerWidth - 640), availH = Math.max(340, window.innerHeight - 90);
    var scale = Math.min(1, availW / outerW, availH / outerH);
    root.style.setProperty('--pdk-device-scale', scale.toFixed(3));
  }

  // ═══ 1-b. 아이폰 프레임 chrome (상태바·다이내믹아일랜드·홈인디케이터) 자동 주입 ═══
  function activeDeviceDef() {
    var page = findCurrentPage();
    var key = surfaceDeviceKey(page) || (PROJECT.device) || 'mobile';
    var d = DEVICES[key];
    if (d && d.toggle) d = DEVICES[window.__pdkVariant || d.default || d.toggle[0]];
    return d;
  }
  function injectMobileChrome() {
    var d = activeDeviceDef();
    if (!d || d.type === 'kiosk' || !(d.width && d.width <= 430)) return;  // 폰만(키오스크·데스크탑 제외)
    var stage = document.querySelector('.device-stage');
    var screen = document.querySelector('.device-screen');
    if (!stage || !screen) return;
    stage.classList.add('pd-iphone');
    var root = screen.querySelector('.pd-screen');
    if (root) root.classList.add('pd-app');   // 앱 셸 레이아웃(safe-top·grow 등) 활성화
    if (screen.querySelector('.pd-statusbar')) return;  // 중복 방지
    var SIG = '<svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5" width="3" height="7" rx="1"/><rect x="10" y="2.5" width="3" height="9.5" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>';
    var WIFI = '<svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor"><path d="M8.5 2.2c2.6 0 5 1 6.8 2.7l1.3-1.4C14.4 1.3 11.6 0 8.5 0S2.6 1.3.4 3.5l1.3 1.4C3.5 3.2 5.9 2.2 8.5 2.2z"/><path d="M8.5 5.3c1.5 0 2.9.6 3.9 1.6l1.3-1.4C12.3 4.2 10.5 3.4 8.5 3.4s-3.8.8-5.2 2.1l1.3 1.4c1-1 2.4-1.6 3.9-1.6z"/><path d="M8.5 8.3c.7 0 1.3.3 1.8.8l-1.8 1.9-1.8-1.9c.5-.5 1.1-.8 1.8-.8z"/></svg>';
    var BATT = '<svg width="27" height="13" viewBox="0 0 27 13" fill="none"><rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke="currentColor" stroke-opacity="0.4"/><rect x="2" y="2" width="17" height="9" rx="2" fill="currentColor"/><path d="M24.5 4.5v4c.8-.3 1.3-1 1.3-2s-.5-1.7-1.3-2z" fill="currentColor" fill-opacity="0.5"/></svg>';
    var sb = document.createElement('div');
    sb.className = 'pd-statusbar';
    sb.innerHTML = '<span class="pd-sb-time">9:41</span><span class="pd-sb-icons">' + SIG + WIFI + BATT + '</span>';
    var di = document.createElement('div'); di.className = 'pd-dynamic-island';
    var hb = document.createElement('div'); hb.className = 'pd-homebar';
    screen.appendChild(sb); screen.appendChild(di); screen.appendChild(hb);
  }

  // ═══ 1-c. 와이드 크롬(PC웹·태블릿) — GNB/사이드바 셸 + PC 브라우저 크롬 ═══
  function injectWideChrome() {
    var d = activeDeviceDef();
    if (!d || d.type === 'kiosk' || !(d.width && d.width > 430)) return;  // 와이드만(폰·키오스크 제외)
    var stage = document.querySelector('.device-stage');
    var screen = document.querySelector('.device-screen');
    if (!stage || !screen) return;
    // 태블릿 판별은 폭이 아니라 디바이스 form(태블릿은 가로/세로 모두 폭이 넓을 수 있음)
    var isTablet = d.form === 'tablet';
    var isPortrait = d.height > d.width;
    stage.classList.add('pd-wide');
    if (isTablet) stage.classList.add('pd-tablet');
    stage.classList.add(isPortrait ? 'pd-portrait' : 'pd-landscape');
    var root = screen.querySelector('.pd-screen');
    if (root) root.classList.add('pd-web');
    if (!isTablet && root && !screen.querySelector('.pd-browserbar')) {   // PC웹 브라우저 크롬(태블릿 제외)
      var bb = document.createElement('div');
      bb.className = 'pd-browserbar';
      bb.innerHTML = '<div class="dots"><i></i><i></i><i></i></div><div class="url">' + esc((PROJECT.name || 'plandeck') + ' · 관리자 콘솔') + '</div>';
      screen.appendChild(bb);
      root.classList.add('has-browser');
    }
  }

  // ═══ 2. 상태 칩 + 변경 감지 (좌측 목록 각 행에 배지 추가) ═══
  var STATUS_META = {
    'draft':         { label: '초안',    cls: 'is-draft' },
    'wireframed':    { label: '와이어',  cls: 'is-wire' },
    'confirmed':     { label: '확정',    cls: 'is-confirmed' },
    'ready-for-dev': { label: '개발준비', cls: 'is-ready' },
  };
  function injectStatusChips() {
    var pages = flatPages(), byId = {};
    pages.forEach(function (p) { byId[p.id] = p; });
    document.querySelectorAll('.page-nav .nav-row').forEach(function (row) {
      var href = row.getAttribute('data-href');
      var p = pages.filter(function (x) { return x.href === href; })[0];
      if (!p) return;
      var st = STATUS_META[p.status] || STATUS_META['draft'];
      var chip = document.createElement('span');
      chip.className = 'pd-status-chip ' + st.cls;
      chip.textContent = st.label;
      // ready-for-dev 인데 동결 해시와 현재 스펙이 다르면 '변경됨'
      if (p.status === 'ready-for-dev' && p._hash && p._hash !== specHash(p)) {
        chip.classList.add('is-changed');
        chip.textContent = '변경됨';
        chip.title = '개발준비 승인 후 스펙이 변경되었습니다 — 재검토 필요';
      } else if (p.status === 'ready-for-dev' && !p._hash) {
        chip.classList.add('is-changed');
        chip.textContent = '개발준비·미동결';
        chip.title = '동결 해시(_hash) 미기록 — /pd-lint 로 동결해야 변경 감지가 작동합니다';
      }
      var title = row.querySelector('.nav-row-title');
      if (title) title.appendChild(chip);
    });
  }

  // ═══ 3. CASES 패널 (경우의 수) ═══
  // 입력 폼이 있으면(또는 입력검증 케이스가 있으면) 입력검증 5종도 커버리지에 포함
  function hasInputField(page) {
    // 실제 입력 요소가 있을 때만 입력검증 5종을 요구(선택형엔 오탐 금지)
    return (page.components || []).some(function (c) { return c.kind === 'input' || c.kind === 'form'; });
  }
  function hasNA(page, s) {
    return (page.cases || []).some(function (c) { return c.state === 'N/A' && (c.guard || '').indexOf(s) >= 0; });
  }
  function coverage(page) {
    var have = {};
    (page.cases || []).forEach(function (c) { if (c.state) have[c.state] = true; });
    var withVal = hasInputField(page);
    function cells(list) {
      return list.map(function (s) { var h = !!have[s]; return { state: s, has: h, na: !h && hasNA(page, s) }; });
    }
    return { screen: cells(SCREEN_STATES), validation: withVal ? cells(VALIDATION_STATES) : [] };
  }
  function gwt(c) {
    if (c.state === 'N/A' || (!c.trigger && !c.result)) return null;  // N/A·공란 행은 수용기준 생략
    var g = c.guard ? ('[' + c.guard + ']') : '';
    return (c.priority ? '[' + esc(c.priority) + '] ' : '') + 'Given ' + esc(c.state) + ' ' + esc(g) + ', When ' + esc(c.trigger || '발생') +
           ', Then ' + esc(c.result || '처리') + (c.message ? (' — "' + esc(c.message) + '"') : '');
  }
  function injectCasesPanel() {
    var page = findCurrentPage();
    if (!page) return;
    var cov = coverage(page);
    function covCells(list) {
      return list.map(function (s) {
        var cls = s.has ? 'is-covered' : (s.na ? 'is-na' : 'is-missing');
        return '<span class="pd-cov-cell ' + cls + '" title="' + (s.has ? '정의됨' : (s.na ? '해당없음(N/A)' : '미정의')) + '">' + esc(s.state) + '</span>';
      }).join('');
    }
    var missingScreen = cov.screen.filter(function (s) { return !s.has && !s.na; }).length;
    var missingVal = cov.validation.filter(function (s) { return !s.has && !s.na; }).length;
    var missing = missingScreen + missingVal;

    var rows = (page.cases || []).map(function (c) {
      return '<tr class="pd-case-row" data-target="' + esc(c.target || '') + '">' +
        '<td><span class="pd-case-state ' + (SCREEN_STATES.indexOf(c.state) >= 0 ? 'is-screen' : (c.state === 'N/A' ? 'is-na-tag' : 'is-valid')) + '">' + esc(c.state) + '</span>' +
          (c.priority ? ' <span class="pd-prio pd-prio-' + esc(c.priority) + '">' + esc(c.priority) + '</span>' : '') +
          (c.testId ? '<br><span class="pd-dim" style="font-size:10px">' + esc(c.testId) + '</span>' : '') + '</td>' +
        '<td>' + esc(c.trigger || '') + (c.guard ? '<br><span class="pd-dim">' + esc(c.guard) + '</span>' : '') + '</td>' +
        '<td>' + esc(c.result || '') + (c.recovery ? '<br><span class="pd-dim">↩ ' + esc(c.recovery) + '</span>' : '') + '</td>' +
        '<td>' + (c.message ? esc(c.message) : '<span class="pd-dim">—</span>') +
          (c.placement ? ' <span class="pd-tag">' + esc(c.placement) + '</span>' : '') + '</td>' +
        '<td>' + (c.api ? esc((c.api.status || '') + ' ' + (c.api.endpoint || '')) : '<span class="pd-dim">—</span>') + '</td>' +
        '</tr>';
    }).join('');

    var gwtLines = (page.cases || []).map(gwt).filter(Boolean);
    var body = (page.cases && page.cases.length)
      ? '<div class="pd-cov-grid"><div class="pd-cov-label">화면상태 커버리지' +
          (missingScreen ? ' <span class="pd-cov-warn">· ' + missingScreen + '개 미정의</span>' : ' <span class="pd-cov-ok">· 완결 ✓</span>') +
          '</div><div class="pd-cov-cells">' + covCells(cov.screen) + '</div>' +
          (cov.validation.length ? '<div class="pd-cov-label" style="margin-top:8px">입력검증 커버리지' +
            (missingVal ? ' <span class="pd-cov-warn">· ' + missingVal + '개 미정의</span>' : ' <span class="pd-cov-ok">· 완결 ✓</span>') +
            '</div><div class="pd-cov-cells">' + covCells(cov.validation) + '</div>' : '') +
          '</div>' +
        '<div class="pd-table-wrap"><table class="pd-table"><thead><tr>' +
          '<th>상태/우선순위</th><th>트리거/조건</th><th>결과/복구</th><th>안내문구</th><th>API</th></tr></thead>' +
          '<tbody>' + rows + '</tbody></table></div>' +
        (gwtLines.length ? '<div class="pd-gwt-wrap">' + gwtLines.map(function (g) { return '<div class="pd-gwt">' + g + '</div>'; }).join('') + '</div>' : '')
      : '<div class="pd-empty"><div class="pd-empty-icon">🧩</div><div class="pd-empty-title">등록된 경우의 수가 없습니다</div>' +
        '<div class="pd-empty-sub"><code>/pd-cases ' + esc(page.id || '') + '</code> 로<br>상태·예외를 정의하세요.</div></div>';

    var aside = document.createElement('aside');
    aside.className = 'pd-panel pd-cases is-hidden';
    aside.innerHTML =
      '<div class="pd-panel-head"><div class="pd-panel-title">CASES · 경우의 수</div>' +
      '<button class="pd-panel-close" type="button" aria-label="닫기">✕</button></div>' +
      '<div class="pd-panel-body">' + body + '</div>';
    aside.querySelector('.pd-panel-close').addEventListener('click', function () { aside.classList.add('is-hidden'); });
    aside.querySelectorAll('.pd-case-row').forEach(function (r) { bindHover(r, r.getAttribute('data-target')); });
    document.body.appendChild(aside);
  }

  // ═══ 4. INTERFACE 패널 (개발 인터페이스/API 계약) ═══
  function renderEntityRef(ref) {
    var r = resolveRef(ref);
    if (!r) return '<span class="pd-dim">—</span>';
    if (!r.name) return esc(r.raw);
    var e = r.entity, fields = (e.fields || []).map(function (f) {
      return '<div class="pd-entity-field"><code>' + esc(f.name) + '</code> <span class="pd-type">' + esc(f.type) +
        (f.format ? ':' + esc(f.format) : '') + '</span>' + (f.required ? ' <span class="pd-req">필수</span>' : '') +
        (f.enum ? ' <span class="pd-dim">[' + esc(f.enum.join(', ')) + ']</span>' : '') + '</div>';
    }).join('');
    return '<details class="pd-entity"><summary>' + esc(e.name || r.name) + ' <span class="pd-dim">{entities.' + esc(r.name) + '}</span></summary>' + fields + '</details>';
  }
  function injectInterfacePanel() {
    var page = findCurrentPage();
    if (!page) return;
    var itf = page.interface || {};
    var reads = itf.reads || [], writes = itf.writes || [], events = itf.events || [];
    var has = reads.length || writes.length || events.length;

    function opRow(o, kind) {
      return '<div class="pd-op pd-op-' + kind + '" data-target="' + esc(o.target || '') + '">' +
        '<div class="pd-op-head"><span class="pd-method">' + esc(o.method || (kind === 'read' ? 'GET' : 'POST')) + '</span>' +
        '<code class="pd-path">' + esc(o.path || '') + '</code>' + (o.auth ? '<span class="pd-tag">🔒 ' + esc(o.auth) + '</span>' : '') + '</div>' +
        '<div class="pd-op-intent">' + esc(o.intent || '') + '</div>' +
        (o.request ? '<div class="pd-op-kv"><span>요청</span>' + renderEntityRef(o.request) + '</div>' : '') +
        (o.response ? '<div class="pd-op-kv"><span>응답</span>' + renderEntityRef(o.response) + '</div>' : '') +
        (o.idempotency ? '<div class="pd-op-kv"><span>멱등</span>' + esc(o.idempotency) + '</div>' : '') +
        (o.errors && o.errors.length ? '<div class="pd-op-kv"><span>에러</span><div>' + o.errors.map(function (e) {
          return '<div class="pd-err"><span class="pd-status">' + esc(e.status) + '</span> ' + esc(e.when || '') + (e.message ? ' — "' + esc(e.message) + '"' : '') + '</div>';
        }).join('') + '</div></div>' : '') +
        '</div>';
    }

    var sections = '';
    if (writes.length) sections += '<div class="pd-sec"><div class="pd-sec-t">✍️ 쓰기(Commands)</div>' + writes.map(function (o) { return opRow(o, 'write'); }).join('') + '</div>';
    if (reads.length)  sections += '<div class="pd-sec"><div class="pd-sec-t">📖 읽기(Queries)</div>' + reads.map(function (o) { return opRow(o, 'read'); }).join('') + '</div>';
    if (events.length) sections += '<div class="pd-sec"><div class="pd-sec-t">⚡ 이벤트</div>' + events.map(function (e) {
      return '<div class="pd-op pd-op-event"><div class="pd-op-head"><span class="pd-method is-event">EVENT</span><code>' + esc(e.name) + '</code></div>' +
        '<div class="pd-op-intent">' + esc(e.when || '') + '</div>' + (e.payload ? '<div class="pd-op-kv"><span>페이로드</span>' + renderEntityRef(e.payload) + '</div>' : '') + '</div>';
    }).join('') + '</div>';

    var body = has
      ? '<div class="pd-itf-tools"><button class="pd-copy-btn" type="button">계약 JSON 복사</button></div>' + sections
      : '<div class="pd-empty"><div class="pd-empty-icon">🔌</div><div class="pd-empty-title">등록된 개발 인터페이스가 없습니다</div>' +
        '<div class="pd-empty-sub"><code>/pd-interface ' + esc(page.id || '') + '</code> 로<br>API·데이터 계약을 정의하세요.</div></div>';

    var aside = document.createElement('aside');
    aside.className = 'pd-panel pd-interface is-hidden';
    aside.innerHTML =
      '<div class="pd-panel-head"><div class="pd-panel-title">INTERFACE · 개발 계약</div>' +
      '<button class="pd-panel-close" type="button" aria-label="닫기">✕</button></div>' +
      '<div class="pd-panel-body">' + body + '</div>';
    aside.querySelector('.pd-panel-close').addEventListener('click', function () { aside.classList.add('is-hidden'); });
    var copyBtn = aside.querySelector('.pd-copy-btn');
    if (copyBtn) copyBtn.addEventListener('click', function () {
      copyToClipboard(JSON.stringify({ screen: page.id, interface: itf, entities: usedEntities(itf) }, null, 2), copyBtn);
    });
    aside.querySelectorAll('.pd-op').forEach(function (el) { bindHover(el, el.getAttribute('data-target')); });
    document.body.appendChild(aside);
  }
  function usedEntities(itf) {
    var used = {}, scan = function (ref) { var r = resolveRef(ref); if (r && r.name && ENTITIES[r.name]) used[r.name] = ENTITIES[r.name]; };
    (itf.reads || []).concat(itf.writes || []).forEach(function (o) { scan(o.request); scan(o.response); });
    (itf.events || []).forEach(function (e) { scan(e.payload); });
    return used;
  }

  // ═══ 5. dock 버튼 추가 (CASES, INTERFACE) ═══
  function injectDockButtons() {
    var dock = document.querySelector('.pdk-dock');
    if (!dock) { dock = document.createElement('div'); dock.className = 'pdk-dock'; document.body.appendChild(dock); }
    [{ sel: '.pd-interface', label: 'INTERFACE', icon: '🔌' },
     { sel: '.pd-cases', label: 'CASES', icon: '🧩' }].forEach(function (it) {
      var panel = document.querySelector(it.sel);
      if (!panel) return;
      var btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'pdk-dock-btn pd-dock-btn';
      btn.setAttribute('data-label', it.label); btn.setAttribute('aria-label', it.label + ' 토글');
      btn.innerHTML = '<span class="pd-dock-emoji">' + it.icon + '</span>';
      btn.addEventListener('click', function () { panel.classList.toggle('is-hidden'); });
      dock.insertBefore(btn, dock.firstChild);
    });
  }

  // ═══ 6. 무결성 린트 배너 ═══
  function lint() {
    var pages = flatPages(), issues = [], seen = {};
    pages.forEach(function (p) {
      if (seen[p.id]) issues.push('중복 화면 ID: ' + p.id);
      seen[p.id] = true;
    });
    var idSet = {}; pages.forEach(function (p) { idSet[p.id] = true; });
    pages.forEach(function (p) {
      ((p.flow && p.flow.to) || []).forEach(function (t) {
        if (t.screen && !idSet[t.screen]) issues.push(p.id + ' → 미등록 화면 참조: ' + t.screen + ' (유령노드)');
      });
      if (p.status === 'ready-for-dev') {
        if (!(p.description || []).length) issues.push(p.id + ': 개발준비인데 Description 없음');
        if (!(p.cases || []).length) issues.push(p.id + ': 개발준비인데 Cases 없음');
        if (!p.interface || !((p.interface.reads || []).length || (p.interface.writes || []).length)) issues.push(p.id + ': 개발준비인데 Interface 없음');
      }
    });
    return issues;
  }
  function injectLintBanner() {
    var issues = lint();
    if (!issues.length) return;
    var warn = issues.filter(function (i) { return i.indexOf('유령') < 0; });  // 유령노드는 경고 완화
    if (!warn.length) return;
    var bar = document.createElement('div');
    bar.className = 'pd-lint-banner';
    bar.innerHTML = '<span class="pd-lint-icon">⚠️</span><span class="pd-lint-text">설계 무결성 경고 ' + warn.length + '건</span>' +
      '<div class="pd-lint-list">' + issues.map(function (i) { return '<div>· ' + esc(i) + '</div>'; }).join('') + '</div>' +
      '<button class="pd-lint-close" type="button" aria-label="닫기">✕</button>';
    bar.querySelector('.pd-lint-close').addEventListener('click', function () { bar.remove(); });
    document.body.appendChild(bar);
  }

  // ═══ 7. PRD 문서 렌더 (#pd-prd-root) ═══
  function ul(arr, map) {
    if (!arr || !arr.length) return '<span class="pd-dim">—</span>';
    return '<ul>' + arr.map(function (x) { return '<li>' + (map ? map(x) : esc(x)) + '</li>'; }).join('') + '</ul>';
  }
  // 임의 값(문자열/배열/객체/객체배열)을 사람이 읽을 수 있는 HTML로 재귀 렌더
  function renderVal(v) {
    if (v == null) return '';
    if (typeof v !== 'object') return esc(v);
    if (Array.isArray(v)) {
      if (!v.length) return '';
      return '<ul>' + v.map(function (x) { return '<li>' + renderVal(x) + '</li>'; }).join('') + '</ul>';
    }
    // 평범한 객체 → 'key 값 · key 값' (예: {who,can} → 'who member · can ...')
    return Object.keys(v).map(function (k) { return '<b>' + esc(k) + '</b> ' + renderVal(v[k]); }).join(' · ');
  }
  // 객체(key→value)를 'key — value' 목록으로 렌더(NFR·RBAC·개인정보·규제 등 상세 블록용).
  // 값이 스칼라면 인라인, 배열·객체면 중첩 렌더(공유 엔진 — 프로젝트별 풍부한 형태 호환, [object Object] 방지)
  function kvUl(obj) {
    if (!obj) return '';
    var keys = Object.keys(obj);
    if (!keys.length) return '';
    return '<ul>' + keys.map(function (k) {
      var val = obj[k];
      var body = (val && typeof val === 'object') ? renderVal(val) : esc(val);
      return '<li><b>' + esc(k) + '</b> — ' + body + '</li>';
    }).join('') + '</ul>';
  }

  // PRD 요구사항 ↔ 화면 추적(Traceability) — PRD 기반 진행 + 부족분(미충족/미연결) 자동 검출
  function prdTraceability() {
    var d = window.PLANDECK_PRD || {};
    var reqs = d.requirements || [];
    var pages = flatPages();
    // 스키마 호환: 신(id/title/surface) · 구(reqId/text/surfaces) 둘 다 지원
    var reqId = function (r) { return r && (r.reqId || r.id); };
    var byReq = {}; reqs.forEach(function (r) { byReq[reqId(r)] = []; });
    var orphans = [];
    pages.forEach(function (p) {
      var ids = p.reqIds || [];
      if (!ids.length) { orphans.push(p); return; }
      ids.forEach(function (rid) { if (!byReq[rid]) byReq[rid] = []; byReq[rid].push(p); });
    });
    var reqSet = {}; reqs.forEach(function (r) { reqSet[reqId(r)] = 1; });
    var ghost = {};
    pages.forEach(function (p) { (p.reqIds || []).forEach(function (rid) { if (!reqSet[rid]) (ghost[rid] = ghost[rid] || []).push(p); }); });
    var covered = reqs.filter(function (r) { return (byReq[reqId(r)] || []).length; });
    var uncovered = reqs.filter(function (r) { return !(byReq[reqId(r)] || []).length; });
    return { reqs: reqs, byReq: byReq, covered: covered, uncovered: uncovered, orphans: orphans, ghost: ghost,
      pct: reqs.length ? Math.round(covered.length / reqs.length * 100) : 0, version: d.version || PROJECT.version || '0.1.0' };
  }
  function renderPRD() {
    var el = document.getElementById('pd-prd-root');
    var d = window.PLANDECK_PRD || {};
    var sec = function (t, html) { return '<div class="pd-prd-sec"><h2>' + t + '</h2>' + html + '</div>'; };
    el.className = 'pd-appshell';
    var body =
      '<div class="pd-banner" style="margin-bottom:16px">이 화면은 <b>config/prd.js</b>(정본 <b>docs/PRD.md</b>의 렌더 미러)를 렌더합니다. 수정은 <b>docs/PRD.md</b>를 고친 뒤 <code>/pd-prd</code>로 동기화하세요(둘을 항상 같은 버전·내용으로 유지).</div>' +
      '<h1>' + esc(PROJECT.name || '제품요구정의서(PRD)') + '</h1>' +
      '<div class="pd-prd-sub">' + esc(PROJECT.description || '') + '</div>' +
      (d.northStar ? sec('북극성(North Star)', '<p>' + esc(d.northStar) + '</p>') : '') +
      sec('① 배경', '<p>' + esc(d.background) + '</p>') +
      sec('② 목표', ul(d.goals)) +
      sec('③ 사용자', ul(d.users, function (u) {
        if (!u || !u.role) return esc(u);
        var desc = u.jobStory || u.need || '';           // 호환: jobStory(구) · need(신)
        return '<b>' + esc(u.role) + '</b>' + (desc ? ' — ' + esc(desc) : '') +
          (u.channel ? ' <span class="pd-dim">· ' + esc(u.channel) + '</span>' : '');
      })) +
      sec('④ 범위', (function () {
        // 호환: scope 배열+outOfScope(구) · scope{includes,excludes}(신)
        var inc = Array.isArray(d.scope) ? d.scope : ((d.scope && d.scope.includes) || []);
        var exc = d.outOfScope || (d.scope && d.scope.excludes) || [];
        return '<b>포함</b>' + ul(inc) + '<b>제외(Out of Scope)</b>' + ul(exc);
      })()) +
      sec('⑤ 성공지표', ul(d.successMetrics, function (m) { return m.metric ? (esc(m.metric) + ' — <b>' + esc(m.target || '') + '</b>') : esc(m); })) +
      sec('⑥ 제약·가정·의존성', '<b>제약</b>' + ul(d.constraints) + '<b>가정</b>' + ul(d.assumptions) + '<b>의존성</b>' + ul(d.dependencies)) +
      sec('⑦ 릴리스', ul(d.releases, function (r) {
        if (!r || typeof r !== 'object') return esc(r);
        var nm = r.name || r.phase || '', items = r.scope || r.items || [];   // 호환: name/scope(구) · phase/items(신)
        if (!nm) return esc(r);
        return '<b>' + esc(nm) + '</b> — ' + esc((items || []).join(', ')) + (r.when ? ' (' + esc(r.when) + ')' : '');
      })) +
      (function () {
        var t = prdTraceability();
        if (!t.reqs.length) return sec('⑧ 요구사항 추적(PRD ↔ 화면)', '<div class="pd-banner">PRD에 <code>requirements[]</code>가 아직 없습니다. <code>/pd-prd</code>로 요구사항을 정의하면 화면과 자동으로 추적·커버리지 검사됩니다.</div>');
        var rows = t.reqs.map(function (r) {
          var _id = r.reqId || r.id, _text = r.text || r.title || '',   // 호환: reqId/text/surfaces(구) · id/title/surface(신)
            _surf = r.surfaces || (r.surface ? [r.surface] : []);
          var scr = t.byReq[_id] || [];
          var sh = scr.length ? scr.map(function (p) { return '<a href="' + esc(p.href) + '">' + esc(p.label) + '</a>'; }).join(', ')
            : '<span class="pd-trace-gap">⚠ 화면 없음 — 보강 필요</span>';
          return '<tr' + (scr.length ? '' : ' class="is-gap"') + '><td><code>' + esc(_id) + '</code></td><td>' + esc(_text) + '</td>' +
            '<td>' + ((_surf || []).join(', ') || '<span class="pd-dim">—</span>') + '</td><td>' + sh + '</td></tr>';
        }).join('');
        var gaps = '';
        if (t.uncovered.length) gaps += '<div class="pd-trace-note is-warn">⚠ 화면이 없는 요구사항 ' + t.uncovered.length + '건 — <code>/pd-scaffold</code> 또는 <code>/pd-screen</code>으로 화면을 만들어 보강하세요.</div>';
        if (t.orphans.length) gaps += '<div class="pd-trace-note">🔗 요구사항에 연결되지 않은 화면 ' + t.orphans.length + '건 (' + t.orphans.map(function (p) { return esc(p.label); }).join(', ') + ') — PRD에 해당 요구사항을 보강하거나 화면에 <code>reqIds</code>를 추가하세요.</div>';
        var gh = Object.keys(t.ghost);
        if (gh.length) gaps += '<div class="pd-trace-note is-warn">👻 PRD에 없는 요구사항을 참조하는 화면: ' + gh.map(esc).join(', ') + ' — PRD에 추가하세요.</div>';
        return sec('⑧ 요구사항 추적(PRD ↔ 화면)',
          '<div class="pd-trace-head">PRD <b>v' + esc(t.version) + '</b> 기준 · 요구사항 커버리지 <b>' + t.covered.length + '/' + t.reqs.length + '</b> (' + t.pct + '%)</div>' +
          '<div class="pd-bar" style="margin:8px 0 14px"><div class="pd-bar-fill" style="width:' + t.pct + '%"></div></div>' +
          '<div class="pd-table-wrap"><table class="pd-table"><thead><tr><th>요구사항</th><th>내용</th><th>서피스</th><th>연결된 화면</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
          (gaps ? '<div class="pd-trace-gaps">' + gaps + '</div>' : '<div class="pd-trace-note is-ok">✓ 모든 요구사항이 화면으로 연결되어 있습니다.</div>'));
      })() +
      // ⑨~⑫ 는 해당 필드가 PRD에 있을 때만 렌더(없는 프로젝트는 영향 없음 = 무회귀)
      (d.workflows && d.workflows.length ? sec('⑨ 핵심 워크플로', ul(d.workflows, function (w) {
        if (!w || typeof w !== 'object') return esc(w);           // 신: 문자열 워크플로
        var nm = w.name || w.title || '';                          // 구: {name, steps[]}
        var steps = (w.steps || []).map(function (s) {
          return typeof s === 'string' ? s : (s && s.screen ? (s.screen + (s.via ? '(' + s.via + ')' : '')) : '');
        }).filter(Boolean);
        return (nm ? '<b>' + esc(nm) + '</b>' : '') + (steps.length ? ' — ' + esc(steps.join(' → ')) : '');
      })) : '') +
      (function () {
        var a = d.alternatives, out = '';
        if (a) {
          var html = '';
          if (a.competitors && a.competitors.length) html += '<b>경쟁·대안</b>' + ul(a.competitors, function (c) {
            if (!c || typeof c !== 'object') return esc(c);
            var nm = c.name || '';
            // name 외 모든 필드(limit 신 / cost·gap hulmate 등)를 빠짐없이 노출
            var rest = Object.keys(c).filter(function (k) { return k !== 'name'; })
              .map(function (k) { return esc(c[k]); }).filter(Boolean).join(' · ');
            return (nm ? '<b>' + esc(nm) + '</b>' : '') + (rest ? ' — ' + rest : '');
          });
          var dv = function (x) { return Array.isArray(x) ? x.map(esc).join(' · ') : esc(x); };   // 배열·문자열 호환
          if (a.differentiation) html += '<p><b>차별화</b> — ' + dv(a.differentiation) + '</p>';
          if (a.wtp) html += '<p><b>지불의사(WTP)</b> — ' + dv(a.wtp) + '</p>';
          if (a.risk) html += '<p><b>리스크</b> — ' + dv(a.risk) + '</p>';
          if (html) out += sec('⑩ 경쟁·차별화', html);
        }
        var detail = '';
        if (d.nfr && Object.keys(d.nfr).length) detail += '<b>비기능 요구(NFR)</b>' + kvUl(d.nfr);
        if (d.rbac && Object.keys(d.rbac).length) detail += '<b>권한(RBAC)</b>' + kvUl(d.rbac);
        if (d.privacy && Object.keys(d.privacy).length) detail += '<b>개인정보</b>' + kvUl(d.privacy);
        if (d.regulation && Object.keys(d.regulation).length) detail += '<b>규제 준수</b>' + kvUl(d.regulation);
        if (d.tenancy && Object.keys(d.tenancy).length) detail += '<b>멀티테넌트 격리</b>' + kvUl(d.tenancy);
        if (detail) out += sec('⑪ 정책·규제·권한·비기능', detail);
        if (d.resolvedDecisions && d.resolvedDecisions.length) out += sec('⑫ 확정된 결정', ul(d.resolvedDecisions));
        if (d.jGate && d.jGate.length) out += sec('⚠️ 결재 게이트(규제·결제·대외발송 — 기획자 결재 필수)', ul(d.jGate));
        return out;
      })() +
      // ⑬ 안전망 — 렌더러에 전용 섹션이 없는 PRD 데이터라도 '조용히 숨기지 않고' 모두 노출.
      // (기획자가 새 필드를 추가해도 화면에서 사라지지 않게 함 = 빈 섹션/누락 재발 방지)
      (function () {
        var known = { version: 1, northStar: 1, background: 1, goals: 1, users: 1, scope: 1, outOfScope: 1,
          successMetrics: 1, constraints: 1, assumptions: 1, dependencies: 1, releases: 1, requirements: 1,
          workflows: 1, alternatives: 1, nfr: 1, rbac: 1, privacy: 1, regulation: 1, tenancy: 1,
          resolvedDecisions: 1, jGate: 1, openQuestions: 1 };
        var extra = Object.keys(d).filter(function (k) {
          if (known[k]) return false;
          var v = d[k];
          return v && (Array.isArray(v) ? v.length : (typeof v === 'object' ? Object.keys(v).length : String(v).trim()));
        });
        if (!extra.length) return '';
        var html = extra.map(function (k) {
          var v = d[k];
          return '<div class="pd-trace-note"><b>' + esc(k) + '</b> — ' + ((v && typeof v === 'object') ? renderVal(v) : esc(v)) + '</div>';
        }).join('');
        return sec('⑬ 기타 정의 <span class="pd-dim">(렌더러 미등록 필드 — 전용 섹션 보강 권장)</span>', html);
      })() +
      (d.openQuestions && d.openQuestions.length ? sec('⚠️ 미결 질문', ul(d.openQuestions)) : '');
    el.innerHTML = pageShell('prd', body, '<a class="pd-side-action" href="docs/PRD.md">📄 PRD.md 원본</a>');
  }

  // ═══ 8. 개요/인벤토리 렌더 (#pd-overview-root) ═══
  function renderOverview() {
    var el = document.getElementById('pd-overview-root');
    el.className = 'pd-appshell';
    var d = window.PLANDECK_PRD || {};
    var surfaces = PROJECT.surfaces || [];
    var pages = flatPages();

    var surfLabel = {}; surfaces.forEach(function (s) { surfLabel[s.key] = s.label || s.key; });
    var surfaceTabs = surfaces.length
      ? '<div class="pd-chip-row">' + surfaces.map(function (s) {
          var n = pages.filter(function (p) { return p.surface === s.key; }).length;
          return '<span class="pd-chip pd-surf-chip" data-surf="' + esc(s.label || s.key) + '" title="이 서피스만 보기">' + esc(s.label || s.key) + ' · ' + n + '화면</span>';
        }).join('') + '</div>' : '';

    var inv = SCREENS.map(function (cat) {
      var rows = (cat.pages || []).map(function (p) {
        var st = STATUS_META[p.status] || STATUS_META['draft'];
        var changed = (p.status === 'ready-for-dev' && p._hash && p._hash !== specHash(p));
        var chip = '<span class="pd-status-chip ' + (changed ? 'is-changed' : st.cls) + '">' + (changed ? '변경됨' : st.label) + '</span>';
        var marks = [];
        if ((p.description || []).length) marks.push('📝');
        if ((p.cases || []).length) marks.push('🧩');
        if (p.interface && ((p.interface.reads || []).length || (p.interface.writes || []).length)) marks.push('🔌');
        if (p.designed) marks.push('🎨');
        if (p.figma && p.figma.image) marks.push('<span title="Figma 디자인 이미지 연결">🖼</span>');
        if (p.figma && (p.figma.prototype || p.figma.embed)) marks.push('<span title="Figma 프로토타입 임베드">▶</span>');
        var ds = ((p.label || '') + ' ' + (p.id || '') + ' ' + (p.surface || '') + ' ' + (surfLabel[p.surface] || '')).toLowerCase();
        return '<tr data-search="' + esc(ds) + '"><td><a href="' + esc(p.href) + '">' + esc(p.label) + '</a>' + (p.entry ? ' <span class="pd-tag">진입</span>' : '') + '</td>' +
          '<td><code>' + esc(p.id) + '</code></td>' +
          '<td>' + (p.surface ? esc(surfLabel[p.surface] || p.surface) : '<span class="pd-dim">—</span>') + '</td>' +
          '<td>' + chip + '</td><td>' + marks.join(' ') + '</td></tr>';
      }).join('');
      return '<details class="pd-prd-sec pd-cat-group" open><summary><span class="pd-cat-title">' + esc(cat.category || '화면') + '</span> <span class="pd-dim">(' + (cat.pages || []).length + ')</span></summary>' +
        '<div class="pd-table-wrap"><table class="pd-table"><thead><tr><th>화면</th><th>ID</th><th>서피스</th><th>상태</th><th>레이어</th></tr></thead><tbody>' + rows + '</tbody></table></div></details>';
    }).join('');

    // ── 진행 현황 + 다음 할 일 (실무 기획자 길잡이) ──
    var hasProject = !!(PROJECT.name);
    var hasPRD = !!(d.workflows && d.workflows.length) || !!(d.goals && d.goals.length);
    var done = { desc: 0, cases: 0, itf: 0, ready: 0 };
    pages.forEach(function (p) {
      if ((p.description || []).length) done.desc++;
      if ((p.cases || []).length) done.cases++;
      if (p.interface && ((p.interface.reads || []).length || (p.interface.writes || []).length)) done.itf++;
      if (p.status === 'ready-for-dev') done.ready++;
    });
    var n = pages.length;
    var pct = n ? Math.round((done.desc + done.cases + done.itf) / (n * 3) * 100) : 0;
    var trace = prdTraceability();

    var next;
    if (!hasProject) next = { cmd: '/pd-init', why: '프로젝트 이름·서피스를 설정하세요.' };
    else if (!hasPRD) next = { cmd: '/pd-prd', why: 'PRD(상위 기획)를 작성하세요.' };
    else if (!n) next = { cmd: '/pd-scaffold', why: 'PRD에서 기본 화면을 자동 생성하세요.' };
    else {
      var draft = pages.filter(function (p) { return p.status === 'draft'; })[0];
      var wire = pages.filter(function (p) { return p.status === 'wireframed'; })[0];
      var needLayer = pages.filter(function (p) { return !(p.description || []).length || !(p.cases || []).length || !(p.interface && ((p.interface.reads || []).length || (p.interface.writes || []).length)); })[0];
      if (draft) next = { cmd: '/pd-wireframe ' + draft.id, why: '『' + draft.label + '』 화면을 설계하세요.' };
      else if (wire) next = { cmd: '/pd-cases ' + wire.id, why: '『' + wire.label + '』 경우의 수를 정의하세요.' };
      else if (needLayer) next = { cmd: '/pd-interface ' + needLayer.id, why: '『' + needLayer.label + '』 레이어를 보강하세요.' };
      else next = { cmd: '/pd-lint', why: '완결성을 점검하고 개발준비로 승격하세요.' };
    }

    var progressCard = n ? ('<div class="pd-prd-sec pd-dash">' +
      '<div class="pd-dash-row"><div class="pd-dash-stat"><b>' + n + '</b>화면</div>' +
      '<div class="pd-dash-stat"><b>' + done.desc + '</b>📝</div>' +
      '<div class="pd-dash-stat"><b>' + done.cases + '</b>🧩</div>' +
      '<div class="pd-dash-stat"><b>' + done.itf + '</b>🔌</div>' +
      '<div class="pd-dash-stat"><b>' + done.ready + '</b>개발준비</div>' +
      (trace.reqs.length ? '<div class="pd-dash-stat"><b>' + trace.covered.length + '/' + trace.reqs.length + '</b>요구사항 연결</div>' : '') + '</div>' +
      '<div class="pd-bar"><div class="pd-bar-fill" style="width:' + pct + '%"></div></div>' +
      '<div class="pd-dash-pct">완결성 ' + pct + '%</div></div>') : '';

    // PRD 기반 부족분(미충족 요구사항·미연결 화면) 보강 알림 — 기획자 우선
    var gapCount = trace.uncovered.length + trace.orphans.length + Object.keys(trace.ghost).length;
    var gapCard = gapCount ? ('<div class="pd-prd-sec pd-gap-card"><h2>🧩 PRD 기반 보강할 점 <span class="pd-dim">(' + gapCount + ')</span></h2>' +
      (trace.uncovered.length ? '<div class="pd-trace-note is-warn">⚠ 화면이 없는 요구사항 ' + trace.uncovered.length + '건 — <code>/pd-scaffold</code>로 화면 생성</div>' : '') +
      (trace.orphans.length ? '<div class="pd-trace-note">🔗 요구사항 미연결 화면 ' + trace.orphans.length + '건 (' + trace.orphans.map(function (p) { return esc(p.label); }).join(', ') + ') — PRD에 요구사항 보강</div>' : '') +
      (Object.keys(trace.ghost).length ? '<div class="pd-trace-note is-warn">👻 PRD에 없는 요구사항 참조: ' + Object.keys(trace.ghost).map(esc).join(', ') + '</div>' : '') +
      '<div class="pd-dim" style="margin-top:8px;font-size:12.5px">자세히: <a href="prd.html">PRD 요구사항 추적 →</a></div></div>') : '';

    var nextCard = '<div class="pd-prd-sec pd-next"><h2>👉 다음 할 일</h2>' +
      '<div class="pd-next-cmd"><code>' + esc(next.cmd) + '</code></div>' +
      '<div class="pd-next-why">' + esc(next.why) + '</div>' +
      '<div class="pd-dim" style="margin-top:8px;font-size:12.5px">막히면 <code>/pd</code> 만 치세요 — 지금 뭘 할지 안내합니다.</div></div>';

    // ── 역할별로 시작하기 — 각 역할이 '여기서 뭘·어디서'를 1클릭으로(쉬운 진입) ──
    var entryHref = n ? esc((pages.filter(function (p) { return p.entry; })[0] || pages[0]).href) : '';
    var roleCards = [
      { ic: '🧭', role: '기획자', job: 'PRD·화면·예외·인터페이스를 작성·관리 (여기가 작업장). 단위테스트 목록은 핸드오프에서 추출.', links: [['PRD', 'prd.html'], ['상세 기획서', 'spec.html']] },
      { ic: '🎨', role: '디자이너', job: '화면별 구성요소·상태(cases)를 확인하고 Figma 시안을 연결·반영(🎨 표시).', links: [['화면별 구성요소', 'spec.html']] },
      { ic: '🛠', role: '개발자·퍼블리셔', job: 'API·데이터 계약·예외 분기·화면 흐름 확인. OpenAPI·번들로 받기. 부족하면 보강 요청.', links: [['개발 핸드오프', 'handoff.html']] },
      { ic: '🧪', role: 'QA', job: '화면별 수용기준(GWT)·상태 커버리지 확인, 테스트플랜(.feature)·체크리스트 추출.', links: [['테스트플랜 받기', 'handoff.html'], ['경우의 수', 'spec.html']] },
      { ic: '👁', role: '의사결정자', job: '목업·프로토타입을 눌러보며 둘러보기 — 기술 패널은 자동으로 숨겨집니다.', links: n ? [['프로토타입 둘러보기', entryHref + '?mode=review']] : [] },
    ];
    var roleGuide = '<section class="pd-roles"><div class="pd-roles-head">👥 역할별로 시작하기 <span class="pd-dim">— 내 역할에서 할 일과 바로가기</span></div>' +
      '<div class="pd-roles-grid">' + roleCards.map(function (r) {
        return '<div class="pd-role-card"><div class="pd-role-top"><span class="pd-role-ic">' + r.ic + '</span><span class="pd-role-name">' + esc(r.role) + '</span></div>' +
          '<div class="pd-role-job">' + esc(r.job) + '</div>' +
          (r.links.length ? '<div class="pd-role-links">' + r.links.map(function (l) { return '<a href="' + l[1] + '">' + esc(l[0]) + ' →</a>'; }).join('') + '</div>' : '') +
          '</div>';
      }).join('') + '</div></section>';

    var cheat = '<details class="pd-prd-sec pd-cheat"><summary>📖 커맨드 치트시트</summary>' +
      '<div class="pd-table-wrap"><table class="pd-table"><tbody>' +
      [['/pd', '뭘 할지 모를 때 — 다음 단계 안내'],
       ['/pd-init', '프로젝트·서피스 설정'],
       ['/pd-prd', '상위 기획(PRD)'],
       ['/pd-scaffold', 'PRD→화면 자동생성'],
       ['/pd-wireframe', '화면 기능·버튼'],
       ['/pd-cases', '경우의 수(예외)'],
       ['/pd-interface', '개발 인터페이스(API)'],
       ['/pd-qa', 'QA 수용기준 보강'],
       ['/pd-figma-sync', 'Figma 시안 연결(디자이너)'],
       ['/pd-lint', '완결성 점검·개발준비'],
       ['/pd-handoff', '개발·QA 핸드오프 방출']].map(function (r) {
        return '<tr><td><code>' + r[0] + '</code></td><td>' + r[1] + '</td></tr>'; }).join('') +
      '</tbody></table></div></details>';

    var cl = PROJECT.changelog || [];
    var verCard = cl.length ? ('<details class="pd-prd-sec"><summary style="cursor:pointer;font-weight:800;color:var(--pd-sub)">🏷 버전 이력 (현재 v' + esc(PROJECT.version || '0.1.0') + (PROJECT.updatedAt ? ' · ' + esc(PROJECT.updatedAt) : '') + ')</summary>' +
      '<ul class="pd-changelog" style="margin-top:10px">' + cl.slice().reverse().map(function (c) {
        return '<li><code>v' + esc(c.version) + '</code> <span class="pd-dim">' + esc(c.date || '') + '</span> — ' + esc(c.note || '') + '</li>';
      }).join('') + '</ul></details>') : '';

    var body =
      '<h1>' + esc(PROJECT.name || 'PlanDeck 프로젝트') + (PROJECT.version ? '<span class="pd-ver-badge">v' + esc(PROJECT.version) + '</span>' : '') + '</h1>' +
      '<div class="pd-prd-sub">' + esc(PROJECT.description || '아직 설정 전 — <code>/pd-init</code> 으로 시작하세요.') + '</div>' +
      surfaceTabs + roleGuide + progressCard + nextCard + gapCard +
      (d.goals && d.goals.length ? '<div class="pd-prd-sec"><h2>목표</h2>' + ul(d.goals) + '</div>' : '') +
      (pages.length ? ('<div class="pd-inv-head"><h2>화면 목록 <span class="pd-dim">(' + pages.length + ')</span></h2>' + docFilterBar('화면명·ID·서피스로 찾기') + '</div>' + inv)
        : '<div class="pd-empty"><div class="pd-empty-icon">🗂️</div><div class="pd-empty-title">아직 화면이 없습니다</div><div class="pd-empty-sub"><code>/pd-prd</code> → <code>/pd-scaffold</code> 로<br>PRD에서 화면을 생성하세요.</div></div>') +
      verCard + cheat;
    el.innerHTML = pageShell('overview', body);
    try { wireDocFilter(el); } catch (e) {}
  }

  // ═══ 9. 상세 기획서 렌더 (#pd-spec-root) — 의사결정자/팀 열람·인쇄용 ═══
  function renderSpec() {
    var el = document.getElementById('pd-spec-root');
    el.className = 'pd-appshell';
    var pages = flatPages();
    var head =
      '<h1>' + esc(PROJECT.name || '상세 기획서') + '</h1>' +
      '<div class="pd-prd-sub">화면별 상세 기획 — 목적·구성요소·동작·예외·개발 인터페이스</div>';
    var body = pages.map(function (p) {
      var st = STATUS_META[p.status] || STATUS_META['draft'];
      var comp = (p.components || []).map(function (c) {
        return '<li><b>' + esc(c.label || c.role) + '</b> <span class="pd-dim">(' + esc(c.kind || '') + ')</span>' +
          (c.action && c.action.do ? ' → ' + esc(c.action.do) : '') + '</li>';
      }).join('');
      var desc = (p.description || []).map(function (d) { return '<li>' + esc(d.text) + '</li>'; }).join('');
      var cases = (p.cases || []).map(function (c) {
        return '<tr><td>' + esc(c.state) + '</td><td>' + esc(c.trigger || '') + (c.guard ? ' <span class="pd-dim">{' + esc(c.guard) + '}</span>' : '') +
          '</td><td>' + esc(c.result || '') + '</td><td>' + (c.message ? esc(c.message) : '<span class="pd-dim">—</span>') + '</td></tr>';
      }).join('');
      var itf = p.interface || {};
      var ops = (itf.writes || []).map(function (o) { return '<li>✍️ <code>' + esc(o.method || 'POST') + ' ' + esc(o.path || '') + '</code> — ' + esc(o.intent || '') + '</li>'; })
        .concat((itf.reads || []).map(function (o) { return '<li>📖 <code>' + esc(o.method || 'GET') + ' ' + esc(o.path || '') + '</code> — ' + esc(o.intent || '') + '</li>'; }))
        .concat((itf.events || []).map(function (e) { return '<li>⚡ <code>' + esc(e.name || '') + '</code> — ' + esc(e.when || '') + '</li>'; })).join('');
      var flow = ((p.flow && p.flow.to) || []).map(function (t) {
        return '<li>' + (t.via ? '[' + esc(t.via) + '] ' : '') + '→ ' + esc(t.screen) + (t.branch ? ' <span class="pd-dim">(' + esc(t.branch) + ')</span>' : '') + '</li>';
      }).join('');
      var ds = ((p.label || '') + ' ' + (p.id || '') + ' ' + (p.surface || '')).toLowerCase();
      return '<details class="pd-prd-sec pd-spec-screen" open id="spec-' + esc(p.id) + '" data-search="' + esc(ds) + '">' +
        '<summary><span class="pd-spec-sum-title">' + esc(p.label) + '</span> <code>' + esc(p.id) + '</code> <span class="pd-status-chip ' + st.cls + '">' + st.label + '</span>' +
          (p.surface ? ' <span class="pd-tag">' + esc(p.surface) + '</span>' : '') + '</summary>' +
        (p.context ? '<p><b>목적/맥락</b> — ' + esc(p.context) + '</p>' : '') +
        '<div class="pd-spec-grid">' +
          '<div><h3>구성요소/버튼</h3>' + (comp ? '<ul>' + comp + '</ul>' : '<span class="pd-dim">—</span>') + '</div>' +
          '<div><h3>동작/설명</h3>' + (desc ? '<ul>' + desc + '</ul>' : '<span class="pd-dim">—</span>') + '</div>' +
          '<div><h3>화면 흐름</h3>' + (flow ? '<ul>' + flow + '</ul>' : '<span class="pd-dim">진입/종료</span>') + '</div>' +
          '<div><h3>개발 인터페이스</h3>' + (ops ? '<ul>' + ops + '</ul>' : '<span class="pd-dim">—</span>') + '</div>' +
        '</div>' +
        (cases ? '<h3>경우의 수(예외)</h3><div class="pd-table-wrap"><table class="pd-table"><thead><tr><th>상태</th><th>트리거/조건</th><th>결과</th><th>안내문구</th></tr></thead><tbody>' + cases + '</tbody></table></div>' : '') +
        (p.href ? '<p><a href="' + esc(p.href) + '">↗ 이 화면 프로토타입 열기</a></p>' : '') +
        '</details>';
    }).join('');
    var toolbar = pages.length ? ('<div class="pd-inv-head">' + docFilterBar('화면명·ID로 찾기') +
      '<button class="pd-collapse-toggle" type="button">모두 접기</button></div>' +
      '<div class="pd-spec-toc">' + pages.map(function (p) { return '<a href="#spec-' + esc(p.id) + '">' + esc(p.label) + '</a>'; }).join('') + '</div>') : '';
    var content = head + toolbar + (pages.length ? body : '<div class="pd-empty"><div class="pd-empty-icon">📄</div><div class="pd-empty-title">아직 화면이 없습니다</div></div>');
    var specActions = '<button class="pd-side-action pd-dl" type="button">⬇ 엑셀(경우의수)</button>' +
      '<a class="pd-side-action" href="#" onclick="document.querySelectorAll(\'.pd-spec-screen\').forEach(function(d){d.open=true});window.print();return false;">🖨 PDF로 저장</a>';
    el.innerHTML = pageShell('spec', content, specActions, 'pd-prd-doc pd-spec-doc');
    (function () {
      var dl = el.querySelector('.pd-dl');
      if (dl) dl.addEventListener('click', function () {
        var rows = [['화면ID', '화면명', '상태(화면성격)', '트리거', '조건(guard)', '결과', '메시지', '위치', '우선순위']];
        flatPages().forEach(function (p) { (p.cases || []).forEach(function (c) { rows.push([p.id, p.label, c.state, c.trigger, c.guard, c.result, c.message, c.placement, c.priority]); }); });
        downloadCSV(exportName('화면설계서_경우의수'), rows);
      });
    })();
    try { wireDocFilter(el); } catch (e) {}
    try {
      var ct = el.querySelector('.pd-collapse-toggle');
      if (ct) ct.addEventListener('click', function () {
        var cards = [].slice.call(el.querySelectorAll('.pd-spec-screen'));
        var anyOpen = cards.some(function (d) { return d.open; });
        cards.forEach(function (d) { d.open = !anyOpen; });
        ct.textContent = anyOpen ? '모두 펼치기' : '모두 접기';
      });
    } catch (e) {}
  }

  // ═══ IA(정보구조) — config/screens.js 에서 화면 계층·연결·요구사항을 자동 생성 ═══
  function renderIA() {
    var el = document.getElementById('pd-ia-root'); if (!el) return;
    var byId = {}; flatPages().forEach(function (p) { byId[p.id] = p; });
    var totalScreens = flatPages().length;
    var entryList = flatPages().filter(function (p) { return p.entry; });
    var body = SCREENS.map(function (cat) {
      var nodes = (cat.pages || []).map(function (p) {
        var outs = ((p.flow && p.flow.to) || []).map(function (t) {
          var tp = byId[t.screen];
          return tp ? '<a class="pd-ia-edge" href="' + esc(tp.href) + '">' + esc(tp.label) + '</a>' : '<span class="pd-ia-edge pd-dim">' + esc(t.screen) + '</span>';
        });
        var reqs = (p.reqIds || []).map(function (r) { return '<span class="pd-req">' + esc(r) + '</span>'; }).join(' ');
        return '<li class="pd-ia-node">' +
          '<div class="pd-ia-node-head"><a class="pd-ia-screen" href="' + esc(p.href) + '">' + esc(p.label) + '</a>' +
          '<span class="pd-dim pd-ia-id">' + esc(p.id) + '</span>' + (p.entry ? ' <span class="pd-tag">진입</span>' : '') +
          (reqs ? ' <span class="pd-ia-reqs">' + reqs + '</span>' : '') + '</div>' +
          (outs.length ? '<div class="pd-ia-edges"><span class="pd-ia-arrow">→</span> ' + outs.join(' ') + '</div>' : '') +
          '</li>';
      }).join('');
      return '<section class="pd-ia-cat"><h2>' + esc(cat.category) + ' <span class="pd-dim">(' + (cat.pages || []).length + ')</span></h2><ul class="pd-ia-list">' + nodes + '</ul></section>';
    }).join('');
    var head = '<div class="pd-prd-head"><h1>정보 구조 (IA)</h1><div class="pd-prd-sub">서피스별 화면 계층 · 화면 간 연결(→) · 요구사항 매핑 — <b>' + totalScreens + '</b>개 화면. <code>config/screens.js</code> 에서 자동 생성됩니다.</div>' +
      (entryList.length ? '<div class="pd-ia-entries">진입점: ' + entryList.map(function (p) { return '<a href="' + esc(p.href) + '">' + esc(p.label) + '</a>'; }).join(' · ') + '</div>' : '') + '</div>';
    var iaActions = '<button class="pd-side-action pd-dl" type="button">⬇ 엑셀(화면목록)</button><a class="pd-side-action" href="#" onclick="window.print();return false;">🖨 PDF로 저장</a>';
    el.innerHTML = pageShell('ia', '<div class="pd-ia pd-prd">' + head + body + '</div>', iaActions);
    (function () {
      var dl = el.querySelector('.pd-dl');
      if (dl) dl.addEventListener('click', function () {
        var rows = [['화면ID', '화면명', '서피스', '진입', '요구사항', '연결(flow.to)', '설명']];
        flatPages().forEach(function (p) { rows.push([p.id, p.label, p.surface || '', p.entry ? '진입' : '', (p.reqIds || []).join(' '), ((p.flow && p.flow.to) || []).map(function (t) { return t.screen; }).join(' '), p.context || '']); });
        downloadCSV(exportName('화면목록_IA'), rows);
      });
    })();
  }

  // ═══ 기능 정의서 — 화면 interface(조회·액션·이벤트)와 요구사항을 기능 목록으로 자동 생성 ═══
  function renderFeatures() {
    var el = document.getElementById('pd-features-root'); if (!el) return;
    var feats = [];
    flatPages().forEach(function (p) {
      var itf = p.interface || {};
      (itf.writes || []).forEach(function (w) { feats.push({ name: w.intent || w.id, screen: p, type: '액션', sub: (w.method || '') + ' ' + (w.path || '') }); });
      (itf.reads || []).forEach(function (r) { feats.push({ name: r.intent || r.id, screen: p, type: '조회', sub: (r.method || '') + ' ' + (r.path || '') }); });
      (itf.events || []).forEach(function (e) {
        // 일관성: 기능명은 한글(intent>when), 이벤트 dot-코드는 'API/시점' 열에(액션의 API path와 동일 위치)
        var ko = e.intent || e.when || e.name;
        feats.push({ name: ko, screen: p, type: '이벤트', sub: (e.name && e.name !== ko) ? e.name : (e.when || '') });
      });
    });
    var trs = feats.map(function (f, i) {
      var cls = f.type === '액션' ? 'is-write' : f.type === '이벤트' ? 'is-event' : 'is-read';
      return '<tr><td class="pd-mono">FUNC-' + ('00' + (i + 1)).slice(-3) + '</td><td>' + esc(f.name) + '</td>' +
        '<td><a href="' + esc(f.screen.href) + '">' + esc(f.screen.label) + '</a></td>' +
        '<td><span class="pd-feat-type ' + cls + '">' + esc(f.type) + '</span></td>' +
        '<td class="pd-mono pd-dim">' + esc(f.sub) + '</td>' +
        '<td>' + ((f.screen.reqIds || []).map(function (r) { return '<span class="pd-req">' + esc(r) + '</span>'; }).join(' ')) + '</td></tr>';
    }).join('');
    var nW = feats.filter(function (f) { return f.type === '액션'; }).length;
    var nR = feats.filter(function (f) { return f.type === '조회'; }).length;
    var nE = feats.filter(function (f) { return f.type === '이벤트'; }).length;
    var head = '<div class="pd-prd-head"><h1>기능 정의서</h1><div class="pd-prd-sub">화면별 기능(조회·액션·이벤트)과 API·요구사항 매핑 — <b>' + feats.length + '</b>개 기능(액션 ' + nW + ' · 조회 ' + nR + ' · 이벤트 ' + nE + '). <code>config/screens.js</code> 의 interface 에서 자동 생성됩니다.</div></div>';
    var featActions = '<button class="pd-side-action pd-dl" type="button">⬇ 엑셀(CSV)</button><a class="pd-side-action" href="#" onclick="window.print();return false;">🖨 PDF로 저장</a>';
    el.innerHTML = pageShell('features', '<div class="pd-prd">' + head + '<div class="pd-table-wrap"><table class="pd-table pd-feat-table"><thead><tr><th>기능ID</th><th>기능명</th><th>화면</th><th>유형</th><th>API/시점</th><th>요구사항</th></tr></thead><tbody>' + trs + '</tbody></table></div></div>', featActions);
    (function () {
      var dl = el.querySelector('.pd-dl');
      if (dl) dl.addEventListener('click', function () {
        var rows = [['기능ID', '기능명', '화면', '화면ID', '유형', 'API/시점', '요구사항']];
        feats.forEach(function (f, i) { rows.push(['FUNC-' + ('00' + (i + 1)).slice(-3), f.name, f.screen.label, f.screen.id, f.type, f.sub, (f.screen.reqIds || []).join(' ')]); });
        downloadCSV(exportName('기능정의서'), rows);
      });
    })();
  }

  // ═══ 9.5 컴포넌트 라이브러리 뷰 (#pd-components-root) — 피그마 컴포넌트 패널 ═══
  function renderComponents() {
    var el = document.getElementById('pd-components-root'); if (!el) return;
    var C = window.PD || window.PDK_COMPONENTS;
    var head = '<div class="pd-prd-head"><h1>🧩 컴포넌트 라이브러리</h1><div class="pd-prd-sub">각 화면은 이 공통 컴포넌트를 <b>가져다 조립</b>합니다. 컴포넌트 하나를 고치면(<code>engine/pd-components.js</code> 마크업 · <code>engine/plandeck-ui.css</code> 스타일) 그 컴포넌트를 쓰는 <b>전 화면·전 프로젝트가 한꺼번에</b> 바뀝니다. 피그마 디자인 컴포넌트와 동일 구조입니다.</div></div>';
    if (!C || !C.CATALOG) { el.innerHTML = pageShell('components', '<div class="pd-prd">' + head + '<div class="pd-empty"><div class="pd-empty-icon">🧩</div><div class="pd-empty-title">컴포넌트 라이브러리를 불러올 수 없습니다</div><div class="pd-empty-sub">이 페이지는 <code>engine/pd-components.js</code> 를 로드해야 합니다.</div></div></div>'); return; }
    var groups = C.CATALOG.map(function (g) {
      var items = g.items.map(function (it) {
        var html = ''; try { html = it.preview(); } catch (e) { html = '<span class="pd-dim">미리보기 오류</span>'; }
        return '<div class="pd-comp-item"><div class="pd-comp-head"><code class="pd-comp-name">' + esc(it.name) + '</code><span class="pd-comp-desc">' + esc(it.desc) + '</span></div><div class="pd-comp-preview"><div class="pd-screen">' + html + '</div></div></div>';
      }).join('');
      return '<section class="pd-comp-group"><h2>' + esc(g.group) + '</h2><div class="pd-comp-grid">' + items + '</div></section>';
    }).join('');
    el.innerHTML = pageShell('components', '<div class="pd-prd pd-catalog">' + head + groups + '</div>');
  }

  // ═══ 10. 검토 모드 (의사결정자) — sessionStorage 로 이동해도 유지 ═══
  function reviewGet() { try { return sessionStorage.getItem('pd-review') === '1'; } catch (e) { return false; } }
  function reviewSet(v) { try { if (v) sessionStorage.setItem('pd-review', '1'); else sessionStorage.removeItem('pd-review'); } catch (e) {} }
  function reviewBanner() {
    var page = findCurrentPage();
    var bar = document.createElement('div');
    bar.className = 'pd-review-banner';
    bar.innerHTML = '<b>' + esc(PROJECT.name || '') + '</b> — ' + esc(PROJECT.description || '') +
      (page && page.context ? '<div class="pd-review-ctx">현재 화면: <b>' + esc(page.label) + '</b> — ' + esc(page.context) + '</div>' : '');
    document.body.appendChild(bar);
  }
  function setupReviewMode() {
    var params = new URLSearchParams(location.search);
    var on = params.get('mode') === 'review' || reviewGet();
    if (on) { document.body.classList.add('pd-review-mode'); reviewSet(true); reviewBanner(); try { applyFidelity(); } catch (e) {} }
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'pd-mode-toggle';
    var sync = function () {
      var o = document.body.classList.contains('pd-review-mode');
      btn.textContent = o ? '🛠 설계 모드' : '👁 검토 모드';
      btn.title = o ? '설계 패널(계약·예외) 다시 보기' : '기술 패널을 숨기고 화면+플로우만(의사결정자용) — 이동해도 유지';
    };
    btn.addEventListener('click', function () {
      var o = document.body.classList.toggle('pd-review-mode');
      reviewSet(o);
      if (o && !document.querySelector('.pd-review-banner')) reviewBanner();
      var b = document.querySelector('.pd-review-banner'); if (!o && b) b.remove();
      sync();
      try { applyFidelity(); } catch (e) {}
    });
    sync();
    var tb = ensureTopbar();
    tb.insertBefore(btn, tb.firstChild);   // 검토 모드가 왼쪽, 화면 정보가 오른쪽
  }

  // ═══ 12. CTA 클릭 전이 (components.action.do:'go:ID' → 화면 내 요소 클릭 시 이동) ═══
  function bindActions() {
    var page = findCurrentPage();
    var screen = screenEl();
    if (!page || !screen) return;
    var byId = {}; flatPages().forEach(function (p) { byId[p.id] = p; });
    (page.components || []).forEach(function (c) {
      if (!c.role || !c.action || !c.action.do) return;
      var m = String(c.action.do).match(/^go:(.+)$/);
      if (!m) return;
      var target = byId[m[1].trim()];
      if (!target || !target.href) return;
      var el = screen.querySelector(c.role);
      if (!el) return;
      if (el.tagName === 'A' && el.getAttribute('href')) return; // 정적 href 우선 — 런타임 덮어쓰기 방지(v2 클릭 프로토타입)
      el.style.cursor = 'pointer';
      el.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); location.href = target.href; });
    });
  }

  // ═══ 11. 워크스페이스 홈 렌더 (#pd-workspace-root) — 다중 프로젝트 ═══
  function renderWorkspace() {
    var el = document.getElementById('pd-workspace-root');
    el.className = 'pd-prd-doc';
    var ws = window.PLANDECK_WORKSPACE || window.PDK_WORKSPACE || { projects: [] };
    var projs = ws.projects || [];
    // 중복 slug/path 검출(복수 등록 충돌 경고)
    var seen = {}, dups = [];
    projs.forEach(function (p) { if (seen[p.slug] || seen[p.path]) dups.push(p.slug || p.path); seen[p.slug] = 1; seen[p.path] = 1; });
    var dupWarn = dups.length ? '<div class="pd-lint-banner" style="position:static;max-width:none;margin-bottom:16px"><span class="pd-lint-icon">⚠️</span><span class="pd-lint-text">중복 프로젝트 등록: ' + esc(dups.join(', ')) + '</span></div>' : '';
    // 버전 비교(내림차순) · 태그에서 버전숫자 제거(짧은 라벨)
    function vcmp(a, b) { var pa = (a.version || '0').split('.').map(Number), pb = (b.version || '0').split('.').map(Number); for (var i = 0; i < 3; i++) { var d = (pb[i] || 0) - (pa[i] || 0); if (d) return d; } return 0; }
    function shortTag(t) { return String(t || '').replace(/\s*v?[0-9][0-9.]*\s*$/, '').trim() || String(t || ''); }
    function sfChips(p) { return (p.surfaces || []).map(function (s) { return '<span class="pd-chip">' + esc(s) + '</span>'; }).join(''); }
    function singleCard(p) {
      return '<a class="pd-proj-card" href="' + esc(p.path) + 'index.html">' +
        '<div class="pd-proj-head"><span class="pd-proj-name">' + esc(p.name) + '</span>' +
        (p.tag ? '<span class="pd-status-chip is-wire">' + esc(p.tag) + '</span>' : '') + '</div>' +
        '<div class="pd-proj-desc">' + esc(p.desc || '') + '</div>' +
        '<div class="pd-chip-row">' + sfChips(p) + (p.version ? '<span class="pd-chip">v' + esc(p.version) + '</span>' : '') +
        (p.updatedAt ? '<span class="pd-chip">' + esc(p.updatedAt) + '</span>' : '') + '</div>' +
        '</a>';
    }
    // 같은 versionGroup = 한 프로젝트의 여러 버전(브랜치) → 카드 1개 + 버전 스위처
    function groupedCard(vs) {
      var sorted = vs.slice().sort(vcmp);
      var cur = vs.filter(function (x) { return x.current; })[0] || sorted[0];
      var pills = sorted.map(function (x) {
        return '<a class="pd-ver-pill' + (x === cur ? ' is-current' : '') + '" href="' + esc(x.path) + 'index.html" title="' + esc(x.desc || '') + '">' +
          '<span class="pd-ver-num">v' + esc(x.version) + '</span>' + (shortTag(x.tag) ? '<span class="pd-ver-tag">' + esc(shortTag(x.tag)) + '</span>' : '') + '</a>';
      }).join('');
      return '<div class="pd-proj-card pd-proj-card-grouped">' +
        '<div class="pd-proj-head"><a class="pd-proj-name pd-proj-name-link" href="' + esc(cur.path) + 'index.html">' + esc(cur.name) + '</a>' +
        (cur.tag ? '<span class="pd-status-chip is-wire">' + esc(cur.tag) + '</span>' : '') + '</div>' +
        '<div class="pd-proj-desc">' + esc(cur.desc || '') + '</div>' +
        '<div class="pd-chip-row">' + sfChips(cur) + (cur.updatedAt ? '<span class="pd-chip">' + esc(cur.updatedAt) + '</span>' : '') + '</div>' +
        '<div class="pd-ver-switch"><span class="pd-ver-switch-label">⎇ 버전 ' + sorted.length + '</span>' + pills + '</div>' +
        '</div>';
    }
    var groups = {}, order = [];
    projs.forEach(function (p) { var g = p.versionGroup || ('__' + (p.slug || p.path)); if (!groups[g]) { groups[g] = []; order.push(g); } groups[g].push(p); });
    var projCount = order.length;
    var cards = order.map(function (g) { var vs = groups[g]; return vs.length > 1 ? groupedCard(vs) : singleCard(vs[0]); }).join('');
    // 새 프로젝트 만들기 — 구체적 단계 가이드(코딩 불필요)
    var steps = [
      ['이 폴더를 <b>AI 코딩 도구</b>로 연다', '<b>Cursor·Antigravity·Orca·Claude Code</b> 등 어디든 — 작업 규칙은 <code>AGENTS.md</code>가 자동 적용된다. 새로 시작이면 GitHub에서 <b>“Use this template”</b>로 내 레포를 먼저 만든다.'],
      ['<code>/pd-init</code> 입력 → 질문에 답만', '프로젝트 <b>이름</b>·<b>서피스</b>(모바일/PC웹/태블릿/키오스크)·버전을 물어본다. 답하면 <code>projects/&lt;이름&gt;/</code> 폴더가 자동 생성되고 이 목록에 등록된다. <i>직접 폴더·파일을 만들 필요 없음.</i>'],
      ['<code>/pd-prd</code> → 상위 기획(PRD) 작성', '핵심만 적으면 된다. 부족하면 되물어 채워준다(역질문). 정본은 <code>docs/PRD.md</code>로 버전 관리된다.'],
      ['<code>/pd-scaffold</code> → 기본 화면 자동 생성', 'PRD에서 기본 프로세스 화면들을 뽑아준다. 이후 <code>/pd-wireframe</code> → <code>/pd-cases</code> → <code>/pd-interface</code>로 화면을 상세화.'],
    ];
    var stepHtml = steps.map(function (s, i) {
      return '<li class="pd-step-item"><div class="pd-step-n">' + (i + 1) + '</div>' +
        '<div class="pd-step-body"><div class="pd-step-t">' + s[0] + '</div><div class="pd-step-d">' + s[1] + '</div></div></li>';
    }).join('');
    var roleChips = [
      ['🧭', '기획자', 'PRD→화면→프로토타입 저작(유일한 저작)'],
      ['🎨', '디자이너', '상태까지 확인 → Figma 연결'],
      ['💻', '개발자', 'API계약·핸드오프 수령 → IDE'],
      ['🧪', 'QA', '수용기준·.feature 수령 → 러너'],
      ['👁', '의사결정자', '검토모드로 프로토타입 결재'],
    ].map(function (r) { return '<div class="pd-role-chip"><span class="pd-rc-ico">' + r[0] + '</span><div><div class="pd-rc-n">' + esc(r[1]) + '</div><div class="pd-rc-d">' + esc(r[2]) + '</div></div></div>'; }).join('');
    var howto = '<section class="pd-howto">' +
      '<div class="pd-howto-head"><span class="pd-howto-title">📖 PlanDeck 이렇게 씁니다</span>' +
      '<a class="pd-guide-btn" href="guide.html">활용 가이드 자세히 보기 →</a></div>' +
      '<div class="pd-howto-lead"><b>기획자가 주도</b>해 <b>클릭 가능한 화면설계서(프로토타입)</b>를 만들고, 디자이너·개발자·QA가 각자 필요한 정보를 한곳에서 확인하는 <b>기획 명세 SSOT</b>입니다. 탭·폼·별점·검색이 실제로 반응하고 눌러서 화면 이동까지 — 디자인·개발 전에 "실제 서비스가 어떻게 동작할지"를 그대로 시연·소통합니다. (Figma·IDE·테스트 러너를 대체하지 않음)</div>' +
      '<div class="pd-role-chips">' + roleChips + '</div>' +
      '</section>';
    var guide = '<section class="pd-newproj">' +
      '<div class="pd-newproj-head"><span class="pd-newproj-title">🚀 새 프로젝트 만들기</span>' +
      '<span class="pd-newproj-badge">약 3분 · 코딩 불필요</span></div>' +
      '<ol class="pd-steps">' + stepHtml + '</ol>' +
      '<div class="pd-newproj-foot">아래 <code>/pd-*</code> 는 <b>Claude Code</b> 커맨드입니다. Cursor·Antigravity·Orca 등 다른 도구에선 같은 내용을 <b>자연어로</b> 요청하세요(규칙은 <code>AGENTS.md</code>가 보장). · 막히면 <code>/pd</code> — 지금 뭘 할지 안내. · 브라우저로 보기: <b>start.command</b>(맥)/<b>start.bat</b>(윈도) 더블클릭 → 자동 오픈.' +
      ' · <b>활용 가이드:</b> <a href="guide.html">전체 가이드(역할별·최초설정)</a> · 문서: <a href="docs/GUIDE.md">GUIDE</a> · <a href="docs/TEAM.md">TEAM</a> · <a href="docs/OPERATIONS.md">OPERATIONS</a></div>' +
      '</section>';

    el.className = 'pd-ws';
    el.innerHTML =
      '<div class="pd-ws-head"><h1>' + esc(ws.org || 'PlanDeck') + ' 워크스페이스</h1>' +
      '<div class="pd-prd-sub">여러 기획 프로젝트를 한곳에서. 아래에서 프로젝트를 열거나, 새로 만드세요.</div></div>' +
      dupWarn +
      howto +
      guide +
      '<div class="pd-ws-projects"><h2>내 프로젝트' + (projCount ? ' <span class="pd-dim">(' + projCount + ')</span>' : '') + '</h2>' +
      (projCount ? '<div class="pd-proj-grid">' + cards + '</div>'
        : '<div class="pd-empty"><div class="pd-empty-icon">🗂️</div><div class="pd-empty-title">아직 프로젝트가 없습니다</div><div class="pd-empty-sub">위 <b>새 프로젝트 만들기</b>의 <code>/pd-init</code> 로 시작하세요.</div></div>') +
      '</div>';
  }

  // ═══ 13. 플로우 뷰(#pd-flows-root) — 플로우별 필름스트립(실제 화면 썸네일) ═══
  function deviceForPage(p) {
    var key = (p && surfaceDeviceKey(p)) || PROJECT.device || 'mobile';
    var d = DEVICES[key]; if (d && d.toggle) d = DEVICES[d.default || d.toggle[0]];
    return d || { width: 360, height: 782 };
  }
  function renderFlows() {
    var el = document.getElementById('pd-flows-root');
    el.className = 'pd-appshell';
    var flows = window.PLANDECK_FLOWS || window.PDK_FLOWS || [];
    var byId = {}; flatPages().forEach(function (p) { byId[p.id] = p; });
    // 채널(surface) 필터 — ?surface= 로 채널별 보기(공유 가능). 칩은 무JS 링크.
    var sel = ''; try { sel = new URLSearchParams(location.search).get('surface') || ''; } catch (e) {}
    var surfaces = []; flows.forEach(function (f) { if (f.surface && surfaces.indexOf(f.surface) < 0) surfaces.push(f.surface); });
    var shown = sel ? flows.filter(function (f) { return f.surface === sel; }) : flows;
    var chips = flows.length ? ('<div class="pd-chips pd-flow-filter"><a class="pd-chip' + (sel ? '' : ' is-active') + '" href="flows.html">전체 ' + flows.length + '</a>' +
      surfaces.map(function (s) { var n = flows.filter(function (f) { return f.surface === s; }).length; return '<a class="pd-chip' + (sel === s ? ' is-active' : '') + '" href="flows.html?surface=' + encodeURIComponent(s) + '">' + esc(s) + ' ' + n + '</a>'; }).join('') + '</div>') : '';
    var head =
      '<h1 style="font-size:28px;font-weight:800;margin-bottom:6px">주요 플로우</h1>' +
      '<div class="pd-prd-sub">제품의 핵심 여정을 플로우별로 모아 봅니다. 카드를 누르면 해당 화면이 열려요. 채널별로 필터할 수 있어요.</div>' + chips;
    if (!flows.length) {
      el.innerHTML = pageShell('flows', head + '<div class="pd-empty"><div class="pd-empty-icon">🧭</div><div class="pd-empty-title">등록된 플로우가 없습니다</div><div class="pd-empty-sub"><code>/pd-flow</code> 로 주요 플로우를 정의하세요.</div></div>');
      return;
    }
    var blocks = shown.map(function (f) {
      var steps = (f.steps || []).map(function (s) { return typeof s === 'string' ? { screen: s } : s; });
      var strip = '';
      steps.forEach(function (st, i) {
        var p = byId[st.screen];
        if (i > 0) strip += '<div class="pd-step-arrow"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>' + (st.via ? '<span class="via">' + esc(st.via) + '</span>' : '') + '</div>';
        if (!p) { strip += '<div class="pd-step"><span class="pd-step-frame pd-step-card pd-step-missing"><span class="pd-step-card-bar"></span><span class="pd-step-card-name">미등록</span></span><div class="pd-step-id">' + esc(st.screen) + '</div></div>'; return; }
        var d = deviceForPage(p), wide = d.width > d.height;
        strip += '<div class="pd-step">' +
          '<a class="pd-step-frame pd-step-card' + (wide ? ' wide' : '') + '" href="' + esc(p.href) + '" title="' + esc(p.label) + '">' +
          '<span class="pd-step-card-bar"></span><span class="pd-step-card-name">' + esc(p.label) + '</span></a>' +
          '<div class="pd-step-id">' + esc(p.id) + '</div></div>';
      });
      return '<div class="pd-flow-block"><div class="pd-flow-head"><span class="pd-flow-name">' + esc(f.name) + '</span>' +
        (f.surface ? '<span class="pd-flow-meta">· ' + esc(f.surface) + '</span>' : '') + '<span class="pd-flow-meta">· ' + steps.length + '화면</span></div>' +
        (f.desc ? '<div class="pd-flow-desc">' + esc(f.desc) + '</div>' : '') +
        '<div class="pd-strip">' + strip + '</div></div>';
    }).join('');
    el.innerHTML = pageShell('flows', head + blocks);
    try { lazyLoadIframes(el); } catch (e) {}
  }

  // 목업 프로토타입 상호작용 — 탭/세그먼트 선택·칩 토글·체크박스·스위치·텍스트 입력(타이핑 확인).
  // 와이어프레임을 '클릭 가능한 프로토타입'으로: 링크(네비게이션)는 건드리지 않고 폼 요소만 반응.
  function enhanceInteractions() {
    var screen = document.querySelector('.pd-screen');
    if (!screen) return;
    // 세그먼트(탭) — 단일 선택 + .pd-tabs 안이면 해당 인덱스 패널로 내용 전환(프로토타입)
    screen.querySelectorAll('.pd-segment').forEach(function (seg) {
      seg.addEventListener('click', function (e) {
        var item = e.target; while (item && item.parentNode !== seg) item = item.parentNode;
        if (!item || item.tagName === 'A') return;
        var kids = [].slice.call(seg.children);
        var idx = kids.indexOf(item);
        kids.forEach(function (k) { k.classList.remove('is-active'); });
        item.classList.add('is-active');
        var wrap = seg.closest && seg.closest('.pd-tabs');
        if (wrap) {
          [].forEach.call(wrap.querySelectorAll('.pd-tabpanel'), function (p, i) { p.classList.toggle('is-active', i === idx); });
        }
      });
    });
    // 칩 — 개별 토글(링크/필터 칩 제외)
    screen.querySelectorAll('.pd-chips').forEach(function (grp) {
      grp.addEventListener('click', function (e) {
        var chip = e.target.closest ? e.target.closest('.pd-chip') : null;
        if (!chip || chip.tagName === 'A' || chip.getAttribute('href')) return;
        chip.classList.toggle('is-active');
      });
    });
    // 체크박스 — 토글(.on → 체크마크)
    screen.querySelectorAll('.pd-check').forEach(function (chk) {
      chk.addEventListener('click', function (e) {
        if (e.target.closest && e.target.closest('a,button')) return;
        e.preventDefault();
        chk.classList.toggle('on');
      });
    });
    // 토글 스위치 — 켜기/끄기(.is-on)
    screen.querySelectorAll('.pd-toggle').forEach(function (tg) {
      tg.addEventListener('click', function (e) {
        e.preventDefault();
        var on = tg.classList.toggle('is-on');
        tg.setAttribute('aria-checked', on ? 'true' : 'false');
      });
    });
    // 입력/텍스트 — 편집 가능(타이핑하면 텍스트가 어떻게 들어가는지 확인)
    screen.querySelectorAll('.pd-input, .pd-textarea').forEach(function (inp) {
      if ((inp.querySelector && inp.querySelector('input,textarea')) || inp.getAttribute('contenteditable')) return;
      if (inp.classList.contains('ph')) inp.setAttribute('data-ph', inp.textContent);
      inp.setAttribute('contenteditable', 'true');
      inp.setAttribute('role', 'textbox'); inp.setAttribute('tabindex', '0');
      inp.addEventListener('focus', function () {
        if (inp.classList.contains('ph')) { inp.textContent = ''; inp.classList.remove('ph'); }
      });
      inp.addEventListener('blur', function () {
        if (!(inp.textContent || '').trim()) { var ph = inp.getAttribute('data-ph'); if (ph != null) { inp.textContent = ph; inp.classList.add('ph'); } }
      });
      if (inp.classList.contains('pd-input')) inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') e.preventDefault(); });
    });
    // 별점(rating) — 별 클릭 시 해당 별까지 채움
    screen.querySelectorAll('.pd-rating-input').forEach(function (rt) {
      rt.addEventListener('click', function (e) {
        var star = e.target; while (star && star.parentNode !== rt) star = star.parentNode;
        if (!star) return;
        var kids = [].slice.call(rt.children); var idx = kids.indexOf(star);
        kids.forEach(function (s, i) { s.classList.toggle('is-filled', i <= idx); });
      });
    });
    // 수량 스테퍼(±) — pd-qty-n 증감(최소 1)
    screen.querySelectorAll('.pd-qty').forEach(function (q) {
      q.addEventListener('click', function (e) {
        var btn = e.target.closest ? e.target.closest('.pd-qty-btn') : null;
        if (!btn) return;
        var btns = [].slice.call(q.querySelectorAll('.pd-qty-btn'));
        var plus = btns.indexOf(btn) === btns.length - 1;
        var numEl = q.querySelector('.pd-qty-n'); if (!numEl) return;
        var n = parseInt((numEl.textContent || '1').replace(/[^0-9]/g, ''), 10) || 1;
        numEl.textContent = plus ? n + 1 : Math.max(1, n - 1);
      });
    });
    // 아코디언(FAQ 등) — 질문(.pd-acc-q) 클릭 시 답변 펼침/접힘
    screen.querySelectorAll('.pd-acc-q').forEach(function (q) {
      q.addEventListener('click', function (e) {
        e.preventDefault();
        var item = q.closest ? q.closest('.pd-acc-item') : q.parentNode;
        if (item) item.classList.toggle('is-open');
      });
    });
    // 검색바 — 텍스트 편집 가능(타이핑). 아이콘 유지한 채 플레이스홀더 텍스트만 span으로 감싸 편집.
    screen.querySelectorAll('.pd-searchbar').forEach(function (sb) {
      if (sb.querySelector('.pd-sb-text')) return;
      var tn = null; [].forEach.call(sb.childNodes, function (n) { if (n.nodeType === 3 && n.textContent.trim()) tn = n; });
      if (!tn) return;
      var span = document.createElement('span');
      span.className = 'pd-sb-text ph'; span.setAttribute('contenteditable', 'true'); span.setAttribute('role', 'textbox');
      var ph = tn.textContent.trim(); span.setAttribute('data-ph', ph); span.textContent = ph;
      tn.parentNode.replaceChild(span, tn);
      span.addEventListener('focus', function () { if (span.classList.contains('ph')) { span.textContent = ''; span.classList.remove('ph'); } });
      span.addEventListener('blur', function () { if (!(span.textContent || '').trim()) { span.textContent = span.getAttribute('data-ph'); span.classList.add('ph'); } });
      span.addEventListener('keydown', function (e) { if (e.key === 'Enter') e.preventDefault(); });
    });
  }

  // ═══ init ═══
  function init() {
    var bare = false;
    try { bare = new URLSearchParams(location.search).get('bare') === '1'; } catch (e) {}
    if (bare) document.body.classList.add('pd-bare');
    if (document.getElementById('pd-handoff-root')) { return; }  // 핸드오프는 handoff.js가 렌더(여기선 셸 헬퍼만 노출)
    if (document.getElementById('pd-workspace-root')) { try { renderWorkspace(); } catch (e) {} return; }
    if (document.getElementById('pd-prd-root')) { try { renderPRD(); } catch (e) {} return; }
    if (document.getElementById('pd-ia-root')) { try { renderIA(); } catch (e) {} return; }
    if (document.getElementById('pd-features-root')) { try { renderFeatures(); } catch (e) {} return; }
    if (document.getElementById('pd-components-root')) { try { renderComponents(); } catch (e) {} return; }
    if (document.getElementById('pd-overview-root')) { try { renderOverview(); } catch (e) {} return; }
    if (document.getElementById('pd-spec-root')) { try { renderSpec(); } catch (e) {} return; }
    if (document.getElementById('pd-flows-root')) { try { renderFlows(); } catch (e) {} return; }
    try { applySurfaceDevice(); } catch (e) {}
    try { injectMobileChrome(); } catch (e) {}
    try { injectWideChrome(); } catch (e) {}
    try { applyFidelity(); } catch (e) {}   // 충실도(와이어/디자인/프로토타입) — 썸네일에도 반영
    if (bare) return;   // 썸네일(bare): 디바이스만 렌더, 패널 생략
    try { injectScreenTopnav(); } catch (e) {}
    try { injectScreenMeta(); } catch (e) {}
    try { injectFidelityToggle(); } catch (e) {}
    try { injectStatusChips(); } catch (e) {}
    try { injectNavSearch(); } catch (e) {}
    try { enhanceFlowPanel(); } catch (e) {}
    try { enhanceDescPanel(); } catch (e) {}
    try { injectCasesPanel(); } catch (e) {}
    try { injectInterfacePanel(); } catch (e) {}
    try { injectDockButtons(); } catch (e) {}
    try { injectPageNavToggle(); } catch (e) {}
    try { injectLintBanner(); } catch (e) {}
    try { bindActions(); } catch (e) {}
    try { setupReviewMode(); } catch (e) {}
    try { enhanceInteractions(); } catch (e) {}
  }
  // common.js 의 동기 init 이 끝난 뒤 실행
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(init, 0); });
  } else {
    setTimeout(init, 0);
  }

  // 외부(핸드오프 등)에서 쓰도록 노출 — 셸/네비는 SSOT로 여기만 소유(복제 금지)
  window.PlanDeck = {
    screens: SCREENS, project: PROJECT, entities: ENTITIES,
    SCREEN_STATES: SCREEN_STATES, VALIDATION_STATES: VALIDATION_STATES,
    flatPages: flatPages, resolveRef: resolveRef, specHash: specHash, lint: lint,
    DOC_LINKS: DOC_LINKS, sideNavLinks: sideNavLinks, pageShell: pageShell,
    docFilterBar: docFilterBar, wireDocFilter: wireDocFilter, lazyLoadIframes: lazyLoadIframes,
  };
})();
