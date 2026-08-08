import { SearchBox } from "@/components/SearchBox";
import { ToolDirectory } from "@/components/ToolDirectory";
import { getCopy } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { categories, tools } from "@/lib/tools";
import { notFound } from "next/navigation";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: value } = await params; if (!isLocale(value)) notFound(); const locale = value as Locale; const copy = getCopy(locale);
  return <><section className="border-b border-slate-200 bg-white py-5 sm:py-6"><div className="shell"><SearchBox locale={locale} copy={copy} /></div></section><ToolDirectory locale={locale} copy={copy} categories={categories} tools={tools} /></>;
}
