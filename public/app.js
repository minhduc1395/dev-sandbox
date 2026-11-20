import { splitConsignment } from '../src/calc/split.js';

const fmt = new Intl.NumberFormat('vi-VN');
const money = (n) => fmt.format(n) + 'đ';

const input = document.getElementById('amount');
const hint = document.getElementById('hint');
const result = document.getElementById('result');
const brandEl = document.getElementById('brand');
const storeEl = document.getElementById('store');

function showHint(text) {
  result.hidden = true;
  hint.hidden = !text;
  hint.textContent = text;
}

function update() {
  const raw = input.value.trim();
  if (raw === '') return showHint('Vui lòng nhập số tiền đơn hàng.');
  if (raw.startsWith('-')) return showHint('Số tiền không được âm.');
  const digits = raw.replace(/[.\s]/g, '');
  if (!/^\d+$/.test(digits)) return showHint('Chỉ nhập chữ số, ví dụ 400000.');
  const amount = Number(digits);
  if (!Number.isSafeInteger(amount)) return showHint('Số tiền quá lớn.');
  const { brand, store } = splitConsignment(amount);
  hint.hidden = true;
  brandEl.textContent = 'Nhãn hàng nhận: ' + money(brand);
  storeEl.textContent = 'Cửa hàng giữ: ' + money(store);
  result.hidden = false;
}

input.addEventListener('input', update);
