import { theme, ThemeProvider } from '@proxym/themes';
import React from 'react';

import { loadStorybookFonts } from './loadFonts';

loadStorybookFonts();

export const decorators = [
  Story => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  ),
];

//👇 Configures Storybook to log the actions in the UI.
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};
