import { useNamespacedTheme } from '@proxym/themes';
import React, { useEffect, useCallback, memo } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

import { usePrevious } from '../../hooks';

type PropsType = {
  size: number;
  active: boolean;
  betweenSpace: number;
  animationDuration: number;
  scaleTo: number;
  color?: string;
};

const Circle = ({
  active,
  size,
  scaleTo,
  animationDuration,
  betweenSpace,
  color,
}: PropsType) => {
  const prevActive = usePrevious<boolean>(active);
  const theme = useNamespacedTheme();
  const animatedValue = useSharedValue(0);

  const scaleUp = useCallback(() => {
    animatedValue.value = withTiming(1, {
      duration: animationDuration,
    });
  }, [animatedValue, animationDuration]);

  const scaleDown = useCallback(() => {
    animatedValue.value = withTiming(0, {
      duration: animationDuration,
    });
  }, [animatedValue, animationDuration]);

  useEffect(() => {
    if (prevActive && !active) {
      scaleDown();
    }
    if (!prevActive && active) {
      scaleUp();
    }
  }, [prevActive, active, scaleUp, scaleDown]);

  const activeColor = color || theme.colors.dark;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(animatedValue.value, [0, 1], [0, scaleTo]),
        },
      ],
      opacity: interpolate(animatedValue.value, [0, 1], [0.5, 1]),
    };
  });

  const style = {
    height: size,
    width: size,
    borderRadius: size / 2,
    marginHorizontal: betweenSpace,
    backgroundColor: activeColor,
  };

  return <Animated.View style={[style, animatedStyle]} />;
};

export default memo(Circle);
