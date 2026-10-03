window.PLANDECK_PROJECT = {
  name: '도담 돌봄·치료 매칭',
  description: '장애아동 가정 ↔ 검증된 돌봄·치료 제공자 매칭·예약·이용 관리(보호자 앱) + 운영자 콘솔(심사·예약관리). 17화면 기획 완성.',
  version: '1.0.0',
  updatedAt: '2026-10-03',
  changelog: [
    { version: '1.0.0', date: '2026-10-03', note: '기획 완성 — 전면 재구축(컴포넌트 라이브러리·정적 href·클릭 가능) + 미결 4개 해소 + REQ-005~008(로그인·아동·예약내역/후기·운영 심사/예약관리). 17화면, 요구사항 8/8 커버.' },
    { version: '0.1.0', date: '2026-10-02', note: '파일럿 초안 — 매칭·예약 6화면(검색→상세→예약→확인→완료). 실제 요구로 교정 필요' },
  ],
  surfaces: [
    { key: 'mobile', device: 'mobile', label: '모바일(보호자 앱)' },
    { key: 'pc', device: 'desktop', label: 'PC웹(운영자 콘솔)' },
    { key: 'tablet', device: 'tablet', label: '태블릿(운영자)' },
  ],
  constitution: {
    auth: 'Bearer JWT (보호자 로그인). 민감정보(아동 프로필)는 최소수집·암호화 전제',
    baseUrl: 'https://api.dodam.example.com/v1',
    errorConvention: 'RFC 9457 Problem Details (application/problem+json)',
    naming: 'SCR-<약어>-<3자리>',
  },
  get device() { return (this.surfaces && this.surfaces[0] && this.surfaces[0].device) || 'mobile'; },
  responsive: false,
};
window.PDK_PROJECT = window.PLANDECK_PROJECT;
