const turnMap = {
  N: ["W", "E"],
  E: ["N", "S"],
  S: ["E", "W"],
  W: ["S", "N"],
};
const isValidOrientation = function (orientation) {
  return Object.keys(turnMap).some(function (k) {
    return k === orientation;
  });
};

export class Robot {
  constructor(x, y, facing) {
    this.x = x;
    this.y = y;
    this.facing = facing != null ? facing : "N";
    const errorPrefix = "Invalid coordinates: one or more coordinates";
    if (isNaN(this.x) || isNaN(this.y)) {
      throw new Error(errorPrefix + " are not valid numbers");
    }
    if (this.x < 0 || this.y < 0) {
      throw new Error(errorPrefix + " are negative numbers");
    }
    if (!isValidOrientation(this.facing)) {
      throw new Error(this.facing + " is not a valid orientation");
    }
    this.isLost = false;
  }
  getCoordinates() {
    return (
      this.x +
      " " +
      this.y +
      " " +
      this.facing +
      " " +
      (this.isLost ? "LOST" : "")
    ).trim();
  }
  execute(instructions, grid) {
    if (instructions.length > 100) {
      throw "Instructions length exceeded";
    }
    return instructions
      .split("")
      .map(function (it) {
        return it.toUpperCase();
      })
      .map(
        function (it) {
          return this.move(it, grid);
        }.bind(this)
      );
  }
  turn(direction) {
    return (this.facing = turnMap[this.facing][+(direction === "R")]);
  }
  move(instruction, grid) {
    if (this.isLost) {
      return;
    }
    if (instruction === "F") {
      return this.moveForward(grid);
    } else {
      return this.turn(instruction);
    }
  }
  moveForward(grid) {
    let ref, coordinates;
    const lastCoordinates = this.getCoordinates();
    if (grid.hasLostRobotScent(lastCoordinates)) {
      return;
    }
    switch (((ref = [this.facing]), false)) {
      case !("N" === ref[0]):
        ++this.y;
        break;
      case !("E" === ref[0]):
        ++this.x;
        break;
      case !("S" === ref[0]):
        --this.y;
        break;
      case !("W" === ref[0]):
        --this.x;
    }
    if (grid.isRobotLost(this)) {
      this.isLost = true;
      grid.addLostRobotScent(lastCoordinates);
      coordinates = lastCoordinates.split(" ");
      this.x = coordinates[0];
      return (this.y = coordinates[1]);
    }
  }
}

Robot.displayName = "Robot";
