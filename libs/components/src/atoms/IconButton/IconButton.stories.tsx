import { ColorType } from '@proxym/themes';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { StorybookScreen, StorybookSection } from '../../storybook';
import { ConvertIcon, DeleteBinIcon, DownloadSquareIcon } from '../Icons';
import {
  IconButton as IconButtonBase,
  PropsType as IconButtonProps,
} from './IconButton';

const Story: ComponentMeta<typeof IconButtonBase> = {
  component: IconButtonBase,
  title: 'Atoms/Icon Button',
  argTypes: {
    iconColor: {
      control: { type: 'select' },
      options: ColorType,
    },
    shape: {
      control: { type: 'select' },
    },
    style: {
      control: {
        type: 'object',
      },
    },
  },
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
  const buttonIcons: { icon: IconComponentType; fill: ColorType }[] = [
    { icon: DownloadSquareIcon, fill: ColorType.secondary },
    { icon: DeleteBinIcon, fill: ColorType.success },
  ];

  const renderIcon =
    (Icon: IconComponentType) => (size: number, color: string) =>
      <Icon width={size} height={size} fill={color} />;

  return (
    <StorybookScreen>
      <StorybookSection title="Icon Button">
        <IconButtonBase renderIcon={renderIcon(ConvertIcon)} {...args} />
      </StorybookSection>
      {buttonIcons.map((Icon, i: number) => (
        <StorybookSection key={i}>
          <IconButtonBase
            renderIcon={renderIcon(Icon.icon)}
            {...args}
            iconColor={Icon.fill}
            style={{}}
          />
        </StorybookSection>
      ))}
    </StorybookScreen>
  );
};

const parameters = {
  controls: {
    include: ['disabled', 'shape', 'size', 'iconSize', 'iconColor', 'style'],
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
