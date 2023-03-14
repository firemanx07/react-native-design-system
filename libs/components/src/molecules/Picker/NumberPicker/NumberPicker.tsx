import {
  ColorType,
  IconSizeType,
  styled,
  useNamespacedTheme,
} from '@proxym/themes';
import { rgba } from 'polished';
import React, { memo, useCallback, useState } from 'react';

import { BaseText, TextVariant, TextWeight } from '../../../atoms/BaseText';
import { PickerMinusIcon, PickerPlusIcon } from '../../../atoms/Icons';
import { TestIDType } from '../../../types';

export type NumberPickerProps = {
  width?: number;
  color?: ColorType;
  initialValue?: number;
  step?: number;
  onChange?: (val: number) => void;
} & TestIDType;
enum PickerButtons {
  MINUS = 'MINUS',
  ADD = 'ADD',
}
const ICON_SIZE = IconSizeType.medium;
const PICKER_DEFAULT_WIDTH = 300;
const NumberPicker = ({
  width = PICKER_DEFAULT_WIDTH,
  color,
  initialValue = 0,
  step = 1,
  onChange,
  testID,
}: NumberPickerProps) => {
  const [value, setValue] = useState(initialValue);
  const { colors } = useNamespacedTheme();

  const primaryColor = color ?? colors.secondary;

  const handlePress = useCallback(
    (event: PickerButtons) => {
      const val = event === PickerButtons.ADD ? value + step : value - step;
      setValue(val);
      onChange?.(val);
    },
    [onChange, step, value],
  );

  const renderButton = useCallback(
    (event: PickerButtons) => {
      return (
        <ButtonWrapper key={event} onPress={() => handlePress(event)}>
          {event === PickerButtons.ADD ? (
            <PickerPlusIcon
              height={ICON_SIZE}
              width={ICON_SIZE}
              fill={primaryColor}
            />
          ) : (
            <PickerMinusIcon
              height={ICON_SIZE}
              width={ICON_SIZE}
              fill={primaryColor}
            />
          )}
        </ButtonWrapper>
      );
    },
    [handlePress, primaryColor],
  );

  return (
    <PickerContainer testID={testID} width={width} color={primaryColor}>
      {renderButton(PickerButtons.MINUS)}
      <Label
        color={primaryColor}
        variant={TextVariant.XL}
        weight={TextWeight.Medium}
      >
        {value}
      </Label>
      {renderButton(PickerButtons.ADD)}
    </PickerContainer>
  );
};

const PickerContainer = styled.View<{ width: number; color: ColorType }>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${({ theme, width }) =>
    (theme.ds.spacing.primary * width) / PICKER_DEFAULT_WIDTH}px;
  width: ${({ width }) => width}px;
  min-width: ${PICKER_DEFAULT_WIDTH / 3}px;
  border-radius: 7px;
  background-color: ${({ color }) => rgba(color, 0.08)};
  min-height: 47px;
`;

const ButtonWrapper = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

const Label = styled(BaseText)<{ color: ColorType }>`
  color: ${({ color }) => color};
`;

export default memo(NumberPicker);
