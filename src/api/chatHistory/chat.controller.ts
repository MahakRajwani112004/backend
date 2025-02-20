import { Request, Response } from "express";
import { Chat } from "./chat.model";
import { errorResponse, sendSuccessResponse } from "../../utils/apiResponse";

export const getAllChats = async (req: Request, res: Response) => {
  try {
    const chats = await Chat.find();

    sendSuccessResponse({ res, data: chats });
  } catch (error) {
    console.error("Error fetching chats:", error);
    errorResponse({ req, res, error: "Failed to fetch chats", statusCode: 500, });
  }
};

export const getChatMessages = async (req: Request, res: Response) => {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findOne({ chatId });

    if (!chat) {
      errorResponse({ req, res, error: "Chat not found", statusCode: 400 });

      return;
    }
    sendSuccessResponse({ res, data: chat.messages });
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    errorResponse({ req, res, error: "Failed to fetch chat messages", statusCode: 500, });
  }
};
