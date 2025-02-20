import * as googleTTS from "google-tts-api";
import axios from "axios";

export const generateAudioBase64 = async (text: string): Promise<string> => {
  if (!text) {
    throw new Error("Text is required");
  }
  try {
    const urls = googleTTS.getAllAudioUrls(text, {
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
    const combinedAudioBase64 = audioBase64Parts.join("");
    return combinedAudioBase64;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to generate audio");
  }
};
