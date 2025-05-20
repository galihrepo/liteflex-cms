import React, { useCallback, useMemo } from 'react';
import { useVehicleMileage } from '../services/vehicleMileageService';
import { Dropdown, DropdownBaseProps } from './Dropdown';

export const DropdownVehicleMileage = (props: DropdownBaseProps) => {
    const { onSelectedItem, selectedItem, error } = props;
    const { vehicleMileage, loading } = useVehicleMileage();

    const items = useMemo(() => {
        return vehicleMileage.map(item => ({
            label: item.name,
            value: item.docId,
        }))
    }, [vehicleMileage])

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
            label='Jarak Tempuh'
            value={selectedItem?.value || ''}
            onValueChange={handleChange}
            items={items}
            error={error}
        />
    );
};
