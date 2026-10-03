#!/usr/bin/env node
// PlanDeck 링크 무결성 검증 — 클릭 가능한 프로토타입 게이트
// 어떤 AI 코딩 도구로 작업하든 '깨진 링크 0'을 보장한다.
// 사용: node tools/verify-links.js <project>   (예: node tools/verify-links.js hulmate)
//
// 네비게이션 2방식 모두 인정:
//   (1) 정적 href="x.html"  (2) 런타임: config/screens.js 의 components.action.do='go:ID' / flow.to
// 판정:
//   [오류/FAIL]  깨진 링크 · screens.js href 파일없음 · flow.to dangling (명백한 결함)
//   [경고/WARN]  막다른 화면 · appbar 뒤로 없음 · screens.js 미등록 (종단 화면·부분 화면이면 정상)
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const proj = process.argv[2];
if (!proj) { console.error('사용법: node tools/verify-links.js <project>   (projects/<project> 검증)'); process.exit(2); }
const DIR = path.join(__dirname, '..', 'projects', proj) + path.sep;
if (!fs.existsSync(DIR)) { console.error('프로젝트 폴더 없음: ' + DIR); process.exit(2); }

const docs = new Set(['index.html', 'prd.html', 'spec.html', 'flows.html', 'handoff.html', 'ia.html', 'features.html']);
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.html'));
const screens = files.filter(f => !docs.has(f));
const existing = new Set(files);

// ── screens.js 로드(vm) ── 실제 객체로 런타임 네비 메타를 읽는다
let pages = [], scrLoaded = false;
const scrPath = DIR + 'config/screens.js';
if (fs.existsSync(scrPath)) {
  try {
    const sandbox = { window: {} };
    vm.runInNewContext(fs.readFileSync(scrPath, 'utf8'), sandbox, { timeout: 3000 });
    const data = sandbox.window.PLANDECK_SCREENS || sandbox.window.PDK_SCREENS || [];
    data.forEach(cat => (cat.pages || []).forEach(p => pages.push(p)));
    scrLoaded = true;
  } catch (e) { console.log('⚠ screens.js 로드 실패(정규식 폴백 없음): ' + e.message); }
}
const byHref = {}; pages.forEach(p => { if (p.href) byHref[p.href] = p; });
const ids = new Set(pages.map(p => p.id));

// 화면이 런타임 네비(action.do:'go:' 또는 flow.to)를 가졌는가
function hasRuntimeNav(file) {
  const p = byHref[file]; if (!p) return false;
  const compGo = (p.components || []).some(c => c.action && /^go:/.test(String((c.action && c.action.do) || '')));
  const flowTo = p.flow && Array.isArray(p.flow.to) && p.flow.to.length > 0;
  return compGo || flowTo;
}

let broken = [], deadend = [], noback = [], scrMissing = [], dangling = [], unregistered = [];
const hrefRe = /href="([^"]+)"/g;

screens.forEach(f => {
  const html = fs.readFileSync(DIR + f, 'utf8');
  let m, outbound = 0, internal = [];
  while ((m = hrefRe.exec(html))) {
    const h = m[1];
    if (h.startsWith('http') || h.startsWith('#') || h.startsWith('mailto') || h === '') continue;
    if (h.includes('../')) continue; // 엔진/문서 상대경로(런타임 주입) 제외
    const file = h.split('?')[0].split('#')[0];
    if (!file.endsWith('.html')) continue;
    internal.push(file);
    if (!existing.has(file)) broken.push({ from: f, to: file }); else outbound++;
  }
  const hasBack = /onclick="if\(history\.length/.test(html) || internal.length > 0;
  // 막다름 = 정적 outbound 0 AND 뒤로 없음 AND 런타임 네비 없음
  if (outbound === 0 && !hasBack && !hasRuntimeNav(f)) deadend.push(f);
  if (/pd-appbar/.test(html) && !/pd-back/.test(html) && !hasRuntimeNav(f)) noback.push(f);
});

if (scrLoaded) {
  pages.forEach(p => { if (p.href && !existing.has(p.href)) scrMissing.push(p.href); });
  const registered = new Set(pages.map(p => p.href));
  unregistered = screens.filter(f => !registered.has(f));
  pages.forEach(p => ((p.flow && p.flow.to) || []).forEach(t => { if (t.screen && !ids.has(t.screen)) dangling.push(p.id + '→' + t.screen); }));
}

console.log('\n=== 링크 무결성 검증 (' + proj + ') ===');
console.log('화면 파일: ' + screens.length + '개' + (scrLoaded ? ' · screens.js 등록 ' + pages.length : ' · (screens.js 없음)'));

console.log('\n[오류 — 반드시 수정]');
console.log('  깨진 링크: ' + broken.length + (broken.length ? ' → ' + broken.map(b => b.from + '→' + b.to).join(', ') : ' ✅'));
console.log('  screens.js href 파일없음: ' + scrMissing.length + (scrMissing.length ? ' → ' + scrMissing.join(', ') : ' ✅'));
console.log('  flow.to dangling: ' + dangling.length + (dangling.length ? ' → ' + dangling.join(', ') : ' ✅'));

console.log('\n[경고 — 확인 권장(종단 화면·런타임 네비면 정상)]');
console.log('  막다른 화면: ' + deadend.length + (deadend.length ? ' → ' + deadend.join(', ') : ' ✅'));
console.log('  appbar 뒤로 없음: ' + noback.length + (noback.length ? ' → ' + noback.join(', ') : ' ✅'));
console.log('  screens.js 미등록 화면: ' + unregistered.length + (unregistered.length ? ' → ' + unregistered.join(', ') : ' ✅'));

const fail = [];
if (broken.length) fail.push('깨진 링크 ' + broken.length);
if (scrMissing.length) fail.push('href 파일없음 ' + scrMissing.length);
if (dangling.length) fail.push('flow.to dangling ' + dangling.length);
const warned = deadend.length || noback.length || unregistered.length;
const pass = fail.length === 0;
console.log('\n' + (pass
  ? '✅ PASS — 치명 오류 0' + (warned ? ' (경고 있음 — 위 항목이 의도된 종단/부분 화면인지 확인)' : '')
  : '❌ FAIL — ' + fail.join(', ')));
process.exit(pass ? 0 : 1);
