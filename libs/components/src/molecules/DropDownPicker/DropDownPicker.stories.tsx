import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Avatar, AvatarSize } from '../../atoms';
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
const cardMockItems: DropDownItemProps[] = [
  {
    id: '12',
    value: 'option1',
    label: '1234 5678 9012 3456',
  },
  {
    id: '13',
    value: 'option2',
    label: '4556 4316 7964 9464',
  },
  {
    id: '14',
    value: 'option3',
    label: '5105 1407 4537 9435',
  },
  {
    id: '15',
    value: 'option4',
    label: '4716 2236 1238 9424',
  },
  {
    id: '16',
    value: 'option5',
    label: '4556 3460 3521 8822',
  },
  {
    id: '17',
    value: 'option6',
    label: '5113 7282 6667 0438',
  },
];

const iconMockItems: DropDownItemProps[] = [
  {
    id: '12',
    value: 'option1',
    label: 'TND',
    icon: (
      <Avatar
        size={AvatarSize.iconSize}
        uri="https://www.countryflagicons.com/SHINY/64/TN.png"
      />
    ),
  },
  {
    id: '13',
    value: 'option2',
    label: 'US Dollar',
    icon: (
      <Avatar
        size={AvatarSize.iconSize}
        uri="https://www.countryflagicons.com/SHINY/64/US.png"
      />
    ),
  },
  {
    id: '14',
    value: 'option3',
    label: 'EURO',
    icon: (
      <Avatar
        size={AvatarSize.iconSize}
        uri="https://www.countryflagicons.com/SHINY/64/EU.png"
      />
    ),
  },
];
const Template: ComponentStory<typeof DropDownPickerBase> = (
  args: DropDownPickerProps,
) => {
  return (
    <StorybookScreen title="DropDownPicker:">
      <StorybookRow>
        <StorybookSection title="Loading List">
          <DropDownPickerBase {...args} items={[]} />
        </StorybookSection>
        <StorybookSection title="CreditCard DropDown List">
          <DropDownPickerBase
            {...args}
            items={cardMockItems}
            optionVariant={OptionVariant.CREDIT_CARD}
          />
        </StorybookSection>
        <StorybookSection title="Currency DropDown List">
          <DropDownPickerBase
            {...args}
            items={iconMockItems}
            optionVariant={OptionVariant.ICON_OPTION}
          />
        </StorybookSection>
      </StorybookRow>
    </StorybookScreen>
  );
};

const parameters = {
  controls: {
    include: ['placeholder', 'initialIndex', 'disabled', 'loading'],
  },
};

const defaultArgs: DropDownPickerProps = {};

export const DropDownPicker = Template.bind({});
DropDownPicker.parameters = parameters;
DropDownPicker.args = {
  ...defaultArgs,
};
