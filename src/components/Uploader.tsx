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
import { Box, Text } from './theme/componentsTheme';

type MediaType = 'images' | 'videos'

type UploaderProps = {
    label: string;
    type: MediaType;
    onSuccessUploaded: (url: string) => void;
    onRemoved: () => void;
};

const pickImage = async (type: MediaType) => {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: [type],
        allowsEditing: true,
    });

    if (!result.canceled && result.assets?.[0]) {
        return result.assets[0];
    }

    return null;
};

const uploadToCloudinary = async (asset: ImagePicker.ImagePickerAsset, type: MediaType) => {

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
            name: `${Date.now()}${type === 'images' ? '.jpg' : '.mp4'}`,
            type: type === 'images' ? 'image/jpeg' : 'video/mp4',
        } as any);
    }

    data.append('upload_preset', CLOUDINARY.UPLOAD_PRESET);
    data.append('cloud_name', CLOUDINARY.CLOUD_NAME);

    const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY.CLOUD_NAME}/${type === 'images' ? 'image' : 'video'}/upload`,
        data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return res.data.secure_url;
};

export const Uploader = (props: UploaderProps) => {
    const { label, onSuccessUploaded, onRemoved, type } = props

    const [fileUri, setFileUri] = useState<string | null>(null);

    const [loading, setLoading] = useState(false);

    const onUpload = useCallback(async () => {
        const file = await pickImage(type);
        if (file) {
            setFileUri((type === 'images' ? file?.uri : file?.fileName) || '');
            setLoading(true);
            try {
                const url = await uploadToCloudinary(file, type)
                onSuccessUploaded?.(url)
            } catch (err) {
                console.error("Upload error", err);
            } finally {
                setLoading(false);
            }
        }
    }, [onSuccessUploaded, type])

    const onDeletePicture = useCallback(() => {
        setFileUri(null)
        onRemoved()
    }, [])

    const Picture = () => (
        <Box flexDirection={'row'}>
            <MemoizedImage uri={fileUri || ''} width={75} height={75} />
            <PressableHover onPress={onDeletePicture}>
                <CircleX fill='red' size={30} color='white' style={{ marginLeft: -20, marginTop: -10 }} />
            </PressableHover>
        </Box>
    )

    const Video = () => (
        <Box flexDirection={'row'} alignItems={'center'}>
            <Text variant={'formValue'} style={{ paddingLeft: 15, paddingRight: 5 }}>{fileUri}</Text>
            <PressableHover onPress={onDeletePicture}>
                <CircleX fill='red' size={20} color='white' />
            </PressableHover>
        </Box>
    )

    return (
        <BoxForm>
            {label && <TextLabelForm label={label} />}
            <BoxValueForm flexGrow={0}>
                {fileUri && type === 'images' && <Picture />}
                {fileUri && type === 'videos' && <Video/>}
                {!fileUri && <Button variant={'s'} label={'Pilih'} onPress={onUpload} />}
            </BoxValueForm>
        </BoxForm>
    );
};