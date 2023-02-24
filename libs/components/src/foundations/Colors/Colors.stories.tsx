import { Story } from '@storybook/react';
import React from 'react';

import { StorybookScreen } from '../../storybook';
import { Colors as ColorsBase } from './Colors';

export default {
  component: ColorsBase,
  title: 'Foundations/Colors',
};

const Template: Story = () => (
  <StorybookScreen title="Colors:">
    <ColorsBase />
  </StorybookScreen>
);

const parameters = {
  controls: {
    include: [],
  },
};

const defaultArgs = {};

export const Colors = Template.bind({});

Colors.parameters = parameters;
Colors.args = {
  ...defaultArgs,
};
