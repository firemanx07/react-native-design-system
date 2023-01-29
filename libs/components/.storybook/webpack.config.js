const { resolve } = require('path');
const { withUnimodules } = require('@expo/webpack-config/addons');

const isProduction = process.env.NODE_ENV === 'production';
const baseUrl = isProduction ? '/react-native-starter/proxym-rn-design-system/' : '/';

module.exports = ({ config }) => {
  return withUnimodules(config, {
    projectRoot: resolve(__dirname, '../'),
    publicPath: baseUrl,
    babel: {
      dangerouslyAddModulePathsToTranspile: [
        // Ensure that all packages starting with @proxym are transpiled.
        '@proxym',
      ],
    },
    module: {
      rules: [
        {
          test: /\.ttf$/,
          loader: 'url-loader',
          include: resolve(__dirname, '../src/assets/fonts'),
        },
      ],
    },
  });
};
