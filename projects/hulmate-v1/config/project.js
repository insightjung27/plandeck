window.PLANDECK_PROJECT = {
  name: '훌메이트 (v1.1 · 아카이브)',
  description: '[v1.1 아카이브 — v2.0 「교회 멀티테넌트 플랫폼(Web+PWA·대표사이트·개설 Wizard·Web Push)」으로 대체됨] 소규모 교회용 화이트라벨 멀티테넌트 PWA — 4서피스 61화면(교인앱·공개홈·관리자콘솔·슈퍼관리자)·요구사항 33/33. 버전 비교·보존용으로 동결.',
  version: '1.1.4',
  updatedAt: '2026-10-08',
  // 버전(브랜치) 레지스트리 — 같은 프로젝트의 여러 버전을 페이지 상단 ⎇ 스위처로 전환.
  versions: [
    { id: '2.0.0', label: '최신 · 5채널', path: '../hulmate/' },
    { id: '1.1.4', label: '아카이브', path: '../hulmate-v1/', current: true },
  ],
  changelog: [
    { version: '1.1.4-archive', date: '2026-10-08', note: '[아카이브 동결] v2.0 재기준화(교회별 독립 Web/PWA·대표사이트·개설 Wizard·Web Push·린 MVP)로 대체되어 이 버전은 `hulmate` 슬롯에서 분리·보존. V1 전체(61화면·33요구사항·22엔티티)를 버전 비교용으로 동결. 최신본=projects/hulmate(V2.0).' },
    { version: '1.1.4', date: '2026-10-03', note: '3차 재검수 조건부 해소(→통과) — M3 .pd-process 컴포넌트 고아(screens.js 선언 vs DOM 미존재·불변식4 SSOT↔DOM 불일치) 해소: c-privacy 승인/반려 버튼에 pd-process 훅 부여 + c-members .pd-member-table 타깃 슬리피지 정렬(wrap+table). H1~H5+M1·M3·M4 전수 닫힘·SSOT↔DOM 정합. 적대검수 3R 통과.' },
    { version: '1.1.3', date: '2026-10-03', note: '잔여 Medium M1·M3·M4 보강(적대검수 지적 전수 해소) — M1 가입 거부(reject) 배선(c-members 거부 버튼+confirmReason 사유·멱등·member.rejected·member.approve 권한) / M3 PIPA 권리요청 승인/반려 구분+confirm+멱등+에러카탈로그(삭제=비가역·법정보존 예외 422·pii.read) / M4 탈퇴 2단계 확인 UI(confirmReason 사유). confirm 6화면·이모지0·링크/flow/REQ 전수 유지. H1~H5+M1·M3·M4 모두 해소.' },
    { version: '1.1.2', date: '2026-10-03', note: '재검수 조건부 3건 해소(→통과) — (1)주민번호 가입-필수수집 제거→기부금영수증 발급요청 시점 수집(PIPA §24조의2·최소수집) (2)이모지 1건(a-community-detail 🙏) 제거(이모지 0) (3)탈퇴↔세무보존 상충 해소(기부금영수증 등 법정 보존 항목 파기 예외 명시, H2 정합). 적대검수 2R: H1~H5 end-to-end 닫힘 확인·회귀0. ★J-게이트=주민번호 처리 법무 확인.' },
    { version: '1.1.1', date: '2026-10-03', note: '적대검수 H1~H5 보강 — H1 대량발송 비가역계약(confirmReason 대상수·승인메모·멱등·confirm·야간423·옵트아웃 제외·예약취소) / H2 기부금영수증 취소(사유필수·감사·canceled) / H3 영수증 발급주체=교회(교인은 발급요청/다운로드·셀프발급 제거) / H4 PIPA 목적별 분리동의+만14세미만 법정대리인 분기 / H5 이단심사 반려(사유)·이의신청. confirmReason 공통 컴포넌트(SSOT) 재사용. 링크/flow/REQ 전수 유지·이모지 0.' },
    { version: '1.1.0', date: '2026-10-03', note: '완결성 보강(적대검수 반영) — 4서피스 61화면(+12: 검색·영수증·권리요청·출석·알림설정·설정·약관·관리자/운영자 로그인·공개홈 콘텐츠관리·모더레이션·감사로그)·요구사항 33/33 커버. 데이터모델 22엔티티(tenantId 격리)·RBAC(role×permission 2축)·멀티테넌트 격리계약·NFR(접근성/PWA/푸시/보안)·대체재WTP·J게이트(규제) 추가. interface 멱등키·에러카탈로그·페이지네이션 심화. PRD 정본 v1.0.0 재생성.' },
    { version: '1.0.0', date: '2026-10-03', note: '기획 완성 — 4서피스 49화면 전면 와이어프레임(클릭 가능·링크 무결성)·요구사항 20/20 커버·전 화면 경우의수/개발인터페이스 완비·성숙도 confirmed. 문자지갑(REQ-019)·개인정보보호 PIPA(REQ-020) 추가.' },
    { version: '0.1.0', date: '2026-10-03', note: 'PlanDeck 기획 착수 — 교인앱·공개홈·관리자콘솔 핵심 8화면(파일럿 범위)' },
  ],
  surfaces: [
    { key: 'app',   device: 'mobile',  label: '교인앱(모바일)' },
    { key: 'site',  device: 'mobile',  label: '공개홈(모바일)' },
    { key: 'admin', device: 'desktop', label: '관리자콘솔(PC웹)' },
    { key: 'super', device: 'desktop', label: '슈퍼관리자(PC웹)' },
  ],
  constitution: {
    auth: '교회별 세션(테넌트 격리). 관리자=역할기반(RBAC). 주민번호 등 민감정보=service_role 전용 암호화·마스킹(PIPA 내장)',
    baseUrl: 'https://api.hurmate.example.com/v1',
    errorConvention: 'RFC 9457 Problem Details (application/problem+json)',
    naming: 'SCR-<약어>-<3자리>. 멀티테넌트: 모든 조회·쓰기는 tenant(교회) 스코프 강제',
  },
  get device() { return (this.surfaces && this.surfaces[0] && this.surfaces[0].device) || 'mobile'; },
  responsive: false,
};
window.PDK_PROJECT = window.PLANDECK_PROJECT;
