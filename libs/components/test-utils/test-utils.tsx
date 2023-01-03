import { theme, ThemeProvider } from '@celebrate-app/themes';
import { Story } from '@storybook/react';
import {
  cleanup,
  render,
  RenderOptions,
  waitFor,
} from '@testing-library/react-native';
import React, { ReactNode } from 'react';

const Providers = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export const customRender = (
  ui: React.ReactElement<any>,
  options?: RenderOptions
) => {
  return render(ui, { wrapper: Providers, ...options });
};

beforeEach(cleanup);
afterEach(cleanup);

export function testStory(displayName: string, TestComponent: Story) {
  test(`${displayName} snapshot test`, async () => {
    const comp = customRender(<TestComponent {...TestComponent.args} />);
    jest.runOnlyPendingTimers();

    await waitFor(() => {
      expect(comp).toBeTruthy();
      expect(comp.toJSON()).toMatchSnapshot();
    });
  });
}

export function testComponentSnapshot(
  TestComponent: React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  >
) {
  test('Snapshot test', () => {
    const comp = customRender(TestComponent);
    expect(comp).toBeTruthy();
    expect(comp.toJSON()).toMatchSnapshot();
  });
}

export function testAllStories(stories: any) {
  Object.keys(stories).forEach((story) => {
    if (story !== 'default') {
      testStory(story, stories[story]);
    }
  });
}
