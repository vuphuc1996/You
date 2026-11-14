/* tu-dien.js — Giải nghĩa thuật ngữ bằng lời dễ hiểu (bấm vào từ gạch chân vàng) + thẻ "Đọc nhanh trong 30 giây". */
(function () {
  var TU = {
    'Nhật Chủ': 'Là "chính bạn" trong lá số — một chữ (Can) của ngày sinh đại diện cho bản thân bạn. Mọi yếu tố khác được so với nó.',
    'Dụng Thần': 'Hành (Mộc, Hỏa, Thổ, Kim, Thủy) giúp lá số của bạn cân bằng nhất. Hiểu đơn giản: cái bạn nên "bổ sung" thêm trong đời sống.',
    'Hỷ Thần': 'Hành hỗ trợ cho Dụng Thần, cũng mang lại thuận lợi nhưng nhẹ hơn.',
    'Ngũ Hành': 'Năm nhóm tính chất: Mộc (phát triển), Hỏa (nhiệt huyết), Thổ (vững chắc), Kim (kỷ luật), Thủy (linh hoạt). Mỗi người có đủ cả năm, chỉ khác tỷ lệ.',
    'Bát Tự': 'Còn gọi là Tứ Trụ: 8 chữ gồm Can-Chi của giờ, ngày, tháng, năm sinh. Đây là "bản đồ" để luận tính cách và vận.',
    'Tứ Trụ': 'Bốn cột thời gian sinh (giờ, ngày, tháng, năm), mỗi cột gồm một Can và một Chi.',
    'Đại Vận': 'Các chặng 10 năm trong đời. Mỗi chặng có "thời tiết" riêng: lúc thuận lợi, lúc cần thận trọng.',
    'Lưu Niên': 'Vận của từng năm cụ thể, xem trong bối cảnh Đại Vận đang chạy.',
    'Nạp Âm': 'Một cách gán "hành" và hình ảnh thiên nhiên cho từng năm sinh (ví dụ Lộ Bàng Thổ = đất ven đường).',
    'Tam Tai': 'Giai đoạn 3 năm liên tiếp theo quan niệm dân gian là nhiều trắc trở hơn. Chỉ nên xem như lời nhắc cẩn trọng.',
    'Kim Lâu': 'Tuổi mụ chia 9 dư 1, 3, 6 hoặc 8 — theo dân gian không nên khởi công lớn như xây nhà, cưới hỏi.',
    'Hoang Ốc': 'Cách xem tuổi làm nhà theo 6 mức (Nhất Cát đến Lục Hoang Ốc). Mức tốt hay xấu chỉ mang tính tham khảo.',
    'Cửu Diệu': 'Chín ngôi sao chiếu mệnh luân phiên theo tuổi, theo dân gian mỗi sao ứng với một mức may mắn trong năm.',
    'Cung Phi': 'Một "cung mệnh" tính từ năm sinh và giới tính, dùng để chọn hướng nhà, hướng bàn làm việc, hướng giường.',
    'Bát Trạch': 'Phương pháp chọn hướng (8 hướng) tốt-xấu theo Cung Phi của từng người trong phong thủy.',
    'Huyền Không': 'Phong thủy theo "sao bay" từng năm: mỗi năm 9 ngôi sao đổi chỗ trong 9 hướng của ngôi nhà.',
    'Số Chủ Đạo': 'Con số rút từ ngày-tháng-năm sinh trong Thần số học, mô tả khuynh hướng và bài học chính của đời bạn.',
    'Năm Cá Nhân': 'Con số (1–9) cho biết "chủ đề" của năm với riêng bạn, lặp lại theo chu kỳ 9 năm.',
    'Cung Mọc': 'Cung hoàng đạo đang mọc ở chân trời lúc bạn sinh — nói về vẻ ngoài và ấn tượng đầu tiên.',
    'Mặt Trăng': 'Trong chiêm tinh, cung của Mặt Trăng nói về cảm xúc bên trong và nhu cầu tinh thần của bạn.',
    'Mặt Trời': 'Cung Mặt Trời là cung hoàng đạo quen thuộc theo ngày sinh — phần "cốt lõi" của tính cách.',
    'Thập Thần': 'Mười mối quan hệ giữa Nhật Chủ và các yếu tố khác (tài, quan, ấn, thực thương, tỷ kiếp…), nói về tiền, công việc, học vấn, bạn bè.',
    'Thân Vượng': 'Nhật Chủ có nhiều năng lượng hỗ trợ (mạnh). Khi đó thường cần "tiêu bớt" để cân bằng.',
    'Thân Nhược': 'Nhật Chủ ít năng lượng hỗ trợ (yếu). Khi đó thường cần được "nâng đỡ" thêm.',
    'Thiên Can': 'Mười chữ Giáp, Ất, Bính, Đinh, Mậu, Kỷ, Canh, Tân, Nhâm, Quý. Chữ Can của ngày sinh chính là "bạn" trong lá số.',
    'Địa Chi': 'Mười hai con giáp Tý, Sửu, Dần… Mỗi Chi mang một hành và một mùa, và đi cùng Can tạo thành một cặp như "Giáp Ngọ".',
    'Can Chi': 'Một cặp gồm Can (chữ trên) và Chi (chữ dưới), ví dụ "Giáp Ngọ". Mỗi trụ trong lá số là một cặp Can Chi.',
    'Ấn Tinh': 'Hành sinh ra bạn, giống "người nuôi dưỡng": học hỏi, nghỉ ngơi, người che chở.',
    'Tỷ Kiếp': 'Hành cùng hành với bạn, giống "bạn bè, đồng đội" cùng tính chất với bạn.',
    'Thực Thương': 'Hành do bạn sinh ra, giống "sản phẩm bạn tạo ra": sáng tạo, trình bày, biểu đạt.',
    'Tài Tinh': 'Hành bạn khắc chế, giống "thứ bạn kiểm soát và thu về": công việc có kết quả, tiền bạc, nguồn lực.',
    'Quan Sát': 'Hành khắc chế bạn, giống "khung kỷ luật": quy tắc, áp lực, thử thách giúp bạn rèn luyện.',
    'Phe Ta': 'Các hành đang hỗ trợ bản thân bạn (cùng hành với bạn hoặc sinh ra bạn).',
    'Trợ Lực': 'Phần sức mạnh hỗ trợ bạn trong lá số.',
    'Tiêu Hao': 'Phần sức mạnh làm bạn hao sức hoặc bị kìm chế trong lá số.',
    'điều hậu': 'Cân bằng nóng–lạnh theo mùa sinh: sinh mùa đông thường cần thêm "ấm", sinh mùa hè cần thêm "mát".',
    'Dụng Thần phụ': 'Hành bổ trợ thứ hai, khi cách tính theo tỷ lệ % chọn một hành khác với Dụng Thần chính.',
    'Tiết Khí': 'Các mốc 24 tiết trong năm theo vị trí Mặt Trời (như Lập Xuân, Kinh Trập). Bát Tự chia tháng theo các mốc này, không theo tháng dương lịch.'
  };
  var KEYS = Object.keys(TU).sort(function (a, b) { return b.length - a.length; });
  function chiaDoan(text, daDung) {            // tách văn bản thành các đoạn thường / thuật ngữ (mỗi thuật ngữ chỉ đánh dấu 1 lần)
    var out = [], i = 0, buf = '';
    while (i < text.length) {
      var hit = null;
      for (var k = 0; k < KEYS.length; k++) { if (!daDung[KEYS[k]] && text.substr(i, KEYS[k].length) === KEYS[k]) { hit = KEYS[k]; break; } }
      if (hit) { if (buf) out.push({ t: buf }); buf = ''; out.push({ t: hit, tu: hit }); daDung[hit] = 1; i += hit.length; }
      else { buf += text[i]; i++; }
    }
    if (buf) out.push({ t: buf });
    return out;
  }
  window.__chiaDoanTuNgu = chiaDoan;
  var BO_QUA = 'button,summary,select,input,script,style,svg,canvas,h1,h2,h3,h4,.tu-ngu,.dn-code,.gon-tools,#mainTabs,.tro-ly,.tu-pop';
  function danhDau(root) {
    var daDung = {}, w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), nodes = [], n;
    while ((n = w.nextNode())) { if (n.nodeValue.trim().length > 1 && !(n.parentElement && n.parentElement.closest(BO_QUA))) nodes.push(n); }
    nodes.forEach(function (node) {
      var segs = chiaDoan(node.nodeValue, daDung);
      if (segs.length === 1 && !segs[0].tu) return;
      var f = document.createDocumentFragment();
      segs.forEach(function (s) {
        if (s.tu) { var sp = document.createElement('span'); sp.className = 'tu-ngu'; sp.setAttribute('data-tu', s.tu); sp.setAttribute('data-gt', String(TU[s.tu] || '').split(/[.;—]/)[0].slice(0, 80)); sp.setAttribute('tabindex', '0'); sp.setAttribute('role', 'button'); sp.textContent = s.t; f.appendChild(sp); }
        else f.appendChild(document.createTextNode(s.t));
      });
      node.parentNode.replaceChild(f, node);
    });
  }
  window.__danhDauTuNgu = danhDau;
  var pop = null;
  function dong() { if (pop) { pop.remove(); pop = null; } }
  function mo(el) {
    dong();
    pop = document.createElement('div'); pop.className = 'tu-pop'; pop.setAttribute('role', 'dialog');
    pop.innerHTML = '<b></b><p></p>'; pop.firstChild.textContent = el.getAttribute('data-tu'); pop.lastChild.textContent = TU[el.getAttribute('data-tu')];
    document.body.appendChild(pop);
    var r = el.getBoundingClientRect(), pw = pop.offsetWidth, ph = pop.offsetHeight;
    var left = Math.min(Math.max(8, r.left + r.width / 2 - pw / 2), window.innerWidth - pw - 8);
    var top = r.bottom + 8; if (top + ph > window.innerHeight - 8) top = Math.max(8, r.top - ph - 8);
    pop.style.left = left + 'px'; pop.style.top = top + 'px';
  }
  document.addEventListener('click', function (e) { var t = e.target.closest && e.target.closest('.tu-ngu'); if (t) { e.preventDefault(); mo(t); } else if (!(e.target.closest && e.target.closest('.tu-pop'))) dong(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') dong(); if ((e.key === 'Enter' || e.key === ' ') && e.target.classList && e.target.classList.contains('tu-ngu')) { e.preventDefault(); mo(e.target); } });
  window.addEventListener('scroll', dong, { passive: true });

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function theDocNhanh(d) {
    return '<section class="doc-nhanh" id="docNhanh"><h3>📖 Đọc nhanh trong 30 giây</h3><div class="dnh-grid">' +
      '<div><span>1️⃣</span><b>Bạn là ai?</b><p>Tính cách chính của bạn thuộc hành <b>' + esc(d.nguHanh) + '</b>. Hãy xem đó là "màu nền" của con người bạn.</p></div>' +
      '<div><span>2️⃣</span><b>Nên bổ sung gì?</b><p>Hành giúp bạn cân bằng là <b>' + esc(d.dungThan) + '</b>. Chọn màu sắc, thói quen, môi trường thuộc hành này sẽ hợp với bạn.</p></div>' +
      '<div><span>3️⃣</span><b>Năm nay thế nào?</b><p>Năm cá nhân của bạn là số <b>' + esc(d.namCaNhan) + '</b> — mỗi năm một "chủ đề". Xem tab Vận hạn để biết chi tiết.</p></div>' +
      '</div><p class="dnh-meo">💡 Chữ <span class="tu-ngu demo" tabindex="0">gạch chân vàng</span> là thuật ngữ — bấm vào để xem giải nghĩa dễ hiểu. Kết quả chỉ mang tính tham khảo.</p></section>';
  }
  var goc = window.loadAllData;
  if (typeof goc === 'function') {
    window.loadAllData = function (data) {
      goc(data);
      try {
        if (!data || data.success === false) return;
        var cu = document.getElementById('docNhanh'); if (cu) cu.remove();
        var tab = document.getElementById('tab-tongquan'), dn = document.getElementById('diemNhanRieng');
        if (tab) { var anchor = dn || tab.querySelector('.gon-tools'); anchor ? anchor.insertAdjacentHTML(dn ? 'beforebegin' : 'afterend', theDocNhanh(data)) : tab.insertAdjacentHTML('afterbegin', theDocNhanh(data)); }
        var r = document.getElementById('resultSection'); if (r) danhDau(r);
        var demo = document.querySelector('.tu-ngu.demo'); if (demo) demo.setAttribute('data-tu', 'Nhật Chủ');
      } catch (e) { console.error(e); }
    };
    loadAllData = window.loadAllData;
  }
})();
