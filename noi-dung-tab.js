/* noi-dung-tab.js — thẻ "Hiểu nhanh" bằng lời đời thường cho 3 tab: Bát Tự, Thần số học, Vận hạn. Có biến thể câu chữ theo lá số. */
(function () {
  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function prng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function pick(a, r) { return a[Math.floor(r() * a.length)]; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  var H = ['Mộc', 'Hỏa', 'Thổ', 'Kim', 'Thủy'], ICON = { 'Mộc': '🌳', 'Hỏa': '🔥', 'Thổ': '⛰️', 'Kim': '⚔️', 'Thủy': '🌊' };
  var SO = { 1: ['Tiên phong', 'tự tin, dám bắt đầu', 'dễ cứng đầu, ngại nhờ giúp'], 2: ['Hòa giải', 'lắng nghe, tinh tế', 'dễ nhạy cảm, ngại nói "không"'], 3: ['Biểu đạt', 'vui vẻ, sáng tạo', 'dễ phân tán, ngại việc khô khan'],
    4: ['Nền tảng', 'kỷ luật, đáng tin', 'dễ cứng nhắc, làm quá sức'], 5: ['Tự do', 'linh hoạt, thích khám phá', 'dễ chán, thiếu kiên định'], 6: ['Chăm sóc', 'ấm áp, có trách nhiệm', 'dễ ôm đồm, lo cho người khác quá mức'],
    7: ['Chiêm nghiệm', 'sâu sắc, ham học', 'dễ khép kín, hay hoài nghi'], 8: ['Thành tựu', 'giỏi quản trị, bền chí', 'dễ coi trọng thành công và tiền quá mức'], 9: ['Nhân ái', 'rộng lượng, nhìn xa', 'dễ hy sinh quá mức, khó buông'] };
  var NAM = { 1: ['bắt tay vào việc mới, đặt mục tiêu', 'ôm quá nhiều việc cùng lúc'], 2: ['hợp tác, chăm các mối quan hệ', 'ép tiến độ, nóng vội'], 3: ['giao lưu, sáng tạo, thể hiện bản thân', 'nói nhiều hơn làm'],
    4: ['sắp xếp, tiết kiệm, làm chắc nền móng', 'liều lĩnh đổi hướng đột ngột'], 5: ['thử điều mới, đi xa, học kỹ năng lạ', 'quyết định bốc đồng'], 6: ['chăm gia đình, nhà cửa, sức khỏe', 'gánh hết trách nhiệm của người khác'],
    7: ['học sâu, nghỉ ngơi, nhìn lại hướng đi', 'cố gồng làm việc ồn ào'], 8: ['công việc, tiền bạc, giữ quyền chủ động', 'đánh đổi sức khỏe lấy thành tích'], 9: ['tổng kết, dọn bớt cái cũ, giúp đỡ người khác', 'khởi động dự án lớn mới toanh'] };
  var TRU = [['Năm', 'canChiNam', 'môi trường lớn lên và hình ảnh với xã hội'], ['Tháng', 'canChiThang', 'gia đình gốc, sự nghiệp, cách làm việc'], ['Ngày', 'canChiNgay', 'chính bạn và đời sống đôi lứa'], ['Giờ', 'canChiGio', 'con cái, tuổi về sau, thế giới nội tâm']];

  function theBatTu(d, r) {
    var bt = d.batTu || {}, pc = d.phanTramNguHanhMang || [0, 0, 0, 0, 0], mx = 0, mn = 0, i;
    for (i = 1; i < 5; i++) { if (pc[i] > pc[mx]) mx = i; if (pc[i] < pc[mn]) mn = i; }
    var tru = TRU.map(function (t) { return '<div class="nd-tru"><span>' + t[0] + '</span><b>' + esc(bt[t[1]]) + '</b><small>' + t[2] + '</small></div>'; }).join('');
    var mo = pick(['Bát Tự là 8 chữ ghi lại thời điểm bạn sinh. Đừng lo thuật ngữ — chỉ cần nhìn 4 ô dưới đây:', 'Hãy hình dung lá số như một bức ảnh chụp lúc bạn chào đời, gồm 4 "khung" thời gian:', 'Lá số gồm bốn cột, mỗi cột nói về một mảng cuộc sống của bạn:'], r);
    return '<div class="nd-tab"><h3>☯️ Hiểu nhanh lá số của bạn</h3><p>' + mo + '</p><div class="nd-tru-grid">' + tru + '</div>' +
      '<p class="nd-kq">' + ICON[H[mx]] + ' Mạnh nhất: <b>' + H[mx] + ' (' + pc[mx] + '%)</b> &nbsp;•&nbsp; ' + ICON[H[mn]] + ' Thiếu nhất: <b>' + H[mn] + ' (' + pc[mn] + '%)</b></p>' +
      '<p class="nd-meo">💡 ' + pick(['Hành thiếu không có nghĩa là xấu — chỉ là phần bạn nên chủ động bù đắp bằng thói quen.', 'Không có lá số "tốt" hay "xấu", chỉ có lá số nghiêng về một phía và cần cân bằng lại.', 'Hành mạnh là thế mạnh, hành yếu là chỗ có thể rèn thêm — ai cũng có cả hai.'], r) + '</p></div>';
  }
  function theThanSo(d, r) {
    var ts = d.thanSo || {}, cd = d.soChuDao, k = cd === 11 ? 2 : (cd === 22 ? 4 : (cd === 33 ? 6 : cd)), s = SO[k] || SO[1];
    var tenMuiTen = function (a) { return (a && a.length) ? a.map(function (m) { return esc(m.name); }).join(', ') : 'không có'; };
    var py = (ts.pyramid || []).map(function (p) { var q = SO[p.index] || SO[1]; return '<li><b>Giai đoạn ' + p.dinh + '</b> (quanh tuổi ' + p.tuoi + '): chủ đề <b>' + q[0] + '</b> — ' + q[1] + '</li>'; }).join('');
    return '<div class="nd-tab"><h3>🔢 Hiểu nhanh Thần số học</h3>' +
      '<p>' + pick(['Con số chủ đạo của bạn là', 'Con số "đặc trưng" của bạn là', 'Từ ngày sinh, ta rút ra con số'], r) + ' <b>' + esc(cd) + '</b> — từ khóa: <b>' + s[0] + '</b>.</p>' +
      '<div class="nd-2col"><div class="nd-ok">👍 <b>Điểm mạnh</b><br>' + s[1] + '</div><div class="nd-warn">⚠️ <b>Dễ vướng</b><br>' + s[2] + '</div></div>' +
      '<p class="nd-kq">🏹 Mũi tên bạn có: <b>' + tenMuiTen(ts.muiTenSoHuu) + '</b><br>⭕ Còn trống: <b>' + tenMuiTen(ts.muiTenTrong) + '</b></p>' +
      '<p class="nd-meo">💡 Mũi tên "có" là thế mạnh tự nhiên; mũi tên "trống" là kỹ năng bạn có thể chủ động rèn dần.</p>' +
      (py ? '<p><b>4 chặng đời theo kim tự tháp:</b></p><ul class="nd-ul">' + py + '</ul>' : '') + '</div>';
  }
  function dai(ok) { return ok ? '<span class="nd-dot xanh">An toàn</span>' : '<span class="nd-dot do">Cần lưu ý</span>'; }
  function theVanHan(d, r) {
    var t = d.tamTai || {}, kl = d.kimLau || {}, ho = (d.hoangOc && d.hoangOc.obj) || {}, cd = d.cuuDieu || {}, nam = d.namCaNhan, n = NAM[nam] || NAM[1];
    var dv = (d.danhSachCanChiDaiVan || []).slice(0, 4).map(function (x, i) { return '<li><b>Chặng ' + (i + 1) + '</b> (từ khoảng ' + ((d.tuoiKhoiDaiVanThucTe || 0) + 10 * i) + ' tuổi): ' + esc(x.canChi) + ' — hành ' + esc(x.hanh) + '</li>'; }).join('');
    return '<div class="nd-tab"><h3>📆 Hiểu nhanh năm ' + esc(d.huyenKhong ? d.huyenKhong.nam : '') + '</h3>' +
      '<p>' + pick(['Năm này, "chủ đề" của bạn là số', 'Theo Thần số học, năm này mang con số', 'Bạn đang ở năm cá nhân số'], r) + ' <b>' + esc(nam) + '</b>.</p>' +
      '<div class="nd-2col"><div class="nd-ok">✅ <b>Hợp để</b><br>' + n[0] + '</div><div class="nd-warn">🚧 <b>Nên tránh</b><br>' + n[1] + '</div></div>' +
      '<div class="nd-den"><div>Tam Tai ' + dai(!t.isPham) + '</div><div>Kim Lâu ' + dai(!kl.isPham) + '</div><div>Hoang Ốc ' + dai(ho.tot !== false) + '</div></div>' +
      '<p class="nd-kq">⭐ Sao chiếu mệnh: <b>' + esc(cd.sao || '—') + '</b> &nbsp;•&nbsp; Hạn: <b>' + esc(cd.han || '—') + '</b></p>' +
      '<p class="nd-meo">💡 Các mục trên là quan niệm dân gian, dùng như lời nhắc cẩn trọng — không phải điều chắc chắn sẽ xảy ra.</p>' +
      (dv ? '<p><b>Các chặng 10 năm (Đại Vận):</b></p><ul class="nd-ul">' + dv + '</ul>' : '') + '</div>';
  }
  window.__xayTheTab = function (d) {
    var seed = hash([d.batTu && d.batTu.canChiGio, d.batTu && d.batTu.canChiNgay, d.soChuDao, d.namCaNhan, d.nhatChu].join('|'));
    return { battu: theBatTu(d, prng(seed + 1)), thanso: theThanSo(d, prng(seed + 2)), luunien: theVanHan(d, prng(seed + 3)) };
  };
  var goc = window.loadAllData;
  if (typeof goc === 'function') {
    window.loadAllData = function (data) {
      goc(data);
      try {
        if (!data || data.success === false) return;
        var h = window.__xayTheTab(data), map = { 'tab-battu': h.battu, 'tab-thanso': h.thanso, 'tab-luunien': h.luunien };
        Object.keys(map).forEach(function (id) {
          var tab = document.getElementById(id); if (!tab) return;
          var cu = tab.querySelector('.nd-tab'); if (cu) cu.remove();
          var bar = tab.querySelector('.gon-tools');
          if (bar) bar.insertAdjacentHTML('afterend', map[id]); else tab.insertAdjacentHTML('afterbegin', map[id]);
          var el = tab.querySelector('.nd-tab'); if (!el) return; el.classList.add('rv'); setTimeout(function () { el.classList.add('hien'); }, 40);
          if (window.__danhDauTuNgu) window.__danhDauTuNgu(el);
        });
      } catch (e) { console.error(e); }
    };
    loadAllData = window.loadAllData;
  }
})();
