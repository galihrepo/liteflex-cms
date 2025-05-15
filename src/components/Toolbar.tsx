import { useConfig } from "@/src/config/provider/ConfigProvider";
import { Ionicons } from '@expo/vector-icons';
import React, { memo } from "react";
import { Pressable } from "react-native";
import { useAuth } from "../config/provider/AuthProvider";
import { Box, Text } from "./componentsTheme";
import MemoizedImage from "./MemoizedImage";


export const Toolbar = () => {

    const { config } = useConfig();

    const { user } = useAuth();

    const UserPicture = () => (<MemoizedImage uri={user?.photoURL || ''} width={35} height={35} style={{ borderRadius: 9999 }}/>);

    const ImageLogo = () => (<MemoizedImage uri={config?.assets?.logoUrl} width={50} height={50} />);

    const MemoizedUserPicture = memo(UserPicture);

    const MemoizedImageLogo = memo(ImageLogo);

    return (        
        <Box flexDirection={{ phone: 'column-reverse', desktop: 'row'}} paddingVertical={'s'} paddingHorizontal={'m'} backgroundColor={'toolbar'}>
            {/* <Box flexDirection={"row"} flex={1} alignItems={'center'}>
                {!isPhone && <MemoizedImageLogo />}
                <Box 
                    flexDirection={'row'}  
                    alignItems={'center'}
                    borderWidth={1}
                    borderRadius={'xl'}
                    paddingHorizontal={'m'}
                    paddingVertical={'xs'}                    
                    style={{
                        borderColor: '#C3D4E9',                        
                    }}>
                    <Feather name="search" size={14} color='textHint' />
                    <Text flex={1} color={'textHint'} fontSize={14} minWidth={100}>Search</Text>
                    <Feather name="sliders" size={14} color='textHint' />
                </Box>
            </Box> */}
            <Box flex={1} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
                {/* {isPhone && <MemoizedImageLogo />} */}
                <MemoizedImageLogo />
                <Pressable>
                    <Box flexDirection={"row"} gap={"s"} alignItems={"center"}>
                        <MemoizedUserPicture/>
                        <Text variant={"s"}>{user?.displayName}</Text>
                        <Ionicons name="chevron-down" size={14} color="#64748B" />
                    </Box>
                </Pressable>                
            </Box>            
        </Box>
    );
}