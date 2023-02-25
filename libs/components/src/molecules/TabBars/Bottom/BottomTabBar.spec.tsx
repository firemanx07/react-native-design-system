import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { renderTabs, testTabs } from '../../../../test-utils/test-tabs-utils';
import { HomeIcon } from '../../../atoms';
import BottomTabBarBase from './BottomTabBar';

const Tab = createBottomTabNavigator();

const MockComponent = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarTestID: `tab-${route.name}`,
        })}
        tabBar={props => <BottomTabBarBase {...props} />}
      >
        <Tab.Screen
          name="Home"
          component={() => null}
          options={{
            tabBarIcon: ({ size, color }) => (
              <HomeIcon width={size} height={size} fill={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Accounts"
          component={() => null}
          options={{
            tabBarIcon: ({ size, color }) => (
              <HomeIcon width={size} height={size} fill={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={() => null}
          options={{
            tabBarIcon: ({ size, color }) => (
              <HomeIcon width={size} height={size} fill={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

describe('BottomTabBarBase', () => {
  it('renders a tab bar with correct label and marker positions', async () => {
    const { comp, tabs } = renderTabs({
      elem: <MockComponent />,
      testIDs: ['tab-Home', 'tab-Accounts', 'tab-Profile', 'marker'],
    });
    await testTabs({ comp, tabs });
    expect(comp.toJSON()).toMatchSnapshot();
    expect(tabs[3].props.style.transform[0].translateX).toBe(0);
  });
});
