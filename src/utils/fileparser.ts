import fs from "fs/promises";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

export const parseFile = async (
  filePath: string,
  mimeType: string
): Promise<string> => {
  try {
    let fileBuffer;

    switch (mimeType) {
      case "text/plain":
        return await fs.readFile(filePath, "utf8");

      case "application/pdf":
        fileBuffer = await fs.readFile(filePath);
        const pdfData = await pdfParse(fileBuffer);
        return pdfData.text.replace(/\s+/g, " ").trim();

      case "application/msword":
        fileBuffer = await fs.readFile(filePath);
        const { value } = await mammoth.extractRawText({ buffer: fileBuffer });
        return value.trim();

      default:
        throw new Error("Unsupported file type");
    }
  } catch (error) {
    console.error(`Error parsing file (${filePath}):`, error);
    return "Error reading file";
  }
};
