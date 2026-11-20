# Module: ui

## Mục đích
Trang tĩnh để người dùng nhập số tiền và xem kết quả chia.

## Thư mục và file chính
- `public/index.html`: trang duy nhất, form nhập số tiền.
- `public/app.js`: ES module, gọi `splitConsignment` từ `../src/calc/split.js`, hiện kết quả khi gõ, nhắc lỗi tiếng Việt.
- `public/style.css`: giao diện, dùng được ở 360px.
- Chạy: phục vụ thư mục gốc repo (`python3 -m http.server`) rồi mở `/public/`; mở thẳng file:// có thể bị chặn import module.

## Dữ liệu vào/ra
- Gọi hàm của module calc qua `import` từ `../src/calc/*.js` (không chép lại logic tính).

## Quy ước riêng
- Tiếng Việt, số tiền dạng `300.000đ` (`Intl.NumberFormat('vi-VN')` + "đ").
- Không thư viện ngoài, không CSS framework. Dùng được trên điện thoại (rộng 360px).

## Lịch sử ngắn
- 2026-11-20 Trang giữ chỗ.
- 2026-11-20 Form chia tiền 75/25 (job #2): app.js, style.css; ô nhập chấp nhận 400000 hoặc 400.000.
- 2026-11-20 Ô chọn tỷ lệ nhãn 75/70 và hiện % ở mỗi dòng (job #6); gọi `splitConsignment(amount, pct/100)`.
