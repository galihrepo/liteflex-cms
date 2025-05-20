import React, { useCallback, useMemo } from 'react';
import { useModels } from '../services/modelsService';
import { Dropdown, DropdownBaseProps } from './Dropdown';

type DropdownModelsProps = DropdownBaseProps & {
    brandsId?: string;
  };

export const DropdownModels = (props: DropdownModelsProps) => {
    const { onSelectedItem, selectedItem, brandsId, error } = props;    
    const { models, loading } = useModels(brandsId);

    const items = useMemo(() => {
        return models.map(item => ({
            label: item.name,
            value: item.docId
        }))
    }, [models])

    const handleChange = useCallback(
        (value: string) => {
          const data = items.find(item => item.value === value);
          onSelectedItem(data);
        },
        [items]
      );

    return (
        <Dropdown            
            label="Model"
            value={selectedItem?.value || ''}
            onValueChange={handleChange}
            items={items}
            disabled={items.length === 0 || loading}
            error={error}
        />
    );
};
