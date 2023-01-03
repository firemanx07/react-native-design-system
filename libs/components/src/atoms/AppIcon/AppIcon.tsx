import React, { memo } from 'react';

import AppIconLight from '../../assets/images/app-icon-light.svg';
import AppIconBase from '../../assets/images/app-icon.svg';
import { TestIDType } from '../../types';

export type PropsType = {
  size?: number;
  isLight?: boolean;
} & TestIDType;

export const AppIcon = ({ size = 85, isLight, testID }: PropsType) => {
  const appIconProps = {
    width: size,
    height: size,
    testID,
  };

  if (isLight) {
    return <AppIconLight {...appIconProps} />;
  }
  return <AppIconBase {...appIconProps} />;
};

export default memo(AppIcon);
