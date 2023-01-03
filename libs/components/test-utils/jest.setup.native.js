import { Animated } from 'react-native';

require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests();

console.warn = () => {};

Animated.timing = () => ({
  start: () => jest.fn(),
});
