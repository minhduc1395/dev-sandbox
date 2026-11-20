# Module: ui

## Mục đích
Trang tĩnh để người dùng nhập số tiền và xem kết quả chia.

## Thư mục và file chính
- `public/index.html`: trang duy nhất. Script ES module nhúng trong trang hoặc `public/app.js`.

## Dữ liệu vào/ra
- Gọi hàm của module calc qua `import` từ `../src/calc/*.js` (không chép lại logic tính).

## Quy ước riêng
- Tiếng Việt, số tiền dạng `300.000đ` (`Intl.NumberFormat('vi-VN')` + "đ").
- Không thư viện ngoài, không CSS framework. Dùng được trên điện thoại (rộng 360px).

## Lịch sử ngắn
- 2026-11-20 Trang giữ chỗ.
