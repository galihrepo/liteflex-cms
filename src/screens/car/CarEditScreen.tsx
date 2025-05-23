import { useCars } from "@/src/hooks/useCars";
import { CarForm, emptyDropdown } from "@/src/schemas/carSchema";
import { useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { useCallback, useEffect, useState } from "react";
import { CarFormScreen } from "./CarFormScreen";

export const CarEditScreen = () => {
  const router = useRouter();

  // const { id } = useLocalSearchParams();
  const params = useSearchParams();

  const id = params.get('id');

  const { getCarId, loading } = useCars();

  const defaultsCarForm = {
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

  const [car, setCar] = useState<CarForm>(defaultsCarForm);

  const fetchCar = useCallback(async () => {
    const result = await getCarId(id as string);
    setCar(result || defaultsCarForm);
  }, [id]);

  useEffect(() => {
    console.log('BERAK id : ', id)
    if (id) {
      fetchCar()
    }
  }, [id])

  const handleUpdate = async (data: CarForm) => {
    // const response = await updateCar(id, data);
    // if (response.success) {
    //   showAlertChoice(response.message, () => router.push('/'));
    // } else {
    //   showAlert(response.message);
    // }
  };

  return (
    <CarFormScreen
      onSave={handleUpdate}
      defaultValues={car}
      loading={loading}
      title="Edit Kendaraan"
    />
  );
};
