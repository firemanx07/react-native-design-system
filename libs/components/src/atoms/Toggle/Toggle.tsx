import { useNamespacedTheme, styled } from '@proxym/themes';
import React, { memo, useMemo, useCallback, useState } from 'react';
import { StyleProp, ViewStyle, Animated } from 'react-native';

import { TestIDType } from '../../types';

export type PropsType = {
  isActive: boolean;
  onPress: (isActive: boolean) => void;
  disabled?: boolean;
  secondary?: boolean;
  size?: number;
  style?: StyleProp<ViewStyle>;
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
}: PropsType) => {
  const { iconSize, spacing, colors } = useNamespacedTheme();
  const [isActive, setIsActive] = useState<boolean>(isActiveInitial);
  const toggleSize = size || iconSize.primary;
  const toggleSpacing = spacing.tiny / 2;
  const toggleRightPosition = toggleSize - toggleSpacing * 2;
  const startPosition = isActive ? toggleRightPosition : 0;
  const endPosition = isActive ? 0 : toggleRightPosition;

  const containerWidth = toggleSize * 2;
  const containerHeight = toggleSize + toggleSpacing * 2;

  const translateX = new Animated.Value(startPosition);

  const handleToggle = useCallback(() => {
    Animated.timing(translateX, {
      toValue: endPosition,
      useNativeDriver: true,
      duration: TOGGLE_DURATION,
    }).start(() => {
      setIsActive((prev) => {
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
      return colors.primary;
    }
    return colors.graySoft;
  }, [colors, isActive, disabled]);

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
  padding: ${({ spacing }) => spacing}px;
`;

type ToggleBulletType = {
  size: number;
  secondary?: boolean;
};

const ToggleBullet = styled(Animated.View)<ToggleBulletType>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ size }) => size / 2}px;
  elevation: 2;
  shadow-offset: 0 2px;
  shadow-color: ${({ theme }) => theme.ds.colors.dark};
  shadow-opacity: 0.1;
  background-color: ${({ theme, secondary }) =>
    secondary ? theme.ds.colors.grayLight : theme.ds.colors.light};
`;

export default memo(Toggle);
