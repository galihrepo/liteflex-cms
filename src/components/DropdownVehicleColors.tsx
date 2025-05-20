import React, { useCallback, useMemo } from 'react';
import { useVehicleColors } from '../hooks/useVehicleColors';
import { Dropdown, DropdownBaseProps } from './Dropdown';

export const DropdownVehicleColors = (props: DropdownBaseProps) => {
    const { onSelectedItem, selectedItem, error } = props;
    const { vehicleColors, loading } = useVehicleColors();

    const items = useMemo(() => {
        return vehicleColors.map(item => ({
            label: item.name,
            value: item.docId,
        }))
    }, [vehicleColors])

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
            label='Warna'
            value={selectedItem?.value || ''}
            onValueChange={handleChange}
            items={items}
            error={error}
        />
    );
};
