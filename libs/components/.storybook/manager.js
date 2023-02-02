import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

import customLogo from './assets/logo.svg'
import favicon from './assets/favicon.png';

//Custom StoryBook Theming 🎨
const myCustomTheme = create({
  base: 'dark',
  brandImage: customLogo,
  brandTitle: 'Design System',
  brandUrl: 'https://www.proxym-group.com/'
});

addons.setConfig({
  theme: myCustomTheme,
});

//Add Proxym as favicon 👍
const link = document.createElement('link');
link.setAttribute('rel', 'shortcut icon');
link.setAttribute('href', favicon);
document.head.appendChild(link);

//👇 Add any other configurations for Storybook here.

export default {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
  ],
};
