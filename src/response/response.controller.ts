import { Request, Response } from "express";
import { loadBankInfoContent } from "../services/content.service";
import { findResponse } from "../utils/response.util";
import { getOpenAIResponse } from "../services/openai.service";
import { generateAudioBase64 } from "../services/audio.service";

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
      const audio = await generateAudioBase64(result);

      res.json({ response: result, audio: `data:audio/mp3;base64,${audio}` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to call OpenAI API" });
    }
  }
};
