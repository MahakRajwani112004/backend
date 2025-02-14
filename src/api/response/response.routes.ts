import { Router } from "express";
import { generateResponse } from "./response.controller";

const responseRouter = Router();

responseRouter.post("/", generateResponse);

export default responseRouter;
