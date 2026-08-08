"use client";
import { localeNames, type Locale } from "@/lib/i18n";
export function LanguageSelect({ locale }: { locale: Locale }) { return <select aria-label="Language" value={locale} className="focus-ring max-w-28 bg-transparent text-sm text-slate-600" onChange={(event) => { const path = window.location.pathname.split("/"); path[1] = event.target.value; window.location.href = path.join("/"); }}>{Object.entries(localeNames).map(([code, name]) => <option key={code} value={code}>{name}</option>)}</select>; }
