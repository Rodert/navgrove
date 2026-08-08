"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";

function preferredLocale(): Locale {
  const preferred = navigator.languages ?? [navigator.language];
  for (const language of preferred) {
    if (isLocale(language)) return language;
    if (language.startsWith("zh")) return "zh-Hans";
    const base = language.split("-")[0];
    if (isLocale(base)) return base;
  }
  return "en";
}

export default function RootPage() { const router = useRouter(); useEffect(() => { router.replace(`/${preferredLocale()}/`); }, [router]); return <main className="grid min-h-screen place-items-center bg-slate-50 text-sm text-slate-500">NavGrove</main>; }
