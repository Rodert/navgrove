"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { Copy } from "@/lib/content";

type Source = "navgrove" | "google" | "baidu";
export function SearchBox({ locale, copy }: { locale: Locale; copy: Copy }) {
  const [query, setQuery] = useState(""); const [source, setSource] = useState<Source>("navgrove"); const router = useRouter();
  function submit(event: React.FormEvent) {
    event.preventDefault(); const value = query.trim(); if (!value) return;
    if (source === "navgrove") router.push(`/${locale}/search/?q=${encodeURIComponent(value)}`);
    else window.open(source === "google" ? `https://www.google.com/search?q=${encodeURIComponent(value)}` : `https://www.baidu.com/s?wd=${encodeURIComponent(value)}`, "_blank", "noopener,noreferrer");
  }
  return <form onSubmit={submit} className="mx-auto max-w-3xl">
    <div className="surface flex gap-2 p-2 shadow-sm">
      <input value={query} onChange={(event) => setQuery(event.target.value)} aria-label={copy.hero.placeholder} placeholder={copy.hero.placeholder} className="focus-ring min-w-0 flex-1 rounded-md px-3 py-3 outline-none" />
      <button className="focus-ring rounded-md bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700" type="submit">{copy.hero.search}</button>
    </div>
    <div className="mt-3 flex items-center gap-1 text-sm" role="group" aria-label={copy.hero.source}>{(["navgrove", "google", "baidu"] as Source[]).map((option) => <button key={option} type="button" onClick={() => setSource(option)} className={`focus-ring rounded-md px-3 py-1.5 ${source === option ? "bg-green-50 font-medium text-green-800" : "text-slate-500 hover:text-slate-900"}`}>{option === "navgrove" ? "NavGrove" : option === "google" ? "Google" : "Baidu"}</button>)}</div>
  </form>;
}
