import { z } from "zod";

export const CallDataSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    phone: z.string().regex(/^\+91[0-9]{10}$/, "Phone must start with +91 and be followed by a 10-digit number"),
    task: z.string().min(5, "Task description must be at least 5 characters long"),
});
export type CallData = z.infer<typeof CallDataSchema>;