import { Request, Response } from "express";
import { Chat } from "./chat.model";
import mongoose from "mongoose";
export const getAllChats = async (req: Request, res: Response) => {
  try {
    const chats = await Chat.find();
    const formattedChats = chats.map((chat) => ({
      chatId: chat.chatId,
      messages: chat.messages,
    }));
    res.json(formattedChats);
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({ error: "Failed to fetch chats" });
  }
};

export const getChatMessages = async (req: Request, res: Response) => {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findOne({ chatId });

    if (!chat) {
      res.status(404).json({ error: "Chat not found" });
      return;
    }
    res.json(chat.messages);
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    res.status(500).json({ error: "Failed to fetch chat messages" });
  }
};
