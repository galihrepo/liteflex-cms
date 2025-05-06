import Constants from "expo-constants";
import configDemoDealer from '../dealers/demodealers/config';
import themeDemoDealer from '../dealers/demodealers/theme';
import configOmgalsMotor from '../dealers/omgal-motors/config';
import themeOmgalsMotor from '../dealers/omgal-motors/theme';

export const configLoader = () => {
  const key = Constants.expoConfig?.extra?.dealer;
  switch (key) {
    case "omgal-motors":
      return { theme: themeOmgalsMotor, config: configOmgalsMotor };
    case "demodealers":
      return { theme: themeDemoDealer, config: configDemoDealer };
    default:
      return { theme: themeDemoDealer, config: configDemoDealer };
  }
};
