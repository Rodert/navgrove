import { SearchBox } from "@/components/SearchBox";
import { ToolDirectory } from "@/components/ToolDirectory";
import { getCopy } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { categories, tools } from "@/lib/tools";
import { notFound } from "next/navigation";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: value } = await params; if (!isLocale(value)) notFound(); const locale = value as Locale; const copy = getCopy(locale);
  return <><section className="border-b border-slate-200 bg-white py-9 sm:py-12"><div className="shell"><p className="mb-3 text-sm font-semibold text-green-700">NavGrove</p><h1 className="max-w-2xl text-3xl font-bold text-slate-950 sm:text-4xl">{copy.hero.title}</h1><div className="mt-6"><SearchBox locale={locale} copy={copy} /></div></div></section><ToolDirectory locale={locale} copy={copy} categories={categories} tools={tools} /></>;
}
