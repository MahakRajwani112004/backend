import express from "express";
import upload from "./multer.service";
import { uploadFile } from "./multer.controller";

const uploadrouter = express.Router();

uploadrouter.post("/", upload.single("doc"), uploadFile);

export default uploadrouter;
