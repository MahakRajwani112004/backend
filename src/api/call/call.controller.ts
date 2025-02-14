import { Request, Response } from "express";
import { callService } from "./call.service";



export const makeCallController = async (
  req: Request,
  res: Response
): Promise< void> => {
  const { name, phone, task } = req.body;

  if (!name || !phone || !task) {
  res.status(400).json({ error: "Missing required fields" });
  return
  }

  try {
    const response = await callService.makeCall({ name, phone, task });
    res.status(200).json(response);
  } catch (error) {
  res.status(500).json({ error: error instanceof Error ? error.message : error });
  }
};
