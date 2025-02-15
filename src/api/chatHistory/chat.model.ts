import mongoose, { Schema, Document } from "mongoose";

interface Message {
  sender: "user" | "bot";
  text: string;
}

interface ChatDocument extends Document {
  chatId: string;
  messages: Message[];
}

const MessageSchema = new Schema<Message>({
  sender: { type: String, required: true, enum: ["user", "bot"] },
  text: { type: String, required: true },
});

const ChatSchema = new Schema<ChatDocument>({
  chatId: { type: String, required: true, unique: true },
  messages: { type: [MessageSchema], default: [] },
});

export const Chat = mongoose.model<ChatDocument>("Chat", ChatSchema);
