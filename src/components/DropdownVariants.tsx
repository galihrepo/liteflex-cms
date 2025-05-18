import React, { useCallback, useMemo } from 'react';
import { useVariants } from '../services/variantsService';
import { Dropdown } from './Dropdown';
import { DropdownBrandsProps } from './DropdownBrands';

type DropdownVariantsProps = DropdownBrandsProps & {
    modelsId?: string;
  };

export const DropdownVariants = (props: DropdownVariantsProps) => {
    const { onSelectedItem, selectedItem, modelsId } = props;    
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
          if (data) {
            onSelectedItem(data);            
          }
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
        />
    );
};
