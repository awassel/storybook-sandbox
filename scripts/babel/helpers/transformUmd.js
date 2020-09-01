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
      '@babel/plugin-transform-modules-umd',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-class-properties',
    ],
  });

  return babelified.code;
};
