function traverseMaze(robot, width, height) {
  function moveTo(direction, count) {
    for (let i = 0; i < count; i++) {
      if (!robot.finished) {
        robot.moveTo(direction);
      }
    }
  }

  const targetX = width - 2;
  const targetY = height - 2;

  const dx = targetX - 1;
  const dy = targetY - 1;

  const rightSteps = dx > dy ? Math.round(dx / dy) : 1;
  const downSteps = dy > dx ? Math.floor(dy / dx) : 1;

  while (!robot.finished) {
    if (dy > dx) {
      moveTo(Direction.Down, downSteps);
      moveTo(Direction.Right, rightSteps);
    } else {
      moveTo(Direction.Right, rightSteps);
      moveTo(Direction.Down, downSteps);
    }
  }
}
