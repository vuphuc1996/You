// Service worker: mở nhanh + dùng được khi mất mạng. Tăng PHIEN_BAN mỗi lần bạn cập nhật code để máy người dùng tải bản mới.
const PHIEN_BAN = 'menh-ly-v5';
const LOI = ['./', 'index.html', 'engine.js', 'style.css', 'theme.css', 'diem-nhan.js', 'bien-dong.js', 'kho-mo-rong.js', 'la-ban-dep.js', 'manifest.webmanifest', 'favicon.svg', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/logo-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(PHIEN_BAN).then(c => c.addAll(LOI)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== PHIEN_BAN).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
// Ưu tiên bản mới từ mạng, rơi về bản đã lưu khi offline (kể cả Chart.js từ CDN)
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).then(res => {
    if (res && (res.ok || res.type === 'opaque')) { const cp = res.clone(); caches.open(PHIEN_BAN).then(c => c.put(e.request, cp)); }
    return res;
  }).catch(() => caches.match(e.request).then(m => m || caches.match('index.html'))));
});
