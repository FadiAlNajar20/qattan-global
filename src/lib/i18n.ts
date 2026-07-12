import { en } from "@/messages/en";
import { ar } from "@/messages/ar";
import type { Dictionary, Locale } from "@/types";

export const locales = ["en", "ar"] as const;
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

const dictionaries: Record<Locale, Dictionary> = { en, ar };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === "en" ? "ar" : "en";
}

export function getLocaleDir(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function getLocaleLang(locale: Locale): string {
  return locale === "ar" ? "ar" : "en";
}
