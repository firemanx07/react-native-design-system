import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { AddPersonIcon, EyeIcon } from '../../atoms';
import {
  StorybookRow,
  StorybookScreen,
  StorybookSection,
} from '../../storybook';
import {
  BaseTextInputProps,
  default as TextInputFieldBase,
} from './TextInputField';

const Story: ComponentMeta<typeof TextInputFieldBase> = {
  component: TextInputFieldBase,
  title: 'Molecules/TextInputField',
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
            label="disabled Text input"
            multiline={false}
            onChangeText={noop}
            width={300}
          />
        </StorybookSection>
        <StorybookSection title="Success input field :">
          <TextInputFieldBase
            {...args}
            value="Success Value"
            editable
            isError={false}
            multiline={false}
            label="success Text input"
            isSuccess
            width={300}
          />
        </StorybookSection>
        <StorybookSection title="Error input field :">
          <TextInputFieldBase
            {...args}
            value=""
            isError
            editable
            isSuccess={false}
            label="Error Text input"
            errorMessage="Oops! Somethings not right here."
            multiline={false}
            width={300}
          />
        </StorybookSection>
      </StorybookRow>
      <StorybookRow>
        <StorybookSection title="input field with icon:">
          <TextInputFieldBase
            {...args}
            label="Text input With Icons"
            leftAccessory={(size, color) => (
              <AddPersonIcon width={size} height={size} fill={color} />
            )}
            rightAccessory={(size, color) => (
              <EyeIcon width={size} height={size} fill={color} />
            )}
            multiline={false}
            width={300}
          />
        </StorybookSection>
        <StorybookSection title="Text Box:">
          <TextInputFieldBase
            {...args}
            value=""
            placeholder="Message"
            multiline
            isSuccess={false}
            isError={false}
            label="Text box"
            width={300}
            editable
          />
        </StorybookSection>
      </StorybookRow>
    </StorybookScreen>
  );
};

const parameters = {
  controls: {
    include: [
      'width',
      'placeholder',
      'multiline',
      'label',
      'value',
      'isValid',
      'isError',
      'isSuccess',
      'editable',
      'errorMessage',
    ],
  },
};
const defaultArgs: BaseTextInputProps = {
  onChangeText: noop,
  placeholder: 'Placeholder',
  value: '',
  label: 'BaseTextInput Field',
  editable: true,
  multiline: false,
  isError: false,
  isSuccess: false,
  errorMessage: 'Oops ! Somethings not right here.',
};
export const TextInputField = Template.bind({});
TextInputField.parameters = parameters;
TextInputField.args = {
  ...defaultArgs,
};
