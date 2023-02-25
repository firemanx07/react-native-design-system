import { styled } from '@proxym/themes';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Route } from '@react-navigation/native';
import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { Animated, LayoutChangeEvent, View } from 'react-native';

import TabBarItem from './TabBarItem';

const MARKER_WIDTH = 19;
const TAB_BAR_HEIGHT = 64;
const FONT_WEIGHT_BOLD = 700;
const FONT_WEIGHT_REGULAR = 400;
const BottomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const tabContainerRef = useRef<View>(null);
  const [tabContainerWidth, setTabContainerWidth] = useState<number>(0);

  const handleTabContainerLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setTabContainerWidth(width);
  }, []);

  const TAB_ITEM_WIDTH = useMemo(() => {
    return tabContainerWidth / state.routes.length;
  }, [tabContainerWidth, state.routes.length]);
  const position = useRef<Animated.Value>(new Animated.Value(0)).current;

  const inputRange = useMemo(() => {
    return state.routes.map((_: any, i: number) => i);
  }, [state.routes]);

  const transform = useMemo(() => {
    return [
      {
        translateX: Animated.multiply(position, TAB_ITEM_WIDTH),
      },
      {
        translateX: (TAB_ITEM_WIDTH - MARKER_WIDTH) / 2,
      },
    ];
  }, [position, TAB_ITEM_WIDTH]);
  const handleFonts = useCallback(
    (index: number) =>
      position.interpolate({
        inputRange,
        outputRange: inputRange.map((i: number) =>
          i === index ? FONT_WEIGHT_BOLD : FONT_WEIGHT_REGULAR,
        ),
      }),
    [inputRange, position],
  );
  const handlePress = useCallback(
    (route: Route<string>, isFocused: boolean, index: number) => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        // The `merge: true` option makes sure that the params inside the tab screen are preserved
        navigation.navigate(route.name);
      }
      Animated.timing(position, {
        toValue: index, // replace with the new position index
        duration: 200, // set the duration of the animation
        useNativeDriver: true, // enable native driver for performance
      }).start();
    },
    [position, navigation],
  );

  return (
    <TabBarContainer ref={tabContainerRef} onLayout={handleTabContainerLayout}>
      {state.routes.map((route, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;

        const isFocused = state.index === index;

        const onPress = () => handlePress(route, isFocused, index);
        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const fontType = handleFonts(index);

        return (
          <TabBarItem
            key={route.key}
            isFocused={isFocused}
            onPress={onPress}
            onLongPress={onLongPress}
            label={String(label)}
            fontFamily={fontType}
            renderIcon={options.tabBarIcon}
            testID={options.tabBarTestID}
            accessibilityLabel={options.tabBarAccessibilityLabel}
          />
        );
      })}
      <Marker testID="marker" style={{ transform }} />
    </TabBarContainer>
  );
};
const TabBarContainer = styled.View`
  flex-direction: row;
  background-color: ${({ theme }) => theme.ds.colors.light};
  border-radius: 7px;
  min-height: ${TAB_BAR_HEIGHT}px;
`;

const Marker = styled(Animated.View)`
  background-color: ${({ theme }) => theme.ds.colors.primary};
  width: ${MARKER_WIDTH}px;
  height: 5px;
  border-radius: 4px;
  position: absolute;
  top: 0;
`;

export default memo(BottomTabBar);
