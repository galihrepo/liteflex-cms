import { createTheme } from '@shopify/restyle';
import { BaseThemeType } from './types';

export const createAppTheme = (baseThemeType: BaseThemeType) =>
  createTheme({
    colors: baseThemeType.colors,
    spacing: {
      none: 0,
      xs: 4,
      s: 8,
      m: 16,
      l: 24,
      xl: 40,
    },
    borderRadii: {
      s: 4,
      m: 10,
      l: 25,
      xl: 75,
    },
    textVariants: {
      defaults: {
        fontSize: 26,
        color: 'secondary',
      },
      header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'primary',
      },
    },
    breakpoints: {
      phone: 0,
      tablet: 768,
    },
  });

export type AppTheme = ReturnType<typeof createAppTheme>;
