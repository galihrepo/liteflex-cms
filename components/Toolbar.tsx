import { useConfig } from "@/config/ConfigContext";
import { useIsPhone } from "@/utils/utils";
import { Feather } from '@expo/vector-icons';
import { memo } from "react";
import { Box, Text } from "./componentsTheme";
import MemoizedImage from "./MemoizedImage";


export const Toolbar = () => {

    const { config } = useConfig();

    const isPhone = useIsPhone();

    const ImageLogo = () => (<MemoizedImage uri={config?.assets?.logoUrl} width={50} height={50} />);

    const MemoizedImageLogo = memo(ImageLogo);

    return (        
        <Box flexDirection={{ phone: 'column-reverse', desktop: 'row'}} p={{ phone: 's', desktop: 'm'}} backgroundColor={'primary'}>
            <Box flexDirection={"row"} flex={1} alignItems={'center'}>
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
            </Box>
            <Box flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
                {isPhone && <MemoizedImageLogo />}
                <Box flexDirection={"row"} gap={"s"}>
                    <Text>N</Text>
                    <Text>K</Text>
                    <Text>Z</Text>
                </Box>
            </Box>
            
        </Box>
    );
}