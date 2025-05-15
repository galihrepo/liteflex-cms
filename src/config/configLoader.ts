import demodealersConfig from '../../dealers/demodealers/config';
import demodealersTheme from '../../dealers/demodealers/theme';
import omgalMotorsConfig from '../../dealers/omgal-motors/config';
import omgalMotorsTheme from '../../dealers/omgal-motors/theme';
import { BaseConfigType } from '../types/config/BaseConfigType';
import { BaseThemeType } from '../types/config/BaseThemeType';
import { DealerConfig } from '../types/config/DealerConfig';

import { baseTheme } from '../components/theme/defaultTheme';
import { baseConfig } from './defaultConfig';

import Constants from 'expo-constants';

const DEALER = Constants.expoConfig?.extra?.DEALER;

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