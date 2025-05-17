import { BoxProps } from "@shopify/restyle";
import { ReactNode } from "react";
import { Box } from "./theme/componentsTheme";
import { AppTheme } from "./theme/theme";

type CardProps = BoxProps<AppTheme> & {
    children?: ReactNode;
};

export const Card = ({ children, ...props }: CardProps) => {
    return (
        <Box
            alignItems={'baseline'}
            borderRadius={'m'}
            m={'xl'}
            p={'l'}
            style={{ backgroundColor: 'white' }}
            {...props}>
                {children}
        </Box>
    );
}