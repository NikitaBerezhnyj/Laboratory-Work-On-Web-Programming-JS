function calc(expr) {
  const [x, y, z] = expr.split(" ");

  const operations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
  };

  return Number(operations[y](Number(x), Number(z)).toFixed(1));
}
