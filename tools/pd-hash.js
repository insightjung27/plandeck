#!/usr/bin/env node
/* PlanDeck 동결 해시 계산기 — /pd-lint 가 ready-for-dev 승격 시 _hash 를 기록하는 데 사용.
 * engine/plandeck.js 의 specHash(djb2)와 동일 규칙이어야 변경 감지가 작동한다.
 * 사용: node tools/pd-hash.js <project-config-dir> <screenId>
 *   예: node tools/pd-hash.js projects/order-pay/config SCR-PAY-001
 * 출력: 해당 화면의 동결 해시(예: h1a2b3c). 이 값을 그 화면 객체의 _hash 에 기록한다.
 */
const fs = require('fs');
const path = require('path');
const [, , dir, id] = process.argv;
if (!dir || !id) { console.error('사용: node tools/pd-hash.js <project-config-dir> <screenId>'); process.exit(2); }

global.window = {};
['devices.js', 'project.js', 'entities.js', 'prd.js', 'screens.js'].forEach(function (f) {
  try { eval(fs.readFileSync(path.join(dir, f), 'utf8')); } catch (e) { /* 일부 파일 없을 수 있음 */ }
});
const screens = global.window.PLANDECK_SCREENS || global.window.PDK_SCREENS || [];
let p = null;
screens.forEach(function (c) { (c.pages || []).forEach(function (x) { if (x.id === id) p = x; }); });
if (!p) { console.error('화면을 찾을 수 없음: ' + id); process.exit(1); }

function hashOf(obj) {
  var s = JSON.stringify(obj || {}), h = 5381;
  for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return 'h' + h.toString(36);
}
console.log(hashOf({ d: p.description || [], c: p.cases || [], i: p.interface || {}, f: (p.flow && p.flow.to) || [], co: p.components || [] }));
