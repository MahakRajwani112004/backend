import { Request, Response } from "express";
import { loadBankInfoContent } from "../services/contentService";
import { findResponse } from "../utils/responseUtil";
import { getOpenAIResponse } from "../services/openAIService";

export const generateResponse = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { message } = req.body;

  if (!message) {
    res.status(400).json({ error: "Content is required" });
    return;
  }

  const responseMessage = findResponse(message);
  const documentContent = loadBankInfoContent();

  if (responseMessage) {
    res.json({ response: responseMessage });
  } else {
    try {
      const result = await getOpenAIResponse(message, documentContent);
      res.json({ response: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to call OpenAI API" });
    }
  }
};
