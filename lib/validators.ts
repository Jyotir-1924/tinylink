import { z } from "zod";

export const shortenUrlSchema = z.object({
  url: z.url(),
});
