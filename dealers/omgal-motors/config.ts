import { BaseConfigAssetsType } from "@/src/types/config/BaseConfigAssetsType";
import { BaseConfigType } from "@/src/types/config/BaseConfigType";

const assets: BaseConfigAssetsType = {
  logoUrl: 'https://static.vecteezy.com/system/resources/previews/040/566/692/non_2x/car-logo-car-deal-with-hand-shake-symbol-vector.jpg',
};

const config: Partial<BaseConfigType> = {
  firestoreDocIdDealers: 'omgal-motors',
  appName: 'Oms Gal Motors',
  assets: assets,
};

export default config;
