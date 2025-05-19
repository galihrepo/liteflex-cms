import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { useCallback, useState } from "react";
import { CLOUDINARY } from '../contants/cloudinary';
import { BoxForm } from "./BoxForm";
import { BoxValueForm } from "./BoxValueForm";
import { Button } from './Button';
import MemoizedImage from './MemoizedImage';
import { TextLabelForm } from "./TextLabelForm";
import { Box } from './theme/componentsTheme';



type UploaderPictureProps = {
    label: string;
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

const uploadToCloudinary = async (file?: File) => {

    if (!file) {
        console.error('Error upload file cloudinary UploaderPicture.tsx')
        return null
    }

    const data = new FormData();

    data.append('file', file);
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
    const { label } = props

    const [imageUri, setImageUri] = useState<string | null>(null);

    const [loading, setLoading] = useState(false);

    const onUpload = useCallback(async () => {
        const image = await pickImage();
        if (image) {
            setImageUri(image.uri);
            setLoading(true);
            try {                                
                const response = await uploadToCloudinary(image.file)                
            } catch (err) {
                console.error("Upload error", err);
            } finally {
                setLoading(false);
            }
        }
    }, [])

    return (
        <BoxForm>
            {label && <TextLabelForm label={label} />}
            <BoxValueForm flexGrow={0}>
                {imageUri && (
                    <Box>
                        <MemoizedImage uri={imageUri} width={100} height={100} />
                    </Box>
                )}
                {!imageUri && <Button variant={'s'} label={'Upload'} onPress={onUpload} />}
            </BoxValueForm>
        </BoxForm>
    );
};