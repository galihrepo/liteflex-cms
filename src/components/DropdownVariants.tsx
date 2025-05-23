import React, { useCallback, useMemo } from 'react';
import { useVariants } from '../hooks/useVariants';
import { Dropdown, DropdownBaseProps } from './Dropdown';

type DropdownVariantsProps = DropdownBaseProps & {
    modelsId?: string;
  };

export const DropdownVariants = (props: DropdownVariantsProps) => {
    const { onSelectedItem, selectedItem, modelsId, error } = props;    
    const { variants, loading } = useVariants(modelsId);

    const items = useMemo(() => {
        return variants.map(item => ({
            label: item.name,
            value: item.docId
        }))
    }, [variants])

    const handleChange = useCallback(
        (value: string) => {
          const data = items.find(item => item.value === value);
          onSelectedItem(data);
        },
        [items]
      );

    return (
        <Dropdown            
            label="Tipe"
            value={selectedItem?.value || ''}
            onValueChange={handleChange}
            items={items}
            disabled={items.length === 0 || loading}
            error={error}
        />
    );
};
