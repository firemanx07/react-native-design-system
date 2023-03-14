import { styled } from '@proxym/themes';
import React, { memo, useCallback } from 'react';
import { FlatList, ListRenderItem } from 'react-native';

import { TestIDType } from '../../../../types';
import { DropDownItemProps, DropDownTestIDs } from '../DropDownPicker';
import ListEmpty, { ListEmptyProps } from './ListEmpty';

type ListItemsProps = {
  emptyItemsProps?: ListEmptyProps;
  items: DropDownItemProps[];
  selectedItemID?: string;
  renderOption?: (
    item: DropDownItemProps,
    index: number,
    selectedID: string | undefined,
  ) => React.ReactElement;
  ItemSeparatorComponent?: () => React.ReactElement;
  onPress?: (index: number) => void;
} & TestIDType;
const ListContainer = React.forwardRef<FlatList, ListItemsProps>(
  (
    {
      items,
      emptyItemsProps,
      renderOption,
      ItemSeparatorComponent,
      onPress,
      selectedItemID,
      testID,
    },
    ref,
  ) => {
    const keyExtractor = useCallback(
      ({ id }: DropDownItemProps): string => id.toString(),
      [],
    );
    /**
     * renderItem
     */
    const renderItem: ListRenderItem<DropDownItemProps> = useCallback(
      ({ item, index }) => (
        <ItemWrapper
          onPress={() => onPress && onPress(index)}
          testID={`${testID}-${DropDownTestIDs.LIST_ITEM_TEST_ID}-${index}`}
        >
          {renderOption && renderOption(item, index, selectedItemID)}
        </ItemWrapper>
      ),
      [onPress, renderOption, selectedItemID, testID],
    );
    return (
      <FlatList
        ref={ref}
        data={items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={<ListEmpty {...emptyItemsProps} />}
        ItemSeparatorComponent={ItemSeparatorComponent}
        scrollEventThrottle={16}
        testID={testID}
      />
    );
  },
);

const ItemWrapper = styled.TouchableOpacity`
  justify-content: center;
`;

export default memo(ListContainer);
