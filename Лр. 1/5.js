function traverseMaze(robot, width, height) {
  let goRight = true;

  while (!robot.finished) {
    if (goRight) {
      while (robot.x < width - 2) {
        robot.moveTo(Direction.Right);
      }
    } else {
      while (robot.x > 1) {
        robot.moveTo(Direction.Left);
      }
    }

    if (!robot.finished) {
      robot.moveTo(Direction.Down);
    }

    if (!robot.finished) {
      robot.moveTo(Direction.Down);
    }

    goRight = !goRight;
  }
}
