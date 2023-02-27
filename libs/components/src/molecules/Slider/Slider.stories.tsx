import { useNamespacedTheme } from '@proxym/themes';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { StorybookScreen, StorybookSection } from '../../storybook';
import { default as SliderBase, SliderProps, SliderSize } from './Slider';

const Story: ComponentMeta<typeof SliderBase> = {
  component: SliderBase,
  title: 'Molecules/Slider',
  argTypes: {
    size: {
      control: { type: 'select' },
      options: Object.values(SliderSize).filter(
        item => typeof item === 'number',
      ),
    },
  },
};
export default Story;

const noop = () => {
  // This is a mock
};

const Template: ComponentStory<typeof SliderBase> = (args: SliderProps) => {
  const { colors } = useNamespacedTheme();
  return (
    <StorybookScreen
      title="Slider:"
      style={{ backgroundColor: colors.graySoft }}
    >
      <StorybookSection width={(args.width ?? 370) + 30}>
        <SliderBase {...args} />
      </StorybookSection>
    </StorybookScreen>
  );
};

const parameters = {
  controls: {
    include: [
      'label',
      'width',
      'size',
      'disabled',
      'min',
      'max',
      'step',
      'initialValue',
    ],
  },
};

const defaultArgs: SliderProps = {
  initialValue: 25,
  label: 'DT',
  min: 0,
  max: 100,
  onChange: noop,
  width: 300,
};

export const Slider = Template.bind({});
Slider.parameters = parameters;
Slider.args = {
  ...defaultArgs,
};
