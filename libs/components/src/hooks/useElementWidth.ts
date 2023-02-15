import { createRef, RefObject, useCallback, useState } from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

export const useElementWidth = <T extends View | Animated.View>(): [
  RefObject<T>,
  () => void,
  number,
] => {
  const [elementWidth, setElementWidth] = useState(0);
  const ref = createRef<T>();

  const measureWidth = useCallback(() => {
    if (ref.current) {
      ref.current?.measure((_x, _y, width) => {
        setElementWidth(width);
      });
    }
  }, [ref]);

  return [ref, measureWidth, elementWidth];
};
