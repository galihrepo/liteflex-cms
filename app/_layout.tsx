import { createAppTheme } from "@/src/components/theme/theme";
import { Toolbar } from "@/src/components/Toolbar";
import { configLoader } from "@/src/config/configLoader";
import { AuthProvider, useAuth } from "@/src/config/provider/AuthProvider";
import { ConfigProvider, useConfig } from "@/src/config/provider/ConfigProvider";
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
  }, [router, user, loading]);

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
