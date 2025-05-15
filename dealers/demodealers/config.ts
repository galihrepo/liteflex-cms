import { BaseConfigAssetsType } from "@/src/types/config/BaseConfigAssetsType";
import { BaseConfigType } from "@/src/types/config/BaseConfigType";

const assets: BaseConfigAssetsType = {
  logoUrl: 'https://img.freepik.com/premium-vector/car-deal-logo-design-template-element-with-car-handshake-illustration_412311-3187.jpg',
};

const config: Partial<BaseConfigType> = {
  firestoreDocIdDealers: 'demodealers',
  appName: 'Demo Dealers',
  assets: assets,
};

export default config;
