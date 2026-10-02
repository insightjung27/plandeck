window.PLANDECK_DEVICES = {
  mobile:         { label: '모바일',       type: 'frame', form: 'phone',   width: 360,  height: 782,  bezel: 10, radius: 40, bezelColor: '#404040' },
  desktop:        { label: 'PC 웹',        type: 'frame', form: 'desktop', width: 1440, height: 1024, bezel: 10, radius: 20, bezelColor: '#404040' },
  // 태블릿 — 방향(가로/세로)별 디바이스. 화면에서 device:'tablet'(가로) / 'tabletPortrait'(세로)로 선택.
  tablet:         { label: '태블릿(가로)', type: 'frame', form: 'tablet',  width: 1194, height: 834,  bezel: 14, radius: 28, bezelColor: '#3a3a3e' },
  tabletPortrait: { label: '태블릿(세로)', type: 'frame', form: 'tablet',  width: 834,  height: 1194, bezel: 14, radius: 28, bezelColor: '#3a3a3e' },
};
window.PDK_DEVICES = window.PLANDECK_DEVICES;
