import { ColorType } from '@proxym/themes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { waitFor } from '@testing-library/react-native';
import React from 'react';

import { customRender } from '../../../../test-utils';
import { HomeIcon } from '../../../atoms';
import BottomTabBarBase from './BottomTabBar';

const Tab = createBottomTabNavigator();

const TestComponent = () => {
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
    const comp = customRender(<TestComponent />);
    const { getByTestId, getByText } = comp;
    const tab1 = getByTestId('tab-Home');
    const tab2 = getByTestId('tab-Accounts');
    const tab3 = getByTestId('tab-Profile');
    const marker = getByTestId('marker');
    const labelText = getByText('Accounts');

    await waitFor(() => {
      expect(comp).toBeTruthy();
      expect(comp.toJSON()).toMatchSnapshot();
      expect(tab1).toBeDefined();
      expect(tab2).toBeDefined();
      expect(tab3).toBeDefined();
      expect(marker).toBeDefined();
      expect(marker.props.style.transform[0].translateX).toBe(0);
      expect(labelText.props.style.color).toMatch(ColorType.dark);
    });
  });
});
