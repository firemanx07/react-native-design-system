import { styled } from '@proxym/themes';
import React, { memo } from 'react';
import { StyleProp, ViewStyle, TextProps } from 'react-native';

import { TestIDType } from '../../types';
import { BaseText, TextVariant, TextWeight } from '../BaseText';

export enum LabelButtonVariant {
  Regular = 'Regular',
  Medium = 'Medium',
  Small = 'Small',
}

export type PropsType = {
  children: TextProps['children'];
  onPress: () => void;
  variant: LabelButtonVariant;
  disabled?: boolean;
  underline?: boolean;
  style?: StyleProp<ViewStyle>;
} & TestIDType;

export const LabelButton = ({
  children,
  variant,
  underline,
  disabled,
  onPress,
  style,
  testID,
}: PropsType) => {
  return (
    <Container
      onPress={onPress}
      disabled={disabled}
      style={style}
      testID={testID}
    >
      <ButtonText
        buttonVariant={variant}
        disabled={disabled}
        underline={underline}
      >
        {children}
      </ButtonText>
    </Container>
  );
};

const labelButtonTextVariant = {
  [LabelButtonVariant.Regular]: TextVariant.H2,
  [LabelButtonVariant.Medium]: TextVariant.L,
  [LabelButtonVariant.Small]: TextVariant.M,
};

type ContainerType = {
  disabled?: boolean;
};

const Container = styled.TouchableOpacity<ContainerType>`
  align-self: flex-start;
  padding-horizontal: ${({ theme }) => theme.ds.spacing.small}px;
  padding-vertical: ${({ theme }) => theme.ds.spacing.tiny}px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

type ButtonTextType = {
  buttonVariant: LabelButtonVariant;
  underline?: boolean;
};

export const ButtonText = styled(BaseText).attrs(
  ({ buttonVariant }: ButtonTextType) => ({
    variant: labelButtonTextVariant[buttonVariant],
    weight: TextWeight.Bold,
  }),
)<ButtonTextType>`
  text-decoration-line: ${({ underline }) =>
    underline ? 'underline' : 'none'};
`;

export default memo(LabelButton);
