const { resolve } = require('path');
const { withUnimodules } = require('@expo/webpack-config/addons');

module.exports = ({ config }) => {
  return withUnimodules(config, {
    projectRoot: resolve(__dirname, '../'),
    babel: {
      dangerouslyAddModulePathsToTranspile: [
        // Ensure that all packages starting with @celebrate-app are transpiled.
        '@celebrate-app',
      ],
    },
    module: {
      rules: [
        {
          test: /\.ttf$/,
          loader: "url-loader",
          include: resolve(__dirname, "../src/assets/fonts"),
        },
      ]
    }
  });
};
