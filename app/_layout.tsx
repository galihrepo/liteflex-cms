import { Toolbar } from "@/src/components/Toolbar";
import { configLoader } from "@/src/config/configLoader";
import { AuthProvider, useAuth } from "@/src/config/provider/AuthProvider";
import { ConfigProvider } from "@/src/config/provider/ConfigProvider";
import { createAppTheme } from "@/src/config/theme";
import { isWeb } from "@/src/hooks/useIsPhone";
import { ThemeProvider } from "@shopify/restyle";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const config = configLoader();
const theme = createAppTheme(config.theme);

function LayoutWithTheme() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
  //       if (firebaseUser) {
          
  //       } else {
  //         router.replace('/login');
  //       }
  //   });

  //   return unsubscribe;
  // }, []);
  
  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [loading, user, router]);

  return (
    <Stack
      screenOptions={{                
        header: () => isWeb ? <Toolbar /> : (
          <SafeAreaView>
            <Toolbar />
          </SafeAreaView>
        ),      
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
