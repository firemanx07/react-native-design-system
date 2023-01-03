import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { StorybookScreen } from '../../storybook';
import {
  Avatar as AvatarBase,
  PropsType as AvatarProps,
  AvatarSize,
} from './Avatar';

const Story: ComponentMeta<typeof AvatarBase> = {
  component: AvatarBase,
  title: 'Atoms/Avatar',
};
export default Story;

const Template: ComponentStory<typeof AvatarBase> = (args: AvatarProps) => (
  <StorybookScreen title="Avatar:">
    <AvatarBase {...args} />
  </StorybookScreen>
);

const parameters = {
  controls: {
    include: ['uri', 'size'],
  },
};

const defaultArgs: AvatarProps = {
  size: AvatarSize.S,
};

export const Avatar = Template.bind({});
Avatar.parameters = parameters;
Avatar.args = {
  uri: 'https://picsum.photos/120/120',
  ...defaultArgs,
};

export const AvatarPlaceholder = Template.bind({});
AvatarPlaceholder.parameters = parameters;
AvatarPlaceholder.args = {
  ...defaultArgs,
};
