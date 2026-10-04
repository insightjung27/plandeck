#!/usr/bin/env node
/* 공통 컴포넌트 거버넌스 게이트 — "즉석(ad-hoc) 컴포넌트" 유입 차단.
 * 원칙(AGENTS.md 불변식2): 화면은 공용 컴포넌트(engine/pd-components.js + plandeck-ui.css)만 조립한다.
 *   - 모든 요소는 '정의된 공용 클래스'를 최소 1개 가져야 한다(기반 컴포넌트에서 스타일을 받음).
 *   - 정의 클래스가 0개인 요소 = 공용 라이브러리에 없는 즉석 컴포넌트 → 차단.
 *   - 단, '의도된 스타일 없는 앵커/래퍼'(JS 훅·시맨틱 그룹)는 아래 레지스트리(HOOK_REGISTRY)에 등록해 예외.
 *     신규로 미등록 클래스가 나오면 FAIL → 작성자가 (a)공용 컴포넌트 사용 또는 (b)레지스트리에 '의도적으로' 등록하게 강제.
 * 사용: node tools/verify-components.js <project>
 */
const fs = require('fs'), path = require('path'), vm = require('vm');
const proj = process.argv[2];
if (!proj) { console.error('사용법: node tools/verify-components.js <project>'); process.exit(2); }
const ROOT = path.join(__dirname, '..');
const DIR = path.join(ROOT, 'projects', proj) + path.sep;

// 공용 CSS에 정의된 클래스 토큰
const defined = new Set();
['engine/plandeck-ui.css', 'engine/plandeck.css', 'engine/common.css'].forEach(f => {
  const p = path.join(ROOT, f); if (!fs.existsSync(p)) return;
  const css = fs.readFileSync(p, 'utf8');
  let m; const re = /\.([a-zA-Z_][-\w]*)/g;
  while ((m = re.exec(css))) defined.add(m[1]);
});

// ── 의도된 스타일 없는 앵커/래퍼 레지스트리(= '관리되는' 예외 목록) ──
// 여기 없는 '정의0' pd-* 클래스가 나오면 게이트가 막는다. 추가는 '의도적 등록'이어야 한다.
const HOOK_REGISTRY = new Set([
  // (pd-hero·pd-pagehead-actions·pd-tabpanels·pd-kpi·pd-search 는 2026-10-04 정식 공용 컴포넌트로
  //  승격 → plandeck-ui.css 에 정의됨. 더 이상 예외 앵커가 아니므로 레지스트리에서 제거.)
  // (pd-map·pd-map-full·pd-player·pd-notice-body 는 2026-10-04 정식 공용 컴포넌트로 승격 → plandeck-ui.css 정의.)
  // 화면별 시맨틱 앵커(단일 프로젝트·스타일 불필요한 그룹/JS 훅. 나머지 7종은 이미 공용 컴포넌트 위 래퍼 — tabs/kpi/chips/table/mediagrid)
  'pd-bulletin-view', 'pd-dept-tabs', 'pd-finance-kpi', 'pd-item-grid', 'pd-kinds',
  'pd-session-select', 'pd-vision', 'pd-week-nav', 'pd-worship-table',
]);

const sb = { window: {} };
vm.runInNewContext(fs.readFileSync(DIR + 'config/screens.js', 'utf8'), sb, { timeout: 3000 });
const pages = []; (sb.window.PLANDECK_SCREENS || []).forEach(c => (c.pages || []).forEach(p => pages.push(p)));

let viol = [];
pages.forEach(p => {
  if (!p.href || !fs.existsSync(DIR + p.href)) return;
  const html = fs.readFileSync(DIR + p.href, 'utf8');
  let m; const re = /class="([^"]*)"/g;
  while ((m = re.exec(html))) {
    const toks = m[1].split(/\s+/).filter(Boolean);
    const pd = toks.filter(t => /^pd-/.test(t));
    if (!pd.length) continue;
    if (toks.some(t => defined.has(t))) continue;            // 정의된 공용 클래스 보유 → OK
    // 정의0 요소: 모든 pd-* 가 레지스트리에 등록돼 있어야 통과
    const unregistered = pd.filter(t => !HOOK_REGISTRY.has(t));
    if (unregistered.length) viol.push(p.id + ' (' + p.href + ') → 미등록 즉석 클래스: ' + unregistered.join(', '));
  }
});

console.log('=== 공통 컴포넌트 거버넌스 (' + proj + ') ===');
console.log('즉석(미등록·정의0) 컴포넌트: ' + viol.length + (viol.length ? '' : ' ✅'));
viol.slice(0, 40).forEach(x => console.log('  ⚠ ' + x));
if (viol.length > 40) console.log('  … 외 ' + (viol.length - 40) + '건');
process.exit(viol.length ? 1 : 0);
