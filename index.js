const robot = require('robotjs');
const UnitTypes = require('./unit-types')

const main = () => {
  const twoPI = Math.PI * 2.0;
  const screenSize = robot.getScreenSize();
  const height = (screenSize.height / 2) - 10;
  const width = screenSize.width;
  const args = process.argv;
  const runUntil = getRunUntil(args[2], args[3]);

  robot.setMouseDelay(2);

  let shouldRun = true;
  while(shouldRun)
  {
    for (let x = 0; x < width; x++)
    {
      y = height * Math.sin((twoPI * x) / width) + height;
      robot.moveMouse(x, y);

      let date = new Date().getTime();
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
  let executionDate = new Date().getTime();
  executionDate += duration * milliseconds;

  return executionDate;
}

main();