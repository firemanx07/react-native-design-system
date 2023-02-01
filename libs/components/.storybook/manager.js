import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

import customLogo from './assets/logo.svg'

const myCustomTheme = create({
  base: 'dark',
  brandImage: customLogo,
  brandTitle: 'Design System',
  brandUrl: 'https://www.proxym-group.com/'
});

addons.setConfig({
  theme: myCustomTheme,
});

//👇 Add any other configurations for Storybook here.

export default {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
  ],
};
