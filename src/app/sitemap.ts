import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const paths = ["/", "/about", "/olive-oil", "/contact", "/privacy"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://propodes.com";

  return paths.map((href) => ({
    url: base + getPathname({ locale: "el", href }),
    alternates: {
      languages: {
        el: base + getPathname({ locale: "el", href }),
        en: base + getPathname({ locale: "en", href }),
        "x-default": base + getPathname({ locale: "el", href }),
      },
    },
  }));
}
