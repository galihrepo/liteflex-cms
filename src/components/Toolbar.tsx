import { useConfig } from "@/src/config/provider/ConfigProvider";
import { Ionicons } from '@expo/vector-icons';
import React, { memo } from "react";
import { Pressable } from "react-native";
import { useAuth } from "../config/provider/AuthProvider";
import { Box, Text } from "./componentsTheme";
import MemoizedImage from "./MemoizedImage";

type ToolbarProps = {
    onMenuPress?: () => void;  // optional prop for hamburger menu
  };

export const Toolbar = ({ onMenuPress }: ToolbarProps) => {

    const { config, theme } = useConfig();

    const { user } = useAuth();

    const UserPicture = () => (<MemoizedImage uri={user?.photoURL || ''} width={35} height={35} style={{ borderRadius: 9999 }}/>);

    const ImageLogo = () => (<MemoizedImage uri={config?.assets?.logoUrl} width={50} height={50} />);

    const MemoizedUserPicture = memo(UserPicture);

    const MemoizedImageLogo = memo(ImageLogo);

    return (        
        <Box alignItems={"center"} flexDirection={'row'} paddingVertical={'s'} paddingHorizontal={'m'} backgroundColor={'toolbar'}>
            {onMenuPress && (
                <Pressable onPress={onMenuPress} style={{ marginRight: 16 }}>
                    <Ionicons name="menu" size={28} color={theme.colors.icon}/>
                </Pressable>
            )}            
            <Box flex={1} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <MemoizedImageLogo />
                <Pressable>
                    <Box flexDirection={"row"} gap={"s"} alignItems={"center"}>
                        <MemoizedUserPicture/>
                        <Text variant={"s"}>{user?.displayName}</Text>
                        <Ionicons name="chevron-down" size={14} color={theme.colors.icon} />
                    </Box>
                </Pressable>                
            </Box>            
        </Box>
    );
}