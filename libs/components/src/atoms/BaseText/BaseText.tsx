import {
  FontFamilyType,
  styled,
  useNamespacedTheme,
  FontSizeType,
  LineHeightType,
} from '@proxym/themes';
import React, { memo, useMemo } from 'react';
import { StyleProp, TextProps, TextStyle } from 'react-native';

export enum TextVariant {
  H1 = 'H1',
  H2 = 'H2',
  H3 = 'H3',
  L = 'L',
  M = 'M',
  S = 'S',
  XS = 'XS',
}

export enum TextWeight {
  Regular = 'Regular',
  SemiBold = 'SemiBold',
  Bold = 'Bold',
  ExtraBold = 'ExtraBold',
}

export type PropsType = {
  variant?: TextVariant;
  weight?: TextWeight;
  style?: StyleProp<TextStyle>;
} & TextProps;

export const BaseText = ({
  children,
  variant = TextVariant.L,
  weight = TextWeight.Regular,
  style,
  ...textProps
}: PropsType) => {
  const { fonts } = useNamespacedTheme();

  const fontFamily = useMemo(() => {
    switch (weight) {
      case TextWeight.Bold:
        return fonts.family.primaryBold;
      case TextWeight.SemiBold:
        return fonts.family.primarySemiBold;
      case TextWeight.ExtraBold:
        return fonts.family.primaryExtraBold;
      case TextWeight.Regular:
      default:
        return fonts.family.primary;
    }
  }, [weight]);

  const textStyles = useMemo(() => {
    switch (variant) {
      case TextVariant.H1:
        return {
          fontFamily: fonts.family.primaryBold,
          fontSize: fonts.size.large,
          lineHeight: fonts.lineHeight.medium,
        };
      case TextVariant.H2:
        return {
          fontFamily: fonts.family.primaryBold,
          fontSize: fonts.size.mediumLarge,
          lineHeight: fonts.lineHeight.mediumSmall,
        };
      case TextVariant.H3:
        return {
          fontFamily: fonts.family.primaryBold,
          fontSize: fonts.size.medium,
          lineHeight: fonts.lineHeight.mediumTiny,
        };
      case TextVariant.M:
        return {
          fontSize: fonts.size.small,
          lineHeight: fonts.lineHeight.mediumTiny,
        };
      case TextVariant.S:
        return {
          fontSize: fonts.size.extraSmall,
          lineHeight: fonts.lineHeight.small,
        };
      case TextVariant.XS:
        return {
          fontSize: fonts.size.tiny,
          lineHeight: fonts.lineHeight.extraSmall,
        };
      case TextVariant.L:
      default:
        return {
          fontSize: fonts.size.medium,
          lineHeight: fonts.lineHeight.mediumTiny,
        };
    }
  }, [variant]);

  return (
    <StyledText
      fontFamily={fontFamily}
      {...textStyles}
      {...textProps}
      style={style}
    >
      {children}
    </StyledText>
  );
};

type StyledTextVariant = {
  fontFamily: FontFamilyType;
  fontSize: FontSizeType;
  lineHeight: LineHeightType;
};

const StyledText = styled.Text<StyledTextVariant>`
  color: ${({ theme }) => theme.ds.colors.dark};
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: ${({ fontSize }) => fontSize}px;
  line-height: ${({ lineHeight }) => lineHeight}px;
`;

export default memo(BaseText);
