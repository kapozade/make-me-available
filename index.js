const robot = require("robotjs");
const args = process.argv;

function main() {
  const runUntil = getRunUntil(args);
  robot.setMouseDelay(2);

  const twoPI = Math.PI * 2.0;
  const screenSize = robot.getScreenSize();
  const height = (screenSize.height / 2) - 10;
  const width = screenSize.width;
  let shouldRun = true;
  do
  {
    for (let x = 0; x < width; x++)
    {
      y = height * Math.sin((twoPI * x) / width) + height;
      robot.moveMouse(x, y);
    }
    let date = new Date().getTime();
    shouldRun = date <= runUntil;
  } while(shouldRun)
}

function getRunUntil(args) {
  if(args[2] <= 0 || isNaN(args[2]))
    throw new Error("Time argument is not valid.");

  if(args[3] != 'h' && args[3] != 'm')
    throw new Error('Time unit argument is not valid.');

  const timeInfo = args[3] === 'h'
    ? 60 * 60
    : 60;

  let executionDate = new Date().getTime();
  executionDate += args[2] * timeInfo * 1000;

  return executionDate;
}

main();