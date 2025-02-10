import express from "express";
import cors from "cors";
import { generateResponse } from "./response/response.controller";
import "./config/env.config";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/generate", generateResponse);

const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
