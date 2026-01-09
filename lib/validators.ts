import { z } from "zod";

export const shortenUrlSchema = z.object({
  url: z
    .url("Please enter a valid URL")
    .max(2048, "URL is too long (maximum 2048 characters)"),
});