import { ColorType } from '@proxym/themes';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import {
  StorybookRow,
  StorybookScreen,
  StorybookSection,
  StorybookSectionText,
} from '../../storybook';
import { Logo as LogoBase, PropsType as LogoProps } from './Logo';

const Story: ComponentMeta<typeof LogoBase> = {
  component: LogoBase,
  title: 'Atoms/Logo',
  argTypes: {
    color: {
      control: { type: 'color' },
    },
  },
};
export default Story;

const defaultArgs: LogoProps = {
  color: '#222222',
  width: 131,
};

const Template: ComponentStory<typeof LogoBase> = (args: LogoProps) => (
  <StorybookScreen>
    <StorybookSection>
      <LogoBase {...args} />
    </StorybookSection>
    <StorybookSectionText>Sample variants:</StorybookSectionText>
    <StorybookRow>
      <StorybookSection title="Color primary">
        <LogoBase {...defaultArgs} color={ColorType.primary} />
      </StorybookSection>
      <StorybookSection title="Color dark">
        <LogoBase {...defaultArgs} color={ColorType.dark} />
      </StorybookSection>
      <StorybookSection title="Color light">
        <LogoBase {...defaultArgs} color={ColorType.light} />
      </StorybookSection>
    </StorybookRow>
  </StorybookScreen>
);

const parameters = {
  controls: {
    include: ['color', 'width'],
  },
};

export const Logo = Template.bind({});
Logo.parameters = parameters;
Logo.args = {
  ...defaultArgs,
};
