import "reflect-metadata";
import { DataSource } from "typeorm";
import { env } from "./env.config";

export const AppDataSource = new DataSource({
  type: "mongodb",
  url: env.db.MONGO_URI,
});
