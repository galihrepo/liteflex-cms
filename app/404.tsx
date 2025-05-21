import { Box, Text } from '@/src/components/theme/componentsTheme';

export default function NotFound() {

  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>404 - Page Not Found</Text>
    </Box>
  );
}
