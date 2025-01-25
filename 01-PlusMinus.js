function plusMinus(arr) {
  let len = arr.length;
  let pos = 0,
    neg = 0,
    zero = 0;
  for (let i = 0; i < len; i++) {
    if (arr[i] > 0) pos++;
    if (arr[i] < 0) neg++;
    if (arr[i] == 0) zero++;
  }
  return [
    (pos / len).toFixed(6),
    (neg / len).toFixed(6),
    (zero / len).toFixed(6),
  ].map(Number);
}
