import MobileHeader from "@/components/headers/MobileHeader";
import WebHeader from "@/components/headers/WebHeader";
import { ConfigProvider } from "@/core/ConfigContext";
import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function RootLayout() {
  const isWeb = Platform.OS === "web";

  return (
    <ConfigProvider>
      <Stack
        screenOptions={{
          header: () => isWeb ? <WebHeader /> : <MobileHeader />,
        }}/>
    </ConfigProvider>
  );
}
