# Proxym RN Design System

The Proxym RN Design System is a collection of reusable UI components and a design language for building consistent, user-friendly experiences across Proxym's React Native products and services.

This package uses [styled-components](https://styled-components.com/) for styling the components.

## Structure
It is organized as a monorepo with Lerna and contains the following packages:

- [`@proxym/components`](#proxymcomponents): This package contains the reusable components that make up the design system, such as buttons, forms, and navigation.
- [`@proxym/theme`](#proxymtheme): This package contains the design system's theme, including colors, typography, and other design tokens.

## Local Developpment

To install the Proxym Design System, you will need to have [Lerna](https://lernajs.io/) installed globally. Then, in the root of the monorepo run the following command:
```
lerna bootstrap
```
This command will install the dependencies for each package and create the necessary symlinks for local development.
## @proxym/components
This package contains a set of UI components that can be used to build user interfaces in accordance with Proxym's design guidelines. The components are built with [React Native](https://facebook.github.io/react-native/) and are fully customizable to fit your needs.

### Installation

To install the `@proxym/components` package, run the following command:
```
npm install @proxym/components
```
### Usage

You can import individual components from the package and use them in your application. For example, to use the `Button` component:

```js
import { BaseButton } from '@proxym/components';

function MyComponent() {
  return <BaseButton>Click me</BaseButton>;
};
```
## @proxym/theme

This package contains the design system's theme, it provides a set of variables and design tokens to style the components.

### Installation
To install the @proxym/theme package, run the following command:
```
npm install @proxym/theme
```
### Usage
You can import the theme and use it to style your application. For example:
```js
import { theme } from '@proxym/theme';
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${theme.ds.colors.background};
  }
`;
```
## Storybook
To help you visualizing and interact with all the provided components we have deployed a storybook at https://proxym-rn-design-system.netlify.app(under construction)
## Contributing
We welcome contributions to the Proxym Design System! Before submitting a pull request, please make sure to read our contributing guidelines and code of conduct.
## License
The Proxym Design System is licensed under [private software license agreemet](LICENSE)