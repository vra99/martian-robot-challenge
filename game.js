import readline from "readline";
import figlet from "figlet";
import { Robot } from "./robot.js";
import { Grid } from "./grid.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const addRobot = function (grid) {
  const added = grid.robots.length + 1;
  console.log("Robot #" + added);
  return rl.question("Enter robot position: ", function (position) {
    const ref$ = position.split(" ");
    const x = ref$[0];
    const y = ref$[1];
    const facing = ref$[2];
    const robot = new Robot(x, y, facing);
    return rl.question("Add movement instructions: ", function (instructions) {
      grid.addRobot(robot, instructions);
      return rl.question("Add new robot? (Y/n): ", function (answer) {
        if (answer.toUpperCase() === "N") {
          console.log("\nRobots coordinates:");
          grid.robots.forEach(function (robot) {
            return console.log(robot.getCoordinates());
          });
          return rl.close();
        }
        return addRobot(grid);
      });
    });
  });
};

export const showHelp = function () {
  return console.log(
    "╔═══════════════════╦════════════════════════════════════╗\n║ Mars surface size ║                                    ║\n╠═══════════════════╝                                    ║\n║ Format  : length heigth                                ║\n║ Default : 50 50                                        ║\n╠═══════════════════╦════════════════════════════════════╣\n║ Robot position    ║                                    ║\n╠═══════════════════╝                                    ║\n║ Format  : x y orientation                              ║\n║ Example : 1 1 E                                        ║\n║ Note    : Orientation must be one of N, S, E or W      ║\n║ corresponding to North, South, East or West            ║\n╠═══════════════════╦════════════════════════════════════╣\n║ Instructions      ║                                    ║\n╠═══════════════════╝                                    ║\n║ Example : RFRFRFLF                                     ║\n║ Note    : A series of movement instructions consisting ║\n║ of the characters R: Right, L: Left, and F: Forward    ║\n╚════════════════════════════════════════════════════════╝\n"
  );
};

export const init = function () {
  return figlet.text(
    "Martian-Robot\n Challenge",
    {
      font: "ANSI Shadow",
    },
    function (err, data) {
      console.log(data);
      console.log("");
      return rl.question("View game help? (y/N): ", function (viewHelp) {
        if (viewHelp.toLowerCase() === "y") {
          showHelp();
        }
        return rl.question(
          "Hit [enter] to continue or ctrl+c to exit",
          function () {
            console.log("Welcome to martian-robot challenge!");
            return rl.question(
              "Enter Mars surface size: (50 50 is the default size) ",
              function (size) {
                const ref$ = (size || "50 50").split(" ");
                const length = ref$[0];
                const heigth = ref$[1];
                const grid = new Grid(length, heigth);
                return addRobot(grid);
              }
            );
          }
        );
      });
    }
  );
};
init();
