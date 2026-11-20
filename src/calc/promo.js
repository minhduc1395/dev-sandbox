import { splitConsignment } from './split.js';

// Tính phần cửa hàng nhận cho một đơn có giảm giá.
// salePrice = listPrice × (1 − discountPct/100), làm tròn đến đồng.
// Chia tiền dùng lại splitConsignment.
export function storeMargin(listPrice, discountPct, brandShare = 0.75) {
  if (!Number.isFinite(listPrice) || listPrice < 0) throw new RangeError('listPrice phải là số không âm');
  if (!Number.isFinite(discountPct) || discountPct < 0 || discountPct > 100) {
    throw new RangeError('discountPct phải từ 0 đến 100');
  }
  const salePrice = Math.round(listPrice * (1 - discountPct / 100));
  const { brand, store } = splitConsignment(salePrice, brandShare);
  return { salePrice, brand, store };
}
