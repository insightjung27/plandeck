/* 훌메이트 V2.0 — 교회 멀티테넌트 플랫폼. 전체 화면 와이어프레임.
 * ★V2.0 재기준화: 대표사이트(landing)·교회 공개홈(site)·교인 Web/PWA(app)·교회 관리자(admin)·슈퍼관리자(super) 5채널.
 *   활성 56화면 + 봉인 25화면(V1 제외·feature-flag OFF·삭제 아님). 교인 5메뉴 고정·단일 Design System·church_id 자동.
 * 기본은 흑백 와이어프레임. screens.js↔HTML·flow·REQ 추적성 정합. /pd-scaffold·/pd-wireframe */
window.PLANDECK_SCREENS = [
  {
    "category": "대표사이트 (landing · www.hurmate.kr · PC웹)",
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
            "label": "상단 네비(서비스소개·기능·WEB·APP·가격·도입절차·FAQ·문의·로그인·개설신청)",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-002"
            }
          },
          {
            "role": ".pd-hero",
            "kind": "banner",
            "label": "히어로 — '교회마다 독립 Web·PWA를 설정만으로'",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-009"
            }
          },
          {
            "role": ".pd-feature",
            "kind": "tiles",
            "label": "핵심가치 3(독립 브랜드·설정만으로 오픈·Web Push 알림)",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-002"
            }
          },
          {
            "role": ".pd-cardgrid",
            "kind": "tiles",
            "label": "채널 소개(교회 공개홈·교인 PWA·관리자 콘솔)",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-003"
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
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "가격 보기",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-005"
            }
          }
        ],
        "description": [
          {
            "text": "상단 GNB — 서비스소개·기능·WEB·APP·가격·도입절차·FAQ·문의·로그인·개설신청. 기능 소개로 이동(SCR-LND-002)",
            "target": ".pd-gnb"
          },
          {
            "text": "히어로 CTA — '교회마다 독립 Web·PWA를 설정만으로', 탭하면 교회 개설 신청(SCR-LND-009)",
            "target": ".pd-hero"
          },
          {
            "text": "채널 소개 카드 — 공개홈·교인 PWA·관리자 콘솔, WEB 상품 상세로(SCR-LND-003)",
            "target": ".pd-cardgrid"
          },
          {
            "text": "하단 CTA — 교회 개설 신청(SCR-LND-009) / 가격 보기(SCR-LND-005)",
            "target": ".pd-cta"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입",
            "guard": "콘텐츠 로딩",
            "result": "히어로·섹션 스켈레톤",
            "message": "",
            "placement": "inline",
            "target": ".pd-hero"
          },
          {
            "state": "정상",
            "trigger": "응답",
            "guard": "마케팅 블록 수신",
            "result": "히어로·핵심가치·채널·CTA 렌더",
            "message": "",
            "target": ".pd-hero",
            "api": {
              "endpoint": "GET /public/landing",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "응답",
            "guard": "서버 오류",
            "result": "기본(정적) 콘텐츠로 폴백",
            "message": "일시적으로 일부 내용을 불러오지 못했어요",
            "placement": "inline",
            "target": ".pd-feature"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "landing",
              "intent": "랜딩 마케팅 블록(히어로·가치·채널)",
              "method": "GET",
              "path": "/public/landing",
              "response": "{hero,values[],channels[]}",
              "auth": "none(공개)",
              "target": ".pd-hero",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "내용을 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [],
          "events": []
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
            "label": "상단 네비",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-001"
            }
          },
          {
            "role": ".pd-section-title",
            "kind": "banner",
            "label": "기능 소개"
          },
          {
            "role": ".pd-cardgrid",
            "kind": "tiles",
            "label": "기능 카드(공개홈·교인 PWA·관리자 콘솔·Web Push·개설 Wizard)",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-003"
            }
          },
          {
            "role": ".pd-feature",
            "kind": "card",
            "label": "Web Push — iOS 16.4+ 홈 설치 PWA에서 수신"
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
            "text": "기능 카드그리드 — 공개홈·교인 PWA·관리자 콘솔·Web Push·개설 Wizard, WEB 상품 상세로(SCR-LND-003)",
            "target": ".pd-cardgrid"
          },
          {
            "text": "Web Push 설명 — iOS는 16.4+ 홈 화면 설치 PWA에서만 수신(과장 없이 조건 명시)",
            "target": ".pd-feature"
          },
          {
            "text": "하단 CTA — 교회 개설 신청(SCR-LND-009)",
            "target": ".pd-cta"
          }
        ],
        "cases": [
          {
            "state": "정상",
            "trigger": "응답",
            "guard": "기능 목록 수신",
            "result": "기능 카드·설명 렌더",
            "message": "",
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
            "result": "정적 폴백",
            "message": "기능 정보를 불러오지 못했어요",
            "placement": "inline",
            "target": ".pd-cardgrid"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "features",
              "intent": "기능 소개 블록",
              "method": "GET",
              "path": "/public/features",
              "response": "{features[]}",
              "auth": "none(공개)",
              "target": ".pd-cardgrid",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "기능 정보를 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [],
          "events": []
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
            "label": "상단 네비",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-001"
            }
          },
          {
            "role": ".pd-hero",
            "kind": "banner",
            "label": "WEB 상품 — 반응형 Web + PWA + Web Push + Admin"
          },
          {
            "role": ".pd-feature",
            "kind": "tiles",
            "label": "포함 범위(공개홈·교인 PWA·관리자 콘솔·Web Push)"
          },
          {
            "role": ".pd-pricerow",
            "kind": "table",
            "label": "요금 구조(초기등록비+월이용료) — 금액 미확정",
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
            "text": "포함 범위 타일 — 반응형 Web·PWA·Web Push·Admin이 기본 상품에 모두 포함",
            "target": ".pd-feature"
          },
          {
            "text": "요금 구조 — 초기등록비+월이용료 구조만 표기, 금액은 '시장검증 후 확정(미확정)'. 가격 안내로(SCR-LND-005)",
            "target": ".pd-pricerow"
          },
          {
            "text": "하단 CTA — 교회 개설 신청(SCR-LND-009)",
            "target": ".pd-cta"
          }
        ],
        "cases": [
          {
            "state": "정상",
            "trigger": "응답",
            "guard": "상품 정보 수신",
            "result": "포함 범위·요금 구조(미확정) 렌더",
            "message": "",
            "target": ".pd-pricerow",
            "api": {
              "endpoint": "GET /public/product/web",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "응답",
            "guard": "서버 오류",
            "result": "정적 폴백",
            "message": "상품 정보를 불러오지 못했어요",
            "placement": "inline",
            "target": ".pd-feature"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "productWeb",
              "intent": "WEB 상품 포함 범위·요금 구조",
              "method": "GET",
              "path": "/public/product/web",
              "response": "{scope[],priceModel(amountTBD:true)}",
              "auth": "none(공개)",
              "target": ".pd-pricerow",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "상품 정보를 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [],
          "events": []
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
            "label": "상단 네비",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-001"
            }
          },
          {
            "role": ".pd-hero",
            "kind": "banner",
            "label": "APP 상품(차기) — 화이트라벨 네이티브 앱 · 준비 중"
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
            "text": "히어로 — 네이티브 앱은 차기 Premium Add-on, 상단에 '준비 중' 명확 표기(과장 금지)",
            "target": ".pd-hero"
          },
          {
            "text": "Add-on 구성 타일 — 구축비+스토어 등록관리+연간 유지, BASIC(WEB)에는 미포함"
          },
          {
            "text": "가격 비교(SCR-LND-005) / WEB로 먼저 개설 신청(SCR-LND-009)",
            "target": ".pd-cta"
          }
        ],
        "cases": [
          {
            "state": "정상",
            "trigger": "응답",
            "guard": "Add-on 정보 수신",
            "result": "'준비 중' 배지와 구성 안내 렌더",
            "message": "현재는 준비 중입니다. 오픈 시 안내드려요",
            "placement": "inline",
            "target": ".pd-hero",
            "api": {
              "endpoint": "GET /public/product/app",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "응답",
            "guard": "서버 오류",
            "result": "정적 '준비 중' 폴백",
            "message": "정보를 불러오지 못했어요",
            "placement": "inline"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "productApp",
              "intent": "APP(차기) Add-on 구성·상태",
              "method": "GET",
              "path": "/public/product/app",
              "response": "{status:'comingSoon',components[]}",
              "auth": "none(공개)",
              "target": ".pd-hero",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "정보를 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [],
          "events": []
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
            "label": "상단 네비",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-001"
            }
          },
          {
            "role": ".pd-section-title",
            "kind": "banner",
            "label": "가격 안내 — 금액 미확정(시장검증 후 확정)"
          },
          {
            "role": ".pd-pricerow",
            "kind": "table",
            "label": "WEB vs APP 비교표(포함 항목·과금 구조)"
          },
          {
            "role": ".pd-feature",
            "kind": "card",
            "label": "APP은 차기 Premium Add-on(BASIC 미포함)"
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
            "text": "비교표 — WEB(기본)과 APP(차기 Add-on)의 포함 항목·과금 구조를 행으로 대비, 금액란은 '미확정' placeholder",
            "target": ".pd-pricerow"
          },
          {
            "text": "안내 카드 — APP은 BASIC에 미포함되는 별도 Add-on(과금 분리)",
            "target": ".pd-feature"
          },
          {
            "text": "하단 CTA — 교회 개설 신청(SCR-LND-009)",
            "target": ".pd-cta"
          }
        ],
        "cases": [
          {
            "state": "정상",
            "trigger": "응답",
            "guard": "요금제 구조 수신",
            "result": "비교표 렌더(금액=미확정)",
            "message": "요금은 시장 검증 후 확정됩니다",
            "placement": "inline",
            "target": ".pd-pricerow",
            "api": {
              "endpoint": "GET /public/pricing",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "응답",
            "guard": "서버 오류",
            "result": "정적 구조 폴백",
            "message": "가격 정보를 불러오지 못했어요",
            "placement": "inline",
            "target": ".pd-pricerow"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "pricing",
              "intent": "WEB/APP 요금제 비교 구조",
              "method": "GET",
              "path": "/public/pricing",
              "response": "{plans[{name,items[],amount:null}]}",
              "auth": "none(공개)",
              "target": ".pd-pricerow",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "가격 정보를 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [],
          "events": []
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
            "label": "상단 네비",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-001"
            }
          },
          {
            "role": ".pd-section-title",
            "kind": "banner",
            "label": "도입 절차 — 9단계"
          },
          {
            "role": ".pd-stepper",
            "kind": "stepper",
            "label": "가입→개설신청→요금제→승인→Tenant생성→Wizard→오픈→교인가입→알림"
          },
          {
            "role": ".pd-feature",
            "kind": "card",
            "label": "승인 후 Tenant 자동 생성·관리자 Wizard 8STEP 안내"
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
            "text": "도입 스테퍼 — 9단계 종단 흐름을 순서대로 표시(가입~알림)",
            "target": ".pd-stepper"
          },
          {
            "text": "핵심 안내 — 슈퍼 승인 후 Tenant 자동 생성, 관리자 Wizard 8STEP으로 설정만으로 오픈",
            "target": ".pd-feature"
          },
          {
            "text": "하단 CTA — 1단계 가입·개설 신청 시작(SCR-LND-009)",
            "target": ".pd-cta"
          }
        ],
        "cases": [
          {
            "state": "정상",
            "trigger": "응답",
            "guard": "절차 데이터 수신",
            "result": "9단계 스테퍼 렌더",
            "message": "",
            "target": ".pd-stepper",
            "api": {
              "endpoint": "GET /public/process",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "응답",
            "guard": "서버 오류",
            "result": "정적 스테퍼 폴백",
            "message": "절차 정보를 불러오지 못했어요",
            "placement": "inline",
            "target": ".pd-stepper"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "process",
              "intent": "도입 9단계 스텝",
              "method": "GET",
              "path": "/public/process",
              "response": "{steps[]}",
              "auth": "none(공개)",
              "target": ".pd-stepper",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "절차 정보를 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [],
          "events": []
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
            "label": "상단 네비",
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
            "label": "FAQ 아코디언(Web/앱 차이·PWA·Web Push·도메인·가격·데이터 소유)"
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
            "text": "FAQ 아코디언 — 질문(pd-acc-q) 클릭 시 답변(pd-acc-a) 펼침, Web/앱 차이·PWA·Web Push 조건·도메인·가격 미확정·데이터 소유 등",
            "target": ".pd-acc-item"
          },
          {
            "text": "개설 신청으로(SCR-LND-009)",
            "target": ".pd-cta"
          },
          {
            "text": "해결 안 되면 문의하기(SCR-LND-010)",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "정상",
            "trigger": "응답",
            "guard": "FAQ 수신",
            "result": "아코디언 항목 렌더(접힘 기본)",
            "message": "",
            "target": ".pd-acc-item",
            "api": {
              "endpoint": "GET /public/faq",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답",
            "guard": "FAQ 0건",
            "result": "문의 유도",
            "message": "등록된 FAQ가 아직 없어요. 문의로 남겨주세요",
            "placement": "inline",
            "target": ".pd-acc-item"
          },
          {
            "state": "에러",
            "trigger": "응답",
            "guard": "서버 오류",
            "result": "정적 폴백",
            "message": "FAQ를 불러오지 못했어요",
            "placement": "inline",
            "target": ".pd-acc-item"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "faq",
              "intent": "FAQ 질문·답변 목록",
              "method": "GET",
              "path": "/public/faq",
              "response": "{faq[{q,a}]}",
              "auth": "none(공개)",
              "target": ".pd-acc-item",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "FAQ를 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [],
          "events": []
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
            "label": "상단 네비",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-001"
            }
          },
          {
            "role": ".pd-form",
            "kind": "form",
            "label": "로그인 폼(아이디·비밀번호)"
          },
          {
            "role": ".pd-field",
            "kind": "form",
            "label": "아이디·비밀번호 입력"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "소셜 로그인 4사(카카오·네이버·구글·애플)"
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
            "text": "로그인 폼 — 전역 계정(AppUser) 아이디·비밀번호 입력",
            "target": ".pd-form"
          },
          {
            "text": "소셜 로그인 4사(카카오·네이버·구글·애플) 버튼",
            "target": ".pd-btn"
          },
          {
            "text": "로그인 성공 시 개설 신청(SCR-LND-009) 또는 내 교회로 이동",
            "target": ".pd-cta"
          }
        ],
        "cases": [
          {
            "state": "정상",
            "trigger": "제출",
            "guard": "자격증명 일치",
            "result": "세션 발급·개설 신청으로 이동",
            "message": "",
            "target": ".pd-cta",
            "api": {
              "endpoint": "POST /auth/login",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "제출",
            "guard": "자격증명 불일치",
            "result": "인라인 오류",
            "message": "아이디 또는 비밀번호가 올바르지 않아요",
            "placement": "inline",
            "target": ".pd-field"
          },
          {
            "state": "에러",
            "trigger": "제출",
            "guard": "서버 오류",
            "result": "재시도 안내",
            "message": "로그인에 실패했어요. 잠시 후 다시 시도해주세요",
            "placement": "toast",
            "target": ".pd-form"
          }
        ],
        "interface": {
          "reads": [],
          "writes": [
            {
              "id": "login",
              "intent": "전역 계정 로그인",
              "method": "POST",
              "path": "/auth/login",
              "request": "{loginId,password}",
              "response": "{accessToken,user}",
              "auth": "none→세션",
              "target": ".pd-cta",
              "errors": [
                {
                  "status": 401,
                  "when": "자격증명 불일치",
                  "message": "아이디 또는 비밀번호가 올바르지 않아요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "로그인에 실패했어요"
                }
              ]
            }
          ],
          "events": [
            {
              "name": "login_success",
              "when": "로그인 성공",
              "payload": "{userId}"
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
            "label": "상단 네비",
            "action": {
              "on": "click",
              "do": "go:SCR-LND-001"
            }
          },
          {
            "role": ".pd-stepper",
            "kind": "stepper",
            "label": "신청 단계(회원가입→교회정보→요금제→제출)"
          },
          {
            "role": ".pd-form",
            "kind": "form",
            "label": "교회정보 입력(교회명·대표자·담당자·전화·이메일·주소·규모·희망slug)"
          },
          {
            "role": ".pd-field",
            "kind": "form",
            "label": "희망 slug 입력(중복 확인)"
          },
          {
            "role": ".pd-pricerow",
            "kind": "table",
            "label": "요금제 선택(WEB / WEB+APP, 금액 미확정)"
          },
          {
            "role": ".pd-cta",
            "kind": "button",
            "label": "개설 신청 제출",
            "action": {
              "on": "click",
              "do": "go:SCR-SUP-004"
            }
          }
        ],
        "description": [
          {
            "text": "신청 스테퍼 — 회원가입→교회정보→요금제→제출 단계 표시",
            "target": ".pd-stepper"
          },
          {
            "text": "교회정보 폼 — 교회명·대표자·담당자·전화·이메일·주소·규모·희망slug. slug는 중복 확인 후 확정",
            "target": ".pd-field"
          },
          {
            "text": "요금제 선택 — WEB 또는 WEB+APP(차기), 금액은 미확정 안내",
            "target": ".pd-pricerow"
          },
          {
            "text": "제출 시 OnboardingApplication 생성→슈퍼 승인 검토 큐로 접수(SCR-SUP-004). 제출 전 확인 모달",
            "target": ".pd-cta"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입",
            "guard": "미로그인",
            "result": "먼저 회원가입/로그인 단계 노출",
            "message": "개설 신청을 위해 먼저 로그인해주세요",
            "placement": "inline",
            "target": ".pd-stepper"
          },
          {
            "state": "정상",
            "trigger": "제출",
            "guard": "필수값+slug 유효+확인 동의",
            "result": "신청 접수·승인 대기 안내",
            "message": "신청이 접수됐어요. 슈퍼 운영자 승인을 기다려주세요",
            "placement": "inline",
            "target": ".pd-cta",
            "api": {
              "endpoint": "POST /onboarding/applications",
              "status": 201
            }
          },
          {
            "state": "에러",
            "trigger": "제출",
            "guard": "희망 slug 중복",
            "result": "slug 필드 인라인 오류",
            "message": "이미 사용 중인 주소예요. 다른 slug를 입력해주세요",
            "placement": "inline",
            "target": ".pd-field"
          },
          {
            "state": "에러",
            "trigger": "제출",
            "guard": "중복 제출(재클릭)",
            "result": "멱등 처리로 기존 신청 재노출",
            "message": "이미 접수된 신청이에요",
            "placement": "toast",
            "target": ".pd-cta"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "slugCheck",
              "intent": "희망 slug 사용 가능 여부",
              "method": "GET",
              "path": "/onboarding/slug-availability",
              "response": "{available:boolean}",
              "auth": "Bearer(로그인)",
              "target": ".pd-field",
              "errors": [
                {
                  "status": 409,
                  "when": "slug 중복",
                  "message": "이미 사용 중인 주소예요"
                }
              ]
            },
            {
              "id": "pricing",
              "intent": "요금제 선택지",
              "method": "GET",
              "path": "/public/pricing",
              "response": "{plans[]}",
              "auth": "none(공개)",
              "target": ".pd-pricerow",
              "errors": []
            }
          ],
          "writes": [
            {
              "id": "apply",
              "intent": "개설 신청 생성(OnboardingApplication) — 비가역 생성, Idempotency-Key로 멱등 보장·제출 전 확인 모달 필수",
              "method": "POST",
              "path": "/onboarding/applications",
              "request": "{church{name,owner,manager,phone,email,addr,size,slug},plan}",
              "response": "{applicationId,status:'pending'}",
              "auth": "Bearer(로그인)",
              "idempotent": "Idempotency-Key 헤더",
              "confirm": "제출 전 확인 모달",
              "target": ".pd-cta",
              "errors": [
                {
                  "status": 409,
                  "when": "slug 중복/중복 제출",
                  "message": "이미 접수됐거나 사용 중인 주소예요"
                },
                {
                  "status": 422,
                  "when": "필수값 누락",
                  "message": "필수 항목을 모두 입력해주세요"
                }
              ]
            }
          ],
          "events": [
            {
              "name": "application_submitted",
              "when": "신청 접수 성공",
              "payload": "{applicationId}"
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
            "label": "상단 네비",
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
            "label": "문의 폼(교회명·연락처·문의내용)"
          },
          {
            "role": ".pd-field",
            "kind": "form",
            "label": "교회명·연락처·문의내용 입력"
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
            "text": "문의 폼 — 교회명·연락처·문의내용 입력(개인정보 최소 수집)",
            "target": ".pd-form"
          },
          {
            "text": "전송 버튼 — 접수 후 확인 메시지, 홈으로 복귀(SCR-LND-001)",
            "target": ".pd-cta"
          }
        ],
        "cases": [
          {
            "state": "정상",
            "trigger": "제출",
            "guard": "필수값 입력",
            "result": "문의 접수·확인",
            "message": "문의가 접수됐어요. 빠르게 연락드릴게요",
            "placement": "inline",
            "target": ".pd-cta",
            "api": {
              "endpoint": "POST /public/contact",
              "status": 201
            }
          },
          {
            "state": "에러",
            "trigger": "제출",
            "guard": "필수값 누락",
            "result": "인라인 오류",
            "message": "교회명·연락처·문의내용을 입력해주세요",
            "placement": "inline",
            "target": ".pd-field"
          },
          {
            "state": "에러",
            "trigger": "제출",
            "guard": "서버 오류",
            "result": "재시도 안내",
            "message": "전송에 실패했어요. 잠시 후 다시 시도해주세요",
            "placement": "toast",
            "target": ".pd-form"
          }
        ],
        "interface": {
          "reads": [],
          "writes": [
            {
              "id": "contact",
              "intent": "도입 문의 접수",
              "method": "POST",
              "path": "/public/contact",
              "request": "{churchName,contact,message}",
              "response": "{inquiryId}",
              "auth": "none(공개)",
              "target": ".pd-cta",
              "errors": [
                {
                  "status": 422,
                  "when": "필수값 누락",
                  "message": "필수 항목을 입력해주세요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "전송에 실패했어요"
                }
              ]
            }
          ],
          "events": [
            {
              "name": "contact_submitted",
              "when": "문의 접수 성공",
              "payload": "{inquiryId}"
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
      }
    ]
  },
  {
    "category": "교회 공개홈 (site · {slug}.hurmate.kr · 방문자)",
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
            "label": "교회 로고·대표이미지·교회명 히어로"
          },
          {
            "role": ".pd-feature",
            "kind": "card",
            "label": "예배 안내 요약",
            "action": {
              "on": "click",
              "do": "go:SCR-SITE-003"
            }
          },
          {
            "role": ".pd-list",
            "kind": "list",
            "label": "최근 설교·공지·이번주 주보 요약",
            "action": {
              "on": "click",
              "do": "go:SCR-SITE-005"
            }
          }
        ],
        "description": [
          {
            "text": "대표이미지 히어로 — 교회 로고·커버·교회명(교회별 4요소만 교체, 레이아웃은 단일 DS)",
            "target": ".pd-hero-img"
          },
          {
            "text": "예배 안내 요약 — 탭하면 예배 시간표(SCR-SITE-003)",
            "target": ".pd-feature"
          },
          {
            "text": "최근 설교·공지·주보 요약 — 탭하면 공개 설교 목록(SCR-SITE-005)",
            "target": ".pd-list"
          },
          {
            "text": "하단 5메뉴 — HOME·교회소개(SCR-SITE-002)·설교(SCR-SITE-005)·주보·공지(주보·공지는 교인 로그인 연계)"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입",
            "guard": "데이터 로딩",
            "result": "히어로·섹션 스켈레톤",
            "message": "",
            "placement": "inline",
            "target": ".pd-list"
          },
          {
            "state": "정상",
            "trigger": "응답",
            "guard": "설교·공지 1건+",
            "result": "히어로·예배안내·최근 설교/공지·주보 요약 노출",
            "message": "",
            "target": ".pd-list",
            "api": {
              "endpoint": "GET /site/home",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답",
            "guard": "설교·공지 0건",
            "result": "교회 소개·예배 안내만 노출",
            "message": "아직 등록된 소식이 없어요",
            "placement": "inline",
            "target": ".pd-list"
          },
          {
            "state": "에러",
            "trigger": "응답",
            "guard": "서버 오류",
            "result": "재시도 안내",
            "message": "교회 정보를 불러오지 못했어요",
            "placement": "toast",
            "target": ".pd-hero-img"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "siteHome",
              "intent": "공개홈 집계",
              "method": "GET",
              "path": "/site/home",
              "response": "{entities.Church, entities.Sermon[], entities.Notice[], entities.Bulletin}",
              "auth": "없음(공개·Host 서브도메인으로 테넌트 확정, path에 tenant 비노출)",
              "target": ".pd-list",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "교회 정보를 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [],
          "events": [
            {
              "id": "pwaInstallHint",
              "name": "pwa:install-eligible",
              "when": "beforeinstallprompt 캡처",
              "target": ".pd-banner"
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
            "label": "담임목사·소개·비전 본문"
          }
        ],
        "description": [
          {
            "text": "소개·비전 본문 — 교회가 입력한 소개·담임목사 소개(관리자 교회소개 콘텐츠에서 관리)",
            "target": ".pd-section-title"
          },
          {
            "text": "예배 안내 바로가기 — 탭하면 예배 시간표(SCR-SITE-003)"
          },
          {
            "text": "오시는 길 바로가기 — 탭하면 지도·주소(SCR-SITE-004)"
          }
        ],
        "cases": [
          {
            "state": "정상",
            "trigger": "응답",
            "guard": "소개 입력됨",
            "result": "교회 소개·비전·링크 노출",
            "message": "",
            "target": ".pd-section-title",
            "api": {
              "endpoint": "GET /site/about",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답",
            "guard": "소개 미입력",
            "result": "기본 안내만 노출",
            "message": "교회 소개가 곧 준비될 예정이에요",
            "placement": "inline",
            "target": ".pd-section-title"
          },
          {
            "state": "에러",
            "trigger": "응답",
            "guard": "서버 오류",
            "result": "재시도 안내",
            "message": "교회 소개를 불러오지 못했어요",
            "placement": "toast",
            "target": ".pd-section-title"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "siteAbout",
              "intent": "교회 소개 조회",
              "method": "GET",
              "path": "/site/about",
              "response": "{entities.Church, intro, vision, pastor}",
              "auth": "없음(공개·Host로 테넌트 확정)",
              "target": ".pd-section-title",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "교회 소개를 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [],
          "events": []
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
            "label": "예배 안내"
          },
          {
            "role": ".pd-list",
            "kind": "table",
            "label": "예배 시간표(주일·수요·금요·새벽)"
          }
        ],
        "description": [
          {
            "text": "예배 시간표 — 요일·예배명·시간을 단순 표로 표시",
            "target": ".pd-list"
          },
          {
            "text": "교회 소개 바로가기 — 탭하면 교회 소개 허브(SCR-SITE-002)"
          }
        ],
        "cases": [
          {
            "state": "정상",
            "trigger": "응답",
            "guard": "예배 1건+",
            "result": "시간표 표 노출",
            "message": "",
            "target": ".pd-list",
            "api": {
              "endpoint": "GET /site/worship",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답",
            "guard": "예배 0건",
            "result": "준비중 안내",
            "message": "예배 시간 안내가 곧 등록될 예정이에요",
            "placement": "inline",
            "target": ".pd-list"
          },
          {
            "state": "에러",
            "trigger": "응답",
            "guard": "서버 오류",
            "result": "재시도 안내",
            "message": "예배 안내를 불러오지 못했어요",
            "placement": "toast",
            "target": ".pd-list"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "siteWorship",
              "intent": "예배 시간표 조회",
              "method": "GET",
              "path": "/site/worship",
              "response": "{worships[]{name, day, time, place}}",
              "auth": "없음(공개·Host로 테넌트 확정)",
              "target": ".pd-list",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "예배 안내를 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [],
          "events": []
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
            "text": "지도 — 교회 주소 기반 키리스 임베드(별도 API 키·서명 불필요)"
          },
          {
            "text": "안내 — 주소·대중교통·주차 텍스트 안내"
          },
          {
            "text": "하단 5메뉴 — 교회 소개 탭으로 복귀 가능(SCR-SITE-002)"
          }
        ],
        "cases": [
          {
            "state": "정상",
            "trigger": "응답",
            "guard": "주소 입력됨",
            "result": "지도·주소·교통·주차 노출",
            "message": "",
            "api": {
              "endpoint": "GET /site/location",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답",
            "guard": "주소 미입력",
            "result": "지도 숨김·준비중 안내",
            "message": "오시는 길 정보가 곧 등록될 예정이에요",
            "placement": "inline"
          },
          {
            "state": "에러",
            "trigger": "렌더",
            "guard": "지도 임베드 로드 실패",
            "result": "주소 텍스트 폴백",
            "message": "지도를 불러오지 못해 주소만 표시해요",
            "placement": "inline"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "siteLocation",
              "intent": "위치 안내 조회",
              "method": "GET",
              "path": "/site/location",
              "response": "{address, lat, lng, transit, parking, mapEmbedUrl}",
              "auth": "없음(공개·Host로 테넌트 확정)",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "오시는 길 정보를 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [],
          "events": []
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
            "label": "설교 목록(썸네일·제목·설교자·날짜)",
            "action": {
              "on": "click",
              "do": "go:SCR-SITE-006"
            }
          }
        ],
        "description": [
          {
            "text": "설교 목록 — YouTube 썸네일·제목·설교자·날짜, 탭하면 설교 상세·재생(SCR-SITE-006)",
            "target": ".pd-list"
          },
          {
            "text": "자체 영상 저장 없이 YouTube 메타데이터만 노출",
            "target": ".pd-list"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입",
            "guard": "목록 로딩",
            "result": "카드 스켈레톤",
            "message": "",
            "placement": "inline",
            "target": ".pd-list"
          },
          {
            "state": "정상",
            "trigger": "응답",
            "guard": "설교 1건+",
            "result": "설교 목록 노출",
            "message": "",
            "target": ".pd-list",
            "api": {
              "endpoint": "GET /site/sermons",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답",
            "guard": "설교 0건",
            "result": "준비중 안내",
            "message": "아직 등록된 설교가 없어요",
            "placement": "inline",
            "target": ".pd-list"
          },
          {
            "state": "에러",
            "trigger": "응답",
            "guard": "서버 오류",
            "result": "재시도 안내",
            "message": "설교 목록을 불러오지 못했어요",
            "placement": "toast",
            "target": ".pd-list"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "siteSermons",
              "intent": "공개 설교 목록",
              "method": "GET",
              "path": "/site/sermons",
              "response": "{entities.Sermon[]{title, preacher, date, youtubeId, thumbnail}}",
              "auth": "없음(공개·Host로 테넌트 확정)",
              "target": ".pd-list",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "설교 목록을 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [],
          "events": []
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
            "label": "YouTube 임베드 플레이어"
          },
          {
            "role": ".pd-row",
            "kind": "list",
            "label": "성경 본문·설교자·설명"
          }
        ],
        "description": [
          {
            "text": "YouTube 플레이어 — 교회가 등록한 영상 ID로 임베드 재생(자체 저장 없음)",
            "target": ".pd-player"
          },
          {
            "text": "성경 본문·설명 — 설교자·본문·설명 텍스트",
            "target": ".pd-row"
          },
          {
            "text": "상단 뒤로가기 — 설교 목록으로 복귀(SCR-SITE-005)"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입",
            "guard": "상세 로딩",
            "result": "플레이어·본문 스켈레톤",
            "message": "",
            "placement": "inline",
            "target": ".pd-player"
          },
          {
            "state": "정상",
            "trigger": "응답",
            "guard": "설교 존재",
            "result": "임베드 재생·본문·설명 노출",
            "message": "",
            "target": ".pd-player",
            "api": {
              "endpoint": "GET /site/sermons/{id}",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "응답",
            "guard": "삭제·비공개 영상",
            "result": "재생 불가 안내·목록 복귀 유도",
            "message": "이 설교 영상을 재생할 수 없어요",
            "placement": "inline",
            "target": ".pd-player"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "siteSermonDetail",
              "intent": "공개 설교 상세",
              "method": "GET",
              "path": "/site/sermons/{id}",
              "response": "{entities.Sermon{title, preacher, date, youtubeId, scripture, description}}",
              "auth": "없음(공개·Host로 테넌트 확정)",
              "target": ".pd-player",
              "errors": [
                {
                  "status": 404,
                  "when": "설교 없음·비공개",
                  "message": "이 설교 영상을 재생할 수 없어요"
                }
              ]
            }
          ],
          "writes": [],
          "events": []
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
            "label": "iOS 16.4+ 공유→홈 화면에 추가 단계"
          },
          {
            "role": ".pd-feature",
            "kind": "card",
            "label": "설치 아이콘 미리보기(교회 로고·교회명)"
          }
        ],
        "description": [
          {
            "text": "설치 버튼 — Android/Chromium에서 beforeinstallprompt 캡처 시 활성, 탭하면 브라우저 설치 프롬프트"
          },
          {
            "text": "iOS 단계 안내 — 16.4+ Safari 공유→'홈 화면에 추가' 수동 단계(설치형 버튼 미지원)",
            "target": ".pd-stepper"
          },
          {
            "text": "아이콘 미리보기 — 설치 시 홈 화면에 교회 로고·교회명으로 추가(PwaConfig)",
            "target": ".pd-feature"
          },
          {
            "text": "하단 5메뉴 — 홈으로 복귀(SCR-SITE-001)"
          }
        ],
        "cases": [
          {
            "state": "정상",
            "trigger": "진입",
            "guard": "Android/Chromium·beforeinstallprompt 캡처",
            "result": "설치 버튼 활성·iOS 단계 숨김",
            "message": "",
            "api": {
              "endpoint": "GET /site/pwa",
              "status": 200
            }
          },
          {
            "state": "엣지",
            "trigger": "진입",
            "guard": "iOS 16.4+ Safari",
            "result": "설치 버튼 숨김·수동 단계 안내 노출",
            "message": "공유 버튼을 눌러 '홈 화면에 추가'를 선택하세요",
            "placement": "inline",
            "target": ".pd-stepper"
          },
          {
            "state": "엣지",
            "trigger": "진입",
            "guard": "이미 설치됨(standalone)",
            "result": "설치 영역 숨김·바로가기 안내",
            "message": "이미 홈 화면에 설치되어 있어요",
            "placement": "inline"
          },
          {
            "state": "권한없음",
            "trigger": "진입",
            "guard": "iOS 16.4 미만·미지원 브라우저",
            "result": "설치·푸시 제한 안내",
            "message": "이 브라우저에서는 설치와 알림이 제한돼요",
            "placement": "inline",
            "target": ".pd-stepper"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "sitePwaConfig",
              "intent": "PWA 설치 메타 조회",
              "method": "GET",
              "path": "/site/pwa",
              "response": "{name, shortName, icons[192,512], themeColor, startUrl}",
              "auth": "없음(공개·Host로 테넌트 확정)",
              "target": ".pd-feature",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "설치 정보를 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [],
          "events": [
            {
              "id": "beforeinstallprompt",
              "name": "beforeinstallprompt",
              "when": "설치 가능 시점(브라우저)",
              "target": ".pd-cta"
            },
            {
              "id": "appinstalled",
              "name": "appinstalled",
              "when": "홈 화면 설치 완료",
              "target": ".pd-cta"
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
            "label": "이용약관·개인정보처리방침 본문(탭 전환)"
          }
        ],
        "description": [
          {
            "text": "게시 상태 배너 — 법률검토 전에는 초안 안내, 교회 확정 후 정식 게시"
          },
          {
            "text": "약관·방침 본문 — 이용약관/개인정보처리방침 탭 전환 열람, 가입 동의 화면과 동일 내용 연계",
            "target": ".pd-legal"
          },
          {
            "text": "하단 5메뉴 — 홈으로 복귀(SCR-SITE-001)"
          }
        ],
        "cases": [
          {
            "state": "정상",
            "trigger": "응답",
            "guard": "교회 확정·게시됨",
            "result": "약관·방침 본문 노출",
            "message": "",
            "target": ".pd-legal",
            "api": {
              "endpoint": "GET /site/legal",
              "status": 200
            }
          },
          {
            "state": "초기",
            "trigger": "응답",
            "guard": "법률검토 전(초안)",
            "result": "초안 배너·임시 안내 노출",
            "message": "약관은 교회 확정·법률검토 후 정식 게시돼요",
            "placement": "inline"
          },
          {
            "state": "에러",
            "trigger": "응답",
            "guard": "서버 오류",
            "result": "재시도 안내",
            "message": "약관을 불러오지 못했어요",
            "placement": "toast",
            "target": ".pd-legal"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "siteLegal",
              "intent": "약관·방침 조회",
              "method": "GET",
              "path": "/site/legal",
              "response": "{terms, privacy, status(draft|published)}",
              "auth": "없음(공개·Host로 테넌트 확정)",
              "target": ".pd-legal",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "약관을 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [],
          "events": []
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
            "label": "교회 로고·교회명·알림 아이콘",
            "action": {
              "on": "click",
              "do": "go:SCR-APP-010"
            }
          },
          {
            "role": ".pd-feature",
            "kind": "card",
            "label": "이번 주 설교",
            "action": {
              "on": "click",
              "do": "go:SCR-APP-002"
            }
          },
          {
            "role": ".pd-list",
            "kind": "list",
            "label": "최근 공지",
            "action": {
              "on": "click",
              "do": "go:SCR-APP-005"
            }
          },
          {
            "role": ".pd-row",
            "kind": "card",
            "label": "이번 주 주보 바로가기",
            "action": {
              "on": "click",
              "do": "go:SCR-APP-004"
            }
          },
          {
            "role": ".pd-tabbar",
            "kind": "tabbar",
            "label": "하단 탭(홈·설교·주보·공지·마이)",
            "action": {
              "on": "click",
              "do": "go:SCR-APP-006"
            }
          }
        ],
        "description": [
          {
            "text": "상단바 로고·교회명(교회별 브랜드 4요소)과 알림 아이콘 — 알림함으로(SCR-APP-010)",
            "target": ".pd-apptop"
          },
          {
            "text": "이번 주 설교 카드 — 탭하면 설교 목록(SCR-APP-002)",
            "target": ".pd-feature"
          },
          {
            "text": "최근 공지 요약 — 탭하면 공지(SCR-APP-005)",
            "target": ".pd-list"
          },
          {
            "text": "하단 탭 — 홈·설교·주보·공지·마이(마이=SCR-APP-006)",
            "target": ".pd-tabbar"
          }
        ],
        "cases": [
          {
            "state": "정상",
            "trigger": "진입",
            "guard": "설교 1건+",
            "result": "설교·공지·주보 요약 표시",
            "message": "",
            "target": ".pd-feature",
            "api": {
              "endpoint": "GET /app/home",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답",
            "guard": "설교·공지 0건",
            "result": "준비중 안내",
            "message": "아직 등록된 콘텐츠가 없어요",
            "placement": "inline",
            "target": ".pd-feature"
          },
          {
            "state": "권한없음",
            "trigger": "진입",
            "guard": "비로그인",
            "result": "공개 요약+로그인 유도",
            "message": "로그인하면 알림을 받을 수 있어요",
            "placement": "inline",
            "target": ".pd-apptop"
          },
          {
            "state": "에러",
            "trigger": "응답",
            "guard": "서버 오류",
            "result": "재시도 안내",
            "message": "정보를 불러오지 못했어요",
            "placement": "toast"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "appHome",
              "intent": "홈 집계(이번주 설교·최근공지·주보 요약)",
              "method": "GET",
              "path": "/app/home",
              "response": "{sermon,notices[],bulletin}",
              "auth": "Bearer(선택)",
              "note": "tenant는 JWT/host에서 결정(path 비노출)",
              "target": ".pd-feature",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "정보를 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [],
          "events": [
            {
              "id": "pushReceived",
              "intent": "Web Push 수신 시 알림 뱃지 갱신",
              "trigger": "ServiceWorker push"
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
            "label": "설교 목록(최신·시리즈)",
            "action": {
              "on": "click",
              "do": "go:SCR-APP-003"
            }
          },
          {
            "role": ".pd-row",
            "kind": "card",
            "label": "설교 항목(썸네일·제목·설교자·날짜)",
            "action": {
              "on": "click",
              "do": "go:SCR-APP-003"
            }
          },
          {
            "role": ".pd-tabbar",
            "kind": "tabbar",
            "label": "하단 탭"
          }
        ],
        "description": [
          {
            "text": "설교 목록 — 각 항목 탭 시 상세·재생(SCR-APP-003)",
            "target": ".pd-list"
          },
          {
            "text": "설교 항목 — YouTube 썸네일·제목·설교자·날짜",
            "target": ".pd-row"
          },
          {
            "text": "하단 탭 — 홈·설교·주보·공지·마이",
            "target": ".pd-tabbar"
          }
        ],
        "cases": [
          {
            "state": "정상",
            "trigger": "진입",
            "guard": "설교 1건+",
            "result": "목록 표시",
            "message": "",
            "target": ".pd-list",
            "api": {
              "endpoint": "GET /app/sermons",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답",
            "guard": "설교 0건",
            "result": "준비중",
            "message": "아직 등록된 설교가 없어요",
            "placement": "inline",
            "target": ".pd-list"
          },
          {
            "state": "에러",
            "trigger": "응답",
            "guard": "서버 오류",
            "result": "재시도",
            "message": "설교를 불러오지 못했어요",
            "placement": "toast"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "appSermons",
              "intent": "설교 목록(YouTube 메타)",
              "method": "GET",
              "path": "/app/sermons",
              "response": "{entities.Sermon}[]",
              "auth": "Bearer",
              "note": "tenant는 JWT",
              "target": ".pd-list",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "설교를 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [],
          "events": []
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
            "label": "YouTube 임베드 플레이어"
          },
          {
            "role": ".pd-tabbar",
            "kind": "tabbar",
            "label": "하단 탭"
          }
        ],
        "description": [
          {
            "text": "YouTube 플레이어 — 자체 영상 저장 없이 임베드 재생",
            "target": ".pd-player"
          },
          {
            "text": "성경본문·설교자·설명"
          },
          {
            "text": "뒤로 — 설교 목록(SCR-APP-002)"
          }
        ],
        "cases": [
          {
            "state": "정상",
            "trigger": "진입",
            "guard": "설교 존재",
            "result": "플레이어·본문 표시",
            "message": "",
            "target": ".pd-player",
            "api": {
              "endpoint": "GET /app/sermons/{id}",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "응답",
            "guard": "삭제/없음",
            "result": "목록 복귀 안내",
            "message": "설교를 찾을 수 없어요",
            "placement": "inline",
            "target": ".pd-player"
          },
          {
            "state": "에러",
            "trigger": "재생",
            "guard": "네트워크/임베드 실패",
            "result": "재시도",
            "message": "영상을 재생할 수 없어요",
            "placement": "toast"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "appSermonDetail",
              "intent": "설교 상세",
              "method": "GET",
              "path": "/app/sermons/{id}",
              "response": "{entities.Sermon}",
              "auth": "Bearer",
              "note": "tenant는 JWT",
              "target": ".pd-player",
              "errors": [
                {
                  "status": 404,
                  "when": "삭제/없음",
                  "message": "설교를 찾을 수 없어요"
                }
              ]
            }
          ],
          "writes": [],
          "events": []
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
            "text": "최신호 — PDF/이미지 뷰어로 바로 열람"
          },
          {
            "text": "지난호 — 주차(날짜)별 목록"
          },
          {
            "text": "하단 탭 — 홈(SCR-APP-001)"
          }
        ],
        "cases": [
          {
            "state": "정상",
            "trigger": "진입",
            "guard": "주보 1건+",
            "result": "최신호+지난호 표시",
            "message": "",
            "api": {
              "endpoint": "GET /app/bulletins",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답",
            "guard": "주보 0건",
            "result": "준비중",
            "message": "이번 주 주보가 아직 없어요",
            "placement": "inline"
          },
          {
            "state": "에러",
            "trigger": "응답",
            "guard": "서버 오류",
            "result": "재시도",
            "message": "주보를 불러오지 못했어요",
            "placement": "toast"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "appBulletins",
              "intent": "주보 목록(최신+지난호)",
              "method": "GET",
              "path": "/app/bulletins",
              "response": "{entities.Bulletin}[]",
              "auth": "Bearer",
              "note": "tenant는 JWT, 파일은 서명 URL",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "주보를 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [],
          "events": []
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
            "text": "공지 목록 — 중요·상단고정 배지 표시, 탭하면 상세"
          },
          {
            "text": "공지 상세 — 본문·이미지·첨부"
          },
          {
            "text": "하단 탭 — 홈(SCR-APP-001)"
          }
        ],
        "cases": [
          {
            "state": "정상",
            "trigger": "진입",
            "guard": "공지 1건+",
            "result": "목록·상세 표시",
            "message": "",
            "api": {
              "endpoint": "GET /app/notices",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답",
            "guard": "공지 0건",
            "result": "준비중",
            "message": "등록된 공지가 없어요",
            "placement": "inline"
          },
          {
            "state": "에러",
            "trigger": "응답",
            "guard": "서버 오류",
            "result": "재시도",
            "message": "공지를 불러오지 못했어요",
            "placement": "toast"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "appNotices",
              "intent": "공지 목록",
              "method": "GET",
              "path": "/app/notices",
              "response": "{entities.Notice}[]",
              "auth": "Bearer",
              "note": "tenant는 JWT",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "공지를 불러오지 못했어요"
                }
              ]
            },
            {
              "id": "appNoticeDetail",
              "intent": "공지 상세",
              "method": "GET",
              "path": "/app/notices/{id}",
              "response": "{entities.Notice}",
              "auth": "Bearer",
              "errors": [
                {
                  "status": 404,
                  "when": "삭제/없음",
                  "message": "공지를 찾을 수 없어요"
                }
              ]
            }
          ],
          "writes": [],
          "events": []
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
            "label": "내 프로필(이름·휴대전화·이메일·교회·가입상태)"
          },
          {
            "role": ".pd-list",
            "kind": "list",
            "label": "내 정보 수정·알림함",
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
            "label": "하단 탭"
          }
        ],
        "description": [
          {
            "text": "내 프로필 — 이름·휴대전화·이메일·교회·가입상태(단순, 교적/직분 없음)",
            "target": ".pd-avatar"
          },
          {
            "text": "메뉴 — 내 정보 수정(SCR-APP-007)·알림함(SCR-APP-010)",
            "target": ".pd-list"
          },
          {
            "text": "설정(SCR-APP-012)·알림설정(SCR-APP-011)"
          },
          {
            "text": "로그아웃 — 로그인 화면(SCR-APP-009)",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "정상",
            "trigger": "진입",
            "guard": "로그인·승인완료",
            "result": "프로필·메뉴 표시",
            "message": "",
            "target": ".pd-avatar",
            "api": {
              "endpoint": "GET /app/me",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답",
            "guard": "가입상태=승인대기",
            "result": "승인대기 배지",
            "message": "가입 승인 대기 중이에요",
            "placement": "inline",
            "target": ".pd-avatar"
          },
          {
            "state": "권한없음",
            "trigger": "진입",
            "guard": "비로그인",
            "result": "로그인 유도",
            "message": "로그인이 필요해요",
            "placement": "inline",
            "target": ".pd-btn"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "appMe",
              "intent": "내 정보 조회",
              "method": "GET",
              "path": "/app/me",
              "response": "{entities.Member}",
              "auth": "Bearer",
              "note": "tenant는 JWT",
              "target": ".pd-avatar",
              "errors": [
                {
                  "status": 401,
                  "when": "미인증",
                  "message": "로그인이 필요해요"
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "appLogout",
              "intent": "로그아웃(세션 종료)",
              "method": "POST",
              "path": "/app/auth/logout",
              "auth": "Bearer",
              "target": ".pd-btn"
            }
          ],
          "events": []
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
            "label": "프로필 수정 폼"
          },
          {
            "role": ".pd-field",
            "kind": "form",
            "label": "이름·휴대전화·이메일"
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
            "text": "프로필 폼 — 이름·휴대전화·이메일만(민감정보 수집 없음·G2)",
            "target": ".pd-field"
          },
          {
            "text": "저장 — 마이로 복귀(SCR-APP-006)",
            "target": ".pd-btn"
          },
          {
            "text": "뒤로 — 저장 없이 마이(SCR-APP-006)"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입",
            "guard": "로그인",
            "result": "기존값 프리필",
            "message": "",
            "target": ".pd-field",
            "api": {
              "endpoint": "GET /app/me",
              "status": 200
            }
          },
          {
            "state": "정상",
            "trigger": "저장",
            "guard": "유효성 통과",
            "result": "저장·복귀",
            "message": "저장했어요",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "PUT /app/me",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "저장",
            "guard": "휴대전화 형식 오류",
            "result": "인라인 오류",
            "message": "휴대전화 번호를 확인해 주세요",
            "placement": "inline",
            "target": ".pd-field"
          },
          {
            "state": "에러",
            "trigger": "저장",
            "guard": "서버 오류",
            "result": "재시도",
            "message": "저장하지 못했어요",
            "placement": "toast",
            "target": ".pd-btn"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "appMePrefill",
              "intent": "수정 폼 프리필",
              "method": "GET",
              "path": "/app/me",
              "response": "{entities.Member}",
              "auth": "Bearer",
              "target": ".pd-field"
            }
          ],
          "writes": [
            {
              "id": "appMeUpdate",
              "intent": "내 정보 수정",
              "method": "PUT",
              "path": "/app/me",
              "body": "{name, phone, email}",
              "auth": "Bearer",
              "note": "tenant는 JWT, 본인 레코드만 수정",
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 422,
                  "when": "유효성 오류",
                  "message": "입력값을 확인해 주세요"
                }
              ]
            }
          ],
          "events": []
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
            "label": "가입 폼(이름·휴대전화·이메일)"
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
            "text": "교회 자동 바인딩 — 교회 검색 없음, 접속한 교회 URL이 church_id 자동 바인딩"
          },
          {
            "text": "가입 폼 — 이름·휴대전화·이메일(단순, 민감정보 없음)",
            "target": ".pd-form"
          },
          {
            "text": "약관·개인정보 동의 — 필수"
          },
          {
            "text": "가입 신청 — 제출 후 승인대기, 로그인(SCR-APP-009)",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입",
            "guard": "교회 URL 바인딩됨",
            "result": "교회명 표시·church_id 세팅",
            "message": ""
          },
          {
            "state": "정상",
            "trigger": "제출",
            "guard": "유효성+동의 완료",
            "result": "승인대기 생성",
            "message": "가입 신청이 접수됐어요. 승인 후 이용할 수 있어요",
            "placement": "inline",
            "target": ".pd-btn",
            "api": {
              "endpoint": "POST /app/signup",
              "status": 201
            }
          },
          {
            "state": "에러",
            "trigger": "제출",
            "guard": "번호 중복",
            "result": "인라인 오류",
            "message": "이미 가입된 번호예요",
            "placement": "inline",
            "target": ".pd-form"
          },
          {
            "state": "에러",
            "trigger": "제출",
            "guard": "동의 미체크",
            "result": "인라인 오류",
            "message": "약관에 동의해 주세요",
            "placement": "inline"
          }
        ],
        "interface": {
          "reads": [],
          "writes": [
            {
              "id": "appSignup",
              "intent": "회원가입 신청(승인대기 생성)",
              "method": "POST",
              "path": "/app/signup",
              "body": "{name, phone, email, agree}",
              "auth": "없음(공개)",
              "note": "church_id는 접속 host에서 서버가 자동 결정(path 비노출, tenant 격리). 비가역 생성이므로 phone 멱등키로 중복 방지, 가입=승인대기 상태",
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 409,
                  "when": "번호 중복",
                  "message": "이미 가입된 번호예요"
                }
              ]
            }
          ],
          "events": []
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
            "label": "소셜 로그인 4사(카카오·네이버·구글·애플)",
            "action": {
              "on": "click",
              "do": "go:SCR-APP-001"
            }
          },
          {
            "role": ".pd-form",
            "kind": "form",
            "label": "아이디 로그인"
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
            "text": "교회 컨텍스트 — 접속한 교회 URL이 Tenant 확정(교회 검색 없음)"
          },
          {
            "text": "소셜 4사+아이디 로그인 — 성공 시 교인 홈(SCR-APP-001)",
            "target": ".pd-form"
          },
          {
            "text": "회원가입 유도(SCR-APP-008)",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "정상",
            "trigger": "로그인",
            "guard": "자격증명 유효·승인완료",
            "result": "JWT 발급·홈 이동",
            "message": "",
            "target": ".pd-btn",
            "api": {
              "endpoint": "POST /app/auth/login",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "로그인",
            "guard": "자격증명 불일치",
            "result": "인라인 오류",
            "message": "아이디 또는 비밀번호를 확인해 주세요",
            "placement": "inline",
            "target": ".pd-form"
          },
          {
            "state": "권한없음",
            "trigger": "로그인",
            "guard": "가입상태=승인대기",
            "result": "접근 차단",
            "message": "가입 승인 대기 중이에요",
            "placement": "inline",
            "target": ".pd-form"
          }
        ],
        "interface": {
          "reads": [],
          "writes": [
            {
              "id": "appLogin",
              "intent": "교인 로그인(JWT 발급)",
              "method": "POST",
              "path": "/app/auth/login",
              "body": "{provider|id, credential}",
              "auth": "없음(공개)",
              "note": "tenant는 접속 host로 확정되어 JWT에 포함(path 비노출)",
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 401,
                  "when": "자격증명 불일치",
                  "message": "아이디 또는 비밀번호를 확인해 주세요"
                },
                {
                  "status": 403,
                  "when": "승인대기",
                  "message": "가입 승인 대기 중이에요"
                }
              ]
            }
          ],
          "events": []
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
            "label": "알림 수신함(설교·공지·주보)"
          },
          {
            "role": ".pd-row",
            "kind": "card",
            "label": "알림 항목(Deep Link: type+content_id)",
            "action": {
              "on": "click",
              "do": "go:SCR-APP-005"
            }
          },
          {
            "role": ".pd-tabbar",
            "kind": "tabbar",
            "label": "하단 탭"
          }
        ],
        "description": [
          {
            "text": "알림 수신함 — 설교·공지·주보 유형",
            "target": ".pd-list"
          },
          {
            "text": "알림 항목 — 탭 시 Deep Link(type+content_id)로 이동: 공지(SCR-APP-005)·설교(SCR-APP-002)·주보(SCR-APP-004)",
            "target": ".pd-row"
          },
          {
            "text": "설정 아이콘 — 알림 설정(SCR-APP-011)"
          }
        ],
        "cases": [
          {
            "state": "정상",
            "trigger": "진입",
            "guard": "알림 1건+",
            "result": "수신함 표시",
            "message": "",
            "target": ".pd-list",
            "api": {
              "endpoint": "GET /app/notifications",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답",
            "guard": "알림 0건",
            "result": "빈 상태",
            "message": "받은 알림이 없어요",
            "placement": "inline",
            "target": ".pd-list"
          },
          {
            "state": "에러",
            "trigger": "응답",
            "guard": "서버 오류",
            "result": "재시도",
            "message": "알림을 불러오지 못했어요",
            "placement": "toast"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "appNotifications",
              "intent": "알림 수신함",
              "method": "GET",
              "path": "/app/notifications",
              "response": "{entities.Notification}[]",
              "auth": "Bearer",
              "note": "tenant는 JWT, 본인 수신분만",
              "target": ".pd-list",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "알림을 불러오지 못했어요"
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
              "target": ".pd-row"
            }
          ],
          "events": [
            {
              "id": "pushDeepLink",
              "intent": "Web Push 클릭 시 type+content_id로 Deep Link 이동",
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
            "label": "Web Push 구독 on/off"
          },
          {
            "role": ".pd-toggle",
            "kind": "toggle",
            "label": "카테고리별 수신(설교·공지·주보)"
          }
        ],
        "description": [
          {
            "text": "Web Push 구독 토글 — 브라우저 권한 요청 후 구독 등록",
            "target": ".pd-toggle"
          },
          {
            "text": "iOS 16.4+ 안내 — 홈 화면에 추가한 PWA에서만 Web Push 수신 가능(단계 안내)"
          },
          {
            "text": "카테고리별 수신 설정 — 설교·공지·주보",
            "target": ".pd-toggle"
          },
          {
            "text": "저장 — 마이로 복귀(SCR-APP-006)"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입",
            "guard": "로그인",
            "result": "현재 구독·카테고리 상태 로드",
            "message": "",
            "target": ".pd-toggle",
            "api": {
              "endpoint": "GET /app/notif-settings",
              "status": 200
            }
          },
          {
            "state": "정상",
            "trigger": "구독 on",
            "guard": "권한 허용",
            "result": "구독 등록",
            "message": "이제 알림을 받을 수 있어요",
            "placement": "toast",
            "target": ".pd-toggle",
            "api": {
              "endpoint": "POST /app/push/subscribe",
              "status": 201
            }
          },
          {
            "state": "에러",
            "trigger": "구독 on",
            "guard": "브라우저 권한 거부",
            "result": "안내",
            "message": "브라우저 알림 권한이 꺼져 있어요",
            "placement": "inline",
            "target": ".pd-toggle"
          },
          {
            "state": "권한없음",
            "trigger": "구독 on",
            "guard": "iOS Safari·홈 미설치",
            "result": "설치 안내",
            "message": "홈 화면에 추가 후 이용하세요(iOS 16.4+)",
            "placement": "inline"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "appNotifSettings",
              "intent": "알림 설정 조회",
              "method": "GET",
              "path": "/app/notif-settings",
              "response": "{subscribed, categories}",
              "auth": "Bearer",
              "target": ".pd-toggle"
            }
          ],
          "writes": [
            {
              "id": "appPushSubscribe",
              "intent": "Web Push 구독 등록",
              "method": "POST",
              "path": "/app/push/subscribe",
              "body": "{endpoint, keys}",
              "auth": "Bearer",
              "note": "tenant는 JWT",
              "target": ".pd-toggle"
            },
            {
              "id": "appNotifSettingsUpdate",
              "intent": "카테고리별 수신 설정 저장",
              "method": "PUT",
              "path": "/app/notif-settings",
              "body": "{categories}",
              "auth": "Bearer"
            }
          ],
          "events": [
            {
              "id": "swRegister",
              "intent": "ServiceWorker 등록·푸시 구독 수명주기",
              "trigger": "navigator.serviceWorker"
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
            "label": "글자크기·앱정보"
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
            "text": "글자크기·앱정보(버전)",
            "target": ".pd-settings"
          },
          {
            "text": "알림 설정 — Web Push 설정(SCR-APP-011)",
            "target": ".pd-row"
          },
          {
            "text": "회원 탈퇴 — 비가역, 확인 모달 후 계정·데이터 삭제",
            "target": ".pd-withdraw"
          },
          {
            "text": "뒤로 — 마이(SCR-APP-006)",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "정상",
            "trigger": "진입",
            "guard": "로그인",
            "result": "설정 항목 표시",
            "message": "",
            "target": ".pd-settings"
          },
          {
            "state": "정상",
            "trigger": "탈퇴 확인",
            "guard": "확인 모달 2단계 승인",
            "result": "계정·데이터 삭제·로그아웃",
            "message": "탈퇴 처리됐어요",
            "placement": "toast",
            "target": ".pd-withdraw",
            "api": {
              "endpoint": "DELETE /app/me",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "탈퇴",
            "guard": "서버 오류",
            "result": "재시도",
            "message": "탈퇴를 처리하지 못했어요",
            "placement": "toast",
            "target": ".pd-withdraw"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "appSettings",
              "intent": "설정·앱정보 로드",
              "method": "GET",
              "path": "/app/settings",
              "response": "{fontSize, appVersion}",
              "auth": "Bearer",
              "target": ".pd-settings"
            }
          ],
          "writes": [
            {
              "id": "appWithdraw",
              "intent": "회원 탈퇴",
              "method": "DELETE",
              "path": "/app/me",
              "auth": "Bearer",
              "note": "비가역 삭제 — 확인 모달 2단계 필수, 멱등(재요청 시 이미 탈퇴 처리), tenant는 JWT·본인 레코드만",
              "target": ".pd-withdraw",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "탈퇴를 처리하지 못했어요"
                }
              ]
            }
          ],
          "events": []
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-APP-006",
              "via": "뒤로",
              "trigger": ".pd-btn"
            },
            {
              "screen": "SCR-APP-011",
              "via": "알림 설정",
              "trigger": ".pd-row"
            }
          ]
        }
      }
    ]
  },
  {
    "category": "교회 관리자 (admin · admin.hurmate.kr · PC웹)",
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
            "label": "관리자 로그인 폼"
          },
          {
            "role": ".pd-field",
            "kind": "form",
            "label": "이메일·비밀번호 입력"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "로그인",
            "action": {
              "on": "click",
              "do": "go:SCR-ADM-003"
            }
          }
        ],
        "description": [
          {
            "text": "로그인 폼 — 테넌트 스코프 관리자 계정(이메일·비밀번호). church 선택 없이 계정에 바인딩된 교회로 진입",
            "target": ".pd-form"
          },
          {
            "text": "로그인 버튼 — 설정 미완료면 개설 Wizard(SCR-ADM-002), 완료면 대시보드(SCR-ADM-003)",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입",
            "guard": "미입력",
            "result": "빈 로그인 폼",
            "message": "",
            "target": ".pd-form"
          },
          {
            "state": "정상",
            "trigger": "제출",
            "guard": "자격증명 일치·설정 완료",
            "result": "대시보드로 이동",
            "message": "",
            "target": ".pd-btn",
            "api": {
              "endpoint": "POST /admin/auth/login",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "제출",
            "guard": "자격증명 불일치",
            "result": "로그인 실패",
            "message": "이메일 또는 비밀번호를 확인해 주세요",
            "placement": "inline",
            "target": ".pd-form"
          }
        ],
        "interface": {
          "reads": [],
          "writes": [
            {
              "id": "adminLogin",
              "intent": "관리자 로그인",
              "method": "POST",
              "path": "/admin/auth/login",
              "body": "{email,password}",
              "response": "{token, onboardingComplete:boolean}",
              "auth": "none→Bearer",
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 401,
                  "when": "자격증명 불일치",
                  "message": "이메일 또는 비밀번호를 확인해 주세요"
                }
              ]
            }
          ],
          "events": []
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-ADM-002",
              "via": "설정 미완료 시 개설 Wizard"
            },
            {
              "screen": "SCR-ADM-003",
              "via": "설정 완료 시 대시보드",
              "trigger": ".pd-btn"
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
            "label": "STEP 1~8 진행 표시"
          },
          {
            "role": ".pd-form",
            "kind": "form",
            "label": "현재 단계 입력"
          },
          {
            "role": ".pd-field",
            "kind": "form",
            "label": "교회명·로고·색·이미지·기본정보·예배시간"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "다음 단계"
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
            "text": "진행 스테퍼 — 8단계 중 현재 위치 표시, 중단 후 재진입 시 이어쓰기",
            "target": ".pd-stepper"
          },
          {
            "text": "단계별 입력 폼 — 레이아웃/네비/타이포는 단일 DS 고정, 입력은 로고·대표색·커버·교회명·기본정보·예배시간만",
            "target": ".pd-form"
          },
          {
            "text": "OPEN 버튼 — STEP8 완주 시 교회 status=활성, 공개홈 오픈 후 대시보드(SCR-ADM-003)로 이동",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입",
            "guard": "저장값 없음",
            "result": "STEP1(교회명)부터 시작",
            "message": "교회 기본 정보부터 설정해요",
            "placement": "inline",
            "target": ".pd-stepper"
          },
          {
            "state": "정상",
            "trigger": "단계 저장·다음",
            "guard": "필수 입력 충족",
            "result": "다음 단계 진행·진행률 갱신",
            "message": "",
            "target": ".pd-form",
            "api": {
              "endpoint": "PUT /admin/onboarding/steps/{n}",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "다음",
            "guard": "필수 항목 누락",
            "result": "다음 단계 차단",
            "message": "필수 항목을 먼저 입력해 주세요",
            "placement": "inline",
            "target": ".pd-field"
          },
          {
            "state": "정상",
            "trigger": "OPEN",
            "guard": "STEP8 확인 완료",
            "result": "교회 활성화·공개홈 오픈",
            "message": "서비스가 오픈되었어요",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "POST /admin/onboarding/open",
              "status": 200
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "onboardingState",
              "intent": "Wizard 진행상태·저장값",
              "method": "GET",
              "path": "/admin/onboarding",
              "response": "{currentStep, values}",
              "auth": "Bearer",
              "target": ".pd-stepper",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "설정 정보를 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "saveStep",
              "intent": "단계 저장(멱등·이어쓰기)",
              "method": "PUT",
              "path": "/admin/onboarding/steps/{n}",
              "body": "{values}",
              "response": "{nextStep}",
              "auth": "Bearer",
              "idempotent": true,
              "target": ".pd-form",
              "errors": [
                {
                  "status": 422,
                  "when": "필수 누락",
                  "message": "필수 항목을 먼저 입력해 주세요"
                }
              ]
            },
            {
              "id": "openService",
              "intent": "서비스 오픈(비가역·활성화)",
              "method": "POST",
              "path": "/admin/onboarding/open",
              "body": "{Idempotency-Key}",
              "response": "{status:'active'}",
              "auth": "Bearer",
              "idempotent": true,
              "confirm": "오픈 전 확인 모달(pd-confirm)·멱등키로 중복 활성화 차단",
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 409,
                  "when": "이미 활성",
                  "message": "이미 오픈된 교회예요"
                }
              ]
            }
          ],
          "events": [
            {
              "id": "onboardingCompleted",
              "name": "onboarding.completed",
              "when": "OPEN 성공",
              "effect": "PwaConfig·Theme 반영·공개홈 노출"
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
            "label": "좌측 메뉴(대시보드·교회설정·교회소개·설교·주보·공지·회원·알림·PWA·앱(차기)·요금제·관리자)"
          },
          {
            "role": ".pd-kpi",
            "kind": "kpi",
            "label": "회원수·승인대기·발송수·스토리지"
          },
          {
            "role": ".pd-wpanel",
            "kind": "card",
            "label": "최근 공지·설교·주보 요약"
          },
          {
            "role": ".pd-stat",
            "kind": "kpi",
            "label": "가입 승인 대기 건수",
            "action": {
              "on": "click",
              "do": "go:SCR-ADM-010"
            }
          }
        ],
        "description": [
          {
            "text": "좌측 사이드바 — 회원(SCR-ADM-010)·설교(SCR-ADM-006)·공지(SCR-ADM-009)·알림(SCR-ADM-013) 등 전 메뉴 분기",
            "target": ".pd-sidebar"
          },
          {
            "text": "KPI 카드 — 회원수·가입승인대기·알림 발송 수·스토리지 사용량(본인 교회 집계만)",
            "target": ".pd-kpi"
          },
          {
            "text": "승인 대기 통계 — 클릭하면 회원 관리(SCR-ADM-010)로 이동",
            "target": ".pd-stat"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입",
            "guard": "집계 로딩 중",
            "result": "KPI 스켈레톤",
            "message": "",
            "target": ".pd-kpi"
          },
          {
            "state": "정상",
            "trigger": "응답",
            "guard": "교회 활성",
            "result": "KPI·최근 콘텐츠 요약 표시",
            "message": "",
            "target": ".pd-kpi",
            "api": {
              "endpoint": "GET /admin/dashboard",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답",
            "guard": "콘텐츠 0건(신규 개설)",
            "result": "빈 상태·설정 유도",
            "message": "아직 등록된 콘텐츠가 없어요. 설교·공지부터 올려보세요",
            "placement": "inline",
            "target": ".pd-wpanel"
          },
          {
            "state": "권한없음",
            "trigger": "진입",
            "guard": "타 테넌트 토큰",
            "result": "접근 차단",
            "message": "이 교회에 접근 권한이 없어요",
            "placement": "inline",
            "target": ".pd-kpi"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "dashboard",
              "intent": "대시보드 집계(tenant 격리)",
              "method": "GET",
              "path": "/admin/dashboard",
              "response": "{memberCount, pendingApprovals, sentCount, storageUsed, recent:{notices,sermons,bulletins}}",
              "auth": "Bearer",
              "target": ".pd-kpi",
              "errors": [
                {
                  "status": 403,
                  "when": "타 테넌트 접근",
                  "message": "이 교회에 접근 권한이 없어요"
                },
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "정보를 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [],
          "events": []
        },
        "flow": {
          "to": [
            {
              "screen": "SCR-ADM-010",
              "via": "회원 관리",
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
            "label": "교회 설정·브랜딩"
          },
          {
            "role": ".pd-form",
            "kind": "form",
            "label": "화이트라벨 4요소 편집"
          },
          {
            "role": ".pd-field",
            "kind": "form",
            "label": "로고·대표색·커버이미지·교회명"
          },
          {
            "role": ".pd-wpanel",
            "kind": "card",
            "label": "고정 Design System 안내(변경불가)"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "저장(즉시 반영)",
            "action": {
              "on": "click",
              "do": "go:SCR-ADM-003"
            }
          }
        ],
        "description": [
          {
            "text": "브랜딩 폼 — 로고·대표색·커버이미지·교회명 4요소만 편집, 저장 시 공개홈·교인앱·PWA에 즉시 반영",
            "target": ".pd-form"
          },
          {
            "text": "고정 DS 안내 패널 — 레이아웃·네비·그리드·타이포는 플랫폼 단일 Design System으로 변경 불가",
            "target": ".pd-wpanel"
          },
          {
            "text": "저장 버튼 — 반영 후 대시보드(SCR-ADM-003)로 복귀, PWA 아이콘/테마는 SCR-ADM-014와 연계",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입",
            "guard": "기존 브랜딩 로드",
            "result": "현재 로고·색·커버·교회명 표시",
            "message": "",
            "target": ".pd-form",
            "api": {
              "endpoint": "GET /admin/branding",
              "status": 200
            }
          },
          {
            "state": "정상",
            "trigger": "저장",
            "guard": "4요소 유효",
            "result": "즉시 반영·저장 완료",
            "message": "브랜딩이 반영되었어요",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "PUT /admin/branding",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "저장",
            "guard": "이미지 용량/형식 초과",
            "result": "저장 실패",
            "message": "로고·커버는 허용된 형식과 용량으로 올려주세요",
            "placement": "inline",
            "target": ".pd-field"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "branding",
              "intent": "현재 브랜딩 조회",
              "method": "GET",
              "path": "/admin/branding",
              "response": "{logo, primaryColor, cover, churchName}",
              "auth": "Bearer",
              "target": ".pd-form",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "설정을 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "saveBranding",
              "intent": "브랜딩 저장(즉시 반영)",
              "method": "PUT",
              "path": "/admin/branding",
              "body": "{logo, primaryColor, cover, churchName}",
              "response": "{applied:true}",
              "auth": "Bearer",
              "idempotent": true,
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 422,
                  "when": "이미지 형식/용량 오류",
                  "message": "로고·커버는 허용된 형식과 용량으로 올려주세요"
                }
              ]
            }
          ],
          "events": [
            {
              "id": "brandingUpdated",
              "name": "branding.updated",
              "when": "저장 성공",
              "effect": "공개홈·교인앱 즉시 반영·PwaConfig 아이콘/테마 재생성 유도"
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
            "label": "교회소개 콘텐츠"
          },
          {
            "role": ".pd-segment",
            "kind": "tabbar",
            "label": "소개·예배시간·오시는 길 탭"
          },
          {
            "role": ".pd-form",
            "kind": "form",
            "label": "소개·비전·예배시간표·주소/교통 편집"
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
            "text": "섹션 세그먼트 — 교회소개·예배시간·오시는 길만 편집(섬기는사람들·소식은 봉인)",
            "target": ".pd-segment"
          },
          {
            "text": "편집 폼 — 담임목사·소개·비전·예배시간표·주소/대중교통/주차, 공개홈(SCR-SITE-002)에 반영",
            "target": ".pd-form"
          },
          {
            "text": "저장 버튼 — 저장 후 대시보드(SCR-ADM-003)로 복귀",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입",
            "guard": "기존 콘텐츠 로드",
            "result": "현재 소개 콘텐츠 표시",
            "message": "",
            "target": ".pd-form",
            "api": {
              "endpoint": "GET /admin/site-content",
              "status": 200
            }
          },
          {
            "state": "정상",
            "trigger": "저장",
            "guard": "입력 유효",
            "result": "콘텐츠 저장·공개홈 반영",
            "message": "교회소개가 저장되었어요",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "PUT /admin/site-content",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "진입",
            "guard": "미작성",
            "result": "안내 플레이스홀더",
            "message": "교회 소개를 작성하면 공개홈에 노출돼요",
            "placement": "inline",
            "target": ".pd-form"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "siteContent",
              "intent": "교회소개 콘텐츠 조회",
              "method": "GET",
              "path": "/admin/site-content",
              "response": "{about, vision, worshipTimes, location}",
              "auth": "Bearer",
              "target": ".pd-form",
              "errors": [
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
              "intent": "교회소개 저장",
              "method": "PUT",
              "path": "/admin/site-content",
              "body": "{about, vision, worshipTimes, location}",
              "response": "{saved:true}",
              "auth": "Bearer",
              "idempotent": true,
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 422,
                  "when": "입력 오류",
                  "message": "입력 내용을 확인해 주세요"
                }
              ]
            }
          ],
          "events": []
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
            "label": "설교 등록",
            "action": {
              "on": "click",
              "do": "go:SCR-ADM-007"
            }
          },
          {
            "role": ".pd-table",
            "kind": "table",
            "label": "설교 목록(제목·설교자·날짜·YouTube)",
            "action": {
              "on": "click",
              "do": "go:SCR-ADM-007"
            }
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "삭제"
          }
        ],
        "description": [
          {
            "text": "등록 버튼 — 설교 등록 폼(SCR-ADM-007)으로 이동",
            "target": ".pd-pagehead-actions"
          },
          {
            "text": "설교 테이블 — 행 클릭 시 수정 폼(SCR-ADM-007), YouTube 썸네일 자동 노출(자체 영상 저장 없음)",
            "target": ".pd-table"
          },
          {
            "text": "삭제 버튼 — 확인 모달 후 설교 삭제",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "정상",
            "trigger": "응답",
            "guard": "설교 1건+",
            "result": "설교 목록 표시",
            "message": "",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /admin/sermons",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답",
            "guard": "설교 0건",
            "result": "빈 상태·등록 유도",
            "message": "아직 등록된 설교가 없어요. 첫 설교를 올려보세요",
            "placement": "inline",
            "target": ".pd-table"
          },
          {
            "state": "에러",
            "trigger": "삭제",
            "guard": "서버 오류",
            "result": "삭제 실패",
            "message": "삭제하지 못했어요. 다시 시도해 주세요",
            "placement": "toast",
            "target": ".pd-btn"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "sermonList",
              "intent": "설교 목록",
              "method": "GET",
              "path": "/admin/sermons",
              "response": "{entities.Sermon}[]",
              "auth": "Bearer",
              "target": ".pd-table",
              "errors": [
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
              "id": "deleteSermon",
              "intent": "설교 삭제(비가역)",
              "method": "DELETE",
              "path": "/admin/sermons/{id}",
              "response": "{deleted:true}",
              "auth": "Bearer",
              "idempotent": true,
              "confirm": "삭제 확인 모달(pd-confirm)",
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 404,
                  "when": "이미 삭제됨",
                  "message": "이미 삭제된 설교예요"
                }
              ]
            }
          ],
          "events": []
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
            "label": "설교 등록/수정"
          },
          {
            "role": ".pd-form",
            "kind": "form",
            "label": "설교 입력 폼"
          },
          {
            "role": ".pd-field",
            "kind": "form",
            "label": "제목·설교자·날짜·성경본문·설명·YouTube URL"
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
            "text": "입력 폼 — YouTube URL 입력 시 썸네일 자동 추출(자체 영상 저장 없음)",
            "target": ".pd-form"
          },
          {
            "text": "저장 버튼 — 저장 후 설교 목록(SCR-ADM-006)으로 복귀",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입(수정)",
            "guard": "기존 설교 로드",
            "result": "기존 값 채움",
            "message": "",
            "target": ".pd-form",
            "api": {
              "endpoint": "GET /admin/sermons/{id}",
              "status": 200
            }
          },
          {
            "state": "정상",
            "trigger": "저장",
            "guard": "필수·URL 유효",
            "result": "설교 저장·썸네일 생성",
            "message": "설교가 저장되었어요",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "PUT /admin/sermons/{id}",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "저장",
            "guard": "YouTube URL 형식 오류",
            "result": "저장 차단",
            "message": "올바른 YouTube 주소를 입력해 주세요",
            "placement": "inline",
            "target": ".pd-field"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "sermonDetail",
              "intent": "설교 단건 조회(수정 시)",
              "method": "GET",
              "path": "/admin/sermons/{id}",
              "response": "{entities.Sermon}",
              "auth": "Bearer",
              "target": ".pd-form",
              "errors": [
                {
                  "status": 404,
                  "when": "없음",
                  "message": "설교를 찾을 수 없어요"
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "saveSermon",
              "intent": "설교 등록/수정",
              "method": "PUT",
              "path": "/admin/sermons/{id}",
              "body": "{title, preacher, date, scripture, desc, youtubeUrl}",
              "response": "{saved:true, thumbnail}",
              "auth": "Bearer",
              "idempotent": true,
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 422,
                  "when": "URL 형식 오류",
                  "message": "올바른 YouTube 주소를 입력해 주세요"
                }
              ]
            }
          ],
          "events": []
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
            "label": "주보 업로드"
          },
          {
            "role": ".pd-form",
            "kind": "form",
            "label": "주차(날짜)·파일·대표이미지 업로드"
          },
          {
            "role": ".pd-table",
            "kind": "table",
            "label": "주보 목록(주차·업로드일)"
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
            "text": "업로드 폼 — 주차(날짜) 지정 후 PDF/이미지 파일·대표이미지 업로드",
            "target": ".pd-form"
          },
          {
            "text": "주보 테이블 — 발행된 주보 목록(최신호+지난호), 교인앱 주보(SCR-APP-004)에 노출",
            "target": ".pd-table"
          },
          {
            "text": "저장 버튼 — 업로드 후 대시보드(SCR-ADM-003)로 복귀",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "정상",
            "trigger": "응답",
            "guard": "주보 1건+",
            "result": "주보 목록 표시",
            "message": "",
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
            "result": "빈 상태·업로드 유도",
            "message": "아직 발행된 주보가 없어요",
            "placement": "inline",
            "target": ".pd-table"
          },
          {
            "state": "에러",
            "trigger": "업로드",
            "guard": "파일 형식/용량 초과",
            "result": "업로드 실패",
            "message": "PDF 또는 이미지 파일을 허용 용량 내로 올려주세요",
            "placement": "inline",
            "target": ".pd-form"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "bulletinList",
              "intent": "주보 목록",
              "method": "GET",
              "path": "/admin/bulletins",
              "response": "{entities.Bulletin}[]",
              "auth": "Bearer",
              "target": ".pd-table",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "주보 목록을 불러오지 못했어요"
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
              "body": "multipart{weekDate, file, cover}",
              "response": "{entities.Bulletin}",
              "auth": "Bearer",
              "idempotent": false,
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 413,
                  "when": "용량 초과",
                  "message": "허용 용량을 초과했어요"
                },
                {
                  "status": 422,
                  "when": "형식 오류",
                  "message": "PDF 또는 이미지 파일을 올려주세요"
                }
              ]
            }
          ],
          "events": []
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
            "label": "공지 관리"
          },
          {
            "role": ".pd-form",
            "kind": "form",
            "label": "공지 작성(제목·본문·이미지·첨부)"
          },
          {
            "role": ".pd-table",
            "kind": "table",
            "label": "공지 목록"
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
            "text": "공지 작성 폼 — 제목·본문·이미지·첨부·게시일",
            "target": ".pd-form"
          },
          {
            "text": "옵션 토글 — 중요공지·상단고정·알림 발송 여부(Web Push 연동)"
          },
          {
            "text": "게시 버튼 — 알림 발송 선택 시 알림 관리·발송(SCR-ADM-013)으로 연계되어 Web Push 발송",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "정상",
            "trigger": "응답",
            "guard": "공지 1건+",
            "result": "공지 목록 표시",
            "message": "",
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
            "result": "빈 상태·작성 유도",
            "message": "아직 등록된 공지가 없어요",
            "placement": "inline",
            "target": ".pd-table"
          },
          {
            "state": "정상",
            "trigger": "게시",
            "guard": "제목·본문 유효",
            "result": "공지 게시(+알림 발송 선택 시 Web Push)",
            "message": "공지가 게시되었어요",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "POST /admin/notices",
              "status": 201
            }
          },
          {
            "state": "에러",
            "trigger": "게시",
            "guard": "제목 누락",
            "result": "게시 차단",
            "message": "제목과 본문을 입력해 주세요",
            "placement": "inline",
            "target": ".pd-form"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "noticeList",
              "intent": "공지 목록",
              "method": "GET",
              "path": "/admin/notices",
              "response": "{entities.Notice}[]",
              "auth": "Bearer",
              "target": ".pd-table",
              "errors": [
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
              "intent": "공지 게시(+선택 시 알림 발송)",
              "method": "POST",
              "path": "/admin/notices",
              "body": "{title, body, images, attach, publishAt, pinned, important, pushOnPublish}",
              "response": "{entities.Notice}",
              "auth": "Bearer",
              "idempotent": false,
              "confirm": "pushOnPublish=true면 대량 Web Push 발송 확인 모달(pd-confirm)·멱등키",
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 422,
                  "when": "필수 누락",
                  "message": "제목과 본문을 입력해 주세요"
                }
              ]
            }
          ],
          "events": [
            {
              "id": "noticePublished",
              "name": "notice.published",
              "when": "게시 성공·pushOnPublish=true",
              "effect": "Notification Gateway 경유 Web Push 발송(DeepLink=notice+id)"
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
        "label": "회원 관리",
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
            "label": "회원 관리"
          },
          {
            "role": ".pd-pagehead-actions",
            "kind": "button",
            "label": "회원 등록",
            "action": {
              "on": "click",
              "do": "go:SCR-ADM-012"
            }
          },
          {
            "role": ".pd-table",
            "kind": "table",
            "label": "회원 목록(이름·휴대전화·이메일·가입상태)",
            "action": {
              "on": "click",
              "do": "go:SCR-ADM-011"
            }
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "가입 승인"
          }
        ],
        "description": [
          {
            "text": "상태 세그먼트 — 전체·승인대기·승인완료로 필터"
          },
          {
            "text": "회원 테이블 — 행 클릭 시 회원 상세(SCR-ADM-011), 교적/직분 없는 단순 정보",
            "target": ".pd-table"
          },
          {
            "text": "승인 버튼 — 대기 회원 가입 승인(확인 후 처리), 등록 버튼은 회원 등록/수정(SCR-ADM-012)",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "정상",
            "trigger": "응답",
            "guard": "회원 1명+",
            "result": "회원 목록·상태 표시",
            "message": "",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /admin/members",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답",
            "guard": "회원 0명",
            "result": "빈 상태",
            "message": "아직 가입한 교인이 없어요",
            "placement": "inline",
            "target": ".pd-table"
          },
          {
            "state": "정상",
            "trigger": "승인",
            "guard": "대기 회원 선택",
            "result": "가입상태=승인 전환",
            "message": "가입을 승인했어요",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "PATCH /admin/members/{id}/status",
              "status": 200
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "memberList",
              "intent": "회원 목록(tenant 격리)",
              "method": "GET",
              "path": "/admin/members",
              "query": "status",
              "response": "{entities.Member}[]",
              "auth": "Bearer",
              "target": ".pd-table",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "회원 목록을 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "approveMember",
              "intent": "가입 승인",
              "method": "PATCH",
              "path": "/admin/members/{id}/status",
              "body": "{status:'approved'}",
              "response": "{updated:true}",
              "auth": "Bearer",
              "idempotent": true,
              "confirm": "승인 확인(pd-confirm)·멱등 처리로 중복 승인 무해",
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 409,
                  "when": "이미 승인됨",
                  "message": "이미 승인된 회원이에요"
                }
              ]
            }
          ],
          "events": []
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
            "label": "회원 상세"
          },
          {
            "role": ".pd-wpanel",
            "kind": "card",
            "label": "회원 정보(이름·휴대전화·이메일·가입상태)"
          },
          {
            "role": ".pd-badge",
            "kind": "card",
            "label": "가입상태 배지(승인/대기)"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "가입 승인"
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
            "text": "정보 패널 — 이름·휴대전화·이메일·가입상태(교적/직분 등 민감정보 없음)",
            "target": ".pd-wpanel"
          },
          {
            "text": "승인 버튼 — 대기 상태면 가입 승인 처리",
            "target": ".pd-btn"
          },
          {
            "text": "수정 버튼 — 회원 등록/수정 폼(SCR-ADM-012)으로, 목록은 SCR-ADM-010",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "정상",
            "trigger": "응답",
            "guard": "회원 존재",
            "result": "회원 정보 표시",
            "message": "",
            "target": ".pd-wpanel",
            "api": {
              "endpoint": "GET /admin/members/{id}",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "진입",
            "guard": "회원 없음",
            "result": "조회 실패",
            "message": "회원을 찾을 수 없어요",
            "placement": "inline",
            "target": ".pd-wpanel"
          },
          {
            "state": "정상",
            "trigger": "승인",
            "guard": "대기 상태",
            "result": "가입상태=승인",
            "message": "가입을 승인했어요",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "PATCH /admin/members/{id}/status",
              "status": 200
            }
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "memberDetail",
              "intent": "회원 단건 조회",
              "method": "GET",
              "path": "/admin/members/{id}",
              "response": "{entities.Member}",
              "auth": "Bearer",
              "target": ".pd-wpanel",
              "errors": [
                {
                  "status": 404,
                  "when": "없음",
                  "message": "회원을 찾을 수 없어요"
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "changeMemberStatus",
              "intent": "가입상태 변경(승인)",
              "method": "PATCH",
              "path": "/admin/members/{id}/status",
              "body": "{status}",
              "response": "{updated:true}",
              "auth": "Bearer",
              "idempotent": true,
              "confirm": "승인 확인(pd-confirm)·멱등",
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 409,
                  "when": "이미 처리됨",
                  "message": "이미 처리된 회원이에요"
                }
              ]
            }
          ],
          "events": []
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
            "label": "회원 등록/수정"
          },
          {
            "role": ".pd-form",
            "kind": "form",
            "label": "회원 입력 폼"
          },
          {
            "role": ".pd-field",
            "kind": "form",
            "label": "이름·휴대전화·이메일·가입상태"
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
            "text": "입력 폼 — 이름·휴대전화·이메일·가입상태(교적/직분 등 민감정보 없음)",
            "target": ".pd-form"
          },
          {
            "text": "저장 버튼 — 저장 후 회원 목록(SCR-ADM-010)으로 복귀",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입(수정)",
            "guard": "기존 회원 로드",
            "result": "기존 값 채움",
            "message": "",
            "target": ".pd-form",
            "api": {
              "endpoint": "GET /admin/members/{id}",
              "status": 200
            }
          },
          {
            "state": "정상",
            "trigger": "저장",
            "guard": "필수 유효",
            "result": "회원 저장",
            "message": "회원 정보가 저장되었어요",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "PUT /admin/members/{id}",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "저장",
            "guard": "휴대전화/이메일 형식 오류",
            "result": "저장 차단",
            "message": "휴대전화·이메일 형식을 확인해 주세요",
            "placement": "inline",
            "target": ".pd-field"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "memberForm",
              "intent": "회원 단건(수정 시)",
              "method": "GET",
              "path": "/admin/members/{id}",
              "response": "{entities.Member}",
              "auth": "Bearer",
              "target": ".pd-form",
              "errors": [
                {
                  "status": 404,
                  "when": "없음",
                  "message": "회원을 찾을 수 없어요"
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "saveMember",
              "intent": "회원 등록/수정",
              "method": "PUT",
              "path": "/admin/members/{id}",
              "body": "{name, phone, email, status}",
              "response": "{saved:true}",
              "auth": "Bearer",
              "idempotent": true,
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 422,
                  "when": "형식 오류",
                  "message": "휴대전화·이메일 형식을 확인해 주세요"
                }
              ]
            }
          ],
          "events": []
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
            "label": "알림 관리·발송"
          },
          {
            "role": ".pd-form",
            "kind": "form",
            "label": "알림 작성(제목·본문·연결 콘텐츠)"
          },
          {
            "role": ".pd-badge",
            "kind": "card",
            "label": "채널(Web Push 활성 / SMS·Kakao 비활성)"
          },
          {
            "role": ".pd-table",
            "kind": "table",
            "label": "발송 이력"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "전체 발송",
            "action": {
              "on": "click",
              "do": "go:SCR-ADM-003"
            }
          }
        ],
        "description": [
          {
            "text": "알림 작성 폼 — 제목·본문·연결 콘텐츠(설교/공지/주보 DeepLink), 대상=전체회원 broadcast",
            "target": ".pd-form"
          },
          {
            "text": "채널 배지 — MVP는 Web Push만 활성, SMS·Kakao는 비활성 슬롯 표시",
            "target": ".pd-badge"
          },
          {
            "text": "전체 발송 버튼 — 대량발송(비가역) 확인 모달 후 Gateway 경유 발송, 완료 시 대시보드(SCR-ADM-003)",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입",
            "guard": "발송 이력 로드",
            "result": "대상 수·최근 발송 이력 표시",
            "message": "",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /admin/notifications",
              "status": 200
            }
          },
          {
            "state": "정상",
            "trigger": "전체 발송",
            "guard": "제목·본문 유효·확인 완료",
            "result": "Web Push broadcast 발송",
            "message": "전체 회원에게 알림을 발송했어요",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "POST /admin/notifications/broadcast",
              "status": 202
            }
          },
          {
            "state": "빈데이터",
            "trigger": "진입",
            "guard": "구독 회원 0명",
            "result": "발송 대상 없음",
            "message": "아직 Web Push를 구독한 교인이 없어요",
            "placement": "inline",
            "target": ".pd-form"
          },
          {
            "state": "에러",
            "trigger": "전체 발송",
            "guard": "Gateway 오류",
            "result": "발송 실패",
            "message": "발송에 실패했어요. 잠시 후 다시 시도해 주세요",
            "placement": "toast",
            "target": ".pd-btn"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "notifHistory",
              "intent": "발송 이력·대상 수",
              "method": "GET",
              "path": "/admin/notifications",
              "response": "{history:[], subscriberCount}",
              "auth": "Bearer",
              "target": ".pd-table",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "발송 이력을 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "broadcast",
              "intent": "전체 Web Push 발송(비가역·대량)",
              "method": "POST",
              "path": "/admin/notifications/broadcast",
              "body": "{title, body, deepLink, scheduleAt, Idempotency-Key}",
              "response": "{accepted:true, estTargets}",
              "auth": "Bearer",
              "idempotent": true,
              "confirm": "대량발송 확인 모달(pd-confirm)·멱등키로 중복 발송 차단·취소 불가 고지",
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 502,
                  "when": "Gateway 오류",
                  "message": "발송에 실패했어요. 잠시 후 다시 시도해 주세요"
                }
              ]
            }
          ],
          "events": [
            {
              "id": "notificationSent",
              "name": "notification.sent",
              "when": "발송 접수",
              "effect": "Notification Gateway→Web Push 전달·DeepLink로 교인앱 콘텐츠 이동(SCR-APP-010)"
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
            "label": "PWA 관리"
          },
          {
            "role": ".pd-form",
            "kind": "form",
            "label": "PwaConfig 편집"
          },
          {
            "role": ".pd-field",
            "kind": "form",
            "label": "이름·Short Name·아이콘·테마컬러·start_url"
          },
          {
            "role": ".pd-wpanel",
            "kind": "card",
            "label": "홈 화면 설치 미리보기"
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
            "text": "PwaConfig 폼 — 브랜딩 로고에서 192/512 아이콘 자동 생성 후 이름·Short Name·테마컬러·start_url 보정",
            "target": ".pd-form"
          },
          {
            "text": "미리보기 패널 — 홈 화면 설치 시 아이콘(교회 로고+교회명) 모습 확인",
            "target": ".pd-wpanel"
          },
          {
            "text": "저장 버튼 — 저장 후 대시보드(SCR-ADM-003)로 복귀, 설치 안내는 공개홈(SCR-SITE-007)에서 노출",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입",
            "guard": "브랜딩 기반 자동 생성값",
            "result": "자동 생성된 PwaConfig 표시",
            "message": "교회 정보에서 자동으로 만들었어요. 필요하면 보정하세요",
            "placement": "inline",
            "target": ".pd-form",
            "api": {
              "endpoint": "GET /admin/pwa-config",
              "status": 200
            }
          },
          {
            "state": "정상",
            "trigger": "저장",
            "guard": "아이콘·start_url 유효",
            "result": "PwaConfig 저장",
            "message": "PWA 설정이 저장되었어요",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "PUT /admin/pwa-config",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "저장",
            "guard": "아이콘 규격 미달",
            "result": "저장 차단",
            "message": "아이콘은 192·512 규격 이미지가 필요해요",
            "placement": "inline",
            "target": ".pd-field"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "pwaConfig",
              "intent": "PwaConfig 조회(자동 생성 포함)",
              "method": "GET",
              "path": "/admin/pwa-config",
              "response": "{name, shortName, icons, themeColor, startUrl}",
              "auth": "Bearer",
              "target": ".pd-form",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "PWA 설정을 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "savePwaConfig",
              "intent": "PwaConfig 저장",
              "method": "PUT",
              "path": "/admin/pwa-config",
              "body": "{name, shortName, icons, themeColor, startUrl}",
              "response": "{saved:true}",
              "auth": "Bearer",
              "idempotent": true,
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 422,
                  "when": "아이콘 규격 오류",
                  "message": "아이콘은 192·512 규격 이미지가 필요해요"
                }
              ]
            }
          ],
          "events": [
            {
              "id": "pwaConfigUpdated",
              "name": "pwaconfig.updated",
              "when": "저장 성공",
              "effect": "manifest 갱신·홈 화면 설치 아이콘 반영"
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
            "label": "앱(Native) 관리"
          },
          {
            "role": ".pd-wpanel",
            "kind": "card",
            "label": "준비 중 안내 배너(차기 Premium Add-on)"
          },
          {
            "role": ".pd-form",
            "kind": "form",
            "label": "AppConfig(iOS 번들ID·Android 패키지명·스토어·버전) — 비활성"
          },
          {
            "role": ".pd-badge",
            "kind": "card",
            "label": "상태 배지(준비 중)"
          }
        ],
        "description": [
          {
            "text": "준비 중 안내 배너 — Native App은 차기 Premium Add-on, APP 상품 구매 교회 전용(Phase6)이라고 고지",
            "target": ".pd-wpanel"
          },
          {
            "text": "AppConfig 폼 — iOS 번들ID·Android 패키지명·스토어 상태·버전 필드는 V1에서 비활성(조회만)",
            "target": ".pd-form"
          },
          {
            "text": "상태 배지 — '준비 중' 표시, 활성화는 APP 상품 구매 후",
            "target": ".pd-badge"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입",
            "guard": "APP 상품 미구매",
            "result": "준비 중 안내·폼 비활성",
            "message": "Native 앱은 차기 Premium Add-on이에요. 준비 중입니다",
            "placement": "inline",
            "target": ".pd-wpanel"
          },
          {
            "state": "권한없음",
            "trigger": "진입",
            "guard": "APP 상품 미포함 플랜",
            "result": "구매 안내",
            "message": "APP 상품을 이용하는 교회에서만 설정할 수 있어요",
            "placement": "inline",
            "target": ".pd-badge"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "appConfig",
              "intent": "AppConfig 상태 조회(차기·조회만)",
              "method": "GET",
              "path": "/admin/app-config",
              "response": "{status:'preparing', iosBundleId, androidPackage, storeStatus, version}",
              "auth": "Bearer",
              "target": ".pd-form",
              "errors": [
                {
                  "status": 404,
                  "when": "APP 상품 미구매",
                  "message": "APP 상품을 이용하는 교회에서만 설정할 수 있어요"
                }
              ]
            }
          ],
          "writes": [],
          "events": []
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
            "label": "현재 요금제·결제 상태(금액 미확정)"
          },
          {
            "role": ".pd-kpi",
            "kind": "kpi",
            "label": "사용현황(회원수·스토리지·발송 수)"
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
            "text": "요금제 패널 — 현재 플랜(WEB/WEB+APP)·결제 상태, 금액은 '시장검증 후 확정(미확정)' placeholder 표기",
            "target": ".pd-wpanel"
          },
          {
            "text": "사용현황 KPI — 회원수·스토리지·알림 발송 수(본인 교회만)",
            "target": ".pd-kpi"
          },
          {
            "text": "플랜 변경 요청 버튼 — 요청 접수 후 슈퍼 처리, 대시보드(SCR-ADM-003)로 복귀",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "정상",
            "trigger": "응답",
            "guard": "플랜 존재",
            "result": "요금제·사용현황 표시",
            "message": "요금은 시장검증 후 확정 예정이에요(미확정)",
            "placement": "inline",
            "target": ".pd-wpanel",
            "api": {
              "endpoint": "GET /admin/billing",
              "status": 200
            }
          },
          {
            "state": "정상",
            "trigger": "변경 요청",
            "guard": "요청 유효",
            "result": "플랜 변경 요청 접수",
            "message": "플랜 변경을 요청했어요. 확인 후 안내드릴게요",
            "placement": "toast",
            "target": ".pd-btn",
            "api": {
              "endpoint": "POST /admin/billing/plan-change-request",
              "status": 202
            }
          },
          {
            "state": "에러",
            "trigger": "응답",
            "guard": "서버 오류",
            "result": "조회 실패",
            "message": "요금제 정보를 불러오지 못했어요",
            "placement": "inline",
            "target": ".pd-kpi"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "billing",
              "intent": "요금제·사용현황 조회",
              "method": "GET",
              "path": "/admin/billing",
              "response": "{plan, paymentStatus, priceTBD:true, usage:{members,storage,sent}}",
              "auth": "Bearer",
              "target": ".pd-wpanel",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "요금제 정보를 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "planChangeRequest",
              "intent": "플랜 변경 요청",
              "method": "POST",
              "path": "/admin/billing/plan-change-request",
              "body": "{targetPlan, note}",
              "response": "{requested:true}",
              "auth": "Bearer",
              "idempotent": true,
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 409,
                  "when": "진행 중 요청 존재",
                  "message": "이미 처리 중인 요청이 있어요"
                }
              ]
            }
          ],
          "events": []
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
            "label": "관리자 목록(이름·이메일·권한)"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "권한 해제"
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
            "text": "초대 버튼 — 담임목사가 관리자 권한 위임(이메일 초대)",
            "target": ".pd-pagehead-actions"
          },
          {
            "text": "관리자 테이블 — 본인 교회 관리자 목록·권한(tenant 격리)",
            "target": ".pd-table"
          },
          {
            "text": "로그아웃 버튼 — 세션 종료 후 관리자 로그인(SCR-ADM-001)으로 이동",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "정상",
            "trigger": "응답",
            "guard": "관리자 1명+",
            "result": "관리자 목록 표시",
            "message": "",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /admin/admins",
              "status": 200
            }
          },
          {
            "state": "정상",
            "trigger": "초대",
            "guard": "이메일 유효",
            "result": "초대 메일 발송",
            "message": "관리자 초대를 보냈어요",
            "placement": "toast",
            "target": ".pd-pagehead-actions",
            "api": {
              "endpoint": "POST /admin/admins/invite",
              "status": 202
            }
          },
          {
            "state": "에러",
            "trigger": "권한 해제",
            "guard": "본인 계정 해제 시도",
            "result": "해제 차단",
            "message": "본인 계정의 권한은 해제할 수 없어요",
            "placement": "inline",
            "target": ".pd-btn"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "adminList",
              "intent": "관리자 목록(tenant 격리)",
              "method": "GET",
              "path": "/admin/admins",
              "response": "{admins:[]}",
              "auth": "Bearer",
              "target": ".pd-table",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "관리자 목록을 불러오지 못했어요"
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "inviteAdmin",
              "intent": "관리자 초대(위임)",
              "method": "POST",
              "path": "/admin/admins/invite",
              "body": "{email, role:'admin'}",
              "response": "{invited:true}",
              "auth": "Bearer",
              "idempotent": true,
              "target": ".pd-pagehead-actions",
              "errors": [
                {
                  "status": 422,
                  "when": "이메일 형식 오류",
                  "message": "올바른 이메일을 입력해 주세요"
                }
              ]
            },
            {
              "id": "revokeAdmin",
              "intent": "관리자 권한 해제(비가역)",
              "method": "DELETE",
              "path": "/admin/admins/{id}",
              "response": "{revoked:true}",
              "auth": "Bearer",
              "idempotent": true,
              "confirm": "권한 해제 확인 모달(pd-confirm)·본인 계정 해제 차단",
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 409,
                  "when": "본인 계정",
                  "message": "본인 계정의 권한은 해제할 수 없어요"
                }
              ]
            },
            {
              "id": "adminLogout",
              "intent": "로그아웃",
              "method": "POST",
              "path": "/admin/auth/logout",
              "response": "{ok:true}",
              "auth": "Bearer",
              "idempotent": true,
              "target": ".pd-btn",
              "errors": []
            }
          ],
          "events": []
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
              "via": "로그아웃",
              "trigger": ".pd-btn"
            }
          ]
        }
      }
    ]
  },
  {
    "category": "슈퍼관리자 (super · console.hurmate.kr · PC웹)",
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
            "label": "운영자 로그인"
          },
          {
            "role": ".pd-field",
            "kind": "field",
            "label": "운영자 ID·비밀번호"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "로그인",
            "action": {
              "on": "click",
              "do": "go:SCR-SUP-002"
            }
          }
        ],
        "description": [
          {
            "text": "운영자 ID·비밀번호 입력 — 플랫폼 운영자 계정만 접근",
            "target": ".pd-field"
          },
          {
            "text": "로그인 — 인증 성공 시 Super 대시보드(SCR-SUP-002)",
            "target": ".pd-btn"
          },
          {
            "text": "운영자 전용 콘솔임을 표시(교회 관리자 콘솔과 분리)"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입",
            "guard": "미입력",
            "result": "빈 로그인 폼",
            "message": "",
            "target": ".pd-form"
          },
          {
            "state": "정상",
            "trigger": "제출",
            "guard": "자격 일치",
            "result": "세션 발급·대시보드 이동",
            "message": "",
            "target": ".pd-btn",
            "api": {
              "endpoint": "POST /super/auth/login",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "제출",
            "guard": "자격 불일치",
            "result": "로그인 실패",
            "message": "아이디 또는 비밀번호가 올바르지 않습니다",
            "placement": "inline",
            "target": ".pd-field"
          },
          {
            "state": "권한없음",
            "trigger": "제출",
            "guard": "비운영자 계정",
            "result": "접근 거부",
            "message": "플랫폼 운영자만 접근할 수 있습니다",
            "placement": "inline",
            "target": ".pd-form"
          }
        ],
        "interface": {
          "reads": [],
          "writes": [
            {
              "id": "superLogin",
              "intent": "운영자 인증",
              "method": "POST",
              "path": "/super/auth/login",
              "request": "{email,password}",
              "response": "{token}",
              "auth": "none",
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 401,
                  "when": "자격 불일치",
                  "message": "아이디 또는 비밀번호가 올바르지 않습니다"
                },
                {
                  "status": 403,
                  "when": "비운영자 계정",
                  "message": "플랫폼 운영자만 접근할 수 있습니다"
                }
              ]
            }
          ],
          "events": [
            {
              "name": "super.login.success",
              "when": "인증 성공"
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
            "label": "전체 교회·활성·일시정지·해지"
          },
          {
            "role": ".pd-stat",
            "kind": "stat",
            "label": "신규 개설 신청(처리대기)",
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
            "text": "전체 교회·상태 집계 KPI(활성·일시정지·해지)",
            "target": ".pd-kpi"
          },
          {
            "text": "신규 개설 신청(처리대기) — 클릭 시 개설 검토·승인(SCR-SUP-004)",
            "target": ".pd-stat"
          },
          {
            "text": "서비스 상태 모니터 — 서비스 콘솔(SCR-SUP-008)",
            "target": ".pd-wpanel"
          },
          {
            "text": "전체 교회 현황 테이블 — 전체 교회 관리(SCR-SUP-003)",
            "target": ".pd-table"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입",
            "guard": "로딩",
            "result": "KPI 스켈레톤",
            "message": "",
            "target": ".pd-kpi"
          },
          {
            "state": "정상",
            "trigger": "응답",
            "guard": "교회 1곳+",
            "result": "집계·처리대기·서비스 상태 표시",
            "message": "",
            "target": ".pd-kpi",
            "api": {
              "endpoint": "GET /super/dashboard",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답",
            "guard": "교회 0곳",
            "result": "개설 신청 유도",
            "message": "아직 개설된 교회가 없습니다",
            "placement": "inline",
            "target": ".pd-table"
          },
          {
            "state": "에러",
            "trigger": "응답",
            "guard": "서버 오류",
            "result": "집계 실패",
            "message": "현황을 불러오지 못했습니다",
            "placement": "inline",
            "target": ".pd-kpi"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "superDashboard",
              "intent": "플랫폼 집계",
              "method": "GET",
              "path": "/super/dashboard",
              "response": "{tenants,pendingApplications,billing,serviceStatus}",
              "auth": "Bearer(Super)",
              "target": ".pd-kpi",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "현황을 불러오지 못했습니다"
                }
              ]
            }
          ],
          "writes": [],
          "events": []
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
            "label": "전체 교회 목록(Tenant)",
            "action": {
              "on": "click",
              "do": "go:SCR-SUP-005"
            }
          },
          {
            "role": ".pd-badge",
            "kind": "badge",
            "label": "서비스 상태·결제 상태"
          }
        ],
        "description": [
          {
            "text": "교회 행 클릭 — 테넌트 상세(SCR-SUP-005)",
            "target": ".pd-table"
          },
          {
            "text": "상태 필터 — 활성·일시정지·해지로 교회 목록 좁히기"
          },
          {
            "text": "서비스·결제 상태 뱃지",
            "target": ".pd-badge"
          },
          {
            "text": "상태 전이(일시정지·해지)는 비가역이므로 확인 모달 + 멱등 처리"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입",
            "guard": "로딩",
            "result": "테이블 스켈레톤",
            "message": "",
            "target": ".pd-table"
          },
          {
            "state": "정상",
            "trigger": "응답",
            "guard": "교회 1곳+",
            "result": "교회 목록·상태 표시",
            "message": "",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /super/tenants",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답",
            "guard": "교회 0곳",
            "result": "빈 목록",
            "message": "조건에 맞는 교회가 없습니다",
            "placement": "inline",
            "target": ".pd-table"
          },
          {
            "state": "에러",
            "trigger": "전이",
            "guard": "해지 실패",
            "result": "상태 미변경",
            "message": "상태를 변경하지 못했습니다",
            "placement": "toast"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "tenantList",
              "intent": "전체 교회 조회",
              "method": "GET",
              "path": "/super/tenants",
              "response": "{tenants}[]",
              "auth": "Bearer(Super)",
              "target": ".pd-table",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "교회 목록을 불러오지 못했습니다"
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "tenantStatus",
              "intent": "서비스 상태 전이",
              "method": "PATCH",
              "path": "/super/tenants/{tenantId}/status",
              "request": "{status}",
              "idempotency": "Idempotency-Key(멱등)",
              "confirm": "일시정지·해지는 pd-confirm 확인 필수(비가역)",
              "auth": "Bearer(Super)",
              "errors": [
                {
                  "status": 409,
                  "when": "전이 불가 상태",
                  "message": "현재 상태에서는 변경할 수 없습니다"
                }
              ]
            }
          ],
          "events": [
            {
              "name": "tenant.status.changed",
              "when": "상태 전이 확정"
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
            "label": "신청 상세(교회정보·요금제·희망slug)"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "반려(사유 입력)"
          }
        ],
        "description": [
          {
            "text": "처리대기 신청 목록 — 행 선택 시 신청 상세 패널 열림"
          },
          {
            "text": "신청 상세 — 교회명·대표자·담당자·연락처·규모·희망 slug·요금제(WEB/WEB+APP)",
            "target": ".pd-wpanel"
          },
          {
            "text": "승인 — 확인 후 Tenant·Church·Admin·Domain·Storage·Theme·ChannelConfig·PwaConfig·Notification 자동 생성 + 관리자 초대 이메일, 완료 시 테넌트 상세(SCR-SUP-005). 비가역·멱등키"
          },
          {
            "text": "반려 — 사유 입력 후 신청자에게 통지",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입",
            "guard": "로딩",
            "result": "대기 신청 로드",
            "message": ""
          },
          {
            "state": "정상",
            "trigger": "승인",
            "guard": "slug 미중복",
            "result": "Tenant 일괄 생성·관리자 초대",
            "message": "개설이 승인되어 교회 서비스가 생성되었습니다",
            "placement": "toast",
            "api": {
              "endpoint": "POST /super/applications/{applicationId}/approve",
              "status": 201
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답",
            "guard": "대기 0건",
            "result": "처리할 신청 없음",
            "message": "처리 대기 중인 개설 신청이 없습니다",
            "placement": "inline"
          },
          {
            "state": "에러",
            "trigger": "승인",
            "guard": "slug 중복",
            "result": "생성 중단",
            "message": "희망 주소(slug)가 이미 사용 중입니다",
            "placement": "inline"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "applicationList",
              "intent": "개설 신청 조회",
              "method": "GET",
              "path": "/super/applications?status=pending",
              "response": "{applications}[]",
              "auth": "Bearer(Super)",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "신청 목록을 불러오지 못했습니다"
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "approveApplication",
              "intent": "승인→Tenant 자동 생성",
              "method": "POST",
              "path": "/super/applications/{applicationId}/approve",
              "idempotency": "Idempotency-Key(중복 승인·중복 생성 방지)",
              "confirm": "pd-confirm 확인 필수(비가역: Tenant·Admin·Domain·Storage·Theme·ChannelConfig·PwaConfig·Notification 일괄 생성)",
              "auth": "Bearer(Super)",
              "errors": [
                {
                  "status": 409,
                  "when": "slug 중복",
                  "message": "희망 주소(slug)가 이미 사용 중입니다"
                }
              ]
            },
            {
              "id": "rejectApplication",
              "intent": "반려",
              "method": "POST",
              "path": "/super/applications/{applicationId}/reject",
              "request": "{reason}",
              "auth": "Bearer(Super)",
              "target": ".pd-btn",
              "errors": [
                {
                  "status": 400,
                  "when": "사유 누락",
                  "message": "반려 사유를 입력해 주세요"
                }
              ]
            }
          ],
          "events": [
            {
              "name": "application.approved",
              "when": "승인 확정"
            },
            {
              "name": "tenant.provisioned",
              "when": "Tenant 일괄 생성 완료"
            },
            {
              "name": "admin.invited.email",
              "when": "관리자 초대 이메일 발송"
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
            "label": "교회 정보·서비스 상태"
          },
          {
            "role": ".pd-stat",
            "kind": "stat",
            "label": "요금제·결제 상태",
            "action": {
              "on": "click",
              "do": "go:SCR-SUP-006"
            }
          },
          {
            "role": ".pd-badge",
            "kind": "badge",
            "label": "서비스 상태(활성·일시정지·해지)"
          },
          {
            "role": ".pd-btn",
            "kind": "button",
            "label": "도메인 관리",
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
            "text": "교회 정보·서비스 상태 패널(활성·일시정지·해지)",
            "target": ".pd-wpanel"
          },
          {
            "text": "ChannelConfig 토글 — web·pwa·webpush on/off(즉시 반영). ios·android·nativepush는 차기 Native Add-on으로 비활성"
          },
          {
            "text": "요금제·결제 상태 — 요금제·결제(SCR-SUP-006)",
            "target": ".pd-stat"
          },
          {
            "text": "도메인 관리(SCR-SUP-007) / 서비스 콘솔(SCR-SUP-008)",
            "target": ".pd-btn"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입",
            "guard": "로딩",
            "result": "상세 스켈레톤",
            "message": "",
            "target": ".pd-wpanel"
          },
          {
            "state": "정상",
            "trigger": "응답",
            "guard": "테넌트 존재",
            "result": "정보·상태·ChannelConfig 표시",
            "message": "",
            "target": ".pd-wpanel",
            "api": {
              "endpoint": "GET /super/tenants/{tenantId}",
              "status": 200
            }
          },
          {
            "state": "에러",
            "trigger": "응답",
            "guard": "테넌트 없음",
            "result": "상세 미표시",
            "message": "해당 교회를 찾을 수 없습니다",
            "placement": "inline",
            "target": ".pd-wpanel"
          },
          {
            "state": "엣지",
            "trigger": "토글",
            "guard": "ios·android·nativepush",
            "result": "토글 비활성(변경 불가)",
            "message": "Native 채널은 차기 Add-on으로 준비 중입니다",
            "placement": "tooltip"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "tenantDetail",
              "intent": "테넌트 상세 조회",
              "method": "GET",
              "path": "/super/tenants/{tenantId}",
              "response": "{tenant,channels,subscription,domains}",
              "auth": "Bearer(Super)",
              "target": ".pd-wpanel",
              "errors": [
                {
                  "status": 404,
                  "when": "테넌트 없음",
                  "message": "해당 교회를 찾을 수 없습니다"
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "channelToggle",
              "intent": "ChannelConfig on/off 처리",
              "method": "PATCH",
              "path": "/super/tenants/{tenantId}/channels",
              "request": "{channel,enabled}",
              "idempotency": "동일 상태 재요청 멱등",
              "auth": "Bearer(Super)",
              "errors": [
                {
                  "status": 422,
                  "when": "차기 채널(native) 변경 시도",
                  "message": "Native 채널은 차기 Add-on으로 준비 중입니다"
                }
              ]
            }
          ],
          "events": [
            {
              "name": "channel.toggled",
              "when": "채널 on/off 반영"
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
            "label": "교회별 요금제·결제·연체 현황"
          },
          {
            "role": ".pd-stat",
            "kind": "stat",
            "label": "요금제(WEB / WEB+APP)·금액 미확정"
          },
          {
            "role": ".pd-badge",
            "kind": "badge",
            "label": "결제 상태(정상·연체·미납)"
          }
        ],
        "description": [
          {
            "text": "교회별 요금제·결제·연체일 현황 테이블",
            "target": ".pd-table"
          },
          {
            "text": "요금제 — WEB / WEB+APP. APP은 BASIC 미포함(과금 분리). 금액은 시장검증 후 확정(미확정 placeholder)",
            "target": ".pd-stat"
          },
          {
            "text": "결제 상태 뱃지 — 정상·연체·미납",
            "target": ".pd-badge"
          },
          {
            "text": "연체 30일+ — 일시정지 전환 확인(비가역·멱등), 테넌트 상세(SCR-SUP-005) 상태와 연동"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입",
            "guard": "로딩",
            "result": "테이블 스켈레톤",
            "message": "",
            "target": ".pd-table"
          },
          {
            "state": "정상",
            "trigger": "응답",
            "guard": "결제 레코드 1건+",
            "result": "요금제·결제·연체 표시(금액은 미확정 표기)",
            "message": "금액은 시장검증 후 확정 예정입니다",
            "placement": "inline",
            "target": ".pd-stat",
            "api": {
              "endpoint": "GET /super/billing",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답",
            "guard": "결제 0건",
            "result": "빈 현황",
            "message": "결제 내역이 없습니다",
            "placement": "inline",
            "target": ".pd-table"
          },
          {
            "state": "에러",
            "trigger": "전환",
            "guard": "일시정지 실패",
            "result": "상태 미변경",
            "message": "일시정지로 전환하지 못했습니다",
            "placement": "toast"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "billingList",
              "intent": "요금제·결제 조회",
              "method": "GET",
              "path": "/super/billing",
              "response": "{subscriptions,overdue}[]",
              "auth": "Bearer(Super)",
              "target": ".pd-table",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "결제 현황을 불러오지 못했습니다"
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
              "request": "{plan}",
              "idempotency": "동일 플랜 재요청 멱등",
              "auth": "Bearer(Super)",
              "target": ".pd-stat",
              "errors": [
                {
                  "status": 409,
                  "when": "변경 불가",
                  "message": "현재 상태에서는 요금제를 변경할 수 없습니다"
                }
              ]
            },
            {
              "id": "suspendOverdue",
              "intent": "연체 일시정지 전환",
              "method": "POST",
              "path": "/super/tenants/{tenantId}/suspend",
              "idempotency": "Idempotency-Key(멱등)",
              "confirm": "pd-confirm 확인 필수(비가역: 서비스 일시정지)",
              "auth": "Bearer(Super)",
              "errors": [
                {
                  "status": 409,
                  "when": "이미 일시정지",
                  "message": "이미 일시정지된 교회입니다"
                }
              ]
            }
          ],
          "events": [
            {
              "name": "subscription.changed",
              "when": "요금제 변경"
            },
            {
              "name": "tenant.suspended.overdue",
              "when": "연체 일시정지 전환"
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
        "context": "기본 {slug}.hurmate.kr + Premium 커스텀 도메인·DNS 확인.",
        "components": [
          {
            "role": ".pd-table",
            "kind": "table",
            "label": "교회별 도메인(기본·커스텀)",
            "action": {
              "on": "click",
              "do": "go:SCR-SUP-005"
            }
          },
          {
            "role": ".pd-badge",
            "kind": "badge",
            "label": "DNS 상태(확인·대기·실패)"
          }
        ],
        "description": [
          {
            "text": "도메인 목록 — 행 클릭 시 테넌트 상세(SCR-SUP-005)",
            "target": ".pd-table"
          },
          {
            "text": "기본 도메인 {slug}.hurmate.kr은 개설 승인 시 자동 발급, 커스텀은 Premium 등록"
          },
          {
            "text": "DNS 상태 뱃지 — 확인·대기·실패",
            "target": ".pd-badge"
          },
          {
            "text": "DNS 확인 — 커스텀 도메인 레코드 검증 재시도"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입",
            "guard": "로딩",
            "result": "도메인 목록 로드",
            "message": "",
            "target": ".pd-table"
          },
          {
            "state": "정상",
            "trigger": "응답",
            "guard": "도메인 1건+",
            "result": "기본·커스텀 도메인·DNS 상태 표시",
            "message": "",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /super/domains",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답",
            "guard": "커스텀 0건",
            "result": "기본 도메인만 표시",
            "message": "등록된 커스텀 도메인이 없습니다",
            "placement": "inline",
            "target": ".pd-table"
          },
          {
            "state": "에러",
            "trigger": "DNS 확인",
            "guard": "레코드 미설정",
            "result": "검증 대기",
            "message": "DNS 레코드가 아직 확인되지 않았습니다",
            "placement": "inline"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "domainList",
              "intent": "도메인 조회",
              "method": "GET",
              "path": "/super/domains",
              "response": "{domains}[]",
              "auth": "Bearer(Super)",
              "target": ".pd-table",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "도메인 목록을 불러오지 못했습니다"
                }
              ]
            }
          ],
          "writes": [
            {
              "id": "registerDomain",
              "intent": "커스텀 도메인 등록",
              "method": "POST",
              "path": "/super/tenants/{tenantId}/domains",
              "request": "{domain}",
              "idempotency": "동일 도메인 재등록 멱등",
              "auth": "Bearer(Super)",
              "errors": [
                {
                  "status": 409,
                  "when": "도메인 중복",
                  "message": "이미 사용 중인 도메인입니다"
                }
              ]
            },
            {
              "id": "verifyDomain",
              "intent": "DNS 확인",
              "method": "POST",
              "path": "/super/tenants/{tenantId}/domains/{domainId}/verify",
              "auth": "Bearer(Super)",
              "errors": [
                {
                  "status": 422,
                  "when": "레코드 미설정",
                  "message": "DNS 레코드가 아직 확인되지 않았습니다"
                }
              ]
            }
          ],
          "events": [
            {
              "name": "domain.verified",
              "when": "DNS 확인 성공"
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
            "label": "PWA·Notification·Storage 집계"
          },
          {
            "role": ".pd-table",
            "kind": "table",
            "label": "테넌트별 서비스 상태(PWA·App·Notification·Storage)",
            "action": {
              "on": "click",
              "do": "go:SCR-SUP-005"
            }
          },
          {
            "role": ".pd-stat",
            "kind": "stat",
            "label": "Notification Gateway 발송량·Storage 사용량"
          },
          {
            "role": ".pd-badge",
            "kind": "badge",
            "label": "App=차기(비활성)·채널 상태"
          }
        ],
        "description": [
          {
            "text": "PWA·Notification·Storage 플랫폼 집계 KPI",
            "target": ".pd-kpi"
          },
          {
            "text": "테넌트별 서비스 상태 — 행 클릭 시 테넌트 상세(SCR-SUP-005). App(Native)은 차기로 비활성 표기",
            "target": ".pd-table"
          },
          {
            "text": "Notification Gateway 발송량·Storage 사용량 모니터",
            "target": ".pd-stat"
          },
          {
            "text": "채널 상태 뱃지 — App(Native)은 차기 Add-on 비활성",
            "target": ".pd-badge"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입",
            "guard": "로딩",
            "result": "콘솔 스켈레톤",
            "message": "",
            "target": ".pd-kpi"
          },
          {
            "state": "정상",
            "trigger": "응답",
            "guard": "테넌트 1곳+",
            "result": "PWA·Notification·Storage 상태 표시",
            "message": "",
            "target": ".pd-table",
            "api": {
              "endpoint": "GET /super/console",
              "status": 200
            }
          },
          {
            "state": "빈데이터",
            "trigger": "응답",
            "guard": "테넌트 0곳",
            "result": "모니터 대상 없음",
            "message": "모니터할 서비스가 없습니다",
            "placement": "inline",
            "target": ".pd-table"
          },
          {
            "state": "에러",
            "trigger": "응답",
            "guard": "Gateway 장애",
            "result": "일부 상태 표시 불가",
            "message": "일부 서비스 상태를 불러오지 못했습니다",
            "placement": "toast",
            "target": ".pd-stat"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "consoleStatus",
              "intent": "서비스 상태 모니터",
              "method": "GET",
              "path": "/super/console",
              "response": "{pwa,notification,storage,app}[]",
              "auth": "Bearer(Super)",
              "target": ".pd-table",
              "errors": [
                {
                  "status": 503,
                  "when": "Gateway 장애",
                  "message": "일부 서비스 상태를 불러오지 못했습니다"
                }
              ]
            }
          ],
          "writes": [],
          "events": []
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
            "label": "운영·감사 로그(접근·상태전이·승인)"
          }
        ],
        "description": [
          {
            "text": "감사 로그 테이블 — 교차테넌트 접근·상태 전이·승인 기록(읽기 전용)",
            "target": ".pd-table"
          },
          {
            "text": "유형 필터·기간/키워드 검색으로 로그 조회"
          },
          {
            "text": "로그 유형 뱃지(접근·상태·승인)"
          },
          {
            "text": "대시보드 복귀(SCR-SUP-002)"
          }
        ],
        "cases": [
          {
            "state": "초기",
            "trigger": "진입",
            "guard": "로딩",
            "result": "로그 스켈레톤",
            "message": "",
            "target": ".pd-table"
          },
          {
            "state": "정상",
            "trigger": "응답",
            "guard": "로그 1건+",
            "result": "감사 로그 표시",
            "message": "",
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
            "result": "빈 로그",
            "message": "조건에 맞는 로그가 없습니다",
            "placement": "inline",
            "target": ".pd-table"
          },
          {
            "state": "에러",
            "trigger": "응답",
            "guard": "서버 오류",
            "result": "로그 조회 실패",
            "message": "운영 로그를 불러오지 못했습니다",
            "placement": "inline",
            "target": ".pd-table"
          }
        ],
        "interface": {
          "reads": [
            {
              "id": "auditLog",
              "intent": "운영·감사 로그 조회",
              "method": "GET",
              "path": "/super/audit",
              "response": "{logs}[]",
              "auth": "Bearer(Super)",
              "target": ".pd-table",
              "errors": [
                {
                  "status": 500,
                  "when": "서버 오류",
                  "message": "운영 로그를 불러오지 못했습니다"
                }
              ]
            }
          ],
          "writes": [],
          "events": []
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
