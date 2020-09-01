const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..', '..');
const SRC_DIR = path.resolve(ROOT_DIR, 'src');
const DOCS_DIR = path.resolve(ROOT_DIR, 'docs');
const COMPONENTS_DIR = path.resolve(SRC_DIR, 'components');
const GLOBALS_DIR = path.resolve(SRC_DIR, 'globals');
const BUILD_DIR = path.resolve(ROOT_DIR, 'dist');
const STATIC_DIR = path.resolve(ROOT_DIR, 'static');

module.exports = {
  ROOT_DIR,
  SRC_DIR,
  DOCS_DIR,
  COMPONENTS_DIR,
  GLOBALS_DIR,
  BUILD_DIR,
  STATIC_DIR,
};
