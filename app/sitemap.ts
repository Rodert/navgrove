import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { categories, tools } from "@/lib/tools";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages = ["", "privacy", "terms", "submit"];

  return locales.flatMap((locale) => [
    ...pages.map((page) => ({
      url: `https://navgrove.com/${locale}/${page ? `${page}/` : ""}`,
      lastModified,
    })),
    ...categories.map((category) => ({
      url: `https://navgrove.com/${locale}/category/${encodeURIComponent(category)}/`,
      lastModified,
    })),
    ...tools.map((tool) => ({
      url: `https://navgrove.com/${locale}/tool/${tool.slug}/`,
      lastModified,
    })),
  ]);
}
