import { ColorType } from '@proxym/themes';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { StorybookScreen } from '../../storybook';
import { Circle as CircleBase } from '../Circle';

const Story: ComponentMeta<typeof CircleBase> = {
  component: CircleBase,
  title: 'Atoms/Circle',
  argTypes: {
    color: {
      control: { type: 'color' },
      options: ColorType,
    },
  },
};
export default Story;
const Template: ComponentStory<typeof CircleBase> = ({ size, color }) => {
  return (
    <StorybookScreen title="Circle :">
      <CircleBase size={size} color={color} />
    </StorybookScreen>
  );
};

const parameters = {
  controls: {
    include: ['size', 'color'],
  },
};

const defaultArgs = {
  size: 20,
  color: '#4D37D9',
};

export const Circle = Template.bind({});
Circle.parameters = parameters;
Circle.args = {
  ...defaultArgs,
};
