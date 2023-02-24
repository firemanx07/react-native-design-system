import { styled, useNamespacedTheme } from '@proxym/themes';
import { rgba } from 'polished';
import React, { memo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { TestIDType } from '../../types';
import { Circle } from '../Circle';

export type RadioButtonProps = {
  value: string;
  selected: boolean;
  disabled?: boolean;
  size?: number;
  style?: StyleProp<ViewStyle>;
  onSelect: (value: string) => void;
} & TestIDType;

const BORDER_WIDTH = 2;
const RadioButton = ({
  value,
  selected,
  onSelect,
  size = 24,
  disabled,
  testID,
}: RadioButtonProps) => {
  const { colors, spacing, iconSize } = useNamespacedTheme();
  const INNER_CIRCLE_SIZE =
    size - (spacing.primarySmall * size) / iconSize.primary;
  const disabledStyle: ViewStyle = {
    borderColor: rgba(colors.grayDark, 0.1),
    backgroundColor: rgba(colors.grayDark, 0.3),
  };

  return (
    <RadioButtonContainer
      size={size - BORDER_WIDTH}
      selected={selected}
      onPress={() => onSelect(value)}
      style={disabled && disabledStyle}
      testID={testID}
    >
      {!disabled ? (
        selected && <Circle color={colors.secondary} size={INNER_CIRCLE_SIZE} />
      ) : (
        <Circle color={rgba(colors.grayDark, 0.5)} size={INNER_CIRCLE_SIZE} />
      )}
    </RadioButtonContainer>
  );
};

export default memo(RadioButton);

type RadioButtonContainerProps = {
  size: number;
  disabled?: boolean;
  selected?: boolean;
};
const RadioButtonContainer = styled.TouchableOpacity<RadioButtonContainerProps>`
  border-radius: ${({ size }) => size / 2};
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-width: ${BORDER_WIDTH}px;
  border-color: ${({ theme, selected }) =>
    !selected ? theme.ds.colors.grayDark : theme.ds.colors.secondary};
  align-items: center;
  justify-content: center;
`;
