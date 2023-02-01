import * as styledComponents from 'styled-components/native';

import { DSType } from './types';

const {
  default: styled,
  css,
  ThemeProvider,
  useTheme,
} = styledComponents as unknown as styledComponents.ReactNativeThemedStyledComponentsModule<DSType>;

export { css, ThemeProvider, useTheme, styled };
