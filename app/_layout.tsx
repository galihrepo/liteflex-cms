import { Toolbar } from "@/src/components/Toolbar";
import { configLoader } from "@/src/config/configLoader";
import { AuthProvider, useAuth } from "@/src/config/provider/AuthProvider";
import { ConfigProvider, useConfig } from "@/src/config/provider/ConfigProvider";
import { createAppTheme } from "@/src/config/theme";
import { isWeb } from "@/src/hooks/useIsPhone";
import { ThemeProvider } from "@shopify/restyle";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const config = configLoader();
const theme = createAppTheme(config.theme);

function LayoutWithTheme() {
  const { config } = useConfig();
  const { user, loading } = useAuth();
  const router = useRouter();
  const segments = useSegments();
  const isLogin = segments[0] === "login";
  
  useEffect(() => {
    // if (!loading && !user) {
    //   router.push('/login');
    // }

    // if (isLogin && !loading && user) {
    //   if (router.canGoBack()) {
    //     router.back()
    //   } else {
    //     router.push('/');
    //   }      
    // }  
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else if (isLogin) {
        // if (router.canGoBack()) {
        //   router.back()
        // } else {
        //   router.push('/')
        // }
      }
    }
  }, [user]);

  return (
    <Stack
      screenOptions={{                
        header: () => isLogin ? null :  
        isWeb ? <Toolbar /> : (
          <SafeAreaView>
            <Toolbar />
          </SafeAreaView>
        ),
        contentStyle: {
          backgroundColor: theme?.colors?.background
        }      
    }}/>
  );
}

export default function RootLayout() {
  return (
    <ConfigProvider>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <SafeAreaProvider>
            <LayoutWithTheme />
          </SafeAreaProvider>
        </ThemeProvider>
      </AuthProvider>
    </ConfigProvider>
  );
}
