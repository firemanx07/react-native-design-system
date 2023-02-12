import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { StorybookScreen } from '../../storybook';
import {
  Illustration as IllustrationBase,
  PropsType as IllustrationProps,
  IllustrationSize,
  IllustrationName,
} from './Illustration';

const Story: ComponentMeta<typeof IllustrationBase> = {
  component: IllustrationBase,
  title: 'Atoms/Illustration',
};
export default Story;

const Template: ComponentStory<typeof IllustrationBase> = (
  args: IllustrationProps,
) => (
  <StorybookScreen title="Illustration:">
    <IllustrationBase {...args} />
  </StorybookScreen>
);

const parameters = {
  controls: {
    include: ['size', 'name'],
  },
};

export const Illustration = Template.bind({});
Illustration.parameters = parameters;
Illustration.args = {
  size: IllustrationSize.XL,
  name: IllustrationName.Board,
};
