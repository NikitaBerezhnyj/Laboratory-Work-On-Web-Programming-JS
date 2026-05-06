function mathInterpreter(expression) {
  const [x, y, z] = expression.split(" ");

  const a = Number(x);
  const b = Number(z);

  const result =
    y === "+" ? a + b : y === "-" ? a - b : y === "*" ? a * b : a / b;

  return Number(result.toFixed(1));
}
