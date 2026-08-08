import Link from "next/link";
import { Suspense } from "react";
import { getCopy } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { SearchResults } from "@/components/SearchResults";
export default async function SearchPage({ params }: { params: Promise<{ locale: string }> }) { const { locale: value } = await params; if (!isLocale(value)) return null; const locale = value as Locale; const copy = getCopy(locale); return <section className="shell py-14"><Link href={`/${locale}/`} className="text-sm text-green-700 hover:underline">← {copy.search.back}</Link><h1 className="mt-5 text-4xl font-bold">{copy.search.title}</h1><Suspense fallback={<div className="surface mt-8 p-8 text-slate-600">{copy.sections.empty}</div>}><SearchResults locale={locale} copy={copy} /></Suspense></section>; }
