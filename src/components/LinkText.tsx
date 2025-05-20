import { Linking, Platform } from 'react-native';
import { Text } from '../components/theme/componentsTheme';
import { useConfig } from '../config/provider/ConfigProvider';
import { PressableHover } from './PressableHover';

export const LinkText = ({ url, label }: { url: string; label: string }) => {
  const { theme } = useConfig();
  const handlePress = () => {
    if (Platform.OS === 'web') {
      window.open(url, '_blank');
    } else {
      Linking.openURL(url);
    }
  };

  return (
    <PressableHover onPress={handlePress}>
      <Text variant={'formValue'} style={{ color: theme.colors.primary, textDecorationLine: 'underline'}}>
        {label}
      </Text>
    </PressableHover>
  );
};
