"use client";
import Fuse from "fuse.js";
import { useSearchParams } from "next/navigation";
import { ToolCard } from "@/components/ToolCard";
import type { Copy } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { tools } from "@/lib/tools";
export function SearchResults({ locale, copy }: { locale: Locale; copy: Copy }) { const query = useSearchParams().get("q") ?? ""; const fuse = new Fuse(tools, { keys: ["name", "description", "category", "tags"], threshold: 0.35 }); const results = query ? fuse.search(query).map(({ item }) => item) : []; return <>{results.length ? <div className="mt-8 grid gap-4 md:grid-cols-3">{results.map((tool) => <ToolCard key={tool.slug} tool={tool} locale={locale} />)}</div> : <div className="surface mt-8 p-8 text-slate-600">{copy.search.noResults}</div>}</>; }
