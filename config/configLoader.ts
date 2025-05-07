import { BaseConfigType, BaseThemeType, DealerConfig } from './types';

import demodealersConfig from '../dealers/demodealers/config';
import demodealersTheme from '../dealers/demodealers/theme';
import omgalMotorsConfig from '../dealers/omgal-motors/config';
import omgalMotorsTheme from '../dealers/omgal-motors/theme';

import { baseConfig } from './baseConfig';
import { baseTheme } from './baseTheme';

const DEALER = process.env.DEALER || 'demodealers';

const mergeTheme = (themeOverride?: Partial<BaseThemeType>): BaseThemeType => ({
  colors: {
    ...baseTheme.colors,
    ...themeOverride?.colors,
  },
});

const mergeConfig = (configOverride?: Partial<BaseConfigType>): BaseConfigType => ({
  ...baseConfig,
  ...configOverride,
});

export const configLoader = (): DealerConfig => {
  switch (DEALER) {
    case 'omgal-motors':
      return {
        config: mergeConfig(omgalMotorsConfig),
        theme: mergeTheme(omgalMotorsTheme),
      };
    case 'demodealers':
    default:
      return {
        config: mergeConfig(demodealersConfig),
        theme: mergeTheme(demodealersTheme),
      };
  }
};