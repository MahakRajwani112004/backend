import { Request, Response } from "express";
import { Chat } from "./chat.model";
import mongoose from "mongoose";

export const getAllChats = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const chats = await Chat.find();
    const formattedChats = chats.map((chat: any) => ({
      chatId: chat.chatId,
      messages: chat.messages.map((message: any) => ({
        user: message.userMessage,
        bot: message.botResponse,
       
      })),
     
    }));
    res.json(formattedChats);
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({ error: "Failed to fetch chats" });
  }
};

export const getChatMessages = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findOne({ chatId });

    if (!chat) {
      res.status(404).json({ error: "Chat not found" });
      return;
    }

    const formattedMessages = chat.messages
      .map((message: any) => [
        { text: message.userMessage, sender: "user" },
        { text: message.botResponse, sender: "bot" },
      ])
      .flat();

    res.json(formattedMessages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch chat messages" });
  }
};
