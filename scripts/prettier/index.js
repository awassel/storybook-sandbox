const shell = require('shelljs');
const functions = require('../globals/functions');

const { tasklog } = functions;

const run = () => {
  shell.exec('npm run prettier');
  tasklog('Prettier formatting complete...');
};

module.exports = {
  run,
};
