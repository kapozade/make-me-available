const robot = require('robotjs');
const UnitTypes = require('./unit-types')

const main = () => {
  const args = process.argv;
  if(args.length != 4)
    throw new Error("Invalid number of arguments to run. Example statement to run => `node index.js 5 m`");

  const twoPI = Math.PI * 2.0;
  const screenSize = robot.getScreenSize();
  const height = (screenSize.height / 2) - 10;
  const width = screenSize.width;
  const runUntil = getRunUntil(args[2], args[3]);

  robot.setMouseDelay(2);

  let shouldRun = true;
  while(shouldRun)
  {
    for (let x = 0; x < width; x++)
    {
      y = height * Math.sin((twoPI * x) / width) + height;
      robot.moveMouse(x, y);

      let date = getCurrentTime();
      shouldRun = date <= runUntil;

      if(!shouldRun) break;
    }
  }
}

const getRunUntil = (duration, unit) => {
  if(duration <= 0 || isNaN(duration))
    throw new Error("Time argument is not valid.");

  unit = unit.toUpperCase();
  const unitTypes = Object.keys(UnitTypes);
  if(!unitTypes.includes(unit))
    throw new Error('Time unit argument is not valid.');

  const milliseconds = unit === UnitTypes.MINUTE.name || UnitTypes.M.name
    ? UnitTypes.MINUTE.value
    : UnitTypes.HOUR.value;

  return calculateExpirationDate(duration, milliseconds);
}

const calculateExpirationDate = (duration, milliseconds) => {
  let expirationDate = getCurrentTime();
  expirationDate += duration * milliseconds;

  return expirationDate;
}

const getCurrentTime = () => {
  return new Date().getTime();
}

main();