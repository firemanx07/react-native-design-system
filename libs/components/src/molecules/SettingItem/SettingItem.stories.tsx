import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { StorybookScreen, StorybookSection } from '../../storybook';
import {
  SettingItem as SettingItemBase,
  PropsType as SettingItemProps,
} from './SettingItem';

const Story: ComponentMeta<typeof SettingItemBase> = {
  component: SettingItemBase,
  title: 'Molecules/Setting Item',
};
export default Story;

const Template: ComponentStory<typeof SettingItemBase> = (
  args: SettingItemProps,
) => (
  <StorybookScreen title="SettingItem:">
    <StorybookSection>
      <SettingItemBase {...args} />
    </StorybookSection>
    <StorybookSection>
      <SettingItemBase {...args} isActive />
    </StorybookSection>
  </StorybookScreen>
);

const parameters = {
  controls: {
    include: ['title', 'subtitle', 'disabled'],
  },
};

const defaultArgs = {
  title: 'Likes',
  subtitle: 'Someone liked your photos',
  onToggle: () => {
    //this is mock
  },
  isActive: false,
  disabled: false,
};

export const SettingItem = Template.bind({});
SettingItem.parameters = parameters;
SettingItem.args = {
  ...defaultArgs,
};
