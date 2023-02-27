import { ColorType } from '@proxym/themes';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { StorybookScreen } from '../../../storybook';
import { default as NumberPickerBase, NumberPickerProps } from './NumberPicker';

const Story: ComponentMeta<typeof NumberPickerBase> = {
  component: NumberPickerBase,
  title: 'Atoms/Picker',
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ColorType,
    },
  },
};
export default Story;
const noop = () => {
  // This is a mock
};
const Template: ComponentStory<typeof NumberPickerBase> = args => {
  return (
    <StorybookScreen title="Number Picker :">
      <NumberPickerBase {...args} />
    </StorybookScreen>
  );
};

const parameters = {
  controls: {
    include: ['initialValue', 'color', 'width', 'step'],
  },
};

const defaultArgs: NumberPickerProps = {
  initialValue: 15,
  width: undefined,
  color: undefined,
  step: undefined,
  onChange: noop,
};

export const NumberPicker = Template.bind({});
NumberPicker.parameters = parameters;
NumberPicker.args = {
  ...defaultArgs,
};
