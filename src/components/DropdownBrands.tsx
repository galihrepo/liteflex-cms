import React, { useCallback, useMemo } from 'react';
import { useBrands } from '../services/brandsService';
import { Dropdown, DropdownBaseProps } from './Dropdown';

export const DropdownBrands = (props: DropdownBaseProps) => {
    const { onSelectedItem, selectedItem, error } = props;
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
          onSelectedItem(data);
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
            error={error}
        />
    );
};
