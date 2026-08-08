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

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getDirection(locale: Locale) {
  return rtlLocales.includes(locale) ? "rtl" : "ltr";
}
