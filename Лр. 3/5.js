var findDisappearedNumbers = (nums) =>
  Array.from({ length: nums.length }, (_, i) => i + 1).filter(
    (x) => !new Set(nums).has(x),
  );
