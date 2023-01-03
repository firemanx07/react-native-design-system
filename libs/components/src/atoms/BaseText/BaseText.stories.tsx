import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { StorybookScreen } from '../../storybook';
import {
  BaseText as BaseTextBase,
  PropsType as BaseTextProps,
  TextVariant,
  TextWeight,
} from './BaseText';

const Story: ComponentMeta<typeof BaseTextBase> = {
  component: BaseTextBase,
  title: 'Atoms/Base Text',
  argTypes: {
    variant: {
      control: { type: 'radio' },
    },
    weight: {
      control: { type: 'radio' },
    },
  },
};
export default Story;

const Template: ComponentStory<typeof BaseTextBase> = (args: BaseTextProps) => (
  <StorybookScreen>
    <BaseTextBase {...args} />
  </StorybookScreen>
);

const parameters = {
  controls: {
    include: ['variant', 'weight', 'children'],
  },
};

const defaultArgs: BaseTextProps = {
  variant: TextVariant.H1,
  weight: TextWeight.Bold,
  children: 'This is BaseText component',
};

export const BaseText = Template.bind({});

BaseText.parameters = parameters;
BaseText.args = {
  ...defaultArgs,
};
