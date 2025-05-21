import { Button } from "@/src/components/Button";
import { Card } from "@/src/components/Card";
import { ScrollViewLayout } from "@/src/components/ScrollviewLayout";
import { Column, Table } from "@/src/components/Table";
import { useCarsPagination } from "@/src/hooks/useCarsPagination";
import { CarsType } from "@/src/types/firestore/CarsType";
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

    const columns: Column<CarsType>[] = [
        {
            key: "plateNumber",
            header: "Plate",
        },
        {
            key: "brandsValue",
            header: "Brand",
        },
        {
            key: "modelsValue",
            header: "Model",
        },
        {
            key: "year",
            header: "Year",
        },
        {
            key: "price",
            header: "Price",
            render: (value: number) => `Rp ${value.toLocaleString("id-ID")}`,
        },
    ];

    const redirectAddCar = useCallback(() => {
        router.replace('/car/add')
    }, [router])

    return (
        <ScrollViewLayout>
            <Card
                title={"Daftar Kendaraan"}
                isForm={false}>
                <Button
                    variant={"s"}
                    label={"Tambah"}
                    onPress={redirectAddCar}
                    style={{ alignSelf: 'flex-end' }} />

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
