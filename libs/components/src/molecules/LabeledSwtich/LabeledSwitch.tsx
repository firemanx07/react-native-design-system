import { styled, useNamespacedTheme } from '@proxym/themes';
import React, { memo, useState } from 'react';

import { BaseText, Toggle } from '../../atoms';

export enum LabeledSwitchValues {
  LEFT = 'left',
  RIGHT = 'right',
}
export type LabeledSwitchProps = {
  leftLabel: string;
  rightLabel: string;
  initialValue: LabeledSwitchValues;
  width?: number;
  onChange?: (val: LabeledSwitchValues) => void;
};
const LabeledSwitch = ({
  leftLabel,
  rightLabel,
  initialValue = LabeledSwitchValues.RIGHT,
  onChange,
  width,
}: LabeledSwitchProps) => {
  const [isRight, setIsRight] = useState<boolean>(
    initialValue === LabeledSwitchValues.RIGHT,
  );
  const handlePress = (isActive: boolean) => {
    onChange?.(isActive ? LabeledSwitchValues.RIGHT : LabeledSwitchValues.LEFT);
    setIsRight(isActive);
  };
  const { colors } = useNamespacedTheme();
  return (
    <Container width={width}>
      <BaseText>{leftLabel}</BaseText>
      <Toggle
        isActive={isRight}
        inActiveColor={colors.secondary}
        size={15}
        onPress={handlePress}
      />
      <BaseText>{rightLabel}</BaseText>
    </Container>
  );
};

export default memo(LabeledSwitch);
type ContainerProps = {
  width?: number;
};
const Container = styled.View<ContainerProps>`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background-color: ${({ theme }) => theme.ds.colors.graySoft};
  padding: ${({ theme }) => theme.ds.spacing.primary}px;
  min-height: 60px;
  border-radius: 7px;
  ${({ width }) => width && 'width: ' + width + 'px;'}
`;
