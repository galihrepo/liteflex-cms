import LottieView from 'lottie-react-native';
import { StyleProp, ViewStyle } from 'react-native';
import { Box } from './theme/componentsTheme';

type LoadingButtonProps = {
    style?: StyleProp<ViewStyle>;
  };

export const LoadingButton = ({ style }: LoadingButtonProps) => {
    return (
        <Box style={style}>
            <LottieView source={require('../../assets/lottie/loading_button.json')} autoPlay loop resizeMode='cover'/>
        </Box>
      );
}