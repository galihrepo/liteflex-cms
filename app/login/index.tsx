import { showAlert } from "@/src/components/Alert";
import { ButtonGoogle } from "@/src/components/ButtonGoogle";
import MemoizedImage from "@/src/components/MemoizedImage";
import { Box, Text } from "@/src/components/theme/componentsTheme";
import { useConfig } from "@/src/config/provider/ConfigProvider";
import { handleGoogleLogin } from "@/src/hooks/useGoogleLogin";
import { saveUser } from "@/src/services/userService";
import { useRouter } from "expo-router";
import { signOut, User } from "firebase/auth";
import { memo, useCallback } from "react";
import { View } from "react-native";
import { auth } from "../../src/config/configFirebase";

export default function Index() {

  const { config, theme }  = useConfig();

  const router = useRouter();

  const onRegistered = useCallback(()=>{
    router?.push('/');
  },[router])

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
    } catch (error) {
      console.error(error);
    }
  }, []);

  const ImageLogo = () => (<MemoizedImage uri={config?.assets?.logoUrl} width={100} height={100} />);

  const MemoizedImageLogo = memo(ImageLogo);

  return (
    <View style={{ flex: 1, justifyContent: 'center'}}>
      
      <Box alignSelf={"center"} style={{marginBottom: -60, zIndex: 1, backgroundColor: 'white', borderRadius: 9999, padding: 20, boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',}}>
        <MemoizedImageLogo/>  
      </Box>
      
      <View
        style={{                  
          backgroundColor: 'white',
          alignSelf: 'center',                
          paddingHorizontal: 50,
          paddingTop: 100,
          paddingBottom: 50,
          borderRadius: 20,          
          gap: 25,
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Text textAlign={'center'} variant={'header'}>Masuk ke Akun Anda</Text>
        <ButtonGoogle onPress={() => handleGoogleLogin({auth, onSuccess, onError})}/>
      </View>
    </View>    
  );
}
