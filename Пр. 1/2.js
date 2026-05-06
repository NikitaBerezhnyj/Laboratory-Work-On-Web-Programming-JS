function calculateTotalCost(uah, kop, n) {
  const priceInKopecks = uah * 100 + kop;

  const totalInKopecks = priceInKopecks * n;

  const totalUah = Math.floor(totalInKopecks / 100);
  const totalKop = totalInKopecks % 100;

  return [totalUah, totalKop];
}
