function quadraticRoots(a, b, c) {
  const d = b * b - 4 * a * c;

  if (d < 0) {
    return "дійсних коренів не існує";
  }

  if (d === 0) {
    const x = -b / (2 * a);
    return `x = ${x}`;
  }

  const sqrtD = Math.sqrt(d);
  const x1 = (-b + sqrtD) / (2 * a);
  const x2 = (-b - sqrtD) / (2 * a);

  return `x1 = ${x1}\nx2 = ${x2}`;
}
