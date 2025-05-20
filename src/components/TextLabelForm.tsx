import { Box, Text } from './theme/componentsTheme';

type TextLabelFormProps = {    
    label: string;
    subLabel?: string;
};

export const TextLabelForm = ({label, subLabel}: TextLabelFormProps) => {
    return (
        <Box width={{ phone: '20%', desktop: '30%' }}>
            <Text variant="formLabel">{label}</Text>
            {subLabel && <Text variant="formSubLabel">{subLabel}</Text>}
        </Box>
        
    )
}