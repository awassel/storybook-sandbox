const path = require('path');
const fs = require('fs-extra');
const globby = require('globby');
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
const DIST_DIR = path.resolve(BUILD_DIR, 'html');

const copySingluar = (filePath) => {
  const patharray = getFilepath(filePath).split('/').splice(3).join('/');
  const dirname = path.resolve(DIST_DIR, patharray);
  const file = path.resolve(dirname, getFilename(filePath));

  createDirectory(dirname);
  fs.copyFileSync(filePath, file);
  filelog('HTML', getFilename(filePath), `copied`);
};

const copy = () => {
  const files = globby.sync(['./src/components/**/*.html'], {
    onlyFiles: true,
  });

  if (files) {
    // confirm our directory is avaible
    createDirectory(DIST_DIR);

    files.map((filePath) => {
      copySingluar(filePath);
      return null;
    });

    tasklog('HTML files copied...');
  }
};

module.exports = {
  copySingluar,
  copy,
};
