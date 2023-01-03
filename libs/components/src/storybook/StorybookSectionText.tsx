import { styled } from '@proxym/themes';

import { BaseText, TextVariant } from '../atoms/BaseText';

export const StorybookSectionText = styled(BaseText).attrs({
  variant: TextVariant.M,
})`
  margin-bottom: ${({ theme }) => theme.ds.spacing.tiny}px;
  color: ${({ theme }) => theme.ds.colors.grayDark};
`;
