import React, { useCallback, useMemo } from 'react';
import { useFuel } from '../hooks/useFuel';
import { Dropdown, DropdownBaseProps } from './Dropdown';

export const DropdownFuel = (props: DropdownBaseProps) => {
    const { onSelectedItem, selectedItem, error } = props;
    const { fuel, loading } = useFuel();

    const items = useMemo(() => {
        return fuel.map(item => ({
            label: item.name,
            value: item.docId,
        }))
    }, [fuel])

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
            label='Bahan Bakar'
            value={selectedItem?.value || ''}
            onValueChange={handleChange}
            items={items}
            error={error}
        />
    );
};
