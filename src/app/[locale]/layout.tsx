import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { isLocale, routing } from "@/i18n/routing";
import "../globals.css";

const ubuntu = Ubuntu({
  subsets: ["latin", "greek", "latin-ext"],
  weight: ["300", "400"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL("https://propodes.com"),
    title: {
      default: t("homeTitle"),
      template: "%s",
    },
    description: t("description"),
    openGraph: {
      images: ["/photos/og.jpg"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "meta" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: t("site"),
    url: "https://propodes.com",
    email: "info@propodes.com",
    telephone: ["+306955161124", "+306993223871"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Goranoi – Kokkina Louria",
      addressRegion: "Lakonia",
      postalCode: "230 54",
      addressCountry: "GR",
    },
  };

  return (
    <html lang={locale}>
      <body className={ubuntu.className}>
        <NextIntlClientProvider>
          <a className="skip" href="#content">
            {locale === "el" ? "Περιεχόμενο" : "Content"}
          </a>
          <Header />
          <main id="content">{children}</main>
          <Footer />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
