import { styled, useNamespacedTheme } from '@proxym/themes';
import { rgba } from 'polished';
import React, { memo, useState } from 'react';

import { BaseText, Switch, TextVariant, TextWeight } from '../../atoms';
import { TestIDType } from '../../types';

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
} & TestIDType;
const LabeledSwitch = ({
  leftLabel,
  rightLabel,
  initialValue = LabeledSwitchValues.RIGHT,
  onChange,
  width,
  testID,
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
    <Container testID={testID} width={width}>
      <LeftText
        weight={TextWeight.SemiBold}
        variant={TextVariant.S}
        isRight={isRight}
      >
        {leftLabel}
      </LeftText>
      <Switch
        isActive={isRight}
        inActiveColor={colors.secondary}
        size={12}
        onPress={handlePress}
      />
      <RightText
        weight={TextWeight.SemiBold}
        variant={TextVariant.S}
        isRight={isRight}
      >
        {rightLabel}
      </RightText>
    </Container>
  );
};

export default memo(LabeledSwitch);
type ContainerProps = {
  width?: number;
};
type LabelProps = {
  isRight: boolean;
};
const Container = styled.View<ContainerProps>`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background-color: ${({ theme }) => theme.ds.colors.graySoft};
  padding: ${({ theme }) => theme.ds.spacing.primary}px;
  min-height: 40px;
  border-radius: 7px;
  ${({ width }) => width && 'width: ' + width + 'px;'}
`;
const LeftText = styled(BaseText)<LabelProps>`
  color: ${({ theme, isRight }) =>
    !isRight ? theme.ds.colors.dark : rgba(theme.ds.colors.dark, 0.6)};
`;
const RightText = styled(BaseText)<LabelProps>`
  color: ${({ theme, isRight }) =>
    isRight ? theme.ds.colors.dark : rgba(theme.ds.colors.dark, 0.6)};
`;
