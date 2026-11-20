import { test } from 'node:test';
import assert from 'node:assert/strict';
import { splitConsignment } from '../src/calc/split.js';

test('chia 75/25 mặc định', () => {
  assert.deepEqual(splitConsignment(400000), { brand: 300000, store: 100000 });
});

test('tổng hai phần luôn bằng số tiền gốc', () => {
  const r = splitConsignment(333333);
  assert.equal(r.brand + r.store, 333333);
});

test('từ chối số âm', () => {
  assert.throws(() => splitConsignment(-1), RangeError);
});
