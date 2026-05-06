function findMaxConsecutiveOnes(nums) {
  let max = 0;
  let current = 0;

  for (const num of nums) {
    if (num === 1) {
      current++;
      if (current > max) {
        max = current;
      }
    } else {
      current = 0;
    }
  }

  return max;
}
