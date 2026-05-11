const robot = require('robotjs');
const UnitTypes = require('./unit-types');
const chalk = require('chalk');
const cliProgress = require('cli-progress');

const main = () => {
  const args = process.argv;
  if (args.length !== 4)
    throw new Error("Invalid number of arguments. Example: `node index.js 5 m`");

  const twoPI = Math.PI * 2.0;
  const screenSize = robot.getScreenSize();
  const height = (screenSize.height / 2) - 10;
  const width = screenSize.width;
  const runUntil = getRunUntil(args[2], args[3]);
  const runFrom = getCurrentTime();

  robot.setMouseDelay(2);

  const bar = new cliProgress.SingleBar({
    format: chalk.cyan('{bar}') + chalk.yellow(' {percentage}%') + chalk.gray(' │ ⏳ {timeLeft}'),
    barCompleteChar: '█',
    barIncompleteChar: '░',
    hideCursor: true,
    clearOnComplete: false,
  }, cliProgress.Presets.shades_classic);

  bar.start(100, 0, { timeLeft: formatDuration(runUntil - runFrom) });

  let shouldRun = true;
  let lastTickAt = 0;

  while (shouldRun) {
    for (let x = 0; x < width; x++) {
      const now = getCurrentTime();
      const y = height * Math.sin((twoPI * x) / width) + height;
      robot.moveMouse(x, y);

      if (now - lastTickAt >= 1000) {
        const elapsed = now - runFrom;
        const remaining = Math.max(0, runUntil - now);
        const percentage = Math.min(100, (elapsed / (runUntil - runFrom)) * 100);
        bar.update(Math.floor(percentage), { timeLeft: formatDuration(remaining) });
        lastTickAt = now;
      }

      shouldRun = now <= runUntil;
      if (!shouldRun) break;
    }
  }

  bar.update(100, { timeLeft: formatDuration(0) });
  bar.stop();
};

const formatDuration = (ms) => {
  const totalSeconds = Math.floor(Math.max(0, ms) / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return chalk.white(`${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`);
};

const pad = (n) => String(n).padStart(2, '0');

const getRunUntil = (durationArg, unitArg) => {
  const duration = parseFloat(durationArg);
  if (isNaN(duration) || duration <= 0)
    throw new Error("Time argument is not valid.");

  const unit = unitArg.toUpperCase();
  if (!UnitTypes.isValid(unit))
    throw new Error(`Time unit argument is not valid. Valid units: HOUR, H, MINUTE, M`);

  const unitType = UnitTypes.fromName(unit);
  return calculateExpirationDate(duration, unitType.value);
};

const calculateExpirationDate = (duration, milliseconds) => {
  return getCurrentTime() + duration * milliseconds;
};

const getCurrentTime = () => {
  return new Date().getTime();
};

main();