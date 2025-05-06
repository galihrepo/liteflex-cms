import theme from "@/dealers/omgal-motors/theme";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.primary
      }}
    >
      <Text>Ruanggratis COMING SOON by ex-ruangguru.</Text>
    </View>
  );
}
