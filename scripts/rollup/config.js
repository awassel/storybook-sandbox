const path = require('path');
const rollup = require('rollup');
const globals = require('rollup-plugin-node-globals');
const cjs = require('@rollup/plugin-commonjs');
const constants = require('../globals/constants');
const functions = require('../globals/functions');
const paths = require('../globals/paths');
const { babel } = require('@rollup/plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');

const { LIBRARY_NAME } = constants;
const { BUILD_DIR, GLOBALS_DIR } = paths;
const { filelog } = functions;
const DIST_DIR = path.resolve(BUILD_DIR, 'scripts');

const build = async (inputOptions, outputOptions) => {
  // create a bundle
  const bundle = await rollup.rollup(inputOptions);

  // generate code
  const { output } = await bundle.generate(outputOptions);

  // or write the bundle to disk
  await bundle.write(outputOptions);

  filelog('JavaScript', outputOptions.file, 'compiled');
};

/**
 * Input / Output Options
 * @@ https://rollupjs.org/guide/en#rollup-rollup
 */

const compile = (opts = {}) => {
  // set default options
  const options = {
    fileName: path.join(DIST_DIR, `${LIBRARY_NAME.toLowerCase()}.js`),
    plugins: [],
    ...opts,
  };

  // create plugins
  const plugins = [
    nodeResolve(),
    cjs({
      include: 'node_modules/**',
      sourceMap: false,
    }),
    babel({
      exclude: ['node_modules/**', '**/*.stories.js'],
      ignore: ['**/*.scss'],
      babelHelpers: 'bundled',
    }),
    globals(),
  ];

  // set default options
  const inputOptions = {
    input: path.resolve(GLOBALS_DIR, 'js', 'bundle.js'),
    plugins: [...plugins, ...options.plugins],
  };

  const outputOptions = {
    file: options.fileName,
    format: 'iife',
    name: `${LIBRARY_NAME}`,
    sourcemap: false,
  };

  build(inputOptions, outputOptions);
};

module.exports = {
  compile,
};
