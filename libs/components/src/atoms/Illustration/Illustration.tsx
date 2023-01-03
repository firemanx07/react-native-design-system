import { styled } from '@proxym/themes';
import React, { memo } from 'react';
import { ImageProps } from 'react-native';

import * as illustrations from '../../assets/images/illustrations';

export enum IllustrationSize {
  // NOTE: it determines width of the image
  XL = 270,
  L = 200,
  M = 128,
  S = 60,
}

export enum IllustrationName {
  VideoPremium = 'VideoPremium',
  Video = 'Video',
  People = 'People',
  Upload = 'Upload',
  Dove = 'Dove',
  DoveUpdate = 'DoveUpdate',
  PolaroidMan = 'PolaroidMan',
  PolaroidWoman = 'PolaroidWoman',
}

export type PropsType = {
  name: IllustrationName;
  size?: IllustrationSize;
} & Omit<ImageProps, 'source'>;

export const Illustration = ({
  size = IllustrationSize.XL,
  name,
  ...imageProps
}: PropsType) => {
  if (!name) {
    return null;
  }

  return (
    <IllustrationImage
      {...imageProps}
      width={size}
      height={size * 0.8}
      source={illustrations[name]}
    />
  );
};

type IllustrationImageType = {
  height: number;
  width: number;
};

const IllustrationImage = styled.Image<IllustrationImageType>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;

export default memo(Illustration);
