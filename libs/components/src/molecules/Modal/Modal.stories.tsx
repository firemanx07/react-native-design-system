import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';

import { BaseButton } from '../../atoms';
import { StorybookScreen, StorybookSection } from '../../storybook';
import { default as ModalBase, ModalProps, ModalTypes } from './Modal';

const Story: ComponentMeta<typeof ModalBase> = {
  component: ModalBase,
  title: 'Molecules/Modal',
};
export default Story;

const noop = () => {
  // This is a mock
};

const Template: ComponentStory<typeof ModalBase> = (args: ModalProps) => {
  const [visible, setVisible] = useState(true);
  const onPress = () => setVisible(true);
  const onClose = () => setVisible(false);
  return (
    <StorybookScreen title="Modal Button:">
      <StorybookSection>
        <BaseButton onPress={onPress}>showModal</BaseButton>
        <ModalBase {...args} visible={visible} onClose={onClose} />
      </StorybookSection>
    </StorybookScreen>
  );
};

const parameters = {
  controls: {
    include: ['type', 'title', 'message', 'buttonLabel', 'OTPLabel'],
  },
};

const defaultArgs: ModalProps = {
  visible: true,
  title: 'Your request has been rejected',
  message: 'Thank you for your patience',
  type: ModalTypes.ERROR,
  buttonLabel: 'Confirm',
  OTPLabel: 'Enter your OTP code',
  onClose: noop,
};

export const Modal = Template.bind({});
Modal.parameters = parameters;
Modal.args = {
  ...defaultArgs,
};
