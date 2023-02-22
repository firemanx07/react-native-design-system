import { ColorType, styled, useNamespacedTheme } from '@proxym/themes';
import { rgba } from 'polished';
import React, { memo, ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { TestIDType } from '../../types';
import { ButtonShape } from '../BaseButton/BaseButton.types';

export type PropsType = {
  renderIcon: (size: number, color: string) => ReactNode;
  onPress: () => void;
  size?: number;
  shape?: ButtonShape;
  iconSize?: number;
  iconColor?: ColorType;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
} & TestIDType;

export const IconButton = ({
  renderIcon,
  disabled,
  onPress,
  style,
  size = 34,
  iconSize: propsIconSize,
  iconColor: propsIconColor = ColorType.primary,
  shape = ButtonShape.Square,
  testID,
}: PropsType) => {
  const { iconSize: themeIconSize, colors } = useNamespacedTheme();
  const iconSize = propsIconSize || themeIconSize.primary;
  const iconColor = disabled ? rgba(colors.dark, 0.3) : propsIconColor;

  return (
    <Container
      onPress={onPress}
      disabled={disabled}
      size={size}
      shape={shape}
      style={style}
      testID={testID}
    >
      {renderIcon(iconSize, iconColor)}
    </Container>
  );
};

type ContainerType = {
  size: number;
  shape: ButtonShape;
};

const Container = styled.TouchableOpacity<ContainerType>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ shape, size }) =>
    shape === ButtonShape.Square ? 7 : size / 2}px;
  background-color: ${({ theme }) => rgba(theme.ds.colors.primaryLight, 0.06)};
  justify-content: center;
  align-items: center;
`;

export default memo(IconButton);
