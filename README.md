# Phân Tích Mệnh Lý — bản 100% GitHub Pages

Không còn Google Apps Script: mọi phép tính chạy ngay trên trình duyệt (engine.js).

## Đưa lên GitHub
1. Tạo repo (ví dụ `menh-ly`), đẩy toàn bộ nội dung thư mục này lên nhánh `main`.
2. Settings → Pages → Deploy from branch → `main` / `(root)`.
3. Link dùng luôn: `https://TENBAN.github.io/menh-ly/`

## Cập nhật sau này
- Sửa file xong, **tăng `PHIEN_BAN` trong `sw.js`** (ví dụ `menh-ly-v2`) để điện thoại tải bản mới thay vì dùng bản đã lưu.

## Chạy thử trên máy
`python3 -m http.server 8000` trong thư mục này rồi mở http://localhost:8000
(Mở bằng file:// vẫn tính được nhưng service worker/offline sẽ không bật.)

## Cấu trúc
- index.html  giao diện        - engine.js  toàn bộ phần tính toán (gộp từ các file .gs)
- style.css   kiểu dáng        - sw.js      chạy offline
- manifest.webmanifest + icons/ + favicon.*  cài lên màn hình chính, logo bát quái
