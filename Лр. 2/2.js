function totalCost(goods, discounts) {
  let total = 0;

  for (let item of goods) {
    let price = item.value;

    let discountObj = discounts.find((d) => d.name === item.name);

    if (discountObj) {
      let percent = parseFloat(discountObj.discount);
      price = price * (1 - percent / 100);
    }

    total += price * item.amount;
  }

  return total;
}
