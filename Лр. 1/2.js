function validSequenceSimple(braces) {
  let balance = 0;

  for (const ch of braces) {
    if (ch === "(") balance++;
    if (ch === ")") balance--;

    if (balance < 0) return false;
  }

  return balance === 0;
}
