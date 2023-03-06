import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import {
  StorybookRow,
  StorybookScreen,
  StorybookSection,
} from '../../storybook';
import {
  default as DropDownPickerBase,
  DropDownItemProps,
  DropDownPickerProps,
} from './DropDownPicker';
import { OptionVariant } from './components/ListOptions';

const Story: ComponentMeta<typeof DropDownPickerBase> = {
  component: DropDownPickerBase,
  title: 'Molecules/DropDownPicker',
};
export default Story;

// const noop = () => {
//   // This is a mock
// };
const mockItems: DropDownItemProps[] = [
  {
    id: '12',
    value: 'option1',
    label: '1234 5678 9012 3456',
  },
  {
    id: '13',
    value: 'option2',
    label: '1234 5678 9012 3456',
  },
  {
    id: '14',
    value: 'option3',
    label: '1234 5678 9012 3456',
  },
];
const Template: ComponentStory<typeof DropDownPickerBase> = (
  args: DropDownPickerProps,
) => {
  return (
    <StorybookScreen title="DropDownPicker:">
      <StorybookSection title="default List">
        <DropDownPickerBase {...args} items={mockItems} />
      </StorybookSection>
      <StorybookRow>
        <StorybookSection title="Loading List">
          <DropDownPickerBase {...args} items={[]} />
        </StorybookSection>
        <StorybookSection title="CreditCard List">
          <DropDownPickerBase
            {...args}
            items={mockItems}
            optionVariant={OptionVariant.CREDIT_CARD}
          />
        </StorybookSection>
      </StorybookRow>
    </StorybookScreen>
  );
};

const parameters = {
  controls: {
    include: [],
  },
};

const defaultArgs: DropDownPickerProps = { value: '' };

export const DropDownPicker = Template.bind({});
DropDownPicker.parameters = parameters;
DropDownPicker.args = {
  ...defaultArgs,
};
