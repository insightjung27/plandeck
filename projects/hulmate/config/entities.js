/* 훌메이트 V2.0 데이터 모델 — 멀티테넌트 교회 플랫폼.
 * 모든 테넌트 귀속 엔티티는 tenant_id(교회) 스코프로 격리(§54·55). Church가 Tenant를 겸함(tenant_id = church.id).
 * ★V2.0 재기준화: ① V2 신규 핵심 Config 6종(채널/PWA/App/Push/개설신청/상품) 추가 ② 코어 엔티티 단순화·정합(modify)
 *   ③ V1 제외 모듈은 '봉인(feature-flag OFF·삭제 아님·향후 Add-on 자산)'으로 하단 보존. 권한 = Member.role(RBAC, 교적 직분체계 봉인). */
window.PLANDECK_ENTITIES = {
  // ══════════ 1) 플랫폼·테넌트 코어 ══════════
  Church: {
    name: '교회(Tenant 겸용)', description: '화이트라벨 테넌트 — 교회별 독립 브랜드·설정. 모든 데이터의 격리 단위(tenant_id = church.id). ★V2.0: homeConcept 4종 선택 폐기→단일 Design System, features 플래그는 ChannelConfig로 이관, status는 서비스 상태 6단계(§47)',
    fields: [
      { name: 'id', type: 'string', format: 'uuid', required: true, example: 'chr_eunsung', note: 'tenant_id 겸용(§54·O1 2계층 분리는 확장 시점)' },
      { name: 'slug', type: 'string', required: true, example: 'eunsung', note: '기본 도메인 {slug}.hurmate.kr — 진입이 Tenant 결정(§35·56)' },
      { name: 'name', type: 'string', required: true, example: '은성교회' },
      { name: 'logo', type: 'string', format: 'uri', note: '교회별 변경 4요소 ①' },
      { name: 'primaryColor', type: 'string', example: '#53634b', note: '교회별 변경 4요소 ②(대표색)' },
      { name: 'coverImage', type: 'string', format: 'uri', note: '교회별 변경 4요소 ③(대표이미지)' },
      { name: 'intro', type: 'object', note: '교회소개(§30): 담임목사·소개·주소·연락처·예배시간·지도' },
      { name: 'status', type: 'string', enum: ['신청', '검토', '개설', '활성', '일시정지', '해지'], required: true, note: '서비스 상태 라이프사이클 6단계(§47)' },
    ],
  },
  ChannelConfig: {
    name: '채널 설정 (V2 신규 핵심)', description: '테넌트별로 어떤 서비스 면(채널)을 켜고 끌지 제어하는 V2의 새로운 핵심 Entity. Web/PWA/iOS/Android/Web Push/Native Push 개별 on/off (§51). 개설 승인 시 자동 생성.',
    fields: [
      { name: 'tenantId', type: 'string', format: 'uuid', required: true },
      { name: 'webEnabled', type: 'boolean', required: true, example: true },
      { name: 'pwaEnabled', type: 'boolean', required: true, example: true },
      { name: 'iosEnabled', type: 'boolean', example: false, note: '차기 Native(Premium Add-on)' },
      { name: 'androidEnabled', type: 'boolean', example: false, note: '차기 Native(Premium Add-on)' },
      { name: 'webPushEnabled', type: 'boolean', required: true, example: true },
      { name: 'nativePushEnabled', type: 'boolean', example: false, note: '차기' },
    ],
  },
  PwaConfig: {
    name: 'PWA 설정 (교회별 manifest)', description: '교회별 PWA manifest 구성. 교회 기본정보에서 자동 생성 우선(§42), 홈 화면 설치 시 교회 로고+교회명으로 표시(§7·53). 관리자가 보정.',
    fields: [
      { name: 'tenantId', type: 'string', format: 'uuid', required: true },
      { name: 'name', type: 'string', required: true, example: '은성교회' },
      { name: 'shortName', type: 'string', example: '은성' },
      { name: 'icon', type: 'string', format: 'uri', note: '192/512/maskable 파이프라인' },
      { name: 'themeColor', type: 'string', example: '#53634b' },
      { name: 'backgroundColor', type: 'string', example: '#faf9f5' },
      { name: 'startUrl', type: 'string', example: 'https://eunsung.hurmate.kr/' },
      { name: 'manifestId', type: 'string', note: '동적 생성 manifest 식별자' },
    ],
  },
  AppConfig: {
    name: '네이티브 앱 설정 (차기)', description: '[차기·Premium Add-on] White Label Native App의 테넌트별 구성(§52·14·16). One codebase + Tenant Config + Automated Build. 1차 시장검증·유료 지불의사 확인 후(Phase6).',
    fields: [
      { name: 'tenantId', type: 'string', format: 'uuid', required: true },
      { name: 'appName', type: 'string', example: '은성교회' },
      { name: 'appIcon', type: 'string', format: 'uri' },
      { name: 'bundleIdIos', type: 'string', example: 'kr.hurmate.eunsung' },
      { name: 'packageNameAndroid', type: 'string', example: 'kr.hurmate.eunsung' },
      { name: 'iosStatus', type: 'string', enum: ['none', 'building', 'review', 'live'], example: 'none' },
      { name: 'androidStatus', type: 'string', enum: ['none', 'building', 'review', 'live'], example: 'none' },
      { name: 'currentVersion', type: 'string', example: '1.0.0' },
    ],
  },
  PushSubscription: {
    name: 'Web Push 구독', description: '교인 브라우저/설치 PWA의 Web Push 구독. tenant+user 이중 스코프·멀티기기 다중 구독으로 설계(iOS Web Push 오배송 방지), 만료 구독 정리(작업계획 D4·§9).',
    fields: [
      { name: 'tenantId', type: 'string', format: 'uuid', required: true },
      { name: 'memberId', type: 'string', format: 'uuid', required: true },
      { name: 'endpoint', type: 'string', format: 'uri', required: true },
      { name: 'p256dhKey', type: 'string', required: true, note: '클라이언트 구독 공개키(ECDH P-256)' },
      { name: 'authKey', type: 'string', required: true },
      { name: 'userAgent', type: 'string', note: '멀티기기 식별' },
      { name: 'createdAt', type: 'string', format: 'date-time', required: true },
      { name: 'expiredAt', type: 'string', format: 'date-time', note: '만료 구독 정리' },
    ],
  },
  OnboardingApplication: {
    name: '교회 개설 신청', description: '대표사이트 개설 신청 백본. HurMate 승인 게이트를 거쳐 Tenant 자동 생성으로 이어지는 종단 연결의 중심(§24·25·26·47). 서비스 상태 라이프사이클 보유.',
    fields: [
      { name: 'id', type: 'string', format: 'uuid', required: true },
      { name: 'churchName', type: 'string', required: true, example: '은성교회' },
      { name: 'representative', type: 'string', example: '조정표 담임목사', note: '대표자' },
      { name: 'contactPerson', type: 'string', note: '담당자' },
      { name: 'phone', type: 'string', example: '031-000-0000' },
      { name: 'email', type: 'string', format: 'email', required: true },
      { name: 'address', type: 'string' },
      { name: 'churchSize', type: 'string', example: '100명 이하' },
      { name: 'desiredSlug', type: 'string', example: 'eunsung', note: '희망 도메인' },
      { name: 'plan', type: 'string', enum: ['WEB', 'WEB+APP'], required: true, note: '요금제 선택(ProductPlan)' },
      { name: 'status', type: 'string', enum: ['신청', '검토', '개설', '활성', '일시정지', '해지'], required: true, note: '§47 서비스 상태' },
      { name: 'appliedAt', type: 'string', format: 'date-time', required: true },
      { name: 'approvedAt', type: 'string', format: 'date-time' },
    ],
  },
  ProductPlan: {
    name: '상품 카탈로그 (WEB·APP)', description: '[기획 모델] 대표사이트 가격 안내·요금제 선택에 노출되는 상품 구조. PRD §21·66~68의 WEB/APP 상품 구조를 기획상 엔티티화 — ★금액은 시장검증 후 확정(미확정). APP은 BASIC(WEB)에 포함 금지(§68). ※PRD가 명시 Entity로 규정하진 않음(기획 편의 모델).',
    fields: [
      { name: 'id', type: 'string', format: 'uuid', required: true },
      { name: 'tier', type: 'string', enum: ['BASIC(WEB)', 'APP(Add-on)'], required: true },
      { name: 'includedChannels', type: 'array', example: ['Web', 'Mobile', 'PWA', 'Web Push', 'Admin'], note: 'BASIC 포함 범위(§67)' },
      { name: 'setupFee', type: 'string', example: '미확정', note: '초기 등록비/구축비 — 금액 미확정(§66)' },
      { name: 'recurringFee', type: 'string', example: '미확정', note: '월 이용료/연간 유지비 — 금액 미확정(§66)' },
      { name: 'isAddon', type: 'boolean', example: false, note: 'APP=true(BASIC 미포함·§68)' },
    ],
  },
  PlatformAdmin: {
    name: '플랫폼 운영자(슈퍼)', description: 'HurMate Super Admin(console.hurmate.kr) 콘솔 주체 — 테넌트 무관. 교차테넌트 접근은 감사로그 필수.',
    fields: [
      { name: 'id', type: 'string', format: 'uuid', required: true },
      { name: 'email', type: 'string', format: 'email', required: true },
      { name: 'scope', type: 'string', enum: ['tenant_ops', 'onboarding_review', 'billing', 'super'], required: true, note: '교차테넌트 접근 범위' },
    ],
  },
  Domain: {
    name: '도메인', description: '기본 {slug}.hurmate.kr + Premium 커스텀 도메인(§56). DNS 확인.',
    fields: [
      { name: 'id', type: 'string', format: 'uuid', required: true },
      { name: 'tenantId', type: 'string', format: 'uuid', required: true },
      { name: 'baseDomain', type: 'string', example: 'eunsung.hurmate.kr', note: '기본 서브도메인' },
      { name: 'custom', type: 'string', example: 'eunsung.or.kr', note: 'Premium 유료 옵션' },
      { name: 'dnsStatus', type: 'string', enum: ['pending', 'verified', 'failed'], required: true },
    ],
  },
  Subscription: {
    name: '구독·과금', description: '테넌트 구독. ★V2.0: plan을 WEB/APP 상품 구조(§66)로 재정의, APP add-on 과금 분리(§68·billing_plan 연계). 금액 미확정.',
    fields: [
      { name: 'id', type: 'string', format: 'uuid', required: true },
      { name: 'tenantId', type: 'string', format: 'uuid', required: true },
      { name: 'plan', type: 'string', enum: ['WEB', 'WEB+APP'], required: true, note: 'APP은 BASIC에 포함 금지(§68)' },
      { name: 'webMonthly', type: 'string', example: '미확정', note: '월 이용료(§66 — 시장검증 후 확정)' },
      { name: 'appAnnual', type: 'string', example: '미확정', note: 'APP 연간 유지비(Add-on·§68)' },
      { name: 'status', type: 'string', enum: ['trial', 'active', 'overdue', 'canceled'], required: true, note: 'overdue→서비스 상태 일시정지 연계' },
    ],
  },

  // ══════════ 2) 교회 사용자·콘텐츠 (교인 5메뉴 기반) ══════════
  Member: {
    name: '회원(교인)', description: '교회 소속 회원 — 테넌트 격리. ★V2.0 단순화: 이름·휴대전화·이메일·교회·가입상태만(교적·직분 체계 봉인, §34). church_id 자동 바인딩(교회검색 없음·§35). 민감정보(ci·생년 등)는 G2 보류.',
    fields: [
      { name: 'id', type: 'string', format: 'uuid', required: true },
      { name: 'tenantId', type: 'string', format: 'uuid', required: true, note: '교회(church_id) 자동 바인딩(§35)' },
      { name: 'name', type: 'string', required: true, example: '김성도' },
      { name: 'phone', type: 'string', example: '010-0000-0000' },
      { name: 'email', type: 'string', format: 'email' },
      { name: 'role', type: 'string', enum: ['member', 'admin'], required: true, example: 'member', note: 'RBAC(직분 체계는 봉인)' },
      { name: 'status', type: 'string', enum: ['pending', 'active', 'withdrawn'], required: true, example: 'pending', note: '가입=승인대기 흐름' },
      { name: 'sensitive', type: 'object', note: '[G2 보류] ci·gender·birthDate 수집중단 vs 암호화는 security-review 결론에 종속' },
    ],
  },
  Sermon: {
    name: '설교', description: '설교 콘텐츠(§31). YouTube URL 임베드 재생 — 자체 영상 저장 없음(§60). 커뮤니티/마켓 결합 없음.',
    fields: [
      { name: 'id', type: 'string', format: 'uuid', required: true },
      { name: 'tenantId', type: 'string', format: 'uuid', required: true },
      { name: 'title', type: 'string', required: true, example: '로마서 강해 12' },
      { name: 'preacher', type: 'string', required: true, example: '조정표 담임목사' },
      { name: 'date', type: 'string', format: 'date', required: true },
      { name: 'scripture', type: 'string', example: '롬 12:1-2', note: '성경본문(§31)' },
      { name: 'description', type: 'string' },
      { name: 'youtubeUrl', type: 'string', format: 'uri', example: 'https://youtu.be/…' },
      { name: 'thumbnail', type: 'string', format: 'uri', note: '썸네일(§31)' },
    ],
  },
  Bulletin: {
    name: '주보', description: '주간 주보(§32). 관리자 발행, 교인 열람.',
    fields: [
      { name: 'id', type: 'string', format: 'uuid', required: true },
      { name: 'tenantId', type: 'string', format: 'uuid', required: true },
      { name: 'title', type: 'string', example: '2026-10-04 주보' },
      { name: 'week', type: 'string', format: 'date', required: true, note: '주차(주일 날짜)' },
      { name: 'file', type: 'string', format: 'uri', note: 'PDF/이미지' },
      { name: 'coverImage', type: 'string', format: 'uri', note: '대표 이미지' },
      { name: 'publishedAt', type: 'string', format: 'date-time' },
    ],
  },
  Notice: {
    name: '공지', description: '공지(§33). 알림 발송 여부로 Web Push 연동(§39).',
    fields: [
      { name: 'id', type: 'string', format: 'uuid', required: true },
      { name: 'tenantId', type: 'string', format: 'uuid', required: true },
      { name: 'title', type: 'string', required: true },
      { name: 'body', type: 'string', required: true },
      { name: 'image', type: 'string', format: 'uri' },
      { name: 'attachment', type: 'string', format: 'uri', note: '첨부파일' },
      { name: 'postedAt', type: 'string', format: 'date', note: '게시일' },
      { name: 'important', type: 'boolean', example: false, note: '중요공지' },
      { name: 'pinned', type: 'boolean', example: false, note: '상단고정' },
      { name: 'notify', type: 'boolean', example: true, note: '알림 발송 여부→Web Push' },
    ],
  },
  SiteContent: {
    name: '교회소개 콘텐츠', description: '공개홈/교인 화면의 교회소개(§30)·예배안내 중심. ★V2.0: 섬기는사람들·소식 섹션은 봉인(5메뉴 외). 관리자 CRUD.',
    fields: [
      { name: 'id', type: 'string', format: 'uuid', required: true },
      { name: 'tenantId', type: 'string', format: 'uuid', required: true },
      { name: 'section', type: 'string', enum: ['about', 'worship', 'location'], required: true, note: '교회소개·예배안내·오시는길' },
      { name: 'data', type: 'object', note: '섹션별 구조(소개·예배시간표·주소·지도)' },
      { name: 'status', type: 'string', enum: ['draft', 'published'], required: true },
    ],
  },
  Consent: {
    name: '동의(PIPA)', description: '회원가입 수집 동의 원장(목적별·철회 가능). ★V2.0: G2(법무) 범위로 최소 유지. 권리요청 처리 화면은 봉인(법적 필요 시 재도입).',
    fields: [
      { name: 'id', type: 'string', format: 'uuid', required: true },
      { name: 'tenantId', type: 'string', format: 'uuid', required: true },
      { name: 'memberId', type: 'string', format: 'uuid', required: true },
      { name: 'purpose', type: 'string', enum: ['required', 'messaging'], required: true },
      { name: 'granted', type: 'boolean', required: true },
      { name: 'grantedAt', type: 'string', format: 'date-time' },
      { name: 'revokedAt', type: 'string', format: 'date-time' },
    ],
  },

  // ══════════ 3) 알림(Notification Gateway) ══════════
  Message: {
    name: '알림 발송(Gateway)', description: '관리자 대외 발송. ★V2.0: Notification Gateway 경유로 재편 — MVP=Web Push 중심, SMS/Kakao 향후(§39). 전체회원 broadcast·즉시/예약(§40).',
    fields: [
      { name: 'id', type: 'string', format: 'uuid', required: true },
      { name: 'tenantId', type: 'string', format: 'uuid', required: true },
      { name: 'channel', type: 'string', enum: ['web_push', 'native_push', 'kakao', 'sms'], required: true, example: 'web_push', note: 'MVP=web_push(+설계상 native_push)' },
      { name: 'target', type: 'string', example: '전체회원', note: 'V2 MVP=전체회원 broadcast(그룹/개별 타겟팅 향후)' },
      { name: 'content', type: 'string', required: true },
      { name: 'scheduledAt', type: 'string', format: 'date-time', note: '즉시/예약' },
      { name: 'status', type: 'string', enum: ['draft', 'scheduled', 'sending', 'sent', 'failed'], required: true },
      { name: 'sentCount', type: 'integer', example: 120 },
    ],
  },
  Notification: {
    name: '알림(수신)', description: '교인 인앱/Web Push 알림. ★V2.0: Deep Link용 content_id·channel 추가(§41).',
    fields: [
      { name: 'id', type: 'string', format: 'uuid', required: true },
      { name: 'tenantId', type: 'string', format: 'uuid', required: true },
      { name: 'memberId', type: 'string', format: 'uuid', required: true },
      { name: 'type', type: 'string', enum: ['sermon', 'notice', 'bulletin'], required: true, note: 'Deep Link 라우팅 타입(§41)' },
      { name: 'contentId', type: 'string', format: 'uuid', required: true, note: 'type+content_id로 대상 콘텐츠 이동(§41)' },
      { name: 'channel', type: 'string', enum: ['in_app', 'web_push'], required: true },
      { name: 'title', type: 'string', required: true },
      { name: 'read', type: 'boolean', example: false },
      { name: 'createdAt', type: 'string', format: 'date-time', required: true },
    ],
  },

  // ══════════ 4) 봉인(V1 제외·feature-flag OFF·삭제 아님·향후 Add-on 자산) ══════════
  // §60 제외 모듈 + 원문 미언급(ReviewGate)·법적 보류(PrivacyRequest). 가역성: 재개 시 J-게이트 검토.
  Offering: {
    name: '[봉인] 헌금 안내', description: '[봉인·§60 헌금 제외] 헌금 안내 정보. feature-flag OFF(차기 Add-on·실결제는 유사수신/전자금융 규제 경계).',
    fields: [
      { name: 'tenantId', type: 'string', format: 'uuid', required: true },
      { name: 'kinds', type: 'array', example: ['주일헌금', '십일조', '감사헌금'] },
      { name: 'account', type: 'string', note: '미제공 시 교회확인후게재' },
    ],
  },
  Receipt: {
    name: '[봉인] 전자기부금영수증', description: '[봉인·§60 헌금/세무 제외] 전자기부금영수증. 재개 시 세무·PIPA(주민번호) 법무 검토 필수(J-게이트).',
    fields: [
      { name: 'id', type: 'string', format: 'uuid', required: true },
      { name: 'tenantId', type: 'string', format: 'uuid', required: true },
      { name: 'memberId', type: 'string', format: 'uuid', required: true },
      { name: 'year', type: 'integer', example: 2026 },
      { name: 'status', type: 'string', enum: ['issued', 'reissued', 'canceled'] },
    ],
  },
  AttendanceSession: {
    name: '[봉인] 출석 세션', description: '[봉인·§60 출석 제외] 예배별 출석 체크. feature-flag OFF.',
    fields: [
      { name: 'id', type: 'string', format: 'uuid', required: true },
      { name: 'tenantId', type: 'string', format: 'uuid', required: true },
      { name: 'service', type: 'string', example: '주일 1부 예배' },
      { name: 'date', type: 'string', format: 'date' },
    ],
  },
  Post: {
    name: '[봉인] 커뮤니티 글', description: '[봉인·§60 커뮤니티 제외] 나눔터 게시(기도제목·간증). UGC. feature-flag OFF.',
    fields: [
      { name: 'id', type: 'string', format: 'uuid', required: true },
      { name: 'tenantId', type: 'string', format: 'uuid', required: true },
      { name: 'authorId', type: 'string', format: 'uuid' },
      { name: 'title', type: 'string' },
      { name: 'body', type: 'string' },
    ],
  },
  Comment: {
    name: '[봉인] 댓글', description: '[봉인·커뮤니티 종속] UGC. feature-flag OFF.',
    fields: [
      { name: 'id', type: 'string', format: 'uuid', required: true },
      { name: 'tenantId', type: 'string', format: 'uuid', required: true },
      { name: 'postId', type: 'string', format: 'uuid' },
      { name: 'body', type: 'string' },
    ],
  },
  Item: {
    name: '[봉인] 아나바다(중고나눔)', description: '[봉인·§60 중고거래 제외] 성도 간 중고 나눔. feature-flag OFF.',
    fields: [
      { name: 'id', type: 'string', format: 'uuid', required: true },
      { name: 'tenantId', type: 'string', format: 'uuid', required: true },
      { name: 'sellerId', type: 'string', format: 'uuid' },
      { name: 'title', type: 'string' },
    ],
  },
  Store: {
    name: '[봉인] 성도 매장', description: '[봉인·§60 쇼핑 제외] 성도 생업 홍보 디렉터리. feature-flag OFF.',
    fields: [
      { name: 'id', type: 'string', format: 'uuid', required: true },
      { name: 'tenantId', type: 'string', format: 'uuid', required: true },
      { name: 'ownerId', type: 'string', format: 'uuid' },
      { name: 'name', type: 'string' },
    ],
  },
  EduPost: {
    name: '[봉인] 교회학교', description: '[봉인·§60 교육관리 제외] 부서별 공지·일정·자료. feature-flag OFF.',
    fields: [
      { name: 'id', type: 'string', format: 'uuid', required: true },
      { name: 'tenantId', type: 'string', format: 'uuid', required: true },
      { name: 'department', type: 'string', example: '청년부' },
      { name: 'title', type: 'string' },
    ],
  },
  ReviewGate: {
    name: '[봉인] 이단심사 게이트', description: '[봉인·V2 PRD 원문 미언급] 교리 검증 게이트. V2는 개설 "승인(§24)=검토(§47)"로 대체. ★존치 여부 J 확인(openQuestion).',
    fields: [
      { name: 'id', type: 'string', format: 'uuid', required: true },
      { name: 'tenantId', type: 'string', format: 'uuid', required: true },
      { name: 'status', type: 'string', enum: ['pending', 'approved', 'rejected', 'appealed'] },
      { name: 'reason', type: 'string' },
    ],
  },
  PrivacyRequest: {
    name: '[봉인] 개인정보 권리요청(PIPA)', description: '[봉인·V2 MVP admin 메뉴(§61)에 없음] 정보주체 권리행사(열람·정정·삭제·처리정지). 법적 필요 시 재도입(G2 연계).',
    fields: [
      { name: 'id', type: 'string', format: 'uuid', required: true },
      { name: 'tenantId', type: 'string', format: 'uuid', required: true },
      { name: 'memberId', type: 'string', format: 'uuid' },
      { name: 'type', type: 'string', enum: ['access', 'correct', 'delete', 'stop'] },
      { name: 'status', type: 'string', enum: ['pending', 'processing', 'done', 'rejected'] },
    ],
  },
};
window.PDK_ENTITIES = window.PLANDECK_ENTITIES;
