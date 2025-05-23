import { showAlert, showAlertChoice } from "@/src/components/Alert";
import { useCars } from "@/src/hooks/useCars";
import { CarForm, emptyDropdown } from "@/src/schemas/carSchema";
import { useRouter } from "expo-router";
import { CarFormScreen } from "./CarFormScreen";

export const CarAddScreen = () => {
  const router = useRouter();
  const { saveCar, loading } = useCars();

  const handleSave = async (data: CarForm) => {
    const response = await saveCar(data);
    if (response.success) {
      showAlertChoice(response.message, () => router.push('/'));
    } else {
      showAlert(response.message);
    }
  };

  return (
    <CarFormScreen
      onSave={handleSave}
      loading={loading}
      title="Tambah Kendaraan"
      defaultValues={{
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
      }}
    />
  );
};
