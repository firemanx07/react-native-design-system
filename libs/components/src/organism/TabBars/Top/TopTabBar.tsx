import { styled, useNamespacedTheme } from '@proxym/themes';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { Route } from '@react-navigation/native';
import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { Animated, LayoutChangeEvent, View } from 'react-native';

import TabBarItem from './TabBarItem';

const TopTabBar = ({
  state,
  descriptors,
  navigation,
  position,
}: MaterialTopTabBarProps) => {
  const { colors } = useNamespacedTheme();
  const tabContainerRef = useRef<View>(null);
  const [tabContainerWidth, setTabContainerWidth] = useState<number>(0);

  const handleTabContainerLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setTabContainerWidth(width);
  }, []);

  const TAB_ITEM_WIDTH = useMemo(() => {
    return tabContainerWidth / state.routes.length;
  }, [tabContainerWidth, state.routes.length]);

  const inputRange = useMemo(() => {
    return state.routes.map((_: any, i: number) => i);
  }, [state.routes]);

  const transform = useMemo(() => {
    return [
      {
        translateX: Animated.multiply(position, TAB_ITEM_WIDTH),
      },
    ];
  }, [position, TAB_ITEM_WIDTH]);
  const handleColor = useCallback(
    (index: number) =>
      position.interpolate({
        inputRange,
        outputRange: inputRange.map((i: number) =>
          i === index ? colors.dark : colors.grayDark,
        ),
      }),
    [inputRange, position],
  );
  const handlePress = useCallback(
    (route: Route<string>, isFocused: boolean) => {
      if (navigation && typeof navigation.emit === 'function') {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          // The `merge: true` option makes sure that the params inside the tab screen are preserved
          navigation.navigate({
            name: route.name,
            key: route.key,
            params: route.params,
            merge: true,
          });
        }
      }
    },
    [navigation],
  );

  return (
    <TabBarContainer ref={tabContainerRef} onLayout={handleTabContainerLayout}>
      {state.routes.map((route, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          (typeof options.tabBarLabel === 'string' && options.tabBarLabel) ||
          options.title ||
          route.name;

        const isFocused = state.index === index;

        const onPress = () => handlePress(route, isFocused);

        const color = handleColor(index);

        return (
          <TabBarItem
            key={route.key}
            testID={options.tabBarTestID}
            isFocused={isFocused}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            label={label}
            color={color}
          />
        );
      })}
      <Marker testID="marker" style={{ transform }} />
    </TabBarContainer>
  );
};
const TabBarContainer = styled.View`
  flex-direction: row;
`;

const Marker = styled(Animated.View)`
  background-color: ${({ theme }) => theme.ds.colors.dark};
  width: 30px;
  height: 5px;
  border-radius: 4px;
  position: absolute;
  bottom: 0;
`;

export default memo(TopTabBar);
