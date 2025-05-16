import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

// import HomeScreen from '@/app/(drawer)/index';        // You can route these to actual files
// import SettingsScreen from '@/app/(drawer)/settings'; // Or load lazily if needed
// import { Toolbar } from '../components/Toolbar';
import Index from '@/app/index';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useConfig } from '../config/provider/ConfigProvider';
import { useIsPhone } from '../hooks/useIsPhone';
import { DrawerContent } from './DrawerContent';
import { Toolbar } from './Toolbar';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const isPhone = useIsPhone();
  const { theme } = useConfig(); 

  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        header: () => <Toolbar onMenuPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />,
        drawerType: isPhone ? 'front' : 'permanent',
        drawerActiveBackgroundColor: 'transparent',
        drawerInactiveBackgroundColor: 'transparent',
        drawerActiveTintColor: theme.colors.primary,
        drawerInactiveTintColor: theme.colors.textDrawerInactive,
        drawerStyle: {
          width: 220,
          borderTopRightRadius: 0,     
          borderBottomRightRadius: 0,
          borderRightColor: theme.colors.border,
          borderRightWidth: 0.1,
          color: 'transparent', 
        }
      })}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="home"
        component={Index}
        options={{
          drawerLabel: 'HOME',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }} />
      
      <Drawer.Screen
        name="booking"
        component={Index}
        options={{
          drawerLabel: 'BOOKING',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="book" size={size} color={color} />
          ),
        }} />
      
    </Drawer.Navigator>
  );
}
