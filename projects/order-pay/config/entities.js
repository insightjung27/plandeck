window.PLANDECK_ENTITIES = {
  Product: {
    name: '상품', description: '판매 상품',
    fields: [
      { name: 'id', type: 'string', format: 'uuid', required: true, example: 'prd_001' },
      { name: 'name', type: 'string', required: true, example: '수제 꽃차 선물세트' },
      { name: 'price', type: 'integer', required: true, example: 12900, note: '원(KRW), 부가세 포함' },
      { name: 'thumbnail', type: 'string', format: 'uri', example: 'https://cdn.../prd_001.jpg' },
      { name: 'stock', type: 'integer', required: true, example: 23 },
    ],
  },
  OrderDraft: {
    name: '주문 초안', description: '결제 요청 입력',
    fields: [
      { name: 'productId', type: 'string', format: 'uuid', required: true },
      { name: 'qty', type: 'integer', required: true, example: 1 },
      { name: 'method', type: 'string', enum: ['card', 'tosspay'], required: true },
    ],
  },
  Order: {
    name: '주문', description: '확정된 결제 주문',
    fields: [
      { name: 'id', type: 'string', format: 'uuid', required: true, example: 'ord_abc123' },
      { name: 'amount', type: 'integer', required: true, example: 12900 },
      { name: 'status', type: 'string', enum: ['pending', 'paid', 'failed', 'canceled'], required: true },
      { name: 'createdAt', type: 'string', format: 'date-time', required: true },
    ],
  },
};
window.PDK_ENTITIES = window.PLANDECK_ENTITIES;
