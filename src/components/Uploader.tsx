import { CircleX } from 'lucide-react';
import { useCallback, useState } from "react";
import { useCloudinary } from '../hooks/useCloudinary';
import { MediaType, pickMedia } from '../utils/mediaPicker';
import { BoxForm } from "./BoxForm";
import { BoxValueForm } from "./BoxValueForm";
import { Button } from './Button';
import { LinkText } from './LinkText';
import { LoadingUpload } from './LoadingUpload';
import MemoizedImage from './MemoizedImage';
import { PressableHover } from './PressableHover';
import { TextLabelForm } from "./TextLabelForm";
import { Box } from './theme/componentsTheme';

type UploaderProps = {
    label: string;
    type: MediaType;
    onSuccessUploaded: (urls: string[]) => void;
    onRemoved: () => void;
};

export const Uploader = (props: UploaderProps) => {
    const { label, onSuccessUploaded, onRemoved, type } = props

    const isPicture = type === 'images'

    const isVideo = type === 'videos'

    const [listPath, setListPath] = useState<string[]>([]);

    const [loading, setLoading] = useState(false);

    const { uploadToCloudinary } = useCloudinary();

    const MAX_PICTURE = 4;

    const hasFiles = listPath.length > 0;

    const isShowUploadPicture = listPath.length < MAX_PICTURE;
    
    const noFiles = !hasFiles;

    const onUpload = useCallback(async () => {
        const file = await pickMedia(type);
        if (file) {
            setLoading(true);
            try {
                const url = await uploadToCloudinary(file, type)
                setListPath(prev => [...prev, url])
                onSuccessUploaded?.(listPath)
            } catch (err) {
                console.error("Upload error", err);
            } finally {
                setLoading(false);
            }
        }
    }, [onSuccessUploaded, type])

    const onDeletePicture = useCallback((data: string) => {
        setListPath(prev => prev.filter(item => item !== data))
        onRemoved()
    }, [])

    const Picture = () => {
        return (<Box flexDirection={'row'}>
            {listPath.map((item, index) => (
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
        <Box flexDirection={'row'} alignItems={'center'} gap={'xs'}>
            <LinkText label={'preview_video'} url={listPath[0]}/>
            <PressableHover onPress={() => onDeletePicture(listPath[0])}>
                <CircleX fill='red' size={20} color='white' />
            </PressableHover>
        </Box>
    )

    return (
        <BoxForm>
            <TextLabelForm label={label}/>
            <BoxValueForm flexGrow={0} flexDirection={'row'} alignItems={'center'} gap={'m'}>                                
                {loading && <LoadingUpload style={{ width: 60, height: 'auto'}}/>}                
                {isVideo && noFiles && !loading && <Button variant={'s'} label={'Pilih'} onPress={onUpload} />}
                {isPicture && isShowUploadPicture && !loading && <Button variant={'s'} label={'Pilih'} onPress={onUpload} />}                
                {isPicture && hasFiles && <Picture />}
                {isVideo && hasFiles && <Video />}                
            </BoxValueForm>
        </BoxForm>
    );
};
