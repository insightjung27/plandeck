/* 훌메이트 V2.0 — 교회 멀티테넌트 플랫폼. 전체 화면 와이어프레임.
 * ★V2.0 재기준화: 대표사이트(landing)·교회 공개홈(site)·교인 Web/PWA(app)·교회 관리자(admin)·슈퍼관리자(super) 5채널.
 *   활성 56화면 + 봉인 25화면(V1 제외·feature-flag OFF·삭제 아님). 교인 5메뉴 고정·단일 Design System·church_id 자동.
 * 기본은 흑백 와이어프레임. screens.js↔HTML·flow·REQ 추적성 정합. /pd-scaffold·/pd-wireframe */
window.PLANDECK_SCREENS = [
  {
    "category": "대표사이트 (landing · www.hurmate.com · PC웹)",
    "pages": [
      {
        "id": "SCR-LND-001",
        "label": "대표사이트 홈",
        "href": "l-home.html",
        "surface": "landing",
        "entry": true,
        "status": "wireframed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-001"
        ],
        "context": "훌메이트 플랫폼 소개 랜딩. 히어로('교회마다 독립 Web·PWA를 설정만으로')·핵심가치 3·채널 소개·CTA '교회 개설 신청'. 플랫폼 비가시성(교회 독립 서비스처럼 보이게).",
        "components": [
          {
            "role": ".pd-gnb",
            "kind": "tabbar",
            "label": "상단 네비 — 홈·기능·WEB 상품·APP 상품·가격·도입 절차·FAQ·문의 + 로그인·교회 개설 신청",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-002"
            }
          },
          {
            "role": ".pd-hero",
            "kind": "banner",
            "label": "히어로 — '교회마다 독립 Web·PWA를 설정만으로' (교회 멀티테넌트 플랫폼)",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-009"
            }
          },
          {
            "role": ".pd-feature",
            "kind": "tiles",
            "label": "핵심 가치 3 — 독립 브랜드 · 설정만으로 오픈 · Web Push 알림",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-002"
            }
          },
          {
            "role": ".pd-cardgrid",
            "kind": "tiles",
            "label": "서비스 채널 — 교회 공개홈(Web) · 교인 PWA(설치형) · 관리자 콘솔",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-003"
            }
          },
          {
            "role": ".pd-cta",
            "kind": "button",
            "label": "하단 CTA — 교회 개설 신청 · 도입 절차 보기",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-009"
            }
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "가격 보기 / 자세한 요금 보기",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-005"
            }
          }
        ],
        "description": [
          {
            "text": "상단 GNB — 홈·기능·WEB 상품·APP 상품·가격·도입 절차·FAQ·문의 메뉴와 로그인·교회 개설 신청 버튼. 메뉴 선택 시 기능 소개로 이동(SCR-LND-002)",
            "target": ".pd-gnb"
          },
          {
            "text": "히어로 — '교회마다 독립 Web·PWA를 설정만으로'. 별도 개발 없이 설정만으로 공개홈·교인 PWA를 열고 교회 데이터는 테넌트로 격리, 전용 주소 접속 시 소속 교회 자동 지정. 주 CTA는 교회 개설 신청으로(SCR-LND-009), 보조 버튼은 가격 보기(SCR-LND-005)",
            "target": ".pd-hero"
          },
          {
            "text": "핵심 가치 3 카드 — 독립 브랜드·설정만으로 오픈(church_id 자동 부여)·Web Push 알림(네이티브 앱은 차기 과제). 카드를 누르면 기능 소개로 이동(SCR-LND-002)",
            "target": ".pd-feature"
          },
          {
            "text": "서비스 채널 카드 — 교회 공개홈(Web·소개/설교/주보/공지 공개)·교인 PWA(설치형·홈/설교/주보/공지/마이 5메뉴)·관리자 콘솔. 카드를 누르면 WEB 상품 소개로 이동(SCR-LND-003)",
            "target": ".pd-cardgrid"
          },
          {
            "text": "하단 CTA — 교회 개설 신청(SCR-LND-009)과 도입 절차 보기. 요금 안내 섹션의 '자세한 요금 보기'는 가격 안내로 이동(SCR-LND-005)",
            "target": ".pd-cta"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "랜딩 진입(요청 전)",
            "guard": "콘텐츠 로딩 전",
            "result": "히어로·섹션 스켈레톤 표시",
            "message": "",
            "placement": "inline",
            "target": ".pd-hero"
          },
          {
            "state": "로딩",
            "trigger": "GET /public/landing 요청 중",
            "guard": "응답 대기",
            "result": "섹션 플레이스홀더 유지(목업 내 스크롤 가능)",
            "message": "",
            "placement": "inline"
          },
          {
            "state": "정상",
            "trigger": "응답 수신",
            "guard": "200 OK · 마케팅 블록 수신",
            "result": "히어로·핵심 가치 3·서비스 채널·요금 안내·FAQ·CTA 전체 렌더",
            "message": "",
            "placement": "inline",
            "target": ".pd-hero",
            "api": {
              "endpoint": "GET /public/landing",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답 수신",
            "guard": "요금·일부 콘텐츠 미확정/미게재",
            "result": "요금은 '금액 미확정'·'준비 중'·'차기 과제'로 표기하고 정적 기본 카피 유지",
            "message": "요금은 아직 확정되지 않았습니다. 교회별 조건 확인 후 게재됩니다.",
            "placement": "inline",
            "api": {
              "endpoint": "GET /public/plans",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "응답 수신",
            "guard": "500 서버 오류",
            "result": "정적 기본 콘텐츠로 폴백하고 재시도 안내",
            "message": "일시적으로 일부 내용을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.",
            "placement": "banner",
            "api": {
              "endpoint": "GET /public/landing",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "진입",
            "guard": "공개 랜딩 — 비인증 공개 읽기(권한 제약 해당 없음)",
            "result": "전 영역 공개 노출, 상단에 교인 로그인·교회 개설 신청 진입 제공",
            "message": "로그인 없이 열람할 수 있어요. 교인 로그인과 교회 개설 신청은 상단에서 이용하세요.",
            "placement": "inline",
            "target": ".pd-gnb"
          },
          {
            "state": "엣지",
            "trigger": "응답 수신/네트워크 지연",
            "guard": "응답 일부 필드 누락·JSON 파싱 실패 또는 장시간 지연",
            "result": "깨진 블록만 정적 기본 카피로 대체하고 페이지 렌더 지속(FAQ 아코디언은 단일 항목만 열림 유지)",
            "message": "",
            "placement": "inline",
            "target": ".pd-feature",
            "api": {
              "endpoint": "GET /public/landing",
              "status": 200
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "landing",
              "intent": "랜딩 마케팅 블록 조회(히어로·핵심 가치·서비스 채널)",
              "method": "GET",
              "path": "/public/landing",
              "response": "{hero, values[], channels[]} (대표사이트 마케팅 블록 · 비테넌트 공개 콘텐츠)",
              "auth": "none(공개)",
              "target": ".pd-hero",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "내용을 일시적으로 불러오지 못했어요"
                },
                {
                  "status": 429,
                  "when": "요청 과다(레이트리밋)",
                  "message": "잠시 후 다시 시도해 주세요"
                }
              ]
            },
            {
              "id": "plans_teaser",
              "intent": "요금 안내 티저 조회(WEB·APP 상품 구조, 금액 미확정)",
              "method": "GET",
              "path": "/public/plans",
              "response": "'{entities.ProductPlan}'[] (setupFee·recurringFee='미확정', APP=Add-on·BASIC 미포함)",
              "auth": "none(공개)",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "요금 정보를 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [
            {
              "note": "랜딩은 쓰기 없음 — 교회 개설 신청 제출(비가역·Idempotency-Key·confirm·감사로그)은 SCR-LND-009에서 수행. 이 화면의 CTA는 모두 내비게이션.",
              "intent": "동작 처리"
            }
          ],
          "events": [
            {
              "name": "cta.apply.click",
              "intent": "'교회 개설 신청' CTA 클릭",
              "when": "히어로/하단 CTA의 교회 개설 신청 버튼 클릭",
              "to": "SCR-LND-009",
              "target": ".pd-cta"
            },
            {
              "name": "cta.pricing.click",
              "intent": "'가격 보기/자세한 요금 보기' 클릭",
              "when": "히어로 보조 버튼 또는 요금 안내의 가격 버튼 클릭",
              "to": "SCR-LND-005",
              "target": ".pd-btn"
            },
            {
              "name": "channel.card.click",
              "intent": "서비스 채널 카드 클릭",
              "when": "교회 공개홈/교인 PWA/관리자 콘솔 카드 클릭",
              "to": "SCR-LND-003",
              "target": ".pd-cardgrid"
            },
            {
              "name": "feature.card.click",
              "intent": "핵심 가치 카드 클릭",
              "when": "독립 브랜드/설정만으로 오픈/Web Push 카드 클릭",
              "to": "SCR-LND-002",
              "target": ".pd-feature"
            },
            {
              "name": "faq.accordion.toggle",
              "intent": "FAQ 아코디언 펼침·접힘",
              "when": "자주 묻는 질문 항목 토글(클라이언트 전용, 단일 항목 열림 유지)",
              "target": ".pd-acc-item"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-LND-002",
              "via": "기능 소개",
              "trigger": ".pd-gnb"
            },
            {
              "screen": "SCR-LND-003",
              "via": "WEB 상품",
              "trigger": ".pd-cardgrid"
            },
            {
              "screen": "SCR-LND-005",
              "via": "가격 안내"
            },
            {
              "screen": "SCR-LND-009",
              "via": "교회 개설 신청",
              "trigger": ".pd-cta"
            }
          ]
        }
      },
      {
        "id": "SCR-LND-002",
        "label": "기능 소개",
        "href": "l-features.html",
        "surface": "landing",
        "status": "wireframed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-001"
        ],
        "context": "제품 기능 소개 — 교회 공개홈·교인 PWA·관리자 콘솔·Web Push·개설 Wizard. 카드그리드로 기능별 가치 전달.",
        "components": [
          {
            "role": ".pd-gnb",
            "kind": "tabbar",
            "label": "상단 GNB — 홈·기능·WEB 상품·APP 상품·가격·도입 절차·FAQ·문의·로그인·교회 개설 신청",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-001"
            }
          },
          {
            "role": ".pd-section-title",
            "kind": "banner",
            "label": "핵심 기능 5가지"
          },
          {
            "role": ".pd-cardgrid",
            "kind": "tiles",
            "label": "핵심 기능 5가지 카드 — 교회 공개홈·교인 PWA·관리자 콘솔·Web Push 알림·개설 Wizard",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-003"
            }
          },
          {
            "role": ".pd-feature",
            "kind": "card",
            "label": "브라우저로 바로 받는 알림 — iOS는 16.4+ 홈 설치 PWA에서만 수신"
          },
          {
            "role": ".pd-cta",
            "kind": "button",
            "label": "교회 개설 신청",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-009"
            }
          }
        ],
        "description": [
          {
            "text": "상단 GNB — 홈·기능·WEB 상품·APP 상품·가격·도입 절차·FAQ·문의와 로그인·교회 개설 신청. 랜딩 홈으로 이동(SCR-LND-001)",
            "target": ".pd-gnb"
          },
          {
            "text": "핵심 기능 5가지 카드그리드 — 교회 공개홈·교인 PWA·관리자 콘솔·Web Push 알림·개설 Wizard, 각 카드는 WEB 상품 상세로 이동(SCR-LND-003)",
            "target": ".pd-cardgrid"
          },
          {
            "text": "섹션 타이틀 — '핵심 기능 5가지'와 '각 기능이 하는 일'로 기능별 역할을 설명하고 'WEB 상품 자세히'로 안내(SCR-LND-003)",
            "target": ".pd-section-title"
          },
          {
            "text": "Web Push 수신 조건 — 안드로이드·데스크톱 브라우저는 설치 없이 바로 수신, iOS는 16.4 이상 홈 설치 PWA에서만 수신(네이티브 앱 푸시는 차기, 과장 없이 조건 명시)",
            "target": ".pd-feature"
          },
          {
            "text": "하단 CTA — 교회 개설 신청으로 이동(SCR-LND-009)",
            "target": ".pd-cta"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "페이지 진입",
            "guard": "요청 전(GET /public/features 미발신)",
            "result": "기본 5기능 정적 뼈대 스켈레톤 노출",
            "message": "",
            "placement": "inline",
            "target": ".pd-cardgrid"
          },
          {
            "state": "로딩",
            "trigger": "요청 중",
            "guard": "GET /public/features 응답 대기",
            "result": "기능 카드 스켈레톤 표시",
            "message": "",
            "placement": "inline",
            "target": ".pd-cardgrid"
          },
          {
            "state": "정상",
            "trigger": "응답",
            "guard": "기능 블록 수신(200)",
            "result": "5개 기능 카드·각 기능 설명 리스트·Web Push 수신 조건 렌더",
            "message": "",
            "placement": "inline",
            "target": ".pd-cardgrid",
            "api": {
              "endpoint": "GET /public/features",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답",
            "guard": "기능 블록 0건",
            "result": "정적 폴백(기본 5기능)으로 표시",
            "message": "기능 안내를 준비 중입니다 — 기본 소개를 표시합니다.",
            "placement": "inline",
            "target": ".pd-cardgrid",
            "api": {
              "endpoint": "GET /public/features",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "응답",
            "guard": "서버 오류",
            "result": "정적 폴백으로 전환(안내 배너 노출)",
            "message": "기능 정보를 불러오지 못해 기본 안내를 표시하고 있어요.",
            "placement": "banner",
            "target": ".pd-cardgrid",
            "api": {
              "endpoint": "GET /public/features",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "페이지 진입",
            "guard": "권한없음: 공개 랜딩(비인증 공개 읽기) — 해당 없음",
            "result": "전체 공개 열람(로그인 불필요, 상단 로그인은 교인·관리자용)",
            "message": "",
            "placement": "inline",
            "target": ".pd-gnb"
          },
          {
            "state": "엣지",
            "trigger": "클라이언트 환경 감지",
            "guard": "iOS 16.4 미만 또는 미설치 브라우저로 접근",
            "result": "Web Push 수신 조건 경고 배너 표기(네이티브 푸시 차기 안내)",
            "message": "iOS는 16.4 이상에서 홈 화면에 설치한 PWA에만 Web Push가 전송됩니다. 네이티브 앱 푸시는 차기 과제예요.",
            "placement": "banner",
            "target": ".pd-feature"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "features",
              "intent": "기능 소개 블록(교회 공개홈·교인 PWA·관리자 콘솔·Web Push·개설 Wizard) 조회",
              "method": "GET",
              "path": "/public/features",
              "response": "{entities.ProductPlan}",
              "auth": "none(공개)",
              "target": ".pd-cardgrid",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "기능 정보를 불러오지 못해 기본 안내를 표시하고 있어요"
                }
              ]
            }
          ],
          "writes": [],
          "events": [
            {
              "name": "features.card.click",
              "when": "기능 카드 클릭",
              "intent": "기능 카드 클릭 → WEB 상품 상세 이동",
              "to": "SCR-LND-003",
              "target": ".pd-cardgrid"
            },
            {
              "name": "features.webProductMore.click",
              "when": "'WEB 상품 자세히' 클릭",
              "intent": "각 기능 섹션의 'WEB 상품 자세히' 클릭 → WEB 상품 이동",
              "to": "SCR-LND-003",
              "target": ".pd-section-title"
            },
            {
              "name": "features.cta.apply.click",
              "when": "교회 개설 신청 클릭",
              "intent": "하단 CTA 클릭 → 교회 개설 신청 이동",
              "to": "SCR-LND-009",
              "target": ".pd-cta"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-LND-003",
              "via": "WEB 상품 자세히",
              "trigger": ".pd-cardgrid"
            },
            {
              "screen": "SCR-LND-009",
              "via": "교회 개설 신청",
              "trigger": ".pd-cta"
            }
          ]
        }
      },
      {
        "id": "SCR-LND-003",
        "label": "WEB 상품",
        "href": "l-web.html",
        "surface": "landing",
        "status": "wireframed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-001",
          "REQ-024"
        ],
        "context": "기본 상품 = Responsive Web + PWA + Web Push + Admin. 포함 범위·장점. 초기등록비+월이용료(금액 미확정).",
        "components": [
          {
            "role": ".pd-gnb",
            "kind": "tabbar",
            "label": "상단 네비 — 훌메이트 · 홈·기능·WEB 상품·APP 상품·가격·도입 절차·FAQ·문의 (로고=홈)",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-001"
            }
          },
          {
            "role": ".pd-hero",
            "kind": "banner",
            "label": "WEB 상품 — 반응형 Web · PWA · Web Push · 관리자 콘솔 (기본 상품 · BASIC)"
          },
          {
            "role": ".pd-feature",
            "kind": "tiles",
            "label": "포함 범위 — 공개 홈페이지·반응형 Web / 교인 PWA·설치형 웹앱 / Web Push·실시간 알림 / 관리자 콘솔·Admin"
          },
          {
            "role": ".pd-pricerow",
            "kind": "table",
            "label": "초기 등록비 + 월 이용료 — 미확정",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-005"
            }
          },
          {
            "role": ".pd-cta",
            "kind": "button",
            "label": "교회 개설 신청",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-009"
            }
          }
        ],
        "description": [
          {
            "text": "상단 네비 — 훌메이트 로고와 홈·기능·WEB 상품·APP 상품·가격·도입 절차·FAQ·문의 메뉴(WEB 상품 활성), 로고로 홈(SCR-LND-001)·우측 로그인(SCR-LND-008)·교회 개설 신청(SCR-LND-009)으로 이동",
            "target": ".pd-gnb"
          },
          {
            "text": "히어로 — '기본 상품 · BASIC' 배지와 'WEB 상품 — 반응형 Web · PWA · Web Push · 관리자 콘솔' 소개. 교회를 검색할 필요 없이 교회 전용 주소로 접속하면 church_id가 자동 적용되어 교회별 데이터가 테넌트 단위로 격리됨을 안내. 하단 CTA 바로 개설 신청(SCR-LND-009)·가격 안내(SCR-LND-005)",
            "target": ".pd-hero"
          },
          {
            "text": "포함 범위 타일 — 공개 홈페이지·반응형 Web / 교인 PWA·설치형 웹앱 / Web Push·실시간 알림 / 관리자 콘솔·Admin 4종이 기본 상품에 모두 포함(네이티브 앱은 미포함·차기 Premium Add-on). 눌러서 기능 상세로(SCR-LND-002)",
            "target": ".pd-feature"
          },
          {
            "text": "요금 구조 — 초기 등록비 + 월 이용료 구조만 표기하고 금액은 '시장 검증 후 확정(미확정)'. APP(차기)은 '준비 중'. 가격 안내 자세히 보기로(SCR-LND-005)",
            "target": ".pd-pricerow"
          },
          {
            "text": "하단 고정 CTA — '교회 개설 신청'으로 개설 신청 화면(SCR-LND-009)으로 이동",
            "target": ".pd-cta"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "화면 진입",
            "guard": "상품 데이터 요청 전 — 히어로·안내 배너·섹션 타이틀은 정적",
            "result": "히어로/테넌트 격리 배너/섹션 타이틀을 즉시 노출하고, 포함 범위 타일·요금표 영역은 로딩 대기 상태로 둠",
            "message": "",
            "placement": "inline",
            "target": ".pd-feature"
          },
          {
            "state": "로딩",
            "trigger": "WEB 상품 포함 범위·요금 조회 호출",
            "guard": "응답 대기",
            "result": "포함 범위 4타일과 요금표 영역에 스켈레톤 표시",
            "message": "불러오는 중이에요",
            "placement": "inline",
            "target": ".pd-pricerow",
            "api": {
              "endpoint": "GET /public/product/web"
            }
          },
          {
            "state": "정상",
            "trigger": "200 응답",
            "guard": "상품 포함 범위·요금 구조 수신",
            "result": "포함 범위 4종과 요금 구조(초기 등록비+월 이용료, 금액 '미확정')를 렌더하고 church_id 자동 적용·테넌트 격리 안내 노출",
            "message": "교회 전용 주소로 접속하면 church_id가 자동 적용되어 교회별 데이터가 안전하게 분리돼요",
            "placement": "banner",
            "target": ".pd-pricerow",
            "api": {
              "endpoint": "GET /public/product/web",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "200 응답(빈 구성)",
            "guard": "포함 범위·요금 구성이 아직 등록되지 않음",
            "result": "목업의 정적 기본 포함 범위·요금 안내로 폴백하고 문의 유도",
            "message": "상품 구성 정보가 아직 준비되지 않았어요. 문의하시면 안내해 드릴게요",
            "placement": "inline",
            "target": ".pd-feature",
            "api": {
              "endpoint": "GET /public/product/web",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "500 응답 또는 네트워크 실패",
            "guard": "서버 오류",
            "result": "목업의 정적 포함 범위·요금(미확정) 텍스트로 폴백을 유지해 화면이 비지 않게 함",
            "message": "상품 정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요",
            "placement": "inline",
            "target": ".pd-feature",
            "api": {
              "endpoint": "GET /public/product/web",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "비로그인 열람",
            "guard": "공개 랜딩 — 인증 불필요(누구나 열람), 권한없음 상태 미발생",
            "result": "전체 공개 콘텐츠를 그대로 노출하고, 로그인 없이 교회 개설 신청(SCR-LND-009)·가격 안내(SCR-LND-005)로 유도",
            "message": "",
            "placement": "inline",
            "target": ".pd-cta"
          },
          {
            "state": "엣지",
            "trigger": "응답에 금액 값이 포함되어 와도(시장 검증 전)",
            "guard": "금액 정책 = '미확정' 강제 표기(0원·임의 금액 노출 금지)",
            "result": "요금은 항상 '미확정'으로 고정 표기하고, 네이티브 앱 행은 '차기·준비 중'으로만 표기(과장·확정 금지)",
            "message": "요금은 시장 검증 후 확정 예정이에요 (현재 미확정)",
            "placement": "inline",
            "target": ".pd-pricerow",
            "api": {
              "endpoint": "GET /public/product/web",
              "status": 200
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "productWeb",
              "intent": "WEB 기본 상품 포함 범위·요금 구조 조회",
              "method": "GET",
              "path": "/public/product/web",
              "params": "없음(플랫폼 공개 카탈로그 · 교회 비스코프)",
              "response": "'{entities.ProductPlan}' — tier=BASIC(WEB), includedChannels['Web','PWA','Web Push','Admin'], setupFee='미확정', recurringFee='미확정', (APP 차기=isAddon:true·'준비 중')",
              "auth": "none(공개)",
              "target": ".pd-pricerow",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "상품 정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요"
                }
              ]
            }
          ],
          "writes": [],
          "events": [
            {
              "name": "product.cta.apply",
              "intent": "교회 개설 신청 CTA 클릭",
              "when": "하단 고정 CTA '교회 개설 신청' 클릭",
              "target": ".pd-cta",
              "to": "SCR-LND-009"
            },
            {
              "name": "product.pricing.view",
              "intent": "가격 안내 자세히 보기",
              "when": "'가격 안내 보기/자세히 보기' 또는 요금 행 클릭",
              "target": ".pd-pricerow",
              "to": "SCR-LND-005"
            },
            {
              "name": "product.feature.view",
              "intent": "포함 범위 기능 상세 보기",
              "when": "포함 범위 타일 클릭",
              "target": ".pd-feature",
              "to": "SCR-LND-002"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-LND-005",
              "via": "가격 안내",
              "trigger": ".pd-pricerow"
            },
            {
              "screen": "SCR-LND-009",
              "via": "교회 개설 신청",
              "trigger": ".pd-cta"
            }
          ]
        }
      },
      {
        "id": "SCR-LND-004",
        "label": "APP 상품 (차기)",
        "href": "l-app.html",
        "surface": "landing",
        "status": "wireframed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-025"
        ],
        "context": "[차기·Premium Add-on] White Label Native App — 앱이 꼭 필요한 교회에만. 구축비+스토어등록관리+연간유지. '준비 중' 표기.",
        "components": [
          {
            "role": ".pd-gnb",
            "kind": "tabbar",
            "label": "상단 네비게이션 — 훌메이트 · 홈·기능·WEB 상품·APP 상품·가격·도입 절차·FAQ·문의",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-001"
            }
          },
          {
            "role": ".pd-hero",
            "kind": "banner",
            "label": "준비 중 · APP 상품 (차기) — 화이트라벨 네이티브 앱"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "가격 비교 보기",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-005"
            }
          },
          {
            "role": ".pd-cta",
            "kind": "button",
            "label": "WEB로 먼저 개설 신청",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-009"
            }
          }
        ],
        "description": [
          {
            "text": "히어로 — '준비 중' 배지와 함께 'APP 상품 (차기) — 화이트라벨 네이티브 앱'을 안내. 앱이 꼭 필요한 교회에만 제공하는 차기 Premium Add-on이며, BASIC 상품(WEB·PWA)과 별도로 구축·운영되고 금액은 미확정임을 과장 없이 표기(정직성)",
            "target": ".pd-hero"
          },
          {
            "text": "Premium Add-on 구성 타일 3종 — 네이티브 앱 구축비, 스토어 등록·관리(App Store · Google Play), 연간 유지보수. BASIC(WEB·PWA) 상품에는 포함되지 않으며 세부 금액은 시장 검증 후 확정(미확정)"
          },
          {
            "text": "금액 안내 — 'Premium Add-on 금액 = 미확정'. 정식 가격은 교회 확인 후 게재되며, 먼저 BASIC(WEB·PWA)으로 개설한 뒤 앱이 필요해지면 Add-on으로 승격 가능"
          },
          {
            "text": "자주 묻는 질문 아코디언 — 'WEB·PWA만으로 충분한가요?'(설정만으로 제공되는 공개 홈·교인 PWA WebPush 알림으로 충분), '앱은 언제 오픈되나요?'(오픈 일정 미확정, 준비되면 신청 교회에 안내)"
          },
          {
            "text": "하단 CTA — '가격 비교 보기'(SCR-LND-005)와 'WEB로 먼저 개설 신청'(SCR-LND-009)으로 BASIC 개설 전환을 유도",
            "target": ".pd-cta"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "화면 첫 진입",
            "guard": "공개 랜딩 — 비인증 즉시 렌더(church_id/민감정보 불필요)",
            "result": "'준비 중' 배지·히어로 제목·CTA 정적 골격을 먼저 표시",
            "message": "APP 상품은 준비 중이에요. 먼저 둘러보세요",
            "placement": "inline",
            "target": ".pd-hero"
          },
          {
            "state": "로딩",
            "trigger": "Add-on 구성·상태 조회 요청",
            "guard": "GET 응답 대기",
            "result": "배지·제목은 즉시 노출하고 구성 타일·금액 영역만 스켈레톤 표시",
            "message": "불러오는 중이에요",
            "placement": "inline",
            "api": {
              "endpoint": "GET /public/product/app"
            }
          },
          {
            "state": "정상",
            "trigger": "조회 응답",
            "guard": "status=comingSoon 수신",
            "result": "'준비 중' 배지 + Add-on 3타일 + 금액 '미확정' + FAQ 렌더",
            "message": "현재는 준비 중입니다. 오픈 시 안내드려요",
            "placement": "inline",
            "target": ".pd-hero",
            "api": {
              "endpoint": "GET /public/product/app",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "조회 응답",
            "guard": "Add-on 구성 항목 미등록(components[] 빈 배열)",
            "result": "타일 영역 대신 안내문을 보이고 정적 '준비 중'·FAQ·CTA는 유지",
            "message": "아직 안내할 구성 항목이 없어요. 준비되면 보여드릴게요",
            "placement": "inline",
            "api": {
              "endpoint": "GET /public/product/app",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "조회 응답",
            "guard": "서버 오류(5xx)",
            "result": "정적 '준비 중' 폴백 — 배지·FAQ·CTA는 유지하고 타일/금액만 숨김",
            "message": "정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요",
            "placement": "banner",
            "target": ".pd-hero",
            "api": {
              "endpoint": "GET /public/product/app",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "비인증 사용자 접근",
            "guard": "공개 콘텐츠 전용 — 인증 불필요(민감정보 미노출), 공개화면이므로 로그인 유도 없음",
            "result": "로그인 없이 전체 공개 노출(권한 제약 없음)",
            "message": "로그인 없이 누구나 볼 수 있는 안내예요",
            "placement": "inline",
            "target": ".pd-hero",
            "api": {
              "endpoint": "GET /public/product/app",
              "status": 200
            }
          },
          {
            "state": "엣지",
            "trigger": "status가 comingSoon 외 값(building/review/live 등) 수신",
            "guard": "정직성 — Native는 차기(Phase6)이므로 오픈·금액 단정 금지. 입력 폼 없음→입력검증 해당 없음",
            "result": "응답과 무관하게 '준비 중' 표기와 금액 '미확정'을 고정 유지",
            "message": "아직 정식 오픈 전이에요. 금액은 교회 확인 후 안내드려요",
            "placement": "inline",
            "target": ".pd-hero",
            "api": {
              "endpoint": "GET /public/product/app",
              "status": 200
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "productApp",
              "intent": "APP(차기) Premium Add-on 상품 구성·금액·상태 조회",
              "method": "GET",
              "path": "/public/product/app",
              "response": "{entities.ProductPlan}(tier=APP(Add-on) · setupFee/recurringFee='미확정' · isAddon=true · status=comingSoon)",
              "auth": "none(공개)",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요"
                }
              ]
            }
          ],
          "writes": [],
          "events": [
            {
              "name": "nav.gnb.click",
              "intent": "상단 네비게이션 홈 이동",
              "when": "로고/메뉴 클릭",
              "target": ".pd-gnb",
              "to": "SCR-LND-001"
            },
            {
              "name": "cta.pricing.click",
              "intent": "가격 비교 보기 이동",
              "when": "'가격 비교 보기' 버튼 클릭",
              "target": ".pd-btn",
              "to": "SCR-LND-005"
            },
            {
              "name": "cta.apply.click",
              "intent": "WEB로 먼저 개설 신청 이동",
              "when": "'WEB로 먼저 개설 신청' 버튼 클릭",
              "target": ".pd-cta",
              "to": "SCR-LND-009"
            },
            {
              "name": "faq.accordion.toggle",
              "intent": "자주 묻는 질문 펼침/접힘",
              "when": "FAQ 질문 행 클릭(클라이언트 전용·백엔드 호출 없음)",
              "target": ".pd-acc-item"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-LND-005",
              "via": "가격 비교"
            },
            {
              "screen": "SCR-LND-009",
              "via": "WEB 개설 신청",
              "trigger": ".pd-cta"
            }
          ]
        }
      },
      {
        "id": "SCR-LND-005",
        "label": "가격 안내",
        "href": "l-pricing.html",
        "surface": "landing",
        "status": "wireframed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-024"
        ],
        "context": "WEB vs APP 상품 구조 비교표. 금액은 '시장검증 후 확정(미확정)' 명시. APP은 BASIC에 미포함.",
        "components": [
          {
            "role": ".pd-gnb",
            "kind": "tabbar",
            "label": "상단 네비 — 훌메이트 로고·홈·기능·WEB 상품·APP 상품·가격(현재)·도입 절차·FAQ·문의",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-001"
            }
          },
          {
            "role": ".pd-section-title",
            "kind": "banner",
            "label": "WEB vs APP 상품 구조 (금액 미확정 · 시장 검증 후 확정)"
          },
          {
            "role": ".pd-pricerow",
            "kind": "table",
            "label": "과금 구조 요약 — WEB 초기 등록비·WEB 월 이용료·APP Premium Add-on(차기·BASIC 미포함), 금액 모두 미확정"
          },
          {
            "role": ".pd-feature",
            "kind": "card",
            "label": "APP은 차기 Premium Add-on (BASIC 미포함) — APP 상품 자세히 보기"
          },
          {
            "role": ".pd-cta",
            "kind": "button",
            "label": "교회 개설 신청(주) · WEB 상품 자세히 보기",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-009"
            }
          }
        ],
        "description": [
          {
            "text": "상품 구조 섹션 — 훌메이트는 교회마다 독립된 Web·PWA를 설정만으로 제공하고(교회별 데이터는 테넌트 격리), WEB이 기본 상품·Native APP은 차기 Premium Add-on임을 안내. 금액은 모두 '미확정'(시장 검증 후 확정)",
            "target": ".pd-section-title"
          },
          {
            "text": "과금 구조 요약 — 'WEB 초기 등록비', 'WEB 월 이용료', 'APP Premium Add-on(차기 · BASIC 미포함)' 세 행을 보여주며 금액란은 모두 '미확정' 뱃지로 고정(확정 금액 임의 표기 금지)",
            "target": ".pd-pricerow"
          },
          {
            "text": "APP 안내 카드 — Native 앱(앱스토어·플레이스토어 배포)과 네이티브 푸시는 WEB(BASIC)에 미포함된 별도 Add-on(과금 분리·준비 중)임을 설명, 누르면 APP 상품 상세(SCR-LND-004)로 이동",
            "target": ".pd-feature"
          },
          {
            "text": "하단 CTA — '교회 개설 신청'은 WEB 개설 신청(SCR-LND-009)으로, 'WEB 상품 자세히 보기'는 WEB 상품 상세(SCR-LND-003)로 이동",
            "target": ".pd-cta"
          },
          {
            "text": "상단 네비 — 로고·홈(SCR-LND-001)과 기능·WEB/APP 상품·가격(현재)·도입 절차·FAQ·문의 메뉴로 이동(비인증 공개 열람)",
            "target": ".pd-gnb"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "화면 진입",
            "guard": "상품 구조 요청 전(공개 열람)",
            "result": "WEB vs APP 비교표·과금 요약의 정적 뼈대를 먼저 노출, 금액란은 '미확정' 뱃지로 표시",
            "message": "요금은 시장 검증 후 확정됩니다 · 현재 금액은 미확정입니다",
            "placement": "banner",
            "target": ".pd-section-title"
          },
          {
            "state": "로딩",
            "trigger": "상품 구조 조회 중",
            "guard": "GET /public/product-plans 응답 대기",
            "result": "과금 요약 행을 스켈레톤으로 표시(레이아웃 유지)",
            "message": "가격 구조를 불러오는 중입니다",
            "placement": "inline",
            "target": ".pd-pricerow",
            "api": {
              "endpoint": "GET /public/product-plans",
              "status": 202
            }
          },
          {
            "state": "정상",
            "trigger": "조회 응답 수신",
            "guard": "상품 카탈로그(WEB·APP) 정상 수신",
            "result": "비교표와 과금 요약을 렌더, 모든 금액은 '미확정'·APP은 'BASIC 미포함 차기 Add-on'으로 표기",
            "message": "요금은 시장 검증 후 확정됩니다 · 현재 금액은 미확정입니다",
            "placement": "banner",
            "target": ".pd-pricerow",
            "api": {
              "endpoint": "GET /public/product-plans",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "조회 응답 수신",
            "guard": "상품 카탈로그 0건(플랜 미등록)",
            "result": "정적 비교 구조만 유지하고 과금 요약은 준비 중 안내로 대체",
            "message": "요금제 구조를 준비 중입니다 · 금액은 시장 검증 후 확정됩니다",
            "placement": "inline",
            "target": ".pd-pricerow",
            "api": {
              "endpoint": "GET /public/product-plans",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "조회 응답 수신",
            "guard": "서버 오류(5xx) 또는 네트워크 실패",
            "result": "정적 상품 구조로 폴백(금액 미확정 유지)하고 재시도 안내",
            "message": "가격 정보를 불러오지 못했어요 · 잠시 후 다시 시도해 주세요",
            "placement": "banner",
            "target": ".pd-pricerow",
            "api": {
              "endpoint": "GET /public/product-plans",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "화면 진입",
            "guard": "권한없음: 대표사이트 공개 화면(비인증 공개 읽기) — 해당 없음",
            "result": "로그인 없이 상품 구조를 그대로 공개 노출(교회 데이터·테넌트 리소스 미노출)",
            "message": "",
            "placement": "inline",
            "target": ".pd-section-title"
          },
          {
            "state": "엣지",
            "trigger": "금액 확정 전 열람",
            "guard": "금액 미확정 불변식(시장 검증 전) · APP은 준비 중",
            "result": "모든 금액란을 '미확정' 뱃지로 고정하고 APP 열은 '차기 제공(준비 중)'으로 표기, 확정 전 임의 금액·신청가 노출 금지(정직성)",
            "message": "APP은 차기 Premium Add-on으로 준비 중입니다 · 지금은 WEB으로 먼저 개설합니다",
            "placement": "inline",
            "target": ".pd-feature"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "productPlans",
              "intent": "WEB·APP 상품 구조 및 과금 구조 조회(대표사이트 공개)",
              "method": "GET",
              "path": "/public/product-plans",
              "params": "없음(플랫폼 공개 카탈로그·테넌트 비스코프)",
              "response": "{entities.ProductPlan}[] — tier(BASIC(WEB)·APP(Add-on))·includedChannels·setupFee('미확정')·recurringFee('미확정')·isAddon",
              "auth": "none(공개)",
              "target": ".pd-pricerow",
              "errors": [
                {
                  "status": 404,
                  "when": "공개 카탈로그 경로 없음",
                  "message": "가격 정보를 찾지 못했어요"
                },
                {
                  "status": 429,
                  "when": "과도한 요청(레이트리밋)",
                  "message": "요청이 많아요 · 잠시 후 다시 시도해 주세요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "가격 정보를 불러오지 못했어요 · 잠시 후 다시 시도해 주세요"
                }
              ]
            }
          ],
          "writes": [],
          "events": [
            {
              "name": "pricing.view",
              "intent": "가격 안내 화면 조회(WEB·APP 상품 구조 노출)",
              "when": "화면 진입 시",
              "target": ".pd-section-title"
            },
            {
              "name": "pricing.app.detail.click",
              "intent": "APP 안내 카드 클릭 → APP 상품 상세(SCR-LND-004) 이동",
              "when": "APP Add-on 카드 클릭 시",
              "target": ".pd-feature"
            },
            {
              "name": "pricing.cta.apply.click",
              "intent": "교회 개설 신청 클릭 → WEB 개설 신청(SCR-LND-009) 이동",
              "when": "주 CTA 클릭 시",
              "target": ".pd-cta"
            },
            {
              "name": "pricing.cta.web.click",
              "intent": "WEB 상품 자세히 보기 클릭 → WEB 상품 상세(SCR-LND-003) 이동",
              "when": "보조 CTA 클릭 시",
              "target": ".pd-cta"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-LND-009",
              "via": "교회 개설 신청",
              "trigger": ".pd-cta"
            }
          ]
        }
      },
      {
        "id": "SCR-LND-006",
        "label": "도입 절차",
        "href": "l-process.html",
        "surface": "landing",
        "status": "wireframed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-001"
        ],
        "context": "개설 9단계 종단(가입→개설신청→요금제→승인→Tenant생성→Wizard→오픈→교인가입→알림) 스테퍼.",
        "components": [
          {
            "role": ".pd-gnb",
            "kind": "tabbar",
            "label": "상단 네비 — 훌메이트 로고·홈·기능·WEB 상품·APP 상품·가격·도입 절차·FAQ·문의 / 로그인·교회 개설 신청",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-001"
            }
          },
          {
            "role": ".pd-section-title",
            "kind": "banner",
            "label": "승인 후, 설정만으로 오픈"
          },
          {
            "role": ".pd-stepper",
            "kind": "stepper",
            "label": "가입 · 개설 신청 · 요금제 선택 · 슈퍼 승인 · Tenant 생성 · 설정 Wizard · 서비스 오픈 · 교인 가입 · Web Push 알림"
          },
          {
            "role": ".pd-feature",
            "kind": "card",
            "label": "Tenant 자동 생성 · 관리자 설정 Wizard 8STEP"
          },
          {
            "role": ".pd-cta",
            "kind": "button",
            "label": "교회 개설 신청 — 1단계 가입부터 시작",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-009"
            }
          }
        ],
        "description": [
          {
            "text": "상단 네비 — 훌메이트 로고와 주요 메뉴(홈·기능·WEB/APP 상품·가격·도입 절차·FAQ·문의), 우측에 로그인(SCR-LND-008)·교회 개설 신청(SCR-LND-009) 버튼",
            "target": ".pd-gnb"
          },
          {
            "text": "섹션 제목 '승인 후, 설정만으로 오픈' — 9단계 스테퍼 아래에서 '복잡한 개발 없이 설정만으로 교회 전용 Web·PWA가 열린다'는 핵심 메시지를 강조",
            "target": ".pd-section-title"
          },
          {
            "text": "도입 스테퍼 — 9단계 종단 흐름(가입→개설 신청→요금제 선택→슈퍼 승인→Tenant 생성→설정 Wizard→서비스 오픈→교인 가입→Web Push 알림). 교회 검색 과정 없이 승인 시 발급되는 전용 링크로 교인이 접속하며 church_id 자동 매핑",
            "target": ".pd-stepper"
          },
          {
            "text": "핵심 안내 카드 — 슈퍼 관리자가 개설 신청을 승인하면 교회 전용 Tenant 자동 생성, 관리자가 교회명·로고·색상·도메인·설교·주보·공지를 설정 Wizard 8STEP으로 채우면 오픈. 단일 디자인 시스템 통일·교회별 데이터 완전 분리(Tenant 격리). 누르면 교회 개설 신청(SCR-LND-009)",
            "target": ".pd-feature"
          },
          {
            "text": "하단 CTA '교회 개설 신청 — 1단계 가입부터 시작' — 1단계 가입·개설 신청 화면으로 이동(SCR-LND-009)",
            "target": ".pd-cta"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입",
            "guard": "정적 렌더(SSG)·공개 요금 조회 전",
            "result": "9단계 스테퍼·핵심 안내 카드 즉시 정적 표시, 요금 요약 영역은 조회 전 '미확정' placeholder",
            "message": "",
            "placement": "inline",
            "target": ".pd-stepper"
          },
          {
            "state": "로딩",
            "trigger": "진입",
            "guard": "공개 요금 요약 조회 중",
            "result": "요금 안내 영역 스켈레톤, 스테퍼·Wizard 안내는 정적으로 먼저 노출",
            "message": "요금 안내를 불러오는 중이에요",
            "placement": "inline"
          },
          {
            "state": "정상",
            "trigger": "응답",
            "guard": "공개 상품 카탈로그 수신",
            "result": "9단계 스테퍼·Tenant/Wizard 안내 렌더 + 요금 'WEB·APP 상품 / 초기등록비·월 이용료 — 미확정' 표기",
            "message": "",
            "placement": "inline",
            "target": ".pd-stepper",
            "api": {
              "endpoint": "GET /public/plans",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답",
            "guard": "공개 상품 카탈로그가 아직 비어 있음",
            "result": "요금 영역을 '교회 확인 후 안내'로 대체(스테퍼·안내 카드는 그대로 유지)",
            "message": "구체 금액은 교회 확인 후 안내드려요(현재 미확정)",
            "placement": "inline",
            "api": {
              "endpoint": "GET /public/plans",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "응답",
            "guard": "상품 카탈로그 조회 실패(서버 오류)",
            "result": "정적 스테퍼·안내 카드는 유지하고 요금 영역만 폴백 안내로 대체",
            "message": "요금 안내를 불러오지 못했어요. 구체 금액은 교회 확인 후 안내드립니다",
            "placement": "inline",
            "api": {
              "endpoint": "GET /public/plans",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "진입",
            "guard": "공개 랜딩 — 인증 불필요(권한없음 해당 없음)",
            "result": "로그인 없이 전체 열람 가능, 상단에 로그인(SCR-LND-008)·교회 개설 신청(SCR-LND-009) 유도만 노출",
            "message": "",
            "placement": "inline",
            "target": ".pd-gnb"
          },
          {
            "state": "엣지",
            "trigger": "진입",
            "guard": "네이티브 앱(APP 상품) 관심 — 차기 단계",
            "result": "'준비 중' 표기 유지, 현재 도입 범위는 공개 Web과 교인용 PWA(홈·설교·주보·공지·마이 5메뉴, Web Push)임을 정직 안내",
            "message": "네이티브 앱(APP 상품)은 차기 단계로 준비 중이에요",
            "placement": "inline"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "plans",
              "intent": "요금 안내 요약(WEB·APP 상품 · 초기등록비·월 이용료 — 미확정)",
              "method": "GET",
              "path": "/public/plans",
              "params": "없음(공개 전체 조회) · 9단계 스테퍼·Wizard 안내 본문은 정적 마케팅 콘텐츠(SSG·API 불필요)",
              "response": "{entities.ProductPlan}",
              "auth": "none(공개)",
              "errors": [
                {
                  "status": 404,
                  "when": "공개 상품 카탈로그 비어 있음",
                  "message": "구체 금액은 교회 확인 후 안내드려요(현재 미확정)"
                },
                {
                  "status": 500,
                  "when": "상품 카탈로그 조회 실패(서버 오류)",
                  "message": "요금 안내를 불러오지 못했어요. 구체 금액은 교회 확인 후 안내드립니다"
                }
              ]
            }
          ],
          "writes": [],
          "events": [
            {
              "name": "onboarding_cta_clicked",
              "intent": "교회 개설 신청 시작",
              "when": "하단 CTA 또는 핵심 안내 카드 클릭",
              "payload": "{from:'process'}"
            },
            {
              "name": "login_clicked",
              "intent": "로그인 이동",
              "when": "상단 네비 로그인 버튼 클릭",
              "payload": "{from:'process'}"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-LND-009",
              "via": "교회 개설 신청",
              "trigger": ".pd-cta"
            }
          ]
        }
      },
      {
        "id": "SCR-LND-007",
        "label": "자주 묻는 질문",
        "href": "l-faq.html",
        "surface": "landing",
        "status": "wireframed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-001"
        ],
        "context": "FAQ 아코디언 — Web/앱 차이·PWA·Web Push·도메인·가격·데이터 소유 등.",
        "components": [
          {
            "role": ".pd-gnb",
            "kind": "tabbar",
            "label": "상단 네비게이션 (홈·기능·WEB 상품·APP 상품·가격·도입 절차·FAQ·문의)",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-001"
            }
          },
          {
            "role": ".pd-section-title",
            "kind": "banner",
            "label": "자주 묻는 질문"
          },
          {
            "role": ".pd-acc-item",
            "kind": "list",
            "label": "FAQ 아코디언 (Web·앱 차이·PWA 설치·교회 검색 없음(church_id 자동)·Web Push·도메인·가격·데이터 소유·디자인)"
          },
          {
            "role": ".pd-cta",
            "kind": "button",
            "label": "교회 개설 신청",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-009"
            }
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "더 궁금하면 문의하기",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-010"
            }
          }
        ],
        "description": [
          {
            "text": "상단 네비게이션 — 홈·기능·WEB 상품·APP 상품·가격·도입 절차·FAQ(현재 활성)·문의 메뉴와 로그인·교회 개설 신청 버튼. 로고·메뉴 클릭 시 대표사이트 홈으로 이동(SCR-LND-001)",
            "target": ".pd-gnb"
          },
          {
            "text": "'자주 묻는 질문' 섹션 제목 — Web·PWA 차이, 교회 전용 링크(church_id 자동 매핑), Web Push, 도메인, 가격, 데이터 소유 주제를 묶어 제시",
            "target": ".pd-section-title"
          },
          {
            "text": "FAQ 아코디언 — 8개 질문. 질문(pd-acc-q) 클릭 시 답변(pd-acc-a)이 펼쳐짐. Web/앱 차이·PWA 홈화면 추가·교회 검색 없음(church_id 자동)·Web Push 수신 조건·도메인 준비 중·가격 미확정·테넌트 격리·단일 디자인 시스템을 정직하게 안내",
            "target": ".pd-acc-item"
          },
          {
            "text": "하단 고정 1차 버튼 '교회 개설 신청' — 개설 신청 화면으로 이동(SCR-LND-009)",
            "target": ".pd-cta"
          },
          {
            "text": "하단 고정 2차 버튼 '더 궁금하면 문의하기' — 찾는 답이 없을 때 문의 화면으로 이동(SCR-LND-010)",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "화면 진입",
            "guard": "공개 화면 — 로그인/권한 불필요",
            "result": "GNB·페이지 제목·'자주 묻는 질문' 섹션이 노출되고, 아코디언 질문은 모두 접힌 상태로 표시",
            "message": "",
            "placement": "inline",
            "target": ".pd-section-title"
          },
          {
            "state": "로딩",
            "trigger": "FAQ 요청 중",
            "guard": "응답 대기",
            "result": "아코디언 자리에 스켈레톤 플레이스홀더 표시, 질문 클릭 비활성",
            "message": "자주 묻는 질문을 불러오는 중이에요.",
            "placement": "inline",
            "target": ".pd-acc-item",
            "api": {
              "endpoint": "GET /public/faq",
              "status": 200
            }
          },
          {
            "state": "정상",
            "trigger": "FAQ 응답 수신 / 질문 클릭",
            "guard": "FAQ 1건 이상 수신",
            "result": "질문 목록이 접힘 기본으로 렌더되고, 질문(.pd-acc-q)을 누르면 답변(.pd-acc-a)이 펼침/접힘 토글",
            "message": "",
            "placement": "inline",
            "target": ".pd-acc-item",
            "api": {
              "endpoint": "GET /public/faq",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "FAQ 응답 수신",
            "guard": "FAQ 0건(미발행)",
            "result": "아코디언을 숨기고 '찾는 답이 없다면' 안내로 문의 유도",
            "message": "등록된 FAQ가 아직 없어요. 아래 문의하기로 궁금한 점을 남겨주시면 교회 상황을 확인한 뒤 안내드려요.",
            "placement": "inline",
            "target": ".pd-acc-item",
            "api": {
              "endpoint": "GET /public/faq",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "FAQ 응답 수신",
            "guard": "서버 오류(5xx)",
            "result": "아코디언 대신 정적 폴백 안내와 재시도/문의 경로 제공",
            "message": "FAQ를 불러오지 못했어요. 잠시 후 다시 시도하거나 문의하기로 남겨주세요.",
            "placement": "inline",
            "target": ".pd-acc-item",
            "api": {
              "endpoint": "GET /public/faq",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "비로그인 접근",
            "guard": "공개 화면 — 권한 제약 해당 없음(누구나 열람)",
            "result": "인증 요구 없이 FAQ 전체를 공개 열람. 차단·로그인 유도 없음",
            "message": "",
            "placement": "inline",
            "target": ".pd-acc-item"
          },
          {
            "state": "엣지",
            "trigger": "가격·도메인 등 미확정 항목 질문 펼침",
            "guard": "금액·커스텀 도메인 연결 등 미확정 항목",
            "result": "답변을 단정하지 않고 '교회 확인 후 안내(미확정)·준비 중'으로 표기",
            "message": "요금·도메인 등 미확정 항목은 교회 상황을 확인한 뒤 안내드려요. 현재 금액은 미확정이며, 자체 도메인 연결은 준비 중입니다.",
            "placement": "inline",
            "target": ".pd-acc-item"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "faq",
              "intent": "대표사이트 공개 FAQ 질문·답변 목록",
              "method": "GET",
              "path": "/public/faq",
              "params": "없음(대표사이트 전역 콘텐츠 — 테넌트 비귀속)",
              "response": "{ items:[{ category, question, answer }] } — 대표사이트 공개 마케팅 콘텐츠(엔티티 비귀속). 주제는 Web/PWA 차이·church_id 자동 매핑(교회 검색 없음)·Web Push 수신 조건·도메인 준비 중·가격 미확정·테넌트 격리({entities.Church})·단일 Design System",
              "auth": "none(공개)",
              "target": ".pd-acc-item",
              "errors": [
                {
                  "status": 404,
                  "when": "FAQ 리소스 미발행",
                  "message": "표시할 FAQ가 아직 없어요. 문의로 남겨주세요."
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "FAQ를 불러오지 못했어요. 잠시 후 다시 시도해 주세요."
                }
              ]
            }
          ],
          "writes": [],
          "events": [
            {
              "name": "faq.item.toggle",
              "intent": "FAQ 질문 클릭 시 답변 펼침/접기",
              "when": "질문(.pd-acc-q) 클릭",
              "target": ".pd-acc-item"
            },
            {
              "name": "nav.apply",
              "intent": "교회 개설 신청 화면으로 이동",
              "when": "하단 1차 버튼(.pd-cta) 클릭",
              "target": ".pd-cta",
              "to": "SCR-LND-009"
            },
            {
              "name": "nav.contact",
              "intent": "문의 화면으로 이동",
              "when": "하단 2차 버튼(.pd-btn) 클릭",
              "target": ".pd-btn",
              "to": "SCR-LND-010"
            },
            {
              "name": "nav.home",
              "intent": "로고·상단 네비 클릭 시 대표사이트 홈으로 이동",
              "when": "상단 네비(.pd-gnb) 클릭",
              "target": ".pd-gnb",
              "to": "SCR-LND-001"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-LND-009",
              "via": "교회 개설 신청",
              "trigger": ".pd-cta"
            },
            {
              "screen": "SCR-LND-010",
              "via": "문의"
            }
          ]
        }
      },
      {
        "id": "SCR-LND-008",
        "label": "로그인",
        "href": "l-login.html",
        "surface": "landing",
        "status": "wireframed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-002"
        ],
        "context": "대표사이트 로그인(전역 계정 AppUser). 소셜 4사+아이디. 로그인 후 개설 신청 또는 내 교회로.",
        "components": [
          {
            "role": ".pd-gnb",
            "kind": "tabbar",
            "label": "상단 네비 — 훌메이트 로고·홈·기능·WEB 상품·APP 상품·가격·도입 절차·FAQ·문의·로그인·교회 개설 신청",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-001"
            }
          },
          {
            "role": ".pd-form",
            "kind": "form",
            "label": "로그인 폼 — 전역 계정(AppUser) 아이디·비밀번호 (교회 검색 과정 없음)"
          },
          {
            "role": ".pd-field",
            "kind": "form",
            "label": "아이디(이메일 또는 아이디)·비밀번호 입력"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "소셜 간편 로그인 4사 — 카카오로 로그인·네이버로 로그인·구글로 로그인·Apple로 로그인"
          },
          {
            "role": ".pd-cta",
            "kind": "button",
            "label": "로그인",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-009"
            }
          }
        ],
        "description": [
          {
            "text": "상단 네비 — '훌메이트' 로고와 메뉴(홈·기능·WEB/APP 상품·가격·도입 절차·FAQ·문의). 로고·메뉴 클릭 시 대표사이트 홈(SCR-LND-001)으로 이동",
            "target": ".pd-gnb"
          },
          {
            "text": "로그인 폼 — 전역 계정(AppUser) 아이디·비밀번호 입력. 교회를 따로 검색하지 않고, 로그인 후 진입 맥락에 따라 교회 개설 신청 또는 소속 교회로 연결",
            "target": ".pd-form"
          },
          {
            "text": "아이디(이메일 또는 아이디)·비밀번호 입력란. 자격증명이 일치하지 않으면 입력란 아래에 '아이디 또는 비밀번호가 올바르지 않아요'를 인라인 표시",
            "target": ".pd-field"
          },
          {
            "text": "소셜 간편 로그인 4사 버튼(카카오·네이버·구글·Apple). 선택한 공급자 인증 후 전역 계정으로 로그인",
            "target": ".pd-btn"
          },
          {
            "text": "'로그인' 실행 버튼 — 성공 시 아직 소속 교회가 없으면 교회 개설 신청(SCR-LND-009)으로, 이미 속한 교회가 있으면 내 교회 홈으로 이동",
            "target": ".pd-cta"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "화면 진입",
            "guard": "비로그인 상태",
            "result": "로그인 폼(아이디·비밀번호)과 소셜 4사 버튼, '비밀번호를 잊으셨나요?'·'로그인하면 회원가입 후 교회 개설 신청으로 이어집니다' 안내 노출",
            "message": "전역 계정으로 로그인하면 교회 개설을 신청하거나 내 교회로 이동해요. 교회 검색 과정은 없어요",
            "placement": "inline"
          },
          {
            "state": "로딩",
            "trigger": "제출(로그인)",
            "guard": "입력 유효·인증 처리 중",
            "result": "로그인 버튼 비활성·스피너 표시, 중복 제출 차단",
            "message": "로그인하고 있어요",
            "placement": "inline",
            "target": ".pd-cta",
            "api": {
              "endpoint": "POST /auth/login",
              "status": "처리 중"
            }
          },
          {
            "state": "정상",
            "trigger": "제출(로그인)",
            "guard": "자격증명 일치",
            "result": "세션(JWT) 발급 → 소속 교회 없으면 교회 개설 신청(SCR-LND-009), 있으면 내 교회 홈으로 이동",
            "message": "로그인되었어요",
            "placement": "full-page",
            "target": ".pd-cta",
            "api": {
              "endpoint": "POST /auth/login",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "해당 없음",
            "guard": "빈데이터: 해당 없음(로그인은 조회·목록 화면이 아님)",
            "result": "표시 없음",
            "message": "",
            "target": ".pd-form"
          },
          {
            "state": "에러",
            "trigger": "제출(입력검증·필수누락)",
            "guard": "아이디 또는 비밀번호 미입력",
            "result": "제출 차단·인라인 검증 오류",
            "message": "아이디와 비밀번호를 모두 입력해주세요",
            "placement": "inline",
            "target": ".pd-field",
            "api": {
              "endpoint": "POST /auth/login",
              "status": 400
            }
          },
          {
            "state": "에러",
            "trigger": "제출(입력검증·형식오류)",
            "guard": "이메일 형태로 입력했으나 형식 불일치",
            "result": "제출 차단·인라인 검증 오류",
            "message": "이메일 또는 아이디 형식을 다시 확인해주세요",
            "placement": "inline",
            "target": ".pd-field",
            "api": {
              "endpoint": "POST /auth/login",
              "status": 400
            }
          },
          {
            "state": "에러",
            "trigger": "제출(입력검증·중복충돌)",
            "guard": "중복충돌: 해당 없음(로그인은 신규 레코드 생성 아님 — 계정/소셜 중복 처리는 회원가입 겸 교회 개설 신청 SCR-LND-009 소관)",
            "result": "해당 없음",
            "message": "",
            "target": ".pd-form"
          },
          {
            "state": "에러",
            "trigger": "제출(로그인)",
            "guard": "자격증명 불일치",
            "result": "입력란 아래 인라인 오류",
            "message": "아이디 또는 비밀번호가 올바르지 않아요",
            "placement": "inline",
            "target": ".pd-field",
            "api": {
              "endpoint": "POST /auth/login",
              "status": 401
            }
          },
          {
            "state": "에러",
            "trigger": "제출(로그인)",
            "guard": "서버 오류",
            "result": "토스트로 재시도 안내",
            "message": "로그인에 실패했어요. 잠시 후 다시 시도해주세요",
            "placement": "toast",
            "target": ".pd-form",
            "api": {
              "endpoint": "POST /auth/login",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "제출(로그인)",
            "guard": "공개 로그인 화면이라 열람 자체는 인증 불필요 / 단, 정지·탈퇴(withdrawn) 상태 계정의 로그인 시도",
            "result": "로그인 차단·배너 안내",
            "message": "이용이 제한된 계정이에요. 교회 관리자에게 문의해주세요",
            "placement": "banner",
            "target": ".pd-form",
            "api": {
              "endpoint": "POST /auth/login",
              "status": 403
            }
          },
          {
            "state": "엣지",
            "trigger": "단시간 반복 로그인 실패",
            "guard": "로그인 시도 레이트리밋 초과",
            "result": "일시 차단·토스트 안내",
            "message": "로그인 시도가 많아요. 잠시 후 다시 시도해주세요",
            "placement": "toast",
            "target": ".pd-form",
            "api": {
              "endpoint": "POST /auth/login",
              "status": 429
            }
          },
          {
            "state": "엣지",
            "trigger": "소셜 로그인(카카오·네이버·구글·Apple)",
            "guard": "공급자 창에서 사용자가 취소하거나 인증 실패",
            "result": "원래 로그인 화면 유지·토스트 안내",
            "message": "소셜 로그인이 취소되었어요. 다시 시도해주세요",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "POST /auth/social/{provider}",
              "status": 400
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "sessionCheck",
              "intent": "기존 로그인 세션 확인(이미 로그인 시 재진입 방지)",
              "method": "GET",
              "path": "/me",
              "params": "-",
              "response": "{user, memberships:['{entities.Member}']}",
              "auth": "none(공개)/Bearer(선택)",
              "target": ".pd-form",
              "errors": [
                {
                  "status": 401,
                  "when": "세션 없음(비로그인)",
                  "message": "정상 — 로그인 폼을 그대로 노출"
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "login",
              "intent": "전역 계정 로그인",
              "method": "POST",
              "path": "/auth/login",
              "request": "{loginId(이메일 또는 아이디), password}",
              "response": "{accessToken(JWT·tenantId claim은 소속 교회 선택 후 바인딩), user, memberships:['{entities.Member}']}",
              "auth": "none(공개)",
              "idempotency": "불필요 — 세션 발급은 비가역 쓰기 아님(개설 승인·Wizard OPEN·대량발송·요금제·상태 전이만 Idempotency-Key+confirm 대상). confirm 없음",
              "target": ".pd-cta",
              "errors": [
                {
                  "status": 400,
                  "when": "필수누락·형식오류",
                  "message": "아이디와 비밀번호를 모두 입력해주세요 / 이메일 또는 아이디 형식을 다시 확인해주세요"
                },
                {
                  "status": 401,
                  "when": "자격증명 불일치",
                  "message": "아이디 또는 비밀번호가 올바르지 않아요"
                },
                {
                  "status": 403,
                  "when": "정지·탈퇴(withdrawn) 상태 계정",
                  "message": "이용이 제한된 계정이에요. 교회 관리자에게 문의해주세요"
                },
                {
                  "status": 429,
                  "when": "로그인 시도 레이트리밋 초과",
                  "message": "로그인 시도가 많아요. 잠시 후 다시 시도해주세요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "로그인에 실패했어요. 잠시 후 다시 시도해주세요"
                }
              ]
            },
            {
              "id": "socialLogin",
              "intent": "소셜 간편 로그인(카카오·네이버·구글·Apple)",
              "method": "POST",
              "path": "/auth/social/{provider}",
              "request": "{provider(kakao|naver|google|apple), authCode}",
              "response": "{accessToken(JWT), user, memberships:['{entities.Member}']}",
              "auth": "none(공개)",
              "idempotency": "불필요 — 세션 발급(비가역 쓰기 아님). confirm 없음",
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 400,
                  "when": "공급자 창 취소·인증 실패",
                  "message": "소셜 로그인이 취소되었어요. 다시 시도해주세요"
                },
                {
                  "status": 409,
                  "when": "해당 소셜이 다른 계정에 이미 연결됨",
                  "message": "이미 다른 계정에 연결된 소셜 계정이에요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "로그인에 실패했어요. 잠시 후 다시 시도해주세요"
                }
              ]
            }
          ],
          "events": [
            {
              "name": "auth.login.success",
              "intent": "로그인 성공",
              "when": "자격증명 일치로 세션 발급 완료",
              "payload": "{userId, method(password|social)}"
            },
            {
              "name": "auth.login.failure",
              "intent": "로그인 실패",
              "when": "자격증명 불일치·형식오류·서버오류 등 로그인 실패",
              "payload": "{reason(invalid_credentials|validation|server|rate_limit|blocked)}"
            },
            {
              "name": "auth.social.click",
              "intent": "소셜 로그인 시도",
              "when": "소셜 4사 버튼 클릭",
              "payload": "{provider(kakao|naver|google|apple)}"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-LND-009",
              "via": "로그인 후 개설 신청",
              "trigger": ".pd-cta"
            }
          ]
        }
      },
      {
        "id": "SCR-LND-009",
        "label": "교회 개설 신청",
        "href": "l-apply.html",
        "surface": "landing",
        "status": "wireframed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-002"
        ],
        "context": "개설 신청 폼 — 회원가입→교회정보(교회명·대표자·담당자·전화·이메일·주소·규모·희망slug)→요금제(WEB/WEB+APP) 선택→제출. OnboardingApplication(신청) 생성. 제출 후 '슈퍼 승인 대기' 안내.",
        "components": [
          {
            "role": ".pd-gnb",
            "kind": "tabbar",
            "label": "상단 네비 — 훌메이트 로고·메뉴(홈·기능·WEB 상품·APP 상품·가격·도입 절차·FAQ·문의)·로그인·교회 개설 신청",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-001"
            }
          },
          {
            "role": ".pd-stepper",
            "kind": "stepper",
            "label": "신청 단계 — 회원가입·교회정보·요금제·제출"
          },
          {
            "role": ".pd-form",
            "kind": "form",
            "label": "교회정보 입력 — 교회명·대표자(담임목사)·담당자 성함·담당자 연락처·이메일·교회 규모·교회 주소·희망 주소(slug)"
          },
          {
            "role": ".pd-field",
            "kind": "form",
            "label": "희망 주소(slug) 입력·중복 확인"
          },
          {
            "role": ".pd-pricerow",
            "kind": "table",
            "label": "요금제 선택 — WEB 상품 / WEB+APP(차기), 이용료 미확정"
          }
        ],
        "description": [
          {
            "target": ".pd-stepper",
            "text": "신청 스테퍼 — 회원가입(완료)·교회정보(현재)·요금제·제출 4단계 진행을 표시"
          },
          {
            "target": ".pd-form",
            "text": "교회정보 입력 폼 — 교회명·대표자(담임목사)·담당자 성함·담당자 연락처·이메일·교회 규모·교회 주소. 교회를 검색하는 과정은 없고, 승인 시 전용 Tenant가 자동 생성되며 church_id가 자동 매핑됨"
          },
          {
            "target": ".pd-field",
            "text": "희망 주소(slug) 입력·중복 확인 — 확정된 slug가 교회 전용 접속 주소가 됨. 이미 사용 중이면 '이미 사용 중인 주소예요. 다른 slug를 입력해주세요'로 안내"
          },
          {
            "target": ".pd-pricerow",
            "text": "요금제 선택 — WEB 상품 / WEB+APP(차기), 이용료는 미확정이며 구체 금액은 교회 확인 후 안내. 가격 자세히 보기(SCR-LND-005)"
          },
          {
            "text": "제출하면 개설 신청(OnboardingApplication)이 생성되어 슈퍼 운영자 검토 큐로 접수(SCR-SUP-004). 제출 전 확인 모달이 뜨고, 재클릭해도 중복 생성되지 않음(멱등)"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입",
            "guard": "미로그인",
            "result": "먼저 로그인/회원가입 유도 카드 노출, 교회정보 단계는 로그인 후 진행",
            "message": "개설 신청을 위해 먼저 로그인해주세요. 로그인한 계정이 교회 관리자 계정으로 연결돼요",
            "placement": "inline",
            "target": ".pd-stepper"
          },
          {
            "state": "로딩",
            "trigger": "slug 중복 확인 클릭",
            "guard": "사용 가능 여부 조회 중",
            "result": "중복 확인 버튼 로딩 상태·입력 잠금",
            "message": "주소 사용 가능 여부를 확인하고 있어요",
            "placement": "inline",
            "target": ".pd-field",
            "api": {
              "endpoint": "GET /onboarding/slug-availability",
              "status": 200
            }
          },
          {
            "state": "정상",
            "trigger": "제출",
            "guard": "로그인+필수값 입력+slug 확정+개설 신청 동의 체크",
            "result": "개설 신청 접수·슈퍼 승인 대기 안내",
            "message": "신청이 접수됐어요. 슈퍼 운영자 승인을 기다려주세요",
            "placement": "full-page",
            "api": {
              "endpoint": "POST /onboarding/applications",
              "status": 201
            }
          },
          {
            "state": "빈데이터",
            "trigger": "요금제 영역 표시",
            "guard": "이용료 금액 미확정(시장검증 전)",
            "result": "WEB·WEB+APP 상품 구조는 노출되나 금액은 '미확정' 표기",
            "message": "이용료는 교회 확인 후 안내드려요(현재 미확정)",
            "placement": "inline",
            "target": ".pd-pricerow",
            "api": {
              "endpoint": "GET /public/product-plans",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "slug 중복 확인/제출",
            "guard": "희망 slug가 이미 사용 중(중복충돌)",
            "result": "slug 필드 인라인 오류·제출 차단",
            "message": "이미 사용 중인 주소예요. 다른 slug를 입력해주세요",
            "placement": "inline",
            "target": ".pd-field",
            "api": {
              "endpoint": "GET /onboarding/slug-availability",
              "status": 409
            }
          },
          {
            "state": "에러",
            "trigger": "제출",
            "guard": "서버 오류(5xx)",
            "result": "접수 실패·입력값 보존 후 재시도 유도",
            "message": "지금 신청 접수가 원활하지 않아요. 잠시 후 다시 시도해주세요",
            "placement": "banner",
            "api": {
              "endpoint": "POST /onboarding/applications",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "제출",
            "guard": "미로그인 상태에서 제출 시도(공개 랜딩)",
            "result": "제출 차단·로그인 유도(SCR-LND-008)",
            "message": "로그인이 필요해요. 로그인하면 이 계정이 교회 관리자 계정으로 연결돼요",
            "placement": "modal",
            "api": {
              "endpoint": "POST /onboarding/applications",
              "status": 401
            }
          },
          {
            "state": "엣지",
            "trigger": "제출 재클릭",
            "guard": "동일 신청 재제출(Idempotency-Key 동일)",
            "result": "중복 생성 없이 기존 신청 상태 재노출(멱등)",
            "message": "이미 접수된 신청이에요",
            "placement": "toast",
            "api": {
              "endpoint": "POST /onboarding/applications",
              "status": 409
            }
          },
          {
            "state": "에러",
            "trigger": "제출",
            "guard": "입력검증 — 교회명·이메일 등 필수값 누락",
            "result": "누락 필드 강조·제출 차단",
            "message": "필수 항목을 모두 입력해주세요",
            "placement": "inline",
            "target": ".pd-form",
            "api": {
              "endpoint": "POST /onboarding/applications",
              "status": 422
            }
          },
          {
            "state": "에러",
            "trigger": "이메일/연락처 입력",
            "guard": "입력검증 — 이메일·연락처 형식 오류",
            "result": "형식 오류 인라인 안내",
            "message": "이메일 형식을 확인해주세요(church@example.com)",
            "placement": "inline",
            "target": ".pd-form",
            "api": {
              "endpoint": "POST /onboarding/applications",
              "status": 400
            }
          },
          {
            "state": "에러",
            "trigger": "제출",
            "guard": "입력검증 — 개설 신청 동의 미체크",
            "result": "제출 차단·동의 체크 요구",
            "message": "입력 내용과 요금제를 확인하고 개설 신청 동의에 체크해주세요",
            "placement": "inline"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "slugCheck",
              "intent": "희망 주소(slug) 사용 가능 여부 확인",
              "method": "GET",
              "path": "/onboarding/slug-availability?slug={desiredSlug}",
              "response": "{ available: boolean } — '{entities.OnboardingApplication}'.desiredSlug / '{entities.Church}'.slug 중복 + 예약어(시스템 서브도메인) 검사",
              "auth": "Bearer(로그인 신청자)",
              "target": ".pd-field",
              "errors": [
                {
                  "status": 400,
                  "when": "slug 형식 오류(영문 소문자·숫자·하이픈 외)",
                  "message": "주소는 영문 소문자·숫자·하이픈만 사용할 수 있어요"
                },
                {
                  "status": 409,
                  "when": "slug 중복",
                  "message": "이미 사용 중인 주소예요. 다른 slug를 입력해주세요"
                },
                {
                  "status": 409,
                  "when": "slug 예약어(시스템 서브도메인: www·api·church·console·admin 등)",
                  "message": "사용할 수 없는 주소예요. 다른 slug를 입력해주세요"
                }
              ]
            },
            {
              "id": "productPlans",
              "intent": "요금제(상품) 선택지 조회",
              "method": "GET",
              "path": "/public/product-plans",
              "response": "'{entities.ProductPlan}'[] — WEB·WEB+APP 상품 구조. setupFee·recurringFee 는 '미확정'(시장검증 후 확정)",
              "auth": "none(공개)",
              "target": ".pd-pricerow",
              "errors": []
            }
          ],
          "writes": [
            {
              "id": "apply",
              "intent": "교회 개설 신청 생성(비가역) — 제출 전 확인 모달 + Idempotency-Key 멱등 + 감사로그",
              "method": "POST",
              "path": "/onboarding/applications",
              "request": "{ churchName, representative, contactPerson, phone, email, address, churchSize, desiredSlug, plan } → '{entities.OnboardingApplication}'",
              "response": "'{entities.OnboardingApplication}' — status:'신청'(승인 시 Tenant·Church·Admin·Domain·ChannelConfig·PwaConfig 자동 생성으로 연결)",
              "auth": "Bearer(로그인 신청자)",
              "idempotent": "Idempotency-Key 헤더 — 재클릭 시 신규 생성 없이 기존 신청 반환",
              "confirm": "제출 전 확인 모달 필수",
              "errors": [
                {
                  "status": 401,
                  "when": "미로그인 상태 제출",
                  "message": "로그인이 필요해요. 로그인하면 이 계정이 교회 관리자 계정으로 연결돼요"
                },
                {
                  "status": 409,
                  "when": "slug 중복 또는 중복 제출(멱등 재생)",
                  "message": "이미 접수됐거나 이미 사용 중인 주소예요"
                },
                {
                  "status": 422,
                  "when": "필수값 누락·동의 미체크 등 비즈니스 규칙 위반",
                  "message": "필수 항목과 개설 신청 동의를 확인해주세요"
                },
                {
                  "status": 400,
                  "when": "이메일·연락처 형식 오류",
                  "message": "입력 형식을 확인해주세요(church@example.com)"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "지금 신청 접수가 원활하지 않아요. 잠시 후 다시 시도해주세요"
                }
              ]
            }
          ],
          "events": [
            {
              "name": "onboarding.application.submitted",
              "intent": "개설 신청 접수 완료",
              "when": "신청 접수 성공(201)",
              "payload": "{ applicationId, status:'신청' }"
            },
            {
              "name": "onboarding.slug.checked",
              "intent": "희망 주소 중복 확인 완료",
              "when": "slug 사용 가능 여부 조회 완료",
              "payload": "{ slug, available }"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-SUP-004",
              "via": "제출→슈퍼 개설 검토·승인 큐로 접수",
              "trigger": ".pd-cta"
            }
          ]
        }
      },
      {
        "id": "SCR-LND-010",
        "label": "문의",
        "href": "l-contact.html",
        "surface": "landing",
        "status": "wireframed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-001"
        ],
        "context": "도입 문의 폼(교회명·연락처·문의내용). 전송 확인.",
        "components": [
          {
            "role": ".pd-gnb",
            "kind": "tabbar",
            "label": "상단 네비(홈·기능·WEB 상품·APP 상품·가격·도입 절차·FAQ·문의 · 로그인 · 교회 개설 신청)",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-001"
            }
          },
          {
            "role": ".pd-section-title",
            "kind": "banner",
            "label": "도입 문의"
          },
          {
            "role": ".pd-form",
            "kind": "form",
            "label": "도입 문의 폼(교회명·연락처·문의내용 · 개인정보 최소 수집)"
          },
          {
            "role": ".pd-field",
            "kind": "form",
            "label": "교회명·연락처·문의내용 입력란"
          },
          {
            "role": ".pd-cta",
            "kind": "button",
            "label": "문의 보내기",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-001"
            }
          }
        ],
        "description": [
          {
            "text": "상단 네비 — 랜딩 전역 메뉴(홈·기능·WEB 상품·APP 상품·가격·도입 절차·FAQ·문의)와 우측 로그인·교회 개설 신청으로 이동, 로고 클릭 시 홈(SCR-LND-001)으로 복귀한다.",
            "target": ".pd-gnb"
          },
          {
            "text": "도입 문의 섹션 제목 — 교회 전용 Web·PWA 도입을 검토하는 담당자가 문의를 남기는 영역임을 안내한다(교회 검색이나 복잡한 가입 절차 없이 문의 접수만으로 시작).",
            "target": ".pd-section-title"
          },
          {
            "text": "문의 폼 — 교회명(예: ○○교회)·연락처(담당자 휴대폰 또는 이메일)·문의내용(도입 시기·교인 규모·필요 기능)만 받는 최소 수집 입력. 주민번호 등 민감정보는 받지 않는다(PIPA 최소수집).",
            "target": ".pd-form"
          },
          {
            "text": "입력란 — 교회명·연락처·문의내용 각 필드. 필수값이 비어 있으면 입력란 아래에 인라인 안내가 표시되고, 연락처 형식이 맞지 않으면 해당 필드에 형식 안내가 표시된다(SCR-LND-010 내 처리).",
            "target": ".pd-field"
          },
          {
            "text": "문의 보내기 버튼 — 필수값과 [필수] 수집·이용 동의 확인 후 접수하고, 확인 메시지를 토스트로 표시한 뒤 홈(SCR-LND-001)으로 복귀한다. 요금은 초기등록비+월 이용료 구조이며 구체 금액은 교회 확인 후 안내(미확정)한다.",
            "target": ".pd-cta"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "문의 화면 진입",
            "guard": "로그인 불필요(비인증 공개 접수 화면)",
            "result": "빈 문의 폼 노출 — 교회명·연락처·문의내용 placeholder와 [필수] 수집·이용 동의 체크박스 표시",
            "message": "교회 전용 Web·PWA 도입을 검토 중이신가요? 교회명·연락처·문의내용만 남겨 주시면 담당자가 확인 후 연락드립니다.",
            "placement": "inline",
            "target": ".pd-form"
          },
          {
            "state": "로딩",
            "trigger": "문의 보내기 클릭",
            "guard": "전송 요청 진행 중(응답 대기)",
            "result": "버튼 비활성화·중복 제출 차단, 전송 중 표시",
            "message": "문의를 보내는 중이에요...",
            "placement": "inline",
            "target": ".pd-cta",
            "api": {
              "endpoint": "POST /public/contact"
            }
          },
          {
            "state": "정상",
            "trigger": "문의 보내기 클릭",
            "guard": "교회명·연락처·문의내용 입력 + [필수] 수집·이용 동의 체크",
            "result": "접수 성공 → 확인 토스트 표시 후 홈(SCR-LND-001)으로 복귀",
            "message": "문의가 접수됐어요. 빠르게 연락드릴게요",
            "placement": "toast",
            "target": ".pd-cta",
            "api": {
              "endpoint": "POST /public/contact",
              "status": 201
            }
          },
          {
            "state": "빈데이터",
            "trigger": "N/A",
            "guard": "빈데이터: 해당 없음 — 조회 목록이 없는 단건 입력 폼(표시할 리스트 데이터 없음)",
            "result": "해당 없음"
          },
          {
            "state": "에러",
            "trigger": "문의 보내기 클릭",
            "guard": "서버·네트워크 오류(5xx)",
            "result": "재시도 안내, 입력값 유지",
            "message": "전송에 실패했어요. 잠시 후 다시 시도해주세요",
            "placement": "toast",
            "target": ".pd-form",
            "api": {
              "endpoint": "POST /public/contact",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "N/A",
            "guard": "권한없음: 해당 없음 — 비인증 공개 접수 화면(로그인·권한 게이트 없음, 누구나 문의 가능)",
            "result": "해당 없음(공개)"
          },
          {
            "state": "엣지",
            "trigger": "같은 화면에서 반복·과도한 제출",
            "guard": "짧은 시간 과도한 제출(레이트리밋). Idempotency-Key로 동일 제출 중복 접수 방지",
            "result": "제출 차단·잠시 후 재시도 안내",
            "message": "요청이 많아요. 잠시 후 다시 시도해주세요",
            "placement": "toast",
            "target": ".pd-cta",
            "api": {
              "endpoint": "POST /public/contact",
              "status": 429
            }
          },
          {
            "state": "에러",
            "trigger": "문의 보내기 클릭(필수누락)",
            "guard": "교회명·연락처·문의내용 중 하나 이상 미입력",
            "result": "각 입력란 아래 인라인 안내",
            "message": "교회명·연락처·문의내용을 입력해주세요",
            "placement": "inline",
            "target": ".pd-field",
            "api": {
              "endpoint": "POST /public/contact",
              "status": 422
            }
          },
          {
            "state": "에러",
            "trigger": "연락처 입력·제출(형식오류)",
            "guard": "연락처가 휴대폰 번호·이메일 형식에 맞지 않음",
            "result": "연락처 필드 인라인 오류",
            "message": "연락받으실 휴대폰 번호나 이메일을 정확히 입력해주세요",
            "placement": "inline",
            "target": ".pd-field",
            "api": {
              "endpoint": "POST /public/contact",
              "status": 400
            }
          },
          {
            "state": "에러",
            "trigger": "문의 보내기 클릭(범위경계)",
            "guard": "범위경계: 해당 없음 — 수치·범위 입력 필드 없음(교회명·연락처·문의내용은 자유 텍스트, 목업에 글자수 제한 표기 없음)",
            "result": "해당 없음"
          },
          {
            "state": "에러",
            "trigger": "동일 교회명·연락처로 재접수(중복충돌)",
            "guard": "최근 접수와 중복(Idempotency-Key 동일 또는 동일 리드 재접수)",
            "result": "중복 접수 방지 안내",
            "message": "이미 접수된 문의예요. 담당자가 곧 연락드릴게요",
            "placement": "toast",
            "target": ".pd-cta",
            "api": {
              "endpoint": "POST /public/contact",
              "status": 409
            }
          },
          {
            "state": "에러",
            "trigger": "동의 미체크 상태로 제출",
            "guard": "[필수] 수집·이용 동의 체크박스 미체크",
            "result": "동의 필요 인라인 안내, 접수 차단",
            "message": "수집·이용 동의에 체크해주셔야 문의를 보낼 수 있어요",
            "placement": "inline",
            "target": ".pd-cta",
            "api": {
              "endpoint": "POST /public/contact",
              "status": 422
            }
          },
          {
            "state": "정상",
            "trigger": "교회명·연락처·문의내용 + [필수] 동의 입력 완료(유효)",
            "guard": "필수·형식·동의 모두 통과(클라이언트 검증)",
            "result": "문의 보내기 버튼 활성화(제출 가능 상태)",
            "message": "문의 보내기 버튼이 활성화됐어요",
            "placement": "inline",
            "target": ".pd-cta"
          }
        ],
        "interface": {
          "reads": [],
          "writes": [
            {
              "id": "contactSubmit",
              "intent": "도입 문의 접수",
              "method": "POST",
              "path": "/public/contact",
              "request": "{churchName, contact, message, consentRequired:true}",
              "response": "{inquiryId, status:'received'}",
              "auth": "none(공개)",
              "target": ".pd-cta",
              "idempotency": true,
              "idempotencyNote": "Idempotency-Key 헤더로 더블클릭·재전송 중복 접수 방지(409). 비파괴 공개 리드이므로 별도 확인(confirm) 모달 없음 — 제출 즉시 접수·토스트 안내.",
              "confirm": false,
              "note": "플랫폼(hurmate.com) 레벨 공개 도입 문의 리드 — tenant 스코프·church_id 없음(교회 검색 없음). 모델 코어 엔티티 아님이며, 담당자 확인·승인 시 '{entities.OnboardingApplication}'(교회 개설 신청) 퍼널로 승계될 수 있음. PIPA 최소수집(교회명·연락처만, 민감정보 미수집) — 동의 원장은 '{entities.Consent}'와 무관한 공개 리드 동의로 별도 보관.",
              "errors": [
                {
                  "status": 400,
                  "when": "연락처 형식 오류(휴대폰·이메일 형식 불일치)",
                  "message": "연락받으실 휴대폰 번호나 이메일을 정확히 입력해주세요"
                },
                {
                  "status": 422,
                  "when": "필수값 누락 또는 [필수] 수집·이용 동의 미체크",
                  "message": "교회명·연락처·문의내용을 입력하고 수집·이용 동의에 체크해주세요"
                },
                {
                  "status": 409,
                  "when": "동일 리드 중복 접수(Idempotency-Key 중복)",
                  "message": "이미 접수된 문의예요. 담당자가 곧 연락드릴게요"
                },
                {
                  "status": 429,
                  "when": "짧은 시간 과도한 제출(레이트리밋)",
                  "message": "요청이 많아요. 잠시 후 다시 시도해주세요"
                },
                {
                  "status": 500,
                  "when": "서버·네트워크 오류",
                  "message": "전송에 실패했어요. 잠시 후 다시 시도해주세요"
                }
              ]
            }
          ],
          "events": [
            {
              "name": "contact.submitted",
              "when": "도입 문의 접수 성공",
              "intent": "도입 문의 접수 완료",
              "payload": "{inquiryId}"
            },
            {
              "name": "contact.submit.failed",
              "when": "도입 문의 전송 실패(4xx/5xx)",
              "intent": "도입 문의 전송 실패",
              "payload": "{errorCode, status}"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-LND-001",
              "via": "접수 후 홈 복귀",
              "trigger": ".pd-cta"
            }
          ]
        }
      },
      {
        "id": "SCR-LND-011",
        "label": "개설 신청 접수완료·상태",
        "href": "l-apply-done.html",
        "surface": "landing",
        "entry": false,
        "status": "wireframed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-002"
        ],
        "context": "개설 신청 접수완료·상태(접수→검토중→승인/반려). 접수번호·교회명·요금제·예상 소요·문의처.",
        "components": [
          {
            "role": ".pd-gnb",
            "kind": "tabbar",
            "label": "상단 네비 — 훌메이트 로고·메뉴(홈·기능·WEB 상품·APP 상품·가격·도입 절차·FAQ·문의)·로그인·교회 개설 신청(현재 플로우 활성)",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-001"
            }
          },
          {
            "role": ".pd-done",
            "kind": "card",
            "label": "접수 완료 히어로 — 체크 아이콘 + '개설 신청이 접수됐어요' + 이메일 통지 안내"
          },
          {
            "role": ".pd-stepper",
            "kind": "stepper",
            "label": "진행 상태 — 접수됨(완료)·검토중(현재)·승인완료 3단계"
          },
          {
            "role": ".pd-banner",
            "kind": "banner",
            "label": "현재 상태 배너 — 검토중 · 슈퍼 운영자가 신청 내용을 확인하고 있어요"
          },
          {
            "role": ".pd-wpanel",
            "kind": "table",
            "label": "접수 정보 — 접수번호 HM-2026-0147·교회명 ○○교회·요금제 WEB 상품(월 이용료 미확정)·신청일시·예상 검토 소요 영업일 1~2일·결과 안내 이메일"
          },
          {
            "role": ".pd-card",
            "kind": "card",
            "label": "승인완료 분기 — 교회 전용 Tenant 자동 생성·설정 Wizard(8단계) 시작",
            "action": {
              "on": "click",
              "do": "go:SCR-ADM-002"
            }
          },
          {
            "role": ".pd-card",
            "kind": "card",
            "label": "반려 분기 — 사유 확인 후 보완하여 다시 신청(멱등)",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-009"
            }
          },
          {
            "role": ".pd-cta",
            "kind": "button",
            "label": "하단 CTA — 홈으로 돌아가기·문의하기",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-001"
            }
          }
        ],
        "description": [
          {
            "target": ".pd-done",
            "text": "접수 완료 확인 히어로 — 제출 직후 '개설 신청이 접수됐어요'로 완결감을 주고, 승인 결과는 담당자 이메일로 통지됨을 안내. 이 화면은 공개 랜딩의 상태 열람 종단(접수→검토→승인/반려)"
          },
          {
            "target": ".pd-stepper",
            "text": "진행 상태 스테퍼 — 접수됨(완료)·검토중(현재)·승인완료 3단계. 기본 노출 상태는 '검토중'이며, 승인완료로 전이되면 3단계가 완료 처리됨"
          },
          {
            "target": ".pd-wpanel",
            "text": "접수 정보 요약 — 접수번호(문의 시 사용)·교회명 ○○교회·요금제 WEB 상품(월 이용료 미확정)·신청일시·예상 검토 소요(영업일 기준 1~2일)·결과 안내 이메일. 금액은 시장 검증 후 확정으로 현재 미확정"
          },
          {
            "target": ".pd-card",
            "text": "검토 결과 2분기 안내 — 승인완료 시 교회 전용 Tenant 자동 생성(church_id 자동) 후 설정 Wizard로 시작(SCR-ADM-002), 반려 시 사유 확인 후 보완하여 재신청(SCR-LND-009·멱등)"
          },
          {
            "target": ".pd-cta",
            "text": "하단 복귀·문의 — 홈으로 돌아가기(SCR-LND-001)와 문의하기. 담당자 연락처는 교회 확인 후 게재(정직성), 문의는 support@hurmate.com 메일"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "제출 직후 진입",
            "guard": "방금 접수된 신청(status=신청)",
            "result": "접수 완료 히어로·접수번호·스테퍼(접수됨 완료, 검토중 활성) 노출",
            "message": "개설 신청이 접수됐어요. 슈퍼 운영자 검토 후 결과를 담당자 이메일로 알려드려요",
            "placement": "full-page",
            "target": ".pd-done",
            "api": {
              "endpoint": "GET /onboarding/applications/{id}",
              "status": 200
            }
          },
          {
            "state": "로딩",
            "trigger": "상태 영역 진입·새로고침",
            "guard": "최신 접수 상태 조회 중",
            "result": "접수 정보·스테퍼 자리 유지하며 상태 불러오는 중 표시",
            "message": "접수 상태를 불러오고 있어요",
            "placement": "inline",
            "target": ".pd-stepper",
            "api": {
              "endpoint": "GET /onboarding/applications/{id}",
              "status": 200
            }
          },
          {
            "state": "정상",
            "trigger": "상태 조회 성공",
            "guard": "status=검토(검토중)",
            "result": "검토중 배너·접수 정보·2분기 안내 정상 노출",
            "message": "현재 슈퍼 운영자가 신청 내용을 검토하고 있어요(검토중)",
            "placement": "banner",
            "target": ".pd-banner",
            "api": {
              "endpoint": "GET /onboarding/applications/{id}",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "요금제 정보 표시",
            "guard": "요금 금액 미확정(시장검증 전)",
            "result": "요금제 구조(WEB 상품)는 노출되나 월 이용료는 '미확정' 배지",
            "message": "이용료는 교회 확인 후 안내드려요(현재 미확정)",
            "placement": "inline",
            "target": ".pd-wpanel",
            "api": {
              "endpoint": "GET /onboarding/applications/{id}",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "상태 조회",
            "guard": "서버 오류(5xx) 또는 네트워크 불안정",
            "result": "최신 상태 반영 실패·접수번호는 유지하고 재시도 유도",
            "message": "지금 접수 상태를 불러오지 못했어요. 잠시 후 다시 시도해주세요",
            "placement": "banner",
            "target": ".pd-banner",
            "api": {
              "endpoint": "GET /onboarding/applications/{id}",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "접수 상태 열람",
            "guard": "미로그인 또는 본인 신청이 아닌 계정(공개 랜딩)",
            "result": "상태 상세는 가리고 로그인 유도·본인 신청만 열람 안내",
            "message": "로그인하면 내가 신청한 개설 건의 진행 상태를 볼 수 있어요",
            "placement": "modal",
            "target": ".pd-wpanel",
            "api": {
              "endpoint": "GET /onboarding/applications/{id}",
              "status": 401
            }
          },
          {
            "state": "엣지",
            "trigger": "검토 결과 전이 감지",
            "guard": "status=개설(승인완료) 또는 반려로 전이",
            "result": "승인완료=스테퍼 3단계 완료+설정 Wizard CTA 활성(SCR-ADM-002), 반려=반려 사유 안내+보완 재신청 CTA(SCR-LND-009)",
            "message": "승인됐어요 — 설정 Wizard로 교회 개설을 시작하세요 / 반려됐어요 — 사유를 확인하고 보완해 다시 신청해주세요",
            "placement": "banner",
            "target": ".pd-card",
            "api": {
              "endpoint": "GET /onboarding/applications/{id}",
              "status": 200
            }
          },
          {
            "state": "엣지",
            "trigger": "접수완료 화면 재진입·접수번호 중복 확인",
            "guard": "이미 접수된 동일 신청(멱등 키 동일)",
            "result": "중복 접수 없이 기존 접수 건의 상태를 그대로 재노출",
            "message": "이미 접수된 신청이에요. 진행 상태를 확인해주세요",
            "placement": "toast",
            "target": ".pd-done",
            "api": {
              "endpoint": "GET /onboarding/applications/{id}",
              "status": 200
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "applicationStatus",
              "intent": "개설 신청 접수·검토 상태 조회",
              "method": "GET",
              "path": "/onboarding/applications/{id}",
              "params": "path: id(신청 UUID)",
              "response": "'{entities.OnboardingApplication}' — { applicationNumber, churchName, plan, status('신청'|'검토'|'개설'|'활성'|'일시정지'|'해지'), appliedAt, approvedAt, rejectReason? }. 승인 시 Tenant·Church·Admin·Domain·ChannelConfig·PwaConfig 자동 생성으로 연결",
              "auth": "Bearer(로그인 신청자 — 본인 신청만)",
              "target": ".pd-wpanel",
              "errors": [
                {
                  "status": 401,
                  "when": "미로그인 상태 열람",
                  "message": "로그인하면 내가 신청한 개설 건의 진행 상태를 볼 수 있어요"
                },
                {
                  "status": 403,
                  "when": "본인 신청이 아닌 건 접근",
                  "message": "본인이 신청한 개설 건만 확인할 수 있어요"
                },
                {
                  "status": 404,
                  "when": "접수번호에 해당하는 신청 없음",
                  "message": "해당 접수 건을 찾을 수 없어요. 접수번호를 확인해주세요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "지금 접수 상태를 불러오지 못했어요. 잠시 후 다시 시도해주세요"
                }
              ]
            }
          ],
          "writes": [],
          "events": [
            {
              "name": "onboarding.application.status.viewed",
              "intent": "접수 상태 열람",
              "when": "상태 조회 성공(200)",
              "payload": "{ applicationId, applicationNumber, status }"
            },
            {
              "name": "onboarding.application.approved",
              "intent": "승인완료 전이 감지(설정 Wizard 진입 유도)",
              "when": "status=개설(승인완료)로 전이",
              "payload": "{ applicationId, tenantId, approvedAt }"
            },
            {
              "name": "onboarding.application.rejected",
              "intent": "반려 전이 감지(사유 안내·재신청 유도)",
              "when": "status=반려로 전이",
              "payload": "{ applicationId, rejectReason }"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-ADM-002",
              "via": "승인완료 → 개설 설정 Wizard(8단계) 시작",
              "trigger": ".pd-card"
            },
            {
              "screen": "SCR-LND-001",
              "via": "홈으로 돌아가기",
              "trigger": ".pd-cta"
            }
          ]
        }
      },
      {
        "id": "SCR-LND-012",
        "label": "비밀번호 재설정",
        "href": "l-password-reset.html",
        "surface": "landing",
        "entry": false,
        "status": "wireframed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-002"
        ],
        "context": "전역 계정 비밀번호 재설정(이메일→링크 발송→완료).",
        "components": [
          {
            "role": ".pd-gnb",
            "kind": "tabbar",
            "label": "상단 네비 — 훌메이트 로고·홈·기능·WEB 상품·APP 상품·가격·도입 절차·FAQ·문의·로그인(활성)·교회 개설 신청",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-001"
            }
          },
          {
            "role": ".pd-form",
            "kind": "form",
            "label": "비밀번호 재설정 요청 폼 — 가입 이메일 입력 후 재설정 링크 발송(계정 존재 여부 비노출)"
          },
          {
            "role": ".pd-field",
            "kind": "input",
            "label": "이메일 입력란 — '가입하신 이메일 주소'"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "재설정 링크 보내기 — 입력 이메일로 재설정 링크 발송 후 전송 완료 안내 노출",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-012"
            }
          },
          {
            "role": ".pd-banner",
            "kind": "banner",
            "label": "전송 완료 안내 — '재설정 링크를 보냈어요. 메일함(스팸함 포함) 확인 · 링크 30분 유효'"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "메일을 받지 못하셨나요? 다시 보내기 — 재설정 링크 재발송(레이트리밋 적용)",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-012"
            }
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "로그인으로 돌아가기 — 대표사이트 로그인(SCR-LND-008)",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-008"
            }
          }
        ],
        "description": [
          {
            "text": "상단 네비 — '훌메이트' 로고와 메뉴(홈·기능·WEB/APP 상품·가격·도입 절차·FAQ·문의). 로고·메뉴 클릭 시 대표사이트 홈(SCR-LND-001)으로 이동하고, 우측 로그인은 현재 인증 영역이라 활성 표시",
            "target": ".pd-gnb"
          },
          {
            "text": "비밀번호 재설정 요청 폼 — 전역 계정(AppUser)의 가입 이메일을 입력해 재설정 링크를 발송. 계정 존재 여부는 응답으로 알려주지 않고(가입 여부 노출·열거 공격 방지) 동일한 전송 완료 안내만 노출",
            "target": ".pd-form"
          },
          {
            "text": "이메일 입력란('가입하신 이메일 주소') — 형식이 올바르지 않으면 입력란 아래에 '올바른 이메일 주소를 입력해주세요'를 인라인 표시",
            "target": ".pd-field"
          },
          {
            "text": "전송 완료 안내 배너 — 가입된 계정이 있으면 재설정 링크를 보냈다는 안내와 함께 메일함·스팸함 확인, 링크 30분 유효를 안내",
            "target": ".pd-banner"
          },
          {
            "text": "'재설정 링크 보내기'·'다시 보내기'(재발송, 레이트리밋 적용)·'로그인으로 돌아가기' 버튼 — 로그인으로 돌아가기는 대표사이트 로그인(SCR-LND-008)으로 이동",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "화면 진입",
            "guard": "비로그인 상태",
            "result": "이메일 입력 폼과 안내(계정 노출 방지·링크 30분 유효·소셜 가입 안내) 노출",
            "message": "가입하신 이메일 주소를 입력하면 비밀번호 재설정 링크를 보내드려요",
            "placement": "inline",
            "target": ".pd-form"
          },
          {
            "state": "로딩",
            "trigger": "제출(재설정 링크 보내기)",
            "guard": "입력 유효·발송 처리 중",
            "result": "버튼 비활성·스피너 표시, 중복 제출 차단",
            "message": "재설정 링크를 보내고 있어요",
            "placement": "inline",
            "target": ".pd-btn",
            "api": {
              "endpoint": "POST /auth/password-reset/request",
              "status": "처리 중"
            }
          },
          {
            "state": "정상",
            "trigger": "제출(재설정 링크 보내기)",
            "guard": "이메일 형식 유효(가입 여부와 무관하게 동일 처리)",
            "result": "전송 완료 배너 노출 — 가입된 계정이 있으면 재설정 링크 발송(열거 방지로 동일 메시지), '다시 보내기'·'로그인으로 돌아가기' 노출",
            "message": "입력하신 이메일로 가입된 계정이 있으면 재설정 링크를 보냈어요. 메일함(스팸함 포함)을 확인해주세요. 링크는 30분간 유효합니다",
            "placement": "banner",
            "target": ".pd-banner",
            "api": {
              "endpoint": "POST /auth/password-reset/request",
              "status": 202
            }
          },
          {
            "state": "빈데이터",
            "trigger": "해당 없음",
            "guard": "빈데이터: 해당 없음(재설정 요청 폼 — 조회·목록 화면이 아님)",
            "result": "표시 없음",
            "message": "",
            "target": ".pd-form"
          },
          {
            "state": "에러",
            "trigger": "제출(입력검증·필수누락)",
            "guard": "이메일 미입력",
            "result": "제출 차단·인라인 검증 오류",
            "message": "이메일 주소를 입력해주세요",
            "placement": "inline",
            "target": ".pd-field",
            "api": {
              "endpoint": "POST /auth/password-reset/request",
              "status": 400
            }
          },
          {
            "state": "에러",
            "trigger": "제출(입력검증·형식오류 — 잘못된 이메일)",
            "guard": "이메일 형식 불일치",
            "result": "제출 차단·인라인 검증 오류",
            "message": "올바른 이메일 주소를 입력해주세요",
            "placement": "inline",
            "target": ".pd-field",
            "api": {
              "endpoint": "POST /auth/password-reset/request",
              "status": 400
            }
          },
          {
            "state": "에러",
            "trigger": "제출(입력검증·범위경계)",
            "guard": "이메일 길이 초과(254자 초과 등)",
            "result": "제출 차단·인라인 검증 오류",
            "message": "이메일 주소가 너무 길어요. 다시 확인해주세요",
            "placement": "inline",
            "target": ".pd-field",
            "api": {
              "endpoint": "POST /auth/password-reset/request",
              "status": 400
            }
          },
          {
            "state": "에러",
            "trigger": "제출(입력검증·중복충돌)",
            "guard": "중복충돌: 해당 없음(재설정 요청은 신규 레코드 생성 충돌이 아님 — 동일 이메일 재요청은 멱등 접수되어 최신 링크만 유효, 이전 링크는 무효화)",
            "result": "해당 없음",
            "message": "",
            "target": ".pd-form"
          },
          {
            "state": "에러",
            "trigger": "제출(재설정 링크 보내기)",
            "guard": "서버·메일 발송 오류",
            "result": "토스트로 재시도 안내",
            "message": "메일 발송에 실패했어요. 잠시 후 다시 시도해주세요",
            "placement": "toast",
            "target": ".pd-form",
            "api": {
              "endpoint": "POST /auth/password-reset/request",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "화면 진입·제출",
            "guard": "공개 화면이라 열람 자체는 인증 불필요(해당 없음). 소셜(카카오·네이버) 전용 계정은 비밀번호가 없어 재설정 대상이 아니나, 계정 특정 응답으로 노출하지 않고 일반 안내 문구로만 상시 표기(열거 방지)",
            "result": "하단 안내 문구 상시 노출(계정별 분기 없음)",
            "message": "카카오·네이버로 가입하셨다면 비밀번호가 없어요. 소셜 로그인으로 입장해 주세요",
            "placement": "inline"
          },
          {
            "state": "엣지",
            "trigger": "다시 보내기 반복 클릭",
            "guard": "재발송 레이트리밋 초과",
            "result": "일시 제한·토스트 안내",
            "message": "재발송 요청이 많아요. 잠시 후 다시 시도해주세요",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "POST /auth/password-reset/request",
              "status": 429
            }
          },
          {
            "state": "엣지",
            "trigger": "메일의 재설정 링크 클릭(만료/사용됨 상태로 이 화면으로 되돌아옴)",
            "guard": "재설정 토큰이 30분 경과로 만료되었거나 이미 사용됨",
            "result": "안내 후 재요청 유도(이 화면에서 다시 발송)",
            "message": "링크가 만료되었거나 이미 사용됐어요. 재설정 링크를 다시 받아주세요",
            "placement": "banner",
            "target": ".pd-banner",
            "api": {
              "endpoint": "GET /auth/password-reset/verify (링크 랜딩 단계)",
              "status": 410
            }
          }
        ],
        "interface": {},
        "flow": {
          "to": [
            {
              "screen": "SCR-LND-008",
              "via": "재설정 안내 확인 후 로그인으로 돌아가기",
              "trigger": ".pd-btn"
            }
          ]
        }
      },
      {
        "id": "SCR-LND-013",
        "label": "회원가입",
        "href": "l-signup.html",
        "surface": "landing",
        "entry": false,
        "status": "wireframed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-002"
        ],
        "context": "전역 계정 회원가입(아이디). 소셜 외 경로. 개설 신청 관리자 계정 연결.",
        "components": [
          {
            "role": ".pd-gnb",
            "kind": "tabbar",
            "label": "상단 네비 — 훌메이트 로고·메뉴(홈·기능·WEB 상품·APP 상품·가격·도입 절차·FAQ·문의)·로그인·교회 개설 신청",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-001"
            }
          },
          {
            "role": ".pd-form",
            "kind": "form",
            "label": "아이디(이메일) 가입 폼 — 이름·이메일·휴대전화·비밀번호·비밀번호 확인 (최소 수집·주민번호/생년/성별 미수집)"
          },
          {
            "role": ".pd-field",
            "kind": "form",
            "label": "이메일 입력 — 중복·형식 검증 대상 필드"
          },
          {
            "role": ".pd-check",
            "kind": "form",
            "label": "약관 동의 — [필수] 서비스 이용약관·[필수] 개인정보 수집·이용(이름·이메일·휴대전화)"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "소셜 간편 가입 4사 — 카카오·네이버·구글·Apple / 이미 계정이 있나요? 로그인",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-008"
            }
          },
          {
            "role": ".pd-cta",
            "kind": "button",
            "label": "가입하고 교회 개설 신청 계속 — 생성 계정을 개설 신청 관리자 계정으로 연결",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-009"
            }
          }
        ],
        "description": [
          {
            "target": ".pd-gnb",
            "text": "상단 네비 — '훌메이트' 로고와 메뉴(홈·기능·WEB/APP 상품·가격·도입 절차·FAQ·문의). 로고·메뉴 클릭 시 대표사이트 홈(SCR-LND-001)으로 이동하며, 현재 화면은 교회 개설 신청 흐름의 가입 단계라 '교회 개설 신청'이 활성 표시"
          },
          {
            "target": ".pd-form",
            "text": "아이디(이메일) 가입 폼 — 이름·이메일·휴대전화·비밀번호·비밀번호 확인. 전역 계정(AppUser)을 생성하며, 교회를 검색하는 과정은 없고 전용 주소 접속 시 소속 교회가 자동 지정됨(church_id 자동 매핑). 주민번호·생년·성별 등은 수집하지 않음(최소 수집)"
          },
          {
            "target": ".pd-field",
            "text": "이메일 입력란 — 중복·형식을 검증. 이미 가입된 이메일이면 '이미 가입된 이메일이에요', 형식 불일치면 '이메일 형식을 확인해주세요(name@example.com)'를 입력란 아래 인라인 표시. 비밀번호는 8자 이상이며 확인란과 일치해야 함"
          },
          {
            "target": ".pd-check",
            "text": "약관 동의 — [필수] 서비스 이용약관, [필수] 개인정보 수집·이용(이름·이메일·휴대전화)에 모두 동의해야 가입 가능. 동의 내역은 Consent로 최소 유지되며 '약관 전문 보기'로 전문 확인(s-terms.html)"
          },
          {
            "target": ".pd-cta",
            "text": "'가입하고 교회 개설 신청 계속' 실행 — 가입 성공 시 전역 계정이 생성되고, 이 계정이 교회 개설 신청(SCR-LND-009)의 관리자(신청자) 계정으로 연결됨. 이미 계정이 있으면 로그인(SCR-LND-008)으로 이동"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "화면 진입",
            "guard": "비로그인 상태(공개 랜딩)",
            "result": "이름·이메일·휴대전화·비밀번호·비밀번호 확인 폼, [필수] 약관 동의 2종, 소셜 4사 간편 가입, '이미 계정이 있나요? 로그인' 안내 노출",
            "message": "전역 계정으로 가입하면 교회 개설 신청의 관리자 계정으로 연결돼요. 교회 검색 과정은 없어요",
            "placement": "inline",
            "target": ".pd-form"
          },
          {
            "state": "로딩",
            "trigger": "제출(가입하기)",
            "guard": "입력 유효·약관 동의 완료·계정 생성 처리 중",
            "result": "가입 버튼 비활성·스피너 표시, 중복 제출 차단",
            "message": "가입 계정을 만들고 있어요",
            "placement": "inline",
            "target": ".pd-cta",
            "api": {
              "endpoint": "POST /auth/signup",
              "status": "처리 중"
            }
          },
          {
            "state": "정상",
            "trigger": "제출(가입하기)",
            "guard": "입력검증 통과(유효) + [필수] 약관 모두 동의",
            "result": "전역 계정 생성·동의 기록 → 교회 개설 신청(SCR-LND-009)으로 이어지며 생성 계정이 관리자(신청자)로 연결",
            "message": "가입이 완료됐어요. 이어서 교회 개설을 신청해주세요",
            "placement": "full-page",
            "target": ".pd-cta",
            "api": {
              "endpoint": "POST /auth/signup",
              "status": 201
            }
          },
          {
            "state": "빈데이터",
            "trigger": "해당 없음",
            "guard": "빈데이터: 해당 없음(가입은 조회·목록 화면이 아니라 신규 계정 생성 화면)",
            "result": "표시 없음",
            "message": "",
            "placement": "inline",
            "target": ".pd-form"
          },
          {
            "state": "에러",
            "trigger": "제출(가입하기)",
            "guard": "서버 오류(5xx)",
            "result": "입력값 보존·배너로 재시도 유도",
            "message": "지금 가입이 원활하지 않아요. 잠시 후 다시 시도해주세요",
            "placement": "banner",
            "target": ".pd-form",
            "api": {
              "endpoint": "POST /auth/signup",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "화면 진입/제출",
            "guard": "공개 가입 화면이라 열람·가입 자체는 인증 불필요 / 단, 이미 로그인된 계정이 재진입",
            "result": "이미 로그인 상태면 교회 개설 신청(SCR-LND-009) 또는 내 교회로 유도",
            "message": "이미 로그인되어 있어요. 교회 개설 신청을 이어서 진행할까요?",
            "placement": "banner",
            "target": ".pd-cta",
            "api": {
              "endpoint": "GET /me",
              "status": 200
            }
          },
          {
            "state": "엣지",
            "trigger": "단시간 반복 가입 시도",
            "guard": "가입·이메일 확인 요청 레이트리밋 초과",
            "result": "일시 차단·토스트 안내",
            "message": "요청이 많아요. 잠시 후 다시 시도해주세요",
            "placement": "toast",
            "target": ".pd-form",
            "api": {
              "endpoint": "POST /auth/signup",
              "status": 429
            }
          },
          {
            "state": "에러",
            "trigger": "제출(입력검증·필수누락)",
            "guard": "이름·이메일·휴대전화·비밀번호 중 미입력",
            "result": "누락 필드 강조·제출 차단",
            "message": "이름·이메일·휴대전화·비밀번호를 모두 입력해주세요",
            "placement": "inline",
            "target": ".pd-form",
            "api": {
              "endpoint": "POST /auth/signup",
              "status": 422
            }
          },
          {
            "state": "에러",
            "trigger": "이메일/휴대전화 입력(입력검증·형식오류)",
            "guard": "이메일 형식 불일치 또는 휴대전화 형식 오류",
            "result": "해당 입력란 아래 인라인 오류",
            "message": "이메일 형식을 확인해주세요(name@example.com) / 휴대전화 형식을 확인해주세요(010-0000-0000)",
            "placement": "inline",
            "target": ".pd-field",
            "api": {
              "endpoint": "POST /auth/signup",
              "status": 400
            }
          },
          {
            "state": "에러",
            "trigger": "비밀번호 입력(입력검증·범위경계)",
            "guard": "비밀번호 8자 미만 또는 비밀번호 확인란 불일치",
            "result": "비밀번호 입력란 아래 인라인 오류·제출 차단",
            "message": "비밀번호는 8자 이상이어야 하고 확인란과 같아야 해요",
            "placement": "inline",
            "target": ".pd-field",
            "api": {
              "endpoint": "POST /auth/signup",
              "status": 400
            }
          },
          {
            "state": "에러",
            "trigger": "이메일 중복 확인/제출(입력검증·중복충돌)",
            "guard": "이미 가입된 이메일(중복)",
            "result": "이메일 입력란 인라인 오류·제출 차단·로그인 유도",
            "message": "이미 가입된 이메일이에요. 로그인하시겠어요?",
            "placement": "inline",
            "target": ".pd-field",
            "api": {
              "endpoint": "GET /auth/email-availability",
              "status": 409
            }
          },
          {
            "state": "에러",
            "trigger": "제출(입력검증·약관 미동의)",
            "guard": "[필수] 서비스 이용약관 또는 개인정보 수집·이용 미체크",
            "result": "제출 차단·필수 동의 체크 요구",
            "message": "[필수] 약관에 모두 동의해야 가입할 수 있어요",
            "placement": "inline",
            "target": ".pd-check",
            "api": {
              "endpoint": "POST /auth/signup",
              "status": 422
            }
          },
          {
            "state": "정상",
            "trigger": "입력검증(유효)",
            "guard": "이름·이메일(중복 없음·형식 유효)·휴대전화(형식 유효)·비밀번호(8자+일치) 입력 + [필수] 약관 동의",
            "result": "가입 버튼 활성·제출 가능 상태",
            "message": "입력이 확인됐어요. 가입하고 교회 개설 신청을 이어갈 수 있어요",
            "placement": "inline",
            "target": ".pd-cta",
            "api": {
              "endpoint": "GET /auth/email-availability",
              "status": 200
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "sessionCheck",
              "intent": "기존 로그인 세션 확인(이미 로그인 시 재진입 처리)",
              "method": "GET",
              "path": "/me",
              "params": "-",
              "response": "{ user, memberships:['{entities.Member}'] } — 세션 있으면 교회 개설 신청 또는 내 교회로 유도",
              "auth": "none(공개)/Bearer(선택)",
              "target": ".pd-cta",
              "errors": [
                {
                  "status": 401,
                  "when": "세션 없음(비로그인)",
                  "message": "정상 — 가입 폼을 그대로 노출"
                }
              ]
            },
            {
              "id": "emailAvailability",
              "intent": "이메일 중복·형식 사용 가능 여부 확인",
              "method": "GET",
              "path": "/auth/email-availability?email={email}",
              "params": "email(검증 대상 이메일)",
              "response": "{ available: boolean } — '{entities.Member}'.email 유일성 검사",
              "auth": "none(공개)",
              "target": ".pd-field",
              "errors": [
                {
                  "status": 400,
                  "when": "이메일 형식 오류",
                  "message": "이메일 형식을 확인해주세요(name@example.com)"
                },
                {
                  "status": 409,
                  "when": "이미 가입된 이메일",
                  "message": "이미 가입된 이메일이에요. 로그인하시겠어요?"
                },
                {
                  "status": 429,
                  "when": "확인 요청 레이트리밋 초과",
                  "message": "요청이 많아요. 잠시 후 다시 시도해주세요"
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "signup",
              "intent": "전역 계정(AppUser) 회원가입 — 이름·이메일·휴대전화·비밀번호 + [필수] 약관 동의",
              "method": "POST",
              "path": "/auth/signup",
              "request": "{ name, email, phone, password, consents:[{type:'terms', agreed:true}, {type:'privacy', agreed:true}] }",
              "response": "{ accessToken(JWT·tenantId claim은 소속/개설 교회 바인딩 후 발급), user } → '{entities.Member}' 전역 계정 생성 + '{entities.Consent}' 동의 기록. 이후 교회 개설 신청(SCR-LND-009) 시 이 계정이 '{entities.OnboardingApplication}'.applicant(관리자)로 연결",
              "auth": "none(공개)",
              "idempotency": "불필요 — 계정 생성은 이메일 유일성(409)으로 중복 방지. 비가역 쓰기(개설 승인·Wizard OPEN·대량발송·요금제·상태 전이)만 Idempotency-Key+confirm 대상. confirm 없음",
              "target": ".pd-cta",
              "errors": [
                {
                  "status": 400,
                  "when": "이메일·휴대전화 형식 오류 또는 비밀번호 8자 미만·확인 불일치",
                  "message": "입력 형식을 확인해주세요(이메일 name@example.com / 비밀번호 8자 이상·확인 일치)"
                },
                {
                  "status": 409,
                  "when": "이미 가입된 이메일(중복)",
                  "message": "이미 가입된 이메일이에요. 로그인하시겠어요?"
                },
                {
                  "status": 422,
                  "when": "필수값 누락 또는 [필수] 약관 미동의",
                  "message": "이름·이메일·휴대전화·비밀번호와 [필수] 약관 동의를 확인해주세요"
                },
                {
                  "status": 429,
                  "when": "가입 시도 레이트리밋 초과",
                  "message": "요청이 많아요. 잠시 후 다시 시도해주세요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "지금 가입이 원활하지 않아요. 잠시 후 다시 시도해주세요"
                }
              ]
            },
            {
              "id": "socialSignup",
              "intent": "소셜 간편 가입(카카오·네이버·구글·Apple) — 소셜 4사 외 아이디 가입과 병행 제공",
              "method": "POST",
              "path": "/auth/social/{provider}",
              "request": "{ provider(kakao|naver|google|apple), authCode }",
              "response": "{ accessToken(JWT), user } → '{entities.Member}' 전역 계정(신규 시 생성)",
              "auth": "none(공개)",
              "idempotency": "불필요 — 세션/계정 발급(비가역 쓰기 아님). confirm 없음",
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 400,
                  "when": "공급자 창 취소·인증 실패",
                  "message": "소셜 가입이 취소되었어요. 다시 시도해주세요"
                },
                {
                  "status": 409,
                  "when": "해당 소셜이 다른 계정에 이미 연결됨",
                  "message": "이미 다른 계정에 연결된 소셜 계정이에요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "지금 가입이 원활하지 않아요. 잠시 후 다시 시도해주세요"
                }
              ]
            }
          ],
          "events": [
            {
              "name": "auth.signup.success",
              "intent": "회원가입 성공",
              "when": "전역 계정 생성·동의 기록 완료(201)",
              "payload": "{ userId, method(password|social) }"
            },
            {
              "name": "auth.signup.failure",
              "intent": "회원가입 실패",
              "when": "형식오류·중복·필수누락·약관미동의·레이트리밋·서버오류로 가입 실패",
              "payload": "{ reason(validation|duplicate_email|missing|consent_required|rate_limit|server) }"
            },
            {
              "name": "auth.email.checked",
              "intent": "이메일 중복 확인 완료",
              "when": "이메일 사용 가능 여부 조회 완료",
              "payload": "{ email, available }"
            },
            {
              "name": "auth.consent.agreed",
              "intent": "약관 동의 기록",
              "when": "[필수] 서비스 이용약관·개인정보 수집·이용 동의 완료",
              "payload": "{ terms:true, privacy:true }"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-LND-009",
              "via": "가입 완료 후 교회 개설 신청 계속(생성 계정을 관리자 계정으로 연결)",
              "trigger": ".pd-cta"
            },
            {
              "screen": "SCR-LND-008",
              "via": "이미 계정이 있으면 로그인",
              "trigger": ".pd-btn"
            }
          ]
        }
      },
      {
        "id": "SCR-LND-014",
        "label": "안내(오류·오프라인)",
        "href": "l-status.html",
        "surface": "landing",
        "entry": false,
        "status": "wireframed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-001"
        ],
        "context": "대표사이트 공용 에러/오프라인/404(재시도·홈·문의).",
        "components": [
          {
            "role": ".pd-gnb",
            "kind": "tabbar",
            "label": "상단 네비(홈·기능·WEB 상품·APP 상품·가격·도입 절차·FAQ·문의 · 로그인 · 교회 개설 신청)",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-001"
            }
          },
          {
            "role": ".pd-empty-state",
            "kind": "banner",
            "label": "안내 상태 — 요청하신 페이지를 열 수 없어요 (없는 페이지 404·오프라인·서버 오류 500 공통 폴백)"
          },
          {
            "role": ".pd-fallback-retry",
            "kind": "button",
            "label": "다시 시도",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-014"
            }
          },
          {
            "role": ".pd-fallback-home",
            "kind": "button",
            "label": "대표사이트 홈으로",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-001"
            }
          },
          {
            "role": ".pd-fallback-contact",
            "kind": "button",
            "label": "문의하기",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-010"
            }
          },
          {
            "role": ".pd-list",
            "kind": "list",
            "label": "자주 찾는 안내 바로가기(기능 소개·가격 안내·도입 절차·자주 묻는 질문·도입 문의)"
          },
          {
            "role": ".pd-banner",
            "kind": "banner",
            "label": "404·오프라인·500 공통 안내 — 문제가 계속되면 문의로 알려 주세요"
          }
        ],
        "description": [
          {
            "text": "상단 네비 — 랜딩 전역 메뉴(홈·기능·WEB 상품·APP 상품·가격·도입 절차·FAQ·문의)와 우측 로그인·교회 개설 신청으로 이동, 로고 클릭 시 대표사이트 홈(SCR-LND-001)으로 복귀한다. 오류·오프라인 화면이라도 네비는 유지되어 사용자가 어디서든 정상 경로로 빠져나갈 수 있다.",
            "target": ".pd-gnb"
          },
          {
            "text": "안내 상태 영역 — www.hurmate.com 플랫폼 공용 폴백으로, 없는 페이지(404)·오프라인(네트워크 끊김)·서버 오류(500)를 하나의 화면에서 공통으로 안내한다. church_id·테넌트와 무관한 대표사이트(landing) 레벨 화면이며, 과장 없이 원인(주소 변경·삭제·연결 끊김·일시 서버 문제) 가능성을 정직하게 알린다.",
            "target": ".pd-empty-state"
          },
          {
            "text": "복구 경로 3종 — '다시 시도'(.pd-fallback-retry)는 원래 요청을 재시도(현재 화면 재진입), '대표사이트 홈으로'(.pd-fallback-home)는 홈(SCR-LND-001), '문의하기'(.pd-fallback-contact)는 문의(SCR-LND-010)로 보낸다. 막다른 화면을 만들지 않도록 재시도·안전 이동·사람 연결의 3경로를 항상 제공한다.",
            "target": ".pd-fallback-retry"
          },
          {
            "text": "자주 찾는 안내 — 기능 소개(SCR-LND-002)·가격 안내(SCR-LND-005)·도입 절차(SCR-LND-006)·자주 묻는 질문(SCR-LND-007)·도입 문의(SCR-LND-010)로 바로 이동하는 고정 바로가기. 404로 길을 잃은 방문자가 찾던 내용을 한 번에 다시 찾도록 돕는다. 요금은 '금액 미확정'으로 정직하게 표기한다.",
            "target": ".pd-list"
          },
          {
            "text": "하단 안내 배너 — 이 화면이 404·오프라인·500에서 공통으로 뜨는 폴백임을 밝히고, 문제가 계속되면 문의로 알려 달라고 안내한다(정직성). 봉인 기능(헌금·교적·출석·커뮤니티·영수증)은 노출하지 않는다.",
            "target": ".pd-banner"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "없는 페이지(404)·오프라인·서버 오류(500)로 폴백 화면 진입",
            "guard": "로그인 불필요(비인증 공개 안내 화면)",
            "result": "안내 상태(요청하신 페이지를 열 수 없어요) + 복구 버튼 3종(다시 시도·대표사이트 홈으로·문의하기) + 자주 찾는 안내 바로가기 노출",
            "message": "요청하신 페이지를 열 수 없어요. 주소가 바뀌었거나 삭제됐을 수 있고, 인터넷 연결이 끊겼거나 일시적인 서버 문제일 수 있어요.",
            "placement": "full-page",
            "target": ".pd-empty-state"
          },
          {
            "state": "로딩",
            "trigger": "'다시 시도' 클릭",
            "guard": "연결·서버 상태 재확인 요청 진행 중(응답 대기)",
            "result": "버튼 비활성화·중복 클릭 차단, 재시도 중 표시",
            "message": "다시 연결하는 중이에요...",
            "placement": "inline",
            "target": ".pd-fallback-retry",
            "api": {
              "endpoint": "GET /public/health"
            }
          },
          {
            "state": "정상",
            "trigger": "'다시 시도' 클릭(연결·서버 복구됨)",
            "guard": "네트워크 연결·플랫폼 정상 응답(200)",
            "result": "원래 요청 페이지를 다시 불러오거나, 복구 불가 시 대표사이트 홈(SCR-LND-001)으로 이동",
            "message": "다시 연결됐어요. 요청하신 내용을 불러올게요",
            "placement": "toast",
            "target": ".pd-fallback-retry",
            "api": {
              "endpoint": "GET /public/health",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "N/A",
            "guard": "빈데이터: 해당 없음 — 조회 목록이 없는 정적 안내 화면(자주 찾는 안내 바로가기는 항상 고정 노출, 표시할 가변 리스트 데이터 없음)",
            "result": "해당 없음"
          },
          {
            "state": "에러",
            "trigger": "'다시 시도' 클릭했으나 여전히 실패",
            "guard": "오프라인 지속 또는 서버 오류·점검 지속(500/503)",
            "result": "안내 유지·재시도 또는 문의 유도, 복구 버튼 재노출",
            "message": "아직 연결하지 못했어요. 잠시 후 다시 시도하거나 문의로 알려 주세요",
            "placement": "banner",
            "target": ".pd-empty-state",
            "api": {
              "endpoint": "GET /public/health",
              "status": 503
            }
          },
          {
            "state": "권한없음",
            "trigger": "N/A",
            "guard": "권한없음: 해당 없음 — 비인증 공개 안내 화면(로그인·권한 게이트 없음, 누구나 접근 가능). 참고로 관리자 화면 권한 없음은 로그인(SCR-ADM-001)으로 유도되나 본 화면은 공개 대상",
            "result": "해당 없음(공개)"
          },
          {
            "state": "엣지",
            "trigger": "오류 유형별 분기(404 vs 오프라인 vs 500)·오래된 북마크/삭제된 교회 주소·반복 재시도",
            "guard": "원인별 카피 분기 필요, 삭제·이전된 교회 slug 접근, 짧은 시간 과도한 재시도(레이트리밋 429)",
            "result": "유형에 맞는 안내로 표시하되 복구 경로(재시도·홈·문의)는 공통 유지, 과도 재시도 시 잠시 후 재시도 안내",
            "message": "요청이 많아요. 잠시 후 다시 시도해 주세요. 없는 교회 주소라면 대표사이트 홈에서 다시 확인해 주세요",
            "placement": "banner",
            "target": ".pd-empty-state",
            "api": {
              "endpoint": "GET /public/health",
              "status": 429
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "connectivityCheck",
              "intent": "연결·서버 상태 확인(재시도)",
              "method": "GET",
              "path": "/public/health",
              "params": "{}",
              "response": "{status:'ok', time}",
              "auth": "none(공개)",
              "target": ".pd-fallback-retry",
              "note": "플랫폼(hurmate.com) 레벨 경량 헬스 프로브 — 비인증 공개 읽기. 테넌트·church_id와 무관하며 공개 콘텐츠만. '다시 시도'는 이 확인이 200이면 원래 요청을 재시도하고, 실패(5xx/네트워크)면 안내를 유지한다. 비가역 쓰기 아님(멱등·확인 모달 불필요).",
              "errors": [
                {
                  "status": 500,
                  "when": "플랫폼 서버 오류",
                  "message": "아직 연결하지 못했어요. 잠시 후 다시 시도해 주세요"
                },
                {
                  "status": 503,
                  "when": "서비스 점검·일시 중단",
                  "message": "지금은 서비스 점검 중이에요. 잠시 후 다시 시도해 주세요"
                },
                {
                  "status": 429,
                  "when": "짧은 시간 과도한 재시도(레이트리밋)",
                  "message": "요청이 많아요. 잠시 후 다시 시도해 주세요"
                }
              ]
            }
          ],
          "writes": [],
          "events": [
            {
              "name": "fallback.shown",
              "when": "없는 페이지(404)·오프라인·서버 오류(500)로 폴백 화면 표시",
              "intent": "오류·오프라인 안내 화면 노출",
              "payload": "{reason:'not_found|offline|server_error', path}"
            },
            {
              "name": "fallback.retry",
              "when": "'다시 시도' 클릭",
              "intent": "원래 요청 재시도",
              "payload": "{reason}"
            },
            {
              "name": "fallback.recovered",
              "when": "재시도 성공(연결·서버 복구)",
              "intent": "폴백에서 정상 복구",
              "payload": "{reason}"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-LND-001",
              "via": "대표사이트 홈으로",
              "trigger": ".pd-fallback-home"
            },
            {
              "screen": "SCR-LND-010",
              "via": "문의하기(사람 연결)",
              "trigger": ".pd-fallback-contact"
            },
            {
              "screen": "SCR-LND-014",
              "via": "다시 시도(원래 요청 재시도·현재 화면 재진입)",
              "trigger": ".pd-fallback-retry"
            },
            {
              "screen": "SCR-LND-002",
              "via": "자주 찾는 안내 — 기능 소개",
              "trigger": ".pd-link-features"
            },
            {
              "screen": "SCR-LND-005",
              "via": "자주 찾는 안내 — 가격 안내",
              "trigger": ".pd-link-pricing"
            },
            {
              "screen": "SCR-LND-006",
              "via": "자주 찾는 안내 — 도입 절차",
              "trigger": ".pd-link-process"
            },
            {
              "screen": "SCR-LND-007",
              "via": "자주 찾는 안내 — 자주 묻는 질문",
              "trigger": ".pd-link-faq"
            },
            {
              "screen": "SCR-LND-010",
              "via": "자주 찾는 안내 — 도입 문의",
              "trigger": ".pd-link-contact"
            }
          ]
        }
      }
    ]
  },
  {
    "category": "교회 공개홈 (site · {slug}.hurmate.com · 방문자)",
    "pages": [
      {
        "id": "SCR-SITE-001",
        "label": "교회 공개홈",
        "href": "s-home.html",
        "surface": "site",
        "entry": true,
        "status": "confirmed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-005",
          "REQ-006"
        ],
        "context": "교회 공개 HOME(§29). 교회 로고·대표이미지(히어로)·예배안내 요약·최근공지·최근설교·이번주 주보 요약. 화이트라벨은 로고/대표색/커버/교회명 4요소만 교회별이고 Layout/Nav/Grid/Typography는 단일 Design System 고정. 방문자용 5메뉴 탭바(HOME·교회소개·설교·주보·공지).",
        "components": [
          {
            "role": ".pd-hero-img",
            "kind": "banner",
            "label": "대표이미지 히어로 — 교회명 ○○교회 · 환영 문구 \"온 땅에 천국 복음을 전하는 교회\""
          },
          {
            "role": ".pd-feature",
            "kind": "card",
            "label": "이번 주 말씀 — 로마서 강해 12 · 조정표 담임목사 · 주일 10:00",
            "action": {
              "on": "click",
              "do": "go:SCR-SITE-003"
            }
          },
          {
            "role": ".pd-list",
            "kind": "list",
            "label": "교회 안내 메뉴 — 처음 오셨나요 · 교회 소개 · 섬기는 사람들 · 설교·찬양 · 교회 소식 · 오시는 길 · 약관·개인정보처리방침",
            "action": {
              "on": "click",
              "do": "go:SCR-SITE-005"
            }
          }
        ],
        "description": [
          {
            "target": ".pd-hero-img",
            "text": "대표이미지 히어로 — 교회명 \"○○교회\"와 환영 문구 \"온 땅에 천국 복음을 전하는 교회\". 교회별 4요소(로고·대표색·커버·교회명)만 교체되고 레이아웃은 단일 Design System 고정(이동 없음, 배너)."
          },
          {
            "text": "\"예배 안내 보기\" 기본 CTA 버튼 — 탭하면 예배 안내(SCR-SITE-003)."
          },
          {
            "target": ".pd-feature",
            "text": "이번 주 말씀 카드 \"로마서 강해 12 · 조정표 담임목사 · 주일 10:00\" — 탭하면 설교 상세(SCR-SITE-006). 섹션 헤더의 \"전체 >\"(.pd-sec-more)는 공개 설교 목록(SCR-SITE-005)."
          },
          {
            "text": "\"처음 오셨나요?\" 안내 행(예배 시간·오시는 길·새가족 안내) — 새가족 안내(SCR-SEAL-S02)는 현재 봉인(준비 중)."
          },
          {
            "text": "교회 안내 메뉴 — 교회 소개(SCR-SITE-002)·오시는 길(SCR-SITE-004)·약관·개인정보처리방침(SCR-SITE-008)·설교·찬양(SCR-SITE-005)은 공개, 섬기는 사람들(SCR-SEAL-S01)·교회 소식(SCR-SEAL-S03)은 봉인."
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "공개 URL 진입(최초)",
            "guard": "캐시 없음·첫 렌더",
            "result": "히어로·이번 주 말씀·메뉴 자리에 스켈레톤 표시",
            "message": "",
            "placement": "inline",
            "target": ".pd-hero-img"
          },
          {
            "state": "로딩",
            "trigger": "공개 홈 집계 데이터 요청",
            "guard": "GET /churches/{slug}/home 응답 대기",
            "result": "상단 교회명 먼저 노출, 본문은 스켈레톤 유지",
            "message": "",
            "placement": "inline",
            "target": ".pd-list"
          },
          {
            "state": "정상",
            "trigger": "집계 응답 수신",
            "guard": "교회 활성(status=활성)·이번 주 말씀 1건 이상",
            "result": "히어로·예배 안내 보기·이번 주 말씀·교회 안내 메뉴 정상 노출",
            "message": "",
            "placement": "inline",
            "target": ".pd-feature",
            "api": {
              "endpoint": "GET /churches/{slug}/home",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "집계 응답 수신",
            "guard": "이번 주 말씀/커버 미등록(0건)",
            "result": "이번 주 말씀 카드 자리에 게재 예정 안내, 메뉴는 정상 노출",
            "message": "이번 주 말씀은 교회 확인 후 게재됩니다",
            "placement": "inline",
            "target": ".pd-feature",
            "api": {
              "endpoint": "GET /churches/{slug}/home",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "집계 응답 수신",
            "guard": "서버 오류(5xx)·네트워크 실패",
            "result": "전체 재시도 안내, 캐시가 있으면 직전 내용 유지",
            "message": "교회 정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.",
            "placement": "full-page",
            "target": ".pd-hero-img",
            "api": {
              "endpoint": "GET /churches/{slug}/home",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "비로그인 방문",
            "guard": "공개 홈은 인증 불요(해당 없음)·입력 폼 없음(입력검증 N/A)",
            "result": "공개 콘텐츠 전량 열람, 주보·공지 등 교인 전용은 홈에 미노출",
            "message": "",
            "placement": "inline",
            "target": ".pd-list"
          },
          {
            "state": "엣지",
            "trigger": "없거나 미개설(status≠활성) 교회 slug 접근 / 봉인 메뉴 탭",
            "guard": "slug 미존재·개설 전, 또는 처음 오셨나요·섬기는 사람들·교회 소식 = feature-flag OFF",
            "result": "미개설 slug는 안내 페이지, 봉인 메뉴는 준비 중 표기",
            "message": "준비 중이거나 찾을 수 없는 교회예요",
            "placement": "full-page",
            "target": ".pd-hero-img",
            "api": {
              "endpoint": "GET /churches/{slug}/home",
              "status": 404
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "siteHome",
              "intent": "공개 홈 집계 조회",
              "method": "GET",
              "path": "/churches/{slug}/home",
              "response": "{entities.Church, entities.Sermon, entities.SiteContent}",
              "auth": "none(공개)",
              "target": ".pd-feature",
              "errors": [
                {
                  "status": 404,
                  "when": "없거나 미개설(status≠활성) 교회 slug",
                  "message": "준비 중이거나 찾을 수 없는 교회예요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "교회 정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요."
                }
              ]
            },
            {
              "id": "pwaManifest",
              "intent": "교회별 PWA manifest 조회",
              "method": "GET",
              "path": "/churches/{slug}/manifest.json",
              "response": "{entities.PwaConfig}",
              "auth": "none(공개)",
              "target": ".pd-hero-img",
              "errors": [
                {
                  "status": 404,
                  "when": "PWA 미구성 교회",
                  "message": "홈 화면 설치 정보를 찾을 수 없어요"
                }
              ]
            }
          ],
          "writes": [],
          "events": [
            {
              "id": "pwaInstallHint",
              "name": "pwa:install-eligible",
              "intent": "PWA 설치 가능 감지",
              "when": "브라우저 beforeinstallprompt 캡처(iOS 16.4+ 홈 화면 설치 조건 안내). 이 목업에는 전용 배너 컴포넌트가 없어 페이지 레벨(.pd-app-body)에서 감지",
              "target": ".pd-app-body"
            },
            {
              "id": "siteMenuOpen",
              "name": "site.menu.open",
              "intent": "전체 메뉴 열기",
              "when": "상단 메뉴 버튼(.pd-iconbtn) 탭",
              "target": ".pd-iconbtn"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-SITE-003",
              "via": "예배 안내"
            },
            {
              "screen": "SCR-SITE-005",
              "via": "설교 목록",
              "trigger": ".pd-list"
            },
            {
              "screen": "SCR-SITE-007",
              "via": "PWA 설치 안내",
              "trigger": ".pd-banner"
            },
            {
              "screen": "SCR-SITE-008",
              "via": "약관·개인정보",
              "trigger": ".pd-legal"
            },
            {
              "screen": "SCR-SITE-002",
              "via": "교회 소개 탭",
              "trigger": ".pd-tabbar"
            }
          ]
        }
      },
      {
        "id": "SCR-SITE-002",
        "label": "교회 소개",
        "href": "s-about.html",
        "surface": "site",
        "status": "confirmed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-010"
        ],
        "context": "교회소개(§30) 허브 — 교회명·담임목사·소개·비전. 예배안내·오시는 길로 링크. 섬기는사람들·새가족·소식 섹션은 봉인(5메뉴 외).",
        "components": [
          {
            "role": ".pd-section-title",
            "kind": "card",
            "label": "섹션 제목 — 비전·연혁"
          }
        ],
        "description": [
          {
            "text": "상단 뒤로가기 — 탭하면 교회 홈으로 복귀(SCR-SITE-001)"
          },
          {
            "text": "대표 이미지 — 교회가 등록한 커버사진을 상단에 노출(관리자 교회소개 콘텐츠 연동, 미등록 시 '교회 확인 후 게재')"
          },
          {
            "text": "비전 — \"온 땅에 천국 복음을 전하는 교회\" 말씀과 기도로 세워지는 공동체(교회가 입력한 소개·비전 본문, 이동 없음)"
          },
          {
            "text": "연혁 — 1985 교회 설립 · 2003 현 성전 입당 · 2020 비전선언 2030(연도별 주요 사건을 목록으로 표기, 별도 상세 화면 없음)"
          },
          {
            "text": "섹션 제목 — '비전'·'연혁' 구분 헤더(관리자 교회소개 콘텐츠에서 관리)",
            "target": ".pd-section-title"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입",
            "guard": "최초 진입·공개 조회 요청 전",
            "result": "기본 레이아웃·대표이미지 자리 표시",
            "message": "",
            "placement": "inline"
          },
          {
            "state": "로딩",
            "trigger": "요청",
            "guard": "교회 소개 응답 대기",
            "result": "비전·연혁 스켈레톤 노출",
            "message": "",
            "placement": "inline"
          },
          {
            "state": "정상",
            "trigger": "응답",
            "guard": "소개·비전 입력됨(status=published)",
            "result": "대표이미지·비전·연혁 노출",
            "message": "",
            "placement": "inline",
            "api": {
              "endpoint": "GET /churches/{slug}/about",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답",
            "guard": "소개·비전·연혁 미등록(빈 콘텐츠)",
            "result": "안내 문구만 노출(기능 유지)",
            "message": "교회 소개는 교회 확인 후 게재됩니다",
            "placement": "inline",
            "api": {
              "endpoint": "GET /churches/{slug}/about",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "응답",
            "guard": "서버 오류(5xx)",
            "result": "재시도 안내",
            "message": "교회 소개를 불러오지 못했어요. 잠시 후 다시 시도해 주세요",
            "placement": "toast",
            "api": {
              "endpoint": "GET /churches/{slug}/about",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "진입",
            "guard": "공개 열람 화면 — 로그인·권한 게이트 없음(해당 없음), 공개 콘텐츠만 노출",
            "result": "모든 방문자에게 공개 콘텐츠 그대로 노출",
            "message": "",
            "placement": "inline"
          },
          {
            "state": "엣지",
            "trigger": "응답",
            "guard": "없는 slug 또는 미개설·일시정지·해지 교회 접근(테넌트 격리)",
            "result": "공개 노출 차단·교회를 찾을 수 없음 안내",
            "message": "요청하신 교회 홈을 찾을 수 없어요",
            "placement": "full-page",
            "api": {
              "endpoint": "GET /churches/{slug}/about",
              "status": 404
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "aboutRead",
              "intent": "교회 소개(비전·연혁) 공개 조회",
              "method": "GET",
              "path": "/churches/{slug}/about",
              "params": "{slug}=교회 식별(진입 Host 서브도메인으로 테넌트 확정)",
              "response": "{entities.SiteContent} (section=about: 소개·비전·연혁 data) + {entities.Church} (name·coverImage·intro)",
              "auth": "none(공개)",
              "errors": [
                {
                  "status": 404,
                  "when": "없는 slug·미개설/일시정지/해지 교회",
                  "message": "요청하신 교회 홈을 찾을 수 없어요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "교회 소개를 불러오지 못했어요. 잠시 후 다시 시도해 주세요"
                }
              ]
            }
          ],
          "writes": [],
          "events": [
            {
              "name": "about.view",
              "intent": "교회 소개 공개 열람(진입)",
              "when": "화면 진입",
              "target": ".pd-app-body"
            },
            {
              "name": "about.back",
              "intent": "뒤로가기 — 교회 홈으로 복귀(SCR-SITE-001)",
              "when": "상단 뒤로가기 탭",
              "target": ".pd-back"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-SITE-003",
              "via": "예배 안내",
              "trigger": ".pd-feature"
            },
            {
              "screen": "SCR-SITE-004",
              "via": "오시는 길",
              "trigger": ".pd-tiles"
            }
          ]
        }
      },
      {
        "id": "SCR-SITE-003",
        "label": "예배 안내",
        "href": "s-worship.html",
        "surface": "site",
        "status": "confirmed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-006"
        ],
        "context": "예배 시간표(주일·수요·금요·새벽) 단순 표. 교회가 입력한 예배 안내를 표로 표시.",
        "components": [
          {
            "role": ".pd-section-title",
            "kind": "banner",
            "label": "예배 시간"
          },
          {
            "role": ".pd-list",
            "kind": "table",
            "label": "부서 안내 (유치부 · 아동부 / 중고등부 · 청년부)"
          }
        ],
        "description": [
          {
            "text": "예배 시간표 — 예배명·시간·장소를 표로 표시(주일 1부 09:00·2부 11:00 본당, 청년예배 주일 14:00 교육관, 수요예배 19:30·금요기도회 21:00 본당). 교회가 입력한 예배 안내 기준"
          },
          {
            "text": "부서 안내 — 유치부·아동부, 중고등부·청년부 부서 목록(부서별 상세 화면은 V1 미제공 — 교회 확인 후 연결)",
            "target": ".pd-list"
          },
          {
            "text": "오시는 길 지도 미리보기 — 교회 주소 기반 키리스 임베드, 탭하면 지도·대중교통·주차 상세(SCR-SITE-004)"
          },
          {
            "text": "주소·연락처 안내 — 교회가 입력한 주소·대표번호 텍스트(미입력 시 '교회 확인 후 게재')"
          },
          {
            "text": "'오시는 길 자세히' 버튼 — 탭하면 오시는 길 상세(SCR-SITE-004)"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입",
            "guard": "최초 진입·조회 요청 전",
            "result": "예배 시간표·부서·지도 영역 스켈레톤 표시",
            "message": "",
            "placement": "inline"
          },
          {
            "state": "로딩",
            "trigger": "조회 중",
            "guard": "예배 안내 응답 대기(네트워크 지연 포함)",
            "result": "표·목록 자리 스켈레톤 유지",
            "message": "",
            "placement": "inline"
          },
          {
            "state": "정상",
            "trigger": "응답",
            "guard": "예배 1건 이상",
            "result": "예배 시간표·부서 안내·오시는 길 미리보기 노출",
            "message": "",
            "placement": "inline",
            "api": {
              "endpoint": "GET /churches/{slug}/site/worship",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답",
            "guard": "예배 0건(교회 미입력)",
            "result": "시간표 숨김·준비 안내 노출",
            "message": "예배 시간은 교회 확인 후 게재될 예정이에요",
            "placement": "inline",
            "api": {
              "endpoint": "GET /churches/{slug}/site/worship",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "응답",
            "guard": "서버 오류(5xx)",
            "result": "재시도 안내",
            "message": "예배 안내를 불러오지 못했어요. 잠시 후 다시 시도해 주세요",
            "placement": "toast",
            "api": {
              "endpoint": "GET /churches/{slug}/site/worship",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "진입",
            "guard": "공개 읽기 화면 — 로그인·권한 불필요(해당 없음). 단 미개설·일시정지 등 비공개 테넌트 또는 잘못된 slug는 공개홈 비노출",
            "result": "공개 콘텐츠로 전원 열람 / 비공개 테넌트는 노출 안 함",
            "message": "아직 공개되지 않은 교회예요. 교회 공개 후 이용할 수 있어요",
            "placement": "full-page",
            "api": {
              "endpoint": "GET /churches/{slug}/site/worship",
              "status": 404
            }
          },
          {
            "state": "엣지",
            "trigger": "렌더",
            "guard": "지도 임베드 로드 실패 또는 주소만 입력(부분 데이터)",
            "result": "지도 영역 숨김·주소/연락처 텍스트만 폴백 노출",
            "message": "지도를 불러오지 못해 주소만 표시해요",
            "placement": "inline"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "siteWorship",
              "intent": "예배 시간표·부서 안내 조회",
              "method": "GET",
              "path": "/churches/{slug}/site/worship",
              "response": "{entities.SiteContent}(section='worship', data={services[]{name,time,place}, departments[]{name}})",
              "auth": "none(공개)",
              "errors": [
                {
                  "status": 404,
                  "when": "미개설·비공개 테넌트 또는 잘못된 slug",
                  "message": "아직 공개되지 않은 교회예요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "예배 안내를 불러오지 못했어요"
                }
              ]
            },
            {
              "id": "siteLocationPreview",
              "intent": "오시는 길 지도·주소 미리보기 조회",
              "method": "GET",
              "path": "/churches/{slug}/site/location",
              "response": "{entities.SiteContent}(section='location', data={address, mapEmbedUrl, phone})",
              "auth": "none(공개)",
              "errors": [
                {
                  "status": 404,
                  "when": "위치 미입력 또는 비공개 테넌트",
                  "message": "오시는 길 정보가 아직 없어요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "오시는 길 정보를 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [],
          "events": [
            {
              "id": "worshipMapTap",
              "name": "worship.map.tap",
              "intent": "오시는 길 지도 탭",
              "when": "지도 미리보기 탭 시 오시는 길 상세(SCR-SITE-004)로 이동",
              "target": ".pd-map"
            },
            {
              "id": "worshipLocationCtaTap",
              "name": "worship.location.cta.tap",
              "intent": "오시는 길 자세히 탭",
              "when": "'오시는 길 자세히' 버튼 탭 시 오시는 길 상세(SCR-SITE-004)로 이동",
              "target": ".pd-btn"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-SITE-002",
              "via": "교회 소개",
              "trigger": ".pd-feature"
            }
          ]
        }
      },
      {
        "id": "SCR-SITE-004",
        "label": "오시는 길",
        "href": "s-location.html",
        "surface": "site",
        "status": "confirmed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-010"
        ],
        "context": "주소·지도(pd-map)·대중교통·주차 안내. 지도는 G3 키리스 임베드(API 키 불필요). 교회가 입력한 주소 기준.",
        "components": [
          {
            "role": ".pd-appbar",
            "kind": "group",
            "label": "상단바"
          },
          {
            "role": ".pd-ab-btn",
            "kind": "group",
            "label": "상단바 좌측 버튼 영역"
          },
          {
            "role": ".pd-back",
            "kind": "group",
            "label": "뒤로가기 — 교회 공개홈으로"
          },
          {
            "role": ".pd-ab-title",
            "kind": "group",
            "label": "화면 제목 '오시는 길'"
          },
          {
            "role": ".pd-ab-spacer",
            "kind": "group",
            "label": "우측 정렬용 여백"
          }
        ],
        "description": [
          {
            "text": "지도 — 교회가 입력한 주소 기반 키리스 임베드로 위치를 표시(별도 API 키·서명 불필요, G3)"
          },
          {
            "text": "주소 안내 카드 — 주소 '경기 동두천시 평화로 2511'와 대중교통·주차 안내 텍스트를 함께 표시"
          },
          {
            "text": "주소 복사 — 탭하면 주소 텍스트를 클립보드에 복사(화면 이동 없음)"
          },
          {
            "text": "상단 뒤로가기 — 교회 공개홈으로 복귀(SCR-SITE-001)",
            "target": ".pd-back"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "화면 진입(요청 전)",
            "guard": "위치 안내 데이터 요청 전",
            "result": "지도 영역·주소 카드 자리에 스켈레톤 플레이스홀더 표시",
            "message": "",
            "placement": "inline"
          },
          {
            "state": "로딩",
            "trigger": "위치 안내 조회 요청",
            "guard": "GET 응답 대기 중",
            "result": "지도 영역·주소 카드 로딩 표시, 주소 복사 버튼 비활성",
            "message": "",
            "placement": "inline",
            "api": {
              "endpoint": "GET /churches/{slug}/contents/location",
              "status": "요청중"
            }
          },
          {
            "state": "정상",
            "trigger": "조회 응답",
            "guard": "section=location · status=published · 주소 존재",
            "result": "지도 임베드·주소·대중교통·주차 노출, 주소 복사 버튼 활성",
            "message": "",
            "placement": "inline",
            "api": {
              "endpoint": "GET /churches/{slug}/contents/location",
              "status": 200
            }
          },
          {
            "state": "정상",
            "trigger": "'주소 복사' 버튼 탭",
            "guard": "주소 텍스트 존재",
            "result": "주소를 클립보드에 복사(서버 호출·화면 이동 없음)",
            "message": "주소가 복사되었어요",
            "placement": "toast",
            "api": {
              "endpoint": "클라이언트 클립보드(navigator.clipboard.writeText)",
              "status": "N/A(서버 호출 없음)"
            }
          },
          {
            "state": "빈데이터",
            "trigger": "조회 응답",
            "guard": "주소 미입력(section 미발행·data 비어있음)",
            "result": "지도 숨김, 준비중 안내 표시, 주소 복사 버튼 비활성",
            "message": "오시는 길 정보는 교회 확인 후 게재될 예정이에요",
            "placement": "inline",
            "api": {
              "endpoint": "GET /churches/{slug}/contents/location",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "조회 응답",
            "guard": "서버 오류(5xx)",
            "result": "오류 안내 배너·다시 시도 유도",
            "message": "오시는 길 정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요",
            "placement": "banner",
            "api": {
              "endpoint": "GET /churches/{slug}/contents/location",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "화면 진입",
            "guard": "비인증 공개 읽기 — 로그인·개인 권한 불필요(엣지: 해당 없음). 테넌트 격리는 Host/{slug}로 자동 적용",
            "result": "누구나 열람 가능(개인 권한 제한 없음)",
            "message": "",
            "placement": "inline",
            "api": {
              "endpoint": "GET /churches/{slug}/contents/location",
              "status": 200
            }
          },
          {
            "state": "엣지",
            "trigger": "지도 렌더",
            "guard": "지도 iframe 로드 실패(네트워크·CSP 차단)",
            "result": "지도 숨김, 주소·교통·주차 텍스트만 표시(폴백)",
            "message": "지도를 불러오지 못해 주소만 표시해요",
            "placement": "inline"
          },
          {
            "state": "엣지",
            "trigger": "조회 응답",
            "guard": "{slug} 미존재 또는 교회 서비스 상태 일시정지/해지",
            "result": "교회 페이지 없음·이용 불가 안내(공개홈 비활성)",
            "message": "요청하신 교회 페이지를 찾을 수 없어요",
            "placement": "full-page",
            "api": {
              "endpoint": "GET /churches/{slug}/contents/location",
              "status": 404
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "siteLocation",
              "intent": "위치 안내 조회",
              "method": "GET",
              "path": "/churches/{slug}/contents/location",
              "params": "{slug}(path·Host→테넌트 확정), section=location",
              "response": "'{entities.SiteContent}' — section=location, data={address, transit, parking, lat, lng, mapEmbedUrl}, status",
              "auth": "none(공개)",
              "errors": [
                {
                  "status": 404,
                  "when": "{slug} 미존재 또는 교회 서비스 일시정지/해지(공개홈 비활성)",
                  "message": "요청하신 교회 페이지를 찾을 수 없어요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "오시는 길 정보를 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [],
          "events": [
            {
              "name": "address.copy",
              "intent": "주소 복사",
              "when": "'주소 복사' 버튼 탭",
              "target": ".pd-btn",
              "result": "주소 텍스트를 클립보드에 복사 + toast '주소가 복사되었어요'(서버 쓰기 없음)"
            },
            {
              "name": "map.load_error",
              "intent": "지도 임베드 로드 실패",
              "when": "지도 iframe 로드 실패(네트워크·CSP)",
              "target": ".pd-map-full",
              "result": "지도 숨김·주소 텍스트 폴백 표시"
            },
            {
              "name": "nav.back",
              "intent": "뒤로가기(공개홈)",
              "when": "상단 뒤로가기 탭",
              "target": ".pd-back",
              "result": "교회 공개홈(SCR-SITE-001)으로 이동"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-SITE-002",
              "via": "교회 소개",
              "trigger": ".pd-tabbar"
            }
          ]
        }
      },
      {
        "id": "SCR-SITE-005",
        "label": "설교",
        "href": "s-sermons.html",
        "surface": "site",
        "status": "confirmed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-007"
        ],
        "context": "공개 설교 목록(YouTube 썸네일·제목·설교자·날짜). 자체 영상 저장 없음(YouTube 링크/임베드만). 방문자 열람 가능.",
        "components": [
          {
            "role": ".pd-list",
            "kind": "list",
            "label": "설교 목록 — 썸네일·제목·설교자·날짜(로마서 강해 12 · 09-27 · 조정표)",
            "action": {
              "on": "click",
              "do": "go:SCR-SITE-006"
            }
          }
        ],
        "description": [
          {
            "text": "주일설교·청년·찬양 탭 — 탭 선택 시 해당 카테고리의 설교만 노출(화면 내 전환, 기본 탭=주일설교)"
          },
          {
            "text": "설교 목록 — YouTube 썸네일·제목·설교자·날짜(예: 로마서 강해 12 · 09-27 · 조정표), 탭하면 설교 상세·재생으로 이동(SCR-SITE-006)",
            "target": ".pd-list"
          },
          {
            "text": "자체 영상 저장 없이 YouTube 메타데이터(썸네일·제목·날짜)만 노출 — 실제 재생은 상세 화면에서 임베드(SCR-SITE-006)",
            "target": ".pd-list"
          },
          {
            "text": "상단 뒤로가기 — 교회 공개홈으로 복귀(SCR-SITE-001)"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "화면 진입",
            "guard": "기본 탭=주일설교 선택, 목록 미요청",
            "result": "주일설교 탭 활성·목록 영역 비움",
            "message": "",
            "placement": "inline",
            "target": ".pd-list"
          },
          {
            "state": "로딩",
            "trigger": "진입·탭 전환",
            "guard": "공개 설교 목록 조회 중",
            "result": "카드 스켈레톤 표시",
            "message": "",
            "placement": "inline",
            "target": ".pd-list"
          },
          {
            "state": "정상",
            "trigger": "응답 수신",
            "guard": "해당 탭 설교 1건 이상",
            "result": "썸네일·제목·설교자·날짜 카드 목록 노출",
            "message": "",
            "placement": "inline",
            "target": ".pd-list",
            "api": {
              "endpoint": "GET /churches/{slug}/sermons",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답 수신",
            "guard": "해당 탭 설교 0건",
            "result": "준비중 안내 노출",
            "message": "아직 등록된 설교가 없어요. 교회 확인 후 게재됩니다.",
            "placement": "inline",
            "target": ".pd-list",
            "api": {
              "endpoint": "GET /churches/{slug}/sermons",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "응답 수신",
            "guard": "서버 오류·네트워크 실패",
            "result": "재시도 안내 노출",
            "message": "설교 목록을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.",
            "placement": "toast",
            "target": ".pd-list",
            "api": {
              "endpoint": "GET /churches/{slug}/sermons",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "화면 진입",
            "guard": "공개 열람 화면 — 인증 불필요(권한없음 해당 없음)",
            "result": "로그인 없이 공개 설교만 노출",
            "message": "",
            "placement": "inline",
            "target": ".pd-list"
          },
          {
            "state": "엣지",
            "trigger": "응답 수신",
            "guard": "교회가 YouTube URL만 등록·썸네일 미확보",
            "result": "기본 썸네일(.pd-thumb)로 대체 표시",
            "message": "",
            "placement": "inline",
            "target": ".pd-list"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "publicSermons",
              "intent": "공개 설교 목록 조회",
              "method": "GET",
              "path": "/churches/{slug}/sermons",
              "params": "category(주일설교·청년·찬양 탭 필터), cursor, limit=20",
              "response": "{entities.Sermon}[] — title·preacher·date·youtubeUrl·thumbnail",
              "auth": "none(공개)",
              "target": ".pd-list",
              "errors": [
                {
                  "status": 404,
                  "when": "존재하지 않는 교회 slug",
                  "message": "교회 공개홈을 찾을 수 없어요."
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "설교 목록을 불러오지 못했어요. 잠시 후 다시 시도해 주세요."
                }
              ]
            }
          ],
          "writes": [],
          "events": [
            {
              "name": "sermon.tab.switch",
              "when": "주일설교·청년·찬양 탭 선택",
              "intent": "설교 카테고리 탭 전환(화면 내)",
              "target": ".pd-segment"
            },
            {
              "name": "sermon.row.open",
              "when": "설교 행 탭",
              "intent": "설교 상세·재생 화면으로 이동(SCR-SITE-006)",
              "target": ".pd-list"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-SITE-006",
              "via": "설교 상세·재생",
              "trigger": ".pd-list"
            }
          ]
        }
      },
      {
        "id": "SCR-SITE-006",
        "label": "공개 설교 상세",
        "href": "s-sermon-detail.html",
        "surface": "site",
        "status": "confirmed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-007"
        ],
        "context": "설교 상세 — YouTube 임베드 플레이어(pd-player)·성경본문·설명. 자체 스트리밍 없음.",
        "components": [
          {
            "role": ".pd-player",
            "kind": "card",
            "label": "설교 영상 플레이어 — 로마서 강해 12 (YouTube 임베드 재생)"
          },
          {
            "role": ".pd-row",
            "kind": "list",
            "label": "지난 설교 행 — 로마서 강해 11 · 09-20"
          }
        ],
        "description": [
          {
            "text": "설교 영상 플레이어 — 교회가 등록한 YouTube 영상을 임베드로 재생합니다(자체 영상 저장 없음). 썸네일을 누르면 바로 재생됩니다.",
            "target": ".pd-player"
          },
          {
            "text": "제목·설교자·날짜·본문 — '로마서 강해 12 · 조정표 담임목사 · 2026-09-27'과 본문 '로마서 12:1-2'·설명을 함께 표시합니다. 비로그인도 열람할 수 있는 공개 설교입니다."
          },
          {
            "text": "유튜브에서 보기 — YouTube 앱/웹에서 원본 영상을 엽니다(외부 이동)."
          },
          {
            "text": "지난 설교 — 같은 교회의 이전 설교 목록, 탭하면 해당 설교 상세로 이동합니다(SCR-SITE-006).",
            "target": ".pd-row"
          },
          {
            "text": "상단 뒤로가기 — '설교·찬양' 목록으로 복귀합니다(SCR-SITE-005)."
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "화면 진입",
            "guard": "상세 데이터 요청 전",
            "result": "플레이어·제목·본문 영역 스켈레톤 표시",
            "message": "",
            "placement": "inline",
            "target": ".pd-player"
          },
          {
            "state": "로딩",
            "trigger": "설교 상세 조회 요청",
            "guard": "GET /churches/{slug}/sermons/{id} 응답 대기",
            "result": "스켈레톤 유지·썸네일 자리 로딩 표시",
            "message": "",
            "placement": "inline",
            "target": ".pd-player"
          },
          {
            "state": "정상",
            "trigger": "조회 응답 성공",
            "guard": "설교 존재·공개",
            "result": "YouTube 임베드 재생 가능 + 제목·설교자·날짜·본문·설명·지난 설교 노출",
            "message": "",
            "placement": "inline",
            "target": ".pd-player",
            "api": {
              "endpoint": "GET /churches/{slug}/sermons/{id}",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "지난 설교 목록 조회 응답",
            "guard": "같은 교회 다른 설교 0건",
            "result": "지난 설교 영역 비표시 + 안내 문구",
            "message": "지난 설교 영상이 아직 없어요.",
            "placement": "inline",
            "target": ".pd-row",
            "api": {
              "endpoint": "GET /churches/{slug}/sermons?cursor=&limit=20",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "본문·설명 필드 비어있음",
            "guard": "교회가 본문/설명 미입력",
            "result": "미확보 콘텐츠 정직성 안내로 대체",
            "message": "본문·설명은 교회 확인 후 게재됩니다.",
            "placement": "inline"
          },
          {
            "state": "에러",
            "trigger": "조회 응답 실패",
            "guard": "서버 오류(5xx)",
            "result": "재시도 안내 + 목록 복귀 유도",
            "message": "설교를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.",
            "placement": "toast",
            "target": ".pd-player",
            "api": {
              "endpoint": "GET /churches/{slug}/sermons/{id}",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "비로그인 방문",
            "guard": "공개 콘텐츠 — 비로그인 열람 허용(인증 불필요)",
            "result": "로그인 없이 정상 열람 (제한 없음)",
            "message": "비로그인도 열람할 수 있는 공개 설교입니다.",
            "placement": "inline",
            "target": ".pd-player"
          },
          {
            "state": "엣지",
            "trigger": "YouTube 재생 시도",
            "guard": "원본 영상 삭제·비공개·지역차단",
            "result": "플레이어 내 재생 불가 안내 + 유튜브에서 보기/교회 문의 유도",
            "message": "이 설교 영상을 재생할 수 없어요. 교회에 문의해 주세요.",
            "placement": "inline",
            "target": ".pd-player"
          },
          {
            "state": "엣지",
            "trigger": "존재하지 않는 설교 ID 접근",
            "guard": "설교 없음·비공개(404)",
            "result": "안내 후 설교 목록 복귀 유도",
            "message": "설교를 찾을 수 없어요. 설교 목록에서 다시 선택해 주세요.",
            "placement": "full-page",
            "target": ".pd-player",
            "api": {
              "endpoint": "GET /churches/{slug}/sermons/{id}",
              "status": 404
            }
          },
          {
            "state": "엣지",
            "trigger": "테넌트 상태 확인",
            "guard": "교회 서비스 일시정지·해지(비활성 테넌트)",
            "result": "공개 접근 차단 + 안내",
            "message": "현재 이용할 수 없는 교회 홈이에요.",
            "placement": "full-page",
            "target": ".pd-player",
            "api": {
              "endpoint": "GET /churches/{slug}/sermons/{id}",
              "status": 404
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "siteSermonDetail",
              "intent": "공개 설교 상세 조회",
              "method": "GET",
              "path": "/churches/{slug}/sermons/{id}",
              "params": "{slug}=Host 서브도메인(테넌트 식별), {id}=설교 ID",
              "response": "{entities.Sermon}{title, preacher, date, scripture, description, youtubeUrl, thumbnail}",
              "auth": "none(공개)",
              "target": ".pd-player",
              "errors": [
                {
                  "status": 404,
                  "when": "설교 없음·비공개·비활성 테넌트",
                  "message": "설교를 찾을 수 없어요."
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "설교를 불러오지 못했어요. 잠시 후 다시 시도해 주세요."
                }
              ]
            },
            {
              "id": "siteRelatedSermons",
              "intent": "지난 설교 목록 조회",
              "method": "GET",
              "path": "/churches/{slug}/sermons?cursor=&limit=20",
              "params": "cursor 커서 페이지네이션·limit=20",
              "response": "{entities.Sermon[]}{title, date, thumbnail}",
              "auth": "none(공개)",
              "target": ".pd-row",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "지난 설교를 불러오지 못했어요."
                }
              ]
            }
          ],
          "writes": [],
          "events": [
            {
              "name": "sermon.detail.view",
              "intent": "설교 상세 열람",
              "when": "설교 상세 화면 진입",
              "target": ".pd-player"
            },
            {
              "name": "sermon.youtube.open",
              "intent": "유튜브에서 보기 클릭",
              "when": "유튜브에서 보기 버튼 탭",
              "target": ".pd-btn"
            },
            {
              "name": "sermon.related.open",
              "intent": "지난 설교 행 선택",
              "when": "지난 설교 행 탭",
              "target": ".pd-row"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-SITE-005",
              "via": "목록으로",
              "trigger": ".pd-apptop"
            }
          ]
        }
      },
      {
        "id": "SCR-SITE-007",
        "label": "PWA 설치 안내",
        "href": "s-install.html",
        "surface": "site",
        "status": "wireframed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-013"
        ],
        "context": "'우리 교회 앱처럼 이용하세요' 홈 화면 설치 안내. Android=설치 프롬프트 버튼(beforeinstallprompt) / iOS 16.4+=공유→홈 화면에 추가 수동 단계 안내. 설치 시 교회 로고+교회명 아이콘(PwaConfig 기반). Web Push는 iOS 16.4+ 홈설치 PWA에서만 수신.",
        "components": [
          {
            "role": ".pd-hero-img",
            "kind": "banner",
            "label": "우리 교회 앱처럼 이용하세요"
          },
          {
            "role": ".pd-stepper",
            "kind": "stepper",
            "label": "iPhone · Safari: 공유 버튼 탭 → 홈 화면에 추가 → 추가 확인"
          },
          {
            "role": ".pd-feature",
            "kind": "card",
            "label": "설치 아이콘 미리보기 — ○○교회 로고·교회명"
          }
        ],
        "description": [
          {
            "text": "홈 화면 설치 소개 — 히어로 '우리 교회 앱처럼 이용하세요' + 설치 혜택(아이콘 한 번으로 바로 열기)·교회 로고·교회명 추가·단일 디자인 시스템 통일·네이티브 앱(스토어) 차기 제공 안내",
            "target": ".pd-hero-img"
          },
          {
            "text": "설치 버튼(Android · Chrome) — 브라우저가 설치 가능 시점(beforeinstallprompt)을 알릴 때 활성, 탭하면 브라우저 기본 설치 프롬프트가 뜸(화면 이동 없음)"
          },
          {
            "text": "iPhone · Safari 수동 단계 — 설치형 버튼 미지원, 공유 버튼 탭 → 홈 화면에 추가 → 추가 확인 3단계 안내(iOS 16.4+)",
            "target": ".pd-stepper"
          },
          {
            "text": "설치 아이콘 미리보기 — 홈 화면에 교회 로고·교회명(○○교회)으로 추가(PwaConfig), 실제 아이콘·시작화면 미설정 시 '교회 확인 후 게재' 표기",
            "target": ".pd-feature"
          },
          {
            "text": "뒤로 — 교회 공개홈으로 복귀(SCR-SITE-001)"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입(최초 렌더)",
            "guard": "manifest 조회 전·브라우저 설치 가능 신호 대기",
            "result": "히어로·안내 노출, 아이콘 미리보기는 ○○교회 자리표시, 설치 버튼 비활성",
            "message": "",
            "placement": "inline",
            "target": ".pd-feature"
          },
          {
            "state": "로딩",
            "trigger": "진입",
            "guard": "PWA manifest 조회 중",
            "result": "아이콘 미리보기 영역 스켈레톤 표시",
            "message": "설치 정보를 불러오는 중이에요",
            "placement": "inline",
            "target": ".pd-feature"
          },
          {
            "state": "정상",
            "trigger": "진입",
            "guard": "Android/Chromium + beforeinstallprompt 캡처 + manifest 로드 완료",
            "result": "설치 버튼 활성, 아이콘 미리보기에 교회 로고·교회명 표시, iOS 단계는 보조 안내로 유지",
            "message": "",
            "placement": "inline",
            "api": {
              "endpoint": "GET /churches/{slug}/manifest.json",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답",
            "guard": "PwaConfig 아이콘·시작화면 미설정(교회 설정 전)",
            "result": "기본 자리표시·게재 예정 안내 노출",
            "message": "실제 아이콘·시작화면은 교회 설정 확인 후 게재돼요",
            "placement": "inline",
            "target": ".pd-feature",
            "api": {
              "endpoint": "GET /churches/{slug}/manifest.json",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "응답",
            "guard": "manifest 조회 서버 오류·네트워크 실패",
            "result": "재시도 안내 노출",
            "message": "설치 정보를 불러오지 못했어요",
            "placement": "toast",
            "target": ".pd-feature",
            "api": {
              "endpoint": "GET /churches/{slug}/manifest.json",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "진입",
            "guard": "권한없음: 해당 없음(비인증 공개 설치 안내 — 로그인 불필요)",
            "result": "모든 방문자에게 공개 노출",
            "message": "",
            "placement": "inline"
          },
          {
            "state": "엣지",
            "trigger": "진입",
            "guard": "iOS 16.4+ Safari(설치형 버튼 미지원)",
            "result": "설치 버튼 숨김·수동 단계 안내 노출",
            "message": "공유 버튼을 눌러 '홈 화면에 추가'를 선택하세요",
            "placement": "inline",
            "target": ".pd-stepper"
          },
          {
            "state": "엣지",
            "trigger": "진입",
            "guard": "이미 설치됨(standalone 모드로 실행)",
            "result": "설치 영역 숨김·바로 열기 안내",
            "message": "이미 홈 화면에 설치되어 있어요",
            "placement": "inline"
          },
          {
            "state": "엣지",
            "trigger": "진입",
            "guard": "iOS 16.4 미만·설치/Web Push 미지원 브라우저",
            "result": "설치·알림 제한 안내",
            "message": "이 브라우저에서는 설치와 알림이 제한돼요",
            "placement": "banner"
          },
          {
            "state": "엣지",
            "trigger": "응답",
            "guard": "잘못된 slug·교회 미개설(404)",
            "result": "설치 정보 없음 안내",
            "message": "설치 정보를 찾을 수 없어요",
            "placement": "full-page",
            "target": ".pd-feature",
            "api": {
              "endpoint": "GET /churches/{slug}/manifest.json",
              "status": 404
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "pwaManifest",
              "intent": "PWA 설치 메타(아이콘·교회명·테마) 조회",
              "method": "GET",
              "path": "/churches/{slug}/manifest.json",
              "response": "{entities.PwaConfig}",
              "auth": "none(공개)",
              "target": ".pd-feature",
              "errors": [
                {
                  "status": 404,
                  "when": "잘못된 slug·교회 미개설",
                  "message": "설치 정보를 찾을 수 없어요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "설치 정보를 불러오지 못했어요"
                }
              ]
            },
            {
              "id": "channelConfig",
              "intent": "채널 설정(Web Push 가능 여부) 조회 — 알림 안내 섹션 노출 판단",
              "method": "GET",
              "path": "/churches/{slug}/channels",
              "response": "{entities.ChannelConfig}",
              "auth": "none(공개)",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "알림 설정을 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [],
          "events": [
            {
              "id": "beforeinstallprompt",
              "name": "beforeinstallprompt",
              "intent": "브라우저가 설치 가능 시점을 알릴 때 → 설치 버튼 활성화",
              "when": "설치 가능 시점(Android/Chromium)",
              "target": ".pd-btn"
            },
            {
              "id": "appinstalled",
              "name": "appinstalled",
              "intent": "홈 화면 설치 완료 → '이미 설치됨' 상태로 전환",
              "when": "홈 화면 설치 완료",
              "target": ".pd-btn"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-SITE-001",
              "via": "홈으로",
              "trigger": ".pd-tabbar"
            }
          ]
        }
      },
      {
        "id": "SCR-SITE-008",
        "label": "약관·개인정보처리방침",
        "href": "s-terms.html",
        "surface": "site",
        "status": "confirmed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-011"
        ],
        "context": "이용약관·개인정보처리방침(pd-legal). 교회 검색 없는 가입(church_id 자동) 시 동의 연계. '교회 확정·법률검토 후 게시' 배너로 초안 상태 표기.",
        "components": [
          {
            "role": ".pd-legal",
            "kind": "list",
            "label": "이용약관·개인정보처리방침 본문(탭 전환 열람)"
          }
        ],
        "description": [
          {
            "text": "상단 앱바 뒤로가기 — 약관·방침 열람을 닫고 공개홈 홈으로 복귀(SCR-SITE-001)"
          },
          {
            "text": "이용약관·개인정보처리방침 탭 세그먼트 — 두 문서를 탭으로 전환해 열람(기본 선택: 이용약관)"
          },
          {
            "text": "이용약관 본문 — 목적(제1조)·서비스 범위(제2조: 예배·설교·공지·주보 서비스(교인 Web/PWA))·이용자 의무(제3조)·면책(제4조)을 조문별로 열람",
            "target": ".pd-legal"
          },
          {
            "text": "개인정보처리방침 본문 — 수집 항목·이용 목적·보유 기간·권리 행사(열람·정정·삭제·처리정지)를 안내하며, church_id 자동 바인딩(교회검색 없는 가입)의 동의 내용과 동일 기준으로 연계",
            "target": ".pd-legal"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "화면 진입(약관·방침 로드)",
            "guard": "status=draft(교회 확정·법률 검토 전 초안)",
            "result": "초안 안내 배너 노출, 본문은 임시 표기",
            "message": "약관·개인정보처리방침은 교회 확정과 법률 검토를 거쳐 정식 게시돼요. 지금 보이는 내용은 초안이에요.",
            "placement": "banner",
            "target": ".pd-legal",
            "api": {
              "endpoint": "GET /churches/{slug}/legal",
              "status": 200
            }
          },
          {
            "state": "로딩",
            "trigger": "약관·방침 요청 중",
            "guard": "요청 응답 대기(네트워크 지연)",
            "result": "본문 영역 스켈레톤 표시, 탭 전환 일시 비활성",
            "message": "약관을 불러오는 중이에요",
            "placement": "inline",
            "target": ".pd-legal"
          },
          {
            "state": "정상",
            "trigger": "응답 수신",
            "guard": "status=published(교회 확정·게시 완료)",
            "result": "선택 탭(이용약관/개인정보처리방침) 본문 노출",
            "message": "",
            "target": ".pd-legal",
            "api": {
              "endpoint": "GET /churches/{slug}/legal",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답 수신",
            "guard": "교회가 약관·방침을 아직 등록하지 않음(terms·privacy 비어있음)",
            "result": "빈 상태 안내 노출, 교회 확인 유도",
            "message": "아직 등록된 약관·방침이 없어요. 교회 확인 후 게재됩니다.",
            "placement": "inline",
            "target": ".pd-legal",
            "api": {
              "endpoint": "GET /churches/{slug}/legal",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "응답 실패",
            "guard": "서버 오류(5xx)",
            "result": "재시도 안내·버튼 노출",
            "message": "약관을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.",
            "placement": "inline",
            "target": ".pd-legal",
            "api": {
              "endpoint": "GET /churches/{slug}/legal",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "비로그인 사용자 접근",
            "guard": "권한없음: 해당 없음 — 공개 열람 화면(비인증 전체 허용, church_id는 Host/slug로 자동 확정). 입력 폼 없음 → 입력검증 N/A",
            "result": "로그인 없이 약관·방침 전체 열람 허용",
            "message": "",
            "target": ".pd-legal"
          },
          {
            "state": "엣지",
            "trigger": "개인정보처리방침 탭 전환",
            "guard": "한 문서만 게시(예: 이용약관 published·개인정보처리방침 draft) — 탭별 상태 혼재",
            "result": "탭별로 게시/초안 상태를 각각 표기(미게시 탭은 초안 안내)",
            "message": "개인정보처리방침은 교회 확정·법률 검토 후 게시될 예정이에요. 이용약관을 먼저 확인해 주세요.",
            "placement": "inline",
            "target": ".pd-legal",
            "api": {
              "endpoint": "GET /churches/{slug}/legal",
              "status": 200
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "siteLegal",
              "intent": "약관·개인정보처리방침 조회",
              "method": "GET",
              "path": "/churches/{slug}/legal",
              "response": "{ terms, privacy, status: draft|published } — 약관·방침 게시 콘텐츠('{entities.SiteContent}' status 모델 준용)",
              "auth": "none(공개)",
              "target": ".pd-legal",
              "errors": [
                {
                  "status": 404,
                  "when": "slug이 유효한 교회로 확인되지 않음(미개설·해지 테넌트)",
                  "message": "요청하신 교회를 찾을 수 없어요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "약관을 불러오지 못했어요. 잠시 후 다시 시도해 주세요."
                }
              ]
            }
          ],
          "writes": [],
          "events": [
            {
              "name": "legal.tab.switch",
              "intent": "약관/개인정보처리방침 탭 전환",
              "when": "탭 세그먼트에서 다른 문서 선택 시",
              "target": ".pd-segment"
            },
            {
              "name": "legal.view",
              "intent": "약관·방침 열람 집계",
              "when": "약관·방침 본문이 노출될 때",
              "target": ".pd-legal"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-SITE-001",
              "via": "홈으로",
              "trigger": ".pd-tabbar"
            }
          ]
        }
      },
      {
        "id": "SCR-SITE-009",
        "label": "안내(오프라인·없는 교회·오류)",
        "href": "s-status.html",
        "surface": "site",
        "entry": false,
        "status": "wireframed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-005"
        ],
        "context": "테넌트 공용 상태 폴백(없는 교회 404·서버오류 500·오프라인·빈데이터) — 원인+다음행동(재시도/홈).",
        "components": [
          {
            "role": ".pd-top-home",
            "kind": "iconbutton",
            "label": "상단 홈 아이콘 — ○○교회 공개홈으로",
            "action": {
              "on": "click",
              "do": "go:SCR-SITE-001"
            }
          },
          {
            "role": ".pd-empty-state",
            "kind": "empty",
            "label": "공용 폴백 안내 — \"지금은 내용을 불러올 수 없어요\" · 원인(없는 교회·서버오류·오프라인·빈데이터)+다음 행동(다시 시도/홈으로)"
          },
          {
            "role": ".pd-fallback-retry",
            "kind": "button",
            "label": "다시 시도 — 같은 리소스 재요청(동일 화면 재진입)",
            "action": {
              "on": "click",
              "do": "go:SCR-SITE-009"
            }
          },
          {
            "role": ".pd-fallback-home",
            "kind": "button",
            "label": "홈으로 가기 — 교회 공개홈",
            "action": {
              "on": "click",
              "do": "go:SCR-SITE-001"
            }
          },
          {
            "role": ".pd-cache-bulletin",
            "kind": "row",
            "label": "오프라인 캐시 주보 — 이번 주(10/5) 예배 순서 · 오프라인 저장(로그인 교인)",
            "action": {
              "on": "click",
              "do": "go:SCR-APP-004"
            }
          },
          {
            "role": ".pd-cache-sermon",
            "kind": "row",
            "label": "오프라인 캐시 설교 — 로마서 강해 12 · 조정표 담임목사(로그인 교인)",
            "action": {
              "on": "click",
              "do": "go:SCR-APP-002"
            }
          },
          {
            "role": ".pd-banner",
            "kind": "banner",
            "label": "저장 콘텐츠 최신성 고지 — \"마지막 접속 시점 기준 · 최신 내용은 연결 후 확인\""
          }
        ],
        "description": [
          {
            "target": ".pd-empty-state",
            "text": "전 테넌트 공용 폴백(pd-empty-state). 없는 교회(404)·서버오류(500)·오프라인·빈데이터를 각각 사람이 읽을 한 문장 '원인'으로 설명하고, 바로 아래 '다음 행동'(다시 시도/홈으로)을 제시한다. 레이아웃은 단일 Design System 고정, 교회별로 바뀌는 건 교회명 \"○○교회\"뿐."
          },
          {
            "target": ".pd-fallback-retry",
            "text": "\"다시 시도\" 기본 CTA — 실패한 동일 리소스를 재요청(같은 화면 재진입). 서버오류·오프라인이 복구되면 원래 보려던 화면으로 자연스럽게 이어진다. 오프라인 상태에서는 이 버튼을 우선 강조한다."
          },
          {
            "target": ".pd-fallback-home",
            "text": "\"홈으로 가기\" — 교회 공개홈(SCR-SITE-001)으로 이동. 없는 교회(404)·빈데이터처럼 재시도가 의미 없을 때 가장 안전한 복귀 경로다."
          },
          {
            "target": ".pd-cache-bulletin",
            "text": "로그인 교인 한정 — 서비스워커에 오프라인 저장된 최근 주보·설교(이번 주 10/5 예배 순서 · 로마서 강해 12)를 노출해 연결이 끊겨도 핵심 콘텐츠를 볼 수 있게 한다. 비로그인이거나 캐시가 없으면 이 섹션은 숨긴다."
          },
          {
            "target": ".pd-banner",
            "text": "정직성 고지 — 캐시 콘텐츠는 '마지막 접속 시점' 기준이며 최신이 아닐 수 있음을 명시한다(최신성 한계 고지, 과장 없음)."
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "상위 화면(공개홈/소개/설교 등) 요청 실패 또는 라우터가 폴백으로 전환",
            "guard": "원인 코드 수신 전·첫 렌더·입력 폼 없음(입력검증 N/A)",
            "result": "공용 폴백 레이아웃(아이콘·안내 문구·다시 시도·홈으로)을 즉시 렌더, 원인 문구는 중립 기본값으로 표시",
            "message": "",
            "placement": "inline",
            "target": ".pd-empty-state"
          },
          {
            "state": "로딩",
            "trigger": "\"다시 시도\"(.pd-fallback-retry) 탭",
            "guard": "동일 리소스 재요청 응답 대기·중복 탭 비활성화",
            "result": "다시 시도 버튼이 로딩 표시로 바뀌고 기존 안내는 유지, 성공 시 원래 화면으로 전환",
            "message": "다시 불러오는 중이에요…",
            "placement": "inline",
            "target": ".pd-fallback-retry"
          },
          {
            "state": "정상",
            "trigger": "폴백 원인(404·500·오프라인·빈데이터) 식별 완료",
            "guard": "원인별 안내 문구 + 다음 행동 버튼 정상 렌더",
            "result": "원인 문구와 다시 시도/홈으로가 노출되고, 로그인 교인에게는 오프라인 캐시 주보·설교 섹션이 함께 표시됨",
            "message": "지금은 내용을 불러올 수 없어요",
            "placement": "full-page",
            "target": ".pd-empty-state"
          },
          {
            "state": "빈데이터",
            "trigger": "상위 요청은 성공했으나 표시할 공개 콘텐츠가 0건",
            "guard": "교회 status=활성 · 공개 설교/주보/소식 모두 미게재(0건)",
            "result": "없는 교회가 아니라 '아직 비어 있음'으로 구분해 안내, 다시 시도 대신 홈으로를 권장 동선으로",
            "message": "아직 등록된 내용이 없어요. 교회 확인 후 게재됩니다.",
            "placement": "full-page",
            "target": ".pd-empty-state",
            "api": {
              "endpoint": "GET /churches/{slug}/home",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "상위 요청 또는 재시도가 서버오류로 실패",
            "guard": "5xx 지속·게이트웨이 오류",
            "result": "원인=서버오류로 안내하고 다시 시도/홈으로 유지, 반복 실패 시 '잠시 후 다시' 문구로 완화",
            "message": "교회 정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.",
            "placement": "full-page",
            "target": ".pd-empty-state",
            "api": {
              "endpoint": "GET /churches/{slug}/home",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "비로그인 상태로 폴백 진입",
            "guard": "공개 폴백은 인증 불요(해당 없음)·입력 폼 없음(입력검증 N/A)",
            "result": "안내·다시 시도·홈으로는 전원 노출, 오프라인 캐시 섹션(.pd-cached-list)은 로그인 교인에게만 — 비로그인은 미노출",
            "message": "저장된 주보·설교는 로그인 후 오프라인에서 볼 수 있어요",
            "placement": "inline"
          },
          {
            "state": "엣지",
            "trigger": "없는/미개설 교회 slug(404) 또는 오프라인(네트워크 없음)",
            "guard": "slug 미존재·개설 전(404) 또는 navigator offline(네트워크 0)·입력 폼 없음(입력검증 N/A)",
            "result": "404는 '찾을 수 없는 교회'로 홈으로만 권장(재시도 숨김), 오프라인은 '인터넷 연결 없음'으로 다시 시도 강조 + 캐시 콘텐츠 우선 노출",
            "message": "준비 중이거나 찾을 수 없는 교회예요 / 인터넷에 연결되어 있지 않아요",
            "placement": "full-page",
            "target": ".pd-empty-state",
            "api": {
              "endpoint": "GET /churches/{slug}/home",
              "status": 404
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "siteFallbackProbe",
              "intent": "폴백 원인 판별(상위 공개 요청 상태)",
              "method": "GET",
              "path": "/churches/{slug}/home",
              "params": {
                "slug": "교회 식별 slug(path)"
              },
              "response": "{entities.Church, entities.SiteContent}",
              "auth": "none(공개)",
              "target": ".pd-empty-state",
              "errors": [
                {
                  "status": 404,
                  "when": "없거나 미개설(status≠활성) 교회 slug",
                  "message": "준비 중이거나 찾을 수 없는 교회예요"
                },
                {
                  "status": 500,
                  "when": "서버 오류·게이트웨이 실패",
                  "message": "교회 정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요."
                }
              ]
            },
            {
              "id": "offlineCache",
              "intent": "오프라인 캐시 주보·설교 조회(캐시 우선)",
              "method": "GET",
              "path": "/churches/{slug}/offline-cache",
              "params": {
                "slug": "교회 식별 slug(path)"
              },
              "response": "{entities.Bulletin, entities.Sermon}",
              "auth": "none(공개) · 캐시 섹션은 Bearer(교인) 세션 시에만 노출, 데이터는 Service Worker 캐시에서 제공(네트워크 실패 시 폴백)",
              "errors": [
                {
                  "status": 0,
                  "when": "오프라인이고 캐시도 없음",
                  "message": "저장된 콘텐츠가 없어요. 연결 후 다시 확인해 주세요."
                },
                {
                  "status": 401,
                  "when": "비로그인·세션 만료",
                  "message": "저장된 주보·설교는 로그인 후 오프라인에서 볼 수 있어요"
                }
              ]
            }
          ],
          "writes": [],
          "events": [
            {
              "id": "retryRequest",
              "name": "fallback.retry",
              "intent": "다시 시도(동일 리소스 재요청)",
              "when": "\"다시 시도\"(.pd-fallback-retry) 탭 → 실패한 동일 리소스를 재요청(멱등 GET·비가역 쓰기 없음)",
              "target": ".pd-fallback-retry"
            },
            {
              "id": "networkStatus",
              "name": "net.status-change",
              "intent": "네트워크 상태 변화 감지",
              "when": "navigator online/offline 이벤트 — 온라인 복귀 시 자동 재시도를 유도하고 오프라인 진입 시 캐시 콘텐츠를 우선 노출",
              "target": ".pd-empty-state"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-SITE-001",
              "via": "홈으로 가기",
              "trigger": ".pd-fallback-home"
            },
            {
              "screen": "SCR-SITE-009",
              "via": "다시 시도(동일 리소스 재요청)",
              "trigger": ".pd-fallback-retry"
            },
            {
              "screen": "SCR-APP-004",
              "via": "오프라인 캐시 주보(로그인 교인)",
              "trigger": ".pd-cache-bulletin"
            },
            {
              "screen": "SCR-APP-002",
              "via": "오프라인 캐시 설교(로그인 교인)",
              "trigger": ".pd-cache-sermon"
            }
          ]
        }
      },
      {
        "id": "SCR-SITE-010",
        "label": "공지",
        "href": "s-notice.html",
        "surface": "site",
        "entry": false,
        "status": "wireframed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-009"
        ],
        "context": "공개 공지(방문자·로그인 없이 목록/요약 열람·공개 5메뉴).",
        "components": [
          {
            "role": ".pd-notice-list",
            "kind": "list",
            "label": "공지 목록 — 제목·요약·게시일(추수감사주일 안내 · 2026-09-27). 요약을 목록에서 바로 열람(상세 이동 없음)"
          },
          {
            "role": ".pd-badge",
            "kind": "badge",
            "label": "중요·상단고정 배지 — 상단고정 공지는 최상단 정렬, 중요 공지는 '중요' 배지로 강조"
          },
          {
            "role": ".pd-back",
            "kind": "nav",
            "label": "뒤로가기 — 교회 공개홈으로 복귀",
            "action": {
              "on": "click",
              "do": "go:SCR-SITE-001"
            }
          }
        ],
        "description": [
          {
            "text": "공개 공지 목록 — 방문자가 로그인 없이 교회 공지를 열람하는 공개 화면(공개 5메뉴 중 공지). 상단고정 공지가 목록 최상단에 노출되고 중요 공지는 '중요' 배지로 강조",
            "target": ".pd-notice-list"
          },
          {
            "text": "각 공지 행 — 제목·요약·게시일을 한 행에 표시하며, 요약(본문 발췌)을 목록에서 바로 읽을 수 있어 별도 상세 화면 이동이 없음(공개 요약 열람)",
            "target": ".pd-notice-list"
          },
          {
            "text": "중요·상단고정 배지 — 관리자가 설정한 중요(important)·상단고정(pinned) 공지를 배지로 구분, 상단고정은 게시일과 무관하게 최상단 정렬",
            "target": ".pd-badge"
          },
          {
            "text": "공지가 한 건도 없으면 빈 상태 안내('아직 등록된 공지가 없어요. 교회 확인 후 게재됩니다.')를 노출 — 미확보 콘텐츠 정직성 표기",
            "target": ".pd-notice-list"
          },
          {
            "text": "상단 뒤로가기 — 교회 공개홈으로 복귀(SCR-SITE-001)",
            "target": ".pd-back"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "화면 진입",
            "guard": "공개 공지 목록 미요청",
            "result": "목록 영역 비움(상단고정 우선 정렬 대기)",
            "message": "",
            "placement": "inline",
            "target": ".pd-notice-list"
          },
          {
            "state": "로딩",
            "trigger": "진입·추가 로드",
            "guard": "공개 공지 목록 조회 중",
            "result": "행 스켈레톤 표시",
            "message": "",
            "placement": "inline",
            "target": ".pd-notice-list"
          },
          {
            "state": "정상",
            "trigger": "응답 수신",
            "guard": "공지 1건 이상",
            "result": "상단고정 공지 최상단 정렬 + 중요/상단고정 배지, 제목·요약·게시일 행 목록 노출",
            "message": "",
            "placement": "inline",
            "target": ".pd-notice-list",
            "api": {
              "endpoint": "GET /churches/{slug}/notices",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답 수신",
            "guard": "공지 0건",
            "result": "빈 상태 안내 노출",
            "message": "아직 등록된 공지가 없어요. 교회 확인 후 게재됩니다.",
            "placement": "inline",
            "target": ".pd-notice-list",
            "api": {
              "endpoint": "GET /churches/{slug}/notices",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "응답 수신",
            "guard": "서버 오류·네트워크 실패",
            "result": "재시도 안내 노출",
            "message": "공지를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.",
            "placement": "toast",
            "target": ".pd-notice-list",
            "api": {
              "endpoint": "GET /churches/{slug}/notices",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "화면 진입",
            "guard": "공개 열람 화면 — 인증 불필요(권한없음 해당 없음)",
            "result": "로그인 없이 공개 공지만 노출",
            "message": "",
            "placement": "inline",
            "target": ".pd-notice-list"
          },
          {
            "state": "엣지",
            "trigger": "응답 수신",
            "guard": "공지 20건 초과",
            "result": "cursor 기반 추가 로드(스크롤), 상단고정 우선 순서 유지 + 긴 본문은 요약 말줄임 표기",
            "message": "",
            "placement": "inline",
            "target": ".pd-notice-list",
            "api": {
              "endpoint": "GET /churches/{slug}/notices?cursor=&limit=20",
              "status": 200
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "publicNotices",
              "intent": "공개 공지 목록 조회",
              "method": "GET",
              "path": "/churches/{slug}/notices",
              "params": "cursor, limit=20 (상단고정 pinned 우선 → 게시일 postedAt 내림차순 정렬)",
              "response": "{entities.Notice}[] — title·body(요약)·postedAt·important·pinned (notify/attachment 등 운영필드는 공개 응답 제외)",
              "auth": "none(공개)",
              "target": ".pd-notice-list",
              "errors": [
                {
                  "status": 404,
                  "when": "존재하지 않는 교회 slug",
                  "message": "교회 공개홈을 찾을 수 없어요."
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "공지를 불러오지 못했어요. 잠시 후 다시 시도해 주세요."
                }
              ]
            }
          ],
          "writes": [],
          "events": [
            {
              "name": "notice.list.load",
              "when": "화면 진입·목록 하단 도달(추가 로드)",
              "intent": "공개 공지 목록 조회(상단고정 우선 정렬)",
              "target": ".pd-notice-list"
            },
            {
              "name": "notice.back",
              "when": "상단 뒤로가기 탭",
              "intent": "교회 공개홈으로 복귀(SCR-SITE-001)",
              "target": ".pd-back"
            }
          ],
          "auth": "none(공개) — 교회 식별 = path의 {slug}. 비인증 공개 읽기(공개 콘텐츠만), tenant 스코프는 slug로 강제(A교회↔B교회 차단)",
          "notes": "에러규약 RFC 9457 Problem Details(application/problem+json). 비가역 쓰기 없음(멱등 대상 없음·읽기 전용 화면)"
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-SITE-001",
              "via": "뒤로가기(교회 공개홈)",
              "trigger": ".pd-back"
            }
          ]
        }
      },
      {
        "id": "SCR-SITE-011",
        "label": "주보",
        "href": "s-bulletin.html",
        "surface": "site",
        "entry": false,
        "status": "wireframed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-008"
        ],
        "context": "공개 주보(방문자·이번 주 주보 열람). ★공개 범위=교회별 공개 토글 권장(개인정보).",
        "components": [
          {
            "role": ".pd-appbar",
            "kind": "group",
            "label": "상단 앱바 — 뒤로 버튼·'주보' 제목"
          },
          {
            "role": ".pd-back",
            "kind": "group",
            "label": "뒤로 가기 — 교회 공개홈(SCR-SITE-001)으로",
            "action": {
              "on": "click",
              "do": "go:SCR-SITE-001"
            }
          },
          {
            "role": ".pd-ab-title",
            "kind": "group",
            "label": "화면 제목 '주보'"
          },
          {
            "role": ".pd-ab-spacer",
            "kind": "group",
            "label": "앱바 우측 정렬 여백"
          },
          {
            "role": ".pd-banner",
            "kind": "banner",
            "label": "공개 안내 — '주보 공개 여부는 교회가 직접 켜고 끌 수 있어요'(교회별 공개 토글·개인정보 보호 권장)"
          },
          {
            "role": ".pd-week-nav",
            "kind": "group",
            "label": "주차 네비 — 지난 주·이번 주(10/5)·다음 주"
          },
          {
            "role": ".pd-segment",
            "kind": "tabbar",
            "label": "주차 세그먼트 — 지난 주 · 이번 주 (10/5) · 다음 주(기본 '이번 주' 활성)"
          },
          {
            "role": ".pd-chips",
            "kind": "group",
            "label": "주보 섹션(5) — 예배 순서 · 교회 광고 · 헌금 안내 · 금주의 말씀 · 교회 일정"
          },
          {
            "role": ".pd-bulletin-view",
            "kind": "card",
            "label": "주보 뷰어 — 이번 주(10/5) 주보 이미지(탭하면 원본 크기로 확대)"
          },
          {
            "role": ".pd-empty-state",
            "kind": "group",
            "label": "빈 상태 — '다음 주 주보는 아직이에요'(교회 확인 후 게재)"
          }
        ],
        "description": [
          {
            "text": "상단 앱바 뒤로가기 — 주보 열람을 닫고 교회 공개홈으로 복귀(SCR-SITE-001)",
            "target": ".pd-back"
          },
          {
            "text": "공개 안내 배너 — '주보 공개 여부는 교회가 직접 켜고 끌 수 있어요'. 주보에 성도 이름·당번 명단 등 개인정보가 담길 수 있어, 교회가 공개 토글로 직접 켜고 공개 전 내용을 확인하도록 권장(교회별 공개 토글)",
            "target": ".pd-banner"
          },
          {
            "text": "주차 세그먼트 — 지난 주 · 이번 주(10/5) · 다음 주를 전환하며 열람하고 기본은 '이번 주'가 활성. 비로그인 방문자도 공개로 설정된 주보를 로그인 없이 열람",
            "target": ".pd-segment"
          },
          {
            "text": "주보 뷰어 — 선택한 주차의 주보를 이미지로 표시하며, 이미지를 탭하면 원본 크기로 확대해 읽을 수 있음. 수록 내용(예배 순서·교회 광고·헌금 안내·금주의 말씀·교회 일정 5개 섹션)을 섹션 칩으로 안내",
            "target": ".pd-bulletin-view"
          },
          {
            "text": "빈 상태 — 해당 주차 주보가 아직 미발행이면 '다음 주 주보는 아직이에요 · 교회 확인 후 게재됩니다' 안내로 빈 화면 없이 상태를 명확히 표기",
            "target": ".pd-empty-state"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "주보 화면 진입",
            "guard": "데이터 요청 전 · church_id는 Host/slug로 자동 확정(교회검색 없음)",
            "result": "'이번 주 (10/5)' 세그먼트가 활성, 뷰어 영역은 플레이스홀더",
            "message": "",
            "placement": "inline",
            "target": ".pd-bulletin-view"
          },
          {
            "state": "로딩",
            "trigger": "공개 주보 조회",
            "guard": "응답 대기 중(네트워크 지연)",
            "result": "뷰어 영역 스켈레톤 표시, 주차 전환 일시 비활성",
            "message": "주보를 불러오는 중이에요",
            "placement": "inline",
            "target": ".pd-bulletin-view"
          },
          {
            "state": "정상",
            "trigger": "주보 수신·주차 선택",
            "guard": "공개 토글 ON이고 교회 확인·게재된 주보 1건 이상",
            "result": "선택한 주차의 주보를 이미지 뷰어로 표시(세그먼트로 지난/이번/다음 주 전환, 이미지 탭 시 원본 확대)",
            "message": "",
            "placement": "inline",
            "target": ".pd-bulletin-view",
            "api": {
              "endpoint": "GET /churches/{slug}/bulletins",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답 수신",
            "guard": "선택 주차 주보 0건(예: 다음 주 10/12 미발행)",
            "result": "미발행 빈 상태 안내 + 이번 주/지난 주 주보 확인 유도",
            "message": "아직 이번 주 주보가 등록되지 않았어요. 교회 확인 후 게재됩니다.",
            "placement": "inline",
            "target": ".pd-empty-state",
            "api": {
              "endpoint": "GET /churches/{slug}/bulletins",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "응답 실패",
            "guard": "서버 오류(5xx)",
            "result": "불러오기 실패 안내 + 재시도",
            "message": "주보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.",
            "placement": "banner",
            "target": ".pd-bulletin-view",
            "api": {
              "endpoint": "GET /churches/{slug}/bulletins",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "비로그인 방문자 접근",
            "guard": "공개 화면이나 교회가 주보 공개 토글을 OFF(비공개)로 둠 — 공개 콘텐츠만 노출. 입력 폼 없음 → 입력검증 N/A",
            "result": "비공개 안내 + 교인 앱 로그인 유도(공개된 다른 메뉴는 그대로 열람 가능)",
            "message": "이 교회는 주보를 공개로 설정하지 않았어요. 교회 확인 후 공개되거나, 교인 로그인 후 앱에서 확인할 수 있어요.",
            "placement": "full-page",
            "target": ".pd-banner",
            "api": {
              "endpoint": "GET /churches/{slug}/bulletins",
              "status": 403
            }
          },
          {
            "state": "엣지",
            "trigger": "주보 이미지 확대 열람",
            "guard": "파일 서명 URL 만료 또는 타 교회(slug) 리소스 접근 — 테넌트 격리",
            "result": "파일 다시 불러오기 유도(A교회↔B교회 주보 교차 접근 차단)",
            "message": "주보 파일을 여는 중 문제가 생겼어요. 새로고침해 주세요.",
            "placement": "toast",
            "target": ".pd-bulletin-view",
            "api": {
              "endpoint": "GET /churches/{slug}/bulletins",
              "status": 403
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "siteBulletins",
              "intent": "교회 공개 주보 조회(이번 주 중심·지난 주 포함)",
              "method": "GET",
              "path": "/churches/{slug}/bulletins",
              "params": "?week=YYYY-MM-DD (주차 선택), ?cursor=&limit=20 (지난호 커서 페이지네이션)",
              "response": "{entities.Bulletin}[] — 공개 토글(visibility=public)이고 교회 확인·게재된 주보만 반환",
              "auth": "none(공개)",
              "target": ".pd-bulletin-view",
              "note": "tenant=path {slug}로 자동 확정(교회검색 없음·church_id 자동 바인딩), file은 교회별 서명 URL(이미지/PDF), 공개 토글 OFF면 미노출(타 교회 주보 교차 접근 차단)",
              "errors": [
                {
                  "status": 403,
                  "when": "교회가 주보 공개 토글 OFF 또는 서명 URL 만료·타 교회 리소스 접근",
                  "message": "이 교회는 주보를 공개로 설정하지 않았어요. 교회 확인 후 공개되거나, 교인 로그인 후 앱에서 확인할 수 있어요."
                },
                {
                  "status": 404,
                  "when": "slug이 유효한 교회로 확인되지 않음(미개설·해지 테넌트)",
                  "message": "요청하신 교회를 찾을 수 없어요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "주보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요."
                }
              ]
            }
          ],
          "writes": [],
          "events": [
            {
              "name": "site.bulletin.week_switch",
              "intent": "주차 전환(지난 주·이번 주·다음 주)",
              "when": "주차 세그먼트 탭 선택",
              "target": ".pd-segment"
            },
            {
              "name": "site.bulletin.section_jump",
              "intent": "주보 섹션 이동(예배 순서·교회 광고·헌금 안내·금주의 말씀·교회 일정)",
              "when": "섹션 칩 선택",
              "target": ".pd-chips"
            },
            {
              "name": "site.bulletin.zoom",
              "intent": "주보 확대 열람",
              "when": "주보 이미지 탭(원본 크기 확대)",
              "target": ".pd-bulletin-view"
            },
            {
              "name": "site.bulletin.back_home",
              "intent": "교회 공개홈으로 돌아가기",
              "when": "뒤로 버튼 탭",
              "target": ".pd-back"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-SITE-001",
              "via": "뒤로 — 교회 공개홈",
              "trigger": ".pd-back"
            }
          ]
        }
      }
    ]
  },
  {
    "category": "교인 Web·PWA (app · 로그인 후 교인영역)",
    "pages": [
      {
        "id": "SCR-APP-001",
        "label": "교인 홈",
        "href": "a-home.html",
        "surface": "app",
        "entry": true,
        "status": "confirmed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-005",
          "REQ-006"
        ],
        "context": "교인 HOME(§29). 교회 브랜드·이번주 설교·최근공지·이번주 주보 바로가기. 5메뉴 탭바(홈·설교·주보·공지·마이) + 알림 아이콘. 교회별 브랜드=로고/색/커버/교회명만, 레이아웃은 단일 Design System 고정.",
        "components": [
          {
            "role": ".pd-apptop",
            "kind": "banner",
            "label": "○○교회 로고·교회명·알림 아이콘",
            "action": {
              "on": "click",
              "do": "go:SCR-APP-010"
            }
          },
          {
            "role": ".pd-feature",
            "kind": "card",
            "label": "이번 주 설교 — 로마서 강해 12 · 조정표 담임목사",
            "action": {
              "on": "click",
              "do": "go:SCR-APP-002"
            }
          },
          {
            "role": ".pd-list",
            "kind": "list",
            "label": "공지 목록(추수감사주일 안내 · 새가족 환영회)",
            "action": {
              "on": "click",
              "do": "go:SCR-APP-005"
            }
          },
          {
            "role": ".pd-row",
            "kind": "card",
            "label": "바로가기 — 이번 주 주보",
            "action": {
              "on": "click",
              "do": "go:SCR-APP-004"
            }
          },
          {
            "role": ".pd-tabbar",
            "kind": "tabbar",
            "label": "하단 탭 — 홈 · 설교 · 주보 · 공지 · 마이",
            "action": {
              "on": "click",
              "do": "go:SCR-APP-006"
            }
          }
        ],
        "description": [
          {
            "text": "상단바의 ○○교회 로고·교회명(교회별 브랜드 4요소: 로고·대표색·커버·교회명)과 알림 아이콘 — 탭하면 알림함으로 이동(SCR-APP-010)",
            "target": ".pd-apptop"
          },
          {
            "text": "이번 주 설교 카드(로마서 강해 12 · 조정표 담임목사 · 2026-09-27 · 42분) — 탭하면 설교 목록으로(SCR-APP-002)",
            "target": ".pd-feature"
          },
          {
            "text": "공지 요약 목록(추수감사주일 안내 · 새가족 환영회) — 탭하면 공지로(SCR-APP-005)",
            "target": ".pd-list"
          },
          {
            "text": "바로가기 영역의 이번 주 주보 — 탭하면 주보 뷰어로(SCR-APP-004)",
            "target": ".pd-row"
          },
          {
            "text": "하단 5메뉴 탭(홈·설교·주보·공지·마이) — 마이 탭은 마이페이지로(SCR-APP-006)",
            "target": ".pd-tabbar"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "앱 진입",
            "guard": "저장된 세션(JWT) 확인 전",
            "result": "홈 골격(스켈레톤)을 먼저 그린 뒤 집계 호출",
            "message": "",
            "placement": "inline",
            "target": ".pd-feature"
          },
          {
            "state": "로딩",
            "trigger": "진입",
            "guard": "홈 집계 요청 중",
            "result": "설교·공지·주보 자리에 스켈레톤 표시",
            "message": "",
            "placement": "inline",
            "target": ".pd-feature"
          },
          {
            "state": "정상",
            "trigger": "진입",
            "guard": "설교·공지·주보 중 1건 이상",
            "result": "이번 주 설교·공지 요약·주보 바로가기 표시",
            "message": "",
            "placement": "inline",
            "target": ".pd-feature",
            "api": {
              "endpoint": "GET /app/home",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답",
            "guard": "설교·공지·주보 모두 0건(신규 개설 교회)",
            "result": "준비 중 안내",
            "message": "아직 등록된 소식이 없어요. 교회가 설교·공지를 올리면 여기에서 바로 보여드릴게요",
            "placement": "inline",
            "target": ".pd-feature",
            "api": {
              "endpoint": "GET /app/home",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "응답",
            "guard": "서버 오류(5xx)",
            "result": "재시도 안내",
            "message": "소식을 불러오지 못했어요. 잠시 후 다시 시도해 주세요",
            "placement": "toast",
            "target": ".pd-feature",
            "api": {
              "endpoint": "GET /app/home",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "진입",
            "guard": "JWT 없음 또는 만료",
            "result": "교인 로그인으로 이동(SCR-APP-009)",
            "message": "로그인이 필요해요. 다시 로그인해 주세요",
            "placement": "full-page",
            "target": ".pd-apptop",
            "api": {
              "endpoint": "GET /app/home",
              "status": 401
            }
          },
          {
            "state": "엣지",
            "trigger": "진입",
            "guard": "주일 라이브 예배 세션 active",
            "result": "상단 라이브 배너 노출 — 탭 시 설교 상세·실시간 재생(SCR-APP-003)",
            "message": "주일 라이브 예배 진행 중 · 지금 보기",
            "placement": "banner",
            "api": {
              "endpoint": "GET /app/home",
              "status": 200
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "appHome",
              "intent": "교인 홈 집계(이번 주 설교·최근 공지·이번 주 주보)",
              "method": "GET",
              "path": "/app/home",
              "response": "{ sermon: '{entities.Sermon}', notices: ['{entities.Notice}'], bulletin: '{entities.Bulletin}', live: boolean }",
              "auth": "Bearer",
              "target": ".pd-feature",
              "note": "tenant는 JWT tenantId claim으로 결정(path 비노출)·교차테넌트 조회 차단(§54·55)",
              "errors": [
                {
                  "status": 401,
                  "when": "JWT 없음 또는 만료",
                  "message": "로그인이 필요해요. 다시 로그인해 주세요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "소식을 불러오지 못했어요. 잠시 후 다시 시도해 주세요"
                }
              ]
            }
          ],
          "writes": [],
          "events": [
            {
              "id": "pushReceived",
              "name": "push.received",
              "intent": "Web Push 수신 시 알림 아이콘 뱃지 갱신",
              "trigger": "ServiceWorker push",
              "target": ".pd-apptop"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-APP-002",
              "via": "설교 목록"
            },
            {
              "screen": "SCR-APP-004",
              "via": "주보 바로가기"
            },
            {
              "screen": "SCR-APP-005",
              "via": "공지",
              "trigger": ".pd-list"
            },
            {
              "screen": "SCR-APP-006",
              "via": "마이 탭",
              "trigger": ".pd-tabbar"
            },
            {
              "screen": "SCR-SITE-002",
              "via": "교회소개"
            },
            {
              "screen": "SCR-APP-010",
              "via": "알림 아이콘",
              "trigger": ".pd-apptop"
            }
          ]
        }
      },
      {
        "id": "SCR-APP-002",
        "label": "설교",
        "href": "a-sermon.html",
        "surface": "app",
        "status": "confirmed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-007"
        ],
        "context": "교인 설교 목록(YouTube). 최신·시리즈. 자체 영상 저장 없음(YouTube 임베드).",
        "components": [
          {
            "role": ".pd-list",
            "kind": "list",
            "label": "설교 목록 — 지난 설교 · 시리즈별",
            "action": {
              "on": "click",
              "do": "go:SCR-APP-003"
            }
          },
          {
            "role": ".pd-row",
            "kind": "card",
            "label": "설교 항목 — 썸네일 · 제목 · 날짜 · 설교자",
            "action": {
              "on": "click",
              "do": "go:SCR-APP-003"
            }
          },
          {
            "role": ".pd-tabbar",
            "kind": "tabbar",
            "label": "하단 탭 — 홈 · 설교 · 주보 · 공지 · 마이"
          }
        ],
        "description": [
          {
            "text": "최신 설교 카드 — 로마서 강해 12(조정표 담임목사 · 2026-09-27 · 42분). 탭하면 설교 상세·YouTube 재생으로 이동(SCR-APP-003)"
          },
          {
            "text": "설교 분류 세그먼트 — 전체 · 로마서(강해 시리즈) · 청년(청년예배)으로 같은 화면 안에서 목록을 좁힘(별도 화면 이동 없음)"
          },
          {
            "text": "설교 목록 — 지난 설교와 시리즈별 묶음. 영상은 YouTube 임베드로 자체 저장 없음(썸네일·제목·날짜·설교자 메타만 표시)",
            "target": ".pd-list"
          },
          {
            "text": "설교 항목 — 썸네일·제목·날짜·설교자(예: 로마서 강해 11 · 09-20 · 조정표 담임목사). 탭하면 설교 상세·재생(SCR-APP-003)",
            "target": ".pd-row"
          },
          {
            "text": "하단 탭 — 홈(SCR-APP-001) · 설교(현재) · 주보(SCR-APP-004) · 공지(SCR-APP-015) · 마이(SCR-APP-006)",
            "target": ".pd-tabbar"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "화면 최초 진입",
            "guard": "데이터 요청 전(JWT 확인 중)",
            "result": "목록 영역 골격만 노출",
            "message": "",
            "placement": "inline",
            "target": ".pd-list"
          },
          {
            "state": "로딩",
            "trigger": "설교 목록 요청",
            "guard": "응답 대기",
            "result": "스켈레톤 로딩 표시",
            "message": "",
            "placement": "inline",
            "target": ".pd-list",
            "api": {
              "endpoint": "GET /app/sermons",
              "status": "대기"
            }
          },
          {
            "state": "정상",
            "trigger": "진입",
            "guard": "설교 1건 이상(tenant=JWT)",
            "result": "최신 설교 카드 + 지난 설교·시리즈 목록 표시",
            "message": "",
            "placement": "inline",
            "target": ".pd-list",
            "api": {
              "endpoint": "GET /app/sermons?cursor=&limit=20",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답",
            "guard": "설교 0건",
            "result": "빈 상태 안내(복구: 교회 등록 대기)",
            "message": "아직 등록된 설교가 없어요. 교회에서 설교를 올리면 여기에 표시돼요",
            "placement": "inline",
            "target": ".pd-list",
            "api": {
              "endpoint": "GET /app/sermons",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "응답",
            "guard": "서버 오류(500)",
            "result": "오류 안내·다시 시도",
            "message": "설교를 불러오지 못했어요. 잠시 후 다시 시도해 주세요",
            "placement": "toast",
            "target": ".pd-list",
            "api": {
              "endpoint": "GET /app/sermons",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "진입/요청",
            "guard": "토큰 만료·미인증(401, app=교인 Bearer 필요)",
            "result": "로그인 화면으로 유도",
            "message": "로그인이 필요해요. 다시 로그인해 주세요",
            "placement": "full-page",
            "api": {
              "endpoint": "GET /app/sermons",
              "status": 401
            }
          },
          {
            "state": "엣지",
            "trigger": "세그먼트 분류 선택",
            "guard": "해당 분류(예: 청년)에 설교 0건",
            "result": "분류 빈 상태 안내(필터 유지)",
            "message": "이 분류에는 아직 설교가 없어요",
            "placement": "inline"
          },
          {
            "state": "엣지",
            "trigger": "목록 렌더",
            "guard": "설교 메타는 있으나 YouTube URL 미등록",
            "result": "항목은 표시하되 영상은 보류 표기(정직성)",
            "message": "영상은 교회 확인 후 게재됩니다",
            "placement": "inline",
            "target": ".pd-row"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "appSermons",
              "intent": "설교 목록 조회(YouTube 메타)",
              "method": "GET",
              "path": "/app/sermons",
              "params": "cursor, limit(기본 20), series(세그먼트 분류 필터: 전체/로마서/청년)",
              "response": "{entities.Sermon}[]",
              "auth": "Bearer",
              "note": "tenant 식별=JWT tenantId(church_id 자동 바인딩·교회 격리, A교회↔B교회 차단). 목록 첫 항목(최신)=.pd-feature 카드로 렌더. cursor 기반 페이지네이션(?cursor=&limit=20). 영상 자체 저장 없이 youtubeUrl 임베드.",
              "target": ".pd-list",
              "errors": [
                {
                  "status": 401,
                  "when": "토큰 만료/미인증",
                  "message": "로그인이 필요해요. 다시 로그인해 주세요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "설교를 불러오지 못했어요. 잠시 후 다시 시도해 주세요"
                }
              ]
            }
          ],
          "writes": [],
          "events": [
            {
              "name": "sermon.filter.change",
              "intent": "설교 분류 필터 변경",
              "when": "세그먼트 분류 탭 선택(전체/로마서/청년)",
              "target": ".pd-segment"
            },
            {
              "name": "sermon.open",
              "intent": "설교 상세·재생 이동(SCR-APP-003)",
              "when": "설교 항목 또는 최신 설교 카드 탭",
              "target": ".pd-row"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-APP-003",
              "via": "설교 상세·재생",
              "trigger": ".pd-row"
            }
          ]
        }
      },
      {
        "id": "SCR-APP-003",
        "label": "설교 상세",
        "href": "a-sermon-detail.html",
        "surface": "app",
        "status": "confirmed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-007"
        ],
        "context": "설교 상세·YouTube 재생(pd-player)·성경본문. 자체 영상 저장 없음(임베드).",
        "components": [
          {
            "role": ".pd-player",
            "kind": "card",
            "label": "설교 영상 플레이어 — YouTube 임베드 재생(로마서 강해 12)"
          },
          {
            "role": ".pd-tabbar",
            "kind": "tabbar",
            "label": "하단 탭 — 홈·설교·주보·공지·마이"
          }
        ],
        "description": [
          {
            "text": "설교 영상 플레이어 — '로마서 강해 12'를 YouTube URL 임베드로 재생(자체 영상 저장 없이 임베드, 설교=YouTube)",
            "target": ".pd-player"
          },
          {
            "text": "설교 정보·설교 노트 — '조정표 담임목사 · 2026-09-27 · 42분'과 본문 '로마서 12:1-2' 표시"
          },
          {
            "text": "'유튜브에서 보기'(YouTube 외부 열기)·'설교 나눔'(공유) 액션 버튼"
          },
          {
            "text": "'같은 시리즈' 목록 — '로마서 강해 11·10' 등 다른 설교를 탭하면 해당 설교 상세로 이동(SCR-APP-003)"
          },
          {
            "text": "뒤로는 설교 목록(SCR-APP-002)으로, 하단 탭은 홈(SCR-APP-001)·설교(SCR-APP-002)·주보(SCR-APP-004)·공지(SCR-APP-015)·마이(SCR-APP-006)로 이동",
            "target": ".pd-tabbar"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "설교 목록(SCR-APP-002)에서 항목 선택 → 상세 진입(마운트)",
            "guard": "sermon id 전달됨, 데이터 미수신",
            "result": "플레이어·설교 노트 영역 스켈레톤 노출",
            "message": "",
            "placement": "inline",
            "target": ".pd-player"
          },
          {
            "state": "로딩",
            "trigger": "설교 상세 조회 호출",
            "guard": "GET /app/sermons/{id} 응답 대기",
            "result": "스켈레톤 유지, 중복 탭 차단",
            "message": "불러오는 중이에요",
            "placement": "inline",
            "target": ".pd-player",
            "api": {
              "endpoint": "GET /app/sermons/{id}"
            }
          },
          {
            "state": "정상",
            "trigger": "조회 성공",
            "guard": "설교 존재 + youtubeUrl 등록 + tenant 스코프 일치",
            "result": "YouTube 임베드 재생·설교 노트(본문 롬 12:1-2)·같은 시리즈 표시",
            "message": "",
            "placement": "inline",
            "target": ".pd-player",
            "api": {
              "endpoint": "GET /app/sermons/{id}",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "조회 성공했으나 콘텐츠 일부 미등록",
            "guard": "youtubeUrl 미등록 또는 같은 시리즈 0건",
            "result": "플레이어 자리에 준비중 placeholder, 같은 시리즈 섹션은 숨김",
            "message": "아직 등록된 영상이 없어요. 교회 확인 후 게재됩니다",
            "placement": "inline",
            "target": ".pd-player",
            "api": {
              "endpoint": "GET /app/sermons/{id}",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "상세 조회 실패",
            "guard": "삭제/없음(404) 또는 서버 오류(500)",
            "result": "오류 안내 + 설교 목록으로 돌아가기(SCR-APP-002)",
            "message": "설교를 찾을 수 없어요. 목록에서 다시 선택해 주세요",
            "placement": "full-page",
            "target": ".pd-player",
            "api": {
              "endpoint": "GET /app/sermons/{id}",
              "status": 404
            }
          },
          {
            "state": "에러",
            "trigger": "영상 재생 시도",
            "guard": "네트워크 단절·YouTube 임베드 로드 실패(클라이언트)",
            "result": "재생 영역에 재시도 안내",
            "message": "영상을 재생할 수 없어요. 네트워크 확인 후 다시 시도해 주세요",
            "placement": "toast",
            "target": ".pd-player"
          },
          {
            "state": "권한없음",
            "trigger": "조회 시 인증 실패",
            "guard": "비로그인·JWT 만료(401) — app 화면은 Bearer 필요",
            "result": "교인 로그인(SCR-APP-009)으로 유도",
            "message": "로그인이 필요해요. 다시 로그인해 주세요",
            "placement": "full-page",
            "target": ".pd-player",
            "api": {
              "endpoint": "GET /app/sermons/{id}",
              "status": 401
            }
          },
          {
            "state": "엣지",
            "trigger": "타 교회 설교 id 직접 접근 / 매우 긴 설교 노트",
            "guard": "엣지: tenant 스코프 불일치(다른 교회 콘텐츠)는 404로 격리(A교회↔B교회 차단) / 긴 본문은 스크롤 컨테이너 내 스크롤",
            "result": "다른 교회 콘텐츠는 존재하지 않는 것으로 처리(404), 긴 노트는 왜곡 없이 스크롤",
            "message": "설교를 찾을 수 없어요",
            "placement": "full-page",
            "target": ".pd-player",
            "api": {
              "endpoint": "GET /app/sermons/{id}",
              "status": 404
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "appSermonDetail",
              "intent": "설교 상세 조회",
              "method": "GET",
              "path": "/app/sermons/{id}",
              "response": "{entities.Sermon}",
              "auth": "Bearer",
              "target": ".pd-player",
              "note": "tenant는 JWT tenantId(path 비노출·멀티테넌트 격리). youtubeUrl 임베드 재생, 자체 영상 저장 없음(설교=YouTube).",
              "errors": [
                {
                  "status": 401,
                  "when": "비로그인·토큰 만료",
                  "message": "로그인이 필요해요"
                },
                {
                  "status": 404,
                  "when": "삭제/없음 또는 타 교회 설교(tenant 스코프)",
                  "message": "설교를 찾을 수 없어요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "설교를 불러오지 못했어요"
                }
              ]
            },
            {
              "id": "appSermonSeries",
              "intent": "같은 시리즈 설교 목록",
              "method": "GET",
              "path": "/app/sermons?series={id}&cursor=&limit=20",
              "params": "series=기준 설교 묶음, cursor 기반 페이지네이션(limit=20)",
              "response": "{entities.Sermon}[]",
              "auth": "Bearer",
              "note": "tenant는 JWT tenantId(path 비노출). 0건이면 '같은 시리즈' 섹션 숨김. ※현재 Sermon 엔티티에 series 필드 미보유 — 시리즈 묶음은 제목/시리즈 기준 그룹핑으로, 엔티티에 series 필드 추가 검토 필요(미확정은 교회 확인 후 게재).",
              "errors": [
                {
                  "status": 401,
                  "when": "비로그인·토큰 만료",
                  "message": "로그인이 필요해요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "같은 시리즈를 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [],
          "events": [
            {
              "name": "sermon.youtube.open",
              "intent": "유튜브에서 보기",
              "when": "'유튜브에서 보기' 버튼 클릭 시 YouTube 외부(새 창) 열기",
              "target": ".pd-btn"
            },
            {
              "name": "sermon.share",
              "intent": "설교 나눔(공유)",
              "when": "'설교 나눔' 버튼 클릭 시 공유 시트 호출(클라이언트, 서버 쓰기 없음)",
              "target": ".pd-btn"
            },
            {
              "name": "sermon.series.select",
              "intent": "같은 시리즈 설교 선택",
              "when": "'같은 시리즈' 행 탭 시 해당 설교 상세로 이동(SCR-APP-003)",
              "target": ".pd-list"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-APP-002",
              "via": "목록으로 뒤로",
              "trigger": ".pd-apptop"
            }
          ]
        }
      },
      {
        "id": "SCR-APP-004",
        "label": "주보",
        "href": "a-bulletin.html",
        "surface": "app",
        "status": "confirmed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-008"
        ],
        "context": "주간 주보 열람(PDF/이미지 뷰어). 최신호+지난호.",
        "components": [
          {
            "role": ".pd-appbar",
            "kind": "group",
            "label": "상단 앱바 — 뒤로 버튼·'주보' 제목"
          },
          {
            "role": ".pd-ab-btn",
            "kind": "group",
            "label": "앱바 버튼 영역"
          },
          {
            "role": ".pd-back",
            "kind": "group",
            "label": "뒤로 가기 — 홈(SCR-APP-001)으로"
          },
          {
            "role": ".pd-ab-title",
            "kind": "group",
            "label": "화면 제목 '주보'"
          },
          {
            "role": ".pd-ab-spacer",
            "kind": "group",
            "label": "앱바 우측 정렬 여백"
          }
        ],
        "description": [
          {
            "text": "주차 세그먼트 — '지난 주 · 이번 주(10/5) · 다음 주'로 전환, 기본은 '이번 주'가 활성"
          },
          {
            "text": "주보 뷰어 — 선택한 주차의 주보를 PDF·이미지로 크게 열람"
          },
          {
            "text": "주차별 수록 안내 — '이번 주(10/5) 예배 순서 · 광고 · 헌금 · 교회 일정' 등 해당 주보에 담긴 내용 요약"
          },
          {
            "text": "뒤로 가기 — 홈(SCR-APP-001)으로 이동",
            "target": ".pd-back"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "주보 화면 진입",
            "guard": "데이터 요청 전",
            "result": "'이번 주(10/5)' 세그먼트가 활성, 뷰어 영역은 플레이스홀더",
            "message": "",
            "placement": "inline"
          },
          {
            "state": "로딩",
            "trigger": "주보 목록 조회",
            "guard": "응답 대기 중",
            "result": "뷰어 영역 스켈레톤 표시",
            "message": "주보를 불러오는 중이에요",
            "placement": "inline"
          },
          {
            "state": "정상",
            "trigger": "주보 목록 수신·주차 선택",
            "guard": "선택 주차에 주보 1건 이상",
            "result": "선택한 주차의 주보를 PDF·이미지 뷰어로 표시(세그먼트로 지난/이번/다음 주 전환)",
            "message": "",
            "placement": "inline",
            "api": {
              "endpoint": "GET /app/bulletins",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답 수신",
            "guard": "선택 주차 주보 0건(예: 다음 주 10/12 미발행)",
            "result": "미발행 안내 + '지난 주' 주보 확인 유도",
            "message": "아직 등록된 주보가 없어요. 지난 주 주보를 확인하거나, 교회 확인 후 게재를 기다려 주세요.",
            "placement": "inline",
            "api": {
              "endpoint": "GET /app/bulletins",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "응답 수신",
            "guard": "서버 오류(5xx)",
            "result": "불러오기 실패 안내 + 재시도",
            "message": "주보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.",
            "placement": "toast",
            "api": {
              "endpoint": "GET /app/bulletins",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "응답 수신",
            "guard": "미인증·세션 만료(JWT 없음/만료)",
            "result": "교인 로그인(SCR-APP-009)으로 유도",
            "message": "로그인이 필요해요. 다시 로그인해 주세요.",
            "placement": "full-page",
            "api": {
              "endpoint": "GET /app/bulletins",
              "status": 401
            }
          },
          {
            "state": "엣지",
            "trigger": "주보 파일 열람",
            "guard": "파일 서명 URL 만료 또는 타 교회(테넌트) 접근",
            "result": "파일 다시 불러오기 유도(테넌트 격리로 타 교회 주보 차단)",
            "message": "주보 파일을 여는 중 문제가 생겼어요. 새로고침해 주세요.",
            "placement": "toast",
            "api": {
              "endpoint": "GET /app/bulletins",
              "status": 403
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "appBulletins",
              "intent": "주보 목록 조회(최신호+지난호)",
              "method": "GET",
              "path": "/app/bulletins",
              "params": "?cursor=&limit=20 (지난호 커서 페이지네이션), ?week=YYYY-MM-DD (주차 선택)",
              "response": "{entities.Bulletin}[]",
              "auth": "Bearer",
              "note": "tenant=JWT tenantId 스코프(타 교회 주보 접근 차단·path 비노출), file은 교회별 서명 URL(PDF/이미지)",
              "errors": [
                {
                  "status": 401,
                  "when": "미인증·JWT 만료",
                  "message": "로그인이 필요해요. 다시 로그인해 주세요."
                },
                {
                  "status": 403,
                  "when": "파일 서명 URL 만료 또는 타 교회 접근",
                  "message": "주보 파일을 여는 중 문제가 생겼어요. 새로고침해 주세요."
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "주보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요."
                }
              ]
            }
          ],
          "writes": [],
          "events": [
            {
              "name": "bulletin.week_switch",
              "intent": "주차 전환(지난 주·이번 주·다음 주)",
              "when": "주차 세그먼트 탭 선택",
              "target": ".pd-segment"
            },
            {
              "name": "bulletin.view",
              "intent": "주보 열람(PDF·이미지)",
              "when": "주차 선택 시 뷰어 로드",
              "target": ".pd-bulletin-view"
            },
            {
              "name": "bulletin.back_home",
              "intent": "홈으로 돌아가기",
              "when": "뒤로 버튼 탭",
              "target": ".pd-back"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-APP-001",
              "via": "홈 탭",
              "trigger": ".pd-tabbar"
            }
          ]
        }
      },
      {
        "id": "SCR-APP-005",
        "label": "공지",
        "href": "a-notice.html",
        "surface": "app",
        "status": "confirmed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-009"
        ],
        "context": "공지 목록·상세(중요/상단고정 표시). 이미지·첨부.",
        "components": [
          {
            "role": ".pd-appbar",
            "kind": "group",
            "label": "상단바 — 뒤로·제목 '공지'"
          },
          {
            "role": ".pd-ab-btn",
            "kind": "group",
            "label": "상단바 버튼 영역"
          },
          {
            "role": ".pd-back",
            "kind": "group",
            "label": "뒤로 가기(홈)"
          },
          {
            "role": ".pd-ab-title",
            "kind": "group",
            "label": "제목 '공지'"
          },
          {
            "role": ".pd-ab-spacer",
            "kind": "group",
            "label": "상단바 우측 여백"
          }
        ],
        "description": [
          {
            "text": "상단바 — 왼쪽 뒤로가기로 교인 홈(SCR-APP-001)에 복귀하고, 가운데 '공지' 제목을 표시",
            "target": ".pd-appbar"
          },
          {
            "text": "뒤로 가기 — 탭하면 교인 홈(SCR-APP-001)으로 이동",
            "target": ".pd-back"
          },
          {
            "text": "공지 본문 — 제목 '추수감사주일 안내', 게시정보 '2026-09-27 · 관리자', 구분선 아래 본문 내용을 표시(읽기 전용)"
          },
          {
            "text": "공지 이미지 — 본문 하단 대표 이미지(첨부 이미지가 있을 때만 표시, 없으면 생략)"
          },
          {
            "text": "진입 경로 — 교인 홈 최근 공지 요약(SCR-APP-001) 또는 알림 Deep Link(SCR-APP-010, type=notice+content_id)로 진입"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "화면 진입 직후(조회 호출 전)",
            "guard": "공지 id 파라미터 수신, GET 호출 전",
            "result": "제목·게시정보·본문 자리 스켈레톤 표시",
            "message": "",
            "placement": "inline"
          },
          {
            "state": "로딩",
            "trigger": "상세 조회 요청 중",
            "guard": "GET 응답 대기",
            "result": "로딩 인디케이터 표시, 상호작용 보류",
            "message": "",
            "placement": "inline",
            "api": {
              "endpoint": "GET /app/notices/{id}"
            }
          },
          {
            "state": "정상",
            "trigger": "진입",
            "guard": "공지 1건 조회 성공",
            "result": "제목·게시정보·구분선·본문·대표 이미지 표시",
            "message": "",
            "placement": "inline",
            "api": {
              "endpoint": "GET /app/notices/{id}",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답",
            "guard": "본문은 있으나 첨부 이미지 없음(image=null) — 목록 0건은 이 상세 화면 해당 없음",
            "result": "이미지 영역 생략, 제목·본문만 표시",
            "message": "",
            "placement": "inline",
            "api": {
              "endpoint": "GET /app/notices/{id}",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "응답",
            "guard": "서버 오류(5xx)",
            "result": "본문 대신 오류 안내 + 다시 시도 버튼",
            "message": "공지를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.",
            "placement": "full-page",
            "api": {
              "endpoint": "GET /app/notices/{id}",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "응답",
            "guard": "미인증/토큰 만료(401) — 교인(app)은 Bearer JWT 필요",
            "result": "교인 로그인(SCR-APP-009)으로 유도",
            "message": "로그인이 필요해요. 다시 로그인해 주세요.",
            "placement": "full-page",
            "api": {
              "endpoint": "GET /app/notices/{id}",
              "status": 401
            }
          },
          {
            "state": "엣지",
            "trigger": "Deep Link 진입(알림에서 탭)",
            "guard": "그 사이 삭제되었거나 타 교회 공지 id — 멀티테넌트 격리로 미존재(404)",
            "result": "없음 안내 + 홈(SCR-APP-001) 이동",
            "message": "삭제되었거나 찾을 수 없는 공지예요.",
            "placement": "full-page",
            "api": {
              "endpoint": "GET /app/notices/{id}",
              "status": 404
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "appNoticeDetail",
              "intent": "공지 상세 조회",
              "method": "GET",
              "path": "/app/notices/{id}",
              "params": "path: id(공지 ID). tenant는 JWT tenantId로 스코프(path 비노출)",
              "response": "{entities.Notice}",
              "auth": "Bearer",
              "note": "홈 최근 공지(SCR-APP-001)·알림 Deep Link(SCR-APP-010, type=notice+content_id)에서 진입. 멀티테넌트 격리 — 타 교회 공지는 존재를 숨기고 404.",
              "errors": [
                {
                  "status": 401,
                  "when": "미인증/토큰 만료",
                  "message": "로그인이 필요해요. 다시 로그인해 주세요."
                },
                {
                  "status": 404,
                  "when": "삭제되었거나 타 교회 공지(테넌트 격리)",
                  "message": "삭제되었거나 찾을 수 없는 공지예요."
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "공지를 불러오지 못했어요. 잠시 후 다시 시도해 주세요."
                }
              ]
            }
          ],
          "writes": [],
          "events": [
            {
              "name": "notice.detail.view",
              "intent": "공지 상세 열람",
              "when": "상세 화면 진입 시",
              "payload": "{noticeId, tenantId}"
            },
            {
              "name": "notice.detail.back",
              "intent": "뒤로가기로 홈 이동",
              "when": ".pd-back 탭 시",
              "payload": "{noticeId}"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-APP-001",
              "via": "홈 탭",
              "trigger": ".pd-tabbar"
            }
          ]
        }
      },
      {
        "id": "SCR-APP-006",
        "label": "마이",
        "href": "a-my.html",
        "surface": "app",
        "status": "confirmed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-012"
        ],
        "context": "마이 — 내 정보(이름·휴대전화·이메일·교회·가입상태 단순)·설정·알림설정·로그아웃. 교적/직분 없음(G2 민감정보 수집 없음).",
        "components": [
          {
            "role": ".pd-avatar",
            "kind": "card",
            "label": "내 프로필 (이름·휴대전화·이메일·교회·가입상태)"
          },
          {
            "role": ".pd-list",
            "kind": "list",
            "label": "마이 메뉴 — 내 정보 수정·알림 설정·설정",
            "action": {
              "on": "click",
              "do": "go:SCR-APP-007"
            }
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "로그아웃",
            "action": {
              "on": "click",
              "do": "go:SCR-APP-009"
            }
          },
          {
            "role": ".pd-tabbar",
            "kind": "tabbar",
            "label": "하단 탭 — 홈·설교·주보·공지·마이"
          }
        ],
        "description": [
          {
            "text": "로그인 폼 — 아이디·비밀번호 입력 후 로그인(SCR-APP-009). 비로그인 진입 시 노출되는 로그인 유도 영역"
          },
          {
            "text": "회원가입 (가입 후 관리자 승인) — 회원가입 화면(SCR-APP-008). 교회검색 없이 진입 URL로 church_id 자동 바인딩"
          },
          {
            "text": "내 프로필 — 이름·휴대전화·이메일·교회·가입상태(교적/직분 없음·G2 민감정보 미수집). 눌러서 내 정보 수정(SCR-APP-007)",
            "target": ".pd-avatar"
          },
          {
            "text": "마이 메뉴 — 내 정보 수정(SCR-APP-007)·알림 설정(SCR-APP-011)·설정(SCR-APP-012). 영수증·출석·권리요청은 V2.0 봉인(미노출)",
            "target": ".pd-list"
          },
          {
            "text": "로그아웃 — 세션 종료 후 로그인 화면(SCR-APP-009)",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입",
            "guard": "저장된 세션 토큰 유무 판정 전",
            "result": "로그인/비로그인 분기 대기(프로필·로그인 폼 미결정)",
            "message": "",
            "placement": "inline",
            "target": ".pd-avatar"
          },
          {
            "state": "로딩",
            "trigger": "진입(토큰 있음)",
            "guard": "내 정보 응답 대기",
            "result": "프로필 영역 스켈레톤 표시",
            "message": "불러오는 중이에요",
            "placement": "inline",
            "target": ".pd-avatar",
            "api": {
              "endpoint": "GET /app/me"
            }
          },
          {
            "state": "정상",
            "trigger": "진입(로그인·승인완료)",
            "guard": "가입상태=active",
            "result": "프로필·메뉴·로그아웃 표시",
            "message": "",
            "placement": "inline",
            "target": ".pd-avatar",
            "api": {
              "endpoint": "GET /app/me",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답",
            "guard": "가입상태=승인대기(pending)",
            "result": "승인대기 배지·기능 제한 안내",
            "message": "가입 승인을 기다리고 있어요. 관리자 승인 후 모든 기능을 쓸 수 있어요",
            "placement": "banner",
            "target": ".pd-avatar",
            "api": {
              "endpoint": "GET /app/me",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "응답",
            "guard": "서버 오류(5xx)",
            "result": "프로필 로드 실패·재시도 안내",
            "message": "정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요",
            "placement": "banner",
            "target": ".pd-avatar",
            "api": {
              "endpoint": "GET /app/me",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "진입(비로그인)",
            "guard": "세션 토큰 없음/만료",
            "result": "프로필 숨김·로그인 폼 노출",
            "message": "로그인하면 내 정보와 알림을 볼 수 있어요",
            "placement": "inline",
            "api": {
              "endpoint": "GET /app/me",
              "status": 401
            }
          },
          {
            "state": "엣지",
            "trigger": "진입",
            "guard": "JWT tenantId ≠ 접속 교회(slug) — 다른 교회 계정 토큰",
            "result": "접근 차단·해당 교회로 재로그인 유도(멀티테넌트 격리)",
            "message": "이 교회 계정으로 다시 로그인해 주세요",
            "placement": "full-page",
            "api": {
              "endpoint": "GET /app/me",
              "status": 403
            }
          },
          {
            "state": "입력검증",
            "trigger": "로그인 제출",
            "guard": "아이디 또는 비밀번호 미입력(필수누락)",
            "result": "해당 입력란 인라인 오류·제출 차단",
            "message": "아이디와 비밀번호를 모두 입력해 주세요",
            "placement": "inline"
          },
          {
            "state": "입력검증",
            "trigger": "로그인 제출",
            "guard": "자격증명 불일치(아이디/비밀번호 오류)",
            "result": "인라인 오류·재입력",
            "message": "아이디 또는 비밀번호가 올바르지 않아요",
            "placement": "inline",
            "api": {
              "endpoint": "POST /app/auth/login",
              "status": 401
            }
          },
          {
            "state": "정상",
            "trigger": "로그인 제출",
            "guard": "유효성 통과(아이디·비밀번호 일치)",
            "result": "세션 발급·프로필 화면으로 전환",
            "message": "로그인했어요",
            "placement": "toast",
            "api": {
              "endpoint": "POST /app/auth/login",
              "status": 200
            }
          },
          {
            "state": "입력검증",
            "trigger": "로그인 제출",
            "guard": "중복충돌·범위경계: 해당 없음(로그인은 신규 생성/수치 범위 아님 — 회원가입 중복은 SCR-APP-008 소관)",
            "result": "N/A",
            "message": "",
            "placement": "inline"
          },
          {
            "state": "정상",
            "trigger": "로그아웃",
            "guard": "로그인 상태·확인(confirm)",
            "result": "세션 종료 후 로그인 화면(SCR-APP-009) 이동",
            "message": "로그아웃되었어요",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "POST /app/auth/logout",
              "status": 200
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "appMe",
              "intent": "내 정보 조회",
              "method": "GET",
              "path": "/app/me",
              "params": "-",
              "response": "{entities.Member}",
              "auth": "Bearer",
              "note": "tenant = JWT tenantId(경로 비노출·멀티테넌트 격리 강제)",
              "target": ".pd-avatar",
              "errors": [
                {
                  "status": 401,
                  "when": "미인증·토큰 만료",
                  "message": "로그인이 필요해요"
                },
                {
                  "status": 403,
                  "when": "다른 교회 계정 토큰(tenant 불일치)",
                  "message": "이 교회 계정으로 다시 로그인해 주세요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요"
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "appLogin",
              "intent": "로그인(세션 발급)",
              "method": "POST",
              "path": "/app/auth/login",
              "request": "아이디·비밀번호",
              "response": "{entities.Member} + 세션 토큰(JWT)",
              "auth": "none(공개)",
              "idempotency": false,
              "note": "tenant=진입 호스트(slug)로 자동 식별(교회검색 없음). 가역 세션 작업 — 비가역 쓰기 목록 비해당, Idempotency-Key 불요",
              "errors": [
                {
                  "status": 400,
                  "when": "아이디/비밀번호 필수누락",
                  "message": "아이디와 비밀번호를 모두 입력해 주세요"
                },
                {
                  "status": 401,
                  "when": "자격증명 불일치",
                  "message": "아이디 또는 비밀번호가 올바르지 않아요"
                },
                {
                  "status": 429,
                  "when": "로그인 시도 과다(레이트리밋)",
                  "message": "잠시 후 다시 시도해 주세요"
                }
              ]
            },
            {
              "id": "appLogout",
              "intent": "로그아웃(세션 종료)",
              "method": "POST",
              "path": "/app/auth/logout",
              "auth": "Bearer",
              "idempotency": false,
              "confirm": true,
              "note": "가역 세션 종료 — 비가역 쓰기 목록 비해당(Idempotency-Key 불요), confirm 후 실행",
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 401,
                  "when": "이미 만료된 세션",
                  "message": "이미 로그아웃되어 있어요"
                }
              ]
            }
          ],
          "events": [
            {
              "name": "app.auth.login",
              "intent": "로그인 성공",
              "when": "로그인 폼 제출 성공 시"
            },
            {
              "name": "app.auth.logout",
              "intent": "로그아웃",
              "when": "로그아웃 확인 시"
            },
            {
              "name": "app.my.menu_tap",
              "intent": "마이 메뉴 이동",
              "when": "메뉴 행(내 정보 수정·알림 설정·설정) 또는 회원가입 탭 시"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-APP-007",
              "via": "내 정보 수정",
              "trigger": ".pd-list"
            },
            {
              "screen": "SCR-APP-010",
              "via": "알림함",
              "trigger": ".pd-list"
            },
            {
              "screen": "SCR-APP-012",
              "via": "설정",
              "trigger": ".pd-settings"
            },
            {
              "screen": "SCR-APP-011",
              "via": "알림 설정",
              "trigger": ".pd-settings"
            },
            {
              "screen": "SCR-APP-009",
              "via": "로그아웃"
            }
          ]
        }
      },
      {
        "id": "SCR-APP-007",
        "label": "내 정보 수정",
        "href": "a-profile-edit.html",
        "surface": "app",
        "status": "confirmed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-012"
        ],
        "context": "이름·휴대전화·이메일 수정(단순). 민감정보 수집 없음(G2). 교적/직분 없음.",
        "components": [
          {
            "role": ".pd-form",
            "kind": "form",
            "label": "내 정보 수정 폼"
          },
          {
            "role": ".pd-field",
            "kind": "form",
            "label": "이름·연락처·부서·직분"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "저장",
            "action": {
              "on": "click",
              "do": "go:SCR-APP-006"
            }
          }
        ],
        "description": [
          {
            "text": "프로필 사진 변경 — 목록 행을 탭. 별도 사진 편집 화면이 아직 없어 동일 화면을 유지(준비 중, 사진은 V2 데이터 모델 Member에 미포함)."
          },
          {
            "text": "내 정보 수정 폼 — 이름·연락처·부서·직분을 표시. V2.0 저장 대상은 이름·연락처(휴대전화)뿐이고, 부서·직분은 직분체계 봉인(§34)으로 표시 전용.",
            "target": ".pd-form"
          },
          {
            "text": "입력 필드 — 이름(김성도)·연락처(010-••••-1234)는 수정 가능, 부서(청년부)·직분(집사)은 읽기 전용. 주민번호·생년 등 민감정보는 수집하지 않음(G2).",
            "target": ".pd-field"
          },
          {
            "text": "저장 — 이름·연락처를 저장하고 마이로 복귀(SCR-APP-006).",
            "target": ".pd-btn"
          },
          {
            "text": "뒤로 — 저장 없이 마이로 복귀(SCR-APP-006)."
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "화면 진입",
            "guard": "로그인(Bearer) 세션 유효",
            "result": "이름·연락처·부서·직분 기존값 프리필",
            "message": "",
            "placement": "inline",
            "target": ".pd-field",
            "api": {
              "endpoint": "GET /app/me",
              "status": 200
            }
          },
          {
            "state": "로딩",
            "trigger": "프리필 조회 중",
            "guard": "응답 대기",
            "result": "폼 비활성·스켈레톤 표시",
            "message": "내 정보를 불러오는 중이에요",
            "placement": "inline",
            "target": ".pd-form",
            "api": {
              "endpoint": "GET /app/me"
            }
          },
          {
            "state": "정상",
            "trigger": "저장 탭",
            "guard": "이름 입력·연락처 형식 유효(유효)",
            "result": "이름·연락처 저장 후 마이 복귀(SCR-APP-006)",
            "message": "저장했어요",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "PUT /app/me",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "화면 진입",
            "guard": "부서·직분을 교회가 아직 입력하지 않음",
            "result": "부서·직분을 빈 값으로 노출(입력 불가)",
            "message": "부서·직분은 교회 확인 후 표시돼요",
            "placement": "inline",
            "target": ".pd-field",
            "api": {
              "endpoint": "GET /app/me",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "저장 탭",
            "guard": "서버 오류",
            "result": "저장 실패·입력값 유지·재시도 유도",
            "message": "저장하지 못했어요. 잠시 후 다시 시도해 주세요",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "PUT /app/me",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "진입·저장",
            "guard": "세션 만료(미인증)",
            "result": "로그인 화면으로 이동(SCR-APP-009)",
            "message": "로그인이 필요해요. 다시 로그인해 주세요",
            "placement": "full-page",
            "target": ".pd-form",
            "api": {
              "endpoint": "GET /app/me",
              "status": 401
            }
          },
          {
            "state": "엣지",
            "trigger": "저장 연타(중복 제출)",
            "guard": "동일 요청 재전송",
            "result": "Idempotency-Key로 1회만 반영",
            "message": "저장 중이에요. 잠시만 기다려 주세요",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "PUT /app/me",
              "status": 200
            }
          },
          {
            "state": "입력검증",
            "trigger": "저장 탭",
            "guard": "이름 미입력(필수누락)",
            "result": "인라인 오류·저장 차단",
            "message": "이름을 입력해 주세요",
            "placement": "inline",
            "target": ".pd-field",
            "api": {
              "endpoint": "PUT /app/me",
              "status": 422
            }
          },
          {
            "state": "입력검증",
            "trigger": "저장 탭",
            "guard": "연락처 형식 오류(형식오류)",
            "result": "인라인 오류·저장 차단",
            "message": "휴대전화 번호를 확인해 주세요 (예: 010-1234-5678)",
            "placement": "inline",
            "target": ".pd-field",
            "api": {
              "endpoint": "PUT /app/me",
              "status": 422
            }
          },
          {
            "state": "입력검증",
            "trigger": "저장 탭",
            "guard": "연락처가 같은 교회 다른 교인과 중복(중복충돌)",
            "result": "인라인 오류·저장 차단",
            "message": "이미 사용 중인 연락처예요",
            "placement": "inline",
            "target": ".pd-field",
            "api": {
              "endpoint": "PUT /app/me",
              "status": 409
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "appMePrefill",
              "intent": "내 정보 수정 폼 프리필",
              "method": "GET",
              "path": "/app/me",
              "response": "{entities.Member}",
              "auth": "Bearer",
              "target": ".pd-field",
              "note": "tenantId=JWT 클레임, 본인(Member) 레코드만 조회(멀티테넌트 격리·A교회↔B교회 차단). 부서·직분은 직분체계 봉인(§34)으로 표시 전용 값이며 미확보 시 '교회 확인 후 게재'.",
              "errors": [
                {
                  "status": 401,
                  "when": "세션 만료·미인증",
                  "message": "로그인이 필요해요. 다시 로그인해 주세요(SCR-APP-009)"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "내 정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요"
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "appMeUpdate",
              "intent": "내 정보(이름·연락처) 수정",
              "method": "PUT",
              "path": "/app/me",
              "body": "{name, phone}",
              "auth": "Bearer",
              "idempotency": true,
              "response": "{entities.Member}",
              "target": ".pd-btn",
              "note": "tenantId=JWT, 본인 Member 레코드만 수정(타 교인·타 교회 차단). PUT 멱등 — 연타 시 Idempotency-Key로 1회만 반영. 부서·직분은 §34 봉인으로 body에서 제외(미저장), 민감정보(ci·생년 등) 미수집(G2). 가역 수정이라 별도 confirm 모달은 불필요.",
              "errors": [
                {
                  "status": 422,
                  "when": "이름 미입력·휴대전화 형식 오류",
                  "message": "입력값을 확인해 주세요"
                },
                {
                  "status": 409,
                  "when": "연락처가 같은 교회 다른 교인과 중복",
                  "message": "이미 사용 중인 연락처예요"
                },
                {
                  "status": 401,
                  "when": "세션 만료·미인증",
                  "message": "로그인이 필요해요(SCR-APP-009)"
                },
                {
                  "status": 403,
                  "when": "본인 아닌 레코드 수정 시도",
                  "message": "수정 권한이 없어요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "저장하지 못했어요. 잠시 후 다시 시도해 주세요"
                }
              ]
            }
          ],
          "events": [
            {
              "name": "profile.photo.tap",
              "intent": "프로필 사진 변경 진입(준비 중)",
              "when": "프로필 사진 변경 행을 탭할 때",
              "target": ".pd-row"
            },
            {
              "name": "profile.save.success",
              "intent": "프로필 저장 성공 후 마이 복귀",
              "when": "저장 성공(PUT /app/me 200) 시",
              "target": ".pd-btn"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-APP-006",
              "via": "저장/뒤로",
              "trigger": ".pd-btn"
            }
          ]
        }
      },
      {
        "id": "SCR-APP-008",
        "label": "회원가입",
        "href": "a-signup.html",
        "surface": "app",
        "status": "confirmed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-011"
        ],
        "context": "교회 검색 없는 가입 — 교회 URL 진입으로 church_id 자동 바인딩. 이름·휴대전화·이메일+약관 동의. 가입=승인대기.",
        "components": [
          {
            "role": ".pd-form",
            "kind": "form",
            "label": "가입 폼 — 이름·연락처(010-)·아이디·비밀번호"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "가입 신청",
            "action": {
              "on": "click",
              "do": "go:SCR-APP-009"
            }
          }
        ],
        "description": [
          {
            "text": "가입 폼 — 교회 검색 없이 접속한 교회 URL({slug})이 church_id를 자동 바인딩하며, 이름·연락처(010-)·이메일·아이디·비밀번호를 입력. 주민번호 등 민감정보는 수집하지 않음(PIPA 최소수집)",
            "target": ".pd-form"
          },
          {
            "text": "개인정보 동의 — [필수] 수집·이용 동의 + [선택] 문자·푸시 수신·사진영상 노출 + [만 14세 미만] 법정대리인 동의. 목적별 개별 동의(PIPA), 선택 미동의해도 가입 가능"
          },
          {
            "text": "가입 신청 — 제출 시 승인대기(pending)로 접수되고, 관리자 승인 후 로그인(SCR-APP-009)에서 이용 시작",
            "target": ".pd-btn"
          },
          {
            "text": "뒤로 — 마이 화면으로 이동(가입 취소)"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "화면 진입",
            "guard": "교회 URL({slug}) 바인딩됨 · 미인증 방문자",
            "result": "상단에 교회명(○○교회) 표시 · church_id 자동 세팅 · 빈 폼과 안내문 노출",
            "message": "가입 후 관리자 승인을 거쳐 이용할 수 있어요",
            "placement": "banner",
            "target": ".pd-form",
            "api": {
              "endpoint": "GET /churches/{slug}",
              "status": 200
            }
          },
          {
            "state": "로딩",
            "trigger": "가입 신청 제출",
            "guard": "제출 요청 전송 중",
            "result": "가입 신청 버튼 비활성화 · 중복 제출 차단 · 진행 표시",
            "message": "가입 신청을 처리하고 있어요",
            "placement": "inline",
            "target": ".pd-btn"
          },
          {
            "state": "정상",
            "trigger": "가입 신청 제출",
            "guard": "필수 입력 유효 + [필수] 수집·이용 동의 완료",
            "result": "Member(status=pending) 생성 · Consent 기록 · 승인대기 접수",
            "message": "가입 신청이 접수됐어요. 관리자 승인 후 로그인할 수 있어요",
            "placement": "full-page",
            "target": ".pd-btn",
            "api": {
              "endpoint": "POST /churches/{slug}/signup",
              "status": 201
            }
          },
          {
            "state": "빈데이터",
            "trigger": "화면 진입",
            "guard": "빈데이터: 가입은 입력 폼 화면 — 조회·표시할 목록 데이터 없음(해당 없음)",
            "result": "N/A",
            "message": "",
            "placement": "inline",
            "target": ".pd-form"
          },
          {
            "state": "에러",
            "trigger": "가입 신청 제출",
            "guard": "서버/네트워크 오류(5xx)",
            "result": "신청 실패 · 입력값 유지 · 재시도 유도",
            "message": "일시적인 오류로 신청하지 못했어요. 잠시 후 다시 시도해 주세요",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "POST /churches/{slug}/signup",
              "status": 500
            }
          },
          {
            "state": "에러",
            "trigger": "가입 신청 제출",
            "guard": "입력검증(필수누락): 이름·연락처·아이디·비밀번호 중 미입력",
            "result": "첫 미입력 필드 포커스 · 인라인 오류",
            "message": "필수 항목을 모두 입력해 주세요",
            "placement": "inline",
            "target": ".pd-form",
            "api": {
              "endpoint": "POST /churches/{slug}/signup",
              "status": 400
            }
          },
          {
            "state": "에러",
            "trigger": "연락처 입력/제출",
            "guard": "입력검증(형식오류): 연락처가 010-0000-0000 형식이 아님",
            "result": "연락처 필드 인라인 오류",
            "message": "연락처 형식을 확인해 주세요 (예: 010-1234-5678)",
            "placement": "inline",
            "target": ".pd-form",
            "api": {
              "endpoint": "POST /churches/{slug}/signup",
              "status": 400
            }
          },
          {
            "state": "에러",
            "trigger": "가입 신청 제출",
            "guard": "입력검증(중복충돌): 연락처 또는 아이디가 이미 가입됨",
            "result": "인라인 오류 · 로그인 안내",
            "message": "이미 가입된 연락처(또는 아이디)예요. 로그인에서 계정을 찾아보세요",
            "placement": "inline",
            "target": ".pd-form",
            "api": {
              "endpoint": "POST /churches/{slug}/signup",
              "status": 409
            }
          },
          {
            "state": "에러",
            "trigger": "가입 신청 제출",
            "guard": "입력검증: [필수] 수집·이용 동의 미체크",
            "result": "동의 영역 강조 · 제출 차단",
            "message": "[필수] 수집·이용 동의가 필요해요",
            "placement": "inline",
            "api": {
              "endpoint": "POST /churches/{slug}/signup",
              "status": 422
            }
          },
          {
            "state": "권한없음",
            "trigger": "화면 진입",
            "guard": "권한없음: 공개(미인증) 가입 화면 — 접근 제한 없음(해당 없음)",
            "result": "모든 방문자 접근 허용 · 인증 불필요",
            "message": "",
            "placement": "inline",
            "target": ".pd-form"
          },
          {
            "state": "엣지",
            "trigger": "화면 진입",
            "guard": "이미 인증된 교인(JWT 보유)이 가입 화면 재진입",
            "result": "가입 불필요 안내 · 마이로 이동",
            "message": "이미 가입된 계정이에요. 마이에서 정보를 확인하세요",
            "placement": "toast"
          },
          {
            "state": "엣지",
            "trigger": "가입 신청 제출",
            "guard": "만 14세 미만인데 법정대리인 동의 미체크",
            "result": "제출 차단 · 법정대리인 동의 요청",
            "message": "만 14세 미만은 법정대리인 동의가 필요해요",
            "placement": "inline",
            "api": {
              "endpoint": "POST /churches/{slug}/signup",
              "status": 422
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "churchContext",
              "intent": "교회 컨텍스트 조회(교회명·대표색 표시 및 church_id 자동 바인딩)",
              "method": "GET",
              "path": "/churches/{slug}",
              "params": "{slug}(진입 URL)",
              "response": "{entities.Church}",
              "auth": "none(공개)",
              "target": ".pd-form",
              "errors": [
                {
                  "status": 404,
                  "when": "존재하지 않는 교회 slug",
                  "message": "요청하신 교회를 찾을 수 없어요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "교회 정보를 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "appSignup",
              "intent": "회원가입 신청(승인대기 Member 생성 + 목적별 동의 기록)",
              "method": "POST",
              "path": "/churches/{slug}/signup",
              "body": "{name, phone, loginId, password, department, consents:[{purpose, granted}], minorGuardianConsent}",
              "response": "{entities.Member} (status=pending) + {entities.Consent}",
              "auth": "none(공개)",
              "idempotency": true,
              "confirm": "가입 신청 제출 = 입력·동의 확인 후 1회 생성, 감사로그 기록",
              "note": "church_id는 {slug}로 서버가 자동 결정(path {slug} 외 tenant 비노출, A교회↔B교회 격리). 연락처 기반 Idempotency-Key로 중복 가입 차단. 주민번호 등 민감정보 미수집(PIPA 최소수집·G2). 가입=승인대기(pending)→관리자 승인→active.",
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 400,
                  "when": "필수누락/형식오류(연락처 형식 등)",
                  "message": "입력 항목을 다시 확인해 주세요"
                },
                {
                  "status": 409,
                  "when": "연락처·아이디 중복",
                  "message": "이미 가입된 연락처(또는 아이디)예요"
                },
                {
                  "status": 422,
                  "when": "[필수] 수집·이용 미동의 또는 만 14세 미만 법정대리인 동의 누락",
                  "message": "필수 동의를 완료해 주세요"
                },
                {
                  "status": 429,
                  "when": "과도한 가입 시도(레이트리밋)",
                  "message": "요청이 많아요. 잠시 후 다시 시도해 주세요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "일시적인 오류로 신청하지 못했어요"
                }
              ]
            }
          ],
          "events": [
            {
              "name": "app.signup.submit",
              "intent": "회원가입 신청 제출",
              "when": "가입 신청 버튼 클릭",
              "target": ".pd-btn"
            },
            {
              "name": "app.signup.consent.toggle",
              "intent": "개인정보 동의 체크 토글",
              "when": "동의 체크박스 선택/해제",
              "target": ".pd-check"
            },
            {
              "name": "app.signup.department.select",
              "intent": "부서 선택",
              "when": "부서 칩 선택",
              "target": ".pd-chips"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-APP-009",
              "via": "가입 완료→로그인"
            }
          ]
        }
      },
      {
        "id": "SCR-APP-009",
        "label": "교인 로그인",
        "href": "a-login.html",
        "surface": "app",
        "status": "wireframed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-011"
        ],
        "context": "교인 로그인(소셜4사+아이디). 교회 URL이 Tenant 확정(교회 검색 없음). 가입 유도.",
        "components": [
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "회원가입",
            "action": {
              "on": "click",
              "do": "go:SCR-APP-001"
            }
          },
          {
            "role": ".pd-form",
            "kind": "form",
            "label": "아이디 로그인 — 아이디 또는 이메일·비밀번호"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "회원가입",
            "action": {
              "on": "click",
              "do": "go:SCR-APP-008"
            }
          }
        ],
        "description": [
          {
            "text": "교회 컨텍스트 — 접속하신 교회 주소로 소속 교회가 자동 확정(교회 검색 없음). ○○교회 로고·교회명을 로그인 카드 상단에 표시"
          },
          {
            "text": "소셜 로그인 4사 — 카카오·네이버·구글·애플로 시작하기. 성공 시 교인 홈(SCR-APP-001)으로 이동",
            "target": ".pd-btn"
          },
          {
            "text": "아이디 로그인 — '아이디 또는 이메일'·'비밀번호' 입력 후 로그인(성공 시 교인 홈 SCR-APP-001), 비밀번호 찾기 포함",
            "target": ".pd-form"
          },
          {
            "text": "회원가입 유도 — '아직 회원이 아니신가요?' 안내와 함께 회원가입(SCR-APP-008)으로 이동",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입",
            "guard": "접속 교회 주소 바인딩됨·브랜딩 로드 완료",
            "result": "로그인 카드 표시·○○교회 로고/교회명 렌더",
            "message": "",
            "placement": "inline",
            "api": {
              "endpoint": "GET /app/church",
              "status": 200
            }
          },
          {
            "state": "로딩",
            "trigger": "로그인 제출",
            "guard": "인증 응답 대기 중",
            "result": "로그인 버튼 비활성·중복 제출 방지",
            "message": "로그인 중이에요",
            "placement": "inline",
            "target": ".pd-btn"
          },
          {
            "state": "정상",
            "trigger": "로그인",
            "guard": "자격증명 유효·가입상태 active",
            "result": "JWT(tenantId claim) 발급·교인 홈 이동",
            "message": "",
            "placement": "inline",
            "target": ".pd-btn",
            "api": {
              "endpoint": "POST /app/auth/login",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "진입",
            "guard": "교회 로고·대표색 미설정",
            "result": "단일 Design System 기본 로고·'○○교회' placeholder 표시",
            "message": "교회 확인 후 게재",
            "placement": "inline"
          },
          {
            "state": "에러",
            "trigger": "로그인",
            "guard": "자격증명 불일치",
            "result": "인라인 오류·입력값 유지",
            "message": "아이디 또는 비밀번호를 확인해 주세요",
            "placement": "inline",
            "target": ".pd-form",
            "api": {
              "endpoint": "POST /app/auth/login",
              "status": 401
            }
          },
          {
            "state": "에러",
            "trigger": "로그인",
            "guard": "서버 오류",
            "result": "재시도 안내",
            "message": "로그인에 실패했어요. 잠시 후 다시 시도해 주세요",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "POST /app/auth/login",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "로그인",
            "guard": "가입상태=승인대기(pending)",
            "result": "접근 차단",
            "message": "가입 승인 대기 중이에요. 관리자 승인 후 이용할 수 있어요",
            "placement": "inline",
            "target": ".pd-form",
            "api": {
              "endpoint": "POST /app/auth/login",
              "status": 403
            }
          },
          {
            "state": "엣지",
            "trigger": "소셜 로그인",
            "guard": "OAuth 취소·미연동 계정",
            "result": "로그인 화면 복귀",
            "message": "소셜 로그인이 취소됐어요. 다시 시도해 주세요",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "POST /app/auth/login",
              "status": 422
            }
          },
          {
            "state": "엣지",
            "trigger": "로그인",
            "guard": "반복 실패로 레이트리밋",
            "result": "일시 차단·대기 안내",
            "message": "로그인 시도가 많아요. 잠시 후 다시 시도해 주세요",
            "placement": "banner",
            "target": ".pd-form",
            "api": {
              "endpoint": "POST /app/auth/login",
              "status": 429
            }
          },
          {
            "state": "필수누락",
            "trigger": "로그인",
            "guard": "아이디 또는 비밀번호 미입력",
            "result": "제출 차단·인라인 검증",
            "message": "아이디와 비밀번호를 입력해 주세요",
            "placement": "inline",
            "target": ".pd-form"
          },
          {
            "state": "형식오류",
            "trigger": "로그인",
            "guard": "아이디(이메일) 형식 오류",
            "result": "인라인 검증",
            "message": "아이디 또는 이메일 형식을 확인해 주세요",
            "placement": "inline",
            "target": ".pd-form"
          },
          {
            "state": "중복충돌",
            "trigger": "로그인",
            "guard": "중복충돌: 해당 없음(로그인은 인증이며 신규 생성 아님)",
            "result": "N/A",
            "message": ""
          },
          {
            "state": "유효",
            "trigger": "로그인",
            "guard": "아이디·비밀번호 형식 유효",
            "result": "서버 인증 요청으로 진행",
            "message": "",
            "placement": "inline",
            "target": ".pd-form"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "appChurchBranding",
              "intent": "교회 브랜딩 조회(로그인 카드)",
              "method": "GET",
              "path": "/app/church",
              "response": "{entities.Church}",
              "auth": "없음(공개)",
              "note": "tenant는 접속 host로 서버가 자동 결정(교회 검색 없음·path 비노출). 로고·대표색·교회명 등 교회별 변경 4요소만 공개 노출",
              "errors": [
                {
                  "status": 404,
                  "when": "교회 주소 미존재",
                  "message": "교회를 찾을 수 없어요"
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "appLogin",
              "intent": "교인 로그인(JWT 발급)",
              "method": "POST",
              "path": "/app/auth/login",
              "body": "{provider | identifier, credential}",
              "auth": "없음(공개)",
              "note": "tenant는 접속 host로 서버가 자동 결정되어 JWT tenantId claim에 바인딩(path 비노출·교차테넌트 차단·§54·55). 인증 전용으로 데이터 비가역 변경이 아니므로 멱등키 불필요. 반복 실패는 레이트리밋(429)",
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 400,
                  "when": "아이디/비밀번호 미입력·형식오류",
                  "message": "아이디와 비밀번호를 입력해 주세요"
                },
                {
                  "status": 401,
                  "when": "자격증명 불일치",
                  "message": "아이디 또는 비밀번호를 확인해 주세요"
                },
                {
                  "status": 403,
                  "when": "가입 승인 대기(pending)",
                  "message": "가입 승인 대기 중이에요. 관리자 승인 후 이용할 수 있어요"
                },
                {
                  "status": 422,
                  "when": "소셜 로그인 취소·미연동",
                  "message": "소셜 로그인이 취소됐어요. 다시 시도해 주세요"
                },
                {
                  "status": 429,
                  "when": "반복 실패 레이트리밋",
                  "message": "로그인 시도가 많아요. 잠시 후 다시 시도해 주세요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "로그인에 실패했어요. 잠시 후 다시 시도해 주세요"
                }
              ]
            }
          ],
          "events": [
            {
              "name": "auth.social.start",
              "intent": "소셜 로그인 시작(카카오·네이버·구글·애플)",
              "target": ".pd-btn"
            },
            {
              "name": "auth.login.submit",
              "intent": "아이디 로그인 제출",
              "target": ".pd-form"
            },
            {
              "name": "auth.login.success",
              "intent": "로그인 성공·교인 홈 이동",
              "target": ".pd-btn"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-APP-001",
              "via": "로그인 성공",
              "trigger": ".pd-btn"
            },
            {
              "screen": "SCR-APP-008",
              "via": "회원가입"
            }
          ]
        }
      },
      {
        "id": "SCR-APP-010",
        "label": "알림",
        "href": "a-notifications.html",
        "surface": "app",
        "status": "confirmed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-015",
          "REQ-017"
        ],
        "context": "알림 수신함(설교·공지·주보). 클릭 시 Deep Link로 해당 콘텐츠 이동(type+content_id).",
        "components": [
          {
            "role": ".pd-list",
            "kind": "list",
            "label": "알림 수신함 — 설교·공지·주보 유형의 받은 알림(최신순)"
          },
          {
            "role": ".pd-row",
            "kind": "card",
            "label": "알림 항목 — 아이콘·제목(예: 새 설교가 등록됐어요)·부제(로마서 강해 12 · 방금)·이동 화살표. 탭 시 Deep Link(type+content_id)로 해당 콘텐츠 이동",
            "action": {
              "on": "click",
              "do": "go:SCR-APP-005"
            }
          },
          {
            "role": ".pd-tabbar",
            "kind": "tabbar",
            "label": "하단 탭 — 홈·설교·주보·공지·마이"
          }
        ],
        "description": [
          {
            "text": "알림 수신함 — 설교·공지·주보 유형의 받은 알림을 최신순으로 표시(읽음·안읽음 구분)",
            "target": ".pd-list"
          },
          {
            "text": "알림 항목 — 아이콘·제목(예: 새 설교가 등록됐어요)과 부제(로마서 강해 12 · 방금). 탭 시 Deep Link(type+content_id)로 해당 콘텐츠 이동: 설교는 설교 상세(SCR-APP-003)·공지는 공지(SCR-APP-005)·주보는 주보(SCR-APP-004)",
            "target": ".pd-row"
          },
          {
            "text": "하단 탭 — 홈(SCR-APP-001)·설교(SCR-APP-002)·주보(SCR-APP-004)·공지(SCR-APP-015)·마이(SCR-APP-006)로 이동",
            "target": ".pd-tabbar"
          },
          {
            "text": "상단바 — 제목 '알림', 뒤로가기 탭 시 홈으로 복귀(SCR-APP-001)"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "홈 알림 진입 또는 Web Push 클릭으로 진입",
            "guard": "로그인 세션(Bearer) 유효, 수신함 응답 전",
            "result": "수신함 골격(스켈레톤) 표시",
            "message": "",
            "placement": "inline",
            "target": ".pd-list"
          },
          {
            "state": "로딩",
            "trigger": "수신함 조회 요청",
            "guard": "응답 대기 중",
            "result": "로딩 표시",
            "message": "알림을 불러오는 중이에요",
            "placement": "inline",
            "target": ".pd-list"
          },
          {
            "state": "정상",
            "trigger": "수신함 응답",
            "guard": "알림 1건 이상",
            "result": "읽음·안읽음 구분해 최신순 목록 표시",
            "message": "",
            "placement": "inline",
            "target": ".pd-list",
            "api": {
              "endpoint": "GET /app/notifications",
              "status": 200
            }
          },
          {
            "state": "정상",
            "trigger": "알림 항목 탭",
            "guard": "미읽음 알림 항목",
            "result": "읽음 처리 후 type+content_id Deep Link로 해당 콘텐츠 이동(설교 상세 SCR-APP-003·공지 SCR-APP-005·주보 SCR-APP-004)",
            "message": "",
            "placement": "inline",
            "target": ".pd-row",
            "api": {
              "endpoint": "PUT /app/notifications/{id}/read",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "수신함 응답",
            "guard": "알림 0건",
            "result": "빈 상태 안내",
            "message": "아직 받은 알림이 없어요. 새 설교·공지·주보가 등록되면 여기로 알려드려요",
            "placement": "inline",
            "target": ".pd-list",
            "api": {
              "endpoint": "GET /app/notifications",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "수신함 응답",
            "guard": "서버 오류(5xx)",
            "result": "재시도 유도",
            "message": "알림을 불러오지 못했어요. 잠시 후 다시 시도해 주세요",
            "placement": "toast",
            "target": ".pd-list",
            "api": {
              "endpoint": "GET /app/notifications",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "진입",
            "guard": "미인증 또는 세션 만료(JWT 없음·만료) — app(교인) 화면",
            "result": "로그인 유도 후 알림함으로 복귀",
            "message": "로그인하면 우리 교회 소식 알림을 받을 수 있어요",
            "placement": "full-page",
            "target": ".pd-list",
            "api": {
              "endpoint": "GET /app/notifications",
              "status": 401
            }
          },
          {
            "state": "엣지",
            "trigger": "알림 항목 탭(Deep Link 해석)",
            "guard": "연결된 콘텐츠가 삭제·비공개됨(content_id 대상 없음)",
            "result": "안내 후 수신함 유지",
            "message": "연결된 소식을 찾을 수 없어요. 교회에서 내렸거나 삭제된 글일 수 있어요",
            "placement": "toast",
            "target": ".pd-row",
            "api": {
              "endpoint": "GET /app/notifications/{id}",
              "status": 404
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "appNotifications",
              "intent": "알림 수신함 조회",
              "method": "GET",
              "path": "/app/notifications?cursor=&limit=20",
              "response": "{entities.Notification}[]",
              "auth": "Bearer",
              "target": ".pd-list",
              "note": "tenant=JWT tenantId 스코프 강제(타 교회 알림 차단)·본인(memberId) 수신분만. cursor 페이지네이션. type enum=sermon·notice·bulletin.",
              "errors": [
                {
                  "status": 401,
                  "when": "미인증·세션 만료",
                  "message": "로그인하면 우리 교회 소식 알림을 받을 수 있어요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "알림을 불러오지 못했어요. 잠시 후 다시 시도해 주세요"
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "appNotifRead",
              "intent": "알림 읽음 처리",
              "method": "PUT",
              "path": "/app/notifications/{id}/read",
              "auth": "Bearer",
              "target": ".pd-row",
              "idempotency": true,
              "confirm": false,
              "note": "PUT 멱등(동일 id 반복 호출 안전)·비가역 대량전이 아님→확인(confirm) 불필요. tenant=JWT 스코프 강제(타 교회 알림 접근 차단).",
              "errors": [
                {
                  "status": 401,
                  "when": "미인증",
                  "message": "다시 로그인해 주세요"
                },
                {
                  "status": 404,
                  "when": "알림 없음·삭제됨",
                  "message": "연결된 소식을 찾을 수 없어요"
                }
              ]
            }
          ],
          "events": [
            {
              "id": "notifOpen",
              "intent": "알림 항목 탭 시 읽음 처리 후 Deep Link로 해당 콘텐츠 이동",
              "name": "notification.open",
              "trigger": ".pd-row click",
              "target": ".pd-row"
            },
            {
              "id": "pushDeepLink",
              "intent": "Web Push 알림 클릭 시 type+content_id로 해당 콘텐츠 Deep Link 이동(설교 상세·공지·주보)",
              "name": "push.deeplink.click",
              "trigger": "ServiceWorker notificationclick"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-APP-005",
              "via": "공지 딥링크"
            },
            {
              "screen": "SCR-APP-002",
              "via": "설교 딥링크"
            },
            {
              "screen": "SCR-APP-004",
              "via": "주보 딥링크"
            },
            {
              "screen": "SCR-APP-011",
              "via": "알림 설정",
              "trigger": ".pd-apptop"
            }
          ]
        }
      },
      {
        "id": "SCR-APP-011",
        "label": "알림 설정 (Web Push)",
        "href": "a-notif-settings.html",
        "surface": "app",
        "status": "confirmed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-015"
        ],
        "context": "Web Push 권한 요청·구독 토글. iOS 16.4+ 홈설치 PWA 안내. 카테고리별 수신설정.",
        "components": [
          {
            "role": ".pd-toggle",
            "kind": "toggle",
            "label": "수신 채널 — 푸시 알림·문자(SMS, 야간 21~08시 제외) on/off"
          },
          {
            "role": ".pd-toggle",
            "kind": "toggle",
            "label": "수신 채널 — 푸시 알림·문자(SMS, 야간 21~08시 제외) on/off"
          }
        ],
        "description": [
          {
            "text": "안내 문구 — '받고 싶은 알림만 선택하세요.' 문자·푸시 수신동의(PIPA)와 연동됨을 안내"
          },
          {
            "text": "알림 종류 — 새 설교 알림·공지 알림·댓글 알림을 항목별 토글로 켜고 끔(기본: 설교·공지 ON, 댓글 OFF). 댓글은 커뮤니티 봉인(feature-flag OFF)으로 기본 비활성",
            "target": ".pd-toggle"
          },
          {
            "text": "수신 채널 — 푸시 알림·문자(SMS) 토글. 푸시 ON은 이 기기 Web Push 구독 등록, 문자는 야간(21~08시) 발송 제외",
            "target": ".pd-toggle"
          },
          {
            "text": "뒤로 — 변경 즉시 저장 후 마이(SCR-APP-006)로 복귀"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "화면 진입(설정 로드 전)",
            "guard": "로그인(Bearer JWT·tenantId=소속 교회 자동 바인딩)",
            "result": "토글 골격 표시·조작 잠금(현재 값 미표시)",
            "message": "",
            "placement": "inline",
            "target": ".pd-toggle"
          },
          {
            "state": "로딩",
            "trigger": "화면 진입",
            "guard": "로그인",
            "result": "현재 구독·카테고리·채널 수신 상태 조회 중",
            "message": "알림 설정을 불러오는 중이에요",
            "placement": "inline",
            "target": ".pd-toggle",
            "api": {
              "endpoint": "GET /app/notif-settings",
              "status": 200
            }
          },
          {
            "state": "정상",
            "trigger": "설정 조회 완료",
            "guard": "로그인",
            "result": "새 설교·공지·댓글 및 푸시·문자 토글이 현재 값으로 반영(기본: 설교·공지·푸시 ON, 댓글·문자 OFF)",
            "message": "",
            "placement": "inline",
            "target": ".pd-toggle",
            "api": {
              "endpoint": "GET /app/notif-settings",
              "status": 200
            }
          },
          {
            "state": "정상",
            "trigger": "푸시 알림 토글 ON",
            "guard": "브라우저 알림 권한 허용·수신동의",
            "result": "이 기기 Web Push 구독 등록(멀티기기 다중 구독)·토글 ON 유지",
            "message": "이제 새 소식을 푸시 알림으로 받을 수 있어요",
            "placement": "toast",
            "target": ".pd-toggle",
            "api": {
              "endpoint": "POST /me/push-subscriptions",
              "status": 201
            }
          },
          {
            "state": "정상",
            "trigger": "알림 종류·채널 토글 변경",
            "guard": "로그인",
            "result": "수신 설정 즉시 저장(카테고리·문자 수신동의 반영)",
            "message": "알림 설정을 저장했어요",
            "placement": "toast",
            "target": ".pd-toggle",
            "api": {
              "endpoint": "PUT /app/notif-settings",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "첫 진입(구독 기기 0건)",
            "guard": "등록된 Web Push 구독 없음",
            "result": "전체 OFF 기본값 표시·구독 유도",
            "message": "아직 알림을 받는 기기가 없어요. 푸시 알림을 켜면 이 기기가 등록돼요",
            "placement": "inline",
            "target": ".pd-toggle",
            "api": {
              "endpoint": "GET /app/notif-settings",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "푸시 알림 토글 ON",
            "guard": "브라우저 알림 권한 거부",
            "result": "구독 실패·토글 OFF 원복",
            "message": "브라우저 알림 권한이 꺼져 있어요. 브라우저 설정에서 알림을 허용해 주세요",
            "placement": "inline",
            "target": ".pd-toggle"
          },
          {
            "state": "에러",
            "trigger": "설정 저장",
            "guard": "서버 오류(500)",
            "result": "저장 실패·토글 원복·재시도 안내",
            "message": "설정을 저장하지 못했어요. 잠시 후 다시 시도해 주세요",
            "placement": "toast",
            "target": ".pd-toggle",
            "api": {
              "endpoint": "PUT /app/notif-settings",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "진입·토글 저장",
            "guard": "세션 만료·미인증(401)",
            "result": "교인 로그인(SCR-APP-009)으로 이동",
            "message": "로그인이 필요해요. 다시 로그인해 주세요",
            "placement": "full-page",
            "target": ".pd-toggle",
            "api": {
              "endpoint": "GET /app/notif-settings",
              "status": 401
            }
          },
          {
            "state": "엣지",
            "trigger": "iOS Safari·홈 미설치에서 푸시 ON",
            "guard": "iOS 16.4+·홈 화면 미설치",
            "result": "구독 보류·홈 화면 추가 단계 안내",
            "message": "홈 화면에 추가한 뒤 알림을 켤 수 있어요(iOS 16.4 이상)",
            "placement": "inline",
            "target": ".pd-toggle"
          },
          {
            "state": "엣지",
            "trigger": "이미 구독된 기기에서 재구독",
            "guard": "동일 endpoint 기존 구독 존재(Idempotency·중복충돌)",
            "result": "멱등 처리·중복 등록 없음",
            "message": "이 기기는 이미 알림을 받고 있어요",
            "placement": "toast",
            "target": ".pd-toggle",
            "api": {
              "endpoint": "POST /me/push-subscriptions",
              "status": 200
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "appNotifSettings",
              "intent": "알림 수신 설정 조회",
              "method": "GET",
              "path": "/app/notif-settings",
              "params": "없음(tenantId·memberId=JWT·path 비노출)",
              "response": "{ subscribed, categories(sermon·notice·comment), channels(push·sms), quietHours } — '{entities.Notification}' 수신 선호 + '{entities.PushSubscription}' 구독 여부 + '{entities.Consent}'(messaging) 반영. 댓글은 커뮤니티 봉인으로 비활성·기본 OFF",
              "auth": "Bearer",
              "target": ".pd-toggle",
              "errors": [
                {
                  "status": 401,
                  "when": "세션 만료·미인증",
                  "message": "로그인이 필요해요. 다시 로그인해 주세요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "알림 설정을 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "appPushSubscribe",
              "intent": "Web Push 구독 등록(이 기기)",
              "method": "POST",
              "path": "/me/push-subscriptions",
              "body": "{ endpoint, p256dhKey, authKey, userAgent } → '{entities.PushSubscription}' 생성(tenantId·memberId=JWT)",
              "auth": "Bearer",
              "idempotency": true,
              "note": "Idempotency-Key + endpoint 기준 멱등(동일 기기 재구독 시 중복 없음·200). 멀티기기 다중 구독 허용. iOS는 홈설치 PWA(16.4+)에서만. tenant·본인 구독만(A교회↔B교회 격리). 토글이므로 별도 confirm 불필요(가역·해지 가능)",
              "target": ".pd-toggle",
              "errors": [
                {
                  "status": 401,
                  "when": "미인증",
                  "message": "로그인이 필요해요"
                },
                {
                  "status": 403,
                  "when": "수신동의(messaging) 미동의",
                  "message": "알림 수신에 동의해야 켤 수 있어요"
                },
                {
                  "status": 422,
                  "when": "VAPID 구독정보 오류·iOS 홈 미설치",
                  "message": "이 환경에서는 알림을 켤 수 없어요(홈 화면 추가 후 이용)"
                }
              ]
            },
            {
              "id": "appPushUnsubscribe",
              "intent": "Web Push 구독 해지(이 기기)",
              "method": "DELETE",
              "path": "/me/push-subscriptions/{id}",
              "auth": "Bearer",
              "idempotency": true,
              "note": "멱등(이미 해지 시 204·에러 아님). 본인·현재 기기 '{entities.PushSubscription}'만. 푸시 토글 OFF 시 호출",
              "target": ".pd-toggle",
              "errors": [
                {
                  "status": 401,
                  "when": "미인증",
                  "message": "로그인이 필요해요"
                }
              ]
            },
            {
              "id": "appNotifSettingsUpdate",
              "intent": "알림 종류·채널 수신 설정 저장",
              "method": "PUT",
              "path": "/app/notif-settings",
              "body": "{ categories(sermon·notice·comment), channels(push·sms), quietHours } → '{entities.Notification}' 수신 선호 갱신 + 문자 수신동의는 '{entities.Consent}'(purpose=messaging) 반영",
              "auth": "Bearer",
              "note": "가역(언제든 재변경). tenantId·memberId=JWT·본인 레코드만. 문자(SMS) 야간(21~08시) 발송 제외 규칙 저장. 댓글 카테고리는 커뮤니티 봉인으로 저장되나 발송 비활성",
              "target": ".pd-toggle",
              "errors": [
                {
                  "status": 401,
                  "when": "미인증",
                  "message": "로그인이 필요해요. 다시 로그인해 주세요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "설정을 저장하지 못했어요"
                }
              ]
            }
          ],
          "events": [
            {
              "id": "swRegister",
              "name": "push.sw.register",
              "intent": "서비스워커 등록·푸시 구독 수명주기 관리",
              "when": "앱 최초 로드 및 푸시 토글 ON 시",
              "trigger": "navigator.serviceWorker.register"
            },
            {
              "id": "pushPermission",
              "name": "push.permission.request",
              "intent": "브라우저 알림 권한 요청",
              "when": "푸시 알림 토글 ON",
              "trigger": "Notification.requestPermission()"
            },
            {
              "id": "pushSubscriptionChange",
              "name": "push.subscription.expire",
              "intent": "만료·변경된 구독 정리·재등록",
              "when": "pushsubscriptionchange 이벤트 수신",
              "trigger": "ServiceWorker pushsubscriptionchange"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-APP-006",
              "via": "저장/뒤로",
              "trigger": ".pd-btn"
            }
          ]
        }
      },
      {
        "id": "SCR-APP-012",
        "label": "설정",
        "href": "a-settings.html",
        "surface": "app",
        "status": "confirmed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-006"
        ],
        "context": "설정 — 글자크기·앱정보·알림설정·회원탈퇴. 단순.",
        "components": [
          {
            "role": ".pd-settings",
            "kind": "list",
            "label": "설정 목록 — 알림 설정·글자 크기(보통)·홈 화면 설치 안내(PWA)·이용약관·개인정보처리방침·앱 정보(v1.0.0)"
          },
          {
            "role": ".pd-row",
            "kind": "card",
            "label": "알림 설정",
            "action": {
              "on": "click",
              "do": "go:SCR-APP-011"
            }
          },
          {
            "role": ".pd-withdraw",
            "kind": "button",
            "label": "회원 탈퇴"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "뒤로",
            "action": {
              "on": "click",
              "do": "go:SCR-APP-006"
            }
          }
        ],
        "description": [
          {
            "text": "설정 목록 — 알림 설정(SCR-APP-011)·글자 크기(현재 '보통')·홈 화면 설치 안내(SCR-SITE-007)·이용약관·개인정보처리방침(SCR-SITE-008)·앱 정보(v1.0.0). 글자 크기·앱 정보는 현재 화면에서 값만 표시하고, 나머지 행은 탭하면 해당 화면으로 이동.",
            "target": ".pd-settings"
          },
          {
            "text": "알림 설정 행 — Web Push 수신 및 설교·주보·공지 알림 토글 화면(SCR-APP-011)으로 이동.",
            "target": ".pd-row"
          },
          {
            "text": "회원 탈퇴 버튼 — 탭하면 2단계 확인 블록(.pd-confirm)이 열림. 비가역 처리라 바로 삭제하지 않고 사유 입력·확정을 거침.",
            "target": ".pd-withdraw"
          },
          {
            "text": "회원 탈퇴 2단계 확인(.pd-confirm) — 사유(필수)를 입력하고 '탈퇴 확정'. 계정·개인정보가 파기되어 되돌릴 수 없으며, 기부금영수증 등 법정 보존 의무 항목만 보존기간까지 예외 보관. 확정 시 로그아웃→로그인(SCR-APP-009), 취소 시 마이(SCR-APP-006)."
          },
          {
            "text": "하단 로그아웃 버튼은 세션 종료 후 로그인 화면(SCR-APP-009)으로, 상단 뒤로는 마이(SCR-APP-006)로 이동.",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입",
            "guard": "로그인 세션 유효(Bearer)·설정값 미수신",
            "result": "설정 목록 골격 표시, 회원 탈퇴 확인 블록은 닫힘",
            "message": "",
            "placement": "inline",
            "target": ".pd-settings"
          },
          {
            "state": "로딩",
            "trigger": "진입",
            "guard": "GET /app/settings 응답 대기",
            "result": "글자 크기·앱 버전 자리 스켈레톤 표시",
            "message": "불러오는 중",
            "placement": "inline",
            "target": ".pd-settings"
          },
          {
            "state": "정상",
            "trigger": "진입",
            "guard": "설정 수신 완료",
            "result": "글자 크기(보통)·앱 정보(v1.0.0)·각 설정 행 표시",
            "message": "",
            "placement": "inline",
            "target": ".pd-settings",
            "api": {
              "endpoint": "GET /app/settings",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "진입",
            "guard": "빈데이터: 해당 없음 — 설정은 항상 기본값(글자 크기 '보통'·앱 버전 상수)을 보유",
            "result": "빈 상태 화면 없음(항상 기본값 표시)",
            "message": "",
            "placement": "inline",
            "target": ".pd-settings"
          },
          {
            "state": "에러",
            "trigger": "진입",
            "guard": "GET /app/settings 서버 오류(500)",
            "result": "기본값으로 폴백·재시도 안내",
            "message": "설정을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.",
            "placement": "banner",
            "target": ".pd-settings",
            "api": {
              "endpoint": "GET /app/settings",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "진입",
            "guard": "세션 만료·미인증(401)",
            "result": "로그인 화면(SCR-APP-009)으로 유도",
            "message": "로그인이 필요해요. 다시 로그인해 주세요.",
            "placement": "full-page",
            "target": ".pd-settings",
            "api": {
              "endpoint": "GET /app/settings",
              "status": 401
            }
          },
          {
            "state": "엣지",
            "trigger": "탈퇴 확정 네트워크 재전송",
            "guard": "동일 Idempotency-Key — 이미 탈퇴 처리됨",
            "result": "중복 삭제 없이 동일 결과(멱등)·로그아웃 상태 유지",
            "message": "이미 탈퇴 처리된 계정이에요.",
            "placement": "toast",
            "target": ".pd-withdraw",
            "api": {
              "endpoint": "DELETE /app/me",
              "status": 200
            }
          },
          {
            "state": "정상",
            "trigger": "탈퇴 확정(입력검증·필수누락)",
            "guard": "사유(필수) 미입력",
            "result": "확정 차단·사유 입력 요구",
            "message": "탈퇴 사유를 입력해 주세요.",
            "placement": "inline"
          },
          {
            "state": "엣지",
            "trigger": "사유 입력(입력검증·형식/경계/중복)",
            "guard": "형식오류·범위경계·중복충돌: 해당 없음 — 사유는 자유 서술 텍스트(길이 상한만 클라이언트 트림)",
            "result": "형식 검증 없이 통과",
            "message": "",
            "placement": "inline"
          },
          {
            "state": "정상",
            "trigger": "사유 입력 후 탈퇴 확정(입력검증·유효)",
            "guard": "사유 입력됨·2단계 확인 승인",
            "result": "계정·개인정보 파기 후 로그아웃→로그인(SCR-APP-009)",
            "message": "탈퇴가 완료됐어요. 그동안 이용해 주셔서 감사합니다.",
            "placement": "toast",
            "target": ".pd-withdraw",
            "api": {
              "endpoint": "DELETE /app/me",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "탈퇴 확정",
            "guard": "서버 오류(500)·처리불가(422)",
            "result": "삭제 미수행·재시도 유도",
            "message": "탈퇴를 처리하지 못했어요. 잠시 후 다시 시도해 주세요.",
            "placement": "toast",
            "target": ".pd-withdraw",
            "api": {
              "endpoint": "DELETE /app/me",
              "status": 500
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "appSettings",
              "intent": "설정·앱정보 로드",
              "method": "GET",
              "path": "/app/settings",
              "params": "-",
              "response": "{fontSize:'보통', appVersion:'v1.0.0'} — 엔티티 아님(클라이언트 글자크기·앱 상수값)",
              "auth": "Bearer",
              "target": ".pd-settings",
              "errors": [
                {
                  "status": 401,
                  "when": "세션 만료·미인증",
                  "message": "로그인이 필요해요. 다시 로그인해 주세요."
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "설정을 불러오지 못했어요. 잠시 후 다시 시도해 주세요."
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "appWithdraw",
              "intent": "회원 탈퇴(비가역)",
              "method": "DELETE",
              "path": "/app/me",
              "body": "{reason}(사유 필수)",
              "response": "202 접수 → '{entities.Member}'.status=withdrawn·PII 파기",
              "auth": "Bearer",
              "idempotency": true,
              "confirm": "2단계 확인(사유 입력 후 '탈퇴 확정')",
              "note": "비가역 삭제 — Idempotency-Key 헤더 + 2단계 확인(confirm) + 감사로그. tenant=JWT tenantId·본인 레코드만(교차테넌트 차단). 기부금영수증 등 법정 보존 의무 항목은 보존기간까지 예외 보존(세무).",
              "target": ".pd-withdraw",
              "errors": [
                {
                  "status": 422,
                  "when": "사유 미입력·비즈니스 규칙 처리불가",
                  "message": "탈퇴 사유를 입력해 주세요."
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "탈퇴를 처리하지 못했어요. 잠시 후 다시 시도해 주세요."
                }
              ]
            },
            {
              "id": "appLogout",
              "intent": "로그아웃(세션 종료)",
              "method": "POST",
              "path": "/app/auth/logout",
              "response": "204 No Content — 토큰 폐기 후 로그인 화면(SCR-APP-009) 이동",
              "auth": "Bearer",
              "target": ".pd-btn",
              "note": "세션·구독 토큰 정리. tenant=JWT 본인 세션만.",
              "errors": [
                {
                  "status": 401,
                  "when": "이미 만료된 세션",
                  "message": "이미 로그아웃됐어요."
                }
              ]
            }
          ],
          "events": [
            {
              "name": "settings.notif.open",
              "when": "알림 설정 행 탭",
              "intent": "알림 설정 화면(SCR-APP-011) 이동",
              "target": ".pd-row"
            },
            {
              "name": "settings.withdraw.confirm_open",
              "when": "회원 탈퇴 버튼 탭",
              "intent": "탈퇴 2단계 확인 블록 열기",
              "target": ".pd-withdraw"
            },
            {
              "name": "settings.withdraw.completed",
              "when": "탈퇴 확정 처리 성공",
              "intent": "탈퇴 완료 후 로그아웃·로그인(SCR-APP-009) 이동",
              "target": ".pd-withdraw"
            },
            {
              "name": "settings.logout",
              "when": "로그아웃 버튼 탭",
              "intent": "세션 종료·로그인(SCR-APP-009) 이동",
              "target": ".pd-btn"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-APP-006",
              "via": "뒤로"
            },
            {
              "screen": "SCR-APP-011",
              "via": "알림 설정",
              "trigger": ".pd-row"
            }
          ]
        }
      },
      {
        "id": "SCR-APP-013",
        "label": "비밀번호 재설정·아이디 찾기",
        "href": "a-password-reset.html",
        "surface": "app",
        "entry": false,
        "status": "wireframed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-011"
        ],
        "context": "교인 비밀번호 재설정·아이디 찾기(휴대전화/이메일 인증→재설정→완료 3스텝). 소셜 가입자 분기 안내. 고령 접근성.",
        "components": [
          {
            "role": ".pd-segment",
            "kind": "segment",
            "label": "모드 전환 — '비밀번호 재설정'(활성) · '아이디 찾기'. 두 기능을 한 카드에서 전환"
          },
          {
            "role": ".pd-stepper",
            "kind": "stepper",
            "label": "3스텝 진행 — 1 본인 인증(활성) · 2 재설정 · 3 완료"
          },
          {
            "role": ".pd-segment",
            "kind": "segment",
            "label": "인증 수단 전환 — '휴대전화 인증'(활성) · '이메일 인증'"
          },
          {
            "role": ".pd-form",
            "kind": "form",
            "label": "본인 인증 폼 — 아이디 · 휴대전화 번호 · 인증번호(문자 6자리, 05:00 유효)"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "인증번호 받기 — 입력한 휴대전화/이메일로 6자리 인증번호 발송"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "본인 인증 · 다음 — 인증 성공 시 2단계 재설정으로 진행"
          },
          {
            "role": ".pd-banner",
            "kind": "banner",
            "label": "소셜 가입자 분기 안내 — '카카오·네이버로 가입하셨다면 비밀번호가 없어요. 소셜 로그인으로 입장해 주세요.'"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "카카오·네이버로 로그인",
            "action": {
              "on": "click",
              "do": "go:SCR-APP-009"
            }
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "로그인으로 돌아가기",
            "action": {
              "on": "click",
              "do": "go:SCR-APP-009"
            }
          }
        ],
        "description": [
          {
            "text": "기능 전환 — 한 카드에서 '비밀번호 재설정'과 '아이디 찾기'를 세그먼트로 전환. 아이디 로그인 교인(고령 포함)이 아이디·비밀번호를 잊어도 재입장할 수 있도록 통합",
            "target": ".pd-segment"
          },
          {
            "text": "3단계 진행 — 본인 인증 → 재설정 → 완료. 상단 스텝퍼로 현재 위치를 크게 표시해 고령 교인도 흐름을 놓치지 않도록 함(현재 1단계 본인 인증)",
            "target": ".pd-stepper"
          },
          {
            "text": "본인 인증 — 휴대전화 또는 이메일로 6자리 인증번호를 받아 가입 정보와 일치하는지 확인. 인증 성공 시 비밀번호 재설정(2단계)으로 진행하고, 완료 후 교인 로그인(SCR-APP-009)으로 이동",
            "target": ".pd-form"
          },
          {
            "text": "소셜 가입자 분기 — 카카오·네이버로 가입한 계정은 비밀번호가 없으므로 재설정 대신 소셜 로그인(SCR-APP-009)으로 안내. 계정 열거 방지를 위해 일치 여부와 무관하게 동일 문구 노출",
            "target": ".pd-banner"
          },
          {
            "text": "로그인 복귀 — 소셜 로그인·'로그인으로 돌아가기' 모두 교인 로그인(SCR-APP-009)으로 이동해 막다른 흐름을 만들지 않음",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "교인 로그인(SCR-APP-009)에서 '비밀번호 찾기' 진입",
            "guard": "접속 교회 주소 바인딩됨·브랜딩 로드 완료·1단계 본인 인증 노출",
            "result": "재설정 카드 표시·스텝퍼 1단계 활성·입력 폼 비어 있음",
            "message": "",
            "placement": "inline",
            "target": ".pd-form",
            "api": {
              "endpoint": "GET /app/church",
              "status": 200
            }
          },
          {
            "state": "로딩",
            "trigger": "인증번호 받기 또는 본인 인증·다음 제출",
            "guard": "발송/검증 응답 대기 중",
            "result": "해당 버튼 비활성·중복 제출 방지",
            "message": "인증번호를 보내고 있어요",
            "placement": "inline",
            "target": ".pd-btn",
            "api": {
              "endpoint": "POST /app/auth/password-reset/request",
              "status": 202
            }
          },
          {
            "state": "정상",
            "trigger": "인증번호 검증 성공",
            "guard": "가입 정보와 인증번호 일치·유효시간 내",
            "result": "2단계 재설정으로 전환(새 비밀번호 입력)→확정 시 3단계 완료, 교인 로그인으로 이동",
            "message": "본인 확인이 완료됐어요. 새 비밀번호를 설정해 주세요",
            "placement": "inline",
            "target": ".pd-form",
            "api": {
              "endpoint": "POST /app/auth/password-reset/verify",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "진입",
            "guard": "교회 로고·대표색 미설정",
            "result": "단일 Design System 기본 로고·'○○교회' placeholder 표시",
            "message": "교회 확인 후 게재",
            "placement": "inline"
          },
          {
            "state": "에러",
            "trigger": "본인 인증·다음 제출",
            "guard": "인증번호 불일치",
            "result": "인라인 오류·남은 시도 횟수 안내·입력값 유지",
            "message": "인증번호가 일치하지 않아요. 다시 확인해 주세요",
            "placement": "inline",
            "target": ".pd-form",
            "api": {
              "endpoint": "POST /app/auth/password-reset/verify",
              "status": 422
            }
          },
          {
            "state": "에러",
            "trigger": "인증번호 받기 제출",
            "guard": "서버 오류",
            "result": "재시도 안내",
            "message": "인증번호 발송에 실패했어요. 잠시 후 다시 시도해 주세요",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "POST /app/auth/password-reset/request",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "본인 인증·다음 제출",
            "guard": "해당 계정이 소셜(카카오·네이버) 전용으로 비밀번호 미보유",
            "result": "재설정 차단·소셜 로그인 유도 배너 강조",
            "message": "카카오·네이버로 가입한 계정이에요. 소셜 로그인으로 입장해 주세요",
            "placement": "banner",
            "target": ".pd-banner",
            "api": {
              "endpoint": "POST /app/auth/password-reset/verify",
              "status": 409
            }
          },
          {
            "state": "엣지",
            "trigger": "본인 인증·다음 제출",
            "guard": "인증번호 유효시간(5분) 만료",
            "result": "만료 안내·재발송 유도",
            "message": "인증번호가 만료됐어요. 다시 받아 주세요",
            "placement": "inline",
            "target": ".pd-form",
            "api": {
              "endpoint": "POST /app/auth/password-reset/verify",
              "status": 410
            }
          },
          {
            "state": "엣지",
            "trigger": "인증번호 받기 반복 또는 인증 반복 실패",
            "guard": "레이트리밋·5회 실패 잠금",
            "result": "일시 차단·대기 안내",
            "message": "요청이 많아요. 잠시 후 다시 시도해 주세요",
            "placement": "banner",
            "target": ".pd-btn",
            "api": {
              "endpoint": "POST /app/auth/password-reset/request",
              "status": 429
            }
          },
          {
            "state": "엣지",
            "trigger": "'아이디 찾기' 모드 제출(일치 계정 없음)",
            "guard": "입력 정보와 일치하는 계정 없음",
            "result": "계정 열거 방지 위해 일치 여부와 무관하게 동일 처리 응답(존재 시에만 문자 발송)",
            "message": "입력하신 정보로 가입된 계정이 있으면 아이디를 문자로 보내드렸어요",
            "placement": "inline",
            "target": ".pd-form",
            "api": {
              "endpoint": "POST /app/auth/find-id",
              "status": 202
            }
          },
          {
            "state": "필수누락",
            "trigger": "본인 인증·다음 제출",
            "guard": "아이디·휴대전화·인증번호 중 미입력",
            "result": "제출 차단·인라인 검증",
            "message": "아이디와 휴대전화 번호, 인증번호를 모두 입력해 주세요",
            "placement": "inline",
            "target": ".pd-form"
          },
          {
            "state": "형식오류",
            "trigger": "인증번호 받기 제출",
            "guard": "휴대전화 번호(또는 이메일) 형식 오류",
            "result": "인라인 검증·발송 차단",
            "message": "휴대전화 번호 형식을 확인해 주세요(예: 010-1234-5678)",
            "placement": "inline",
            "target": ".pd-form"
          },
          {
            "state": "범위경계",
            "trigger": "인증번호 받기 재요청",
            "guard": "직전 발송 후 재전송 쿨다운(60초) 경계·인증번호 6자리 초과/미만 입력",
            "result": "쿨다운 중 재발송 버튼 비활성·인증번호는 6자리로 제한",
            "message": "인증번호는 6자리예요. 재전송은 60초 후 가능해요",
            "placement": "inline",
            "target": ".pd-form"
          },
          {
            "state": "중복충돌",
            "trigger": "인증번호 받기 중복 제출",
            "guard": "이미 유효한 인증 요청이 진행 중",
            "result": "신규 발송 대신 기존 유효 코드 유지 안내(Idempotency-Key로 중복 발송 차단)",
            "message": "이미 보낸 인증번호가 유효해요. 문자를 확인해 주세요",
            "placement": "inline",
            "target": ".pd-btn",
            "api": {
              "endpoint": "POST /app/auth/password-reset/request",
              "status": 409
            }
          },
          {
            "state": "유효",
            "trigger": "본인 인증·다음 제출",
            "guard": "아이디·휴대전화·인증번호 형식 유효",
            "result": "서버 인증 요청으로 진행",
            "message": "",
            "placement": "inline",
            "target": ".pd-form"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "appChurchBranding",
              "intent": "교회 브랜딩 조회(재설정 카드)",
              "method": "GET",
              "path": "/app/church",
              "response": "{entities.Church}",
              "auth": "없음(공개)",
              "note": "tenant는 접속 host로 서버가 자동 결정(교회 검색 없음·path 비노출). 로고·대표색·교회명 등 교회별 변경 4요소만 공개 노출. 미설정 시 단일 Design System 기본 로고·'○○교회' placeholder",
              "errors": [
                {
                  "status": 404,
                  "when": "교회 주소 미존재",
                  "message": "교회를 찾을 수 없어요"
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "requestVerification",
              "intent": "인증번호 발송(비밀번호 재설정·아이디 찾기 공통)",
              "method": "POST",
              "path": "/app/auth/password-reset/request",
              "body": "{channel: phone|email, identifier, contact}",
              "auth": "없음(공개)",
              "idempotency": true,
              "note": "문자/메일 발송은 비용·부작용이 있는 외부효과이므로 Idempotency-Key로 중복 발송(409) 차단 + 레이트리밋(429)·재전송 쿨다운 60초. 계정 열거 방지를 위해 일치하는 계정이 없어도 202로 동일 응답(존재 시에만 실제 발송). tenant는 접속 host로 자동 결정",
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 400,
                  "when": "휴대전화/이메일 형식오류·미입력",
                  "message": "휴대전화 번호 형식을 확인해 주세요(예: 010-1234-5678)"
                },
                {
                  "status": 409,
                  "when": "이미 유효한 인증 요청 진행 중",
                  "message": "이미 보낸 인증번호가 유효해요. 문자를 확인해 주세요"
                },
                {
                  "status": 429,
                  "when": "발송 요청 과다·쿨다운",
                  "message": "요청이 많아요. 잠시 후 다시 시도해 주세요"
                },
                {
                  "status": 500,
                  "when": "발송 게이트웨이 오류",
                  "message": "인증번호 발송에 실패했어요. 잠시 후 다시 시도해 주세요"
                }
              ]
            },
            {
              "id": "verifyResetCode",
              "intent": "인증번호 검증(본인 인증)",
              "method": "POST",
              "path": "/app/auth/password-reset/verify",
              "body": "{identifier, code}",
              "auth": "없음(공개)",
              "note": "성공 시 단기 유효 reset token 발급(2단계 재설정 전용). 인증 검증 전용으로 데이터 비가역 변경이 아니어서 멱등키 불필요. 5회 실패 시 잠금. 소셜 전용 계정은 409로 분기(비밀번호 미보유→소셜 로그인 유도)",
              "target": ".pd-form",
              "errors": [
                {
                  "status": 400,
                  "when": "인증번호 형식오류·필수누락",
                  "message": "아이디와 휴대전화 번호, 인증번호를 모두 입력해 주세요"
                },
                {
                  "status": 409,
                  "when": "소셜(카카오·네이버) 전용 계정",
                  "message": "카카오·네이버로 가입한 계정이에요. 소셜 로그인으로 입장해 주세요"
                },
                {
                  "status": 410,
                  "when": "인증번호 유효시간(5분) 만료",
                  "message": "인증번호가 만료됐어요. 다시 받아 주세요"
                },
                {
                  "status": 422,
                  "when": "인증번호 불일치",
                  "message": "인증번호가 일치하지 않아요. 다시 확인해 주세요"
                },
                {
                  "status": 429,
                  "when": "반복 실패 레이트리밋·잠금",
                  "message": "요청이 많아요. 잠시 후 다시 시도해 주세요"
                }
              ]
            },
            {
              "id": "confirmPasswordReset",
              "intent": "비밀번호 재설정 확정",
              "method": "POST",
              "path": "/app/auth/password-reset/confirm",
              "body": "{resetToken, newPassword}",
              "auth": "reset token(단기)",
              "idempotency": true,
              "note": "비밀번호 변경은 보안 민감 비가역 쓰기 → Idempotency-Key + 감사로그(계정·시각·IP) 기록. 성공 시 기존 세션 전체 무효화 후 교인 로그인(SCR-APP-009)으로 이동. 비밀번호 정책 위반은 422",
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 401,
                  "when": "reset token 무효·위조",
                  "message": "인증이 만료됐어요. 처음부터 다시 진행해 주세요"
                },
                {
                  "status": 410,
                  "when": "reset token 만료",
                  "message": "인증이 만료됐어요. 처음부터 다시 진행해 주세요"
                },
                {
                  "status": 422,
                  "when": "비밀번호 정책 위반(길이·조합)",
                  "message": "비밀번호는 8자 이상, 영문·숫자를 포함해 주세요"
                }
              ]
            },
            {
              "id": "findId",
              "intent": "아이디 찾기",
              "method": "POST",
              "path": "/app/auth/find-id",
              "body": "{channel: phone|email, contact, code}",
              "auth": "없음(공개)",
              "note": "본인 인증 후 마스킹된 아이디를 문자/메일로 발송. 계정 열거 방지를 위해 일치 계정이 없어도 202로 동일 응답(존재 시에만 발송)",
              "target": ".pd-form",
              "errors": [
                {
                  "status": 400,
                  "when": "연락처/인증번호 형식오류",
                  "message": "휴대전화 번호 형식을 확인해 주세요(예: 010-1234-5678)"
                },
                {
                  "status": 422,
                  "when": "인증번호 불일치",
                  "message": "인증번호가 일치하지 않아요. 다시 확인해 주세요"
                },
                {
                  "status": 429,
                  "when": "요청 과다",
                  "message": "요청이 많아요. 잠시 후 다시 시도해 주세요"
                }
              ]
            }
          ],
          "events": [
            {
              "name": "auth.reset.request",
              "intent": "인증번호 발송 요청",
              "target": ".pd-btn"
            },
            {
              "name": "auth.reset.verify",
              "intent": "본인 인증 제출·재설정 단계 진행",
              "target": ".pd-form"
            },
            {
              "name": "auth.reset.confirm.success",
              "intent": "비밀번호 재설정 완료·교인 로그인 이동",
              "target": ".pd-btn"
            },
            {
              "name": "auth.findid.submit",
              "intent": "아이디 찾기 제출",
              "target": ".pd-form"
            },
            {
              "name": "auth.social.redirect",
              "intent": "소셜 전용 계정 분기·소셜 로그인 유도",
              "target": ".pd-banner"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-APP-009",
              "via": "비밀번호 재설정 완료 후 로그인"
            },
            {
              "screen": "SCR-APP-009",
              "via": "소셜(카카오·네이버) 전용 계정 분기·소셜 로그인 유도",
              "trigger": ".pd-banner"
            },
            {
              "screen": "SCR-APP-009",
              "via": "로그인으로 돌아가기"
            }
          ]
        }
      },
      {
        "id": "SCR-APP-014",
        "label": "가입 접수완료·승인 대기",
        "href": "a-signup-done.html",
        "surface": "app",
        "entry": false,
        "status": "wireframed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-011"
        ],
        "context": "가입 접수완료·승인 대기 안내(관리자 승인 후 로그인 가능·승인 시 문자 안내). 홈/로그인 CTA.",
        "components": [
          {
            "role": ".pd-done",
            "kind": "status",
            "label": "가입 신청이 접수되었어요 · 관리자 승인 후 로그인 가능"
          },
          {
            "role": ".pd-banner",
            "kind": "banner",
            "label": "승인 완료 시 등록하신 휴대전화로 문자 안내를 보내드려요"
          },
          {
            "role": ".pd-wf-label",
            "kind": "note",
            "label": "승인 보통 1~2일 이내 · 지연 가능 · 문의는 소속 교회 사무실"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "홈으로",
            "action": {
              "on": "click",
              "do": "go:SCR-APP-001"
            }
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "로그인으로",
            "action": {
              "on": "click",
              "do": "go:SCR-APP-009"
            }
          }
        ],
        "description": [
          {
            "text": "완료 상태 — '가입 신청이 접수되었어요'. ○○교회 가입 신청이 정상 접수됨을 알리고 관리자 승인 후 로그인 가능함을 명시(교회검색 없이 진입 URL로 church_id 자동 바인딩).",
            "target": ".pd-done"
          },
          {
            "text": "문자 안내 고지 — 관리자 승인이 완료되면 가입 시 등록한 휴대전화로 문자(SMS) 안내를 발송(실제 발송은 교회 관리자의 승인 시점에 이루어짐).",
            "target": ".pd-banner"
          },
          {
            "text": "승인 소요·문의 안내 — 승인은 보통 1~2일 이내 처리되며 교회 상황에 따라 지연될 수 있고 문의는 소속 교회 사무실로 안내(정직성: 확정 불가 항목 단정 회피).",
            "target": ".pd-wf-label"
          },
          {
            "text": "홈으로 — 접수 확인 후 교인 홈(SCR-APP-001)으로 이동. 승인 전에는 홈에서 기능 제한·승인대기 안내가 노출됨.",
            "target": ".pd-btn"
          },
          {
            "text": "로그인으로 — 승인 완료 후 로그인(SCR-APP-009) 시도. 승인 대기 중이면 로그인 단계에서 '가입 승인 대기 중' 안내로 접근 차단.",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "회원가입 신청 직후 진입(SCR-APP-008 → 202 Accepted)",
            "guard": "신청 토큰(applicationId) 보유",
            "result": "완료 아이콘·접수 메시지·CTA 렌더 준비",
            "message": "",
            "placement": "inline",
            "target": ".pd-done"
          },
          {
            "state": "로딩",
            "trigger": "승인 상태 재확인 진입(링크 재방문)",
            "guard": "가입 신청 상태 응답 대기",
            "result": "상태 영역 스켈레톤 표시",
            "message": "상태를 확인하고 있어요",
            "placement": "inline",
            "target": ".pd-done",
            "api": {
              "endpoint": "GET /auth/signup/applications/{applicationId}"
            }
          },
          {
            "state": "정상",
            "trigger": "접수 완료(승인대기 전이)",
            "guard": "status=pending",
            "result": "접수 안내 + 승인 후 로그인 가능 + 문자 안내 고지 + 홈으로/로그인으로 CTA 노출",
            "message": "가입 신청이 접수되었어요. 관리자 승인 후 로그인하실 수 있어요. 승인이 완료되면 등록하신 휴대전화로 문자 안내를 보내드려요.",
            "placement": "full-page",
            "target": ".pd-done",
            "api": {
              "endpoint": "POST /auth/signup",
              "status": 202
            }
          },
          {
            "state": "빈데이터",
            "trigger": "진입",
            "guard": "빈데이터: 해당 없음(목록 없는 단일 상태 안내 화면)",
            "result": "해당 없음(N/A)",
            "message": "",
            "placement": "inline",
            "target": ".pd-done"
          },
          {
            "state": "입력검증",
            "trigger": "진입",
            "guard": "입력검증: 해당 없음(입력 폼 없는 완료 상태 화면 · 폼 검증은 SCR-APP-008 소관)",
            "result": "해당 없음(N/A)",
            "message": "",
            "placement": "inline",
            "target": ".pd-done"
          },
          {
            "state": "에러",
            "trigger": "가입 신청 전송/상태 조회 실패",
            "guard": "네트워크 단절 또는 서버 오류(5xx)",
            "result": "접수 실패 안내·다시 시도 유도(홈으로/로그인으로는 유지)",
            "message": "신청을 접수하지 못했어요. 잠시 후 다시 시도해 주세요.",
            "placement": "banner",
            "target": ".pd-done",
            "api": {
              "endpoint": "POST /auth/signup",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "신청 토큰 없이 URL 직접 진입(비로그인 공개 화면)",
            "guard": "applicationId/신청 토큰 없음 또는 만료(410)",
            "result": "잘못된 접근 안내 → 로그인 화면으로 유도(공개 콘텐츠·개인 신청정보 비노출)",
            "message": "잘못된 접근이에요. 로그인 화면으로 이동해 주세요.",
            "placement": "full-page",
            "target": ".pd-done",
            "api": {
              "endpoint": "GET /auth/signup/applications/{applicationId}",
              "status": 404
            }
          },
          {
            "state": "엣지",
            "trigger": "중복 신청 / 이미 승인 / 승인 거절 재진입",
            "guard": "status=approved(이미 활성) · 중복 신청(409) · status=rejected",
            "result": "승인 완료 시 '로그인으로' 강조 · 중복 신청 시 접수 사실 재안내 · 거절 시 문의 안내",
            "message": "이미 승인이 완료된 계정이에요. 로그인해 주세요. (이미 접수된 신청이면 '가입 신청이 이미 접수되어 있어요' · 미승인 시 '가입이 승인되지 않았어요. 소속 교회 사무실로 문의해 주세요')",
            "placement": "banner",
            "target": ".pd-done",
            "api": {
              "endpoint": "POST /auth/signup",
              "status": 409
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "signupStatus",
              "intent": "가입 신청 접수·승인 상태 확인",
              "method": "GET",
              "path": "/auth/signup/applications/{applicationId}",
              "params": "{ applicationId }",
              "response": "{ status: 'pending|approved|rejected', church: '{entities.Church}', maskedPhone: string, submittedAt: string }",
              "auth": "none(공개·신청 토큰 applicationId로 접근)",
              "target": ".pd-done",
              "note": "tenant는 진입 URL slug로 바인딩(교회검색 없음)·개인 신청정보는 발급된 신청 토큰 범위로만 열람·교차테넌트 조회 차단",
              "errors": [
                {
                  "status": 404,
                  "when": "신청 토큰 없음/무효(직접 URL 진입)",
                  "message": "잘못된 접근이에요. 로그인 화면으로 이동해 주세요"
                },
                {
                  "status": 410,
                  "when": "신청 토큰 만료",
                  "message": "확인 링크가 만료됐어요. 로그인에서 다시 시도해 주세요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "상태를 확인하지 못했어요. 잠시 후 다시 시도해 주세요"
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "signupSubmit",
              "intent": "회원가입 신청(승인대기 상태 생성)",
              "method": "POST",
              "path": "/auth/signup",
              "response": "{ applicationId, member: '{entities.Member}', status: 'pending' }",
              "auth": "none(공개·church_id=진입 URL slug 자동 바인딩·교회검색 없음)",
              "status": 202,
              "target": ".pd-done",
              "idempotency": true,
              "note": "SCR-APP-008 '가입 신청'에서 트리거되어 본 화면이 202 결과를 렌더 · Idempotency-Key로 중복 신청 멱등 처리(동일 키 재요청 시 동일 applicationId 반환, 신규 생성 없음) · 관리자 승인(active) 전까지 pending(비가역 아님) · 가입 데이터는 이름·휴대전화·이메일·교회·가입상태만(G2 최소수집)",
              "errors": [
                {
                  "status": 409,
                  "when": "동일 휴대전화로 이미 신청/가입됨",
                  "message": "이미 가입 신청이 접수되어 있어요"
                },
                {
                  "status": 422,
                  "when": "필수 동의 누락 등 비즈니스 규칙 위반",
                  "message": "필수 항목 동의 후 다시 신청해 주세요"
                }
              ]
            }
          ],
          "events": [
            {
              "id": "signupAccepted",
              "name": "signup.accepted",
              "intent": "가입 신청 접수 완료(승인대기 전이)로 완료 상태 렌더",
              "trigger": "POST /auth/signup 202 응답",
              "target": ".pd-done"
            },
            {
              "id": "approvalNotified",
              "name": "approval.notified",
              "intent": "관리자 승인 시 가입 시 등록한 휴대전화로 문자(SMS) 안내 발송",
              "trigger": "관리자 회원 승인(POST /admin/members/{id}/approve) → Notification Gateway(channel=sms) · 감사로그",
              "target": ".pd-banner"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-APP-001",
              "via": "홈으로",
              "trigger": ".pd-cta-bar"
            },
            {
              "screen": "SCR-APP-009",
              "via": "로그인으로",
              "trigger": ".pd-cta-bar"
            }
          ]
        }
      },
      {
        "id": "SCR-APP-015",
        "label": "공지",
        "href": "a-notice-list.html",
        "surface": "app",
        "entry": false,
        "status": "wireframed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-009"
        ],
        "context": "공지 목록(중요/상단고정·최신순·빈상태). 행→공지 상세. 5메뉴 탭바.",
        "components": [
          {
            "role": ".pd-apptop",
            "kind": "group",
            "label": "상단 — 제목 '공지'"
          },
          {
            "role": ".pd-apptop-title",
            "kind": "group",
            "label": "제목 '공지'"
          },
          {
            "role": ".pd-section-title",
            "kind": "group",
            "label": "섹션 구분 — '상단 고정' · '전체 공지'(최신순)"
          },
          {
            "role": ".pd-list",
            "kind": "list",
            "label": "공지 목록 — 상단 고정 2건·전체 공지 최신순",
            "action": {
              "on": "click",
              "do": "go:SCR-APP-005"
            }
          },
          {
            "role": ".pd-row",
            "kind": "group",
            "label": "공지 행 — '추수감사주일 안내' · '2026-09-27 · 관리자'(탭하면 공지 상세)",
            "action": {
              "on": "click",
              "do": "go:SCR-APP-005"
            }
          },
          {
            "role": ".pd-badge",
            "kind": "group",
            "label": "표시 배지 — '고정'(상단고정)·'중요'"
          },
          {
            "role": ".pd-row-main",
            "kind": "group",
            "label": "행 본문 — 제목·게시정보"
          },
          {
            "role": ".pd-row-title",
            "kind": "group",
            "label": "공지 제목 — 예 '추수감사주일 안내'"
          },
          {
            "role": ".pd-row-sub",
            "kind": "group",
            "label": "게시정보 — '2026-09-27 · 관리자'"
          },
          {
            "role": ".pd-chev",
            "kind": "group",
            "label": "이동 표시 꺾쇠(상세로)"
          },
          {
            "role": ".pd-tabbar",
            "kind": "tabbar",
            "label": "하단 탭 — 홈·설교·주보·공지(현재)·마이",
            "action": {
              "on": "click",
              "do": "go:SCR-APP-001"
            }
          },
          {
            "role": ".pd-tab",
            "kind": "group",
            "label": "탭 항목 — '공지'는 현재 활성(is-active)"
          }
        ],
        "description": [
          {
            "text": "상단바 — 가운데 '공지' 제목을 표시하는 앱 상단 영역",
            "target": ".pd-apptop"
          },
          {
            "text": "섹션 구분 — '상단 고정'(관리자가 고정한 공지)과 '전체 공지'(최신순)로 나눠 표시",
            "target": ".pd-section-title"
          },
          {
            "text": "공지 목록 — 각 행에 '고정'·'중요' 배지와 제목·게시정보(날짜·관리자)를 표시하고, 탭하면 공지 상세(SCR-APP-005)로 이동",
            "target": ".pd-list"
          },
          {
            "text": "공지 행 — 제목 '추수감사주일 안내', 게시정보 '2026-09-27 · 관리자'. 상단고정은 '고정', 중요 공지는 '중요' 배지로 구분하며 탭 시 상세로 이동",
            "target": ".pd-row"
          },
          {
            "text": "하단 탭 — 홈·설교·주보·공지(현재 활성)·마이. 홈 탭 시 교인 홈(SCR-APP-001)으로 이동",
            "target": ".pd-tabbar"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "화면 진입 직후(조회 호출 전)",
            "guard": "탭 진입, GET 목록 호출 전",
            "result": "목록 자리에 행 스켈레톤 표시",
            "message": "",
            "placement": "inline"
          },
          {
            "state": "로딩",
            "trigger": "목록 조회 요청 중",
            "guard": "GET 응답 대기",
            "result": "로딩 인디케이터 표시, 상호작용 보류",
            "message": "",
            "placement": "inline",
            "api": {
              "endpoint": "GET /app/notices"
            }
          },
          {
            "state": "정상",
            "trigger": "진입",
            "guard": "공지 1건 이상 조회 성공",
            "result": "상단 고정 공지(고정·중요 배지)를 먼저, 그 아래 전체 공지를 최신순으로 표시",
            "message": "",
            "placement": "inline",
            "api": {
              "endpoint": "GET /app/notices",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답",
            "guard": "교회에 등록된 공지 0건",
            "result": "빈 상태 안내 표시(목록 영역 대체). 교인은 공지를 작성하지 않으므로 복구 액션은 알림 안내",
            "message": "아직 등록된 공지가 없어요. 새 공지가 올라오면 알림으로 알려드릴게요.",
            "placement": "full-page",
            "api": {
              "endpoint": "GET /app/notices",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "응답",
            "guard": "서버 오류(5xx)",
            "result": "목록 대신 오류 안내 + 다시 시도 버튼",
            "message": "공지를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.",
            "placement": "full-page",
            "api": {
              "endpoint": "GET /app/notices",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "응답",
            "guard": "미인증/토큰 만료(401) — 교인(app)은 Bearer JWT 필요",
            "result": "교인 로그인(SCR-APP-009)으로 유도",
            "message": "로그인이 필요해요. 다시 로그인해 주세요.",
            "placement": "full-page",
            "api": {
              "endpoint": "GET /app/notices",
              "status": 401
            }
          },
          {
            "state": "엣지",
            "trigger": "스크롤 하단 도달(추가 로드) 또는 상단고정 다수",
            "guard": "cursor 페이지네이션으로 다음 페이지 요청, 또는 고정 공지가 많아 상단이 길어짐 — 멀티테넌트 격리로 본인 교회(JWT tenantId) 공지만 조회",
            "result": "다음 페이지를 이어 붙여 표시(중복 없이). 마지막 페이지면 추가 로드 중단",
            "message": "",
            "placement": "inline",
            "api": {
              "endpoint": "GET /app/notices?cursor=&limit=20",
              "status": 200
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "appNoticeList",
              "intent": "공지 목록 조회",
              "method": "GET",
              "path": "/app/notices?cursor=&limit=20",
              "params": "query: cursor(다음 페이지 커서)·limit(기본 20). tenant는 JWT tenantId로 스코프(path 비노출). 정렬 = 상단고정(pinned desc) 후 게시일(createdAt desc)",
              "response": "{ items: '{entities.Notice}'[], nextCursor }",
              "auth": "Bearer",
              "target": ".pd-list",
              "note": "교인 공지 탭(SCR-APP-015) 진입 시 조회. 각 항목의 pinned·important 플래그로 '고정'·'중요' 배지를 표시. 행 탭 시 공지 상세(SCR-APP-005)로 이동. 멀티테넌트 격리 — 타 교회 공지는 조회 불가.",
              "errors": [
                {
                  "status": 401,
                  "when": "미인증/토큰 만료",
                  "message": "로그인이 필요해요. 다시 로그인해 주세요."
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "공지를 불러오지 못했어요. 잠시 후 다시 시도해 주세요."
                }
              ]
            }
          ],
          "writes": [],
          "events": [
            {
              "name": "notice.list.view",
              "intent": "공지 목록 열람",
              "when": "공지 탭 진입 시",
              "payload": "{tenantId, count}"
            },
            {
              "name": "notice.list.open",
              "intent": "공지 상세 열기",
              "when": ".pd-row 탭 시",
              "payload": "{noticeId, tenantId, pinned, important}"
            },
            {
              "name": "notice.list.loadmore",
              "intent": "다음 페이지 추가 로드",
              "when": "목록 하단 도달 시",
              "payload": "{cursor, tenantId}"
            },
            {
              "name": "notice.list.tab",
              "intent": "홈 탭으로 이동",
              "when": "하단 홈 탭 탭 시",
              "payload": "{tenantId}"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-APP-005",
              "via": "공지 행 탭(상세 열람)",
              "trigger": ".pd-row"
            },
            {
              "screen": "SCR-APP-001",
              "via": "하단 홈 탭",
              "trigger": ".pd-tabbar"
            }
          ]
        }
      },
      {
        "id": "SCR-APP-016",
        "label": "글자 크기",
        "href": "a-font-size.html",
        "surface": "app",
        "entry": false,
        "status": "wireframed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-006"
        ],
        "context": "글자 크기 조절(보통/크게/아주 크게) 즉시 미리보기. 고령 접근성. 앱 전역 본문 반영.",
        "components": [
          {
            "role": ".pd-back",
            "kind": "button",
            "label": "뒤로 — 설정으로",
            "action": {
              "on": "click",
              "do": "go:SCR-APP-012"
            }
          },
          {
            "role": ".pd-list",
            "kind": "list",
            "label": "크기 선택 — 보통 · 크게 · 아주 크게 (현재 '보통' 선택)"
          },
          {
            "role": ".pd-row",
            "kind": "card",
            "label": "글자 크기 선택지(보통/크게/아주 크게) — 탭하면 선택되고 미리보기에 즉시 반영",
            "action": {
              "on": "click",
              "do": "go:SCR-APP-016"
            }
          },
          {
            "role": ".pd-card",
            "kind": "card",
            "label": "미리보기 — 설교 · 로마서 강해 12 샘플 문구가 선택한 글자 크기로 표시"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "저장",
            "action": {
              "on": "click",
              "do": "go:SCR-APP-012"
            }
          }
        ],
        "description": [
          {
            "text": "크기 선택 목록 — 보통·크게·아주 크게 3단계 중 하나를 탭해 선택. 현재 선택된 항목('보통')은 우측에 체크 표시(.is-selected). 큰 탭 영역으로 고령 교우도 쉽게 고를 수 있게 설계했고, 선택 즉시 아래 미리보기에 반영된다. 화면 전환 없이 현재 화면(SCR-APP-016)에 머문다.",
            "target": ".pd-list"
          },
          {
            "text": "선택지 행 — 각 행은 크기 이름(보통/크게/아주 크게)과 설명(기본 크기·읽기 편하게·고령 교우 권장)을 함께 보여 어떤 크기인지 직관적으로 알 수 있다. 탭하면 선택 상태가 그 행으로 옮겨가고 미리보기 텍스트가 해당 크기로 갱신된다.",
            "target": ".pd-row"
          },
          {
            "text": "미리보기 — 실제 앱 문구(설교 · 로마서 강해 12 / 조정표 담임목사 · 주일 10:00 예배)를 선택한 크기 그대로 보여 준다. 저장 전에 설교·주보·공지 본문이 어떻게 보일지 눈으로 확인하고 결정할 수 있다.",
            "target": ".pd-card"
          },
          {
            "text": "저장 버튼 — 선택한 글자 크기를 저장하고 설정(SCR-APP-012)으로 돌아간다. 설정값은 기기에 저장되어 다음 접속에도 유지되며 앱 전체 글자에 적용된다. 되돌릴 수 있는 설정이라 확인 단계 없이 바로 저장한다.",
            "target": ".pd-btn"
          },
          {
            "text": "상단 뒤로(.pd-back)는 변경을 적용하지 않고 설정(SCR-APP-012)으로 복귀한다. 저장 없이 나가면 기존 글자 크기가 유지된다.",
            "target": ".pd-back"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입",
            "guard": "로그인 세션 유효(Bearer)·저장된 글자크기 미수신",
            "result": "크기 선택 목록 골격 표시, 기본값 '보통'에 선택 표시",
            "message": "",
            "placement": "inline",
            "target": ".pd-list"
          },
          {
            "state": "로딩",
            "trigger": "진입",
            "guard": "GET /app/settings 응답 대기",
            "result": "현재 선택·미리보기 자리에 스켈레톤 표시",
            "message": "불러오는 중",
            "placement": "inline",
            "target": ".pd-list"
          },
          {
            "state": "정상",
            "trigger": "진입",
            "guard": "설정 수신 완료",
            "result": "저장된 글자 크기('보통')에 선택 표시·미리보기에 동일 크기 반영",
            "message": "",
            "placement": "inline",
            "target": ".pd-list",
            "api": {
              "endpoint": "GET /app/settings",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "진입",
            "guard": "빈데이터: 해당 없음 — 글자 크기는 항상 기본값('보통')을 보유",
            "result": "빈 상태 화면 없음(항상 기본값 '보통' 선택 표시)",
            "message": "",
            "placement": "inline",
            "target": ".pd-list"
          },
          {
            "state": "에러",
            "trigger": "진입",
            "guard": "GET /app/settings 서버 오류(500)",
            "result": "기본값 '보통'으로 폴백·재시도 안내",
            "message": "설정을 불러오지 못했어요. 기본 크기(보통)로 표시합니다. 잠시 후 다시 시도해 주세요.",
            "placement": "banner",
            "target": ".pd-list",
            "api": {
              "endpoint": "GET /app/settings",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "진입",
            "guard": "세션 만료·미인증(401)",
            "result": "로그인 화면(SCR-APP-009)으로 유도",
            "message": "로그인이 필요해요. 다시 로그인해 주세요.",
            "placement": "full-page",
            "target": ".pd-list",
            "api": {
              "endpoint": "GET /app/settings",
              "status": 401
            }
          },
          {
            "state": "엣지",
            "trigger": "이미 선택된 크기 재탭",
            "guard": "선택값과 동일한 행 탭 — 변경 없음",
            "result": "선택 상태·미리보기 그대로 유지(no-op)·저장 시 동일값 멱등 반영",
            "message": "",
            "placement": "inline",
            "target": ".pd-row"
          },
          {
            "state": "정상",
            "trigger": "크기 변경 후 저장",
            "guard": "선택값이 저장값과 다름·저장 탭",
            "result": "글자 크기 저장·앱 전체 적용 후 설정(SCR-APP-012) 복귀",
            "message": "글자 크기를 저장했어요.",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "PUT /app/settings/font-size",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "저장",
            "guard": "PUT 서버 오류(500)·허용되지 않은 값(422)",
            "result": "저장 미반영·재시도 유도(이전 크기 유지)",
            "message": "글자 크기를 저장하지 못했어요. 잠시 후 다시 시도해 주세요.",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "PUT /app/settings/font-size",
              "status": 500
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "appFontSize",
              "intent": "글자 크기 설정 로드",
              "method": "GET",
              "path": "/app/settings",
              "params": "-",
              "response": "{fontSize:'보통'} — 클라이언트 접근성 설정값(엔티티 아님·보통|크게|아주 크게)",
              "auth": "Bearer",
              "target": ".pd-list",
              "errors": [
                {
                  "status": 401,
                  "when": "세션 만료·미인증",
                  "message": "로그인이 필요해요. 다시 로그인해 주세요."
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "설정을 불러오지 못했어요. 기본 크기(보통)로 표시합니다. 잠시 후 다시 시도해 주세요."
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "appFontSizeSave",
              "intent": "글자 크기 저장(가역)",
              "method": "PUT",
              "path": "/app/settings/font-size",
              "body": "{fontSize:'보통'|'크게'|'아주 크게'}",
              "response": "200 → 설정 반영·앱 전체 적용 후 설정(SCR-APP-012) 복귀",
              "auth": "Bearer",
              "idempotency": true,
              "note": "가역 설정(토글 유형) — PUT upsert로 동일값 반복 저장 안전(멱등). 확인 단계 불필요(비가역 아님). tenant=JWT tenantId·본인 설정 레코드만(교차테넌트 차단).",
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 422,
                  "when": "허용되지 않은 값(enum 외)",
                  "message": "글자 크기를 저장하지 못했어요. 잠시 후 다시 시도해 주세요."
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "글자 크기를 저장하지 못했어요. 잠시 후 다시 시도해 주세요."
                }
              ]
            }
          ],
          "events": [
            {
              "name": "fontsize.select",
              "when": "크기 선택지 탭",
              "intent": "선택 크기 변경·미리보기 즉시 갱신",
              "target": ".pd-row"
            },
            {
              "name": "fontsize.save",
              "when": "저장 버튼 탭",
              "intent": "글자 크기 저장 후 설정(SCR-APP-012) 복귀",
              "target": ".pd-btn"
            },
            {
              "name": "fontsize.back",
              "when": "뒤로 탭",
              "intent": "변경 적용 없이 설정(SCR-APP-012) 복귀",
              "target": ".pd-back"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-APP-012",
              "via": "저장",
              "trigger": ".pd-btn"
            },
            {
              "screen": "SCR-APP-012",
              "via": "뒤로"
            }
          ]
        }
      }
    ]
  },
  {
    "category": "교회 관리자 (admin · church.hurmate.com · PC웹)",
    "pages": [
      {
        "id": "SCR-ADM-001",
        "label": "관리자 로그인",
        "href": "c-login.html",
        "surface": "admin",
        "entry": true,
        "status": "confirmed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-018"
        ],
        "context": "교회 관리자 로그인(테넌트 스코프). 로그인 후 설정 미완료면 개설 Wizard, 완료면 대시보드로 분기. tenant는 JWT로 확정.",
        "components": [
          {
            "role": ".pd-form",
            "kind": "form",
            "label": "○○교회 관리자 콘솔 로그인 폼"
          },
          {
            "role": ".pd-field",
            "kind": "form",
            "label": "아이디·비밀번호 입력"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "비밀번호 재설정",
            "action": {
              "on": "click",
              "do": "go:SCR-ADM-003"
            }
          }
        ],
        "description": [
          {
            "text": "관리자 로그인 폼 — '○○교회 관리자 콘솔' 브랜드 헤더와 '교회 운영을 위한 관리자 전용 로그인' 안내. 교회 선택 없이 진입 서브도메인(JWT tenantId)에 바인딩된 교회로 로그인",
            "target": ".pd-form"
          },
          {
            "text": "아이디·비밀번호 입력 — 상단 '관리자 아이디', 하단 '비밀번호'. 필수값 미입력·형식오류 시 제출 차단",
            "target": ".pd-field"
          },
          {
            "text": "로그인 버튼 — 설정 완료면 대시보드(SCR-ADM-003), 설정 미완료면 개설 Wizard(SCR-ADM-002)로 분기",
            "target": ".pd-btn"
          },
          {
            "text": "비밀번호 재설정 버튼 — 재설정 안내 자리표시(교회 확인 후 안내), 현재는 로그인 화면(SCR-ADM-001) 유지",
            "target": ".pd-btn"
          },
          {
            "text": "하단 안내 — '로그인 5회 실패 시 잠금 · 관리자 권한은 담임목사가 위임' 보안·권한 정책 고지",
            "target": ".pd-form"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "화면 진입",
            "guard": "미입력(진입 직후)",
            "result": "빈 로그인 폼 노출(아이디·비밀번호·로그인·비밀번호 재설정)",
            "message": "",
            "placement": "inline",
            "target": ".pd-form"
          },
          {
            "state": "로딩",
            "trigger": "로그인 제출",
            "guard": "인증 요청 처리 중",
            "result": "로그인 버튼 비활성 · 진행 표시",
            "message": "",
            "placement": "inline",
            "target": ".pd-btn"
          },
          {
            "state": "정상",
            "trigger": "로그인 제출",
            "guard": "자격증명 일치 · 설정 완료(onboardingComplete=true · 교회 status=활성)",
            "result": "대시보드(SCR-ADM-003)로 이동",
            "message": "",
            "placement": "inline",
            "target": ".pd-btn",
            "api": {
              "endpoint": "POST /admin/auth/login",
              "status": 200
            }
          },
          {
            "state": "정상",
            "trigger": "로그인 제출",
            "guard": "자격증명 일치 · 설정 미완료(onboardingComplete=false)",
            "result": "개설 Wizard(SCR-ADM-002)로 이동",
            "message": "",
            "placement": "inline",
            "target": ".pd-btn",
            "api": {
              "endpoint": "POST /admin/auth/login",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "화면 진입",
            "guard": "빈데이터: 해당 없음(조회 목록이 없는 입력 폼 화면)",
            "result": "N/A",
            "message": "",
            "placement": "inline",
            "target": ".pd-form"
          },
          {
            "state": "에러",
            "trigger": "로그인 제출",
            "guard": "자격증명 불일치",
            "result": "로그인 실패 · 폼 유지",
            "message": "아이디 또는 비밀번호를 다시 확인해 주세요.",
            "placement": "inline",
            "target": ".pd-form",
            "api": {
              "endpoint": "POST /admin/auth/login",
              "status": 401
            }
          },
          {
            "state": "에러",
            "trigger": "로그인 제출",
            "guard": "서버 오류",
            "result": "로그인 실패 · 재시도 안내",
            "message": "일시적인 오류로 로그인하지 못했어요. 잠시 후 다시 시도해 주세요.",
            "placement": "banner",
            "target": ".pd-form",
            "api": {
              "endpoint": "POST /admin/auth/login",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "로그인 제출",
            "guard": "교인(role=member) 계정으로 관리자 콘솔 로그인 시도",
            "result": "접근 차단 · 로그인 화면(SCR-ADM-001) 유지",
            "message": "관리자 권한이 없는 계정이에요. 관리자 권한은 담임목사가 위임합니다.",
            "placement": "inline",
            "target": ".pd-form",
            "api": {
              "endpoint": "POST /admin/auth/login",
              "status": 403
            }
          },
          {
            "state": "엣지",
            "trigger": "로그인 반복 실패",
            "guard": "연속 5회 로그인 실패 → 계정 잠금(목업 고지)",
            "result": "계정 잠금 · 제출 차단",
            "message": "로그인에 5회 실패해 계정이 잠겼어요. 잠시 후 다시 시도해 주세요.",
            "placement": "banner",
            "target": ".pd-form",
            "api": {
              "endpoint": "POST /admin/auth/login",
              "status": 429
            }
          },
          {
            "state": "엣지",
            "trigger": "비밀번호 재설정 클릭",
            "guard": "재설정 전용 플로우 미구현(자리표시 · 자기 링크)",
            "result": "로그인 화면(SCR-ADM-001) 유지",
            "message": "비밀번호 재설정은 교회 확인 후 안내드려요.",
            "placement": "inline",
            "target": ".pd-btn"
          },
          {
            "state": "입력검증",
            "trigger": "로그인 제출",
            "guard": "필수누락 — 아이디 또는 비밀번호 미입력",
            "result": "제출 차단(클라이언트 검증)",
            "message": "아이디와 비밀번호를 모두 입력해 주세요.",
            "placement": "inline",
            "target": ".pd-field"
          },
          {
            "state": "입력검증",
            "trigger": "로그인 제출",
            "guard": "형식오류 — 허용되지 않는 형식(공백만 · 제어문자 등)",
            "result": "제출 차단",
            "message": "입력할 수 없는 형식이에요. 아이디와 비밀번호를 다시 확인해 주세요.",
            "placement": "inline",
            "target": ".pd-field",
            "api": {
              "endpoint": "POST /admin/auth/login",
              "status": 400
            }
          },
          {
            "state": "입력검증",
            "trigger": "로그인 제출",
            "guard": "중복충돌·범위경계: 해당 없음(로그인은 신규 생성·수치 입력이 아님)",
            "result": "N/A",
            "message": "",
            "placement": "inline",
            "target": ".pd-field"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "loadAdminBranding",
              "intent": "관리자 로그인 화면 교회 브랜딩 로드",
              "method": "GET",
              "path": "/churches/{slug}/branding",
              "params": "slug=진입 서브도메인(공개 식별)",
              "response": "'{entities.Church}' (name·logo·primaryColor — '○○교회 관리자 콘솔' 헤더 렌더)",
              "auth": "none(공개)",
              "target": ".pd-form",
              "errors": [
                {
                  "status": 404,
                  "when": "존재하지 않는 교회 슬러그",
                  "message": "요청하신 교회를 찾을 수 없어요."
                },
                {
                  "status": 500,
                  "when": "브랜딩 로드 실패",
                  "message": "화면 정보를 불러오지 못했어요. 새로고침해 주세요."
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "adminLogin",
              "intent": "관리자 로그인",
              "method": "POST",
              "path": "/admin/auth/login",
              "body": "{loginId, password} — 테넌트는 진입 서브도메인({slug})으로 확정(path 비노출)",
              "response": "{token(JWT: role=admin·tenantId), onboardingComplete:boolean} — 인증 주체 '{entities.Member}'(role=admin), onboardingComplete는 '{entities.Church}'.status=활성 여부",
              "auth": "none(공개)→Bearer(admin)",
              "idempotency": "불필요 — 비가역 쓰기(Tenant 생성·Wizard OPEN·대량발송·요금제/상태 전이)에 해당하지 않음. confirm 불필요",
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 400,
                  "when": "아이디/비밀번호 누락·형식오류",
                  "message": "아이디와 비밀번호를 모두 입력해 주세요."
                },
                {
                  "status": 401,
                  "when": "자격증명 불일치",
                  "message": "아이디 또는 비밀번호를 다시 확인해 주세요."
                },
                {
                  "status": 403,
                  "when": "role=member(교인) 계정의 관리자 로그인 시도",
                  "message": "관리자 권한이 없는 계정이에요. 관리자 권한은 담임목사가 위임합니다."
                },
                {
                  "status": 429,
                  "when": "연속 5회 실패 계정 잠금·레이트리밋",
                  "message": "로그인에 5회 실패해 계정이 잠겼어요. 잠시 후 다시 시도해 주세요."
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "일시적인 오류로 로그인하지 못했어요. 잠시 후 다시 시도해 주세요."
                }
              ]
            }
          ],
          "events": [
            {
              "name": "ui.admin_login.submit",
              "when": "로그인 버튼 클릭 또는 폼 제출",
              "intent": "관리자 로그인 제출",
              "target": ".pd-btn"
            },
            {
              "name": "ui.admin_login.reset_click",
              "when": "비밀번호 재설정 버튼 클릭",
              "intent": "비밀번호 재설정 요청(자리표시 — 교회 확인 후 안내)",
              "target": ".pd-btn"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-ADM-002",
              "via": "설정 미완료 시 개설 Wizard"
            },
            {
              "screen": "SCR-ADM-003",
              "via": "설정 완료 시 대시보드"
            }
          ]
        }
      },
      {
        "id": "SCR-ADM-002",
        "label": "개설 설정 Wizard (8STEP)",
        "href": "c-wizard.html",
        "surface": "admin",
        "status": "wireframed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-004"
        ],
        "context": "최초 설정 Wizard 상태기계 STEP1~8: 교회명→로고→대표컬러→대표이미지→담임목사·주소·연락처·소개→예배시간→서비스 확인→OPEN. 완주 시 교회 status=활성. 단일 Design System이므로 입력은 화이트라벨 4요소+기본정보만.",
        "components": [
          {
            "role": ".pd-stepper",
            "kind": "stepper",
            "label": "진행 단계 — 교회명·로고·대표색·커버·기본정보·예배시간·서비스확인·오픈 (STEP 8/8)"
          },
          {
            "role": ".pd-form",
            "kind": "form",
            "label": "입력 내용 확인 — 오픈 전 최종 점검"
          },
          {
            "role": ".pd-field",
            "kind": "form",
            "label": "교회명·대표 색상·로고·대표 이미지(커버)·담임목사·주소·연락처·소개·예배 시간"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "서비스 오픈(OPEN)"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "서비스 오픈(OPEN)",
            "action": {
              "on": "click",
              "do": "go:SCR-ADM-003"
            }
          }
        ],
        "description": [
          {
            "text": "진행 단계 스테퍼 — 교회명부터 오픈까지 8단계 중 현재 위치(STEP 8/8)를 표시하고, '저장하고 나중에'로 중단 후 재진입하면 저장값으로 이어쓰기한다",
            "target": ".pd-stepper"
          },
          {
            "text": "입력 내용 확인 폼 — 오픈 전 최종 점검 화면. 레이아웃·네비게이션·타이포그래피는 단일 Design System으로 고정되고, 입력은 화이트라벨 4요소(로고·대표색·커버·교회명)와 기본정보·예배시간만 받는다. 수정은 '이전 단계'에서",
            "target": ".pd-form"
          },
          {
            "text": "입력 항목 확인 — 교회명(○○교회)·대표 색상·로고(미설정=교회명 워드마크)·대표 이미지(커버)·담임목사·주소·연락처·소개·예배 시간. 미확보 항목은 '교회 확인 후 게재'/'준비 중'으로 정직하게 표기",
            "target": ".pd-field"
          },
          {
            "text": "서비스 오픈 확인 — '서비스를 오픈할까요?' 모달. 오픈하면 교회 상태가 활성으로 바뀌고 공개홈이 노출되며, 멱등키로 중복 활성화를 막는 비가역 작업이다. 취소 시 대시보드(SCR-ADM-003)로 이동"
          },
          {
            "text": "서비스 오픈(OPEN) 버튼 — 확인 승인 시 교회 status=활성·공개홈 노출 후 관리자 대시보드(SCR-ADM-003)로 이동",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "Wizard 최초 진입",
            "guard": "저장값 없음(currentStep 미존재)",
            "result": "STEP1(교회명)부터 설정 시작",
            "message": "교회 기본 정보부터 차근차근 설정해요",
            "placement": "inline",
            "target": ".pd-stepper"
          },
          {
            "state": "로딩",
            "trigger": "진입·새로고침",
            "guard": "진행상태 조회 응답 대기",
            "result": "스테퍼·입력 확인 폼 스켈레톤 표시",
            "message": "설정 내용을 불러오는 중이에요",
            "placement": "inline",
            "target": ".pd-stepper",
            "api": {
              "endpoint": "GET /admin/church/setup",
              "status": "응답 대기"
            }
          },
          {
            "state": "정상",
            "trigger": "중단 후 재진입(이어쓰기)",
            "guard": "저장값 있음(currentStep=8)",
            "result": "STEP8 입력 내용 확인 화면을 저장값으로 복원",
            "message": "",
            "placement": "inline",
            "target": ".pd-form",
            "api": {
              "endpoint": "GET /admin/church/setup",
              "status": 200
            }
          },
          {
            "state": "정상",
            "trigger": "다음 단계(단계 저장)",
            "guard": "현재 단계 필수 입력 충족",
            "result": "입력값 저장·다음 단계로 진행·진행률 갱신",
            "message": "저장했어요",
            "placement": "toast",
            "target": ".pd-form",
            "api": {
              "endpoint": "PUT /admin/church/setup/step{n}",
              "status": 200
            }
          },
          {
            "state": "정상",
            "trigger": "서비스 오픈(OPEN) 확인 승인",
            "guard": "STEP8 최종 점검 완료·확인 모달 승인",
            "result": "교회 status=활성·공개홈 노출 후 대시보드(SCR-ADM-003)로 이동",
            "message": "서비스가 오픈되었어요",
            "placement": "toast",
            "api": {
              "endpoint": "POST /admin/church/open",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "STEP8 점검",
            "guard": "선택 입력 미설정(로고·대표색·기본정보·예배시간 등 미입력)",
            "result": "미설정 항목을 기본값/플레이스홀더로 표시(로고 미설정=교회명 워드마크, 대표색·기본정보=교회 확인 후 게재, 예배시간=준비 중)",
            "message": "아직 입력하지 않은 항목은 '교회 확인 후 게재'로 노출돼요. 이전 단계에서 언제든 보완할 수 있어요",
            "placement": "inline",
            "target": ".pd-field"
          },
          {
            "state": "에러",
            "trigger": "서비스 오픈(OPEN)",
            "guard": "서버 오류(500)",
            "result": "오픈 실패·교회 상태 유지(미오픈)",
            "message": "서비스 오픈에 실패했어요. 잠시 후 다시 시도해 주세요",
            "placement": "banner",
            "api": {
              "endpoint": "POST /admin/church/open",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "진입·오픈",
            "guard": "JWT 없음/세션 만료(401) 또는 role≠admin·타 교회 스코프(403)",
            "result": "접근 차단 후 관리자 로그인(SCR-ADM-001)으로 유도",
            "message": "관리자 로그인이 필요해요",
            "placement": "full-page",
            "target": ".pd-stepper",
            "api": {
              "endpoint": "GET /admin/church/setup",
              "status": 401
            }
          },
          {
            "state": "엣지",
            "trigger": "서비스 오픈(OPEN) 중복 시도(이미 오픈된 교회 재오픈)",
            "guard": "이미 status=활성(멱등키로 중복 활성화 감지, 409)",
            "result": "중복 활성화 차단·대시보드 안내",
            "message": "이미 오픈된 교회예요. 대시보드에서 관리할 수 있어요",
            "placement": "modal",
            "api": {
              "endpoint": "POST /admin/church/open",
              "status": 409
            }
          },
          {
            "state": "입력검증·필수누락",
            "trigger": "다음 단계",
            "guard": "필수 항목(교회명) 누락",
            "result": "다음 단계 차단·해당 필드 강조",
            "message": "교회명은 꼭 입력해 주세요",
            "placement": "inline",
            "target": ".pd-field",
            "api": {
              "endpoint": "PUT /admin/church/setup/step{n}",
              "status": 422
            }
          },
          {
            "state": "입력검증·형식오류",
            "trigger": "로고·커버 이미지 업로드",
            "guard": "이미지 아님(JPG·PNG 외) 또는 용량 초과(5MB 초과)",
            "result": "업로드 거부·기존 값 유지",
            "message": "이미지 파일(JPG·PNG)만, 5MB 이하로 올려 주세요",
            "placement": "inline",
            "target": ".pd-field",
            "api": {
              "endpoint": "PUT /admin/church/setup/step{n}",
              "status": 400
            }
          },
          {
            "state": "입력검증·중복충돌",
            "trigger": "입력 저장",
            "guard": "엣지: 필드 중복충돌 해당 없음 — 도메인(slug)은 개설 승인 시 확정되어 Wizard에서 입력하지 않음(교회명은 유일성 제약 없음)",
            "result": "필드 레벨 중복 검증 불필요(서비스 레벨 중복 활성화는 엣지 케이스의 409로 차단)",
            "message": "",
            "placement": "inline",
            "target": ".pd-field"
          },
          {
            "state": "입력검증·유효",
            "trigger": "필드 입력 완료",
            "guard": "현재 단계 모든 필수·형식 검증 통과",
            "result": "'다음 단계'/'서비스 오픈(OPEN)' 버튼 활성화·저장 가능",
            "message": "",
            "placement": "inline",
            "target": ".pd-form"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "setupState",
              "intent": "개설 Wizard 진행상태·입력값 조회",
              "method": "GET",
              "path": "/admin/church/setup",
              "params": "tenantId=JWT(path 비노출·본인 교회 스코프)",
              "response": "{ currentStep, draft: '{entities.Church}'(name·logo·primaryColor·coverImage·intro), channel: '{entities.ChannelConfig}' }",
              "auth": "Bearer(admin)",
              "target": ".pd-stepper",
              "errors": [
                {
                  "status": 401,
                  "when": "미인증·세션 만료",
                  "message": "관리자 로그인이 필요해요"
                },
                {
                  "status": 403,
                  "when": "비관리자·타 교회 스코프 접근",
                  "message": "이 교회를 관리할 권한이 없어요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "설정 내용을 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "saveSetupStep",
              "intent": "단계 입력 저장(이어쓰기·단계별 멱등 upsert)",
              "method": "PUT",
              "path": "/admin/church/setup/step{n}",
              "body": "{ n단계 입력값 } (tenantId=JWT)",
              "response": "{ nextStep, draft: '{entities.Church}' }",
              "auth": "Bearer(admin)",
              "idempotent": true,
              "target": ".pd-form",
              "errors": [
                {
                  "status": 400,
                  "when": "이미지 형식·용량 오류(JPG·PNG 외/5MB 초과)",
                  "message": "이미지 파일(JPG·PNG)만, 5MB 이하로 올려 주세요"
                },
                {
                  "status": 422,
                  "when": "필수 항목 누락(교회명)",
                  "message": "교회명은 꼭 입력해 주세요"
                },
                {
                  "status": 401,
                  "when": "세션 만료",
                  "message": "관리자 로그인이 필요해요"
                }
              ]
            },
            {
              "id": "openChurch",
              "intent": "서비스 오픈(비가역·교회 활성화)",
              "method": "POST",
              "path": "/admin/church/open",
              "body": "{ } + Idempotency-Key 헤더 (tenantId=JWT)",
              "response": "{ '{entities.Church}'.status: '활성' }",
              "auth": "Bearer(admin)",
              "idempotent": true,
              "confirm": "pd-confirm 모달 승인 필요 · 비가역 작업 · Idempotency-Key로 중복 활성화 차단 · 감사로그 기록",
              "errors": [
                {
                  "status": 409,
                  "when": "이미 활성(중복 오픈 시도)",
                  "message": "이미 오픈된 교회예요. 대시보드에서 관리할 수 있어요"
                },
                {
                  "status": 422,
                  "when": "필수 단계 미완료",
                  "message": "오픈 전에 모든 단계를 완료해 주세요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "서비스 오픈에 실패했어요. 잠시 후 다시 시도해 주세요"
                }
              ]
            }
          ],
          "events": [
            {
              "id": "churchOpened",
              "name": "church.opened",
              "intent": "서비스 오픈 완료",
              "when": "서비스 오픈(OPEN) 성공",
              "effect": "'{entities.Church}'.status=활성 · '{entities.ChannelConfig}'(web/pwa/webPush) 활성 · '{entities.PwaConfig}' manifest 생성 · 공개홈({slug}.hurmate.com) 노출 · 관리자 대시보드(SCR-ADM-003) 이동"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-ADM-003",
              "via": "완주 후 대시보드"
            }
          ]
        }
      },
      {
        "id": "SCR-ADM-003",
        "label": "관리자 대시보드",
        "href": "c-dashboard.html",
        "surface": "admin",
        "status": "confirmed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-018",
          "REQ-022"
        ],
        "context": "대시보드 — 회원수·가입승인대기·최근 공지/설교/주보·알림 발송 수·스토리지 사용량 KPI. 본인 교회만(tenant 격리, church_id는 JWT에서). 좌측 사이드바에서 전 메뉴 분기.",
        "components": [
          {
            "role": ".pd-sidebar",
            "kind": "list",
            "label": "운영·설정·계정 메뉴(대시보드·성도 관리·설교 관리·주보 관리·공지 관리·알림 발송 / 교회 설정·브랜딩·교회소개 콘텐츠·PWA 관리·앱 관리(차기)·요금제·사용현황 / 관리자 계정·로그아웃)"
          },
          {
            "role": ".pd-kpi",
            "kind": "kpi",
            "label": "전체 성도·이번 주 출석·가입 승인대기·이번 주 설교 (본인 교회 집계)"
          },
          {
            "role": ".pd-wpanel",
            "kind": "card",
            "label": "최근 활동(가입·설교·공지) · 전체 보기"
          },
          {
            "role": ".pd-stat",
            "kind": "kpi",
            "label": "가입 승인대기 3건 · 확인 필요",
            "action": {
              "on": "click",
              "do": "go:SCR-ADM-010"
            }
          }
        ],
        "description": [
          {
            "text": "좌측 사이드바 — 운영·설정·계정 그룹에서 성도 관리(SCR-ADM-010)·설교 관리(SCR-ADM-006)·주보 관리(SCR-ADM-011)·공지 관리(SCR-ADM-009)·알림 발송(SCR-ADM-013)·교회 설정·브랜딩(SCR-ADM-004)·PWA 관리(SCR-ADM-014) 등 전 메뉴로 분기. 현재 '대시보드' 메뉴가 활성 상태.",
            "target": ".pd-sidebar"
          },
          {
            "text": "상단 KPI 카드 — 전체 성도(128)·이번 주 출석·가입 승인대기(3)·이번 주 설교(2)를 본인 교회(tenant) 집계만 표시. 페이지헤드의 '이번 주 ▾' 기간 필터로 집계 범위를 전환.",
            "target": ".pd-kpi"
          },
          {
            "text": "'가입 승인대기' 통계 카드 — '확인 필요' 뱃지로 대기 건수를 강조하고, 클릭하면 대기 회원을 승인 처리하는 성도 관리(SCR-ADM-010)로 이동.",
            "target": ".pd-stat"
          },
          {
            "text": "'최근 활동' 패널 — 가입 신청·설교 등록(로마서 강해 12)·공지 게시(추수감사주일 안내)를 시간 역순으로 요약. 각 행은 성도 관리(SCR-ADM-010)·설교 관리(SCR-ADM-006)·공지 관리(SCR-ADM-009)로, 우상단 '전체 보기'는 성도 관리(SCR-ADM-010)로 이동.",
            "target": ".pd-wpanel"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "관리자 로그인 후 대시보드 진입",
            "guard": "JWT role=admin·tenantId(본인 교회) 확인, 레이아웃·사이드바 셸 먼저 렌더",
            "result": "GNB·사이드바·페이지헤드 즉시 표시, KPI·최근 활동 영역은 자리만 확보",
            "message": "",
            "placement": "inline",
            "target": ".pd-sidebar"
          },
          {
            "state": "로딩",
            "trigger": "집계 API 호출 중",
            "guard": "GET /admin/dashboard 응답 대기",
            "result": "KPI 카드·최근 활동 테이블 스켈레톤 표시",
            "message": "",
            "placement": "inline",
            "target": ".pd-kpi"
          },
          {
            "state": "정상",
            "trigger": "집계 응답 수신",
            "guard": "교회 status=활성, 본인 tenant 집계 반환",
            "result": "전체 성도·이번 주 출석·가입 승인대기·이번 주 설교 KPI와 최근 활동 표시",
            "message": "",
            "placement": "inline",
            "target": ".pd-kpi",
            "api": {
              "endpoint": "GET /admin/dashboard",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "집계 응답 수신(신규 개설)",
            "guard": "콘텐츠·활동 0건",
            "result": "최근 활동 빈 상태 + 설정 유도 액션",
            "message": "아직 등록된 활동이 없어요. 설교·공지부터 올려보세요.",
            "placement": "inline",
            "target": ".pd-wpanel",
            "api": {
              "endpoint": "GET /admin/dashboard",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "집계 응답 실패",
            "guard": "서버 오류",
            "result": "KPI 영역에 재시도 배너 표시",
            "message": "집계를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.",
            "placement": "banner",
            "target": ".pd-kpi",
            "api": {
              "endpoint": "GET /admin/dashboard",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "진입·조회",
            "guard": "role≠admin 또는 타 테넌트 토큰(A교회↔B교회 차단)",
            "result": "접근 차단 후 로그인 유도",
            "message": "이 교회 관리자 권한이 없어요. 다시 로그인해 주세요.(SCR-ADM-001)",
            "placement": "full-page",
            "target": ".pd-kpi",
            "api": {
              "endpoint": "GET /admin/dashboard",
              "status": 403
            }
          },
          {
            "state": "엣지",
            "trigger": "'이번 주 출석' KPI 렌더",
            "guard": "출석 집계 모듈(AttendanceSession) 봉인·미연동(V2.0 feature-flag OFF)",
            "result": "'이번 주 출석' 카드에 '준비 중' 표기(정직성)",
            "message": "출석 집계는 교회 확인 후 제공돼요(준비 중).",
            "placement": "inline",
            "target": ".pd-stat"
          },
          {
            "state": "엣지",
            "trigger": "집계 응답 수신(serviceStatus=일시정지)",
            "guard": "구독 overdue→서비스 상태 '일시정지'(§47)",
            "result": "읽기전용 안내 배너 노출(발송·요금제 액션 제한)",
            "message": "구독 상태를 확인해 주세요. 결제 전까지 일부 기능이 제한돼요.",
            "placement": "banner",
            "target": ".pd-kpi",
            "api": {
              "endpoint": "GET /admin/dashboard",
              "status": 200
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "dashboard",
              "intent": "대시보드 집계 조회(본인 교회 tenant 격리)",
              "method": "GET",
              "path": "/admin/dashboard",
              "params": "?period=this_week (기간 필터 — 페이지헤드 '이번 주 ▾')",
              "response": "{ memberCount, pendingApprovals, thisWeekSermons, sentCount, serviceStatus, attendance: '준비 중(AttendanceSession 봉인)', recent: ['{entities.Member}', '{entities.Sermon}', '{entities.Notice}'] } — tenantId=JWT 스코프, path 비노출",
              "auth": "Bearer(admin)",
              "target": ".pd-kpi",
              "errors": [
                {
                  "status": 401,
                  "when": "미인증·토큰 만료",
                  "message": "로그인이 필요해요.(SCR-ADM-001)"
                },
                {
                  "status": 403,
                  "when": "관리자 권한 없음·타 테넌트 접근(교차테넌트 차단)",
                  "message": "이 교회에 접근 권한이 없어요."
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "집계를 불러오지 못했어요. 잠시 후 다시 시도해 주세요."
                }
              ]
            },
            {
              "id": "recentActivity",
              "intent": "최근 활동 요약 조회(가입·설교·공지 통합, 시간 역순)",
              "method": "GET",
              "path": "/admin/activities",
              "params": "?cursor=&limit=20 (cursor 기반 페이지네이션)",
              "response": "최근 항목 배열 — '{entities.Member}'(가입 신청)·'{entities.Sermon}'(설교 등록)·'{entities.Notice}'(공지 게시) 혼합, tenantId=JWT 스코프",
              "auth": "Bearer(admin)",
              "target": ".pd-wpanel",
              "errors": [
                {
                  "status": 401,
                  "when": "미인증·토큰 만료",
                  "message": "로그인이 필요해요.(SCR-ADM-001)"
                },
                {
                  "status": 403,
                  "when": "타 테넌트 접근",
                  "message": "이 교회에 접근 권한이 없어요."
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "최근 활동을 불러오지 못했어요."
                }
              ]
            }
          ],
          "writes": [],
          "events": [
            {
              "name": "dashboard.period.change",
              "intent": "대시보드 기간 필터('이번 주 ▾') 변경 → 집계 재조회",
              "when": "기간 드롭다운 선택",
              "target": ".pd-kpi"
            },
            {
              "name": "dashboard.pending.click",
              "intent": "'가입 승인대기' 카드 클릭 → 성도 관리(SCR-ADM-010) 이동",
              "when": "승인대기 통계 카드 클릭",
              "target": ".pd-stat"
            },
            {
              "name": "dashboard.recent.open",
              "intent": "최근 활동 항목 열기 → 해당 콘텐츠(회원 SCR-ADM-010·설교 SCR-ADM-006·공지 SCR-ADM-009) 이동",
              "when": "최근 활동 행 또는 '전체 보기' 클릭",
              "target": ".pd-wpanel"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-ADM-010",
              "via": "성도 관리",
              "trigger": ".pd-stat"
            },
            {
              "screen": "SCR-ADM-006",
              "via": "설교 관리",
              "trigger": ".pd-sidebar"
            },
            {
              "screen": "SCR-ADM-009",
              "via": "공지 관리",
              "trigger": ".pd-sidebar"
            },
            {
              "screen": "SCR-ADM-013",
              "via": "알림 발송",
              "trigger": ".pd-sidebar"
            }
          ]
        }
      },
      {
        "id": "SCR-ADM-004",
        "label": "교회 설정·브랜딩",
        "href": "c-homepage.html",
        "surface": "admin",
        "status": "confirmed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-019",
          "REQ-014"
        ],
        "context": "화이트라벨 4요소(로고·대표색·커버이미지·교회명) 설정 — 저장 시 즉시 반영. Layout/Nav/Grid/Typography는 단일 DS 고정(변경불가 안내). PWA 설정(SCR-ADM-014)과 연계.",
        "components": [
          {
            "role": ".pd-pagehead",
            "kind": "banner",
            "label": "홈페이지·화이트라벨 설정"
          },
          {
            "role": ".pd-form",
            "kind": "form",
            "label": "브랜드 편집 (교회명·주색·로고·커버이미지)"
          },
          {
            "role": ".pd-field",
            "kind": "form",
            "label": "교회명·주색·로고"
          },
          {
            "role": ".pd-wpanel",
            "kind": "card",
            "label": "브랜드"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "저장",
            "action": {
              "on": "click",
              "do": "go:SCR-ADM-003"
            }
          }
        ],
        "description": [
          {
            "text": "상단 페이지헤드 — 경로 '설정 / 홈페이지'와 제목 '홈페이지·화이트라벨 설정', 우측 '저장' 버튼으로 구성. 저장하면 관리자 대시보드(SCR-ADM-003)로 복귀한다.",
            "target": ".pd-pagehead"
          },
          {
            "text": "'브랜드' 패널 — 화이트라벨 요소만 편집하는 영역. 레이아웃·네비·그리드·타이포는 플랫폼 단일 Design System으로 고정(변경 불가)이며, 교회별 변경은 브랜드 요소에 한정된다.",
            "target": ".pd-wpanel"
          },
          {
            "text": "브랜드 편집 폼(2열) — 교회명(○○교회)·주색(#53634b)·로고·커버이미지를 입력. 저장 시 공개홈·교인앱·PWA 관리(SCR-ADM-014)에 즉시 반영된다.",
            "target": ".pd-form"
          },
          {
            "text": "개별 입력 필드 — 교회명 텍스트, 주색 HEX 색상코드, 로고 업로드. 로고를 올리지 않으면 교회명 워드마크로 자동 대체된다.",
            "target": ".pd-field"
          },
          {
            "text": "'저장' 버튼 — 브랜딩을 반영하고 대시보드(SCR-ADM-003)로 이동. PWA 아이콘/테마색 재생성은 PWA 관리(SCR-ADM-014)와 연계된다.",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "화면 진입",
            "guard": "관리자 세션 유효·기존 브랜딩 존재",
            "result": "교회명·주색·로고 현재값이 폼에 채워져 표시",
            "message": "",
            "placement": "inline",
            "target": ".pd-form",
            "api": {
              "endpoint": "GET /admin/branding",
              "status": 200
            }
          },
          {
            "state": "로딩",
            "trigger": "화면 진입 직후 조회 중",
            "guard": "GET /admin/branding 응답 대기",
            "result": "폼 영역에 로딩 표시, 입력·저장 비활성",
            "message": "브랜딩을 불러오는 중이에요",
            "placement": "inline",
            "target": ".pd-form"
          },
          {
            "state": "정상",
            "trigger": "'저장' 클릭",
            "guard": "교회명·주색·로고 입력값 유효",
            "result": "브랜딩 반영·대시보드(SCR-ADM-003)로 복귀",
            "message": "브랜딩이 저장돼 공개홈·앱에 바로 반영됐어요",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "PUT /admin/branding",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "화면 진입",
            "guard": "신규 개설 직후 브랜드 미설정",
            "result": "안내 플레이스홀더 표시(로고=교회명 워드마크 기본값)",
            "message": "아직 브랜드가 설정되지 않았어요. 교회명·주색·로고를 입력하면 공개홈에 반영돼요",
            "placement": "inline",
            "target": ".pd-form",
            "api": {
              "endpoint": "GET /admin/branding",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "'저장' 클릭",
            "guard": "서버/스토리지 오류",
            "result": "저장 실패·입력값 유지",
            "message": "저장 중 문제가 생겼어요. 잠시 후 다시 시도해 주세요",
            "placement": "banner",
            "target": ".pd-btn",
            "api": {
              "endpoint": "PUT /admin/branding",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "화면 진입 또는 저장",
            "guard": "admin 토큰 만료/부재 또는 타 교회 테넌트 스코프 접근",
            "result": "관리자 로그인(SCR-ADM-001)으로 유도",
            "message": "접근 권한이 없어요. 관리자 로그인 후 이용해 주세요",
            "placement": "full-page",
            "target": ".pd-pagehead",
            "api": {
              "endpoint": "GET /admin/branding",
              "status": 401
            }
          },
          {
            "state": "엣지",
            "trigger": "로고 미설정 상태로 저장",
            "guard": "로고 입력 비어 있음",
            "result": "'○○교회' 교회명 워드마크로 자동 대체·미리보기 갱신",
            "message": "로고가 없으면 교회명 워드마크로 표시돼요",
            "placement": "inline",
            "target": ".pd-field",
            "api": {
              "endpoint": "PUT /admin/branding",
              "status": 200
            }
          },
          {
            "state": "입력검증(필수누락)",
            "trigger": "'저장' 클릭",
            "guard": "교회명이 비어 있음",
            "result": "저장 차단·교회명 필드로 포커스",
            "message": "교회명을 입력해 주세요",
            "placement": "inline",
            "target": ".pd-field",
            "api": {
              "endpoint": "PUT /admin/branding",
              "status": 422
            }
          },
          {
            "state": "입력검증(형식오류)",
            "trigger": "'저장' 클릭",
            "guard": "주색이 HEX 색상코드(#RRGGBB) 형식이 아님",
            "result": "저장 차단·주색 필드 표시",
            "message": "주색은 #53634b 같은 색상 코드로 입력해 주세요",
            "placement": "inline",
            "target": ".pd-field",
            "api": {
              "endpoint": "PUT /admin/branding",
              "status": 400
            }
          },
          {
            "state": "입력검증(범위경계)",
            "trigger": "로고 업로드",
            "guard": "허용 형식(PNG·SVG) 외 또는 용량 초과",
            "result": "업로드 거부·기존 로고 유지",
            "message": "로고는 PNG·SVG 형식, 허용 용량 이내로 올려주세요",
            "placement": "inline",
            "target": ".pd-field",
            "api": {
              "endpoint": "PUT /admin/branding",
              "status": 422
            }
          },
          {
            "state": "입력검증(중복충돌)",
            "trigger": "'저장' 클릭",
            "guard": "다른 관리자가 먼저 저장해 버전 충돌",
            "result": "저장 보류·최신본 재조회 안내",
            "message": "다른 관리자가 먼저 저장했어요. 새로고침 후 다시 저장해 주세요",
            "placement": "banner",
            "target": ".pd-btn",
            "api": {
              "endpoint": "PUT /admin/branding",
              "status": 409
            }
          },
          {
            "state": "입력검증(유효)",
            "trigger": "입력값 변경",
            "guard": "교회명·주색·로고 모두 유효",
            "result": "미리보기 갱신·'저장' 버튼 활성",
            "message": "입력값이 확인됐어요",
            "placement": "inline",
            "target": ".pd-form"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "churchBranding",
              "intent": "교회 브랜딩 조회(교회명·주색·로고·커버)",
              "method": "GET",
              "path": "/admin/branding",
              "response": "'{entities.Church}' (name·primaryColor·logo·coverImage)",
              "auth": "Bearer(admin)",
              "target": ".pd-form",
              "note": "tenantId=JWT 스코프 강제(본인 교회만). path에 slug 비노출.",
              "errors": [
                {
                  "status": 401,
                  "when": "관리자 미인증/토큰 만료",
                  "message": "관리자 로그인이 필요해요"
                },
                {
                  "status": 403,
                  "when": "타 교회 테넌트 스코프 접근",
                  "message": "접근 권한이 없어요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "브랜딩을 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "saveBranding",
              "intent": "브랜딩 저장(가역·즉시 반영)",
              "method": "PUT",
              "path": "/admin/branding",
              "body": "{name, primaryColor, logo, coverImage}",
              "response": "'{entities.Church}' (적용된 브랜딩) · {applied:true}",
              "auth": "Bearer(admin)",
              "idempotent": true,
              "confirm": false,
              "note": "가역 변경(언제든 재편집)이라 confirm 모달 없이 즉시 저장. PUT 멱등 + Idempotency-Key로 재시도 안전. tenantId=JWT 스코프 강제로 타 교회 쓰기 차단.",
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 400,
                  "when": "주색 HEX 색상코드 형식 오류",
                  "message": "주색은 #53634b 같은 색상 코드로 입력해 주세요"
                },
                {
                  "status": 401,
                  "when": "관리자 미인증",
                  "message": "관리자 로그인이 필요해요"
                },
                {
                  "status": 403,
                  "when": "타 교회 테넌트 접근",
                  "message": "접근 권한이 없어요"
                },
                {
                  "status": 409,
                  "when": "다른 관리자와 동시 수정 충돌",
                  "message": "다른 관리자가 먼저 저장했어요. 새로고침 후 다시 저장해 주세요"
                },
                {
                  "status": 422,
                  "when": "교회명 누락 또는 로고 형식/용량 초과",
                  "message": "교회명을 입력하고, 로고는 허용된 형식·용량으로 올려주세요"
                }
              ]
            }
          ],
          "events": [
            {
              "id": "brandingUpdated",
              "name": "branding.updated",
              "intent": "브랜딩 갱신 전파",
              "when": "저장 성공(200)",
              "effect": "공개홈·교인앱 즉시 반영, PwaConfig(SCR-ADM-014) 아이콘(192/512/maskable)·테마색 재생성 유도, 로고 미설정 시 교회명 워드마크 적용"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-ADM-003",
              "via": "저장 후 대시보드",
              "trigger": ".pd-btn"
            }
          ]
        }
      },
      {
        "id": "SCR-ADM-005",
        "label": "교회소개 콘텐츠 관리",
        "href": "c-site-content.html",
        "surface": "admin",
        "status": "confirmed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-010"
        ],
        "context": "교회소개·예배시간·오시는 길 콘텐츠 편집. 섬기는사람들·소식 섹션은 봉인(5메뉴 외). 공개홈 교회소개(SCR-SITE-002)에 반영.",
        "components": [
          {
            "role": ".pd-pagehead",
            "kind": "banner",
            "label": "공개홈 콘텐츠 관리"
          },
          {
            "role": ".pd-segment",
            "kind": "tabbar",
            "label": "예배 안내·교회 소개·오시는 길 탭(섬기는 사람들·교회 소식은 봉인)"
          },
          {
            "role": ".pd-form",
            "kind": "form",
            "label": "교회 소개(비전 문구·소개)·오시는 길(주소·주차·지도 링크) 편집"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "저장",
            "action": {
              "on": "click",
              "do": "go:SCR-ADM-003"
            }
          }
        ],
        "description": [
          {
            "text": "페이지 헤더 — 경로 '운영 / 공개홈 콘텐츠'와 제목 '공개홈 콘텐츠 관리', 우측 상단 저장 버튼. '공개홈에 노출되는 예배시간·교회소개·오시는길을 직접 관리합니다.'",
            "target": ".pd-pagehead"
          },
          {
            "text": "섹션 탭 — 예배 안내·교회 소개·오시는 길을 전환하며 편집한다. 섬기는 사람들·교회 소식 탭은 V2 봉인(5메뉴 외). 저장분은 공개홈 교회소개(SCR-SITE-002)에 그대로 반영.",
            "target": ".pd-segment"
          },
          {
            "text": "편집 폼 — 교회 소개 탭의 비전 문구('온 땅에 천국 복음을 전하는 교회')·소개, 오시는 길 탭의 주소·주차·지도 링크를 입력한다. 예배 안내 탭은 예배 시간표(예배·시간·장소, 예: 주일 1부 09:00 본당)로 관리.",
            "target": ".pd-form"
          },
          {
            "text": "저장 버튼 — 입력한 콘텐츠를 저장하고 공개홈(SCR-SITE-002)에 반영한 뒤 대시보드(SCR-ADM-003)로 이동.",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "관리자 진입",
            "guard": "JWT(admin) 유효·tenantId 스코프 바인딩",
            "result": "현재 저장된 교회 소개·예배 시간표·오시는 길 콘텐츠를 폼에 채워 표시",
            "message": "",
            "placement": "inline",
            "target": ".pd-form",
            "api": {
              "endpoint": "GET /admin/site-content",
              "status": 200
            }
          },
          {
            "state": "로딩",
            "trigger": "콘텐츠 조회 중",
            "guard": "GET 응답 대기",
            "result": "폼 영역 스켈레톤 표시",
            "message": "콘텐츠를 불러오는 중이에요",
            "placement": "inline",
            "target": ".pd-form"
          },
          {
            "state": "정상",
            "trigger": "저장 버튼 클릭",
            "guard": "필수·형식·중복 검증 모두 통과",
            "result": "콘텐츠 저장 후 공개홈 반영·대시보드(SCR-ADM-003)로 복귀",
            "message": "교회 소개가 저장되었어요. 공개홈에 바로 반영돼요.",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "PUT /admin/site-content",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "미작성 상태로 진입",
            "guard": "저장된 섹션 없음",
            "result": "안내 플레이스홀더 표시·입력 유도",
            "message": "아직 작성된 교회 소개가 없어요. 비전 문구와 소개를 입력하면 공개홈에 노출돼요.",
            "placement": "inline",
            "target": ".pd-form",
            "api": {
              "endpoint": "GET /admin/site-content",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "저장 실패",
            "guard": "서버 오류(5xx)",
            "result": "저장 미반영·재시도 안내",
            "message": "콘텐츠를 저장하지 못했어요. 잠시 후 다시 시도해 주세요.",
            "placement": "banner",
            "target": ".pd-btn",
            "api": {
              "endpoint": "PUT /admin/site-content",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "비관리자·만료 토큰 진입",
            "guard": "role≠admin 또는 JWT 만료·타테넌트 접근",
            "result": "편집 차단·관리자 로그인(SCR-ADM-001)으로 이동",
            "message": "접근 권한이 없어요. 관리자 로그인이 필요해요.",
            "placement": "full-page",
            "target": ".pd-pagehead",
            "api": {
              "endpoint": "GET /admin/site-content",
              "status": 403
            }
          },
          {
            "state": "엣지",
            "trigger": "다른 관리자가 먼저 저장(동시 편집)",
            "guard": "서버 버전과 불일치",
            "result": "현재 입력 보존·최신본 재로딩 유도",
            "message": "다른 관리자가 먼저 저장했어요. 최신 내용을 불러온 뒤 다시 저장해 주세요.",
            "placement": "modal",
            "target": ".pd-btn",
            "api": {
              "endpoint": "PUT /admin/site-content",
              "status": 409
            }
          },
          {
            "state": "입력검증:필수누락",
            "trigger": "비전 문구·소개 공란으로 저장",
            "guard": "교회 소개 탭 필수값 누락",
            "result": "저장 차단·해당 필드 하이라이트",
            "message": "비전 문구와 소개를 입력해 주세요.",
            "placement": "inline",
            "target": ".pd-form",
            "api": {
              "endpoint": "PUT /admin/site-content",
              "status": 422
            }
          },
          {
            "state": "입력검증:형식오류",
            "trigger": "지도 링크 URL 형식 오류로 저장",
            "guard": "오시는 길 지도 링크가 http(s) URL 아님",
            "result": "저장 차단·형식 안내",
            "message": "지도 링크는 올바른 URL 형식이어야 해요. (예: https://map...)",
            "placement": "inline",
            "target": ".pd-form",
            "api": {
              "endpoint": "PUT /admin/site-content",
              "status": 400
            }
          },
          {
            "state": "입력검증:중복충돌",
            "trigger": "예배 추가 시 동일 예배·시간 입력",
            "guard": "예배 시간표에 같은 예배·시간 존재",
            "result": "추가 차단·중복 안내",
            "message": "이미 같은 예배 시간이 등록돼 있어요.",
            "placement": "inline",
            "target": ".pd-form",
            "api": {
              "endpoint": "PUT /admin/site-content",
              "status": 409
            }
          },
          {
            "state": "입력검증:유효",
            "trigger": "모든 입력 검증 통과",
            "guard": "필수·형식·중복 모두 통과",
            "result": "저장 버튼 활성·저장 가능",
            "message": "입력이 확인됐어요. 저장하면 공개홈에 반영돼요.",
            "placement": "inline",
            "target": ".pd-btn"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "siteContent",
              "intent": "교회소개 콘텐츠 조회",
              "method": "GET",
              "path": "/admin/site-content",
              "params": "tenantId=JWT(path 비노출), section=about·worship·location",
              "response": "{entities.SiteContent}[] (섹션별 data: 소개·비전·예배시간표·주소·지도)",
              "auth": "Bearer(admin)",
              "target": ".pd-form",
              "errors": [
                {
                  "status": 401,
                  "when": "미인증(토큰 없음/만료)",
                  "message": "로그인이 필요해요"
                },
                {
                  "status": 403,
                  "when": "관리자 권한 없음·타테넌트 접근",
                  "message": "접근 권한이 없어요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "콘텐츠를 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "saveSiteContent",
              "intent": "교회소개 콘텐츠 저장",
              "method": "PUT",
              "path": "/admin/site-content",
              "body": "{entities.SiteContent} (about·worship·location 섹션 data)",
              "response": "{entities.SiteContent}",
              "auth": "Bearer(admin)",
              "idempotent": true,
              "note": "PUT 멱등(섹션 전체 치환). 비가역 상태전이 아닌 콘텐츠 수정이라 별도 confirm 생략. 저장 성공 시 공개홈(SCR-SITE-002)에 즉시 반영. tenantId=JWT 스코프 강제(타 교회 콘텐츠 차단).",
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 400,
                  "when": "지도 링크 등 형식 오류",
                  "message": "입력 형식을 확인해 주세요"
                },
                {
                  "status": 401,
                  "when": "미인증",
                  "message": "로그인이 필요해요"
                },
                {
                  "status": 403,
                  "when": "관리자 권한 없음·타테넌트 접근",
                  "message": "접근 권한이 없어요"
                },
                {
                  "status": 409,
                  "when": "동시 편집 버전 충돌",
                  "message": "다른 관리자가 먼저 저장했어요. 최신 내용을 불러와 주세요"
                },
                {
                  "status": 422,
                  "when": "필수값 누락 등 비즈니스 규칙 위반",
                  "message": "입력 내용을 확인해 주세요"
                }
              ]
            }
          ],
          "events": [
            {
              "name": "content.tab.switch",
              "intent": "섹션 탭 전환",
              "when": "예배 안내·교회 소개·오시는 길 탭 클릭",
              "target": ".pd-segment"
            },
            {
              "name": "content.save.submit",
              "intent": "교회소개 저장 요청",
              "when": "저장 버튼 클릭",
              "target": ".pd-btn"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-ADM-003",
              "via": "저장 후 대시보드",
              "trigger": ".pd-btn"
            }
          ]
        }
      },
      {
        "id": "SCR-ADM-006",
        "label": "설교 관리",
        "href": "c-sermon.html",
        "surface": "admin",
        "status": "confirmed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-007"
        ],
        "context": "설교 CRUD — 제목·설교자·날짜·성경본문·설명·YouTube URL·썸네일. 자체 영상 저장 없음(YouTube 임베드만). 목록에서 등록/수정 폼(SCR-ADM-007) 진입.",
        "components": [
          {
            "role": ".pd-pagehead",
            "kind": "banner",
            "label": "설교 관리"
          },
          {
            "role": ".pd-pagehead-actions",
            "kind": "button",
            "label": "+ 설교 등록",
            "action": {
              "on": "click",
              "do": "go:SCR-ADM-007"
            }
          },
          {
            "role": ".pd-table",
            "kind": "table",
            "label": "설교 목록(제목·설교자·날짜·상태·처리)",
            "action": {
              "on": "click",
              "do": "go:SCR-ADM-007"
            }
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "등록"
          }
        ],
        "description": [
          {
            "text": "상단 페이지헤더 — '운영 / 설교 관리' 경로와 '설교 관리' 제목을 표시하는 현재 화면(SCR-ADM-006)의 머리글",
            "target": ".pd-pagehead"
          },
          {
            "text": "'+ 설교 등록' 버튼 — 제목·설교자·날짜·성경본문·설명·유튜브 URL을 모두 입력하는 전체 등록/수정 폼(SCR-ADM-007)으로 이동",
            "target": ".pd-pagehead-actions"
          },
          {
            "text": "설교 등록 폼의 '등록' 제출 — 제목·설교자·유튜브 URL과 '주일 라이브 (홈 노출)' 토글을 받아 설교를 생성하고(YouTube 임베드만·자체 영상 저장 없음), 저장 후 같은 목록 화면(SCR-ADM-006)을 갱신",
            "target": ".pd-btn"
          },
          {
            "text": "설교 목록 테이블 — 제목·설교자·날짜·상태(게시/숨김)를 표시하고, 제목 또는 행의 '수정'을 누르면 설교 수정 폼(SCR-ADM-007)으로 이동",
            "target": ".pd-table"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "화면 진입",
            "guard": "JWT(admin)+tenantId 스코프 보유",
            "result": "목록 영역 스켈레톤, 등록 폼은 빈 입력 상태로 노출",
            "placement": "inline",
            "target": ".pd-table"
          },
          {
            "state": "로딩",
            "trigger": "설교 목록 조회 요청",
            "guard": "응답 대기",
            "result": "테이블 로딩 표시",
            "placement": "inline",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /admin/sermons"
            }
          },
          {
            "state": "정상",
            "trigger": "설교 목록 응답",
            "guard": "설교 1건 이상",
            "result": "제목·설교자·날짜·상태(게시/숨김) 행 렌더",
            "placement": "inline",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /admin/sermons",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "설교 목록 응답",
            "guard": "설교 0건",
            "result": "빈 상태 안내·등록 유도",
            "message": "아직 등록된 설교가 없어요. 위 등록 폼으로 첫 설교를 올려보세요",
            "placement": "inline",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /admin/sermons",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "설교 목록 조회 실패",
            "guard": "서버 오류(500)",
            "result": "목록 로드 실패·재시도 안내",
            "message": "설교 목록을 불러오지 못했어요. 잠시 후 다시 시도해 주세요",
            "placement": "banner",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /admin/sermons",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "미인증·권한 부족 접근",
            "guard": "JWT 없음/만료(401) 또는 role≠admin·타 교회 접근(403)",
            "result": "관리자 로그인(SCR-ADM-001)으로 유도, 본인 교회(tenantId) 외 데이터 차단",
            "message": "관리자 로그인이 필요해요",
            "placement": "full-page",
            "target": ".pd-pagehead",
            "api": {
              "endpoint": "GET /admin/sermons",
              "status": 401
            }
          },
          {
            "state": "엣지",
            "trigger": "유튜브 URL 썸네일 추출 불가(비공개/삭제 영상)",
            "guard": "임베드 가능 URL이나 썸네일 미응답",
            "result": "썸네일 자리표시로 저장은 허용, 링크 확인 안내",
            "message": "영상 썸네일을 불러오지 못했어요. 링크를 확인해 주세요",
            "placement": "inline",
            "target": ".pd-btn"
          },
          {
            "state": "정상",
            "trigger": "등록 폼 제출",
            "guard": "제목·설교자·유튜브 URL 유효",
            "result": "설교 생성·목록 상단에 추가(Idempotency-Key로 중복 생성 방지)",
            "message": "설교를 등록했어요",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "POST /admin/sermons",
              "status": 201
            }
          },
          {
            "state": "에러",
            "trigger": "등록 폼 제출",
            "guard": "필수누락 — 제목 또는 유튜브 URL 미입력",
            "result": "제출 차단·필드 안내",
            "message": "제목과 유튜브 URL을 입력해 주세요",
            "placement": "inline",
            "target": ".pd-btn",
            "api": {
              "endpoint": "POST /admin/sermons",
              "status": 400
            }
          },
          {
            "state": "에러",
            "trigger": "등록 폼 제출",
            "guard": "형식오류 — youtu.be/youtube.com 형식 아님",
            "result": "제출 차단·형식 안내",
            "message": "올바른 유튜브 링크(youtu.be/...)를 입력해 주세요",
            "placement": "inline",
            "target": ".pd-btn",
            "api": {
              "endpoint": "POST /admin/sermons",
              "status": 422
            }
          },
          {
            "state": "에러",
            "trigger": "등록 폼 제출",
            "guard": "중복충돌 — 동일 유튜브 URL 설교 이미 존재",
            "result": "중복 안내·생성 차단",
            "message": "이미 등록된 설교 영상이에요",
            "placement": "inline",
            "target": ".pd-btn",
            "api": {
              "endpoint": "POST /admin/sermons",
              "status": 409
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "sermonList",
              "intent": "설교 목록 조회",
              "method": "GET",
              "path": "/admin/sermons",
              "params": "?cursor=&limit=20 (cursor 페이지네이션, tenantId=JWT 자동 스코프)",
              "response": "{entities.Sermon}[]",
              "auth": "Bearer(admin)",
              "target": ".pd-table",
              "errors": [
                {
                  "status": 401,
                  "when": "미인증/토큰 만료",
                  "message": "관리자 로그인이 필요해요"
                },
                {
                  "status": 403,
                  "when": "admin 권한 아님·타 교회(tenant) 접근",
                  "message": "접근 권한이 없어요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "설교 목록을 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "createSermon",
              "intent": "설교 등록(인라인 폼 제출)",
              "method": "POST",
              "path": "/admin/sermons",
              "body": "title·preacher·youtubeUrl·주일라이브(홈노출) 플래그 (tenantId=JWT 자동 바인딩)",
              "response": "{entities.Sermon}",
              "auth": "Bearer(admin)",
              "idempotent": true,
              "idempotencyNote": "Idempotency-Key 헤더로 더블클릭 중복 생성 방지(생성은 가역 — 삭제로 되돌림, 별도 confirm 불요)",
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 400,
                  "when": "제목/유튜브 URL 필수 누락",
                  "message": "제목과 유튜브 URL을 입력해 주세요"
                },
                {
                  "status": 409,
                  "when": "동일 유튜브 URL 설교 중복",
                  "message": "이미 등록된 설교 영상이에요"
                },
                {
                  "status": 422,
                  "when": "유튜브 URL 형식 오류",
                  "message": "올바른 유튜브 링크(youtu.be/...)를 입력해 주세요"
                }
              ]
            }
          ],
          "events": [
            {
              "name": "sermon.create.submit",
              "intent": "설교 등록 폼 제출",
              "when": "등록 버튼 클릭",
              "target": ".pd-btn"
            },
            {
              "name": "sermon.live.toggle",
              "intent": "주일 라이브(홈 노출) 토글 변경",
              "when": "주일 라이브 체크박스 변경",
              "target": ".pd-btn"
            },
            {
              "name": "sermon.youtube.preview",
              "intent": "유튜브 URL 입력 시 썸네일 미리보기 추출",
              "when": "유튜브 URL 입력/블러",
              "target": ".pd-btn"
            },
            {
              "name": "sermon.row.edit",
              "intent": "설교 수정 폼으로 이동",
              "when": "목록 제목/수정 클릭",
              "target": ".pd-table"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-ADM-007",
              "via": "설교 등록/수정",
              "trigger": ".pd-pagehead-actions"
            }
          ]
        }
      },
      {
        "id": "SCR-ADM-007",
        "label": "설교 수정",
        "href": "c-sermon-edit.html",
        "surface": "admin",
        "status": "confirmed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-007"
        ],
        "context": "설교 등록/수정 폼 — 제목·설교자·날짜·성경본문·설명·YouTube URL 입력. URL 입력 시 썸네일 자동 추출. 저장 후 설교 목록(SCR-ADM-006)으로.",
        "components": [
          {
            "role": ".pd-pagehead",
            "kind": "banner",
            "label": "설교 수정 (운영 / 설교 관리 / 수정)"
          },
          {
            "role": ".pd-form",
            "kind": "form",
            "label": "설교 정보 입력 폼"
          },
          {
            "role": ".pd-field",
            "kind": "form",
            "label": "제목 · 설교자 · 유튜브 URL"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "저장",
            "action": {
              "on": "click",
              "do": "go:SCR-ADM-006"
            }
          }
        ],
        "description": [
          {
            "text": "상단 페이지 헤더 — '운영 / 설교 관리 / 수정' 브레드크럼과 '설교 수정' 제목, 우측 '← 목록' 버튼으로 설교 관리(SCR-ADM-006)로 복귀",
            "target": ".pd-pagehead"
          },
          {
            "text": "설교 정보 입력 폼 — '설교 정보' 패널 안에서 제목·설교자·유튜브 URL을 입력. 영상은 YouTube URL 임베드만 사용(자체 영상 저장 없음), 저장 시 URL에서 썸네일 자동 추출",
            "target": ".pd-form"
          },
          {
            "text": "입력 필드 — 제목('로마서 강해 12'), 설교자('조정표 담임목사'), 유튜브 URL('https://youtu.be/...'). 날짜·성경본문·설명 등 목업 외 필드는 없음",
            "target": ".pd-field"
          },
          {
            "text": "노출 옵션 체크 — '주일 라이브 (홈 노출)'로 홈 라이브 섹션 노출 여부, '게시'로 교인앱 노출 여부를 제어"
          },
          {
            "text": "저장 버튼 — 저장 후 설교 관리 목록(SCR-ADM-006)으로 복귀(취소·← 목록도 목록으로 이동)",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "수정 모드 진입(설교 목록 행 클릭)",
            "guard": "기존 설교 로드(JWT tenantId 스코프)",
            "result": "제목·설교자·유튜브 URL·주일 라이브·게시에 기존 값 채움",
            "message": "",
            "target": ".pd-form",
            "api": {
              "endpoint": "GET /admin/sermons/{id}",
              "status": 200
            }
          },
          {
            "state": "로딩",
            "trigger": "설교 조회 중",
            "guard": "GET 응답 대기",
            "result": "입력 폼 스켈레톤 표시·저장 비활성",
            "message": "설교 정보를 불러오는 중이에요",
            "placement": "inline",
            "target": ".pd-form"
          },
          {
            "state": "정상",
            "trigger": "저장 클릭",
            "guard": "제목·설교자 입력 + 유튜브 URL 형식 유효",
            "result": "설교 저장·YouTube 썸네일 자동 추출 후 설교 관리 목록(SCR-ADM-006)으로 복귀",
            "message": "설교가 저장되었어요",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "PUT /admin/sermons/{id}",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "신규 등록 진입(설교 목록의 등록 버튼)",
            "guard": "id 없음 — 기존 조회 없음(단건 폼이라 빈데이터=빈 입력 폼, 목록 공백 아님)",
            "result": "빈 입력 폼 제공(플레이스홀더만 표시)",
            "message": "",
            "placement": "inline",
            "target": ".pd-form"
          },
          {
            "state": "에러",
            "trigger": "저장 클릭",
            "guard": "서버 오류(500)",
            "result": "저장 실패·입력값 유지",
            "message": "저장에 실패했어요. 잠시 후 다시 시도해 주세요",
            "placement": "banner",
            "target": ".pd-form",
            "api": {
              "endpoint": "PUT /admin/sermons/{id}",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "진입/저장",
            "guard": "관리자 화면 — 토큰 만료 또는 비관리자(401/403)",
            "result": "폼 차단 후 관리자 로그인(SCR-ADM-001)으로 유도",
            "message": "이 교회 관리자 권한이 없어요. 다시 로그인해 주세요",
            "placement": "full-page",
            "target": ".pd-form",
            "api": {
              "endpoint": "GET /admin/sermons/{id}",
              "status": 403
            }
          },
          {
            "state": "엣지",
            "trigger": "다른 교회 설교 id 직접 접근",
            "guard": "JWT tenantId 스코프 밖(멀티테넌트 격리·A교회↔B교회 차단)",
            "result": "타 교회 콘텐츠 비노출·조회 차단",
            "message": "설교를 찾을 수 없어요",
            "placement": "full-page",
            "target": ".pd-form",
            "api": {
              "endpoint": "GET /admin/sermons/{id}",
              "status": 404
            }
          },
          {
            "state": "입력검증",
            "trigger": "저장 클릭(필수누락)",
            "guard": "제목 또는 설교자 미입력",
            "result": "저장 차단·해당 필드 하이라이트",
            "message": "제목과 설교자를 입력해 주세요",
            "placement": "inline",
            "target": ".pd-field"
          },
          {
            "state": "입력검증",
            "trigger": "유튜브 URL 입력/저장 클릭(형식오류)",
            "guard": "유튜브 URL 형식 오류(youtu.be·youtube.com 아님)",
            "result": "저장 차단",
            "message": "올바른 유튜브 주소를 입력해 주세요",
            "placement": "inline",
            "target": ".pd-field"
          },
          {
            "state": "입력검증",
            "trigger": "저장 클릭(중복충돌)",
            "guard": "다른 관리자가 먼저 수정(낙관적 잠금 충돌)",
            "result": "저장 차단·최신본 다시 불러오기 안내",
            "message": "다른 관리자가 먼저 수정했어요. 새로고침 후 다시 저장해 주세요",
            "placement": "banner",
            "target": ".pd-form",
            "api": {
              "endpoint": "PUT /admin/sermons/{id}",
              "status": 409
            }
          },
          {
            "state": "입력검증",
            "trigger": "입력 완료(유효)",
            "guard": "제목·설교자 입력 + 유튜브 URL 형식 유효",
            "result": "검증 통과·저장 버튼 활성",
            "message": "",
            "placement": "inline",
            "target": ".pd-field"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "sermonDetail",
              "intent": "설교 단건 조회(수정 진입 시 기존 값 로드)",
              "method": "GET",
              "path": "/admin/sermons/{id}",
              "params": "path: id(설교 UUID) · 테넌트는 JWT tenantId로 자동 스코프(path 비노출)",
              "response": "{entities.Sermon}",
              "auth": "Bearer(admin)",
              "target": ".pd-form",
              "errors": [
                {
                  "status": 401,
                  "when": "토큰 만료/미인증",
                  "message": "로그인이 필요해요. 다시 로그인해 주세요(SCR-ADM-001)"
                },
                {
                  "status": 403,
                  "when": "관리자 권한 없음",
                  "message": "이 교회 관리자 권한이 없어요"
                },
                {
                  "status": 404,
                  "when": "없음 또는 타 교회 설교(테넌트 격리)",
                  "message": "설교를 찾을 수 없어요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "설교 정보를 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "saveSermon",
              "intent": "설교 저장(수정 PUT · 신규 등록은 POST /admin/sermons)",
              "method": "PUT",
              "path": "/admin/sermons/{id}",
              "body": "{title:'로마서 강해 12', preacher:'조정표 담임목사', youtubeUrl:'https://youtu.be/...', live(주일 라이브·홈 노출):boolean, published(게시):boolean} — 날짜·성경본문·설명 등 목업 외 필드 없음",
              "response": "{entities.Sermon} (youtubeUrl 기반 thumbnail 자동 추출 반영)",
              "auth": "Bearer(admin)",
              "idempotent": true,
              "confirm": "불필요 — 서비스 상태 전이/대량 발송 아님(게시 토글은 콘텐츠 노출 플래그). 단 PUT 멱등 저장이므로 안전 재시도 위해 Idempotency-Key 권장",
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 400,
                  "when": "유튜브 URL 형식 오류",
                  "message": "올바른 유튜브 주소를 입력해 주세요"
                },
                {
                  "status": 401,
                  "when": "토큰 만료",
                  "message": "로그인이 필요해요(SCR-ADM-001)"
                },
                {
                  "status": 403,
                  "when": "관리자 권한 없음(타 교회 쓰기 차단)",
                  "message": "이 교회 관리자 권한이 없어요"
                },
                {
                  "status": 409,
                  "when": "다른 관리자가 먼저 수정(낙관적 잠금 충돌)",
                  "message": "다른 관리자가 먼저 수정했어요. 새로고침 후 다시 저장해 주세요"
                },
                {
                  "status": 422,
                  "when": "필수(제목·설교자) 누락",
                  "message": "제목과 설교자를 입력해 주세요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "저장에 실패했어요. 잠시 후 다시 시도해 주세요"
                }
              ]
            }
          ],
          "events": [
            {
              "id": "sermonSaved",
              "name": "sermon.saved",
              "when": "설교 저장 성공",
              "intent": "설교 저장 완료(썸네일 추출·노출 반영)",
              "effect": "유튜브 URL에서 썸네일 자동 추출 · 게시·주일 라이브(홈 노출) 플래그에 따라 교인앱 설교(SCR-APP-003)·홈 라이브 섹션에 반영. 자체 영상 저장 없음(YouTube 임베드)."
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-ADM-006",
              "via": "저장 후 설교 목록",
              "trigger": ".pd-btn"
            }
          ]
        }
      },
      {
        "id": "SCR-ADM-008",
        "label": "주보 관리",
        "href": "c-bulletin.html",
        "surface": "admin",
        "status": "wireframed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-008"
        ],
        "context": "주보 발행 — 주차(날짜)·파일(PDF/이미지) 업로드·대표이미지. 목록 + 업로드. 교인앱 주보(SCR-APP-004)에 노출.",
        "components": [
          {
            "role": ".pd-pagehead",
            "kind": "banner",
            "label": "주보 관리"
          },
          {
            "role": ".pd-pagehead-actions",
            "kind": "button",
            "label": "+ 주보 업로드"
          },
          {
            "role": ".pd-form",
            "kind": "form",
            "label": "주보 업로드 — 주차(날짜)·주보 파일(PDF/이미지)·대표이미지"
          },
          {
            "role": ".pd-table",
            "kind": "table",
            "label": "주보 목록 (주차·발행일·파일·노출·처리)"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "저장",
            "action": {
              "on": "click",
              "do": "go:SCR-ADM-003"
            }
          }
        ],
        "description": [
          {
            "text": "상단 페이지헤드 — 브레드크럼 '운영 / 주보 관리'와 제목을 표시하고, 우측에 '+ 주보 업로드' 액션을 둔다",
            "target": ".pd-pagehead"
          },
          {
            "text": "'+ 주보 업로드' 버튼 — 같은 화면의 주보 업로드 패널(#bulletin-upload)로 스크롤 이동한다",
            "target": ".pd-pagehead-actions"
          },
          {
            "text": "주보 업로드 폼 — 주차(날짜)·주보 파일(PDF 또는 이미지)·대표이미지(목록 썸네일)를 올린다. 업로드한 주보는 교인 앱 주보(SCR-APP-004)에 그대로 노출된다",
            "target": ".pd-form"
          },
          {
            "text": "주보 목록 테이블 — 주차·발행일·파일·노출(최신호/게시)·처리(미리보기)를 보여준다. 각 행과 '미리보기', 패널 헤드의 '교인 앱 노출 보기'는 교인 앱 주보(SCR-APP-004)로 이동한다",
            "target": ".pd-table"
          },
          {
            "text": "저장 버튼 — 주보 발행 후 대시보드(SCR-ADM-003)로 복귀한다",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입",
            "guard": "주보 업로드 폼 미입력",
            "result": "주차는 이번 주일(2026-10-04) 기본값, 주보 파일·대표이미지 미선택 상태로 폼 표시",
            "message": "",
            "placement": "inline",
            "target": ".pd-form"
          },
          {
            "state": "로딩",
            "trigger": "진입",
            "guard": "주보 목록 조회 응답 대기",
            "result": "주보 목록 자리에 로딩 표시",
            "message": "",
            "placement": "inline",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /admin/bulletins",
              "status": "대기"
            }
          },
          {
            "state": "정상",
            "trigger": "응답",
            "guard": "주보 1건 이상",
            "result": "최신호·지난호 목록을 노출 배지(최신호/게시)와 함께 표시",
            "message": "",
            "placement": "inline",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /admin/bulletins",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답",
            "guard": "주보 0건",
            "result": "빈 상태로 업로드를 유도",
            "message": "아직 발행된 주보가 없어요. 첫 주보를 업로드해 주세요.",
            "placement": "inline",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /admin/bulletins",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "응답",
            "guard": "서버 오류",
            "result": "목록 로드 실패·재시도 유도",
            "message": "주보 목록을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.",
            "placement": "banner",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /admin/bulletins",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "응답",
            "guard": "관리자 세션 만료 또는 admin 권한 없음",
            "result": "관리자 로그인(SCR-ADM-001)으로 유도",
            "message": "로그인이 필요해요. 관리자 로그인 후 다시 이용해 주세요.",
            "placement": "full-page",
            "target": ".pd-pagehead",
            "api": {
              "endpoint": "GET /admin/bulletins",
              "status": 403
            }
          },
          {
            "state": "엣지",
            "trigger": "미리보기",
            "guard": "본인 교회(JWT tenantId) 밖의 주보 ID 접근 — 테넌트 스코프 격리",
            "result": "테넌트 격리로 대상 없음 처리",
            "message": "해당 주보를 찾을 수 없어요.",
            "placement": "toast",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /admin/bulletins/{id}",
              "status": 404
            }
          },
          {
            "state": "입력검증·필수누락",
            "trigger": "저장",
            "guard": "주차 또는 주보 파일 미선택",
            "result": "저장 차단",
            "message": "주차와 주보 파일을 모두 선택해 주세요.",
            "placement": "inline",
            "target": ".pd-form",
            "api": {
              "endpoint": "POST /admin/bulletins",
              "status": 400
            }
          },
          {
            "state": "입력검증·형식오류",
            "trigger": "저장",
            "guard": "PDF·이미지 외 파일",
            "result": "업로드 실패",
            "message": "PDF 또는 이미지 파일만 올릴 수 있어요.",
            "placement": "inline",
            "target": ".pd-form",
            "api": {
              "endpoint": "POST /admin/bulletins",
              "status": 422
            }
          },
          {
            "state": "입력검증·범위경계(용량)",
            "trigger": "저장",
            "guard": "허용 용량 초과",
            "result": "업로드 실패",
            "message": "허용 용량을 초과했어요. 파일을 줄여 다시 올려 주세요.",
            "placement": "inline",
            "target": ".pd-form",
            "api": {
              "endpoint": "POST /admin/bulletins",
              "status": 413
            }
          },
          {
            "state": "입력검증·중복충돌",
            "trigger": "저장",
            "guard": "같은 주차 주보가 이미 발행됨",
            "result": "교체 여부 확인 모달 노출",
            "message": "이미 같은 주차(2026-10-04) 주보가 있어요. 교체하시겠어요?",
            "placement": "modal",
            "target": ".pd-form",
            "api": {
              "endpoint": "POST /admin/bulletins",
              "status": 409
            }
          },
          {
            "state": "입력검증·유효",
            "trigger": "저장",
            "guard": "필수 충족·형식/용량 정상",
            "result": "주보 발행 후 대시보드(SCR-ADM-003)로 복귀",
            "message": "주보를 발행했어요.",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "POST /admin/bulletins",
              "status": 201
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "bulletinList",
              "intent": "주보 목록 조회",
              "method": "GET",
              "path": "/admin/bulletins",
              "params": "?cursor=&limit=20 (cursor 페이지네이션)",
              "response": "{entities.Bulletin}[]",
              "auth": "Bearer(admin)",
              "target": ".pd-table",
              "note": "테넌트 스코프 강제 — JWT tenantId(본인 교회) 주보만 조회",
              "errors": [
                {
                  "status": 401,
                  "when": "미인증(세션 만료)",
                  "message": "로그인이 필요해요."
                },
                {
                  "status": 403,
                  "when": "admin 권한 없음 또는 타 교회 스코프",
                  "message": "접근 권한이 없어요."
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "주보 목록을 불러오지 못했어요."
                }
              ]
            },
            {
              "id": "bulletinDetail",
              "intent": "주보 상세(미리보기)",
              "method": "GET",
              "path": "/admin/bulletins/{id}",
              "response": "{entities.Bulletin}",
              "auth": "Bearer(admin)",
              "target": ".pd-table",
              "note": "교인 앱 주보(SCR-APP-004) 미리보기 연계. 타 교회 ID는 테넌트 격리로 404",
              "errors": [
                {
                  "status": 403,
                  "when": "admin 권한 없음",
                  "message": "접근 권한이 없어요."
                },
                {
                  "status": 404,
                  "when": "본인 교회 밖 주보 또는 삭제됨(테넌트 스코프)",
                  "message": "해당 주보를 찾을 수 없어요."
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "uploadBulletin",
              "intent": "주보 발행(업로드)",
              "method": "POST",
              "path": "/admin/bulletins",
              "body": "multipart{week(주차·date), file(PDF/이미지), coverImage(대표이미지)}",
              "response": "{entities.Bulletin}",
              "auth": "Bearer(admin)",
              "status": 201,
              "idempotent": true,
              "confirm": "같은 주차 주보가 있으면 교체 확인(409) 후 진행",
              "note": "발행 즉시 교인 앱 주보(SCR-APP-004)에 노출되므로 Idempotency-Key 헤더로 더블클릭 중복 발행 방지 + 교체 confirm + 감사로그. 테넌트 스코프(JWT tenantId) 강제",
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 400,
                  "when": "필수 누락(주차·파일)",
                  "message": "주차와 주보 파일을 모두 선택해 주세요."
                },
                {
                  "status": 409,
                  "when": "같은 주차 주보 중복",
                  "message": "이미 같은 주차 주보가 있어요."
                },
                {
                  "status": 413,
                  "when": "용량 초과",
                  "message": "허용 용량을 초과했어요."
                },
                {
                  "status": 422,
                  "when": "형식 오류(PDF·이미지 외)",
                  "message": "PDF 또는 이미지 파일만 올릴 수 있어요."
                },
                {
                  "status": 401,
                  "when": "미인증",
                  "message": "로그인이 필요해요."
                },
                {
                  "status": 403,
                  "when": "admin 권한 없음",
                  "message": "접근 권한이 없어요."
                }
              ]
            }
          ],
          "events": [
            {
              "name": "bulletin.published",
              "intent": "주보 발행 완료",
              "when": "저장 버튼 클릭으로 주보 발행이 성공했을 때",
              "target": ".pd-btn",
              "note": "발행된 주보는 교인 앱 주보(SCR-APP-004)에 반영"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-ADM-003",
              "via": "저장 후 대시보드",
              "trigger": ".pd-btn"
            }
          ]
        }
      },
      {
        "id": "SCR-ADM-009",
        "label": "공지 관리",
        "href": "c-notice.html",
        "surface": "admin",
        "status": "confirmed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-009"
        ],
        "context": "공지 CRUD — 제목·본문·이미지·첨부·게시일·중요공지·상단고정·알림 발송 여부(Web Push 연동). 발송 선택 시 알림 관리(SCR-ADM-013)로 연계.",
        "components": [
          {
            "role": ".pd-pagehead",
            "kind": "banner",
            "label": "공지·배너 관리"
          },
          {
            "role": ".pd-form",
            "kind": "form",
            "label": "새 공지 — 제목·내용"
          },
          {
            "role": ".pd-table",
            "kind": "table",
            "label": "공지 목록 — 제목·노출기간·배너·상태"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "게시",
            "action": {
              "on": "click",
              "do": "go:SCR-ADM-013"
            }
          }
        ],
        "description": [
          {
            "target": ".pd-pagehead",
            "text": "상단 페이지헤드 — 브레드크럼 '운영 / 공지·배너'와 제목 '공지·배너 관리', 우측 '+ 공지 작성' 버튼으로 알림 발송(SCR-ADM-013) 연계 작성에 진입."
          },
          {
            "target": ".pd-form",
            "text": "'새 공지' 작성 폼 — 제목·내용을 입력해 '게시'로 등록하고, '홈 배너로'를 누르면 교인 홈 상단 배너로 노출 지정."
          },
          {
            "target": ".pd-table",
            "text": "'공지 목록' 테이블 — 제목·노출기간·배너·상태 열로 표시(예: '추수감사주일 안내 · ~10/20 · 배너 · 게시', '새가족 환영회 · 상시 · 게시')."
          },
          {
            "target": ".pd-btn",
            "text": "'게시' 버튼 — 등록 시 알림 발송을 선택하면 알림 발송(SCR-ADM-013)으로 연계되어 전체 교인에게 Web Push 발송(대량 발송 전 확인)."
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입",
            "guard": "관리자(admin) 인증·본인 교회 tenant 스코프 확인",
            "result": "빈 '새 공지' 폼(제목·내용)과 목록 영역 준비",
            "message": "새 공지를 작성하거나 아래 목록에서 관리하세요",
            "placement": "inline",
            "target": ".pd-form"
          },
          {
            "state": "로딩",
            "trigger": "응답대기",
            "guard": "GET /admin/notices 요청 중",
            "result": "공지 목록 스켈레톤 표시",
            "message": "공지 목록을 불러오는 중이에요",
            "placement": "inline",
            "target": ".pd-table"
          },
          {
            "state": "정상",
            "trigger": "응답",
            "guard": "공지 1건 이상(본인 교회 tenant 스코프)",
            "result": "공지 목록 표시(제목·노출기간·배너·상태)",
            "message": "",
            "placement": "inline",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /admin/notices",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답",
            "guard": "공지 0건",
            "result": "빈 상태·첫 공지 작성 유도",
            "message": "아직 등록된 공지가 없어요. 위에서 첫 공지를 작성해 보세요",
            "placement": "inline",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /admin/notices",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "응답",
            "guard": "서버 오류(RFC 9457 problem+json)",
            "result": "목록 로드 실패·재시도 안내",
            "message": "공지 목록을 불러오지 못했어요. 잠시 후 다시 시도해 주세요",
            "placement": "banner",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /admin/notices",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "진입",
            "guard": "미인증(401) 또는 admin 권한 아님·타 교회 스코프 접근(403)",
            "result": "접근 차단 → 관리자 로그인(SCR-ADM-001)",
            "message": "접근 권한이 없어요. 관리자 계정으로 로그인해 주세요",
            "placement": "full-page",
            "target": ".pd-pagehead",
            "api": {
              "endpoint": "GET /admin/notices",
              "status": 403
            }
          },
          {
            "state": "엣지",
            "trigger": "게시(알림 발송 선택)",
            "guard": "pushOnPublish=true · 전체 교인 대상 대량 Web Push(비가역)",
            "result": "대량 발송 확인 모달 표시(Idempotency-Key·감사로그)",
            "message": "전체 교인에게 알림을 보낼까요? 발송 후에는 되돌릴 수 없어요",
            "placement": "modal",
            "target": ".pd-btn",
            "api": {
              "endpoint": "POST /admin/notices",
              "status": 202
            }
          },
          {
            "state": "에러",
            "trigger": "게시",
            "guard": "입력검증 — 제목 또는 내용 미입력(필수 누락)",
            "result": "게시 차단",
            "message": "제목과 내용을 입력해 주세요",
            "placement": "inline",
            "target": ".pd-form",
            "api": {
              "endpoint": "POST /admin/notices",
              "status": 422
            }
          },
          {
            "state": "에러",
            "trigger": "게시",
            "guard": "입력검증 — 제목 100자 초과(범위 경계·형식 오류)",
            "result": "게시 차단",
            "message": "제목은 100자 이내로 입력해 주세요",
            "placement": "inline",
            "target": ".pd-form",
            "api": {
              "endpoint": "POST /admin/notices",
              "status": 400
            }
          },
          {
            "state": "에러",
            "trigger": "게시",
            "guard": "입력검증 — 동일 공지 중복 게시(멱등키 충돌)",
            "result": "중복 게시 방지",
            "message": "같은 공지가 이미 게시 중이에요",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "POST /admin/notices",
              "status": 409
            }
          },
          {
            "state": "정상",
            "trigger": "게시",
            "guard": "입력검증 — 제목·내용 유효",
            "result": "공지 게시(홈 배너 지정 시 교인 홈 상단 노출)",
            "message": "공지가 게시되었어요",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "POST /admin/notices",
              "status": 201
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "noticeList",
              "intent": "공지 목록 조회(tenant 격리)",
              "method": "GET",
              "path": "/admin/notices",
              "params": "?cursor=&limit=20",
              "response": "{entities.Notice}[]",
              "auth": "Bearer(admin)",
              "target": ".pd-table",
              "errors": [
                {
                  "status": 403,
                  "when": "권한 없음·타 교회 스코프 접근",
                  "message": "접근 권한이 없어요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "공지 목록을 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "publishNotice",
              "intent": "공지 게시(+홈 배너 지정·선택 시 Web Push 대량 발송)",
              "method": "POST",
              "path": "/admin/notices",
              "body": "{title, body, asBanner, pushOnPublish}",
              "response": "{entities.Notice}",
              "auth": "Bearer(admin)",
              "idempotent": true,
              "headers": "Idempotency-Key",
              "confirm": "pushOnPublish=true면 전체 교인 대량 Web Push 발송 확인 모달(.pd-btn)·Idempotency-Key 헤더·감사로그(비가역 쓰기)",
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 400,
                  "when": "제목 길이 초과 등 형식 오류",
                  "message": "제목은 100자 이내로 입력해 주세요"
                },
                {
                  "status": 409,
                  "when": "동일 공지 중복 게시(멱등키 충돌)",
                  "message": "같은 공지가 이미 게시 중이에요"
                },
                {
                  "status": 422,
                  "when": "제목·내용 필수 누락",
                  "message": "제목과 내용을 입력해 주세요"
                }
              ]
            }
          ],
          "events": [
            {
              "id": "noticePublished",
              "name": "notice.published",
              "when": "게시 성공·pushOnPublish=true",
              "intent": "공지 게시 후 전체 교인 알림 발송",
              "effect": "Notification Gateway 경유 전체 교인 Web Push 발송(DeepLink=notice+id)"
            },
            {
              "id": "bannerUpdated",
              "name": "notice.banner.updated",
              "when": "'홈 배너로' 지정/해제",
              "intent": "교인 홈 상단 배너 노출 갱신",
              "effect": "교인 홈 상단 배너 노출 상태 갱신"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-ADM-013",
              "via": "알림 발송 연계",
              "trigger": ".pd-btn"
            }
          ]
        }
      },
      {
        "id": "SCR-ADM-010",
        "label": "성도 관리",
        "href": "c-members.html",
        "surface": "admin",
        "status": "confirmed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-012"
        ],
        "context": "회원(교인) 목록 — 이름·휴대전화·이메일·가입상태. 가입 승인/대기 처리. 교적/직분 없음(단순). 상세(SCR-ADM-011)·등록/수정(SCR-ADM-012) 진입.",
        "components": [
          {
            "role": ".pd-pagehead",
            "kind": "banner",
            "label": "성도관리(교적)"
          },
          {
            "role": ".pd-pagehead-actions",
            "kind": "button",
            "label": "+ 성도 등록",
            "action": {
              "on": "click",
              "do": "go:SCR-ADM-012"
            }
          },
          {
            "role": ".pd-table",
            "kind": "table",
            "label": "성도 목록(이름·휴대전화·이메일·가입상태·처리)",
            "action": {
              "on": "click",
              "do": "go:SCR-ADM-011"
            }
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "승인 / 거부 (승인대기 성도 처리)"
          }
        ],
        "description": [
          {
            "text": "페이지 헤더 — 브레드크럼 '운영 / 성도관리'와 '+ 성도 등록' 버튼. 등록 버튼은 성도 등록/수정 폼(SCR-ADM-012)으로 이동한다.",
            "target": ".pd-pagehead-actions"
          },
          {
            "text": "검색·필터 툴바 — '성도 이름 검색'과 상태(승인대기/활동) 필터. 현재 교회(tenant) 소속 성도만 조회한다(교회검색 없음·church_id 자동 바인딩)."
          },
          {
            "text": "성도 목록 테이블 — 이름·휴대전화·이메일·가입상태·처리 열. '성도 목록 128명 · 승인대기 3' 요약을 상단에 표시하고, 이름 클릭 시 회원 상세(SCR-ADM-011)로 이동한다. 연락처는 권한에 따라 마스킹된다(PIPA).",
            "target": ".pd-table"
          },
          {
            "text": "처리 버튼 — 승인대기 성도는 '승인'·'거부'(거부는 사유 필수), 활동 성도는 '상세'(SCR-ADM-011). 승인·거부는 확인 후 처리되는 비가역 작업이다.",
            "target": ".pd-btn"
          },
          {
            "text": "가입 거부 확인 패널 — '가입 거부 — 사유 필수'. 사유 입력 후 '가입 거부'를 누르면 신청자에게 안내되며 보완 후 재신청할 수 있고, '취소'는 회원 상세(SCR-ADM-011)로 돌아간다."
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "화면 진입",
            "guard": "admin 인증·tenant 스코프 확인(본인 교회만)",
            "result": "검색·필터 초기화 후 성도 목록 로드 시작",
            "message": "",
            "placement": "inline"
          },
          {
            "state": "로딩",
            "trigger": "목록 요청",
            "guard": "응답 대기",
            "result": "목록 영역 스켈레톤·진행 표시",
            "message": "성도 목록을 불러오는 중이에요",
            "placement": "inline",
            "target": ".pd-table"
          },
          {
            "state": "정상",
            "trigger": "목록 응답",
            "guard": "성도 1명 이상",
            "result": "성도 목록·상태 배지(승인대기/활동)·'128명 · 승인대기 3' 요약 표시",
            "message": "",
            "placement": "inline",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /admin/members",
              "status": 200
            }
          },
          {
            "state": "정상",
            "trigger": "승인",
            "guard": "승인대기 성도 선택·확인 완료",
            "result": "가입상태 pending→active 전환, 목록 배지 갱신",
            "message": "가입을 승인했어요",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "PATCH /admin/members/{id}/status",
              "status": 200
            }
          },
          {
            "state": "정상",
            "trigger": "가입 거부 제출(사유 유효)",
            "guard": "거부 사유 입력됨·확인 완료",
            "result": "가입상태 pending→withdrawn 전환, 신청자에게 사유 안내",
            "message": "가입을 거부했어요. 신청자에게 사유가 안내돼요",
            "placement": "toast",
            "api": {
              "endpoint": "PATCH /admin/members/{id}/status",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "목록 응답",
            "guard": "성도 0명",
            "result": "빈 상태·등록 유도",
            "message": "아직 등록된 성도가 없어요. '+ 성도 등록'으로 추가해 주세요",
            "placement": "inline",
            "target": ".pd-table"
          },
          {
            "state": "에러",
            "trigger": "목록 응답",
            "guard": "서버/네트워크 오류(RFC 9457 problem+json)",
            "result": "오류 배너·재시도 안내",
            "message": "성도 목록을 불러오지 못했어요. 잠시 후 다시 시도해 주세요",
            "placement": "banner",
            "api": {
              "endpoint": "GET /admin/members",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "목록 응답",
            "guard": "미인증·세션 만료 또는 role≠admin(타 교회 접근 차단)",
            "result": "접근 차단·관리자 로그인(SCR-ADM-001) 유도",
            "message": "접근 권한이 없어요. 관리자 로그인 후 이용해 주세요",
            "placement": "full-page",
            "api": {
              "endpoint": "GET /admin/members",
              "status": 403
            }
          },
          {
            "state": "엣지",
            "trigger": "승인/거부 처리",
            "guard": "다른 관리자가 먼저 처리했거나 이미 전환된 상태(중복충돌)",
            "result": "처리 차단·목록 새로고침",
            "message": "다른 관리자가 먼저 처리했어요. 목록을 새로고침할게요",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "PATCH /admin/members/{id}/status",
              "status": 409
            }
          },
          {
            "state": "입력검증",
            "trigger": "가입 거부 제출(필수누락)",
            "guard": "거부 사유 공란",
            "result": "제출 차단·사유 입력 요청",
            "message": "거부 사유를 입력해 주세요",
            "placement": "inline"
          },
          {
            "state": "입력검증",
            "trigger": "가입 거부 제출(형식오류)",
            "guard": "형식오류: 해당 없음(사유는 자유 서술 텍스트)",
            "result": "형식 제약 없음",
            "message": "",
            "placement": "inline"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "memberList",
              "intent": "성도 목록 조회(tenant 격리·church_id 자동)",
              "method": "GET",
              "path": "/admin/members",
              "params": "status(all|pending|active), q(이름·부서), cursor, limit=20",
              "response": "{entities.Member}[]",
              "auth": "Bearer(admin)",
              "target": ".pd-table",
              "errors": [
                {
                  "status": 401,
                  "when": "미인증·세션 만료",
                  "message": "로그인이 필요해요"
                },
                {
                  "status": 403,
                  "when": "권한 없음·타 교회 접근",
                  "message": "접근 권한이 없어요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "성도 목록을 불러오지 못했어요"
                }
              ]
            },
            {
              "id": "memberSummary",
              "intent": "성도 수·승인대기 수 집계",
              "method": "GET",
              "path": "/admin/members/summary",
              "params": "(없음·tenantId=JWT)",
              "response": "{total:number, pending:number}",
              "auth": "Bearer(admin)",
              "errors": [
                {
                  "status": 403,
                  "when": "권한 없음",
                  "message": "접근 권한이 없어요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "요약 정보를 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "approveMember",
              "intent": "가입 승인(pending→active)",
              "method": "PATCH",
              "path": "/admin/members/{id}/status",
              "body": "{status:'active'}",
              "response": "{entities.Member}",
              "auth": "Bearer(admin)",
              "idempotent": true,
              "confirm": "승인 확인(.pd-confirm) · Idempotency-Key 헤더로 중복 승인 무해 · 감사로그 기록",
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 404,
                  "when": "성도 없음",
                  "message": "대상 성도를 찾을 수 없어요"
                },
                {
                  "status": 409,
                  "when": "이미 승인/처리됨",
                  "message": "이미 처리된 회원이에요"
                },
                {
                  "status": 422,
                  "when": "전환 불가 상태(탈퇴 등)",
                  "message": "현재 상태에서는 승인할 수 없어요"
                }
              ]
            },
            {
              "id": "rejectMember",
              "intent": "가입 거부(pending→withdrawn·사유 필수)",
              "method": "PATCH",
              "path": "/admin/members/{id}/status",
              "body": "{status:'withdrawn', reason}",
              "response": "{entities.Member}",
              "auth": "Bearer(admin)",
              "idempotent": true,
              "confirm": "거부 사유 입력 확인(.pd-confirm) · Idempotency-Key 헤더 + 감사로그 · 신청자 안내(보완 후 재신청 가능)",
              "errors": [
                {
                  "status": 400,
                  "when": "사유 누락·형식 오류",
                  "message": "거부 사유를 입력해 주세요"
                },
                {
                  "status": 409,
                  "when": "이미 처리됨",
                  "message": "이미 처리된 회원이에요"
                },
                {
                  "status": 422,
                  "when": "전환 불가 상태",
                  "message": "현재 상태에서는 거부할 수 없어요"
                }
              ]
            }
          ],
          "events": [
            {
              "name": "member.approved",
              "intent": "가입 승인 완료",
              "when": "승인대기 성도를 active로 전환 시 — 신규 교인 환영 알림(Notification) 연계"
            },
            {
              "name": "member.rejected",
              "intent": "가입 거부 완료",
              "when": "사유와 함께 거부 처리 시 — 신청자에게 거부 사유 안내"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-ADM-011",
              "via": "회원 상세",
              "trigger": ".pd-table"
            },
            {
              "screen": "SCR-ADM-012",
              "via": "회원 등록",
              "trigger": ".pd-pagehead-actions"
            }
          ]
        }
      },
      {
        "id": "SCR-ADM-011",
        "label": "회원 상세",
        "href": "c-member-detail.html",
        "surface": "admin",
        "status": "confirmed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-012"
        ],
        "context": "회원 상세(단순 정보) · 가입상태 변경(승인). 민감정보 없음(이름·휴대전화·이메일·가입상태만). 수정(SCR-ADM-012)·목록(SCR-ADM-010) 이동.",
        "components": [
          {
            "role": ".pd-pagehead",
            "kind": "banner",
            "label": "성도 상세"
          },
          {
            "role": ".pd-wpanel",
            "kind": "card",
            "label": "기본 정보"
          },
          {
            "role": ".pd-badge",
            "kind": "card",
            "label": "상태 배지(활동)"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "수정"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "수정",
            "action": {
              "on": "click",
              "do": "go:SCR-ADM-012"
            }
          }
        ],
        "description": [
          {
            "text": "상단 머리말 — '운영 / 성도관리 / 상세' 경로와 성도 이름 타이틀(예: 이○○)을 표시하고, 우측 액션으로 목록(SCR-ADM-010)·수정(SCR-ADM-012)으로 이동한다",
            "target": ".pd-pagehead"
          },
          {
            "text": "기본 정보 패널 — 이름·휴대전화·이메일·가입상태만 보여준다(교적·직분 등 민감정보 미수집, G2). 하단 안내처럼 민감정보 열람은 감사로그에 기록된다(PIPA)",
            "target": ".pd-wpanel"
          },
          {
            "text": "상태 배지 — 가입상태를 대기/활동/탈퇴로 표시한다(목업 예: 활동)",
            "target": ".pd-badge"
          },
          {
            "text": "목록 버튼 — 성도 관리 목록(SCR-ADM-010)으로 복귀한다. 가입 승인·대기 처리는 목록 화면에서 수행한다",
            "target": ".pd-btn"
          },
          {
            "text": "수정 버튼 — 회원 등록/수정 폼(SCR-ADM-012)으로 이동해 정보 수정·가입상태 변경을 처리한다",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입",
            "guard": "라우트에서 성도 id 수신(tenantId=JWT)",
            "result": "기본 정보 패널 골격(스켈레톤) 노출",
            "message": "",
            "placement": "inline",
            "target": ".pd-wpanel"
          },
          {
            "state": "로딩",
            "trigger": "조회 요청",
            "guard": "성도 단건 응답 대기",
            "result": "스켈레톤·로딩 표시, 상단 버튼 비활성",
            "message": "성도 정보를 불러오는 중이에요",
            "placement": "inline",
            "target": ".pd-wpanel"
          },
          {
            "state": "정상",
            "trigger": "조회 응답",
            "guard": "성도 존재·테넌트 일치",
            "result": "기본 정보(이름·휴대전화·이메일·가입상태)와 상태 배지 표시",
            "message": "",
            "placement": "inline",
            "target": ".pd-wpanel",
            "api": {
              "endpoint": "GET /admin/members/{id}",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "조회 응답",
            "guard": "휴대전화·이메일 등 선택 항목 미입력",
            "result": "해당 항목을 '미등록'으로 표시(필수 항목만 노출)",
            "message": "아직 등록되지 않은 항목이에요",
            "placement": "inline",
            "target": ".pd-wpanel",
            "api": {
              "endpoint": "GET /admin/members/{id}",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "조회 응답",
            "guard": "서버 오류·네트워크 실패(5xx)",
            "result": "조회 실패 안내·재시도 유도",
            "message": "성도 정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요",
            "placement": "inline",
            "target": ".pd-wpanel",
            "api": {
              "endpoint": "GET /admin/members/{id}",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "조회 응답",
            "guard": "세션 만료·비관리자(401/403)",
            "result": "접근 차단 후 로그인(SCR-ADM-001) 유도",
            "message": "로그인이 필요해요. 다시 로그인해 주세요",
            "placement": "full-page",
            "target": ".pd-wpanel",
            "api": {
              "endpoint": "GET /admin/members/{id}",
              "status": 401
            }
          },
          {
            "state": "엣지",
            "trigger": "직접 URL 접근",
            "guard": "다른 교회(타 테넌트) 성도 id 접근",
            "result": "테넌트 격리로 미노출(존재 비공개)·404 처리",
            "message": "요청하신 성도 정보를 찾을 수 없어요",
            "placement": "full-page",
            "target": ".pd-wpanel",
            "api": {
              "endpoint": "GET /admin/members/{id}",
              "status": 404
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "memberDetail",
              "intent": "성도 단건 조회",
              "method": "GET",
              "path": "/admin/members/{id}",
              "params": "path: id(성도 uuid) · tenantId=JWT(path 비노출·테넌트 격리 강제)",
              "response": "{entities.Member}",
              "auth": "Bearer(admin)",
              "target": ".pd-wpanel",
              "errors": [
                {
                  "status": 401,
                  "when": "미인증·세션 만료",
                  "message": "로그인이 필요해요. 다시 로그인해 주세요"
                },
                {
                  "status": 403,
                  "when": "관리자 권한 아님",
                  "message": "이 성도 정보에 접근할 권한이 없어요"
                },
                {
                  "status": 404,
                  "when": "없음 또는 타 교회(테넌트) 성도",
                  "message": "요청하신 성도 정보를 찾을 수 없어요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "성도 정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요"
                }
              ]
            }
          ],
          "writes": [],
          "events": [
            {
              "name": "member.detail.viewed",
              "intent": "성도 상세 열람(민감정보 접근 감사로그 적재·PIPA)",
              "when": "상세 진입·정상 조회 시",
              "target": ".pd-wpanel"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-ADM-010",
              "via": "목록 복귀",
              "trigger": ".pd-pagehead"
            },
            {
              "screen": "SCR-ADM-012",
              "via": "회원 수정"
            }
          ]
        }
      },
      {
        "id": "SCR-ADM-012",
        "label": "회원 등록/수정",
        "href": "c-member-form.html",
        "surface": "admin",
        "status": "confirmed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-012"
        ],
        "context": "회원 등록/수정 폼(이름·휴대전화·이메일·가입상태). 단순. 민감정보 수집 없음. 저장 후 회원 목록(SCR-ADM-010)으로.",
        "components": [
          {
            "role": ".pd-pagehead",
            "kind": "banner",
            "label": "성도 등록 / 수정"
          },
          {
            "role": ".pd-form",
            "kind": "form",
            "label": "성도 정보 입력 폼"
          },
          {
            "role": ".pd-field",
            "kind": "form",
            "label": "이름 · 휴대전화 · 이메일 · 가입상태"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "저장",
            "action": {
              "on": "click",
              "do": "go:SCR-ADM-010"
            }
          }
        ],
        "description": [
          {
            "text": "상단 페이지헤더 — 브레드크럼 '운영 / 성도관리 / 등록·수정'과 제목 '성도 등록 / 수정', 우측 취소 버튼은 성도 목록(SCR-ADM-010)으로 복귀",
            "target": ".pd-pagehead"
          },
          {
            "text": "성도 정보 입력 폼 — 이름·휴대전화·이메일을 2열 그리드로 입력하고 가입상태(승인대기/활동)를 선택(민감정보 미수집). 교회(church_id)는 진입 URL/JWT tenantId로 자동 바인딩되어 교회 선택 입력 없음",
            "target": ".pd-form"
          },
          {
            "text": "입력 필드 — 이름·연락처는 필수, 직분(집사/권사/—)·부서·등록일(YYYY-MM-DD)은 선택 입력. 형식 검증 통과 시에만 저장 가능",
            "target": ".pd-field"
          },
          {
            "text": "본인 개인정보 수집 동의 확인 체크박스 — 동의 원장(Consent, purpose=required)에 기록되며 미체크 시 저장 차단"
          },
          {
            "text": "저장 버튼 — 입력값 저장(멱등키로 안전 재시도) 후 성도 목록(SCR-ADM-010)으로 이동, 취소 버튼도 동일 목록으로 복귀",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "신규 등록 진입",
            "guard": "신규 모드(회원 id 없음)",
            "result": "빈 입력 폼 표시(등록일 오늘 기본값)",
            "message": "",
            "placement": "inline",
            "target": ".pd-form"
          },
          {
            "state": "로딩",
            "trigger": "수정 진입",
            "guard": "회원 단건 조회(GET) 대기 중",
            "result": "폼 영역 로딩 표시",
            "message": "성도 정보를 불러오는 중이에요",
            "placement": "inline",
            "target": ".pd-form"
          },
          {
            "state": "정상",
            "trigger": "수정 진입 완료",
            "guard": "회원 로드 성공·같은 교회(tenantId 일치)",
            "result": "기존 값(이름·연락처·가입상태) 채움",
            "message": "",
            "placement": "inline",
            "target": ".pd-form",
            "api": {
              "endpoint": "GET /admin/members/{id}",
              "status": 200
            }
          },
          {
            "state": "정상",
            "trigger": "저장 클릭",
            "guard": "필수·형식 유효 + 개인정보 수집 동의 체크 완료",
            "result": "성도 정보 저장 후 성도 목록(SCR-ADM-010)으로 이동",
            "message": "성도 정보가 저장되었어요",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "PUT /admin/members/{id}",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "수정 진입",
            "guard": "직분·부서·등록일 등 선택정보 미저장",
            "result": "선택 필드는 빈 상태로 표시(필수 아님)",
            "message": "직분·부서·등록일은 V2에서 미수집이에요(교적 기능 재개 후 제공)",
            "placement": "inline",
            "target": ".pd-field"
          },
          {
            "state": "에러",
            "trigger": "저장 클릭",
            "guard": "이름 또는 연락처 미입력(필수누락)",
            "result": "저장 차단·필수 필드 강조",
            "message": "이름과 연락처는 필수 입력이에요",
            "placement": "inline",
            "target": ".pd-field",
            "api": {
              "endpoint": "PUT /admin/members/{id}",
              "status": 400
            }
          },
          {
            "state": "에러",
            "trigger": "저장 클릭",
            "guard": "연락처 형식 오류(010- 형식 아님)",
            "result": "저장 차단·해당 필드 강조",
            "message": "연락처 형식을 확인해 주세요 (예: 010-0000-0000)",
            "placement": "inline",
            "target": ".pd-field",
            "api": {
              "endpoint": "PUT /admin/members/{id}",
              "status": 422
            }
          },
          {
            "state": "에러",
            "trigger": "저장 클릭",
            "guard": "개인정보 수집 동의 미체크(필수누락)",
            "result": "저장 차단",
            "message": "개인정보 수집 동의에 체크해 주세요",
            "placement": "inline",
            "api": {
              "endpoint": "PUT /admin/members/{id}",
              "status": 422
            }
          },
          {
            "state": "에러",
            "trigger": "저장 클릭",
            "guard": "같은 교회 내 동일 연락처 성도 존재(중복충돌)",
            "result": "중복 차단",
            "message": "이미 등록된 연락처예요. 기존 성도를 확인해 주세요",
            "placement": "inline",
            "target": ".pd-field",
            "api": {
              "endpoint": "POST /admin/members",
              "status": 409
            }
          },
          {
            "state": "에러",
            "trigger": "저장 클릭",
            "guard": "서버 오류",
            "result": "저장 실패(입력값 유지)",
            "message": "일시적인 오류로 저장하지 못했어요. 잠시 후 다시 시도해 주세요",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "PUT /admin/members/{id}",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "진입 또는 저장",
            "guard": "JWT role≠admin 또는 세션 만료",
            "result": "접근 차단 → 관리자 로그인 유도",
            "message": "접근 권한이 없어요. 관리자 로그인 후 다시 시도해 주세요 (SCR-ADM-001)",
            "placement": "full-page",
            "target": ".pd-form",
            "api": {
              "endpoint": "PUT /admin/members/{id}",
              "status": 401
            }
          },
          {
            "state": "엣지",
            "trigger": "저장(수정)",
            "guard": "다른 교회(tenantId 불일치) 성도 id 접근 — 멀티테넌트 격리",
            "result": "테넌트 격리로 차단(존재 비노출)",
            "message": "회원을 찾을 수 없어요",
            "placement": "full-page",
            "target": ".pd-form",
            "api": {
              "endpoint": "PUT /admin/members/{id}",
              "status": 404
            }
          },
          {
            "state": "엣지",
            "trigger": "저장 클릭",
            "guard": "등록일이 미래 날짜(범위경계)",
            "result": "저장 차단",
            "message": "등록일은 오늘 이전 날짜로 입력해 주세요",
            "placement": "inline",
            "target": ".pd-field",
            "api": {
              "endpoint": "PUT /admin/members/{id}",
              "status": 422
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "memberForm",
              "intent": "성도 단건 조회(수정 시)",
              "method": "GET",
              "path": "/admin/members/{id}",
              "response": "{entities.Member}",
              "auth": "Bearer(admin)",
              "target": ".pd-form",
              "errors": [
                {
                  "status": 404,
                  "when": "회원 없음 또는 타 교회(테넌트 격리)",
                  "message": "회원을 찾을 수 없어요"
                },
                {
                  "status": 401,
                  "when": "세션 만료",
                  "message": "다시 로그인해 주세요 (SCR-ADM-001)"
                }
              ]
            },
            {
              "id": "memberConsent",
              "intent": "성도 개인정보 수집 동의 상태 조회(수정 시)",
              "method": "GET",
              "path": "/admin/members/{id}/consents",
              "response": "{entities.Consent}",
              "auth": "Bearer(admin)",
              "errors": [
                {
                  "status": 404,
                  "when": "동의 이력 없음",
                  "message": "아직 동의 이력이 없어요"
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "saveMember",
              "intent": "성도 등록/수정 저장",
              "method": "PUT",
              "path": "/admin/members/{id}",
              "body": "{name(이름), phone(연락처), status(가입상태)}",
              "note": "신규 등록은 POST /admin/members → 201. 직분·부서·등록일은 V1 교적·직분 체계로 V2.0 미저장(봉인). tenantId=JWT로 자동 스코프(교회검색 없음·A교회↔B교회 차단).",
              "response": "{entities.Member}",
              "auth": "Bearer(admin)",
              "idempotent": true,
              "idempotencyHeader": "Idempotency-Key(안전 재시도)",
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 400,
                  "when": "이름·연락처 필수 누락",
                  "message": "이름과 연락처는 필수 입력이에요"
                },
                {
                  "status": 409,
                  "when": "같은 교회 내 연락처 중복",
                  "message": "이미 등록된 연락처예요. 기존 성도를 확인해 주세요"
                },
                {
                  "status": 422,
                  "when": "연락처 형식 오류 또는 등록일 미래 날짜",
                  "message": "입력값 형식을 확인해 주세요"
                },
                {
                  "status": 401,
                  "when": "세션 만료",
                  "message": "다시 로그인해 주세요 (SCR-ADM-001)"
                },
                {
                  "status": 403,
                  "when": "타 교회 성도 수정 시도(테넌트 격리)",
                  "message": "접근 권한이 없어요"
                }
              ]
            },
            {
              "id": "saveConsent",
              "intent": "개인정보 수집 동의 기록",
              "method": "POST",
              "path": "/admin/members/{id}/consents",
              "body": "{purpose:'required', granted:true}",
              "note": "동의 체크박스 연계. tenantId=JWT 스코프.",
              "response": "{entities.Consent}",
              "auth": "Bearer(admin)",
              "idempotent": true,
              "errors": [
                {
                  "status": 422,
                  "when": "필수 동의 미체크",
                  "message": "개인정보 수집 동의에 체크해 주세요"
                }
              ]
            }
          ],
          "events": [
            {
              "name": "member.form.submit",
              "intent": "성도 저장 제출",
              "when": "저장 버튼 클릭 시",
              "target": ".pd-btn"
            },
            {
              "name": "member.consent.toggle",
              "intent": "개인정보 수집 동의 토글",
              "when": "동의 체크박스 변경 시",
              "target": ".pd-check"
            },
            {
              "name": "member.form.cancel",
              "intent": "입력 취소",
              "when": "취소 버튼 클릭 시 성도 목록(SCR-ADM-010)으로 이동",
              "target": ".pd-pagehead"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-ADM-010",
              "via": "저장 후 회원 목록",
              "trigger": ".pd-btn"
            }
          ]
        }
      },
      {
        "id": "SCR-ADM-013",
        "label": "알림 관리·발송",
        "href": "c-messaging.html",
        "surface": "admin",
        "status": "confirmed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-016"
        ],
        "context": "Notification Gateway 경유 알림 발송 — MVP=Web Push. 대상=전체회원 broadcast. 즉시/예약. 대량발송은 비가역이므로 확인·멱등키 필수. SMS/Kakao 슬롯은 비활성.",
        "components": [
          {
            "role": ".pd-pagehead",
            "kind": "banner",
            "label": "문자·알림(문자지갑) — 설정 / 문자·알림 · '+ 발송'"
          },
          {
            "role": ".pd-form",
            "kind": "form",
            "label": "새 발송 — 대상·유형·내용·발송 시각"
          },
          {
            "role": ".pd-badge",
            "kind": "card",
            "label": "발송 상태(발송완료·예약)"
          },
          {
            "role": ".pd-table",
            "kind": "table",
            "label": "발송 내역·예약 발송 목록(일시·유형·대상·내용·상태 / 예약시각·대상·내용·처리)"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "128명에게 발송",
            "action": {
              "on": "click",
              "do": "go:SCR-ADM-003"
            }
          }
        ],
        "description": [
          {
            "text": "상단 KPI — Web Push 구독(118명, 전체 교인 128 중)·이번 달 발송(860건, Web Push)·예약 발송(3건 대기)·수신동의율(92%, 교인 PWA). 구독(수신동의)한 교인에게만 전달된다."
          },
          {
            "text": "새 발송 폼 — 대상(전체 교인 128명)·유형(Web Push)·내용·발송 시각(즉시·예약)을 칩으로 선택해 작성한다. 부서·새가족 세그먼트와 문자(SMS)는 교적 기능 재개 후 제공되는 차기이며, 현재는 전체 교인 대상 Web Push broadcast다.",
            "target": ".pd-form"
          },
          {
            "text": "대량 발송 확인 — '되돌릴 수 없음' 고지와 발송 승인 사유(필수) 입력 후 '128명에게 발송'/'취소'. 발송·예약취소 이력은 감사추적에 기록되고, 발송 완료 시 대시보드(SCR-ADM-003)로 이동한다."
          },
          {
            "text": "발송 내역(일시·유형·대상·내용·상태=발송완료/예약)과 예약 발송 목록. 예약 건은 발송 전에만 '예약 취소'가 가능하다.",
            "target": ".pd-table"
          },
          {
            "text": "고지 배너 — 야간(21~08시) 문자 발송은 차단되고(423), 수신거부 성도는 자동 제외된다(PIPA)."
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입",
            "guard": "관리자(Bearer admin) 인증·tenant 스코프 확인 후 문자지갑 잔액·KPI·발송 내역 로드",
            "result": "KPI(잔액 12,400건·이번 달 860건·예약 3건·수신동의 92%)와 발송 내역을 표시",
            "message": "",
            "placement": "inline",
            "api": {
              "endpoint": "GET /admin/notifications",
              "status": 200
            }
          },
          {
            "state": "로딩",
            "trigger": "진입 직후",
            "guard": "발송 내역·문자지갑 잔액 조회 응답 대기",
            "result": "표·KPI 로딩 상태 표시",
            "message": "발송 내역을 불러오는 중이에요",
            "placement": "inline",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /admin/notifications",
              "status": 200
            }
          },
          {
            "state": "정상",
            "trigger": "전체 발송 확정",
            "guard": "대상·유형·내용·사유(필수) 유효·야간 아님·문자지갑 잔액 충분·pd-confirm 확인·Idempotency-Key 부여",
            "result": "Notification Gateway 경유 broadcast 접수(수신거부·야간 대상 자동 제외)",
            "message": "전체 128명에게 발송을 접수했어요. 수신거부·야간 대상은 자동 제외돼요",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "POST /admin/notifications/broadcast",
              "status": 202
            }
          },
          {
            "state": "정상",
            "trigger": "예약 취소",
            "guard": "예약(scheduled)·발송 전 상태·확인",
            "result": "예약 발송 취소(status→canceled)·취소 이력 감사추적 기록",
            "message": "예약 발송을 취소했어요",
            "placement": "toast",
            "target": ".pd-table",
            "api": {
              "endpoint": "DELETE /admin/notifications/{id}",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "진입",
            "guard": "발송 내역 0건",
            "result": "빈 상태·첫 발송 유도",
            "message": "아직 보낸 알림이 없어요. 위 '새 발송'에서 첫 메시지를 보내보세요",
            "placement": "inline",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /admin/notifications",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "전체 발송",
            "guard": "Notification Gateway·문자사 연동 오류",
            "result": "발송 실패·작성 내용 보존",
            "message": "발송에 실패했어요. 문자지갑과 네트워크를 확인한 뒤 다시 시도해 주세요",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "POST /admin/notifications/broadcast",
              "status": 502
            }
          },
          {
            "state": "권한없음",
            "trigger": "진입·발송",
            "guard": "세션 만료 또는 role≠admin, 또는 타 교회 tenant 접근(격리 위반)",
            "result": "접근 차단→로그인 유도",
            "message": "접근 권한이 없어요. 관리자 계정으로 다시 로그인해 주세요 (SCR-ADM-001)",
            "placement": "full-page",
            "target": ".pd-pagehead",
            "api": {
              "endpoint": "GET /admin/notifications",
              "status": 403
            }
          },
          {
            "state": "엣지",
            "trigger": "야간 문자 발송 시도(21~08시)",
            "guard": "발송 시각이 야간(21~08시)이고 유형=문자",
            "result": "야간 발송 차단(423)",
            "message": "야간(21~08시)에는 문자를 보낼 수 없어요. 예약 발송으로 아침 이후 시각을 지정해 주세요",
            "placement": "banner",
            "api": {
              "endpoint": "POST /admin/notifications/broadcast",
              "status": 423
            }
          },
          {
            "state": "엣지",
            "trigger": "문자 발송 시도",
            "guard": "문자지갑 잔액 < 발송 대상 수",
            "result": "발송 중단·충전 안내",
            "message": "문자지갑 잔액이 부족해요. 충전 후 다시 시도해 주세요",
            "placement": "banner",
            "api": {
              "endpoint": "POST /admin/notifications/broadcast",
              "status": 422
            }
          },
          {
            "state": "입력검증(필수누락)",
            "trigger": "발송 클릭",
            "guard": "메시지 내용 또는 발송 승인 사유(필수) 미입력",
            "result": "발송 차단·필드 강조",
            "message": "메시지 내용과 발송 승인 사유를 입력해 주세요",
            "placement": "inline",
            "api": {
              "endpoint": "POST /admin/notifications/broadcast",
              "status": 400
            }
          },
          {
            "state": "입력검증(형식오류)",
            "trigger": "예약 발송 선택",
            "guard": "유형=예약인데 발송 시각 미선택 또는 과거 시각",
            "result": "발송 차단",
            "message": "예약 발송 시각을 현재 이후로 선택해 주세요",
            "placement": "inline",
            "api": {
              "endpoint": "POST /admin/notifications/broadcast",
              "status": 400
            }
          },
          {
            "state": "입력검증(범위경계)",
            "trigger": "내용 입력",
            "guard": "문자 1건 분량(SMS 바이트) 또는 내용 최대 길이 초과",
            "result": "초과 차단·장문 전환 안내",
            "message": "문자 내용이 길어요. 장문(LMS)으로 보내거나 길이를 줄여 주세요",
            "placement": "inline",
            "api": {
              "endpoint": "POST /admin/notifications/broadcast",
              "status": 400
            }
          },
          {
            "state": "입력검증(중복충돌)",
            "trigger": "발송 버튼 재클릭·재요청",
            "guard": "동일 Idempotency-Key 재전송(더블클릭·네트워크 재시도)",
            "result": "중복 발송 차단·기존 접수 결과 반영",
            "message": "이미 접수된 발송이에요. 중복 발송은 막았어요",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "POST /admin/notifications/broadcast",
              "status": 409
            }
          },
          {
            "state": "입력검증(유효)",
            "trigger": "작성 완료",
            "guard": "대상·유형·내용·사유 유효·야간 아님·잔액 충분",
            "result": "확인 모달 활성·발송 가능",
            "message": "발송 준비가 끝났어요. '128명에게 발송'을 누르면 전송돼요",
            "placement": "inline"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "notifHistory",
              "intent": "발송 내역·예약 발송 목록 조회",
              "method": "GET",
              "path": "/admin/notifications",
              "params": "?cursor=&limit=20&status=sent|scheduled",
              "response": "'{entities.Message}' 목록(발송 내역·예약, cursor 페이지네이션)",
              "auth": "Bearer(admin)",
              "target": ".pd-table",
              "errors": [
                {
                  "status": 401,
                  "when": "미인증·세션 만료",
                  "message": "로그인이 필요해요 (SCR-ADM-001)"
                },
                {
                  "status": 403,
                  "when": "타 교회 tenant 접근(격리 위반)",
                  "message": "권한이 없어요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "발송 내역을 불러오지 못했어요"
                }
              ]
            },
            {
              "id": "messagingWallet",
              "intent": "문자지갑 잔액·발송 KPI 조회",
              "method": "GET",
              "path": "/admin/messaging/wallet",
              "response": "{balance:12400, monthlySent:860, scheduledCount:3, pushConsentRate:0.92} — 문자지갑 잔액·이번 달 발송·예약 수·푸시 수신동의율('{entities.PushSubscription}'·'{entities.Consent}' 집계)",
              "auth": "Bearer(admin)",
              "errors": [
                {
                  "status": 500,
                  "when": "집계 오류",
                  "message": "사용 현황을 불러오지 못했어요"
                }
              ]
            },
            {
              "id": "sendAudience",
              "intent": "발송 대상 그룹·수·Web Push 구독자 조회",
              "method": "GET",
              "path": "/admin/notifications/audience",
              "response": "{groups:[{전체:128},{청년부:24},{새가족:4}], pushSubscribers} — '{entities.Member}'(active)·'{entities.PushSubscription}' 집계",
              "auth": "Bearer(admin)",
              "errors": [
                {
                  "status": 500,
                  "when": "집계 오류",
                  "message": "발송 대상을 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "broadcast",
              "intent": "전체회원 알림 대량 발송(비가역)",
              "method": "POST",
              "path": "/admin/notifications/broadcast",
              "body": "{channel:'sms'|'web_push', target:'전체회원', content, scheduleAt(즉시/예약), reason(발송 승인 사유·필수), Idempotency-Key}",
              "response": "{accepted:true, estTargets:128, excluded:{optOut, night}} — '{entities.Message}'(status=sending|scheduled) 생성·교인별 '{entities.Notification}' 적재",
              "auth": "Bearer(admin)",
              "idempotent": true,
              "confirm": "pd-confirm 대량발송 확인 모달(되돌릴 수 없음)·발송 승인 사유(필수) 입력·Idempotency-Key로 중복 발송 차단·수신거부/야간 자동 제외·감사추적 기록",
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 400,
                  "when": "내용·사유 누락 또는 길이 초과",
                  "message": "메시지 내용과 발송 승인 사유를 확인해 주세요"
                },
                {
                  "status": 409,
                  "when": "동일 멱등키 재요청",
                  "message": "이미 접수된 발송이에요"
                },
                {
                  "status": 422,
                  "when": "문자지갑 잔액 부족",
                  "message": "문자지갑 잔액이 부족해요"
                },
                {
                  "status": 423,
                  "when": "야간(21~08시) 문자 차단",
                  "message": "야간에는 문자를 보낼 수 없어요"
                },
                {
                  "status": 502,
                  "when": "Notification Gateway 오류",
                  "message": "발송에 실패했어요. 잠시 후 다시 시도해 주세요"
                }
              ]
            },
            {
              "id": "cancelSchedule",
              "intent": "예약 발송 취소(발송 전만 가능·비가역)",
              "method": "DELETE",
              "path": "/admin/notifications/{id}",
              "body": "{reason, Idempotency-Key}",
              "response": "{canceled:true} — '{entities.Message}' status→canceled",
              "auth": "Bearer(admin)",
              "idempotent": true,
              "confirm": "scheduled(발송 전) 상태만 취소 가능·취소 이력 감사추적 기록",
              "target": ".pd-table",
              "errors": [
                {
                  "status": 403,
                  "when": "타 교회 tenant 접근",
                  "message": "권한이 없어요"
                },
                {
                  "status": 404,
                  "when": "예약 없음·이미 처리됨",
                  "message": "이미 처리된 예약이에요"
                },
                {
                  "status": 409,
                  "when": "발송 시작/완료됨",
                  "message": "이미 발송돼 취소할 수 없어요"
                }
              ]
            }
          ],
          "events": [
            {
              "id": "notificationSent",
              "name": "notification.sent",
              "intent": "알림 발송 접수",
              "when": "발송 접수(202)",
              "effect": "Notification Gateway→Web Push/문자 전달·DeepLink(type+contentId)로 교인앱 콘텐츠 이동(SCR-APP-010)·수신거부/야간 자동 제외·감사추적 기록"
            },
            {
              "id": "scheduleCanceled",
              "name": "notification.schedule.canceled",
              "intent": "예약 발송 취소",
              "when": "예약 취소 처리",
              "effect": "'{entities.Message}' status→canceled·취소 이력 감사추적 기록"
            },
            {
              "id": "walletDepleted",
              "name": "messaging.wallet.depleted",
              "intent": "문자지갑 잔액 소진",
              "when": "잔액 소진 감지",
              "effect": "문자 발송 중단·충전 안내 배너(.pd-banner) 노출·KPI(.pd-stat) 갱신"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-ADM-003",
              "via": "발송 후 대시보드",
              "trigger": ".pd-btn"
            }
          ]
        }
      },
      {
        "id": "SCR-ADM-014",
        "label": "PWA 관리",
        "href": "c-pwa.html",
        "surface": "admin",
        "status": "wireframed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-014"
        ],
        "context": "PwaConfig 편집 — PWA 이름·Short Name·아이콘(로고→192/512)·테마컬러·start_url. 교회 기본정보/브랜딩에서 자동 생성 후 보정. 미리보기 제공.",
        "components": [
          {
            "role": ".pd-pagehead",
            "kind": "banner",
            "label": "PWA 관리 — 설치 안내 미리보기·저장"
          },
          {
            "role": ".pd-form",
            "kind": "form",
            "label": "PwaConfig 편집 · 앱 정보"
          },
          {
            "role": ".pd-field",
            "kind": "form",
            "label": "앱 이름(name)·Short Name·테마 컬러(themeColor)·start_url·아이콘(192·512)"
          },
          {
            "role": ".pd-wpanel",
            "kind": "card",
            "label": "홈 화면 설치 미리보기 — 홈 화면에 추가 시 모습"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "저장",
            "action": {
              "on": "click",
              "do": "go:SCR-ADM-003"
            }
          }
        ],
        "description": [
          {
            "text": "PWA 관리 헤더 (설정 / PWA 관리) — 상단 '설치 안내 미리보기'는 공개홈 설치 안내(SCR-SITE-007)로, '저장'은 저장 후 대시보드(SCR-ADM-003)로 이동",
            "target": ".pd-pagehead"
          },
          {
            "text": "PwaConfig 편집 폼 (앱 정보) — 브랜딩 로고에서 192·512 아이콘이 자동 생성되고(교회 설정·브랜딩 SCR-ADM-004 연계), 교회 정보에서 자동으로 만든 값을 여기서 보정",
            "target": ".pd-form"
          },
          {
            "text": "입력 필드 — 앱 이름(name)·Short Name·테마 컬러(브랜딩 주색 연동, 교회 확인 후 게재)·start_url(/ 공개홈)·아이콘 타일(icon-192·icon-512). 아이콘 규격 미달 시 저장 차단",
            "target": ".pd-field"
          },
          {
            "text": "홈 화면 설치 미리보기 패널 — 홈 화면 추가 시 교회 로고 아이콘 + 교회명(Short Name) 모습 확인. Native 앱 설치는 차기 제공(SCR-ADM-015), 현재는 Web Push 기반 PWA",
            "target": ".pd-wpanel"
          },
          {
            "text": "저장 버튼 — 저장 시 'PWA 설정이 저장되었어요' 안내 후 대시보드(SCR-ADM-003)로 복귀, manifest 갱신으로 설치 안내는 공개홈(SCR-SITE-007)에 반영",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "화면 진입 (자동 생성값 존재)",
            "guard": "브랜딩 로고·대표색 기반으로 PwaConfig 자동 생성됨",
            "result": "자동 생성된 앱 이름·Short Name·테마 컬러·start_url·아이콘(192·512) 표시",
            "message": "교회 정보에서 자동으로 만들었어요. 필요하면 아래에서 보정하세요.",
            "placement": "banner",
            "target": ".pd-form",
            "api": {
              "endpoint": "GET /admin/pwa-config",
              "status": 200
            }
          },
          {
            "state": "로딩",
            "trigger": "화면 진입 직후 응답 대기",
            "guard": "PwaConfig·브랜딩 소스 조회 응답 수신 전",
            "result": "폼·미리보기 자리 스켈레톤, 저장 버튼 비활성",
            "message": "PWA 설정을 불러오는 중이에요.",
            "placement": "inline",
            "target": ".pd-form",
            "api": {
              "endpoint": "GET /admin/pwa-config",
              "status": "in-flight"
            }
          },
          {
            "state": "정상",
            "trigger": "'저장' 클릭",
            "guard": "앱 이름 입력됨·아이콘 192·512 규격 충족·start_url이 '/'로 시작",
            "result": "PwaConfig 저장(멱등 upsert)·manifest 재생성·대시보드(SCR-ADM-003)로 복귀",
            "message": "PWA 설정이 저장되었어요.",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "PUT /admin/pwa-config",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "화면 진입 (브랜딩 로고 미등록)",
            "guard": "교회 로고가 없어 192·512 아이콘 자동 생성 불가",
            "result": "아이콘 타일 빈 상태 표시·로고 등록 유도",
            "message": "아직 브랜딩 로고가 없어요. 교회 설정·브랜딩에서 로고를 올리면 192·512 아이콘이 자동으로 만들어져요.",
            "placement": "banner",
            "target": ".pd-field",
            "api": {
              "endpoint": "GET /admin/pwa-config",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "'저장' 클릭",
            "guard": "업로드/연동 아이콘이 192·512 규격 미달",
            "result": "저장 차단·규격 경고 배너 노출",
            "message": "아이콘은 192·512 규격 이미지가 필요해요. (규격 미달 시 저장이 차단됩니다)",
            "placement": "inline",
            "target": ".pd-field",
            "api": {
              "endpoint": "PUT /admin/pwa-config",
              "status": 422
            }
          },
          {
            "state": "권한없음",
            "trigger": "화면 진입 또는 저장 시도",
            "guard": "관리자 JWT 없음·만료 또는 role≠admin·타 교회 스코프",
            "result": "접근 차단 → 관리자 로그인(SCR-ADM-001)으로 유도",
            "message": "관리자 권한이 필요해요. 다시 로그인해 주세요.",
            "placement": "full-page",
            "target": ".pd-pagehead",
            "api": {
              "endpoint": "GET /admin/pwa-config",
              "status": 403
            }
          },
          {
            "state": "엣지",
            "trigger": "'저장' 클릭 (다른 탭·기기에서 먼저 수정)",
            "guard": "서버 manifest 버전이 로드 시점보다 앞서 변경됨(stale)",
            "result": "충돌 안내·새로고침 후 재저장 유도",
            "message": "다른 곳에서 PWA 설정이 먼저 변경됐어요. 새로고침 후 다시 저장해 주세요.",
            "placement": "banner",
            "target": ".pd-btn",
            "api": {
              "endpoint": "PUT /admin/pwa-config",
              "status": 409
            }
          },
          {
            "state": "필수누락",
            "trigger": "'저장' 클릭 (앱 이름 공란)",
            "guard": "name(앱 이름) 미입력",
            "result": "저장 차단·해당 필드 하이라이트",
            "message": "앱 이름을 입력해 주세요. 홈 화면 설치 시 교회명으로 표시돼요.",
            "placement": "inline",
            "target": ".pd-field",
            "api": {
              "endpoint": "PUT /admin/pwa-config",
              "status": 400
            }
          },
          {
            "state": "형식오류",
            "trigger": "'저장' 클릭 (start_url 형식 오류)",
            "guard": "start_url이 '/'로 시작하지 않음(절대경로·외부 URL 입력)",
            "result": "저장 차단·형식 안내",
            "message": "start_url은 '/'로 시작하는 공개홈 경로여야 해요. (예: /)",
            "placement": "inline",
            "target": ".pd-field",
            "api": {
              "endpoint": "PUT /admin/pwa-config",
              "status": 400
            }
          },
          {
            "state": "유효",
            "trigger": "필드 입력·보정 완료",
            "guard": "앱 이름 입력·아이콘 192·512 규격 충족·start_url '/' 시작 모두 통과(클라이언트 검증)",
            "result": "검증 통과·저장 버튼 활성화",
            "message": "입력값이 확인됐어요. 저장할 수 있어요.",
            "placement": "inline",
            "target": ".pd-field"
          },
          {
            "state": "중복충돌",
            "trigger": "'저장' 클릭",
            "guard": "해당 없음 — PwaConfig는 테넌트당 단일 레코드(upsert·멱등), 멀티테넌트 격리로 교차 교회 간 이름·Short Name 충돌 없음",
            "result": "N/A",
            "message": "N/A",
            "placement": "inline",
            "target": ".pd-form"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "pwaConfig",
              "intent": "PWA 설정 조회(브랜딩 기반 자동 생성값 포함)",
              "method": "GET",
              "path": "/admin/pwa-config",
              "params": "없음(tenantId=JWT 스코프)",
              "response": "'{entities.PwaConfig}'",
              "auth": "Bearer(admin)",
              "target": ".pd-form",
              "errors": [
                {
                  "status": 401,
                  "when": "토큰 없음·만료",
                  "message": "관리자 권한이 필요해요. 다시 로그인해 주세요."
                },
                {
                  "status": 403,
                  "when": "role≠admin 또는 타 교회 스코프 접근",
                  "message": "이 교회의 PWA 설정에 접근할 권한이 없어요."
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "PWA 설정을 불러오지 못했어요. 잠시 후 다시 시도해 주세요."
                }
              ]
            },
            {
              "id": "brandingSource",
              "intent": "브랜딩 로고·대표색 조회(192·512 아이콘·테마 컬러 자동 생성 소스)",
              "method": "GET",
              "path": "/admin/church",
              "params": "없음(tenantId=JWT 스코프)",
              "response": "'{entities.Church}'",
              "auth": "Bearer(admin)",
              "target": ".pd-field",
              "errors": [
                {
                  "status": 404,
                  "when": "브랜딩 로고 미등록(빈데이터)",
                  "message": "아직 브랜딩 로고가 없어요. 교회 설정·브랜딩에서 로고를 먼저 올려 주세요."
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "브랜딩 정보를 불러오지 못했어요."
                }
              ]
            },
            {
              "id": "channelConfig",
              "intent": "채널 활성 상태 조회(PWA·Web Push on/off)",
              "method": "GET",
              "path": "/admin/channel-config",
              "params": "없음(tenantId=JWT 스코프)",
              "response": "'{entities.ChannelConfig}'",
              "auth": "Bearer(admin)",
              "target": ".pd-pagehead",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "채널 설정을 불러오지 못했어요."
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "savePwaConfig",
              "intent": "PWA 설정 저장(멱등 upsert·manifest 재생성)",
              "method": "PUT",
              "path": "/admin/pwa-config",
              "body": "'{entities.PwaConfig}' (name·shortName·themeColor·backgroundColor·startUrl·icon 192/512/maskable)",
              "response": "{saved:true, manifestId}",
              "auth": "Bearer(admin)",
              "idempotency": true,
              "confirm": "불필요 — 재저장으로 복원 가능한 가역 쓰기(Idempotency-Key로 중복 저장 방지). 비가역 전이 아님",
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 400,
                  "when": "앱 이름 공란 또는 start_url 형식 오류('/' 미시작)",
                  "message": "입력값을 확인해 주세요. 앱 이름은 필수, start_url은 '/'로 시작해야 해요."
                },
                {
                  "status": 401,
                  "when": "토큰 없음·만료",
                  "message": "관리자 권한이 필요해요. 다시 로그인해 주세요."
                },
                {
                  "status": 403,
                  "when": "role≠admin 또는 타 교회 스코프 쓰기",
                  "message": "이 교회의 PWA 설정을 변경할 권한이 없어요."
                },
                {
                  "status": 409,
                  "when": "다른 탭·기기에서 먼저 수정되어 manifest 버전 충돌(stale)",
                  "message": "다른 곳에서 PWA 설정이 먼저 변경됐어요. 새로고침 후 다시 저장해 주세요."
                },
                {
                  "status": 422,
                  "when": "아이콘이 192·512 규격 미달",
                  "message": "아이콘은 192·512 규격 이미지가 필요해요."
                }
              ]
            }
          ],
          "events": [
            {
              "id": "pwaConfigUpdated",
              "name": "pwaconfig.updated",
              "when": "PWA 설정 저장 성공",
              "intent": "PWA 설정 갱신됨",
              "effect": "교회별 manifest.json 재생성(GET /churches/{slug}/manifest.json)·홈 화면 설치 아이콘·테마 컬러 반영, 공개홈 설치 안내(SCR-SITE-007) 최신화"
            },
            {
              "id": "pwaIconGenerated",
              "name": "pwaicon.generated",
              "when": "브랜딩 로고 변경·저장으로 아이콘 파이프라인 실행",
              "intent": "PWA 아이콘 자동 생성됨",
              "effect": "브랜딩 로고에서 192·512(+maskable) 아이콘 세트 재생성, 미리보기 타일·manifest 아이콘 갱신"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-ADM-003",
              "via": "저장 후 대시보드"
            }
          ]
        }
      },
      {
        "id": "SCR-ADM-015",
        "label": "앱(Native) 관리 (차기)",
        "href": "c-app.html",
        "surface": "admin",
        "status": "wireframed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-025"
        ],
        "context": "[차기·Premium Add-on] AppConfig — iOS 번들ID·Android 패키지명·스토어 상태·버전. 'APP 상품 구매 교회 전용·준비 중'(Phase6) 안내. V1에서는 비활성·조회만.",
        "components": [
          {
            "role": ".pd-pagehead",
            "kind": "banner",
            "label": "앱(Native) 관리 (차기) — 운영 / 설정"
          },
          {
            "role": ".pd-wpanel",
            "kind": "card",
            "label": "준비 중 안내 — Native 앱은 차기 Premium Add-on이에요. 준비 중입니다"
          },
          {
            "role": ".pd-form",
            "kind": "form",
            "label": "AppConfig (조회만) — iOS 번들 ID·Android 패키지명·스토어 상태·앱 버전"
          },
          {
            "role": ".pd-badge",
            "kind": "card",
            "label": "상태 배지 — 차기 / 준비 중 / 조회만"
          }
        ],
        "description": [
          {
            "text": "상단 페이지 헤드 — '운영 / 설정 / 앱(Native) 관리' 경로와 '차기' 배지, '대시보드로' 버튼으로 대시보드(SCR-ADM-003) 복귀",
            "target": ".pd-pagehead"
          },
          {
            "text": "준비 중 안내 패널 — 'Native 앱은 차기 Premium Add-on이에요. 준비 중입니다' 배너와 함께, 네이티브 iOS·Android 앱은 APP 상품을 구매한 교회 전용(Phase6)이고 성도 접근은 지금도 단일 디자인 시스템 PWA(Web Push 포함)로 제공됨을 고지",
            "target": ".pd-wpanel"
          },
          {
            "text": "AppConfig 조회 폼 — iOS 번들 ID·Android 패키지명·스토어 상태·앱 버전 4개 필드가 모두 'APP 상품 구매 후 자동 설정 (준비 중)' placeholder로 비활성(조회만, GET /admin/app-config · status: preparing)",
            "target": ".pd-form"
          },
          {
            "text": "상태 배지 — 패널 헤드의 '차기'·'준비 중'·'조회만' 배지로 현재 입력·저장이 비활성인 상태임을 표시",
            "target": ".pd-badge"
          },
          {
            "text": "활성화 조건 패널 — APP 상품 이용 교회만 설정 가능·요금 미확정(시장검증 후 확정)·구매 안내는 교회 확인 후 게재, '요금제·사용현황 보기'로 요금제 화면(SCR-ADM-016)에서 플랜 변경 요청",
            "target": ".pd-wpanel"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "화면 진입",
            "guard": "AppConfig 조회 전(status 미확정)",
            "result": "준비 중 안내 배너와 비활성 조회 폼 스켈레톤을 먼저 렌더",
            "message": "앱(Native) 관리는 차기 Premium Add-on이에요. 준비 중입니다",
            "placement": "banner",
            "target": ".pd-wpanel"
          },
          {
            "state": "로딩",
            "trigger": "AppConfig 조회",
            "guard": "GET /admin/app-config 응답 대기",
            "result": "필드 자리에 로딩 표시 유지(입력란 비활성)",
            "message": "앱 설정 상태를 불러오는 중이에요",
            "placement": "inline",
            "target": ".pd-form",
            "api": {
              "endpoint": "GET /admin/app-config",
              "status": "대기"
            }
          },
          {
            "state": "정상",
            "trigger": "조회 응답 수신",
            "guard": "status=preparing (V1)",
            "result": "iOS 번들 ID·Android 패키지명·스토어 상태·앱 버전이 비활성 조회값으로 표시",
            "message": "Native 앱은 차기 Premium Add-on이에요. 준비 중입니다",
            "placement": "banner",
            "target": ".pd-wpanel",
            "api": {
              "endpoint": "GET /admin/app-config",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "조회 응답 수신",
            "guard": "bundleIdIos·packageNameAndroid 미설정(APP 상품 미구매 교회)",
            "result": "모든 필드를 'APP 상품 구매 후 자동 설정 (준비 중)' placeholder로 표시",
            "message": "아직 설정된 앱 정보가 없어요. APP 상품 구매 후 자동으로 설정돼요",
            "placement": "inline",
            "target": ".pd-form",
            "api": {
              "endpoint": "GET /admin/app-config",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "조회 실패",
            "guard": "서버 오류(5xx)",
            "result": "오류 배너 표시·재시도 유도",
            "message": "앱 설정 상태를 불러오지 못했어요. 잠시 후 다시 시도해 주세요",
            "placement": "banner",
            "target": ".pd-form",
            "api": {
              "endpoint": "GET /admin/app-config",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "화면 진입",
            "guard": "미인증 또는 비관리자·타 교회(tenantId 불일치) 토큰",
            "result": "접근 차단 후 관리자 로그인(SCR-ADM-001) 유도",
            "message": "접근 권한이 없어요. 관리자로 로그인해 주세요",
            "placement": "full-page",
            "target": ".pd-wpanel",
            "api": {
              "endpoint": "GET /admin/app-config",
              "status": 403
            }
          },
          {
            "state": "엣지",
            "trigger": "조회 폼 상호작용 시도",
            "guard": "입력검증: 화면이 조회만(입력란 비활성)이라 필수누락·형식오류·중복충돌 등 입력검증 해당 없음. 엣지: APP 상품을 구매했어도 V1에서는 Phase6 활성화 전까지 조회만 유지",
            "result": "입력·저장 비활성 유지(값 변경 불가)",
            "message": "입력·저장은 차기(Phase6)에 열려요. 지금은 조회만 가능해요",
            "placement": "inline",
            "target": ".pd-form"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "appConfig",
              "intent": "앱(Native) 설정 상태 조회 (차기·조회만)",
              "method": "GET",
              "path": "/admin/app-config (tenantId=JWT, path 비노출)",
              "response": "'{entities.AppConfig}' (status:'preparing', bundleIdIos·packageNameAndroid·iosStatus·androidStatus·currentVersion — V1 모두 비활성 조회값)",
              "auth": "Bearer(admin)",
              "target": ".pd-form",
              "errors": [
                {
                  "status": 401,
                  "when": "미인증(토큰 없음·만료)",
                  "message": "로그인이 필요해요. 관리자로 로그인해 주세요(SCR-ADM-001)"
                },
                {
                  "status": 403,
                  "when": "비관리자 또는 타 교회(tenantId 불일치) 접근(멀티테넌트 격리)",
                  "message": "접근 권한이 없어요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "앱 설정 상태를 불러오지 못했어요. 잠시 후 다시 시도해 주세요"
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "appConfigSave",
              "intent": "앱(Native) 설정 저장 — V1 비활성(차기·Phase6 활성화 시 노출)",
              "method": "PUT",
              "path": "/admin/app-config (tenantId=JWT)",
              "auth": "Bearer(admin)",
              "target": ".pd-form",
              "state": "disabled(V1)",
              "idempotency": true,
              "confirm": true,
              "audit": true,
              "note": "현재 버전(V1)에서는 입력·저장 비활성(조회만). APP 상품 구매·Phase6 활성화 후에만 노출되며, 서비스 상태·스토어 전이를 포함한 비가역 쓰기이므로 Idempotency-Key 헤더 + 확인(confirm) 모달 + 감사로그를 전제로 함. 목업에서는 미노출."
            }
          ],
          "events": [
            {
              "name": "appconfig.view",
              "intent": "앱 설정 상태 조회",
              "when": "앱(Native) 관리 화면 진입 시 AppConfig 상태를 조회(GET /admin/app-config)",
              "target": ".pd-form"
            },
            {
              "name": "nav.billing",
              "intent": "요금제 화면 이동",
              "when": "'요금제·사용현황 보기' 클릭 시 요금제·사용현황(SCR-ADM-016)으로 이동해 플랜 변경 요청",
              "target": ".pd-wpanel"
            },
            {
              "name": "nav.dashboard",
              "intent": "대시보드 복귀",
              "when": "'대시보드로' 클릭 시 대시보드(SCR-ADM-003)로 복귀",
              "target": ".pd-pagehead"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-ADM-003",
              "via": "대시보드 복귀",
              "trigger": ".pd-pagehead"
            }
          ]
        }
      },
      {
        "id": "SCR-ADM-016",
        "label": "요금제·사용현황",
        "href": "c-billing.html",
        "surface": "admin",
        "status": "wireframed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-024"
        ],
        "context": "현재 요금제(WEB/WEB+APP)·결제 상태·사용현황(회원수·스토리지·발송 수). 금액은 미확정 placeholder. 플랜 변경 요청 가능(슈퍼 처리).",
        "components": [
          {
            "role": ".pd-pagehead",
            "kind": "banner",
            "label": "요금제·사용현황"
          },
          {
            "role": ".pd-wpanel",
            "kind": "card",
            "label": "현재 요금제·결제 상태 (금액 미확정)"
          },
          {
            "role": ".pd-kpi",
            "kind": "kpi",
            "label": "사용현황 (회원 수·저장용량·이번 달 알림 발송·Web Push 수신동의)"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "플랜 변경 요청",
            "action": {
              "on": "click",
              "do": "go:SCR-ADM-003"
            }
          }
        ],
        "description": [
          {
            "text": "페이지 헤더 — breadcrumb '설정 / 요금제·사용현황'과 '대시보드로' 버튼(관리자 대시보드 SCR-ADM-003로 복귀). 상단 안내 배너로 '요금은 시장검증 후 확정 예정이에요(미확정) · 사용현황은 본인 교회 데이터만 표시됩니다(tenant 격리)'를 고지",
            "target": ".pd-pagehead"
          },
          {
            "text": "현재 요금제·결제 상태 패널(금액 미확정) — 현재 플랜 'WEB 상품', 구성 '교회 공개홈 + 교인 PWA · 단일 디자인셋(이용 중)', Web Push 알림 '제공', 'WEB+APP(네이티브 앱)'은 '차기 과제', 월 요금 '금액 미확정', 결제 상태 '준비 중'",
            "target": ".pd-wpanel"
          },
          {
            "text": "사용현황 KPI — 회원 수 128명(본인 교회), 저장용량 '준비 중(측정 예정)', 이번 달 알림 발송 860건(WebPush·문자), Web Push 수신동의 92%(교인 PWA). 모두 본인 교회 데이터만 집계(tenant 격리)",
            "target": ".pd-kpi"
          },
          {
            "text": "플랜 변경 요청 — 변경할 플랜(WEB 현재 / WEB+APP 차기 과제)과 요청 메모를 담아 접수하면 운영팀(슈퍼) 확인 후 안내, 이미 처리 중인 요청이 있으면 접수되지 않음(409). 요청 후 관리자 대시보드(SCR-ADM-003)로 복귀",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "화면 진입",
            "guard": "조회 응답 전",
            "result": "요금제 패널·KPI 골격을 placeholder로 표시",
            "message": "요금제·사용현황을 불러오는 중이에요",
            "placement": "inline",
            "target": ".pd-wpanel"
          },
          {
            "state": "로딩",
            "trigger": "요금제·사용현황 조회",
            "guard": "GET 응답 대기",
            "result": "스켈레톤 표시, '준비 중' 표기 유지",
            "message": "사용현황을 불러오는 중이에요",
            "placement": "inline",
            "target": ".pd-kpi"
          },
          {
            "state": "정상",
            "trigger": "조회 응답",
            "guard": "플랜·사용현황 존재",
            "result": "현재 요금제·결제 상태와 사용현황 KPI 표시",
            "message": "요금은 시장검증 후 확정 예정이에요(미확정) · 사용현황은 본인 교회 데이터만 표시됩니다",
            "placement": "banner",
            "target": ".pd-wpanel",
            "api": {
              "endpoint": "GET /admin/billing",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "조회 응답",
            "guard": "사용현황 집계 전(발송 0·저장용량 미측정)",
            "result": "'준비 중'·'측정 예정' placeholder 유지",
            "message": "아직 집계된 사용현황이 없어요. 운영이 시작되면 표시돼요",
            "placement": "inline",
            "target": ".pd-kpi",
            "api": {
              "endpoint": "GET /admin/billing",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "조회 응답",
            "guard": "서버 오류(500)",
            "result": "조회 실패·재시도 안내",
            "message": "요금제 정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요",
            "placement": "inline",
            "target": ".pd-kpi",
            "api": {
              "endpoint": "GET /admin/billing",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "화면 진입/조회",
            "guard": "미인증(401) 또는 admin 권한 아님·타 교회 접근(403)",
            "result": "관리자 로그인 화면(SCR-ADM-001)으로 유도",
            "message": "접근 권한이 없어요. 관리자 로그인 후 이용해 주세요",
            "placement": "full-page",
            "target": ".pd-pagehead",
            "api": {
              "endpoint": "GET /admin/billing",
              "status": 401
            }
          },
          {
            "state": "엣지",
            "trigger": "조회 응답",
            "guard": "서비스 상태가 일시정지/해지(§47)",
            "result": "플랜 변경 요청 버튼 비활성·안내",
            "message": "현재 서비스가 일시정지 상태예요. 운영팀 확인 후 변경할 수 있어요",
            "placement": "banner",
            "target": ".pd-btn"
          },
          {
            "state": "정상",
            "trigger": "플랜 변경 요청(제출)",
            "guard": "플랜 선택·메모 유효·진행 중 요청 없음·확인 모달 승인",
            "result": "변경 요청 접수(운영팀 확인 대기)",
            "message": "플랜 변경을 요청했어요. 확인 후 안내드릴게요",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "POST /admin/billing/plan-change-requests",
              "status": 202
            }
          },
          {
            "state": "필수누락",
            "trigger": "플랜 변경 요청(제출)",
            "guard": "요청 메모(변경 사유) 미입력",
            "result": "제출 차단·메모 입력 요구",
            "message": "요청 메모(변경 사유)를 입력해 주세요",
            "placement": "inline"
          },
          {
            "state": "형식오류",
            "trigger": "플랜 변경 요청(제출)",
            "guard": "허용되지 않은 플랜 값(WEB/WEB+APP enum 외)",
            "result": "서버 거절·재선택 요구",
            "message": "변경할 플랜을 다시 선택해 주세요",
            "placement": "inline",
            "api": {
              "endpoint": "POST /admin/billing/plan-change-requests",
              "status": 400
            }
          },
          {
            "state": "범위경계",
            "trigger": "플랜 변경 요청(제출)",
            "guard": "요청 메모 글자수 초과(최대 500자)",
            "result": "제출 차단·글자수 안내",
            "message": "요청 메모는 500자 이내로 적어주세요",
            "placement": "inline"
          },
          {
            "state": "중복충돌",
            "trigger": "플랜 변경 요청(제출)",
            "guard": "진행 중인 변경 요청 존재(409)",
            "result": "접수 차단",
            "message": "이미 처리 중인 변경 요청이 있어요. 기존 요청이 완료된 뒤 다시 시도해 주세요",
            "placement": "banner",
            "target": ".pd-btn",
            "api": {
              "endpoint": "POST /admin/billing/plan-change-requests",
              "status": 409
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "billing",
              "intent": "요금제·결제 상태·사용현황 조회(본인 교회만)",
              "method": "GET",
              "path": "/admin/billing",
              "response": "{ subscription: '{entities.Subscription}'(plan='WEB'·status·webMonthly='미확정'·appAnnual='미확정'), paymentStatus:'준비 중', priceTBD:true, channel:'{entities.ChannelConfig}'(webPushEnabled=true), usage:{ members: '{entities.Member}' 활성 교인 수(128), storage:'준비 중', monthlyNotifications: '{entities.Message}'.sentCount 월 합계(860), webPushConsentRate: '{entities.PushSubscription}' 기준 수신동의율(0.92) } }",
              "auth": "Bearer(admin)",
              "target": ".pd-wpanel",
              "errors": [
                {
                  "status": 401,
                  "when": "미인증(토큰 없음/만료)",
                  "message": "접근 권한이 없어요. 관리자 로그인 후 이용해 주세요"
                },
                {
                  "status": 403,
                  "when": "admin 권한 아님 또는 타 교회 접근(tenant 스코프 위반)",
                  "message": "본인 교회 정보만 볼 수 있어요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "요금제 정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요"
                }
              ]
            },
            {
              "id": "productPlans",
              "intent": "상품 카탈로그 조회(WEB·APP 구조, 금액 미확정)",
              "method": "GET",
              "path": "/admin/product-plans",
              "response": "['{entities.ProductPlan}'](tier='BASIC(WEB)'|'APP(Add-on)'·includedChannels=['Web','Mobile','PWA','Web Push','Admin']·setupFee='미확정'·recurringFee='미확정'·isAddon). WEB='이용 중', 'WEB+APP(네이티브 앱)'='차기 과제'",
              "auth": "Bearer(admin)",
              "target": ".pd-wpanel",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "상품 정보를 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "planChangeRequest",
              "intent": "플랜 변경 요청 접수",
              "method": "POST",
              "path": "/admin/billing/plan-change-requests",
              "body": "{ targetPlan: 'WEB'|'WEB+APP'('{entities.Subscription}'.plan enum), note: 변경 사유 메모(최대 500자) }",
              "response": "{ requestId, status:'접수', acceptedAt } — 202 접수 후 운영팀(슈퍼) 확인 시 '{entities.Subscription}' 전이",
              "auth": "Bearer(admin)",
              "idempotent": true,
              "confirm": true,
              "note": "비가역 쓰기(요금제 변경 전이): Idempotency-Key 헤더 + 확인(confirm) 모달 + 감사로그. 중복 제출/재시도 시 동일 요청 1건만 접수(409 중복 방지)",
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 400,
                  "when": "허용되지 않은 플랜 값(enum 외)",
                  "message": "변경할 플랜을 다시 선택해 주세요"
                },
                {
                  "status": 409,
                  "when": "진행 중 변경 요청 존재",
                  "message": "이미 처리 중인 변경 요청이 있어요. 기존 요청이 완료된 뒤 다시 시도해 주세요"
                },
                {
                  "status": 422,
                  "when": "서비스 상태가 일시정지/해지(§47)로 변경 불가",
                  "message": "현재 서비스 상태에서는 플랜을 변경할 수 없어요"
                },
                {
                  "status": 401,
                  "when": "미인증",
                  "message": "관리자 로그인 후 이용해 주세요"
                },
                {
                  "status": 403,
                  "when": "admin 권한 아님 또는 타 교회 접근",
                  "message": "본인 교회만 요청할 수 있어요"
                }
              ]
            }
          ],
          "events": [
            {
              "name": "billing.plan_change_requested",
              "intent": "플랜 변경 요청 접수됨(운영팀 확인 대기)",
              "when": "관리자가 플랜 변경 요청을 접수(202)한 직후",
              "payload": "{ tenantId, requestId, targetPlan }",
              "target": ".pd-btn"
            },
            {
              "name": "billing.plan_change_reviewed",
              "intent": "운영팀(슈퍼)이 변경 요청을 확인·처리함",
              "when": "슈퍼가 요청을 승인/반려하면 교회 관리자에게 '{entities.Notification}'(channel=web_push/in_app)으로 통지",
              "payload": "{ requestId, result:'approved'|'rejected' }",
              "target": ".pd-wpanel"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-ADM-003",
              "via": "요청 후 대시보드",
              "trigger": ".pd-btn"
            }
          ]
        }
      },
      {
        "id": "SCR-ADM-017",
        "label": "관리자 계정 관리",
        "href": "c-admins.html",
        "surface": "admin",
        "status": "wireframed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-018"
        ],
        "context": "교회 관리자 계정 목록·권한(admin). 담임목사가 위임(초대). 로그아웃. tenant 격리(본인 교회 관리자만).",
        "components": [
          {
            "role": ".pd-pagehead",
            "kind": "banner",
            "label": "관리자 계정 관리"
          },
          {
            "role": ".pd-pagehead-actions",
            "kind": "button",
            "label": "관리자 초대"
          },
          {
            "role": ".pd-table",
            "kind": "table",
            "label": "관리자 목록 — 이름·이메일·권한·상태·관리"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "로그아웃"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "로그아웃",
            "action": {
              "on": "click",
              "do": "go:SCR-ADM-001"
            }
          }
        ],
        "description": [
          {
            "text": "관리자 초대 버튼 — 담임목사가 이메일로 관리자 권한을 위임하는 초대 폼을 연다(같은 화면 '관리자 초대' 패널).",
            "target": ".pd-pagehead-actions"
          },
          {
            "text": "관리자 목록 테이블 — 본인 교회 관리자만 표시(tenant 격리). 이름·이메일·권한·상태·관리 열로, 본인 계정은 '해제 불가', 활성 관리자는 '권한 해제', 미수락 계정은 '초대 수락 대기·초대 취소'를 노출(이메일 미확보 시 '교회 확인 후 게재').",
            "target": ".pd-table"
          },
          {
            "text": "권한 해제 확인 — 선택한 관리자의 권한을 해제하기 전 '되돌릴 수 없어요'를 알리는 확인 블록(본인 계정은 해제 차단)."
          },
          {
            "text": "관리자 초대 폼 — 초대 이메일·권한을 입력해 초대 메일을 발송(같은 화면, 목록에 '초대 수락 대기' 행 추가)."
          },
          {
            "text": "로그아웃 버튼 — 세션을 종료하고 관리자 로그인(SCR-ADM-001)으로 이동.",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "화면 진입",
            "guard": "GET /admin/admins 응답 전 · 초대 폼 빈 상태",
            "result": "관리자 목록 영역 스켈레톤 표시 · 초대 폼 입력 대기",
            "message": "",
            "placement": "inline",
            "target": ".pd-table"
          },
          {
            "state": "로딩",
            "trigger": "관리자 목록 조회 중",
            "guard": "요청 응답 대기",
            "result": "목록 로딩 인디케이터 표시",
            "message": "관리자 목록을 불러오는 중이에요",
            "placement": "inline",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /admin/admins"
            }
          },
          {
            "state": "정상",
            "trigger": "목록 응답",
            "guard": "본인 교회 관리자 1명 이상(담임목사 포함)",
            "result": "관리자 목록 표시 — 본인 계정 '해제 불가', 활성 '권한 해제', 미수락 '초대 수락 대기·초대 취소'",
            "message": "",
            "placement": "inline",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /admin/admins",
              "status": 200
            }
          },
          {
            "state": "정상",
            "trigger": "초대 메일 보내기(유효 입력)",
            "guard": "이메일 형식 유효 · 미등록/미대기(중복 아님)",
            "result": "초대 메일 발송 접수 · 목록에 '초대 수락 대기' 행 추가",
            "message": "관리자 초대를 보냈어요",
            "placement": "toast",
            "api": {
              "endpoint": "POST /admin/admins/invite",
              "status": 202
            }
          },
          {
            "state": "정상",
            "trigger": "권한 해제 확인",
            "guard": "본인 계정 아님 · 확인 모달 승인 · Idempotency-Key",
            "result": "관리자 권한 해제 · 감사로그 기록",
            "message": "관리자 권한을 해제했어요",
            "placement": "toast",
            "api": {
              "endpoint": "DELETE /admin/admins/{id}",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "목록 응답",
            "guard": "본인(담임목사) 외 관리자 0명",
            "result": "빈 상태 안내 + 초대 유도",
            "message": "아직 초대한 관리자가 없어요. 관리자 초대로 권한을 위임해 보세요",
            "placement": "summary",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /admin/admins",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "목록 조회 실패",
            "guard": "서버 오류(5xx)",
            "result": "목록 로드 실패 · 재시도 안내",
            "message": "관리자 목록을 불러오지 못했어요. 잠시 후 다시 시도해 주세요",
            "placement": "banner",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /admin/admins",
              "status": 500
            }
          },
          {
            "state": "에러",
            "trigger": "권한 해제 시도",
            "guard": "본인 계정 해제 시도(해제 불가)",
            "result": "해제 차단",
            "message": "본인 계정의 권한은 해제할 수 없어요",
            "placement": "inline",
            "target": ".pd-btn",
            "api": {
              "endpoint": "DELETE /admin/admins/{id}",
              "status": 409
            }
          },
          {
            "state": "에러",
            "trigger": "초대 메일 보내기 — 이메일 미입력",
            "guard": "입력검증·필수누락(초대 이메일 공란)",
            "result": "발송 차단",
            "message": "초대할 이메일을 입력해 주세요",
            "placement": "inline",
            "api": {
              "endpoint": "POST /admin/admins/invite",
              "status": 400
            }
          },
          {
            "state": "에러",
            "trigger": "초대 메일 보내기 — 잘못된 이메일",
            "guard": "입력검증·형식오류(이메일 형식 불일치)",
            "result": "발송 차단",
            "message": "올바른 이메일 형식을 입력해 주세요",
            "placement": "inline",
            "api": {
              "endpoint": "POST /admin/admins/invite",
              "status": 400
            }
          },
          {
            "state": "에러",
            "trigger": "초대 메일 보내기 — 중복 이메일",
            "guard": "입력검증·중복충돌(이미 관리자이거나 초대 대기 중)",
            "result": "발송 차단",
            "message": "이미 관리자이거나 초대 대기 중인 이메일이에요",
            "placement": "inline",
            "api": {
              "endpoint": "POST /admin/admins/invite",
              "status": 409
            }
          },
          {
            "state": "권한없음",
            "trigger": "세션 만료 또는 비관리자 접근",
            "guard": "JWT 없음·만료 또는 role≠admin",
            "result": "접근 차단 → 관리자 로그인(SCR-ADM-001)으로 이동",
            "message": "세션이 만료되었어요. 다시 로그인해 주세요",
            "placement": "full-page",
            "target": ".pd-pagehead",
            "api": {
              "endpoint": "GET /admin/admins",
              "status": 401
            }
          },
          {
            "state": "엣지",
            "trigger": "다른 교회 관리자 권한 해제 요청",
            "guard": "교차 테넌트(다른 tenant id) 차단 · 입력검증·범위경계: 이메일은 수치 범위 경계 해당 없음",
            "result": "tenant 격리로 차단(대상 없음 처리)",
            "message": "요청을 처리할 수 없어요",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "DELETE /admin/admins/{id}",
              "status": 404
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "adminList",
              "intent": "관리자 목록 조회(tenant 격리)",
              "method": "GET",
              "path": "/admin/admins",
              "params": "?cursor=&limit=20",
              "response": "{items:['{entities.Member}'(role=admin)], nextCursor}",
              "auth": "Bearer(admin)",
              "target": ".pd-table",
              "errors": [
                {
                  "status": 401,
                  "when": "세션 만료·미인증",
                  "message": "세션이 만료되었어요. 다시 로그인해 주세요"
                },
                {
                  "status": 403,
                  "when": "관리자 권한 없음",
                  "message": "접근 권한이 없어요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "관리자 목록을 불러오지 못했어요. 잠시 후 다시 시도해 주세요"
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "inviteAdmin",
              "intent": "관리자 초대(이메일로 권한 위임)",
              "method": "POST",
              "path": "/admin/admins/invite",
              "body": "{email, role:'admin'}",
              "response": "'{entities.Member}'(status=pending · 초대 수락 대기)",
              "status": 202,
              "auth": "Bearer(admin)",
              "idempotent": true,
              "note": "Idempotency-Key 헤더로 초대 메일 중복 발송 방지(가역 — 초대 취소 가능). tenant 스코프 강제(본인 교회 바인딩).",
              "errors": [
                {
                  "status": 400,
                  "when": "이메일 필수누락·형식오류",
                  "message": "올바른 이메일을 입력해 주세요"
                },
                {
                  "status": 409,
                  "when": "이미 관리자이거나 초대 대기 중",
                  "message": "이미 관리자이거나 초대 대기 중인 이메일이에요"
                },
                {
                  "status": 403,
                  "when": "담임목사/관리자 권한 없음",
                  "message": "관리자를 초대할 권한이 없어요"
                }
              ]
            },
            {
              "id": "revokeAdmin",
              "intent": "관리자 권한 해제(비가역)",
              "method": "DELETE",
              "path": "/admin/admins/{id}",
              "response": "{revoked:true}",
              "status": 200,
              "auth": "Bearer(admin)",
              "idempotent": true,
              "confirm": "권한 해제 확인 모달(.pd-confirm) — '관리자 권한을 해제할까요? 되돌릴 수 없어요' · 본인 계정 차단",
              "note": "비가역 쓰기 — Idempotency-Key 헤더 + 확인(confirm) + 감사로그. tenant 스코프 강제(본인 교회 관리자만).",
              "errors": [
                {
                  "status": 409,
                  "when": "본인 계정 해제 시도",
                  "message": "본인 계정의 권한은 해제할 수 없어요"
                },
                {
                  "status": 404,
                  "when": "다른 교회(tenant) 관리자·대상 없음",
                  "message": "요청을 처리할 수 없어요"
                },
                {
                  "status": 403,
                  "when": "권한 없음",
                  "message": "권한을 해제할 권한이 없어요"
                }
              ]
            },
            {
              "id": "cancelInvite",
              "intent": "초대 취소(초대 수락 대기 철회)",
              "method": "DELETE",
              "path": "/admin/admins/invite/{id}",
              "response": "{canceled:true}",
              "status": 200,
              "auth": "Bearer(admin)",
              "idempotent": true,
              "note": "가역 — 초대 수락 대기('{entities.Member}' status=pending) 건만 취소. 수락 완료 건은 권한 해제(revokeAdmin)로 처리.",
              "target": ".pd-table",
              "errors": [
                {
                  "status": 404,
                  "when": "대상 초대 없음·이미 수락",
                  "message": "취소할 초대를 찾을 수 없어요"
                }
              ]
            },
            {
              "id": "adminLogout",
              "intent": "로그아웃(세션 종료)",
              "method": "POST",
              "path": "/admin/auth/logout",
              "response": "{ok:true}",
              "status": 200,
              "auth": "Bearer(admin)",
              "idempotent": true,
              "note": "세션 종료 후 관리자 로그인(SCR-ADM-001)으로 이동.",
              "target": ".pd-btn",
              "errors": []
            }
          ],
          "events": [
            {
              "name": "admin.invite.sent",
              "intent": "관리자 초대 발송됨",
              "when": "초대 메일 발송(접수) 성공 시 — 목록에 '초대 수락 대기' 반영"
            },
            {
              "name": "admin.revoked",
              "intent": "관리자 권한 해제됨",
              "when": "권한 해제 완료 시(비가역 · 감사로그 기록)"
            },
            {
              "name": "admin.invite.canceled",
              "intent": "관리자 초대 취소됨",
              "when": "초대 수락 대기 건 취소 시"
            },
            {
              "name": "admin.logout",
              "intent": "관리자 로그아웃됨",
              "when": "세션 종료 시 → SCR-ADM-001 이동"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-ADM-003",
              "via": "대시보드 복귀",
              "trigger": ".pd-pagehead"
            },
            {
              "screen": "SCR-ADM-001",
              "via": "로그아웃"
            }
          ]
        }
      },
      {
        "id": "SCR-ADM-018",
        "label": "비밀번호 재설정·최초 설정",
        "href": "c-password-reset.html",
        "surface": "admin",
        "entry": false,
        "status": "wireframed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-018"
        ],
        "context": "관리자 비밀번호 재설정·최초 설정(이메일 토큰 링크). 개설 승인 자동생성 계정 초대 수락 겸용.",
        "components": [
          {
            "role": ".pd-auth-brand",
            "kind": "hero",
            "label": "새 비밀번호 설정 — ○○교회 관리자 계정"
          },
          {
            "role": ".pd-stepper",
            "kind": "stepper",
            "label": "진행 단계 — 요청·메일 확인·새 비밀번호·완료 (3/4 단계)"
          },
          {
            "role": ".pd-form",
            "kind": "form",
            "label": "새 비밀번호 설정 폼 (재설정·최초 설정 공용)"
          },
          {
            "role": ".pd-field",
            "kind": "form",
            "label": "새 비밀번호·새 비밀번호 확인 입력"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "비밀번호 변경하고 로그인",
            "action": {
              "on": "click",
              "do": "go:SCR-ADM-001"
            }
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "로그인으로 돌아가기",
            "action": {
              "on": "click",
              "do": "go:SCR-ADM-001"
            }
          },
          {
            "role": ".pd-wf-label",
            "kind": "text",
            "label": "링크 30분 유효·1회성 · 최초 비밀번호 설정 겸용 안내"
          }
        ],
        "description": [
          {
            "text": "'새 비밀번호 설정' 브랜드 헤더 — ○○교회 관리자 콘솔 계정의 비밀번호를 재설정하거나 최초 설정하는 인증 카드. 교회 선택 없이 진입 서브도메인(JWT tenantId 바인딩)과 메일 링크 토큰으로 대상 계정을 확정",
            "target": ".pd-auth-brand"
          },
          {
            "text": "진행 단계 표시 — 요청→메일 확인→새 비밀번호→완료 4단계. 비밀번호 재설정과 개설 승인 시 자동 생성된 관리자 계정의 '최초 비밀번호 설정'이 같은 화면·링크를 공용하며 토큰 용도(reset/invite)로 분기",
            "target": ".pd-stepper"
          },
          {
            "text": "새 비밀번호·새 비밀번호 확인 입력 — 영문·숫자·기호 포함 10자 이상, 두 입력 일치 필요. 규칙 미달·불일치·이전 비밀번호 재사용 시 제출 차단(클라이언트+서버 검증)",
            "target": ".pd-field"
          },
          {
            "text": "비밀번호 변경하고 로그인 버튼 — 유효 토큰·규칙 충족 시 비밀번호를 변경(초대 토큰이면 계정 활성화)하고 관리자 로그인(SCR-ADM-001)으로 이동. '로그인으로 돌아가기'도 SCR-ADM-001로 이동",
            "target": ".pd-btn"
          },
          {
            "text": "하단 안내 — 재설정·최초 설정 링크는 발송 후 30분간 유효하고 1회성. 만료·사용 시 로그인 화면에서 재요청하도록 안내",
            "target": ".pd-wf-label"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "로그인 화면(SCR-ADM-001)의 '비밀번호 재설정' 클릭 후 진입(토큰 없음)",
            "guard": "토큰 파라미터 없음 → 요청 단계",
            "result": "관리자 이메일 입력 폼 노출('재설정 메일 받기')",
            "message": "",
            "placement": "inline",
            "target": ".pd-form"
          },
          {
            "state": "초기",
            "trigger": "재설정·초대 메일 링크(토큰) 클릭 진입",
            "guard": "유효 토큰 → 새 비밀번호 단계(현재 화면)",
            "result": "새 비밀번호·확인 입력 폼 노출(stepper 3/4 활성)",
            "message": "",
            "placement": "inline",
            "target": ".pd-form",
            "api": {
              "endpoint": "GET /admin/auth/password-setup/{token}",
              "status": 200
            }
          },
          {
            "state": "로딩",
            "trigger": "폼 제출(메일 요청 또는 비밀번호 변경)",
            "guard": "요청 처리 중",
            "result": "제출 버튼 비활성 · 진행 표시",
            "message": "",
            "placement": "inline",
            "target": ".pd-btn"
          },
          {
            "state": "정상",
            "trigger": "'재설정 메일 받기' 제출(요청 단계)",
            "guard": "요청 접수 — 계정 존재 여부는 비노출(열거공격 방지)",
            "result": "메일 발송 안내 노출 · 메일 확인 단계로 유도",
            "message": "입력하신 주소로 재설정 메일을 보냈어요. 메일의 링크로 계속 진행해 주세요.",
            "placement": "banner",
            "target": ".pd-form",
            "api": {
              "endpoint": "POST /admin/auth/password-reset/requests",
              "status": 202
            }
          },
          {
            "state": "정상",
            "trigger": "'비밀번호 변경하고 로그인' 제출(재설정 토큰)",
            "guard": "유효 토큰(purpose=reset)·비밀번호 규칙 충족·두 입력 일치",
            "result": "비밀번호 변경 완료 → 관리자 로그인(SCR-ADM-001)으로 이동",
            "message": "새 비밀번호로 변경했어요. 변경한 비밀번호로 로그인해 주세요.",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "PUT /admin/auth/password-setup/{token}",
              "status": 200
            }
          },
          {
            "state": "정상",
            "trigger": "'비밀번호 변경하고 로그인' 제출(초대 토큰)",
            "guard": "유효 초대 토큰(purpose=invite)·규칙 충족 → 자동 생성 관리자 계정 활성화",
            "result": "최초 비밀번호 설정 완료·계정 활성화 → 관리자 로그인(SCR-ADM-001)으로 이동",
            "message": "관리자 계정 설정을 마쳤어요. 방금 설정한 비밀번호로 로그인해 주세요.",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "PUT /admin/auth/password-setup/{token}",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "화면 진입",
            "guard": "빈데이터: 해당 없음(조회 목록이 없는 입력 폼 화면)",
            "result": "N/A",
            "message": "",
            "placement": "inline",
            "target": ".pd-form"
          },
          {
            "state": "에러",
            "trigger": "토큰 링크 진입 또는 비밀번호 제출",
            "guard": "토큰 만료(30분 초과) 또는 이미 사용됨(1회성)",
            "result": "재설정 재요청 안내 노출",
            "message": "링크가 만료되었거나 이미 사용되었어요. 재설정 메일을 다시 요청해 주세요.",
            "placement": "banner",
            "target": ".pd-form",
            "api": {
              "endpoint": "PUT /admin/auth/password-setup/{token}",
              "status": 410
            }
          },
          {
            "state": "에러",
            "trigger": "폼 제출",
            "guard": "서버 오류",
            "result": "처리 실패 · 재시도 안내",
            "message": "일시적인 오류로 처리하지 못했어요. 잠시 후 다시 시도해 주세요.",
            "placement": "banner",
            "target": ".pd-form",
            "api": {
              "endpoint": "PUT /admin/auth/password-setup/{token}",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "토큰 없이 새 비밀번호 화면에 직접 접근",
            "guard": "토큰 파라미터 없음·무효 → 임의 변경 차단",
            "result": "접근 차단 → 관리자 로그인(SCR-ADM-001)으로 유도",
            "message": "유효한 재설정 링크로만 접근할 수 있어요. 로그인 화면에서 다시 요청해 주세요.(SCR-ADM-001)",
            "placement": "full-page",
            "target": ".pd-form",
            "api": {
              "endpoint": "GET /admin/auth/password-setup/{token}",
              "status": 404
            }
          },
          {
            "state": "엣지",
            "trigger": "재설정 메일 반복 요청",
            "guard": "짧은 시간 내 과다 요청(레이트리밋)",
            "result": "요청 차단 · 대기 안내",
            "message": "메일 요청이 많아요. 잠시 후 다시 시도해 주세요.",
            "placement": "banner",
            "target": ".pd-form",
            "api": {
              "endpoint": "POST /admin/auth/password-reset/requests",
              "status": 429
            }
          },
          {
            "state": "엣지",
            "trigger": "변경 완료 후 같은 토큰으로 재제출(멱등)",
            "guard": "소비된 1회성 토큰 재사용",
            "result": "중복 처리 없이 완료 상태 유지 · 로그인(SCR-ADM-001) 유도",
            "message": "이미 변경이 완료된 링크예요. 로그인 화면에서 로그인해 주세요.(SCR-ADM-001)",
            "placement": "banner",
            "target": ".pd-btn",
            "api": {
              "endpoint": "PUT /admin/auth/password-setup/{token}",
              "status": 410
            }
          },
          {
            "state": "입력검증",
            "trigger": "비밀번호 변경 제출",
            "guard": "필수누락 — 새 비밀번호 또는 확인 미입력(요청 단계면 이메일 미입력)",
            "result": "제출 차단(클라이언트 검증)",
            "message": "새 비밀번호와 확인을 모두 입력해 주세요.",
            "placement": "inline",
            "target": ".pd-field"
          },
          {
            "state": "입력검증",
            "trigger": "비밀번호 변경 제출",
            "guard": "형식오류 — 영문·숫자·기호 조합 규칙 미충족(요청 단계면 이메일 형식오류)",
            "result": "제출 차단",
            "message": "영문·숫자·기호를 포함해 10자 이상으로 입력해 주세요.",
            "placement": "inline",
            "target": ".pd-field",
            "api": {
              "endpoint": "PUT /admin/auth/password-setup/{token}",
              "status": 400
            }
          },
          {
            "state": "입력검증",
            "trigger": "비밀번호 변경 제출",
            "guard": "범위경계 — 길이 10자 미만(경계값 9자)",
            "result": "제출 차단",
            "message": "비밀번호는 10자 이상이어야 해요.",
            "placement": "inline",
            "target": ".pd-field"
          },
          {
            "state": "입력검증",
            "trigger": "비밀번호 변경 제출",
            "guard": "중복충돌 — 새 비밀번호와 확인 불일치, 또는 직전 사용 비밀번호 재사용",
            "result": "제출 차단",
            "message": "두 비밀번호가 일치하지 않거나 이전과 같은 비밀번호예요. 다시 확인해 주세요.",
            "placement": "inline",
            "target": ".pd-field",
            "api": {
              "endpoint": "PUT /admin/auth/password-setup/{token}",
              "status": 422
            }
          },
          {
            "state": "입력검증",
            "trigger": "비밀번호 변경 제출",
            "guard": "유효 — 규칙 충족·두 입력 일치",
            "result": "제출 허용 → 변경 처리",
            "message": "",
            "placement": "inline",
            "target": ".pd-field"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "loadAdminBranding",
              "intent": "재설정 화면 교회 브랜딩 로드",
              "method": "GET",
              "path": "/churches/{slug}/branding",
              "params": "slug=진입 서브도메인(공개 식별)",
              "response": "'{entities.Church}' (name·logo·primaryColor — '○○교회' 헤더 렌더)",
              "auth": "none(공개)",
              "target": ".pd-auth-brand",
              "errors": [
                {
                  "status": 404,
                  "when": "존재하지 않는 교회 슬러그",
                  "message": "요청하신 교회를 찾을 수 없어요."
                },
                {
                  "status": 500,
                  "when": "브랜딩 로드 실패",
                  "message": "화면 정보를 불러오지 못했어요. 새로고침해 주세요."
                }
              ]
            },
            {
              "id": "loadResetTokenContext",
              "intent": "재설정·초대 토큰 유효성·용도 확인",
              "method": "GET",
              "path": "/admin/auth/password-setup/{token}",
              "params": "token=메일 링크 1회성 토큰(path)",
              "response": "{purpose:(reset|invite), loginIdMasked, churchName, expiresAt} — 토큰 유효성과 용도(재설정/최초 설정) 판별, 대상 주체 '{entities.Member}'(role=admin)",
              "auth": "none(공개·토큰 보유)",
              "target": ".pd-form",
              "errors": [
                {
                  "status": 404,
                  "when": "토큰 없음·무효(링크 없이 직접 접근) → 권한없음 유도",
                  "message": "유효한 재설정 링크로만 접근할 수 있어요.(SCR-ADM-001)"
                },
                {
                  "status": 410,
                  "when": "토큰 만료(30분 초과)·이미 사용됨",
                  "message": "링크가 만료되었거나 이미 사용되었어요. 재설정 메일을 다시 요청해 주세요."
                },
                {
                  "status": 500,
                  "when": "토큰 확인 실패",
                  "message": "화면 정보를 불러오지 못했어요. 새로고침해 주세요."
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "requestPasswordReset",
              "intent": "재설정 메일 요청",
              "method": "POST",
              "path": "/admin/auth/password-reset/requests",
              "body": "{email 또는 loginId} — 테넌트는 진입 서브도메인({slug})으로 확정(path 비노출)",
              "response": "202 접수 — 계정 존재 여부를 응답에 노출하지 않음(열거공격 방지). 메일 발송은 비동기, 대상 '{entities.Member}'(role=admin)",
              "auth": "none(공개)",
              "idempotency": "비가역 대량발송(알림 broadcast·Tenant 생성 등)에 해당하지 않아 Idempotency-Key 불필요. 남용·열거공격 방지를 위해 레이트리밋(429) 적용, confirm 불필요",
              "target": ".pd-form",
              "errors": [
                {
                  "status": 400,
                  "when": "이메일/아이디 누락·형식오류",
                  "message": "관리자 이메일을 정확히 입력해 주세요."
                },
                {
                  "status": 429,
                  "when": "짧은 시간 내 과다 요청(레이트리밋)",
                  "message": "메일 요청이 많아요. 잠시 후 다시 시도해 주세요."
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "일시적인 오류로 처리하지 못했어요. 잠시 후 다시 시도해 주세요."
                }
              ]
            },
            {
              "id": "setNewPassword",
              "intent": "새 비밀번호 설정(재설정·최초 설정 공용)",
              "method": "PUT",
              "path": "/admin/auth/password-setup/{token}",
              "body": "{newPassword, newPasswordConfirm} — 대상 계정은 token으로 확정(tenantId는 token에 귀속)",
              "response": "200 {role:admin, purpose:(reset|invite), activated:boolean} — 초대 토큰(invite)이면 '{entities.Member}' 활성화, 완료 후 관리자 재로그인(SCR-ADM-001) 필요",
              "auth": "none(공개·1회성 토큰)→완료 후 Bearer(admin) 재로그인",
              "idempotency": "1회성 토큰(소비형)으로 멱등 보장 — 동일 토큰 재호출은 변경을 반복하지 않고 410(사용됨) 반환. 사용자 명시 제출이므로 별도 confirm 불필요, 모든 처리는 감사 로그 기록",
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 400,
                  "when": "비밀번호 규칙 미달(영문·숫자·기호 포함 10자 미만)",
                  "message": "영문·숫자·기호를 포함해 10자 이상으로 입력해 주세요."
                },
                {
                  "status": 410,
                  "when": "토큰 만료·이미 사용",
                  "message": "링크가 만료되었거나 이미 사용되었어요. 재설정 메일을 다시 요청해 주세요."
                },
                {
                  "status": 422,
                  "when": "두 입력 불일치·직전 비밀번호 재사용 등 비즈니스 규칙 위반",
                  "message": "두 비밀번호가 일치하지 않거나 이전과 같은 비밀번호예요. 다시 확인해 주세요."
                },
                {
                  "status": 429,
                  "when": "시도 과다(레이트리밋)",
                  "message": "시도가 많아요. 잠시 후 다시 시도해 주세요."
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "일시적인 오류로 처리하지 못했어요. 잠시 후 다시 시도해 주세요."
                }
              ]
            }
          ],
          "events": [
            {
              "name": "ui.pw_reset.request_submit",
              "when": "'재설정 메일 받기' 버튼 클릭 또는 요청 폼 제출",
              "intent": "재설정 메일 요청 제출",
              "target": ".pd-btn"
            },
            {
              "name": "ui.pw_reset.set_submit",
              "when": "'비밀번호 변경하고 로그인' 버튼 클릭 또는 설정 폼 제출",
              "intent": "새 비밀번호 설정 제출(재설정·최초 설정 공용)",
              "target": ".pd-btn"
            },
            {
              "name": "ui.pw_reset.back_login",
              "when": "'로그인으로 돌아가기' 클릭",
              "intent": "관리자 로그인(SCR-ADM-001) 이동",
              "target": ".pd-btn"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-ADM-001",
              "via": "비밀번호 변경·최초 설정 완료 후 관리자 로그인",
              "trigger": ".pd-btn"
            },
            {
              "screen": "SCR-ADM-001",
              "via": "로그인으로 돌아가기",
              "trigger": ".pd-btn"
            }
          ]
        }
      },
      {
        "id": "SCR-ADM-019",
        "label": "서비스 오픈 완료",
        "href": "c-wizard-done.html",
        "surface": "admin",
        "entry": false,
        "status": "wireframed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-004"
        ],
        "context": "서비스 오픈 완료(공개홈 URL 표시·복사/QR·PWA 설치 안내·다음 할 일 체크리스트).",
        "components": [
          {
            "role": ".pd-done",
            "kind": "feedback",
            "label": "○○교회 서비스가 오픈되었어요 — 서비스 상태 · 활성 (환영형 완료 상태)"
          },
          {
            "role": ".pd-wpanel",
            "kind": "panel",
            "label": "교인에게 공유할 공개홈 주소 — ○○.hurmate.com"
          },
          {
            "role": ".pd-field",
            "kind": "field",
            "label": "공개홈 URL — ○○.hurmate.com (읽기 전용 표시)"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "주소 복사"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "공개홈 열기",
            "action": {
              "on": "click",
              "do": "go:SCR-SITE-001"
            }
          },
          {
            "role": ".pd-qr-area",
            "kind": "media",
            "label": "공개홈 접속 QR — 스캔 시 공개홈 바로 연결"
          },
          {
            "role": ".pd-banner",
            "kind": "banner",
            "label": "앱으로 설치 안내 — iPhone 공유→홈 화면에 추가 · Android 설치 배너 · Web Push iOS 16.4+ · Native 차기 제공"
          },
          {
            "role": ".pd-list",
            "kind": "list",
            "label": "다음 할 일 체크리스트 — 설교·주보·공지 등록 바로가기"
          },
          {
            "role": ".pd-row",
            "kind": "row",
            "label": "설교 등록 — 로마서 강해 12 · 조정표 담임목사 (YouTube URL)",
            "action": {
              "on": "click",
              "do": "go:SCR-ADM-006"
            }
          },
          {
            "role": ".pd-row",
            "kind": "row",
            "label": "주보 업로드 — 이번 주(10/5) 예배 순서",
            "action": {
              "on": "click",
              "do": "go:SCR-ADM-008"
            }
          },
          {
            "role": ".pd-row",
            "kind": "row",
            "label": "공지 작성 — 추수감사주일 안내",
            "action": {
              "on": "click",
              "do": "go:SCR-ADM-009"
            }
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "대시보드로 가기",
            "action": {
              "on": "click",
              "do": "go:SCR-ADM-003"
            }
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "첫 설교 등록하기",
            "action": {
              "on": "click",
              "do": "go:SCR-ADM-006"
            }
          }
        ],
        "description": [
          {
            "text": "완료 히어로(.pd-done) — Wizard STEP8 '서비스 오픈(OPEN)' 성공 직후 진입하는 환영형 완료 상태. ○○교회 status=활성 전환·공개홈 노출 확정을 아웃라인 체크 아이콘과 함께 확인시키고, '서비스 상태 · 활성' 뱃지로 결과를 명시한다",
            "target": ".pd-done"
          },
          {
            "text": "공개홈 주소 패널(.pd-wpanel) — 교인에게 공유할 공개홈 URL({slug}.hurmate.com, 목업=○○.hurmate.com)을 표시하고 '주소 복사'(클립보드)·'공개홈 열기'(공개홈 SCR-SITE-001) 액션과 접속 QR을 함께 제공한다. 미확보 교회 소개·오시는 길 항목은 '교회 확인 후 게재'로 정직하게 안내한다",
            "target": ".pd-wpanel"
          },
          {
            "text": "접속 QR(.pd-qr-area) — 공개홈 URL을 담은 QR. 주보·게시판에 넣어 교인이 스캔 한 번으로 공개홈에 접속하도록 돕는다",
            "target": ".pd-qr-area"
          },
          {
            "text": "설치 안내 배너(.pd-banner) — 홈 화면 설치 시 교회 로고·교회명 아이콘, iPhone(Safari) 공유→'홈 화면에 추가', Android(Chrome) 설치 배너, Web Push는 iOS 16.4+ 설치 시 가능, Native 앱은 차기 제공을 정직하게 표기하고 설치 안내(SCR-SITE-007 미리보기)·PWA 관리(SCR-ADM-014)로 연결한다",
            "target": ".pd-banner"
          },
          {
            "text": "다음 할 일 체크리스트(.pd-list/.pd-row) — 오픈 직후 가장 먼저 할 일을 설교 등록(SCR-ADM-006)·주보 업로드(SCR-ADM-008)·공지 작성(SCR-ADM-009) 바로가기 행으로 묶어 '할 일' 뱃지와 함께 안내한다. 하단 CTA로 대시보드(SCR-ADM-003)·첫 설교 등록(SCR-ADM-006)으로 이동한다",
            "target": ".pd-list"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "Wizard STEP8 '서비스 오픈(OPEN)' 성공 후 리다이렉트 진입",
            "guard": "church.opened 이벤트 수신 · church.status=활성",
            "result": "완료 히어로·공개홈 주소·QR·다음 할 일 체크리스트 노출",
            "message": "○○교회 서비스가 오픈되었어요",
            "placement": "summary",
            "target": ".pd-done",
            "api": {
              "endpoint": "GET /admin/church/overview",
              "status": 200
            }
          },
          {
            "state": "로딩",
            "trigger": "진입·새로고침",
            "guard": "오픈 요약(공개홈 URL·QR·콘텐츠 건수) 조회 응답 대기",
            "result": "완료 히어로·주소 패널·체크리스트 스켈레톤 표시",
            "message": "오픈 정보를 불러오는 중이에요",
            "placement": "inline",
            "target": ".pd-wpanel",
            "api": {
              "endpoint": "GET /admin/church/overview",
              "status": "응답 대기"
            }
          },
          {
            "state": "정상",
            "trigger": "오픈 요약 조회 성공",
            "guard": "church.status=활성 · ChannelConfig(web/pwa/webPush) 활성 · PwaConfig manifest 생성",
            "result": "공개홈 URL(○○.hurmate.com)·QR·설치 안내·체크리스트 정상 노출",
            "message": "",
            "placement": "inline",
            "target": ".pd-wpanel",
            "api": {
              "endpoint": "GET /admin/church/overview",
              "status": 200
            }
          },
          {
            "state": "정상",
            "trigger": "'주소 복사' 클릭",
            "guard": "브라우저 Clipboard API 지원",
            "result": "공개홈 URL({slug}.hurmate.com) 클립보드 복사(클라이언트 액션·서버 쓰기 없음)",
            "message": "공개홈 주소를 복사했어요",
            "placement": "toast",
            "target": ".pd-btn"
          },
          {
            "state": "빈데이터",
            "trigger": "오픈 직후 첫 콘텐츠 미등록 상태",
            "guard": "설교·주보·공지 건수 0 (counts.sermon=0, bulletin=0, notice=0)",
            "result": "체크리스트 3행 모두 '할 일' 뱃지로 강조 · CTA로 첫 콘텐츠 등록 유도",
            "message": "아직 등록한 설교·주보·공지가 없어요. 첫 콘텐츠를 올려 교인에게 공개홈을 채워주세요",
            "placement": "inline",
            "target": ".pd-list"
          },
          {
            "state": "에러",
            "trigger": "진입·새로고침",
            "guard": "오픈 요약 조회 서버 오류(500)",
            "result": "요약 정보 미표시 · 완료 히어로는 유지하고 재시도 안내",
            "message": "오픈 정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요",
            "placement": "banner",
            "target": ".pd-wpanel",
            "api": {
              "endpoint": "GET /admin/church/overview",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "진입",
            "guard": "JWT 없음/세션 만료(401) 또는 role≠admin·타 교회 스코프(403)",
            "result": "접근 차단 후 관리자 로그인(SCR-ADM-001)으로 유도",
            "message": "관리자 로그인이 필요해요",
            "placement": "full-page",
            "target": ".pd-done",
            "api": {
              "endpoint": "GET /admin/church/overview",
              "status": 401
            }
          },
          {
            "state": "엣지",
            "trigger": "아직 오픈하지 않은 교회가 완료 URL(c-wizard-done.html) 직접 접근",
            "guard": "church.status≠활성(미오픈)",
            "result": "완료 화면 대신 개설 설정 Wizard(SCR-ADM-002)로 유도",
            "message": "아직 서비스가 오픈되지 않았어요. 개설 설정을 마치고 오픈해 주세요",
            "placement": "modal",
            "target": ".pd-done",
            "api": {
              "endpoint": "GET /admin/church/overview",
              "status": 409
            }
          },
          {
            "state": "엣지",
            "trigger": "'주소 복사' 클릭",
            "guard": "Clipboard API 미지원·비보안(비 HTTPS) 컨텍스트",
            "result": "자동 복사 불가 · URL 수동 선택 복사 안내",
            "message": "자동 복사가 안 돼요. 주소를 길게 눌러 복사해 주세요",
            "placement": "toast",
            "target": ".pd-btn"
          },
          {
            "state": "입력검증",
            "trigger": "해당 없음",
            "guard": "편집 가능한 입력 폼 없음 — 공개홈 URL은 읽기 전용 표시(.pd-input ph), '주소 복사'는 클립보드 클라이언트 액션. 필수누락·형식오류·범위경계·중복충돌 검증 대상 없음",
            "result": "입력검증 5종 N/A",
            "message": "",
            "placement": "inline",
            "target": ".pd-field"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "churchOpenOverview",
              "intent": "서비스 오픈 완료 요약 조회(공개홈 주소·QR·콘텐츠 건수)",
              "method": "GET",
              "path": "/admin/church/overview",
              "params": "tenantId=JWT(path 비노출·본인 교회 스코프)",
              "response": "{ church: '{entities.Church}'(slug·name·status), publicUrl: '{slug}.hurmate.com', qrImageUrl, channel: '{entities.ChannelConfig}'(web/pwa/webPush), pwa: '{entities.PwaConfig}'(name·icon), counts: { sermon, bulletin, notice } }",
              "auth": "Bearer(admin)",
              "target": ".pd-wpanel",
              "errors": [
                {
                  "status": 401,
                  "when": "미인증·세션 만료",
                  "message": "관리자 로그인이 필요해요"
                },
                {
                  "status": 403,
                  "when": "비관리자·타 교회 스코프 접근",
                  "message": "이 교회를 관리할 권한이 없어요"
                },
                {
                  "status": 409,
                  "when": "아직 오픈하지 않은 교회(status≠활성) 직접 접근",
                  "message": "아직 서비스가 오픈되지 않았어요. 개설 설정을 마치고 오픈해 주세요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "오픈 정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요"
                }
              ]
            }
          ],
          "writes": [],
          "writesNote": "이 화면은 조회·이동 전용 터미널 확인 화면이다. '주소 복사'는 클라이언트 클립보드 액션(서버 쓰기 없음), 체크리스트/CTA는 다른 화면으로의 이동이다. 비가역 쓰기(서비스 오픈=POST /admin/church/open · Idempotency-Key·confirm·감사로그)는 선행 화면 SCR-ADM-002에서 수행되며 여기서는 재실행되지 않는다(멱등·중복 오픈 차단).",
          "events": [
            {
              "id": "churchOpenedLanded",
              "name": "church.opened.landed",
              "intent": "서비스 오픈 완료 진입",
              "when": "선행 church.opened 성공 후 완료 화면 리다이렉트",
              "effect": "'{entities.Church}'.status=활성 확인 · 공개홈({slug}.hurmate.com) 노출 상태 표시 · 온보딩 완료 화면 노출"
            },
            {
              "id": "shareLinkCopied",
              "name": "share.link.copied",
              "intent": "공개홈 주소 복사",
              "when": "'주소 복사' 버튼 클릭",
              "effect": "공개홈 URL({slug}.hurmate.com)을 클립보드에 복사(클라이언트) · '공개홈 주소를 복사했어요' 토스트"
            },
            {
              "id": "onboardingChecklistClicked",
              "name": "onboarding.checklist.clicked",
              "intent": "다음 할 일 바로가기",
              "when": "체크리스트 행(설교·주보·공지) 클릭",
              "effect": "설교 등록(SCR-ADM-006)·주보 업로드(SCR-ADM-008)·공지 작성(SCR-ADM-009) 화면으로 이동"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-ADM-003",
              "via": "'대시보드로 가기' — 관리자 대시보드"
            },
            {
              "screen": "SCR-ADM-006",
              "via": "'설교 등록'/'첫 설교 등록하기' — 설교 관리"
            },
            {
              "screen": "SCR-ADM-008",
              "via": "'주보 업로드' — 주보 관리"
            },
            {
              "screen": "SCR-ADM-009",
              "via": "'공지 작성' — 공지 관리"
            },
            {
              "screen": "SCR-SITE-001",
              "via": "'공개홈 열기' — 교회 공개홈"
            }
          ]
        }
      }
    ]
  },
  {
    "category": "슈퍼관리자 (super · console.hurmate.com · PC웹)",
    "pages": [
      {
        "id": "SCR-SUP-001",
        "label": "운영자 로그인",
        "href": "x-login.html",
        "surface": "super",
        "entry": true,
        "status": "confirmed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-020"
        ],
        "context": "HurMate Super Admin 로그인(플랫폼 운영자 전용). 인증 성공 시 Super 대시보드.",
        "components": [
          {
            "role": ".pd-form",
            "kind": "form",
            "label": "운영자 로그인 폼"
          },
          {
            "role": ".pd-field",
            "kind": "field",
            "label": "이메일·비밀번호 입력"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "비밀번호 재설정",
            "action": {
              "on": "click",
              "do": "go:SCR-SUP-002"
            }
          }
        ],
        "description": [
          {
            "text": "훌메이트 플랫폼 운영 콘솔 로그인 — '여러 교회(테넌트)를 운영하는 슈퍼관리자' 전용으로, 교회 관리자 콘솔(SCR-ADM-001)과 분리된 플랫폼 운영자 전용 진입",
            "target": ".pd-form"
          },
          {
            "text": "운영자 이메일·비밀번호 입력 — 플랫폼 운영자(PlatformAdmin) 계정만 인증, 교회 선택 없음",
            "target": ".pd-field"
          },
          {
            "text": "2단계 인증(OTP) — 교차테넌트 접근 권한을 보호하기 위한 OTP 추가 인증 옵션"
          },
          {
            "text": "로그인 버튼 — 인증 성공 시 Super 대시보드(SCR-SUP-002)로 이동",
            "target": ".pd-btn"
          },
          {
            "text": "비밀번호 재설정 버튼 — 재설정 메일 요청(전용 재설정 화면은 준비 중)",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입",
            "guard": "미입력",
            "result": "빈 로그인 폼 표시(이메일·비밀번호·OTP 옵션)",
            "message": "",
            "placement": "inline",
            "target": ".pd-form"
          },
          {
            "state": "로딩",
            "trigger": "제출",
            "guard": "인증 요청 중(중복 제출 방지)",
            "result": "로그인 버튼 비활성·스피너 표시",
            "message": "로그인 중입니다",
            "placement": "inline",
            "target": ".pd-btn"
          },
          {
            "state": "정상",
            "trigger": "제출",
            "guard": "이메일·비밀번호·OTP 일치",
            "result": "세션(JWT·role=super) 발급 후 Super 대시보드 이동, 로그인 성공 감사로그 기록",
            "message": "",
            "placement": "inline",
            "target": ".pd-btn",
            "api": {
              "endpoint": "POST /super/auth/login",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "해당 없음",
            "guard": "빈데이터: 해당 없음 — 조회 목록이 없는 인증 전용 화면",
            "result": "N/A",
            "message": "",
            "placement": "inline",
            "target": ".pd-form"
          },
          {
            "state": "에러",
            "trigger": "제출",
            "guard": "이메일·비밀번호 불일치",
            "result": "로그인 실패·재입력 요구, 실패 감사로그 기록",
            "message": "이메일 또는 비밀번호를 확인해 주세요",
            "placement": "inline",
            "target": ".pd-field",
            "api": {
              "endpoint": "POST /super/auth/login",
              "status": 401
            }
          },
          {
            "state": "에러",
            "trigger": "제출",
            "guard": "인증 서버 오류",
            "result": "로그인 처리 실패",
            "message": "로그인 처리 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요",
            "placement": "banner",
            "target": ".pd-form",
            "api": {
              "endpoint": "POST /super/auth/login",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "제출",
            "guard": "운영자 권한 없는 계정(교회 관리자·교인)",
            "result": "접근 거부, 보안 이벤트 감사로그 기록",
            "message": "플랫폼 운영자만 접근할 수 있는 콘솔입니다",
            "placement": "inline",
            "target": ".pd-form",
            "api": {
              "endpoint": "POST /super/auth/login",
              "status": 403
            }
          },
          {
            "state": "엣지",
            "trigger": "제출",
            "guard": "2단계 인증(OTP) 코드 불일치·만료",
            "result": "재인증 요구(OTP 재입력)",
            "message": "인증 코드가 올바르지 않거나 만료되었어요. 다시 입력해 주세요",
            "placement": "inline",
            "api": {
              "endpoint": "POST /super/auth/login",
              "status": 422
            }
          },
          {
            "state": "엣지",
            "trigger": "제출",
            "guard": "반복 실패로 레이트리밋 초과",
            "result": "일시 잠금·대기 안내",
            "message": "로그인 시도가 많습니다. 잠시 후 다시 시도해 주세요",
            "placement": "banner",
            "target": ".pd-form",
            "api": {
              "endpoint": "POST /super/auth/login",
              "status": 429
            }
          },
          {
            "state": "입력검증·필수누락",
            "trigger": "제출",
            "guard": "이메일·비밀번호 미입력",
            "result": "제출 차단·필드 포커스",
            "message": "이메일과 비밀번호를 모두 입력해 주세요",
            "placement": "inline",
            "target": ".pd-field",
            "api": {
              "endpoint": "POST /super/auth/login",
              "status": 400
            }
          },
          {
            "state": "입력검증·형식오류",
            "trigger": "제출",
            "guard": "이메일 형식 오류",
            "result": "제출 차단·형식 안내",
            "message": "이메일 주소 형식을 확인해 주세요",
            "placement": "inline",
            "target": ".pd-field",
            "api": {
              "endpoint": "POST /super/auth/login",
              "status": 400
            }
          },
          {
            "state": "입력검증·중복충돌",
            "trigger": "제출",
            "guard": "중복충돌: 해당 없음 — 신규 생성이 아닌 인증 화면",
            "result": "N/A",
            "message": "",
            "placement": "inline",
            "target": ".pd-form"
          },
          {
            "state": "입력검증·유효",
            "trigger": "제출",
            "guard": "이메일 형식·필수·OTP 충족",
            "result": "클라이언트 검증 통과·인증 요청 전송",
            "message": "",
            "placement": "inline",
            "target": ".pd-btn",
            "api": {
              "endpoint": "POST /super/auth/login",
              "status": 200
            }
          }
        ],
        "interface": {
          "reads": [],
          "writes": [
            {
              "id": "superLogin",
              "intent": "운영자 인증(2단계 OTP)",
              "method": "POST",
              "path": "/super/auth/login",
              "request": "{email, password, otp}",
              "response": "{token, scope}",
              "auth": "none(공개)",
              "target": ".pd-btn",
              "idempotency": false,
              "confirm": false,
              "audit": "슈퍼 로그인 성공·실패·차단 전 건 감사로그(인증은 비가역 전이 아님 → Idempotency-Key 불요)",
              "errors": [
                {
                  "status": 400,
                  "when": "필수 누락·이메일 형식 오류",
                  "message": "이메일과 비밀번호를 올바른 형식으로 입력해 주세요"
                },
                {
                  "status": 401,
                  "when": "이메일·비밀번호 불일치",
                  "message": "이메일 또는 비밀번호를 확인해 주세요"
                },
                {
                  "status": 403,
                  "when": "운영자 권한 없는 계정",
                  "message": "플랫폼 운영자만 접근할 수 있는 콘솔입니다"
                },
                {
                  "status": 422,
                  "when": "OTP 코드 불일치·만료",
                  "message": "인증 코드가 올바르지 않거나 만료되었어요. 다시 입력해 주세요"
                },
                {
                  "status": 429,
                  "when": "반복 실패 레이트리밋",
                  "message": "로그인 시도가 많습니다. 잠시 후 다시 시도해 주세요"
                },
                {
                  "status": 500,
                  "when": "인증 서버 오류",
                  "message": "로그인 처리 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요"
                }
              ]
            },
            {
              "id": "superPasswordReset",
              "intent": "비밀번호 재설정 메일 요청",
              "method": "POST",
              "path": "/super/auth/password-reset",
              "request": "{email}",
              "response": "{accepted}",
              "auth": "none(공개)",
              "target": ".pd-btn",
              "idempotency": false,
              "confirm": false,
              "note": "전용 재설정 화면은 준비 중 — 계정 존재 노출 방지를 위해 미등록 계정도 동일(202) 응답",
              "errors": [
                {
                  "status": 400,
                  "when": "이메일 형식 오류",
                  "message": "이메일 주소 형식을 확인해 주세요"
                },
                {
                  "status": 429,
                  "when": "재설정 요청 과다",
                  "message": "요청이 많습니다. 잠시 후 다시 시도해 주세요"
                }
              ]
            }
          ],
          "events": [
            {
              "name": "super.login.success",
              "when": "인증 성공",
              "intent": "운영자 로그인 성공"
            },
            {
              "name": "super.login.failed",
              "when": "자격·OTP 불일치",
              "intent": "운영자 로그인 실패(감사로그)"
            },
            {
              "name": "super.login.blocked",
              "when": "권한 없음·레이트리밋 차단",
              "intent": "운영자 로그인 차단(보안 이벤트)"
            },
            {
              "name": "super.password_reset.requested",
              "when": "재설정 메일 요청",
              "intent": "운영자 비밀번호 재설정 요청"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-SUP-002",
              "via": "로그인 성공"
            }
          ]
        }
      },
      {
        "id": "SCR-SUP-002",
        "label": "Super 대시보드",
        "href": "x-dashboard.html",
        "surface": "super",
        "entry": false,
        "status": "wireframed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-020"
        ],
        "context": "플랫폼 대시보드 — 전체 교회 수·신규 개설 신청(처리대기)·활성/일시정지/해지·결제 현황·서비스 상태 KPI.",
        "components": [
          {
            "role": ".pd-kpi",
            "kind": "kpi",
            "label": "전체 교회 · 활성 · 일시정지 · 해지"
          },
          {
            "role": ".pd-stat",
            "kind": "stat",
            "label": "신규 개설 신청 · 처리 대기(심사)",
            "action": {
              "on": "click",
              "do": "go:SCR-SUP-004"
            }
          },
          {
            "role": ".pd-wpanel",
            "kind": "card",
            "label": "서비스 상태 모니터",
            "action": {
              "on": "click",
              "do": "go:SCR-SUP-008"
            }
          },
          {
            "role": ".pd-table",
            "kind": "table",
            "label": "전체 교회 현황",
            "action": {
              "on": "click",
              "do": "go:SCR-SUP-003"
            }
          }
        ],
        "description": [
          {
            "text": "전체 교회·상태 집계 KPI — 전체 교회 6·활성 4·일시정지 1·해지 1(데모·tenant 격리). 활성 항목은 월 구독·금액 미확정 표기",
            "target": ".pd-kpi"
          },
          {
            "text": "신규 개설 신청 · 처리 대기(심사) 건수(데모 2건) — 승인 전에는 공개 노출 안 됨, 클릭 시 개설 검토·승인(SCR-SUP-004). 승인 시 church_id 자동 할당·tenant 발행",
            "target": ".pd-stat"
          },
          {
            "text": "서비스 상태 모니터 — PWA 서비스(정상)·WebPush 알림(준비 중)·Native App(차기 과제)·스토리지 단일 DS(격리), 행 클릭 시 서비스 콘솔(SCR-SUP-008)",
            "target": ".pd-wpanel"
          },
          {
            "text": "결제 현황 — 구독 금액 미확정(교회 확인 후 게재), 활성 구독 4곳(데모·월 구독 기준). 정식 요금은 확정 시 반영",
            "target": ".pd-wpanel"
          },
          {
            "text": "전체 교회 현황 테이블 — 교회·도메인·요금제·회원수·서비스·결제; 운영중 교회 상세는 전체 교회 관리(SCR-SUP-003), 심사 대기 행은 개설 검토·승인(SCR-SUP-004)",
            "target": ".pd-table"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입(최초 렌더)",
            "guard": "운영자 토큰 유효 · 집계 응답 도착 전",
            "result": "KPI·패널·테이블 스켈레톤 노출",
            "message": "",
            "placement": "inline",
            "target": ".pd-kpi"
          },
          {
            "state": "로딩",
            "trigger": "플랫폼 집계 조회",
            "guard": "GET /super/dashboard 응답 대기",
            "result": "스켈레톤 유지 + 진행 표시",
            "message": "현황을 불러오는 중입니다",
            "placement": "inline",
            "target": ".pd-kpi",
            "api": {
              "endpoint": "GET /super/dashboard",
              "status": 0
            }
          },
          {
            "state": "정상",
            "trigger": "응답 수신",
            "guard": "role=super · 교회 1곳 이상",
            "result": "집계 KPI·처리 대기·서비스 상태·결제 현황·전체 교회 테이블 표시",
            "message": "",
            "placement": "summary",
            "target": ".pd-kpi",
            "api": {
              "endpoint": "GET /super/dashboard",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답 수신",
            "guard": "개설 승인 이력 0 · 교회 0곳",
            "result": "테이블 빈 상태 + 개설 검토·승인 유도",
            "message": "아직 개설된 교회가 없어요. 개설 검토·승인에서 신청 건을 승인하면 교회가 추가됩니다.",
            "placement": "inline",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /super/dashboard",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "응답 수신",
            "guard": "서버 오류(5xx)",
            "result": "집계 실패 · 재시도 안내",
            "message": "현황을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.",
            "placement": "banner",
            "target": ".pd-kpi",
            "api": {
              "endpoint": "GET /super/dashboard",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "진입 또는 응답",
            "guard": "미인증(401) 또는 role≠super(403, 토큰 만료·일반 관리자 접근)",
            "result": "운영자 로그인(SCR-SUP-001)으로 유도 · 교차테넌트 접근 감사로그 기록",
            "message": "운영자 권한이 필요합니다. 운영자 로그인 후 다시 시도해 주세요.",
            "placement": "full-page",
            "target": ".pd-kpi",
            "api": {
              "endpoint": "GET /super/dashboard",
              "status": 403
            }
          },
          {
            "state": "엣지",
            "trigger": "응답 수신(부분 확정)",
            "guard": "서비스 채널 일부 미구성(WebPush 준비 중·Native 차기) 또는 요금 미확정·심사 대기 교회 혼재",
            "result": "미확정 항목은 '준비 중'·'차기 과제'·'미확정'·'노출 전'으로 정직하게 표기(허위 상태 금지)",
            "message": "일부 서비스·요금 정보는 아직 준비 중이거나 미확정입니다.",
            "placement": "inline",
            "target": ".pd-wpanel",
            "api": {
              "endpoint": "GET /super/dashboard",
              "status": 200
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "superDashboardKpi",
              "intent": "플랫폼 집계(교회 수·상태별)",
              "method": "GET",
              "path": "/super/dashboard",
              "response": "{ total:int, active:int, suspended:int, canceled:int, churches:'{entities.Church}'[], billing:'{entities.Subscription}'[] }",
              "auth": "Bearer(super)",
              "target": ".pd-kpi",
              "errors": [
                {
                  "status": 401,
                  "when": "미인증(토큰 없음·만료)",
                  "message": "운영자 로그인이 필요합니다"
                },
                {
                  "status": 403,
                  "when": "role≠super(교차테넌트 권한 없음)",
                  "message": "운영자 권한이 필요합니다"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "현황을 불러오지 못했어요"
                }
              ]
            },
            {
              "id": "superPendingApplications",
              "intent": "신규 개설 신청(처리 대기) 집계",
              "method": "GET",
              "path": "/super/applications?status=검토&cursor=&limit=20",
              "response": "'{entities.OnboardingApplication}'[] (status=신청·검토, 승인 전 공개 미노출)",
              "auth": "Bearer(super)",
              "target": ".pd-stat",
              "errors": [
                {
                  "status": 401,
                  "when": "미인증",
                  "message": "운영자 로그인이 필요합니다"
                },
                {
                  "status": 403,
                  "when": "권한 없음",
                  "message": "운영자 권한이 필요합니다"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "처리 대기 건을 불러오지 못했어요"
                }
              ]
            },
            {
              "id": "superServiceStatus",
              "intent": "서비스 상태 모니터(PWA·WebPush·Native·Storage)",
              "method": "GET",
              "path": "/super/service-status",
              "response": "{ channel:'{entities.ChannelConfig}', pwa:'{entities.PwaConfig}', app:'{entities.AppConfig}', webPush:'{entities.PushSubscription}' summary }",
              "auth": "Bearer(super)",
              "target": ".pd-wpanel",
              "errors": [
                {
                  "status": 403,
                  "when": "권한 없음",
                  "message": "운영자 권한이 필요합니다"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "서비스 상태를 불러오지 못했어요"
                }
              ]
            },
            {
              "id": "superTenants",
              "intent": "전체 교회 현황(교회·도메인·요금제·서비스·결제)",
              "method": "GET",
              "path": "/super/churches?cursor=&limit=20",
              "response": "'{entities.Church}'[] + '{entities.Domain}' + '{entities.Subscription}' (요금 미확정 표기)",
              "auth": "Bearer(super)",
              "target": ".pd-table",
              "errors": [
                {
                  "status": 403,
                  "when": "권한 없음",
                  "message": "운영자 권한이 필요합니다"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "교회 목록을 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [],
          "events": [
            {
              "name": "dashboard.openOnboarding",
              "intent": "개설 검토·승인 열기",
              "when": "신규 개설 신청(처리 대기) 타일 클릭",
              "target": ".pd-stat",
              "to": "SCR-SUP-004"
            },
            {
              "name": "dashboard.openConsole",
              "intent": "서비스 콘솔 열기",
              "when": "서비스 상태 모니터 패널/행 클릭",
              "target": ".pd-wpanel",
              "to": "SCR-SUP-008"
            },
            {
              "name": "dashboard.openTenants",
              "intent": "전체 교회 관리 열기",
              "when": "전체 교회 현황 테이블 행·상세 클릭",
              "target": ".pd-table",
              "to": "SCR-SUP-003"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-SUP-003",
              "via": "전체 교회 관리",
              "trigger": ".pd-table"
            },
            {
              "screen": "SCR-SUP-004",
              "via": "개설 검토·승인",
              "trigger": ".pd-stat"
            },
            {
              "screen": "SCR-SUP-008",
              "via": "서비스 콘솔",
              "trigger": ".pd-wpanel"
            }
          ]
        }
      },
      {
        "id": "SCR-SUP-003",
        "label": "전체 교회 관리",
        "href": "x-tenants.html",
        "surface": "super",
        "entry": false,
        "status": "confirmed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-020"
        ],
        "context": "전체 교회 목록 — 교회명·Tenant ID·도메인·가입일·요금제·회원수·관리자수·PWA·App·서비스 상태·결제 상태. 상태 전이(활성↔일시정지→해지).",
        "components": [
          {
            "role": ".pd-table",
            "kind": "table",
            "label": "교회(테넌트) 목록 — 교회명·slug·요금제·서비스 상태",
            "action": {
              "on": "click",
              "do": "go:SCR-SUP-005"
            }
          },
          {
            "role": ".pd-badge",
            "kind": "badge",
            "label": "서비스 상태 뱃지(운영중·심사대기)"
          }
        ],
        "description": [
          {
            "text": "전체 교회 목록 테이블 — 교회명·slug·요금제(금액 미확정)·서비스 상태를 한 행씩 보여주고, 행을 누르면 테넌트 상세(SCR-SUP-005)로 이동한다.",
            "target": ".pd-table"
          },
          {
            "text": "서비스 상태 뱃지 — 각 교회의 현재 상태(운영중·심사대기 등)를 색으로 구분해 노출 전/운영중을 한눈에 식별한다.",
            "target": ".pd-badge"
          },
          {
            "text": "'+ 교회 발행' 버튼 — 개설 검토·승인(SCR-SUP-004)으로 이동해 신청을 검토하고 승인 시 새 교회 테넌트를 발행한다."
          },
          {
            "text": "상단 운영 KPI 카드 — 전체 교회·활성 구독·심사 대기·이번 달 발행 건수를 요약한다(단일 Design System·금액 미확정)."
          },
          {
            "text": "서비스 상태 전이(일시정지·해지)는 비가역이므로 확인 모달 + 멱등키로 처리하고, 슈퍼의 교차테넌트 접근은 모두 감사로그에 기록된다."
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "화면 진입",
            "guard": "슈퍼 인증·권한 확인 전",
            "result": "테이블·KPI 스켈레톤만 노출",
            "message": "",
            "placement": "inline",
            "target": ".pd-table"
          },
          {
            "state": "로딩",
            "trigger": "교회 목록 조회 요청",
            "guard": "GET /super/tenants 응답 대기",
            "result": "스켈레톤 유지·로딩 인디케이터 표시",
            "message": "교회 목록을 불러오는 중입니다",
            "placement": "inline",
            "target": ".pd-table"
          },
          {
            "state": "정상",
            "trigger": "조회 성공",
            "guard": "교회 1곳 이상",
            "result": "교회 목록·서비스 상태 뱃지·KPI 표시",
            "message": "",
            "placement": "inline",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /super/tenants?cursor=&limit=20",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "조회 성공",
            "guard": "교회 0곳(또는 필터 결과 없음)",
            "result": "빈 목록 안내·발행 유도 노출",
            "message": "아직 발행된 교회가 없어요. 개설 검토·승인에서 새 교회를 발행하세요.",
            "placement": "inline",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /super/tenants",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "조회 실패",
            "guard": "서버 오류(5xx)",
            "result": "목록 미표시·재시도 안내",
            "message": "교회 목록을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.",
            "placement": "banner",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /super/tenants",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "화면 진입",
            "guard": "role≠super 또는 토큰 만료(401/403)",
            "result": "슈퍼 로그인(SCR-SUP-001)으로 리다이렉트",
            "message": "슈퍼 관리자 권한이 필요합니다. 다시 로그인해 주세요.",
            "placement": "full-page",
            "api": {
              "endpoint": "GET /super/tenants",
              "status": 403
            }
          },
          {
            "state": "엣지",
            "trigger": "상태 전이 충돌",
            "guard": "이미 해지됨 등 전이 불가 상태",
            "result": "상태 미변경·충돌 안내",
            "message": "현재 상태에서는 변경할 수 없습니다. 최신 상태를 확인해 주세요.",
            "placement": "toast",
            "target": ".pd-badge",
            "api": {
              "endpoint": "PATCH /super/tenants/{tenantId}/status",
              "status": 409
            }
          },
          {
            "state": "확인(비가역)",
            "trigger": "일시정지·해지 선택",
            "guard": "비가역 전이 — 확인 필수",
            "result": "확인 모달 노출 후 멱등키로 전이 확정·감사로그 기록",
            "message": "이 교회의 서비스를 변경하면 되돌릴 수 없어요. 계속하시겠어요?",
            "placement": "modal",
            "target": ".pd-badge",
            "api": {
              "endpoint": "PATCH /super/tenants/{tenantId}/status",
              "status": 200
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "tenantList",
              "intent": "전체 교회 조회",
              "method": "GET",
              "path": "/super/tenants?cursor=&limit=20",
              "response": "{entities.Church}[]",
              "auth": "Bearer(super)",
              "target": ".pd-table",
              "errors": [
                {
                  "status": 401,
                  "when": "미인증",
                  "message": "로그인이 필요합니다"
                },
                {
                  "status": 403,
                  "when": "슈퍼 권한 아님",
                  "message": "접근 권한이 없습니다"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "교회 목록을 불러오지 못했습니다"
                }
              ]
            },
            {
              "id": "tenantSummary",
              "intent": "운영 KPI 집계 조회",
              "method": "GET",
              "path": "/super/tenants/summary",
              "response": "{entities.Church}·{entities.Subscription} 집계(전체 교회·활성 구독·심사 대기·이번 달 발행)",
              "auth": "Bearer(super)",
              "errors": [
                {
                  "status": 403,
                  "when": "슈퍼 권한 아님",
                  "message": "접근 권한이 없습니다"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "집계를 불러오지 못했습니다"
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "tenantStatus",
              "intent": "서비스 상태 전이(활성↔일시정지→해지)",
              "method": "PATCH",
              "path": "/super/tenants/{tenantId}/status",
              "request": "{status} — {entities.Church}.status(신청·검토·개설·활성·일시정지·해지)",
              "idempotency": "Idempotency-Key 헤더 필수(멱등)",
              "confirm": "일시정지·해지는 pd-confirm 모달 확인 필수(비가역)",
              "audit": "교차테넌트 상태 전이는 감사로그 기록",
              "auth": "Bearer(super)",
              "errors": [
                {
                  "status": 403,
                  "when": "슈퍼 권한 아님",
                  "message": "접근 권한이 없습니다"
                },
                {
                  "status": 409,
                  "when": "전이 불가 상태",
                  "message": "현재 상태에서는 변경할 수 없습니다"
                },
                {
                  "status": 422,
                  "when": "비즈니스 규칙 위반",
                  "message": "요청한 상태로 전이할 수 없습니다"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "상태를 변경하지 못했습니다"
                }
              ]
            }
          ],
          "events": [
            {
              "name": "tenant.row.clicked",
              "when": "교회 행 클릭",
              "intent": "테넌트 상세(SCR-SUP-005)로 이동",
              "target": ".pd-table"
            },
            {
              "name": "tenant.publish.clicked",
              "when": "'+ 교회 발행' 클릭",
              "intent": "개설 검토·승인(SCR-SUP-004)으로 이동",
              "target": ".pd-new-tenant"
            },
            {
              "name": "tenant.status.changed",
              "when": "상태 전이 확정",
              "intent": "서비스 상태 전이 확정·감사로그 기록"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-SUP-005",
              "via": "테넌트 상세",
              "trigger": ".pd-table"
            }
          ]
        }
      },
      {
        "id": "SCR-SUP-004",
        "label": "개설 검토·승인",
        "href": "x-tenant-new.html",
        "surface": "super",
        "entry": false,
        "status": "confirmed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-003"
        ],
        "context": "신규 개설 신청 검토·승인/반려. 승인 시 Tenant·Church·Admin User·Domain·Storage·Theme·ChannelConfig·PwaConfig·Notification Setting 자동 생성 + 관리자 초대 이메일. 이단심사 게이트는 봉인·개설 승인으로 대체.",
        "components": [
          {
            "role": ".pd-wpanel",
            "kind": "card",
            "label": "교회 정보 — 신청 상세: 교회명(○○교회)·slug 주소(eunsung)·담당자 연락처(010-)·요금제(WEB/WEB+APP). 공개홈 템플릿·이단심사는 V2.0 봉인(단일 Design System·개설 승인으로 대체)"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "발행(개설 승인)·반려·취소 — 하단 액션 버튼(승인=비가역·확인 모달, 취소=전체 교회 관리 복귀)"
          }
        ],
        "description": [
          {
            "text": "처리대기 개설 신청 — 대시보드 처리대기 카드(SCR-SUP-002)에서 진입, 신청 행 선택 시 교회 정보 패널이 열림"
          },
          {
            "text": "교회 정보 패널 — 교회명(○○교회)·slug 주소(eunsung)·담당자 연락처(010-)·요금제(WEB/WEB+APP)를 검토. 목업의 공개홈 템플릿·이단심사 선택은 V2.0에서 봉인(단일 Design System로 템플릿 선택 없음, 이단심사는 슈퍼 개설 승인으로 대체)",
            "target": ".pd-wpanel"
          },
          {
            "text": "발행(개설 승인) — 확인 모달 후 Tenant·Church·Admin·Domain·ChannelConfig·PwaConfig·Notification 자동 생성 + 관리자 초대 이메일 발송, 완료 시 테넌트 상세(SCR-SUP-005)로 이동. 비가역·멱등키",
            "target": ".pd-btn"
          },
          {
            "text": "반려 — 사유 입력 후 신청자에게 통지하고 처리대기 목록으로 복귀",
            "target": ".pd-btn"
          },
          {
            "text": "취소 — 변경 없이 전체 교회 관리(SCR-SUP-003)로 복귀",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "화면 진입",
            "guard": "Super 세션 유효·신청 미선택",
            "result": "처리대기 신청 목록 표시, 교회 정보 패널은 비어 있음",
            "message": "",
            "placement": "inline",
            "target": ".pd-wpanel"
          },
          {
            "state": "로딩",
            "trigger": "신청 행 선택",
            "guard": "상세 응답 대기",
            "result": "교회 정보 패널 스켈레톤 표시",
            "message": "신청 정보를 불러오는 중입니다",
            "placement": "inline",
            "target": ".pd-wpanel",
            "api": {
              "endpoint": "GET /super/applications/{applicationId}",
              "status": 200
            }
          },
          {
            "state": "정상",
            "trigger": "발행(개설 승인) 확인",
            "guard": "slug 미중복·요금제 선택 완료",
            "result": "Tenant·Church·Admin·Domain·ChannelConfig·PwaConfig·Notification 일괄 생성 + 관리자 초대 이메일 발송, 테넌트 상세(SCR-SUP-005)로 이동",
            "message": "개설이 승인되어 교회 서비스가 생성되었습니다. 관리자 초대 메일을 보냈어요",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "POST /super/applications/{applicationId}/approve",
              "status": 201
            }
          },
          {
            "state": "빈데이터",
            "trigger": "목록 응답",
            "guard": "처리대기 0건",
            "result": "빈 상태 안내 표시",
            "message": "처리 대기 중인 개설 신청이 없습니다",
            "placement": "inline",
            "target": ".pd-wpanel",
            "api": {
              "endpoint": "GET /super/applications?status=pending",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "발행(개설 승인)",
            "guard": "프로비저닝 중 서버 오류(일부 리소스 생성 실패)",
            "result": "생성 롤백·재시도 안내",
            "message": "교회 서비스 생성 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요",
            "placement": "banner",
            "target": ".pd-wpanel",
            "api": {
              "endpoint": "POST /super/applications/{applicationId}/approve",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "진입 또는 발행 시도",
            "guard": "Super 권한 아님 또는 토큰 만료",
            "result": "접근 차단·슈퍼 로그인(SCR-SUP-001) 유도",
            "message": "접근 권한이 없습니다. 슈퍼 관리자로 다시 로그인해 주세요",
            "placement": "full-page",
            "target": ".pd-wpanel",
            "api": {
              "endpoint": "GET /super/applications?status=pending",
              "status": 403
            }
          },
          {
            "state": "엣지",
            "trigger": "발행(개설 승인) 또는 재시도",
            "guard": "다른 운영자가 이미 승인/반려 처리함(동시 처리)",
            "result": "멱등키로 중복 생성 차단·현재 상태 안내",
            "message": "이미 다른 운영자가 처리한 신청입니다. 목록을 새로고침해 주세요",
            "placement": "banner",
            "target": ".pd-wpanel",
            "api": {
              "endpoint": "POST /super/applications/{applicationId}/approve",
              "status": 409
            }
          },
          {
            "state": "에러",
            "trigger": "반려 확정",
            "guard": "입력검증: 반려 사유 필수누락",
            "result": "제출 차단·사유 입력 요구",
            "message": "반려 사유를 입력해 주세요",
            "placement": "inline",
            "target": ".pd-btn",
            "api": {
              "endpoint": "POST /super/applications/{applicationId}/reject",
              "status": 400
            }
          },
          {
            "state": "에러",
            "trigger": "발행(개설 승인)",
            "guard": "입력검증: slug 형식오류(영문 소문자·숫자·하이픈 외)",
            "result": "승인 차단",
            "message": "주소(slug)는 영문 소문자·숫자·하이픈만 사용할 수 있어요",
            "placement": "inline",
            "target": ".pd-wpanel",
            "api": {
              "endpoint": "POST /super/applications/{applicationId}/approve",
              "status": 422
            }
          },
          {
            "state": "에러",
            "trigger": "발행(개설 승인)",
            "guard": "입력검증: slug 중복충돌",
            "result": "생성 중단",
            "message": "희망 주소(slug)가 이미 사용 중입니다. 다른 주소로 변경 후 승인해 주세요",
            "placement": "inline",
            "target": ".pd-wpanel",
            "api": {
              "endpoint": "POST /super/applications/{applicationId}/approve",
              "status": 409
            }
          },
          {
            "state": "정상",
            "trigger": "발행(개설 승인) 클릭",
            "guard": "입력검증: 교회명·slug·연락처·요금제 유효",
            "result": "비가역 확인 모달 노출 후 승인 진행",
            "message": "입력값 확인이 끝났어요. 승인하면 교회 서비스가 생성됩니다",
            "placement": "modal",
            "target": ".pd-btn",
            "api": {
              "endpoint": "POST /super/applications/{applicationId}/approve",
              "status": 201
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "applicationList",
              "intent": "처리대기 개설 신청 목록 조회",
              "method": "GET",
              "path": "/super/applications?status=pending&cursor=&limit=20",
              "params": "status=pending, cursor(커서 페이지네이션), limit=20",
              "response": "'{entities.OnboardingApplication}'[]",
              "auth": "Bearer(super)",
              "target": ".pd-wpanel",
              "errors": [
                {
                  "status": 401,
                  "when": "미인증·토큰 만료",
                  "message": "로그인이 필요합니다. 슈퍼 관리자로 로그인해 주세요"
                },
                {
                  "status": 403,
                  "when": "Super 권한 아님",
                  "message": "접근 권한이 없습니다"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "신청 목록을 불러오지 못했습니다"
                }
              ]
            },
            {
              "id": "applicationDetail",
              "intent": "개설 신청 상세 조회(교회정보·요금제·희망 slug)",
              "method": "GET",
              "path": "/super/applications/{applicationId}",
              "response": "'{entities.OnboardingApplication}'",
              "auth": "Bearer(super)",
              "target": ".pd-wpanel",
              "errors": [
                {
                  "status": 404,
                  "when": "신청 없음 또는 이미 처리됨",
                  "message": "해당 신청을 찾을 수 없습니다. 목록을 새로고침해 주세요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "신청 상세를 불러오지 못했습니다"
                }
              ]
            },
            {
              "id": "slugAvailability",
              "intent": "희망 주소(slug) 중복 사전 확인",
              "method": "GET",
              "path": "/super/domains/availability?slug={slug}",
              "params": "slug=eunsung",
              "response": "'{entities.Domain}'",
              "auth": "Bearer(super)",
              "target": ".pd-wpanel",
              "errors": [
                {
                  "status": 409,
                  "when": "slug 이미 사용 중",
                  "message": "희망 주소(slug)가 이미 사용 중입니다"
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "approveApplication",
              "intent": "개설 승인→Tenant 자동 생성",
              "method": "POST",
              "path": "/super/applications/{applicationId}/approve",
              "idempotency": "Idempotency-Key 필수(중복 승인·중복 Tenant 생성 방지)",
              "confirm": "pd-confirm 비가역 확인 모달 필수 — 승인 시 Tenant·Church·Admin·Domain·ChannelConfig·PwaConfig·Notification 일괄 생성 + 관리자 초대 이메일, 감사로그 기록",
              "response": "'{entities.Church}' (+ ChannelConfig·PwaConfig·Domain·Notification 자동 생성)",
              "auth": "Bearer(super)",
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 401,
                  "when": "미인증·토큰 만료",
                  "message": "로그인이 필요합니다"
                },
                {
                  "status": 403,
                  "when": "Super 권한 아님",
                  "message": "승인 권한이 없습니다"
                },
                {
                  "status": 409,
                  "when": "slug 중복 또는 이미 처리된 신청",
                  "message": "희망 주소(slug)가 이미 사용 중이거나 이미 처리된 신청입니다"
                },
                {
                  "status": 422,
                  "when": "slug 형식 위반 등 비즈니스 규칙 불충족",
                  "message": "주소(slug)는 영문 소문자·숫자·하이픈만 사용할 수 있어요"
                },
                {
                  "status": 500,
                  "when": "프로비저닝 실패",
                  "message": "교회 서비스 생성 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요"
                }
              ]
            },
            {
              "id": "rejectApplication",
              "intent": "개설 신청 반려(사유 통지)",
              "method": "POST",
              "path": "/super/applications/{applicationId}/reject",
              "request": "{reason}",
              "idempotency": "Idempotency-Key 권장(중복 반려 통지 방지)",
              "confirm": "반려 확정 모달 — 사유 입력 후 신청자 통지, 감사로그 기록",
              "response": "'{entities.OnboardingApplication}' (status 전이)",
              "auth": "Bearer(super)",
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 400,
                  "when": "반려 사유 누락",
                  "message": "반려 사유를 입력해 주세요"
                },
                {
                  "status": 404,
                  "when": "신청 없음",
                  "message": "해당 신청을 찾을 수 없습니다"
                },
                {
                  "status": 409,
                  "when": "이미 처리된 신청",
                  "message": "이미 다른 운영자가 처리한 신청입니다"
                }
              ]
            }
          ],
          "events": [
            {
              "name": "application.approved",
              "intent": "개설 신청 승인 확정",
              "when": "슈퍼가 비가역 확인 모달에서 승인 확정 시"
            },
            {
              "name": "tenant.provisioned",
              "intent": "테넌트 일괄 생성 완료",
              "when": "Tenant·Church·Admin·Domain·ChannelConfig·PwaConfig·Notification 자동 생성 완료 시"
            },
            {
              "name": "admin.invited.email",
              "intent": "관리자 초대 이메일 발송",
              "when": "테넌트 생성 후 관리자 초대 메일 발송 시"
            },
            {
              "name": "application.rejected",
              "intent": "개설 신청 반려 통지",
              "when": "슈퍼가 사유 입력 후 반려 확정 시"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-SUP-005",
              "via": "승인·테넌트 생성 완료",
              "trigger": ".pd-confirm"
            }
          ]
        }
      },
      {
        "id": "SCR-SUP-005",
        "label": "테넌트 상세",
        "href": "x-tenant-detail.html",
        "surface": "super",
        "entry": false,
        "status": "confirmed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-020",
          "REQ-021"
        ],
        "context": "교회(테넌트) 상세 — 정보·서비스 상태·ChannelConfig(web/pwa/ios/android/webpush/nativepush on/off)·요금제·도메인·콘솔 링크.",
        "components": [
          {
            "role": ".pd-wpanel",
            "kind": "card",
            "label": "테넌트 정보 (교회명·slug·개설일)"
          },
          {
            "role": ".pd-stat",
            "kind": "stat",
            "label": "요약 KPI — 상태·구독·성도·도메인 (금액 미확정)",
            "action": {
              "on": "click",
              "do": "go:SCR-SUP-006"
            }
          },
          {
            "role": ".pd-badge",
            "kind": "badge",
            "label": "서비스 상태 (활성·일시정지·해지)"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "서비스 콘솔",
            "action": {
              "on": "click",
              "do": "go:SCR-SUP-007"
            }
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "서비스 콘솔",
            "action": {
              "on": "click",
              "do": "go:SCR-SUP-008"
            }
          }
        ],
        "description": [
          {
            "text": "테넌트 정보 패널 — 교회명(은성교회)·slug(eunsung)·개설일(2026-09-01)을 표 형태로 표시. 모든 교회는 단일 디자인 시스템이라 템플릿 선택은 없고, 교회별 차이는 로고·대표색·커버·교회명뿐",
            "target": ".pd-wpanel"
          },
          {
            "text": "요약 KPI 4칸 — 서비스 상태(운영중)·구독·성도(128명)·도메인 연결(eunsung.or.kr). 구독 KPI 클릭 시 요금제·결제(SCR-SUP-006)로 이동하며, 요금 금액은 시장검증 후 확정이라 '미확정'으로 표기",
            "target": ".pd-stat"
          },
          {
            "text": "서비스 상태 뱃지 — 활성·일시정지·해지. 연체 30일+로 인한 일시정지 전이는 요금제·결제(SCR-SUP-006)에서 수행되고 이 화면 상태와 연동됨",
            "target": ".pd-badge"
          },
          {
            "text": "바로가기 — 도메인 관리(SCR-SUP-007). 기본 {slug}.hurmate.com 및 커스텀 도메인 연결 상태 확인",
            "target": ".pd-btn"
          },
          {
            "text": "바로가기 — 서비스 콘솔(SCR-SUP-008). 교차테넌트 운영 작업 진입(모든 접근은 감사로그 기록)",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입",
            "guard": "최초 진입(데이터 미요청)",
            "result": "상세 레이아웃 스켈레톤 표시",
            "placement": "inline",
            "target": ".pd-wpanel"
          },
          {
            "state": "로딩",
            "trigger": "조회 요청",
            "guard": "GET /super/tenants/{tenantId} 응답 대기",
            "result": "정보 패널·KPI 영역 스켈레톤 유지",
            "message": "교회 정보를 불러오는 중이에요.",
            "placement": "inline",
            "target": ".pd-wpanel",
            "api": {
              "endpoint": "GET /super/tenants/{tenantId}",
              "status": 102
            }
          },
          {
            "state": "정상",
            "trigger": "응답 수신",
            "guard": "테넌트 존재(200)",
            "result": "테넌트 정보·요약 KPI·서비스 상태 뱃지·바로가기 표시",
            "message": "은성교회 · 운영중 · 성도 128명 · eunsung.or.kr 연결",
            "placement": "summary",
            "target": ".pd-wpanel",
            "api": {
              "endpoint": "GET /super/tenants/{tenantId}",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답 수신",
            "guard": "테넌트는 존재하나 커스텀 도메인·구독 정보 일부 미확보",
            "result": "해당 KPI에 placeholder 노출, 나머지 정보는 정상 표시",
            "message": "커스텀 도메인이 아직 연결되지 않았어요. 교회 확인 후 게재됩니다.",
            "placement": "inline",
            "target": ".pd-stat",
            "api": {
              "endpoint": "GET /super/tenants/{tenantId}",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "응답 수신",
            "guard": "테넌트 없음(404) 또는 서버 오류(500)",
            "result": "상세 미표시, 목록 복귀 안내",
            "message": "해당 교회를 찾을 수 없습니다. 전체 교회 목록에서 다시 선택해 주세요.",
            "placement": "full-page",
            "target": ".pd-wpanel",
            "api": {
              "endpoint": "GET /super/tenants/{tenantId}",
              "status": 404
            }
          },
          {
            "state": "권한없음",
            "trigger": "응답 수신",
            "guard": "미인증(401) 또는 슈퍼 권한 아님(403)",
            "result": "상세 차단, 슈퍼 로그인 유도",
            "message": "슈퍼 관리자 권한이 필요합니다. 다시 로그인해 주세요. (SCR-SUP-001)",
            "placement": "full-page",
            "target": ".pd-wpanel",
            "api": {
              "endpoint": "GET /super/tenants/{tenantId}",
              "status": 403
            }
          },
          {
            "state": "엣지",
            "trigger": "응답 수신",
            "guard": "해지(또는 일시정지) 상태 테넌트 열람",
            "result": "상태 뱃지에 해지/일시정지 표기, 도메인·콘솔 바로가기 비활성 안내",
            "message": "해지된 교회입니다. 도메인·서비스 콘솔 바로가기는 제한됩니다.",
            "placement": "banner",
            "target": ".pd-badge",
            "api": {
              "endpoint": "GET /super/tenants/{tenantId}",
              "status": 200
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "tenantDetail",
              "intent": "테넌트 상세 조회",
              "method": "GET",
              "path": "/super/tenants/{tenantId}",
              "response": "'{entities.Church}' (status·slug·name·개설일 + 성도수 요약)",
              "auth": "Bearer(super)",
              "target": ".pd-wpanel",
              "errors": [
                {
                  "status": 401,
                  "when": "미인증",
                  "message": "로그인이 필요합니다."
                },
                {
                  "status": 403,
                  "when": "슈퍼 권한 아님",
                  "message": "슈퍼 관리자 권한이 필요합니다."
                },
                {
                  "status": 404,
                  "when": "테넌트 없음",
                  "message": "해당 교회를 찾을 수 없습니다."
                }
              ]
            },
            {
              "id": "subscriptionStatus",
              "intent": "구독·결제 상태 조회",
              "method": "GET",
              "path": "/super/tenants/{tenantId}/subscription",
              "response": "'{entities.Subscription}' (plan=WEB/WEB+APP, 금액 미확정)",
              "auth": "Bearer(super)",
              "target": ".pd-stat",
              "errors": [
                {
                  "status": 404,
                  "when": "구독 레코드 없음",
                  "message": "구독 정보가 아직 없습니다."
                }
              ]
            },
            {
              "id": "domainStatus",
              "intent": "도메인 연결 상태 조회",
              "method": "GET",
              "path": "/super/tenants/{tenantId}/domains",
              "response": "'{entities.Domain}' (baseDomain·custom·dnsStatus)",
              "auth": "Bearer(super)",
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 404,
                  "when": "도메인 레코드 없음",
                  "message": "도메인 정보가 아직 없습니다."
                }
              ]
            },
            {
              "id": "memberSummary",
              "intent": "성도 수 집계 조회",
              "method": "GET",
              "path": "/super/tenants/{tenantId}/members/summary",
              "response": "{count} ('{entities.Member}' 활성 집계)",
              "auth": "Bearer(super)",
              "target": ".pd-stat",
              "errors": [
                {
                  "status": 403,
                  "when": "교차테넌트 접근 제한",
                  "message": "접근 권한이 없습니다."
                }
              ]
            }
          ],
          "writes": [],
          "events": [
            {
              "name": "tenant.detail.viewed",
              "intent": "테넌트 상세 열람 감사",
              "when": "슈퍼가 테넌트 상세를 열람 — 교차테넌트 접근 감사로그 적재(필수)"
            },
            {
              "name": "tenant.status.changed",
              "intent": "서비스 상태 전이 반영",
              "when": "요금제·결제(SCR-SUP-006)의 일시정지·해지 전이를 수신하여 상태 KPI·뱃지 갱신"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-SUP-006",
              "via": "요금제·결제",
              "trigger": ".pd-stat"
            },
            {
              "screen": "SCR-SUP-007",
              "via": "도메인 관리"
            },
            {
              "screen": "SCR-SUP-008",
              "via": "서비스 콘솔"
            }
          ]
        }
      },
      {
        "id": "SCR-SUP-006",
        "label": "요금제·결제",
        "href": "x-subscription.html",
        "surface": "super",
        "entry": false,
        "status": "confirmed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-024"
        ],
        "context": "요금제(WEB/WEB+APP)·결제 상태·연체 관리. APP은 BASIC 미포함(과금 분리). 금액 미확정. 연체 30일+→일시정지 연동.",
        "components": [
          {
            "role": ".pd-table",
            "kind": "table",
            "label": "구독 현황 테이블 — 교회·플랜·월 요금·결제일·상태"
          },
          {
            "role": ".pd-stat",
            "kind": "stat",
            "label": "요약 지표 — 월 매출·활성 구독·연체·이번 달 발행"
          },
          {
            "role": ".pd-badge",
            "kind": "badge",
            "label": "결제 상태 — 정상·미구독"
          }
        ],
        "description": [
          {
            "text": "상단 요약 지표 4종 — 월 매출·활성 구독·연체·이번 달 발행을 한눈에 요약. 표시 금액은 시장검증 전 예시이며 금액 정책은 미확정",
            "target": ".pd-stat"
          },
          {
            "text": "구독 현황 테이블 — 교회·플랜·월 요금·결제일·상태. 교회명 클릭 시 테넌트 상세(SCR-SUP-005)로 이동",
            "target": ".pd-table"
          },
          {
            "text": "결제 상태 뱃지 — 정상·미구독으로 교회별 과금 상태를 표시",
            "target": ".pd-badge"
          },
          {
            "text": "연체 30일+ 교회는 서비스 일시정지로 전환(비가역·멱등, 확인 모달은 테넌트 상세 SCR-SUP-005에서 실행)되며 테넌트 서비스 상태와 연동",
            "target": ".pd-table"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "화면 진입",
            "guard": "데이터 요청 전",
            "result": "요약 지표·구독 현황 테이블 스켈레톤 표시",
            "placement": "inline",
            "target": ".pd-table"
          },
          {
            "state": "로딩",
            "trigger": "요금제·결제 조회 요청",
            "guard": "GET /super/billing 응답 대기",
            "result": "스켈레톤 유지(로딩 인디케이터)",
            "placement": "inline",
            "target": ".pd-table"
          },
          {
            "state": "정상",
            "trigger": "조회 응답",
            "guard": "구독 레코드 1건 이상",
            "result": "요약 지표·구독 현황 표시(월 요금은 미확정 예시로 표기)",
            "message": "요금은 시장검증 후 확정됩니다. 현재 표시 금액은 예시입니다",
            "placement": "inline",
            "target": ".pd-stat",
            "api": {
              "endpoint": "GET /super/billing",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "조회 응답",
            "guard": "구독·결제 0건",
            "result": "빈 현황 + 복구 안내",
            "message": "아직 구독 중인 교회가 없어요. 개설 검토·승인에서 교회를 개설하면 여기에 표시됩니다",
            "placement": "inline",
            "target": ".pd-table"
          },
          {
            "state": "에러",
            "trigger": "조회 응답",
            "guard": "서버 오류(500)",
            "result": "현황 비표시·재시도 안내",
            "message": "결제 현황을 불러오지 못했어요. 잠시 후 다시 시도해 주세요",
            "placement": "banner",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /super/billing",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "화면 진입",
            "guard": "슈퍼 권한 아님(토큰 만료·role≠super, 403)",
            "result": "접근 차단·운영자 로그인 이동",
            "message": "운영자 권한이 필요합니다. 다시 로그인해 주세요 (SCR-SUP-001)",
            "placement": "full-page",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /super/billing",
              "status": 403
            }
          },
          {
            "state": "엣지",
            "trigger": "연체 30일+ 교회 일시정지 전환",
            "guard": "확인 모달 승인(비가역·Idempotency-Key). 이미 일시정지면 충돌(409)",
            "result": "서비스 상태 일시정지 전환 또는 충돌 안내",
            "message": "이미 일시정지된 교회입니다",
            "placement": "modal",
            "target": ".pd-badge",
            "api": {
              "endpoint": "POST /super/tenants/{tenantId}/suspend",
              "status": 409
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "billingSummary",
              "intent": "요약 지표 조회",
              "method": "GET",
              "path": "/super/billing/summary",
              "params": "",
              "response": "{entities.Subscription} 집계(월 매출·활성 구독·연체·이번 달 발행)",
              "auth": "Bearer(super)",
              "target": ".pd-stat",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "요약 지표를 불러오지 못했어요"
                }
              ]
            },
            {
              "id": "billingList",
              "intent": "요금제·결제 현황 조회",
              "method": "GET",
              "path": "/super/billing",
              "params": "?cursor=&limit=20",
              "response": "{entities.Subscription}[] + {entities.Church}(교회명·플랜·결제일·상태)",
              "auth": "Bearer(super)",
              "target": ".pd-table",
              "errors": [
                {
                  "status": 401,
                  "when": "미인증·토큰 만료",
                  "message": "로그인이 필요합니다 (SCR-SUP-001)"
                },
                {
                  "status": 403,
                  "when": "슈퍼 권한 아님",
                  "message": "운영자 권한이 필요합니다"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "결제 현황을 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "changeSubscription",
              "intent": "요금제 변경",
              "method": "PATCH",
              "path": "/super/tenants/{tenantId}/subscription",
              "request": "{entities.Subscription}(plan: WEB / WEB+APP)",
              "response": "{entities.Subscription}",
              "idempotency": "Idempotency-Key 헤더로 동일 플랜 재요청 멱등",
              "confirm": "변경 확인 모달 필수(비가역 상태 전이·감사로그)",
              "auth": "Bearer(super)",
              "target": ".pd-table",
              "errors": [
                {
                  "status": 409,
                  "when": "변경 불가 상태",
                  "message": "현재 상태에서는 요금제를 변경할 수 없습니다"
                },
                {
                  "status": 422,
                  "when": "비즈니스 규칙 위반(APP은 BASIC 미포함)",
                  "message": "선택한 요금제 구성이 올바르지 않습니다"
                }
              ]
            },
            {
              "id": "suspendOverdue",
              "intent": "연체 서비스 일시정지 전환",
              "method": "POST",
              "path": "/super/tenants/{tenantId}/suspend",
              "request": "{reason}",
              "response": "{entities.Church}(status=일시정지)",
              "idempotency": "Idempotency-Key 헤더(멱등)",
              "confirm": "일시정지 확인 모달 필수(비가역·감사로그. 테넌트 상세 SCR-SUP-005에서 실행)",
              "auth": "Bearer(super)",
              "target": ".pd-badge",
              "errors": [
                {
                  "status": 409,
                  "when": "이미 일시정지",
                  "message": "이미 일시정지된 교회입니다"
                },
                {
                  "status": 422,
                  "when": "연체 조건 미충족",
                  "message": "일시정지 조건(연체 30일+)을 충족하지 않습니다"
                }
              ]
            }
          ],
          "events": [
            {
              "name": "subscription.changed",
              "when": "요금제 변경 완료",
              "intent": "요금제 변경됨"
            },
            {
              "name": "tenant.suspended.overdue",
              "when": "연체 일시정지 전환 완료",
              "intent": "연체 교회 일시정지됨"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-SUP-005",
              "via": "일시정지 전환·테넌트 상세",
              "trigger": ".pd-confirm"
            }
          ]
        }
      },
      {
        "id": "SCR-SUP-007",
        "label": "도메인",
        "href": "x-domains.html",
        "surface": "super",
        "entry": false,
        "status": "confirmed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-023"
        ],
        "context": "기본 {slug}.hurmate.com + Premium 커스텀 도메인(교회 등록→훌메이트 서버 IP 안내→교회 DNS 연결→SSL 자동발급)·DNS 확인.",
        "components": [
          {
            "role": ".pd-table",
            "kind": "table",
            "label": "도메인 연결 — 교회·기본 주소·커스텀 도메인·상태",
            "action": {
              "on": "click",
              "do": "go:SCR-SUP-005"
            }
          },
          {
            "role": ".pd-badge",
            "kind": "badge",
            "label": "도메인 상태(연결됨·기본)"
          }
        ],
        "description": [
          {
            "text": "도메인 연결 표 — 교회·기본 주소·커스텀 도메인·상태 4개 열로 전체 교회의 도메인을 한눈에 조회. 교회명 클릭 시 해당 테넌트 상세(SCR-SUP-005)로 이동",
            "target": ".pd-table"
          },
          {
            "text": "기본 주소는 {slug}.hurmate.com 형식으로 개설 승인 시 자동 발급(예: eunsung.hurmate.com), 커스텀 도메인은 화이트라벨로 교회 고유 주소를 연결(예: eunsung.or.kr) — 교회가 도메인을 직접 등록하면 훌메이트가 연결용 서버 IP를 안내하고, 교회가 DNS(A/CNAME)를 훌메이트 서버로 연결한 뒤 SSL을 자동 발급한다",
            "target": ".pd-table"
          },
          {
            "text": "상태 뱃지 — 커스텀 도메인이 연결된 교회는 '연결됨', 기본 주소만 사용하는 교회는 '기본'으로 표기(커스텀 미연결은 '—')",
            "target": ".pd-badge"
          },
          {
            "text": "슈퍼 운영자 전용 교차 테넌트 조회 화면 — 전체 교회 도메인 상태를 모니터하며, 모든 교차테넌트 열람은 감사 로그에 기록"
          },
          {
            "text": "조회 전용 화면 — 커스텀 도메인 연결·변경 등 비가역 작업은 각 교회 상세(SCR-SUP-005)에서 수행",
            "target": ".pd-table"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입",
            "guard": "슈퍼 인증 세션 확인",
            "result": "도메인 표 골격(스켈레톤) 노출",
            "message": "",
            "placement": "inline",
            "target": ".pd-table"
          },
          {
            "state": "로딩",
            "trigger": "목록 요청",
            "guard": "GET /super/domains 응답 대기",
            "result": "스켈레톤 로더 표시",
            "message": "도메인 목록을 불러오는 중이에요",
            "placement": "inline",
            "target": ".pd-table"
          },
          {
            "state": "정상",
            "trigger": "응답 수신",
            "guard": "등록 교회 1곳 이상",
            "result": "교회·기본 주소·커스텀 도메인과 상태 뱃지(연결됨·기본) 표시",
            "message": "",
            "placement": "inline",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /super/domains",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답 수신",
            "guard": "등록 교회 0곳",
            "result": "빈 상태 안내·복구 유도",
            "message": "아직 연결된 교회 도메인이 없어요. 개설 검토·승인(SCR-SUP-004)에서 교회를 개설하면 기본 주소가 자동 발급됩니다",
            "placement": "inline",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /super/domains",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "응답 수신",
            "guard": "서버 오류",
            "result": "목록 로드 실패·재시도 유도",
            "message": "도메인 목록을 불러오지 못했어요. 잠시 후 다시 시도해 주세요",
            "placement": "banner",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /super/domains",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "진입/토큰 만료",
            "guard": "role이 super가 아니거나 세션 만료",
            "result": "운영자 로그인 유도",
            "message": "슈퍼 운영자 권한이 필요합니다. 운영자 로그인(SCR-SUP-001) 후 다시 시도해 주세요",
            "placement": "full-page",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /super/domains",
              "status": 403
            }
          },
          {
            "state": "엣지",
            "trigger": "스크롤/다음 페이지",
            "guard": "교회 20건 초과",
            "result": "cursor 기반 페이지네이션으로 20건 단위 추가 로드(입력 폼 없음 → 입력검증 해당 없음)",
            "message": "",
            "placement": "inline",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /super/domains?cursor=&limit=20",
              "status": 200
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "domainList",
              "intent": "전체 교회 도메인 조회",
              "method": "GET",
              "path": "/super/domains",
              "params": "?cursor=&limit=20",
              "response": "{entities.Domain}[] (교회명·slug = {entities.Church})",
              "auth": "Bearer(super)",
              "target": ".pd-table",
              "errors": [
                {
                  "status": 401,
                  "when": "미인증(토큰 없음·만료)",
                  "message": "로그인이 필요합니다"
                },
                {
                  "status": 403,
                  "when": "슈퍼 권한 아님",
                  "message": "슈퍼 운영자 권한이 필요합니다"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "도메인 목록을 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [],
          "events": [
            {
              "name": "super.domain.viewed",
              "intent": "교차 테넌트 도메인 열람 감사",
              "when": "슈퍼가 전체 교회 도메인 목록을 조회할 때 감사 로그 적재(모든 교차테넌트 접근은 감사 필수·정책 B)"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-SUP-005",
              "via": "테넌트 상세",
              "trigger": ".pd-table"
            }
          ]
        }
      },
      {
        "id": "SCR-SUP-008",
        "label": "서비스 콘솔 (PWA·App·Notification·Storage)",
        "href": "x-console.html",
        "surface": "super",
        "entry": false,
        "status": "wireframed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-021"
        ],
        "context": "플랫폼 서비스 콘솔 — 테넌트별 PWA·App(차기)·Notification Gateway·Storage 상태 모니터. 채널 운영.",
        "components": [
          {
            "role": ".pd-kpi",
            "kind": "kpi",
            "label": "PWA 운영 중·Notification 발송(30일)·Storage 사용량·App(차기) 집계 KPI"
          },
          {
            "role": ".pd-table",
            "kind": "table",
            "label": "테넌트별 서비스 상태(교회·slug·PWA·App(Native)·Notification·Storage) + Notification Gateway·Storage 모니터",
            "action": {
              "on": "click",
              "do": "go:SCR-SUP-005"
            }
          },
          {
            "role": ".pd-stat",
            "kind": "stat",
            "label": "집계 스탯 — PWA 운영 중 4·Notification 준비 중·Storage 준비 중·App 차기"
          },
          {
            "role": ".pd-badge",
            "kind": "badge",
            "label": "상태 뱃지(운영중·준비 중·차기·WebPush·tenant 격리·단일 DS)"
          }
        ],
        "description": [
          {
            "text": "플랫폼 서비스 집계 KPI 4종 — PWA 운영 중(4·데모 테넌트·단일 DS), Notification 발송(30일·준비 중·WebPush 단일 채널), Storage 사용량(준비 중·테넌트 합산 예정), App(Native·차기·비활성 Add-on).",
            "target": ".pd-kpi"
          },
          {
            "text": "테넌트별 서비스 상태 표 — 교회·slug·PWA·App(Native)·Notification·Storage 열. 교회명 또는 '상세' 클릭 시 테넌트 상세(SCR-SUP-005)로 이동. App(Native)은 전 행 '차기' 비활성.",
            "target": ".pd-table"
          },
          {
            "text": "개별 집계 스탯 카드 — 운영 중 PWA 수는 실값(4), Notification 발송·Storage 사용량은 '준비 중', App은 '차기'로 정직 표기(미확보값 과장 없음).",
            "target": ".pd-stat"
          },
          {
            "text": "서비스·채널 상태 뱃지 — 운영중·준비 중·차기·WebPush와 'tenant 격리'·'단일 DS'. App Push(Native)는 차기 Add-on으로 비활성.",
            "target": ".pd-badge"
          },
          {
            "text": "Notification Gateway·Storage 모니터 표 — WebPush(PWA) 운영중, App Push(Native) 차기 비활성, Storage 운영중. church_id 자동 스코프·tenant 격리·금액 미확정을 비고로 명시.",
            "target": ".pd-table"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "슈퍼가 사이드바 '서비스 콘솔' 진입",
            "guard": "슈퍼 세션 유효·데이터 요청 전",
            "result": "GNB·사이드바·페이지 헤더와 KPI/표 자리(스켈레톤) 렌더",
            "message": "",
            "placement": "inline",
            "target": ".pd-kpi"
          },
          {
            "state": "로딩",
            "trigger": "집계 API 호출",
            "guard": "GET /super/console/* 응답 대기",
            "result": "KPI·표 스켈레톤 유지, 상호작용 비활성",
            "message": "서비스 상태를 불러오는 중이에요.",
            "placement": "inline",
            "target": ".pd-kpi"
          },
          {
            "state": "정상",
            "trigger": "집계 API 200 응답",
            "guard": "테넌트 1곳 이상·게이트웨이 정상",
            "result": "KPI 4종·테넌트별 서비스 상태·Notification Gateway/Storage 모니터 표시",
            "message": "",
            "placement": "inline",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /super/console/tenants",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "집계 API 200(목록 0건)",
            "guard": "개설된 테넌트 0곳",
            "result": "표 빈 상태·복구 안내",
            "message": "아직 모니터할 테넌트가 없어요. '개설 검토·승인(SCR-SUP-004)'에서 교회를 개설하면 여기에 표시됩니다.",
            "placement": "inline",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /super/console/tenants",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "Gateway/Storage 집계 장애",
            "guard": "GET /super/console/gateway 503",
            "result": "해당 항목 '불러오지 못함' 표기, 테넌트 표는 정상 유지(부분 실패 격리)",
            "message": "일부 서비스 상태를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.",
            "placement": "banner",
            "target": ".pd-stat",
            "api": {
              "endpoint": "GET /super/console/gateway",
              "status": 503
            }
          },
          {
            "state": "권한없음",
            "trigger": "비슈퍼(관리자·미인증) 콘솔 접근",
            "guard": "JWT role≠super 또는 토큰 만료",
            "result": "콘솔 차단·슈퍼 로그인(SCR-SUP-001) 유도·교차접근 감사로그 기록",
            "message": "슈퍼 관리자 권한이 필요해요. 다시 로그인해 주세요.",
            "placement": "full-page",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /super/console/overview",
              "status": 403
            }
          },
          {
            "state": "엣지",
            "trigger": "App(Native) 채널 OFF·발송/사용량 집계 미가동",
            "guard": "ChannelConfig.nativePushEnabled=false·집계 파이프라인 준비 중",
            "result": "App 전 행 '차기' 뱃지 고정, Notification/Storage 집계 '준비 중', Storage 비고 '금액 미확정' 유지",
            "message": "App(Native)은 차기 Add-on으로 비활성이며, 발송량·사용량 집계는 준비 중이에요.",
            "placement": "inline",
            "target": ".pd-badge"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "consoleOverview",
              "intent": "서비스 콘솔 집계 KPI 조회",
              "method": "GET",
              "path": "/super/console/overview",
              "response": "{PWA 운영 수·Notification 발송(30일)·Storage 사용량·App 상태} — '{entities.Church}'·'{entities.ChannelConfig}' 교차테넌트 집계",
              "auth": "Bearer(super)",
              "target": ".pd-kpi",
              "errors": [
                {
                  "status": 401,
                  "when": "미인증·토큰 만료",
                  "message": "로그인이 필요해요."
                },
                {
                  "status": 403,
                  "when": "슈퍼 권한 아님",
                  "message": "슈퍼 관리자 권한이 필요해요."
                },
                {
                  "status": 503,
                  "when": "집계 파이프라인 장애",
                  "message": "일부 집계를 불러오지 못했어요."
                }
              ]
            },
            {
              "id": "tenantServiceStatus",
              "intent": "테넌트별 서비스 상태 조회",
              "method": "GET",
              "path": "/super/console/tenants?cursor=&limit=20",
              "response": "'{entities.Church}'[] (slug·'{entities.ChannelConfig}'.pwaEnabled/webPushEnabled·'{entities.AppConfig}' 상태·Storage 사용량) — cursor 페이지네이션",
              "auth": "Bearer(super)",
              "target": ".pd-table",
              "errors": [
                {
                  "status": 401,
                  "when": "미인증",
                  "message": "로그인이 필요해요."
                },
                {
                  "status": 403,
                  "when": "슈퍼 권한 아님",
                  "message": "슈퍼 관리자 권한이 필요해요."
                }
              ]
            },
            {
              "id": "gatewayStorageMonitor",
              "intent": "Notification Gateway·Storage 모니터 조회",
              "method": "GET",
              "path": "/super/console/gateway",
              "response": "채널별 상태·집계 — '{entities.Message}'[](channel=web_push 발송 집계)·'{entities.ChannelConfig}'(채널 on/off)·Storage 사용량. App Push=차기 비활성·금액 미확정",
              "auth": "Bearer(super)",
              "target": ".pd-table",
              "errors": [
                {
                  "status": 403,
                  "when": "슈퍼 권한 아님",
                  "message": "슈퍼 관리자 권한이 필요해요."
                },
                {
                  "status": 503,
                  "when": "Gateway/Storage 집계 장애",
                  "message": "일부 서비스 상태를 불러오지 못했어요."
                }
              ]
            }
          ],
          "writes": [],
          "note": "서비스 콘솔은 읽기 전용 모니터 — 이 목업에 서비스 상태 전이·채널 on/off 토글 등 쓰기 컨트롤이 없어 writes 없음. 서비스 상태 전이·대량 발송·요금제 변경 등 비가역 쓰기는 테넌트 상세(SCR-SUP-005)·요금제(SCR-SUP-006)에서 Idempotency-Key 헤더 + confirm + 감사로그로 수행(여기선 창작 금지).",
          "events": [
            {
              "name": "console.tenant.detail.open",
              "when": "테넌트 행 또는 '상세' 버튼 클릭",
              "intent": "테넌트 상세로 이동",
              "to": "SCR-SUP-005",
              "target": ".pd-table"
            },
            {
              "name": "console.domains.open",
              "when": "페이지 헤더 '도메인 관리' 클릭",
              "intent": "도메인 관리로 이동",
              "to": "SCR-SUP-007",
              "target": ".pd-btn"
            },
            {
              "name": "console.dashboard.open",
              "when": "페이지 헤더 '대시보드' 클릭",
              "intent": "대시보드로 이동",
              "to": "SCR-SUP-002",
              "target": ".pd-btn"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-SUP-005",
              "via": "테넌트 상세",
              "trigger": ".pd-table"
            }
          ]
        }
      },
      {
        "id": "SCR-SUP-009",
        "label": "운영 로그",
        "href": "x-audit.html",
        "surface": "super",
        "entry": false,
        "status": "confirmed",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-020"
        ],
        "context": "운영 로그·감사 — 교차테넌트 접근·상태 전이·승인 기록.",
        "components": [
          {
            "role": ".pd-table",
            "kind": "table",
            "label": "접근 기록 — 시각·운영자·교회·액션·대상"
          }
        ],
        "description": [
          {
            "text": "상단 안내 배너 — 슈퍼관리자의 교차테넌트 접근·민감정보 열람·중요 변경이 모두 기록되고 3년 보존됨을 고지. 정보 표기 전용(이동 없음)."
          },
          {
            "text": "운영자·교회·액션 키워드 검색 — 입력하면 같은 화면에서 접근 기록 목록을 필터링(별도 화면 이동 없음)."
          },
          {
            "text": "유형 필터 칩(전체·PII 열람·테넌트 변경·발송) — 선택한 유형의 기록만 같은 화면에서 조회. 기본값은 '전체'."
          },
          {
            "text": "접근 기록 테이블(읽기 전용) — 시각·운영자(admin@hurmate)·교회(은성교회)·액션(pii.read·tenant.create·message.send)·대상(성도 김○○·전체 128) 열. 행은 읽기 전용으로 드릴다운 없음. 좌측 사이드바로 대시보드(SCR-SUP-002)·서비스 콘솔(SCR-SUP-008)로 이동.",
            "target": ".pd-table"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입",
            "guard": "슈퍼 세션 유효·필터 미적용",
            "result": "유형 필터 '전체' 활성·검색어 비움 기본 상태",
            "message": "",
            "placement": "inline"
          },
          {
            "state": "로딩",
            "trigger": "조회요청",
            "guard": "GET /super/audit 응답 대기",
            "result": "접근 기록 테이블 스켈레톤 표시",
            "message": "",
            "placement": "inline",
            "target": ".pd-table"
          },
          {
            "state": "정상",
            "trigger": "응답",
            "guard": "로그 1건 이상",
            "result": "접근 기록 표시(시각·운영자·교회·액션·대상)",
            "message": "",
            "placement": "inline",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /super/audit",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답",
            "guard": "조건 결과 0건",
            "result": "빈 테이블·복구 안내",
            "message": "조건에 맞는 접근 기록이 없어요. 유형 필터를 바꾸거나 검색어를 지워 보세요.",
            "placement": "inline",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /super/audit",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "응답",
            "guard": "서버 오류(500)",
            "result": "조회 실패·재시도 유도",
            "message": "운영 로그를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.",
            "placement": "banner",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /super/audit",
              "status": 500
            }
          },
          {
            "state": "권한없음",
            "trigger": "진입",
            "guard": "비(非)슈퍼 토큰 또는 세션 만료(401/403)",
            "result": "접근 차단·로그인 유도 → 로그인(SCR-SUP-001)",
            "message": "슈퍼관리자 전용 화면이에요. 다시 로그인해 주세요.",
            "placement": "full-page",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /super/audit",
              "status": 403
            }
          },
          {
            "state": "엣지",
            "trigger": "추가로딩(커서 페이지네이션)",
            "guard": "다음 cursor 없음(마지막 페이지)",
            "result": "더 불러올 기록 없음",
            "message": "마지막 기록까지 모두 불러왔어요.",
            "placement": "inline",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /super/audit?cursor=…&limit=20",
              "status": 200
            }
          },
          {
            "state": "형식오류(검색 입력검증)",
            "trigger": "검색어 입력",
            "guard": "허용 길이 초과 또는 비허용 특수문자",
            "result": "검색 미적용·입력 보정 안내",
            "message": "검색어 형식을 확인해 주세요(2자 이상·특수문자 제외).",
            "placement": "inline",
            "api": {
              "endpoint": "GET /super/audit",
              "status": 400
            }
          },
          {
            "state": "유효(검색·필터 적용)",
            "trigger": "검색·필터 적용",
            "guard": "유형 칩+키워드 유효",
            "result": "조건에 맞는 접근 기록만 표시",
            "message": "조건에 맞는 기록을 표시했어요.",
            "placement": "summary",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /super/audit?type=&q=",
              "status": 200
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "auditLog",
              "intent": "운영·감사 로그 조회(교차테넌트 접근·상태 전이·승인·발송)",
              "method": "GET",
              "path": "/super/audit",
              "params": "?type={all|pii_read|tenant_change|send}&q={keyword}&cursor=&limit=20",
              "response": "접근기록[] — { at, actor:'{entities.PlatformAdmin}', church:'{entities.Church}', action, target }",
              "auth": "Bearer(super)",
              "target": ".pd-table",
              "errors": [
                {
                  "status": 400,
                  "when": "검색어 형식 오류",
                  "message": "검색어 형식을 확인해 주세요(2자 이상·특수문자 제외)."
                },
                {
                  "status": 401,
                  "when": "세션 만료·미인증",
                  "message": "슈퍼관리자 전용 화면이에요. 다시 로그인해 주세요."
                },
                {
                  "status": 403,
                  "when": "비(非)슈퍼 토큰(권한 없음)",
                  "message": "접근 권한이 없어요. 슈퍼관리자 계정으로 로그인해 주세요."
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "운영 로그를 불러오지 못했어요. 잠시 후 다시 시도해 주세요."
                }
              ]
            }
          ],
          "writes": [],
          "events": [
            {
              "name": "audit.filter",
              "when": "유형 칩 선택 또는 검색어 변경",
              "intent": "필터·검색 적용으로 접근 기록 목록 재조회",
              "target": ".pd-chip"
            },
            {
              "name": "audit.view",
              "when": "슈퍼관리자가 감사로그 화면 진입(민감정보 포함 목록 열람)",
              "intent": "교차테넌트·민감정보 열람 접근 자체를 감사 기록(서버 측 append-only, 보존 3년)",
              "target": ".pd-table"
            },
            {
              "name": "audit.page",
              "when": "테이블 하단 도달(cursor 페이지네이션)",
              "intent": "다음 커서로 추가 접근 기록 로드(limit=20)",
              "target": ".pd-table"
            }
          ]
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-SUP-002",
              "via": "대시보드 복귀",
              "trigger": ".pd-btn"
            }
          ]
        }
      }
    ]
  },
  {
    "category": "봉인 (V1 제외 · feature-flag OFF · 삭제 아님 · 향후 Add-on 자산)",
    "pages": [
      {
        "id": "SCR-SEAL-A01",
        "label": "[봉인] 헌금 안내",
        "href": "a-giving.html",
        "surface": "app",
        "entry": false,
        "status": "draft",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-SEAL"
        ],
        "context": "[봉인·V1 제외·feature-flag OFF·삭제 아님] 향후 Add-on 자산으로 보존. V2.0 MVP에서 비노출. 재개 시 J-게이트 검토.",
        "components": [
          {
            "role": ".pd-appbar",
            "kind": "group",
            "label": "appbar 영역"
          },
          {
            "role": ".pd-ab-btn",
            "kind": "group",
            "label": "ab-btn 영역"
          },
          {
            "role": ".pd-back",
            "kind": "group",
            "label": "back 영역"
          },
          {
            "role": ".pd-ab-title",
            "kind": "group",
            "label": "ab-title 영역"
          },
          {
            "role": ".pd-ab-spacer",
            "kind": "group",
            "label": "ab-spacer 영역"
          }
        ],
        "description": [
          {
            "text": "V1 제외 기능(§60). 삭제가 아닌 봉인 — 향후 Add-on 자산으로 보존."
          }
        ],
        "cases": [],
        "interface": {
          "reads": [],
          "writes": [],
          "events": []
        },
        "flow": {
          "to": []
        }
      },
      {
        "id": "SCR-SEAL-A02",
        "label": "[봉인] 커뮤니티",
        "href": "a-community.html",
        "surface": "app",
        "entry": false,
        "status": "draft",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-SEAL"
        ],
        "context": "[봉인·V1 제외·feature-flag OFF·삭제 아님] 향후 Add-on 자산으로 보존. V2.0 MVP에서 비노출. 재개 시 J-게이트 검토.",
        "components": [
          {
            "role": ".pd-apptop-title",
            "kind": "group",
            "label": "apptop-title 영역"
          },
          {
            "role": ".pd-btn",
            "kind": "group",
            "label": "btn 영역"
          },
          {
            "role": ".pd-write",
            "kind": "group",
            "label": "write 영역"
          },
          {
            "role": ".pd-sec-head",
            "kind": "group",
            "label": "sec-head 영역"
          },
          {
            "role": ".pd-section-title",
            "kind": "group",
            "label": "section-title 영역"
          }
        ],
        "description": [
          {
            "text": "V1 제외 기능(§60). 삭제가 아닌 봉인 — 향후 Add-on 자산으로 보존."
          }
        ],
        "cases": [],
        "interface": {
          "reads": [],
          "writes": [],
          "events": []
        },
        "flow": {
          "to": []
        }
      },
      {
        "id": "SCR-SEAL-A03",
        "label": "[봉인] 나눔 글",
        "href": "a-community-detail.html",
        "surface": "app",
        "entry": false,
        "status": "draft",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-SEAL"
        ],
        "context": "[봉인·V1 제외·feature-flag OFF·삭제 아님] 향후 Add-on 자산으로 보존. V2.0 MVP에서 비노출. 재개 시 J-게이트 검토.",
        "components": [
          {
            "role": ".pd-appbar",
            "kind": "group",
            "label": "appbar 영역"
          },
          {
            "role": ".pd-ab-btn",
            "kind": "group",
            "label": "ab-btn 영역"
          },
          {
            "role": ".pd-back",
            "kind": "group",
            "label": "back 영역"
          },
          {
            "role": ".pd-ab-title",
            "kind": "group",
            "label": "ab-title 영역"
          },
          {
            "role": ".pd-ab-spacer",
            "kind": "group",
            "label": "ab-spacer 영역"
          }
        ],
        "description": [
          {
            "text": "V1 제외 기능(§60). 삭제가 아닌 봉인 — 향후 Add-on 자산으로 보존."
          }
        ],
        "cases": [],
        "interface": {
          "reads": [],
          "writes": [],
          "events": []
        },
        "flow": {
          "to": []
        }
      },
      {
        "id": "SCR-SEAL-A04",
        "label": "[봉인] 글쓰기",
        "href": "a-community-write.html",
        "surface": "app",
        "entry": false,
        "status": "draft",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-SEAL"
        ],
        "context": "[봉인·V1 제외·feature-flag OFF·삭제 아님] 향후 Add-on 자산으로 보존. V2.0 MVP에서 비노출. 재개 시 J-게이트 검토.",
        "components": [
          {
            "role": ".pd-appbar",
            "kind": "group",
            "label": "appbar 영역"
          },
          {
            "role": ".pd-ab-btn",
            "kind": "group",
            "label": "ab-btn 영역"
          },
          {
            "role": ".pd-back",
            "kind": "group",
            "label": "back 영역"
          },
          {
            "role": ".pd-ab-title",
            "kind": "group",
            "label": "ab-title 영역"
          },
          {
            "role": ".pd-ab-spacer",
            "kind": "group",
            "label": "ab-spacer 영역"
          }
        ],
        "description": [
          {
            "text": "V1 제외 기능(§60). 삭제가 아닌 봉인 — 향후 Add-on 자산으로 보존."
          }
        ],
        "cases": [],
        "interface": {
          "reads": [],
          "writes": [],
          "events": []
        },
        "flow": {
          "to": []
        }
      },
      {
        "id": "SCR-SEAL-A05",
        "label": "[봉인] 아나바다",
        "href": "a-market.html",
        "surface": "app",
        "entry": false,
        "status": "draft",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-SEAL"
        ],
        "context": "[봉인·V1 제외·feature-flag OFF·삭제 아님] 향후 Add-on 자산으로 보존. V2.0 MVP에서 비노출. 재개 시 J-게이트 검토.",
        "components": [
          {
            "role": ".pd-apptop-title",
            "kind": "group",
            "label": "apptop-title 영역"
          },
          {
            "role": ".pd-btn",
            "kind": "group",
            "label": "btn 영역"
          },
          {
            "role": ".pd-register",
            "kind": "group",
            "label": "register 영역"
          },
          {
            "role": ".pd-wf-text",
            "kind": "group",
            "label": "wf-text 영역"
          },
          {
            "role": ".pd-item-grid",
            "kind": "group",
            "label": "item-grid 영역"
          }
        ],
        "description": [
          {
            "text": "V1 제외 기능(§60). 삭제가 아닌 봉인 — 향후 Add-on 자산으로 보존."
          }
        ],
        "cases": [],
        "interface": {
          "reads": [],
          "writes": [],
          "events": []
        },
        "flow": {
          "to": []
        }
      },
      {
        "id": "SCR-SEAL-A06",
        "label": "[봉인] 나눔물품 상세",
        "href": "a-market-detail.html",
        "surface": "app",
        "entry": false,
        "status": "draft",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-SEAL"
        ],
        "context": "[봉인·V1 제외·feature-flag OFF·삭제 아님] 향후 Add-on 자산으로 보존. V2.0 MVP에서 비노출. 재개 시 J-게이트 검토.",
        "components": [
          {
            "role": ".pd-appbar",
            "kind": "group",
            "label": "appbar 영역"
          },
          {
            "role": ".pd-ab-btn",
            "kind": "group",
            "label": "ab-btn 영역"
          },
          {
            "role": ".pd-back",
            "kind": "group",
            "label": "back 영역"
          },
          {
            "role": ".pd-ab-title",
            "kind": "group",
            "label": "ab-title 영역"
          },
          {
            "role": ".pd-ab-spacer",
            "kind": "group",
            "label": "ab-spacer 영역"
          }
        ],
        "description": [
          {
            "text": "V1 제외 기능(§60). 삭제가 아닌 봉인 — 향후 Add-on 자산으로 보존."
          }
        ],
        "cases": [],
        "interface": {
          "reads": [],
          "writes": [],
          "events": []
        },
        "flow": {
          "to": []
        }
      },
      {
        "id": "SCR-SEAL-A07",
        "label": "[봉인] 물품 등록",
        "href": "a-market-register.html",
        "surface": "app",
        "entry": false,
        "status": "draft",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-SEAL"
        ],
        "context": "[봉인·V1 제외·feature-flag OFF·삭제 아님] 향후 Add-on 자산으로 보존. V2.0 MVP에서 비노출. 재개 시 J-게이트 검토.",
        "components": [
          {
            "role": ".pd-appbar",
            "kind": "group",
            "label": "appbar 영역"
          },
          {
            "role": ".pd-ab-btn",
            "kind": "group",
            "label": "ab-btn 영역"
          },
          {
            "role": ".pd-back",
            "kind": "group",
            "label": "back 영역"
          },
          {
            "role": ".pd-ab-title",
            "kind": "group",
            "label": "ab-title 영역"
          },
          {
            "role": ".pd-ab-spacer",
            "kind": "group",
            "label": "ab-spacer 영역"
          }
        ],
        "description": [
          {
            "text": "V1 제외 기능(§60). 삭제가 아닌 봉인 — 향후 Add-on 자산으로 보존."
          }
        ],
        "cases": [],
        "interface": {
          "reads": [],
          "writes": [],
          "events": []
        },
        "flow": {
          "to": []
        }
      },
      {
        "id": "SCR-SEAL-A08",
        "label": "[봉인] 교회학교",
        "href": "a-edu.html",
        "surface": "app",
        "entry": false,
        "status": "draft",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-SEAL"
        ],
        "context": "[봉인·V1 제외·feature-flag OFF·삭제 아님] 향후 Add-on 자산으로 보존. V2.0 MVP에서 비노출. 재개 시 J-게이트 검토.",
        "components": [
          {
            "role": ".pd-appbar",
            "kind": "group",
            "label": "appbar 영역"
          },
          {
            "role": ".pd-ab-btn",
            "kind": "group",
            "label": "ab-btn 영역"
          },
          {
            "role": ".pd-back",
            "kind": "group",
            "label": "back 영역"
          },
          {
            "role": ".pd-ab-title",
            "kind": "group",
            "label": "ab-title 영역"
          },
          {
            "role": ".pd-ab-spacer",
            "kind": "group",
            "label": "ab-spacer 영역"
          }
        ],
        "description": [
          {
            "text": "V1 제외 기능(§60). 삭제가 아닌 봉인 — 향후 Add-on 자산으로 보존."
          }
        ],
        "cases": [],
        "interface": {
          "reads": [],
          "writes": [],
          "events": []
        },
        "flow": {
          "to": []
        }
      },
      {
        "id": "SCR-SEAL-A09",
        "label": "[봉인] 교회학교 공지",
        "href": "a-edu-detail.html",
        "surface": "app",
        "entry": false,
        "status": "draft",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-SEAL"
        ],
        "context": "[봉인·V1 제외·feature-flag OFF·삭제 아님] 향후 Add-on 자산으로 보존. V2.0 MVP에서 비노출. 재개 시 J-게이트 검토.",
        "components": [
          {
            "role": ".pd-appbar",
            "kind": "group",
            "label": "appbar 영역"
          },
          {
            "role": ".pd-ab-btn",
            "kind": "group",
            "label": "ab-btn 영역"
          },
          {
            "role": ".pd-back",
            "kind": "group",
            "label": "back 영역"
          },
          {
            "role": ".pd-ab-title",
            "kind": "group",
            "label": "ab-title 영역"
          },
          {
            "role": ".pd-ab-spacer",
            "kind": "group",
            "label": "ab-spacer 영역"
          }
        ],
        "description": [
          {
            "text": "V1 제외 기능(§60). 삭제가 아닌 봉인 — 향후 Add-on 자산으로 보존."
          }
        ],
        "cases": [],
        "interface": {
          "reads": [],
          "writes": [],
          "events": []
        },
        "flow": {
          "to": []
        }
      },
      {
        "id": "SCR-SEAL-A10",
        "label": "[봉인] 성도 매장",
        "href": "a-stores.html",
        "surface": "app",
        "entry": false,
        "status": "draft",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-SEAL"
        ],
        "context": "[봉인·V1 제외·feature-flag OFF·삭제 아님] 향후 Add-on 자산으로 보존. V2.0 MVP에서 비노출. 재개 시 J-게이트 검토.",
        "components": [
          {
            "role": ".pd-appbar",
            "kind": "group",
            "label": "appbar 영역"
          },
          {
            "role": ".pd-ab-btn",
            "kind": "group",
            "label": "ab-btn 영역"
          },
          {
            "role": ".pd-back",
            "kind": "group",
            "label": "back 영역"
          },
          {
            "role": ".pd-ab-title",
            "kind": "group",
            "label": "ab-title 영역"
          },
          {
            "role": ".pd-ab-spacer",
            "kind": "group",
            "label": "ab-spacer 영역"
          }
        ],
        "description": [
          {
            "text": "V1 제외 기능(§60). 삭제가 아닌 봉인 — 향후 Add-on 자산으로 보존."
          }
        ],
        "cases": [],
        "interface": {
          "reads": [],
          "writes": [],
          "events": []
        },
        "flow": {
          "to": []
        }
      },
      {
        "id": "SCR-SEAL-A11",
        "label": "[봉인] 성도 매장 상세",
        "href": "a-store-detail.html",
        "surface": "app",
        "entry": false,
        "status": "draft",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-SEAL"
        ],
        "context": "[봉인·V1 제외·feature-flag OFF·삭제 아님] 향후 Add-on 자산으로 보존. V2.0 MVP에서 비노출. 재개 시 J-게이트 검토.",
        "components": [
          {
            "role": ".pd-appbar",
            "kind": "group",
            "label": "appbar 영역"
          },
          {
            "role": ".pd-ab-btn",
            "kind": "group",
            "label": "ab-btn 영역"
          },
          {
            "role": ".pd-back",
            "kind": "group",
            "label": "back 영역"
          },
          {
            "role": ".pd-ab-title",
            "kind": "group",
            "label": "ab-title 영역"
          },
          {
            "role": ".pd-ab-spacer",
            "kind": "group",
            "label": "ab-spacer 영역"
          }
        ],
        "description": [
          {
            "text": "V1 제외 기능(§60). 삭제가 아닌 봉인 — 향후 Add-on 자산으로 보존."
          }
        ],
        "cases": [],
        "interface": {
          "reads": [],
          "writes": [],
          "events": []
        },
        "flow": {
          "to": []
        }
      },
      {
        "id": "SCR-SEAL-A12",
        "label": "[봉인] 검색",
        "href": "a-search.html",
        "surface": "app",
        "entry": false,
        "status": "draft",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-SEAL"
        ],
        "context": "[봉인·V1 제외·feature-flag OFF·삭제 아님] 향후 Add-on 자산으로 보존. V2.0 MVP에서 비노출. 재개 시 J-게이트 검토.",
        "components": [
          {
            "role": ".pd-appbar",
            "kind": "group",
            "label": "appbar 영역"
          },
          {
            "role": ".pd-ab-btn",
            "kind": "group",
            "label": "ab-btn 영역"
          },
          {
            "role": ".pd-back",
            "kind": "group",
            "label": "back 영역"
          },
          {
            "role": ".pd-ab-title",
            "kind": "group",
            "label": "ab-title 영역"
          },
          {
            "role": ".pd-ab-spacer",
            "kind": "group",
            "label": "ab-spacer 영역"
          }
        ],
        "description": [
          {
            "text": "V1 제외 기능(§60). 삭제가 아닌 봉인 — 향후 Add-on 자산으로 보존."
          }
        ],
        "cases": [],
        "interface": {
          "reads": [],
          "writes": [],
          "events": []
        },
        "flow": {
          "to": []
        }
      },
      {
        "id": "SCR-SEAL-A13",
        "label": "[봉인] 기부금영수증",
        "href": "a-receipts.html",
        "surface": "app",
        "entry": false,
        "status": "draft",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-SEAL"
        ],
        "context": "[봉인·V1 제외·feature-flag OFF·삭제 아님] 향후 Add-on 자산으로 보존. V2.0 MVP에서 비노출. 재개 시 J-게이트 검토.",
        "components": [
          {
            "role": ".pd-appbar",
            "kind": "group",
            "label": "appbar 영역"
          },
          {
            "role": ".pd-ab-btn",
            "kind": "group",
            "label": "ab-btn 영역"
          },
          {
            "role": ".pd-back",
            "kind": "group",
            "label": "back 영역"
          },
          {
            "role": ".pd-ab-title",
            "kind": "group",
            "label": "ab-title 영역"
          },
          {
            "role": ".pd-ab-spacer",
            "kind": "group",
            "label": "ab-spacer 영역"
          }
        ],
        "description": [
          {
            "text": "V1 제외 기능(§60). 삭제가 아닌 봉인 — 향후 Add-on 자산으로 보존."
          }
        ],
        "cases": [],
        "interface": {
          "reads": [],
          "writes": [],
          "events": []
        },
        "flow": {
          "to": []
        }
      },
      {
        "id": "SCR-SEAL-A14",
        "label": "[봉인] 개인정보 권리요청",
        "href": "a-privacy-request.html",
        "surface": "app",
        "entry": false,
        "status": "draft",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-SEAL"
        ],
        "context": "[봉인·V1 제외·feature-flag OFF·삭제 아님] 향후 Add-on 자산으로 보존. V2.0 MVP에서 비노출. 재개 시 J-게이트 검토.",
        "components": [
          {
            "role": ".pd-appbar",
            "kind": "group",
            "label": "appbar 영역"
          },
          {
            "role": ".pd-ab-btn",
            "kind": "group",
            "label": "ab-btn 영역"
          },
          {
            "role": ".pd-back",
            "kind": "group",
            "label": "back 영역"
          },
          {
            "role": ".pd-ab-title",
            "kind": "group",
            "label": "ab-title 영역"
          },
          {
            "role": ".pd-ab-spacer",
            "kind": "group",
            "label": "ab-spacer 영역"
          }
        ],
        "description": [
          {
            "text": "V1 제외 기능(§60). 삭제가 아닌 봉인 — 향후 Add-on 자산으로 보존."
          }
        ],
        "cases": [],
        "interface": {
          "reads": [],
          "writes": [],
          "events": []
        },
        "flow": {
          "to": []
        }
      },
      {
        "id": "SCR-SEAL-A15",
        "label": "[봉인] 출석 체크",
        "href": "a-attendance.html",
        "surface": "app",
        "entry": false,
        "status": "draft",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-SEAL"
        ],
        "context": "[봉인·V1 제외·feature-flag OFF·삭제 아님] 향후 Add-on 자산으로 보존. V2.0 MVP에서 비노출. 재개 시 J-게이트 검토.",
        "components": [
          {
            "role": ".pd-appbar",
            "kind": "group",
            "label": "appbar 영역"
          },
          {
            "role": ".pd-ab-btn",
            "kind": "group",
            "label": "ab-btn 영역"
          },
          {
            "role": ".pd-back",
            "kind": "group",
            "label": "back 영역"
          },
          {
            "role": ".pd-ab-title",
            "kind": "group",
            "label": "ab-title 영역"
          },
          {
            "role": ".pd-ab-spacer",
            "kind": "group",
            "label": "ab-spacer 영역"
          }
        ],
        "description": [
          {
            "text": "V1 제외 기능(§60). 삭제가 아닌 봉인 — 향후 Add-on 자산으로 보존."
          }
        ],
        "cases": [],
        "interface": {
          "reads": [],
          "writes": [],
          "events": []
        },
        "flow": {
          "to": []
        }
      },
      {
        "id": "SCR-SEAL-S01",
        "label": "[봉인] 섬기는 사람들",
        "href": "s-staff.html",
        "surface": "site",
        "entry": false,
        "status": "draft",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-SEAL"
        ],
        "context": "[봉인·V1 제외·feature-flag OFF·삭제 아님] 향후 Add-on 자산으로 보존. V2.0 MVP에서 비노출. 재개 시 J-게이트 검토.",
        "components": [
          {
            "role": ".pd-appbar",
            "kind": "group",
            "label": "appbar 영역"
          },
          {
            "role": ".pd-ab-btn",
            "kind": "group",
            "label": "ab-btn 영역"
          },
          {
            "role": ".pd-back",
            "kind": "group",
            "label": "back 영역"
          },
          {
            "role": ".pd-ab-title",
            "kind": "group",
            "label": "ab-title 영역"
          },
          {
            "role": ".pd-ab-spacer",
            "kind": "group",
            "label": "ab-spacer 영역"
          }
        ],
        "description": [
          {
            "text": "V1 제외 기능(§60). 삭제가 아닌 봉인 — 향후 Add-on 자산으로 보존."
          }
        ],
        "cases": [],
        "interface": {
          "reads": [],
          "writes": [],
          "events": []
        },
        "flow": {
          "to": []
        }
      },
      {
        "id": "SCR-SEAL-S02",
        "label": "[봉인] 새가족 안내",
        "href": "s-newcomer.html",
        "surface": "site",
        "entry": false,
        "status": "draft",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-SEAL"
        ],
        "context": "[봉인·V1 제외·feature-flag OFF·삭제 아님] 향후 Add-on 자산으로 보존. V2.0 MVP에서 비노출. 재개 시 J-게이트 검토.",
        "components": [
          {
            "role": ".pd-appbar",
            "kind": "group",
            "label": "appbar 영역"
          },
          {
            "role": ".pd-ab-btn",
            "kind": "group",
            "label": "ab-btn 영역"
          },
          {
            "role": ".pd-back",
            "kind": "group",
            "label": "back 영역"
          },
          {
            "role": ".pd-ab-title",
            "kind": "group",
            "label": "ab-title 영역"
          },
          {
            "role": ".pd-ab-spacer",
            "kind": "group",
            "label": "ab-spacer 영역"
          }
        ],
        "description": [
          {
            "text": "V1 제외 기능(§60). 삭제가 아닌 봉인 — 향후 Add-on 자산으로 보존."
          }
        ],
        "cases": [],
        "interface": {
          "reads": [],
          "writes": [],
          "events": []
        },
        "flow": {
          "to": []
        }
      },
      {
        "id": "SCR-SEAL-S03",
        "label": "[봉인] 교회 소식",
        "href": "s-news.html",
        "surface": "site",
        "entry": false,
        "status": "draft",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-SEAL"
        ],
        "context": "[봉인·V1 제외·feature-flag OFF·삭제 아님] 향후 Add-on 자산으로 보존. V2.0 MVP에서 비노출. 재개 시 J-게이트 검토.",
        "components": [
          {
            "role": ".pd-appbar",
            "kind": "group",
            "label": "appbar 영역"
          },
          {
            "role": ".pd-ab-btn",
            "kind": "group",
            "label": "ab-btn 영역"
          },
          {
            "role": ".pd-back",
            "kind": "group",
            "label": "back 영역"
          },
          {
            "role": ".pd-ab-title",
            "kind": "group",
            "label": "ab-title 영역"
          },
          {
            "role": ".pd-ab-spacer",
            "kind": "group",
            "label": "ab-spacer 영역"
          }
        ],
        "description": [
          {
            "text": "V1 제외 기능(§60). 삭제가 아닌 봉인 — 향후 Add-on 자산으로 보존."
          }
        ],
        "cases": [],
        "interface": {
          "reads": [],
          "writes": [],
          "events": []
        },
        "flow": {
          "to": []
        }
      },
      {
        "id": "SCR-SEAL-S04",
        "label": "[봉인] 소식 상세",
        "href": "s-news-detail.html",
        "surface": "site",
        "entry": false,
        "status": "draft",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-SEAL"
        ],
        "context": "[봉인·V1 제외·feature-flag OFF·삭제 아님] 향후 Add-on 자산으로 보존. V2.0 MVP에서 비노출. 재개 시 J-게이트 검토.",
        "components": [
          {
            "role": ".pd-appbar",
            "kind": "group",
            "label": "appbar 영역"
          },
          {
            "role": ".pd-ab-btn",
            "kind": "group",
            "label": "ab-btn 영역"
          },
          {
            "role": ".pd-back",
            "kind": "group",
            "label": "back 영역"
          },
          {
            "role": ".pd-ab-title",
            "kind": "group",
            "label": "ab-title 영역"
          },
          {
            "role": ".pd-ab-spacer",
            "kind": "group",
            "label": "ab-spacer 영역"
          }
        ],
        "description": [
          {
            "text": "V1 제외 기능(§60). 삭제가 아닌 봉인 — 향후 Add-on 자산으로 보존."
          }
        ],
        "cases": [],
        "interface": {
          "reads": [],
          "writes": [],
          "events": []
        },
        "flow": {
          "to": []
        }
      },
      {
        "id": "SCR-SEAL-C01",
        "label": "[봉인] 출석 관리",
        "href": "c-attendance.html",
        "surface": "admin",
        "entry": false,
        "status": "draft",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-SEAL"
        ],
        "context": "[봉인·V1 제외·feature-flag OFF·삭제 아님] 향후 Add-on 자산으로 보존. V2.0 MVP에서 비노출. 재개 시 J-게이트 검토.",
        "components": [
          {
            "role": ".pd-iconbtn",
            "kind": "group",
            "label": "iconbtn 영역"
          },
          {
            "role": ".pd-nav-members",
            "kind": "group",
            "label": "nav-members 영역"
          },
          {
            "role": ".pd-pagehead",
            "kind": "group",
            "label": "pagehead 영역"
          },
          {
            "role": ".pd-breadcrumb",
            "kind": "group",
            "label": "breadcrumb 영역"
          },
          {
            "role": ".pd-wf-title",
            "kind": "group",
            "label": "wf-title 영역"
          }
        ],
        "description": [
          {
            "text": "V1 제외 기능(§60). 삭제가 아닌 봉인 — 향후 Add-on 자산으로 보존."
          }
        ],
        "cases": [],
        "interface": {
          "reads": [],
          "writes": [],
          "events": []
        },
        "flow": {
          "to": []
        }
      },
      {
        "id": "SCR-SEAL-C02",
        "label": "[봉인] 재정 관리",
        "href": "c-finance.html",
        "surface": "admin",
        "entry": false,
        "status": "draft",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-SEAL"
        ],
        "context": "[봉인·V1 제외·feature-flag OFF·삭제 아님] 향후 Add-on 자산으로 보존. V2.0 MVP에서 비노출. 재개 시 J-게이트 검토.",
        "components": [
          {
            "role": ".pd-iconbtn",
            "kind": "group",
            "label": "iconbtn 영역"
          },
          {
            "role": ".pd-nav-members",
            "kind": "group",
            "label": "nav-members 영역"
          },
          {
            "role": ".pd-pagehead",
            "kind": "group",
            "label": "pagehead 영역"
          },
          {
            "role": ".pd-breadcrumb",
            "kind": "group",
            "label": "breadcrumb 영역"
          },
          {
            "role": ".pd-wf-title",
            "kind": "group",
            "label": "wf-title 영역"
          }
        ],
        "description": [
          {
            "text": "V1 제외 기능(§60). 삭제가 아닌 봉인 — 향후 Add-on 자산으로 보존."
          }
        ],
        "cases": [],
        "interface": {
          "reads": [],
          "writes": [],
          "events": []
        },
        "flow": {
          "to": []
        }
      },
      {
        "id": "SCR-SEAL-C03",
        "label": "[봉인] 헌금 상세",
        "href": "c-finance-detail.html",
        "surface": "admin",
        "entry": false,
        "status": "draft",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-SEAL"
        ],
        "context": "[봉인·V1 제외·feature-flag OFF·삭제 아님] 향후 Add-on 자산으로 보존. V2.0 MVP에서 비노출. 재개 시 J-게이트 검토.",
        "components": [
          {
            "role": ".pd-iconbtn",
            "kind": "group",
            "label": "iconbtn 영역"
          },
          {
            "role": ".pd-nav-members",
            "kind": "group",
            "label": "nav-members 영역"
          },
          {
            "role": ".pd-pagehead",
            "kind": "group",
            "label": "pagehead 영역"
          },
          {
            "role": ".pd-breadcrumb",
            "kind": "group",
            "label": "breadcrumb 영역"
          },
          {
            "role": ".pd-wf-title",
            "kind": "group",
            "label": "wf-title 영역"
          }
        ],
        "description": [
          {
            "text": "V1 제외 기능(§60). 삭제가 아닌 봉인 — 향후 Add-on 자산으로 보존."
          }
        ],
        "cases": [],
        "interface": {
          "reads": [],
          "writes": [],
          "events": []
        },
        "flow": {
          "to": []
        }
      },
      {
        "id": "SCR-SEAL-C04",
        "label": "[봉인] 개인정보 보호(PIPA)",
        "href": "c-privacy.html",
        "surface": "admin",
        "entry": false,
        "status": "draft",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-SEAL"
        ],
        "context": "[봉인·V1 제외·feature-flag OFF·삭제 아님] 향후 Add-on 자산으로 보존. V2.0 MVP에서 비노출. 재개 시 J-게이트 검토.",
        "components": [
          {
            "role": ".pd-iconbtn",
            "kind": "group",
            "label": "iconbtn 영역"
          },
          {
            "role": ".pd-nav-members",
            "kind": "group",
            "label": "nav-members 영역"
          },
          {
            "role": ".pd-pagehead",
            "kind": "group",
            "label": "pagehead 영역"
          },
          {
            "role": ".pd-breadcrumb",
            "kind": "group",
            "label": "breadcrumb 영역"
          },
          {
            "role": ".pd-wf-title",
            "kind": "group",
            "label": "wf-title 영역"
          }
        ],
        "description": [
          {
            "text": "V1 제외 기능(§60). 삭제가 아닌 봉인 — 향후 Add-on 자산으로 보존."
          }
        ],
        "cases": [],
        "interface": {
          "reads": [],
          "writes": [],
          "events": []
        },
        "flow": {
          "to": []
        }
      },
      {
        "id": "SCR-SEAL-C05",
        "label": "[봉인] UGC 모더레이션",
        "href": "c-moderation.html",
        "surface": "admin",
        "entry": false,
        "status": "draft",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-SEAL"
        ],
        "context": "[봉인·V1 제외·feature-flag OFF·삭제 아님] 향후 Add-on 자산으로 보존. V2.0 MVP에서 비노출. 재개 시 J-게이트 검토.",
        "components": [
          {
            "role": ".pd-iconbtn",
            "kind": "group",
            "label": "iconbtn 영역"
          },
          {
            "role": ".pd-nav-members",
            "kind": "group",
            "label": "nav-members 영역"
          },
          {
            "role": ".pd-pagehead",
            "kind": "group",
            "label": "pagehead 영역"
          },
          {
            "role": ".pd-breadcrumb",
            "kind": "group",
            "label": "breadcrumb 영역"
          },
          {
            "role": ".pd-wf-title",
            "kind": "group",
            "label": "wf-title 영역"
          }
        ],
        "description": [
          {
            "text": "V1 제외 기능(§60). 삭제가 아닌 봉인 — 향후 Add-on 자산으로 보존."
          }
        ],
        "cases": [],
        "interface": {
          "reads": [],
          "writes": [],
          "events": []
        },
        "flow": {
          "to": []
        }
      },
      {
        "id": "SCR-SEAL-X01",
        "label": "[봉인] 이단심사 게이트",
        "href": "x-review-gate.html",
        "surface": "super",
        "entry": false,
        "status": "draft",
        "designed": false,
        "figmaLink": "",
        "reqIds": [
          "REQ-SEAL"
        ],
        "context": "[봉인·V1 제외·feature-flag OFF·삭제 아님] 향후 Add-on 자산으로 보존. V2.0 MVP에서 비노출. 재개 시 J-게이트 검토.",
        "components": [
          {
            "role": ".pd-iconbtn",
            "kind": "group",
            "label": "iconbtn 영역"
          },
          {
            "role": ".pd-review-gate",
            "kind": "group",
            "label": "review-gate 영역"
          },
          {
            "role": ".pd-badge",
            "kind": "group",
            "label": "badge 영역"
          },
          {
            "role": ".pd-pagehead",
            "kind": "group",
            "label": "pagehead 영역"
          },
          {
            "role": ".pd-breadcrumb",
            "kind": "group",
            "label": "breadcrumb 영역"
          }
        ],
        "description": [
          {
            "text": "V1 제외 기능(§60). 삭제가 아닌 봉인 — 향후 Add-on 자산으로 보존."
          }
        ],
        "cases": [],
        "interface": {
          "reads": [],
          "writes": [],
          "events": []
        },
        "flow": {
          "to": []
        }
      }
    ]
  }
];
window.PDK_SCREENS = window.PLANDECK_SCREENS;
