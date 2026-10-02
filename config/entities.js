/* ───────────────────────────────────────────────────────────────
 * PlanDeck · config/entities.js — 데이터 모델(엔티티) 단일 정의
 * /pd-interface 가 채운다. 화면의 interface(계약)는 이 엔티티를 "참조"만 한다.
 *
 * 설계 원칙(벤치마크: W3C Design Tokens 별칭 · OpenAPI components · JSON Schema 2020-12):
 *   - 엔티티는 여기 한 번만 정의하고, 화면들은 '{entities.Order}' 별칭으로 참조(중복 금지·DRY).
 *   - 필드 어휘를 JSON Schema 2020-12 / OpenAPI 3.1 에 정렬 → /pd-handoff 가 그대로 유효한
 *     OpenAPI components.schemas 로 직렬화할 수 있다.
 *   - 비개발자는 raw OpenAPI 를 손으로 쓰지 않는다. 이 평이한 JS 객체만 채우면
 *     엔진이 사람용 표로 렌더하고, 핸드오프 커맨드가 기계용 스펙으로 방출한다.
 *
 * 필드 스키마:
 *   name, description,
 *   fields: [{ name, type, format?, enum?, required?, example?, note? }]
 *     - type: string | number | integer | boolean | object | array
 *     - format: 'date-time' | 'email' | 'uuid' | 'uri' ... (JSON Schema format)
 * ─────────────────────────────────────────────────────────────── */

window.PLANDECK_ENTITIES = {
  // Order: {
  //   name: '주문', description: '하나의 결제 주문',
  //   fields: [
  //     { name: 'id',        type: 'string', format: 'uuid', required: true, example: 'ord_abc123' },
  //     { name: 'amount',    type: 'integer', required: true, example: 12900, note: '원(KRW), 부가세 포함' },
  //     { name: 'status',    type: 'string', enum: ['pending', 'paid', 'failed', 'canceled'], required: true },
  //     { name: 'createdAt', type: 'string', format: 'date-time', required: true },
  //   ],
  // },
};

window.PDK_ENTITIES = window.PLANDECK_ENTITIES;
