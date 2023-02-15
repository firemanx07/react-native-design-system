import { styled, useNamespacedTheme } from '@proxym/themes';
import React, { memo, ReactNode, useMemo } from 'react';
import { StyleProp, ViewStyle, TextProps, TextStyle } from 'react-native';

import { TestIDType } from '../../types';
import { BaseText, TextVariant, TextWeight } from '../BaseText';

export enum BadgeSize {
  Regular = 24,
  Medium = 20,
  Small = 18,
}

export enum BadgeVariant {
  Rounded = 'Rounded',
  Square = 'Square',
  ArrowDown = 'ArrowDown',
}

export type PropsType = {
  children: TextProps['children'];
  variant?: BadgeVariant;
  size?: BadgeSize;
  renderIconLeft?: (size: number, color: string) => ReactNode;
  style?: StyleProp<ViewStyle>;
  contentColor?: string;
  textStyle?: StyleProp<TextStyle>;
} & TestIDType;

export const Badge = ({
  size = BadgeSize.Regular,
  variant = BadgeVariant.Rounded,
  children,
  style,
  renderIconLeft,
  contentColor,
  textStyle,
  testID,
}: PropsType) => {
  const { colors, iconSize } = useNamespacedTheme();
  const badgeContentColor = contentColor || colors.light;

  const textProps = useMemo(() => {
    switch (size) {
      case BadgeSize.Small:
        return {
          variant: TextVariant.XS,
          weight: TextWeight.ExtraBold,
        };
      case BadgeSize.Medium:
        return {
          variant: TextVariant.S,
          weight: TextWeight.Bold,
        };
      case BadgeSize.Regular:
      default:
        return {
          variant: TextVariant.M,
          weight: TextWeight.Bold,
        };
    }
  }, [size]);

  const borderRadius = useMemo(() => {
    switch (variant) {
      case BadgeVariant.Rounded:
        return size / 2;
      case BadgeVariant.Square:
      default:
        return 7;
    }
  }, [variant, size]);

  return (
    <Container
      size={size}
      borderRadius={borderRadius}
      style={style}
      testID={testID}
    >
      {!!renderIconLeft && (
        <IconWrapper>
          {renderIconLeft(iconSize.small, badgeContentColor)}
        </IconWrapper>
      )}
      <BadgeText color={badgeContentColor} {...textProps} style={textStyle}>
        {children}
      </BadgeText>
      {variant === BadgeVariant.ArrowDown && <ArrowDown style={style} />}
    </Container>
  );
};

type ContainerType = {
  size: BadgeSize;
  borderRadius: number;
};

const Container = styled.View<ContainerType>`
  height: ${({ size }) => size}px;
  min-width: ${({ size }) => size}px;
  border-radius: ${({ borderRadius }) => borderRadius}px;
  background-color: ${({ theme }) => theme.ds.colors.primary};
  justify-content: center;
  align-items: center;
  flex-direction: row;
  align-self: flex-start;
  padding: ${({ theme }) =>
    `${theme.ds.spacing.tiny}px ${theme.ds.spacing.small}px`};
`;

type BadgeTextType = {
  color?: string;
};

export const BadgeText = styled(BaseText)<BadgeTextType>`
  color: ${({ color }) => color};
`;

const IconWrapper = styled.View`
  padding-right: ${({ theme }) => theme.ds.spacing.tiny}px;
`;
const ArrowDown = styled.View<BadgeTextType>`
  width: 10px;
  height: 10px;
  background-color: ${({ theme }) => theme.ds.colors.primary};
  position: absolute;
  bottom: -4px;
  transform: rotate(45deg);
  border-radius: 2px;
  z-index: -1;
`;
export default memo(Badge);
