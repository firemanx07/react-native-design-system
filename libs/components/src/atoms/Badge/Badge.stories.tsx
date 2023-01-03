import { theme } from '@proxym/themes';
import { ComponentStory, Story } from '@storybook/react';
import React from 'react';

import {
  StorybookRow,
  StorybookScreen,
  StorybookSection,
} from '../../storybook';
import { DiamondIcon } from '../Icons';
import {
  Badge as BadgeBase,
  PropsType as BadgeProps,
  BadgeSize,
  BadgeVariant,
} from './Badge';

export default {
  component: BadgeBase,
  title: 'Atoms/Badge',
};

const roundedBadgeProps = {
  size: BadgeSize.Regular,
  variant: BadgeVariant.Rounded,
  children: '9',
};

const smallSquareBadgeProps = {
  size: BadgeSize.Small,
  variant: BadgeVariant.Square,
  children: 'NEW',
  style: { backgroundColor: theme.ds.colors.success },
  textStyle: { letterSpacing: 1.5 },
};

const regularSquareBadgeProps = {
  size: BadgeSize.Regular,
  variant: BadgeVariant.Square,
  children: 'Often chosen',
  style: { backgroundColor: theme.ds.colors.success },
};

const squareBadgeWithIconProps = {
  size: BadgeSize.Medium,
  variant: BadgeVariant.Square,
  contentColor: theme.ds.colors.primary,
  renderIconLeft: (size: number, color: string) => (
    <DiamondIcon width={size} height={size} fill={color} />
  ),
  children: 'Premium',
  style: { backgroundColor: theme.ds.colors.light },
};

const AllBadgesTemplate: Story = () => (
  <StorybookScreen title="All badges:">
    <StorybookRow>
      <StorybookSection title="Rounded Badge">
        <BadgeBase {...roundedBadgeProps} />
      </StorybookSection>
      <StorybookSection title="Small Square Badge">
        <BadgeBase {...smallSquareBadgeProps} />
      </StorybookSection>
      <StorybookSection title="Regular Square Badge">
        <BadgeBase {...regularSquareBadgeProps} />
      </StorybookSection>
    </StorybookRow>
    <StorybookRow>
      <StorybookSection title="Square Badge With Icon">
        <BadgeBase {...squareBadgeWithIconProps} />
      </StorybookSection>
    </StorybookRow>
  </StorybookScreen>
);

export const AllBadges = AllBadgesTemplate.bind({});

const Template: ComponentStory<typeof BadgeBase> = (args: BadgeProps) => (
  <StorybookScreen title="Badge:">
    <BadgeBase {...args} />
  </StorybookScreen>
);

const parameters = {
  controls: {
    include: ['size', 'children'],
  },
};

export const RoundedBadge = Template.bind({});
RoundedBadge.parameters = parameters;
RoundedBadge.args = roundedBadgeProps;

export const SmallSquareBadge = Template.bind({});
SmallSquareBadge.parameters = parameters;
SmallSquareBadge.args = smallSquareBadgeProps;

export const RegularSquareBadge = Template.bind({});
RegularSquareBadge.parameters = parameters;
RegularSquareBadge.args = regularSquareBadgeProps;

export const SquareBadgeWithIcon = Template.bind({});
SquareBadgeWithIcon.parameters = parameters;
SquareBadgeWithIcon.args = squareBadgeWithIconProps;
