import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { CircleX } from 'lucide-react';
import { useCallback, useState } from "react";
import { Platform } from 'react-native';
import { CLOUDINARY } from '../contants/cloudinary';
import { BoxForm } from "./BoxForm";
import { BoxValueForm } from "./BoxValueForm";
import { Button } from './Button';
import MemoizedImage from './MemoizedImage';
import { PressableHover } from './PressableHover';
import { TextLabelForm } from "./TextLabelForm";
import { Box } from './theme/componentsTheme';

type UploaderPictureProps = {
    label: string;
    onSuccessUploaded: (url: string) => void;
    onPictureRemoved: () => void;
};

const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        base64: true,
    });

    if (!result.canceled && result.assets?.[0]) {
        return result.assets[0];
    }

    return null;
};

const uploadToCloudinary = async (asset: ImagePicker.ImagePickerAsset) => {

    const file = asset.file;
    const data = new FormData();

    if (Platform.OS === 'web') {
        if (file) {
            data.append('file', file);
        } else {
            console.error('Error upload file cloudinary UploaderPicture.tsx')
        }
    } else {
        data.append('file', {
            uri: asset.uri,
            name: `${Date.now()}.jpg`,
            type: 'image/jpeg',
        } as any);
    }

    data.append('upload_preset', CLOUDINARY.UPLOAD_PRESET);
    data.append('cloud_name', CLOUDINARY.CLOUD_NAME);

    const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY.CLOUD_NAME}/image/upload`,
        data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return res.data.secure_url;
};

export const UploaderPicture = (props: UploaderPictureProps) => {
    const { label, onSuccessUploaded, onPictureRemoved } = props

    const [imageUri, setImageUri] = useState<string | null>(null);

    const [loading, setLoading] = useState(false);

    const onUpload = useCallback(async () => {
        const image = await pickImage();
        if (image) {
            setImageUri(image.uri);
            setLoading(true);
            try {
                const url = await uploadToCloudinary(image)
                onSuccessUploaded?.(url)
            } catch (err) {
                console.error("Upload error", err);
            } finally {
                setLoading(false);
            }
        }
    }, [onSuccessUploaded])

    const onDeletePicture = useCallback(() => {
        setImageUri(null)
        onPictureRemoved()
    }, [])

    return (
        <BoxForm>
            {label && <TextLabelForm label={label} />}
            <BoxValueForm flexGrow={0}>
                {imageUri && (
                    <Box flexDirection={'row'}>
                        <MemoizedImage uri={imageUri} width={75} height={75} />                        
                        <PressableHover onPress={onDeletePicture}>
                            <CircleX fill='red' size={30} color='white' style={{ marginLeft: -20, marginTop: -10 }}/>
                        </PressableHover>
                    </Box>
                )}
                {!imageUri && <Button variant={'s'} label={'Pilih'} onPress={onUpload} />}
            </BoxValueForm>
        </BoxForm>
    );
};