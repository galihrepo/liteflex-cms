import { Card } from "@/src/components/Card";
import { DropdownBrands } from "@/src/components/DropdownBrands";
import { DropdownFuel } from "@/src/components/DropdownFuel";
import { DropdownModels } from "@/src/components/DropdownModels";
import { DropdownTransmission } from "@/src/components/DropdownTransmission";
import { DropdownVariants } from "@/src/components/DropdownVariants";
import { DropdownVehicleColors } from "@/src/components/DropdownVehicleColors";
import { DropdownVehicleMileage } from "@/src/components/DropdownVehicleMileage";
import { ScrollViewLayout } from "@/src/components/ScrollviewLayout";
import { TextInputField } from "@/src/components/TextInputField";
import { Uploader } from "@/src/components/Uploader";
import { useCallback, useState } from "react";
import { Item } from "react-native-picker-select";


export default function CarAddScreen() {

  const [brandsId, setBrandsId] = useState<string | undefined>(undefined);
  const [modelsId, setModelsId] = useState<string | undefined>(undefined);

  const onSelectedBrands = useCallback((data: Item) => {
    setBrandsId(data.value);
    setModelsId(undefined);
  }, [setBrandsId, setModelsId])

  const onSelectedModels = useCallback((data: Item) => {
    setModelsId(data.value)
  }, [setModelsId])

  const onSave = useCallback(() => { }, [])

  return (
    <ScrollViewLayout>
      <Card
        title={"Tambah Kendaraan"}
        onSave={onSave}
        isForm={true}
        gap={'m'}>
        <DropdownBrands onSelectedItem={onSelectedBrands} />
        <DropdownModels brandsId={brandsId} onSelectedItem={onSelectedModels} />
        <DropdownVariants modelsId={modelsId} onSelectedItem={() => { }} />
        <DropdownFuel onSelectedItem={() => { }} />
        <DropdownTransmission onSelectedItem={() => { }} />
        <DropdownVehicleColors onSelectedItem={() => { }} />
        <DropdownVehicleMileage onSelectedItem={() => { }} />
        <TextInputField label={'Nomor Kendaraan'} hint={'format: B9999HYZ'} />
        <Uploader label={'Foto Depan'} onSuccessUploaded={(url) => { } } onRemoved={() => { } } type={'images'} />
        <Uploader label={'Video'} onSuccessUploaded={(url) => { } } onRemoved={() => { } } type={'videos'} />
      </Card>
    </ScrollViewLayout>
  );
}
