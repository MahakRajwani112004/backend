import { loadResponses, normalizeMessage } from "../services/content.service";

export const findResponse = (message: string): string | null => {
  const normalizedMessage = normalizeMessage(message);
  const responses = loadResponses();

  for (const category in responses) {
    for (const key in responses[category]) {
      const normalizedKey = normalizeMessage(key);
      if (normalizedMessage === normalizedKey) {
        return responses[category][key];
      }
    }
  }

  return null;
};
