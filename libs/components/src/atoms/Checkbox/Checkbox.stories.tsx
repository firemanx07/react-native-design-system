import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { StorybookScreen, StorybookSection } from '../../storybook';
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
  <StorybookScreen>
    <StorybookSection title="CheckBox:">
      <CheckboxBase {...args} />
    </StorybookSection>

    <StorybookSection title="Disabled:">
      <CheckboxBase {...args} disabled />
    </StorybookSection>
    <StorybookSection title="inactive:">
      <CheckboxBase {...args} disabled={false} isChecked={false} />
    </StorybookSection>
  </StorybookScreen>
);

const parameters = {
  controls: {
    include: ['size', 'isChecked', 'disabled'],
  },
};

const defaultArgs: CheckboxProps = {
  size: 20,
  isChecked: true,
  disabled: false,
  onPress: () => {},
};

export const Checkbox = Template.bind({});
Checkbox.parameters = parameters;
Checkbox.args = {
  ...defaultArgs,
};
