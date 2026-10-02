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

  // ═══ 1. 멀티서피스: 현재 화면의 서피스 디바이스로 재적용 ═══
  function surfaceDeviceKey(page) {
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
    var isTablet = d.width < 1100;
    stage.classList.add('pd-wide');
    if (isTablet) stage.classList.add('pd-tablet');
    var root = screen.querySelector('.pd-screen');
    if (root) root.classList.add('pd-web');
    if (!isTablet && root && !screen.querySelector('.pd-browserbar')) {   // PC웹 브라우저 크롬
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
      return '<div class="pd-field"><code>' + esc(f.name) + '</code> <span class="pd-type">' + esc(f.type) +
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
  function renderPRD() {
    var el = document.getElementById('pd-prd-root');
    var d = window.PLANDECK_PRD || {};
    var sec = function (t, html) { return '<div class="pd-prd-sec"><h2>' + t + '</h2>' + html + '</div>'; };
    el.className = 'pd-prd-doc';
    el.innerHTML =
      '<div class="pd-prd-nav"><a href="index.html">← 개요</a><a href="docs/PRD.md">📄 PRD.md 원본</a><a href="handoff.html">개발 핸드오프 →</a></div>' +
      '<div class="pd-banner" style="margin-bottom:16px">이 화면은 <b>docs/PRD.md</b>(정본)를 렌더한 것입니다. 수정은 PRD.md를 고치거나 <code>/pd-prd</code>로 — 버전을 올리며 갱신돼요.</div>' +
      '<h1>' + esc(PROJECT.name || '제품요구정의서(PRD)') + '</h1>' +
      '<div class="pd-prd-sub">' + esc(PROJECT.description || '') + '</div>' +
      sec('① 배경', '<p>' + esc(d.background) + '</p>') +
      sec('② 목표', ul(d.goals)) +
      sec('③ 사용자', ul(d.users, function (u) { return u.role ? ('<b>' + esc(u.role) + '</b> — ' + esc(u.jobStory || '')) : esc(u); })) +
      sec('④ 범위', '<b>포함</b>' + ul(d.scope) + '<b>제외(Out of Scope)</b>' + ul(d.outOfScope)) +
      sec('⑤ 성공지표', ul(d.successMetrics, function (m) { return m.metric ? (esc(m.metric) + ' — <b>' + esc(m.target || '') + '</b>') : esc(m); })) +
      sec('⑥ 제약·가정·의존성', '<b>제약</b>' + ul(d.constraints) + '<b>가정</b>' + ul(d.assumptions) + '<b>의존성</b>' + ul(d.dependencies)) +
      sec('⑦ 릴리스', ul(d.releases, function (r) { return r.name ? ('<b>' + esc(r.name) + '</b> — ' + esc((r.scope || []).join(', ')) + (r.when ? ' (' + esc(r.when) + ')' : '')) : esc(r); })) +
      sec('요구사항(화면 추적)', ul(d.requirements, function (r) { return '<code>' + esc(r.reqId) + '</code> ' + esc(r.text); })) +
      (d.openQuestions && d.openQuestions.length ? sec('⚠️ 미결 질문', ul(d.openQuestions)) : '');
  }

  // ═══ 8. 개요/인벤토리 렌더 (#pd-overview-root) ═══
  function renderOverview() {
    var el = document.getElementById('pd-overview-root');
    el.className = 'pd-prd-doc';
    var d = window.PLANDECK_PRD || {};
    var surfaces = PROJECT.surfaces || [];
    var pages = flatPages();

    var surfaceTabs = surfaces.length
      ? '<div class="pd-chip-row">' + surfaces.map(function (s) {
          var n = pages.filter(function (p) { return p.surface === s.key; }).length;
          return '<span class="pd-chip">' + esc(s.label || s.key) + ' · ' + n + '화면</span>';
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
        return '<tr><td><a href="' + esc(p.href) + '">' + esc(p.label) + '</a>' + (p.entry ? ' <span class="pd-tag">진입</span>' : '') + '</td>' +
          '<td><code>' + esc(p.id) + '</code></td>' +
          '<td>' + (p.surface ? esc(p.surface) : '<span class="pd-dim">—</span>') + '</td>' +
          '<td>' + chip + '</td><td>' + marks.join(' ') + '</td></tr>';
      }).join('');
      return '<div class="pd-prd-sec"><h2>' + esc(cat.category || '화면') + '</h2>' +
        '<div class="pd-table-wrap"><table class="pd-table"><thead><tr><th>화면</th><th>ID</th><th>서피스</th><th>상태</th><th>레이어</th></tr></thead><tbody>' + rows + '</tbody></table></div></div>';
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
      '<div class="pd-dash-stat"><b>' + done.ready + '</b>개발준비</div></div>' +
      '<div class="pd-bar"><div class="pd-bar-fill" style="width:' + pct + '%"></div></div>' +
      '<div class="pd-dash-pct">완결성 ' + pct + '%</div></div>') : '';

    var nextCard = '<div class="pd-prd-sec pd-next"><h2>👉 다음 할 일</h2>' +
      '<div class="pd-next-cmd"><code>' + esc(next.cmd) + '</code></div>' +
      '<div class="pd-next-why">' + esc(next.why) + '</div>' +
      '<div class="pd-dim" style="margin-top:8px;font-size:12.5px">막히면 <code>/pd</code> 만 치세요 — 지금 뭘 할지 안내합니다.</div></div>';

    var quick = '<div class="pd-chip-row" style="margin:14px 0">' +
      '<a class="pd-chip pd-link" href="prd.html">📋 PRD</a>' +
      '<a class="pd-chip pd-link" href="flows.html">🧭 주요 플로우</a>' +
      '<a class="pd-chip pd-link" href="spec.html">📄 상세 기획서</a>' +
      '<a class="pd-chip pd-link" href="handoff.html">🔌 개발·QA 핸드오프</a>' +
      (n ? '<a class="pd-chip pd-link" href="' + esc((pages.filter(function(p){return p.entry;})[0] || pages[0]).href) + '?mode=review">👁 검토 모드(프로토타입)</a>' : '') +
      '</div>';

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

    el.innerHTML =
      '<div class="pd-prd-nav"><a href="prd.html">PRD →</a><a href="spec.html">상세 기획서 →</a><a href="handoff.html">핸드오프 →</a><a href="../../index.html">⌂ 워크스페이스</a></div>' +
      '<h1>' + esc(PROJECT.name || 'PlanDeck 프로젝트') + (PROJECT.version ? '<span class="pd-ver-badge">v' + esc(PROJECT.version) + '</span>' : '') + '</h1>' +
      '<div class="pd-prd-sub">' + esc(PROJECT.description || '아직 설정 전 — <code>/pd-init</code> 으로 시작하세요.') + '</div>' +
      surfaceTabs + quick + progressCard + nextCard +
      (d.goals && d.goals.length ? '<div class="pd-prd-sec"><h2>목표</h2>' + ul(d.goals) + '</div>' : '') +
      (pages.length ? inv : '<div class="pd-empty"><div class="pd-empty-icon">🗂️</div><div class="pd-empty-title">아직 화면이 없습니다</div><div class="pd-empty-sub"><code>/pd-prd</code> → <code>/pd-scaffold</code> 로<br>PRD에서 화면을 생성하세요.</div></div>') +
      verCard + cheat;
  }

  // ═══ 9. 상세 기획서 렌더 (#pd-spec-root) — 의사결정자/팀 열람·인쇄용 ═══
  function renderSpec() {
    var el = document.getElementById('pd-spec-root');
    el.className = 'pd-prd-doc pd-spec-doc';
    var pages = flatPages();
    var head =
      '<div class="pd-prd-nav"><a href="index.html">← 개요</a><a href="prd.html">PRD →</a>' +
      '<a href="#" onclick="window.print();return false;">🖨 인쇄</a></div>' +
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
        .concat((itf.reads || []).map(function (o) { return '<li>📖 <code>' + esc(o.method || 'GET') + ' ' + esc(o.path || '') + '</code> — ' + esc(o.intent || '') + '</li>'; })).join('');
      var flow = ((p.flow && p.flow.to) || []).map(function (t) {
        return '<li>' + (t.via ? '[' + esc(t.via) + '] ' : '') + '→ ' + esc(t.screen) + (t.branch ? ' <span class="pd-dim">(' + esc(t.branch) + ')</span>' : '') + '</li>';
      }).join('');
      return '<div class="pd-prd-sec pd-spec-screen">' +
        '<h2>' + esc(p.label) + ' <code>' + esc(p.id) + '</code> <span class="pd-status-chip ' + st.cls + '">' + st.label + '</span>' +
          (p.surface ? ' <span class="pd-tag">' + esc(p.surface) + '</span>' : '') + '</h2>' +
        (p.context ? '<p><b>목적/맥락</b> — ' + esc(p.context) + '</p>' : '') +
        '<div class="pd-spec-grid">' +
          '<div><h3>구성요소/버튼</h3>' + (comp ? '<ul>' + comp + '</ul>' : '<span class="pd-dim">—</span>') + '</div>' +
          '<div><h3>동작/설명</h3>' + (desc ? '<ul>' + desc + '</ul>' : '<span class="pd-dim">—</span>') + '</div>' +
          '<div><h3>화면 흐름</h3>' + (flow ? '<ul>' + flow + '</ul>' : '<span class="pd-dim">진입/종료</span>') + '</div>' +
          '<div><h3>개발 인터페이스</h3>' + (ops ? '<ul>' + ops + '</ul>' : '<span class="pd-dim">—</span>') + '</div>' +
        '</div>' +
        (cases ? '<h3>경우의 수(예외)</h3><div class="pd-table-wrap"><table class="pd-table"><thead><tr><th>상태</th><th>트리거/조건</th><th>결과</th><th>안내문구</th></tr></thead><tbody>' + cases + '</tbody></table></div>' : '') +
        (p.href ? '<p><a href="' + esc(p.href) + '">↗ 이 화면 프로토타입 열기</a></p>' : '') +
        '</div>';
    }).join('');
    el.innerHTML = head + (pages.length ? body : '<div class="pd-empty"><div class="pd-empty-icon">📄</div><div class="pd-empty-title">아직 화면이 없습니다</div></div>');
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
    if (on) { document.body.classList.add('pd-review-mode'); reviewSet(true); reviewBanner(); }
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
    });
    sync();
    document.body.appendChild(btn);
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
    var cards = projs.map(function (p) {
      var sf = (p.surfaces || []).map(function (s) { return '<span class="pd-chip">' + esc(s) + '</span>'; }).join('');
      return '<a class="pd-proj-card" href="' + esc(p.path) + 'index.html">' +
        '<div class="pd-proj-head"><span class="pd-proj-name">' + esc(p.name) + '</span>' +
        (p.tag ? '<span class="pd-status-chip is-wire">' + esc(p.tag) + '</span>' : '') + '</div>' +
        '<div class="pd-proj-desc">' + esc(p.desc || '') + '</div>' +
        '<div class="pd-chip-row">' + sf + (p.version ? '<span class="pd-chip">v' + esc(p.version) + '</span>' : '') +
        (p.updatedAt ? '<span class="pd-chip">' + esc(p.updatedAt) + '</span>' : '') + '</div>' +
        '</a>';
    }).join('');
    el.innerHTML =
      '<h1>' + esc(ws.org || 'PlanDeck') + ' 워크스페이스</h1>' +
      '<div class="pd-prd-sub">여러 기획 프로젝트를 한곳에서. 프로젝트를 열어 기획서를 확인하세요.</div>' +
      dupWarn +
      (projs.length ? '<div class="pd-proj-grid">' + cards + '</div>'
        : '<div class="pd-empty"><div class="pd-empty-icon">🗂️</div><div class="pd-empty-title">아직 프로젝트가 없습니다</div><div class="pd-empty-sub">Claude Code 에서 <code>/pd-init</code> 으로<br>새 프로젝트를 만드세요.</div></div>') +
      '<div class="pd-prd-sec" style="margin-top:28px"><h2>새 프로젝트 시작</h2>' +
      '<p>Claude Code 에서 <code>/pd-init</code> → <code>/pd-prd</code> → <code>/pd-scaffold</code>. 막히면 <code>/pd</code>.</p>' +
      '<p class="pd-dim">문서: <a href="docs/GUIDE.md">GUIDE</a> · <a href="docs/TEAM.md">TEAM</a> · <a href="docs/OPERATIONS.md">OPERATIONS</a></p></div>';
  }

  // ═══ 13. 플로우 뷰(#pd-flows-root) — 플로우별 필름스트립(실제 화면 썸네일) ═══
  function deviceForPage(p) {
    var key = (p && surfaceDeviceKey(p)) || PROJECT.device || 'mobile';
    var d = DEVICES[key]; if (d && d.toggle) d = DEVICES[d.default || d.toggle[0]];
    return d || { width: 360, height: 782 };
  }
  function renderFlows() {
    var el = document.getElementById('pd-flows-root');
    el.className = 'pd-flows-doc';
    var flows = window.PLANDECK_FLOWS || window.PDK_FLOWS || [];
    var byId = {}; flatPages().forEach(function (p) { byId[p.id] = p; });
    var head = '<div class="pd-prd-nav"><a href="index.html">← 개요</a><a href="spec.html">상세 기획서 →</a><a href="handoff.html">핸드오프 →</a></div>' +
      '<h1 style="font-size:28px;font-weight:800;margin-bottom:6px">주요 플로우</h1>' +
      '<div class="pd-prd-sub">제품의 핵심 여정을 플로우별로 모아 봅니다. 썸네일을 누르면 해당 화면이 열려요. (화면이 많아져도 플로우 단위로 정리됩니다)</div>';
    if (!flows.length) {
      el.innerHTML = head + '<div class="pd-empty"><div class="pd-empty-icon">🧭</div><div class="pd-empty-title">등록된 플로우가 없습니다</div><div class="pd-empty-sub"><code>/pd-flow</code> 로 주요 플로우를 정의하세요.</div></div>';
      return;
    }
    var blocks = flows.map(function (f) {
      var steps = (f.steps || []).map(function (s) { return typeof s === 'string' ? { screen: s } : s; });
      var strip = '';
      steps.forEach(function (st, i) {
        var p = byId[st.screen];
        if (i > 0) strip += '<div class="pd-step-arrow"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>' + (st.via ? '<span class="via">' + esc(st.via) + '</span>' : '') + '</div>';
        if (!p) { strip += '<div class="pd-step"><div class="pd-step-frame" style="display:flex;align-items:center;justify-content:center;color:#9aa0a8">미등록</div><div class="pd-step-label">' + esc(st.screen) + '</div></div>'; return; }
        var d = deviceForPage(p), devW = d.width, devH = d.height, wide = devW > devH;
        var fw = wide ? 260 : 150, scale = (fw / devW).toFixed(4);
        strip += '<div class="pd-step">' +
          '<a class="pd-step-frame' + (wide ? ' wide' : '') + '" href="' + esc(p.href) + '" title="' + esc(p.label) + '">' +
          '<iframe src="' + esc(p.href) + '?bare=1" scrolling="no" style="width:' + devW + 'px;height:' + devH + 'px;transform:scale(' + scale + ')"></iframe></a>' +
          '<div class="pd-step-label">' + esc(p.label) + '</div><div class="pd-step-id">' + esc(p.id) + '</div></div>';
      });
      return '<div class="pd-flow-block"><div class="pd-flow-head"><span class="pd-flow-name">' + esc(f.name) + '</span>' +
        (f.surface ? '<span class="pd-flow-meta">· ' + esc(f.surface) + '</span>' : '') + '<span class="pd-flow-meta">· ' + steps.length + '화면</span></div>' +
        (f.desc ? '<div class="pd-flow-desc">' + esc(f.desc) + '</div>' : '') +
        '<div class="pd-strip">' + strip + '</div></div>';
    }).join('');
    el.innerHTML = head + blocks;
  }

  // ═══ init ═══
  function init() {
    var bare = false;
    try { bare = new URLSearchParams(location.search).get('bare') === '1'; } catch (e) {}
    if (bare) document.body.classList.add('pd-bare');
    if (document.getElementById('pd-workspace-root')) { try { renderWorkspace(); } catch (e) {} return; }
    if (document.getElementById('pd-prd-root')) { try { renderPRD(); } catch (e) {} return; }
    if (document.getElementById('pd-overview-root')) { try { renderOverview(); } catch (e) {} return; }
    if (document.getElementById('pd-spec-root')) { try { renderSpec(); } catch (e) {} return; }
    if (document.getElementById('pd-flows-root')) { try { renderFlows(); } catch (e) {} return; }
    try { applySurfaceDevice(); } catch (e) {}
    try { injectMobileChrome(); } catch (e) {}
    try { injectWideChrome(); } catch (e) {}
    if (bare) return;   // 썸네일(bare): 디바이스만 렌더, 패널 생략
    try { injectStatusChips(); } catch (e) {}
    try { injectCasesPanel(); } catch (e) {}
    try { injectInterfacePanel(); } catch (e) {}
    try { injectDockButtons(); } catch (e) {}
    try { injectLintBanner(); } catch (e) {}
    try { bindActions(); } catch (e) {}
    try { setupReviewMode(); } catch (e) {}
  }
  // common.js 의 동기 init 이 끝난 뒤 실행
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(init, 0); });
  } else {
    setTimeout(init, 0);
  }

  // 외부(핸드오프 등)에서 쓰도록 노출
  window.PlanDeck = {
    screens: SCREENS, project: PROJECT, entities: ENTITIES,
    SCREEN_STATES: SCREEN_STATES, VALIDATION_STATES: VALIDATION_STATES,
    flatPages: flatPages, resolveRef: resolveRef, specHash: specHash, lint: lint,
  };
})();
