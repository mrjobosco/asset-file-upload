import { AssetDTO } from "../schemas/assets.schema";

export const companyAssetsMap: Map<string, AssetDTO[]> = new Map();

export function addAssets(companyId: string, newAssets: AssetDTO[]): void {
  const existingAssets = companyAssetsMap.get(companyId) || [];
  const updatedAssets = [...existingAssets, ...newAssets];
  companyAssetsMap.set(companyId, updatedAssets);
};

export function getAssets(companyId?: string): AssetDTO[] {

  if (companyId) {
    return companyAssetsMap.get(companyId) || [];
  }

  return Array.from(companyAssetsMap.values()).flat();
};
