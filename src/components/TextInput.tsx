import { TextInput, TextInputProps } from "react-native";
import { useConfig } from "../config/provider/ConfigProvider";
import { BoxForm } from "./BoxForm";
import { BoxValueForm } from "./BoxValueForm";
import { TextLabelForm } from "./TextLabelForm";
import { Text } from './theme/componentsTheme';

type InputProps = TextInputProps & {
    label: string;
    hint: string;
    error?: string;
};

export const TextInputField = ({ label, error, hint, ...props }: InputProps) => {
    const { theme } = useConfig();
    return (
        <BoxForm>
            {label && <TextLabelForm label={label} />}
            <BoxValueForm>
                <TextInput
                    placeholder={hint}
                    placeholderTextColor={theme.colors.textHint}
                    style={{
                        paddingVertical: 10,
                        paddingHorizontal: 16,
                        borderWidth: 0,
                        borderRadius: 8,
                        fontFamily: 'PjsMedium',
                        backgroundColor: theme.colors.backgroundForm,
                        fontSize: 14,
                    }}
                    {...props}
                />
                {error && <Text variant={'header'}>{error}</Text>}
            </BoxValueForm>

        </BoxForm>
    );
};