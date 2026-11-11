/* menu-top.js — Menu 4 mục luôn hiển thị khi cuộn, ở MỌI tab.
   • Điện thoại / tablet (<1024px): thanh cố định sát mép trên màn hình.
   • Laptop / PC / iPad ngang (>=1024px): menu NỔI như nút hotline: nằm ngay dưới banner "Ngày Âm Lịch Quy Đổi",
     khi cuộn thì trôi lên rồi dừng ở mép trên (cách 12px) và đi theo suốt trang. */
(function () {
  var bar = null, spacer = null, mq = window.matchMedia ? window.matchMedia('(min-width: 1024px)') : { matches: false }, cho = false;
  function chinhChieuCao() { if (bar) document.documentElement.style.setProperty('--menu-h', bar.offsetHeight + 'px'); }
  function viTri() {
    cho = false;
    if (!bar || !document.body.classList.contains('has-menu')) return;
    if (!mq.matches) {                                   // chế độ thanh trên cùng: xoá mọi vị trí đặt tay
      bar.style.top = bar.style.left = bar.style.width = '';
      if (spacer) spacer.style.display = 'none';
      chinhChieuCao(); return;
    }
    var kq = document.getElementById('resultSection'), bn = document.getElementById('bannerMenh');
    if (!kq || !bn) return;
    if (!spacer) { spacer = document.createElement('div'); spacer.id = 'menuCho'; bn.parentNode.insertBefore(spacer, bn.nextSibling); }
    var r = kq.getBoundingClientRect(), b = bn.getBoundingClientRect();
    spacer.style.display = 'block';
    spacer.style.height = (bar.offsetHeight + 3) + 'px';  // chừa chỗ để nội dung bên dưới không bị menu che
    bar.style.left = r.left + 'px';
    bar.style.width = r.width + 'px';
    bar.style.top = Math.max(12, b.bottom + 12) + 'px';   // dưới banner; cuộn quá thì dừng ở 12px
  }
  function hen() { if (cho) return; cho = true; (window.requestAnimationFrame || setTimeout)(viTri); }
  function khoiTao() {
    bar = document.getElementById('mainTabs');
    if (!bar) return;
    if (bar.parentNode !== document.body) document.body.appendChild(bar);   // thoát khỏi mọi khung cha (transform/overflow/animation)
    window.addEventListener('scroll', hen, { passive: true });
    window.addEventListener('resize', function () { chinhChieuCao(); hen(); });
    window.addEventListener('orientationchange', function () { setTimeout(function () { chinhChieuCao(); hen(); }, 250); });
    if (window.ResizeObserver) new ResizeObserver(function () { chinhChieuCao(); hen(); }).observe(bar);
    if (mq.addEventListener) mq.addEventListener('change', hen);
  }
  if (document.readyState !== 'loading') khoiTao(); else document.addEventListener('DOMContentLoaded', khoiTao);
  var goc = window.loadAllData;
  if (typeof goc === 'function') {
    window.loadAllData = function (data) {
      goc(data);
      if (data && data.success !== false) { document.body.classList.add('has-menu'); chinhChieuCao(); viTri(); setTimeout(function () { chinhChieuCao(); viTri(); }, 300); }
    };
    loadAllData = window.loadAllData;
  }
  // Đổi tab làm chiều cao trang thay đổi → tính lại vị trí
  document.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('#mainTabs')) setTimeout(hen, 60); });
})();
