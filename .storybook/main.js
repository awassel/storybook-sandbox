const path = require('path');
const autoprefixer = require('autoprefixer');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  stories: [
    '../docs/**/*.stories.mdx',
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [autoprefixer],
          },
        },
        {
          loader: 'sass-loader',
        },
      ],
    });

    config.plugins.push(
      new StyleLintPlugin({
        configFile: path.resolve(__dirname, '..', '.stylelintrc'),
      })
    );

    return config;
  },
};
