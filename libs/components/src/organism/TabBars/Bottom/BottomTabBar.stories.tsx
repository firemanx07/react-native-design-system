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
  title: 'Organism/TabBar',
  decorators: [
    StoryComponent => (
      <StorybookScreen title="Bottom TabBar:">
        <StoryComponent />
      </StorybookScreen>
    ),
  ],
};

type IconComponentType = (props: {
  width?: number;
  height?: number;
  fill?: string;
}) => JSX.Element;
type TabsList = { icon: IconComponentType; name: string }[];
const NOOP = () => null;
const Template: ComponentStory<typeof StorybookScreen> = args => {
  const { colors } = useNamespacedTheme();

  const LoggedInTabs: TabsList = [
    { icon: HomeIcon, name: 'Dashboard' },
    { icon: WalletIcon, name: 'Accounts' },
    { icon: RechargeIcon, name: 'Transfers' },
    { icon: PersonIcon, name: 'Profile' },
  ];
  const GuestTabs: TabsList = [
    { icon: ConverterIcon, name: 'Converter' },
    { icon: SimulatorIcon, name: 'Simulator' },
    { icon: PinIcon, name: 'Agencies' },
    { icon: PhoneIcon, name: 'Contact' },
  ];
  const renderIcon =
    (Icon: IconComponentType) =>
    ({ size, color }: { size: number; color: string }) =>
      <Icon width={size} height={size} fill={color} />;
  const renderBottomTabs = (Tabs: TabsList) =>
    Tabs.map(({ name, icon }) => (
      <Tab.Screen
        name={name}
        options={{ tabBarIcon: renderIcon(icon) }}
        component={NOOP}
      />
    ));

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
            {renderBottomTabs(LoggedInTabs)}
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
            {renderBottomTabs(GuestTabs)}
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
  docs: {
    source: {
      code:
        'import BottomTabBar from "@proxym/components"; \n \n' +
        'const Tab = createBottomTabNavigator();\n\n' +
        'const renderIcon = (Icon: IconComponentType) =>\n' +
        '({ size, color }: { size: number; color: string }) =>\n' +
        ' <Icon width={size} height={size} fill={color} />;\n\n' +
        '<Tab.Navigator tabBar={(props: any) => <BottomTabBar {...props}  />} >\n' +
        '   <Tab.Screen  options={{ tabBarIcon: renderIcon(HomeIcon) }} name="Dasboard" component="null"/>\n' +
        '   <Tab.Screen  options={{ tabBarIcon: renderIcon(WalletIcon) }} name="Accounts" component="null"/>\n' +
        '   <Tab.Screen  options={{ tabBarIcon: renderIcon(RechargeIcon) }} name="Transfers" component="null"/>\n' +
        '   <Tab.Screen  options={{ tabBarIcon: renderIcon(PersonIcon) }} name="Profile" component="null"/>\n' +
        '</Tab.Navigator>',
      language: 'jsx',
      type: 'dynamic',
    },
  },
};
export default Story;

export const BottomTabBar = Template.bind({});
BottomTabBar.parameters = parameters;
