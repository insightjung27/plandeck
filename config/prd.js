/* ───────────────────────────────────────────────────────────────
 * PlanDeck · config/prd.js — PRD(제품요구정의서) 단일 소스
 * /pd-prd 가 대화로 채운다. /pd-scaffold 가 이것을 읽어 화면을 자동 생성한다.
 *
 * 설계 원칙(벤치마크: GitHub Spec Kit /specify · Notion PRD · Linear):
 *   - PRD 는 "무엇·왜"만 담는다. "어떻게(기술 결정)"는 화면의 interface 로 미룬다.
 *   - 고정 7섹션 스키마(발명 금지) → 비개발자도 무엇을 적을지 안다.
 *   - requirements[] 의 각 reqId 가 화면 자동생성의 입력이 된다(추적성).
 *   - workflows[] 의 각 단계 체인이 화면 전이(flow.to)로 전개된다.
 * ─────────────────────────────────────────────────────────────── */

window.PLANDECK_PRD = {
  // ① 배경 — 왜 지금 이것을 만드는가(문제/맥락)
  background: '',

  // ② 목표 — 이 제품/기능이 이루려는 것 (측정 가능하게)
  goals: [
    // '예: 비회원도 3탭 안에 결제를 끝낸다',
  ],

  // ③ 사용자 — Job Story 형식 권장: "[상황]일 때, 나는 [동기]하고 싶다, 그래서 [결과]"
  users: [
    // { role: '구매자', jobStory: '급하게 선물할 때, 빠르게 결제하고 싶다, 그래서 약속을 지킨다' },
  ],

  // ④ 범위 — 포함 / 명시적 제외(Out of Scope). 제외를 적어야 범위가 고정된다.
  scope:        [ /* '회원가입', '상품 목록', '결제' */ ],
  outOfScope:   [ /* '정기구독', '다국어' */ ],

  // ⑤ 성공지표 — 무엇으로 성공을 판정하나
  successMetrics: [
    // { metric: '결제 완료율', target: '70% 이상' },
  ],

  // ⑥ 제약·가정·의존성
  constraints:  [ /* 'PG 는 토스페이먼츠 고정' */ ],
  assumptions:  [ /* '사용자는 이미 상품을 선택한 상태로 진입' */ ],
  dependencies: [ /* '회원 시스템은 기존 SSO 연동' */ ],

  // ⑦ 릴리스 — 단계/마일스톤
  releases: [
    // { name: 'MVP', scope: ['결제'], when: '2026-Q4' },
  ],

  // ── 화면 자동생성(/pd-scaffold)의 입력 ───────────────────────
  // requirements: 각 요구사항 → 보통 1개 이상의 화면으로 전개. reqId 로 추적.
  requirements: [
    // { reqId: 'REQ-001', text: '사용자는 상품을 선택해 결제할 수 있다', surfaces: ['mobile'] },
  ],

  // workflows: 핵심 프로세스. 각 step 체인이 화면 전이(flow.to)로 펼쳐진다.
  // 분기는 branch 로 표기(예: '결제 성공 여부').
  workflows: [
    // {
    //   name: '결제',
    //   surface: 'mobile',
    //   steps: [
    //     { screen: '상품목록', via: '상품 선택' },
    //     { screen: '장바구니', via: '결제하기' },
    //     { screen: '결제',     via: '결제 성공', branch: '결제 성공 여부' },
    //     { screen: '완료' },
    //   ],
    // },
  ],

  // scaffold 가 남기는 가정/미결 질문(사람 리뷰 게이트). 비우면 질문 없음.
  openQuestions: [
    // '결제 수단 범위 미정(카드만? 간편결제 포함?)',
  ],
};

window.PDK_PRD = window.PLANDECK_PRD;
