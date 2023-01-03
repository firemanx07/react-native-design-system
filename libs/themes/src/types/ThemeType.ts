import ColorType from './ColorType';
import FontFamilyType from './FontFamilyType';
import FontSizeType from './FontSizeType';
import IconSizeType from './IconSizeType';
import LineHeightType from './LineHeightType';
import SpacingType from './SpacingType';

type ThemeType = {
  ds: {
    colors: typeof ColorType;
    spacing: typeof SpacingType;
    fonts: {
      family: typeof FontFamilyType;
      size: typeof FontSizeType;
      lineHeight: typeof LineHeightType;
    };
    iconSize: typeof IconSizeType;
  };
};

export default ThemeType;
