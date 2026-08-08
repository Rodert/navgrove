import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap { return locales.flatMap((locale) => ["", "privacy", "terms", "submit"].map((page) => ({ url: `https://navgrove.com/${locale}/${page}`, lastModified: new Date() }))); }
