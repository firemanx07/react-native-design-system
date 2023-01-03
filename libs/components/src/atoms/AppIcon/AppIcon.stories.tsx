import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { AppIcon as AppIconBase, PropsType as AppIconProps } from './AppIcon';

const Story: ComponentMeta<typeof AppIconBase> = {
  component: AppIconBase,
  title: 'Atoms/AppIcon',
};
export default Story;

const Template: ComponentStory<typeof AppIconBase> = (args: AppIconProps) => (
  <AppIconBase {...args} />
);

const parameters = {
  controls: {
    include: ['size', 'isLight'],
  },
};

const defaultArgs: AppIconProps = {
  size: 85,
  isLight: false,
};

export const AppIcon = Template.bind({});
AppIcon.parameters = parameters;
AppIcon.args = {
  ...defaultArgs,
};
