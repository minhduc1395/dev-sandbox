import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dailySummary } from '../src/calc/summary.js';

test('nhiều nhãn: gộp tổng và tách theo nhãn', () => {
  const r = dailySummary([
    { brand: 'A', amount: 400000 },
    { brand: 'B', amount: 200000 },
    { brand: 'A', amount: 100000 },
  ]);
  assert.deepEqual(r, {
    total: 700000, brand: 525000, store: 175000,
    byBrand: {
      A: { total: 500000, brand: 375000, store: 125000, count: 2 },
      B: { total: 200000, brand: 150000, store: 50000, count: 1 },
    },
  });
});

test('nhãn có brandShare riêng', () => {
  const r = dailySummary([
    { brand: 'A', amount: 100000, brandShare: 0.6 },
    { brand: 'B', amount: 100000 },
  ]);
  assert.deepEqual(r.byBrand.A, { total: 100000, brand: 60000, store: 40000, count: 1 });
  assert.deepEqual(r.byBrand.B, { total: 100000, brand: 75000, store: 25000, count: 1 });
  assert.equal(r.brand, 135000);
  assert.equal(r.store, 65000);
});

test('làm tròn lẻ đồng: brand + store vẫn bằng total', () => {
  const r = dailySummary([
    { brand: 'A', amount: 333333 },
    { brand: 'A', amount: 1 },
    { brand: 'B', amount: 7, brandShare: 0.33 },
  ]);
  assert.equal(r.total, 333341);
  assert.equal(r.brand + r.store, r.total);
  for (const row of Object.values(r.byBrand)) assert.equal(row.brand + row.store, row.total);
});

test('mảng rỗng trả toàn số 0', () => {
  assert.deepEqual(dailySummary([]), { total: 0, brand: 0, store: 0, byBrand: {} });
});

test('đơn sai ném RangeError kèm vị trí', () => {
  const ok = { brand: 'A', amount: 1000 };
  assert.throws(() => dailySummary([ok, { brand: 'A', amount: -1 }]), { name: 'RangeError', message: /Đơn thứ 1/ });
  assert.throws(() => dailySummary([ok, ok, { brand: 'A', amount: '1000' }]), { name: 'RangeError', message: /Đơn thứ 2/ });
  assert.throws(() => dailySummary([{ brand: 'A', amount: NaN }]), { name: 'RangeError', message: /Đơn thứ 0/ });
  assert.throws(() => dailySummary([{ brand: '', amount: 1000 }]), { name: 'RangeError', message: /Đơn thứ 0/ });
  assert.throws(() => dailySummary([{ brand: '  ', amount: 1000 }]), RangeError);
  assert.throws(() => dailySummary([{ amount: 1000 }]), RangeError);
  assert.throws(() => dailySummary([null]), RangeError);
  assert.throws(() => dailySummary([{ brand: 'A', amount: 1000, brandShare: 2 }]), { name: 'RangeError', message: /Đơn thứ 0/ });
  assert.throws(() => dailySummary('x'), RangeError);
});

test('1000 đơn ngẫu nhiên vẫn khớp tổng', () => {
  let seed = 12345;
  const rand = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
  const brands = ['A', 'B', 'C', 'D', 'E'];
  const orders = Array.from({ length: 1000 }, () => {
    const o = { brand: brands[Math.floor(rand() * brands.length)], amount: Math.floor(rand() * 5000000) };
    if (rand() < 0.3) o.brandShare = Math.round(rand() * 100) / 100;
    return o;
  });
  const r = dailySummary(orders);
  assert.equal(r.total, orders.reduce((s, o) => s + o.amount, 0));
  assert.equal(r.brand + r.store, r.total);
  let count = 0, total = 0, brand = 0, store = 0;
  for (const row of Object.values(r.byBrand)) {
    assert.equal(row.brand + row.store, row.total);
    count += row.count; total += row.total; brand += row.brand; store += row.store;
  }
  assert.deepEqual({ count, total, brand, store }, { count: 1000, total: r.total, brand: r.brand, store: r.store });
});

test('tên nhãn "__proto__" vẫn là khóa thường', () => {
  const r = dailySummary([{ brand: '__proto__', amount: 100 }]);
  assert.ok(Object.hasOwn(r.byBrand, '__proto__'));
  assert.equal(r.byBrand.__proto__.total, 100);
});
