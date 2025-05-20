import { BaseConfigAssetsType } from "./BaseConfigAssetsType";

export interface BaseConfigType {
    id: string;
    firestoreDocIdDealers: string;
    appName: string;
    supportEmail: string;
    assets: BaseConfigAssetsType;
  }