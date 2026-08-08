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
  return <form onSubmit={submit} className="surface mx-auto max-w-3xl p-2 shadow-sm">
    <div className="flex flex-col gap-2 sm:flex-row">
      <input value={query} onChange={(event) => setQuery(event.target.value)} aria-label={copy.hero.placeholder} placeholder={copy.hero.placeholder} className="focus-ring min-w-0 flex-1 rounded-md px-3 py-3 outline-none" />
      <div className="flex gap-2">
        <select value={source} onChange={(event) => setSource(event.target.value as Source)} aria-label={copy.hero.source} className="focus-ring rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700">
          <option value="navgrove">NavGrove</option><option value="google">Google</option><option value="baidu">Baidu</option>
        </select>
        <button className="focus-ring rounded-md bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700" type="submit">{copy.hero.search}</button>
      </div>
    </div>
  </form>;
}
