import { styled } from '@proxym/themes';
import React, { useCallback, useMemo, useState } from 'react';
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

import { Badge, BadgeSize, BadgeVariant } from '../../atoms/Badge';
import { BaseText } from '../../atoms/BaseText';
import { formatTo3Digits } from '../../helpers/format-utils';

const BASE_MARKER_SIZE = 15;
export enum SliderSize {
  XL = BASE_MARKER_SIZE * 4,
  L = BASE_MARKER_SIZE * 3,
  M = BASE_MARKER_SIZE * 2,
  S = BASE_MARKER_SIZE,
}
export interface SliderProps {
  initialValue: number;
  label?: string;
  max: number;
  min: number;
  onChange: (value: number) => void;
  size?: SliderSize;
  width?: number;
}

const Slider = ({
  min,
  max,
  initialValue = min,
  onChange,
  width = 300,
  size = BASE_MARKER_SIZE,
  label = '',
}: SliderProps) => {
  const translationX = useSharedValue(
    interpolate(initialValue, [min, max], [0, width - size], Extrapolate.CLAMP),
  );

  const [currentValue, setCurrentValue] = useState(initialValue);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onGestureEvent = useCallback(
    useAnimatedGestureHandler<
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
        const newValue = interpolate(
          translationX.value,
          [0, width - size], // subtract marker width
          [min, max],
          Extrapolate.CLAMP,
        );
        Math.round(newValue) !== currentValue &&
          setCurrentValue(Math.round(newValue));
      },
      onEnd: () => {
        const newValue = interpolate(
          translationX.value,
          [0, width - size], // subtract marker width
          [min, max],
          Extrapolate.CLAMP,
        );
        onChange(Math.round(newValue));
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
    }),
    [currentValue, max, min, onChange, size, translationX.value, width],
  );
  const memoizedGestureHandler = useMemo(
    () => onGestureEvent,
    [onGestureEvent],
  );
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translationX.value }],
    };
  });
  const animatedBadgeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translationX.value - width / 10 + size / 2 }],
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
    <RangeSelectorContainer>
      <PanGestureHandler onGestureEvent={memoizedGestureHandler}>
        <BadgeContainer style={animatedBadgeStyle}>
          <ArrowBadge
            variant={BadgeVariant.ArrowDown}
            size={BadgeSize.Regular}
            children={[formatTo3Digits(currentValue), label].join(' ')}
          />
        </BadgeContainer>
      </PanGestureHandler>
      <RangeTextContainer>
        <BaseText>{[formatTo3Digits(min), label].join(' ')}</BaseText>
        <BaseText>{[formatTo3Digits(max), label].join(' ')}</BaseText>
      </RangeTextContainer>
      <SliderContainer style={{ width }} size={size}>
        <Tracker style={trackStyle} size={size} />
        <PanGestureHandler onGestureEvent={memoizedGestureHandler}>
          <Marker style={[animatedStyle]} size={size}>
            <MarkerCircle size={size} />
          </Marker>
        </PanGestureHandler>
      </SliderContainer>
    </RangeSelectorContainer>
  );
};

type SliderCommonProps = {
  size?: SliderSize;
};
const SliderContainer = styled.View<SliderCommonProps>`
  height: ${({ size = SliderSize.S }) => (size * 2) / 3}px;
  background-color: ${({ theme }) => theme.ds.colors.grayDark};
  border-radius: ${({ size = SliderSize.S }) => (size * 2) / 6}px;

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
const ArrowBadge = styled(Badge)`
  background-color: ${({ theme }) => theme.ds.colors.secondary}};
`;
const MarkerCircle = styled.View<SliderCommonProps>`
  height: ${({ size = SliderSize.S }) => (size * 2) / 3}px;
  width:  ${({ size = SliderSize.S }) => (size * 2) / 3}px;
  border-radius: ${({ size = SliderSize.S }) => (size * 2) / 6}px;
  background-color: ${({ theme }) => theme.ds.colors.secondary}};
`;
const RangeSelectorContainer = styled.View``;
const RangeTextContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-vertical: 4px;
`;
const BadgeContainer = styled(Animated.View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  max-width: 20%;
`;

export default Slider;
