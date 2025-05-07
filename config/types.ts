export interface BaseThemeType {
    colors: {
      primary: string;
      secondary?: string;
      background?: string;
      text?: string;
      danger?: string;
    };
  }
  
  export interface BaseConfigType {
    appName: string;
    supportEmail: string;
  }

  export interface DealerConfig {
    config: BaseConfigType;
    theme: BaseThemeType;
  }
  