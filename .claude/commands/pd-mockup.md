---
description: 커스텀 디바이스 목업 등록 — 특정 단말기 화면 규격(가로·세로·베젤)을 devices.js에 추가
argument-hint: [디바이스명] [소스(이미지폴더 또는 figma url, 선택)]
allowed-tools: Read, Write, Edit, AskUserQuestion, Glob
---

# /pd-mockup — 커스텀 디바이스(단말) 목업 등록

내장 프리셋(PC웹/태블릿/모바일/키오스크/반응형) 외에 **특정 단말기 화면**이 필요할 때 디바이스 사전에 추가한다.

`$1`=디바이스 key(영문), `$2`=참고 소스(이미지 폴더나 Figma URL, 선택).

## 절차

### 1) 규격 수집
- **라벨**(한글 표시명), **화면 가로×세로(px)** — 테두리를 뺀 실제 화면 캔버스 크기.
- **type**: 대부분 `frame`(단색 베젤). 전용 상세 단말(카드리더 등)은 `kiosk`(단, kiosk 상세 CSS는 tossfront2에만 맞춰져 있어 추가 CSS 필요).
- (선택) bezel(테두리 두께), radius(모서리), bezelColor.
- `$2` 이미지가 여러 장이면 어떤 것을 참고할지 물어본다.

### 2) `config/devices.js` 추가
```js
window.PLANDECK_DEVICES['<key>'] = { label:'<라벨>', type:'frame', width:<W>, height:<H>, bezel:10, radius:20, bezelColor:'#404040' };
```
- 기존 항목은 건드리지 않는다(커스텀 보존). 파일 끝 `window.PDK_DEVICES = window.PLANDECK_DEVICES;` 유지.

### 3) 서피스 연결 안내
- 이 디바이스를 쓰려면 `config/project.js`의 `surfaces[]`에 `{ key, device:'<key>', label }`를 추가해야 한다고 안내(또는 /pd-init 재실행).

## 주의
- width/height는 베젤 제외 실제 화면 크기. frame 베젤 실제 색은 엔진 고정 그라데이션(색 바꾸려면 CSS 변수 수정 필요).
- kiosk 상세 목업을 새로 그리려면 전용 CSS 작업이 필요(기본은 frame 권장).
