import MobileHeader from "@/components/headers/MobileHeader";
import WebHeader from "@/components/headers/WebHeader";
import { ConfigProvider } from "@/config/ConfigContext";
import { configLoader } from "@/config/configLoader";
import { AppTheme, createAppTheme } from "@/config/createTheme";
import { ThemeProvider, useTheme } from "@shopify/restyle";
import { Stack } from "expo-router";
import { Platform } from "react-native";

const config = configLoader();
const theme = createAppTheme(config.theme);

function LayoutWithTheme() {
  const isWeb = Platform.OS === "web";
  const theme = useTheme<AppTheme>();
  return (
    <Stack
      screenOptions={{
      header: () => isWeb ? <WebHeader /> : <MobileHeader />,
    }}/>
  );
}

export default function RootLayout() {
  
  return (
    <ConfigProvider>
      <ThemeProvider theme={theme}>
        <LayoutWithTheme/>
      </ThemeProvider>
    </ConfigProvider>
  );
}
