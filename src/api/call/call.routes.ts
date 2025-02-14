import express from "express";
import { makeCallController } from "./call.controller";

const callRouter = express.Router();

callRouter.post("/make-call", makeCallController);

export default callRouter;
