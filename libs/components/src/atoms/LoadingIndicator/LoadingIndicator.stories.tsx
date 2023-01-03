import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { StorybookScreen } from '../../storybook';
import {
  LoadingIndicator as LoadingIndicatorBase,
  PropsType as LoadingIndicatorProps,
} from './LoadingIndicator';

const Story: ComponentMeta<typeof LoadingIndicatorBase> = {
  component: LoadingIndicatorBase,
  title: 'Atoms/Loading Indicator',
};
export default Story;

const Template: ComponentStory<typeof LoadingIndicatorBase> = (
  args: LoadingIndicatorProps
) => (
  <StorybookScreen>
    <LoadingIndicatorBase {...args} />
  </StorybookScreen>
);

const parameters = {
  controls: {
    include: ['color', 'size', 'betweenSpace'],
  },
};

const defaultArgs: LoadingIndicatorProps = {
  color: 'black',
  size: 20,
  betweenSpace: 5,
};

export const LoadingIndicator = Template.bind({});

LoadingIndicator.parameters = parameters;
LoadingIndicator.args = {
  ...defaultArgs,
};
