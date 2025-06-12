import csv from "csv-parser";
import { Readable } from "stream";
import { AssetArraySchema, AssetDTO } from "../schemas/assets.schema";

export const parseJsonFile = (buffer: Buffer): AssetDTO[] => {
  const rawJsonData: Record<string, unknown> = JSON.parse(buffer.toString());

  const result = AssetArraySchema.safeParse(rawJsonData);

  if (!result.success) {
    const errorMessages: string[] = result.error.errors.map((err) => `${err.path.join(".")}: ${err.message}`);
    throw new Error(`Validation failed: ${errorMessages.join(", ")}`);
  }

  return result.data;
};


export const parseCsvFile = (buffer: Buffer): Promise<AssetDTO[]> => {
  const rows: Array<any> = [];

  return new Promise<AssetDTO[]>((resolve, reject) => {
    const stream: Readable = Readable.from(buffer);
    stream
      .pipe(csv())
      .on("data", (row) => rows.push(row))
      .on("end", () => {
        // get the first row to check for headers
        if (rows.length === 0) {
          return reject(new Error("CSV file is empty"));
        }
        const headers = Object.keys(rows[0]);

        // Check if required headers are present
        const requiredHeaders = ["address", "latitude", "longitude"];

        for (const header of requiredHeaders) {
          if (!headers.includes(header)) {
            return reject(new Error(`CSV file is missing required header: ${header}`));
          }
        }

        const result = AssetArraySchema.safeParse(rows.map((row) => ({
          address: row.address,
          latitude: parseFloat(row.latitude),
          longitude: parseFloat(row.longitude),
        })));

        if (!result.success) {
          const errorMessages = result.error.errors.map((err) => `${err.path.join(".")}: ${err.message}`);
          return reject(new Error(`CSV validation failed: ${errorMessages.join(", ")}`));
        }

        resolve(result.data);
      })
      .on("error", reject);
  });
};
