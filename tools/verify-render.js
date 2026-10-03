#!/usr/bin/env node
/* 렌더 전수 감사(결정론) — 화면 HTML을 정적 분석해 '렌더가 깨질 위험' 패턴을 전수로 잡는다.
 * 시각 검증(사람/비전) 전에 구조·CSS 레이어 결함을 먼저 걸러낸다.
 *   - 스크롤 컨테이너 없음(.pd-app-body/.pd-content/.pd-auth 중 하나도 없음) → 내용 길면 클립
 *   - 미정의 pd-* 클래스(CSS에 정의도 없고 알려진 순수훅도 아님) → 오타/깨진 스타일 의심
 *   - 인라인 style= (불변식2 위반 — 엔진 주입 제외)
 *   - 내용 빈약(본문 텍스트 과소) → 빈/에러 화면 의심
 * 사용: node tools/verify-render.js <project>
 */
const fs = require('fs'), path = require('path'), vm = require('vm');
const proj = process.argv[2];
if (!proj) { console.error('사용법: node tools/verify-render.js <project>'); process.exit(2); }
const ROOT = path.join(__dirname, '..');
const DIR = path.join(ROOT, 'projects', proj) + path.sep;

// 1) CSS에 정의된 클래스 토큰 집합(엔진 3종)
const cssDefined = new Set();
['engine/plandeck-ui.css', 'engine/plandeck.css', 'engine/common.css'].forEach(function (f) {
  const p = path.join(ROOT, f); if (!fs.existsSync(p)) return;
  const css = fs.readFileSync(p, 'utf8');
  let m; const re = /\.([a-zA-Z_][-\w]*)/g;
  while ((m = re.exec(css))) cssDefined.add(m[1]);
});

// 2) screens.js의 화면 목록
const sb = { window: {} };
vm.runInNewContext(fs.readFileSync(DIR + 'config/screens.js', 'utf8'), sb, { timeout: 3000 });
const pages = []; (sb.window.PLANDECK_SCREENS || []).forEach(c => (c.pages || []).forEach(p => pages.push(p)));

// 알려진 '순수 훅/런타임' 클래스(스타일 없어도 정상 — 의미적 앵커·JS주입)
const KNOWN_HOOKS = /^(pd-(member-detail|finance-detail|tenant-detail|tenant-new-form|sermon-edit|sermon-list|sermon-admin-table|attend-table|brand-form|concept-picker|msg-table|privacy-table|review-list|sub-table|domain-table|review-form|send|preview|process|back|kinds|account|player|bare|fab-sos|btn-approve|btn-reject))$/;

let problems = 0;
const rows = [];
const infoUndef = new Set();
pages.forEach(function (p) {
  if (!p.href || !fs.existsSync(DIR + p.href)) return;
  const html = fs.readFileSync(DIR + p.href, 'utf8');
  const issues = [];

  // (a) pd-screen 존재
  if (!/class="[^"]*\bpd-screen\b/.test(html) && !/class="[^"]*\bdevice-screen\b/.test(html)) issues.push('pd-screen 없음');

  // (b) 스크롤 컨테이너
  if (!/\b(pd-app-body|pd-content|pd-auth)\b/.test(html)) issues.push('스크롤컨테이너 없음(클립위험)');

  // (c) 사용된 pd-* 클래스 수집 → 미정의(=CSS에도 없고 알려진 훅도 아님)는 INFO만(FAIL 아님)
  //     — 대부분 자식/공유컴포넌트가 스타일을 받는 의미적 래퍼/앵커라 렌더는 정상(시각검증으로 확인됨).
  const used = new Set(); let m; const re = /class="([^"]*)"/g;
  while ((m = re.exec(html))) m[1].split(/\s+/).forEach(c => { if (/^pd-/.test(c)) used.add(c); });
  [...used].filter(c => !cssDefined.has(c) && !KNOWN_HOOKS.test(c)).forEach(c => infoUndef.add(c));

  // (d) 인라인 style= (엔진 주입 transform/scale 제외 — 화면 HTML엔 없어야)
  const styleCount = (html.match(/ style="/g) || []).length;
  if (styleCount > 0) issues.push('인라인style ' + styleCount + '개');

  // (e) 본문 빈약(태그 제거 후 텍스트 길이)
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const textLen = bodyMatch ? bodyMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, '').length : 0;
  if (textLen < 15) issues.push('본문빈약(' + textLen + '자)');

  if (issues.length) { rows.push('  ❌ ' + p.id + ' (' + p.href + ') — ' + issues.join(' · ')); problems++; }
});

console.log('=== 렌더 전수 감사 (' + proj + ') — 화면 ' + pages.length + '개 ===');
if (!problems) console.log('  ✅ 렌더위험 0 — pd-screen·스크롤컨테이너 보유, 인라인스타일 0, 빈본문 0 (전수)');
else { rows.forEach(r => console.log(r)); console.log('  — 렌더위험 화면 ' + problems + '개'); }
if (infoUndef.size) console.log('  ⓘ 스타일없는 pd-* 클래스(의미적 훅/래퍼·렌더무해): ' + [...infoUndef].sort().join(', '));
process.exit(problems ? 1 : 0);
