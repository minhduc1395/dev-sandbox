# Module: calc

## Mục đích
Các hàm tính tiền thuần (không giao diện) cho máy tính ký gửi.

## Thư mục và file chính
- `src/calc/split.js`: `splitConsignment(amount, brandShare = 0.75)` trả `{brand, store}`, làm tròn đến đồng, tổng hai phần luôn bằng số gốc.
- `test/*.test.js`: test bằng `node:test`.

## Dữ liệu vào/ra
- Vào: số tiền (đồng, số nguyên không âm), tỷ lệ 0–1.
- Ra: object số nguyên. Sai đầu vào thì ném `RangeError`.

## Quy ước riêng
- Hàm thuần, không đọc DOM, không I/O. Mỗi hàm mới có ít nhất 3 test (bình thường, biên, sai đầu vào).

## Quyết định đã chốt
- 2026-11-20 Tỷ lệ mặc định 75% cho nhãn hàng.

## Lịch sử ngắn
- 2026-11-20 Khởi tạo splitConsignment.
