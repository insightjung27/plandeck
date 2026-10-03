window.PLANDECK_ENTITIES = {
  Provider: {
    name: '제공자', description: '검증된 돌봄·치료 서비스 제공자(기업/전문가)',
    fields: [
      { name: 'id', type: 'string', format: 'uuid', required: true, example: 'prv_001' },
      { name: 'name', type: 'string', required: true, example: '햇살아이 발달센터' },
      { name: 'verified', type: 'boolean', required: true, example: true, note: '검증 심사 통과 여부' },
      { name: 'serviceTypes', type: 'array', required: true, example: ['언어치료', '놀이치료'] },
      { name: 'region', type: 'string', required: true, example: '서울 강서구' },
      { name: 'rating', type: 'number', example: 4.8, note: '후기 평점(0~5)' },
      { name: 'reviewCount', type: 'integer', example: 37 },
    ],
  },
  Child: {
    name: '아동 프로필', description: '보호자가 등록한 아동(민감정보 — 최소수집·동의)',
    fields: [
      { name: 'id', type: 'string', format: 'uuid', required: true },
      { name: 'nickname', type: 'string', required: true, example: '단이', note: '식별 최소화(실명 대신 애칭 권장)' },
      { name: 'ageMonths', type: 'integer', example: 54 },
      { name: 'needsTags', type: 'array', example: ['언어발달', '감각'], note: '민감정보 — 동의 기반' },
    ],
  },
  BookingDraft: {
    name: '예약 신청 입력', description: '예약 신청 시 전송',
    fields: [
      { name: 'providerId', type: 'string', format: 'uuid', required: true },
      { name: 'childId', type: 'string', format: 'uuid', required: true },
      { name: 'serviceType', type: 'string', required: true, example: '언어치료' },
      { name: 'preferredSlots', type: 'array', required: true, example: ['2026-10-10T10:00', '2026-10-11T14:00'], note: '희망 일정 1~3개' },
      { name: 'note', type: 'string', example: '첫 방문, 낯가림 있어요' },
      { name: 'consent', type: 'boolean', required: true, example: true, note: '민감정보 제공 동의' },
    ],
  },
  Booking: {
    name: '예약', description: '생성된 예약(승인 대기형)',
    fields: [
      { name: 'id', type: 'string', format: 'uuid', required: true, example: 'bkg_abc123' },
      { name: 'status', type: 'string', enum: ['requested', 'approved', 'rejected', 'completed', 'canceled'], required: true, example: 'requested', note: 'requested=승인대기, approved=확정, completed=완료' },
      { name: 'providerId', type: 'string', format: 'uuid', required: true },
      { name: 'childId', type: 'string', format: 'uuid', required: true },
      { name: 'slot', type: 'string', format: 'date-time', note: '확정 일정' },
      { name: 'createdAt', type: 'string', format: 'date-time', required: true },
    ],
  },
  Review: {
    name: '후기', description: '이용 완료 후 보호자가 작성한 제공자 후기',
    fields: [
      { name: 'id', type: 'string', format: 'uuid', required: true },
      { name: 'bookingId', type: 'string', format: 'uuid', required: true },
      { name: 'rating', type: 'integer', required: true, example: 5, note: '평점 1~5' },
      { name: 'content', type: 'string', required: true, example: '아이 눈높이에 맞춰 지도해주셨어요' },
      { name: 'realName', type: 'boolean', example: true, note: '실명 후기 동의' },
    ],
  },
  Member: {
    name: '보호자', description: '도담 보호자 계정',
    fields: [
      { name: 'id', type: 'string', format: 'uuid', required: true },
      { name: 'email', type: 'string', format: 'email', required: true },
      { name: 'name', type: 'string', example: '김보호' },
      { name: 'childCount', type: 'integer', example: 1, note: '등록 아동 수' },
    ],
  },
};
window.PDK_ENTITIES = window.PLANDECK_ENTITIES;
