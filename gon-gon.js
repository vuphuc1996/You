/* gon-gon.js — trình bày gọn: đoạn dài chỉ hiện 1 câu tóm tắt, bấm "Chi tiết" mới mở; có nút mở/thu cả tab. */
(function () {
  var BO_QUA = '.dn-card,.dn-extra,#svgLaBan,button,summary,details,select,input,table,svg,canvas,h1,h2,h3,h4,.tab-container,.gon-tools,.app-header,.error-box,.matrix-container,.hk-grid';
  var INLINE = /^(B|STRONG|I|EM|SPAN|BR|A|U|SMALL|MARK|SUP|SUB|CODE)$/;
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function chiInline(el) { for (var i = 0; i < el.children.length; i++) if (!INLINE.test(el.children[i].tagName)) return false; return el.children.length <= 14; }
  function tomTat(t) {
    t = t.replace(/\s+/g, ' ').trim();
    var m = t.match(/^(.{35,105}?[.;:!?])(\s|$)/);
    if (m) return m[1];
    if (t.length <= 100) return t;
    var cut = t.slice(0, 100), sp = cut.lastIndexOf(' ');
    return cut.slice(0, sp > 40 ? sp : 100) + '…';
  }
  function gonDoan(root) {
    var ds = root.querySelectorAll('p,li,div');
    for (var i = 0; i < ds.length; i++) {
      var el = ds[i];
      if (el.getAttribute('data-gon')) continue;
      if (el.matches(BO_QUA) || (el.parentElement && el.parentElement.closest(BO_QUA))) continue;
      var txt = el.textContent || '';
      if (txt.replace(/\s+/g, ' ').trim().length < 170 || !chiInline(el)) continue;
      var disp = window.getComputedStyle(el).display;
      if (disp === 'flex' || disp === 'grid' || disp === 'inline-flex') continue;   // giữ nguyên các hàng icon + chữ
      var full = el.innerHTML;
      el.setAttribute('data-gon', '1');
      el.innerHTML = '<details class="gon"><summary><span class="gon-snip">' + esc(tomTat(txt)) + '</span><span class="gon-cta">Chi tiết</span></summary><div class="gon-body">' + full + '</div></details>';
    }
  }
  function goiNhom(root) {            // khối thẻ mở rộng của "Điểm nhấn riêng" → thu vào nút bấm
    var nhan = ['🕰️ Giờ sinh · bên ngoài–bên trong · quan hệ · công việc', '📚 Thêm góc nhìn: thế mạnh, tiền bạc, tình cảm, năm cá nhân…'];
    var ex = root.querySelectorAll('.dn-extra');
    for (var i = 0; i < ex.length; i++) {
      var e = ex[i]; if (e.parentElement && e.parentElement.classList.contains('dn-fold')) continue;
      var d = document.createElement('details'); d.className = 'dn-fold';
      var s = document.createElement('summary'); s.textContent = nhan[Math.min(i, 1)];
      e.parentNode.insertBefore(d, e); d.appendChild(s); d.appendChild(e);
    }
  }
  function thanhCongCu(root) {
    var tabs = root.querySelectorAll('.tab-content');
    for (var i = 0; i < tabs.length; i++) {
      var t = tabs[i]; if (t.querySelector('.gon-tools')) continue;
      var bar = document.createElement('div'); bar.className = 'gon-tools no-print';
      bar.innerHTML = '<span>Bấm vào từng mục để xem chi tiết</span><button type="button" class="gon-all" data-mo="0">Mở tất cả</button>';
      t.insertBefore(bar, t.firstChild);
    }
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.gon-all'); if (!b) return;
    var mo = b.getAttribute('data-mo') !== '1', tab = b.closest('.tab-content');
    tab.querySelectorAll('details.gon,details.dn-fold').forEach(function (d) { d.open = mo; });
    b.setAttribute('data-mo', mo ? '1' : '0'); b.textContent = mo ? 'Thu gọn tất cả' : 'Mở tất cả';
  });
  function ap() { var r = document.getElementById('resultSection'); if (!r) return; goiNhom(r); gonDoan(r); thanhCongCu(r); }
  var goc = window.loadAllData;
  if (typeof goc === 'function') {
    window.loadAllData = function (data) { goc(data); try { if (data && data.success !== false) ap(); } catch (e) { console.error(e); } };
    loadAllData = window.loadAllData;
  }
})();
