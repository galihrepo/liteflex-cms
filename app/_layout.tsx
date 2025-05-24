import DrawerNavigator from "@/src/components/DrawerNavigator";
import { createAppTheme } from "@/src/components/theme/theme";
import { configLoader } from "@/src/config/configLoader";
import { AuthProvider, useAuth } from "@/src/config/provider/AuthProvider";
import { ConfigProvider } from "@/src/config/provider/ConfigProvider";
import { ThemeProvider } from "@shopify/restyle";
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from "expo-router";

import { useEffect } from "react";
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from "react-native-safe-area-context";

// // Allow returning to the app after browser login
// import * as WebBrowser from 'expo-web-browser';
// WebBrowser.maybeCompleteAuthSession();

const config = configLoader();
const theme = createAppTheme(config.theme);

function LayoutWithTheme() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const segments = useSegments();
  const isLogin = segments[0] === "login";

  const [fontsLoaded] = useFonts({
    Pjs: require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
    PjsMedium: require('../assets/fonts/PlusJakartaSans-Medium.ttf'),
    PjsBold: require('../assets/fonts/PlusJakartaSans-Bold.ttf'),
    PjsBoldSemi: require('../assets/fonts/PlusJakartaSans-SemiBold.ttf'),
  });

  useEffect(() => {    
    if (!loading) {
      if (!user) {
        router.replace('/login');
      } 
    }
  }, [router, user, loading, isLogin]);

  if (!fontsLoaded || loading) return null;

  if (!user) {
    return (
      <Stack
        screenOptions={{
          header: () => null,
          contentStyle: {
            backgroundColor: theme?.colors?.background
          }
        }} />
    );
  }

  return (
    <DrawerNavigator />
  );
}

export default function RootLayout() {
  return (
    <ConfigProvider>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <PaperProvider>
            <SafeAreaProvider>
              <LayoutWithTheme />
            </SafeAreaProvider>
          </PaperProvider>
        </ThemeProvider>
      </AuthProvider>
    </ConfigProvider>
  );
}

