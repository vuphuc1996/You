/* bo-sung-2.js — (1) Cách tính minh bạch, (3) Vận hạn 12 tháng, (5) Chế độ Dễ hiểu / Chuyên sâu, (6) Dòng phiên bản. */
(function () {
  // ===== (6) Thông tin phiên bản — điền REVIEW khi có người rà soát thật sự đồng ý được nêu tên =====
  var PHIEN_BAN = '2026.11.1', NGAY_CAP_NHAT = '11/11/2026', REVIEW = '';   // ví dụ: 'Phần phép tính được đối chiếu bởi …, ngày …'
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function pick(a, seed) { return a[seed % a.length]; }

  // ===== (1) Cách tính minh bạch =====
  function theMinhBach(d) {
    var m = d.minhBach || {}, t = m.tiet || {}, bt = d.batTu || {}, dg = d.chiTietDanhGia || {};
    var khoi = function (tt, nd) { return '<details class="mb-in"><summary>' + tt + '</summary><div>' + nd + '</div></details>'; };
    return '<section class="mb-card no-print" id="cachTinh"><details><summary>🔍 Cách tính minh bạch — app tính lá số của bạn như thế nào</summary><div class="mb-body">' +
      '<p class="mb-intro">Mọi con số đều tính trực tiếp trên máy bạn từ vị trí thật của Mặt Trời và Mặt Trăng, không tra bảng sơ lược. Bấm từng mục để xem.</p>' +
      khoi('🕰️ Giờ sinh của bạn', 'Giờ đồng hồ bạn nhập: <b>' + esc(m.gioDongHo) + '</b> tại <b>' + esc(m.viTri) + '</b>. Do kinh độ khác kinh tuyến múi giờ, giờ mặt trời địa phương lệch <b>' + esc(m.phutLech) + ' phút</b>, nên giờ đã hiệu chỉnh là <b>' + esc(m.gioDaBu) + '</b> (ngày ' + esc(m.ngayDaBu) + '). Giờ này mới dùng để lập Trụ Giờ.') +
      khoi('🌞 Mốc Tiết Khí quanh ngày sinh', 'Bát Tự chia tháng theo <b>Tiết Khí</b> (vị trí Mặt Trời mỗi 30°), không theo tháng dương lịch. Tiết gần nhất trước ngày sinh: <b>' + esc(t.truoc && t.truoc.ten) + '</b> lúc ' + esc(t.truoc && t.truoc.gio) + '. Tiết kế tiếp: <b>' + esc(t.sau && t.sau.ten) + '</b> lúc ' + esc(t.sau && t.sau.gio) + '. Năm Bát Tự đổi tại <b>Lập Xuân</b> (' + esc(t.lapXuan) + '), vì vậy năm Bát Tự của bạn là <b>' + esc(m.namBatTu) + '</b>. Kinh độ Mặt Trời lúc sinh: <b>' + esc(m.kinhDoMatTroi) + '°</b>. Mốc giờ có thể lệch vài phút so với lịch in sẵn.') +
      khoi('🧱 Từng bước ra Tứ Trụ', 'Năm <b>' + esc(bt.canChiNam) + '</b> (theo Lập Xuân) • Tháng <b>' + esc(bt.canChiThang) + '</b> (theo Tiết Khí, Can tháng suy từ Can năm) • Ngày <b>' + esc(bt.canChiNgay) + '</b> (đếm liên tục theo số ngày Julius) • Giờ <b>' + esc(bt.canChiGio) + '</b> (Chi theo khung 2 giờ, Can suy từ Can ngày). Đại Vận đi <b>' + (m.thuan ? 'thuận' : 'nghịch') + '</b>, cách Tiết <b>' + esc(m.soNgayToiTiet) + ' ngày</b>, cứ 3 ngày tính 1 tuổi.') +
      khoi('☯️ Cách chọn Dụng Thần', 'Trạng thái: <b>' + esc(dg.trangThai) + '</b>. Dụng Thần chính: <b>' + esc(d.dungThan) + '</b>, Hỷ Thần: <b>' + esc(d.hyThan) + '</b>' + (dg.dungThanPhu ? ', Dụng Thần phụ (xét theo tỷ lệ %): <b>' + esc(dg.dungThanPhu) + '</b>' : '') + '. Hành được chọn có xét mùa sinh (điều hậu); trong khoảng 3% lá số, điều hậu được ưu tiên hơn quy tắc mạnh–yếu thông thường.') +
      khoi('📅 Vận hạn theo tháng', 'Mỗi tháng Bát Tự được chấm bằng cách so hành của Can–Chi tháng với Dụng Thần, Hỷ Thần và hành kỵ (<i>tạm quy ước là hành khắc Dụng Thần</i>), cộng trừ thêm khi Chi tháng hợp hoặc xung với Chi ngày sinh của bạn. Đây là quy ước tham khảo, không phải dự báo chắc chắn.') +
      khoi('⚖️ Giới hạn & quy ước', 'Múi giờ GMT+7 cho mọi năm; phạm vi 1900–2100. Ngày đổi lúc 0h. Cung Mặt Trăng và Cung Mọc là tính xấp xỉ (sai số vài độ; vĩ độ Cung Mọc lấy theo tỉnh). Âm lịch theo múi giờ GMT+7 nên một vài năm có thể lệch lịch Trung Quốc. Kết quả chỉ mang tính tham khảo.') +
      '<p class="mb-ver">Phiên bản ' + PHIEN_BAN + ' • cập nhật ' + NGAY_CAP_NHAT + (REVIEW ? ' • ' + esc(REVIEW) : '') + '</p></div></details></section>';
  }

  // ===== (3) Vận hạn 12 tháng =====
  var HANH_Y = { 'Mộc': ['khơi mầm, mở rộng', 'học hỏi, kết nối'], 'Hỏa': ['chủ động, nhiệt huyết', 'nổi bật, truyền cảm hứng'], 'Thổ': ['ổn định, tích lũy', 'chăm lo nền tảng'], 'Kim': ['dứt khoát, chắt lọc', 'kỷ luật, chuẩn hóa'], 'Thủy': ['linh hoạt, lắng nghe', 'nghiên cứu, thích nghi'] };
  var MUC = { thuan: ['Tháng thuận — hợp đẩy các việc quan trọng bạn đã cân nhắc kỹ.', 'Năng lượng đang hỗ trợ bạn; nên tận dụng để bắt tay vào việc đã chuẩn bị.'],
    binhOn: ['Tháng bình ổn — giữ nhịp đều, làm đúng kế hoạch.', 'Không quá nổi bật cũng ít trở ngại; hợp với việc thường ngày.'],
    canTrong: ['Tháng cần cẩn trọng — tránh quyết định vội, kiểm tra kỹ trước khi cam kết.', 'Nhịp hơi ngược với Dụng Thần; chậm lại, ưu tiên nghỉ ngơi và việc nhỏ.'] };
  var NHAN = { thuan: 'Thuận', binhOn: 'Bình ổn', canTrong: 'Cẩn trọng' };
  var SOTHANG = ['', 'khởi đầu', 'hợp tác', 'sáng tạo', 'nền tảng', 'thay đổi', 'chăm sóc', 'chiêm nghiệm', 'thành tựu', 'khép lại'];
  function theLichThang(d) {
    var lt = d.lichThang || [], goc = [d.batTu && d.batTu.canChiNgay, d.nhatChu, d.dungThan, d.namCaNhan].join('|');
    var nay = new Date(), nam = d.huyenKhong && d.huyenKhong.nam, hienTai = -1;
    if (nam === nay.getFullYear()) { lt.forEach(function (m, i) { var p = (m.tu || '').split('/'), q = (m.den || '').split('/'); if (!p[1]) return; var bd = new Date(nam, +p[1] - 1, +p[0]), kt = new Date(nam + (+q[1] < +p[1] ? 1 : 0), +q[1] - 1, +q[0]); if (nay >= bd && nay < kt) hienTai = i; }); }
    var chips = lt.map(function (m, i) { return '<button type="button" class="lt-chip ' + m.muc + (i === hienTai ? ' nay' : '') + '" data-i="' + i + '"><b>T' + (i + 1) + '</b><span>' + esc(m.canChi) + '</span><small>' + esc(m.tu) + '</small></button>'; }).join('');
    var chiTiet = lt.map(function (m, i) {
      var s = hash(goc + '|' + i), hy = HANH_Y[m.hanhChi] || HANH_Y['Thổ'];
      return '<div class="lt-ct" data-i="' + i + '" hidden><h4>Tháng ' + esc(m.tiet) + ' (' + esc(m.tu) + ' → ' + esc(m.den) + ') — <span class="lt-' + m.muc + '">' + NHAN[m.muc] + '</span></h4>' +
        '<p>Can–Chi tháng <b>' + esc(m.canChi) + '</b> (Can ' + esc(m.hanhCan) + ', Chi ' + esc(m.hanhChi) + '). Chủ đề của tháng: <b>' + pick(hy, s) + '</b>.</p><p>' + pick(MUC[m.muc], s >>> 3) + '</p>' +
        (m.soThang ? '<p class="lt-sub">Thần số học: số tháng cá nhân <b>' + m.soThang + '</b> — ' + SOTHANG[m.soThang] + '.</p>' : '') + '</div>';
    }).join('');
    return '<div class="nd-tab lt-card" id="lichThangCard"><h3>🗓️ Nhịp 12 tháng năm ' + esc(nam) + '</h3><p>Bấm một tháng để xem gợi ý. Tháng tính theo <b>Tiết Khí</b> (ngày bắt đầu hiện dưới mỗi ô), không trùng tháng dương lịch.</p>' +
      '<div class="lt-grid">' + chips + '</div><div class="lt-legend"><span class="thuan">Thuận</span><span class="binhOn">Bình ổn</span><span class="canTrong">Cẩn trọng</span>' + (hienTai >= 0 ? '<span class="nay">Tháng hiện tại</span>' : '') + '</div>' +
      '<div class="lt-panel" id="ltPanel"><p class="lt-hint">👆 Chọn một tháng ở trên.</p>' + chiTiet + '</div><p class="nd-meo">💡 Đây là gợi ý về nhịp năng lượng theo quy ước tham khảo, không phải dự báo chắc chắn. Việc quan trọng nên dựa trên tình hình thực tế của bạn.</p></div>';
  }
  document.addEventListener('click', function (e) {
    var c = e.target.closest && e.target.closest('.lt-chip'); if (!c) return;
    var p = document.getElementById('ltPanel'); if (!p) return;
    document.querySelectorAll('.lt-chip').forEach(function (x) { x.classList.toggle('chon', x === c); });
    p.querySelector('.lt-hint').hidden = true;
    p.querySelectorAll('.lt-ct').forEach(function (x) { x.hidden = x.getAttribute('data-i') !== c.getAttribute('data-i'); });
  });

  // ===== (5) Chế độ Dễ hiểu / Chuyên sâu =====
  var KHO = 'menhly.chedo';
  function docChe() { try { return localStorage.getItem(KHO) || 'de-hieu'; } catch (e) { return 'de-hieu'; } }
  function apChe(che, nguoiBam) {
    document.body.classList.toggle('de-hieu', che === 'de-hieu'); document.body.classList.toggle('chuyen-sau', che === 'chuyen-sau');
    document.querySelectorAll('.che-do button').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-che') === che ? 'true' : 'false'); });
    if (nguoiBam) { document.querySelectorAll('details.gon,details.dn-fold').forEach(function (d) { d.open = (che === 'chuyen-sau'); }); try { localStorage.setItem(KHO, che); } catch (e) {} }
  }
  function dungCongTac() {
    var h = document.querySelector('.app-header'); if (!h || h.querySelector('.che-do')) return;
    var w = document.createElement('div'); w.className = 'che-do'; w.setAttribute('role', 'group'); w.setAttribute('aria-label', 'Chế độ đọc');
    w.innerHTML = '<button type="button" data-che="de-hieu">Dễ hiểu</button><button type="button" data-che="chuyen-sau">Chuyên sâu</button>';
    w.addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) apChe(b.getAttribute('data-che'), true); });
    h.appendChild(w); apChe(docChe(), false);
  }
  function dungChanTrang() {
    if (document.querySelector('.app-footer')) return;
    var f = document.createElement('footer'); f.className = 'app-footer no-print';
    f.innerHTML = '<b>Mệnh Lý Đông Tây</b> • Phiên bản ' + PHIEN_BAN + ' • ' + NGAY_CAP_NHAT + '<br>Kết quả chỉ mang tính tham khảo, không thay thế tư vấn chuyên môn. Dữ liệu bạn nhập chỉ nằm trên thiết bị của bạn.' + (REVIEW ? '<br>' + esc(REVIEW) : '');
    document.body.appendChild(f);
  }
  function khoiTao() { dungCongTac(); dungChanTrang(); }
  if (document.readyState !== 'loading') khoiTao(); else document.addEventListener('DOMContentLoaded', khoiTao);

  var goc = window.loadAllData;
  if (typeof goc === 'function') {
    window.loadAllData = function (data) {
      goc(data);
      try {
        if (!data || data.success === false) return;
        var tab = document.getElementById('tab-luunien');
        if (tab) { var c = document.getElementById('lichThangCard'); if (c) c.remove(); var nd = tab.querySelector('.nd-tab'); var html = theLichThang(data); nd ? nd.insertAdjacentHTML('afterend', html) : tab.insertAdjacentHTML('afterbegin', html); var el = document.getElementById('lichThangCard'); if (el) { el.classList.add('rv'); setTimeout(function () { el.classList.add('hien'); }, 40); if (window.__danhDauTuNgu) window.__danhDauTuNgu(el); } }
        var r = document.getElementById('resultSection'), cu = document.getElementById('cachTinh'); if (cu) cu.remove();
        if (r) r.insertAdjacentHTML('beforeend', theMinhBach(data));
        apChe(docChe(), true);
      } catch (e) { console.error(e); }
    };
    loadAllData = window.loadAllData;
  }
})();
