import { Card } from "@/src/components/Card";
import { DropdownBrands } from "@/src/components/DropdownBrands";
import { DropdownModels } from "@/src/components/DropdownModels";
import { useCallback, useState } from "react";
import { Item } from "react-native-picker-select";


export default function CarAddScreen() {  

  const [brandsId, setBrandsId] = useState<string|undefined>(undefined);

  const onSelectedBrands = useCallback((data: Item) => { setBrandsId(data.value) }, [])
  const onSelectedModels = useCallback((data: Item) => {  }, [])

  const onSave = useCallback(() => {}, [])

  return (
    <Card
      title={"Tambah Kendaraan"}
      onSave={onSave}
      isForm={true}>
        <DropdownBrands onSelectedItem={onSelectedBrands}/>
        <DropdownModels brandsId={brandsId} onSelectedItem={onSelectedModels}/>
    </Card>
  );
}
