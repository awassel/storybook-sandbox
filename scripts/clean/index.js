const shell = require('shelljs');
const functions = require('../globals/functions');

const { tasklog, faillog } = functions;

const run = () => {
  shell.rm('-rf', 'dist');
  shell.rm('-rf', ' static/css');
  shell.rm('-rf', ' static/scripts');
  tasklog('Distribution directories deleted...');
};

const failed = () => {
  shell.rm('-rf', 'dist');
  shell.rm('-rf', ' static/css');
  shell.rm('-rf', ' static/scripts');
  faillog('BUILD FAILED. Deleting distrubution directory...');
};

module.exports = {
  run,
  failed,
};
