const isProduction = process.env.NODE_ENV === 'production';
const baseUrl = isProduction ? '/react-native-starter/proxym-rn-design-system/' : '/';
module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-essentials', 'storybook-addon-mock/register'],
  features: {
    storyStoreV7: true,
  },
  webpackFinal: config => {
    // Default rule for images /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/
    const fileLoaderRule = config.module.rules.find(rule => rule.test && rule.test.test('.svg'));
    fileLoaderRule.exclude = /\.svg$/;
    config.module.rules.push({
      test: /\.svg$/,
      enforce: 'pre',
      loader: require.resolve('@karankalsi/react-native-svg-loader')
    });

    return {...config, output: { ...config.output, publicPath: baseUrl } };
    },
  docs: {
    autodocs: true
  }
};
