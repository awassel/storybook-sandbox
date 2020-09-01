const globby = require('globby');

const files = (src = '') => {
  const glob = [
    './src/**/*.js',
    '!./src/**/*.stories.js',
    '!./src/globals/config/*.js',
  ];

  return globby.sync(glob, { onlyFiles: true, cwd: src });
};

module.exports = {
  files,
};
