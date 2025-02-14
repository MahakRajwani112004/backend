import * as dotenv from "dotenv";

dotenv.config();

export const env = {
  app: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    API_BASE_URL: process.env.API_BASE_URL,
    PORT: process.env.PORT,
    BLAND_AI_URL : process.env.BLANDAI_BASE_URL,
    BLAND_AI_API_KEY :process.env.BLANDAI_API_KEY,
  },
  db: {
    MONGO_URI: process.env.MONGO_URI,
  },
};