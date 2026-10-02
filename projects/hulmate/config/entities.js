window.PLANDECK_ENTITIES = {
  Church: {
    name: '교회(테넌트)', description: '화이트라벨 테넌트 — 교회별 독립 브랜드·설정. 모든 데이터의 격리 단위',
    fields: [
      { name: 'id', type: 'string', format: 'uuid', required: true, example: 'chr_eunsung' },
      { name: 'slug', type: 'string', required: true, example: 'eunsung', note: 'URL 경로 테넌트 식별자' },
      { name: 'name', type: 'string', required: true, example: '은성교회' },
      { name: 'homeConcept', type: 'string', enum: ['welcome', 'sermon', 'community', 'content'], required: true, example: 'welcome', note: '공개홈 디자인 템플릿' },
      { name: 'theme', type: 'object', note: '브랜드 색·로고(화이트라벨)', example: { primary: '#53634b', logo: '/eunsung/logo.png' } },
      { name: 'features', type: 'object', note: '기능 On/Off 플래그', example: { finance: true, registry: false, market: false } },
      { name: 'offeringGuideOnly', type: 'boolean', example: true, note: '헌금=안내전용(실결제 X)' },
    ],
  },
  Member: {
    name: '성도(교인)', description: '교회 소속 성도 — 테넌트 격리. 민감정보 PIPA 내장',
    fields: [
      { name: 'id', type: 'string', format: 'uuid', required: true },
      { name: 'tenantId', type: 'string', format: 'uuid', required: true, note: '교회(테넌트) 스코프' },
      { name: 'name', type: 'string', required: true, example: '김성도' },
      { name: 'role', type: 'string', enum: ['member', 'admin', 'pastor'], required: true, example: 'member' },
      { name: 'status', type: 'string', enum: ['pending', 'active', 'rejected'], required: true, example: 'active', note: '가입=승인대기 흐름' },
      { name: 'department', type: 'string', example: '청년부' },
      { name: 'rrnEnc', type: 'string', note: '주민번호 암호문 — service_role 전용·마스킹(PIPA)', example: '••••••-•••••••' },
    ],
  },
  Sermon: {
    name: '설교', description: '설교 콘텐츠(유튜브 URL 파싱 → 앱 재생). 주일 라이브 토글',
    fields: [
      { name: 'id', type: 'string', format: 'uuid', required: true },
      { name: 'tenantId', type: 'string', format: 'uuid', required: true },
      { name: 'title', type: 'string', required: true, example: '로마서 강해 12' },
      { name: 'preacher', type: 'string', required: true, example: '조정표 담임목사' },
      { name: 'videoUrl', type: 'string', format: 'uri', example: 'https://youtu.be/…' },
      { name: 'date', type: 'string', format: 'date', required: true },
      { name: 'isLive', type: 'boolean', example: false, note: '주일 라이브=홈 노출' },
    ],
  },
  Offering: {
    name: '헌금(안내)', description: '헌금 안내 정보 — 파일럿은 안내전용(실 PG 결제 미연동)',
    fields: [
      { name: 'tenantId', type: 'string', format: 'uuid', required: true },
      { name: 'kinds', type: 'array', required: true, example: ['주정헌금', '십일조', '감사헌금'] },
      { name: 'account', type: 'string', example: '○○은행 000-000-000000', note: '미제공 시 교회확인후게재' },
      { name: 'guideOnly', type: 'boolean', required: true, example: true },
    ],
  },
  AttendanceSession: {
    name: '출석 세션', description: '예배별 출석 체크 세션(관리자) — 장기결석 자동감지 기반',
    fields: [
      { name: 'id', type: 'string', format: 'uuid', required: true },
      { name: 'tenantId', type: 'string', format: 'uuid', required: true },
      { name: 'service', type: 'string', required: true, example: '주일 1부 예배' },
      { name: 'date', type: 'string', format: 'date', required: true },
      { name: 'presentCount', type: 'integer', example: 42 },
      { name: 'method', type: 'string', enum: ['qr', 'manual', 'online'], example: 'qr', note: '온라인예배 시청=출석 자동인정' },
    ],
  },
};
window.PDK_ENTITIES = window.PLANDECK_ENTITIES;
