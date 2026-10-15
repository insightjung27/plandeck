/* hulmate — IA 메뉴 모델(정보구조 depth·표현방식 SSOT 보조). engine/plandeck.js renderIA 가 렌더.
 * schema: channels[{key,label,device}] · placements[{screen,channel,parent|null,order,present,section?,label?,note?}]
 * present: page(전체페이지)|modal|sheet(바텀시트)|popover|alert(알림·확인)|toast|step(단계)|tab|drawer. 화면 추가/삭제 시 placements 동기화. */
window.PLANDECK_IA = {
 "_generated": "author-ia-nav-models · adversarially verified",
 "channels": [
  {
   "key": "landing",
   "label": "대표사이트",
   "device": "web"
  },
  {
   "key": "site",
   "label": "교회 공개홈",
   "device": "web"
  },
  {
   "key": "app",
   "label": "교인 PWA",
   "device": "pwa"
  },
  {
   "key": "admin",
   "label": "교회 관리자콘솔",
   "device": "desktop"
  },
  {
   "key": "super",
   "label": "슈퍼관리자",
   "device": "desktop"
  }
 ],
 "placements": [
  {
   "screen": "SCR-LND-001",
   "channel": "landing",
   "parent": null,
   "order": 1,
   "present": "page",
   "section": "대표사이트",
   "note": "GNB 진입점·히어로 랜딩"
  },
  {
   "screen": "SCR-LND-002",
   "channel": "landing",
   "parent": null,
   "order": 2,
   "present": "page",
   "section": "대표사이트"
  },
  {
   "screen": "SCR-LND-003",
   "channel": "landing",
   "parent": null,
   "order": 3,
   "present": "page",
   "section": "대표사이트"
  },
  {
   "screen": "SCR-LND-004",
   "channel": "landing",
   "parent": "SCR-LND-003",
   "order": 1,
   "present": "page",
   "section": "대표사이트",
   "note": "WEB 상품 하위 차기(APP) 상품 비교·incoming link 부재로 제품페이지 하위 그룹핑"
  },
  {
   "screen": "SCR-LND-005",
   "channel": "landing",
   "parent": null,
   "order": 4,
   "present": "page",
   "section": "대표사이트"
  },
  {
   "screen": "SCR-LND-006",
   "channel": "landing",
   "parent": null,
   "order": 5,
   "present": "page",
   "section": "대표사이트"
  },
  {
   "screen": "SCR-LND-007",
   "channel": "landing",
   "parent": null,
   "order": 6,
   "present": "page",
   "section": "대표사이트"
  },
  {
   "screen": "SCR-LND-010",
   "channel": "landing",
   "parent": null,
   "order": 7,
   "present": "page",
   "section": "대표사이트"
  },
  {
   "screen": "SCR-LND-014",
   "channel": "landing",
   "parent": null,
   "order": 8,
   "present": "page",
   "section": "대표사이트",
   "note": "공용 오류/오프라인/404 폴백"
  },
  {
   "screen": "SCR-LND-008",
   "channel": "landing",
   "parent": null,
   "order": 10,
   "present": "page",
   "section": "계정·개설신청"
  },
  {
   "screen": "SCR-LND-013",
   "channel": "landing",
   "parent": "SCR-LND-008",
   "order": 1,
   "present": "page",
   "section": "계정·개설신청"
  },
  {
   "screen": "SCR-LND-012",
   "channel": "landing",
   "parent": "SCR-LND-008",
   "order": 2,
   "present": "page",
   "section": "계정·개설신청"
  },
  {
   "screen": "SCR-LND-009",
   "channel": "landing",
   "parent": null,
   "order": 11,
   "present": "step",
   "section": "계정·개설신청",
   "note": "stepper 다단계 개설 신청 폼(회원가입→교회정보→요금제→제출)"
  },
  {
   "screen": "SCR-LND-011",
   "channel": "landing",
   "parent": "SCR-LND-009",
   "order": 1,
   "present": "page",
   "section": "계정·개설신청",
   "note": "교정: alert→page. 접수→검토중→승인 상태추적 full-page(접수번호·예상소요·문의처)"
  },
  {
   "screen": "SCR-SITE-001",
   "channel": "site",
   "parent": null,
   "order": 1,
   "present": "page",
   "section": "홈",
   "note": "방문자 5메뉴 탭바 홈(히어로)"
  },
  {
   "screen": "SCR-SITE-007",
   "channel": "site",
   "parent": "SCR-SITE-001",
   "order": 1,
   "present": "page",
   "section": "홈",
   "note": "홈에서 진입하는 PWA 설치 안내"
  },
  {
   "screen": "SCR-SITE-008",
   "channel": "site",
   "parent": "SCR-SITE-001",
   "order": 2,
   "present": "page",
   "section": "홈",
   "note": "푸터 약관·개인정보"
  },
  {
   "screen": "SCR-SITE-009",
   "channel": "site",
   "parent": null,
   "order": 2,
   "present": "page",
   "section": "홈",
   "note": "테넌트 공용 상태 폴백(404/500/오프라인/빈데이터)"
  },
  {
   "screen": "SCR-SITE-002",
   "channel": "site",
   "parent": null,
   "order": 3,
   "present": "page",
   "section": "교회소개",
   "note": "교회소개 허브 탭"
  },
  {
   "screen": "SCR-SITE-003",
   "channel": "site",
   "parent": "SCR-SITE-002",
   "order": 1,
   "present": "page",
   "section": "교회소개"
  },
  {
   "screen": "SCR-SITE-004",
   "channel": "site",
   "parent": "SCR-SITE-002",
   "order": 2,
   "present": "page",
   "section": "교회소개",
   "note": "지도 키리스 임베드"
  },
  {
   "screen": "SCR-SITE-005",
   "channel": "site",
   "parent": null,
   "order": 4,
   "present": "page",
   "section": "설교"
  },
  {
   "screen": "SCR-SITE-006",
   "channel": "site",
   "parent": "SCR-SITE-005",
   "order": 1,
   "present": "page",
   "section": "설교",
   "note": "YouTube 임베드 상세"
  },
  {
   "screen": "SCR-SITE-010",
   "channel": "site",
   "parent": null,
   "order": 5,
   "present": "page",
   "section": "공지"
  },
  {
   "screen": "SCR-SITE-011",
   "channel": "site",
   "parent": null,
   "order": 6,
   "present": "page",
   "section": "주보"
  },
  {
   "screen": "SCR-APP-001",
   "channel": "app",
   "parent": null,
   "order": 1,
   "present": "page",
   "section": "홈",
   "note": "교인 5메뉴 탭바 홈"
  },
  {
   "screen": "SCR-APP-010",
   "channel": "app",
   "parent": "SCR-APP-001",
   "order": 1,
   "present": "page",
   "section": "홈",
   "note": "상단 알림 아이콘에서 진입"
  },
  {
   "screen": "SCR-APP-002",
   "channel": "app",
   "parent": null,
   "order": 2,
   "present": "page",
   "section": "설교"
  },
  {
   "screen": "SCR-APP-003",
   "channel": "app",
   "parent": "SCR-APP-002",
   "order": 1,
   "present": "page",
   "section": "설교"
  },
  {
   "screen": "SCR-APP-004",
   "channel": "app",
   "parent": null,
   "order": 3,
   "present": "page",
   "section": "주보"
  },
  {
   "screen": "SCR-APP-015",
   "channel": "app",
   "parent": null,
   "order": 4,
   "present": "page",
   "section": "공지",
   "note": "공지 목록 탭(5메뉴)"
  },
  {
   "screen": "SCR-APP-005",
   "channel": "app",
   "parent": "SCR-APP-015",
   "order": 1,
   "present": "page",
   "section": "공지",
   "note": "공지 상세"
  },
  {
   "screen": "SCR-APP-006",
   "channel": "app",
   "parent": null,
   "order": 5,
   "present": "page",
   "section": "마이"
  },
  {
   "screen": "SCR-APP-007",
   "channel": "app",
   "parent": "SCR-APP-006",
   "order": 1,
   "present": "page",
   "section": "마이"
  },
  {
   "screen": "SCR-APP-012",
   "channel": "app",
   "parent": "SCR-APP-006",
   "order": 2,
   "present": "page",
   "section": "마이"
  },
  {
   "screen": "SCR-APP-011",
   "channel": "app",
   "parent": "SCR-APP-012",
   "order": 1,
   "present": "page",
   "section": "마이",
   "note": "설정 하위 Web Push 수신설정"
  },
  {
   "screen": "SCR-APP-016",
   "channel": "app",
   "parent": "SCR-APP-012",
   "order": 2,
   "present": "page",
   "section": "마이",
   "note": "설정 하위 글자크기 조절"
  },
  {
   "screen": "SCR-APP-009",
   "channel": "app",
   "parent": null,
   "order": 10,
   "present": "page",
   "section": "계정"
  },
  {
   "screen": "SCR-APP-008",
   "channel": "app",
   "parent": "SCR-APP-009",
   "order": 1,
   "present": "page",
   "section": "계정",
   "note": "교회 URL church_id 자동 바인딩 가입"
  },
  {
   "screen": "SCR-APP-013",
   "channel": "app",
   "parent": "SCR-APP-009",
   "order": 2,
   "present": "step",
   "section": "계정",
   "note": "인증→재설정→완료 3스텝"
  },
  {
   "screen": "SCR-APP-014",
   "channel": "app",
   "parent": "SCR-APP-008",
   "order": 1,
   "present": "page",
   "section": "계정",
   "note": "교정: alert→page. full-page 가입 접수완료·승인 대기 상태(홈/로그인 CTA)"
  },
  {
   "screen": "SCR-ADM-001",
   "channel": "admin",
   "parent": null,
   "order": 1,
   "present": "page",
   "section": "계정"
  },
  {
   "screen": "SCR-ADM-018",
   "channel": "admin",
   "parent": "SCR-ADM-001",
   "order": 1,
   "present": "step",
   "section": "계정",
   "note": "이메일 토큰 링크 최초 설정 stepper"
  },
  {
   "screen": "SCR-ADM-002",
   "channel": "admin",
   "parent": null,
   "order": 2,
   "present": "step",
   "section": "온보딩",
   "note": "8STEP 개설 설정 Wizard 상태기계"
  },
  {
   "screen": "SCR-ADM-019",
   "channel": "admin",
   "parent": "SCR-ADM-002",
   "order": 1,
   "present": "page",
   "section": "온보딩",
   "note": "교정: alert→page. 공개홈 URL·QR·설치안내·체크리스트·다중 CTA full-page 완료 화면"
  },
  {
   "screen": "SCR-ADM-003",
   "channel": "admin",
   "parent": null,
   "order": 3,
   "present": "page",
   "section": "대시보드",
   "note": "좌측 사이드바 허브"
  },
  {
   "screen": "SCR-ADM-010",
   "channel": "admin",
   "parent": null,
   "order": 4,
   "present": "page",
   "section": "성도"
  },
  {
   "screen": "SCR-ADM-011",
   "channel": "admin",
   "parent": "SCR-ADM-010",
   "order": 1,
   "present": "page",
   "section": "성도"
  },
  {
   "screen": "SCR-ADM-012",
   "channel": "admin",
   "parent": "SCR-ADM-010",
   "order": 2,
   "present": "page",
   "section": "성도"
  },
  {
   "screen": "SCR-ADM-006",
   "channel": "admin",
   "parent": null,
   "order": 5,
   "present": "page",
   "section": "콘텐츠"
  },
  {
   "screen": "SCR-ADM-007",
   "channel": "admin",
   "parent": "SCR-ADM-006",
   "order": 1,
   "present": "page",
   "section": "콘텐츠"
  },
  {
   "screen": "SCR-ADM-008",
   "channel": "admin",
   "parent": null,
   "order": 6,
   "present": "page",
   "section": "콘텐츠"
  },
  {
   "screen": "SCR-ADM-009",
   "channel": "admin",
   "parent": null,
   "order": 7,
   "present": "page",
   "section": "콘텐츠"
  },
  {
   "screen": "SCR-ADM-005",
   "channel": "admin",
   "parent": null,
   "order": 8,
   "present": "page",
   "section": "콘텐츠"
  },
  {
   "screen": "SCR-ADM-013",
   "channel": "admin",
   "parent": null,
   "order": 9,
   "present": "page",
   "section": "알림",
   "note": "대량발송 확인·멱등키(발송 confirm은 화면 내 modal)"
  },
  {
   "screen": "SCR-ADM-004",
   "channel": "admin",
   "parent": null,
   "order": 10,
   "present": "page",
   "section": "설정"
  },
  {
   "screen": "SCR-ADM-014",
   "channel": "admin",
   "parent": null,
   "order": 11,
   "present": "page",
   "section": "설정"
  },
  {
   "screen": "SCR-ADM-015",
   "channel": "admin",
   "parent": null,
   "order": 12,
   "present": "page",
   "section": "설정",
   "note": "차기 Add-on 조회만"
  },
  {
   "screen": "SCR-ADM-016",
   "channel": "admin",
   "parent": null,
   "order": 13,
   "present": "page",
   "section": "설정"
  },
  {
   "screen": "SCR-ADM-017",
   "channel": "admin",
   "parent": null,
   "order": 14,
   "present": "page",
   "section": "설정"
  },
  {
   "screen": "SCR-SUP-001",
   "channel": "super",
   "parent": null,
   "order": 1,
   "present": "page",
   "section": "계정"
  },
  {
   "screen": "SCR-SUP-002",
   "channel": "super",
   "parent": null,
   "order": 2,
   "present": "page",
   "section": "대시보드"
  },
  {
   "screen": "SCR-SUP-003",
   "channel": "super",
   "parent": null,
   "order": 3,
   "present": "page",
   "section": "교회"
  },
  {
   "screen": "SCR-SUP-005",
   "channel": "super",
   "parent": "SCR-SUP-003",
   "order": 1,
   "present": "page",
   "section": "교회",
   "note": "테넌트 상세(full-page·drawer 아님)"
  },
  {
   "screen": "SCR-SUP-006",
   "channel": "super",
   "parent": "SCR-SUP-005",
   "order": 1,
   "present": "page",
   "section": "교회"
  },
  {
   "screen": "SCR-SUP-007",
   "channel": "super",
   "parent": "SCR-SUP-005",
   "order": 2,
   "present": "page",
   "section": "교회"
  },
  {
   "screen": "SCR-SUP-004",
   "channel": "super",
   "parent": null,
   "order": 4,
   "present": "page",
   "section": "개설승인",
   "note": "신규 개설 신청 검토 큐(승인/반려 confirm은 화면 내 modal)"
  },
  {
   "screen": "SCR-SUP-008",
   "channel": "super",
   "parent": null,
   "order": 5,
   "present": "page",
   "section": "서비스콘솔",
   "note": "플랫폼 서비스 모니터"
  },
  {
   "screen": "SCR-SUP-009",
   "channel": "super",
   "parent": null,
   "order": 6,
   "present": "page",
   "section": "운영로그"
  },
  {
   "screen": "SCR-SEAL-A01",
   "channel": "app",
   "parent": null,
   "order": 1,
   "present": "page",
   "section": "봉인(차기)"
  },
  {
   "screen": "SCR-SEAL-A02",
   "channel": "app",
   "parent": null,
   "order": 2,
   "present": "page",
   "section": "봉인(차기)"
  },
  {
   "screen": "SCR-SEAL-A03",
   "channel": "app",
   "parent": null,
   "order": 3,
   "present": "page",
   "section": "봉인(차기)"
  },
  {
   "screen": "SCR-SEAL-A04",
   "channel": "app",
   "parent": null,
   "order": 4,
   "present": "page",
   "section": "봉인(차기)"
  },
  {
   "screen": "SCR-SEAL-A05",
   "channel": "app",
   "parent": null,
   "order": 5,
   "present": "page",
   "section": "봉인(차기)"
  },
  {
   "screen": "SCR-SEAL-A06",
   "channel": "app",
   "parent": null,
   "order": 6,
   "present": "page",
   "section": "봉인(차기)"
  },
  {
   "screen": "SCR-SEAL-A07",
   "channel": "app",
   "parent": null,
   "order": 7,
   "present": "page",
   "section": "봉인(차기)"
  },
  {
   "screen": "SCR-SEAL-A08",
   "channel": "app",
   "parent": null,
   "order": 8,
   "present": "page",
   "section": "봉인(차기)"
  },
  {
   "screen": "SCR-SEAL-A09",
   "channel": "app",
   "parent": null,
   "order": 9,
   "present": "page",
   "section": "봉인(차기)"
  },
  {
   "screen": "SCR-SEAL-A10",
   "channel": "app",
   "parent": null,
   "order": 10,
   "present": "page",
   "section": "봉인(차기)"
  },
  {
   "screen": "SCR-SEAL-A11",
   "channel": "app",
   "parent": null,
   "order": 11,
   "present": "page",
   "section": "봉인(차기)"
  },
  {
   "screen": "SCR-SEAL-A12",
   "channel": "app",
   "parent": null,
   "order": 12,
   "present": "page",
   "section": "봉인(차기)"
  },
  {
   "screen": "SCR-SEAL-A13",
   "channel": "app",
   "parent": null,
   "order": 13,
   "present": "page",
   "section": "봉인(차기)"
  },
  {
   "screen": "SCR-SEAL-A14",
   "channel": "app",
   "parent": null,
   "order": 14,
   "present": "page",
   "section": "봉인(차기)"
  },
  {
   "screen": "SCR-SEAL-A15",
   "channel": "app",
   "parent": null,
   "order": 15,
   "present": "page",
   "section": "봉인(차기)"
  },
  {
   "screen": "SCR-SEAL-S01",
   "channel": "site",
   "parent": null,
   "order": 20,
   "present": "page",
   "section": "봉인(차기)"
  },
  {
   "screen": "SCR-SEAL-S02",
   "channel": "site",
   "parent": null,
   "order": 21,
   "present": "page",
   "section": "봉인(차기)"
  },
  {
   "screen": "SCR-SEAL-S03",
   "channel": "site",
   "parent": null,
   "order": 22,
   "present": "page",
   "section": "봉인(차기)"
  },
  {
   "screen": "SCR-SEAL-S04",
   "channel": "site",
   "parent": null,
   "order": 23,
   "present": "page",
   "section": "봉인(차기)"
  },
  {
   "screen": "SCR-SEAL-C01",
   "channel": "admin",
   "parent": null,
   "order": 30,
   "present": "page",
   "section": "봉인(차기)"
  },
  {
   "screen": "SCR-SEAL-C02",
   "channel": "admin",
   "parent": null,
   "order": 31,
   "present": "page",
   "section": "봉인(차기)"
  },
  {
   "screen": "SCR-SEAL-C03",
   "channel": "admin",
   "parent": null,
   "order": 32,
   "present": "page",
   "section": "봉인(차기)"
  },
  {
   "screen": "SCR-SEAL-C04",
   "channel": "admin",
   "parent": null,
   "order": 33,
   "present": "page",
   "section": "봉인(차기)"
  },
  {
   "screen": "SCR-SEAL-C05",
   "channel": "admin",
   "parent": null,
   "order": 34,
   "present": "page",
   "section": "봉인(차기)"
  },
  {
   "screen": "SCR-SEAL-X01",
   "channel": "super",
   "parent": null,
   "order": 40,
   "present": "page",
   "section": "봉인(차기)"
  }
 ]
};
