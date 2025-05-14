import { showAlert } from "@/src/components/componentsTheme";
import MemoizedImage from "@/src/components/MemoizedImage";
import { useConfig } from "@/src/config/provider/ConfigProvider";
import { handleGoogleLogin } from "@/src/hooks/useGoogleLogin";
import { saveUser } from "@/src/services/userService";
import { useRouter } from "expo-router";
import { signOut, User } from "firebase/auth";
import { memo, useCallback } from "react";
import { Button, Text, View } from "react-native";
import { auth } from "../../src/config/configFirebase";

export default function Index() {

  const { config}  = useConfig();

  const router = useRouter();

  const onRegistered = useCallback(()=>{
    router?.push('/');
  },[])

  const onUnregistered = useCallback(()=>{
    handleLogout()
    showAlert('Email belum terdaftar.')
  },[])

  const onSuccess = useCallback(async (user: User) => {
    await saveUser({user, config, onRegistered, onUnregistered})    
  }, [])

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

  const ImageLogo = () => (<MemoizedImage uri={config?.assets?.logoUrl} width={50} height={50} />);

  const MemoizedImageLogo = memo(ImageLogo);

  return (
    <View style={{ flex: 1, justifyContent: 'center'}}>

      <View
        style={{        
          alignItems: "center",        
          backgroundColor: 'white',
          alignSelf: 'center',                
          padding: 20,
          borderRadius: 10
        }}
      >
        <Text>Login PAGE -- {config?.firestoreDocIdDealers} </Text>
        <Button title="Login" onPress={() => handleGoogleLogin({auth, onSuccess, onError})}/>
        <Button title="Logout" onPress={() => handleLogout()} />
      </View>
    </View>    
  );
}
