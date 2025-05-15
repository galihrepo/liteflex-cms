import { Text } from '@/components/componentsTheme';
import { useTheme } from '@shopify/restyle';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { AppTheme } from './theme/theme';

const GOOGLE_LOGO_URI =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/330px-Google_Favicon_2025.svg.png';

type Props = {
  onPress: () => void;
};

export function ButtonGoogle({ onPress }: Props) {
  const theme = useTheme<AppTheme>();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 50,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 20,
        shadowColor: theme.colors.shadow,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
      }}
    >
      <Image
        source={{ uri: GOOGLE_LOGO_URI }}
        style={{ width: 24, height: 24, marginRight: 12 }}
        resizeMode="contain"
      />
      <Text variant="button" style={{color: 'textColor'}}>Masuk dengan Google</Text>
    </TouchableOpacity>
  );
}
