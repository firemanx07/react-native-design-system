const { resolve } = require('path');
const { withUnimodules } = require('@expo/webpack-config/addons');

module.exports = ({ config }) => {
  return withUnimodules(
    { ...config,
      output: {
        publicPath: '/react-native-starter/proxym-rn-design-system/',
      } },
    {
      projectRoot: resolve(__dirname, '../'),
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
    },
  );
};
