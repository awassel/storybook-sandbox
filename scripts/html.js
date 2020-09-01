const htmlClean = require('./html/clean');
const html = require('./html/config');

htmlClean.run();
html.copy();
