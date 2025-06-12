import { z } from "zod";

const numberOrNonEmptyString = (field: string) =>
  z.union([
    z.string().refine((val) => val.trim() !== "", {
      message: `${field} is required`,
    }),
    z.number(),
  ])
    .transform((val) => (typeof val === "string" ? Number(val) : val))
    .refine((value) => !isNaN(value), {
      message: `${field} must be a valid number`,
    });

export const AssetSchema = z.object({
  address: z.string().min(1, "Address is required"),
  latitude: numberOrNonEmptyString("Latitude"),
  longitude: numberOrNonEmptyString("Longitude"),
});

export const AssetArraySchema = z.array(AssetSchema);
export type AssetDTO = z.infer<typeof AssetSchema>;
