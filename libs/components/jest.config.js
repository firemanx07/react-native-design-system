module.exports = {
  preset: 'react-native',
  // This config is not necessary for expo
  // transform: { '^.+\\.js$': require.resolve('react-native/jest/preprocessor.js') },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
  moduleNameMapper: {
    '^.+\\.(gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(jpg|jpeg|png)$': '<rootDir>/__mocks__/imageMock.js',
  },
  setupFilesAfterEnv: [
    './test-utils/jest.setup.native.js',
    '@testing-library/jest-native/extend-expect',
  ],
  modulePathIgnorePatterns: ['<rootDir>/lib/'],

  coveragePathIgnorePatterns: [],
};
