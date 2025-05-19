import React from 'react';
import RNPickerSelect, { Item } from 'react-native-picker-select';
import { useConfig } from '../config/provider/ConfigProvider';
import { BoxForm } from './BoxForm';
import { BoxValueForm } from './BoxValueForm';
import { TextLabelForm } from './TextLabelForm';

export type DropdownBaseProps = {
    selectedItem?: Item;
    onSelectedItem: (value: Item) => void;
  };

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
        <BoxForm>
            {label && <TextLabelForm label={label}/>}
            <BoxValueForm maxWidth={400}>
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
            </BoxValueForm>
        </BoxForm>
    );
};
