import * as dotenv from "dotenv";

dotenv.config();

export const env = {
  app: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    API_BASE_URL: process.env.API_BASE_URL,
    PORT: process.env.PORT,
  },
  db: {
    MONGO_URI: process.env.MONGO_URI,
  },
};