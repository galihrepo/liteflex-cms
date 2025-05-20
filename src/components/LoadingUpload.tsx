import LottieView from 'lottie-react-native';
import { StyleProp, ViewStyle } from 'react-native';
import { Box } from './theme/componentsTheme';

type LoadingUploadProps = {
    style?: StyleProp<ViewStyle>;
  };

export const LoadingUpload = ({ style }: LoadingUploadProps) => {
    return (
        <Box style={style}>
            <LottieView source={require('../../assets/lottie/loading_upload.json')} autoPlay loop resizeMode='cover'/>
        </Box>
      );
}