function median(a, b, c) {
  const sum = a + b + c;
  const min = Math.min(a, b, c);
  const max = Math.max(a, b, c);

  const median = sum - min - max;

  return median;
}
