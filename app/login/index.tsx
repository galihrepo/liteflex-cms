import { useConfig } from "@/core/ConfigContext";
import { Text, View } from "react-native";

export default function Index() {
  const config = useConfig();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: config?.theme?.colors?.secondary || '',
      }}
    >
      <Text>Login PAGE</Text>
    </View>
  );
}
