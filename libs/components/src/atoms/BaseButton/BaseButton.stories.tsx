import { ColorType } from '@proxym/themes';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { StorybookScreen, StorybookSection } from '../../storybook';
import { PersonIcon } from '../Icons';
import {
  BaseButton as BaseButtonBase,
  PropsType as BaseButtonProps,
} from './BaseButton';
import { ButtonSize, ButtonVariant } from './BaseButton.types';

const Story: ComponentMeta<typeof BaseButtonBase> = {
  component: BaseButtonBase,
  title: 'Atoms/Base Button',
  argTypes: {
    customColor: {
      control: { type: 'select' },
      options: ColorType,
    },
    variant: {
      control: { type: 'radio' },
    },
    size: {
      control: { type: 'radio' },
    },
  },
};
export default Story;

const Template: ComponentStory<typeof BaseButtonBase> = (
  args: BaseButtonProps,
) => (
  <StorybookScreen>
    <StorybookSection>
      <BaseButtonBase {...args} />
    </StorybookSection>
  </StorybookScreen>
);

const renderIcon = (size: number, color: string) => (
  <PersonIcon width={size} height={size} fill={color} />
);

const parameters = {
  controls: {
    include: [
      'size',
      'customColor',
      'disabled',
      'loading',
      'children',
      'customColor',
    ],
  },
};

const defaultArgs: Omit<BaseButtonProps, 'variant' | 'renderIcon'> = {
  size: ButtonSize.Regular,
  disabled: false,
  loading: false,
  children: 'Button Text',
  onPress: () => {
    // This is a mock
  },
};

export const Primary = Template.bind({});
Primary.parameters = parameters;
Primary.args = {
  variant: ButtonVariant.Primary,
  ...defaultArgs,
};

export const PrimaryWithIcon = Template.bind({});
PrimaryWithIcon.parameters = parameters;
PrimaryWithIcon.args = {
  variant: ButtonVariant.Primary,
  renderIcon,
  ...defaultArgs,
};

export const Secondary = Template.bind({});
Secondary.parameters = parameters;
Secondary.args = {
  variant: ButtonVariant.Secondary,
  ...defaultArgs,
};

export const SecondaryWithIcon = Template.bind({});
SecondaryWithIcon.parameters = parameters;
SecondaryWithIcon.args = {
  variant: ButtonVariant.Secondary,
  renderIcon,
  ...defaultArgs,
};

export const Outline = Template.bind({});
Outline.parameters = parameters;
Outline.args = {
  variant: ButtonVariant.Outline,
  ...defaultArgs,
};

export const OutlineWithIcon = Template.bind({});
OutlineWithIcon.parameters = parameters;
OutlineWithIcon.args = {
  variant: ButtonVariant.Outline,
  renderIcon,
  ...defaultArgs,
};
