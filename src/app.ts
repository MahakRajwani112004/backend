import express, { Request, Response } from "express";
import cors from "cors";
import { callRouter, chatRouter, responseRouter } from "./api";
import uploadrouter from "./middleware/multer/multer.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/generate", responseRouter);
app.use("/api/chats", chatRouter);
app.use("/api/make-call", callRouter);
app.use("/api/upload", uploadrouter);


export default app;
