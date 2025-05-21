import { CircleX } from 'lucide-react';
import { useCallback, useState } from "react";
import { useCloudinary } from '../hooks/useCloudinary';
import { useIsPhone } from '../hooks/useIsPhone';
import { MediaType, pickMedia } from '../utils/mediaPicker';
import { BoxForm } from "./BoxForm";
import { BoxValueForm } from "./BoxValueForm";
import { Button } from './Button';
import { LinkText } from './LinkText';
import { LoadingUpload } from './LoadingUpload';
import MemoizedImage from './MemoizedImage';
import { PressableHover } from './PressableHover';
import { TextLabelForm } from "./TextLabelForm";
import { Box, Text } from './theme/componentsTheme';

type UploaderProps = {
    label: string;
    sublabel?: string;
    error?: string;
    urls?: string[];
    type: MediaType;
    onChoosenFile: (urls: string[]) => void;
};

export const Uploader = (props: UploaderProps) => {
    const { label, sublabel, onChoosenFile, type, error, urls = [] } = props

    const isPhone = useIsPhone();

    const isPicture = type === 'images'

    const isVideo = type === 'videos'

    // if [''] then convert to it to [] due to will show media but empty string url
    const urlsChecker = (urls?: string[]) =>
        urls?.length === 1 && urls[0] === '' ? [] : urls ?? [];

    const [listPath, setListPath] = useState<string[]>(urlsChecker(urls));

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
                const updatedList = [...listPath, url];
                setListPath(updatedList)
                onChoosenFile?.(updatedList)
            } catch (err) {
                console.error("Upload error", err);
            } finally {
                setLoading(false);
            }
        }
    }, [onChoosenFile, type, listPath, uploadToCloudinary])

    const onDeletePicture = useCallback((data: string) => {
        const filteredList = listPath.filter(item => item !== data);
        setListPath(filteredList);
        onChoosenFile(filteredList);
    }, [listPath, onChoosenFile])

    const Picture = () => {
        return (<Box flexDirection={{ phone: 'column', desktop: 'row' }} gap={{ phone: 'm', desktop: 'xs'}}>
            {listPath.map((item, index) => (
                <Box key={index} flexDirection={'row'}>
                    {/* <MemoizedImage uri={item || ''} width={isPhone ? 55 : 75} height={isPhone ? 55 : 75}/> */}
                    <MemoizedImage uri={item || ''} width={55} height={55}/>

                    <PressableHover onPress={() => onDeletePicture(item)}>
                        <CircleX fill='red' size={30} color='white' style={{ marginLeft: -20, marginTop: -10 }} />
                    </PressableHover>
                </Box>
            ))}
        </Box>)
    }

    const Video = () => (
        <Box flexDirection={'row'} alignItems={'center'} gap={'xs'}>
            <LinkText label={'preview_video'} url={listPath[0]} />
            <PressableHover onPress={() => onDeletePicture(listPath[0])}>
                <CircleX fill='red' size={20} color='white' />
            </PressableHover>
        </Box>
    )

    return (
        <BoxForm>
            <TextLabelForm label={label} subLabel={sublabel}/>
            <BoxValueForm flexGrow={0} flexDirection={'row'} alignItems={'center'} gap={'m'}>
                {loading && <LoadingUpload style={{ width: 60, height: 'auto' }} />}
                {isVideo && noFiles && !loading && (
                    <Box alignItems={'baseline'}>
                        <Button variant={'s'} label={'Pilih'} onPress={onUpload} />
                        {error && <Text variant={'formError'}>{error}</Text>}
                    </Box>
                )}
                {isPicture && isShowUploadPicture && !loading && (
                    <Box alignItems={'baseline'}>
                        <Button variant={'s'} label={'Pilih'} onPress={onUpload} />
                        {error && <Text variant={'formError'}>{error}</Text>}
                    </Box>
                )}
                {isPicture && hasFiles && <Picture />}
                {isVideo && hasFiles && <Video />}
            </BoxValueForm>
        </BoxForm>
    );
};
