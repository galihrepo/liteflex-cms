import { Toolbar } from "@/components/Toolbar";
import { ConfigProvider } from "@/config/ConfigContext";
import { configLoader } from "@/config/configLoader";
import { AppTheme, createAppTheme } from "@/config/theme";
import { isWeb } from "@/utils/utils";
import { ThemeProvider, useTheme } from "@shopify/restyle";
import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const config = configLoader();
const theme = createAppTheme(config.theme);

function LayoutWithTheme() {
  const theme = useTheme<AppTheme>();
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
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <LayoutWithTheme />
        </SafeAreaProvider>
      </ThemeProvider>
    </ConfigProvider>
  );
}
