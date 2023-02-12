import { styled } from '@proxym/themes';
import React from 'react';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const BASE_MARKER_SIZE = 15;
export enum SliderSize {
  XL = BASE_MARKER_SIZE * 4,
  L = BASE_MARKER_SIZE * 3,
  M = BASE_MARKER_SIZE * 2,
  S = BASE_MARKER_SIZE,
}
export interface SliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  width?: number;
  size?: SliderSize;
}

const Slider = ({
  min,
  max,
  onChange,
  width = 300,
  size = BASE_MARKER_SIZE,
}: SliderProps) => {
  const translationX = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startX: typeof translationX.value }
  >({
    onStart: (_, ctx) => {
      ctx.startX = translationX.value;
    },
    onActive: (event, ctx) => {
      translationX.value = interpolate(
        ctx.startX + event.translationX,
        [0, width - size],
        [0, width - size],
        Extrapolate.CLAMP,
      );
    },
    onEnd: () => {
      const newValue = interpolate(
        translationX.value,
        [0, width - size], // subtract marker width
        [min, max],
        Extrapolate.CLAMP,
      );
      onChange(newValue);
      translationX.value = withSpring(
        interpolate(
          newValue,
          [min, max],
          [0, width - size], // subtract marker width
          Extrapolate.CLAMP,
        ),
        { overshootClamping: true },
      );
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translationX.value }],
    };
  });
  const trackStyle = useAnimatedStyle(() => {
    const trackWidth = interpolate(
      translationX.value,
      [0, width],
      [size, width + size / 2],
      Extrapolate.CLAMP,
    );

    return {
      width: trackWidth,
    };
  });

  return (
    <SliderContainer style={{ width }} size={size}>
      <Tracker style={trackStyle} size={size} />
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Marker style={[animatedStyle]} size={size}>
          <MarkerCircle size={size} />
        </Marker>
      </PanGestureHandler>
    </SliderContainer>
  );
};

type SliderCommonProps = {
  size?: SliderSize;
};
const SliderContainer = styled.View<SliderCommonProps>`
  height: ${({ size = SliderSize.S }) => (size * 2) / 3}px;
  background-color: ${({ theme }) => theme.ds.colors.grayDark};
  border-radius: ${({ size = SliderSize.S }) => (size * 2) / 6}px;
  margin-vertical: 10px;
  overflow: visible;
  justify-content: center;
`;

const Tracker = styled(Animated.View)<SliderCommonProps>`
  position: absolute;
  height: ${({ size = SliderSize.S }) => (size * 2) / 3}px;
  border-radius: ${({ size = SliderSize.S }) => (size * 2) / 6}px;
  background-color: ${({ theme }) => theme.ds.colors.secondary};
`;
const Marker = styled(Animated.View)<SliderCommonProps>`
  width: ${({ size = SliderSize.S }) => size}px;
  height: ${({ size = SliderSize.S }) => size}px;
  border-radius: ${({ size = SliderSize.S }) => size / 2}px;
  background-color: ${({ theme }) => theme.ds.colors.light};
  align-items: center;
  justify-content: center;
  shadow-color: ${({ theme }) => theme.ds.colors.secondary};
  shadow-opacity: 0.2;
  shadow-radius: 10px;
  elevation: ${3};
  shadow-offset: {
    width: 0;
    height: 3px;
  }
`;
const MarkerCircle = styled.View<SliderCommonProps>`
  height: ${({ size = SliderSize.S }) => (size * 2) / 3}px;
  width:  ${({ size = SliderSize.S }) => (size * 2) / 3}px;
  border-radius: ${({ size = SliderSize.S }) => (size * 2) / 6}px;
  background-color: ${({ theme }) => theme.ds.colors.secondary}};
`;

export default Slider;
