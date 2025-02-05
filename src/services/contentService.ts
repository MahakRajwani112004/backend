import fs from "fs";
import path from "path";

export const loadBankInfoContent = (): string => {
  const contentPath = path.join(__dirname, "../bank_info.txt");
  return fs.readFileSync(contentPath, "utf-8");
};

export const loadResponses = (): Record<string, any> => {
  return JSON.parse(fs.readFileSync("responses.json", "utf-8"));
};

export const normalizeMessage = (message: string): string => {
  return message.toLowerCase().replace(/\s+/g, "").replace(/_/g, "");
};
