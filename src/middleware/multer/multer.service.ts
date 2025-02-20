import multer, { StorageEngine } from "multer";
import path from "path";
import { FileFilterCallback } from "multer";
import { Request } from "express";

const UPLOADS_DIR = "uploads";

const ALLOWED_TYPES = new Set([
  "application/pdf",
  "text/plain",
  "application/msword",
]);

const generateFileName = (file: Express.Multer.File) => {
  return `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
};

const storage: StorageEngine = multer.diskStorage({
  destination: (_, __, cb) => cb(null, UPLOADS_DIR),
  filename: (_, file, cb) => cb(null, generateFileName(file)),
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  ALLOWED_TYPES.has(file.mimetype)
    ? cb(null, true)
    : cb(new Error("Invalid file type. Allowed: PDF, TXT, DOC."));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;
