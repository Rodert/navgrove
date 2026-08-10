import { ToolCard } from "@/components/ToolCard";
import { getCopy } from "@/lib/content";
import { isLocale } from "@/lib/i18n";
import { categories, isInCategory, tools } from "@/lib/tools";
import { notFound } from "next/navigation";
export function generateStaticParams() { return categories.flatMap((category) => ["en", "zh-Hans", "es", "hi", "ar", "fr", "pt", "bn", "ru", "ur", "id", "de", "ja", "ko", "tr", "vi"].map((locale) => ({ locale, category }))); }
export default async function CategoryPage({ params }: { params: Promise<{ locale: string; category: string }> }) { const { locale, category } = await params; if (!isLocale(locale) || !categories.includes(category as (typeof categories)[number])) notFound(); const selectedCategory = category as (typeof categories)[number]; const entries = tools.filter((tool) => isInCategory(tool, selectedCategory)); const copy = getCopy(locale); return <section className="shell py-14"><p className="text-sm font-medium text-green-700">NavGrove / {category}</p><h1 className="mt-2 text-4xl font-bold">{category}</h1><p className="mt-4 max-w-xl text-slate-600">{copy.sections.empty}</p>{entries.length ? <div className="mt-8 grid gap-4 md:grid-cols-3">{entries.map((tool) => <ToolCard key={tool.slug} tool={tool} locale={locale} />)}</div> : <div className="surface mt-8 p-8 text-slate-600">{copy.sections.empty}</div>}</section>; }
