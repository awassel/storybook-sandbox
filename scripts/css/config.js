const path = require('path');
const globby = require('globby');
const fs = require('fs-extra');
const sass = require('node-sass');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const paths = require('../globals/paths');
const functions = require('../globals/functions');
const constants = require('../globals/constants');

const { LIBRARY_NAME, MINIMIZED_EXT } = constants;
const { GLOBALS_DIR, BUILD_DIR, COMPONENTS_DIR } = paths;
const { filelog, getFilepath, createDirectory } = functions;
const CSS_DIR = path.resolve(BUILD_DIR, 'css');

const write = (options) => {
  // render the result
  const result = sass.renderSync({
    file: options.src,
    outputStyle: options.style,
    data: `$env:production;${fs.readFileSync(options.src)}`,
  });

  const filepath = getFilepath(options.dest);

  // write the result to file
  createDirectory(filepath);

  // write out uncompiled file
  fs.writeFileSync(options.dest, result.css);

  // ensure uncompiled file was created
  const css = fs.readFileSync(options.dest);

  // run synchronously
  const compiledCSS = postcss([autoprefixer]).process(css, {
    from: options.dest,
    to: options.dest,
  }).css;

  // write out compiled CSS file
  fs.writeFileSync(options.dest, compiledCSS);

  // log successful compilation to terminal
  filelog('CSS', options.dest, 'compiled');
};

const compile = (opts) => {
  const scss = globby.sync(
    [
      path.resolve(COMPONENTS_DIR, '**/*.scss'),
      `!${path.resolve(COMPONENTS_DIR, '**/_*.scss')}`,
    ],
    { onlyFiles: true }
  );

  const defaultopts = {
    files: [
      {
        src: path.resolve(GLOBALS_DIR, 'scss', 'styles.scss'),
        dest: path.resolve(
          CSS_DIR,
          `${LIBRARY_NAME.toLowerCase()}${
            opts && opts.prod ? `.${MINIMIZED_EXT}` : ''
          }.css`
        ),
      },
    ],
    style: opts && opts.prod ? 'compressed' : 'expanded',
  };

  if (scss && opts && !opts.single) {
    scss.map((file) => {
      const filename = path.parse(file).name;
      const patharray = getFilepath(file).split('/');
      const dirname = patharray[patharray.length - 1];

      defaultopts.files.push({
        src: path.resolve(COMPONENTS_DIR, dirname, `${filename}.scss`),
        dest: path.resolve(
          CSS_DIR,
          'components',
          `component-${filename}${
            opts && opts.prod ? `.${MINIMIZED_EXT}` : ''
          }.css`
        ),
      });
    });
  }

  if (opts && opts.single) {
    const filename = path.parse(opts.single).name;
    const patharray = getFilepath(opts.single).split('/');
    const dirname = patharray[patharray.length - 1];

    if (
      filename !== 'critical' &&
      filename !== 'BDNCoveoFullSearch' &&
      filename !== 'BDNForms' &&
      filename !== 'styles'
    ) {
      defaultopts.files.push({
        src: path.resolve(COMPONENTS_DIR, dirname, `${filename}.scss`),
        dest: path.resolve(
          CSS_DIR,
          'components',
          `component-${filename}${
            opts && opts.prod ? `.${MINIMIZED_EXT}` : ''
          }.css`
        ),
      });
    }
  }

  // set default options
  const options = {
    ...defaultopts,
    ...opts,
  };

  options.files.map((file) => {
    const fileoptions = {
      src: file.src,
      dest: file.dest,
      ...options,
    };

    write(fileoptions);
    return null;
  });
};

const compileStyles = (opts) => {
  const critical = path.resolve(GLOBALS_DIR, 'scss', 'styles.scss');

  if (fs.existsSync(critical)) {
    write({
      style: opts && opts.prod ? 'compressed' : 'expanded',
      src: path.resolve(GLOBALS_DIR, 'scss', 'styles.scss'),
      dest: path.resolve(
        CSS_DIR,
        `${LIBRARY_NAME.toLowerCase()}${
          opts && opts.prod ? `.${MINIMIZED_EXT}` : ''
        }.css`
      ),
    });
  }

  return;
};

const compileCritical = (opts) => {
  const critical = path.resolve(GLOBALS_DIR, 'scss', 'critical.scss');

  if (fs.existsSync(critical)) {
    write({
      style: opts && opts.prod ? 'compressed' : 'expanded',
      src: path.resolve(GLOBALS_DIR, 'scss', 'critical.scss'),
      dest: path.resolve(
        CSS_DIR,
        `${LIBRARY_NAME.toLowerCase()}-critical${
          opts && opts.prod ? `.${MINIMIZED_EXT}` : ''
        }.css`
      ),
    });
  }

  return;
};

module.exports = {
  compile,
  compileStyles,
  compileCritical,
};
