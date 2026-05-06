function isRookMoveValid(start, end) {
  const startColumn = start.charAt(0);
  const startRow = start.charAt(1);

  const endColumn = end.charAt(0);
  const endRow = end.charAt(1);

  const sameColumn = startColumn === endColumn;
  const sameRow = startRow === endRow;
  const sameCell = start === end;

  return (sameColumn || sameRow) && !sameCell;
}
