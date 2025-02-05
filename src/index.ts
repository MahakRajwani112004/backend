import express from "express";
import cors from "cors";
import { generateResponse } from "./controllers/generateController";
import "./config/config";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/generate", generateResponse);

const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
