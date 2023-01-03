import { Story } from '@storybook/react';
import React from 'react';

import { Colors as ColorsBase } from './Colors';

export default {
  component: ColorsBase,
  title: 'Foundations/Colors',
};

const Template: Story = () => <ColorsBase />;

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
