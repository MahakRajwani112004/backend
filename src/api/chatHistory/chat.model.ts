import mongoose, { Schema, Document } from "mongoose";

interface Message {
  userMessage: string;
  botResponse: string;
}

interface ChatDocument extends Document {
  chatId: string;
  messages: Message[];
}

const MessageSchema = new Schema<Message>({
  userMessage: { type: String, required: true },
  botResponse: { type: String, required: true },
});

const ChatSchema = new Schema<ChatDocument>({
  chatId: { type: String, required: true, unique: true },
  messages: { type: [MessageSchema], default: [] },
});

export const Chat = mongoose.model<ChatDocument>("Chat", ChatSchema);
