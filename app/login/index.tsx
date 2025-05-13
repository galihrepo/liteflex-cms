import { handleGoogleLogin } from "@/src/hooks/useGoogleLogin";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { useCallback } from "react";
import { Button, Text, View } from "react-native";
import { auth } from "../../src/config/configFirebase";

export default function Index() {

  const router = useRouter();

  const onSuccess = useCallback(() => {
    router.back()
  }, [router])

  const onError = useCallback(() => {

  }, [])
  
  const handleLogout = useCallback(async () => {
    try {
      await signOut(auth);
      console.log('User logged out');
    } catch (error) {
      console.error('Error during logout: ', error);
    }
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Login PAGE</Text>
      <Button title="Login" onPress={() => handleGoogleLogin({auth, onSuccess})} />
      <Button title="Logout" onPress={() => handleLogout()} />
    </View>
  );
}
