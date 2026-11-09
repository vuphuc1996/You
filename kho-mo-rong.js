/* kho-mo-rong.js — kho câu chữ lớn: mỗi thẻ ghép từ nhiều mảnh (mở đầu + lõi + kết) nên số cách diễn đạt nhân lên. */
(function () {
  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function prng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function pick(a, r) { return a[Math.floor(r() * a.length)]; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  var H = ['Mộc', 'Hỏa', 'Thổ', 'Kim', 'Thủy'];
  var LEAD = ['Nhìn kỹ thì', 'Điều dễ thấy là', 'Có thể nói', 'Ở bạn,', 'Thông thường,', 'Nhiều khả năng', 'Nếu để ý,', 'Khá rõ là'];

  // ---- Thế mạnh theo hành mạnh nhất (5 × 4) ----
  var MANH = { 'Mộc': ['bạn có sức sống và muốn mọi thứ đều tiến lên', 'ý tưởng đến liên tục, bạn khó chịu khi phải đứng yên', 'bạn thấy trước cơ hội và dám gieo hạt sớm', 'bạn biết cách nuôi một việc cho lớn dần'],
    'Hỏa': ['bạn tạo được năng lượng cho cả nhóm', 'bạn quyết nhanh và đủ nhiệt để kéo người khác theo', 'bạn truyền niềm tin rất tự nhiên', 'bạn bừng sáng khi đứng trước việc mình say mê'],
    'Thổ': ['bạn đều tay, người khác thấy yên tâm khi có bạn', 'bạn giỏi gom và giữ, từ tiền bạc đến lòng tin', 'bạn chịu được áp lực lâu hơn đa số người', 'bạn biến kế hoạch thành việc làm cụ thể'],
    'Kim': ['bạn nhìn ra sai sót rất nhanh và chuẩn', 'bạn có nguyên tắc rõ, khó bị lung lay', 'bạn gọn gàng trong cả suy nghĩ lẫn hành động', 'bạn giỏi chắt lọc cái cốt lõi'],
    'Thủy': ['bạn thích nghi và tìm đường vòng rất khéo', 'bạn thu nhận thông tin nhanh và liên kết tốt', 'bạn đọc được điều chưa ai nói ra', 'bạn bình tĩnh nhìn nhiều phía trước khi chọn'] };
  var DUNG = ['hãy giao cho mình những việc cần đúng thế mạnh này.', 'cứ tin vào nó khi quyết định việc lớn.', 'thử dùng nó nhiều hơn ở nơi bạn đang ngại.', 'nó sẽ phát huy hơn nếu bạn giữ nhịp nghỉ hợp lý.', 'tìm người đồng hành bổ sung cho phần bạn chưa mạnh.', 'hãy ghi lại những lần nó giúp bạn để thêm tự tin.'];

  // ---- Điểm cần để ý theo hành yếu nhất (5 × 4) ----
  var YEU = { 'Mộc': ['dễ chững lại ở khâu bắt đầu cái mới', 'đôi khi thiếu động lực tăng trưởng dài hạn', 'ngại thay đổi môi trường dù biết cần', 'ít dành thời gian cho việc học mới'],
    'Hỏa': ['lửa nhiệt huyết dễ nguội nếu thiếu người cổ vũ', 'đôi lúc ngại thể hiện bản thân', 'hay đắn đo quá lâu trước khi hành động', 'khó giữ nhiệt khi việc kéo dài'],
    'Thổ': ['khó giữ nhịp đều, dễ làm theo hứng', 'thiếu điểm tựa ổn định về nếp sống', 'dễ bị cuốn theo ý kiến xung quanh', 'việc quản lý tiền bạc cần kỷ luật hơn'],
    'Kim': ['khó nói "không" và đặt ranh giới', 'dễ thiếu dứt khoát khi cần cắt bỏ', 'thiếu hệ thống trong cách sắp xếp việc', 'hay trì hoãn chốt quyết định'],
    'Thủy': ['ít thời gian lắng lại để nghe chính mình', 'dễ cứng nhắc, kém linh hoạt khi kế hoạch đổi', 'cảm xúc ít được giải tỏa lành mạnh', 'hay làm việc quá sức mà quên nghỉ ngơi'] };
  var MEO = ['một thói quen nhỏ lặp mỗi ngày sẽ hiệu quả hơn nỗ lực dồn một lần.', 'hãy bù bằng môi trường: nơi ở, bạn bè, lịch sinh hoạt.', 'đặt nhắc nhở nhẹ nhàng thay vì tự trách mình.', 'chọn một việc để cải thiện trong 2 tuần rồi mới sang việc khác.', 'nhờ một người tin cậy nhắc bạn đúng lúc.', 'bắt đầu từ mức rất nhỏ, đừng đặt mục tiêu quá lớn.'];

  // ---- Tiền bạc theo hành Nhật Chủ (5 × 3) ----
  var TIEN = { 'Mộc': ['kiếm tiền tốt khi gắn với việc mình thấy có ý nghĩa và phát triển', 'hợp cách đầu tư vào học hỏi, mối quan hệ rồi mới thu về', 'cần kiểm soát chi cho ý tưởng mới để dòng tiền không đứt'],
    'Hỏa': ['tiền đến nhanh khi bạn đang có đà, nhưng cũng dễ đi nhanh', 'nên có một quỹ dự phòng tách riêng để tránh tiêu theo cảm hứng', 'hợp kiểu thu nhập có thưởng theo kết quả'],
    'Thổ': ['tích lũy chắc, hợp những khoản dài hạn và đều đặn', 'thích sự ổn định nên khá ngại rủi ro lớn', 'tài sản thường lớn dần theo năm tháng nếu bạn kiên định'],
    'Kim': ['sòng phẳng, có kỷ luật chi tiêu tốt', 'hợp việc có quy trình rõ và giá trị đo được', 'nên tránh khắt khe quá mức khiến bỏ lỡ cơ hội hợp lý'],
    'Thủy': ['nguồn thu thường linh hoạt, nhiều ngả', 'dòng tiền biến động nên cần sổ sách đơn giản mà đều', 'hợp những việc dựa trên thông tin, kết nối và thích nghi'] };

  // ---- Tình cảm theo nguyên tố Mặt Trăng (4 × 4) ----
  var EL = { 'Bạch Dương': 'Lửa', 'Sư Tử': 'Lửa', 'Nhân Mã': 'Lửa', 'Kim Ngưu': 'Đất', 'Xử Nữ': 'Đất', 'Ma Kết': 'Đất', 'Song Tử': 'Khí', 'Thiên Bình': 'Khí', 'Bảo Bình': 'Khí', 'Cự Giải': 'Nước', 'Bọ Cạp': 'Nước', 'Song Ngư': 'Nước' };
  var TINH = { 'Lửa': ['bạn yêu thẳng, nồng và cần được đáp lại rõ ràng', 'bạn thích những mối quan hệ có sức sống và thử thách', 'bạn nóng nhanh nhưng cũng hòa nhanh', 'bạn cần được ngưỡng mộ đúng mức để thấy mình quan trọng'],
    'Đất': ['bạn thể hiện tình cảm bằng việc làm hơn là lời nói', 'bạn cần sự an toàn và ổn định để mở lòng', 'bạn chậm tin nhưng đã tin thì bền', 'bạn quý những điều nhỏ, thân thuộc mỗi ngày'],
    'Khí': ['bạn cần được trò chuyện và hiểu nhau về suy nghĩ', 'bạn ngại bị ràng buộc quá chặt', 'bạn dễ kết nối nhưng cần thời gian để gắn bó sâu', 'bạn thích bạn đời cũng là bạn tri kỷ'],
    'Nước': ['bạn nhạy cảm và nhớ rất lâu những điều người thương làm', 'bạn cần cảm giác an toàn về cảm xúc', 'bạn thương theo kiểu chăm sóc, đôi khi giấu nỗi buồn', 'bạn cần không gian riêng để sắp xếp lại lòng mình'] };
  var TKET = ['Nói ra nhu cầu của mình sớm sẽ đỡ hiểu lầm.', 'Hãy cho nhau một khoảng riêng đều đặn.', 'Một lời cảm ơn mỗi ngày có tác dụng lớn hơn bạn nghĩ.', 'Cuộc nói chuyện thẳng thắn, nhẹ nhàng thường giải quyết nhiều hơn im lặng.', 'Đừng chờ người kia đoán; hãy chọn một lúc yên để nói.'];

  // ---- Số chủ đạo & năm cá nhân (9 × 2) ----
  var CHUDAO = { 1: ['Số 1: người đi đầu, độc lập và muốn tự quyết.', 'Số 1: bạn giỏi khởi xướng, nhưng cần học cách cùng làm với người khác.'],
    2: ['Số 2: người hòa giải, tinh tế và biết lắng nghe.', 'Số 2: sức mạnh của bạn là sự kiên nhẫn và kết nối.'],
    3: ['Số 3: giàu biểu đạt, vui vẻ và có khiếu sáng tạo.', 'Số 3: bạn truyền cảm hứng qua lời nói và ý tưởng.'],
    4: ['Số 4: người xây nền, thực tế và có kỷ luật.', 'Số 4: bạn làm chắc từng bước và rất đáng tin.'],
    5: ['Số 5: yêu tự do, thích trải nghiệm và thay đổi.', 'Số 5: bạn linh hoạt, nhưng cần giữ một điểm neo.'],
    6: ['Số 6: người chăm lo, có trách nhiệm với gia đình và cộng đồng.', 'Số 6: bạn mang lại cảm giác ấm áp và đáng tựa vào.'],
    7: ['Số 7: người tìm hiểu, thích suy ngẫm và học sâu.', 'Số 7: bạn cần thời gian một mình để thấy rõ mọi thứ.'],
    8: ['Số 8: hướng đến thành tựu, quản trị và tài chính.', 'Số 8: bạn có năng lực điều hành, nhớ giữ cân bằng với đời sống riêng.'],
    9: ['Số 9: nhân văn, rộng lượng, nhìn xa cho cộng đồng.', 'Số 9: bạn biết buông và cho đi, nhưng đừng quên chăm lấy mình.'] };
  var NAMCN = { 1: ['Một năm mở đầu: hợp đặt mục tiêu mới và bắt tay làm.', 'Năm gieo hạt, điều bạn khởi động bây giờ sẽ theo bạn nhiều năm.'],
    2: ['Năm chậm lại để hợp tác, lắng nghe và chăm các mối quan hệ.', 'Nhịp năm nhẹ, kiên nhẫn sẽ được đền đáp.'],
    3: ['Năm của giao tiếp, sáng tạo và mở rộng bạn bè.', 'Hợp thể hiện bản thân, nhận lời mời mới.'],
    4: ['Năm xây nền: sắp xếp lại, làm chắc, tiết kiệm sức.', 'Nhiều việc thực tế, hợp dọn dẹp nền móng.'],
    5: ['Năm thay đổi: dễ có chuyển động bất ngờ, giữ tâm thế linh hoạt.', 'Hợp thử cái mới nhưng cần kiểm soát bốc đồng.'],
    6: ['Năm của gia đình và trách nhiệm, hợp chăm nhà cửa và người thân.', 'Tình cảm và nghĩa vụ chiếm nhiều chỗ trong năm.'],
    7: ['Năm chiêm nghiệm: học sâu, nghỉ ngơi, nhìn lại hướng đi.', 'Hợp bớt ồn ào để nghĩ cho rõ.'],
    8: ['Năm của công việc, tiền bạc và quyền chủ động.', 'Nỗ lực dễ ra kết quả nếu bạn giữ sức bền.'],
    9: ['Năm khép lại một chu kỳ: buông cái cũ để đón vòng mới.', 'Hợp tổng kết, dọn bớt những gì không còn phù hợp.'] };
  var THANG = { 'Dần': 'đầu xuân, mầm mới trỗi dậy', 'Mão': 'giữa xuân, nhịp sống đang lên', 'Thìn': 'cuối xuân, chuyển mùa nhiều biến động', 'Tỵ': 'đầu hạ, nắng bắt đầu gắt', 'Ngọ': 'giữa hạ, năng lượng rực rỡ', 'Mùi': 'cuối hạ, nóng ẩm và nặng nề', 'Thân': 'đầu thu, khí trời chuyển mát', 'Dậu': 'giữa thu, mọi thứ dần tinh lọc', 'Tuất': 'cuối thu, lá rụng và trầm lại', 'Hợi': 'đầu đông, thu mình tích lũy', 'Tý': 'giữa đông, lặng mà sâu', 'Sửu': 'cuối đông, chuẩn bị cho vòng mới' };

  var truoc = window.dungDiemNhanRieng;
  window.dungDiemNhanRieng = function (d) {
    var html = truoc(d);
    try {
      var pc = d.phanTramNguHanhMang || [0, 0, 0, 0, 0], mx = 0, mn = 0, i, bt = d.batTu || {};
      for (i = 1; i < 5; i++) { if (pc[i] > pc[mx]) mx = i; if (pc[i] < pc[mn]) mn = i; }
      var gio = d.lichDuong ? d.lichDuong.gio : 12, phut = d.lichDuong ? d.lichDuong.phut : 0;
      var goc = [bt.canChiNam, bt.canChiThang, bt.canChiNgay, bt.canChiGio, d.gioiTinhChuan, d.ascendant, d.moonSign, d.zodiacSign, gio * 60 + phut].join('|');
      var R = function (muoi) { return prng(hash(goc + '#' + muoi)); };
      var me = d.nguHanh, top = H[mx], low = H[mn], dt = d.dungThan;
      var moonEl = EL[d.moonSign] || 'Đất', chi = String(bt.canChiThang || '').split(' ')[1];
      var cd = d.soChuDao, cdKey = cd === 11 ? 2 : (cd === 22 ? 4 : (cd === 33 ? 6 : cd)), master = (cd === 11 || cd === 22 || cd === 33) ? ' <b>(số bậc thầy ' + cd + ')</b>' : '';
      var ghep = function (muoi, parts) { var r = R(muoi); return pick(LEAD, r) + ' ' + parts(r); };
      var cards = [
        ['💪 Thế mạnh nổi bật', ghep('m', function (r) { return pick(MANH[top] || MANH['Thổ'], r) + '; ' + pick(DUNG, r); })],
        ['🔎 Điều cần để ý', ghep('y', function (r) { return esc(low) + ' mỏng nên ' + pick(YEU[low] || YEU['Thổ'], r) + ' — ' + pick(MEO, r); })],
        ['💰 Tiền bạc', ghep('t', function (r) { return pick(TIEN[me] || TIEN['Thổ'], r) + '; ' + pick(['hãy ghi chép chi tiêu đều đặn.', 'chia khoản tiền theo mục tiêu rõ ràng.', 'tránh quyết định lớn khi cảm xúc đang dao động.', 'giữ một khoản dự phòng cho ít nhất vài tháng.'], r); })],
        ['❤️ Tình cảm', ghep('c', function (r) { return pick(TINH[moonEl], r) + '. ' + pick(TKET, r); })],
        ['🔢 Số chủ đạo ' + esc(cd), pick(CHUDAO[cdKey] || CHUDAO[1], R('s')) + master],
        ['📆 Nhịp năm cá nhân ' + esc(d.namCaNhan), pick(NAMCN[d.namCaNhan] || NAMCN[1], R('n'))]
      ];
      if (THANG[chi]) cards.push(['🍂 Tháng sinh', 'Sinh vào tháng <b>' + esc(chi) + '</b> theo Bát Tự — ' + THANG[chi] + '; ' + pick(['khí chất này in dấu lên cách bạn phản ứng khi áp lực.', 'bạn mang theo nhịp của mùa này vào cách làm việc.', 'đây là nền cho mọi hành khác trong lá số.'], R('th')) + '']);
      var out = '<div class="dn-extra dn-more">' + cards.map(function (c) { return '<article><h4>' + c[0] + '</h4><p>' + c[1] + '</p></article>'; }).join('') + '</div>';
      html = html.indexOf('<p class="dn-quote">') !== -1 ? html.replace('<p class="dn-quote">', out + '<p class="dn-quote">') : html.replace(/<\/section>\s*$/, out + '</section>');
    } catch (e) { console.error(e); }
    return html;
  };
})();
