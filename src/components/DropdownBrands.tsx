import React, { useCallback, useMemo } from 'react';
import { Item } from 'react-native-picker-select';
import { useBrands } from '../services/brandsService';
import { Dropdown } from './Dropdown';

export type DropdownBrandsProps = {
    selectedItem?: Item;
    onSelectedItem: (value: Item) => void;
  };

export const DropdownBrands = (props: DropdownBrandsProps) => {
    const { onSelectedItem, selectedItem } = props;
    const { brands, loading } = useBrands();

    const items = useMemo(() => {
        return brands.map(item => ({
            label: item.name,
            value: item.docId,
        }))
    }, [brands])

    const handleChange = useCallback(
        (value: string) => {
          const data = items.find(item => item.value === value);
          if (data) {
            onSelectedItem(data);            
          }
        },
        [items]
      );    

    if (loading) return null;

    return (
        <Dropdown            
            label='Merek'
            value={selectedItem?.value || ''}
            onValueChange={handleChange}
            items={items}
        />
    );
};
