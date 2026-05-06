function calc(x) {
  const xCube = x ** 3;

  const level3 = xCube + 0.001;
  const level2 = xCube + 0.01 / level3;
  const level1 = xCube + 0.1 / level2;

  const result = x / level1;

  return result;
}
