require('module-alias/register')
const { createLogger, format, transports } = require('winston');
const chalk = require('chalk');
const { combine, timestamp, label, printf, simple, splat } = format;

const consoleFormat = printf(({ level, message, label, timestamp }) => {
  var levelUpper = level.toUpperCase();
  switch (levelUpper) {
    case "DEBUG":
      message = chalk.green(message);
      level = chalk.greenBright.bold(level);
      break;
    case "INFO":
      message = chalk.white(message);
      level = chalk.whiteBright.bold(level);
      break;

    case "WARN":
      message = chalk.yellow(message);
      level = chalk.black.bgYellowBright.bold(level);
      break;

    case "ERROR":
      message = chalk.red(message);
      level = chalk.black.bgRedBright.bold(level);
      break;

    default:
      break;
  }
  return `[${level}]: ${message}`;
});

const fileFormat = printf(({ level, message, label, timestamp }) => {
  return `[${label}] [${timestamp}] [${level}]: ${message}`;
});

module.exports = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    format.splat(),
    consoleFormat
  ),
  transports: [
    new transports.Console(),
  ]
});