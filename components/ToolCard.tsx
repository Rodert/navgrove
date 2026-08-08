import type { Tool } from "@/lib/tools";
import type { Locale } from "@/lib/i18n";

export function ToolCard({ tool, locale }: { tool: Tool; locale: Locale }) {
  const description = tool.translations?.[locale]?.description ?? tool.description;
  return <a href={tool.affiliateUrl ?? tool.url} target="_blank" rel="noopener noreferrer" className="surface focus-ring block p-5 transition hover:border-green-500 hover:shadow-sm">
    <div className="mb-4 flex items-center gap-3"><div className="grid size-10 place-items-center rounded-md bg-green-50 font-bold text-green-700">{tool.name.slice(0, 1)}</div><h3 className="font-semibold">{tool.name}</h3></div>
    <p className="min-h-12 text-sm leading-6 text-slate-600">{description}</p><p className="mt-4 text-sm text-green-700">{tool.category} <span className="text-slate-300">/</span> {tool.tags.slice(0, 2).join(" · ")}</p>
  </a>;
}
