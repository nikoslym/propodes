import { getTranslations, setRequestLocale } from "next-intl/server";
import { OilBlock } from "@/components/OilBlock";
import { Phones } from "@/components/Phones";
import { Link } from "@/i18n/navigation";
import { pageMeta } from "@/lib/page-meta";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMeta(locale, "/", "homeTitle");
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <h1>{t("hero")}</h1>
          <p className="hero-links">
            <Link href="/olive-oil">{t("oilsLink")}</Link>
            <Link href="/contact">{t("orderLink")}</Link>
          </p>
        </div>
        <div className="hero-photo">
          <img src="/photos/hero.jpg" alt="" />
        </div>
      </section>

      <section className="define">
        <h2>{t("word")}</h2>
        <p>{t("definition")}</p>
      </section>

      <section className="story">
        <div className="hero-photo">
          <img src="/photos/house.jpg" alt="" />
        </div>
        <div className="story-copy">
          <p>{t("taygetus")}</p>
          <p>
            <Link href="/about">{t("aboutLink")}</Link>
          </p>
        </div>
      </section>

      <OilBlock id="athinolia" />
      <OilBlock id="blend" flip />

      <section className="order">
        <h2>{t("orderTitle")}</h2>
        <Phones large />
        <p>
          <Link href="/contact">{t("write")}</Link>
        </p>
      </section>
    </>
  );
}
