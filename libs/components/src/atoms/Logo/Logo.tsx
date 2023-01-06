import { ColorType, useNamespacedTheme } from '@proxym/themes';
import React, { memo } from 'react';

import ProxymLogo from '../../assets/images/logo-text.svg';
import { TestIDType } from '../../types';

export type PropsType = {
  color?: typeof ColorType[keyof typeof ColorType];
  width?: number;
} & TestIDType;

const BASE_WIDTH = 131;
const BASE_HEIGHT = 36;

export const Logo = ({ width = BASE_WIDTH, color, testID }: PropsType) => {
  const height = (width * BASE_HEIGHT) / BASE_WIDTH;
  const { colors } = useNamespacedTheme();

  return (
    <ProxymLogo
      width={width}
      height={height}
      fill={color || colors.primary}
      testID={testID}
    />
  );
};

export default memo(Logo);
