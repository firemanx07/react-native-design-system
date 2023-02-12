import { useNamespacedTheme, styled } from '@proxym/themes';
import { Story } from '@storybook/react';
import React from 'react';
import { Svg } from 'react-native-svg';

import {
  StorybookScreen,
  StorybookSection,
  StorybookSectionText,
  StorybookItemWrapper,
  StorybookRow,
} from '../../../storybook';
import { IconButton } from '../../IconButton';
import {
  PlusIcon,
  HeartIcon,
  HeartOutlineIcon,
  StarOutlineIcon,
  DownloadIcon,
  PaperPlaneIcon,
  LockKeyIcon,
  CloseIcon,
  WindowIcon,
  DeleteBinIcon,
} from '../../Icons';
import { LabelButton, LabelButtonVariant } from '../../LabelButton';
import { BaseButton } from '../BaseButton';
import { ButtonShape, ButtonSize, ButtonVariant } from '../BaseButton.types';
import { PrimaryButtonsSection } from './PrimaryButtonsSection';

export default {
  title: 'Atoms/Base Button/All Buttons',
};

const noop = () => {};
const buttonText = 'Label';
const renderIcon = (size: number, color: string) => (
  <PlusIcon width={size} height={size} fill={color} />
);

const Template: Story = () => {
  const { colors } = useNamespacedTheme();

  const renderPrimaryButtonSections = (variant: ButtonVariant) => {
    const primaryButtonsProps = {
      buttonText,
      onPress: noop,
      renderIcon,
    };
    return (
      <StorybookSection title={`BaseButton - ${variant}`}>
        <PrimaryButtonsSection
          variant={variant}
          size={ButtonSize.Regular}
          {...primaryButtonsProps}
        />
        <PrimaryButtonsSection
          variant={variant}
          size={ButtonSize.Medium}
          {...primaryButtonsProps}
        />
        <PrimaryButtonsSection
          variant={variant}
          size={ButtonSize.Small}
          {...primaryButtonsProps}
        />
      </StorybookSection>
    );
  };

  const renderRoundedButton = (showIcon?: boolean, disabled?: boolean) => (
    <StorybookItemWrapper>
      <SquareButton
        onPress={noop}
        variant={ButtonVariant.Outline}
        size={ButtonSize.Regular}
        shape={ButtonShape.Rounded}
        disabled={disabled}
        renderIcon={showIcon ? renderIcon : undefined}
      >
        {buttonText}
      </SquareButton>
    </StorybookItemWrapper>
  );

  const renderLabelButton = (
    variant: LabelButtonVariant,
    underline?: boolean,
  ) => (
    <StorybookItemWrapper>
      <LabelButton variant={variant} onPress={noop} underline={underline}>
        {buttonText}
      </LabelButton>
    </StorybookItemWrapper>
  );

  const renderIconButton = (SvgIcon: typeof Svg, fill?: string) => (
    <StorybookItemWrapper>
      <IconButton
        onPress={noop}
        renderIcon={(size: number) => (
          <SvgIcon width={size} height={size} fill={fill} />
        )}
      />
    </StorybookItemWrapper>
  );

  return (
    <StorybookScreen title="All Buttons">
      <StorybookRow>
        {renderPrimaryButtonSections(ButtonVariant.Primary)}
        {renderPrimaryButtonSections(ButtonVariant.Secondary)}
        {renderPrimaryButtonSections(ButtonVariant.Outline)}
      </StorybookRow>
      <StorybookRow>
        <StorybookSection title="BaseButton - Outline - Square">
          {renderRoundedButton(true, false)}
          {renderRoundedButton(false, false)}
          {renderRoundedButton(true, true)}
          {renderRoundedButton(false, true)}
        </StorybookSection>
        <StorybookSection title="LabelButton">
          <StorybookSectionText>
            LabelButtonVariant.Regular
          </StorybookSectionText>
          {renderLabelButton(LabelButtonVariant.Regular)}
          <StorybookSectionText>LabelButtonVariant.Medium</StorybookSectionText>
          {renderLabelButton(LabelButtonVariant.Medium)}
          <StorybookSectionText>LabelButtonVariant.Small</StorybookSectionText>
          {renderLabelButton(LabelButtonVariant.Small)}
          <StorybookSectionText>
            LabelButtonVariant.Small | underline
          </StorybookSectionText>
          {renderLabelButton(LabelButtonVariant.Small, true)}
        </StorybookSection>
        <StorybookSection title="IconButton">
          {renderIconButton(HeartOutlineIcon, colors.dark)}
          {renderIconButton(HeartIcon)}
          {renderIconButton(StarOutlineIcon, colors.dark)}
          {renderIconButton(DeleteBinIcon, colors.success)}
          {renderIconButton(DownloadIcon, colors.primary)}
          <StorybookItemWrapper>
            <SubmitIconButton
              onPress={noop}
              size={40}
              iconSize={24}
              renderIcon={(size: number) => (
                <PaperPlaneIcon
                  width={size}
                  height={size}
                  fill={colors.light}
                />
              )}
            />
          </StorybookItemWrapper>
          <StorybookItemWrapper>
            <RoundIconButton
              onPress={noop}
              size={45}
              iconSize={24}
              renderIcon={(size: number) => (
                <WindowIcon width={size} height={size} fill={colors.light} />
              )}
            />
          </StorybookItemWrapper>
        </StorybookSection>
      </StorybookRow>
      <StorybookRow>
        <StorybookSection title="Other buttons">
          <StorybookSectionText>Button XSmall</StorybookSectionText>
          <StorybookItemWrapper>
            <ButtonXSmall
              onPress={noop}
              size={ButtonSize.Small}
              variant={ButtonVariant.Outline}
              renderIcon={(size: number) => (
                <LockKeyIcon width={size} height={size} fill={colors.light} />
              )}
            >
              {buttonText}
            </ButtonXSmall>
          </StorybookItemWrapper>
          <StorybookSectionText>Button Small - dark</StorybookSectionText>
          <StorybookItemWrapper>
            <ButtonSmallDark
              onPress={noop}
              size={ButtonSize.Small}
              variant={ButtonVariant.Primary}
            >
              {buttonText}
            </ButtonSmallDark>
          </StorybookItemWrapper>
          <StorybookSectionText>
            Button Small - dark - with icon
          </StorybookSectionText>
          <StorybookItemWrapper>
            <ButtonSmallDark
              onPress={noop}
              size={ButtonSize.Small}
              variant={ButtonVariant.Primary}
              renderIcon={(size: number, color: string) => (
                <CloseIcon width={size} height={size} fill={color} />
              )}
            >
              {buttonText}
            </ButtonSmallDark>
          </StorybookItemWrapper>
        </StorybookSection>
      </StorybookRow>
    </StorybookScreen>
  );
};

const SquareButton = styled(BaseButton)`
  align-self: flex-start;
`;

const SubmitIconButton = styled(IconButton)`
  background-color: ${({ theme }) => theme.ds.colors.primary};
  border-color: ${({ theme }) => theme.ds.colors.primary};
`;
const RoundIconButton = styled(IconButton)`
  background-color: ${({ theme }) => theme.ds.colors.secondary};
  border-color: ${({ theme }) => theme.ds.colors.primary};
  border-radius: ${({ size }) => (size ?? 34) / 2}px;
`;

const ButtonXSmall = styled(BaseButton).attrs(({ theme }) => ({
  textStyle: {
    color: theme.ds.colors.light,
  },
}))`
  height: 28px;
  border-color: ${({ theme }) => theme.ds.colors.light};
  background-color: transparent;
`;

const ButtonSmallDark = styled(BaseButton)`
  background-color: ${({ theme }) => theme.ds.colors.dark};
`;

export const AllButtons = Template.bind({});
