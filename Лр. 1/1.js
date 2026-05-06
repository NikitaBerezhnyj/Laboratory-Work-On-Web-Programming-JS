function greedy(change) {
  const coins = [25, 10, 5, 1];
  let cents = Math.round(change * 100);
  let count = 0;

  for (const coin of coins) {
    count += Math.floor(cents / coin);
    cents %= coin;
  }

  return count;
}
