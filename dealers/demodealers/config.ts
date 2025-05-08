import { BaseConfigAssetsType, BaseConfigType } from '../../config/types';

const assets: BaseConfigAssetsType = {
  logoUrl: 'https://statics.olx.co.id/olxid/astra_branding/olx-indonesia-logo.png',
};

const config: Partial<BaseConfigType> = {
  appName: 'Demo Dealers',
  assets: assets,
};

export default config;
