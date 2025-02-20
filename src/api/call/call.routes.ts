import express from "express";
import { makeCallController } from "./call.controller";

const callRouter = express.Router();

// URL = /api/make-call
callRouter.post("/", makeCallController);

export default callRouter;
