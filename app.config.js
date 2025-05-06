export default ({ config }) => {
    const dealer = process.env.DEALER || "omgal-motors";
  
    return {
      ...config,
      name: dealer,
      slug: "lite-flex-ic",
      version: "1.0.0",
      orientation: "portrait",
      icon: `./assets/images/dealers/${dealer}/icon.png`,
      scheme: "liteflexic",
      userInterfaceStyle: "automatic",
      newArchEnabled: true,
      jsEngine: "hermes",
      ios: {
        supportsTablet: true,
        bundleIdentifier: `com.liteflexic.${dealer}`,
        infoPlist: {
          ITSAppUsesNonExemptEncryption: false
        }
      },
      android: {
        edgeToEdgeEnabled: true,
        package: `com.liteflexic.${dealer}`,
        adaptiveIcon: {
          foregroundImage: `./assets/images/dealers/${dealer}/adaptive-icon.png`,
          backgroundColor: "#ffffff"
        }
      },
      web: {
        bundler: "metro",
        output: "static",
        favicon: `./assets/images/dealers/${dealer}/favicon.png`
      },
      plugins: [
        "expo-router",
        [
          "expo-splash-screen",
          {
            image: `./assets/dealers/${dealer}/splash-icon.png`,
            imageWidth: 200,
            resizeMode: "contain",
            backgroundColor: "#ffffff"
          }
        ]
      ],
      experiments: {
        typedRoutes: true
      },
      extra: {
        router: {},
        eas: {
          projectId: "68603bcf-8374-493a-833b-08139626c73c"
        },
        dealer
      }
    };
  };
  