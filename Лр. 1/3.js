function draw(count) {
  let result = "";

  for (let i = 1; i <= count; i++) {
    result += "#".repeat(i) + "\n";
  }

  return result;
}
