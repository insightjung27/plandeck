/* ───────────────────────────────────────────────────────────────
 * PlanDeck · config/flows.js — 주요 플로우(핵심 여정) 정의
 * /pd-flow 로 정의한다. flows.html 이 각 플로우를 '실제 화면 썸네일 필름스트립'으로 렌더.
 * 화면이 많아져 Flow Diagram이 복잡해져도, 플로우 단위로 핵심 여정을 정리해 본다.
 *
 * 스키마: [{ id, name, surface?, desc?, steps:[{ screen:'<화면ID>', via?:'<전이 라벨>' }] }]
 *   - steps 는 순서대로. via = 앞 화면에서 이 화면으로 오는 동작/조건(화살표 라벨).
 *   - 분기는 별도 플로우로 나눠도 되고(예: 성공/실패), 한 플로우에 주 경로만 담아도 된다.
 * ─────────────────────────────────────────────────────────────── */
window.PLANDECK_FLOWS = [
  // { id:'FLOW-001', name:'핵심 여정', surface:'모바일', desc:'...',
  //   steps:[ {screen:'SCR-HOME-001'}, {screen:'SCR-NEXT-001', via:'다음'} ] },
];
window.PDK_FLOWS = window.PLANDECK_FLOWS;
