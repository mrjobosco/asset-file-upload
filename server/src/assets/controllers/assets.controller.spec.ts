import { uploadAssets, fetchAssets } from "./assets.controller";
import * as assetService from "../services/assets.service";
import * as fileParser from "../utils/file-parser.utils";
import { Request, Response } from "express";
import { AssetDTO } from "../schemas/assets.schema";

jest.mock("../services/assets.service");
jest.mock("../utils/file-parser.utils");

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe("asset.controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("uploadAssets", () => {
    it("should return 400 if companyId is missing", async () => {
      const req = { body: {}, file: { mimetype: "application/json" } } as any;
      const res = mockResponse();

      await uploadAssets(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Company ID is required" });
    });

    it("should return 400 if file is missing", async () => {
      const req = { body: { companyId: "123" } } as any;
      const res = mockResponse();

      await uploadAssets(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "File is required" });
    });

    it("should return 400 for unsupported file type", async () => {
      const req = {
        body: { companyId: "123" },
        file: { mimetype: "image/png" }
      } as unknown as Request;
      const res = mockResponse();

      await uploadAssets(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Unsupported file type" });
    });

    it("should parse and add assets from JSON file", async () => {
      const mockAssets: AssetDTO[] = [{ id: "1" } as unknown as AssetDTO];
      (fileParser.parseJsonFile as jest.Mock).mockReturnValue(mockAssets);

      const req = {
        body: { companyId: "123" },
        file: { mimetype: "application/json", buffer: Buffer.from("{}") }
      } as unknown as Request;
      const res = mockResponse();

      await uploadAssets(req, res);

      expect(fileParser.parseJsonFile).toHaveBeenCalledWith(req.file?.buffer);
      expect(assetService.addAssets).toHaveBeenCalledWith("123", mockAssets);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: "Assets uploaded successfully" });
    });

    it("should parse and add assets from CSV file", async () => {
      const mockAssets: AssetDTO[] = [{ id: "2" } as unknown as AssetDTO];
      (fileParser.parseCsvFile as jest.Mock).mockResolvedValue(mockAssets);

      const req = {
        body: { companyId: "456" },
        file: { mimetype: "text/csv", buffer: Buffer.from("id\n2") }
      } as any;
      const res = mockResponse();

      await uploadAssets(req, res);

      expect(fileParser.parseCsvFile).toHaveBeenCalledWith(req.file.buffer);
      expect(assetService.addAssets).toHaveBeenCalledWith("456", mockAssets);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: "Assets uploaded successfully" });
    });

    it("should handle errors and return 400 with error message", async () => {
      (fileParser.parseJsonFile as jest.Mock).mockImplementation(() => {
        throw new Error("Parse error");
      });

      const req = {
        body: { companyId: "789" },
        file: { mimetype: "application/json", buffer: Buffer.from("{}") }
      } as unknown as Request;
      const res = mockResponse();

      await uploadAssets(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Parse error" });
    });
  });

  describe("fetchAssets", () => {
    it("should return 404 if no assets found", async () => {
      (assetService.getAssets as jest.Mock).mockReturnValue([]);
      const companyId = "123";

      const req = { query: { companyId } } as any;
      const res = mockResponse();

      await fetchAssets(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: `No assets found for company ID: ${companyId}` });
    });

    it("should return 200 and assets if found", async () => {
      const assets: AssetDTO[] = [{ id: "1" } as unknown as AssetDTO];
      (assetService.getAssets as jest.Mock).mockReturnValue(assets);

      const req = { query: { companyId: "123" } } as any;
      const res = mockResponse();

      await fetchAssets(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(assets);
    });

    it("should handle errors and return 400 with error message", async () => {
      (assetService.getAssets as jest.Mock).mockImplementation(() => {
        throw new Error("Fetch error");
      });

      const req = { query: { companyId: "123" } } as any;
      const res = mockResponse();

      await fetchAssets(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Fetch error" });
    });
  });
});