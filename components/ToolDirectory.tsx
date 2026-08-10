"use client";

import { useState } from "react";
import { ToolCard } from "./ToolCard";
import type { Copy } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { getCategoryLabel, isInCategory, type Category, type Tool } from "@/lib/tools";

export function ToolDirectory({ locale, copy, categories, tools }: { locale: Locale; copy: Copy; categories: readonly Category[]; tools: Tool[] }) {
  const [selected, setSelected] = useState<Category | "All">("All");
  const visible = selected === "All" ? tools : tools.filter((tool) => isInCategory(tool, selected));
  return <section className="shell py-8 sm:py-10"><div className="grid gap-7 lg:grid-cols-[240px_minmax(0,1fr)]"><aside className="lg:sticky lg:top-5 lg:h-fit"><p className="mb-4 text-base font-semibold text-slate-900">{copy.sections.categories}</p><div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible"><button onClick={() => setSelected("All")} className={`focus-ring shrink-0 rounded-md px-4 py-3 text-left text-base ${selected === "All" ? "bg-green-600 font-medium text-white" : "text-slate-600 hover:bg-green-50 hover:text-green-800"}`}>{locale === "zh-Hans" ? "全部工具" : "All tools"} <span className="float-right ms-2 text-sm opacity-70">{tools.length}</span></button>{categories.map((category) => { const count = tools.filter((tool) => isInCategory(tool, category)).length; return <button key={category} onClick={() => setSelected(category)} className={`focus-ring shrink-0 rounded-md px-4 py-3 text-left text-base ${selected === category ? "bg-green-600 font-medium text-white" : "text-slate-600 hover:bg-green-50 hover:text-green-800"}`}>{getCategoryLabel(category, locale)} <span className="float-right ms-2 text-sm opacity-70">{count}</span></button>; })}</div></aside><div><div className="mb-5 flex items-baseline justify-between gap-3"><h2 className="text-xl font-semibold">{selected === "All" ? (locale === "zh-Hans" ? "全部工具" : "All tools") : getCategoryLabel(selected, locale)}</h2><span className="text-sm text-slate-500">{visible.length} tools</span></div>{visible.length ? <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{visible.map((tool) => <ToolCard key={tool.slug} tool={tool} locale={locale} />)}</div> : <p className="surface p-6 text-sm text-slate-600">{copy.sections.empty}</p>}</div></div></section>;
}
