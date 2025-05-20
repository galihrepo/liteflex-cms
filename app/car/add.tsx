import { Card } from "@/src/components/Card";
import { DropdownBrands } from "@/src/components/DropdownBrands";
import { DropdownFuel } from "@/src/components/DropdownFuel";
import { DropdownModels } from "@/src/components/DropdownModels";
import { DropdownTransmission } from "@/src/components/DropdownTransmission";
import { DropdownVariants } from "@/src/components/DropdownVariants";
import { DropdownVehicleColors } from "@/src/components/DropdownVehicleColors";
import { DropdownVehicleMileage } from "@/src/components/DropdownVehicleMileage";
import { ScrollViewLayout } from "@/src/components/ScrollviewLayout";
import { Separator } from "@/src/components/Separator";
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
        isForm={true}>
        <Separator />
        <DropdownBrands onSelectedItem={onSelectedBrands} />
        <Separator />
        <DropdownModels brandsId={brandsId} onSelectedItem={onSelectedModels} />
        <Separator />
        <DropdownVariants modelsId={modelsId} onSelectedItem={() => { }} />
        <Separator />
        <DropdownFuel onSelectedItem={() => { }} />
        <Separator />
        <DropdownTransmission onSelectedItem={() => { }} />
        <Separator />
        <DropdownVehicleColors onSelectedItem={() => { }} />
        <Separator />
        <DropdownVehicleMileage onSelectedItem={() => { }} />
        <Separator />
        <TextInputField label={'Nomor Kendaraan'} hint={'format: B9999HYZ'}/>
        <Separator />
        <Uploader label={'Foto'} onSuccessUploaded={(url) => { }} onRemoved={() => { }} type={'images'} />
        <Separator />
        <Uploader label={'Video'} onSuccessUploaded={(url) => { }} onRemoved={() => { }} type={'videos'} />
        <Separator />
      </Card>
    </ScrollViewLayout>
  );
}
