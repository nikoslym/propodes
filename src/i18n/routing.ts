import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["el", "en"],
  defaultLocale: "el",
  localePrefix: "as-needed",
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/about": {
      el: "/poioi-eimaste",
      en: "/about",
    },
    "/olive-oil": {
      el: "/elaiolado",
      en: "/olive-oil",
    },
    "/contact": {
      el: "/epikoinonia",
      en: "/contact",
    },
    "/privacy": {
      el: "/aporrito",
      en: "/privacy",
    },
  },
});

export type Locale = (typeof routing.locales)[number];

export function isLocale(value: string): value is Locale {
  return (routing.locales as readonly string[]).includes(value);
}
