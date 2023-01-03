import React, { ReactNode } from 'react';

import { BaseButton, ButtonVariant, ButtonSize } from '..';
import { StorybookSectionText, StorybookItemWrapper } from '../../../storybook';

type PropsType = {
  variant: ButtonVariant;
  size: ButtonSize;
  buttonText: string;
  onPress: () => void;
  renderIcon: (size: number, color: string) => ReactNode;
};

export const PrimaryButtonsSection = ({
  variant,
  size,
  buttonText,
  onPress,
  renderIcon,
}: PropsType) => {
  const sizeTitle = `ButtonSize.${size}`;
  return (
    <>
      <StorybookSectionText>{sizeTitle}</StorybookSectionText>
      <StorybookItemWrapper>
        <BaseButton onPress={onPress} variant={variant} size={size}>
          {buttonText}
        </BaseButton>
      </StorybookItemWrapper>
      <StorybookSectionText>{`${sizeTitle} | with icon:`}</StorybookSectionText>
      <StorybookItemWrapper>
        <BaseButton
          onPress={onPress}
          variant={variant}
          size={size}
          renderIcon={renderIcon}
        >
          {buttonText}
        </BaseButton>
      </StorybookItemWrapper>
      <StorybookSectionText>{`${sizeTitle} | loading:`}</StorybookSectionText>
      <StorybookItemWrapper>
        <BaseButton onPress={onPress} variant={variant} size={size} loading>
          {buttonText}
        </BaseButton>
      </StorybookItemWrapper>
      <StorybookSectionText>{`${sizeTitle} | disabled:`}</StorybookSectionText>
      <StorybookItemWrapper>
        <BaseButton onPress={onPress} variant={variant} size={size} disabled>
          {buttonText}
        </BaseButton>
      </StorybookItemWrapper>
      <StorybookSectionText>{`${sizeTitle} | disabled | with icon:`}</StorybookSectionText>
      <StorybookItemWrapper>
        <BaseButton
          onPress={onPress}
          variant={variant}
          size={size}
          renderIcon={renderIcon}
          disabled
        >
          {buttonText}
        </BaseButton>
      </StorybookItemWrapper>
    </>
  );
};
