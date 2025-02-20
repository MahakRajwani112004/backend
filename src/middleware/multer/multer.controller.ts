import { Request, Response } from "express";

export const uploadFile = async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ success: false, errorMsg: "No file uploaded" });
    return;
  }
  const filePath = req.file.path;
  const mimeType = req.file.mimetype;
  res.status(200).json({
    success: true,
    data: {
      message: "File uploaded successfully",
      document: {
        documentPath: filePath,
        mimeType: mimeType,
      },
    },
  });
};
