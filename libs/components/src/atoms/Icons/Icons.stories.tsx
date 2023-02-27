import {
  ColorType,
  IconSizeType,
  styled,
  useNamespacedTheme,
} from '@proxym/themes';
import type { Story } from '@storybook/react';
import { themes } from '@storybook/theming';
import React, { useCallback, useMemo } from 'react';

import {
  StorybookRow,
  StorybookScreen,
  StorybookSection,
  StorybookSectionText,
} from '../../storybook';
import { BaseText } from '../BaseText';
import * as bkrise from './bankeriseIcons';
import * as custom from './customIcons';

export default {
  title: 'Atoms/Icons',
  argTypes: {
    size: {
      control: { type: 'select' },
      options: Object.values(IconSizeType).filter(
        item => typeof item === 'number',
      ),
    },
    color: {
      control: { type: 'select' },
      options: ColorType,
    },
  },
};

type IconType = {
  width?: number;
  height?: number;
  fill?: string;
};

type IconsType = { [key: string]: (props: IconType) => JSX.Element };

const bkriseIcons = bkrise as IconsType;
const customIcons = custom as IconsType;

const ICON_WRAPPER_WIDTH = 270;
const ICON_WRAPPER_MARGIN = 10;
const ICONS_IN_ROW = 4;
const { light, graySoft, grayUltraLight, errorLight, successLight } = ColorType;

const Template: Story = ({ size, color }) => {
  const { iconSize } = useNamespacedTheme();
  const isLight = [
    light,
    graySoft,
    grayUltraLight,
    errorLight,
    successLight,
  ].includes(color);

  const iconSizeKeys = useMemo(
    () =>
      Object.values(iconSize).filter(
        (value: string | number) => typeof value === 'string',
      ),
    [iconSize],
  );

  const renderIconSize = useCallback(
    (key: any) => {
      return (
        <StorybookSectionText
          key={key}
        >{`${key}: ${iconSize[key]}px`}</StorybookSectionText>
      );
    },
    [iconSize],
  );

  const renderIcon = useCallback(
    (key: string) => {
      const Icon = bkriseIcons[key];
      return (
        <IconWrapper key={key} width={ICON_WRAPPER_WIDTH} isLight={isLight}>
          <Icon
            width={size || iconSize.primary}
            height={size || iconSize.primary}
            fill={color}
          />
          <IconName isLight={isLight}>{key}</IconName>
        </IconWrapper>
      );
    },
    [size, color, isLight, iconSize.primary],
  );

  return (
    <StorybookScreen>
      <StorybookSection title="Supported icon sizes:">
        {iconSizeKeys.map(renderIconSize)}
      </StorybookSection>
      <StorybookSectionText>All icons:</StorybookSectionText>
      <IconsWrapper>{Object.keys(bkriseIcons).map(renderIcon)}</IconsWrapper>
    </StorybookScreen>
  );
};
const CustomIconsTemplate: Story = ({ size }) => {
  const { iconSize, colors } = useNamespacedTheme();

  const renderIcon = useCallback(
    (key: string) => {
      const Icon = customIcons[key];
      return (
        <IconWrapper key={key} width={ICON_WRAPPER_WIDTH}>
          <Icon
            width={size || iconSize.large}
            height={size || iconSize.large}
            fill={colors.secondary}
          />
          <IconName>{key}</IconName>
        </IconWrapper>
      );
    },
    [size],
  );

  return (
    <StorybookScreen>
      <StorybookSectionText>Custom icons:</StorybookSectionText>
      <IconsWrapper>{Object.keys(customIcons).map(renderIcon)}</IconsWrapper>
    </StorybookScreen>
  );
};
const IconsWrapper = styled(StorybookRow)`
  width: ${ICON_WRAPPER_WIDTH * ICONS_IN_ROW +
  ICON_WRAPPER_MARGIN * ICONS_IN_ROW}px;
  flex-wrap: wrap;
  justify-content: center;
`;
type IconWrapperProps = {
  isLight?: boolean;
};

const IconWrapper = styled(StorybookSection)<IconWrapperProps>`
  flex-direction: row;
  align-items: center;
  width: ${ICON_WRAPPER_WIDTH}px;
  margin: 0 ${ICON_WRAPPER_MARGIN}px ${ICON_WRAPPER_MARGIN}px 0;
  overflow: hidden;
  ${props => props.isLight && 'background-color: ' + themes.dark.appBg};
`;

type IconNameType = {
  isLight?: boolean;
};

const IconName = styled(BaseText)<IconNameType>`
  padding-left: ${({ theme }) => theme.ds.spacing.primary}px;
  ${props => !!props.isLight && 'color: ' + themes.dark.textColor};
`;

const parameters = {
  controls: {
    include: ['size', 'color'],
  },
};

const defaultArgs = {
  size: undefined,
  color: ColorType.dark,
};

export const BaseIcons = Template.bind({});
BaseIcons.parameters = parameters;
BaseIcons.args = {
  ...defaultArgs,
};
export const CustomIcons = CustomIconsTemplate.bind({});
CustomIcons.parameters = parameters;
CustomIcons.parameters.controls.include = ['size'];
