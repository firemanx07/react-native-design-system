import { useNamespacedTheme } from '@proxym/themes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import {
  ConverterIcon,
  HomeIcon,
  PersonIcon,
  PhoneIcon,
  PinIcon,
  RechargeIcon,
  SimulatorIcon,
  WalletIcon,
} from '../../../atoms';
import {
  StorybookRow,
  StorybookScreen,
  StorybookSection,
} from '../../../storybook';
import { default as BottomTabBarBase } from './BottomTabBar';

const Tab = createBottomTabNavigator();

const Story: ComponentMeta<typeof BottomTabBarBase> = {
  component: BottomTabBarBase,
  title: 'molecules/TabBar',
  decorators: [
    Story => (
      <StorybookScreen title="Bottom TabBar:">
        <Story />
      </StorybookScreen>
    ),
  ],
};

type IconComponentType = (props: {
  width?: number;
  height?: number;
  fill?: string;
}) => JSX.Element;
const Template: ComponentStory<typeof StorybookScreen> = args => {
  const { colors } = useNamespacedTheme();
  const LoggedInTabs: { icon: IconComponentType; name: string }[] = [
    { icon: HomeIcon, name: 'Dashboard' },
    { icon: WalletIcon, name: 'Accounts' },
    { icon: RechargeIcon, name: 'Transfers' },
    { icon: PersonIcon, name: 'Profile' },
  ];
  const GuestTabs: { icon: IconComponentType; name: string }[] = [
    { icon: ConverterIcon, name: 'Converter' },
    { icon: SimulatorIcon, name: 'Simulator' },
    { icon: PinIcon, name: 'Agencies' },
    { icon: PhoneIcon, name: 'Contact' },
  ];
  const renderIcon =
    (Icon: IconComponentType) =>
    ({ size, color }: { size: number; color: string }) =>
      <Icon width={size} height={size} fill={color} />;

  return (
    <StorybookRow>
      <StorybookSection
        title="Logged In:"
        style={{ backgroundColor: colors.graySoft }}
      >
        <NavigationContainer>
          <Tab.Navigator
            tabBar={(props: any) => <BottomTabBarBase {...props} {...args} />}
          >
            {LoggedInTabs.map(({ name, icon }) => (
              <Tab.Screen
                name={name}
                options={{ tabBarIcon: renderIcon(icon) }}
                component={() => null}
              />
            ))}
          </Tab.Navigator>
        </NavigationContainer>
      </StorybookSection>
      <StorybookSection
        title="Guest :"
        style={{ backgroundColor: colors.graySoft }}
      >
        <NavigationContainer>
          <Tab.Navigator
            tabBar={(props: any) => <BottomTabBarBase {...props} {...args} />}
          >
            {GuestTabs.map(({ name, icon }) => (
              <Tab.Screen
                name={name}
                options={{ tabBarIcon: renderIcon(icon) }}
                component={() => null}
              />
            ))}
          </Tab.Navigator>
        </NavigationContainer>
      </StorybookSection>
    </StorybookRow>
  );
};
const parameters = {
  controls: {
    include: [],
  },
};
export default Story;

export const BottomTabBar = Template.bind({});
BottomTabBar.parameters = parameters;
