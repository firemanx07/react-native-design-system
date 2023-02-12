import { ColorType } from '@proxym/themes';
import { ComponentMeta, ComponentStory } from '@storybook/react';
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
      control: { type: 'select' },
      options: ColorType,
    },
  },
};
export default Story;

const defaultArgs: LogoProps = {
  color: ColorType.dark,
  width: 131,
};

const Template: ComponentStory<typeof LogoBase> = (args: LogoProps) => (
  <StorybookScreen style={{ backgroundColor: ColorType.graySoft }}>
    <StorybookSection>
      <LogoBase {...args} />
    </StorybookSection>
    <StorybookSectionText style={{ color: ColorType.dark }}>
      Sample variants:
    </StorybookSectionText>
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
