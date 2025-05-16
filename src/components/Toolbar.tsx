import { useConfig } from "@/src/config/provider/ConfigProvider";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import React, { memo, useCallback } from "react";
import { Pressable } from "react-native";
import { auth } from "../config/configFirebase";
import { useAuth } from "../config/provider/AuthProvider";
import { useIsPhone } from "../hooks/useIsPhone";
import MemoizedImage from "./MemoizedImage";
import { PressableHover } from "./PressableHover";
import { Box, Text } from "./theme/componentsTheme";

type ToolbarProps = {
    onMenuPress?: () => void;
};

export const Toolbar = ({ onMenuPress }: ToolbarProps) => {

    const isPhone = useIsPhone();

    const { config, theme } = useConfig();

    const { user } = useAuth();

    const router = useRouter();

    const UserPicture = () => (<MemoizedImage uri={user?.photoURL || ''} width={35} height={35} style={{ borderRadius: 9999 }} />);

    const ImageLogo = () => (<MemoizedImage uri={config?.assets?.logoUrl} width={50} height={50} />);

    const MemoizedUserPicture = memo(UserPicture);

    const MemoizedImageLogo = memo(ImageLogo);

    const handleLogout = useCallback(async () => {
        try {
            await signOut(auth);
            router.replace('/login');
        } catch (error) {
            console.error(error);
        }
    }, []);

    return (
        <Box alignItems={"center"} flexDirection={'row'} paddingVertical={'s'} paddingHorizontal={'m'} backgroundColor={'toolbar'}>
            {isPhone && onMenuPress && (
                <Pressable onPress={onMenuPress} style={{ marginRight: 16 }}>
                    <Ionicons name="menu" size={28} color={theme.colors.icon} />
                </Pressable>
            )}
            <Box flex={1} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <MemoizedImageLogo />

                <PressableHover onPress={() => handleLogout()}>
                    <Box flexDirection={"row"} gap={"s"} alignItems={"center"}>
                        <MemoizedUserPicture />
                        <Text variant={"s"}>{user?.displayName}</Text>
                        {/* <Ionicons name="chevron-down" size={14} color={theme.colors.icon} /> */}
                    </Box>
                </PressableHover>
            </Box>
        </Box>
    );
}