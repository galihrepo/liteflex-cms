import React from 'react';
import RNPickerSelect, { Item } from 'react-native-picker-select';
import { useConfig } from '../config/provider/ConfigProvider';
import { BoxForm } from './BoxForm';
import { BoxValueForm } from './BoxValueForm';
import { TextLabelForm } from './TextLabelForm';
import { Box, Text } from './theme/componentsTheme';

export type DropdownBaseProps = {
    selectedItem?: Item;
    error?: string;
    onSelectedItem: (value: Item | undefined) => void;
  };

type DropdownProps = {
    label?: string;
    value: string;
    error?: string;
    onValueChange: (value: string) => void;
    items: Item[];
    disabled?: boolean;
};

export const Dropdown = ({ label = 'Pilih..', value, error, onValueChange, items, disabled = false }: DropdownProps) => {
    const config = useConfig();

    const pickerBaseStyle = {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderWidth: 0,
        borderRadius: 8,
        fontFamily: 'Pjs',
        backgroundColor: config.theme.colors.formBackground,
        fontSize: 14,
        color: disabled ? config.theme.colors.formTextHint : config.theme.colors.formTextLabel,
    };

    return (
        <BoxForm>
            {label && <TextLabelForm label={label}/>}
            <BoxValueForm maxWidth={400}>
                <Box>
                <RNPickerSelect
                    value={value}
                    onValueChange={onValueChange}
                    items={items}
                    disabled={disabled}
                    placeholder={{ label: 'Pilih', value: null }}
                    useNativeAndroidPickerStyle={false}
                    style={{
                        inputIOS: pickerBaseStyle,
                        inputAndroid: pickerBaseStyle,
                        inputWeb: pickerBaseStyle,                           
                    }}
                />
                {error && <Text variant={'formError'}>{error}</Text>}
                </Box>
            </BoxValueForm>
        </BoxForm>
    );
};
