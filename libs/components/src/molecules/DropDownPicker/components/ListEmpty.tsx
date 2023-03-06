import { IconSizeType, styled } from '@proxym/themes';
import React, { memo } from 'react';

import { BaseText, LoadingIndicator } from '../../../atoms';

const ListMessageContainer = styled.View`
  background-color: ${props => props.theme.ds.colors.light};
  align-items: center;
  justify-content: center;
  height: 100%;
  padding-top: ${({ theme }) => theme.ds.spacing.tiny};
`;

const ListMessageText = styled(BaseText)``;
type ListEmptyProps = {
  loading: boolean;
  message: string;
  ActivityIndicatorComponent?: JSX.Element;
};
function ListEmpty({
  loading,
  message,
  ActivityIndicatorComponent,
}: ListEmptyProps) {
  return (
    <ListMessageContainer>
      {!loading ? (
        ActivityIndicatorComponent ?? (
          <LoadingIndicator size={IconSizeType.small} />
        )
      ) : (
        <ListMessageText>{message}</ListMessageText>
      )}
    </ListMessageContainer>
  );
}

export default memo(ListEmpty);
