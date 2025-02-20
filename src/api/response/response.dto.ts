import { z } from "zod";

export const GenerateResponseSchema = z.object({
    message: z.string().min(1, "Message is required"),
    chatId: z.string().optional(),
    document: z
        .object({
            documentPath: z.string().min(1, "Document path is required"),
            mimeType: z.string().min(1, "MIME type is required"),
        })
        .optional(),
});

export type GenerateResponseData = z.infer<typeof GenerateResponseSchema>;
