/* diem-nhan.js — "Điểm nhấn riêng": nội dung ngắn, dễ quét, mỗi lá số một sắc thái.
   Cách tạo khác biệt: (1) dữ liệu thật của lá số (ngũ hành, bộ ba chiêm tinh, năm cá nhân…) quyết định ý chính;
   (2) một "hạt giống" băm từ TOÀN BỘ lá số chọn cách diễn đạt/biến thể → hai lá số giống 80% vẫn lệch vài câu chữ. */
(function () {
  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function prng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  var H = ['Mộc', 'Hỏa', 'Thổ', 'Kim', 'Thủy'];
  var ICON = { 'Mộc': '🌳', 'Hỏa': '🔥', 'Thổ': '⛰️', 'Kim': '⚔️', 'Thủy': '🌊' };
  var TRAIT = {
    'Mộc': ['giàu ý tưởng và luôn muốn lớn lên', 'thích khởi đầu điều mới, ghét bị bó buộc', 'nhân hậu, hay nghĩ cho người khác', 'có tầm nhìn xa, kiên nhẫn vun trồng'],
    'Hỏa': ['nhiệt huyết, truyền cảm hứng cho người xung quanh', 'quyết đoán, nghĩ là làm', 'ấm áp, thích được ghi nhận', 'sáng và nhanh, cảm xúc bộc lộ rõ'],
    'Thổ': ['điềm tĩnh, là chỗ dựa đáng tin', 'thực tế, làm gì cũng muốn chắc chắn', 'bao dung, giữ chữ tín', 'chậm mà bền, ít khi bỏ cuộc giữa chừng'],
    'Kim': ['kỷ luật, rạch ròi đúng sai', 'tinh tế, có chuẩn mực riêng cao', 'sắc sảo, nói ít nhưng trúng', 'trọng nghĩa, đã hứa là giữ'],
    'Thủy': ['linh hoạt, thích nghi nhanh', 'nhạy cảm, đọc được không khí', 'thông minh, nhiều góc nhìn', 'trầm lắng bên ngoài, dòng chảy mạnh bên trong']
  };
  var OPEN = ['Lá số của bạn thiên về', 'Nổi bật nhất ở bạn là', 'Nhìn tổng thể, bạn mang khí chất', 'Điểm đặc trưng của bạn là'];
  var ELEM_TAY = { 'Bạch Dương': 'Lửa', 'Sư Tử': 'Lửa', 'Nhân Mã': 'Lửa', 'Kim Ngưu': 'Đất', 'Xử Nữ': 'Đất', 'Ma Kết': 'Đất', 'Song Tử': 'Khí', 'Thiên Bình': 'Khí', 'Bảo Bình': 'Khí', 'Cự Giải': 'Nước', 'Bọ Cạp': 'Nước', 'Song Ngư': 'Nước' };
  var TONE = { 'Lửa': ['nhiệt và bốc', 'hành động nhanh', 'dám thử'], 'Đất': ['vững và thực tế', 'chậm mà chắc', 'trọng kết quả'], 'Khí': ['nhanh trí, thích trò chuyện', 'tò mò, hay liên kết ý tưởng', 'linh hoạt'], 'Nước': ['sâu lắng, giàu cảm xúc', 'trực giác tốt', 'dễ thấu cảm'] };
  var NAM = { 1: 'khởi đầu & tự lập', 2: 'hợp tác & kiên nhẫn', 3: 'sáng tạo & kết nối', 4: 'xây nền & kỷ luật', 5: 'thay đổi & tự do', 6: 'gia đình & trách nhiệm', 7: 'chiêm nghiệm & học sâu', 8: 'công việc & tài chính', 9: 'khép lại & buông bỏ' };
  var VIEC = {
    'Mộc': ['Dành 15 phút viết ra một ý tưởng mới', 'Ra công viên hoặc nơi có cây xanh buổi sáng', 'Học một thứ nhỏ chưa từng thử'],
    'Hỏa': ['Chủ động nhắn cho một người bạn quý', 'Vận động cho ra mồ hôi 20 phút', 'Chọn một việc và công bố mục tiêu với ai đó'],
    'Thổ': ['Dọn gọn một góc làm việc', 'Lên danh sách 3 việc quan trọng nhất trong ngày', 'Ăn đúng giờ, ngủ đúng giờ ba ngày liên tiếp'],
    'Kim': ['Bỏ bớt một thứ không còn dùng đến', 'Đặt một giới hạn rõ ràng cho một việc đang kéo dài', 'Sắp xếp lại lịch tuần theo thứ tự ưu tiên'],
    'Thủy': ['Dành 10 phút yên tĩnh, không màn hình', 'Uống đủ nước và đi bộ chậm', 'Ghi lại ba điều khiến bạn biết ơn hôm nay']
  };
  function pick(a, r) { return a[Math.floor(r() * a.length)]; }

  window.dungDiemNhanRieng = function (d) {
    var pc = d.phanTramNguHanhMang || [0, 0, 0, 0, 0], mx = 0, mn = 0, i;
    for (i = 1; i < 5; i++) { if (pc[i] > pc[mx]) mx = i; if (pc[i] < pc[mn]) mn = i; }
    var seed = hash([d.batTu && [d.batTu.canChiNam, d.batTu.canChiThang, d.batTu.canChiNgay, d.batTu.canChiGio].join('|'), d.gioiTinhChuan, d.soChuDao, d.namCaNhan, d.zodiacSign, d.moonSign, d.ascendant, d.batTrach && d.batTrach.cungPhi, pc.join(',')].join('#'));
    var r = prng(seed), code = seed.toString(36).toUpperCase().slice(0, 5);
    var top = H[mx], low = H[mn], me = d.nguHanh, dt = d.dungThan;
    var sun = ELEM_TAY[d.zodiacSign], moon = ELEM_TAY[d.moonSign], asc = ELEM_TAY[d.ascendant];
    var chips = H.map(function (h, k) {
      return '<div class="dn-chip' + (k === mx ? ' top' : '') + (k === mn ? ' low' : '') + '"><span>' + ICON[h] + ' ' + h + '</span><i style="--w:' + Math.max(3, pc[k]) + '%"></i><b>' + pc[k] + '%</b></div>';
    }).join('');
    var traits = pick(TRAIT[me] || TRAIT['Thổ'], r), traits2 = pick(TRAIT[top], r);
    var head = pick(OPEN, r) + ' <b>' + esc(me) + '</b> — ' + esc(traits) + (top !== me ? '; năng lượng mạnh nhất trong lá số lại là <b>' + top + '</b>, nên bạn còn ' + esc(traits2) + '.' : '.');
    var bo = (low === dt) ? 'Hành <b>' + low + '</b> đang yếu nhất và cũng chính là Dụng Thần — đây là chỗ bù đắp quan trọng nhất.' : 'Hành <b>' + low + '</b> đang mỏng; hãy chủ động bù bằng thói quen thay vì chờ đợi.';
    var tay = 'Bề ngoài (Cung Mọc <b>' + esc(d.ascendant) + '</b>) ' + pick(TONE[asc] || TONE['Đất'], r) + '; bên trong (Mặt Trăng <b>' + esc(d.moonSign) + '</b>) ' + pick(TONE[moon] || TONE['Nước'], r) + '; cốt lõi (Mặt Trời <b>' + esc(d.zodiacSign) + '</b>) ' + pick(TONE[sun] || TONE['Lửa'], r) + '.';
    var nam = 'Năm cá nhân <b>' + esc(d.namCaNhan) + '</b>: thiên về ' + (NAM[d.namCaNhan] || '') + '. Số chủ đạo <b>' + esc(d.soChuDao) + '</b>.';
    var viec = VIEC[dt] || VIEC['Thổ'], a = pick(viec, r), b = viec.filter(function (x) { return x !== a; });
    var acts = [a, pick(b, r)].map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('');
    return '<section class="dn-card" id="diemNhanRieng"><div class="dn-top"><div><h3>✨ Điểm nhấn riêng của ' + esc(d.hoTen || 'bạn') + '</h3><p class="dn-head">' + head + '</p></div><div class="dn-code" title="Mã định danh lá số — đổi khi giờ, ngày hoặc nơi sinh đổi">Mã lá số<br><b>#' + code + '</b></div></div>' +
      '<div class="dn-bars">' + chips + '</div><p class="dn-note">' + bo + '</p>' +
      '<div class="dn-grid"><article><h4>🌗 Bộ ba chiêm tinh</h4><p>' + tay + '</p></article><article><h4>📅 Nhịp năm ' + esc(d.huyenKhong ? d.huyenKhong.nam : '') + '</h4><p>' + nam + '</p></article>' +
      '<article><h4>🎯 Việc nhỏ nên làm</h4><ul>' + acts + '</ul><small>Gợi ý theo Dụng Thần <b>' + esc(dt) + '</b></small></article></div></section>';
  };
})();
