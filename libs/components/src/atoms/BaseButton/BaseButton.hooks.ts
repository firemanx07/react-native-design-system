import { useNamespacedTheme } from '@proxym/themes';
import { rgba } from 'polished';

import { ButtonVariant } from './BaseButton.types';

export const useButtonContentColor = (
  variant: ButtonVariant,
  disabled?: boolean,
  customColor?: string,
) => {
  const { colors } = useNamespacedTheme();

  switch (variant) {
    case ButtonVariant.Outline:
      return disabled
        ? rgba(colors.grayDark, 0.7)
        : customColor ?? colors.primary;
    case ButtonVariant.Primary:
    case ButtonVariant.Secondary:
    default:
      return disabled ? rgba(colors.grayDark, 0.7) : colors.light;
  }
};
