const path = require('path');
const shell = require('shelljs');
const paths = require('../globals/paths');
const functions = require('../globals/functions');

const { tasklog } = functions;
const { BUILD_DIR } = paths;

const run = () => {
  const es = path.resolve(BUILD_DIR, 'es');
  const umd = path.resolve(BUILD_DIR, 'umd');
  shell.rm('-rf', `${es}`);
  shell.rm('-rf', `${umd}`);
  tasklog('JavaScript files deleted...');
};

module.exports = {
  run,
};
