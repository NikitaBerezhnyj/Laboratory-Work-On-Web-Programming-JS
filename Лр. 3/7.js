var findNumbers = (nums) =>
  nums.reduce((acc, x) => acc + (String(x).length % 2 === 0 ? 1 : 0), 0);
