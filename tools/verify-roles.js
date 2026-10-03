#!/usr/bin/env node
/* role↔DOM 정합 검증 — screens.js 가 선언한 컴포넌트 role(.pd-*)·target 이
 * 실제 화면 HTML 의 class 로 존재하는지 확인한다.
 * verify-links/verify-flow 가 못 잡는 '선언≠마크업' 슬리피지(컴포넌트 고아)를 잡는다.
 *   - 치명(FAIL): components[].role 이 HTML 에 없음  (불변식4: screens.js ↔ HTML 정합)
 *   - 경고(WARN): description/cases/interface 의 target 이 HTML 에 없음(hover·링크용·상위 매핑 가능)
 * 사용: node tools/verify-roles.js <project>
 */
const fs = require('fs'), path = require('path'), vm = require('vm');
const proj = process.argv[2];
if (!proj) { console.error('사용법: node tools/verify-roles.js <project>'); process.exit(2); }
const DIR = path.join(__dirname, '..', 'projects', proj) + path.sep;
const sb = { window: {} };
vm.runInNewContext(fs.readFileSync(DIR + 'config/screens.js', 'utf8'), sb, { timeout: 3000 });
const pages = []; (sb.window.PLANDECK_SCREENS || []).forEach(c => (c.pages || []).forEach(p => pages.push(p)));

// HTML 의 모든 class 토큰 수집
function classesOf(html) {
  const set = new Set(); let m; const re = /class="([^"]*)"/g;
  while ((m = re.exec(html))) m[1].split(/\s+/).forEach(c => { if (c) set.add(c); });
  return set;
}
// 단일 '.class' 선택자만 검사(복합/자손/비클래스 선택자·action 문자열 제외)
function cls(sel) { return (typeof sel === 'string' && /^\.[-\w]+$/.test(sel)) ? sel.slice(1) : null; }

const orphans = [];   // 치명: components role 고아
const slips = [];     // 경고: target 슬리피지
pages.forEach(p => {
  if (!p.href || !fs.existsSync(DIR + p.href)) return;
  const have = classesOf(fs.readFileSync(DIR + p.href, 'utf8'));
  (p.components || []).forEach(c => {
    const k = cls(c.role); if (k && !have.has(k)) orphans.push(p.id + ' (' + p.href + ') components.role ' + c.role + (c.action ? ' [actionable: ' + (c.action.do || '') + ']' : ''));
  });
  (p.description || []).forEach(d => { const k = cls(d.target); if (k && !have.has(k)) slips.push(p.id + ' description.target ' + d.target); });
  (p.cases || []).forEach(c => { const k = cls(c.target); if (k && !have.has(k)) slips.push(p.id + ' cases.target ' + c.target); });
  const itf = p.interface || {};
  [].concat(itf.reads || [], itf.writes || []).forEach(o => { const k = cls(o.target); if (k && !have.has(k)) slips.push(p.id + ' interface.target ' + o.target); });
});

console.log('=== role↔DOM 정합 (' + proj + ') ===');
console.log('컴포넌트 role 고아(치명): ' + orphans.length + (orphans.length ? '' : ' ✅'));
orphans.forEach(x => console.log('  ❌ ' + x));
// 슬리피지는 중복 제거 후 표기
const uslip = [...new Set(slips)];
console.log('target 슬리피지(경고): ' + uslip.length + (uslip.length ? '' : ' ✅'));
uslip.slice(0, 50).forEach(x => console.log('  ⚠ ' + x));
if (uslip.length > 50) console.log('  … 외 ' + (uslip.length - 50) + '건');
process.exit(orphans.length ? 1 : 0);
