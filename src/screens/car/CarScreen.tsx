import { Button } from "@/src/components/Button";
import { Card } from "@/src/components/Card";
import { ScrollViewLayout } from "@/src/components/ScrollviewLayout";
import { Separator } from "@/src/components/Separator";
import { Column, Table } from "@/src/components/Table";
import { Box } from "@/src/components/theme/componentsTheme";
import { useCarsPagination } from "@/src/hooks/useCarsPagination";
import { useIsPhone } from "@/src/hooks/useIsPhone";
import { CarsType } from "@/src/types/firestore/CarsType";
import { formatDateTimeHuman } from "@/src/utils/dateTime";
import { useRouter } from "expo-router";
import { useCallback } from "react";

export const CarScreen = () => {

    const router = useRouter();

    const {
        data: cars,
        page,
        total,
        perPage,
        loading,
        error,
        nextPage,
        prevPage,
    } = useCarsPagination();

    const columnsPhone: Column<CarsType>[] = [
        { key: "dateTimeCreatedAt", header: "Tanggal", render: formatDateTimeHuman },
        { key: "modelsValue", header: "Model" },
        { key: "plateNumber", header: "Nomor Plat" },
        { key: "price", header: "Price (Rp)", render: (value: number) => value.toLocaleString("id-ID") },
    ];
    const columnsDesktop: Column<CarsType>[] = [
        { key: "dateTimeCreatedAt", header: "Tanggal", render: formatDateTimeHuman },
        { key: "modelsValue", header: "Model" },
        { key: "variantsValue", header: "Tipe" },
        { key: "fuelValue", header: "Bahan Bakar" },
        { key: "transmissionValue", header: "Transmisi" },
        { key: "year", header: "Year" },
        { key: "plateNumber", header: "Nomor Plat" },
        { key: "price", header: "Price (Rp)", render: (value: number) => value.toLocaleString("id-ID") },
    ];

    const columns: Column<CarsType>[] = useIsPhone() ? columnsPhone : columnsDesktop;

    const redirectAddCar = useCallback(() => {
        router.replace('/car/add')
    }, [router])

    return (
        <ScrollViewLayout>
            <Card
                title={"Daftar Kendaraan"}
                isForm={false}>
                <Separator />

                <Box alignSelf={'flex-end'} marginRight={{ phone: 'm', desktop: 'xl' }} marginTop={{ phone: 's', desktop: 'm' }}>
                    <Button
                        variant={"s"}
                        label={"Tambah"}
                        onPress={redirectAddCar} />
                </Box>

                <Table
                    columns={columns}
                    data={cars}
                    page={page}
                    total={total}
                    perPage={perPage}
                    loading={loading}
                    error={error || undefined}
                    onNextPage={nextPage}
                    onPrevPage={prevPage}
                />
            </Card>
        </ScrollViewLayout>
    );
}