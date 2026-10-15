#!/usr/bin/env node
// config/ia.js(PLANDECK_IA 메뉴 depth 모델) ↔ config/screens.js 정합 검증.
// IA(renderIA)가 계층 트리·표현방식을 이 모델로 렌더하므로, 화면 추가/삭제 시 ia.js 미갱신 드리프트를 막는다.
// 치명: 무효 screen/parent id · 중복 배치 · parent 교차채널 · parent 사이클 · 무효 present · 미배치(커버리지<100%).
// ia.js 없는 프로젝트는 스킵(폴백 legacy 뷰). 사용: node tools/verify-ia.js <project>
const fs = require('fs'), path = require('path'), vm = require('vm');
const proj = process.argv[2];
if (!proj) { console.error('사용법: node tools/verify-ia.js <project>'); process.exit(2); }
const DIR = path.join(__dirname, '..', 'projects', proj) + path.sep;
const PRESENT = ['page', 'modal', 'sheet', 'popover', 'alert', 'toast', 'step', 'tab', 'drawer'];

const sb = { window: {} };
vm.runInNewContext(fs.readFileSync(DIR + 'config/screens.js', 'utf8'), sb, { timeout: 3000 });
const pages = []; (sb.window.PLANDECK_SCREENS || []).forEach(c => (c.pages || []).forEach(p => pages.push(p)));
const byId = {}; pages.forEach(p => { byId[p.id] = p; });

const iaPath = DIR + 'config/ia.js';
console.log('=== IA 메뉴 모델 정합 (' + proj + ') ===');
if (!fs.existsSync(iaPath)) { console.log('config/ia.js 없음 — 스킵(renderIA legacy 폴백) ✅'); process.exit(0); }
try { vm.runInNewContext(fs.readFileSync(iaPath, 'utf8'), sb, { timeout: 3000 }); }
catch (e) { console.log('❌ ia.js 로드 실패: ' + e.message); process.exit(1); }
const IA = sb.window.PLANDECK_IA;
if (!IA || !Array.isArray(IA.placements)) { console.log('❌ PLANDECK_IA.placements 없음/형식오류'); process.exit(1); }

const fatal = [], warn = [];
const chKeys = {}; (IA.channels || []).forEach(c => { if (c && c.key) chKeys[c.key] = c; });
const place = {};
IA.placements.forEach(pl => {
  if (!pl || !pl.screen) { fatal.push('screen 없는 placement 항목'); return; }
  if (!byId[pl.screen]) { fatal.push('무효 screen id: ' + pl.screen); return; }
  if (place[pl.screen]) { fatal.push('중복 배치: ' + pl.screen); return; }
  place[pl.screen] = pl;
  if (PRESENT.indexOf(pl.present) < 0) fatal.push(pl.screen + ' 무효 present: ' + pl.present);
  if (!chKeys[pl.channel]) warn.push(pl.screen + ' 미선언 채널: ' + pl.channel + ' (IA.channels 에 없음)');
});
// parent 유효성 · 동일채널 · 사이클
Object.keys(place).forEach(id => {
  const par = place[id].parent;
  if (par == null) return;
  if (!place[par]) { fatal.push(id + ' parent 미배치/무효: ' + par); return; }
  if (place[par].channel !== place[id].channel) fatal.push(id + ' parent 교차채널: ' + par + ' (' + place[par].channel + ' ≠ ' + place[id].channel + ')');
  const seen = {}; let cur = par, g = 0;
  while (cur && g++ < 64) { if (cur === id) { fatal.push(id + ' parent 체인 사이클'); break; } if (seen[cur]) break; seen[cur] = 1; cur = (place[cur] && place[cur].parent) || null; }
});
// 커버리지(전수 배치)
const missing = pages.map(p => p.id).filter(id => !place[id]);
missing.forEach(id => fatal.push('미배치 화면(커버리지<100%): ' + id + ' ' + (byId[id].label || '')));

console.log('채널: ' + (IA.channels || []).length + ' · 배치: ' + Object.keys(place).length + '/' + pages.length);
console.log('치명: ' + fatal.length + (fatal.length ? '' : ' ✅'));
fatal.slice(0, 40).forEach(x => console.log('  ❌ ' + x));
if (fatal.length > 40) console.log('  … 외 ' + (fatal.length - 40) + '건');
console.log('경고: ' + warn.length + (warn.length ? '' : ' ✅'));
warn.slice(0, 20).forEach(x => console.log('  ⚠ ' + x));
process.exit(fatal.length ? 1 : 0);
