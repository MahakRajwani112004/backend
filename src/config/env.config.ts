import * as dotenv from "dotenv";

dotenv.config();

export const env = {
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  API_BASE_URL: process.env.API_BASE_URL,
};