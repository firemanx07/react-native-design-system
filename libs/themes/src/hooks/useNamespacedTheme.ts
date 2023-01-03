import { useTheme } from '../styled-components';

export const useNamespacedTheme = () => {
  const theme = useTheme();

  return theme.ds;
};
