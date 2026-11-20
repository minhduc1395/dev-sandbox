// Chia tiền một đơn hàng ký gửi giữa nhãn hàng và cửa hàng.
// brandShare: tỷ lệ nhãn hàng nhận (mặc định 0.75). Làm tròn đến đồng.
export function splitConsignment(amount, brandShare = 0.75) {
  if (!Number.isFinite(amount) || amount < 0) throw new RangeError('amount phải là số không âm');
  if (!(brandShare >= 0 && brandShare <= 1)) throw new RangeError('brandShare phải từ 0 đến 1');
  const brand = Math.round(amount * brandShare);
  return { brand, store: amount - brand };
}
