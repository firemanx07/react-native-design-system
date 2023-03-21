import { styled, useNamespacedTheme } from '@proxym/themes';
import { BlurView } from '@react-native-community/blur';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';

import {
  ActionIcon,
  BaseButton,
  BaseText,
  ButtonSize,
  CloseIcon,
  ErrorIcon,
  IconButton,
  SuccessIcon,
  TextVariant,
  TextWeight,
} from '../../atoms';
import { TextInputField } from '../TextInputField';

export enum ModalTypes {
  SUCCESS = 'success',
  ERROR = 'error',
  ACTION = 'action',
  OTP = 'otp',
}
const CLOSE_ICON_SIZE = 11;
const MODAL_ICON_WIDTH = 71;
const MODAL_ICON_HEIGHT = 60;
const OTP_PLACEHOLDER = '12345';
export type ModalProps = {
  visible: boolean;
  width?: number;
  type: ModalTypes;
  title: string;
  message?: string;
  buttonLabel?: string;
  onClose: () => void;
  onSubmit?: (val?: string) => void;
  OTPLabel?: string;
  enableBackDrop?: boolean;
};

const Modal = ({
  visible,
  type,
  message = '',
  onClose,
  title,
  buttonLabel = 'Done',
  onSubmit,
  OTPLabel = 'Enter your OTP code',
  width = 340,
}: ModalProps) => {
  const { colors } = useNamespacedTheme();
  const [otpValue, setOtpValue] = useState<string>('');

  const otpTextInputWidth = useMemo<number>(() => (270 * width) / 340, [width]);
  const iconModal = useMemo<React.ReactNode | null>(() => {
    switch (type) {
      case ModalTypes.SUCCESS:
        return (
          <SuccessIcon width={MODAL_ICON_WIDTH} height={MODAL_ICON_HEIGHT} />
        );
      case ModalTypes.ERROR:
        return (
          <ErrorIcon width={MODAL_ICON_WIDTH} height={MODAL_ICON_HEIGHT} />
        );
      case ModalTypes.ACTION:
        return (
          <ActionIcon width={MODAL_ICON_WIDTH} height={MODAL_ICON_HEIGHT} />
        );
      case ModalTypes.OTP:
      default:
        return null;
    }
  }, [type]);

  const renderIcon = useCallback<
    (size: number, color: string) => React.ReactNode
  >((size, color) => <CloseIcon width={size} height={size} fill={color} />, []);
  const handleSubmit = useCallback(() => {
    onSubmit && onSubmit(type === ModalTypes.OTP ? otpValue : undefined);
    onClose();
  }, [onClose, onSubmit, otpValue, type]);

  return (
    <BaseModal
      presentationStyle="overFullScreen"
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Container>
        <BlurView
          style={StyleSheet.absoluteFillObject}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />
        <Backdrop onPress={onClose} />
        <StyledModal width={width}>
          <StyledIconButton
            renderIcon={renderIcon}
            onPress={onClose}
            iconColor={colors.dark}
            iconSize={CLOSE_ICON_SIZE}
          />
          <ModalBody>
            {iconModal}
            <BodyContainer>
              <BaseText variant={TextVariant.L} weight={TextWeight.Medium}>
                {title}
              </BaseText>
              {type !== ModalTypes.OTP && (
                <BaseText variant={TextVariant.M}>{message}</BaseText>
              )}
            </BodyContainer>
            {type === ModalTypes.OTP && (
              <TextInputField
                value={otpValue}
                onChangeText={setOtpValue}
                label={OTPLabel}
                width={otpTextInputWidth}
                placeholder={OTP_PLACEHOLDER}
              />
            )}
            {[ModalTypes.OTP, ModalTypes.ACTION].includes(type) && (
              <BodyContainer>
                <BaseButton size={ButtonSize.Medium} onPress={handleSubmit}>
                  {buttonLabel}
                </BaseButton>
              </BodyContainer>
            )}
          </ModalBody>
        </StyledModal>
      </Container>
    </BaseModal>
  );
};

const BaseModal = styled.Modal``;
const StyledIconButton = styled(IconButton)`
  background-color: transparent;
  position: absolute;
  right: 0;
  z-index: 1;
`;
const BodyContainer = styled.View`
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.ds.spacing.small}px;
`;
const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.22);
  backdrop-filter: blur(8px);
`;
const ModalBody = styled.View`
  padding-vertical: ${({ theme }) => theme.ds.spacing.huge}px;
  gap: ${({ theme }) => theme.ds.spacing.large}px;
  align-items: center;
`;
type StyledModalProp = {
  width: number;
};
const StyledModal = styled.View<StyledModalProp>`
  width: ${({ width }) => width}px;
  min-height: 238px;
  background-color: rgba(255, 255, 255, 0.93);
  shadow-color: rgba(44, 44, 44, 0.18);
  shadow-offset: 10px 35px;
  shadow-opacity: 1;
  border-radius: 7px;
  shadow-radius: 40px;
`;
const Backdrop = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export default memo(Modal);
