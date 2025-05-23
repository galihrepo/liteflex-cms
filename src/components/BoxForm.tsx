import { BoxProps } from "@shopify/restyle";
import { ReactNode } from "react";
import { Box } from "./theme/componentsTheme";
import { AppTheme } from "./theme/theme";

type BoxFormProps = BoxProps<AppTheme> & {
    children?: ReactNode;
};

export const BoxForm = ({ children }: BoxFormProps) => {
    return (
        <Box
            flexDirection={'row'}
            width="100%"
            alignItems={'center'}
            paddingVertical={{ phone: 's', desktop: 'm' }}
            paddingHorizontal={{ phone: 'l', desktop: 'xl' }}
            gap={{phone: 's', desktop: 'm'}}>
            {children}
        </Box>
    );
}