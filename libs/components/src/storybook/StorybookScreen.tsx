import { styled } from '@proxym/themes';
import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { BaseText, TextVariant } from '../atoms/BaseText';

type PropsType = {
  children: ReactNode | ReactNode[];
  title?: string;
  style?: StyleProp<ViewStyle>;
};

export const StorybookScreen = ({ title, children, style }: PropsType) => (
  <Container style={style}>
    {!!title && <Title>{title}</Title>}
    {children}
  </Container>
);

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.ds.colors.grayLight};
  padding: ${({ theme }) => theme.ds.spacing.primary}px;
  min-height: 600px;
`;

export const Title = styled(BaseText).attrs({
  variant: TextVariant.H1,
})`
  margin-bottom: ${({ theme }) => theme.ds.spacing.medium}px;
`;
