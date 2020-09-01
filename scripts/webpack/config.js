const path = require('path');
const webpack = require('webpack');
const functions = require('../globals/functions');
const paths = require('../globals/paths');

const { filelog, createDirectory } = functions;
const { GLOBALS_DIR, BUILD_DIR, ROOT_DIR } = paths;

const compile = () => {
  const DIST_DIR = path.resolve(BUILD_DIR, 'scripts', 'bundles');

  webpack(
    {
      // Configuration Object
      mode: 'production',
      entry: path.resolve(GLOBALS_DIR, 'js', 'bundle.js'),
      output: {
        filename: `[name].[hash].bundle.js`,
        path: DIST_DIR,
        publicPath: '',
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  configFile: path.resolve(ROOT_DIR, '.babelrc'),
                },
              },
              {
                loader: 'eslint-loader',
                options: {
                  configFile: path.resolve(ROOT_DIR, '.eslintrc'),
                },
              },
            ],
          },
        ],
      },
      optimization: {
        splitChunks: {
          chunks: 'all',
          minSize: 30000,
          maxSize: 0,
          minChunks: 1,
          maxAsyncRequests: 6,
          maxInitialRequests: 4,
          automaticNameMaxLength: 30,
          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      },
    },
    (err, stats) => {
      // Stats Object
      if (err || stats.hasErrors()) {
        // Handle errors here
        console.error(err);
      }

      // Done processing
      const files = Object.keys(stats.compilation.assets);
      if (files.length) {
        // create directory
        createDirectory(DIST_DIR);

        files.map((file) => {
          filelog('Webpack bundle', file, 'compiled');
          return null;
        });
      }
    }
  );
};

module.exports = {
  compile,
};
