"use client";

import { useEffect, useState } from "react";
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname, locale]);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="header">
      <Link href="/" className="brand" aria-label={locale === "el" ? "Πρόποδες" : "Propodes"}>
        <img src="/brand/logo-horizontal.svg" alt="" />
      </Link>
      <button
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="menu-bars" aria-hidden="true" />
        <span className="visually-hidden">{open ? t("close") : t("menu")}</span>
      </button>
      <div className="header-tools">
        <Link href={pathname} locale={other}>
          {otherLabel}
        </Link>
        <Link href="/contact" className="order-link">
          {t("order")}
        </Link>
      </div>
      <nav id="site-menu" className={open ? "nav is-open" : "nav"} aria-label={locale === "el" ? "Κύρια" : "Main"}>
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={pathname === item.href ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {t(item.key)}
          </Link>
        ))}
        <Link href="/contact" className="nav-order" onClick={() => setOpen(false)}>
          {t("order")}
        </Link>
      </nav>
    </header>
  );
}
