function validSequenceSimple(braces) {
  const stack = [];

  const pairs = {
    ")": "(",
    "}": "{",
    "]": "[",
    ">": "<",
  };

  for (let ch of braces) {
    if (["(", "{", "[", "<"].includes(ch)) {
      stack.push(ch);
    } else {
      if (stack.pop() !== pairs[ch]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}
