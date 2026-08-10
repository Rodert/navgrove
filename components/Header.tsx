import Link from "next/link";
import { localeNames, type Locale } from "@/lib/i18n";
import type { Copy } from "@/lib/content";
import { LanguageSelect } from "./LanguageSelect";

export function Header({ locale, copy }: { locale: Locale; copy: Copy }) {
  const brandName = locale === "zh-Hans" ? "AGI 导航森林" : "NavGrove";
  return <header className="border-b border-slate-200 bg-white">
    <div className="shell flex min-h-16 items-center justify-between gap-4">
      <Link href={`/${locale}/`} className="focus-ring text-xl font-bold tracking-normal text-slate-900">{locale === "zh-Hans" ? <span className="text-green-700">{brandName}</span> : <>Nav<span className="text-green-600">Grove</span></>}</Link>
      <nav className="hidden items-center gap-5 text-sm text-slate-600 md:flex">
        <Link href={`/${locale}/`} className="focus-ring hover:text-green-700">{copy.nav.discover}</Link>
        <Link href={`/${locale}/category/AI/`} className="focus-ring hover:text-green-700">{copy.nav.ai}</Link>
        <Link href={`/${locale}/category/Online%20Tools/`} className="focus-ring hover:text-green-700">{copy.nav.tools}</Link>
        <Link href={`/${locale}/category/Developer/`} className="focus-ring hover:text-green-700">{copy.nav.developer}</Link>
      </nav>
      <div className="flex items-center gap-3">
        <LanguageSelect locale={locale} />
        <Link href={`/${locale}/submit/`} className="focus-ring rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700">{copy.nav.submit}</Link>
      </div>
    </div>
  </header>;
}
