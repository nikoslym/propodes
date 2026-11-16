import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

type Href = "/" | "/about" | "/olive-oil" | "/contact" | "/privacy";
type TitleKey = "homeTitle" | "aboutTitle" | "oilTitle" | "contactTitle" | "privacyTitle";

export async function pageMeta(locale: string, href: Href, titleKey: TitleKey): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const path = (target: Locale) => getPathname({ locale: target, href });

  return {
    title: t(titleKey),
    description: t("description"),
    alternates: {
      canonical: path(locale as Locale),
      languages: {
        el: path("el"),
        en: path("en"),
        "x-default": path("el"),
      },
    },
    openGraph: {
      title: t(titleKey),
      description: t("description"),
      locale: locale === "el" ? "el_GR" : "en_GB",
    },
  };
}
