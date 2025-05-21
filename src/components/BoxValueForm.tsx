import { BoxProps } from "@shopify/restyle";
import { ReactNode } from "react";
import { Box } from "./theme/componentsTheme";
import { AppTheme } from "./theme/theme";

type BoxValueFormProps = BoxProps<AppTheme> & {
    children?: ReactNode;
};

export const BoxValueForm = (props: BoxValueFormProps) => {
    const { children } = props;
    return (
        <Box
            width={'70%'}
            flexShrink={1}
            flexGrow={1}
            {...props}>
            {children}
        </Box>
    );
}