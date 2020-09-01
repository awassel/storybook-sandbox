const path = require('path');
const shell = require('shelljs');
const paths = require('../globals/paths');
const functions = require('../globals/functions');

const { tasklog } = functions;
const { BUILD_DIR } = paths;

const run = () => {
  const directory = path.resolve(BUILD_DIR, 'css');
  shell.rm('-rf', `${directory}`);
  tasklog('CSS files deleted...');
};

module.exports = {
  run,
};
