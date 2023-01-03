import { styled, useNamespacedTheme } from '@proxym/themes';
import React, { memo, ReactNode } from 'react';
import { ViewStyle, StyleProp, TextProps } from 'react-native';

import {
  Badge,
  BadgeVariant,
  BaseText,
  ForwardIcon,
  TextVariant,
  TextWeight,
} from '../../atoms';
import { TestIDType } from '../../types';

export type PropsType = {
  children: TextProps['children'];
  style?: StyleProp<ViewStyle>;
  renderIconLeft?: (size: number, color: string) => ReactNode;
  hasArrow?: boolean;
  notifications?: number;
} & TestIDType;

export const ListItem = ({
  style,
  renderIconLeft,
  hasArrow,
  notifications,
  children,
  testID,
}: PropsType) => {
  const { colors, iconSize } = useNamespacedTheme();

  return (
    <Container style={style} testID={testID}>
      {!!renderIconLeft && (
        <IconLeftWrapper>
          {renderIconLeft(iconSize.primary, colors.dark)}
        </IconLeftWrapper>
      )}
      <TextWrapper>
        <BaseText
          variant={TextVariant.L}
          weight={TextWeight.SemiBold}
          numberOfLines={2}
        >
          {children}
        </BaseText>
      </TextWrapper>
      {!!notifications && (
        <NotificationsBadge variant={BadgeVariant.Rounded} hasArrow={hasArrow}>
          {notifications}
        </NotificationsBadge>
      )}
      {hasArrow && (
        <ForwardIcon
          width={iconSize.medium}
          height={iconSize.medium}
          fill={colors.dark}
        />
      )}
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.ds.colors.light};
  padding-horizontal: ${({ theme }) => theme.ds.spacing.primary}px;
  min-height: 48px;
`;

const IconLeftWrapper = styled.View`
  padding-left: ${({ theme }) => theme.ds.spacing.tiny}px;
  padding-right: ${({ theme }) => theme.ds.spacing.primarySmall}px;
`;

const TextWrapper = styled.View`
  flex: 1;
`;

type NotificationBadgeType = {
  hasArrow?: boolean;
};

const NotificationsBadge = styled(Badge)<NotificationBadgeType>`
  margin-left: ${({ theme }) => theme.ds.spacing.primary}px;
  margin-right: ${({ theme, hasArrow }) =>
    hasArrow ? theme.ds.spacing.primary : theme.ds.spacing.small}px;
  align-self: center;
`;

export default memo(ListItem);
