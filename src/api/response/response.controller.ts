import { Request, Response } from "express";
import { loadBankInfoContent } from "../../utils/content";
import { findResponse } from "../../utils/response";
import { getOpenAIResponse } from "../../services/openai/openai.service";
import { generateAudioBase64 } from "../../services/audio/audio.service";
import { Chat } from "../chatHistory/chat.model";
import mongoose from "mongoose";
import { parseFile } from "../../utils/fileparser";

export const generateResponse = async (req: Request, res: Response) => {
  const { message, chatId, document } = req.body;

  if (!message) {
    res.status(400).json({ success: false, errorMsg: "Content is required" });
  }

  try {
    let chat = await Chat.findOne({ chatId });
    if (!chat) {
      chat = new Chat({
        chatId: chatId || new mongoose.Types.ObjectId().toString(),
        messages: [],
      });
    }

    let responseMessage = findResponse(message);
    let documentContent = "";

    if (!responseMessage) {
      if (document?.documentPath && document?.mimeType) {
        documentContent = await parseFile(
          document.documentPath,
          document.mimeType
        );
      } else {
        documentContent = loadBankInfoContent();
      }
      responseMessage = await getOpenAIResponse(message, documentContent);
    }
    chat.messages.push({ sender: "user", text: message });
    chat.messages.push({ sender: "bot", text: responseMessage });

    await chat.save();
    const audio = await generateAudioBase64(responseMessage);
    res.status(200).json({
      success: true,
      data: {
        response: responseMessage,
        audio: `data:audio/mp3;base64,${audio}`,
        chatId: chat.chatId,
      },
    });
  } catch (error) {
    console.error("Error in generateResponse:", error);
    res.status(500).json({
      success: false,
      errorMsg: "Failed to generate response or audio",
    });
  }
};
