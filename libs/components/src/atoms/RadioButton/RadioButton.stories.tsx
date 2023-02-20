import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { StorybookScreen, StorybookSection } from '../../storybook';
import { default as RadioButtonBase, RadioButtonProps } from './RadioButton';

const Story: ComponentMeta<typeof RadioButtonBase> = {
  component: RadioButtonBase,
  title: 'Atoms/RadioButton',
  argTypes: {
    selected: {
      control: { type: 'select' },
      options: [true, false],
    },
  },
};
export default Story;
const noop = () => {
  // This is a mock
};
const Template: ComponentStory<typeof RadioButtonBase> = args => {
  return (
    <StorybookScreen>
      <StorybookSection title="Radio Button :">
        <RadioButtonBase {...args} />
      </StorybookSection>
      <StorybookSection title="Disabled:">
        <RadioButtonBase {...args} disabled />
      </StorybookSection>
      <StorybookSection title="active:">
        <RadioButtonBase {...args} disabled={false} selected />
      </StorybookSection>
      <StorybookSection title="inactive:">
        <RadioButtonBase {...args} disabled={false} selected={false} />
      </StorybookSection>
    </StorybookScreen>
  );
};

const parameters = {
  controls: {
    include: ['size', 'value', 'selected', 'disabled'],
  },
};

const defaultArgs: RadioButtonProps = {
  value: 'option 1',
  size: 24,
  selected: false,
  disabled: false,
  onSelect: noop,
};

export const RadioButton = Template.bind({});
RadioButton.parameters = parameters;
RadioButton.args = {
  ...defaultArgs,
};
