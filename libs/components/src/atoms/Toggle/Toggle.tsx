import { ColorType, styled, useNamespacedTheme } from '@proxym/themes';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';

import { TestIDType } from '../../types';

export type PropsType = {
  isActive: boolean;
  onPress: (isActive: boolean) => void;
  disabled?: boolean;
  secondary?: boolean;
  size?: number;
  style?: StyleProp<ViewStyle>;
  inActiveColor?: ColorType;
} & TestIDType;

const TOGGLE_DURATION = 150;

export const Toggle = ({
  isActive: isActiveInitial = false,
  onPress,
  disabled,
  secondary,
  size,
  style,
  testID,
  inActiveColor,
}: PropsType) => {
  const { iconSize, spacing, colors } = useNamespacedTheme();
  const [isActive, setIsActive] = useState<boolean>(isActiveInitial);
  const toggleSize = size || iconSize.primary;
  const toggleSpacing = (toggleSize * spacing.small) / iconSize.primary;
  const toggleRightPosition = toggleSize * 1.75 - toggleSpacing;
  const startPosition = isActive ? toggleRightPosition : 0;
  const endPosition = isActive ? 0 : toggleRightPosition;

  const containerWidth = toggleSize * 2.5 + toggleSpacing;
  const containerHeight = toggleSize + toggleSpacing;

  const translateX = new Animated.Value(startPosition);

  const handleToggle = useCallback(() => {
    Animated.timing(translateX, {
      toValue: endPosition,
      useNativeDriver: true,
      duration: TOGGLE_DURATION,
    }).start(() => {
      setIsActive(prev => {
        const newActiveState = !prev;
        onPress(newActiveState);
        return newActiveState;
      });
    });
  }, [endPosition, onPress, isActive, setIsActive, translateX]);

  const toggleBackgroundColor = useMemo(() => {
    if (disabled) {
      return colors.grayLight;
    }
    if (isActive) {
      return secondary ? colors.secondary : colors.primary;
    }
    return inActiveColor ?? colors.graySoft;
  }, [colors, isActive, inActiveColor, disabled, secondary]);

  return (
    <Container
      width={containerWidth}
      height={containerHeight}
      spacing={toggleSpacing}
      backgroundColor={toggleBackgroundColor}
      onPress={handleToggle}
      style={style}
      disabled={disabled}
      activeOpacity={1}
      testID={testID}
    >
      <ToggleBullet
        size={toggleSize}
        secondary={secondary}
        style={[
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </Container>
  );
};

type ContainerType = {
  width: number;
  height: number;
  spacing: number;
  backgroundColor: string;
};

const Container = styled.TouchableOpacity<ContainerType>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  border-radius: ${({ height }) => height / 2}px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: ${({ spacing }) => spacing / 2}px;
`;

type ToggleBulletType = {
  size: number;
  secondary?: boolean;
};

const ToggleBullet = styled(Animated.View)<ToggleBulletType>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ size }) => size / 2}px;
  elevation: ${2};
  shadow-offset: 0 2px;
  shadow-color: ${({ theme }) => theme.ds.colors.dark};
  shadow-opacity: 0.1;
  background-color: ${({ theme }) => theme.ds.colors.light};
`;

export default memo(Toggle);
