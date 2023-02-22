import { styled, useNamespacedTheme } from '@proxym/themes';
import { rgba } from 'polished';
import React, { memo, useState } from 'react';
import { Platform, StyleProp, TextInputProps, TextStyle } from 'react-native';

import { BaseText, TextVariant } from '../../atoms';
import { TestIDType } from '../../types';

export type TextProps = TextInputProps & {
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  autoFocus?: boolean;
  editable?: boolean;
  style?: { container?: any; text?: any; shadow?: any };
  onFocus?: () => void;
  errorMessage?: string;
  isError?: boolean;
  errorTextStyle?: StyleProp<TextStyle>;
} & TestIDType;

const TEXT_INPUT_HEIGHT = 48;
const TextInputField = (props: TextProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const { colors } = useNamespacedTheme();

  const handleFocus = () => {
    props.onFocus && props.onFocus();
    setIsFocused(true);
  };

  const handleBlur = (e: any) => {
    props.onBlur && props.onBlur(e);
    setIsFocused(false);
  };
  const getBorderColor = (): string => {
    if (props.isError) {
      return colors.error;
    }
    if (isFocused) return colors.secondary;
    if (props.value) {
      return colors.success;
    }
    return colors.grayDark;
  };
  return (
    <Container>
      <TextInputContainer
        editable={props.editable}
        color={rgba(getBorderColor(), 0.5)}
      >
        <TextInput
          {...{ props }}
          value={props.value}
          placeholder={props.placeholder}
          placeholderTextColor={rgba(colors.dark, 0.5)}
          onChangeText={val => props.onChangeText(val)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={props.editable ?? true}
          autoFocus={Platform.OS === 'ios' ? props.autoFocus ?? false : false}
          keyboardType={props.keyboardType}
        />
      </TextInputContainer>
      {props.isError && (
        <ErrorText style={props.errorTextStyle} variant={TextVariant.S}>
          {props.errorMessage}
        </ErrorText>
      )}
    </Container>
  );
};

type CommonProps = {
  color: string;
  editable?: boolean;
};
const Container = styled.View`
  align-items: flex-start;
  justify-content: flex-start;
`;

const TextInputContainer = styled.View<CommonProps>`
  /* Common.textInputContainer */
  border-radius: 7px;
  border-width: 1px;
  border-color: ${({ color, editable }) =>
    (editable && color) || 'transparent'};
  background-color: ${({ theme, editable }) =>
    editable ? theme.ds.colors.light : rgba(theme.ds.colors.grayDark, 0.2)};
  height: ${TEXT_INPUT_HEIGHT}px;
  padding-left: ${({ theme }) => theme.ds.spacing.small};
  padding-right: ${({ theme }) => theme.ds.spacing.small};
  /* Layout.rowHCenter */
  flex-direction: row;
  align-items: center;
  /* Layout.justifyContentBetween */
  justify-content: space-between;
`;

const TextInput = styled.TextInput`
  font-family: ${({ theme }) => theme.ds.fonts.family.primaryMedium};
  font-size: ${({ theme }) => theme.ds.fonts.size.medium};
  color: ${({ theme }) => theme.ds.colors.dark};
  width: 100%;
  margin-left: ${({ theme }) => theme.ds.spacing.small};
`;

const ErrorText = styled(BaseText)`
  color: ${props => props.theme.ds.colors.error};
  margin-top: ${props => props.theme.ds.spacing.tiny};
`;

export default memo(TextInputField);
