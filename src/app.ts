import express, { Request, Response } from "express";
import cors from "cors";
import { callRouter, chatRouter, responseRouter } from "./api";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/generate", responseRouter);
app.use("/api/chats" , chatRouter)
app.use("/api/make-call",callRouter)


export default app;
