import { useNamespacedTheme } from '@proxym/themes';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { StorybookScreen, StorybookSection } from '../../storybook';
import { Toggle as ToggleBase, PropsType as ToggleProps } from './Toggle';

const Story: ComponentMeta<typeof ToggleBase> = {
  component: ToggleBase,
  title: 'Atoms/Toggle',
};
export default Story;

const noop = () => {};

const Template: ComponentStory<typeof ToggleBase> = (args: ToggleProps) => {
  const { colors } = useNamespacedTheme();
  return (
    <StorybookScreen title="Toggle:" style={{ backgroundColor: colors.light }}>
      <StorybookSection>
        <ToggleBase {...args} />
      </StorybookSection>
      <StorybookSection title="inactive">
        <ToggleBase onPress={noop} isActive={false} />
      </StorybookSection>
      <StorybookSection title="inactive - secondary">
        <ToggleBase onPress={noop} isActive={false} secondary />
      </StorybookSection>
      <StorybookSection title="active">
        <ToggleBase onPress={noop} isActive />
      </StorybookSection>
      <StorybookSection title="disabled">
        <ToggleBase onPress={noop} isActive={false} disabled />
      </StorybookSection>
    </StorybookScreen>
  );
};

const parameters = {
  controls: {
    include: ['disabled', 'secondary', 'size'],
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
