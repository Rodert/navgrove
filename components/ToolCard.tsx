import Link from "next/link";
import { getToolLogo, type Tool } from "@/lib/tools";
import type { Locale } from "@/lib/i18n";
import { ToolLogo } from "./ToolLogo";

export function ToolCard({ tool, locale }: { tool: Tool; locale: Locale }) {
  const description = tool.translations?.[locale]?.description ?? tool.description;
  return <Link href={`/${locale}/tool/${tool.slug}/`} className="surface focus-ring block p-5 transition hover:border-green-500 hover:shadow-sm">
    <div className="mb-4 flex items-center gap-3"><ToolLogo name={tool.name} src={getToolLogo(tool)} /><h3 className="font-semibold">{tool.name}</h3></div>
    <p className="min-h-12 text-sm leading-6 text-slate-600">{description}</p><p className="mt-4 text-sm text-green-700">{tool.category} <span className="text-slate-300">/</span> {tool.tags.slice(0, 2).join(" · ")}</p>
  </Link>;
}
