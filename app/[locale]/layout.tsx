import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getCopy } from "@/lib/content";
import { getBrandDescriptor, getDirection, isLocale, locales } from "@/lib/i18n";
import { notFound } from "next/navigation";

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> { const { locale: value } = await params; const locale = isLocale(value) ? value : "en"; const descriptor = getBrandDescriptor(locale); return { metadataBase: new URL("https://navgrove.com"), title: `NavGrove | ${descriptor}`, description: `${descriptor} - NavGrove` }; }

export default async function LocaleLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale: value } = await params; if (!isLocale(value)) notFound(); const locale = value;
  return <div lang={locale} dir={getDirection(locale)}><Header locale={locale} copy={getCopy(locale)} /><main>{children}</main><Footer locale={locale} copy={getCopy(locale)} /></div>;
}
