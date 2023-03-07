import { styled } from '@proxym/themes';
import React, { memo, useMemo } from 'react';
import { ImageSourcePropType } from 'react-native';

import { TestIDType } from '../../types';

export enum AvatarSize {
  XS = 20,
  S = 39,
  M = 51,
  L = 66,
  XL = 120,
  iconSize = 27,
}
export enum AvatarShape {
  Round = 'Round',
  Square = 'Square',
}
export type PropsType = {
  uri?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
} & TestIDType;

export const Avatar = ({
  uri,
  size = AvatarSize.S,
  shape = AvatarShape.Round,
  testID,
}: PropsType) => {
  const imageSource: ImageSourcePropType = useMemo(() => {
    if (uri) {
      return { uri };
    }

    return require('../../assets/images/avatar-placeholder.png');
  }, [uri]);

  return (
    <Container size={size} testID={testID} shape={shape}>
      <AvatarImage size={size} source={imageSource} />
    </Container>
  );
};

type StyledCommonType = {
  size: AvatarSize;
  shape?: AvatarShape;
};

const Container = styled.View<StyledCommonType>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  border-radius: ${({ size, shape }) =>
    shape === AvatarShape.Round ? size / 2 : (size * 7) / 62}px;
  overflow: hidden;
`;

const AvatarImage = styled.Image<StyledCommonType>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
`;

export default memo(Avatar);
