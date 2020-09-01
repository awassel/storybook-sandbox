const path = require('path');
const shell = require('shelljs');
const paths = require('../globals/paths');
const functions = require('../globals/functions');

const { tasklog } = functions;
const { BUILD_DIR } = paths;

const run = () => {
  const directory = path.resolve(BUILD_DIR, 'html');
  shell.rm('-rf', `${directory}`);
  tasklog('HTML deleted...');
};

module.exports = {
  run,
};
