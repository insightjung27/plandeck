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
      desc: '비회원 간편결제 — 상품탐색·장바구니·주문서·결제·주문관리·마이 19화면(실서비스 수준)',
      path: 'projects/order-pay/',
      surfaces: ['모바일'],
      owner: 'PlanDeck',
      version: '1.0.0',
      updatedAt: '2026-10-03',
      tag: '완성 v1.0',
    },
    {
      slug: 'dodam-care-match',
      name: '도담 — 발달장애 가족 동행 플랫폼',
      desc: '일산·파주 발달장애 아동 가족의 동행자 — 부모앱·파트너스앱·관리자 3채널 108화면(안심매장·시간제돌봄·시그널카드·커뮤니티·공급 검증·정산·운영). 실서비스(dodam-app) 기준 재구축.',
      path: 'projects/dodam-care-match/',
      surfaces: ['부모앱', '파트너스앱', '관리자콘솔'],
      owner: 'PM',
      version: '2.0.0',
      updatedAt: '2026-10-03',
      tag: '최신 v2.0',
      versionGroup: 'dodam',
    },
    {
      slug: 'dodam-care-match-v1',
      name: '도담 (v1.0 · 아카이브)',
      desc: '[이전 버전] 장애아동 돌봄·치료 매칭 중심 초기 기획(17화면). v2.0(3채널 동행 플랫폼)으로 대체 — 버전 비교·보존용.',
      path: 'projects/dodam-care-match-v1/',
      surfaces: ['보호자앱', '운영자콘솔', '태블릿'],
      owner: 'PM',
      version: '1.0.0',
      updatedAt: '2026-10-03',
      tag: '아카이브 v1.0',
      versionGroup: 'dodam',
    },
    {
      slug: 'hulmate',
      name: '훌메이트',
      desc: '소규모 교회 화이트라벨 멀티테넌트 PWA — 4서피스 61화면(교인앱·공개홈·관리자콘솔·슈퍼관리자)·요구사항 33/33',
      path: 'projects/hulmate/',
      surfaces: ['교인앱', '공개홈', '관리자콘솔', '슈퍼관리자'],
      owner: 'J',
      version: '1.1.3',
      updatedAt: '2026-10-03',
      tag: '완성 v1.1',
    },
    // /pd-init 이 새 프로젝트를 여기에 추가한다:
    // { slug:'...', name:'...', desc:'...', path:'projects/.../', surfaces:[...], owner:'...', version:'0.1.0', updatedAt:'YYYY-MM-DD' },
  ],
};
window.PDK_WORKSPACE = window.PLANDECK_WORKSPACE;
