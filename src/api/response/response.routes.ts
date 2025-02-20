import { Router } from "express";
import { generateResponse } from "./response.controller";

const responseRouter = Router();
// URL = /api/generate
responseRouter.post("/", generateResponse);

export default responseRouter;
