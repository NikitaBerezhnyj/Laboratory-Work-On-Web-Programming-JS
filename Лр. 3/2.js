var sortArrayByParity = (nums) => [
  ...nums.filter((x) => x % 2 === 0),
  ...nums.filter((x) => x % 2 !== 0),
];
