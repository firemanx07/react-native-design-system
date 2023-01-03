import { useNamespacedTheme } from '@proxym/themes';
import React, { memo } from 'react';

import CelebrateLogo from '../../assets/images/logo.svg';
import { TestIDType } from '../../types';

export type PropsType = {
  color?: string;
  width?: number;
} & TestIDType;

const BASE_WIDTH = 131;
const BASE_HEIGHT = 36;

export const Logo = ({ width = BASE_WIDTH, color, testID }: PropsType) => {
  const height = (width * BASE_HEIGHT) / BASE_WIDTH;
  const { colors } = useNamespacedTheme();

  return (
    <CelebrateLogo
      width={width}
      height={height}
      fill={color || colors.primary}
      testID={testID}
    />
  );
};

export default memo(Logo);
