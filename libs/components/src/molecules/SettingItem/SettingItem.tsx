import { styled } from '@proxym/themes';
import React, { memo } from 'react';
import { ViewStyle, StyleProp } from 'react-native';

import { BaseText, TextVariant, TextWeight, Toggle } from '../../atoms';
import { TestIDType } from '../../types';

export type PropsType = {
  title: string;
  onToggle: (isActive: boolean) => void;
  isActive: boolean;
  disabled?: boolean;
  subtitle?: string;
  style?: StyleProp<ViewStyle>;
} & TestIDType;

export const SettingItem = ({
  title,
  subtitle,
  onToggle,
  disabled,
  isActive,
  style,
  testID,
}: PropsType) => {
  return (
    <Container style={style} testID={testID}>
      <TextWrapper>
        <BaseText
          variant={TextVariant.H3}
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
      <Toggle isActive={isActive} onPress={onToggle} disabled={disabled} />
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.ds.colors.light};
  padding: ${({ theme }) => theme.ds.spacing.primary}px;
  min-height: 60px;
`;

const TextWrapper = styled.View`
  flex: 1;
  padding-right: ${({ theme }) => theme.ds.spacing.small}px;
`;

const Subtitle = styled(BaseText)`
  padding-top: ${({ theme }) => theme.ds.spacing.tiny}px;
  color: ${({ theme }) => theme.ds.colors.grayDark};
`;

export default memo(SettingItem);
