import multer, { MulterError } from "multer";
import { Request, Response, NextFunction } from "express";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export function uploadSingleFileMiddleware(fieldName: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    upload.single(fieldName)(req, res, (error: unknown) => {

      if (error instanceof MulterError || error instanceof Error) {

        return res.status(400).json({ error: error.message });
      } else if (error) {

        return res.status(500).json({ error: "File upload failed." });
      }
      next();
    });
  };
}