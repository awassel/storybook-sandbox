const { transform } = require('@babel/core');

module.exports = (fileAsString) => {
  const babelified = transform(fileAsString, {
    presets: [
      [
        '@babel/env',
        {
          modules: false,
        },
      ],
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-transform-async-to-generator',
      '@babel/plugin-transform-regenerator',
    ],
  });

  return babelified.code;
};
