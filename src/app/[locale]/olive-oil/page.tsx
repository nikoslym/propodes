import { getTranslations, setRequestLocale } from "next-intl/server";
import { OilBlock } from "@/components/OilBlock";
import { Slideshow } from "@/components/Slideshow";
import { pageMeta } from "@/lib/page-meta";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMeta(locale, "/olive-oil", "oilTitle");
}

export default async function OliveOilPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("oilPage");

  return (
    <>
      <article className="page">
        <h1>{t("title")}</h1>
        <div className="prose">
          <p>{t("intro")}</p>
        </div>
      </article>

      <Slideshow
        previousLabel={t("previous")}
        nextLabel={t("next")}
        slides={[
          { src: "/photos/harvest.jpg", alt: t("harvestAlt"), caption: t("harvestCaption") },
          { src: "/photos/fruit.jpg", alt: t("fruitAlt"), caption: t("fruitCaption") },
          { src: "/photos/nets.jpg", alt: t("netsAlt"), caption: t("netsCaption") },
        ]}
      />

      <OilBlock id="athinolia" withNutrition />
      <OilBlock id="koroneiki" flip withNutrition />
      <OilBlock id="blend" withNutrition />

      <article className="page">
        <div className="prose">
          <p>{t("legal")}</p>
          <p>{t("storage")}</p>
          <p>{t("packed")}</p>
        </div>
      </article>
    </>
  );
}
