import { styled } from '@proxym/themes';
import React, { memo } from 'react';

import { TestIDType } from '../../types';

type CircleProps = {
  size: number;
  color: string;
} & TestIDType;
const Circle = (props: CircleProps) => <Container {...props} />;

const Container = styled.View<CircleProps>`
  background-color: ${({ color }) => color};
  border-radius: ${({ size }) => size / 2};
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;
export default memo(Circle);
