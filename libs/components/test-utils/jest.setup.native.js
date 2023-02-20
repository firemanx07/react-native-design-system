import { Animated } from 'react-native';

require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests();
require('react-native-gesture-handler/jestSetup.js');

console.warn = () => {
  //this is mock
};

Animated['timing'] = () => ({
  start: () => jest.fn(),
});
