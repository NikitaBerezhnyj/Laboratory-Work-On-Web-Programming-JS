var flipAndInvertImage = (image) =>
  image.map((row) => row.reverse().map((x) => x ^ 1));
