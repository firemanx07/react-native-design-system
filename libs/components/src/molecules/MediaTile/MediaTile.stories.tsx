import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import {
  StorybookRow,
  StorybookScreen,
  StorybookSection,
  StorybookSectionText,
} from '../../storybook';
import {
  MediaTile as MediaTileBase,
  PropsType as MediaTileProps,
} from './MediaTile';

const Story: ComponentMeta<typeof MediaTileBase> = {
  component: MediaTileBase,
  title: 'Molecules/MediaTile',
};
export default Story;

const commonProps = {
  source: { uri: 'https://picsum.photos/124/124' },
  size: 124,
  labels: {
    new: 'New',
    unlock: 'Freishalten',
  },
};

const Template: ComponentStory<typeof MediaTileBase> = (
  args: MediaTileProps
) => (
  <StorybookScreen title="MediaTile:">
    <StorybookSection>
      <MediaTileBase {...args} />
    </StorybookSection>
    <StorybookSectionText>Sample variants:</StorybookSectionText>
    <StorybookRow>
      <StorybookSection title="New - Comment">
        <MediaTileBase {...commonProps} isNew hasComment />
      </StorybookSection>
      <StorybookSection title="New - Selectable">
        <MediaTileBase {...commonProps} isNew isSelectable />
      </StorybookSection>
      <StorybookSection title="New - Selected">
        <MediaTileBase {...commonProps} isSelectable isNew isSelected />
      </StorybookSection>
    </StorybookRow>
    <StorybookRow>
      <StorybookSection title="Video">
        <MediaTileBase {...commonProps} videoDuration="01:22" />
      </StorybookSection>
      <StorybookSection title="Video - New - Comment">
        <MediaTileBase
          {...commonProps}
          videoDuration="01:22"
          isNew
          hasComment
        />
      </StorybookSection>
      <StorybookSection title="Unlock button">
        <MediaTileBase {...commonProps} showUnlockButton />
      </StorybookSection>
    </StorybookRow>
  </StorybookScreen>
);

const parameters = {
  controls: {
    include: [
      'uri',
      'size',
      'labels',
      'isNew',
      'hasComment',
      'isSelectable',
      'isSelected',
      'showUnlockButton',
      'videoDuration',
    ],
  },
};

const defaultArgs: MediaTileProps = {
  ...commonProps,
  isNew: false,
  hasComment: false,
  isSelectable: false,
  isSelected: false,
  showUnlockButton: false,
  videoDuration: '',
};

export const MediaTile = Template.bind({});
MediaTile.parameters = parameters;
MediaTile.args = {
  ...defaultArgs,
};
