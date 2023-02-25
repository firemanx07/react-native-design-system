import { useNamespacedTheme } from '@proxym/themes';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { StorybookScreen, StorybookSection } from '../../../storybook';
import { default as TopTabBarBase } from './TopTabBar';

const Tab = createMaterialTopTabNavigator();

const Story: ComponentMeta<typeof TopTabBarBase> = {
  component: TopTabBarBase,
  title: 'molecules/TabBar',
  decorators: [
    StoryComponent => (
      <StorybookScreen title="Top TabBar:">
        <StoryComponent />
      </StorybookScreen>
    ),
  ],
};

const Template: ComponentStory<typeof StorybookScreen> = args => {
  const { colors } = useNamespacedTheme();
  return (
    <NavigationContainer>
      <StorybookSection
        title="Top TabBar:"
        style={{ backgroundColor: colors.light }}
      >
        <Tab.Navigator
          tabBar={(props: any) => <TopTabBarBase {...props} {...args} />}
        >
          <Tab.Screen name="Simple" component={() => null} />
          <Tab.Screen name="Permanent" component={() => null} />
          <Tab.Screen name="Multiple" component={() => null} />
        </Tab.Navigator>
      </StorybookSection>
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
