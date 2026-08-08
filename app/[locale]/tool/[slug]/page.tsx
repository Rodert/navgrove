import { notFound } from "next/navigation";
import { isLocale, locales } from "@/lib/i18n";
import { getToolLogo, tools } from "@/lib/tools";
import { ToolLogo } from "@/components/ToolLogo";

export function generateStaticParams() {
  return tools.flatMap((tool) => locales.map((locale) => ({ locale, slug: tool.slug })));
}

export default async function ToolPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const tool = tools.find((entry) => entry.slug === slug);
  if (!tool) notFound();
  const description = tool.translations?.[locale]?.description ?? tool.description;
  return <section className="shell max-w-3xl py-14"><div className="flex items-center gap-4"><ToolLogo name={tool.name} src={getToolLogo(tool)} /><div><p className="text-sm font-medium text-green-700">{tool.category}</p><h1 className="mt-1 text-4xl font-bold">{tool.name}</h1></div></div><p className="mt-5 text-lg leading-8 text-slate-600">{description}</p><div className="mt-7 flex flex-wrap gap-2">{tool.tags.map((tag) => <span key={tag} className="rounded-full bg-green-50 px-3 py-1 text-sm text-green-800">{tag}</span>)}</div><a href={tool.affiliateUrl ?? tool.url} target="_blank" rel="noopener noreferrer" className="focus-ring mt-8 inline-flex rounded-md bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700">Visit {tool.name} ↗</a></section>;
}
