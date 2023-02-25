import { waitFor } from '@testing-library/react-native';

import { customRender } from './test-utils';

type renderTabsProps = {
  elem: JSX.Element;
  testIDs: string[];
};
export const renderTabs = ({ elem, testIDs }: renderTabsProps) => {
  const comp = customRender(elem);
  const tabs: ReturnType<typeof comp.getByTestId>[] = [];
  testIDs.forEach(testID => tabs.push(comp.getByTestId(testID)));
  return { comp, tabs };
};
export const testTabs = async (args: ReturnType<typeof renderTabs>) => {
  await waitFor(() => {
    expect(args.comp).toBeTruthy();
    args.tabs.forEach(tab => expect(tab).toBeDefined());
  });
};
