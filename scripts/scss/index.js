const fs = require('fs-extra');
const globby = require('globby');
const path = require('path');
const paths = require('../globals/paths');
const functions = require('../globals/functions');

const { BUILD_DIR } = paths;
const {
  filelog,
  getFilename,
  getFilepath,
  createDirectory,
  tasklog,
} = functions;
const DIST_DIR = path.resolve(BUILD_DIR, 'scss');

const copySingular = (filePath, directory) => {
  const dir = directory || DIST_DIR;
  const patharray = getFilepath(filePath).split('/').splice(2).join('/');
  const dirname = path.resolve(dir, patharray);
  const file = path.resolve(dirname, getFilename(filePath));

  createDirectory(dirname);

  fs.copyFileSync(filePath, file);

  filelog('Sass', getFilename(filePath), `copied`);
};

const copy = () => {
  const files = globby.sync(['./src/**/*.scss'], { onlyFiles: true });

  if (files.length) {
    // confirm our directory is avaible
    createDirectory(DIST_DIR);

    files.map((filePath) => {
      copySingular(filePath);
      return null;
    });

    tasklog('Sass files copied...');
  }
};

module.exports = {
  copySingular,
  copy,
};
