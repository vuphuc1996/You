/* menu-top.js — đưa thanh menu ra thẳng <body> và cố định ở đầu màn hình trên MỌI thiết bị, MỌI tab. */
(function () {
  var bar = null;
  function chinhChieuCao() { if (bar) document.documentElement.style.setProperty('--menu-h', bar.offsetHeight + 'px'); }
  function khoiTao() {
    bar = document.getElementById('mainTabs');
    if (!bar) return;
    if (bar.parentNode !== document.body) document.body.appendChild(bar);   // thoát khỏi mọi khung cha (transform/overflow/animation)
    window.addEventListener('resize', chinhChieuCao);
    window.addEventListener('orientationchange', function () { setTimeout(chinhChieuCao, 250); });
    if (window.ResizeObserver) new ResizeObserver(chinhChieuCao).observe(bar);
  }
  if (document.readyState !== 'loading') khoiTao(); else document.addEventListener('DOMContentLoaded', khoiTao);
  var goc = window.loadAllData;
  if (typeof goc === 'function') {
    window.loadAllData = function (data) {
      goc(data);
      if (data && data.success !== false) { document.body.classList.add('has-menu'); chinhChieuCao(); setTimeout(chinhChieuCao, 300); }
    };
    loadAllData = window.loadAllData;
  }
})();
