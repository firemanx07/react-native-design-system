import { styled } from '@proxym/themes';
import React, { memo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { TestIDType } from '../../types';
import { CheckDisabledIcon, CheckIcon } from '../Icons';

export type PropsType = {
  isChecked?: boolean;
  onPress?: () => void;
  size?: number;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
} & TestIDType;

const BORDER_RADUIS_RATIO = 0.31;
export const Checkbox = ({
  isChecked,
  onPress,
  size = 20,
  style,
  testID,
  disabled,
}: PropsType) => {
  return (
    <Container
      size={size}
      isChecked={isChecked}
      style={style}
      onPress={onPress}
      disabled={!!disabled || !onPress}
      testID={testID}
    >
      {!disabled ? (
        (!!isChecked && <CheckboxIcon />) || <EmptyCheckboxIcon size={size} />
      ) : (
        <CheckboxDisabledIcon />
      )}
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
  justify-content: center;
  align-items: center;
`;
const EmptyCheckboxIcon = styled.View<StyledCommonType>`
  border-width: 2px;
  height: 100%;
  width: 100%;
  border-radius: ${({ size }) => size * BORDER_RADUIS_RATIO}px;
  border-color: ${({ theme }) => theme.ds.colors.grayDark};
`;

const CheckboxIcon = styled(CheckIcon).attrs<StyledCommonType>(({ theme }) => ({
  fill: theme.ds.colors.secondary,
  height: '100%',
  width: '100%',
}))``;
const CheckboxDisabledIcon = styled(CheckDisabledIcon).attrs(({ theme }) => ({
  fill: theme.ds.colors.grayDark,
  height: '100%',
  width: '100%',
}))``;

export default memo(Checkbox);
