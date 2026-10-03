#!/usr/bin/env node
// flow.to 의 trigger 요소가 실제 HTML에서 가리키는 href 와, flow 대상 화면의 href 가 일치하는지 검증.
// (기획 문서 flow 표기가 실제 네비게이션과 어긋나는 '문서-실제 불일치'를 잡는다)
// 사용: node tools/verify-flow.js <project>
const fs = require('fs'), path = require('path'), vm = require('vm');
const proj = process.argv[2];
if (!proj) { console.error('사용법: node tools/verify-flow.js <project>'); process.exit(2); }
const DIR = path.join(__dirname, '..', 'projects', proj) + path.sep;
const sb = { window: {} };
vm.runInNewContext(fs.readFileSync(DIR + 'config/screens.js', 'utf8'), sb, { timeout: 3000 });
const pages = []; (sb.window.PLANDECK_SCREENS || []).forEach(c => (c.pages || []).forEach(p => pages.push(p)));
const byId = {}; pages.forEach(p => { byId[p.id] = p; });

let mism = [];
pages.forEach(p => {
  if (!p.href || !fs.existsSync(DIR + p.href)) return;
  const html = fs.readFileSync(DIR + p.href, 'utf8');
  // class → 첫 href 맵 (a 태그, 내부 .html 링크만)
  const roleHref = {};
  let m; const re = /<a class="([^"]*)"[^>]*?href="([^"#][^"]*\.html[^"]*)"/g;
  while ((m = re.exec(html))) {
    const href = m[2].split('?')[0];
    m[1].split(/\s+/).forEach(cls => { if (cls && !roleHref['.' + cls]) roleHref['.' + cls] = href; });
  }
  ((p.flow && p.flow.to) || []).forEach(t => {
    if (!t.trigger) return;
    const actual = roleHref[t.trigger];
    const expect = byId[t.screen] && byId[t.screen].href;
    if (actual && expect && actual !== expect) {
      mism.push(p.id + ' (' + p.href + ') ' + t.trigger + ': flow→' + t.screen + '(' + expect + ') 이지만 실제 링크→' + actual);
    }
  });
});
console.log('=== flow↔실제 href 정합 (' + proj + ') ===');
console.log('불일치: ' + mism.length + (mism.length ? '' : ' ✅'));
mism.forEach(x => console.log('  ⚠ ' + x));
process.exit(mism.length ? 1 : 0);
