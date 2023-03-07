import { IconSizeType, styled, useNamespacedTheme } from '@proxym/themes';
import { rgba } from 'polished';
import React, {
  memo,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  NativeSyntheticEvent,
  Platform,
  StyleProp,
  TextInputFocusEventData,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import * as ReactNative from 'react-native';

import { BaseText, TextVariant, TextWeight } from '../../atoms';
import { TestIDType } from '../../types';

export type AccessoryRenderFunction = (
  size: number,
  color: string,
) => ReactNode;
export type TextInputAccessoryProps = {
  leftAccessory?: AccessoryRenderFunction;
  rightAccessory?: AccessoryRenderFunction;
};
export type BaseTextInputProps = TextInputProps & {
  value: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  autoFocus?: boolean;
  editable?: boolean;
  style?: {
    container?: StyleProp<ViewStyle>;
    text: StyleProp<TextStyle>;
    shadow?: StyleProp<ViewStyle>;
  };
  onFocus?: () => void;
  errorMessage?: string;
  isError?: boolean;
  isSuccess?: boolean;
  errorTextStyle?: StyleProp<TextStyle>;
  label?: string;
  width?: number;
  isPicker?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  pointerEvents?: string;
} & TextInputAccessoryProps &
  TestIDType;

const TEXT_INPUT_HEIGHT = 48;
const TEXT_MULTILINE_HEIGHT = 121;
const TextInputField = ({
  onFocus,
  width = 300,
  onBlur,
  onChangeText,
  isError,
  isSuccess,
  value,
  label,
  editable = true,
  placeholder,
  autoFocus,
  keyboardType,
  errorMessage,
  errorTextStyle,
  style,
  isPicker = false,
  onPress,
  disabled,
  pointerEvents,
  onLayout,
  ...rest
}: BaseTextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const { colors } = useNamespacedTheme();
  const textInputRef = useRef<ReactNative.TextInput>(null);
  const handleFocus = useCallback(() => {
    onFocus && onFocus();
    setIsFocused(true);
  }, [onFocus]);

  const handlePress = useCallback(() => {
    textInputRef?.current?.focus();
    onPress && onPress();
  }, [onPress]);

  const handleBlur = useCallback<
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => void
  >(
    e => {
      onBlur && onBlur(e);
      setIsFocused(false);
    },
    [onBlur],
  );
  const borderColor = useMemo(() => {
    if (isError) {
      return colors.error;
    }
    if (isFocused && !isPicker) {
      return colors.secondary;
    }
    if (isSuccess) {
      return colors.success;
    }
    return colors.grayDark;
  }, [isError, isFocused, isSuccess, colors]);
  const accessoryColor = useMemo(() => {
    if (!editable) return colors.grayDark;
    return borderColor === colors.grayDark ? colors.dark : borderColor;
  }, [borderColor, editable, colors.grayDark, colors.dark]);
  return (
    <Container onLayout={onLayout}>
      {label && (
        <BaseText variant={TextVariant.S} weight={TextWeight.Medium}>
          {label}
        </BaseText>
      )}
      <TextInputContainer
        editable={editable}
        width={width}
        color={rgba(borderColor, 0.5)}
        onPress={handlePress}
        disabled={disabled}
      >
        {rest.leftAccessory &&
          rest.leftAccessory(IconSizeType.primary, accessoryColor)}
        <TextInput
          ref={textInputRef}
          {...rest}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={rgba(colors.dark, 0.5)}
          onChangeText={val => onChangeText && onChangeText(val)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={editable && !isPicker}
          autoFocus={Platform.OS === 'ios' ? autoFocus ?? false : false}
          keyboardType={keyboardType}
        />
        {rest.rightAccessory &&
          rest.rightAccessory(IconSizeType.primary, accessoryColor)}
      </TextInputContainer>
      {isError && (
        <ErrorText style={errorTextStyle} variant={TextVariant.S}>
          {errorMessage}
        </ErrorText>
      )}
    </Container>
  );
};

type CommonProps = {
  color: string;

  editable?: boolean;
  width: number;
};
const Container = styled.View`
  align-items: flex-start;
  justify-content: flex-start;
`;

const TextInputContainer = styled.Pressable<CommonProps>`
  width: ${({ width }) => width}px;
  flex-direction: row;
  /* Common.textInputContainer */
  border-radius: 7px;
  border-width: 1px;
  border-color: ${({ color, editable }) =>
    (editable && color) || 'transparent'};
  background-color: ${({ theme, editable }) =>
    editable ? theme.ds.colors.light : rgba(theme.ds.colors.grayDark, 0.2)};
  min-height: ${TEXT_INPUT_HEIGHT}px;
  padding-horizontal: ${({ theme }) => theme.ds.spacing.small}px;
  /* Layout.rowHCenter */
  align-items: center;
  /* Layout.justifyContentBetween */
  justify-content: space-between;
`;

const TextInput = styled.TextInput<TextInputAccessoryProps>`
  font-family: ${({ theme, value }) =>
    theme.ds.fonts.family[value ? 'primaryMedium' : 'primary']};
  font-size: ${({ theme }) => theme.ds.fonts.size.medium}px;
  color: ${({ theme }) => theme.ds.colors.dark};
  width: 100%;
  margin-left: ${({ theme }) => theme.ds.spacing.small}px;
  height: ${({ multiline }) =>
    multiline ? TEXT_MULTILINE_HEIGHT : TEXT_INPUT_HEIGHT}px;
  ${({ multiline, theme }) =>
    multiline && 'margin-vertical:' + theme.ds.spacing.small + 'px;'}
  ${({ rightAccessory, theme }) =>
    rightAccessory && 'margin-right:' + theme.ds.spacing.tiny + 'px;'}
`;

const ErrorText = styled(BaseText)`
  color: ${props => props.theme.ds.colors.error};
  margin-top: ${props => props.theme.ds.spacing.tiny}px;
`;

export default memo(TextInputField);
