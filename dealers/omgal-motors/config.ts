import { BaseConfigAssetsType } from "@/src/types/config/BaseConfigAssetsType";
import { BaseConfigType } from "@/src/types/config/BaseConfigType";

const assets: BaseConfigAssetsType = {
  logoUrl: '',
};

const config: Partial<BaseConfigType> = {
  firestoreDocIdDealers: 'omgal-motors',
  appName: 'Oms Gal Motors',
  assets: assets,
};

export default config;
