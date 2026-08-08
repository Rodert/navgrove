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
export const tools = z.array(toolSchema).parse([
  { name: "ChatGPT", slug: "chatgpt", url: "https://chatgpt.com", description: "General-purpose AI assistant for writing, coding, analysis, learning and task automation.", category: "AI", tags: ["AI Assistant", "Writing", "Coding", "Agent"], featured: true, trending: true },
  { name: "Claude", slug: "claude", url: "https://claude.ai", description: "AI assistant for document analysis, software development and complex reasoning tasks.", category: "AI", tags: ["AI Assistant", "Long Context", "Coding"], featured: true, trending: true },
  { name: "Gemini", slug: "gemini", url: "https://gemini.google.com", description: "Multimodal AI assistant for search, image understanding and Google-connected work.", category: "AI", tags: ["AI Assistant", "Multimodal", "Google"], featured: true, trending: true },
  { name: "Grok", slug: "grok", url: "https://grok.com", description: "Real-time AI assistant for conversations, news analysis and information from X.", category: "AI", tags: ["AI Assistant", "Real Time", "News"], trending: true },
  { name: "DeepSeek", slug: "deepseek", url: "https://chat.deepseek.com", description: "AI model and assistant for Chinese questions, coding and reasoning.", category: "AI", tags: ["AI Assistant", "Chinese", "Coding", "Reasoning"], trending: true },
  { name: "Cursor", slug: "cursor", url: "https://cursor.com", description: "AI-first code editor for writing, understanding and refactoring software projects.", category: "Developer", tags: ["AI Coding", "IDE", "Refactoring"], featured: true, trending: true },
  { name: "GitHub Copilot", slug: "github-copilot", url: "https://github.com/features/copilot", description: "AI coding assistant for code completion, chat and development workflows.", category: "Developer", tags: ["AI Coding", "Code Completion", "GitHub"], featured: true },
  { name: "OpenAI Codex", slug: "openai-codex", url: "https://chatgpt.com/codex", description: "Coding agent for planning, editing and running tasks across software projects.", category: "Developer", tags: ["Coding Agent", "Automation", "OpenAI"], featured: true, trending: true },
  { name: "Claude Code", slug: "claude-code", url: "https://claude.com/product/claude-code", description: "Command-line coding agent for codebase analysis and automated project changes.", category: "Developer", tags: ["Coding Agent", "CLI", "Codebase"], featured: true, trending: true },
  { name: "Perplexity", slug: "perplexity", url: "https://www.perplexity.ai", description: "AI search engine for web research, cited answers and information synthesis.", category: "AI", tags: ["AI Search", "Research", "Web"], featured: true, trending: true },
  { name: "Gemini Search", slug: "gemini-search", url: "https://gemini.google.com", description: "Google-powered AI search and knowledge assistant.", category: "AI", tags: ["AI Search", "Google", "Research"] },
  { name: "You.com", slug: "you-com", url: "https://you.com", description: "Search platform that combines web results with an AI assistant.", category: "AI", tags: ["AI Search", "Research", "Web"] },
  { name: "Midjourney", slug: "midjourney", url: "https://www.midjourney.com", description: "AI image generator for artistic concepts, illustration and commercial visuals.", category: "Design", tags: ["AI Image", "Art", "Design"], featured: true, trending: true },
  { name: "GPT Image", slug: "gpt-image", url: "https://chatgpt.com", description: "AI image generation and editing through ChatGPT.", category: "Design", tags: ["AI Image", "Image Editing", "OpenAI"], featured: true, trending: true },
  { name: "Stable Diffusion", slug: "stable-diffusion", url: "https://stability.ai", description: "Open image generation models for local workflows and custom model training.", category: "Design", tags: ["AI Image", "Open Source", "Local"], featured: true },
  { name: "Leonardo AI", slug: "leonardo-ai", url: "https://leonardo.ai", description: "AI design platform for game assets, concept art and visual creation.", category: "Design", tags: ["AI Image", "Game Assets", "Design"] },
  { name: "Runway", slug: "runway", url: "https://runwayml.com", description: "AI video platform for generation, editing and visual effects.", category: "Design", tags: ["AI Video", "Video Editing", "VFX"], featured: true, trending: true },
  { name: "Pika", slug: "pika", url: "https://pika.art", description: "AI video generator for creative short-form visual content.", category: "Design", tags: ["AI Video", "Video Generation", "Creative"] },
  { name: "Kling AI", slug: "kling-ai", url: "https://klingai.com", description: "AI video tool for text-to-video and image-to-video creation.", category: "Design", tags: ["AI Video", "Text to Video", "Image to Video"], featured: true, trending: true },
  { name: "Sora", slug: "sora", url: "https://sora.com", description: "AI video generation model for high-quality video creation.", category: "Design", tags: ["AI Video", "Video Generation", "OpenAI"], featured: true, trending: true },
]) as Tool[];
