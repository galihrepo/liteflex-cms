import React from 'react';
import { ScrollView } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { PaginationType } from '../types/firestore/PaginationType';
import { Button } from './Button';
import { Box, Text } from './theme/componentsTheme';

export type Column<T> = {
  key: keyof T;
  header: string;
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
}: TableProps<T>) {
  const totalPages = Math.ceil(total / perPage);

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
    <Box padding="m" flex={1}>
      <ScrollView horizontal>
        <Box borderWidth={1} minWidth={600} style={{ borderColor: 'gray', borderRadius: 8 }}>
          {/* Table Header */}
          <Box flexDirection="row" style={{ backgroundColor: "#6200ee", borderTopLeftRadius:8, borderTopRightRadius:8 }} padding="s" >
            {columns.map((col) => (
              <Box flex={1} key={col.key.toString()}>
                <Text
                  variant="header"                  
                  style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}
                >
                  {col.header}
                </Text>
              </Box>
            ))}
          </Box>

          {/* Table Rows */}
          {data.map((row, idx) => (
            <Box
              key={row.id}
              flexDirection="row"
              paddingVertical="s"
              borderBottomWidth={1}
              style={{
                borderColor:'gray',
                backgroundColor: idx % 2 === 0 ? 'white' : '#f2e7fe'
              }}
              
              
            >
              {columns.map((col) => (
                <Box flex={1} key={col.key.toString()} justifyContent="center" paddingHorizontal="s">
                  <Text style={{ textAlign: 'center', color: 'black' }}>
                    {col.render ? col.render(row[col.key], row) : String(row[col.key])}
                  </Text>
                </Box>
              ))}
            </Box>
          ))}

          {/* Pagination Controls */}
          <Box flexDirection="row" justifyContent="space-between" padding="m" style={{ backgroundColor: 'red', borderBottomLeftRadius:8, borderBottomRightRadius:8 }} >
            <Text>Page {page} / {totalPages}</Text>
            <Box flexDirection="row" gap="m">
              <Button label={'prev'}
                              // mode="text" 
                disabled={page === 1} 
                onPress={onPrevPage}
              />
              <Button 
              label={'next'}
                // mode="text" 
                disabled={page === totalPages} 
                onPress={onNextPage}
                // compact
              />               
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
}
