import { styled } from '@proxym/themes';
import React from 'react';

import { BaseText, TextVariant, TextWeight } from '../../atoms/BaseText';

export type PropsType = {
  color: string;
  textColor: string;
  name: string;
};

export const ColorPreview = ({ color, textColor, name }: PropsType) => {
  return (
    <Container>
      <ColorTile color={color}>
        <ColorText
          color={textColor}
          variant={TextVariant.M}
          weight={TextWeight.Bold}
        >
          {color}
        </ColorText>
      </ColorTile>
      <BaseText variant={TextVariant.M}>{name}</BaseText>
    </Container>
  );
};

const Container = styled.View`
  margin-right: 20px;
  margin-bottom: 20px;
`;

type CommonStyledType = {
  color?: string;
};

const ColorTile = styled.View<CommonStyledType>`
  background-color: ${({ color }) => color};
  border-radius: 8px;
  width: 100px;
  height: 50px;
  margin-bottom: 8px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: ${({ theme }) => theme.ds.colors.graySoft};
`;

const ColorText = styled(BaseText)<CommonStyledType>`
  color: ${({ color }) => color};
`;

export default ColorPreview;
