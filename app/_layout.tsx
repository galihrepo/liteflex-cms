import { ConfigProvider } from "@/core/ConfigContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ConfigProvider>
      <Stack/>
    </ConfigProvider>
  );
}
