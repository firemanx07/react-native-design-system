import {
  DSType,
  ColorType,
  FontFamilyType,
  SpacingType,
  FontSizeType,
  LineHeightType,
  IconSizeType,
} from './types';

export const theme: DSType = {
  // NOTE: the Design System theme must have it's own namespace
  // to avoid conflicts with the mobile app theme
  ds: {
    colors: ColorType,
    spacing: SpacingType,
    fonts: {
      family: FontFamilyType,
      lineHeight: LineHeightType,
      size: FontSizeType,
    },
    iconSize: IconSizeType,
  },
};
