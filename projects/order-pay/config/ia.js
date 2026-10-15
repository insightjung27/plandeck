/* order-pay — IA 메뉴 모델(정보구조 depth·표현방식 SSOT 보조). engine/plandeck.js renderIA 가 렌더.
 * schema: channels[{key,label,device}] · placements[{screen,channel,parent|null,order,present,section?,label?,note?}]
 * present: page(전체페이지)|modal|sheet(바텀시트)|popover|alert(알림·확인)|toast|step(단계)|tab|drawer. 화면 추가/삭제 시 placements 동기화. */
window.PLANDECK_IA = {
 "_generated": "author-ia-nav-models · adversarially verified",
 "channels": [
  {
   "key": "mobile",
   "label": "간편결제앱 (모바일)",
   "device": "mobile"
  }
 ],
 "placements": [
  {
   "screen": "SCR-HOME-001",
   "channel": "mobile",
   "parent": null,
   "order": 1,
   "present": "page",
   "section": "구매 플로우",
   "note": "앱 첫 화면·하단 탭 홈 진입점"
  },
  {
   "screen": "SCR-SEARCH-001",
   "channel": "mobile",
   "parent": "SCR-HOME-001",
   "order": 1,
   "present": "page",
   "section": "구매 플로우",
   "note": "홈 검색바에서 진입"
  },
  {
   "screen": "SCR-DETAIL-001",
   "channel": "mobile",
   "parent": "SCR-HOME-001",
   "order": 2,
   "present": "page",
   "section": "구매 플로우",
   "note": "상품 선택 시 상세"
  },
  {
   "screen": "SCR-CART-001",
   "channel": "mobile",
   "parent": null,
   "order": 2,
   "present": "page",
   "section": "구매 플로우",
   "note": "하단 탭 장바구니 진입점"
  },
  {
   "screen": "SCR-CHECKOUT-001",
   "channel": "mobile",
   "parent": "SCR-CART-001",
   "order": 1,
   "present": "page",
   "section": "구매 플로우",
   "note": "주문하기로 주문서 진입"
  },
  {
   "screen": "SCR-ADDRESS-001",
   "channel": "mobile",
   "parent": "SCR-CHECKOUT-001",
   "order": 1,
   "present": "sheet",
   "section": "구매 플로우",
   "note": "배송지 선택/변경 폼(저장된 배송지 선택=sheet)·주문서로 복귀"
  },
  {
   "screen": "SCR-PAY-001",
   "channel": "mobile",
   "parent": "SCR-CHECKOUT-001",
   "order": 2,
   "present": "page",
   "section": "구매 플로우",
   "note": "결제하기로 진입·성공/실패 분기"
  },
  {
   "screen": "SCR-DONE-001",
   "channel": "mobile",
   "parent": "SCR-PAY-001",
   "order": 1,
   "present": "page",
   "section": "구매 플로우",
   "note": "결제 성공 전면 결과 페이지(주문번호+2 CTA). alert→page 교정"
  },
  {
   "screen": "SCR-FAIL-001",
   "channel": "mobile",
   "parent": "SCR-PAY-001",
   "order": 2,
   "present": "page",
   "section": "구매 플로우",
   "note": "결제 실패 전면 화면(재시도/홈 2 CTA). alert→page 교정"
  },
  {
   "screen": "SCR-ORDERS-001",
   "channel": "mobile",
   "parent": null,
   "order": 3,
   "present": "page",
   "section": "주문 관리",
   "note": "하단 탭 주문 진입점"
  },
  {
   "screen": "SCR-ORDER-DET-001",
   "channel": "mobile",
   "parent": "SCR-ORDERS-001",
   "order": 1,
   "present": "page",
   "section": "주문 관리",
   "note": "주문 선택 시 상세"
  },
  {
   "screen": "SCR-REFUND-001",
   "channel": "mobile",
   "parent": "SCR-ORDER-DET-001",
   "order": 1,
   "present": "page",
   "section": "주문 관리",
   "note": "취소/환불 신청 폼"
  },
  {
   "screen": "SCR-REVIEW-001",
   "channel": "mobile",
   "parent": "SCR-ORDERS-001",
   "order": 2,
   "present": "page",
   "section": "주문 관리",
   "note": "배송 완료 건 후기 작성 폼(별점·내용·사진). modal→page 교정"
  },
  {
   "screen": "SCR-MYPAGE-001",
   "channel": "mobile",
   "parent": null,
   "order": 4,
   "present": "page",
   "section": "마이·설정",
   "note": "하단 탭 마이 허브"
  },
  {
   "screen": "SCR-ADDRESSBOOK-001",
   "channel": "mobile",
   "parent": "SCR-MYPAGE-001",
   "order": 1,
   "present": "page",
   "section": "마이·설정",
   "note": "배송지 관리"
  },
  {
   "screen": "SCR-PAYMENTS-001",
   "channel": "mobile",
   "parent": "SCR-MYPAGE-001",
   "order": 2,
   "present": "page",
   "section": "마이·설정",
   "note": "결제 수단 관리"
  },
  {
   "screen": "SCR-PAYMENT-ADD-001",
   "channel": "mobile",
   "parent": "SCR-PAYMENTS-001",
   "order": 1,
   "present": "sheet",
   "section": "마이·설정",
   "note": "카드/간편결제 등록 폼(관리 리스트에서 추가 오버레이)"
  },
  {
   "screen": "SCR-COUPONS-001",
   "channel": "mobile",
   "parent": "SCR-MYPAGE-001",
   "order": 3,
   "present": "page",
   "section": "마이·설정",
   "note": "쿠폰·포인트 관리"
  },
  {
   "screen": "SCR-SUPPORT-001",
   "channel": "mobile",
   "parent": "SCR-MYPAGE-001",
   "order": 4,
   "present": "page",
   "section": "마이·설정",
   "note": "고객센터 FAQ·문의"
  }
 ]
};
