#!/usr/bin/env node
/* CSS 충돌 린트(렌더 게이트) — 같은 '단일 클래스' 베이스 셀렉터가 한 파일에 2회 이상 정의되면
 * 의도치 않은 override(컴포넌트 클래스 충돌)일 수 있다.
 *   예) stepper 의 .pd-step 이 flows 필름스트립 .pd-step 을 덮어써 User Flow 화면이 깨진 회귀(2026-10-03).
 * 해소법: 스코프(.parent .class) 하거나, 의도된 공존이면 그 줄에 /* dup-ok *\/ 주석을 남긴다.
 * verify-links/flow/roles 가 못 잡는 '선언≠렌더' 레이어(CSS 충돌)를 잡는 게이트.
 * 사용: node tools/verify-css.js
 */
const fs = require('fs'), path = require('path');
const ENG = path.join(__dirname, '..', 'engine');
const FILES = ['plandeck-ui.css', 'plandeck.css'];

let fail = 0;
FILES.forEach(function (fn) {
  const p = path.join(ENG, fn);
  if (!fs.existsSync(p)) return;
  const lines = fs.readFileSync(p, 'utf8').split('\n');
  const defs = {};                           // class -> [{line, dupok}]
  let depth = 0;                             // @media/@supports 중첩 깊이(반응형 오버라이드 제외용)
  lines.forEach(function (ln, i) {
    // 줄 시작이 '단일 .class {' 이고 최상위(depth 0)인 규칙만.
    //   복합/자손/가상 셀렉터 제외, @media 안 재정의(반응형 오버라이드)는 정상이므로 제외.
    const m = ln.match(/^\s*\.([-\w]+)\s*\{/);
    if (m && depth === 0) {
      const dupok = /\/\*\s*dup-ok/.test(ln);
      (defs[m[1]] = defs[m[1]] || []).push({ line: i + 1, dupok: dupok });
    }
    depth += (ln.match(/\{/g) || []).length - (ln.match(/\}/g) || []).length;
    if (depth < 0) depth = 0;
  });
  console.log('=== ' + fn + ' — 베이스 단일클래스 중복 검사 ===');
  let fileFail = 0;
  Object.keys(defs).sort().forEach(function (cls) {
    const occ = defs[cls];
    if (occ.length < 2) return;
    const lineStr = occ.map(function (o) { return 'L' + o.line; }).join(', ');
    if (occ.some(function (o) { return o.dupok; })) {
      console.log('  ⓘ .' + cls + '  (' + occ.length + '회: ' + lineStr + ') — dup-ok 면제');
    } else {
      console.log('  ❌ .' + cls + '  (' + occ.length + '회: ' + lineStr + ') — 베이스 중복 정의(충돌 위험).');
      console.log('       → .parent .' + cls + ' 로 스코프하거나, 의도된 공존이면 그 줄에 /* dup-ok */ 명시');
      fileFail++;
    }
  });
  if (!fileFail) console.log('  ✅ 미면제 베이스 중복 0');
  fail += fileFail;
});
console.log(fail ? ('\n❌ FAIL — 미면제 베이스클래스 중복 ' + fail + '건(스코프 또는 dup-ok 필요)') : '\n✅ PASS — CSS 베이스클래스 충돌 0');
process.exit(fail ? 1 : 0);
