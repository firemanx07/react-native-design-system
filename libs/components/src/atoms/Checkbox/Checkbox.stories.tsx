import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { StorybookScreen } from '../../storybook';
import {
  Checkbox as CheckboxBase,
  PropsType as CheckboxProps,
} from './Checkbox';

const Story: ComponentMeta<typeof CheckboxBase> = {
  component: CheckboxBase,
  title: 'Atoms/Checkbox',
};
export default Story;

const Template: ComponentStory<typeof CheckboxBase> = (args: CheckboxProps) => (
  <StorybookScreen title="Checkbox:">
    <CheckboxBase {...args} />
  </StorybookScreen>
);

const parameters = {
  controls: {
    include: ['size', 'isChecked'],
  },
};

const defaultArgs: CheckboxProps = {
  size: 20,
  isChecked: true,
  onPress: () => {},
};

export const Checkbox = Template.bind({});
Checkbox.parameters = parameters;
Checkbox.args = {
  ...defaultArgs,
};
