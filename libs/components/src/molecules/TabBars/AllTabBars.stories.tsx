import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { StorybookScreen } from '../../storybook';
import { BottomTabBar } from './Bottom/BottomTabBar.stories';
import { TopTabBar } from './Top/TopTabBar.stories';

const Story: ComponentMeta<typeof StorybookScreen> = {
  component: StorybookScreen,
  title: 'molecules/TabBar',
};

const Template: ComponentStory<typeof StorybookScreen> = () => {
  return (
    <StorybookScreen title="All Tabs:">
      <TopTabBar children={null} />
      <BottomTabBar children={null} />
    </StorybookScreen>
  );
};

const parameters = {
  controls: {
    include: [],
  },
};

export default Story;

export const AllTabs = Template.bind({});
AllTabs.parameters = parameters;
