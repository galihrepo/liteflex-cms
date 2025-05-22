import { BoxProps } from "@shopify/restyle";
import { useRouter } from "expo-router";
import { ReactNode, useCallback } from "react";
import { useConfig } from "../config/provider/ConfigProvider";
import { Button } from "./Button";
import { LoadingButton } from "./LoadingButton";
import { Box, Text } from "./theme/componentsTheme";
import { AppTheme } from "./theme/theme";

type CardProps = BoxProps<AppTheme> & {
    title: string;
    isForm?: boolean;
    loading?: boolean;
    onSave?: () => void;
    children?: ReactNode;
};

export const Card = ({ loading, title, isForm = true, children, onSave = () => { }, ...props }: CardProps) => {

    const router = useRouter();

    const { theme } = useConfig();

    const onCancel = useCallback(() => {
        if (router.canGoBack()) {
            router.back()
        }
    }, [router])

    return (
        <Box
            alignItems={'baseline'}
            borderRadius={'m'}
            m={{ phone: 's', desktop: 'l' }}
            style={{
                backgroundColor: 'white',
                shadowColor: theme.colors.shadow,
                shadowOpacity: 0.1,
                shadowRadius: 4,
                shadowOffset: { width: 0, height: 2 },
            }}
            {...props}>
            {title && (<Text
                variant={'cardTitle'}
                paddingVertical={{ phone: 'm', desktop: 'l' }}
                paddingHorizontal={{ phone: 'l', desktop: 'xl' }}>{title}</Text>)}
            {children}            
            {isForm && (
                <Box
                    paddingVertical={{ phone: 'm', desktop: 'l' }}
                    paddingHorizontal={{ phone: 'l', desktop: 'xl' }}
                    flexDirection={'row'}
                    gap={'s'}
                    alignSelf={'flex-end'}
                    alignItems={'center'}>
                    <Button label={"Batal"} variant={'sCancel'} onPress={onCancel} />
                    {loading && (<LoadingButton style={{ height: 40 }} />)}
                    {!loading && (<Button label={"Simpan"} variant={'s'} onPress={onSave} />)}
                </Box>
            )}
        </Box>
    );
}