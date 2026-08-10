export const locales = [
  "en", "zh-Hans", "es", "hi", "ar", "fr", "pt", "bn",
  "ru", "ur", "id", "de", "ja", "ko", "tr", "vi",
] as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "English", "zh-Hans": "简体中文", es: "Español", hi: "हिन्दी",
  ar: "العربية", fr: "Français", pt: "Português", bn: "বাংলা",
  ru: "Русский", ur: "اردو", id: "Bahasa Indonesia", de: "Deutsch",
  ja: "日本語", ko: "한국어", tr: "Türkçe", vi: "Tiếng Việt",
};

export const rtlLocales: Locale[] = ["ar", "ur"];

export const brandDescriptors: Record<Locale, string> = {
  en: "AI Tool Discovery", "zh-Hans": "AGI 导航森林", es: "Descubrimiento de herramientas de IA", hi: "AI टूल खोज",
  ar: "دليل أدوات الذكاء الاصطناعي", fr: "Découverte d'outils IA", pt: "Descoberta de ferramentas de IA", bn: "এআই টুল আবিষ্কার",
  ru: "Навигатор ИИ-инструментов", ur: "اے آئی ٹولز دریافت کریں", id: "Penemuan alat AI", de: "KI-Tool-Entdeckung",
  ja: "AIツール発見", ko: "AI 도구 탐색", tr: "Yapay zeka araç keşfi", vi: "Khám phá công cụ AI",
};

export function getBrandDescriptor(locale: Locale) { return brandDescriptors[locale]; }

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getDirection(locale: Locale) {
  return rtlLocales.includes(locale) ? "rtl" : "ltr";
}
