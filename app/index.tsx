import { Button } from "@/src/components/Button";
import { Card } from "@/src/components/Card";
import { useRouter } from "expo-router";
import { useCallback } from "react";


export default function Index() {

  const router = useRouter();

  const redirectAddCar = useCallback(() => {
    router.push('/car/add')
  }, [router])

  return (
    <Card
      title={"Daftar Kendaraan"}
      isForm={false}>
      <Button
        variant={"s"}
        label={"Tambah"}
        onPress={redirectAddCar}
        style={{ alignSelf: 'flex-end' }} />
    </Card>
  );
}
