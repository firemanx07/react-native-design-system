import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import {
  StorybookRow,
  StorybookScreen,
  StorybookSection,
} from '../../storybook';
import { default as TextInputFieldBase, TextProps } from './TextInputField';

const Story: ComponentMeta<typeof TextInputFieldBase> = {
  component: TextInputFieldBase,
  title: 'molecules/TextInputField',
};
export default Story;

const noop = () => {
  // This is a mock
};
const Template: ComponentStory<typeof TextInputFieldBase> = args => {
  return (
    <StorybookScreen title="Text Input Field:">
      <StorybookSection>
        <TextInputFieldBase {...args} />
      </StorybookSection>
      <StorybookRow>
        <StorybookSection title="Disabled input field with text:">
          <TextInputFieldBase
            {...args}
            value="Value"
            editable={false}
            isError={false}
            onChangeText={noop}
          />
        </StorybookSection>
        <StorybookSection title="Success input field with text:">
          <TextInputFieldBase {...args} value="Success Value" isError={false} />
        </StorybookSection>
        <StorybookSection title="Error input field with text:">
          <TextInputFieldBase
            {...args}
            isError
            errorMessage="Oops! Somethings not right here."
          />
        </StorybookSection>
      </StorybookRow>
    </StorybookScreen>
  );
};

const parameters = {
  controls: {
    include: [
      'placeholder',
      'value',
      'isValid',
      'isError',
      'editable',
      'errorMessage',
    ],
  },
};
const defaultArgs: TextProps = {
  onChangeText: noop,
  placeholder: 'Placeholder',
  value: '',
  editable: true,
  isError: false,
  errorMessage: 'Oops ! Somethings not right here.',
};
export const TextInputField = Template.bind({});
TextInputField.parameters = parameters;
TextInputField.args = {
  ...defaultArgs,
};
