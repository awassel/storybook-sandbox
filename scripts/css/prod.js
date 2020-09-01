const config = require('./config');

const compile = () => {
  config.compile({
    prod: true,
  });
};

const compileSingular = (filepath) => {
  config.compile({
    prod: true,
    single: filepath,
  });
};

const compileGlobals = () => {
  config.compileStyles({
    prod: true,
  });
  config.compileCritical({
    prod: true,
  });
};

module.exports = {
  compile,
  compileSingular,
  compileGlobals,
};
