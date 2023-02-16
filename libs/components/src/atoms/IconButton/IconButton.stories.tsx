import { ColorType } from '@proxym/themes';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { StorybookScreen, StorybookSection } from '../../storybook';
import { DeleteBinIcon, DownloadSquareIcon } from '../Icons';
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
  const buttonIcons: { icon: IconComponentType; fill?: string }[] = [
    { icon: DownloadSquareIcon },
    { icon: DeleteBinIcon, fill: ColorType.success },
  ];

  const renderIcon =
    (Icon: { icon: IconComponentType; fill?: string }) => (size: number) =>
      (
        <Icon.icon
          width={size}
          height={size}
          fill={Icon.fill ?? ColorType.primary}
        />
      );

  return (
    <StorybookScreen>
      {buttonIcons.map((Icon, i: number) => (
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
  onPress: () => {
    // This is a mock
  },
};

export const IconButton = Template.bind({});
IconButton.parameters = parameters;
IconButton.args = {
  ...defaultArgs,
};
