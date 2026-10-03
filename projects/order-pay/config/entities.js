window.PLANDECK_ENTITIES = {
  Product: {
    name: '상품', description: '판매 상품',
    fields: [
      { name: 'id', type: 'string', format: 'uuid', required: true, example: 'prd_001' },
      { name: 'name', type: 'string', required: true, example: '수제 꽃차 선물세트' },
      { name: 'price', type: 'integer', required: true, example: 12900, note: '원(KRW), 부가세 포함' },
      { name: 'thumbnail', type: 'string', format: 'uri', example: 'https://cdn.../prd_001.jpg' },
      { name: 'rating', type: 'number', example: 4.9 },
      { name: 'stock', type: 'integer', required: true, example: 23 },
    ],
  },
  CartItem: {
    name: '장바구니 항목', description: '장바구니에 담긴 상품·수량',
    fields: [
      { name: 'productId', type: 'string', format: 'uuid', required: true },
      { name: 'option', type: 'string', example: '기본 구성' },
      { name: 'qty', type: 'integer', required: true, example: 1 },
    ],
  },
  Address: {
    name: '배송지', description: '받는 분·주소',
    fields: [
      { name: 'id', type: 'string', format: 'uuid', required: true },
      { name: 'label', type: 'string', example: '집' },
      { name: 'recipient', type: 'string', required: true, example: '김구매' },
      { name: 'phone', type: 'string', required: true, example: '010-1234-5678' },
      { name: 'address', type: 'string', required: true, example: '서울 강남구 테헤란로 123' },
      { name: 'detail', type: 'string', example: '101동 1001호' },
      { name: 'isDefault', type: 'boolean', example: true },
    ],
  },
  PaymentMethod: {
    name: '결제 수단', description: '등록된 카드/간편결제',
    fields: [
      { name: 'id', type: 'string', format: 'uuid', required: true },
      { name: 'type', type: 'string', enum: ['card', 'tosspay', 'kakaopay'], required: true },
      { name: 'display', type: 'string', example: '신한카드 ****1234' },
      { name: 'isDefault', type: 'boolean', example: true },
    ],
  },
  OrderDraft: {
    name: '주문 초안', description: '결제 요청 입력',
    fields: [
      { name: 'items', type: 'array', required: true, note: '{entities.CartItem}[]' },
      { name: 'addressId', type: 'string', format: 'uuid', required: true },
      { name: 'method', type: 'string', enum: ['card', 'tosspay', 'kakaopay'], required: true },
      { name: 'couponId', type: 'string', required: false },
    ],
  },
  Order: {
    name: '주문', description: '확정된 결제 주문(배송 추적 포함)',
    fields: [
      { name: 'id', type: 'string', format: 'uuid', required: true, example: 'ord_abc123' },
      { name: 'amount', type: 'integer', required: true, example: 21400 },
      { name: 'status', type: 'string', enum: ['pending', 'paid', 'shipping', 'delivered', 'failed', 'canceled'], required: true, note: 'paid=결제완료, shipping=배송중, delivered=배송완료' },
      { name: 'addressId', type: 'string', format: 'uuid', required: true },
      { name: 'trackingNo', type: 'string', example: 'CJ1234567890', note: '배송 조회 번호' },
      { name: 'createdAt', type: 'string', format: 'date-time', required: true },
    ],
  },
  Review: {
    name: '후기', description: '배송 완료 주문에 대한 상품 후기',
    fields: [
      { name: 'id', type: 'string', format: 'uuid', required: true },
      { name: 'orderId', type: 'string', format: 'uuid', required: true },
      { name: 'rating', type: 'integer', required: true, example: 5, note: '1~5' },
      { name: 'content', type: 'string', required: true },
    ],
  },
};
window.PDK_ENTITIES = window.PLANDECK_ENTITIES;
