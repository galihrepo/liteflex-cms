import { AppTheme } from "@/src/components/theme/theme";
import { useTheme } from "@shopify/restyle";
import { Platform, useWindowDimensions } from "react-native";

export const isWeb = Platform.OS === "web";

export function useIsPhone() {
    const { width } = useWindowDimensions();
    const theme = useTheme<AppTheme>();
  
    const breakpoints = theme.breakpoints;
  
    if (width >= breakpoints.desktop) return false;
    return true;
  }