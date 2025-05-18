import React from 'react';
import RNPickerSelect, { Item } from 'react-native-picker-select';
import { useConfig } from '../config/provider/ConfigProvider';
import { Box, Text } from './theme/componentsTheme';

type DropdownProps = {
    label?: string;
    value: string;
    onValueChange: (value: string) => void;
    items: Item[];
    disabled?: boolean;
};



export const Dropdown = ({ label = 'Pilih..', value, onValueChange, items, disabled = false }: DropdownProps) => {
    const config = useConfig();

    const pickerBaseStyle = {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderWidth: 0,
        borderRadius: 8,
        fontFamily: 'PjsMedium',
        backgroundColor: config.theme.colors.backgroundForm,
        fontSize: 14,        
    };

    return (
        <Box flexDirection={'row'} width="100%" alignItems={'center'}>
            {label && <Text width={{ phone: '20%', desktop: '30%' }} variant="formLabel">{label}</Text>}
            <Box
                maxWidth={400}
                flexShrink={1}
                flexGrow={1}
            >
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
            </Box>
        </Box>
    );
};
