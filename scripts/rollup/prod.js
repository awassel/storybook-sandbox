const path = require('path');
const config = require('./config');
const uglify = require('rollup-plugin-uglify');
const paths = require('../globals/paths');
const constants = require('../globals/constants');

const { BUILD_DIR } = paths;
const { LIBRARY_NAME, MINIMIZED_EXT } = constants;
const DIST_DIR = path.join(BUILD_DIR, 'scripts');

const compile = () => {
  config.compile({
    fileName: path.join(
      DIST_DIR,
      `${LIBRARY_NAME.toLowerCase()}.${MINIMIZED_EXT}.js`
    ),
    plugins: [uglify.uglify()],
  });
};

module.exports = {
  compile,
};
