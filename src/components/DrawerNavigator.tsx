import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

// import HomeScreen from '@/app/(drawer)/index';        // You can route these to actual files
// import SettingsScreen from '@/app/(drawer)/settings'; // Or load lazily if needed
// import { Toolbar } from '../components/Toolbar';
import Index from '@/app/index';
import { DrawerActions } from '@react-navigation/native';
import { Toolbar } from './Toolbar';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        header: () => <Toolbar onMenuPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />,
        // header: () => <Toolbar/>,
        // drawerType: Platform.OS === 'web' ? 'permanent' : 'front',
        drawerType: 'front'
      })}
    >
      <Drawer.Screen name="home" component={Index} />
      <Drawer.Screen name="Home2" component={Index} />
      {/* <Drawer.Screen name="Settings" component={SettingsScreen} /> */}
    </Drawer.Navigator>
  );
}
