import { z } from "zod";

export const shortenUrlSchema = z.object({
  url: z
    .url("Please enter a valid URL")
    .max(2048, "URL is too long (maximum 2048 characters)"),
  customCode: z
    .string()
    .min(3, "Custom code must be at least 3 characters")
    .max(20, "Custom code must be at most 20 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Custom code can only contain letters, numbers, hyphens, and underscores")
    .optional(),
});