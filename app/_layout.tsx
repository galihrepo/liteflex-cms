import { Toolbar } from "@/components/Toolbar";
import { auth } from "@/config/configFirebase";
import { configLoader } from "@/config/configLoader";
import { AuthProvider, useAuth } from "@/config/provider/AuthProvider";
import { ConfigProvider } from "@/config/provider/ConfigProvider";
import { createAppTheme } from "@/config/theme";
import { isWeb } from "@/hooks/useIsPhone";
import { ThemeProvider } from "@shopify/restyle";
import { Stack, useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const config = configLoader();
const theme = createAppTheme(config.theme);

function LayoutWithTheme() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log('BERAK firebaseUser : ', firebaseUser)
        if (firebaseUser) {
          
        } else {
          router.replace('/login');
        }
    });

    return unsubscribe;
  }, []);
  
  // useEffect(() => {
  //   console.log('BERAK loading : ', loading)
  //   console.log('BERAK user : ', user)
  //   if (!loading && !user) {
  //     router.replace('/login');
  //   }
  // }, [loading, user, router]);

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
