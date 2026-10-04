#!/usr/bin/env node
// 기능명(사람이 읽는 이름) 한글 일관성 게이트.
// 기능 정의서(features.html)의 '기능명' 열은 항상 한글이어야 한다(개발 식별자=코드는 API/시점 열).
//  - 액션/조회: intent(한글) 필수 — 없으면 영문 id 로 폴백되어 깨짐
//  - 이벤트: when 또는 intent(한글) 필수 — 없으면 영문 dot-code(name) 로 폴백되어 깨짐
// 렌더러(renderFeatures)의 기능명 산출 로직과 동일한 규칙으로 '한글 포함' 여부를 검사한다.
// 사용: node tools/verify-naming.js <project>
const fs = require('fs'), path = require('path'), vm = require('vm');
const proj = process.argv[2];
if (!proj) { console.error('사용법: node tools/verify-naming.js <project>'); process.exit(2); }
const DIR = path.join(__dirname, '..', 'projects', proj) + path.sep;
const sb = { window: {} };
vm.runInNewContext(fs.readFileSync(DIR + 'config/screens.js', 'utf8'), sb, { timeout: 3000 });
const pages = []; (sb.window.PLANDECK_SCREENS || []).forEach(c => (c.pages || []).forEach(p => pages.push(p)));

const hasHangul = s => /[가-힣]/.test(String(s || ''));
let bad = [];
pages.forEach(p => {
  const itf = p.interface || {};
  (itf.writes || []).forEach(w => { const nm = w.intent || w.id; if (!hasHangul(nm)) bad.push(`${p.id} 액션 '${w.id || ''}' → 기능명 '${nm}' (intent 한글 누락)`); });
  (itf.reads || []).forEach(r => { const nm = r.intent || r.id; if (!hasHangul(nm)) bad.push(`${p.id} 조회 '${r.id || ''}' → 기능명 '${nm}' (intent 한글 누락)`); });
  (itf.events || []).forEach(e => { const nm = e.intent || e.when || e.name; if (!hasHangul(nm)) bad.push(`${p.id} 이벤트 '${e.name || ''}' → 기능명 '${nm}' (when/intent 한글 누락)`); });
});

console.log('=== 기능명 한글 일관성 (' + proj + ') ===');
console.log('한글 누락(기능명이 영문/코드로 표기됨): ' + bad.length + (bad.length ? '' : ' ✅'));
bad.forEach(x => console.log('  ⚠ ' + x));
process.exit(bad.length ? 1 : 0);
