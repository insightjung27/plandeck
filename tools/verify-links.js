#!/usr/bin/env node
// PlanDeck 링크 무결성 검증 — 클릭 가능한 프로토타입 게이트
// 어떤 AI 코딩 도구로 작업하든 '깨진 링크 0'을 보장한다.
// 사용: node tools/verify-links.js <project>   (예: node tools/verify-links.js hulmate)
// 검사: ①모든 내부 href(*.html)가 실제 파일로 존재 ②막다른 화면 0(나가는 링크·뒤로 모두 없음)
//       ③appbar 있는데 뒤로 없음 0 ④screens.js href ↔ 실제 파일 정합 + 미등록 화면 경고 ⑤flow.to 참조 ID 유효
const fs = require('fs');
const path = require('path');

const proj = process.argv[2];
if (!proj) {
  console.error('사용법: node tools/verify-links.js <project>   (projects/<project> 를 검증)');
  process.exit(2);
}
const DIR = path.join(__dirname, '..', 'projects', proj) + path.sep;
if (!fs.existsSync(DIR)) { console.error('프로젝트 폴더 없음: ' + DIR); process.exit(2); }

const docs = new Set(['index.html', 'prd.html', 'spec.html', 'flows.html', 'handoff.html']);
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.html'));
const screens = files.filter(f => !docs.has(f));
const existing = new Set(files);

let broken = [], deadend = [], noback = [];
const hrefRe = /href="([^"]+)"/g;

screens.forEach(f => {
  const html = fs.readFileSync(DIR + f, 'utf8');
  let m, outbound = 0, internalLinks = [];
  while ((m = hrefRe.exec(html))) {
    const h = m[1];
    if (h.startsWith('http') || h.startsWith('#') || h.startsWith('mailto') || h === '') continue;
    if (h.includes('../')) continue; // 엔진/문서 상대경로(런타임 주입)는 제외
    const file = h.split('?')[0].split('#')[0];
    if (!file.endsWith('.html')) continue;
    internalLinks.push(file);
    if (!existing.has(file)) broken.push({ from: f, to: file });
    else outbound++;
  }
  const hasBack = /onclick="if\(history\.length/.test(html) || internalLinks.length > 0;
  if (outbound === 0 && !hasBack) deadend.push(f);
  if (/pd-appbar/.test(html) && !/pd-back/.test(html)) noback.push(f);
});

// screens.js 정합
let scrMissing = [], unregistered = [], dangling = [];
const scrPath = DIR + 'config/screens.js';
if (fs.existsSync(scrPath)) {
  const scrSrc = fs.readFileSync(scrPath, 'utf8');
  const hrefs = [...scrSrc.matchAll(/href:\s*'([^']+\.html)'/g)].map(x => x[1]);
  hrefs.forEach(h => { if (!existing.has(h)) scrMissing.push(h); });
  const registered = new Set(hrefs);
  unregistered = screens.filter(f => !registered.has(f));
  const ids = new Set([...scrSrc.matchAll(/id:\s*['"]([A-Z][A-Z0-9-]+)['"]/g)].map(x => x[1]));
  const refs = [...scrSrc.matchAll(/screen:\s*['"]([A-Z][A-Z0-9-]+)['"]/g)].map(x => x[1]);
  dangling = refs.filter(r => !ids.has(r));
  console.log('screens.js 등록 화면: ' + hrefs.length + ' / 실제 화면 파일: ' + screens.length);
  if (unregistered.length) console.log('⚠ screens.js 미등록 화면(' + unregistered.length + '): ' + unregistered.join(', '));
}

console.log('\n=== 링크 무결성 검증 (' + proj + ') ===');
console.log('화면 파일: ' + screens.length + '개');
console.log('깨진 링크: ' + broken.length + (broken.length ? ' → ' + broken.map(b => b.from + '→' + b.to).join(', ') : ' ✅'));
console.log('막다른 화면: ' + deadend.length + (deadend.length ? ' → ' + deadend.join(', ') : ' ✅'));
console.log('appbar 있는데 뒤로 없음: ' + noback.length + (noback.length ? ' → ' + noback.join(', ') : ' ✅'));
console.log('screens.js href 중 파일없음: ' + scrMissing.length + (scrMissing.length ? ' → ' + scrMissing.join(', ') : ' ✅'));
console.log('flow.to 참조 dangling: ' + dangling.length + (dangling.length ? ' → ' + dangling.join(', ') : ' ✅'));

const pass = broken.length === 0 && deadend.length === 0 && noback.length === 0 && scrMissing.length === 0 && dangling.length === 0 && unregistered.length === 0;
console.log('\n' + (pass ? '✅ PASS — 깨진 링크 0, 모든 화면 연결·등록됨' : '❌ FAIL — 위 항목 수정 필요'));
process.exit(pass ? 0 : 1);
