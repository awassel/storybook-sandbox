const rollupClean = require('./rollup/clean');
const rollup = require('./rollup/dev');
const rollupMin = require('./rollup/prod');
const babelClean = require('./babel/clean');
const es = require('./babel/es');
const umd = require('./babel/umd');
const webpackClean = require('./webpack/clean');
const webpack = require('./webpack/config');

rollupClean.run();
rollup.compile();
rollupMin.compile();
babelClean.run();
es.compile();
umd.compile();
webpackClean.run();
webpack.compile();
