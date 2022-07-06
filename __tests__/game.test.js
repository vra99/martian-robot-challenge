import { expect } from "chai";
import { Robot } from "../robot";
import { Grid } from "../grid";

const grid = new Grid(5, 3);
const cases = [
  {
    robot: new Robot(1, 1, "E"),
    instructions: "RFRFRFRF",
    expected: "1 1 E",
  },
  {
    robot: new Robot(3, 2, "N"),
    instructions: "FRRFLLFFRRFLL",
    expected: "3 3 N LOST",
  },
  {
    robot: new Robot(0, 3, "W"),
    instructions: "LLFFFLFLFL",
    expected: "2 3 S",
  },
];
const directions = {
  N: "North",
  S: "South",
  E: "East",
  W: "West",
};

describe("Given Mars's surface is a rectangle with length 5 and heigth 3", function () {
  return describe("3 robots were sent", function () {
    cases.map(function (r) {
      return grid.addRobot(r.robot, r.instructions);
    });
    return cases.map(function (r, i) {
      return describe(
        "A robot #" +
          (i + 1) +
          ", started at X: " +
          r.robot.x +
          ", Y: " +
          r.robot.y,
        function () {
          return describe(
            "After being executed the instructions: " + r.instructions,
            function () {
              var props, expected;
              props = r.expected.split(" ");
              expected = {
                x: props[0],
                y: props[1],
                facing: props[2],
              };
              return specify(
                "It should be positioned at X: " +
                  expected.x +
                  ", Y: " +
                  expected.y +
                  ", facing " +
                  directions[expected.facing],
                function () {
                  return expect(grid.robots[i].getCoordinates()).to.equal(
                    r.expected
                  );
                }
              );
            }
          );
        }
      );
    });
  });
});
