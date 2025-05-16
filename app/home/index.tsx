import { Text } from "@/src/components/theme/componentsTheme";
import { View } from "react-native";


export default function HomeScreen() {  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>HOME </Text> 
    </View>
  );
}
