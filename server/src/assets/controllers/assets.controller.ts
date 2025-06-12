import { Request, Response } from "express";
import { addAssets, getAssets } from "../services/assets.service";
import { parseJsonFile, parseCsvFile } from "../utils/file-parser.utils";
import { AssetDTO } from "../schemas/assets.schema";


export async function uploadAssets(req: Request, res: Response) {
  try {
    const companyId = req.body.companyId as string | undefined;

    if (!companyId) {
      return res.status(400).json({ message: "Company ID is required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    if (["application/json", "text/csv"].includes(req.file.mimetype) === false) {
      return res.status(400).json({ message: "Unsupported file type" });
    }

    let parsedAssets: AssetDTO[] = [];

    if (req.file.mimetype === "application/json") {
      parsedAssets = parseJsonFile(req.file.buffer);
      addAssets(companyId, parsedAssets);
    }

    if (req.file.mimetype === "text/csv") {
      parsedAssets = await parseCsvFile(req.file.buffer);
      addAssets(companyId, parsedAssets);
    }

    res.status(201).json({ message: "Assets uploaded successfully" });

  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};

export async function fetchAssets(req: Request, res: Response) {
  try {

    const companyId = req.query.companyId as string | undefined;
    const result: AssetDTO[] = getAssets(companyId);

    if (result.length === 0 && companyId) {
      return res.status(404).json({ message: `No assets found for company ID: ${companyId}` });
    }

    res.status(200).json(result);

  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};
