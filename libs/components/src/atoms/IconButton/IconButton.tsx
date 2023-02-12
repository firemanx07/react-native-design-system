import { styled, useNamespacedTheme } from '@proxym/themes';
import { rgba } from 'polished';
import React, { memo, ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { TestIDType } from '../../types';

export type PropsType = {
  renderIcon: (size: number, color: string) => ReactNode;
  onPress: () => void;
  size?: number;
  iconSize?: number;
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
  testID,
}: PropsType) => {
  const { iconSize: themeIconSize, colors } = useNamespacedTheme();
  const iconSize = propsIconSize || themeIconSize.primary;
  const iconColor = disabled ? rgba(colors.dark, 0.3) : colors.dark;

  return (
    <Container
      onPress={onPress}
      disabled={disabled}
      size={size}
      style={style}
      testID={testID}
    >
      {renderIcon(iconSize, iconColor)}
    </Container>
  );
};

type ContainerType = {
  size: number;
};

const Container = styled.TouchableOpacity<ContainerType>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${7}px;
  background-color: ${({ theme }) => rgba(theme.ds.colors.primaryLight, 0.06)};
  justify-content: center;
  align-items: center;
`;

export default memo(IconButton);
