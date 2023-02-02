import { Story } from '@storybook/react';
import React from 'react';

import { Colors as ColorsBase } from './Colors';
import { StorybookScreen } from '../../storybook';

export default {
  component: ColorsBase,
  title: 'Foundations/Colors',
};

const Template: Story = () =>   <StorybookScreen title="Colors:"><ColorsBase /></StorybookScreen>;

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
