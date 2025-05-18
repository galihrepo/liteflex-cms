import { Card } from "@/src/components/Card";
import { DropdownBrands } from "@/src/components/DropdownBrands";
import { DropdownModels } from "@/src/components/DropdownModels";
import { DropdownVariants } from "@/src/components/DropdownVariants";
import { useCallback, useState } from "react";
import { Item } from "react-native-picker-select";


export default function CarAddScreen() {

  const [brandsId, setBrandsId] = useState<string | undefined>(undefined);
  const [modelsId, setModelsId] = useState<string | undefined>(undefined);

  const onSelectedBrands = useCallback((data: Item) => {
    setBrandsId(data.value);
    setModelsId(undefined);
  }, [])
  
  const onSelectedModels = useCallback((data: Item) => {
    setModelsId(data.value)
  }, [])

  const onSave = useCallback(() => { }, [])

  return (
    <Card
      title={"Tambah Kendaraan"}
      onSave={onSave}
      isForm={true}
      gap={'m'}>
      <DropdownBrands onSelectedItem={onSelectedBrands} />
      <DropdownModels brandsId={brandsId} onSelectedItem={onSelectedModels} />
      <DropdownVariants modelsId={modelsId} onSelectedItem={() => { }} />
    </Card>
  );
}
