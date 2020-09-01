const path = require('path');
const fs = require('fs-extra');
const transformEs6 = require('./helpers/transformEs6');
const glob = require('./helpers/glob');
const paths = require('../globals/paths');
const functions = require('../globals/functions');

const { BUILD_DIR } = paths;
const { filelog, createDirectory, getFilepath, getFilename } = functions;

const DIST_DIR = path.join(BUILD_DIR, 'es');

const compileSingular = (filePath) => {
  const patharray = getFilepath(filePath).split('/').splice(2).join('/');
  const dirname = path.resolve(DIST_DIR, patharray);
  const file = path.resolve(dirname, getFilename(filePath));
  const js = fs.readFileSync(filePath, { encoding: 'utf8' });
  const transformJs = transformEs6(js);

  createDirectory(dirname);

  // ensure original is safe
  fs.ensureFileSync(file);

  // file has now been created, including the directory it is to be placed in
  fs.writeFileSync(file, transformJs, { encoding: 'utf8' });

  // log completion
  filelog('ES6 JavaScript', file, 'transpiled');
};

const compile = () => {
  const files = glob.files();

  if (files.length) {
    // confirm our directory is avaible
    createDirectory(DIST_DIR);

    files.map((filePath) => {
      compileSingular(filePath);
      return null;
    });
  }
};

module.exports = {
  compileSingular,
  compile,
};
