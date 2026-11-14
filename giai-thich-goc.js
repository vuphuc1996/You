/* giai-thich-goc.js — "Bạn là ai & vì sao": đặc điểm theo Nhật Chủ, bảng đối chiếu 4 trụ, và "nếu chỉ khác 1 dữ liệu"; cùng dòng "Căn cứ" cho từng thẻ nội dung. */
(function () {
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  var H = ['Mộc', 'Hỏa', 'Thổ', 'Kim', 'Thủy'], ICON = { 'Mộc': '🌳', 'Hỏa': '🔥', 'Thổ': '⛰️', 'Kim': '⚔️', 'Thủy': '🌊' };
  var CAN = { 'Giáp': ['Cây đại thụ', 'Thẳng thắn, có chí hướng rõ ràng', 'Thích đi đầu và che chở người khác', 'Khó cúi đầu, đôi khi cứng nhắc'], 'Ất': ['Dây leo, hoa cỏ', 'Mềm mại, khéo thích nghi', 'Giỏi kết nối, biết nhún nhường đúng lúc', 'Dễ bị ảnh hưởng bởi người xung quanh'],
    'Bính': ['Mặt trời', 'Rộng rãi, nhiệt tình', 'Thích soi sáng và giúp đỡ người khác', 'Dễ nóng, muốn mọi việc diễn ra nhanh'], 'Đinh': ['Ngọn đèn, ánh nến', 'Ấm áp, tinh tế', 'Tập trung sâu vào điều mình quan tâm', 'Dễ để tâm và nghĩ nhiều'],
    'Mậu': ['Núi lớn', 'Vững chãi, đáng tin', 'Ít nói nhưng gánh vác tốt', 'Chậm thay đổi, hơi bảo thủ'], 'Kỷ': ['Ruộng vườn', 'Kiên nhẫn, chu đáo', 'Giỏi nuôi dưỡng và vun đắp', 'Hay lo xa, ngại va chạm'],
    'Canh': ['Thanh kiếm, sắt thép', 'Dứt khoát, trọng nghĩa', 'Thẳng thắn, rạch ròi đúng sai', 'Lời nói dễ làm người khác phật lòng'], 'Tân': ['Ngọc, trang sức', 'Tinh tế, có gu riêng', 'Tự trọng và cầu toàn', 'Dễ nhạy cảm với lời chê'],
    'Nhâm': ['Sông lớn', 'Phóng khoáng, tầm nhìn rộng', 'Nhiều ý tưởng, thích tự do', 'Dễ thiếu kiên định, chạy theo nhiều hướng'], 'Quý': ['Mưa, suối nguồn', 'Nhạy bén, giàu trực giác', 'Lặng lẽ nhưng bền bỉ', 'Dễ lo lắng, hay giấu cảm xúc'] };
  var MUA = { 'Dần': 'xuân', 'Mão': 'xuân', 'Thìn': 'xuân', 'Tỵ': 'hạ', 'Ngọ': 'hạ', 'Mùi': 'hạ', 'Thân': 'thu', 'Dậu': 'thu', 'Tuất': 'thu', 'Hợi': 'đông', 'Tý': 'đông', 'Sửu': 'đông' };

  function chip(hanh, chu) { return '<span class="gt-chip h-' + hanh + '"><b>' + esc(chu) + '</b><i>' + ICON[hanh] + ' ' + hanh + '</i></span>'; }
  function xuLy(d) {
    var bt = d.batTu, cot = [['Năm', bt.canChiNam], ['Tháng', bt.canChiThang], ['Ngày', bt.canChiNgay], ['Giờ', bt.canChiGio]], dem = { 'Mộc': 0, 'Hỏa': 0, 'Thổ': 0, 'Kim': 0, 'Thủy': 0 };
    var ct = cot.map(function (c, i) {
      var p = c[1].split(' '), hc = CAN_HANH_[p[0]], hz = CHI_HANH_[p[1]]; dem[hc]++; dem[hz]++;
      return '<div class="gt-tru' + (i === 2 ? ' ban' : '') + '"><em>' + (i === 2 ? '⭐ BẠN (Nhật Chủ)' : 'Trụ ' + c[0]) + '</em>' + chip(hc, p[0]) + chip(hz, p[1]) + '</div>';
    }).join('');
    var canNgay = bt.canChiNgay.split(' ')[0], mo = CAN[canNgay] || CAN['Giáp'], me = d.nguHanh, chiThang = bt.canChiThang.split(' ')[1], hThang = CHI_HANH_[chiThang];
    var pc = d.phanTramNguHanhMang, mx = 0, mn = 0, i; for (i = 1; i < 5; i++) { if (pc[i] > pc[mx]) mx = i; if (pc[i] < pc[mn]) mn = i; }
    var top = H[mx], low = H[mn], tt = d.chiTietDanhGia ? d.chiTietDanhGia.trangThai : '';
    var dongHo = H.map(function (h) { return '<span class="gt-dem h-' + h + '">' + ICON[h] + ' ' + h + ': <b>' + dem[h] + '</b>/8 chữ • ' + pc[H.indexOf(h)] + '%</span>'; }).join('');
    var kl = (top === me)
      ? 'Bản chất của bạn là <b>' + me + '</b> và lá số cũng nghiêng nhiều nhất về <b>' + me + '</b>: bản chất và hoàn cảnh cùng một hướng.'
      : 'Bản chất của bạn là <b>' + me + '</b> (nhìn chữ được đánh dấu ⭐), nhưng cả lá số nghiêng nhiều nhất về <b>' + top + '</b> (' + pc[mx] + '%). Hãy hiểu: <b>' + me + '</b> là con người bạn, còn <b>' + top + '</b> là "bối cảnh" bao quanh bạn.';
    var html = '<section class="gt-card" id="giaiThichGoc"><h3>🧬 Bạn là ai — và vì sao app nói vậy?</h3>' +
      '<div class="gt-b1"><h4>① Đặc điểm của bạn</h4><p>Chữ đầu tiên của <b>cột Ngày sinh</b> gọi là <b>Nhật Chủ</b> — chính là "bạn" trong lá số. Của bạn là <b>' + esc(canNgay) + '</b>, hình ảnh: <b>' + mo[0] + '</b> (hành <b>' + esc(me) + '</b>).</p>' +
      '<ul><li>👍 ' + mo[1] + '</li><li>👍 ' + mo[2] + '</li><li>⚠️ ' + mo[3] + '</li></ul></div>' +
      '<div class="gt-b2"><h4>② Lá số của bạn là…</h4><p>Lá số gồm 4 cột thời gian sinh, mỗi cột có 2 chữ (chữ trên là Can, chữ dưới là Chi). Mỗi chữ thuộc một trong năm hành. Hãy nhìn màu và tên hành bên dưới:</p>' +
      '<div class="gt-tru-grid">' + ct + '</div><div class="gt-dems">' + dongHo + '</div>' +
      '<p class="gt-ghichu">ℹ️ Số chữ chỉ đếm các chữ nhìn thấy. Tỷ lệ % còn tính cả các Can "ẩn" bên trong mỗi Chi và sức nặng của tháng sinh, nên một hành có thể 0 chữ nhưng vẫn có vài %.</p>' +
      '<p>📍 <b>Vì sao bạn thuộc hành ' + esc(me) + '?</b> Vì Can ngày sinh (' + esc(canNgay) + ') thuộc hành ' + esc(me) + '.</p>' +
      '<p>📍 <b>Vì sao hành ' + top + ' nhiều nhất?</b> Vì đếm các chữ có ' + dem[top] + '/8 chữ thuộc ' + top + ', và <b>tháng sinh</b> (' + esc(chiThang) + ', mùa ' + MUA[chiThang] + ') thuộc hành ' + hThang + ' — tháng sinh có sức nặng lớn nhất trong lá số.</p>' +
      '<p>📍 <b>Kết luận:</b> ' + kl + ' Hành ít nhất là <b>' + low + '</b> (' + pc[mn] + '%)' + (tt ? ', và lá số thuộc mẫu <b>' + esc(tt.toLowerCase().replace(/^./, function (c) { return c.toUpperCase(); })) + '</b>' : '') + '.</p></div>' +
      '<div class="gt-b3"><h4>③ Chỉ khác một chút dữ liệu thì sao?</h4><p>Hai người giống nhau gần hết nhưng khác một thông tin vẫn có thể có lá số khác. Bấm để xem lá số của <b>chính bạn</b> thay đổi thế nào:</p>' + theKichBan(d) + '</div></section>';
    return html;
  }
  function cong(g, ph, dn) { var t = new Date(Date.UTC(g.nam, g.thang - 1, g.ngay + dn)); return { ngay: t.getUTCDate(), thang: t.getUTCMonth() + 1, nam: t.getUTCFullYear() }; }
  function dong(d) {
    var p = d.phanTramNguHanhMang, mx = 0; for (var i = 1; i < 5; i++) if (p[i] > p[mx]) mx = i;
    return [['Trụ Giờ', d.batTu.canChiGio], ['Trụ Ngày', d.batTu.canChiNgay], ['Nhật Chủ (bạn)', d.nhatChu + ' – ' + d.nguHanh], ['Hành nhiều nhất', H[mx]], ['Thân Vượng / Nhược', d.chiTietDanhGia.trangThai], ['Dụng Thần (nên bổ sung)', d.dungThan], ['Cung Mọc', d.ascendant], ['Cung Phi (hướng nhà)', d.batTrach.cungPhi], ['Đại Vận', 'khởi ' + d.tuoiKhoiDaiVanThucTe + ' tuổi, đi ' + (d.batTu.thuan ? 'thuận' : 'nghịch')]];
  }
  function theKichBan(d) {
    var g = d.nhapGoc; if (!g || typeof getAllData !== 'function') return '';
    var gioMoi = g.gio + 2, ngayGio = gioMoi >= 24 ? cong(g, 0, 1) : { ngay: g.ngay, thang: g.thang, nam: g.nam };
    var kb = [['⏰ Sinh muộn hơn 2 giờ', { gio: gioMoi % 24, ngay: ngayGio.ngay, thang: ngayGio.thang, nam: ngayGio.nam }], ['📅 Sinh sau 1 ngày', cong(g, 0, 1)], ['⚧ Giới tính ngược lại', { gioitinh: g.gioitinh === 'Nam' ? 'Nữ' : 'Nam' }]];
    var goc = dong(d);
    return kb.map(function (k) {
      var inp = { hoten: 'x', ngay: String(g.ngay), thang: String(g.thang), nam: String(g.nam), gio: g.gio, phut: g.phut, gioitinh: g.gioitinh, vitri: g.vitri, namXemHan: g.namXemHan };
      Object.keys(k[1]).forEach(function (x) { inp[x] = typeof k[1][x] === 'number' && x !== 'gio' ? String(k[1][x]) : k[1][x]; });
      var r = getAllData(inp); if (!r || r.success === false) return '';
      var kq = dong(r), so = 0, hang = goc.map(function (x, j) { var khac = x[1] !== kq[j][1]; if (khac) so++; return '<tr class="' + (khac ? 'khac' : '') + '"><td>' + x[0] + '</td><td>' + esc(x[1]) + '</td><td>' + (khac ? '🔄 ' : '') + esc(kq[j][1]) + '</td></tr>'; }).join('');
      return '<details class="gt-kb"><summary>' + k[0] + ' → đổi <b>' + so + '/' + goc.length + '</b> mục</summary><table><tr><th></th><th>Của bạn</th><th>Nếu thay đổi</th></tr>' + hang + '</table></details>';
    }).join('');
  }

  // ---- Dòng "Căn cứ" cho từng thẻ ----
  function canCu(d) {
    var bt = d.batTu, pc = d.phanTramNguHanhMang, mx = 0, mn = 0, i; for (i = 1; i < 5; i++) { if (pc[i] > pc[mx]) mx = i; if (pc[i] < pc[mn]) mn = i; }
    var top = H[mx], low = H[mn], me = d.nguHanh, can = bt.canChiNgay.split(' ')[0], chiGio = bt.canChiGio.split(' ')[1], chiThang = bt.canChiThang.split(' ')[1], nam = d.huyenKhong ? d.huyenKhong.nam : '';
    return [
      ['Điểm nhấn riêng', 'Nhật Chủ ' + d.nhatChu + ' (hành ' + me + ') và hành nhiều nhất là ' + top + ' (' + pc[mx] + '%)'], ['Bộ ba chiêm tinh', 'Cung Mọc ' + d.ascendant + ', Mặt Trăng ' + d.moonSign + ', Mặt Trời ' + d.zodiacSign + ' — tính từ ngày, giờ và nơi sinh'],
      ['Nhịp năm cá nhân', 'ngày–tháng sinh cộng năm đang xem (' + nam + ') → năm cá nhân ' + d.namCaNhan], ['Nhịp năm', 'ngày–tháng sinh cộng năm đang xem (' + nam + ') → năm cá nhân ' + d.namCaNhan + '; chữ số ngày sinh → số chủ đạo ' + d.soChuDao],
      ['Việc nhỏ nên làm', 'Dụng Thần ' + d.dungThan], ['Dấu ấn giờ sinh', 'Chi giờ ' + chiGio + ' (giờ đã hiệu chỉnh ' + (d.minhBach ? d.minhBach.gioDaBu : '') + ') và vị trí trong khung 2 giờ'],
      ['Bên ngoài – bên trong', 'Can ngày ' + can + ', Cung Mọc ' + d.ascendant + ', Mặt Trăng ' + d.moonSign], ['Trong các mối quan hệ', 'hành của Nhật Chủ (' + me + ')'], ['Phong cách làm việc', 'hành của Nhật Chủ (' + me + ')'], ['Tiền bạc', 'hành của Nhật Chủ (' + me + ')'],
      ['Thế mạnh nổi bật', 'hành nhiều nhất: ' + top + ' (' + pc[mx] + '%)'], ['Điều cần để ý', 'hành ít nhất: ' + low + ' (' + pc[mn] + '%) và Dụng Thần ' + d.dungThan], ['Tình cảm', 'cung Mặt Trăng ' + d.moonSign],
      ['Số chủ đạo', 'cộng từng chữ số của ngày–tháng–năm sinh → ' + d.soChuDao], ['Tháng sinh', 'Chi tháng Bát Tự ' + chiThang + ' (tính theo Tiết Khí)'],
      ['Hiểu nhanh lá số', '4 trụ Bát Tự và tỷ lệ năm hành'], ['Hiểu nhanh Thần số học', 'ngày sinh dương lịch và họ tên'], ['Hiểu nhanh năm', 'năm sinh âm lịch (Tam Tai, Kim Lâu…) và năm cá nhân']
    ];
  }
  function gan(d) {
    var ds = canCu(d), nodes = document.querySelectorAll('#resultSection .dn-card h3, #resultSection .dn-grid h4, #resultSection .dn-extra h4, #resultSection .nd-tab > h3');
    nodes.forEach(function (h) {
      var box = h.closest('article') || h.closest('.nd-tab') || h.closest('.dn-card'); if (!box || box.querySelector(':scope > .can-cu, .can-cu')) return;
      var tx = (h.textContent || ''), hit = null; ds.forEach(function (x) { if (!hit && tx.indexOf(x[0]) !== -1) hit = x; }); if (!hit) return;
      var s = document.createElement('small'); s.className = 'can-cu'; s.innerHTML = '🔎 <b>Căn cứ:</b> ' + esc(hit[1]);
      if (h.tagName === 'H3' && box.classList.contains('dn-card')) { var hd = box.querySelector('.dn-head'); if (hd) hd.insertAdjacentElement('afterend', s); } else box.appendChild(s);
    });
  }
  var goc = window.loadAllData;
  if (typeof goc === 'function') {
    window.loadAllData = function (data) {
      goc(data);
      try {
        if (!data || data.success === false) return;
        var tab = document.getElementById('tab-tongquan'); if (!tab) return;
        var cu = document.getElementById('giaiThichGoc'); if (cu) cu.remove();
        var bar = tab.querySelector('.gon-tools'); var html = xuLy(data);
        bar ? bar.insertAdjacentHTML('afterend', html) : tab.insertAdjacentHTML('afterbegin', html);
        var el = document.getElementById('giaiThichGoc'); if (el) { el.classList.add('rv'); setTimeout(function () { el.classList.add('hien'); }, 40); if (window.__danhDauTuNgu) window.__danhDauTuNgu(el); }
        gan(data);
      } catch (e) { console.error(e); }
    };
    loadAllData = window.loadAllData;
  }
})();
