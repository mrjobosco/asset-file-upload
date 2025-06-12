import { addAssets, getAssets, companyAssetsMap } from "./assets.service";
import { AssetDTO } from "../schemas/assets.schema";

describe("asset.service", () => {
  const companyId1 = "company1";
  const companyId2 = "company2";
  const assets1: AssetDTO[] = [
    { id: "a1", name: "Asset 1" } as unknown as AssetDTO,
    { id: "a2", name: "Asset 2" } as unknown as AssetDTO,
  ];
  const assets2: AssetDTO[] = [
    { id: "b1", name: "Asset B1" } as unknown as AssetDTO,
  ];

  beforeEach(() => {

    companyAssetsMap.clear();
  });

  it("should add assets for a company", async () => {
    addAssets(companyId1, assets1);
    const result = getAssets(companyId1);
    expect(result).toEqual(assets1);
  });

  it("should append assets for the same company", async () => {
    addAssets(companyId1, [assets1[0]]);
    addAssets(companyId1, [assets1[1]]);
    const result = getAssets(companyId1);
    expect(result).toEqual(assets1);
  });

  it("should add assets for multiple companies", async () => {
    addAssets(companyId1, assets1);
    addAssets(companyId2, assets2);
    const result1 = getAssets(companyId1);
    const result2 = getAssets(companyId2);
    expect(result1).toEqual(assets1);
    expect(result2).toEqual(assets2);
  });

  it("should return all assets when companyId is not provided", async () => {
    addAssets(companyId1, assets1);
    addAssets(companyId2, assets2);
    const allAssets = getAssets();
    expect(allAssets).toEqual([...assets1, ...assets2]);
  });

  it("should return empty array if company has no assets", async () => {
    const result = getAssets("nonexistent");
    expect(result).toEqual([]);
  });
});