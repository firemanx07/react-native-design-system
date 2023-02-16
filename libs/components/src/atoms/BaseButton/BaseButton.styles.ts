import { css, styled } from '@proxym/themes';
import ColorType from '@proxym/themes/lib/typescript/src/types/ColorType';
import { rgba } from 'polished';

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
  customColor?: string;
};

const ButtonCommon = styled.TouchableOpacity<ButtonType>`
  ${({ size }) => buttonStylesBySize[size]}
  height: ${({ size }) => buttonHeight[size]}px;
  border-radius: ${({ size, shape }) => {
    switch (shape) {
      case ButtonShape.Rounded:
        return buttonHeight[size] / 2;
      case ButtonShape.Square:
      default:
        return 7;
    }
  }}px;
  max-width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const isDisabled = (
  colors: typeof ColorType,
  disabled: boolean | undefined,
  customColor: string | undefined,
) =>
  !disabled &&
  `border-color: ${customColor ?? colors.primary};
    border-width: 1px;`;
export const ButtonPrimary = styled(ButtonCommon)`
  background-color: ${({ theme, disabled, customColor }) =>
    disabled
      ? rgba(theme.ds.colors.grayDark, 0.2)
      : customColor ?? theme.ds.colors.primary};
`;

export const ButtonSecondary = styled(ButtonCommon)`
  background-color: ${({ theme, disabled, customColor }) =>
    disabled
      ? rgba(theme.ds.colors.grayDark, 0.2)
      : customColor ?? theme.ds.colors.secondary};
`;

export const ButtonOutline = styled(ButtonCommon)`
  background-color: ${({ theme, disabled }) =>
    disabled ? rgba(theme.ds.colors.grayDark, 0.2) : theme.ds.colors.light};
  ${({ theme, disabled, customColor }) =>
    isDisabled(theme.ds.colors, disabled, customColor)}
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
  }),
)<ButtonTextType>`
  color: ${({ color }) => color};
  margin-left: ${({ hasIcon, size }) => {
    const iconSize = size === ButtonSize.Small ? 4 : 8;
    return hasIcon ? iconSize : 0;
  }}px;
`;
