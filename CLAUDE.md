# dev-sandbox: chỉ dẫn cho coder

## Dự án là gì
Dự án thử của đội coder (khách "sandbox", Tech Lead DIR). Máy tính nhỏ chia tiền hàng ký gửi giữa nhãn hàng và cửa hàng. Mục đích chính: chạy thử quy trình giao - nhận job.

## Lệnh
- Cài: không cần (không có thư viện ngoài), Node.js 22.
- Test: `npm test` (node --test).
- Xem trang: mở `public/index.html` trong trình duyệt.

## Cấu trúc
- Bản đồ module: `docs/modules/README.md`. Chỉ đọc gói của module trong job.

## Quy ước
- Giao diện tiếng Việt, số tiền hiển thị dạng `300.000đ`.
- JavaScript thuần (ES module), không thêm thư viện.
- Mỗi hàm tính toán có test trong `test/`.
- File dùng chung (chỉ sửa qua job `module:shared`): `package.json`, `CLAUDE.md`, `.github/`.

## Quy trình
Theo https://github.com/minhduc1395/dev-hub/blob/main/docs/PROCESS.md. Lệnh GitHub chỉ dùng `gh api` (REST): dev-hub/docs/GH-COMMANDS.md. Không merge, không deploy, không đẩy thẳng vào main.
