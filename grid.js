export const Grid = (function () {
  let MAX = 50;
  let MIN = 1;
  function Grid(length, heigth) {
    this.length = length != null ? length : 0;
    this.heigth = heigth != null ? heigth : 0;
    if (isNaN(this.length) || isNaN(this.heigth)) {
      throw "Invalid dimensions";
    }
    if (this.length > MAX || this.heigth > MAX) {
      throw "Grid cannot be larger than 50x50";
    }
    if (this.length < MIN || this.heigth < MIN) {
      throw "Grid cannot be smaller than 1x1";
    }
    this.robots = [];
    this.lostRobotCoordinates = [];
  }
  Grid.prototype.addRobot = function (robot, instructions) {
    this.robots.push(robot);
    if (instructions) {
      return robot.execute(instructions, this);
    }
  };
  Grid.prototype.addLostRobotScent = function (coordinates) {
    return this.lostRobotCoordinates.push(coordinates);
  };
  Grid.prototype.hasLostRobotScent = function (coordinates) {
    return this.lostRobotCoordinates.some(function (c) {
      return c === coordinates;
    });
  };
  Grid.prototype.isRobotLost = function (robot) {
    return (
      robot.x > this.length ||
      robot.y > this.heigth ||
      robot.x < 0 ||
      robot.y < 0
    );
  };
  return Grid;
})();

Grid.displayName = "Grid";
