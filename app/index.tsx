import { useConfig } from "@/core/ConfigContext";
import { Text, View } from "react-native";


export default function Index() {  
  const { theme } = useConfig();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme?.colors?.primary || '',
      }}
    >
      <Text>Ruanggratis COMING SOON by ex-ruanggurus</Text>
    </View>
  );
}
