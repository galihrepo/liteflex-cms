import { SquarePen } from 'lucide-react';
import React, { useCallback } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { useConfig } from '../config/provider/ConfigProvider';
import { useIsPhone } from '../hooks/useIsPhone';
import { PaginationType } from '../types/firestore/PaginationType';
import { Button } from './Button';
import { Card } from './Card';
import { PressableHover } from './PressableHover';
import { Box, Text } from './theme/componentsTheme';

export type Column<T> = {
  key: keyof T;
  header: string;
  flex?: number;
  render?: (value: any, row: T) => React.ReactNode;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  page: number;
  total: number;
  perPage: number;
  loading?: boolean;
  error?: string;
  onNextPage?: () => void;
  onPrevPage?: () => void;
  onClickDetail?: (row: T) => void;
};

export function Table<T extends PaginationType>({
  columns,
  data,
  page,
  total,
  perPage,
  loading,
  error,
  onNextPage,
  onPrevPage,
  onClickDetail,
}: TableProps<T>) {

  const isPhone = useIsPhone();

  const { theme } = useConfig();

  const totalPages = Math.ceil(total / perPage);

  const onPressDetail = useCallback((item: T) => {
    onClickDetail?.(item)
  }, [onClickDetail])

  if (loading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" padding="m">
        <ActivityIndicator animating size="large" />
        <Text>Loading...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box padding="m" justifyContent="center" alignItems="center">
        <Text style={{ color: 'red' }}>{error}</Text>
      </Box>
    );
  }

  return (
    <Box width={'100%'}>
      {/* <ScrollView horizontal style={{ width: '100%', backgroundColor: "yellow"}}> */}
      <Card title={''} borderWidth={0.1} borderRadius={'s'} borderColor={'separator'} isForm={false} marginTop={{ phone: 's', desktop: 'm' }} marginBottom={'xl'}>
        {/* Table Header */}
        <Box flexDirection="row" paddingVertical="s" width={'100%'} backgroundColor={'background'}>
          {columns.map((col) => (
            <Box flex={col.flex || 1} key={col.key.toString()} padding={'xs'} >
              <Text
                variant="tableHeader"
                textAlign={'center'}
              >
                {col.header}
              </Text>
            </Box>
          ))}
          {onClickDetail && (<Box flex={0.5} padding={'xs'} />)}
        </Box>

        {/* Table Rows */}
        {data.map((row, idx) => (
          <Box
            width={'100%'}
            key={row.id}
            flexDirection="row"
            paddingVertical="s"
            borderBottomWidth={0.1}
            borderBottomColor={'separator'}
          >
            {columns.map((col) => (
              <Box flex={col.flex || 1} key={col.key.toString()} justifyContent="center" paddingVertical={'s'} paddingHorizontal={'xs'}>
                <Text
                  textAlign={'center'}
                  variant={'tableContent'}>
                  {col.render ? col.render(row[col.key], row) : String(row[col.key])}
                </Text>                
              </Box>
            ))}
            {onClickDetail && (
              <Box flex={0.5} padding={'none'} justifyContent={'center'} alignItems={'center'}>
                <PressableHover onPress={() => onPressDetail(row)}>
                  <SquarePen size={isPhone ? 14 : 18} color={theme.colors.icon} />
                </PressableHover>
              </Box>
            )}
          </Box>
        ))}

        {/* Pagination Controls */}
        <Box width={'100%'} gap={"m"} flexDirection="row" alignItems={'center'} justifyContent="flex-end" padding="m" style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }} >
          <Text variant={'tableContent'}>Page {page} / {totalPages}</Text>
          <Box flexDirection="row" gap="s">
            <Button
              label={'prev'}
              disabled={page === 1}
              onPress={onPrevPage}
              variant={'s'}
            />
            <Button
              label={'next'}
              variant={'s'}
              disabled={page === totalPages}
              onPress={onNextPage}
            />
          </Box>
        </Box>
      </Card>
      {/* </ScrollView> */}
    </Box>
  );
}
