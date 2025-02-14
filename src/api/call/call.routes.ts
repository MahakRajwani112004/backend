import express from "express";
import { makeCallController } from "./call.controller";

const callRouter = express.Router();

callRouter.post("/", makeCallController);

export default callRouter;
