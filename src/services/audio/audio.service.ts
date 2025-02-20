import * as googleTTS from "google-tts-api";
import axios from "axios";

export const generateAudioBase64 = async (text: string): Promise<string> => {
  if (!text) {
    throw new Error("Text is required");
  }

  try {
    const cleanedText = text.replace(/[*`]/g, "");

    if (!cleanedText.trim()) {
      throw new Error("No valid words to translate");
    }

    const urls = googleTTS.getAllAudioUrls(cleanedText, {
      lang: "En",
      slow: false,
      host: "https://translate.google.com",
    });

    const audioBase64Parts = await Promise.all(
      urls.map(async (urlObj) => {
        const response = await axios.get(urlObj.url, {
          responseType: "arraybuffer",
        });
        return Buffer.from(response.data, "binary").toString("base64");
      })
    );

    return audioBase64Parts.join("");
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to generate audio");
  }
};
