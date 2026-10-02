/* ───────────────────────────────────────────────────────────────
 * PlanDeck · config/project.js — 프로젝트 표지 + 전역 규칙(Constitution)
 * /pd-init 이 생성·갱신한다. (초기엔 비어 있음)
 *
 * PlanDeck는 PDK(화면설계서 엔진)를 기반으로, PRD→화면→예외→개발 인터페이스를
 * 하나의 config SSOT로 잇는 "기획 중심 협업 킷"이다.
 *
 * ★ surfaces: 이 프로젝트가 다루는 단말/화면 서피스 목록.
 *    같은 프로세스를 모바일/PC웹/키오스크 등 여러 서피스로 동시에 설계할 수 있다.
 *    각 서피스는 devices.js 의 디바이스 key 를 가리킨다.
 * ★ constitution: 모든 화면이 상속하는 전역 규칙(인증 모델·에러 규약·base URL·네이밍).
 *    화면마다 반복 선언하지 않는다(= GitHub Spec Kit constitution, OpenAPI 전역 설정 차용).
 * ─────────────────────────────────────────────────────────────── */

window.PLANDECK_PROJECT = {
  name: '',
  description: '',

  // ── 버전 관리 (한번 만든 기획서를 이어서 관리) ──
  // version: 기획서 버전(SemVer 권장). /pd-version 이 올리고 changelog에 기록.
  // git 태그(예: v0.2.0)로 스냅샷을 남기면 3계층(태그·version·화면 _hash)으로 추적된다.
  version: '0.1.0',
  updatedAt: '',          // 최근 수정일(YYYY-MM-DD)
  changelog: [
    // { version:'0.1.0', date:'2026-10-02', note:'초기 작성' },
  ],

  // 다룰 서피스(단말) 목록. 첫 항목이 기본 서피스.
  // device = devices.js 의 key. label = 상단 서피스 전환 탭에 표시.
  surfaces: [
    // { key: 'mobile',  device: 'mobile',     label: '모바일' },
    // { key: 'pc',      device: 'desktop',    label: 'PC 웹' },
    // { key: 'kiosk',   device: 'tossfront2', label: '키오스크' },
  ],

  // 전역 규칙(모든 화면 상속). 개발 인터페이스/핸드오프의 공통 전제.
  constitution: {
    auth: '',            // 예: 'Bearer JWT (Authorization 헤더)'
    baseUrl: '',         // 예: 'https://api.example.com/v1'
    errorConvention: '', // 예: 'RFC 9457 Problem Details (application/problem+json)'
    naming: 'SCR-<카테고리약어>-<3자리>',  // 화면 ID 권장 형식
  },

  // ── PDK 엔진(engine/common.js) 호환 미러 ──────────────────────
  // common.js 는 PDK_PROJECT.device(단일) 를 읽는다. 첫 서피스를 기본 디바이스로 미러.
  get device() {
    return (this.surfaces && this.surfaces[0] && this.surfaces[0].device) || 'desktop';
  },
  responsive: false,
};

// 엔진 코어(PDK) 호환 별칭 — 수정 불필요
window.PDK_PROJECT = window.PLANDECK_PROJECT;
