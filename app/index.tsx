import { Text } from "@/components/componentsTheme";
import { useConfig } from "@/config/ConfigContext";
import { View } from "react-native";


export default function Index() {  
  const { config } = useConfig();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Ruanggratis COMING SOON by ex-ruanggurus {config.supportEmail} </Text> 
    </View>
  );
}
