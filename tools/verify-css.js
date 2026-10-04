#!/usr/bin/env node
/* CSS 충돌 린트(렌더 게이트) — 같은 '단일 클래스' 베이스 셀렉터 중복 정의를 잡는다.
 *  (A) 파일 내 중복: 한 파일에 .X {} 가 2회 이상 → 의도치 않은 override 위험.
 *      예) stepper .pd-step 이 flows .pd-step 을 덮어써 User Flow 깨짐(2026-10-03).
 *  (B) 파일 간 중복: 여러 파일에 같은 .X {} 가 top-level base 로 존재 → @import/로드 순서상
 *      '뒤 파일'이 '앞 파일'을 소리없이 덮어씀(캐스케이드 override).
 *      예) plandeck.css .pd-field 가 plandeck-ui.css .pd-field(폼) 를 덮어 입력칸이 밀림(2026-10-04).
 *          plandeck.css .pd-chip(문서박스) 가 plandeck-ui.css .pd-chip(pill) 를 덮어 칩이 박스로(2026-10-04).
 * 캐스케이드 순서(뒤가 이김): common.css → plandeck-ui.css(@import) → plandeck.css.
 * 해소법: 스코프(.parent .class) 하거나, 의도된 공존이면 그 줄에 /* dup-ok *\/ 주석을 남긴다.
 * 사용: node tools/verify-css.js
 */
const fs = require('fs'), path = require('path');
const ENG = path.join(__dirname, '..', 'engine');
// 캐스케이드 순서대로(뒤가 이김)
const FILES = ['common.css', 'plandeck-ui.css', 'plandeck.css'];

// 파일별 top-level 단일클래스 base 정의 수집: cls -> [{file, line, dupok}]
const perFile = {};         // file -> { cls: [{line, dupok}] }
const globalDefs = {};      // cls -> [{file, line, dupok}]  (파일 간 비교용)
FILES.forEach(function (fn) {
  const p = path.join(ENG, fn);
  if (!fs.existsSync(p)) return;
  const lines = fs.readFileSync(p, 'utf8').split('\n');
  const defs = {}; let depth = 0;
  lines.forEach(function (ln, i) {
    const m = ln.match(/^\s*\.([-\w]+)\s*\{/);        // 줄 시작 단일 .class { (복합/자손/가상 제외)
    if (m && depth === 0) {                            // @media/@supports 중첩 제외(반응형 오버라이드 정상)
      const dupok = /\/\*\s*dup-ok/.test(ln);
      (defs[m[1]] = defs[m[1]] || []).push({ line: i + 1, dupok: dupok });
      (globalDefs[m[1]] = globalDefs[m[1]] || []).push({ file: fn, line: i + 1, dupok: dupok });
    }
    depth += (ln.match(/\{/g) || []).length - (ln.match(/\}/g) || []).length;
    if (depth < 0) depth = 0;
  });
  perFile[fn] = defs;
});

let fail = 0;

// ── (A) 파일 내 중복 ──
FILES.forEach(function (fn) {
  const defs = perFile[fn]; if (!defs) return;
  console.log('=== ' + fn + ' — 파일 내 베이스 중복 ===');
  let fileFail = 0;
  Object.keys(defs).sort().forEach(function (cls) {
    const occ = defs[cls]; if (occ.length < 2) return;
    const lineStr = occ.map(function (o) { return 'L' + o.line; }).join(', ');
    if (occ.some(function (o) { return o.dupok; })) {
      console.log('  ⓘ .' + cls + '  (' + occ.length + '회: ' + lineStr + ') — dup-ok 면제');
    } else {
      console.log('  ❌ .' + cls + '  (' + occ.length + '회: ' + lineStr + ') — 파일 내 베이스 중복(충돌 위험).');
      console.log('       → .parent .' + cls + ' 로 스코프하거나, 의도된 공존이면 그 줄에 /* dup-ok */ 명시');
      fileFail++;
    }
  });
  if (!fileFail) console.log('  ✅ 미면제 파일내 중복 0');
  fail += fileFail;
});

// ── (B) 파일 간 중복(캐스케이드 override) ──
console.log('\n=== 파일 간 베이스 중복(로드 순서상 뒤 파일이 override) ===');
let crossFail = 0;
Object.keys(globalDefs).sort().forEach(function (cls) {
  const occ = globalDefs[cls];
  const files = occ.map(function (o) { return o.file; });
  if (new Set(files).size < 2) return;               // 2개 이상 '다른 파일'에 있을 때만
  const where = occ.map(function (o) { return o.file.replace('.css', '') + ':L' + o.line; }).join('  ');
  const winner = occ[occ.length - 1].file;           // FILES(캐스케이드) 순서상 마지막이 이김
  if (occ.some(function (o) { return o.dupok; })) {
    console.log('  ⓘ .' + cls + '  (' + where + ') — dup-ok 면제');
  } else {
    console.log('  ❌ .' + cls + '  (' + where + ') — 파일 간 중복: 뒤 파일(' + winner + ')이 override.');
    console.log('       → 한쪽을 고유 클래스로 개명/스코프(예: .pd-entity-field, .pd-chip-row .pd-chip)하거나, 의도된 override면 그 줄에 /* dup-ok */ 명시');
    crossFail++;
  }
});
if (!crossFail) console.log('  ✅ 미면제 파일간 중복 0');
fail += crossFail;

console.log(fail ? ('\n❌ FAIL — 미면제 베이스클래스 충돌 ' + fail + '건(스코프/개명 또는 dup-ok 필요)') : '\n✅ PASS — CSS 베이스클래스 충돌 0(파일 내·파일 간)');
process.exit(fail ? 1 : 0);
