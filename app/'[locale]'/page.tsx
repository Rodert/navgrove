import Link from "next/link";
import { SearchBox } from "@/components/SearchBox";
import { ToolCard } from "@/components/ToolCard";
import { getCopy } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { categories, tools } from "@/lib/tools";
import { notFound } from "next/navigation";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: value } = await params; if (!isLocale(value)) notFound(); const locale = value as Locale; const copy = getCopy(locale);
  const trending = tools.filter((tool) => tool.trending); const featured = tools.filter((tool) => tool.featured);
  return <><section className="border-b border-slate-200 bg-white py-18 sm:py-24"><div className="shell text-center"><p className="mb-5 text-sm font-semibold uppercase tracking-normal text-green-700">NavGrove</p><h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-normal text-slate-950 sm:text-6xl">{copy.hero.title}</h1><p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">{copy.hero.description}</p><div className="mt-9"><SearchBox locale={locale} copy={copy} /></div></div></section>
  <section className="shell py-12"><h2 className="text-xl font-semibold">{copy.sections.trending}</h2><div className="mt-5 flex flex-wrap gap-2">{["AI Agents", "Coding", "AI Search", "Image Generation", "Productivity"].map((tag) => <Link key={tag} href={`/${locale}/search/?q=${encodeURIComponent(tag)}`} className="focus-ring rounded-full border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800 hover:bg-green-100">{tag}</Link>)}</div>{trending.length > 0 && <div className="mt-6 grid gap-4 md:grid-cols-3">{trending.map((tool) => <ToolCard key={tool.slug} tool={tool} locale={locale} />)}</div>}</section>
  <section className="shell py-8"><div className="flex items-baseline justify-between"><h2 className="text-xl font-semibold">{copy.sections.categories}</h2><span className="text-sm text-slate-500">AI-first discovery</span></div><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{categories.map((category) => <Link key={category} href={`/${locale}/category/${encodeURIComponent(category)}/`} className="surface focus-ring group p-5 hover:border-green-500"><h3 className="font-semibold group-hover:text-green-700">{category}</h3><p className="mt-2 text-sm text-slate-600">{copy.sections.empty}</p></Link>)}</div></section>
  <section className="shell py-8"><h2 className="text-xl font-semibold">{copy.sections.featured}</h2>{featured.length ? <div className="mt-5 grid gap-4 md:grid-cols-3">{featured.map((tool) => <ToolCard key={tool.slug} tool={tool} locale={locale} />)}</div> : <p className="surface mt-5 p-5 text-sm text-slate-600">{copy.sections.empty}</p>}</section></>;
}
