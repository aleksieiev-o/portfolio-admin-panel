import { extendTheme } from '@chakra-ui/react';

export enum ColorMode {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

export const theme = extendTheme({
  initialColorMode: ColorMode.SYSTEM,
  useSystemColorMode: true,
  fonts: {
    heading: `'Roboto', 'sans-serif'`,
    body: `'Roboto', 'sans-serif'`,
  },
});
