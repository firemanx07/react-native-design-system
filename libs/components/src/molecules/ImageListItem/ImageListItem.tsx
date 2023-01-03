import { styled, useNamespacedTheme } from '@proxym/themes';
import React, { memo, ReactNode } from 'react';
import { ViewStyle, StyleProp } from 'react-native';

import { BaseText, ForwardIcon, TextVariant, TextWeight } from '../../atoms';
import { TestIDType } from '../../types';

export type PropsType = {
  title: string;
  renderImage: (size: number) => ReactNode;
  hasArrow?: boolean;
  subtitle?: string;
  style?: StyleProp<ViewStyle>;
} & TestIDType;

const IMAGE_SIZE = 64;

export const ImageListItem = ({
  title,
  subtitle,
  hasArrow,
  renderImage,
  style,
  testID,
}: PropsType) => {
  const { iconSize, colors } = useNamespacedTheme();
  return (
    <Container style={style} testID={testID}>
      <ImageWrapper>{renderImage(IMAGE_SIZE)}</ImageWrapper>
      <TextWrapper>
        <BaseText
          variant={TextVariant.L}
          weight={TextWeight.Bold}
          numberOfLines={2}
        >
          {title}
        </BaseText>
        {!!subtitle && (
          <Subtitle
            variant={TextVariant.M}
            weight={TextWeight.SemiBold}
            numberOfLines={2}
          >
            {subtitle}
          </Subtitle>
        )}
      </TextWrapper>
      {hasArrow && (
        <ForwardIcon
          width={iconSize.medium}
          height={iconSize.medium}
          fill={colors.dark}
        />
      )}
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ImageWrapper = styled.View`
  background-color: ${({ theme }) => theme.ds.colors.secondary};
  border-radius: 4px;
  margin-right: ${({ theme }) => theme.ds.spacing.primary}px;
  width: ${IMAGE_SIZE}px;
  height: ${IMAGE_SIZE}px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

const TextWrapper = styled.View`
  flex: 1;
  padding-right: ${({ theme }) => theme.ds.spacing.small}px;
`;

const Subtitle = styled(BaseText)`
  color: ${({ theme }) => theme.ds.colors.grayDark};
`;

export default memo(ImageListItem);
