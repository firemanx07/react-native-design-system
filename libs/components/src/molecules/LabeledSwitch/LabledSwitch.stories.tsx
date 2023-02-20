import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { StorybookScreen, StorybookSection } from '../../storybook';
import {
  default as LabeledSwitchBase,
  LabeledSwitchProps,
  LabeledSwitchValues,
} from './LabeledSwitch';

const Story: ComponentMeta<typeof LabeledSwitchBase> = {
  component: LabeledSwitchBase,
  title: 'molecules/LabeledSwitch',
  argTypes: {
    initialValue: {
      control: { type: 'select' },
      options: Object.values(LabeledSwitchValues),
    },
  },
};
export default Story;

const noop = () => {
  // This is a mock
};

const Template: ComponentStory<typeof LabeledSwitchBase> = (
  args: LabeledSwitchProps,
) => {
  return (
    <StorybookScreen title="Labeled Switch:">
      <StorybookSection>
        <LabeledSwitchBase {...args} />
      </StorybookSection>
    </StorybookScreen>
  );
};

const parameters = {
  controls: {
    include: ['leftLabel', 'rightLabel', 'initialValue', 'width'],
  },
};

const defaultArgs: LabeledSwitchProps = {
  initialValue: LabeledSwitchValues.RIGHT,
  leftLabel: 'Branches',
  rightLabel: 'ATM',
  onChange: noop,
};

export const LabeledSwitch = Template.bind({});
LabeledSwitch.parameters = parameters;
LabeledSwitch.args = {
  ...defaultArgs,
};
