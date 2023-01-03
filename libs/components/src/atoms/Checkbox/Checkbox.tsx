import { styled } from '@proxym/themes';
import { rgba } from 'polished';
import React, { memo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { TestIDType } from '../../types';
import { CheckBoldIcon } from '../Icons';

export type PropsType = {
  isChecked?: boolean;
  onPress?: () => void;
  size?: number;
  style?: StyleProp<ViewStyle>;
} & TestIDType;

export const Checkbox = ({
  isChecked,
  onPress,
  size = 20,
  style,
  testID,
}: PropsType) => {
  return (
    <Container
      size={size}
      isChecked={isChecked}
      style={style}
      onPress={onPress}
      disabled={!!onPress}
      testID={testID}
    >
      {!!isChecked && <CheckboxIcon />}
    </Container>
  );
};

type StyledCommonType = {
  size: number;
  isChecked?: boolean;
};

const Container = styled.TouchableOpacity<StyledCommonType>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  border-radius: ${({ size }) => size / 2}px;
  background-color: ${({ theme, isChecked }) =>
    isChecked ? theme.ds.colors.primary : rgba(theme.ds.colors.dark, 0.8)};
  border-color: ${({ theme, isChecked }) =>
    isChecked ? theme.ds.colors.primary : theme.ds.colors.light};
  justify-content: center;
  align-items: center;
`;

const CheckboxIcon = styled(CheckBoldIcon).attrs(({ theme }) => ({
  fill: theme.ds.colors.light,
  width: theme.ds.iconSize.small,
  height: theme.ds.iconSize.small,
}))``;

export default memo(Checkbox);
