import Link from "next/link";
import { SubmitButton } from "@/components/SubmitButton";
import { getCopy } from "@/lib/content";
import { isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
export default async function SubmitPage({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (!isLocale(locale)) notFound(); const copy = getCopy(locale); return <section className="shell max-w-2xl py-14"><Link href={`/${locale}/`} className="text-sm text-green-700 hover:underline">← {copy.search.back}</Link><h1 className="mt-5 text-4xl font-bold">{copy.submit.title}</h1><p className="mt-4 leading-7 text-slate-600">{copy.submit.intro}</p><div className="surface mt-8 p-6"><p className="text-sm leading-6 text-slate-600">{copy.submit.notice}</p><SubmitButton label={copy.submit.button} /></div></section>; }
