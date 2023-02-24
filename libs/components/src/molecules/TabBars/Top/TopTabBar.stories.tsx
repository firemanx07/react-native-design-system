import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { StorybookScreen, StorybookSection } from '../../../storybook';
import { default as TopTabBarBase } from './TopTabBar';

const Tab = createMaterialTopTabNavigator();

const Story: ComponentMeta<typeof TopTabBarBase> = {
  component: TopTabBarBase,
  title: 'molecules/TabBar/TopTabBar',
};

const Template: ComponentStory<typeof TopTabBarBase> = args => {
  return (
    <NavigationContainer>
      <StorybookScreen title="Top TabBar:">
        <StorybookSection>
          <Tab.Navigator
            tabBar={(props: any) => <TopTabBarBase {...props} {...args} />}
          >
            <Tab.Screen name="Simple" component={() => null} />
            <Tab.Screen name="Permanent" component={() => null} />
            <Tab.Screen name="Multiple" component={() => null} />
          </Tab.Navigator>
        </StorybookSection>
      </StorybookScreen>
    </NavigationContainer>
  );
};
const parameters = {
  controls: {
    include: [],
  },
};
export default Story;

export const TopTabBar = Template.bind({});
TopTabBar.parameters = parameters;
