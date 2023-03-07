import { ColorType, useNamespacedTheme } from '@proxym/themes';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import {
  StorybookRow,
  StorybookScreen,
  StorybookSection,
} from '../../storybook';
import { Toggle as ToggleBase, PropsType as ToggleProps } from './Toggle';

const Story: ComponentMeta<typeof ToggleBase> = {
  component: ToggleBase,
  title: 'Atoms/Toggle',
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

const Template: ComponentStory<typeof ToggleBase> = (args: ToggleProps) => {
  const { colors } = useNamespacedTheme();
  return (
    <StorybookScreen title="Toggle:" style={{ backgroundColor: colors.light }}>
      <StorybookSection>
        <ToggleBase {...args} />
      </StorybookSection>
      <StorybookRow>
        <StorybookSection title="inactive">
          <ToggleBase onPress={noop} isActive={false} />
        </StorybookSection>
        <StorybookSection title="inactive - secondary">
          <ToggleBase
            onPress={noop}
            isActive={false}
            inActiveColor={colors.secondary}
          />
        </StorybookSection>
      </StorybookRow>
      <StorybookRow>
        <StorybookSection title="active">
          <ToggleBase onPress={noop} isActive />
        </StorybookSection>
        <StorybookSection title="active - secondary">
          <ToggleBase onPress={noop} isActive secondary />
        </StorybookSection>
      </StorybookRow>
      <StorybookSection title="disabled">
        <ToggleBase onPress={noop} isActive={false} disabled />
      </StorybookSection>
    </StorybookScreen>
  );
};

const parameters = {
  controls: {
    include: ['disabled', 'secondary', 'size', 'inActiveColor'],
  },
};

const defaultArgs: ToggleProps = {
  isActive: false,
  disabled: false,
  secondary: false,
  size: 24,
  onPress: noop,
};

export const Toggle = Template.bind({});
Toggle.parameters = parameters;
Toggle.args = {
  ...defaultArgs,
};
