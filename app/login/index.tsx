import theme from "@/dealers/omgal-motors/theme";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.secondary,
      }}
    >
      <Text>Login PAGE</Text>
    </View>
  );
}
