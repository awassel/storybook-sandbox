const config = require('./config');

const compile = () => {
  config.compile();
};

const compileSingular = (filepath) => {
  config.compile({
    single: filepath,
  });
};

const compileGlobals = () => {
  config.compileStyles();
  config.compileCritical();
};

module.exports = {
  compile,
  compileSingular,
  compileGlobals,
};
