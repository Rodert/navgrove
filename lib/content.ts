import type { Locale } from "./i18n";

export type Copy = {
  nav: { discover: string; ai: string; tools: string; developer: string; trending: string; submit: string };
  hero: { title: string; description: string; placeholder: string; search: string; source: string };
  sections: { trending: string; categories: string; new: string; featured: string; empty: string };
  search: { title: string; results: string; noResults: string; back: string };
  submit: { title: string; intro: string; button: string; notice: string };
  legal: { privacy: string; terms: string; sitemap: string; contact: string };
};

const english: Copy = {
  nav: { discover: "Discover", ai: "AI", tools: "Tools", developer: "Developer", trending: "Trending", submit: "Submit" },
  hero: { title: "Discover tools worth using.", description: "Explore AI products, online tools, developer resources and useful websites from around the world.", placeholder: "Search AI, tools, websites...", search: "Search", source: "Search with" },
  sections: { trending: "Trending now", categories: "Browse categories", new: "New & noteworthy", featured: "Editor's picks", empty: "Curated tools are coming soon." },
  search: { title: "Search NavGrove", results: "results", noResults: "No matching tools yet.", back: "Back to discovery" },
  submit: { title: "Submit a tool", intro: "Know a useful product? Send it to the NavGrove editorial team for review.", button: "Open email and submit", notice: "Fill in the details below, then open your local email app. Review the pre-filled message and send it to support@navgrove.com." },
  legal: { privacy: "Privacy", terms: "Terms", sitemap: "Sitemap", contact: "Contact" },
};

type LocalizedCopy = Partial<Pick<Copy, "hero" | "sections" | "search" | "submit" | "legal">>;

const translatedLabels: Partial<Record<Locale, LocalizedCopy>> = {
  "zh-Hans": { hero: { ...english.hero, title: "发现真正值得使用的工具。", description: "探索全球的 AI 产品、在线工具、开发者资源与优质网站。", placeholder: "搜索 AI、工具和网站...", search: "搜索", source: "搜索方式" }, sections: { ...english.sections, trending: "正在热门", categories: "浏览分类", new: "新近收录", featured: "编辑精选", empty: "精选工具即将上线。" }, search: { ...english.search, title: "搜索 NavGrove", results: "个结果", noResults: "暂时没有匹配的工具。", back: "返回发现页" }, submit: { ...english.submit, title: "提交工具", intro: "发现了实用产品？发送给 NavGrove 编辑团队审核。", button: "打开邮箱并提交", notice: "填写下方信息后将打开本地邮箱，请确认预填内容并发送至 support@navgrove.com。若邮箱未自动打开，也可直接发邮件。" }, legal: { privacy: "隐私政策", terms: "服务条款", sitemap: "网站地图", contact: "联系我们" } },
  ar: { hero: { ...english.hero, title: "اكتشف أدوات تستحق الاستخدام.", description: "استكشف منتجات الذكاء الاصطناعي والأدوات والموارد المفيدة من أنحاء العالم.", placeholder: "ابحث عن أدوات ومواقع...", search: "بحث", source: "البحث باستخدام" } },
};

export function getCopy(locale: Locale): Copy {
  return { ...english, ...translatedLabels[locale], nav: english.nav } as Copy;
}
