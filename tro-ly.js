/* tro-ly.js — Nút trợ lý nổi, kéo thả mọi nơi. Bấm → danh sách gợi ý tra cứu thêm; chọn một mục → mở Google AI Mode với lời nhắc điền sẵn. */
(function () {
  var KHO = 'menhly.troly.vitri', btn = null, panel = null, drag = null, moved = false, lastData = null;
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function luu(v) { try { localStorage.setItem(KHO, JSON.stringify(v)); } catch (e) {} }
  function doc() { try { return JSON.parse(localStorage.getItem(KHO) || 'null'); } catch (e) { return null; } }

  // Lời nhắc chỉ chứa đặc điểm lá số, KHÔNG chứa họ tên hay ngày-giờ sinh cụ thể
  function xayLoiNhac(d) {
    var bt = d.batTu || {}, t = d.tamTai || {}, k = d.kimLau || {}, hk = d.huyenKhong || {}, bz = d.batTrach || {}, cd = d.cuuDieu || {};
    var tien = 'Trả lời bằng tiếng Việt, đơn giản, dễ hiểu cho người mới, có ví dụ cụ thể; nói rõ đây chỉ là quan niệm tham khảo, không phải khoa học hay lời khuyên y tế/tài chính. ';
    var nen = 'Lá số Bát Tự của tôi: Nhật Chủ ' + d.nhatChu + ' (hành ' + d.nguHanh + '), Dụng Thần ' + d.dungThan + ', Hỷ Thần ' + d.hyThan + '; trụ năm ' + bt.canChiNam + ', tháng ' + bt.canChiThang + ', ngày ' + bt.canChiNgay + ', giờ ' + bt.canChiGio + '. ';
    return [
      ['🧒', 'Giải thích lá số cho người mới', nen + 'Hãy giải thích từng thuật ngữ (Nhật Chủ, Dụng Thần, Hỷ Thần, ngũ hành) bằng lời đơn giản rồi tóm tắt tính cách của tôi trong 5 ý ngắn. ' + tien],
      ['🎨', 'Màu sắc & thói quen hợp Dụng Thần ' + d.dungThan, nen + 'Gợi ý màu sắc, chất liệu, hướng bàn làm việc và 5 thói quen hằng ngày để bổ sung hành ' + d.dungThan + ' một cách thực tế. ' + tien],
      ['💼', 'Nghề nghiệp & phong cách làm việc', nen + 'Nêu 8 nhóm nghề phù hợp, điểm mạnh yếu khi làm việc nhóm và cách phát triển sự nghiệp. ' + tien],
      ['📅', 'Vận hạn năm ' + (hk.nam || ''), 'Năm ' + (hk.nam || '') + ', tôi ' + (t.isPham ? 'phạm' : 'không phạm') + ' Tam Tai, Kim Lâu: ' + (k.isPham ? 'phạm' : 'không phạm') + ', sao hạn ' + (cd.sao || '') + ' (' + (cd.han || '') + '), năm cá nhân Thần số học ' + d.namCaNhan + '. Hãy giải thích từng khái niệm ngắn gọn và đưa 5 lời khuyên trung lập cho năm này. ' + tien],
      ['🔢', 'Thần số học: số chủ đạo ' + d.soChuDao, 'Giải thích ý nghĩa Số chủ đạo ' + d.soChuDao + ' và Năm cá nhân ' + d.namCaNhan + ' trong Thần số học Pythagoras: điểm mạnh, thử thách, lời khuyên cho năm này. ' + tien],
      ['🏠', 'Hướng nhà/bàn làm việc theo Bát Trạch', 'Tôi thuộc cung phi ' + bz.cungPhi + ' (' + bz.nhomHuong + '). Hãy giải thích Bát Trạch là gì và gợi ý cách bố trí hướng giường, bàn làm việc, bếp theo cung phi này, kèm cách xử lý khi không thể đổi hướng. ' + tien],
      ['🌟', 'Bộ ba Mặt Trời–Mặt Trăng–Cung Mọc', 'Cung Mặt Trời ' + d.zodiacSign + ', Mặt Trăng ' + d.moonSign + ', Cung Mọc ' + d.ascendant + '. Hãy giải thích ý nghĩa từng vị trí và cách chúng kết hợp, bằng lời dễ hiểu. ' + tien]
    ];
  }
  window.__xayLoiNhac = xayLoiNhac;

  function moGoogleAI(p) {
    try { navigator.clipboard && navigator.clipboard.writeText(p); } catch (e) {}       // dự phòng: dán vào Gemini/ChatGPT
    window.open('https://www.google.com/search?udm=50&q=' + encodeURIComponent(p), '_blank', 'noopener');
  }
  function dongPanel() { if (panel) { panel.remove(); panel = null; } }
  function moPanel() {
    dongPanel(); if (!lastData) return;
    var ds = xayLoiNhac(lastData);
    panel = document.createElement('div'); panel.className = 'tro-ly-panel';
    panel.innerHTML = '<div class="tlp-head"><b>🤖 Tra cứu thêm với Google AI</b><button type="button" class="tlp-x" aria-label="Đóng">✕</button></div>' +
      '<p class="tlp-note">Chọn một mục: lời nhắc đã được điền sẵn. Khi bấm, nội dung (chỉ gồm đặc điểm lá số, không có họ tên hay ngày sinh) sẽ được gửi sang Google.</p><ul>' +
      ds.map(function (x, i) { return '<li><button type="button" data-i="' + i + '"><span>' + x[0] + '</span><em>' + esc(x[1]) + '</em><i>↗</i></button></li>'; }).join('') +
      '</ul><button type="button" class="tlp-copy">📋 Sao chép lời nhắc (dán vào Gemini, ChatGPT…)</button>';
    document.body.appendChild(panel);
    var r = btn.getBoundingClientRect(), pw = panel.offsetWidth, ph = panel.offsetHeight;
    var left = Math.min(Math.max(8, r.left + r.width / 2 - pw / 2), window.innerWidth - pw - 8);
    var top = (r.top > ph + 16) ? r.top - ph - 10 : Math.min(r.bottom + 10, window.innerHeight - ph - 8);
    panel.style.left = left + 'px'; panel.style.top = Math.max(8, top) + 'px';
    panel.querySelector('.tlp-x').onclick = dongPanel;
    panel.querySelectorAll('li button').forEach(function (b) { b.onclick = function () { moGoogleAI(ds[+b.getAttribute('data-i')][2]); }; });
    panel.querySelector('.tlp-copy').onclick = function (e) { var all = ds[0][2]; try { navigator.clipboard.writeText(all); e.target.textContent = '✅ Đã sao chép lời nhắc đầu tiên'; } catch (x) { e.target.textContent = 'Không sao chép được'; } };
  }
  function kep(x, y) { var s = btn.offsetWidth; return { x: Math.min(Math.max(6, x), window.innerWidth - s - 6), y: Math.min(Math.max(6, y), window.innerHeight - s - 6) }; }
  function dat(x, y) { var p = kep(x, y); btn.style.left = p.x + 'px'; btn.style.top = p.y + 'px'; btn.style.right = btn.style.bottom = 'auto'; return p; }
  function tao() {
    if (btn) return;
    btn = document.createElement('button'); btn.type = 'button'; btn.className = 'tro-ly'; btn.setAttribute('aria-label', 'Trợ lý tra cứu thêm — kéo để di chuyển, bấm để mở'); btn.innerHTML = '<span>🤖</span><i>AI</i>';
    document.body.appendChild(btn);
    var v = doc(); if (v) dat(v.x, v.y); else dat(window.innerWidth - 74, window.innerHeight - 160);
    btn.addEventListener('pointerdown', function (e) { drag = { dx: e.clientX - btn.getBoundingClientRect().left, dy: e.clientY - btn.getBoundingClientRect().top, sx: e.clientX, sy: e.clientY }; moved = false; try { btn.setPointerCapture(e.pointerId); } catch (x) {} });
    btn.addEventListener('pointermove', function (e) { if (!drag) return; if (Math.abs(e.clientX - drag.sx) + Math.abs(e.clientY - drag.sy) > 6) { moved = true; dongPanel(); btn.classList.add('keo'); } if (moved) dat(e.clientX - drag.dx, e.clientY - drag.dy); });
    btn.addEventListener('pointerup', function () { if (!drag) return; btn.classList.remove('keo'); if (moved) luu({ x: parseFloat(btn.style.left), y: parseFloat(btn.style.top) }); else (panel ? dongPanel() : moPanel()); drag = null; });
    btn.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); panel ? dongPanel() : moPanel(); } });
    window.addEventListener('resize', function () { dat(parseFloat(btn.style.left) || 0, parseFloat(btn.style.top) || 0); dongPanel(); });
    document.addEventListener('click', function (e) { if (panel && !e.target.closest('.tro-ly-panel') && !e.target.closest('.tro-ly')) dongPanel(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') dongPanel(); });
  }
  var goc = window.loadAllData;
  if (typeof goc === 'function') {
    window.loadAllData = function (data) { goc(data); try { if (data && data.success !== false) { lastData = data; tao(); } } catch (e) { console.error(e); } };
    loadAllData = window.loadAllData;
  }
})();
