import { auth } from "@/config/configFirebase";
import { useGoogleLogin } from "@/hooks/useGoogleAuth";
import { handleGoogleLogin } from "@/hooks/useGoogleLogin";
import { signOut } from "firebase/auth";
import { Button, Text, View } from "react-native";

export default function Index() {
  const { promptAsync } = useGoogleLogin();

  const handleLogout = async () => {
    try {
      await signOut(auth); // This signs the user out
      console.log('User logged out');
    } catch (error) {
      console.error('Error during logout: ', error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Login PAGE</Text>
      <Button title="Login" onPress={() => handleGoogleLogin()} />
      <Button title="Logout" onPress={() => handleLogout()} />
    </View>
  );
}
