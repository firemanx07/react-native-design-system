import { styled, useNamespacedTheme } from '@proxym/themes';
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Animated, Easing, LayoutChangeEvent, Platform } from 'react-native';

import { ArrowPointIcon, BaseText } from '../../atoms';
import { TestIDType } from '../../types';
import { TextInputField } from '../TextInputField';
import { AccessoryRenderFunction } from '../TextInputField/TextInputField';
import ListContainer from './components/ListContainer';
import { default as Options, OptionVariant } from './components/ListOptions';

export type DropDownItemProps = {
  id: string;
  label: string;
  value: string;
  icon?: JSX.Element;
};

export enum DropDownDirection {
  TOP = 'TOP',
  BOTTOM = 'BOTTOM',
}
export type DropDownPickerProps = {
  value: string;
  placeholder?: string;
  disabled?: boolean;
  items?: DropDownItemProps[];
  optionVariant?: OptionVariant;
  leftAccessory?: AccessoryRenderFunction;
  direction?: DropDownDirection;
  onLayout?: (event: LayoutChangeEvent) => void;
  onOpen?: (open: boolean) => void;
  width?: number;
  isError?: boolean;
  customRenderOption?: (
    item: DropDownItemProps,
    index: number,
    selectedID: string | undefined,
  ) => React.ReactElement;
} & TestIDType;

export enum DropDownTestIDs {
  DROPDOWN_PICKER_TEST_ID = 'DROPDOWN_PICKER_TEST_ID',
  DROPDOWN_BODY_TEST_ID = 'DROPDOWN_BODY',
  DROPDOWN_LIST_TEST_ID = 'DROPDOWN_LIST',
  LIST_ITEM_TEST_ID = 'list-item',
}
const DropDownPicker = ({
  value = '',
  items = [],
  placeholder,
  leftAccessory,
  disabled = false,
  direction = DropDownDirection.BOTTOM,
  optionVariant = OptionVariant.DEFAULT,
  width = 300,
  testID = DropDownTestIDs.DROPDOWN_PICKER_TEST_ID,
  onLayout,
  onOpen,
  isError,
  customRenderOption,
}: DropDownPickerProps) => {
  const { spacing } = useNamespacedTheme();
  const [open, setOpen] = useState<boolean>(false);
  const [pickerHeight, setPickerHeight] = useState(0);
  const rotationValue = useRef(new Animated.Value(0)).current;
  const animateRotation = useCallback(
    () =>
      Animated.timing(rotationValue, {
        toValue: open ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start(),
    [open, rotationValue],
  );

  useEffect(() => {
    animateRotation();
  }, [animateRotation, open]);

  const rotation = useMemo(
    () =>
      rotationValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
      }),
    [rotationValue],
  );
  const position = useMemo(() => {
    return direction === DropDownDirection.TOP
      ? { bottom: pickerHeight + spacing.small }
      : { top: pickerHeight + spacing.small };
  }, [direction, pickerHeight, spacing.small]);
  const padding = useMemo(
    () =>
      rotationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, spacing.small],
        easing: Easing.ease,
      }),
    [rotationValue, spacing.small],
  );
  const height = useMemo(
    () =>
      rotationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 3 * pickerHeight],
        easing: Easing.ease,
      }),
    [rotationValue, pickerHeight],
  );

  /**
   * The arrow component.
   * @returns {JSX.Element}
   */
  const rightAccessory = useCallback<AccessoryRenderFunction>(
    (size, color) => {
      return (
        <ArrowPointer style={{ transform: [{ rotate: rotation }] }}>
          <ArrowPointIcon height={size} width={size} fill={color} open={open} />
        </ArrowPointer>
      );
    },
    [open, rotation],
  );

  /**
   * Pointer events.
   * @returns {string}
   */
  const pointerEvents = useMemo(() => (disabled ? 'none' : 'auto'), [disabled]);
  /**
   * __onPress.
   * @returns void
   */
  const __onPress = useCallback(() => {
    setOpen(!open);
    onOpen && onOpen(!open);
  }, [onOpen, open]);

  /**
   * onLayout.
   */
  const __onLayout = useCallback<(e: LayoutChangeEvent) => void>(
    e => {
      if (Platform.OS !== 'web') e.persist();
      onLayout && onLayout(e);
      console.log(e.nativeEvent.layout.height);
      setPickerHeight(e.nativeEvent.layout.height);
    },
    [onLayout],
  );

  /**
   * The body component.
   */
  const _BodyComponent = useMemo(() => {
    return (
      <TextInputField
        onLayout={__onLayout}
        placeholder={placeholder}
        value={value}
        rightAccessory={rightAccessory}
        leftAccessory={leftAccessory}
        focusable={false}
        editable={!disabled}
        width={width}
        testID={testID}
        isPicker
        isError={isError}
        onPress={__onPress}
        disabled={disabled}
        pointerEvents={pointerEvents}
      />
    );
  }, [
    __onLayout,
    __onPress,
    disabled,
    isError,
    leftAccessory,
    placeholder,
    pointerEvents,
    rightAccessory,
    testID,
    value,
    width,
  ]);
  /**
   * renderOption
   */
  const __renderOption = useCallback<
    (
      item: DropDownItemProps,
      index: number,
      selectedID: string | undefined,
    ) => React.ReactElement
  >(
    (item, index, selectedID) => {
      switch (optionVariant) {
        case OptionVariant.ICON_OPTION:
          return <Options.IconOption {...{ item, index, selectedID }} />;
        case OptionVariant.CREDIT_CARD:
          return <Options.CreditCardOption {...{ item, index, selectedID }} />;
        case OptionVariant.CUSTOM:
          return customRenderOption ? (
            customRenderOption(item, index, selectedID)
          ) : (
            <BaseText>{item.label}</BaseText>
          );
      }
      return <BaseText>{item.label}</BaseText>;
    },
    [customRenderOption, optionVariant],
  );

  return (
    <Container width={width}>
      {_BodyComponent}
      <DropDownBodyContainer
        style={[{ height, padding }, position]}
        testID={testID + DropDownTestIDs.DROPDOWN_BODY_TEST_ID}
      >
        <ListContainer
          items={items}
          testID={testID + DropDownTestIDs.DROPDOWN_LIST_TEST_ID}
          renderOption={__renderOption}
        />
      </DropDownBodyContainer>
    </Container>
  );
};
const ArrowPointer = styled(Animated.View)``;
const Container = styled.View<{ width: number }>`
  width: ${({ width }) => width}px;
`;
const DropDownBodyContainer = styled(Animated.View)`
  position: absolute;
  background-color: ${({ theme }) => theme.ds.colors.light};
  height: ${({ theme }) => -2 * theme.ds.spacing.small}px;
  border-radius: 7px;
  width: 100%;
  overflow: hidden;
  elevation: ${4};
  shadow-color: ${({ theme }) => theme.ds.colors.shadowColor};
  shadow-offset: 0 0;
  shadow-opacity: 0.13;
  shadow-radius: 40px;
  z-index: 1000;
`;

export default memo(DropDownPicker);
