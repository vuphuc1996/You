/* hieu-ung.js — hiệu ứng nhẹ: khối hiện dần khi cuộn, thanh ngũ hành chạy, số đếm. Tôn trọng "giảm chuyển động" của hệ thống. */
(function () {
  var giam = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var io = (!giam && 'IntersectionObserver' in window) ? new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('hien'); io.unobserve(e.target); } }); }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' }) : null;
  var SEL = '#resultSection .card,.dn-card,.doc-nhanh,.dn-extra article,.battu-card,.interpretation-box,.summary-box,.timeline-item,.direction-group';
  function demSo(b) {
    var m = String(b.textContent).match(/^([\d.]+)%$/); if (!m || giam) return;
    var den = parseFloat(m[1]), t0 = null;
    function buoc(t) { if (!t0) t0 = t; var p = Math.min(1, (t - t0) / 800); b.textContent = (den * (1 - Math.pow(1 - p, 3))).toFixed(1).replace(/\.0$/, '') + '%'; if (p < 1) requestAnimationFrame(buoc); else b.textContent = m[1] + '%'; }
    requestAnimationFrame(buoc);
  }
  function ap() {
    document.querySelectorAll(SEL).forEach(function (el) {
      if (el.getAttribute('data-rv')) return; el.setAttribute('data-rv', '1');
      if (!io) { el.classList.add('hien'); return; }
      el.classList.add('rv'); io.observe(el);
    });
    document.querySelectorAll('.dn-chip b').forEach(demSo);
  }
  var goc = window.loadAllData;
  if (typeof goc === 'function') {
    window.loadAllData = function (data) { goc(data); try { if (data && data.success !== false) setTimeout(ap, 30); } catch (e) { console.error(e); } };
    loadAllData = window.loadAllData;
  }
})();
