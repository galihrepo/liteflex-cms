export interface BaseThemeType {
    colors: {
      primary: string;
      secondary?: string;
      background?: string;
      text?: string;
      textHint?: string;
    };
  }
  
  export interface BaseConfigType {
    appName: string;
    supportEmail: string;
    assets: BaseConfigAssetsType;
  }

  export interface BaseConfigAssetsType {
    logoUrl: string;
  }

  export interface DealerConfig {
    config: BaseConfigType;
    theme: BaseThemeType;
  }
  