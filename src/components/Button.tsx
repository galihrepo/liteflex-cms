import { AllProps, createRestyleComponent, createVariant, VariantProps } from "@shopify/restyle";
import { PropsWithChildren } from "react";
import { Pressable, View } from "react-native";
import { Text } from "./componentsTheme";
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
  };
  
export const Button = ({ label, onPress, disabled, variant = 'm' }: ButtonProps)  => {
    return (
      <Pressable onPress={onPress} disabled={disabled}>
        {({ pressed }) => (
          <ButtonBox
            variant={variant}
            opacity={pressed ? 0.7 : 1}
          >
            <Text variant="button" textAlign={"center"}>{label}</Text>
          </ButtonBox>        
        )}
      </Pressable>
    );
  };