import * as styledComponents from 'styled-components/native';

import { ThemeType } from './types';

const {
  default: styled,
  css,
  ThemeProvider,
  useTheme,
} = styledComponents as unknown as styledComponents.ReactNativeThemedStyledComponentsModule<ThemeType>;

export { css, ThemeProvider, useTheme, styled };
