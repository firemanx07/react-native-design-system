import { css, styled } from '@proxym/themes';

import { BaseText, TextVariant, TextWeight } from '../BaseText';
import { ButtonShape, ButtonSize } from './BaseButton.types';

const buttonHeight = {
  [ButtonSize.Regular]: 48,
  [ButtonSize.Medium]: 36,
  [ButtonSize.Small]: 32,
};

export const iconSize = {
  [ButtonSize.Regular]: 24,
  [ButtonSize.Medium]: 20,
  [ButtonSize.Small]: 16,
};

const buttonTextVariant = {
  [ButtonSize.Regular]: TextVariant.L,
  [ButtonSize.Medium]: TextVariant.M,
  [ButtonSize.Small]: TextVariant.M,
};

const buttonStylesBySize = {
  [ButtonSize.Regular]: css`
    padding-horizontal: ${({ theme }) => theme.ds.spacing.medium}px;
  `,
  [ButtonSize.Medium]: css`
    min-width: 140px;
    padding-horizontal: ${({ theme }) => theme.ds.spacing.medium}px;
    align-self: flex-start;
  `,
  [ButtonSize.Small]: css`
    padding-horizontal: ${({ theme }) => theme.ds.spacing.primary}px;
    align-self: flex-start;
  `,
};

type ButtonType = {
  size: ButtonSize;
  shape: ButtonShape;
  disabled?: boolean;
};

const ButtonCommon = styled.TouchableOpacity<ButtonType>`
  ${({ size }) => buttonStylesBySize[size]}
  height: ${({ size }) => buttonHeight[size]}px;
  border-radius: ${({ size, shape }) => {
    switch (shape) {
      case ButtonShape.Square:
        return 6;
      case ButtonShape.Rounded:
      default:
        return buttonHeight[size] / 2;
    }
  }}px;
  max-width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ButtonPrimary = styled(ButtonCommon)`
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.ds.colors.graySoft : theme.ds.colors.primary};
`;

export const ButtonSecondary = styled(ButtonCommon)`
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.ds.colors.graySoft : theme.ds.colors.accentDark};
`;

export const ButtonOutline = styled(ButtonCommon)`
  background-color: ${({ theme }) => theme.ds.colors.light};
  border-color: ${({ theme }) => theme.ds.colors.graySoft};
  border-width: 1px;
`;

type ButtonTextType = {
  size: ButtonSize;
  color: string;
  hasIcon?: boolean;
};

export const ButtonText = styled(BaseText).attrs(
  ({ size }: ButtonTextType) => ({
    variant: buttonTextVariant[size],
    weight: TextWeight.Bold,
  })
)<ButtonTextType>`
  color: ${({ color }) => color};
  margin-left: ${({ hasIcon, size }) =>
    hasIcon ? (size === ButtonSize.Small ? 4 : 8) : 0}px;
`;
