import { CircleX } from 'lucide-react';
import { useCallback, useState } from "react";
import { useCloudinary } from '../hooks/useCloudinary';
import { MediaType, pickMedia } from '../utils/mediaPicker';
import { BoxForm } from "./BoxForm";
import { BoxValueForm } from "./BoxValueForm";
import { Button } from './Button';
import MemoizedImage from './MemoizedImage';
import { PressableHover } from './PressableHover';
import { TextLabelForm } from "./TextLabelForm";
import { Box, Text } from './theme/componentsTheme';

type UploaderProps = {
    label: string;
    type: MediaType;
    onSuccessUploaded: (url: string) => void;
    onRemoved: () => void;
};

export const Uploader = (props: UploaderProps) => {
    const { label, onSuccessUploaded, onRemoved, type } = props

    const isPicture = type === 'images'

    const isVideo = type === 'videos'

    const [listFileUri, setListFileUri] = useState<string[]>([]);

    const [loading, setLoading] = useState(false);

    const { uploadToCloudinary } = useCloudinary();

    const MAX_PICTURE = 4;

    const hasFiles = listFileUri.length > 0;

    const isShowUploadPicture = listFileUri.length < MAX_PICTURE;
    
    const noFiles = !hasFiles;

    const onUpload = useCallback(async () => {
        const file = await pickMedia(type);
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
