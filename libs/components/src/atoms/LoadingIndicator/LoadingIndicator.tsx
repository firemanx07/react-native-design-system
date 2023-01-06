import { styled } from '@proxym/themes';
import React, { useState, useEffect } from 'react';

import { TestIDType } from '../../types';
import Circle from './Circle';

const SIZE = 7;
const INTERVAL = 600;
const ANIMATION_DURATION = 800;
const ANIMATION_SCALE = 1.6;

export type PropsType = {
  color?: string;
  size?: number;
  betweenSpace?: number;
} & TestIDType;

export const LoadingIndicator = ({
  color,
  size = SIZE,
  betweenSpace = size * 0.5,
  testID,
}: PropsType) => {
  const [activeCircle, setActiveCircle] = useState(1);

  const circleProps = {
    color,
    size,
    animationDuration: ANIMATION_DURATION,
    scaleTo: ANIMATION_SCALE,
    betweenSpace,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCircle(prev => (prev > 2 ? 1 : prev + 1));
    }, INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Container testID={testID}>
      {[1, 2, 3].map(i => (
        <Circle key={i} active={i === activeCircle} {...circleProps} />
      ))}
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export default LoadingIndicator;
