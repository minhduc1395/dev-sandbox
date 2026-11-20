// Tổng kết cuối ngày cho nhiều đơn ký gửi, gộp chung và theo từng nhãn hàng.
// orders: mảng { brand, amount, brandShare? } (brandShare mặc định 0.75).
// Chia tiền từng đơn qua splitConsignment nên brand + store luôn bằng total.
import { splitConsignment } from './split.js';

export function dailySummary(orders) {
  if (!Array.isArray(orders)) throw new RangeError('orders phải là mảng');
  const result = { total: 0, brand: 0, store: 0, byBrand: {} };

  orders.forEach((order, i) => {
    if (order === null || typeof order !== 'object') {
      throw new RangeError(`Đơn thứ ${i}: không phải object`);
    }
    const { brand: name, amount, brandShare } = order;
    if (typeof name !== 'string' || name.trim() === '') {
      throw new RangeError(`Đơn thứ ${i}: brand rỗng`);
    }
    if (typeof amount !== 'number' || !Number.isFinite(amount) || amount < 0) {
      throw new RangeError(`Đơn thứ ${i}: amount phải là số không âm`);
    }
    let part;
    try {
      part = splitConsignment(amount, brandShare);
    } catch (err) {
      throw new RangeError(`Đơn thứ ${i}: ${err.message}`);
    }

    if (!Object.hasOwn(result.byBrand, name)) {
      // defineProperty để tên nhãn lạ như "__proto__" vẫn là khóa thường.
      Object.defineProperty(result.byBrand, name, {
        value: { total: 0, brand: 0, store: 0, count: 0 },
        enumerable: true, writable: true, configurable: true,
      });
    }
    const row = result.byBrand[name];
    row.total += amount;
    row.brand += part.brand;
    row.store += part.store;
    row.count += 1;
    result.total += amount;
    result.brand += part.brand;
    result.store += part.store;
  });

  return result;
}
