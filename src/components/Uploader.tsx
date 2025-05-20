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

    const isPicture = type === 'images'

    const isVideo = type === 'videos'

    const [listFileUri, setListFileUri] = useState<string[]>([]);

    const [loading, setLoading] = useState(false);

    const MAX_PICTURE = 2;

    const hasFiles = listFileUri.length > 0;

    const isShowUploadPicture = listFileUri.length < MAX_PICTURE;
    
    const noFiles = !hasFiles;

    const onUpload = useCallback(async () => {
        const file = await pickImage(type);
        if (file) {
            setListFileUri(prevItems => [...prevItems, (type === 'images' ? file?.uri : file?.fileName) || '']);
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

    const onDeletePicture = useCallback((data: string) => {
        setListFileUri(prev => prev.filter(item => item !== data))
        onRemoved()
    }, [])

    const Picture = () => {
        return (<Box flexDirection={'row'}>
            {listFileUri.map((item, index) => (
                <Box key={index} flexDirection={'row'}>
                    <MemoizedImage uri={item || ''} width={75} height={75} />
                    
                    <PressableHover onPress={() => onDeletePicture(item)}>
                        <CircleX fill='red' size={30} color='white' style={{ marginLeft: -20, marginTop: -10 }} />
                    </PressableHover>
                </Box>
            ))}
        </Box>)
    }

    const Video = () => (
        <Box flexDirection={'row'} alignItems={'center'}>
            <Text variant={'formValue'} style={{ paddingLeft: 15, paddingRight: 5 }}>{listFileUri[0]}</Text>
            <PressableHover onPress={() => onDeletePicture(listFileUri[0])}>
                <CircleX fill='red' size={20} color='white' />
            </PressableHover>
        </Box>
    )

    return (
        <BoxForm>
            {label && <TextLabelForm label={label} />}
            <BoxValueForm flexGrow={0} flexDirection={'row-reverse'} alignItems={'center'} gap={'m'}>                
                {isPicture && hasFiles && <Picture />}
                {isPicture && isShowUploadPicture && <Button variant={'s'} label={'Pilih'} onPress={onUpload} />}
                {isVideo && hasFiles &&<Video />}
                {isVideo && noFiles && <Button variant={'s'} label={'Pilih'} onPress={onUpload} />}
            </BoxValueForm>
        </BoxForm>
    );
};