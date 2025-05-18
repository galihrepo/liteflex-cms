import React from 'react';
import RNPickerSelect, { Item } from 'react-native-picker-select';
import { Box, Text } from './theme/componentsTheme';

type DropdownProps = {
    label?: string;
    value: string;
    onValueChange: (value: string) => void;
    items: Item[];
    disabled?: boolean;
};

export const Dropdown = ({ label, value, onValueChange, items, disabled = false }: DropdownProps) => {
    return (
        <Box mb="m">
            {label && <Text variant="s">{label}</Text>}
            <RNPickerSelect
                value={value}
                onValueChange={onValueChange}
                items={items}
                disabled={disabled}
                style={{
                    inputIOS: {
                        padding: 12,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 8,
                        backgroundColor: 'white',
                        color: 'black',
                        fontFamily: 'PjsRegular',
                    },
                    inputAndroid: {
                        padding: 12,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 8,
                        backgroundColor: 'white',
                        color: 'black',
                    },
                }}
                useNativeAndroidPickerStyle={false}
            />
        </Box>
    );
};
