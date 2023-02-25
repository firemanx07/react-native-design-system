import { styled } from '@proxym/themes';
import React, { memo } from 'react';
import { Animated, TouchableOpacity } from 'react-native';

interface TabItemProps {
  isFocused: boolean;
  onPress: () => void;
  label: string;
  color: Animated.AnimatedInterpolation<string | number>;
  accessibilityLabel?: string;
  testID?: string;
}

const TabItem = ({
  isFocused,
  onPress,
  label,
  color,
  accessibilityLabel,
  testID,
}: TabItemProps) => {
  return (
    <TabBarItem
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      onPress={onPress}
    >
      <TabBarLabel style={{ color }} children={label} />
    </TabBarItem>
  );
};
const TabBarItem = styled(TouchableOpacity)`
  flex: 1;
  min-height: 35px;
`;

const TabBarLabel = styled(Animated.Text)`
  color: ${({ theme }) => theme.ds.colors.dark};
  font-family: ${({ theme }) => theme.ds.fonts.family.primaryMedium};
  font-size: ${({ theme }) => theme.ds.fonts.size.medium}px;
  line-height: ${({ theme }) => theme.ds.fonts.lineHeight.mediumTiny}px;
`;

export default memo(TabItem);
