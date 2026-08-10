import { z } from "zod";
import type { Locale } from "./i18n";

export const categories = ["AI", "Developer", "Design", "Productivity", "Online Tools", "Resources", "Free", "3D", "Skills", "AI Image", "AI Video"] as const;
export type Category = (typeof categories)[number];

export const toolSchema = z.object({
  name: z.string().min(1), slug: z.string().regex(/^[a-z0-9-]+$/), url: z.string().url(),
  description: z.string().min(1), category: z.enum(categories), additionalCategories: z.array(z.enum(categories)).default([]), isFree: z.boolean().default(false), tags: z.array(z.string()),
  logo: z.string().url().optional(), featured: z.boolean().default(false), trending: z.boolean().default(false),
  translations: z.record(z.string(), z.object({ description: z.string() })).optional(),
  sponsorship: z.enum(["none", "owned", "sponsored", "affiliate"]).default("none"),
  affiliateUrl: z.string().url().optional(),
});

export type Tool = z.infer<typeof toolSchema>;

const categoryLabels: Partial<Record<Locale, Record<Category, string>>> = {
  "zh-Hans": { AI: "人工智能", Developer: "开发者工具", Design: "设计创作", Productivity: "效率工具", "Online Tools": "在线工具", Resources: "资源", Free: "免费", "3D": "3D 设计", Skills: "Skills", "AI Image": "AI 生图", "AI Video": "AI 视频" },
};

const chineseDescriptions: Record<string, string> = {
  chatgpt: "通用 AI 助手，适合写作、编程、分析、学习与任务自动化。", claude: "适用于文档分析、软件开发与复杂推理的 AI 助手。", gemini: "支持搜索、图片理解和 Google 生态协作的多模态 AI 助手。", grok: "用于聊天、新闻分析和 X 平台信息检索的实时 AI 助手。", deepseek: "面向中文问答、编程与推理任务的 AI 模型和助手。", cursor: "用于编写、理解和重构软件项目的 AI 优先代码编辑器。", "github-copilot": "面向代码补全、对话和开发流程的 AI 编程助手。", "openai-codex": "可规划、修改并执行软件项目任务的编程 Agent。", "claude-code": "用于代码库分析与自动化项目修改的命令行编程 Agent。", perplexity: "用于联网研究、带引用回答和资料整理的 AI 搜索引擎。", "gemini-search": "由 Google 驱动的 AI 搜索与知识问答助手。", "you-com": "将网页搜索结果与 AI 助手结合的搜索平台。", midjourney: "用于艺术概念、插画和商业视觉的 AI 图片生成工具。", "gpt-image": "通过 ChatGPT 进行 AI 图片生成与编辑的工具。", "stable-diffusion": "适用于本地工作流与自定义模型训练的开源图像生成模型。", "leonardo-ai": "用于游戏素材、概念设计和视觉创作的 AI 设计平台。", runway: "用于视频生成、剪辑和视觉特效的 AI 视频平台。", pika: "用于创意短视频内容生成的 AI 视频工具。", "kling-ai": "支持文生视频和图生视频的 AI 视频创作工具。", sora: "用于高质量视频创作的 AI 视频生成模型。", "javapub-markdown": "将 Markdown 转换为适合公众号等内容平台发布格式的在线编辑器。", silicogrove: "独立运营的第三方 ChatGPT 镜像体验服务，提供免费试用账号申请。", "javapub-tools": "提供 JSON 格式化、编码解码、开发调试和图片处理等功能的本地在线工具箱。", "wechat-mac-versions": "收集并提供微信 macOS 历史版本下载的资源中心。",
};

export function getCategoryLabel(category: Category, locale: Locale) { return categoryLabels[locale]?.[category] ?? category; }
export function getToolDescription(tool: Tool, locale: Locale) { return tool.translations?.[locale]?.description ?? (locale === "zh-Hans" ? chineseDescriptions[tool.slug] ?? tool.description : tool.description); }
export function isInCategory(tool: Tool, category: Category) {
  if (category === "Free") return tool.isFree;
  if (category === "3D") return tool.tags.some((tag) => tag === "3D" || tag === "AI 3D");
  if (category === "Skills") return tool.tags.includes("Skills");
  if (category === "AI Image" || category === "AI Video") return tool.tags.includes(category);
  return tool.category === category || tool.additionalCategories.includes(category);
}

export function getToolLogo(tool: Tool) {
  if (tool.logo) return tool.logo;
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(new URL(tool.url).hostname)}&sz=128`;
}

export const tools = z.array(toolSchema).parse([
  { name: "ChatGPT", slug: "chatgpt", url: "https://chatgpt.com", description: "General-purpose AI assistant for writing, coding, analysis, learning and task automation.", category: "AI", tags: ["AI Assistant", "Writing", "Coding", "Agent"], featured: true, trending: true },
  { name: "Claude", slug: "claude", url: "https://claude.ai", description: "AI assistant for document analysis, software development and complex reasoning tasks.", category: "AI", tags: ["AI Assistant", "Long Context", "Coding"], featured: true, trending: true },
  { name: "Gemini", slug: "gemini", url: "https://gemini.google.com", description: "Multimodal AI assistant for search, image understanding and Google-connected work.", category: "AI", tags: ["AI Assistant", "Multimodal", "Google"], featured: true, trending: true },
  { name: "Grok", slug: "grok", url: "https://grok.com", description: "Real-time AI assistant for conversations, news analysis and information from X.", category: "AI", tags: ["AI Assistant", "Real Time", "News"], trending: true },
  { name: "DeepSeek", slug: "deepseek", url: "https://chat.deepseek.com", description: "AI model and assistant for Chinese questions, coding and reasoning.", category: "AI", tags: ["AI Assistant", "Chinese", "Coding", "Reasoning"], trending: true },
  { name: "Cursor", slug: "cursor", url: "https://cursor.com", description: "AI-first code editor for writing, understanding and refactoring software projects.", category: "Developer", additionalCategories: ["AI"], tags: ["AI Coding", "IDE", "Refactoring"], featured: true, trending: true },
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
  { name: "JavaPub Markdown Editor", slug: "javapub-markdown", url: "https://md.javapub.net.cn/", description: "Online Markdown editor for formatting and publishing content to WeChat Official Accounts and other platforms.", category: "Productivity", isFree: true, tags: ["Markdown", "Writing", "Publishing", "WeChat", "Content Creation"] },
  { name: "SilicoGrove AI", slug: "silicogrove", url: "https://chatgpt.silicogrove.com/", description: "Independent third-party ChatGPT mirror service offering free trial account access.", category: "AI", tags: ["AI Assistant", "ChatGPT", "Third-Party", "Chinese"] },
  { name: "JavaPub Tools", slug: "javapub-tools", url: "https://rodert.github.io/jsonformat/", description: "Developer toolbox for JSON formatting, encoding, debugging, image processing and other local utilities.", category: "Developer", additionalCategories: ["Online Tools"], isFree: true, tags: ["JSON", "Formatting", "Encoding", "Developer Utilities", "Local Processing"] },
  { name: "WeChat Mac Versions", slug: "wechat-mac-versions", url: "https://rodert.github.io/wechat-mac-versions/", description: "Archive of historical WeChat releases for macOS, with download links and release information.", category: "Resources", isFree: true, tags: ["WeChat", "macOS", "Downloads", "Version Archive"] },
  { name: "Qwen3.8 Max", slug: "qwen38-max", url: "https://openrouter.ai/qwen/qwen3.8-max", description: "Alibaba Qwen flagship multimodal reasoning model for coding, visual understanding and agents.", category: "AI", additionalCategories: ["Developer"], tags: ["Qwen", "Reasoning", "Coding", "Multimodal"] },
  { name: "DeepSeek V4 Flash", slug: "deepseek-v4-flash", url: "https://openrouter.ai/deepseek/deepseek-v4-flash-0731", description: "DeepSeek sparse mixture-of-experts model for coding, reasoning and agent workflows.", category: "AI", additionalCategories: ["Developer"], tags: ["DeepSeek", "Reasoning", "Coding", "Agent"] },
  { name: "Meta Muse Spark 1.2", slug: "meta-muse-spark", url: "https://openrouter.ai/meta/muse-spark-1.2", description: "Meta multimodal reasoning model for complex agentic and software engineering tasks.", category: "AI", additionalCategories: ["Developer"], tags: ["Meta", "Reasoning", "Agent", "Multimodal"] },
  { name: "Thinking Machines Inkling Small", slug: "inkling-small", url: "https://openrouter.ai/thinkingmachines/inkling-small", description: "Open-weight multimodal model for reasoning, coding, retrieval and multilingual conversations.", category: "AI", additionalCategories: ["Developer"], tags: ["Open Weights", "Coding", "Reasoning", "Multimodal"] },
  { name: "Qwen Image 3 Pro", slug: "qwen-image-3-pro", url: "https://openrouter.ai/qwen/qwen-image-3-pro", description: "Qwen image generation and editing model with precise text and detail rendering.", category: "Design", additionalCategories: ["AI"], tags: ["Qwen", "AI Image", "Image Editing"] },
  { name: "ByteDance Seedance 2.5", slug: "seedance-25", url: "https://openrouter.ai/bytedance/seedance-2.5", description: "ByteDance video generation model for multimodal references, editing and audiovisual storytelling.", category: "Design", additionalCategories: ["AI"], tags: ["ByteDance", "AI Video", "Video Editing"] },
  { name: "FLUX.3 Video", slug: "flux-3-video", url: "https://openrouter.ai/black-forest-labs/flux-3-video", description: "Black Forest Labs video model for text-to-video, image-guided scenes and video continuation.", category: "Design", additionalCategories: ["AI"], tags: ["FLUX", "AI Video", "Text to Video"] },
  { name: "DeepL Translator", slug: "deepl-translator", url: "https://www.deepl.com/translator", description: "Official DeepL translation service for text and document translation.", category: "Productivity", additionalCategories: ["Online Tools"], tags: ["Translation", "Writing", "Languages"] },
  { name: "Google Translate", slug: "google-translate", url: "https://translate.google.com/", description: "Google's official translation service for text, documents, websites and conversations.", category: "Productivity", additionalCategories: ["Online Tools"], tags: ["Translation", "Google", "Languages"] },
  { name: "Blender", slug: "blender", url: "https://www.blender.org/", description: "Open-source 3D creation suite for modeling, animation, rendering and visual effects.", category: "Design", isFree: true, tags: ["3D", "Modeling", "Animation", "Open Source"] },
  { name: "Spline", slug: "spline", url: "https://spline.design/", description: "Collaborative 3D design tool for creating interactive web scenes and experiences.", category: "Design", tags: ["3D", "Web Design", "Interactive"] },
  { name: "Meshy", slug: "meshy", url: "https://www.meshy.ai/", description: "AI 3D creation tool for generating and texturing 3D assets.", category: "Design", additionalCategories: ["AI"], tags: ["3D", "AI 3D", "Game Assets"] },
  { name: "Agent Skills", slug: "agent-skills", url: "https://agentskills.io/", description: "Open specification for packaging reusable AI agent capabilities, workflows and resources.", category: "Developer", additionalCategories: ["AI", "Resources"], tags: ["Skills", "Agents", "Open Standard"] },
  { name: "OpenAI Prompting Guide", slug: "openai-prompting-guide", url: "https://platform.openai.com/docs/guides/prompt-engineering", description: "Official OpenAI guidance for writing effective prompts and building reliable AI workflows.", category: "Resources", additionalCategories: ["AI", "Developer"], tags: ["Prompts", "OpenAI", "Documentation"] },
  { name: "OpenClaw", slug: "openclaw", url: "https://openclaw.ai/", description: "Open-source AI agent platform for building and operating agent workflows.", category: "AI", additionalCategories: ["Developer"], tags: ["Agent", "Open Source", "Automation"] },
  { name: "Anthropic Skills", slug: "anthropic-skills", url: "https://github.com/anthropics/skills", description: "Anthropic's official implementation and examples of reusable skills for Claude.", translations: { "zh-Hans": { description: "Anthropic 为 Claude 提供的官方可复用 Skills 实现、示例和模板。" } }, category: "Developer", additionalCategories: ["AI", "Resources"], tags: ["Anthropic", "Claude", "Skills", "Agent"] },
  { name: "CodexGuide", slug: "codex-guide", url: "https://codex-zh.net/", description: "Third-party Chinese guide for getting started with Codex, its features and common workflows.", translations: { "zh-Hans": { description: "面向新手的 Codex 中文教程，涵盖入门、功能、常见问题和实战流程。" } }, category: "Resources", additionalCategories: ["AI", "Developer"], tags: ["Codex", "Chinese", "Tutorial", "Third-Party"] },
]) as Tool[];
