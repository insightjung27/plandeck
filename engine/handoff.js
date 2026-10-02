/* ═══════════════════════════════════════════════════════════════════
 * PlanDeck 개발 핸드오프 집계기 (engine/handoff.js)
 * 전 화면의 interface/entities/cases 를 모아 클라이언트 JS 만으로:
 *   (1) 사람용 마크다운 스펙   (2) 개발자용 OpenAPI 3.1 JSON
 *   (3) 코딩 에이전트용 번들 JSON   (4) 완결성 커버리지 대시보드
 * 서버·번들러·외부 라이브러리 없음(무빌드). #pd-handoff-root 에 렌더.
 * ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var SCREENS = window.PLANDECK_SCREENS || window.PDK_SCREENS || [];
  var PROJECT = window.PLANDECK_PROJECT || window.PDK_PROJECT || {};
  var ENTITIES = window.PLANDECK_ENTITIES || window.PDK_ENTITIES || {};
  var CONST = PROJECT.constitution || {};

  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function flat() { var o = []; SCREENS.forEach(function (c) { (c.pages || []).forEach(function (p) { o.push(p); }); }); return o; }

  // 앱 셸은 plandeck.js(SSOT)가 소유 — 복제 금지, window.PlanDeck 로 위임(handoff.html 이 plandeck.js 선로드).
  function pageShell(active, bodyHtml, actionsHtml) {
    if (window.PlanDeck && window.PlanDeck.pageShell) return window.PlanDeck.pageShell(active, bodyHtml, actionsHtml);
    // 폴백(plandeck.js 미로드 시): 네비 없는 단순 본문
    return '<main class="pd-main" style="margin-left:0"><div class="pd-doc pd-prd-doc">' +
      '<nav class="pd-prd-nav"><a class="pd-nav-link" href="index.html">← 개요</a></nav>' + bodyHtml + '</div></main>';
  }
  function refName(ref) { var m = String(ref || '').match(/^\{entities\.([A-Za-z0-9_]+)\}$/); return m ? m[1] : null; }

  // ── (2) OpenAPI 3.1 ──
  var OAS_WARNINGS = [];
  function entityFieldType(entityName, fieldName) {
    var e = ENTITIES[entityName]; if (!e) return null;
    var f = (e.fields || []).filter(function (x) { return x.name === fieldName; })[0];
    return f ? { type: f.type, format: f.format } : null;
  }
  function toSchema(entity) {
    var props = {}, req = [];
    (entity.fields || []).forEach(function (f) {
      var s = { type: f.type };
      if (f.format) s.format = f.format;
      if (f.enum) s.enum = f.enum;
      if (f.example !== undefined) s.example = f.example;
      if (f.note) s.description = f.note;
      props[f.name] = s;
      if (f.required) req.push(f.name);
    });
    var out = { type: 'object', properties: props };
    if (req.length) out.required = req;
    if (entity.description) out.description = entity.description;
    return out;
  }
  // '{entities.X}' 또는 '{entities.X}[]'(배열) 해석
  function schemaFor(ref) {
    var raw = String(ref || ''), arr = false;
    if (/\[\]\s*$/.test(raw)) { arr = true; raw = raw.replace(/\[\]\s*$/, ''); }
    var n = refName(raw);
    var base = n ? { $ref: '#/components/schemas/' + n } : { type: 'string', description: raw };
    return arr ? { type: 'array', items: base } : base;
  }
  // path 의 {토큰} → path 파라미터 (엔티티 id 타입 연결)
  function pathParamsOf(path, o) {
    var toks = (path.match(/\{([^}]+)\}/g) || []).map(function (t) { return t.slice(1, -1); });
    return toks.map(function (name) {
      var schema = { type: 'string' };
      var reqName = refName(o.response) || refName(o.request);
      if (reqName) { var ft = entityFieldType(reqName, name) || entityFieldType(reqName, 'id'); if (ft && name === 'id') { schema = { type: ft.type }; if (ft.format) schema.format = ft.format; } }
      return { name: name, in: 'path', required: true, schema: schema };
    });
  }
  function explicitParams(o) {
    return (o.params || []).map(function (pm) {
      var schema = { type: pm.type || 'string' };
      if (pm.format) schema.format = pm.format;
      if (pm.enum) schema.enum = pm.enum;
      var out = { name: pm.name, in: pm.in || 'query', required: !!pm.required, schema: schema };
      if (pm.example !== undefined) out.example = pm.example;
      if (pm.note) out.description = pm.note;
      return out;
    });
  }
  function buildOpenAPI() {
    OAS_WARNINGS = [];
    var doc = {
      openapi: '3.1.0',
      info: { title: (PROJECT.name || 'PlanDeck') + ' API', version: PROJECT.version || '0.1.0', description: PROJECT.description || '' },
      servers: CONST.baseUrl ? [{ url: CONST.baseUrl }] : [],
      paths: {}, webhooks: {}, components: { schemas: {} },
    };
    Object.keys(ENTITIES).forEach(function (k) { doc.components.schemas[k] = toSchema(ENTITIES[k]); });
    // RFC 9457 Problem Details (에러 바디 공통 스키마)
    doc.components.schemas.Problem = {
      type: 'object', description: 'RFC 9457 Problem Details',
      properties: { type: { type: 'string' }, title: { type: 'string' }, status: { type: 'integer' }, detail: { type: 'string' }, instance: { type: 'string' } },
    };
    var usesAuth = false;

    flat().forEach(function (p) {
      var itf = p.interface || {};
      var ops = (itf.reads || []).map(function (o) { return { o: o, method: (o.method || 'GET').toLowerCase(), write: false }; })
        .concat((itf.writes || []).map(function (o) { return { o: o, method: (o.method || 'POST').toLowerCase(), write: true }; }));
      ops.forEach(function (x) {
        var o = x.o; if (!o.path) return;
        doc.paths[o.path] = doc.paths[o.path] || {};
        var params = pathParamsOf(o.path, o).concat(explicitParams(o));
        if (o.idempotency) params.push({ name: 'Idempotency-Key', in: 'header', required: true, schema: { type: 'string' }, description: String(o.idempotency) });
        var sc = String(o.successStatus || (x.write ? (x.method === 'delete' ? '204' : '201') : '200'));
        var op = { tags: [p.label || p.id], 'x-screens': [p.id], responses: {} };
        if (o.id) op.operationId = o.id;
        if (o.intent) op.summary = o.intent;
        if (params.length) op.parameters = params;
        // 성공 응답
        if (sc === '204') op.responses[sc] = { description: 'No Content' };
        else op.responses[sc] = o.response ? { description: 'OK', content: { 'application/json': { schema: schemaFor(o.response) } } } : { description: 'OK' };
        // 에러 응답 (RFC 9457)
        (o.errors || []).forEach(function (e) {
          op.responses[String(e.status)] = { description: (e.when || '') + (e.message ? (' — ' + e.message) : ''), content: { 'application/problem+json': { schema: { $ref: '#/components/schemas/Problem' } } } };
        });
        if (x.write && o.request) op.requestBody = { required: true, content: { 'application/json': { schema: schemaFor(o.request) } } };
        if (o.auth) { op.security = [{ bearerAuth: [] }]; usesAuth = true; }
        // 동일 path+method 중복 → 에러 union + x-screens 병합 + 경고
        var existing = doc.paths[o.path][x.method];
        if (existing) {
          OAS_WARNINGS.push('중복 ' + x.method.toUpperCase() + ' ' + o.path + ' (화면 ' + existing['x-screens'].join(',') + ' ↔ ' + p.id + ') — 병합함');
          existing['x-screens'] = existing['x-screens'].concat(op['x-screens']);
          Object.keys(op.responses).forEach(function (code) { if (!existing.responses[code]) existing.responses[code] = op.responses[code]; });
        } else {
          doc.paths[o.path][x.method] = op;
        }
      });
      // 이벤트 → webhooks
      (itf.events || []).forEach(function (ev) {
        if (!ev.name) return;
        doc.webhooks[ev.name] = { post: { 'x-screen': p.id, summary: ev.when || '', requestBody: ev.payload ? { content: { 'application/json': { schema: schemaFor(ev.payload) } } } : undefined, responses: { '200': { description: 'ack' } } } };
      });
    });
    if (!Object.keys(doc.webhooks).length) delete doc.webhooks;
    if (usesAuth || CONST.auth) doc.components.securitySchemes = { bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } };
    return doc;
  }

  // ── (1) 마크다운 스펙 ──
  function buildMarkdown() {
    var L = [];
    L.push('# ' + (PROJECT.name || 'PlanDeck') + ' — 개발 핸드오프 스펙');
    if (PROJECT.description) L.push('\n' + PROJECT.description);
    L.push('\n## 전역 규칙(Constitution)');
    L.push('- 인증: ' + (CONST.auth || '—'));
    L.push('- Base URL: ' + (CONST.baseUrl || '—'));
    L.push('- 에러 규약: ' + (CONST.errorConvention || '—'));
    L.push('\n## 데이터 모델(Entities)');
    Object.keys(ENTITIES).forEach(function (k) {
      var e = ENTITIES[k];
      L.push('\n### ' + k + (e.name ? ' (' + e.name + ')' : ''));
      if (e.description) L.push(e.description);
      (e.fields || []).forEach(function (f) {
        L.push('- `' + f.name + '`: ' + f.type + (f.format ? ':' + f.format : '') + (f.required ? ' **필수**' : '') + (f.enum ? ' [' + f.enum.join(', ') + ']' : '') + (f.note ? ' — ' + f.note : ''));
      });
    });
    L.push('\n## 화면별 명세');
    flat().forEach(function (p) {
      L.push('\n### ' + (p.label || '') + ' (`' + p.id + '`) — ' + (p.status || 'draft') + (p.surface ? ' · ' + p.surface : ''));
      if (p.context) L.push(p.context);
      var itf = p.interface || {};
      if ((itf.writes || []).length) { L.push('\n**쓰기(Commands)**'); itf.writes.forEach(function (o) { L.push('- `' + (o.method || 'POST') + ' ' + (o.path || '') + '` — ' + (o.intent || '') + (o.request ? ' · 요청 ' + (refName(o.request) || o.request) : '') + (o.response ? ' · 응답 ' + (refName(o.response) || o.response) : '')); (o.errors || []).forEach(function (e) { L.push('  - ' + e.status + ': ' + (e.when || '') + (e.message ? ' — "' + e.message + '"' : '')); }); }); }
      if ((itf.reads || []).length) { L.push('\n**읽기(Queries)**'); itf.reads.forEach(function (o) { L.push('- `' + (o.method || 'GET') + ' ' + (o.path || '') + '` — ' + (o.intent || '') + (o.response ? ' · 응답 ' + (refName(o.response) || o.response) : '')); }); }
      if ((p.cases || []).length) {
        L.push('\n**경우의 수(수용기준)**');
        p.cases.forEach(function (c) { L.push('- ' + (c.priority ? '`' + c.priority + '` ' : '') + '[' + (c.state || '') + '] ' + (c.trigger || '') + (c.guard ? ' {' + c.guard + '}' : '') + ' → ' + (c.result || '') + (c.message ? ' · "' + c.message + '"' + (c.placement ? '(' + c.placement + ')' : '') : '') + (c.recovery ? ' · 복구:' + c.recovery : '') + (c.api ? ' · ' + (c.api.status || '') + ' ' + (c.api.endpoint || '') : '') + (c.testId ? ' · ' + c.testId : '')); });
      }
    });
    return L.join('\n');
  }

  // ── (QA) Gherkin 테스트플랜 (.feature) ──
  function buildGherkin() {
    var L = ['# ' + (PROJECT.name || 'PlanDeck') + ' — QA 테스트플랜 (Gherkin)', '# cases 매트릭스에서 자동 생성 — QA 러너/수동 테스트에 투입'];
    flat().forEach(function (p) {
      var cs = (p.cases || []).filter(function (c) { return c.state !== 'N/A'; });
      if (!cs.length) return;
      L.push('\nFeature: ' + (p.label || '') + ' (' + p.id + ')');
      if (p.context) L.push('  # ' + p.context);
      cs.forEach(function (c) {
        var tags = [];
        if (c.priority) tags.push('@' + c.priority);
        if (c.testId) tags.push('@' + c.testId);
        if (tags.length) L.push('\n  ' + tags.join(' '));
        else L.push('');
        L.push('  Scenario: [' + c.state + '] ' + (c.trigger || '') + (c.guard ? (' — ' + c.guard) : ''));
        L.push('    Given ' + (p.label || '화면') + ' 상태가 "' + c.state + '"' + (c.guard ? (' (' + c.guard + ')') : ''));
        L.push('    When 사용자가 "' + (c.trigger || '진입') + '" 하면');
        L.push('    Then ' + (c.result || '처리') + (c.message ? (' 그리고 "' + c.message + '" 안내' + (c.placement ? ('(' + c.placement + ')') : '')) : ''));
        if (c.api) L.push('    And API ' + (c.api.endpoint || '') + ' 가 ' + (c.api.status || '') + ' 를 응답');
      });
    });
    return L.join('\n');
  }
  // ── (QA) 체크리스트 (.md) ──
  function buildQAChecklist() {
    var L = ['# QA 체크리스트 — ' + (PROJECT.name || ''), '', '| 화면 | 상태 | 조건/트리거 | 기대 결과 | 안내문구 | 우선순위 | TC-ID |', '|---|---|---|---|---|---|---|'];
    flat().forEach(function (p) {
      (p.cases || []).forEach(function (c) {
        if (c.state === 'N/A') return;
        L.push('| ' + (p.label || '') + ' | ' + c.state + ' | ' + (c.guard || c.trigger || '') + ' | ' + (c.result || '') + ' | ' + (c.message || '') + ' | ' + (c.priority || '') + ' | ' + (c.testId || '') + ' |');
      });
    });
    return L.join('\n');
  }

  // ── (3) 에이전트 번들 ──
  function buildBundle() {
    return { project: { name: PROJECT.name, description: PROJECT.description, version: PROJECT.version, constitution: CONST, surfaces: PROJECT.surfaces }, entities: ENTITIES, screens: flat().map(function (p) {
      return { id: p.id, label: p.label, surface: p.surface, entry: !!p.entry, reqIds: p.reqIds || [], status: p.status, designed: !!p.designed, figmaLink: p.figmaLink || '', context: p.context, components: p.components || [], description: p.description || [], cases: p.cases || [], interface: p.interface || {}, flow: (p.flow && p.flow.to) || [] };
    }) };
  }

  // ── (4) 커버리지 (실제 7상태 + 입력검증 완결성) ──
  var SCREEN_STATES = ['초기', '로딩', '정상', '빈데이터', '에러', '권한없음', '엣지'];
  var VALIDATION_STATES = ['필수누락', '형식오류', '범위경계', '중복충돌', '유효'];
  function hasInput(p) { return (p.components || []).some(function (c) { return c.kind === 'input'; }); }
  function stateCoverage(p) {
    var cases = p.cases || [], have = {};
    cases.forEach(function (c) { if (c.state) have[c.state] = true; });
    function naFor(s) { return cases.some(function (c) { return c.state === 'N/A' && (c.guard || '').indexOf(s) >= 0; }); }
    var need = SCREEN_STATES.concat(hasInput(p) ? VALIDATION_STATES : []);
    var missing = need.filter(function (s) { return !have[s] && !naFor(s); });
    return { total: need.length, covered: need.length - missing.length, missing: missing };
  }
  function coverageRows() {
    return flat().map(function (p) {
      var cov = stateCoverage(p);
      var has = {
        desc: (p.description || []).length > 0,
        cases: cov.missing.length === 0 && (p.cases || []).length > 0,   // 완결(미정의 0) 이어야 ✓
        itf: !!(p.interface && ((p.interface.reads || []).length || (p.interface.writes || []).length)),
        design: !!p.designed,
      };
      return { p: p, has: has, ready: p.status === 'ready-for-dev', cov: cov };
    });
  }

  function dl(name, text, mime) {
    var blob = new Blob([text], { type: mime || 'text/plain' });
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 0);
  }
  function copy(text, btn) {
    var done = function () { var t = btn.textContent; btn.textContent = '복사됨 ✓'; setTimeout(function () { btn.textContent = t; }, 1200); };
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, done); else done();
  }

  function render() {
    var el = document.getElementById('pd-handoff-root');
    if (!el) return;
    el.className = 'pd-appshell';
    var oas = buildOpenAPI(), md = buildMarkdown(), bundle = buildBundle();
    var gherkin = buildGherkin(), qamd = buildQAChecklist();
    var cov = coverageRows();

    var covTable = '<div class="pd-table-wrap"><table class="pd-table"><thead><tr><th>화면</th><th>상태</th><th>📝</th><th title="상태 커버리지">🧩</th><th>🔌</th><th>🎨</th></tr></thead><tbody>' +
      cov.map(function (r) {
        var m = function (b) { return b ? '✅' : '<span class="pd-dim">—</span>'; };
        var casesCell = r.has.cases ? '✅' : (r.cov.missing.length ? ('<span style="color:#b91c1c">⚠ ' + r.cov.missing.length + '</span>') : '<span class="pd-dim">—</span>');
        return '<tr><td><a href="' + esc(r.p.href) + '">' + esc(r.p.label) + '</a> <code>' + esc(r.p.id) + '</code></td>' +
          '<td>' + esc(r.p.status || 'draft') + '</td><td>' + m(r.has.desc) + '</td><td title="' + esc(r.cov.missing.join(', ')) + '">' + casesCell + '</td><td>' + m(r.has.itf) + '</td><td>' + m(r.has.design) + '</td></tr>';
      }).join('') + '</tbody></table></div>' +
      (OAS_WARNINGS.length ? '<div style="margin-top:10px;font-size:12.5px;color:#92400e;background:#fffbeb;border:1px solid #fcd34d;border-radius:8px;padding:8px 12px">⚠ OpenAPI 경고: ' + OAS_WARNINGS.map(esc).join(' · ') + '</div>' : '');
    var readyN = cov.filter(function (r) { return r.ready; }).length;

    var body =
      '<h1>개발 핸드오프</h1>' +
      '<div class="pd-prd-sub">' + esc(PROJECT.name || '') + ' · 전 화면 계약을 개발자/에이전트가 소비할 형태로 집계합니다.</div>' +
      '<div class="pd-prd-sec"><h2>완결성 대시보드 <span class="pd-dim">(개발준비 ' + readyN + '/' + cov.length + ')</span></h2>' + covTable + '</div>' +
      '<div class="pd-prd-sec"><h2>내보내기</h2><div class="pd-chip-row">' +
        '<button class="pd-copy-btn" id="dl-oas">OpenAPI 3.1 (.json) 내려받기</button>' +
        '<button class="pd-copy-btn" id="dl-md">마크다운 스펙 (.md) 내려받기</button>' +
        '<button class="pd-copy-btn" id="dl-feature">QA 테스트플랜 (.feature) 내려받기</button>' +
        '<button class="pd-copy-btn" id="dl-qa">QA 체크리스트 (.md) 내려받기</button>' +
        '<button class="pd-copy-btn" id="dl-bundle">에이전트 번들 (.json) 내려받기</button>' +
        '<button class="pd-copy-btn" id="cp-bundle">에이전트 번들 복사</button>' +
      '</div></div>' +
      '<div class="pd-prd-sec"><h2>미리보기 — 마크다운 스펙</h2><pre style="white-space:pre-wrap;font-size:12.5px;line-height:1.6;background:#f8fafc;border:1px solid #e5e7eb;border-radius:10px;padding:14px;overflow:auto;max-height:420px;">' + esc(md) + '</pre></div>' +
      '<div class="pd-prd-sec"><h2>미리보기 — OpenAPI 3.1</h2><pre style="white-space:pre;font-size:12px;line-height:1.5;background:#0f172a;color:#e2e8f0;border-radius:10px;padding:14px;overflow:auto;max-height:420px;">' + esc(JSON.stringify(oas, null, 2)) + '</pre></div>' +
      '<div class="pd-prd-sec"><h2>미리보기 — QA 테스트플랜 (Gherkin)</h2><pre style="white-space:pre-wrap;font-size:12.5px;line-height:1.6;background:#f8fafc;border:1px solid #e5e7eb;border-radius:10px;padding:14px;overflow:auto;max-height:420px;">' + esc(gherkin) + '</pre></div>';
    el.innerHTML = pageShell('handoff', body);

    var base = (PROJECT.name || 'plandeck').replace(/\s+/g, '_');
    document.getElementById('dl-oas').onclick = function () { dl(base + '.openapi.json', JSON.stringify(oas, null, 2), 'application/json'); };
    document.getElementById('dl-md').onclick = function () { dl(base + '.handoff.md', md, 'text/markdown'); };
    document.getElementById('dl-feature').onclick = function () { dl(base + '.feature', gherkin, 'text/plain'); };
    document.getElementById('dl-qa').onclick = function () { dl(base + '.qa-checklist.md', qamd, 'text/markdown'); };
    document.getElementById('dl-bundle').onclick = function () { dl(base + '.bundle.json', JSON.stringify(bundle, null, 2), 'application/json'); };
    document.getElementById('cp-bundle').onclick = function (e) { copy(JSON.stringify(bundle, null, 2), e.target); };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
  else render();
})();
