function isEven(n) {
  if (n < 0) return isEven(-n);

  if (n === 0) return true;
  if (n === 1) return false;

  return isEven(n - 2);
}
