/* ══════════════════════════════════════════════════════════════
   용접 마스터 — 그림 모음 (그림17 · 2026-09-30)
   공용 그리기 도우미 links/fig.js 를 쓴다. index.html(배우기) · lesson.js(수업 슬라이드)가 함께 부른다.

   한 칸의 모양
     키: { cap:'캡션 한 줄', cards:['배우기 카드 제목'…], draw:function(){ … } }
       cards — index.html 의 LEARN 카드 제목(t)과 **똑같이**. 그 카드 맨 위에 그림이 붙는다.

   내용 근거 — 배우기 카드 본문 + 훈련교재 『용접일반』(극성 발열 약 70/30% · 아크 쏠림 대책 ·
   교류 용접기 무부하 전압 70~80V · 차광 번호) + 수업자료 「용접 원리」·「가스 용접」.
   교재 그림은 따라 그리지 않았다. 같은 개념을 새로 짰다.

   게임이 쓰는 figFlame(불꽃 조절) · figPos(자세 맞히기)는 index.html 에 그대로 있다.
   ══════════════════════════════════════════════════════════════ */
var FIGS = (function () {
  var F = window.FIG;
  if (!F) return {};
  var C = F.C;
  var t = F.t, box = F.box, line = F.line, arrow = F.arrow, callout = F.callout, path = F.path, poly = F.poly;

  /* 색 — 모재 회색 · 녹은 쇠 주황 · 용접봉 짙은 회색 */
  var METAL = '#d7dce3', METAL_E = '#8b95a4', MELT = '#fdba74', MELT_E = C.orange, ROD = '#6b7280', COAT = '#cbd5e1';

  function ell(cx, cy, rx, ry, o) {
    o = o || {};
    return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" fill="' + (o.fill || 'none') +
      '" stroke="' + (o.c || C.ink) + '" stroke-width="' + (o.w || 1.6) + '"' + (o.op != null ? ' opacity="' + o.op + '"' : '') + '/>';
  }
  function dot(x, y, r, c) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 3) + '" fill="' + (c || C.ink) + '"/>'; }
  function plate(x, y, w, h) { return box(x, y, w, h, { fill: METAL, c: METAL_E, r: 2, w: 1.4 }); }
  function spark(x, y, s, c) { /* 아크 번개 */
    s = s || 1;
    return poly([[x, y], [x - 6 * s, y + 9 * s], [x + 3 * s, y + 10 * s], [x - 4 * s, y + 20 * s]], { c: c || '#f59e0b', w: 3 });
  }
  function divider(x, y1, y2) { return line(x, y1, x, y2, { c: C.grayM, w: 1.4, dash: '6 5' }); }
  function hdr(x, y, s, c) { return t(x, y, s, { a: 'm', b: 1, size: 17, c: c || C.ink }); }

  return {

  /* ═══════════ 1단원 용접 원리 ═══════════ */
  joint: { cards: ['용접이란 무엇인가'],
    cap: '볼트·리벳은 죄어서 잇고, 용접은 녹여서 한 덩어리로 잇는다',
    draw: function () {
      var s = hdr(120, 28, '볼트 이음 — 죄어서') + hdr(360, 28, '용접 이음 — 녹여서', C.blue) + divider(240, 16, 230);
      /* 겹친 두 판 + 볼트 */
      s += plate(20, 96, 150, 22) + plate(70, 118, 150, 22);
      s += box(108, 72, 24, 12, { fill: C.grayM, r: 2, w: 1.4 }) + box(114, 84, 12, 72, { fill: C.grayM, r: 1, w: 1.4 }) +
        box(106, 156, 28, 12, { fill: C.grayM, r: 2, w: 1.4 });
      s += line(20, 118, 220, 118, { c: C.red, w: 1.6, dash: '5 4' });
      s += callout(60, 118, 40, 180, '판과 판 사이에 경계가 남는다', { c: C.red, tc: C.red, a: 's', size: 14 });
      s += callout(132, 78, 166, 62, '볼트', { size: 15 });
      /* 맞댄 두 판 + 용접 비드 */
      s += plate(262, 100, 86, 34) + plate(374, 100, 86, 34);
      s += path('M348,100 L374,100 L380,134 L342,134 Z', { fill: MELT, c: MELT_E, w: 1.6 });
      s += path('M338,100 Q361,82 384,100', { fill: MELT, c: MELT_E, w: 1.6 });
      s += callout(361, 90, 400, 62, '용착 금속', { c: C.orange, tc: C.orange, b: 1 });
      s += t(360, 170, '이음이 모재와 한 덩어리', { a: 'm', size: 15, c: C.blue, b: 1 });
      s += t(360, 194, '(용가재 = 용접봉을 녹여 보탬)', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 232, s);
    } },

  shrink: { cards: ['용접의 단점'],
    cap: '용접한 자리가 식으며 줄어들어 판이 휘고(변형·수축), 속에는 잔류 응력이 남는다',
    draw: function () {
      var s = hdr(120, 28, '용접 직후 (뜨겁다)') + hdr(360, 28, '식은 뒤', C.red) + divider(240, 16, 220);
      /* 평평한 판 */
      s += plate(28, 104, 90, 20) + plate(122, 104, 90, 20);
      s += path('M112,104 L128,104 L124,124 L116,124 Z', { fill: C.redL, c: C.red, w: 1.4 });
      s += path('M108,104 Q120,94 132,104', { fill: C.redL, c: C.red, w: 1.4 });
      s += t(120, 156, '평평하게 붙였는데…', { a: 'm', size: 14, c: C.sub });
      /* 휜 판 (윗면이 더 줄어 양끝이 올라감) */
      s += F.g(plate(-94, -10, 90, 20), { x: 358, y: 114, r: -10 }) + F.g(plate(4, -10, 90, 20), { x: 362, y: 114, r: 10 });
      s += path('M352,104 L368,104 L366,124 L354,124 Z', { fill: METAL, c: METAL_E, w: 1.4 });
      s += path('M348,105 Q360,96 372,105', { fill: '#e5e7eb', c: METAL_E, w: 1.4 });
      s += arrow(310, 112, 344, 108, { c: C.red, w: 2, head: 10 }) + arrow(410, 112, 376, 108, { c: C.red, w: 2, head: 10 });
      s += t(360, 82, '수축', { a: 'm', size: 15, b: 1, c: C.red });
      s += line(262, 150, 458, 150, { c: C.sub, w: 1, dash: '5 4' });
      s += callout(282, 132, 286, 178, '양 끝이 들린다 (변형)', { c: C.red, tc: C.red, a: 's', size: 14 });
      s += t(360, 204, '속에는 잔류 응력이 남는다', { a: 'm', size: 14, b: 1, ans: 1 });
      return F.svg(480, 226, s);
    } },

  terms: { cards: ['용접될 때 일어나는 일 — 용적·용융지·용입·용착'],
    cap: '용접부 단면 — 방울(용적) → 웅덩이(용융지) → 깊이(용입) → 붙음(용착·비드)',
    draw: function () {
      var s = '';
      s += plate(20, 150, 440, 80);
      /* 이미 굳은 비드(왼쪽) — 용착 */
      s += path('M40,150 Q110,124 180,150 Z', { fill: '#f5d0a9', c: METAL_E, w: 1.4 });
      /* 용융지 + 용입 */
      s += path('M190,150 Q250,212 310,150 Z', { fill: MELT, c: MELT_E, w: 1.6 });
      s += path('M190,150 Q250,130 310,150', { fill: '#fed7aa', c: MELT_E, w: 1.4 });
      /* 용접봉 + 용적 */
      s += box(236, 18, 28, 78, { fill: COAT, c: METAL_E, r: 2, w: 1.4 }) + box(244, 18, 12, 88, { fill: ROD, c: ROD, r: 1, w: 1 });
      s += spark(250, 106, 0.9) + F.circle(250, 124, 8, { fill: MELT, c: MELT_E, w: 1.4 });
      /* 용입 깊이 치수 */
      s += F.dim(330, 150, 330, 181, '', { off: 0 }) ;
      s += callout(264, 34, 318, 34, '용접봉', { size: 15 });
      s += callout(258, 124, 340, 104, '용적', { c: C.orange, tc: C.orange, b: 1, ans: 1 });
      s += callout(214, 158, 108, 200, '용융지', { c: C.orange, tc: C.orange, b: 1, ans: 1 });
      s += t(340, 166, '용입', { b: 1, c: C.blue, ans: 1 });
      s += t(340, 186, '(녹아 들어간 깊이)', { size: 13, c: C.sub });
      s += callout(110, 140, 40, 104, '용착 · 비드', { b: 1, ans: 1, a: 's' });
      s += t(440, 218, '모재', { a: 'e', size: 14, c: C.sub });
      return F.svg(480, 244, s);
    } },

  /* ═══════════ 2단원 전기용접 ═══════════ */
  circuit: { cards: ['아크 용접의 회로'],
    cap: '아크 용접의 회로 — 전류가 한 바퀴 돌아 용접기로 돌아오는 닫힌 회로',
    draw: function () {
      var s = '';
      s += box(18, 70, 96, 76, { fill: C.grayL, c: C.ink, label: '용접기', size: 17 });
      s += t(66, 128, '(전원)', { a: 'm', size: 13, c: C.sub, halo: false });
      /* 홀더 케이블 */
      s += path('M114,88 H196', { c: C.red, w: 4 });
      s += arrow(130, 88, 180, 88, { c: C.red, w: 2, flow: 1, head: 0.1 });
      s += t(155, 70, '홀더 케이블', { a: 'm', size: 14, c: C.red, b: 1 });
      /* 홀더 + 봉 */
      s += box(196, 76, 50, 24, { fill: ROD, c: C.ink, r: 5, w: 1.4 });
      s += t(221, 60, '홀더', { a: 'm', size: 15, b: 1 });
      s += F.g(box(0, -4, 70, 8, { fill: COAT, c: METAL_E, r: 2, w: 1.2 }), { x: 244, y: 92, r: 38 });
      s += t(318, 90, '용접봉', { size: 15, b: 1 });
      s += spark(302, 138, 1.1) + t(318, 150, '아크', { size: 15, b: 1, c: C.orange });
      /* 모재 */
      s += plate(196, 164, 250, 26) + t(430, 177, '모재', { a: 'e', size: 15, b: 1, halo: false });
      /* 접지 */
      s += box(200, 158, 22, 12, { fill: C.blue, c: C.blue, r: 2, w: 1 });
      s += path('M210,190 V214 H66 V146', { c: C.blue, w: 4 });
      s += F.route([[190, 214], [90, 214], [66, 214], [66, 164]], { c: C.blue, w: 2, flow: 1, head: 10 });
      s += t(136, 232, '접지 케이블', { a: 'm', size: 14, c: C.blue, b: 1, ans: 1 });
      s += callout(222, 164, 250, 216, '접지 클램프', { size: 14 });
      s += arrow(300, 124, 300, 160, { c: C.orange, w: 2, head: 9 });
      return F.svg(480, 250, s);
    } },

  tools: { cards: ['용접기에 딸린 기구'],
    cap: '피복 아크 용접에 딸린 기구 — 모양으로 알아보기',
    draw: function () {
      var s = '';
      /* 홀더 */
      s += box(20, 40, 70, 22, { fill: ROD, c: C.ink, r: 8, w: 1.4 }) + path('M90,44 L112,38 M90,58 L112,62', { w: 3 });
      s += F.g(box(0, -3, 50, 6, { fill: COAT, c: METAL_E, r: 2, w: 1 }), { x: 108, y: 50, r: 0 });
      s += path('M20,51 H6', { c: C.red, w: 4 });
      s += t(84, 88, '홀더', { a: 'm', b: 1 }) + t(84, 108, '봉을 물고 전류를 보냄', { a: 'm', size: 13, c: C.sub });
      /* 접지 클램프 */
      s += path('M214,36 L270,52 M214,66 L270,52', { w: 5, c: C.ink });
      s += F.circle(270, 52, 5, { fill: C.grayM }) + path('M270,52 H292', { c: C.blue, w: 4 });
      s += t(248, 88, '접지 클램프', { a: 'm', b: 1 }) + t(248, 108, '모재에 물린다', { a: 'm', size: 13, c: C.sub });
      /* 핸드 실드 */
      s += path('M372,28 Q420,22 440,50 Q444,80 408,90 L396,112 L384,112 L386,90 Q350,80 354,50 Q356,32 372,28 Z',
        { fill: '#374151', c: C.ink, w: 1.4 });
      s += box(378, 44, 40, 20, { fill: '#065f46', c: '#022c22', r: 3, w: 1.2 });
      s += callout(380, 50, 350, 20, '차광 유리', { size: 13, a: 'e' });
      s += t(398, 130, '핸드 실드', { a: 'm', b: 1 }) + t(398, 150, '눈·얼굴 보호', { a: 'm', size: 13, c: C.sub });
      /* 치핑 해머 */
      s += F.g(box(-4, 0, 8, 70, { fill: '#b45309', c: '#78350f', r: 2, w: 1 }), { x: 110, y: 176, r: 0 });
      s += poly([[70, 170], [150, 170], [160, 178], [150, 186], [70, 186], [62, 178]], { close: 1, fill: C.grayM, w: 1.4 });
      s += t(110, 262, '치핑 해머', { a: 'm', b: 1 }) + t(110, 282, '슬래그를 두들겨 뗌', { a: 'm', size: 13, c: C.sub });
      /* 와이어 브러시 */
      s += box(262, 190, 110, 18, { fill: '#b45309', c: '#78350f', r: 4, w: 1 }) + box(312, 190, 60, 18, { fill: '#a16207', c: '#78350f', r: 2, w: 1 });
      for (var i = 0; i < 12; i++) s += line(316 + i * 5, 208, 316 + i * 5, 226, { c: C.sub, w: 1.4 });
      s += t(318, 262, '와이어 브러시', { a: 'm', b: 1 }) + t(318, 282, '비드 표면을 솔질', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 300, s);
    } },

  polarity: { cards: ['극성 — 정극성과 역극성'],
    cap: '직류 극성 — (+) 쪽에 열이 약 70% 난다. 모재가 (+)면 용입이 깊고, 봉이 (+)면 얕다',
    draw: function () {
      var s = hdr(120, 26, '직류 정극성 (DCSP)', C.blue) + hdr(360, 26, '직류 역극성 (DCRP)', C.purple) + divider(240, 14, 280);
      function side(cx, rodPlus) {
        var o = '';
        o += box(cx - 12, 44, 24, 84, { fill: COAT, c: METAL_E, r: 2, w: 1.4 }) + box(cx - 5, 44, 10, 92, { fill: ROD, c: ROD, r: 1, w: 1 });
        o += spark(cx + 2, 138, 0.8);
        o += plate(cx - 96, 160, 192, 60);
        if (rodPlus) o += path('M' + (cx - 40) + ',160 Q' + cx + ',186 ' + (cx + 40) + ',160 Z', { fill: MELT, c: MELT_E, w: 1.6 });
        else o += path('M' + (cx - 26) + ',160 Q' + cx + ',216 ' + (cx + 26) + ',160 Z', { fill: MELT, c: MELT_E, w: 1.6 });
        o += F.circle(cx - 44, 70, 15, { fill: rodPlus ? C.redL : C.blueL, c: rodPlus ? C.red : C.blue, label: rodPlus ? '+' : '−', size: 20, lc: rodPlus ? C.red : C.blue });
        o += t(cx - 44, 98, '용접봉', { a: 'm', size: 13, c: C.sub });
        o += F.circle(cx + 70, 190, 15, { fill: rodPlus ? C.blueL : C.redL, c: rodPlus ? C.blue : C.red, label: rodPlus ? '−' : '+', size: 20, lc: rodPlus ? C.blue : C.red });
        o += t(cx - 72, 212, '모재', { a: 'm', size: 13, c: C.sub, halo: false });
        return o;
      }
      s += side(120, false) + side(360, true);
      s += t(120, 240, '열이 모재에 → 용입 깊다', { a: 'm', size: 14, b: 1, ans: 1 }) + t(120, 262, '두꺼운 판', { a: 'm', size: 14, c: C.blue, b: 1, ans: 1 });
      s += t(360, 240, '열이 봉에 → 용입 얕다', { a: 'm', size: 14, b: 1 }) + t(360, 262, '얇은 판', { a: 'm', size: 14, c: C.purple, b: 1 });
      return F.svg(480, 284, s);
    } },

  rodcode: { cards: ['용접봉의 기호 읽기 — E 43 △△'],
    cap: '피복 아크 용접봉과 기호 E 4316 읽기 (KS D 7004)',
    draw: function () {
      var s = '';
      /* 용접봉 한 자루 */
      s += box(30, 58, 36, 16, { fill: ROD, c: C.ink, r: 2, w: 1.2 });
      s += box(66, 54, 384, 24, { fill: COAT, c: METAL_E, r: 3, w: 1.4 });
      s += t(258, 66, 'E 4316', { a: 'm', size: 15, b: 1, halo: false });
      s += callout(48, 66, 40, 30, '잡는 끝 (심선이 드러남)', { size: 13, a: 's' });
      s += callout(420, 58, 404, 30, '피복제', { size: 14, a: 's' });
      s += callout(40, 74, 58, 104, '심선', { size: 14, a: 's' });
      /* 해독 */
      var x = [94, 240, 386], big = ['E', '43', '16'],
        m1 = ['피복 아크', '용착 금속의', '피복제의'], m2 = ['용접봉', '최소 인장 강도', '계통'], ansM = [0, 1, 0],
        m3 = ['', '43 kgf/mm²', '16 = 저수소계'], cl = [C.ink, C.blue, C.orange];
      for (var i = 0; i < 3; i++) {
        s += box(x[i] - 62, 128, 124, 50, { fill: i === 0 ? C.grayL : (i === 1 ? C.blueL : C.orangeL), c: cl[i] });
        s += t(x[i], 153, big[i], { a: 'm', size: 26, b: 1, c: cl[i], halo: false });
        s += t(x[i], 198, m1[i], { a: 'm', size: 14 }) + t(x[i], 218, m2[i], { a: 'm', size: 14, b: 1, ans: ansM[i] });
        if (m3[i]) s += t(x[i], 242, m3[i], { a: 'm', size: 13, c: cl[i] });
      }
      s += arrow(258, 80, 240, 124, { c: C.sub, w: 1.4, head: 9 });
      return F.svg(480, 262, s);
    } },

  coating: { cards: ['피복제는 왜 바르는가'],
    cap: '피복 아크 용접 단면 — 피복제가 타며 가스로 감싸고, 슬래그로 덮어 천천히 식힌다',
    draw: function () {
      var s = '';
      s += plate(20, 190, 440, 50);
      /* 용착 금속 + 슬래그 (진행 방향 → 오른쪽, 뒤쪽이 왼쪽) */
      s += path('M40,190 Q127,166 214,190 Z', { fill: '#f5d0a9', c: METAL_E, w: 1.4 });
      s += path('M34,190 Q127,154 220,188 L214,190 Q127,166 40,190 Z', { fill: '#57534e', c: '#292524', w: 1.2 });
      s += path('M214,190 Q262,230 310,190 Z', { fill: MELT, c: MELT_E, w: 1.6 });
      /* 보호 가스 */
      s += path('M216,110 Q196,150 214,188 L310,188 Q326,150 304,110 Z', { fill: C.blueL, c: C.blue, w: 1.2, op: 0.7 });
      /* 용접봉 (기울임) */
      s += F.g(box(-14, -110, 28, 104, { fill: COAT, c: METAL_E, r: 2, w: 1.4 }) + box(-6, -110, 12, 112, { fill: ROD, c: ROD, r: 1, w: 1 }) +
        path('M-14,-6 L-6,6 L6,6 L14,-6', { fill: COAT, c: METAL_E, w: 1.2 }), { x: 262, y: 136, r: 18 });
      s += spark(258, 150, 0.9) + F.circle(250, 174, 6, { fill: MELT, c: MELT_E, w: 1.2 });
      s += arrow(360, 208, 430, 208, { c: C.sub, w: 1.8, head: 10 }) + t(395, 226, '진행 방향', { a: 'm', size: 13, c: C.sub });
      s += callout(232, 40, 150, 32, '심선', { size: 15, a: 'e' });
      s += callout(282, 48, 346, 36, '피복제', { size: 15 });
      s += callout(300, 130, 364, 110, '보호 가스', { c: C.blue, tc: C.blue, b: 1 });
      s += callout(270, 160, 364, 150, '아크', { c: C.orange, tc: C.orange, b: 1 });
      s += callout(100, 172, 70, 118, '슬래그', { tc: C.ink, b: 1, a: 'e' }) + t(24, 142, '덮어서 천천히 식힘', { size: 13, c: C.sub, ans: 1 });
      s += callout(110, 184, 110, 262, '용착 금속', { a: 'm', size: 15 });
      s += callout(262, 204, 290, 262, '용융지', { a: 'm', size: 15 });
      return F.svg(480, 280, s);
    } },

  pos4: { cards: ['용접 자세 네 가지'],
    cap: '용접 자세 — 쇳물이 중력을 거스를수록 어렵다 (F → H·V → O)',
    draw: function () {
      var s = '', cells = [[16, 34], [248, 34], [16, 176], [248, 176]];
      var nm = ['아래보기 F', '수평 H', '수직 V', '위보기 O'];
      function torch(x1, y1, x2, y2) { return arrow(x1, y1, x2, y2, { c: C.blue, w: 7, head: 16 }); }
      for (var i = 0; i < 4; i++) {
        var x = cells[i][0], y = cells[i][1];
        s += box(x, y, 216, 130, { fill: C.paper, c: C.edge, r: 10, w: 1.4 });
        s += t(x + 12, y + 18, nm[i], { b: 1, size: 16, ans: 1 });
      }
      /* F — 수평 판, 위에서 */
      s += plate(40, 124, 168, 18) + line(62, 124, 186, 124, { c: C.red, w: 6 }) + torch(124, 50, 124, 112);
      /* H — 수직 판, 용접선 옆으로 */
      s += plate(272, 58, 110, 100) + line(282, 108, 372, 108, { c: C.red, w: 6 }) + torch(446, 108, 392, 108);
      /* V — 수직 판, 용접선 위아래 */
      s += plate(40, 200, 110, 100) + line(95, 208, 95, 292, { c: C.red, w: 6 }) + torch(214, 250, 160, 250);
      /* O — 판 아래에서 올려다봄 */
      s += plate(272, 204, 168, 18) + line(294, 222, 418, 222, { c: C.red, w: 6 }) + torch(356, 296, 356, 234);
      s += t(24, 324, '━ 용접선', { size: 14, c: C.red, b: 1 }) + t(130, 324, '➔ 용접봉', { size: 14, c: C.blue, b: 1 });
      s += t(456, 324, '중력 ↓', { a: 'e', size: 14, c: C.sub, b: 1 });
      return F.svg(480, 340, s);
    } },

  arcblow: { cards: ['아크 쏠림(자기 불림)'],
    cap: '아크 쏠림 — 직류에서 자기장이 한쪽으로 몰려 아크가 휜다. 봉을 쏠림 반대로 기울여 막는다',
    draw: function () {
      var s = hdr(84, 28, '정상 아크') + hdr(240, 28, '아크 쏠림', C.red) + hdr(396, 28, '대책', C.green) +
        divider(162, 16, 230) + divider(318, 16, 230);
      function rod(cx, ang) {
        return F.g(box(-9, -96, 18, 90, { fill: COAT, c: METAL_E, r: 2, w: 1.2 }) + box(-4, -96, 8, 96, { fill: ROD, c: ROD, r: 1, w: 1 }), { x: cx, y: 150, r: ang });
      }
      /* 정상 */
      s += plate(20, 176, 128, 22) + rod(84, 0) + path('M84,152 L80,162 L88,166 L84,176', { c: '#f59e0b', w: 3 });
      s += t(84, 214, '봉 바로 아래로 곧게', { a: 'm', size: 13, c: C.sub });
      /* 쏠림 */
      s += plate(176, 176, 128, 22) + rod(240, 0) + path('M240,152 Q246,166 270,176', { c: '#f59e0b', w: 3 });
      s += arrow(252, 150, 286, 150, { c: C.red, w: 2, head: 10 }) + t(292, 138, '쏠림', { size: 14, b: 1, c: C.red });
      s += path('M200,120 Q240,96 280,120', { c: C.purple, w: 1.4, dash: '4 3' }) + path('M214,130 Q240,114 266,130', { c: C.purple, w: 1.4, dash: '4 3' });
      s += t(240, 76, '자기장 비대칭', { a: 'm', size: 13, c: C.purple });
      s += t(240, 214, '직류에서 생긴다', { a: 'm', size: 13, c: C.sub });
      /* 대책 */
      s += plate(332, 176, 128, 22) + rod(396, 18) + path('M396,152 Q394,166 396,176', { c: '#f59e0b', w: 3 });
      s += arrow(384, 142, 350, 142, { c: C.green, w: 2, head: 10 }) + t(396, 64, '봉 끝을 쏠림', { a: 'm', size: 13, c: C.green, b: 1 }) +
        t(396, 82, '반대쪽으로', { a: 'm', size: 13, c: C.green, b: 1 });
      s += t(396, 214, '교류 · 짧은 아크', { a: 'm', size: 13, c: C.sub, ans: 1 }) + t(396, 232, '접지점은 멀리', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 248, s);
    } },

  defects: { cards: ['용접 결함 — 눈으로 찾는 것들'],
    cap: '눈으로 찾는 용접 결함 — 비드 단면으로 비교 (크레이터는 비드 끝을 위에서 본 모습)',
    draw: function () {
      var s = '', w = 142;
      var cx = [80, 240, 400, 80, 240, 400], cy = [70, 70, 70, 200, 200, 200];
      function base(x, y) { return plate(x - 62, y, 124, 40); }
      /* 정상 */
      s += base(cx[0], cy[0]) + path('M' + (cx[0] - 30) + ',' + cy[0] + ' Q' + cx[0] + ',' + (cy[0] - 22) + ' ' + (cx[0] + 30) + ',' + cy[0] + ' Q' + cx[0] + ',' + (cy[0] + 26) + ' ' + (cx[0] - 30) + ',' + cy[0] + ' Z', { fill: MELT, c: MELT_E, w: 1.4 });
      s += t(cx[0], cy[0] + 58, '정상 비드', { a: 'm', b: 1, c: C.green });
      /* 언더컷 — 가장자리 홈 */
      var x = cx[1], y = cy[1];
      s += base(x, y) + path('M' + (x - 30) + ',' + y + ' Q' + x + ',' + (y - 22) + ' ' + (x + 30) + ',' + y + ' Q' + x + ',' + (y + 26) + ' ' + (x - 30) + ',' + y + ' Z', { fill: MELT, c: MELT_E, w: 1.4 });
      s += path('M' + (x + 28) + ',' + y + ' Q' + (x + 36) + ',' + (y + 12) + ' ' + (x + 44) + ',' + y + ' Z', { fill: C.paper, c: C.red, w: 1.8 });
      s += callout(x + 38, y + 6, x + 50, y - 26, '홈', { c: C.red, tc: C.red, size: 14, ans: 1 });
      s += t(x, y + 58, '언더컷', { a: 'm', b: 1, ans: 1 });
      /* 오버랩 — 모재 위로 덮어씀 */
      x = cx[2]; y = cy[2];
      s += base(x, y) + path('M' + (x - 28) + ',' + y + ' Q' + (x - 4) + ',' + (y - 26) + ' ' + (x + 48) + ',' + (y - 4) + ' L' + (x + 48) + ',' + y + ' Q' + x + ',' + (y + 24) + ' ' + (x - 28) + ',' + y + ' Z', { fill: MELT, c: MELT_E, w: 1.4 });
      s += line(x + 16, y - 1, x + 48, y - 1, { c: C.red, w: 2, dash: '4 3' });
      s += callout(x + 44, y - 6, x + 50, y - 34, '안 붙음', { c: C.red, tc: C.red, size: 14, a: 'e' });
      s += t(x, y + 58, '오버랩', { a: 'm', b: 1, ans: 1 });
      /* 용입 불량 — 맞대기 뿌리가 안 녹음 */
      x = cx[3]; y = cy[3];
      s += plate(x - 62, y, 58, 40) + plate(x + 4, y, 58, 40);
      s += path('M' + (x - 22) + ',' + y + ' L' + (x + 22) + ',' + y + ' L' + (x + 8) + ',' + (y + 20) + ' L' + (x - 8) + ',' + (y + 20) + ' Z', { fill: MELT, c: MELT_E, w: 1.4 });
      s += path('M' + (x - 24) + ',' + y + ' Q' + x + ',' + (y - 16) + ' ' + (x + 24) + ',' + y, { fill: MELT, c: MELT_E, w: 1.4 });
      s += line(x, y + 22, x, y + 40, { c: C.red, w: 2.4 });
      s += t(x, y + 58, '용입 불량', { a: 'm', b: 1, ans: 1 });
      s += callout(x - 1, y + 32, x - 26, y + 30, '뿌리', { size: 13, c: C.red, tc: C.red, a: 'e' });
      /* 크레이터 — 비드 끝 오목 (위에서) */
      x = cx[4]; y = cy[4];
      s += box(x - 62, y - 6, 124, 50, { fill: METAL, c: METAL_E, r: 2, w: 1.4 });
      s += path('M' + (x - 58) + ',' + (y + 8) + ' H' + (x + 18) + ' Q' + (x + 40) + ',' + (y + 19) + ' ' + (x + 18) + ',' + (y + 30) + ' H' + (x - 58) + ' Z', { fill: MELT, c: MELT_E, w: 1.4 });
      for (var k = 0; k < 6; k++) s += path('M' + (x - 52 + k * 11) + ',' + (y + 9) + ' q7,10 0,20', { c: MELT_E, w: 1 });
      s += ell(x + 20, y + 19, 10, 8, { fill: '#9a3412', c: C.red, w: 1.6, op: 0.85 });
      s += t(x, y + 58, '크레이터', { a: 'm', b: 1, ans: 1 });
      /* 스패터 */
      x = cx[5]; y = cy[5];
      s += base(x, y) + path('M' + (x - 30) + ',' + y + ' Q' + x + ',' + (y - 22) + ' ' + (x + 30) + ',' + y + ' Q' + x + ',' + (y + 26) + ' ' + (x - 30) + ',' + y + ' Z', { fill: MELT, c: MELT_E, w: 1.4 });
      var sp = [[-52, -4], [-44, -14], [40, -8], [50, -2], [-36, -2], [34, -18]];
      for (k = 0; k < sp.length; k++) s += dot(x + sp[k][0], y + sp[k][1], 3.4, C.orange);
      s += t(x, y + 58, '스패터', { a: 'm', b: 1, ans: 1 });
      return F.svg(480, 290, s);
    } },

  /* ═══════════ 3단원 가스용접 ═══════════ */
  cylinders: { cards: ['산소와 아세틸렌'],
    cap: '산소는 녹색 용기·녹색 호스, 아세틸렌은 노란 용기·빨간 호스',
    draw: function () {
      var s = '';
      function cyl(x, fill, edge, name, tc) {
        return box(x, 58, 78, 164, { fill: fill, c: edge, r: 32, w: 1.8 }) + box(x + 29, 36, 20, 26, { fill: C.grayM, r: 3, w: 1.4 }) +
          t(x + 39, 140, name, { a: 'm', b: 1, size: 17, c: tc, halo: false });
      }
      s += cyl(36, '#16a34a', '#14532d', '산소', '#fff') + cyl(366, '#facc15', '#a16207', '아세틸렌', C.ink);
      s += path('M114,112 Q196,112 206,168 H224', { c: '#16a34a', w: 6 });
      s += path('M366,112 Q284,112 274,180 H258', { c: C.red, w: 6 });
      s += box(206, 156, 70, 36, { fill: ROD, c: C.ink, r: 6, label: '토치', size: 15, lc: '#fff' });
      s += t(158, 96, '녹색 호스', { a: 'm', size: 14, b: 1, c: '#15803d' }) + t(322, 96, '빨간 호스', { a: 'm', size: 14, b: 1, c: C.red });
      s += t(75, 242, '녹색 용기', { a: 'm', size: 14, b: 1 }) + t(405, 242, '노란 용기', { a: 'm', size: 14, b: 1 });
      s += t(75, 262, '150 kgf/cm²', { a: 'm', size: 13 }) + t(405, 262, '15.5 kgf/cm²', { a: 'm', size: 13 });
      s += t(75, 282, '조연성', { a: 'm', size: 13, b: 1, c: C.green, ans: 1 }) + t(405, 282, '가연성', { a: 'm', size: 13, b: 1, c: C.red, ans: 1 });
      s += t(75, 302, '공기보다 무겁다', { a: 'm', size: 13, c: C.sub }) + t(405, 302, '공기보다 가볍다', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 318, s);
    } },

  gasset: { cards: ['가스 용접 장치'],
    cap: '가스 용접 장치의 흐름 — 용기 → 압력 조정기(압력을 낮춤) → 안전기 → 호스 → 토치(섞음) → 팁',
    draw: function () {
      var s = '';
      function gauge(x, y, v, c) {
        return F.circle(x, y, 22, { fill: C.paper, c: C.ink, w: 1.6 }) + line(x, y, x + 12, y - 12, { c: c, w: 2.2 }) + dot(x, y, 3) +
          t(x, y + 36, v, { a: 'm', size: 13, b: 1, c: c, ans: v === '0.2~0.5' });
      }
      /* 산소 줄 */
      s += box(16, 36, 46, 76, { fill: '#16a34a', c: '#14532d', r: 18, w: 1.4 }) + t(39, 124, '산소', { a: 'm', size: 13, b: 1, c: '#15803d' });
      s += gauge(106, 60, '2~5', '#15803d');
      s += path('M62,60 H84 M128,60 H300', { c: '#16a34a', w: 5 });
      /* 아세틸렌 줄 */
      s += box(16, 158, 46, 76, { fill: '#facc15', c: '#a16207', r: 18, w: 1.4 }) + t(39, 246, '아세틸렌', { a: 'm', size: 13, b: 1, c: '#a16207' });
      s += gauge(106, 182, '0.2~0.5', C.red);
      s += path('M62,182 H84 M128,182 H168 M206,182 H300', { c: C.red, w: 5 });
      s += box(168, 166, 38, 32, { fill: C.orangeL, c: C.orange, r: 5, w: 1.6 });
      s += t(187, 226, '안전기', { a: 'm', size: 14, b: 1, c: C.orange });
      s += t(106, 18, '압력 조정기', { a: 'm', size: 14, b: 1 }) + t(106, 250, '(kgf/cm²)', { a: 'm', size: 12.5, c: C.sub });
      s += t(236, 44, '호스', { a: 'm', size: 14, b: 1 });
      /* 토치 */
      s += path('M300,60 Q320,60 322,110 M300,182 Q320,182 322,134', { c: C.ink, w: 3 });
      s += box(316, 100, 70, 44, { fill: C.grayM, c: C.ink, r: 6, w: 1.6 });
      s += t(351, 122, '혼합실', { a: 'm', size: 13, b: 1, halo: false });
      s += poly([[386, 112], [440, 118], [440, 126], [386, 132]], { close: 1, fill: '#b45309', c: '#78350f', w: 1.4 });
      s += path('M442,116 Q466,122 442,128', { c: C.blue, w: 3 });
      s += t(351, 164, '토치', { a: 'm', size: 15, b: 1 }) + t(420, 98, '팁', { a: 'm', size: 15, b: 1 });
      s += arrow(336, 196, 380, 196, { c: C.sub, w: 1.4, head: 8 }) + t(358, 214, '두 가스를 섞어 내보냄', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 262, s);
    } },

  flameparts: { cards: ['불꽃의 구성'],
    cap: '불꽃의 구성 — 백심 · 속불꽃 · 겉불꽃. 용접은 백심 끝 2~3㎜ 앞(속불꽃)에서 한다',
    draw: function () {
      var s = '';
      s += box(14, 102, 60, 24, { fill: ROD, c: C.ink, r: 4, w: 1.2 }) + poly([[74, 106], [104, 110], [104, 118], [74, 122]], { close: 1, fill: '#b45309', c: '#78350f', w: 1.2 });
      s += path('M104,72 Q250,56 360,114 Q250,172 104,156 Z', { fill: '#c7d2fe', c: '#818cf8', w: 1.2 });
      s += path('M104,90 Q180,82 226,114 Q180,146 104,138 Z', { fill: '#6366f1', c: '#4f46e5', w: 1.2, op: 0.8 });
      s += path('M104,102 Q132,98 150,114 Q132,130 104,126 Z', { fill: '#fff', c: '#c7d2fe', w: 1.4 });
      s += line(150, 114, 150, 190, { c: C.red, w: 1, dash: '4 3' }) + line(164, 114, 164, 190, { c: C.red, w: 1, dash: '4 3' });
      s += F.circle(164, 114, 4, { fill: C.red, c: C.red, w: 1 });
      s += F.dim(150, 186, 164, 186, '', {}) + t(157, 208, '2~3㎜', { a: 'm', size: 14, b: 1, c: C.red, ans: 1 });
      s += callout(128, 108, 110, 40, '불꽃심(백심)', { b: 1, ans: 1, a: 's' });
      s += callout(200, 104, 258, 40, '속불꽃', { b: 1, c: '#4f46e5', ans: 1 });
      s += t(258, 60, '온도 가장 높음 · 환원성', { size: 13, c: C.sub, ans: 1 });
      s += callout(320, 132, 344, 178, '겉불꽃', { b: 1, c: '#6366f1', ans: 1 });
      s += t(344, 198, '온도 낮음 · 산화', { size: 13, c: C.sub, ans: 1 });
      s += t(176, 232, '← 이 자리에서 용접', { size: 14, b: 1, c: C.red });
      return F.svg(480, 250, s);
    } },

  backfire: { cards: ['역류 · 역화 · 인화'],
    cap: '역류는 산소가 아세틸렌 호스로, 인화는 불꽃이 혼합실까지 거꾸로 — 역화는 팁에서 「펑펑」',
    draw: function () {
      var s = '';
      /* 토치 골격 */
      s += path('M24,70 H170', { c: '#16a34a', w: 8 }) + path('M24,170 H170', { c: C.red, w: 8 });
      s += t(24, 50, '산소 호스', { size: 14, b: 1, c: '#15803d' }) + t(24, 196, '아세틸렌 호스', { size: 14, b: 1, c: C.red });
      s += path('M170,70 Q200,70 214,108 M170,170 Q200,170 214,132', { c: C.ink, w: 3 });
      s += box(210, 96, 92, 48, { fill: C.grayM, c: C.ink, r: 6, w: 1.6 }) + t(256, 120, '혼합실', { a: 'm', size: 14, b: 1, halo: false, ans: 1 });
      s += poly([[302, 108], [392, 115], [392, 125], [302, 132]], { close: 1, fill: '#b45309', c: '#78350f', w: 1.4 });
      s += t(350, 146, '팁', { a: 'm', size: 14, b: 1 });
      /* 역류 — 산소가 아세틸렌 호스 쪽으로 */
      s += F.route([[200, 76], [214, 112], [196, 160], [120, 170]], { c: '#16a34a', w: 2.6, head: 12, flow: 1 });
      s += F.num(100, 146, '1', { c: '#16a34a' }) + t(118, 146, '역류', { size: 16, b: 1, c: '#15803d', ans: 1 });
      /* 인화 — 불꽃이 혼합실까지 */
      s += arrow(420, 120, 262, 120, { c: C.red, w: 3, head: 13, flow: 1 });
      s += path('M394,110 Q420,104 440,120 Q420,136 394,130 Z', { fill: C.orangeL, c: C.orange, w: 1.4 });
      s += F.num(300, 82, '2', { c: C.red }) + t(318, 82, '인화', { size: 16, b: 1, c: C.red, ans: 1 });
      s += t(318, 62, '혼합실까지 밀려 들어감', { size: 13, c: C.sub, ans: 1 });
      /* 역화 — 팁에서 펑 */
      s += F.num(400, 182, '3', { c: C.orange }) + t(418, 182, '역화', { size: 16, b: 1, c: C.orange, ans: 1 });
      s += t(460, 206, '팁 끝에서 「펑펑」', { a: 'e', size: 13, c: C.sub });
      s += t(24, 232, '첫 조치 — 밸브를 잠가 불을 끈다 (팁 청소로 예방)', { size: 14, b: 1, c: C.red });
      return F.svg(480, 250, s);
    } },

  /* ═══════════ 4단원 용접 안전 ═══════════ */
  antishock: { cards: ['감전 재해'],
    cap: '전격 방지 장치 — 용접을 쉬는 동안 홀더 쪽 전압을 20~30V 이하로 낮춰 감전을 막는다',
    draw: function () {
      var s = '';
      var X0 = 70, W = 390, Y0 = 200, k = 1.9; /* 전압 → 높이 */
      s += line(X0, Y0, X0 + W, Y0, { w: 1.6 }) + line(X0, Y0, X0, 40, { w: 1.6 });
      s += t(X0 - 8, 44, '전압', { a: 'e', size: 13, c: C.sub }) + t(X0 + W, Y0 - 12, '시간 →', { a: 'e', size: 13, c: C.sub });
      /* 구간: 쉼 · 용접 · 쉼 */
      s += box(X0 + 130, 48, 130, Y0 - 48, { fill: C.orangeL, c: C.orangeL, r: 0, w: 0.1 });
      s += t(X0 + 65, Y0 + 20, '쉬는 동안', { a: 'm', size: 14, b: 1 }) + t(X0 + 195, Y0 + 20, '용접 중', { a: 'm', size: 14, b: 1, c: C.orange }) +
        t(X0 + 325, Y0 + 20, '쉬는 동안', { a: 'm', size: 14, b: 1 });
      /* 장치 없음 — 무부하 70~80V */
      var hi = Y0 - 75 * k, lo = Y0 - 25 * k, arc = Y0 - 35 * k;
      s += poly([[X0, hi], [X0 + 130, hi], [X0 + 130, arc], [X0 + 260, arc], [X0 + 260, hi], [X0 + W, hi]], { c: C.red, w: 2.2, dash: '7 5' });
      s += t(X0 + 6, hi - 14, '장치 없음 — 무부하 전압 70~80V 그대로', { size: 13, c: C.red, b: 1 });
      /* 장치 있음 */
      s += poly([[X0, lo], [X0 + 130, lo], [X0 + 130, arc], [X0 + 260, arc], [X0 + 260, lo], [X0 + W, lo]], { c: C.green, w: 3 });
      s += t(X0 + 325, lo + 20, '20~30V 이하', { a: 'm', size: 14, b: 1, c: C.green, ans: 1 });
      s += t(X0 + 65, lo + 20, '20~30V 이하', { a: 'm', size: 14, b: 1, c: C.green, ans: 1 });
      s += t(X0 + 195, arc - 14, '아크 전압', { a: 'm', size: 13, c: C.sub });
      s += t(240, 244, '쉬는 사이 홀더를 만져도 감전되지 않게', { a: 'm', size: 14, b: 1, c: C.green });
      return F.svg(480, 262, s);
    } },

  shade: { cards: ['아크 광선 재해와 차광 유리'],
    cap: '차광 유리 번호 — 번호가 클수록 진하고 빛을 많이 막는다',
    draw: function () {
      var s = '';
      var rows = [['납땜', '2~4', '#a7c4b5'], ['가스 용접', '4~6', '#5b8a74'], ['피복 아크 용접', '10~12', '#12372a']];
      for (var i = 0; i < 3; i++) {
        var y = 40 + i * 62;
        s += t(24, y + 20, rows[i][0], { size: 16, b: 1 });
        s += box(170, y, 120, 40, { fill: rows[i][2], c: C.ink, r: 6, w: 1.4 });
        s += t(230, y + 20, rows[i][1], { a: 'm', size: 18, b: 1, c: i === 2 ? '#fff' : C.ink, halo: false });
      }
      s += arrow(330, 44, 330, 200, { c: C.ink, w: 3, head: 13 });
      s += t(346, 90, '번호 ↑', { size: 15, b: 1 }) + t(346, 116, '더 진하다', { size: 14 }) + t(346, 142, '빛을 더 막는다', { size: 14 });
      s += t(24, 244, '아크의 빛을 맨눈으로 보면 →', { size: 14, b: 1, c: C.red }) + t(250, 244, '자외선 · 전광성 안염', { size: 14, b: 1, c: C.red, ans: 1 });
      return F.svg(480, 266, s);
    } },

  ppe: { cards: ['화상 — 보호구를 갖춰 입기'],
    cap: '화상을 막는 보호구 — 바지 자락은 신발 밖으로 내려 덮는다',
    draw: function () {
      var s = '', cx = 190;
      /* 머리 + 핸드 실드 */
      s += F.circle(cx, 44, 20, { fill: '#fde68a', c: C.ink, w: 1.4 });
      s += path('M' + (cx + 8) + ',22 Q' + (cx + 36) + ',22 ' + (cx + 38) + ',46 Q' + (cx + 36) + ',70 ' + (cx + 8) + ',68 Z', { fill: '#374151', c: C.ink, w: 1.4 });
      s += box(cx + 22, 36, 12, 16, { fill: '#065f46', c: '#022c22', r: 2, w: 1 });
      /* 몸통 · 앞치마 */
      s += box(cx - 34, 70, 68, 110, { fill: '#93c5fd', c: C.blue, r: 10, w: 1.4 });
      s += path('M' + (cx - 26) + ',84 H' + (cx + 26) + ' L' + (cx + 30) + ',196 H' + (cx - 30) + ' Z', { fill: '#b45309', c: '#78350f', w: 1.4 });
      /* 팔 + 팔덮개 + 장갑 */
      s += box(cx - 58, 76, 22, 90, { fill: '#93c5fd', c: C.blue, r: 8, w: 1.2 }) + box(cx + 36, 76, 22, 90, { fill: '#93c5fd', c: C.blue, r: 8, w: 1.2 });
      s += box(cx - 60, 118, 26, 44, { fill: '#d6a86b', c: '#78350f', r: 6, w: 1.2 }) + box(cx + 34, 118, 26, 44, { fill: '#d6a86b', c: '#78350f', r: 6, w: 1.2 });
      s += box(cx - 62, 160, 30, 28, { fill: '#a16207', c: '#78350f', r: 8, w: 1.2 }) + box(cx + 32, 160, 30, 28, { fill: '#a16207', c: '#78350f', r: 8, w: 1.2 });
      /* 다리 · 바지 · 발커버 · 신발 */
      s += box(cx - 30, 180, 26, 96, { fill: '#1e3a8a', c: C.ink, r: 4, w: 1.2 }) + box(cx + 4, 180, 26, 96, { fill: '#1e3a8a', c: C.ink, r: 4, w: 1.2 });
      s += box(cx - 40, 270, 40, 22, { fill: '#d6a86b', c: '#78350f', r: 6, w: 1.2 }) + box(cx, 270, 40, 22, { fill: '#d6a86b', c: '#78350f', r: 6, w: 1.2 });
      s += box(cx - 44, 290, 48, 12, { fill: '#111827', c: C.ink, r: 4, w: 1 }) + box(cx - 4, 290, 48, 12, { fill: '#111827', c: C.ink, r: 4, w: 1 });
      /* 이름표 */
      s += callout(cx + 36, 30, 300, 30, '핸드 실드 · 차광 유리', { size: 14 });
      s += callout(cx + 58, 136, 300, 110, '팔덮개', { size: 15, b: 1 });
      s += callout(cx + 62, 174, 300, 170, '가죽 장갑', { size: 15, b: 1 });
      s += callout(cx - 20, 140, 60, 110, '앞치마', { size: 15, b: 1, a: 'e' });
      s += callout(cx - 30, 280, 60, 250, '발커버', { size: 15, b: 1, a: 'e' });
      s += callout(cx + 26, 268, 300, 250, '바지는 신발 밖으로', { size: 15, b: 1, c: C.red, tc: C.red, ans: 1 });
      s += t(300, 280, '넣으면 스패터가 신발 속으로', { size: 13, c: C.sub });
      return F.svg(480, 316, s);
    } }

  };
})();
