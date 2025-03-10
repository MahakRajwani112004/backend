import OpenAI from "openai";
import "../../config/env.config";
import { env } from "../../config/env.config";

export const openai = new OpenAI({
  apiKey: env.app.GEMINI_API_KEY,
  baseURL: env.app.API_BASE_URL,
});

export const getOpenAIResponse = async (
  message: string,
  documentContent: string
): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gemini-1.5-flash",
      messages: [
        {
          role: "system",
          content: `You are an AI agent which will answer based on the document content .Here is the content:\n\n"${documentContent}"`,
        },
        { role: "user", content: message },
      ],
    });

    return (
      response.choices[0]?.message.content || "Sorry, I don't have a response."
    );
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    throw new Error("Failed to call OpenAI API");
  }
};
