import { BaseConfigAssetsType } from "./BaseConfigAssetsType";

export interface BaseConfigType {
    firestoreDocIdDealers: string;
    appName: string;
    supportEmail: string;
    assets: BaseConfigAssetsType;
  }