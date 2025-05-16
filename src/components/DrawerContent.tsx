import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import React from 'react';
import { auth } from '../config/configFirebase';
import { useConfig } from '../config/provider/ConfigProvider';
import { showAlertChoice } from './Alert';

export function DrawerContent(props: any) {

  const { theme } = useConfig();
  
  const router = useRouter();
  
  const handleLogout = async () => {
    showAlertChoice('Keluar dari akun?', async () => {
      await signOut(auth);
      router.replace('/login');
    })
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} labelStyle={{
          fontFamily: 'Pjs',
          fontSize: 16,
        }}/>
      <DrawerItem
        label="KELUAR"
        onPress={handleLogout}
        activeTintColor={theme?.colors?.primary}
        inactiveTintColor={theme?.colors?.textDrawerInactive}
        activeBackgroundColor='transparent'
        inactiveBackgroundColor='transparent'
        icon={({ color, size }) => (
          <Ionicons name="log-out-outline" size={size} color={color} />
        )}
      />
    </DrawerContentScrollView>
  );
}
