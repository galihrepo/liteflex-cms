import { showAlert, showAlertChoice } from "@/src/components/Alert";
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
import { useCars } from "@/src/hooks/useCars";
import { CarForm, carSchema, emptyDropdown } from "@/src/schemas/carSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { Controller, useForm } from 'react-hook-form';
import { Item } from "react-native-picker-select";

export default function CarAddScreen() {

  const router = useRouter();

  const { saveCar, loading } = useCars();

  const { control, handleSubmit, formState: { errors }, setValue, clearErrors, getValues, reset } = useForm<CarForm>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      brands: emptyDropdown,
      models: emptyDropdown,
      variants: emptyDropdown,
      fuel: emptyDropdown,
      transmission: emptyDropdown,
      vehicleColors: emptyDropdown,
      vehicleMilage: emptyDropdown,
      pictureUrls: [],
      videoUrl: '',
      plateNumber: '',
      price: '',
      year: '',
    }
  })

  const onSelectedBrands = useCallback((data: Item | undefined) => {
    if (data) {
      setValue('brands', data)
      clearErrors('brands')
    } else {
      setValue('brands', emptyDropdown)
      setValue('models', emptyDropdown)
      setValue('variants', emptyDropdown)
    }
  }, [clearErrors, setValue])

  const onSelectedModels = useCallback((data: Item | undefined) => {
    if (data) {
      setValue('models', data)
      clearErrors('models')
    } else {
      setValue('models', emptyDropdown)
      setValue('variants', emptyDropdown)
    }

  }, [clearErrors, setValue])

  const onSelectedVariants = useCallback((data: Item | undefined) => {
    if (data) {
      setValue('variants', data)
      clearErrors('variants')
    } else {
      setValue('variants', emptyDropdown)
    }
  }, [clearErrors, setValue])

  const onSelectedFuel = useCallback((data: Item | undefined) => {
    if (data) {
      setValue('fuel', data)
      clearErrors('fuel')
    } else {
      setValue('fuel', emptyDropdown)
    }
  }, [clearErrors, setValue])

  const onSelectedTransmission = useCallback((data: Item | undefined) => {
    if (data) {
      setValue('transmission', data)
      clearErrors('transmission')
    } else {
      setValue('transmission', emptyDropdown)
    }
  }, [clearErrors, setValue])

  const onSelectedVehicleColor = useCallback((data: Item | undefined) => {
    if (data) {
      setValue('vehicleColors', data)
      clearErrors('vehicleColors')
    } else {
      setValue('vehicleColors', emptyDropdown)
    }
  }, [clearErrors, setValue])

  const onSelectedVehicleMilage = useCallback((data: Item | undefined) => {
    if (data) {
      setValue('vehicleMilage', data)
      clearErrors('vehicleMilage')
    } else {
      setValue('vehicleMilage', emptyDropdown)
    }
  }, [clearErrors, setValue])

  const onChangeTextPlateNumber = useCallback((value: string) => {
    if (value) {
      setValue('plateNumber', value)
      clearErrors('plateNumber')
    } else {
      setValue('plateNumber', '')
    }
  }, [clearErrors, setValue])

  const onChangeTextYear = useCallback((value: string) => {
    if (value) {
      setValue('year', value)
      clearErrors('year')
    } else {
      setValue('year', '')
    }
  }, [clearErrors, setValue])

  const onSelectedPictureUrls = useCallback((urls: string[]) => {
    setValue('pictureUrls', urls)
    clearErrors('pictureUrls')
  }, [clearErrors, setValue])

  const onSelectedVideoUrls = useCallback((urls: string[]) => {
    if (urls.length > 0) {
      setValue('videoUrl', urls[0])
    } else {
      setValue('videoUrl', '')
    }
    clearErrors('videoUrl')
  }, [clearErrors, setValue])

  const onChangeTextPrice = useCallback((value: string) => {
    if (value) {
      setValue('price', value)
      clearErrors('price')
    } else {
      setValue('price', '')
    }
  }, [clearErrors, setValue])

  const onSave = useCallback(async (data: CarForm) => {
    const response = await saveCar(data);
    if (response.success) {
      reset()
      showAlertChoice(response.message, () => router.push('/home'))      
    } else {
      showAlert(response.message)
    }
  }, [router, saveCar])

  return (
    <ScrollViewLayout>
      <Card
        title={"Tambah Kendaraan"}
        onSave={handleSubmit(onSave)}
        isForm={true}
        loading={loading}>

        <Separator />
        <Controller
          control={control}
          name="brands"
          render={({ field }) => (
            <DropdownBrands
              selectedItem={field.value}
              onSelectedItem={onSelectedBrands}
              error={errors?.brands?.value?.message}
            />
          )}
        />

        <Separator />
        <Controller
          control={control}
          name="models"
          render={({ field }) => (
            <DropdownModels
              brandsId={getValues('brands.value')}
              selectedItem={field.value}
              onSelectedItem={onSelectedModels}
              error={errors?.models?.value?.message} />
          )}
        />

        <Separator />
        <Controller
          control={control}
          name="variants"
          render={({ field }) => (
            <DropdownVariants
              modelsId={getValues('models.value')}
              selectedItem={field.value}
              onSelectedItem={onSelectedVariants}
              error={errors?.variants?.value?.message} />
          )}
        />

        <Separator />
        <Controller
          control={control}
          name="fuel"
          render={({ field }) => (
            <DropdownFuel
              selectedItem={field.value}
              onSelectedItem={onSelectedFuel}
              error={errors?.fuel?.value?.message} />
          )}
        />

        <Separator />
        <Controller
          control={control}
          name="transmission"
          render={({ field }) => (
            <DropdownTransmission
              selectedItem={field.value}
              onSelectedItem={onSelectedTransmission}
              error={errors?.transmission?.value?.message} />
          )}
        />

        <Separator />

        <Controller
          control={control}
          name="vehicleColors"
          render={({ field }) => (
            <DropdownVehicleColors
              selectedItem={field.value}
              onSelectedItem={onSelectedVehicleColor}
              error={errors?.vehicleColors?.value?.message} />
          )}
        />
        <Separator />
        <Controller
          control={control}
          name="vehicleMilage"
          render={({ field }) => (
            <DropdownVehicleMileage
              selectedItem={field.value}
              onSelectedItem={onSelectedVehicleMilage}
              error={errors?.vehicleMilage?.value?.message} />
          )}
        />
        <Separator />
        <Controller
          control={control}
          name="year"
          render={({ field }) => (
            <TextInputField
              label={'Tahun'}
              variant="year"
              hint={'format: 2025'}
              value={field.value}
              onChangeText={onChangeTextYear}
              error={errors?.year?.message} />
          )}
        />
        <Separator />
        <Controller
          control={control}
          name="plateNumber"
          render={({ field }) => (
            <TextInputField
              label={'Nomor Plat'}
              hint={'format: B9999CD'}
              value={field.value}
              onChangeText={onChangeTextPlateNumber}
              error={errors?.plateNumber?.message} />
          )}
        />
        <Separator />
        <Controller
          control={control}
          name="pictureUrls"
          render={({ field }) => (
            <Uploader
              label={'Foto'}
              sublabel={'Maksimal 4'}
              urls={field.value}
              onChoosenFile={onSelectedPictureUrls}
              type={'images'}
              error={errors?.pictureUrls?.message} />
          )}
        />
        <Separator />
        <Controller
          control={control}
          name="videoUrl"
          render={({ field }) => (
            <Uploader
              label={'Video'}
              sublabel={'Maksimal 1'}
              urls={[field.value]}
              onChoosenFile={onSelectedVideoUrls}
              type={'videos'}
              error={errors?.videoUrl?.message} />
          )}
        />
        <Separator />
        <Controller
          control={control}
          name="price"
          render={({ field }) => (
            <TextInputField
              label={'Harga'}
              sublabel={'Rp.'}
              variant="price"
              value={field.value}
              onChangeText={onChangeTextPrice}
              error={errors?.price?.message} />
          )}
        />
        <Separator />
      </Card>
    </ScrollViewLayout>
  );
}
