import BookingScreen from '@/app/booking';
import CarAddScreen from '@/app/car/add';
import CarScreen from '@/app/home';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { BanknoteArrowUp, Car } from 'lucide-react';
import React from 'react';
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
          width: 200,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderRightColor: theme.colors.border,
          borderRightWidth: 0.1,
          color: 'transparent',
        },
        drawerLabelStyle: {
          fontFamily: 'Pjs',
          fontSize: isPhone ? 12 : 14,
        }
      })}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="home"
        component={CarScreen}        
        options={{          
          drawerLabel: 'KENDARAAN',          
          drawerIcon: ({ color, size }) => (
            <Car size={size} color={color} />
          ),          
        }} />

      <Drawer.Screen
        name="booking"
        component={BookingScreen}
        options={{
          drawerLabel: 'BOOKING',
          drawerIcon: ({ color, size }) => (
            <BanknoteArrowUp size={size} color={color} />
          ),          
        }} />

      <Drawer.Screen
        name="car/add"
        component={CarAddScreen}        
        options={{
          drawerItemStyle: {
            display: 'none'
          }
        }} />

    </Drawer.Navigator>
  );
}
