import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { StorybookScreen, StorybookSection } from '../../storybook';
import {
  LabelButton as LabelButtonBase,
  PropsType as LabelButtonProps,
  LabelButtonVariant,
} from './LabelButton';

const Story: ComponentMeta<typeof LabelButtonBase> = {
  component: LabelButtonBase,
  title: 'Atoms/Label Button',
  argTypes: {
    variant: {
      control: { type: 'radio' },
    },
  },
};
export default Story;

const Template: ComponentStory<typeof LabelButtonBase> = (
  args: LabelButtonProps
) => (
  <StorybookScreen>
    <StorybookSection>
      <LabelButtonBase {...args} />
    </StorybookSection>
  </StorybookScreen>
);

const parameters = {
  controls: {
    include: ['variant', 'disabled', 'underline', 'children'],
  },
};

const defaultArgs: LabelButtonProps = {
  variant: LabelButtonVariant.Regular,
  disabled: false,
  underline: false,
  children: 'Label Button Text',
  onPress: () => {},
};

export const LabelButton = Template.bind({});
LabelButton.parameters = parameters;
LabelButton.args = {
  ...defaultArgs,
};
