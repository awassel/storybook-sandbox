const path = require('path');
const fs = require('fs-extra');
const transformUMD = require('./helpers/transformUMD');
const glob = require('./helpers/glob');
const paths = require('../globals/paths');
const functions = require('../globals/functions');

const { BUILD_DIR } = paths;
const { filelog, createDirectory, getFilename, getFilepath } = functions;

const DIST_DIR = path.join(BUILD_DIR, 'umd');

const compileSingular = (filePath) => {
  const patharray = getFilepath(filePath).split('/').splice(2).join('/');
  const dirname = path.resolve(DIST_DIR, patharray);
  const file = path.resolve(dirname, getFilename(filePath));
  const js = fs.readFileSync(filePath, { encoding: 'utf8' });
  const transformJs = transformUMD(js);

  createDirectory(dirname);

  // ensure original is safe
  fs.ensureFileSync(file);

  // file has now been created, including the directory it is to be placed in
  fs.writeFileSync(file, transformJs, { encoding: 'utf8' });

  // log completion
  filelog('UMD JavaScript', file, 'transpiled');
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
