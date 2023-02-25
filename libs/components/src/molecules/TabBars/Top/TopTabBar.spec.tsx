import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { waitFor } from '@testing-library/react-native';
import React from 'react';

import { customRender } from '../../../../test-utils';
import TopTabBarBase from './TopTabBar';

const Tab = createMaterialTopTabNavigator();

const TestComponent = () => {
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
    const comp = customRender(<TestComponent />);
    const { getByTestId, getByText } = comp;
    const tab1 = getByTestId('tab-Simple');
    const tab2 = getByTestId('tab-Permanent');
    const tab3 = getByTestId('tab-Multiple');
    const marker = getByTestId('marker');
    const labelText = getByText('Simple');
    await waitFor(() => {
      expect(comp).toBeTruthy();
      expect(tab1).toBeDefined();
      expect(tab2).toBeDefined();
      expect(tab3).toBeDefined();
      expect(marker).toBeDefined();
      expect(marker.props.style.transform[0].translateX).toBe(0);
      expect(labelText.props.style.color).toMatch('rgba(44, 44, 44, 1)');
    });
  });
});
