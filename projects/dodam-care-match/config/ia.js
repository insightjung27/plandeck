/* dodam-care-match — IA 메뉴 모델(정보구조 depth·표현방식 SSOT 보조). engine/plandeck.js renderIA 가 렌더.
 * schema: channels[{key,label,device}] · placements[{screen,channel,parent|null,order,present,section?,label?,note?}]
 * present: page(전체페이지)|modal|sheet(바텀시트)|popover|alert(알림·확인)|toast|step(단계)|tab|drawer. 화면 추가/삭제 시 placements 동기화. */
window.PLANDECK_IA = {
 "_generated": "author-ia-nav-models · adversarially verified",
 "channels": [
  {
   "key": "parent",
   "label": "부모앱 (모바일)",
   "device": "mobile"
  },
  {
   "key": "partner",
   "label": "파트너스앱 (모바일)",
   "device": "mobile"
  },
  {
   "key": "admin",
   "label": "관리자 콘솔 (데스크톱)",
   "device": "desktop"
  }
 ],
 "placements": [
  {
   "screen": "SCR-PARENT-001",
   "channel": "parent",
   "parent": null,
   "order": 1,
   "present": "page",
   "section": "홈",
   "note": "탭바 L1·개인화 허브·무로그인 둘러보기 진입"
  },
  {
   "screen": "SCR-PARENT-004",
   "channel": "parent",
   "parent": null,
   "order": 2,
   "present": "page",
   "section": "찾기",
   "note": "탭바 L1·안심매장 탐색"
  },
  {
   "screen": "SCR-PARENT-006",
   "channel": "parent",
   "parent": null,
   "order": 3,
   "present": "page",
   "section": "돌봄",
   "note": "탭바 L1·자녀 케어 허브(tiles)"
  },
  {
   "screen": "SCR-PARENT-007",
   "channel": "parent",
   "parent": null,
   "order": 4,
   "present": "page",
   "section": "커뮤니티",
   "note": "탭바 L1·내부 tabs 보유"
  },
  {
   "screen": "SCR-PARENT-008",
   "channel": "parent",
   "parent": null,
   "order": 5,
   "present": "page",
   "section": "마이",
   "note": "탭바 L1·내 활동/설정 허브"
  },
  {
   "screen": "SCR-PARENT-002",
   "channel": "parent",
   "parent": null,
   "order": 6,
   "present": "page",
   "section": "계정",
   "note": "쓰기 시 유도되는 독립 진입"
  },
  {
   "screen": "SCR-PARENT-003",
   "channel": "parent",
   "parent": "SCR-PARENT-002",
   "order": 1,
   "present": "step",
   "section": "계정",
   "note": "가입→아이 등록·동의 게이트 온보딩"
  },
  {
   "screen": "SCR-PARENT-021",
   "channel": "parent",
   "parent": null,
   "order": 7,
   "present": "sheet",
   "section": "긴급",
   "note": "전 화면 FAB에서 올라오는 긴급 액션"
  },
  {
   "screen": "SCR-PARENT-020",
   "channel": "parent",
   "parent": "SCR-PARENT-001",
   "order": 1,
   "present": "modal",
   "section": "홈",
   "note": "홈 시그널카드 오버레이(전체화면 카드)"
  },
  {
   "screen": "SCR-PARENT-040",
   "channel": "parent",
   "parent": "SCR-PARENT-001",
   "order": 2,
   "present": "page",
   "section": "홈",
   "note": "상단 벨 알림함"
  },
  {
   "screen": "SCR-PARENT-033",
   "channel": "parent",
   "parent": "SCR-PARENT-001",
   "order": 3,
   "present": "page",
   "section": "홈",
   "note": "홈에서 진입하는 동네 이벤트"
  },
  {
   "screen": "SCR-PARENT-034",
   "channel": "parent",
   "parent": "SCR-PARENT-001",
   "order": 4,
   "present": "page",
   "section": "홈",
   "note": "돌봄 이야기 콘텐츠 허브"
  },
  {
   "screen": "SCR-PARENT-035",
   "channel": "parent",
   "parent": "SCR-PARENT-034",
   "order": 1,
   "present": "page",
   "section": "홈"
  },
  {
   "screen": "SCR-PARENT-038",
   "channel": "parent",
   "parent": "SCR-PARENT-035",
   "order": 1,
   "present": "page",
   "section": "홈",
   "note": "주제별 가이드 상세"
  },
  {
   "screen": "SCR-PARENT-036",
   "channel": "parent",
   "parent": "SCR-PARENT-034",
   "order": 2,
   "present": "page",
   "section": "홈"
  },
  {
   "screen": "SCR-PARENT-039",
   "channel": "parent",
   "parent": "SCR-PARENT-036",
   "order": 1,
   "present": "page",
   "section": "홈"
  },
  {
   "screen": "SCR-PARENT-037",
   "channel": "parent",
   "parent": "SCR-PARENT-034",
   "order": 3,
   "present": "page",
   "section": "홈"
  },
  {
   "screen": "SCR-PARENT-005",
   "channel": "parent",
   "parent": "SCR-PARENT-004",
   "order": 1,
   "present": "page",
   "section": "찾기",
   "note": "매장 상세"
  },
  {
   "screen": "SCR-PARENT-012",
   "channel": "parent",
   "parent": "SCR-PARENT-005",
   "order": 1,
   "present": "sheet",
   "section": "찾기",
   "note": "방문 예약 옵션 바텀시트"
  },
  {
   "screen": "SCR-PARENT-013",
   "channel": "parent",
   "parent": "SCR-PARENT-012",
   "order": 1,
   "present": "alert",
   "section": "찾기",
   "note": "예약 접수 완료 확인"
  },
  {
   "screen": "SCR-PARENT-024",
   "channel": "parent",
   "parent": "SCR-PARENT-005",
   "order": 2,
   "present": "modal",
   "section": "찾기",
   "note": "안심 후기 작성 모달(로그인 게이트)"
  },
  {
   "screen": "SCR-PARENT-009",
   "channel": "parent",
   "parent": "SCR-PARENT-006",
   "order": 1,
   "present": "page",
   "section": "돌봄",
   "note": "홈 '맡기기' 교차 진입·조건 선택"
  },
  {
   "screen": "SCR-PARENT-010",
   "channel": "parent",
   "parent": "SCR-PARENT-009",
   "order": 1,
   "present": "page",
   "section": "돌봄",
   "note": "돌보미 매칭 목록"
  },
  {
   "screen": "SCR-PARENT-011",
   "channel": "parent",
   "parent": "SCR-PARENT-010",
   "order": 1,
   "present": "alert",
   "section": "돌봄",
   "note": "예약 요청 완료(수락 대기)"
  },
  {
   "screen": "SCR-PARENT-014",
   "channel": "parent",
   "parent": "SCR-PARENT-006",
   "order": 2,
   "present": "page",
   "section": "돌봄",
   "note": "치료 세션 예약 폼(완료는 015)"
  },
  {
   "screen": "SCR-PARENT-015",
   "channel": "parent",
   "parent": "SCR-PARENT-014",
   "order": 1,
   "present": "alert",
   "section": "돌봄",
   "note": "치료 예약 접수 완료"
  },
  {
   "screen": "SCR-PARENT-018",
   "channel": "parent",
   "parent": "SCR-PARENT-006",
   "order": 3,
   "present": "page",
   "section": "돌봄",
   "note": "치료사 1:1 채팅 상담"
  },
  {
   "screen": "SCR-PARENT-016",
   "channel": "parent",
   "parent": "SCR-PARENT-006",
   "order": 4,
   "present": "page",
   "section": "돌봄",
   "note": "품앗이 동행 요청 폼"
  },
  {
   "screen": "SCR-PARENT-017",
   "channel": "parent",
   "parent": "SCR-PARENT-016",
   "order": 1,
   "present": "alert",
   "section": "돌봄",
   "note": "동행 요청 전송 완료"
  },
  {
   "screen": "SCR-PARENT-019",
   "channel": "parent",
   "parent": "SCR-PARENT-006",
   "order": 5,
   "present": "step",
   "section": "돌봄",
   "note": "비진단 동의 게이트+자기점검"
  },
  {
   "screen": "SCR-PARENT-026",
   "channel": "parent",
   "parent": "SCR-PARENT-007",
   "order": 1,
   "present": "page",
   "section": "커뮤니티",
   "note": "글 상세·댓글"
  },
  {
   "screen": "SCR-PARENT-028",
   "channel": "parent",
   "parent": "SCR-PARENT-007",
   "order": 2,
   "present": "page",
   "section": "커뮤니티",
   "note": "전문가 Q&A 접수"
  },
  {
   "screen": "SCR-PARENT-029",
   "channel": "parent",
   "parent": "SCR-PARENT-007",
   "order": 3,
   "present": "page",
   "section": "커뮤니티",
   "note": "아빠교실 회차 신청"
  },
  {
   "screen": "SCR-PARENT-027",
   "channel": "parent",
   "parent": "SCR-PARENT-007",
   "order": 4,
   "present": "page",
   "section": "커뮤니티",
   "note": "안심장소 제안 폼"
  },
  {
   "screen": "SCR-PARENT-030",
   "channel": "parent",
   "parent": "SCR-PARENT-007",
   "order": 5,
   "present": "page",
   "section": "커뮤니티",
   "note": "앰배서더 후기 탭"
  },
  {
   "screen": "SCR-PARENT-025",
   "channel": "parent",
   "parent": "SCR-PARENT-008",
   "order": 1,
   "present": "page",
   "section": "마이",
   "note": "도담 지갑(코인/포인트)"
  },
  {
   "screen": "SCR-PARENT-041",
   "channel": "parent",
   "parent": "SCR-PARENT-008",
   "order": 2,
   "present": "page",
   "section": "마이",
   "note": "도담 패스 후원"
  },
  {
   "screen": "SCR-PARENT-031",
   "channel": "parent",
   "parent": "SCR-PARENT-008",
   "order": 3,
   "present": "page",
   "section": "마이",
   "note": "장소 모음 소셜 허브(내부 탭)"
  },
  {
   "screen": "SCR-PARENT-032",
   "channel": "parent",
   "parent": "SCR-PARENT-031",
   "order": 1,
   "present": "page",
   "section": "마이",
   "note": "모음 상세"
  },
  {
   "screen": "SCR-PARENT-046",
   "channel": "parent",
   "parent": "SCR-PARENT-031",
   "order": 2,
   "present": "page",
   "section": "마이",
   "note": "보호자 공개 프로필"
  },
  {
   "screen": "SCR-PARENT-047",
   "channel": "parent",
   "parent": "SCR-PARENT-008",
   "order": 4,
   "present": "page",
   "section": "마이",
   "note": "돌봄 예약 상세·상태/취소(confirm)"
  },
  {
   "screen": "SCR-PARENT-023",
   "channel": "parent",
   "parent": "SCR-PARENT-008",
   "order": 5,
   "present": "page",
   "section": "마이",
   "note": "외출 안심 일지"
  },
  {
   "screen": "SCR-PARENT-022",
   "channel": "parent",
   "parent": "SCR-PARENT-008",
   "order": 6,
   "present": "page",
   "section": "마이",
   "note": "돌보미 지원 온보딩 진입"
  },
  {
   "screen": "SCR-PARENT-045",
   "channel": "parent",
   "parent": "SCR-PARENT-008",
   "order": 7,
   "present": "page",
   "section": "마이",
   "note": "저장한 이야기 북마크"
  },
  {
   "screen": "SCR-PARENT-044",
   "channel": "parent",
   "parent": "SCR-PARENT-008",
   "order": 8,
   "present": "page",
   "section": "마이",
   "note": "알림·비상연락 설정"
  },
  {
   "screen": "SCR-PARENT-042",
   "channel": "parent",
   "parent": "SCR-PARENT-008",
   "order": 9,
   "present": "page",
   "section": "마이",
   "note": "개인정보 처리방침(doc)"
  },
  {
   "screen": "SCR-PARENT-043",
   "channel": "parent",
   "parent": "SCR-PARENT-008",
   "order": 10,
   "present": "page",
   "section": "마이",
   "note": "약관·앱 정보(doc)"
  },
  {
   "screen": "SCR-PTNR-001",
   "channel": "partner",
   "parent": null,
   "order": 1,
   "present": "page",
   "section": "홈",
   "note": "탭바 L1·역할별 통합 대시보드"
  },
  {
   "screen": "SCR-PTNR-013",
   "channel": "partner",
   "parent": null,
   "order": 2,
   "present": "page",
   "section": "일감",
   "note": "돌보미 탭바 L1"
  },
  {
   "screen": "SCR-PTNR-015",
   "channel": "partner",
   "parent": null,
   "order": 3,
   "present": "page",
   "section": "정산",
   "note": "돌보미 탭바 L1"
  },
  {
   "screen": "SCR-PTNR-018",
   "channel": "partner",
   "parent": null,
   "order": 4,
   "present": "page",
   "section": "마이",
   "note": "탭바 L1·역할별 허브"
  },
  {
   "screen": "SCR-PTNR-030",
   "channel": "partner",
   "parent": null,
   "order": 5,
   "present": "page",
   "section": "봉사",
   "note": "앰배서더 탭바 L1"
  },
  {
   "screen": "SCR-PTNR-034",
   "channel": "partner",
   "parent": null,
   "order": 6,
   "present": "page",
   "section": "친화도후기",
   "note": "앰배서더 탭바 L1"
  },
  {
   "screen": "SCR-PTNR-026",
   "channel": "partner",
   "parent": null,
   "order": 7,
   "present": "page",
   "section": "매장",
   "note": "매장 역할 탭바 L1"
  },
  {
   "screen": "SCR-PTNR-002",
   "channel": "partner",
   "parent": null,
   "order": 8,
   "present": "page",
   "section": "가입·심사",
   "note": "공급자 로그인 독립 진입"
  },
  {
   "screen": "SCR-PTNR-003",
   "channel": "partner",
   "parent": "SCR-PTNR-002",
   "order": 1,
   "present": "step",
   "section": "가입·심사",
   "note": "지원 랜딩(5단계 안내)"
  },
  {
   "screen": "SCR-PTNR-004",
   "channel": "partner",
   "parent": "SCR-PTNR-003",
   "order": 2,
   "present": "step",
   "section": "가입·심사",
   "note": "역할 분기 선택"
  },
  {
   "screen": "SCR-PTNR-005",
   "channel": "partner",
   "parent": "SCR-PTNR-003",
   "order": 3,
   "present": "step",
   "section": "가입·심사",
   "note": "1/5 자격·강점"
  },
  {
   "screen": "SCR-PTNR-006",
   "channel": "partner",
   "parent": "SCR-PTNR-003",
   "order": 4,
   "present": "step",
   "section": "가입·심사",
   "note": "2/5 동의·서류"
  },
  {
   "screen": "SCR-PTNR-007",
   "channel": "partner",
   "parent": "SCR-PTNR-003",
   "order": 5,
   "present": "step",
   "section": "가입·심사",
   "note": "3/5 성범죄경력 조회 동의"
  },
  {
   "screen": "SCR-PTNR-008",
   "channel": "partner",
   "parent": "SCR-PTNR-003",
   "order": 6,
   "present": "step",
   "section": "가입·심사",
   "note": "4/5 돌보미 배상책임보험"
  },
  {
   "screen": "SCR-PTNR-009",
   "channel": "partner",
   "parent": "SCR-PTNR-003",
   "order": 7,
   "present": "step",
   "section": "가입·심사",
   "note": "4/5 앰배서더 무급봉사 동의"
  },
  {
   "screen": "SCR-PTNR-010",
   "channel": "partner",
   "parent": "SCR-PTNR-003",
   "order": 8,
   "present": "step",
   "section": "가입·심사",
   "note": "5/5 안전교육 이수·제출"
  },
  {
   "screen": "SCR-PTNR-011",
   "channel": "partner",
   "parent": "SCR-PTNR-003",
   "order": 9,
   "present": "page",
   "section": "가입·심사",
   "note": "매장 간소 온보딩(게이트 없음)"
  },
  {
   "screen": "SCR-PTNR-012",
   "channel": "partner",
   "parent": "SCR-PTNR-003",
   "order": 10,
   "present": "page",
   "section": "가입·심사",
   "note": "심사 현황 추적(미승인 게이트)"
  },
  {
   "screen": "SCR-PTNR-014",
   "channel": "partner",
   "parent": "SCR-PTNR-013",
   "order": 1,
   "present": "page",
   "section": "일감",
   "note": "매칭 상세·수락"
  },
  {
   "screen": "SCR-PTNR-016",
   "channel": "partner",
   "parent": "SCR-PTNR-015",
   "order": 1,
   "present": "page",
   "section": "정산",
   "note": "정산 계좌·주기"
  },
  {
   "screen": "SCR-PTNR-017",
   "channel": "partner",
   "parent": "SCR-PTNR-015",
   "order": 2,
   "present": "page",
   "section": "정산",
   "note": "세금·원천징수 안내(doc)"
  },
  {
   "screen": "SCR-PTNR-019",
   "channel": "partner",
   "parent": "SCR-PTNR-018",
   "order": 1,
   "present": "page",
   "section": "마이",
   "note": "프로필 편집"
  },
  {
   "screen": "SCR-PTNR-020",
   "channel": "partner",
   "parent": "SCR-PTNR-018",
   "order": 2,
   "present": "page",
   "section": "마이",
   "note": "교육·재인증"
  },
  {
   "screen": "SCR-PTNR-021",
   "channel": "partner",
   "parent": "SCR-PTNR-018",
   "order": 3,
   "present": "page",
   "section": "마이",
   "note": "등급·혜택"
  },
  {
   "screen": "SCR-PTNR-022",
   "channel": "partner",
   "parent": "SCR-PTNR-018",
   "order": 4,
   "present": "page",
   "section": "마이",
   "note": "받은 후기"
  },
  {
   "screen": "SCR-PTNR-023",
   "channel": "partner",
   "parent": "SCR-PTNR-018",
   "order": 5,
   "present": "page",
   "section": "마이",
   "note": "내 정보 관리(권리·탈퇴)"
  },
  {
   "screen": "SCR-PTNR-032",
   "channel": "partner",
   "parent": "SCR-PTNR-018",
   "order": 6,
   "present": "page",
   "section": "마이",
   "note": "앰배서더 커뮤니티 진입"
  },
  {
   "screen": "SCR-PTNR-033",
   "channel": "partner",
   "parent": "SCR-PTNR-032",
   "order": 1,
   "present": "page",
   "section": "마이",
   "note": "공동창조 제안·투표"
  },
  {
   "screen": "SCR-PTNR-036",
   "channel": "partner",
   "parent": "SCR-PTNR-018",
   "order": 7,
   "present": "page",
   "section": "마이",
   "note": "응급 대응 매뉴얼(SOP)"
  },
  {
   "screen": "SCR-PTNR-037",
   "channel": "partner",
   "parent": "SCR-PTNR-018",
   "order": 8,
   "present": "page",
   "section": "마이",
   "note": "약관·개인정보 처리방침(doc)"
  },
  {
   "screen": "SCR-PTNR-031",
   "channel": "partner",
   "parent": "SCR-PTNR-030",
   "order": 1,
   "present": "page",
   "section": "봉사",
   "note": "봉사 기회 상세·신청"
  },
  {
   "screen": "SCR-PTNR-035",
   "channel": "partner",
   "parent": "SCR-PTNR-034",
   "order": 1,
   "present": "page",
   "section": "친화도후기",
   "note": "친화도 후기 작성(병원 무평점)"
  },
  {
   "screen": "SCR-PTNR-027",
   "channel": "partner",
   "parent": "SCR-PTNR-026",
   "order": 1,
   "present": "page",
   "section": "매장",
   "note": "매장 등록 신청(claim)"
  },
  {
   "screen": "SCR-PTNR-028",
   "channel": "partner",
   "parent": "SCR-PTNR-026",
   "order": 2,
   "present": "page",
   "section": "매장",
   "note": "매장 수정요청/문의"
  },
  {
   "screen": "SCR-PTNR-029",
   "channel": "partner",
   "parent": "SCR-PTNR-026",
   "order": 3,
   "present": "page",
   "section": "매장",
   "note": "부모 후기 열람·신고"
  },
  {
   "screen": "SCR-PTNR-024",
   "channel": "partner",
   "parent": "SCR-PTNR-001",
   "order": 1,
   "present": "page",
   "section": "홈",
   "note": "상단 알림함"
  },
  {
   "screen": "SCR-PTNR-025",
   "channel": "partner",
   "parent": "SCR-PTNR-001",
   "order": 2,
   "present": "page",
   "section": "홈",
   "note": "장소 제보 필드리포트"
  },
  {
   "screen": "SCR-ADMIN-002",
   "channel": "admin",
   "parent": null,
   "order": 1,
   "present": "page",
   "section": "현황",
   "note": "사이드바 L1·9큐 운영 대시보드"
  },
  {
   "screen": "SCR-ADMIN-003",
   "channel": "admin",
   "parent": "SCR-ADMIN-002",
   "order": 1,
   "present": "drawer",
   "section": "현황",
   "note": "지표 원천 드릴다운 사이드패널"
  },
  {
   "screen": "SCR-ADMIN-005",
   "channel": "admin",
   "parent": null,
   "order": 2,
   "present": "page",
   "section": "심사·승인",
   "note": "사이드바 L1·돌보미/앰배서더 3게이트 심사"
  },
  {
   "screen": "SCR-ADMIN-004",
   "channel": "admin",
   "parent": null,
   "order": 3,
   "present": "page",
   "section": "심사·승인",
   "note": "사이드바 L1·장소 제출/매장 claim 검수"
  },
  {
   "screen": "SCR-ADMIN-008",
   "channel": "admin",
   "parent": null,
   "order": 4,
   "present": "page",
   "section": "심사·승인",
   "note": "사이드바 L1·6축 매장 인증 심사"
  },
  {
   "screen": "SCR-ADMIN-009",
   "channel": "admin",
   "parent": "SCR-ADMIN-008",
   "order": 1,
   "present": "modal",
   "section": "심사·승인",
   "note": "운영자 직접 매장 등록 폼"
  },
  {
   "screen": "SCR-ADMIN-010",
   "channel": "admin",
   "parent": "SCR-ADMIN-008",
   "order": 2,
   "present": "drawer",
   "section": "심사·승인",
   "note": "매장 상세/수정 사이드패널(confirm)"
  },
  {
   "screen": "SCR-ADMIN-006",
   "channel": "admin",
   "parent": null,
   "order": 5,
   "present": "page",
   "section": "사용자·안전",
   "note": "사이드바 L1·계정 조회/정지"
  },
  {
   "screen": "SCR-ADMIN-007",
   "channel": "admin",
   "parent": "SCR-ADMIN-006",
   "order": 1,
   "present": "drawer",
   "section": "사용자·안전",
   "note": "사용자 종합 이력 사이드패널"
  },
  {
   "screen": "SCR-ADMIN-014",
   "channel": "admin",
   "parent": null,
   "order": 6,
   "present": "page",
   "section": "사용자·안전",
   "note": "사이드바 L1·안전 사건 처리"
  },
  {
   "screen": "SCR-ADMIN-015",
   "channel": "admin",
   "parent": null,
   "order": 7,
   "present": "page",
   "section": "사용자·안전",
   "note": "사이드바 L1·신고 모더레이션"
  },
  {
   "screen": "SCR-ADMIN-011",
   "channel": "admin",
   "parent": null,
   "order": 8,
   "present": "page",
   "section": "운영",
   "note": "사이드바 L1·예약·매칭 개입"
  },
  {
   "screen": "SCR-ADMIN-012",
   "channel": "admin",
   "parent": null,
   "order": 9,
   "present": "page",
   "section": "운영",
   "note": "사이드바 L1·정산·코인 배치"
  },
  {
   "screen": "SCR-ADMIN-013",
   "channel": "admin",
   "parent": null,
   "order": 10,
   "present": "page",
   "section": "운영",
   "note": "사이드바 L1·멤버십·결제(데모)"
  },
  {
   "screen": "SCR-ADMIN-016",
   "channel": "admin",
   "parent": null,
   "order": 11,
   "present": "page",
   "section": "콘텐츠·커뮤니티",
   "note": "사이드바 L1·콘텐츠 운영/모더"
  },
  {
   "screen": "SCR-ADMIN-017",
   "channel": "admin",
   "parent": "SCR-ADMIN-016",
   "order": 1,
   "present": "drawer",
   "section": "콘텐츠·커뮤니티",
   "note": "이야기 본문 편집 패널"
  },
  {
   "screen": "SCR-ADMIN-018",
   "channel": "admin",
   "parent": null,
   "order": 12,
   "present": "page",
   "section": "콘텐츠·커뮤니티",
   "note": "사이드바 L1·자가진단 문항 검수"
  },
  {
   "screen": "SCR-ADMIN-019",
   "channel": "admin",
   "parent": null,
   "order": 13,
   "present": "page",
   "section": "콘텐츠·커뮤니티",
   "note": "사이드바 L1·친화도 평가 검수"
  },
  {
   "screen": "SCR-ADMIN-021",
   "channel": "admin",
   "parent": null,
   "order": 14,
   "present": "page",
   "section": "콘텐츠·커뮤니티",
   "note": "사이드바 L1·아빠교실 운영"
  },
  {
   "screen": "SCR-ADMIN-022",
   "channel": "admin",
   "parent": null,
   "order": 15,
   "present": "page",
   "section": "콘텐츠·커뮤니티",
   "note": "사이드바 L1·공동창조 로드맵"
  },
  {
   "screen": "SCR-ADMIN-023",
   "channel": "admin",
   "parent": null,
   "order": 16,
   "present": "page",
   "section": "콘텐츠·커뮤니티",
   "note": "사이드바 L1·공지 게시"
  },
  {
   "screen": "SCR-ADMIN-020",
   "channel": "admin",
   "parent": null,
   "order": 17,
   "present": "page",
   "section": "시스템",
   "note": "사이드바 L1·지역 계층 관리"
  },
  {
   "screen": "SCR-ADMIN-024",
   "channel": "admin",
   "parent": null,
   "order": 18,
   "present": "page",
   "section": "시스템",
   "note": "사이드바 L1·감사 로그"
  },
  {
   "screen": "SCR-ADMIN-025",
   "channel": "admin",
   "parent": null,
   "order": 19,
   "present": "page",
   "section": "시스템",
   "note": "사이드바 L1·superadmin 관리자 관리"
  },
  {
   "screen": "SCR-ADMIN-001",
   "channel": "admin",
   "parent": null,
   "order": 20,
   "present": "page",
   "section": "계정",
   "note": "운영 콘솔 로그인 독립 진입"
  }
 ]
};
