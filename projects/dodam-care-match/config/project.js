window.PLANDECK_PROJECT = {
  name: '도담 — 발달장애 가족 동행 플랫폼',
  description: '일산·파주/고양 발달장애 아동 가족의 동행자. 검증 안심장소·시간제돌봄·커뮤니티를 신뢰 기반으로 연결. 부모앱·파트너스앱·관리자 3채널. 실서비스(dodam-app) 기준.',
  version: '2.0.0',
  updatedAt: '2026-10-03',
  // 버전(브랜치) 레지스트리 — git 브랜치 개념. 같은 프로젝트의 여러 버전을 전환.
  versions: [
    { id: '2.0.0', label: 'main · 3채널', path: '../dodam-care-match/', current: true },
    { id: '1.0.0', label: '아카이브', path: '../dodam-care-match-v1/' },
  ],
  changelog: [
    { version: '2.0.0', date: '2026-10-03', note: '전면 재정의 — 실서비스 dodam-app(부모앱·파트너스앱·관리자) 3채널 기준 재구축. 돌봄·치료 매칭(v1) → "검증 안심장소 + 시간제돌봄 + 부모 커뮤니티"로 확장. 데이터모델 26엔티티, 규제게이트(PIPA 민감/미성년·성범죄경력조회·3.3% 정산·병원 무평점·비진단·저작권). 공통 컴포넌트 라이브러리(pd-components.js) 조립·인라인 0. [진행] 부모앱 46화면 완성(링크/flow 검증·REQ-P 전수) · 파트너스앱·관리자 순차 진행. v1.0.0은 아카이브 브랜치로 공존.' },
    { version: '1.0.0', date: '2026-10-03', note: '[아카이브] 돌봄·치료 매칭 중심 초기 기획 17화면(보호자앱+운영자콘솔). 요구사항 8/8.' },
    { version: '0.1.0', date: '2026-10-02', note: '파일럿 초안 — 매칭·예약 6화면.' },
  ],
  surfaces: [
    { key: 'parent',  device: 'mobile',  label: '부모앱(수요측)' },
    { key: 'partner', device: 'mobile',  label: '파트너스앱(공급측)' },
    { key: 'admin',   device: 'desktop', label: '관리자 콘솔(운영측)' },
  ],
  constitution: {
    auth: 'Supabase Auth(이메일/비번). 부모=둘러보기 무로그인 가능·쓰기 시 로그인. 관리자=requireAdmin()+RBAC. 민감정보(자녀 장애·중증도) 별도 동의·기본 비공개',
    baseUrl: 'Supabase `dodam` 스키마(3앱 공유 단일 진실원) · RLS + 서버액션',
    errorConvention: '서버액션 결과 + requirePermission(key, read|write) 게이트 · 전 쓰기 logAudit · 민감 열람 logView',
    naming: 'SCR-<약어>-<3자리> (PARENT/PTNR/ADMIN)',
    region: '서비스 권역=일산·파주/고양(regions 테이블 DB 구동·시도›구군›동 3단계)',
    payment: '도담패스 월 990원·실 PG 미연동(상태·UI만·수동). 코인=폐쇄형 환금불가. 정산 원천징수 3.3%',
  },
  get device() { return (this.surfaces && this.surfaces[0] && this.surfaces[0].device) || 'mobile'; },
  responsive: false,
};
window.PDK_PROJECT = window.PLANDECK_PROJECT;
