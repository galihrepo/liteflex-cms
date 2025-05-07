import TextThemed from "@/components/TextThemed";
import { useConfig } from "@/config/ConfigContext";
import { View } from "react-native";


export default function Index() {  
  const { theme, config } = useConfig();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme?.colors?.primary || '',
      }}
    >
      <TextThemed>Ruanggratis COMING SOON by ex-ruanggurus {config.supportEmail} </TextThemed>
      
    </View>
  );
}
