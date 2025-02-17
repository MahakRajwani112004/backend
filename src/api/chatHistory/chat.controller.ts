import { Request, Response } from "express";
import { Chat } from "./chat.model";
import mongoose from "mongoose";
export const getAllChats = async (req: Request, res: Response) => {
  try {
    const chats = await Chat.find();
    res.status(200).json({
      success: true,
      data: chats,
    });
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({ errorMsg: "Failed to fetch chats" });
  }
};

export const getChatMessages = async (req: Request, res: Response) => {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findOne({ chatId });

    if (!chat) {
      res.status(404).json({ success: false, errorMsg: "Chat not found" });
      return;
    }
    res.status(200).json({
      success: true,
      data: chat.messages,
    });
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    res.status(500).json({ success: false, errorMsg: "Failed to fetch chat messages" });
  }
};
