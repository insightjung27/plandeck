/* ───────────────────────────────────────────────────────────────
 * PlanDeck · config/screens.js — 화면 단일 소스(SSOT)
 * 좌측 페이지목록 · Description · Cases · Interface · Flow 가 모두 이 데이터에서 자동 생성된다.
 * 화면은 /pd-screen 또는 /pd-scaffold 로 추가하고, /pd-wireframe·/pd-cases·/pd-interface 로 채운다.
 * (초기엔 빈 배열)
 *
 * ┌─ 구조: 카테고리 그룹의 배열. 각 그룹 { category, pages: [page...] }
 * │
 * ├─ page 스키마 ───────────────────────────────────────────────
 * │   id        화면 ID (고유). 권장 'SCR-<약어>-<3자리>' (예: SCR-PAY-001)
 * │   label     사람이 읽는 화면 이름
 * │   href      화면 HTML 파일 경로 (예: 'screens/scr-pay-001.html')
 * │   surface   서피스 key (project.js surfaces[].key). 멀티서피스 구분.
 * │   entry     true=의도된 진입점(시작 화면). (출처 미연결과 구분)
 * │   reqIds    ['REQ-001'] PRD 요구사항 추적(선택)
 * │   context   언제/어떻게 보이는 화면인지
 * │
 * │   ★ status  화면 성숙도(designed 와 분리) — 핸드오프 게이트
 * │             'draft'        등록만(이름·흐름)
 * │             'wireframed'   스켈레톤+Description 작성
 * │             'confirmed'    기능·버튼·예외·인터페이스 정의 완료(기획 확정)
 * │             'ready-for-dev' 전 레이어 완결 + 동결(개발 착수 가능)
 * │   designed  bool — Figma 디자인 반영 여부(디자인 레인 전용, status 와 독립)
 * │   figmaLink Figma 시안 URL
 * │
 * │   description: [{ text, target }]   // 기능 설명 ↔ 화면요소 hover 강조
 * │        target = '.pd-<역할>' 셀렉터(스켈레톤 요소). 빈값이면 강조 없음.
 * │
 * │   ② components: [{ role, kind, label, action }]   // 구조화된 기능/버튼
 * │        role   = '.pd-<역할>' (description.target·interface.target 와 연결되는 키)
 * │        kind   = 'button'|'input'|'list'|'card'|'title'|'text'|'hero'|'tab'|...
 * │        action = { on:'click', do:'go:SCR-X-001' | 'write:createOrder' | 'read:getCart' }
 * │
 * │   ③ cases: [ ... ]   // 예외/경우의 수(상태전이표). /pd-cases 가 채움.
 * │        { state, trigger, guard, result, message, placement, recovery, target, api }
 * │        state     = 고정 enum: '초기'|'로딩'|'정상'|'빈데이터'|'에러'|'권한없음'|'엣지'
 * │                    | 입력검증: '필수누락'|'형식오류'|'범위경계'|'중복충돌'|'유효'  | 'N/A'
 * │        trigger   = 무엇이 이 경우를 유발하나(=via)
 * │        guard     = 조건(예: '비밀번호 불일치')
 * │        result    = 다음 화면 ID 또는 in-screen 상태(예: '같은 화면 유지')
 * │        message   = 사용자에게 보일 저작 문구(백엔드 raw 금지)
 * │        placement = 'toast'|'inline'|'summary'|'full-page'
 * │        recovery  = 복구 액션(예: '재입력')
 * │        target    = '.pd-<역할>' (해당 요소 강조)
 * │        api       = { endpoint, status } (RFC9457: 403→권한없음, 404→빈, 5xx→에러)
 * │
 * │   ④ interface: { reads, writes, events }   // 개발 인터페이스(화면=슬라이스)
 * │        reads:  [{ id, intent, method:'GET', path, response:'{entities.X}', auth, target }]
 * │        writes: [{ id, intent, method:'POST'|'PUT'|'DELETE', path,
 * │                   request:'{entities.X}', response:'{entities.Y}',
 * │                   errors:[{status, when, message}], auth, idempotency, target }]
 * │        events: [{ name, when, payload:'{entities.X}' }]
 * │        - response/request 는 '{entities.<Name>}' 별칭으로 entities.js 참조(중복 금지)
 * │        - target 으로 '이 버튼→이 write' 를 와이어프레임 요소에 묶는다(hover)
 * │
 * │   flow: { to: [{ screen, via, branch, kind, trigger, onCall }] }   // 간선의 유일 소스
 * │        screen  목적지 화면 ID(미등록이어도 OK → 유령 점선노드)
 * │        via     액션/조건 라벨
 * │        branch  분기 라벨(같은 화면+라벨 = 하나의 마름모로 병합)
 * │        kind    'auto' → 점선(자동 이동/복귀)
 * │        trigger (선택) 이 전이를 유발하는 '.pd-<역할>' 요소
 * │        onCall  (선택) 이 전이 시 호출되는 interface write id
 * └───────────────────────────────────────────────────────────────
 *
 * 불변식:
 *   - 간선은 flow.to 에만 적는다(from 금지). 들어오는 관계도 출발 화면의 to 에.
 *   - 같은 역할이 2개 이상이면 role 에 -1, -2 접미(예: '.pd-btn-next-2').
 *   - interface response/request 는 반드시 {entities.X} 별칭으로(raw hex/스키마 인라인 금지).
 */

window.PLANDECK_SCREENS = [];

// 엔진 코어(PDK) 호환 별칭 — 수정 불필요
window.PDK_SCREENS = window.PLANDECK_SCREENS;
