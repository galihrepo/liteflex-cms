import { useConfig } from "@/src/config/provider/ConfigProvider";
import { Menu } from "lucide-react-native";
import React, { memo } from "react";
import { Pressable } from "react-native";
import { useAuth } from "../config/provider/AuthProvider";
import { useIsPhone } from "../hooks/useIsPhone";
import MemoizedImage from "./MemoizedImage";
import { Box, Text } from "./theme/componentsTheme";

type ToolbarProps = {
    onMenuPress?: () => void;
};

export const Toolbar = ({ onMenuPress }: ToolbarProps) => {

    const isPhone = useIsPhone();

    const { config, theme } = useConfig();

    const { user } = useAuth();

    const UserPicture = () => (<MemoizedImage uri={user?.photoURL || ''} width={35} height={35} style={{ borderRadius: 9999 }} />);

    const ImageLogo = () => (<MemoizedImage uri={config?.assets?.logoUrl} width={50} height={50} />);

    const MemoizedUserPicture = memo(UserPicture);

    const MemoizedImageLogo = memo(ImageLogo);

    return (
        <Box alignItems={"center"} flexDirection={'row'} paddingVertical={'s'} paddingHorizontal={'m'} backgroundColor={'toolbar'}>
            {isPhone && onMenuPress && (
                <Pressable onPress={onMenuPress} style={{ marginRight: 16 }}>
                    <Menu size={28} color={theme.colors.icon} />
                </Pressable>
            )}
            <Box flex={1} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <MemoizedImageLogo />
                <Box flexDirection={"row"} gap={"s"} alignItems={"center"}>
                    <MemoizedUserPicture />
                    <Text variant={"s"}>{user?.displayName}</Text>
                </Box>
            </Box>
        </Box>
    );
}