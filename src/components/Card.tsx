import { BoxProps } from "@shopify/restyle";
import { useRouter } from "expo-router";
import { ReactNode, useCallback } from "react";
import { Button } from "./Button";
import { Box, Text } from "./theme/componentsTheme";
import { AppTheme } from "./theme/theme";

type CardProps = BoxProps<AppTheme> & {
    title: string;
    isForm?: boolean;
    onSave?: () => void;
    children?: ReactNode;
};

export const Card = ({ title, isForm = true, children, onSave = () => { }, ...props }: CardProps) => {

    const router = useRouter();

    const onCancel = useCallback(() => {
        if (router.canGoBack()) {
            router.back()
        }
    }, [router])

    return (
        <Box
            alignItems={'baseline'}
            borderRadius={'m'}
            m={'xl'}
            style={{ backgroundColor: 'white' }}
            {...props}>
            <Text variant={'cardTitle'} p={'l'}>{title}</Text>
            <Box height={10}/>
            {children}
            <Box height={10}/>
            {isForm && (
                <Box
                    p={'l'}
                    flexDirection={'row'}
                    gap={'s'}
                    alignSelf={'flex-end'}>
                    <Button label={"Batal"} variant={'sCancel'} onPress={onCancel} />
                    <Button label={"Simpan"} variant={'s'} onPress={onSave} />
                </Box>
            )}
        </Box>
    );
}