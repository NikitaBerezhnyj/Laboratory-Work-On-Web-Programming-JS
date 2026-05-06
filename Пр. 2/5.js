function sortColumns(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  for (let c = 0; c < cols; c++) {
    const column = [];

    for (let r = 0; r < rows; r++) {
      column.push(matrix[r][c]);
    }

    column.sort((a, b) => b - a);

    for (let r = 0; r < rows; r++) {
      matrix[r][c] = column[r];
    }
  }

  return matrix;
}
