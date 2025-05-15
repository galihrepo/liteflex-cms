import { createTheme } from '@shopify/restyle';
import { BaseThemeType } from '../../types/config/BaseThemeType';
import buttonVariants from './buttonTheme';
import { textVariants } from './textTheme';

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
    textVariants,
    buttonVariants,
    breakpoints: {
      phone: 0,
      desktop: 768,
    },    
  });

export type AppTheme = ReturnType<typeof createAppTheme>;
