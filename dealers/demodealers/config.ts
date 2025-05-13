import { BaseConfigAssetsType } from "@/src/types/config/BaseConfigAssetsType";
import { BaseConfigType } from "@/src/types/config/BaseConfigType";

const assets: BaseConfigAssetsType = {
  logoUrl: 'https://statics.olx.co.id/olxid/astra_branding/olx-indonesia-logo.png',
};

const config: Partial<BaseConfigType> = {
  firestoreDocIdDealers: 'demodealers',
  appName: 'Demo Dealers',
  assets: assets,
};

export default config;
