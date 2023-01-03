import { styled } from '@proxym/themes';
import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { BaseText, TextVariant } from '../atoms/BaseText';

type PropsType = {
  children: ReactNode | ReactNode[];
  width?: number;
  title?: string;
  style?: StyleProp<ViewStyle>;
};
export const StorybookSection = ({
  children,
  title,
  width = 370,
  style,
}: PropsType) => (
  <SectionWrapper width={width} style={style}>
    {!!title && <SectionTitle>{title}</SectionTitle>}
    {children}
  </SectionWrapper>
);

export const SectionTitle = styled(BaseText).attrs({
  variant: TextVariant.H3,
})`
  position: absolute;
  top: -12px;
  left: ${({ theme }) => theme.ds.spacing.primary}px;
  background-color: ${({ theme }) => theme.ds.colors.grayLight};
  padding-horizontal: ${({ theme }) => theme.ds.spacing.small}px;
`;

type SectionWrapperType = {
  width: number;
};

export const SectionWrapper = styled.View<SectionWrapperType>`
  width: ${({ width }) => width}px;
  padding: ${({ theme }) => theme.ds.spacing.primary}px;
  margin: ${({ theme }) => theme.ds.spacing.medium}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.ds.colors.dark};
  border-style: dashed;
  border-radius: 4px;
`;
