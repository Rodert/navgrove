import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Copy } from "@/lib/content";
export function Footer({ locale, copy }: { locale: Locale; copy: Copy }) {
  return <footer className="mt-20 border-t border-slate-200"><div className="shell flex flex-col gap-3 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} NavGrove</span><div className="flex gap-4"><Link href={`/${locale}/privacy/`} className="hover:text-green-700">{copy.legal.privacy}</Link><Link href={`/${locale}/terms/`} className="hover:text-green-700">{copy.legal.terms}</Link><a href="mailto:support@navgrove.com" className="hover:text-green-700">{copy.legal.contact}</a></div></div></footer>;
}
