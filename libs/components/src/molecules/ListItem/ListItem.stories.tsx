import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { BellIcon } from '../../atoms';
import { StorybookScreen, StorybookSection } from '../../storybook';
import {
  ListItem as ListItemBase,
  PropsType as ListItemProps,
} from './ListItem';

const Story: ComponentMeta<typeof ListItemBase> = {
  component: ListItemBase,
  title: 'Molecules/List Item',
};
export default Story;

const renderIconLeft = (size: number, color: string) => (
  <BellIcon width={size} height={size} fill={color} />
);

const listItemText = 'notifications';

const Template: ComponentStory<typeof ListItemBase> = (args: ListItemProps) => (
  <StorybookScreen title="ListItem:">
    <StorybookSection>
      <ListItemBase {...args} />
    </StorybookSection>
    <StorybookSection>
      <ListItemBase renderIconLeft={renderIconLeft} hasArrow>
        {listItemText}
      </ListItemBase>
    </StorybookSection>
    <StorybookSection>
      <ListItemBase renderIconLeft={renderIconLeft} hasArrow notifications={1}>
        {listItemText}
      </ListItemBase>
    </StorybookSection>
    <StorybookSection>
      <ListItemBase renderIconLeft={renderIconLeft}>
        {listItemText}
      </ListItemBase>
    </StorybookSection>
    <StorybookSection>
      <ListItemBase renderIconLeft={renderIconLeft} notifications={1}>
        {listItemText}
      </ListItemBase>
    </StorybookSection>
  </StorybookScreen>
);

const parameters = {
  controls: {
    include: ['hasArrow', 'notifications', 'children'],
  },
};

const defaultArgs = {
  renderIconLeft,
  hasArrow: true,
  notifications: 1,
  children: listItemText,
};

export const ListItem = Template.bind({});
ListItem.parameters = parameters;
ListItem.args = {
  ...defaultArgs,
};
