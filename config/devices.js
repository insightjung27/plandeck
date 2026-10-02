/* ───────────────────────────────────────────────────────────────
 * PlanDeck · config/devices.js — 디바이스(단말) 레지스트리
 * 내장 프리셋 + /pd-mockup 으로 추가되는 커스텀 목업.
 * width/height = 화면(콘텐츠) 캔버스 규격(px). bezel/radius = 외곽 프레임.
 * type: 'kiosk'(상세 프레임) | 'frame'(미니멀 베젤)
 * form: 'phone' | 'tablet' | 'desktop' — 엔진이 셸(상태바/브라우저크롬/사이드바)을 정할 때 사용.
 * 태블릿은 가로/세로 2종. 화면(screens.js)에서 device:'tablet'(가로)/'tabletPortrait'(세로)로 방향 선택.
 * surfaces(project.js)가 이 key 들을 가리킨다.
 * ─────────────────────────────────────────────────────────────── */

window.PLANDECK_DEVICES = {
  desktop: {
    label: 'PC 웹', type: 'frame', form: 'desktop',
    width: 1440, height: 1024, bezel: 10, radius: 20, bezelColor: '#404040',
  },
  tablet: {
    label: '태블릿(가로)', type: 'frame', form: 'tablet',
    width: 1194, height: 834, bezel: 14, radius: 28, bezelColor: '#3a3a3e',
  },
  tabletPortrait: {
    label: '태블릿(세로)', type: 'frame', form: 'tablet',
    width: 834, height: 1194, bezel: 14, radius: 28, bezelColor: '#3a3a3e',
  },
  mobile: {
    label: '모바일', type: 'frame', form: 'phone',
    width: 360, height: 782, bezel: 10, radius: 40, bezelColor: '#404040',
  },
  tossfront2: {
    label: '키오스크', type: 'kiosk',   // engine/common.css 의 상세 키오스크 목업 사용
    width: 400, height: 640, radius: 18,
  },
  responsive: {
    label: '반응형', toggle: ['desktop', 'mobile'], default: 'desktop',
  },
};

// 엔진 코어(PDK) 호환 별칭 — 수정 불필요
window.PDK_DEVICES = window.PLANDECK_DEVICES;
