import { z } from "zod";

export type CarForm = z.infer<typeof carSchema>;

export const emptyDropdown = { value: '', label: '' };

const createDropdownSchema = (fieldName: string) =>
  z.object({
    value: z.string().min(1, `${fieldName} harus di isi`),
    label: z.string(),
  });

export const carSchema = z.object({
  brands: createDropdownSchema("Merek"),
  models: createDropdownSchema("Model"),
  variants: createDropdownSchema("Tipe"),
  fuel: createDropdownSchema("Bahan bakar"),
  transmission: createDropdownSchema("Transmisi"),
  vehicleColors: createDropdownSchema("Warna"),
  vehicleMilage: createDropdownSchema("Jarak tempuh"),
  pictureUrls: z.array(z.string()).min(1, "Foto minimal 1"),
  videoUrl: z.string(),
  plateNumber: z
    .string()
    .min(1, "Nomor kendaraan harus di isi")
    .refine((val) => /^[A-Za-z0-9]+$/.test(val.trim()), {
      message: "Tidak boleh ada spasi dan simbol, hanya abjad dan angka contoh: B9217HYZ",
    }),
  price: z.string().min(1, "Harga harus di isi"),
  year: z.string().min(4, "Tahun harus di isi"),
});
