import { ColorType, useNamespacedTheme } from '@proxym/themes';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import {
  StorybookRow,
  StorybookScreen,
  StorybookSection,
} from '../../storybook';
import { Switch as SwitchBase, PropsType as SwitchProps } from './Switch';

const Story: ComponentMeta<typeof SwitchBase> = {
  component: SwitchBase,
  title: 'Atoms/Switch',
  argTypes: {
    inActiveColor: {
      control: { type: 'select' },
      options: ColorType,
    },
  },
};
export default Story;

const noop = () => {
  // This is a mock
};

const Template: ComponentStory<typeof SwitchBase> = (args: SwitchProps) => {
  const { colors } = useNamespacedTheme();
  return (
    <StorybookScreen title="Switch:" style={{ backgroundColor: colors.light }}>
      <StorybookSection>
        <SwitchBase {...args} />
      </StorybookSection>
      <StorybookRow>
        <StorybookSection title="inactive">
          <SwitchBase onPress={noop} isActive={false} />
        </StorybookSection>
        <StorybookSection title="inactive - secondary">
          <SwitchBase
            onPress={noop}
            isActive={false}
            inActiveColor={colors.secondary}
          />
        </StorybookSection>
      </StorybookRow>
      <StorybookRow>
        <StorybookSection title="active">
          <SwitchBase onPress={noop} isActive />
        </StorybookSection>
        <StorybookSection title="active - secondary">
          <SwitchBase onPress={noop} isActive secondary />
        </StorybookSection>
      </StorybookRow>
      <StorybookSection title="disabled">
        <SwitchBase onPress={noop} isActive={false} disabled />
      </StorybookSection>
    </StorybookScreen>
  );
};

const parameters = {
  controls: {
    include: ['disabled', 'secondary', 'size', 'inActiveColor'],
  },
};

const defaultArgs: SwitchProps = {
  isActive: false,
  disabled: false,
  secondary: false,
  size: 24,
  onPress: noop,
};

export const Switch = Template.bind({});
Switch.parameters = parameters;
Switch.args = {
  ...defaultArgs,
};
