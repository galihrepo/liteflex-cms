import { Button } from "@/src/components/Button";
import { Card } from "@/src/components/Card";
import { ScrollViewLayout } from "@/src/components/ScrollviewLayout";
import { Separator } from "@/src/components/Separator";
import { Column, Table } from "@/src/components/Table";
import { Box, Text } from "@/src/components/theme/componentsTheme";
import { useConfig } from "@/src/config/provider/ConfigProvider";
import { useCarsPagination } from "@/src/hooks/useCarsPagination";
import { useIsPhone } from "@/src/hooks/useIsPhone";
import { CarsType } from "@/src/types/firestore/CarsType";
import { formatDateTimeHuman } from "@/src/utils/dateTime";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useCallback } from "react";

export const CarScreen = () => {

    const router = useRouter();

    const { theme } = useConfig();

    const {
        loadPage,
        data: cars,
        page,
        total,
        perPage,
        loading,
        error,
        nextPage,
        prevPage,
    } = useCarsPagination();

    const colorStatusBackground: Record<string, string> = {
        Tersedia: theme.colors.legendGreen || '',
        Terbooking: theme.colors.legendRed || '',
        Terjual: theme.colors.legendGray || '',
    };

    const colorStatusText: Record<string, string> = {
        Tersedia: theme.colors.legendGreenText || '',
        Terbooking: theme.colors.legendRedText || '',
        Terjual: theme.colors.legendGrayText || '',
    };

    const renderStatus = (status: string) => (
        <Text
            variant="tableContent"
            paddingVertical={'s'}
            paddingHorizontal={{ phone: 's', desktop: 'm' }}
            style={{
                color: colorStatusText[status],
                backgroundColor: colorStatusBackground[status],
                borderRadius: 9999,
            }}
        >
            {status}
        </Text>
    );

    const renderPrice = (value: number) => value.toLocaleString("id-ID");

    const columnsPhone: Column<CarsType>[] = [
        { key: "dateTimeCreatedAt", header: "Tanggal", render: formatDateTimeHuman },
        { key: "modelsValue", header: "Model" },
        { key: "plateNumber", header: "Nomor Plat" },
        { key: "vehicleStatusValue", header: "Status", render: renderStatus },
        { key: "price", header: "Price (Rp)", render: renderPrice },
    ];
    const columnsDesktop: Column<CarsType>[] = [
        { key: "dateTimeCreatedAt", header: "Tanggal", render: formatDateTimeHuman },
        { key: "modelsValue", header: "Model" },
        { key: "variantsValue", header: "Tipe" },
        { key: "fuelValue", header: "Bahan Bakar" },
        { key: "transmissionValue", header: "Transmisi" },
        { key: "year", header: "Tahun" },
        { key: "plateNumber", header: "Nomor Plat" },
        { key: "vehicleStatusValue", header: "Status", render: renderStatus },
        { key: "price", header: "Price (Rp)", render: renderPrice },
    ];

    const columns: Column<CarsType>[] = useIsPhone() ? columnsPhone : columnsDesktop;

    const redirectAddCar = useCallback(() => {
        router.replace('/car/add')
    }, [router])

    useFocusEffect(
        useCallback(() => {
            loadPage(1);
        }, [loadPage])
    );

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
                    onClickDetail={(item) => { router.replace(`/car/edit/${item.id}`) }}
                />
            </Card>
        </ScrollViewLayout>
    );
}