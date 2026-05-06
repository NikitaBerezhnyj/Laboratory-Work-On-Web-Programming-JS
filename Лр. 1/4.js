function traverseMaze(robot, width, height) {
  while (!robot.finished) {
    if (robot.x < width - 2) {
      robot.moveTo(Direction.Right);
    } else if (robot.y < height - 2) {
      robot.moveTo(Direction.Down);
    }
  }
}
