import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { renderTabs, testTabs } from '../../../../test-utils/test-tabs-utils';
import TopTabBarBase from './TopTabBar';

const Tab = createMaterialTopTabNavigator();

const MockComponent = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarTestID: `tab-${route.name}`,
        })}
        tabBar={props => <TopTabBarBase {...props} />}
      >
        <Tab.Screen name="Simple" component={() => null} />
        <Tab.Screen name="Permanent" component={() => null} />
        <Tab.Screen name="Multiple" component={() => null} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

describe('TopTabBarBase', () => {
  it('renders a tab bar with correct label and marker positions', async () => {
    const { comp, tabs } = renderTabs({
      elem: <MockComponent />,
      testIDs: ['tab-Simple', 'tab-Permanent', 'tab-Multiple', 'marker'],
    });
    await testTabs({ comp, tabs });
    expect(tabs[3].props.style.transform[0].translateX).toBe(0);
  });
});
