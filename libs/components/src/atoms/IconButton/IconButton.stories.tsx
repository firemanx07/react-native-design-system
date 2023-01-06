import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { StorybookScreen, StorybookSection } from '../../storybook';
import {
  HeartOutlineIcon,
  HeartIcon,
  StarOutlineIcon,
  StarIcon,
  DownloadIcon,
} from '../Icons';
import {
  IconButton as IconButtonBase,
  PropsType as IconButtonProps,
} from './IconButton';

const Story: ComponentMeta<typeof IconButtonBase> = {
  component: IconButtonBase,
  title: 'Atoms/Icon Button',
};
export default Story;

type IconComponentType = (props: {
  width?: number;
  height?: number;
  fill?: string;
}) => JSX.Element;

const Template: ComponentStory<typeof IconButtonBase> = (
  args: Omit<IconButtonProps, 'renderIcon'>,
) => {
  const buttonIcons = [
    HeartOutlineIcon,
    HeartIcon,
    StarOutlineIcon,
    StarIcon,
    DownloadIcon,
  ];

  const renderIcon =
    (Icon: IconComponentType) => (size: number, color: string) =>
      <Icon width={size} height={size} fill={color} />;

  return (
    <StorybookScreen>
      {buttonIcons.map((Icon: IconComponentType, i: number) => (
        <StorybookSection key={i}>
          <IconButtonBase renderIcon={renderIcon(Icon)} {...args} />
        </StorybookSection>
      ))}
    </StorybookScreen>
  );
};

const parameters = {
  controls: {
    include: ['disabled', 'size', 'iconSize'],
  },
};

const defaultArgs: Omit<IconButtonProps, 'renderIcon'> = {
  size: 34,
  iconSize: 20,
  disabled: false,
  onPress: () => {},
};

export const IconButton = Template.bind({});
IconButton.parameters = parameters;
IconButton.args = {
  ...defaultArgs,
};
