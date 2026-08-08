import { notFound } from "next/navigation";
import { getCopy } from "@/lib/content";
import { isLocale } from "@/lib/i18n";
import { tools } from "@/lib/tools";
export function generateStaticParams() { return tools.flatMap((tool) => ["en", "zh-Hans", "es", "hi", "ar", "fr", "pt", "bn", "ru", "ur", "id", "de", "ja", "ko", "tr", "vi"].map((locale) => ({ locale, slug: tool.slug }))); }
export default async function ToolPage({ params }: { params: Promise<{ locale: string; slug: string }> }) { const { locale, slug } = await params; if (!isLocale(locale)) notFound(); const tool = tools.find((entry) => entry.slug === slug); if (!tool) notFound(); return <section className="shell max-w-3xl py-14"><p className="text-sm text-green-700">{tool.category}</p><h1 className="mt-3 text-4xl font-bold">{tool.name}</h1><p className="mt-5 text-lg leading-8 text-slate-600">{tool.translations?.[locale]?.description ?? tool.description}</p><a href={tool.affiliateUrl ?? tool.url} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex rounded-md bg-green-600 px-5 py-3 font-medium text-white">Visit {tool.name} ↗</a></section>; }
