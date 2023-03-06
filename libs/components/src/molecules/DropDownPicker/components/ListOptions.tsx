import { styled } from '@proxym/themes';
import React, { useMemo } from 'react';

import { BaseText } from '../../../atoms';
import { maskCreditCardNumber } from '../../../helpers/format-utils';
import { DropDownItemProps } from '../DropDownPicker';

type optionProps = {
  item: DropDownItemProps;
  index: number;
  selectedID: string | undefined;
};
export enum OptionVariant {
  ICON_OPTION = 'ICON_OPTION',
  CREDIT_CARD = 'CREDIT_CARD',
  CUSTOM = 'CUSTOM',
  DEFAULT = 'DEFAULT',
}
const IconOption = ({ item }: optionProps) => {
  return (
    <StyledOption>
      <IconConatiner>{item?.icon}</IconConatiner>
      <BaseText>{item.label}</BaseText>
    </StyledOption>
  );
};
const CreditCardOption = ({ item }: optionProps) => {
  const newLabel = useMemo<string>(
    () => maskCreditCardNumber(item.label),
    [item.label],
  );
  return (
    <StyledOption>
      <BaseText>{newLabel}</BaseText>
    </StyledOption>
  );
};

const StyledOption = styled.View`
  flex-direction: row;
  align-items: center;
  height: 40px;
`;
const IconConatiner = styled.View`
  flex-direction: row;
  width: ${({ theme }) => theme.ds.iconSize.primary};
  height: ${({ theme }) => theme.ds.iconSize.primary};
  margin-right: ${({ theme }) => theme.ds.spacing.primarySmall};
`;

export default { IconOption, CreditCardOption };
