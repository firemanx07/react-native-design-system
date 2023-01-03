import { styled } from '@proxym/themes';
import React, { memo, useMemo } from 'react';
import { ImageSourcePropType } from 'react-native';

import { TestIDType } from '../../types';

export enum AvatarSize {
  XS = 20,
  S = 30,
  M = 36,
  L = 44,
  XL = 120,
}

export type PropsType = {
  uri?: string;
  size?: AvatarSize;
} & TestIDType;

export const Avatar = ({ uri, size = AvatarSize.S, testID }: PropsType) => {
  const imageSource: ImageSourcePropType = useMemo(() => {
    if (uri) {
      return { uri };
    }

    return require('../../assets/images/avatar-placeholder.png');
  }, [size, uri]);

  return (
    <Container size={size} testID={testID}>
      <AvatarImage size={size} source={imageSource} />
    </Container>
  );
};

type StyledCommonType = {
  size: AvatarSize;
};

const Container = styled.View<StyledCommonType>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  border-radius: ${({ size }) => size / 2}px;
  overflow: hidden;
`;

const AvatarImage = styled.Image<StyledCommonType>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
`;

export default memo(Avatar);
