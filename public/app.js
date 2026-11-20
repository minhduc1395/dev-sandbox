import { splitConsignment } from '../src/calc/split.js';

const fmt = new Intl.NumberFormat('vi-VN');
const money = (n) => fmt.format(n) + 'đ';

const shareEl = document.getElementById('share');
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
  const pct = Number(shareEl.value);
  const { brand, store } = splitConsignment(amount, pct / 100);
  hint.hidden = true;
  brandEl.textContent = 'Nhãn hàng nhận: ' + money(brand) + ' (' + pct + '%)';
  storeEl.textContent = 'Cửa hàng giữ: ' + money(store) + ' (' + (100 - pct) + '%)';
  result.hidden = false;
}

input.addEventListener('input', update);
shareEl.addEventListener('change', update);
