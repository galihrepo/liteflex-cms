import { AllProps, createRestyleComponent, createVariant, VariantProps } from "@shopify/restyle";
import { PropsWithChildren } from "react";
import { Pressable, StyleProp, View, ViewStyle } from "react-native";
import { Text } from "./theme/componentsTheme";
import { AppTheme } from "./theme/theme";

const buttonVariant = createVariant<AppTheme, 'buttonVariants'>({
    themeKey: 'buttonVariants',
  });

type ButtonBoxProps = PropsWithChildren<
  VariantProps<AppTheme, 'buttonVariants'> & AllProps<AppTheme>
>;

const ButtonBox = createRestyleComponent<ButtonBoxProps, AppTheme>(
    [buttonVariant],
    View
  );


type ButtonProps = VariantProps<AppTheme, 'buttonVariants'> & {
    label: string;
    onPress: () => void;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
  };
  
export const Button = (props: ButtonProps)  => {
  const { label, onPress, disabled, variant = 'm', style } = props;
    return (
      <Pressable onPress={onPress} disabled={disabled} style={style}>
        {({ pressed }) => (
          <ButtonBox
            variant={variant}
            opacity={pressed ? 0.7 : 1}
            alignSelf="flex-start"
          >
            <Text variant="button" textAlign={"center"}>{label}</Text>
          </ButtonBox>        
        )}
      </Pressable>
    );
  };