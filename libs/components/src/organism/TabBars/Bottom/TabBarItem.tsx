import { IconSizeType, styled, useNamespacedTheme } from '@proxym/themes';
import React from 'react';
import { Animated, TouchableOpacity } from 'react-native';

interface TabItemProps {
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
  label: string;
  fontFamily: Animated.AnimatedInterpolation<string | number>;
  renderIcon?: (props: {
    focused: boolean;
    color: string;
    size: number;
  }) => React.ReactNode;
  accessibilityLabel?: string;
  testID?: string;
}

const TabBarItem = ({
  isFocused,
  onPress,
  onLongPress,
  label,
  fontFamily,
  accessibilityLabel,
  testID,
  renderIcon,
}: TabItemProps) => {
  const { colors } = useNamespacedTheme();
  return (
    <TabItem
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      {renderIcon &&
        renderIcon({
          focused: isFocused,
          size: IconSizeType.medium,
          color: isFocused ? colors.primary : colors.grayDark,
        })}
      <TabBarLabel style={{ fontWeight: fontFamily }} children={label} />
    </TabItem>
  );
};
const TabItem = styled(TouchableOpacity)`
  flex: 1;
  justify-content: center;
  align-items: center;
  min-height: 35px;
`;

const TabBarLabel = styled(Animated.Text)`
  color: ${({ theme }) => theme.ds.colors.dark};
  font-size: ${({ theme }) => theme.ds.fonts.size.small}px;
  line-height: ${({ theme }) => theme.ds.fonts.lineHeight.mediumTiny}px;
`;

export default TabBarItem;
