import { Router } from "express";
import { uploadSingleFileMiddleware } from "../../middleware/upload-file.middleware";
import { uploadAssets, fetchAssets } from "../controllers/assets.controller";

const router: Router = Router();

router.post("/upload", uploadSingleFileMiddleware("assetFile"), uploadAssets);
router.get("/", fetchAssets);

export default router;
