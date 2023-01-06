import { useNamespacedTheme } from '@proxym/themes';
import { rgba } from 'polished';

import { ButtonVariant } from './BaseButton.types';

export const useButtonContentColor = (
  variant: ButtonVariant,
  disabled?: boolean,
) => {
  const { colors } = useNamespacedTheme();

  switch (variant) {
    case ButtonVariant.Outline:
      return disabled ? rgba(colors.dark, 0.3) : colors.dark;
    case ButtonVariant.Primary:
    case ButtonVariant.Secondary:
    default:
      return colors.light;
  }
};
