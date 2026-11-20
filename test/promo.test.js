import { test } from 'node:test';
import assert from 'node:assert/strict';
import { storeMargin } from '../src/calc/promo.js';

test('400.000đ giảm 25% → bán 300.000đ, nhãn 225.000đ, cửa hàng 75.000đ', () => {
  assert.deepEqual(storeMargin(400000, 25), { salePrice: 300000, brand: 225000, store: 75000 });
});

test('biên: giảm 0% giữ nguyên giá, giảm 100% còn 0', () => {
  assert.deepEqual(storeMargin(400000, 0), { salePrice: 400000, brand: 300000, store: 100000 });
  assert.deepEqual(storeMargin(400000, 100), { salePrice: 0, brand: 0, store: 0 });
});

test('làm tròn giá bán đến đồng, brand + store = salePrice', () => {
  const r = storeMargin(99999, 33);
  assert.equal(r.salePrice, Math.round(99999 * 0.67));
  assert.equal(r.brand + r.store, r.salePrice);
});

test('brandShare tùy chỉnh', () => {
  assert.deepEqual(storeMargin(400000, 25, 0.5), { salePrice: 300000, brand: 150000, store: 150000 });
});

test('sai đầu vào ném RangeError', () => {
  assert.throws(() => storeMargin(400000, -1), RangeError);
  assert.throws(() => storeMargin(400000, 101), RangeError);
  assert.throws(() => storeMargin(400000, NaN), RangeError);
  assert.throws(() => storeMargin(-1, 10), RangeError);
});
