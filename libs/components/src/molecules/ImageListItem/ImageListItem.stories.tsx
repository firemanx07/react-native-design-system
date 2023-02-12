import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Image } from 'react-native';

import { Illustration, IllustrationName, IllustrationSize } from '../../atoms';
import { StorybookScreen, StorybookSection } from '../../storybook';
import {
  ImageListItem as ImageListItemBase,
  PropsType as ImageListItemProps,
} from './ImageListItem';

const Story: ComponentMeta<typeof ImageListItemBase> = {
  component: ImageListItemBase,
  title: 'Molecules/Image List Item',
};
export default Story;

const defaultArgs = {
  title: 'Recently added',
  subtitle: '300 files',
  hasArrow: true,
  renderImage: (size: number) => (
    <Image
      style={{ width: size, height: size }}
      source={{ uri: 'https://picsum.photos/64/64' }}
    />
  ),
};

const Template: ComponentStory<typeof ImageListItemBase> = (
  args: ImageListItemProps,
) => (
  <StorybookScreen title="ImageListItem:">
    <StorybookSection>
      <ImageListItemBase {...args} />
    </StorybookSection>
    <StorybookSection title="with Illustration">
      <ImageListItemBase
        {...defaultArgs}
        hasArrow={false}
        renderImage={() => (
          <Illustration
            name={IllustrationName.Cards}
            size={IllustrationSize.S}
          />
        )}
      />
    </StorybookSection>
    <StorybookSection title="with image">
      <ImageListItemBase {...defaultArgs} hasArrow={false} />
    </StorybookSection>
  </StorybookScreen>
);

const parameters = {
  controls: {
    include: ['title', 'subtitle', 'hasArrow'],
  },
};

export const ImageListItem = Template.bind({});
ImageListItem.parameters = parameters;
ImageListItem.args = {
  ...defaultArgs,
};
