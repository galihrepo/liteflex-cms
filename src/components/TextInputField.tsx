import React from "react";
import { TextInput, TextInputProps } from "react-native";
import { useConfig } from "../config/provider/ConfigProvider";
import { useIsPhone } from "../hooks/useIsPhone";
import { BoxForm } from "./BoxForm";
import { BoxValueForm } from "./BoxValueForm";
import { TextLabelForm } from "./TextLabelForm";
import { Box, Text } from './theme/componentsTheme';

type InputProps = TextInputProps & {
  label: string;
  sublabel?: string;
  hint?: string;
  error?: string;
  variant?: 'default' | 'price' | 'year';
};

export const TextInputField = ({ label, sublabel, error, hint, variant = 'default', value, onChangeText, ...props }: InputProps) => {
  const { theme } = useConfig();

  const isPhone = useIsPhone();

  // Format number as IDR currency string, e.g. "Rp 1.000.000"
  const formatIDR = (numStr: string) => {
    // Remove non-digit characters (except comma/dot if you want decimals)
    const cleanStr = numStr.replace(/[^\d]/g, '');

    if (cleanStr === '') return '';

    // Parse number
    const num = parseInt(cleanStr, 10);
    if (isNaN(num)) return '';

    // Format with thousand separators (dot in IDR style)
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };


  // To control displayed value formatted (for price variant)
  // We'll keep an internal state for display value when variant is price

  const [displayValue, setDisplayValue] = React.useState(() => {
    if (variant === 'price' && typeof value === 'string') {
      return formatIDR(value);
    }
    return value || '';
  });

  React.useEffect(() => {
    if (variant === 'price' && typeof value === 'string') {
      setDisplayValue(formatIDR(value));
    } else if (variant !== 'price') {
      setDisplayValue(value || '');
    }
  }, [value, variant]);

  return (
    <BoxForm>
      {label && <TextLabelForm label={label} subLabel={sublabel}/>}
      <BoxValueForm>
        <Box>
          <TextInput
            placeholder={hint}
            placeholderTextColor={theme.colors.formTextHint}
            style={{
              flex: 1,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderWidth: 0,
              borderRadius: 8,
              fontFamily: 'Pjs',
              color: theme.colors.formTextLabel,
              backgroundColor: theme.colors.formBackground,
              fontSize: isPhone ? 12 : 14,
            }}
            keyboardType={variant === 'price' || variant === 'year' ? 'numeric' : props.keyboardType}
            value={displayValue}
            maxLength={variant === 'year' ? 4 : props.maxLength}
            onChangeText={(text) => {
              if (variant === 'price') {
                // Update displayValue with formatted text
                const digitsOnly = text.replace(/[^\d]/g, '');
                const formatted = formatIDR(digitsOnly);
                setDisplayValue(formatted);

                if (onChangeText) {
                  onChangeText(digitsOnly);
                }
              } else if (variant === 'year') {
                const digitsOnly = text.replace(/[^\d]/g, '').slice(0, 4); // Keep max 4 digits
                setDisplayValue(digitsOnly);
                onChangeText?.(digitsOnly);
              } else {
                if (onChangeText) onChangeText(text);
                setDisplayValue(text);
              }
            }}
            {...props}
          />
          {error && <Text variant={'formError'}>{error}</Text>}
        </Box>
      </BoxValueForm>

    </BoxForm>
  );
};
