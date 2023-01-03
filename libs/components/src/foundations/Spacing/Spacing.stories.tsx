import { Story } from '@storybook/react';
import React from 'react';

import { Spacing as SpacingBase } from './Spacing';

export default {
  component: SpacingBase,
  title: 'Foundations/Spacing',
};

const Template: Story = () => <SpacingBase />;

const parameters = {
  controls: {
    include: [],
  },
};

const defaultArgs = {};

export const Spacing = Template.bind({});

Spacing.parameters = parameters;
Spacing.args = {
  ...defaultArgs,
};
