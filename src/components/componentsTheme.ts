import { AppTheme } from "@/config/theme";
import { createBox, createText } from "@shopify/restyle";
import { Alert, Platform } from 'react-native';

export const Text = createText<AppTheme>();
export const Box = createBox<AppTheme>();

// better move to utils
export const showAlert = (message: string) => {
  if (Platform.OS === 'web') {
    alert(message);
  } else {
    Alert.alert('Informasi', message);
  }
};