import { ElevenLabsClient } from "elevenlabs";

export const generateAudioBase64 = async (text: string): Promise<string> => {
  const client = new ElevenLabsClient();

  try {
    const audioStream = await client.textToSpeech.convert(
      "JBFqnCBsd6RMkjVDRZzb",
      {
        text: text,
        model_id: "eleven_multilingual_v2",
        output_format: "mp3_44100_128",
      }
    );

    const chunks: Uint8Array[] = [];
    for await (const chunk of audioStream) {
      chunks.push(chunk);
    }

    const audioBuffer = Buffer.concat(chunks);
    return audioBuffer.toString("base64");
  } catch (error) {
    console.error("Error generating audio:", error);
    throw new Error("Audio generation failed");
  }
};
