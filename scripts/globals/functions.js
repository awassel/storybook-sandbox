const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');

const getFilename = (filepath) => {
  return path.basename(filepath);
};

const getFilepath = (file) => {
  return path.dirname(file);
};

const createDirectory = (dirpath) => {
  if (!fs.existsSync(dirpath)) {
    fs.mkdirSync(dirpath, { recursive: true });
  }
};

const filelog = (format, filepath, action) => {
  const filename = getFilename(filepath);

  console.log(
    chalk.grey(`[${new Date().toUTCString()}]`),
    chalk.green(`${format} file: `) +
      chalk.blue.bold(filename) +
      chalk.green(` ${action}`)
  );
};

const tasklog = (text) => {
  console.log(
    chalk.grey(`[${new Date().toUTCString()}]`),
    chalk.yellow.bold.underline(text)
  );
};

const errorlog = (text) => {
  console.log(chalk.grey(`[${new Date().toUTCString()}]`), chalk.red(text));
};

const faillog = (text) => {
  console.log(
    chalk.grey(`[${new Date().toUTCString()}]`),
    chalk.red.bold(text)
  );
};

module.exports = {
  getFilename,
  getFilepath,
  createDirectory,
  filelog,
  tasklog,
  errorlog,
  faillog,
};
