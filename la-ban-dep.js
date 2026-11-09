/* la-ban-dep.js — thêm vạch độ, ký hiệu Bát Quái và viền trang trí vào đĩa la bàn (không đụng logic cảm biến) */
(function () {
  function dung() {
    var svg = document.getElementById('svgLaBan');
    if (!svg || svg.getAttribute('data-dep')) return;
    svg.setAttribute('data-dep', '1');
    var NS = 'http://www.w3.org/2000/svg', c = 160, g = document.createElementNS(NS, 'g');
    var html = '<circle cx="160" cy="160" r="132" fill="none" stroke="rgba(232,180,74,.45)" stroke-width=".8"/><circle cx="160" cy="160" r="60" fill="none" stroke="rgba(232,180,74,.5)" stroke-width=".8"/>';
    for (var i = 0; i < 72; i++) {                                    // vạch mỗi 5°, vạch dài ở 45°
      var a = i * 5 * Math.PI / 180, l = i % 9 === 0 ? 11 : (i % 3 === 0 ? 7 : 4), r1 = 140, r2 = 140 - l;
      html += '<line x1="' + (c + r1 * Math.sin(a)).toFixed(1) + '" y1="' + (c - r1 * Math.cos(a)).toFixed(1) + '" x2="' + (c + r2 * Math.sin(a)).toFixed(1) + '" y2="' + (c - r2 * Math.cos(a)).toFixed(1) + '" stroke="' + (i % 9 === 0 ? '#e8b44a' : 'rgba(245,239,224,.4)') + '" stroke-width="' + (i % 9 === 0 ? 1.4 : .7) + '"/>';
    }
    // Hậu Thiên Bát Quái theo hướng: góc → 3 vạch (từ trong ra ngoài; 1 = liền)
    var QUAI = { 0: [0, 1, 0], 45: [0, 0, 1], 90: [1, 0, 0], 135: [0, 1, 1], 180: [1, 0, 1], 225: [0, 0, 0], 270: [1, 1, 0], 315: [1, 1, 1] };
    for (var ang in QUAI) {
      html += '<g transform="translate(160,160) rotate(' + ang + ')" fill="#e8b44a" opacity=".9">';
      QUAI[ang].forEach(function (s, k) {
        var y = -(66 + k * 8);
        html += s ? '<rect x="-11" y="' + (y - 1.7) + '" width="22" height="3.4" rx="1"/>' : '<rect x="-11" y="' + (y - 1.7) + '" width="9" height="3.4" rx="1"/><rect x="2" y="' + (y - 1.7) + '" width="9" height="3.4" rx="1"/>';
      });
      html += '</g>';
    }
    html += '<circle cx="160" cy="160" r="27" fill="none" stroke="#e8b44a" stroke-width="1"/>';
    g.innerHTML = html;
    var first = svg.querySelector('path[id^="arc-"]');
    svg.insertBefore(g, svg.querySelector('g[transform="translate(160,160)"]'));   // dưới chữ, trên các cung màu
    var tam = svg.querySelector('circle[r="18"]'); if (tam) tam.setAttribute('class', 'la-ban-tam');
  }
  if (document.readyState !== 'loading') dung(); else document.addEventListener('DOMContentLoaded', dung);
})();
