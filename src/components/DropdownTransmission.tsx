import React, { useCallback, useMemo } from 'react';
import { useTransmission } from '../hooks/useTransmission';
import { Dropdown, DropdownBaseProps } from './Dropdown';

export const DropdownTransmission = (props: DropdownBaseProps) => {
    const { onSelectedItem, selectedItem, error } = props;
    const { transmission, loading } = useTransmission();

    const items = useMemo(() => {
        return transmission.map(item => ({
            label: item.name,
            value: item.docId,
        }))
    }, [transmission])

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
            label='Transmisi'
            value={selectedItem?.value || ''}
            onValueChange={handleChange}
            items={items}
            error={error}
        />
    );
};
