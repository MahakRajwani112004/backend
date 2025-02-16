import { Request, Response } from "express";
import { loadBankInfoContent } from "../../services/content.service";
import { findResponse } from "../../utils/response.util";
import { getOpenAIResponse } from "../../services/openai.service";
import { generateAudioBase64 } from "../../services/audio.service";
import { Chat } from "../chatHistory/chat.model";
import mongoose from "mongoose";

export const generateResponse = async (req: Request, res: Response) => {
  const { message, chatId } = req.body;

  if (!message) {
    return res
      .status(400)
      .json({ success: false, errorMsg: "Content is required" });
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

    if (!responseMessage) {
      const documentContent = loadBankInfoContent();
      responseMessage = await getOpenAIResponse(message, documentContent);
    }
    chat.messages.push({ sender: "user", text: message });
    chat.messages.push({ sender: "bot", text: responseMessage });

    await chat.save();
    const audio = await generateAudioBase64(responseMessage);
    return res.status(200).json({
      success: true,
      data: {
        response: responseMessage,
        audio: `data:audio/mp3;base64,${audio}`,
        chatId: chat.chatId,
      },
    });
  } catch (error) {
    console.error("Error in generateResponse:", error);
    return res.status(500).json({
      success: false,
      errorMsg: "Failed to generate response or audio",
    });
  }
};
