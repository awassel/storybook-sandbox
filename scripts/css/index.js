const path = require('path');
const stylelint = require('stylelint');
const scss = require('../scss/index');
const css = require('./dev');
const cssMin = require('./prod');
const cssClean = require('./clean');
const paths = require('../globals/paths');
const functions = require('../globals/functions');
const clean = require('../clean/index');

const { SRC_DIR } = paths;
const { errorlog, tasklog } = functions;

const run = () => {
  scss.copy();
  cssClean.run();
  // run stylelint
  stylelint
    .lint({
      configFile: path.resolve(__dirname, '..', '..', '.stylelintrc'),
      files: [path.resolve(SRC_DIR, '**/*.scss')],
    })
    .then((data) => {
      if (data.errored) {
        const errored = JSON.parse(data.output).filter((x) => x.errored);
        errored.map((error) => {
          error.warnings.map((warning) => {
            errorlog(
              `Stylelint error on ${error.source} with warning: ${warning.text}.`
            );
          });
        });

        clean.failed();
        return;
      }

      tasklog('Stylelint passed. Looking good....');

      css.compile();
      css.compileGlobals();
      cssMin.compile();
      cssMin.compileGlobals();
    })
    .catch(function (err) {
      console.error(err.stack);
    });
};

module.exports = {
  run,
};
