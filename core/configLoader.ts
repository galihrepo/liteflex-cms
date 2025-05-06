import Constants from "expo-constants";
// import themeA from "../../dealers/dealerA/theme";
// import configA from "../../dealers/dealerA/config";
// import themeB from "../../dealers/dealerB/theme";
// import configB from "../../dealers/dealerB/config";

export const configLoader = () => {
  const key = Constants.expoConfig?.extra?.dealer;
console.log('BERAK key : ', key);
//   switch (key) {
//     case "omgals":
//       return { theme: themeB, config: configB };
//     case "dealerA":
//     default:
//       return { theme: themeA, config: configA };
//   }
};
