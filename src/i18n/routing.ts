import { defineRouting } from "next-intl/routing";

export const locales = ["en", "lv", "ru", "de", "no"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales: [...locales],
  defaultLocale: "en",
  localePrefix: "always",
});

export const localeNames: Record<Locale, string> = {
  en: "English",
  lv: "Latviešu",
  ru: "Русский",
  de: "Deutsch",
  no: "Norsk",
};
