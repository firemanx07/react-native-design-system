module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-essentials', 'storybook-addon-mock/register'],
  webpackFinal: config => {
    // Default rule for images /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/
    const fileLoaderRule = config.module.rules.find(
      rule => rule.test && rule.test.test('.svg'),
    );
    fileLoaderRule.exclude = /\.svg$/;

    config.module.rules.push({
      test: /\.svg$/,
      enforce: 'pre',
      loader: require.resolve('@karankalsi/react-native-svg-loader'),
    });

    return config;
  },
};
