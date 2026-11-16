"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const links = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/olive-oil", key: "oil" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const locale = useLocale();
  const other = locale === "el" ? "en" : "el";
  const otherLabel = locale === "el" ? "English" : "Ελληνικά";

  return (
    <header className="header">
      <Link href="/" className="brand" aria-label={locale === "el" ? "Πρόποδες" : "Propodes"}>
        <img src="/brand/logo-horizontal.svg" alt="" />
      </Link>
      <nav className="nav" aria-label={locale === "el" ? "Κύρια" : "Main"}>
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={pathname === item.href ? "page" : undefined}
          >
            {t(item.key)}
          </Link>
        ))}
      </nav>
      <div className="header-tools">
        <Link href={pathname} locale={other}>
          {otherLabel}
        </Link>
        <Link href="/contact">{t("order")}</Link>
      </div>
    </header>
  );
}
