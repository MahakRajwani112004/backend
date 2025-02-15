import { Request, Response } from "express";
import { loadBankInfoContent } from "../../services/content.service";
import { findResponse } from "../../utils/response.util";
import { getOpenAIResponse } from "../../services/openai.service";
import { generateAudioBase64 } from "../../services/audio.service";

export const generateResponse = async (req: Request, res: Response) => {
  const { message } = req.body;

  if (!message) {
    res.status(400).json({ errorMsg: "Content is required" });
    return;
  }

  try {
    let responseMessage = findResponse(message);

    if (!responseMessage) {
      const documentContent = loadBankInfoContent();
      responseMessage = await getOpenAIResponse(message, documentContent);
    }

    const audio = await generateAudioBase64(responseMessage);

    res.status(200).json({
      success: true,
      data: {
        response: responseMessage,
        audio: `data:audio/mp3;base64,${audio}`,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMsg: "Failed to generate response or audio" });
  }
};
