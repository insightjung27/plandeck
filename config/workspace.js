/* ───────────────────────────────────────────────────────────────
 * PlanDeck · config/workspace.js — 워크스페이스(프로젝트 레지스트리)
 * 하나의 PlanDeck 저장소에서 '여러 프로젝트'를 동시에 운영한다.
 * 각 프로젝트는 projects/<slug>/ 폴더(자립형, 공유 engine 재사용).
 * /pd-init 이 새 프로젝트를 만들며 여기에 등록한다. 루트 index.html(워크스페이스 홈)이 이 목록을 렌더.
 * ─────────────────────────────────────────────────────────────── */

window.PLANDECK_WORKSPACE = {
  org: '',   // 팀/조직명 (선택)
  projects: [
    {
      slug: 'order-pay',
      name: '간편결제 데모',
      desc: 'PlanDeck 전체 기능 시연 — 모바일 간편결제',
      path: 'projects/order-pay/',
      surfaces: ['모바일'],
      owner: 'PlanDeck',
      version: '0.1.0',
      updatedAt: '2026-10-02',
      tag: '데모',
    },
    {
      slug: 'dodam-care-match',
      name: '도담 돌봄·치료 매칭',
      desc: '장애아동 가정 ↔ 검증된 돌봄·치료 제공자 매칭·예약 (보호자 앱 핵심 플로우)',
      path: 'projects/dodam-care-match/',
      surfaces: ['모바일'],
      owner: 'PM',
      version: '0.1.0',
      updatedAt: '2026-10-02',
      tag: '파일럿',
    },
    {
      slug: 'hulmate',
      name: '훌메이트',
      desc: '소규모 교회 화이트라벨 멀티테넌트 PWA — 교인앱·공개홈·관리자콘솔(은성 1호 파일럿)',
      path: 'projects/hulmate/',
      surfaces: ['교인앱', '공개홈', '관리자콘솔'],
      owner: 'J',
      version: '0.1.0',
      updatedAt: '2026-10-03',
      tag: '파일럿',
    },
    // /pd-init 이 새 프로젝트를 여기에 추가한다:
    // { slug:'...', name:'...', desc:'...', path:'projects/.../', surfaces:[...], owner:'...', version:'0.1.0', updatedAt:'YYYY-MM-DD' },
  ],
};
window.PDK_WORKSPACE = window.PLANDECK_WORKSPACE;
