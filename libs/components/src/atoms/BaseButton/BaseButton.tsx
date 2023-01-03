import React, { memo, useMemo, ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle, TextProps } from 'react-native';

import { TestIDType } from '../../types';
import { LoadingIndicator } from '../LoadingIndicator';
import { useButtonContentColor } from './BaseButton.hooks';
import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonOutline,
  iconSize,
  ButtonText,
} from './BaseButton.styles';
import { ButtonSize, ButtonVariant, ButtonShape } from './BaseButton.types';

export type PropsType = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: TextProps['children'];
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  renderIcon?: (size: number, color: string) => ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  shape?: ButtonShape;
} & TestIDType;

export const BaseButton = ({
  variant = ButtonVariant.Primary,
  size = ButtonSize.Regular,
  shape = ButtonShape.Rounded,
  onPress,
  children,
  disabled,
  loading,
  style,
  textStyle,
  renderIcon,
  testID,
}: PropsType) => {
  const contentColor = useButtonContentColor(variant, disabled);
  const hasIcon = !!renderIcon;

  const Button = useMemo(() => {
    switch (variant) {
      case ButtonVariant.Secondary:
        return ButtonSecondary;
      case ButtonVariant.Outline:
        return ButtonOutline;
      case ButtonVariant.Primary:
      default:
        return ButtonPrimary;
    }
  }, [variant]);

  const renderContent = () => {
    if (!disabled && loading) {
      return <LoadingIndicator size={8} color={contentColor} />;
    }

    return (
      <>
        {hasIcon && renderIcon(iconSize[size], contentColor)}
        <ButtonText
          size={size}
          color={contentColor}
          style={textStyle}
          numberOfLines={1}
          hasIcon={hasIcon}
        >
          {children}
        </ButtonText>
      </>
    );
  };

  return (
    <Button
      size={size}
      shape={shape}
      disabled={disabled}
      style={style}
      onPress={onPress}
      testID={testID}
    >
      {renderContent()}
    </Button>
  );
};

export default memo(BaseButton);
