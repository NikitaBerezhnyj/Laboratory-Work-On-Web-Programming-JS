function moveQueen(a, b) {
  const s = String(a);
  const e = String(b);

  const startCol = s.charAt(0).charCodeAt(0);
  const startRow = s.charAt(1).charCodeAt(0);

  const endCol = e.charAt(0).charCodeAt(0);
  const endRow = e.charAt(1).charCodeAt(0);

  const sameCell = s === e;
  const sameRow = startRow === endRow;
  const sameCol = startCol === endCol;

  const diagonal = Math.abs(startCol - endCol) === Math.abs(startRow - endRow);

  return !sameCell && (sameRow || sameCol || diagonal);
}
