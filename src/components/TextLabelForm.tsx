import { Text } from './theme/componentsTheme';

type TextLabelFormProps = {    
    label: string;
};

export const TextLabelForm = ({label}: TextLabelFormProps) => {
    return (
        <Text width={{ phone: '20%', desktop: '30%' }} variant="formLabel">{label}</Text>
    )
}