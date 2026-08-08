import { z } from "zod";

export const categories = ["AI", "Developer", "Design", "Productivity", "Online Tools", "Resources"] as const;
export type Category = (typeof categories)[number];

export const toolSchema = z.object({
  name: z.string().min(1), slug: z.string().regex(/^[a-z0-9-]+$/), url: z.string().url(),
  description: z.string().min(1), category: z.enum(categories), tags: z.array(z.string()),
  logo: z.string().url().optional(), featured: z.boolean().default(false), trending: z.boolean().default(false),
  translations: z.record(z.string(), z.object({ description: z.string() })).optional(),
  sponsorship: z.enum(["none", "owned", "sponsored", "affiliate"]).default("none"),
  affiliateUrl: z.string().url().optional(),
});

export type Tool = z.infer<typeof toolSchema>;
export const tools = z.array(toolSchema).parse([]) as Tool[];
